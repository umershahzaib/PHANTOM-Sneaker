'use client'

import { useEffect, useRef, useState } from 'react'

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {
        setVideoError(true)
      })
    }
  }, [])

  const scrollToExperience = () => {
    const element = document.getElementById('experience')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-phantom-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        {!videoError ? (
          <>
            {!videoLoaded && (
              <div className="absolute inset-0 bg-phantom-graphite animate-pulse z-10"></div>
            )}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
            >
              <source src="/videos/phantom-hero.mp4" type="video/mp4" />
            </video>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-phantom-black via-phantom-graphite to-phantom-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-phantom-blue/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-phantom-black/90 via-phantom-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo/Title */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight-display text-phantom-white drop-shadow-2xl">
            PHANTOM
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-light tracking-wide text-phantom-silver text-balance drop-shadow-lg">
            ENGINEERED FOR WHAT&apos;S NEXT
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-phantom-silver/80 max-w-xl mx-auto">
            Performance beyond the ordinary.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={scrollToExperience}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-phantom-blue text-phantom-black font-semibold tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-phantom-blue/50 w-full sm:w-auto"
              aria-label="Explore the PHANTOM collection"
            >
              <span className="relative z-10">EXPLORE THE COLLECTION</span>
              <div className="absolute inset-0 bg-phantom-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>

            <button
              onClick={() => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-phantom-blue text-phantom-blue font-semibold tracking-wide hover:bg-phantom-blue hover:text-phantom-black transition-all duration-300 hover:shadow-lg hover:shadow-phantom-blue/30 w-full sm:w-auto"
              aria-label="Discover PHANTOM technology"
            >
              DISCOVER THE TECHNOLOGY
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-phantom-blue drop-shadow-lg"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}
