/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@aws-sdk/client-s3'],
  },
 
  env: {
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    REGION: process.env.REGION,
    BUCKET_NAME: process.env.BUCKET_NAME,
    CUSTOM_DEBUG: process.env.NODE_ENV === 'development' ? 'true' : 'false',
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "s3.amazonaws.com",
      "rentinstant.s3.ca-central-1.amazonaws.com"
    ]
  },
  fallback: false,
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
