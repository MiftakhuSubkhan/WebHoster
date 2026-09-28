import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/layanan/website",
        destination: "/harga",
        permanent: true,
      },
      {
        source: "/layanan/domain",
        destination: "/harga",
        permanent: true,
      },
      {
        source: "/layanan/hosting",
        destination: "/harga",
        permanent: true,
      },
      {
        source: "/layanan/email",
        destination: "/harga",
        permanent: true,
      },
      {
        source: "/layanan",
        destination: "/harga",
        permanent: true,
      },
      {
        source: "/paket-harga",
        destination: "/harga",
        permanent: true,
      },
      {
        source: "/paket%20harga",
        destination: "/harga",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
