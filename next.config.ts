import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // VPS: standalone dla Docker, Vercel ignoruje
  output: process.env.DOCKER_BUILD ? "standalone" : undefined,
};

export default nextConfig;
