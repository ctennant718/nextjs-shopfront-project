/** @type {import('next').NextConfig} */
const {
  STRIPE_PUBLIC_KEY
} = process.env;

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  env: {
    STRIPE_PUBLIC_KEY
  }
};

module.exports = nextConfig
