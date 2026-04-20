import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Promote Education — India\'s #1 College Discovery & Admission Platform',
    template: '%s | Promote Education'
  },
  description: 'Explore 50,000+ top colleges in India. Compare NIRF rankings, fees, average placements (CTC), and verified student reviews. Get AI-powered college matching and career guidance.',
  keywords: [
    'top colleges in india', 
    'nirf rankings 2024', 
    'college predictor', 
    'engineering colleges admission', 
    'medical colleges neet', 
    'education loan calculator',
    'student reviews india',
    'best mba colleges'
  ],
  authors: [{ name: 'Promote Education Team' }],
  creator: 'Promote Education',
  publisher: 'Promote Education Technologies',
  metadataBase: new URL('https://promoteeducation.in'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Promote Education — Find Your Dream College in India',
    description: "Compare rankings, fees, and placements for 50,000+ institutions. India's most trusted college discovery platform.",
    url: 'https://promoteeducation.in',
    siteName: 'Promote Education',
    images: [
      {
        url: '/og-image.png', // You should create this image
        width: 1200,
        height: 630,
        alt: 'Promote Education Platform',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Promote Education — #1 College Discovery Platform',
    description: 'Find, compare, and apply to India\'s top colleges with verified placement data.',
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Promote Education",
    "url": "https://promoteeducation.in",
    "logo": "https://promoteeducation.in/logo.png",
    "sameAs": [
      "https://facebook.com/promoteeducation",
      "https://twitter.com/promoteedu",
      "https://linkedin.com/company/promoteeducation"
    ],
    "description": "India's leading college discovery and career guidance platform."
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
