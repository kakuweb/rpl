import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Miniature dei video YouTube (i.ytimg.com/vi/<id>/maxresdefault.jpg).
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
};

export default nextConfig;
