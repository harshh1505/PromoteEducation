/** @type {import('next').NextConfig} */
const nextConfig = {
  // Empty turbopack config explicitly opts into Turbopack and silences
  // the "custom webpack config detected" warning on Vercel / Next.js 16.
  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
