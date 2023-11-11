/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : 'undefined',
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://staging.haku.underoot.dev/api/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
