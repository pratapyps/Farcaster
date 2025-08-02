/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['imagedelivery.net', 'i.imgur.com'],
  },
  env: {
    NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
  }
}

module.exports = nextConfig
