/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_AWS_ACCESS_KEY_ID: process.env.NEXT_AWS_ACCESS_KEY_ID,
    NEXT_AWS_SECRET_ACCESS_KEY: process.env.NEXT_AWS_SECRET_ACCESS_KEY,
    NEXT_AWS_REGION: process.env.NEXT_AWS_REGION,
    NEXT_AWS_BUCKET_NAME: process.env.NEXT_AWS_BUCKET_NAME,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "s3.amazonaws.com",
      "rentinstant.s3.ca-central-1.amazonaws.com",
      'localhost',
    ]
  },
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
