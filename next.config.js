/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    SITE_URL: process.env.SITE_URL,
  },
}

module.exports = nextConfig