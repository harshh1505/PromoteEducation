/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: 'output: standalone' must NOT be set when deploying to Vercel.
  // Vercel manages its own output format. standalone is for Docker/self-hosted only.

  // Tell Turbopack exactly where the workspace root is to avoid "multiple lockfiles" warnings.
  turbopack: {
    root: __dirname,
  },

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
