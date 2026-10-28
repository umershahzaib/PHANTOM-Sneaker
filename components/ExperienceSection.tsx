'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

// Dynamically import 3D viewer to avoid SSR issues
const ThreeDViewer = dynamic(() => import('./ThreeDViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-phantom-blue/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-phantom-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-phantom-blue text-sm font-semibold tracking-widest">LOADING 3D ENGINE</p>
      </div>
    </div>
  ),
})

type SneakerType = 'vortex' | 'elite'

interface Sneaker {
  id: SneakerType
  name: string
  description: string
  tagline: string
  color: string
  modelPath: string
  lightIntensity: number
}

const sneakers: Record<SneakerType, Sneaker> = {
  vortex: {
    id: 'vortex',
    name: 'PHANTOM VORTEX',
    description: 'Engineered for those who move beyond limits.',
    tagline: 'DARK. AGGRESSIVE. UNSTOPPABLE.',
    color: '#00d4ff',
    modelPath: '/models/phantom-vortex.glb',
    lightIntensity: 1.2,
  },
  elite: {
    id: 'elite',
    name: 'PHANTOM ELITE',
    description: 'Precision, performance, and effortless sophistication.',
    tagline: 'CLEAN. ELEGANT. REFINED.',
    color: '#ffffff',
    modelPath: '/models/phantom-elite.glb',
    lightIntensity: 1.8,
  },
}

export default function ExperienceSection() {
  const [selectedSneaker, setSelectedSneaker] = useState<SneakerType>('vortex')

  const handleSneakerChange = (sneaker: SneakerType) => {
    if (sneaker === selectedSneaker) return
    setSelectedSneaker(sneaker)
  }

  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
  }

  const current = sneakers[selectedSneaker]

  return (
    <section
      id="experience"
      className="relative min-h-screen bg-gradient-to-b from-phantom-black via-[#0d0d0d] to-phantom-black py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(#00d4ff 1.5px, transparent 1.5px), linear-gradient(90deg, #00d4ff 1.5px, transparent 1.5px)',
            backgroundSize: '80px 80px',
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-phantom-white mb-4 tracking-tight-display"
            style={{
              textShadow: `0 0 40px ${current.color}60`,
            }}
          >
            INTERACTIVE 3D EXPERIENCE
          </h2>
          <p className="text-sm md:text-base text-phantom-silver/80 max-w-2xl mx-auto">
            Explore every angle. Feel the precision. Experience the future.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 3D Viewer */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] order-2 lg:order-1">
            <div
              className="relative w-full h-full rounded-2xl border transition-all duration-500 overflow-hidden"
              style={{
                borderColor: `${current.color}40`,
                boxShadow: `0 0 60px ${current.color}20`,
              }}
            >
              <ThreeDViewer
                key={selectedSneaker}
                modelPath={current.modelPath}
                accentColor={current.color}
                lightIntensity={current.lightIntensity}
              />

              {/* Instructions */}
              <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                <p className="text-xs text-phantom-silver/50 tracking-wide">
                  DRAG TO ROTATE • SCROLL TO ZOOM
                </p>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 opacity-30 pointer-events-none" style={{ borderColor: current.color }}></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 opacity-30 pointer-events-none" style={{ borderColor: current.color }}></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 opacity-30 pointer-events-none" style={{ borderColor: current.color }}></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 opacity-30 pointer-events-none" style={{ borderColor: current.color }}></div>
            </div>
          </div>

          {/* Product Info */}
          <div className="order-1 lg:order-2">
            {/* Model Selector */}
            <div className="flex gap-4 mb-8">
              {(Object.keys(sneakers) as SneakerType[]).map((key) => (
                <button
                  key={key}
                  onClick={() => handleSneakerChange(key)}
                  className={`flex-1 px-6 py-4 border-2 rounded-lg font-display font-bold text-sm tracking-wide transition-all duration-300 ${
                    selectedSneaker === key
                      ? 'bg-phantom-blue text-phantom-black border-phantom-blue shadow-lg shadow-phantom-blue/40'
                      : 'bg-transparent text-phantom-silver border-phantom-graphite-light hover:border-phantom-blue/50'
                  }`}
                >
                  {sneakers[key].name}
                </button>
              ))}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: current.color, boxShadow: `0 0 10px ${current.color}` }}
                  ></div>
                  <span className="text-xs font-semibold tracking-widest text-phantom-silver/60">
                    INTERACTIVE 3D MODEL
                  </span>
                </div>
                <h3
                  className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight"
                  style={{ color: current.color, textShadow: `0 0 30px ${current.color}40` }}
                >
                  {current.name}
                </h3>
                <p className="text-sm md:text-base font-semibold tracking-wide text-phantom-silver mb-4">
                  {current.tagline}
                </p>
                <p className="text-base md:text-lg text-phantom-silver/80 leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-black/40 backdrop-blur-sm border border-phantom-graphite-light rounded-lg">
                  <p className="text-xs text-phantom-silver/60 mb-1">TECHNOLOGY</p>
                  <p className="text-sm font-semibold text-phantom-white">Advanced Cushioning</p>
                </div>
                <div className="p-4 bg-black/40 backdrop-blur-sm border border-phantom-graphite-light rounded-lg">
                  <p className="text-xs text-phantom-silver/60 mb-1">MATERIAL</p>
                  <p className="text-sm font-semibold text-phantom-white">Premium Engineered</p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <button
                  onClick={scrollToCollection}
                  className="flex-1 px-8 py-4 bg-phantom-blue text-phantom-black font-semibold tracking-wide hover:bg-white transition-all duration-300 hover:shadow-lg hover:shadow-phantom-blue/40"
                >
                  EXPLORE COLLECTION
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
