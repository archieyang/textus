import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    SITE_URL: process.env.SITE_URL,
  },
};

export default nextConfig;
