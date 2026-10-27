'use client'

import { useState, useEffect } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-phantom-black/95 backdrop-blur-lg border-b border-phantom-graphite-light shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl sm:text-2xl font-display font-bold tracking-tight-display text-phantom-white hover:text-phantom-blue transition-colors"
              aria-label="PHANTOM Home"
            >
              PHANTOM
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('collection')}
                className="text-sm font-medium tracking-wide text-phantom-silver hover:text-phantom-blue transition-colors relative group"
              >
                COLLECTION
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-phantom-blue group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => scrollToSection('technology')}
                className="text-sm font-medium tracking-wide text-phantom-silver hover:text-phantom-blue transition-colors relative group"
              >
                TECHNOLOGY
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-phantom-blue group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="text-sm font-medium tracking-wide text-phantom-silver hover:text-phantom-blue transition-colors relative group"
              >
                EXPERIENCE
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-phantom-blue group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-phantom-silver hover:text-phantom-blue transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-phantom-black/95 backdrop-blur-lg"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="relative h-full flex flex-col items-center justify-center space-y-8 px-6">
            <button
              onClick={() => scrollToSection('collection')}
              className="text-2xl font-display font-bold text-phantom-white hover:text-phantom-blue transition-colors"
            >
              COLLECTION
            </button>
            <button
              onClick={() => scrollToSection('technology')}
              className="text-2xl font-display font-bold text-phantom-white hover:text-phantom-blue transition-colors"
            >
              TECHNOLOGY
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-2xl font-display font-bold text-phantom-white hover:text-phantom-blue transition-colors"
            >
              EXPERIENCE
            </button>
          </div>
        </div>
      )}
    </>
  )
}
