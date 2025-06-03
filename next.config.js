/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Essential for serverless deployment
  
  experimental: {
    // External packages that should not be bundled (important for AWS SDK)
    serverComponentsExternalPackages: [
      '@aws-sdk/client-s3',
      '@aws-sdk/s3-request-presigner',
      '@aws-sdk/lib-storage'
    ],
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
