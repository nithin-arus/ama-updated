/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: standalone' - not compatible with Vercel
  // Vercel uses its own serverless infrastructure

  // Optimize for production
  swcMinify: true,

  // Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig
