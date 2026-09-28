"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Check, ArrowRight, Eye, Sparkles } from "lucide-react";
import { recordTemplateView } from "@/lib/analytics";

export interface PopularTemplateItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  cms?: string;
  features: string[];
  imageUrl?: string;
  isPopular?: boolean;
}

const DEFAULT_POPULAR_TEMPLATES: PopularTemplateItem[] = [
  {
    id: "autoelite",
    name: "AutoElite Showroom",
    category: "Otomotif",
    badge: "POPULER DEALER",
    description: "Untuk showroom mobil/motor, rental, dan bengkel dengan katalog unit interaktif & booking test drive WA.",
    cms: "WordPress + Elementor",
    features: [
      "Katalog Filter Unit & Spesifikasi Lengkap",
      "Formulir Booking Test Drive WhatsApp",
      "Gratis Domain Resmi + NVMe Cloud Hosting",
      "Online Cepat Siap Jualan dalam 24 Jam",
    ],
  },
  {
    id: "nusantara",
    name: "Nusantara Corporate Pro",
    category: "Company Profile",
    badge: "COMPANY PROFILE",
    description: "Desain kredibel & profesional untuk PT, CV, kontraktor, dan konsultan dengan profil legalitas perusahaan.",
    cms: "WordPress + Elementor",
    isPopular: true,
    features: [
      "Profil Visi Misi, Legalitas & Tim Ahli",
      "Grid Showcase Layanan & Portofolio Proyek",
      "Formulir Permintaan Penawaran B2B",
      "SEO Terstruktur & Cepat Online 24 Jam",
    ],
  },
  {
    id: "banyumili",
    name: "Banyumili Store",
    category: "Toko Online",
    badge: "TOKO ONLINE WA",
    description: "Toko online ringan tanpa potongan fee per transaksi dengan fitur checkout langsung ke WhatsApp admin.",
    cms: "WooCommerce / WA",
    features: [
      "Katalog Produk, Varian Warna & Ukuran",
      "Checkout Otomatis ke WhatsApp Admin",
      "Gratis Domain Resmi + NVMe Cloud Hosting",
      "Banner Flash Sale & Diskon Promo",
    ],
  },
  {
    id: "kopi-senja",
    name: "Kopi Senja Cafe & Eatery",
    category: "F&B / Resto",
    badge: "F&B / RESTO",
    description: "Showcase visual estetik untuk cafe, resto, kuliner, menu digital scan QR code, dan reservasi meja online.",
    cms: "WordPress + Elementor",
    features: [
      "Katalog Menu Digital & QR Scan",
      "Galeri Foto Suasana & Promo Khusus",
      "Reservasi Meja Cepat via WhatsApp",
      "Integrasi Lokasi & Google Maps",
    ],
  },
];

