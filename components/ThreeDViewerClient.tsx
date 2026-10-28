'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface ThreeDViewerProps {
  modelPath: string
  accentColor: string
  lightIntensity: number
}

export default function ThreeDViewerClient({ modelPath, accentColor, lightIntensity }: ThreeDViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const currentModelRef = useRef<THREE.Object3D | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight | null
    directional1: THREE.DirectionalLight | null
    directional2: THREE.DirectionalLight | null
    point: THREE.PointLight | null
  }>({ ambient: null, directional1: null, directional2: null, point: null })
  const initializedRef = useRef(false)

  // Initialize scene, renderer, camera, controls, lights once
  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return

    const container = containerRef.current
    initializedRef.current = true

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 5)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)
    lightsRef.current.ambient = ambientLight

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, lightIntensity)
    directionalLight1.position.set(5, 5, 5)
    directionalLight1.castShadow = true
    scene.add(directionalLight1)
    lightsRef.current.directional1 = directionalLight1

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight2.position.set(-5, 3, -5)
    scene.add(directionalLight2)
    lightsRef.current.directional2 = directionalLight2

    const pointLight = new THREE.PointLight(accentColor, 0.3)
    pointLight.position.set(0, 2, 0)
    scene.add(pointLight)
    lightsRef.current.point = pointLight

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false
    controls.enableZoom = true
    controls.minDistance = 3
    controls.maxDistance = 8
    controls.minPolarAngle = Math.PI / 4
    controls.maxPolarAngle = Math.PI / 1.5
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controlsRef.current = controls

    // Animation loop
    let floatOffset = 0
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      if (currentModelRef.current) {
        floatOffset += 0.01
        currentModelRef.current.position.y = Math.sin(floatOffset) * 0.05
        currentModelRef.current.rotation.y += 0.002
      }

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (controlsRef.current) {
        controlsRef.current.dispose()
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement)
        }
      }
      initializedRef.current = false
    }
  }, [])

  // Load/switch model when modelPath changes
  useEffect(() => {
    if (!sceneRef.current) return

    const scene = sceneRef.current
    setLoading(true)
    setError(null)

    // Remove previous model
    if (currentModelRef.current) {
      scene.remove(currentModelRef.current)
      currentModelRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.geometry?.dispose()
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach(mat => mat.dispose())
            } else {
              mesh.material.dispose()
            }
          }
        }
      })
      currentModelRef.current = null
    }

    // Update lights
    if (lightsRef.current.directional1) {
      lightsRef.current.directional1.intensity = lightIntensity
    }
    if (lightsRef.current.point) {
      lightsRef.current.point.color.set(accentColor)
    }

    // Load new model
    const loader = new GLTFLoader()
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene

        // Center and scale
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2 / maxDim

        model.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
        model.scale.setScalar(scale)

        // Enhance materials
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            if (mesh.material) {
              const material = mesh.material as THREE.MeshStandardMaterial
              material.metalness = 0.3
              material.roughness = 0.4
              mesh.castShadow = true
              mesh.receiveShadow = true
            }
          }
        })

        scene.add(model)
        currentModelRef.current = model
        setLoading(false)
      },
      undefined,
      (err) => {
        console.error('Model load error:', err)
        setError('Failed to load 3D model')
        setLoading(false)
      }
    )
  }, [modelPath, accentColor, lightIntensity])

  return (
    <div className="relative w-full h-full bg-black/40">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20">
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute inset-0 border-4 border-phantom-blue/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-phantom-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-phantom-blue text-sm font-semibold tracking-widest">LOADING MODEL</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  )
}
