import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PHANTOM — Engineered for What\'s Next',
  description: 'Premium performance sneakers. Futuristic design meets cutting-edge engineering. Experience the future of footwear.',
  keywords: 'sneakers, performance footwear, luxury sneakers, athletic shoes, phantom sneakers, premium footwear',
  authors: [{ name: 'PHANTOM' }],
  openGraph: {
    title: 'PHANTOM — Engineered for What\'s Next',
    description: 'Premium performance sneakers. Futuristic design meets cutting-edge engineering.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PHANTOM — Engineered for What\'s Next',
    description: 'Premium performance sneakers. Futuristic design meets cutting-edge engineering.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#00d4ff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
