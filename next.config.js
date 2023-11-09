/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
