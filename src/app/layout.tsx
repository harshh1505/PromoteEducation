import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Promote Education — India\'s #1 College Discovery & Admission Platform',
    template: '%s | Promote Education'
  },
  description: 'Explore 50,000+ top colleges in India. Compare NIRF rankings, fees, average placements (CTC), and verified student reviews. Get AI-powered college matching and career guidance.',
  keywords: [
    'top colleges in india 2025', 
    'nirf rankings 2025', 
    'best engineering colleges 2025',
    'medical colleges nirf ranking',
    'iit bombay ranking 2025',
    'university ranking india',
    'college admission guide 2026',
    'education loan calculator india'
  ],
  authors: [{ name: 'Promote Education Team' }],
  creator: 'Promote Education',
  publisher: 'Promote Education Technologies',
  metadataBase: new URL('https://promoteducation.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Promote Education — Find Your Dream College in India',
    description: "Compare rankings, fees, and placements for 50,000+ institutions. India's most trusted college discovery platform.",
    url: 'https://promoteducation.com',
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
    "url": "https://promoteducation.com",
    "logo": "https://promoteducation.com/logo.png",
    "sameAs": [
      "https://facebook.com/promoteeducation",
      "https://twitter.com/promoteedu",
      "https://linkedin.com/company/promoteeducation"
    ],
    "description": "India's premier institution discovery platform. Explore NIRF 2025 rankings, fees, and verified placements for 50,000+ top engineering, medical, and management colleges.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New Delhi",
      "addressCountry": "IN"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://promoteducation.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K2MX6SP7');`,
          }}
        />
        {/* End Google Tag Manager */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="overflow-x-hidden font-sans antialiased text-slate-900" style={{ fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif' }}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K2MX6SP7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  )
}
