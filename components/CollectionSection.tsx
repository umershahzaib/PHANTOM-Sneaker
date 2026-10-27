'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
}

const products: Product[] = [
  {
    id: 'phantom-vortex',
    name: 'PHANTOM VORTEX',
    description: 'Futuristic design meets cutting-edge engineering. Premium showcase edition.',
    price: '$349',
    image: '/images/phantom-vortex.png',
  },
  {
    id: 'phantom-elite',
    name: 'PHANTOM ELITE',
    description: 'Floating innovation. Advanced cushioning technology for ultimate performance.',
    price: '$399',
    image: '/images/phantom-elite.png',
  },
]

export default function CollectionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.product-card')

      cards.forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
          },
          opacity: 0,
          y: 60,
          duration: 0.8,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative py-32 bg-phantom-black"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-phantom-white mb-6 tracking-tight-display">
            THE COLLECTION
          </h2>
          <p className="text-lg md:text-xl text-phantom-silver/80 max-w-2xl mx-auto">
            Two exclusive models. Engineered for excellence.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group relative bg-phantom-graphite border border-phantom-graphite-light overflow-hidden hover:border-phantom-blue transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-96 bg-phantom-graphite overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-phantom-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Blue accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-phantom-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-phantom-white mb-2 tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-phantom-silver/70 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-phantom-graphite-light">
                  <span className="text-2xl font-bold text-phantom-blue">
                    {product.price}
                  </span>
                  <button className="px-6 py-2 border border-phantom-blue text-phantom-blue text-sm font-semibold tracking-wide hover:bg-phantom-blue hover:text-phantom-black transition-all duration-300">
                    EXPLORE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
