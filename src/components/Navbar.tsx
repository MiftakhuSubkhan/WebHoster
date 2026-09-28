"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function WhatsAppIcon({
  className = "w-4 h-4",
  variant,
}: {
  className?: string;
  variant?: "dark" | "emerald" | "white";
}) {
  const colorClass =
    variant === "white"
      ? "text-white"
      : variant === "emerald"
      ? "text-[#00E599]"
      : variant === "dark"
      ? "text-[#090C10]"
      : "";

  return (
    <svg
      className={`${className} ${colorClass}`.trim()}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Paket Harga", href: "/harga" },
  { label: "Portofolio", href: "/portofolio" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export interface NavbarProps {
  showAnnouncement?: boolean;
  announcementText?: string;
  serviceLinkLabel?: "Layanan" | "Jasa Pembuatan Website";
}

export default function Navbar({
  showAnnouncement = true,
  announcementText = "Beli Template WordPress Siap Pakai Termasuk Gratis Domain (.my.id / .com) + NVMe Hosting — Online dalam 24 Jam!",
  serviceLinkLabel = "Jasa Pembuatan Website",
}: NavbarProps) {
  const pathname = usePathname();
  const [announcementVisible, setAnnouncementVisible] = useState(showAnnouncement);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Do not render public navbar inside the admin dashboard panel or template live previewer
  if (pathname?.startsWith("/wh-panel") || pathname?.startsWith("/templates/preview")) {
    return null;
  }

  const openWhatsApp = (customMessage?: string) => {
    const targetPhone = "6281391123841";
    const defaultMsg =
      "Halo WebHoster.co.id, saya tertarik memesan Template WordPress siap pakai all-in-one. Mohon informasi katalog dan cara pemesanannya.";
    const text = encodeURIComponent(customMessage || defaultMsg);
    window.open(`https://wa.me/${targetPhone}?text=${text}`, "_blank");
  };

  const isRouteActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname.startsWith(href);
  };

  const navItems = NAV_ITEMS;

  return (
    <div className="w-full">
      {announcementVisible && (
        <div className="bg-gradient-to-r from-[#00E599] via-[#00C882] to-[#00E599] text-[#090C10] px-4 py-2 text-xs font-bold text-center relative z-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,153,0.3)]">
          <span className="hidden sm:inline">⚡</span>
          <span className="truncate max-w-[85vw] sm:max-w-none">{announcementText}</span>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#090C10]/70 hover:text-[#090C10] p-1 rounded transition cursor-pointer"
            aria-label="Tutup Pengumuman"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-[#090C10]/98 border-b border-[#1B2433]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#00E599] flex items-center justify-center text-[#090C10] font-black text-xl shadow-[0_0_20px_rgba(0,229,153,0.4)] group-hover:scale-105 transition-transform">
              W
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-black text-white tracking-tight">WebHoster</span>
              <span className="text-sm font-bold text-[#00E599]">.co.id</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium">
            {navItems.map((item) => {
              const active = isRouteActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors duration-200 py-1 relative ${active
                    ? "text-[#00E599] font-bold"
                    : "text-[#94A3B8] hover:text-white"
                    }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00E599] rounded-full shadow-[0_0_8px_rgba(0,229,153,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => openWhatsApp()}
              className="bg-[#00E599] text-[#090C10] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#090C10]" />
              <span>Konsultasi</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#94A3B8] hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0F141C] border-b border-[#1B2433] px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              const active = isRouteActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition ${active
                    ? "bg-[#00E599]/15 text-[#00E599] font-bold border border-[#00E599]/30"
                    : "text-[#94A3B8] hover:text-white hover:bg-[#121824]"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp();
                }}
                className="w-full bg-[#00E599] text-[#090C10] font-bold text-sm py-3 rounded-xl hover:bg-[#00C882] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,153,0.3)] cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#090C10]" />
                <span>Konsultasi Sekarang</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
