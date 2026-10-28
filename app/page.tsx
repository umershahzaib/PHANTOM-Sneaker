'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import ExperienceSection from '@/components/ExperienceSection'
import CollectionSection from '@/components/CollectionSection'
import TechnologySection from '@/components/TechnologySection'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <main className="min-h-screen bg-phantom-black">
      <Navigation />
      <HeroSection />
      <ExperienceSection />
      <CollectionSection />
      <TechnologySection />
      <Footer />
    </main>
  )
}
