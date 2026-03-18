import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/equipe", destination: "/sobre", permanent: true }];
  },
};

export default nextConfig;
