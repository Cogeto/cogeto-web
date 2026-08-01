import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The old /how-it-works page became the five-step section on the
      {
        source: "/case-studies/automotive",
        destination: "/case-studies/automotive-paint",
        permanent: true,
      },
      {
        source: "/how-it-works",
        destination: "/#how-it-works",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
