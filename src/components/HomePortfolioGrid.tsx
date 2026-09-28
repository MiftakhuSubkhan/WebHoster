"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { recordTemplateView } from "@/lib/analytics";
function ArrowUpRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function ImageIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

export interface PortfolioItem {
  id: string;
  name: string;
  category: string;
  price?: string;
  badge?: string;
  description?: string;
  imageUrl?: string;
  demoUrl?: string;
}

const DEFAULT_HOME_TEMPLATES: PortfolioItem[] = [
  {
    id: "tpl-1",
    name: "Apex Corporate NVMe",
    category: "Company Profile",
    badge: "Populer",
    description: "Website profil korporat modern dengan arsitektur multi-layer, animasi interaktif, dan performa tinggi.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=380&auto=format&fit=crop&q=70",
  },
  {
    id: "tpl-2",
    name: "AutoElite Showroom & Garage",
    category: "Otomotif",
    badge: "Dealer Pro",
    description: "Katalog showroom mobil & motor interaktif, rincian spesifikasi mesin, dan booking test drive WhatsApp.",
    imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=380&auto=format&fit=crop&q=70",
  },
  {
    id: "tpl-3",
    name: "Nusantara Corporate Pro",
    category: "Company Profile",
    badge: "Best Seller",
    description: "Desain elegan dan profesional untuk PT, CV, kontraktor & firma konsultan terpercaya.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=380&auto=format&fit=crop&q=70",
  },
  {
    id: "tpl-4",
    name: "Banyumili Store & Catalog",
    category: "Toko Online",
    badge: "Toko WA",
    description: "Toko online ringan katalog produk lengkap tanpa fee dengan checkout langsung ke WhatsApp admin.",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=380&auto=format&fit=crop&q=70",
  },
];

export default function HomePortfolioGrid() {
  const [items, setItems] = useState<PortfolioItem[]>(DEFAULT_HOME_TEMPLATES);

  useEffect(() => {
    const syncTemplates = () => {
      try {
        const saved = localStorage.getItem("wh_templates_catalog");
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const mapped = parsed.map((t: any) => {
              let cat = t.category;
              if (cat === "Kuliner / Cafe") cat = "F&B / Resto";
              else if (cat === "Klinik & Kesehatan" || cat === "Startup & App" || cat === "Jasa Hukum") cat = "Company Profile";
              return { ...t, category: cat };
            });
            setItems(mapped);
            return;
          }
        }
      } catch (e) { }
      setItems(DEFAULT_HOME_TEMPLATES);
    };

    syncTemplates();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", syncTemplates);
      window.addEventListener("wh:templates_updated", syncTemplates);
      return () => {
        window.removeEventListener("storage", syncTemplates);
        window.removeEventListener("wh:templates_updated", syncTemplates);
      };
    }
  }, []);

  const gridColsClass =
    items.length === 2
      ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
      : items.length === 1
      ? "grid-cols-1 max-w-md mx-auto"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-6 ${gridColsClass}`}>
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/harga?template=${encodeURIComponent(item.name || item.id)}#paket-harga`}
          onClick={() => recordTemplateView(item.id)}
          className="bg-[#0F141C] border border-[#1B2433] rounded-3xl overflow-hidden hover:-translate-y-2 hover:border-[#00E599] hover:shadow-[0_20px_45px_rgba(0,229,153,0.22)] hover:bg-[#121824] transition-all duration-300 group flex flex-col relative"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          <div className="relative aspect-[16/10] bg-[#090C10] overflow-hidden border-b border-[#1B2433]">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                loading="lazy"
                decoding="async"
                width={380}
                height={238}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#64748B]">
                <ImageIcon className="w-8 h-8 opacity-40 mb-1" />
                <span className="text-[11px]">Template Preview</span>
              </div>
            )}

            <div className="absolute top-3 left-3 bg-[#090C10]/85 backdrop-blur-md text-[#00E599] text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-[#00E599]/30">
              {item.category}
            </div>

            {item.badge && (
              <div className="absolute top-3 right-3 bg-[#090C10]/85 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg border border-[#1B2433]">
                {item.badge}
              </div>
            )}
          </div>

          <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
            <div>
              <h4 className="text-base sm:text-lg font-black text-white group-hover:text-[#00E599] transition-colors line-clamp-1 mb-2">
                {item.name}
              </h4>

              {item.description ? (
                <p className="text-xs text-[#94A3B8] group-hover:text-slate-300 transition-colors line-clamp-3 leading-relaxed min-h-[3.75rem]">
                  {item.description}
                </p>
              ) : (
                <p className="text-xs text-[#64748B] italic min-h-[3.75rem] flex items-center">
                  Template WordPress siap pakai dengan performa cepat dan responsif.
                </p>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-[#1B2433] flex items-center justify-between">
              <span className="text-xs font-bold text-[#00E599] group-hover:underline flex items-center gap-1">
                <span>Lihat Detail Template</span>
              </span>

              <div className="w-8 h-8 rounded-full bg-[#090C10] border border-[#1B2433] group-hover:border-[#00E599] group-hover:bg-[#00E599] group-hover:text-[#090C10] group-hover:scale-110 flex items-center justify-center text-[#94A3B8] transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
