import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Our Mother of Perpetual Help Chaplaincy | AEFUTHA 1',
  description: 'Welcome to Our Mother of Perpetual Help Chaplaincy, AEFUTHA 1. Join us for Mass, devotions, and community fellowship. Daily readings, saints, and Catholic resources.',
  keywords: 'Catholic Church, AEFUTHA, Our Mother of Perpetual Help, Mass Times, Catholic Community, Daily Readings, Saints',
  authors: [{ name: 'Our Mother of Perpetual Help Chaplaincy' }],
  openGraph: {
    title: 'Our Mother of Perpetual Help Chaplaincy | AEFUTHA 1',
    description: 'Welcome to our Catholic community. Daily Mass, readings, saints, and spiritual resources.',
    url: 'https://your-domain.com',
    siteName: 'Our Mother of Perpetual Help Chaplaincy',
    images: [
      {
        url: 'https://images.pexels.com/photos/208271/pexels-photo-208271.jpeg',
        width: 1200,
        height: 630,
        alt: 'Our Mother of Perpetual Help Chaplaincy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Mother of Perpetual Help Chaplaincy | AEFUTHA 1',
    description: 'Welcome to our Catholic community. Daily Mass, readings, saints, and spiritual resources.',
    images: ['https://images.pexels.com/photos/208271/pexels-photo-208271.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-church-background text-church-text font-body">
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1F2937',
                color: '#FFFFFF',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}