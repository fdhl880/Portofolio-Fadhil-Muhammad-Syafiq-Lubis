/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
