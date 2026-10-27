'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [currentStage, setCurrentStage] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [videoReady, setVideoReady] = useState(false)

  const stages = [
    { progress: 0, label: 'ASSEMBLED', description: 'Complete construction', color: '#00d4ff' },
    { progress: 25, label: 'SEPARATING', description: 'Layers beginning to reveal', color: '#00b8e6' },
    { progress: 50, label: 'EXPLODED', description: 'Engineering fully visible', color: '#0099cc' },
    { progress: 75, label: 'REASSEMBLING', description: 'Components returning', color: '#00b8e6' },
    { progress: 100, label: 'PERFECTION', description: 'Assembly complete', color: '#00d4ff' },
  ]

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const container = containerRef.current
    const glow = glowRef.current

    if (!section || !video) return

    let currentTime = 0
    let targetTime = 0
    let rafId: number | null = null

    const handleLoadedMetadata = () => {
      setVideoReady(true)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    if (video.readyState >= 2) setVideoReady(true)

    // Smooth video interpolation
    const updateVideo = () => {
      currentTime += (targetTime - currentTime) * 0.15 // Smooth interpolation
      if (video.duration) {
        video.currentTime = currentTime
      }
      rafId = requestAnimationFrame(updateVideo)
    }
    updateVideo()

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=500%',
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
          ease: 'power1.inOut',
          onUpdate: (self) => {
            const progress = self.progress
            setScrollProgress(progress)

            if (progressRef.current) {
              progressRef.current.style.width = `${progress * 100}%`
            }

            if (video.duration) {
              targetTime = video.duration * progress
            }

            let stageIndex = 0
            for (let i = 0; i < stages.length; i++) {
              if (progress * 100 >= stages[i].progress) {
                stageIndex = i
              }
            }
            setCurrentStage(stageIndex)
          },
        },
      })

      // Video container zoom and effects
      if (container) {
        tl.to(container, {
          scale: 1.15,
          duration: 0.3,
          ease: 'power2.out',
        }, 0)
        .to(container, {
          scale: 1.3,
          rotation: 2,
          duration: 0.2,
          ease: 'power2.inOut',
        }, 0.3)
        .to(container, {
          scale: 1.25,
          rotation: -2,
          duration: 0.2,
          ease: 'power2.inOut',
        }, 0.5)
        .to(container, {
          scale: 1.1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out',
        }, 0.7)
      }

      // Glow intensity
      if (glow) {
        tl.to(glow, {
          scale: 2.5,
          opacity: 0.9,
          duration: 0.4,
          ease: 'power2.inOut',
        }, 0)
        .to(glow, {
          scale: 3.5,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        }, 0.4)
        .to(glow, {
          scale: 2,
          opacity: 0.6,
          duration: 0.3,
          ease: 'power2.out',
        }, 0.7)
      }
    }, section)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      ctx.revert()
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen bg-gradient-to-b from-phantom-black via-[#0d0d0d] to-phantom-black overflow-hidden"
    >
      {/* Enhanced Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(#00d4ff 1.5px, transparent 1.5px), linear-gradient(90deg, #00d4ff 1.5px, transparent 1.5px)',
            backgroundSize: '80px 80px',
          }}
        ></div>
      </div>

      {/* Dynamic Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-phantom-blue to-transparent animate-pulse"
          style={{ animation: 'scanline 8s linear infinite' }}>
        </div>
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: `rgba(0, 212, 255, ${Math.random() * 0.4 + 0.1})`,
              animation: `float ${Math.random() * 8 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-30px) translateX(20px); opacity: 0.8; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="h-screen flex flex-col items-center justify-center relative z-10">
        {/* Header */}
        <div className="absolute top-12 md:top-16 left-0 right-0 text-center z-20 px-4">
          <div className="relative inline-block">
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-phantom-white mb-3 tracking-tight-display relative z-10"
              style={{
                textShadow: '0 0 60px rgba(0, 212, 255, 0.8), 0 0 30px rgba(0, 212, 255, 0.6)',
              }}
            >
              INSIDE THE PHANTOM
            </h2>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-phantom-blue/20 to-transparent blur-2xl -z-10"></div>
          </div>
          <p className="text-sm md:text-base text-phantom-silver/90 max-w-xl mx-auto mt-2 font-light tracking-wide">
            Every layer has a purpose. Every detail is engineered.
          </p>
        </div>

        {/* Main Video */}
        <div className="relative w-full h-full flex items-center justify-center px-4">
          <div
            ref={containerRef}
            className="relative w-full max-w-6xl aspect-video transform-gpu will-change-transform"
          >
            {!videoReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-phantom-graphite/20 backdrop-blur-md rounded-2xl z-30">
                <div className="relative w-20 h-20 mb-4">
                  <div className="absolute inset-0 border-4 border-phantom-blue/30 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-phantom-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-phantom-blue text-sm font-semibold tracking-widest">LOADING</p>
              </div>
            )}

            {/* Main Glow */}
            <div className="absolute inset-0 pointer-events-none -z-10">
              <div
                ref={glowRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[100px] transition-all duration-300"
                style={{
                  background: `radial-gradient(circle, ${stages[currentStage].color}50 0%, transparent 70%)`,
                }}
              ></div>
            </div>

            {/* Video */}
            <video
              ref={videoRef}
              className="w-full h-full object-contain transform-gpu"
              muted
              playsInline
              preload="auto"
              style={{
                filter: `drop-shadow(0 0 50px ${stages[currentStage].color}60) brightness(1.05) contrast(1.1)`,
                willChange: 'transform, filter',
              }}
            >
              <source src="/videos/phantom-exploded.mp4" type="video/mp4" />
            </video>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-phantom-blue/40 opacity-50"></div>
            <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-phantom-blue/40 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-phantom-blue/40 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-phantom-blue/40 opacity-50"></div>

            {/* Progress Circle */}
            <div className="absolute top-3 right-3 w-16 h-16 md:w-20 md:h-20 z-20">
              <svg className="transform -rotate-90 w-full h-full">
                <circle cx="50%" cy="50%" r="45%" stroke="#1a1a1a" strokeWidth="2" fill="none" />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 * (1 - scrollProgress)}
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 8px #00d4ff)' }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#00ffff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-phantom-blue font-bold text-sm">
                {Math.round(scrollProgress * 100)}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom UI */}
        <div className="absolute bottom-6 md:bottom-12 left-0 right-0 z-20 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Progress Bar */}
            <div className="w-full h-2 bg-black/40 backdrop-blur-sm rounded-full mb-5 overflow-hidden border border-phantom-blue/20 shadow-lg shadow-phantom-blue/10">
              <div
                ref={progressRef}
                className="h-full relative overflow-hidden"
                style={{
                  width: '0%',
                  background: `linear-gradient(90deg, ${stages[currentStage].color}, #00ffff)`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"
                  style={{ animation: 'shimmer 1.5s ease-in-out infinite', backgroundSize: '200% 100%' }}>
                </div>
              </div>
            </div>

            {/* Stage Card */}
            <div
              className="relative bg-black/60 backdrop-blur-2xl border rounded-xl p-4 md:p-6 shadow-2xl transition-all duration-500"
              style={{
                borderColor: `${stages[currentStage].color}60`,
                boxShadow: `0 0 40px ${stages[currentStage].color}30, inset 0 0 60px ${stages[currentStage].color}05`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-phantom-blue/5 to-transparent rounded-xl"></div>

              <div className="relative text-center space-y-2">
                <div
                  className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase"
                  style={{ color: stages[currentStage].color }}
                >
                  {stages[currentStage].progress}% • STAGE {currentStage + 1}
                </div>
                <div className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight">
                  {stages[currentStage].label}
                </div>
                <div className="text-sm md:text-base text-phantom-silver/70">
                  {stages[currentStage].description}
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {stages.map((stage, index) => (
                  <div
                    key={index}
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{
                      width: index === currentStage ? '48px' : '6px',
                      backgroundColor: index === currentStage ? stage.color : index < currentStage ? `${stage.color}80` : '#2a2a2a',
                      boxShadow: index === currentStage ? `0 0 12px ${stage.color}80` : 'none',
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="text-phantom-silver/30 text-[10px] tracking-[0.3em] mb-1 animate-pulse">SCROLL</div>
          <svg className="w-4 h-4 text-phantom-blue/50 animate-bounce" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}
