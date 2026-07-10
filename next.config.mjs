/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Prevents custom image hosting billing during testing
  },
};

export default nextConfig;
