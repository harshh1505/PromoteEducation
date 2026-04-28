/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Fallback to polling in development to avoid EMFILE watcher limits on macOS.
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      }
    }
    return config
  },
}

module.exports = nextConfig
