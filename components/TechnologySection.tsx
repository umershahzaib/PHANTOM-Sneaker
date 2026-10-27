'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface TechFeature {
  title: string
  description: string
  icon: string
}

const features: TechFeature[] = [
  {
    title: 'ADAPTIVE CUSHIONING',
    description: 'Responsive foam technology that adapts to your stride, providing optimal energy return with every step.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'CARBON-FIBER PLATE',
    description: 'Precision-engineered propulsion system embedded in the midsole for explosive forward motion.',
    icon: 'M13 2L3 14h8l-1 8 10-12h-8l1-8z',
  },
  {
    title: 'ENGINEERED MESH',
    description: 'Strategically placed zones balance breathability, support, and lightweight performance.',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
  },
  {
    title: 'TRACTION SYSTEM',
    description: 'Multi-directional outsole pattern engineered for grip across any surface condition.',
    icon: 'M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z',
  },
]

export default function TechnologySection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const features = gsap.utils.toArray('.tech-feature')

      features.forEach((feature: any, index: number) => {
        gsap.from(feature, {
          scrollTrigger: {
            trigger: feature,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
          opacity: 0,
          x: index % 2 === 0 ? -60 : 60,
          duration: 0.8,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="technology"
      className="relative py-32 bg-phantom-graphite"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-phantom-white mb-6 tracking-tight-display">
            ENGINEERED INNOVATION
          </h2>
          <p className="text-lg md:text-xl text-phantom-silver/80 max-w-2xl mx-auto">
            Advanced materials and precision engineering converge to create
            unprecedented performance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="tech-feature group relative p-8 bg-phantom-black border border-phantom-graphite-light hover:border-phantom-blue transition-all duration-500"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-phantom-graphite-light group-hover:bg-phantom-blue/10 transition-colors duration-300">
                  <svg
                    className="w-8 h-8 text-phantom-blue"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d={feature.icon} />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl font-bold text-phantom-white mb-4 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-phantom-silver/70 leading-relaxed">
                {feature.description}
              </p>

              {/* Accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-phantom-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Engineering Philosophy */}
        <div className="mt-20 p-12 bg-phantom-black border-l-4 border-phantom-blue">
          <blockquote className="text-xl md:text-2xl text-phantom-silver italic leading-relaxed">
            &quot;Every component is tested to the limit. Every material is
            chosen with purpose. The result is not just a sneaker—it&apos;s a
            precision instrument designed for those who demand more.&quot;
          </blockquote>
          <p className="mt-6 text-phantom-blue font-semibold tracking-wide">
            — PHANTOM DESIGN TEAM
          </p>
        </div>
      </div>
    </section>
  )
}
