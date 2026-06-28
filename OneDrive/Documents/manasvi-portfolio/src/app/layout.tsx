import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Manasvi Chugh — Product Thinker & AI Builder',
  description: 'B.Tech CS (AI & ML) + BS Management & Data Science @ IIT Madras. Building at the intersection of technology and business. Product Management, AI Engineering, Startups.',
  keywords: [
    'Manasvi Chugh',
    'Product Manager',
    'AI Engineer',
    'IIT Madras',
    'Delhi Technical Campus',
    'Product Internship',
    'AI Internship',
    'Startup',
    'Portfolio',
    'Founders Office',
  ],
  authors: [{ name: 'Manasvi Chugh' }],
  creator: 'Manasvi Chugh',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://manasvichugh.com',
    title: 'Manasvi Chugh — Product Thinker & AI Builder',
    description: 'Building at the intersection of technology and business. Product Management, AI Engineering, Startups.',
    siteName: 'Manasvi Chugh',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Manasvi Chugh Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manasvi Chugh — Product Thinker & AI Builder',
    description: 'Building at the intersection of technology and business.',
    images: ['/og-image.png'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#080808" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
