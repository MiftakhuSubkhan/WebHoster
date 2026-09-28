import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webhoster.co.id"),
  title: {
    default: "WebHoster.co.id - Jasa Pembuatan Website, Domain & Cloud Hosting Cepat",
    template: "%s | WebHoster.co.id",
  },
  description:
    "Solusi all-in-one pembuatan website profesional, domain resmi (.co.id / .com), dan high-speed NVMe cloud hosting dengan garansi 99.9% uptime untuk UMKM dan korporat.",
  keywords: [
    "jasa pembuatan website",
    "web development indonesia",
    "domain co id murah",
    "cloud hosting nvme cepat",
    "webhoster",
    "company profile website",
    "template wordpress siap pakai",
  ],
  authors: [{ name: "WebHoster Indonesia" }],
  creator: "WebHoster.co.id",
  publisher: "WebHoster Indonesia",
  openGraph: {
    title: "WebHoster.co.id - Website Cepat & Server Tangguh",
    description:
      "Bangun kredibilitas bisnis Anda dengan website profesional, gratis domain resmi, dan cloud server berkecepatan tinggi.",
    url: "https://webhoster.co.id",
    siteName: "WebHoster.co.id",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebHoster.co.id - Jasa Pembuatan Website & Cloud Hosting Cepat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebHoster.co.id - Website Cepat & Server Tangguh",
    description:
      "Bangun kredibilitas bisnis Anda dengan website profesional, gratis domain resmi, dan cloud server berkecepatan tinggi.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} dark`} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="bg-[#090C10] text-[#F1F5F9] font-sans antialiased selection:bg-[#00E599] selection:text-[#090C10] min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