export default function HomePopularTemplates() {
  const [items, setItems] = useState<PopularTemplateItem[]>(DEFAULT_POPULAR_TEMPLATES);

  useEffect(() => {
    const syncPopularTemplates = () => {
      try {
        const saved = localStorage.getItem("wh_templates_catalog");
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const mapped: PopularTemplateItem[] = parsed.map((t: any, idx: number) => {
              let cat = t.category || "Company Profile";
              if (cat === "Kuliner / Cafe") cat = "F&B / Resto";
              else if (cat === "Klinik & Kesehatan" || cat === "Startup & App" || cat === "Jasa Hukum") cat = "Company Profile";

              const features = [
                "Desain Responsif Mobile & Desktop HD",
                "Integrasi WhatsApp Chat Sales Otomatis",
                "Gratis Domain Resmi + NVMe Cloud Server",
                "Struktur SEO On-Page Siap Naik Google",
              ];

              return {
                id: t.id || `tpl-${idx}`,
                name: t.name || t.title || "Template Bisnis Pro",
                category: cat,
                badge: t.badge || (idx === 1 ? "BEST SELLER" : "SIAP PAKAI"),
                description:
                  t.description ||
                  "Solusi website profesional all-in-one dengan Elementor Builder tanpa biaya desain tambahan.",
                cms: "WordPress + Elementor",
                features,
                isPopular: idx === 1 || t.badge?.toLowerCase().includes("best") || t.badge?.toLowerCase().includes("populer"),
                imageUrl: t.imageUrl,
              };
            });

            setItems(mapped);
            return;
          }
        }
      } catch (e) {}
      setItems(DEFAULT_POPULAR_TEMPLATES);
    };

    syncPopularTemplates();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", syncPopularTemplates);
      window.addEventListener("wh:templates_updated", syncPopularTemplates);
      return () => {
        window.removeEventListener("storage", syncPopularTemplates);
        window.removeEventListener("wh:templates_updated", syncPopularTemplates);
      };
    }
  }, []);

  const gridColsClass =
    items.length === 2
      ? "grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
      : items.length === 1
      ? "grid-cols-1 max-w-md mx-auto"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

  return (
    <div className={`grid ${gridColsClass} items-stretch text-left mb-12`}>
      {items.map((tpl) => {
        const isHighlight = tpl.isPopular;

        return (
          <div
            key={tpl.id}
            className={`bg-[#0F141C] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden ${
              isHighlight
                ? "border-2 border-[#00E599] shadow-[0_0_35px_rgba(0,229,153,0.25)] hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(0,229,153,0.35)] hover:bg-[#121824] lg:-translate-y-2"
                : "border border-[#1B2433] hover:border-[#00E599]/80 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,229,153,0.18)] hover:bg-[#121824]"
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {isHighlight && (
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#00E599]/15 rounded-full blur-2xl pointer-events-none" />
            )}

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] font-bold text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/30 px-2.5 py-1 rounded-full uppercase tracking-wider truncate">
                  {tpl.badge}
                </span>
                <span className="text-[11px] text-[#64748B] font-mono shrink-0">
                  {tpl.cms || "WordPress + Elementor"}
                </span>
              </div>

              <h3 className="text-xl font-black text-white mb-1 group-hover:text-[#00E599] transition-colors line-clamp-1">
                {tpl.name}
              </h3>
              <p className="text-xs text-[#94A3B8] group-hover:text-slate-300 transition-colors mb-6 leading-relaxed line-clamp-3 min-h-[3.75rem]">
                {tpl.description}
              </p>

              <div className="mb-6 p-3.5 rounded-xl bg-[#121824] border border-[#1B2433] group-hover:border-[#00E599]/40 transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00E599]">
                  <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0" />
                  <span>Bebas Biaya Desain Template</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Termasuk di Paket Basic, Pro &amp; Premium
                </div>
              </div>

              <ul className="space-y-3 text-xs text-[#CBD5E1] mb-8 font-medium">
                {tpl.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00E599] shrink-0" />
                    <span className="line-clamp-1">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 mt-auto">
              <Link
                href={`/harga?template=${encodeURIComponent(tpl.name)}#paket-harga`}
                onClick={() => recordTemplateView(tpl.id)}
                className={`w-full font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer group/btn ${
                  isHighlight
                    ? "bg-[#00E599] text-[#090C10] hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)]"
                    : "bg-[#00E599]/15 hover:bg-[#00E599] text-[#00E599] hover:text-[#090C10] border border-[#00E599]/40 hover:border-[#00E599] shadow-sm hover:shadow-[0_0_20px_rgba(0,229,153,0.3)]"
                }`}
              >
                <span>Pilih Desain &amp; Paket</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href={`/harga?template=${encodeURIComponent(tpl.name)}`}
                onClick={() => recordTemplateView(tpl.id)}
                className="w-full bg-[#090C10] hover:bg-[#151D2A] text-slate-400 hover:text-white border border-[#1B2433] text-[11px] font-medium py-2 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-[#00E599]" />
                <span>Lihat Demo &amp; Spek Lengkap</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
