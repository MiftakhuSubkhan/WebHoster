"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide public footer on admin workspace panel and template live previewer
  if (pathname?.startsWith("/wh-panel") || pathname?.startsWith("/templates/preview")) {
    return null;
  }

  return (
    <footer className="bg-[#090C10] border-t border-[#1B2433] pt-16 pb-12 text-xs text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1B2433]">
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00E599] flex items-center justify-center text-[#090C10] font-black text-base">
                W
              </div>
              <div className="flex items-baseline">
                <span className="text-lg font-extrabold text-white">WebHoster</span>
                <span className="text-xs font-bold text-[#00E599]">.co.id</span>
              </div>
            </Link>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              Pusat template WordPress siap pakai all-in-one untuk UMKM &amp; bisnis. Sudah termasuk domain resmi (.my.id / .com), email bisnis, panduan Elementor, dan NVMe cloud hosting super cepat dengan garansi 99.9% uptime.
            </p>
            <div className="flex items-start gap-2 text-xs text-[#94A3B8] pt-1">
              <svg className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Jalan Ngadinegaran Blok MJ III No. 144, Mantrijeron, Yogyakarta</span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Menu</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#00E599] transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/harga" className="hover:text-[#00E599] transition">
                  Paket Harga
                </Link>
              </li>
              <li>
                <Link href="/portofolio" className="hover:text-[#00E599] transition">
                  Portofolio
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-[#00E599] transition">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-[#00E599] transition">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Layanan</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/harga" className="hover:text-[#00E599] transition">
                  Template WordPress Siap Pakai
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hubungi Kami</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-xs">
                <svg className="w-3.5 h-3.5 text-[#00E599]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a
                  href="https://wa.me/6281391123841"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#00E599] transition font-mono"
                >
                  0813-9112-3841
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs">
                <svg className="w-3.5 h-3.5 text-[#00E599]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:halo@webhoster.co.id" className="hover:text-[#00E599] transition">
                  halo@webhoster.co.id
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs">
                <svg className="w-3.5 h-3.5 text-[#00E599]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Yogyakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#64748B]">
            © 2026{" "}
            <Link href="/" className="text-[#00E599] hover:underline">
              WebHoster.co.id
            </Link>
            . Hak Cipta Dilindungi.
          </div>

          <div className="flex items-center gap-4 text-[#64748B]">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-[#00E599] transition p-1.5 rounded-full hover:bg-[#1B2433]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-[#00E599] transition p-1.5 rounded-full hover:bg-[#1B2433]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-[#00E599] transition p-1.5 rounded-full hover:bg-[#1B2433]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-[#00E599] transition p-1.5 rounded-full hover:bg-[#1B2433]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
