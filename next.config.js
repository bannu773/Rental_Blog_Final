/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "s3.amazonaws.com",
      "rentinstant.s3.ca-central-1.amazonaws.com"
    ]
  }
}

module.exports = nextConfig
