// next.config.js

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REVIEW_DATA_PATH: path.join(process.cwd(), 'data', 'reviews')
  },
  // Updated image configuration using remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This matches any hostname. Adjust as needed for security
      }
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
}

module.exports = nextConfig;