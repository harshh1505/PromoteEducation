/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  turbopack: {},
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cnfmhdlkdjgnaqhngpin.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'assets.promoteducation.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
}

module.exports = nextConfig
