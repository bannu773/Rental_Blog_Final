/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: process.env.NODE_ENV === 'production',
  
  // Generate source maps in development
  webpack: (config, { dev, isServer }) => {
    if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_DEBUG) {
      config.devtool = 'source-map';
    }
    return config;
  },
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  experimental: {
    // Show more detailed error messages
    serverComponentsExternalPackages: [],
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
