'use client'

import { Suspense, useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Only import on client side
const ClientOnly3DViewer = dynamic(
  () => import('./ThreeDViewerClient'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="relative w-20 h-20 mb-4">
          <div className="absolute inset-0 border-4 border-phantom-blue/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-phantom-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-phantom-blue text-sm font-semibold tracking-widest">INITIALIZING 3D ENGINE</p>
      </div>
    )
  }
)

interface ThreeDViewerProps {
  modelPath: string
  accentColor: string
  lightIntensity: number
}

export default function ThreeDViewer(props: ThreeDViewerProps) {
  return <ClientOnly3DViewer {...props} />
}
