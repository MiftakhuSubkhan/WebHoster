"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Server,
  CheckCircle2,
  Check,
  ChevronDown,
  Sparkles,
  Eye,
  Smartphone,
  Laptop,
  Car,
  Building2,
  ShoppingBag,
  Palmtree,
  UtensilsCrossed,
  Wrench,
  Video,
  X,
  ArrowDown,
  ArrowRight,
  ShieldCheck,
  Search,
} from "lucide-react";
import { recordTemplateView } from "@/lib/analytics";

function WhatsAppIcon({
  className = "w-5 h-5",
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
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export interface TemplateItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  badge: string;
  desc: string;
  cms: string;
  features: string[];
  gradientTheme: string;
  slug: string;
  accentColor: string;
  imageUrl?: string;
  price?: string;
  demoUrl?: string;
}

export interface PricingPlan {
  id: string;
  badgeText: string;
  badgeColorClass: string;
  title: string;
  priceLabel: string;
  price: string;
  renewalPrice: string;
  renewalText: string;
  savingsBadge: string;
  featured?: boolean;
  ctaText: string;
  orderUrl: string;
  featureCategories: {
    categoryTitle: string;
    items: string[];
  }[];
}

const DEFAULT_TEMPLATES: TemplateItem[] = [
  {
    id: "autoelite",
    title: "AutoElite Showroom & Garage",
    category: "automotive",
    categoryLabel: "Otomotif",
    badge: "OTOMOTIF DEALER",
    desc: "Template modern showroom mobil/motor baru & bekas, katalog unit interaktif, rincian spesifikasi mesin, dan formulir booking test drive WhatsApp.",
    cms: "WordPress + Elementor Pro",
    features: [
      "Listing Unit Kendaraan",
      "Filter Tipe & Rentang Harga",
      "Elementor Drag & Drop",
      "Tombol Direct WA Sales",
    ],
    gradientTheme: "from-blue-600/30 via-slate-900 to-[#0F141C]",
    accentColor: "#3B82F6",
    slug: "autoelite-showroom",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&auto=format&fit=crop&q=70",
    price: "Rp 499.000",
  },
  {
    id: "nusantara-corp",
    title: "Nusantara Corporate Pro",
    category: "company",
    categoryLabel: "Company Profile",
    badge: "COMPANY PRO",
    desc: "Desain elegan dan profesional untuk PT, CV, kontraktor, firma hukum, serta lembaga konsultan dengan struktur legalitas yang kredibel.",
    cms: "WordPress + Elementor Pro",
    features: [
      "Struktur Standar CV / PT",
      "Halaman Legalitas & Visi",
      "Skor Google PageSpeed 95+",
      "Form Penawaran Kerjasama",
    ],
    gradientTheme: "from-emerald-600/30 via-slate-900 to-[#0F141C]",
    accentColor: "#00E599",
    slug: "nusantara-corporate",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=480&auto=format&fit=crop&q=70",
    price: "Rp 499.000",
  },
  {
    id: "karya-abadi",
    title: "Karya Abadi Tour & Rental",
    category: "travel",
    categoryLabel: "Travel & Tour",
    badge: "TRAVEL & TOUR",
    desc: "Tata letak paket liburan, open trip, rental armada kendaraan, rincian itinerary harian, dan sistem reservasi jadwal cepat.",
    cms: "WordPress + Elementor Pro",
    features: [
      "Display Paket Wisata & Trip",
      "Galeri Armada Transportasi",
      "Formulir Reservasi Jadwal",
      "Integrasi Google Maps",
    ],
    gradientTheme: "from-cyan-600/30 via-slate-900 to-[#0F141C]",
    accentColor: "#06B6D4",
    slug: "karya-abadi-tour",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=480&auto=format&fit=crop&q=70",
    price: "Rp 449.000",
  },
  {
    id: "banyumili-store",
    title: "Banyumili Store & Catalog",
    category: "ecommerce",
    categoryLabel: "Toko Online",
    badge: "TOKO ONLINE WA",
    desc: "Toko online ringan dan cepat dengan katalog produk tanpa ribet, tombol checkout langsung ke WhatsApp admin tanpa biaya potongan gateway.",
    cms: "WordPress + WA Checkout",
    features: [
      "Display Produk Modern",
      "Checkout Direct WA",
      "Manajemen Kategori",
      "Optimasi Gambar",
    ],
    gradientTheme: "from-amber-600/30 via-slate-900 to-[#0F141C]",
    accentColor: "#F59E0B",
    slug: "banyumili-store",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=480&auto=format&fit=crop&q=70",
    price: "Rp 599.000",
  },
  {
    id: "kopi-senja",
    title: "Kopi Senja Cafe & Eatery",
    category: "fnb",
    categoryLabel: "F&B / Resto",
    badge: "F&B / RESTO",
    desc: "Showcase visual estetik untuk coffee shop, resto, bakery, menu digital scan QR code, reservasi meja, dan petunjuk arah Google Maps.",
    cms: "WordPress + Elementor Pro",
    features: [
      "Menu Digital Support QR",
      "Showcase Menu Andalan",
      "Peta Lokasi & Cabang",
      "Formulir Reservasi Meja",
    ],
    gradientTheme: "from-orange-600/30 via-slate-900 to-[#0F141C]",
    accentColor: "#F97316",
    slug: "kopi-senja-cafe",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=480&auto=format&fit=crop&q=70",
    price: "Rp 399.000",
  },
  {
    id: "prima-mandiri",
    title: "Prima Mandiri Konsultan",
    category: "company",
    categoryLabel: "Company Profile",
    badge: "KONSULTAN & JASA",
    desc: "Arsitektur informasi terstruktur untuk jasa konsultan keuangan, konsultan pajak, perizinan usaha, serta lembaga pelatihan profesional.",
    cms: "WordPress + Elementor Pro",
    features: [
      "Desain Eksklusif Jasa & Konsultan",
      "Profil Tim Ahli & Sertifikasi",
      "Struktur SEO On-Page Ready",
      "Tampilan 100% Responsif di Semua Device",
    ],
    gradientTheme: "from-purple-600/30 via-slate-900 to-[#0F141C]",
    accentColor: "#A855F7",
    slug: "prima-mandiri-konsultan",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&auto=format&fit=crop&q=70",
    price: "Rp 549.000",
  },
  {
    id: "medika-clinic",
    title: "Medika Health Clinic & Care",
    category: "company",
    categoryLabel: "Klinik & Medis",
    badge: "KLINIK DOKTER",
    desc: "Landing page konversi tinggi untuk klinik kesehatan, jadwal dokter spesialis, fasilitas poli, dan janji temu WhatsApp terintegrasi.",
    cms: "WordPress + Elementor Pro",
    features: [
      "Jadwal Dokter & Reservasi",
      "Daftar Layanan Medis & Poli",
      "Integrasi WhatsApp Janji Temu",
      "Peta Lokasi Fasilitas Klinik",
    ],
    gradientTheme: "from-teal-600/30 via-slate-900 to-[#0F141C]",
    accentColor: "#14B8A6",
    slug: "medika-health-clinic",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=480&auto=format&fit=crop&q=70",
    price: "Rp 549.000",
  },
  {
    id: "urban-glam",
    title: "Urban Glam Fashion Hub",
    category: "ecommerce",
    categoryLabel: "Toko Online",
    badge: "TRENDING STORE",
    desc: "Toko online pakaian & aksesoris trendy dengan filter ukuran/warna, galeri lookbook lookbook HD, dan checkout cepat via WhatsApp CS.",
    cms: "WordPress + WA Checkout",
    features: [
      "Filter Ukuran & Varian Warna",
      "Galeri Lookbook Interaktif",
      "Kalkulasi Belanja Otomatis",
      "Tombol Direct Order WhatsApp",
    ],
    gradientTheme: "from-pink-600/30 via-slate-900 to-[#0F141C]",
    accentColor: "#EC4899",
    slug: "urban-glam-fashion",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=480&auto=format&fit=crop&q=70",
    price: "Rp 599.000",
  },
  {
    id: "grand-royal",
    title: "Grand Royal Residence & Property",
    category: "company",
    categoryLabel: "Properti & Cluster",
    badge: "REAL ESTATE",
    desc: "Website showcase perumahan cluster, denah rumah 3D, brosur e-katalog unduh instan, dan kalkulator simulasi KPR sederhana.",
    cms: "WordPress + Elementor Pro",
    features: [
      "Showcase Tipe Unit & Denah 3D",
      "Download Brosur PDF Otomatis",
      "Simulasi KPR & Estimasi Cicilan",
      "Formulir Jadwal Survey Lokasi",
    ],
    gradientTheme: "from-amber-600/30 via-slate-900 to-[#0F141C]",
    accentColor: "#D97706",
    slug: "grand-royal-residence",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=480&auto=format&fit=crop&q=70",
    price: "Rp 599.000",
  },
  {
    id: "explore-borneo",
    title: "Explore Borneo Wild Adventure",
    category: "travel",
    categoryLabel: "Travel & Tour",
    badge: "OPEN TRIP",
    desc: "Portal paket wisata alam, ecotourism, sewa pemandu lokal, dan paket open trip nusantara dengan jadwal keberangkatan realtime.",
    cms: "WordPress + Elementor Pro",
    features: [
      "Jadwal Open Trip Realtime",
      "Rincian Paket & Perlengkapan",
      "Galeri Petualangan Wisatawan",
      "Booking Online & Down Payment",
    ],
    gradientTheme: "from-emerald-600/30 via-slate-900 to-[#0F141C]",
    accentColor: "#10B981",
    slug: "explore-borneo-adventure",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=480&auto=format&fit=crop&q=70",
    price: "Rp 449.000",
  },
  {
    id: "apex-motorsport",
    title: "Apex Motorsport & Tuning Hub",
    category: "automotive",
    categoryLabel: "Otomotif",
    badge: "BENGKEL RACING",
    desc: "Profil bengkel modern modifikasi mobil, dyno test, paket tune up performa mesin, dan katalog aksesoris aftermarket terlengkap.",
    cms: "WordPress + Elementor Pro",
    features: [
      "Paket Dyno & Servis Berkala",
      "Katalog Suku Cadang & Oli",
      "Booking Antrean Service WA",
      "Galeri Modifikasi Portofolio",
    ],
    gradientTheme: "from-red-600/30 via-slate-900 to-[#0F141C]",
    accentColor: "#EF4444",
    slug: "apex-motorsport-tuning",
    imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=480&auto=format&fit=crop&q=70",
    price: "Rp 499.000",
  },
  {
    id: "dapoer-nusantara",
    title: "Dapoer Nusantara Resto & Catering",
    category: "fnb",
    categoryLabel: "F&B / Resto",
    badge: "CATERING PRO",
    desc: "Katalog prasmanan catering pesta, nasi box kantor, rincian menu tradisional nusantara, dan pemesanan paket hajatan instan.",
    cms: "WordPress + Elementor Pro",
    features: [
      "Paket Nasi Box & Prasmanan",
      "Pilihan Menu Kustom Hajatan",
      "Kalkulator Estimasi Porsi",
      "Pemesanan Cepat via WhatsApp",
    ],
    gradientTheme: "from-yellow-600/30 via-slate-900 to-[#0F141C]",
    accentColor: "#EAB308",
    slug: "dapoer-nusantara-catering",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=480&auto=format&fit=crop&q=70",
    price: "Rp 399.000",
  },
];

const DEFAULT_PRICING_PLANS: PricingPlan[] = [
  {
    id: "basic",
    badgeText: "🏷 Promo Terbatas",
    badgeColorClass: "bg-red-500/15 text-red-400 border border-red-500/30",
    title: "Basic",
    priceLabel: "Harga Tahun Pertama",
    price: "Rp 900.000",
    renewalPrice: "Rp 700.000/th",
    renewalText: "Perpanjangan th ke-2 dst",
    savingsBadge: "Hemat Rp200rb",
    ctaText: "Pilih Paket Basic →",
    orderUrl: "https://acc.jogjahost.co.id/index.php?rp=/store/web-design-sales-mobil/basic",
    featureCategories: [
      {
        categoryTitle: "FITUR UTAMA",
        items: [
          "2GB Web Space",
          "Integrasi WhatsApp",
          "Integrasi Google Maps",
          "Desain Responsif (HP/PC)",
        ],
      },
      {
        categoryTitle: "DOMAIN & HOSTING",
        items: [
          "Free Domain .com / .id Selama Berlangganan",
          "Free Hosting Selama Berlangganan",
        ],
      },
      {
        categoryTitle: "AKSES & KONTROL PANEL",
        items: [
          "Akses cPanel (Opsional)",
          "Akses Dashboard Admin Web",
        ],
      },
      {
        categoryTitle: "OPTIMASI & TRACKING",
        items: [
          "SEO On Page Full + Schema",
          "Google Analytics & Search",
        ],
      },
    ],
  },
  {
    id: "pro",
    badgeText: "⭐ Paling Direkomendasikan",
    badgeColorClass: "bg-[#00E599] text-[#090C10] font-black shadow-[0_0_15px_rgba(0,229,153,0.4)]",
    title: "Pro",
    priceLabel: "Harga Tahun Pertama",
    price: "Rp 1.300.000",
    renewalPrice: "Rp 900.000/th",
    renewalText: "Perpanjangan th ke-2 dst",
    savingsBadge: "Hemat Rp400rb",
    featured: true,
    ctaText: "Pesan Paket Pro Sekarang →",
    orderUrl: "https://acc.jogjahost.co.id/index.php?rp=/store/web-design-sales-mobil/pro",
    featureCategories: [
      {
        categoryTitle: "FITUR UTAMA",
        items: [
          "10GB Web Space",
          "Integrasi WhatsApp",
          "Integrasi Google Maps",
          "Desain Responsif (HP/PC)",
        ],
      },
      {
        categoryTitle: "DOMAIN & HOSTING",
        items: [
          "Free Domain .com / .id Selama Berlangganan",
          "Free Hosting Selama Berlangganan",
        ],
      },
      {
        categoryTitle: "AKSES & KONTROL PANEL",
        items: [
          "Akses cPanel (Opsional)",
          "Akses Dashboard Admin Web",
        ],
      },
      {
        categoryTitle: "OPTIMASI & TRACKING",
        items: [
          "SEO On Page Full + Schema",
          "Google Analytics & Search",
        ],
      },
    ],
  },
  {
    id: "premium",
    badgeText: "💎 Fitur Lengkap",
    badgeColorClass: "bg-purple-500/20 text-purple-300 border border-purple-500/35",
    title: "Premium",
    priceLabel: "Harga Tahun Pertama",
    price: "Rp 1.700.000",
    renewalPrice: "Rp 1.100.000/th",
    renewalText: "Perpanjangan th ke-2 dst",
    savingsBadge: "Hemat Rp600rb",
    ctaText: "Pilih Paket Premium →",
    orderUrl: "https://acc.jogjahost.co.id/index.php?rp=/store/web-design-sales-mobil/premium",
    featureCategories: [
      {
        categoryTitle: "FITUR UTAMA",
        items: [
          "20GB Web Space",
          "Integrasi WhatsApp",
          "Integrasi Google Maps",
          "Desain Responsif (HP/PC)",
        ],
      },
      {
        categoryTitle: "DOMAIN & HOSTING",
        items: [
          "Free Domain .com / .id Selama Berlangganan",
          "Free Hosting Selama Berlangganan",
        ],
      },
      {
        categoryTitle: "EMAIL BISNIS",
        items: [
          "10 Akun Email (by Request)",
          "Email Nama Domain Sendiri (@namadomainmu)",
        ],
      },
      {
        categoryTitle: "AKSES & KONTROL PANEL",
        items: [
          "Akses cPanel (Opsional)",
          "Akses Dashboard Admin Web",
        ],
      },
      {
        categoryTitle: "OPTIMASI & TRACKING",
        items: [
          "SEO On Page Full + Schema",
          "Google Analytics & Search",
        ],
      },
    ],
  },
];

export default function LayananTemplateCatalogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [selectedDemo, setSelectedDemo] = useState<TemplateItem | null>(null);
  const [demoViewMode, setDemoViewMode] = useState<"desktop" | "mobile">("desktop");
  const [chosenTemplate, setChosenTemplate] = useState<TemplateItem | null>(null);
  const [agreedTerms, setAgreedTerms] = useState<{ [planId: string]: boolean }>({});
  const [termsError, setTermsError] = useState<string | null>(null);
  const [activeLegalModal, setActiveLegalModal] = useState<"terms" | "service" | "privacy" | null>(null);
  const [templates, setTemplates] = useState<TemplateItem[]>(DEFAULT_TEMPLATES);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(DEFAULT_PRICING_PLANS);

  useEffect(() => {
    const syncPricing = () => {
      try {
        const savedPlans = localStorage.getItem("wh_pricing_packages");
        if (savedPlans !== null) {
          const parsed = JSON.parse(savedPlans);
          if (Array.isArray(parsed)) {
            const activeOnly = parsed.filter((p: any) => p.status !== "Draft");
            setPricingPlans(activeOnly);
          }
        }
      } catch (e) { }
    };

    syncPricing();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", syncPricing);
      window.addEventListener("wh:pricing_updated", syncPricing);
      return () => {
        window.removeEventListener("storage", syncPricing);
        window.removeEventListener("wh:pricing_updated", syncPricing);
      };
    }
  }, []);

  useEffect(() => {
    const syncTemplates = () => {
      try {
        const saved = localStorage.getItem("wh_templates_catalog");
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const mapped: TemplateItem[] = parsed.map((t: any) => {
              const rawCat = (t.category || "Company Profile").toLowerCase();
              let catKey = "company";
              let gradientTheme = "from-emerald-600/30 via-slate-900 to-[#0F141C]";
              let accentColor = "#00E599";

              if (rawCat.includes("auto") || rawCat.includes("mobil") || rawCat.includes("motor") || rawCat.includes("otomotif")) {
                catKey = "automotive";
                gradientTheme = "from-blue-600/30 via-slate-900 to-[#0F141C]";
                accentColor = "#3B82F6";
              } else if (rawCat.includes("toko") || rawCat.includes("shop") || rawCat.includes("commerce")) {
                catKey = "ecommerce";
                gradientTheme = "from-amber-600/30 via-slate-900 to-[#0F141C]";
                accentColor = "#F59E0B";
              } else if (rawCat.includes("tour") || rawCat.includes("travel") || rawCat.includes("rental")) {
                catKey = "travel";
                gradientTheme = "from-cyan-600/30 via-slate-900 to-[#0F141C]";
                accentColor = "#06B6D4";
              } else if (rawCat.includes("resto") || rawCat.includes("cafe") || rawCat.includes("kuliner") || rawCat.includes("f&b")) {
                catKey = "fnb";
                gradientTheme = "from-orange-600/30 via-slate-900 to-[#0F141C]";
                accentColor = "#F97316";
              }

              return {
                id: t.id,
                title: t.name,
                category: catKey,
                categoryLabel: t.category || "General",
                badge: t.badge || "Populer",
                desc: t.description || "Website profesional siap pakai dengan performa tinggi & Elementor Builder.",
                cms: "WordPress + Elementor Pro",
                features: Array.isArray(t.features) && t.features.length > 0
                  ? t.features
                  : [
                    "Elementor Pro Drag & Drop Ready",
                    "100% Responsif di Smartphone & PC",
                    "Integrasi WhatsApp CS Otomatis",
                    "Optimasi SEO Google PageSpeed 95+",
                  ],
                gradientTheme,
                accentColor,
                slug: t.id,
                imageUrl: t.imageUrl,
                price: t.price,
                demoUrl: t.demoUrl,
              };
            });
            setTemplates(mapped);
          }
        }
      } catch (e) { }
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

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const tplQuery = urlParams.get("template") || urlParams.get("pilih");
        if (tplQuery && templates.length > 0) {
          const queryClean = decodeURIComponent(tplQuery).toLowerCase();
          const match = templates.find(
            (t) =>
              t.id.toLowerCase() === queryClean ||
              t.slug.toLowerCase() === queryClean ||
              t.title.toLowerCase().includes(queryClean) ||
              queryClean.includes(t.title.toLowerCase())
          );
          if (match) {
            setChosenTemplate(match);
            setTimeout(() => {
              const target = document.getElementById("paket-harga");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }, 350);
          }
        }
      }
    } catch (e) { }
  }, [templates]);

  const targetPhone = "6281391123841";

  const openWhatsApp = (customMessage?: string) => {
    const defaultMsg =
      "Halo WebHoster.co.id, saya tertarik berkonsultasi mengenai Jasa Pembuatan Website & Template WordPress siap pakai. Mohon informasinya.";
    const text = encodeURIComponent(customMessage || defaultMsg);
    window.open(`https://wa.me/${targetPhone}?text=${text}`, "_blank");
  };

  const handleOpenDemo = (template: TemplateItem) => {
    recordTemplateView(template.id);
    setSelectedDemo(template);
  };

  const handleSelectTemplate = (template: TemplateItem) => {
    recordTemplateView(template.id);
    setChosenTemplate(template);
    const target = document.getElementById("paket-harga");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const categories = [
    { key: "all", label: "(Semua)", icon: Sparkles },
    { key: "company", label: "Company Profile", icon: Building2 },
    { key: "automotive", label: "Otomotif", icon: Car },
    { key: "ecommerce", label: "Toko Online", icon: ShoppingBag },
    { key: "travel", label: "Travel & Tour", icon: Palmtree },
    { key: "fnb", label: "F&B / Resto", icon: UtensilsCrossed },
  ];

  const filteredTemplates = templates.filter((t) => {
    const matchCategory =
      activeCategory === "all" ? true : t.category === activeCategory;
    const cleanSearch = searchTerm.trim().toLowerCase();
    const matchSearch =
      cleanSearch === ""
        ? true
        : t.title.toLowerCase().includes(cleanSearch) ||
        t.categoryLabel.toLowerCase().includes(cleanSearch) ||
        t.desc.toLowerCase().includes(cleanSearch) ||
        t.badge.toLowerCase().includes(cleanSearch) ||
        t.features.some((f) => f.toLowerCase().includes(cleanSearch));
    return matchCategory && matchSearch;
  });

  const displayedTemplates = filteredTemplates.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTemplates.length;

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setVisibleCount(6);
  };

  const standardFeatures = [
    {
      icon: Globe,
      badge: "🌐 Domain .com / .id",
      title: "Domain Resmi .com / .id",
      desc: "Terdaftar resmi dan legal atas nama pribadi atau perusahaan Anda tanpa biaya sewa tambahan di tahun pertama.",
    },
    {
      icon: Server,
      badge: "⚡ NVMe Cloud Server",
      title: "NVMe Cloud Server Cepat",
      desc: "Didukung storage enterprise SSD NVMe murni dengan garansi uptime 99.9% stabil dan kecepatan load kilat.",
    },
    {
      icon: Wrench,
      badge: "🛠️ Elementor Builder",
      title: "Elementor Builder Drag & Drop",
      desc: "Mudah ganti teks, logo, harga, galeri, dan artikel sendiri semudah mengetik di Word tanpa perlu bisa coding.",
    },
    {
      icon: Video,
      badge: "🎥 Video Panduan & Bantuan",
      title: "Video Panduan & Pendampingan",
      desc: "Didampingi tim teknis sampai website online siap pakai, disertai video tutorial berbahasa Indonesia yang mudah dipahami.",
    },
  ];

  const handleOrderPlan = (plan: PricingPlan) => {
    if (!agreedTerms[plan.id]) {
      setTermsError(plan.id);
      return;
    }
    setTermsError(null);

    window.open(plan.orderUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#090C10] text-[#F1F5F9] selection:bg-[#00E599] selection:text-[#090C10] font-sans antialiased overflow-x-hidden">
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-[#1B2433]/70">
        <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] bg-[#00E599]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="block mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,153,0.25)]">
              <span>JASA PEMBUATAN WEBSITE CEPAT &amp; MODERN</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[50px] font-extrabold text-white leading-[1.25] tracking-tight mb-6 max-w-5xl mx-auto drop-shadow-md">
            <span className="block">Pilih Desain Template WordPress Impian,</span>
            <span className="text-[#00E599] bg-gradient-to-r from-[#00E599] via-[#24f3ae] to-[#5eead4] bg-clip-text text-transparent block mt-1 sm:mt-2">
              Website Aktif dalam 24 Jam
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-4xl mx-auto mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="block md:whitespace-nowrap">
              Solusi instan: Pilih template siap pakai sesuai bidang bisnis Anda di katalog bawah,
            </span>
            <span className="block md:whitespace-nowrap mt-1">
              lalu tentukan paket aktivasi domain &amp; cloud hosting NVMe untuk langsung online tanpa ribet urusan teknis.
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-[#0F141C]/85 border border-[#1B2433] px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm hover:border-[#00E599]/40 transition">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>Online Cepat dalam 24 Jam</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0F141C]/85 border border-[#1B2433] px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm hover:border-[#00E599]/40 transition">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>Gratis Domain Resmi + NVMe Cloud Hosting</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0F141C]/85 border border-[#1B2433] px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm hover:border-[#00E599]/40 transition">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>Mudah Ganti Teks &amp; Foto Sendiri Tanpa Koding</span>
            </div>
          </div>
        </div>
      </section>

      <section id="katalog-template" className="py-16 bg-[#090C10] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-bold uppercase tracking-wider mb-3">
              <span>KATALOG DESAIN TEMPLATE WORDPRESS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-3">
              Pilih Desain Sesuai Bidang Usaha Anda
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Murni katalog tampilan dan fitur bawaan template tanpa biaya tersembunyi. Klik tombol <span className="text-[#00E599] font-semibold">Pilih Template ↓</span> untuk melanjutkan ke langkah pemilihan paket aktivasi.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#0F141C] via-[#121824] to-[#0F141C] border border-[#1B2433] hover:border-[#00E599]/40 rounded-2xl p-3.5 sm:px-6 sm:py-3.5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00E599]/15 text-[#00E599] flex items-center justify-center text-sm shrink-0">
                ⚡
              </div>
              <div className="text-xs text-[#94A3B8]">
                Sudah punya desain sendiri atau ingin langsung order hosting? <span className="text-white font-medium">Anda bisa langsung lewati katalog ini.</span>
              </div>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById("paket-harga");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#00E599]/15 hover:bg-[#00E599] text-[#00E599] hover:text-[#090C10] border border-[#00E599]/30 text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
            >
              <span>Langsung Lompat ke Paket Harga ↓</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleCount(6);
                }}
                placeholder="Cari template bisnis, nama desain, fitur..."
                className="w-full bg-[#0F141C] border border-[#1B2433] focus:border-[#00E599] rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none transition shadow-inner"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setVisibleCount(6);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white cursor-pointer"
                  title="Hapus pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs text-[#94A3B8] flex items-center gap-1.5 self-start md:self-center bg-[#0F141C] border border-[#1B2433] px-3.5 py-2 rounded-xl">
              <span>Menampilkan</span>
              <span className="font-black text-[#00E599] font-mono">{displayedTemplates.length}</span>
              <span>dari</span>
              <span className="font-black text-white font-mono">{filteredTemplates.length}</span>
              <span>Template</span>
            </div>
          </div>

          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer ${isActive
                    ? "bg-[#00E599] text-[#090C10] shadow-[0_0_20px_rgba(0,229,153,0.35)] scale-105"
                    : "bg-[#0F141C] text-[#94A3B8] border border-[#1B2433] hover:text-white hover:border-[#00E599]/40"
                    }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? "text-[#090C10]" : "text-[#00E599]"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl p-10 sm:p-14 text-center max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-[#121824] border border-[#1B2433] flex items-center justify-center text-[#64748B] mx-auto mb-4">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-white mb-1.5">Template Tidak Ditemukan</h3>
              <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">
                Tidak ada template yang cocok dengan kata kunci &ldquo;<span className="text-white font-semibold">{searchTerm}</span>&rdquo; pada kategori terpilih.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                  setVisibleCount(6);
                }}
                className="bg-[#00E599] text-[#090C10] font-black text-xs px-6 py-3 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition cursor-pointer"
              >
                Reset Filter &amp; Tampilkan Semua
              </button>
            </div>
          ) : (
            <>
              <div className={`grid gap-8 ${
                displayedTemplates.length === 2
                  ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                  : displayedTemplates.length === 1
                  ? "grid-cols-1 max-w-md mx-auto"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}>
                {displayedTemplates.map((t) => {
                  const isSelected = chosenTemplate?.id === t.id;

                  return (
                    <div
                      key={t.id}
                      className={`bg-[#0F141C] border rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group relative ${isSelected
                        ? "border-[#00E599] shadow-[0_0_30px_rgba(0,229,153,0.25)] ring-2 ring-[#00E599]/30"
                        : "border-[#1B2433] hover:border-[#00E599] hover:shadow-[0_20px_45px_rgba(0,229,153,0.15)]"
                        }`}
                    >
                      <div>
                        <div className="bg-[#121824] px-4 py-2.5 border-b border-[#1B2433] flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                          </div>
                          <span className="text-[10px] text-[#64748B] font-mono truncate max-w-[170px]">
                            demo.webhoster.co.id/{t.slug}
                          </span>
                          <span className="text-[10px] text-[#00E599] font-mono uppercase font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
                            WordPress
                          </span>
                        </div>

                        {t.imageUrl ? (
                          <div className="relative h-52 bg-[#090C10] overflow-hidden border-b border-[#1B2433]">
                            <img
                              src={t.imageUrl}
                              alt={t.title}
                              loading="lazy"
                              decoding="async"
                              width={480}
                              height={208}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F141C] via-transparent to-transparent opacity-60 pointer-events-none" />

                            <div className="flex items-center justify-between relative z-10 p-4">
                              <span className="bg-[#00E599] text-[#090C10] font-black text-[10px] uppercase px-2.5 py-1 rounded-full shadow-[0_0_12px_rgba(0,229,153,0.4)]">
                                {t.badge}
                              </span>
                              <span className="bg-[#090C10]/85 backdrop-blur-sm border border-white/10 text-white text-[11px] font-mono px-2.5 py-1 rounded-lg">
                                • {t.categoryLabel}
                              </span>
                            </div>

                            <div className="absolute inset-0 bg-[#090C10]/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
                              <button
                                onClick={() => handleOpenDemo(t)}
                                className="bg-[#00E599] text-[#090C10] font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,153,0.4)] hover:bg-[#00C882] transition cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                                <span>Buka Live Simulator</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`relative h-52 bg-gradient-to-br ${t.gradientTheme} p-4 flex flex-col justify-between overflow-hidden border-b border-[#1B2433]`}
                          >
                            <div className="absolute inset-0 cyber-dots opacity-20 pointer-events-none" />

                            <div className="flex items-center justify-between relative z-10">
                              <span className="bg-[#00E599] text-[#090C10] font-black text-[10px] uppercase px-2.5 py-1 rounded-full shadow-[0_0_12px_rgba(0,229,153,0.4)]">
                                {t.badge}
                              </span>
                              <span className="bg-[#090C10]/85 backdrop-blur-sm border border-white/10 text-white text-[11px] font-mono px-2.5 py-1 rounded-lg">
                                • {t.categoryLabel}
                              </span>
                            </div>

                            <div className="relative z-10 bg-[#090C10]/85 backdrop-blur-md border border-[#1B2433] rounded-xl p-3 shadow-xl">
                              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.accentColor }} />
                                  <span className="text-[11px] font-bold text-white truncate max-w-[140px]">
                                    {t.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-[9px] text-white/50">
                                  <span>Beranda</span>
                                  <span>•</span>
                                  <span>Katalog</span>
                                  <span>•</span>
                                  <span>Kontak</span>
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <div className="h-2 bg-white/30 rounded w-4/5" />
                                <div className="h-1.5 bg-white/15 rounded w-3/5" />
                              </div>

                              <div className="grid grid-cols-3 gap-1.5 mt-2.5 pt-2 border-t border-white/5">
                                <div className="h-6 rounded bg-white/5 border border-white/10" />
                                <div className="h-6 rounded bg-white/5 border border-white/10" />
                                <div className="h-6 rounded bg-white/5 border border-white/10" />
                              </div>
                            </div>

                            <div className="absolute inset-0 bg-[#090C10]/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
                              <button
                                onClick={() => handleOpenDemo(t)}
                                className="bg-[#00E599] text-[#090C10] font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,153,0.4)] hover:bg-[#00C882] transition cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                                <span>Buka Live Simulator</span>
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="p-6">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-lg font-black text-white group-hover:text-[#00E599] transition-colors leading-tight line-clamp-1">
                              {t.title}
                            </h3>
                            {isSelected && (
                              <span className="bg-[#00E599]/20 text-[#00E599] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#00E599]/40 shrink-0">
                                ✓ Terpilih
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-[#94A3B8] leading-relaxed mb-5 line-clamp-3 min-h-[3.75rem]">
                            {t.desc}
                          </p>

                          <div className="border-t border-[#1B2433] pt-4">
                            <div className="text-[10px] font-mono uppercase font-bold text-[#00E599] tracking-wider mb-2.5">
                              Fitur Bawaan Template:
                            </div>
                            <div className="space-y-2">
                              {t.features.map((feature, fIdx) => (
                                <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                  <Check className="w-3.5 h-3.5 text-[#00E599] shrink-0 mt-0.5" />
                                  <span className="leading-snug">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0 grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => handleOpenDemo(t)}
                          className="bg-[#121824] hover:bg-[#1B2433] text-white border border-[#1B2433] hover:border-[#00E599]/40 font-bold text-xs py-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#00E599]" />
                          <span>Live Demo</span>
                        </button>
                        <button
                          onClick={() => handleSelectTemplate(t)}
                          className={`font-black text-xs py-3 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${isSelected
                            ? "bg-[#00E599] text-[#090C10] shadow-[0_0_20px_rgba(0,229,153,0.4)]"
                            : "bg-[#00E599]/15 text-[#00E599] hover:bg-[#00E599] hover:text-[#090C10] border border-[#00E599]/30"
                            }`}
                        >
                          <span>Pilih Template</span>
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {hasMore ? (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="w-full sm:w-auto bg-[#00E599] text-[#090C10] font-black text-xs sm:text-sm px-7 py-3.5 rounded-2xl hover:bg-[#00C882] shadow-[0_0_25px_rgba(0,229,153,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Muat Lebih Banyak ({filteredTemplates.length - visibleCount} Desain Lagi)</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setVisibleCount(filteredTemplates.length)}
                    className="w-full sm:w-auto bg-[#0F141C] hover:bg-[#151E2C] text-slate-300 hover:text-white border border-[#1B2433] hover:border-[#00E599]/40 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Tampilkan Semua ({filteredTemplates.length} Template)</span>
                  </button>
                </div>
              ) : filteredTemplates.length > 6 ? (
                <div className="mt-12 text-center">
                  <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-[#0F141C] border border-[#1B2433] px-6 py-4 rounded-2xl">
                    <span className="text-xs text-[#94A3B8]">
                      Semua <b className="text-white">{filteredTemplates.length}</b> template telah ditampilkan.
                    </span>
                    <button
                      onClick={() => {
                        setVisibleCount(6);
                        const el = document.getElementById("katalog-template");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-xs font-bold text-[#00E599] hover:text-white transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ciutkan Kembali (Tampilkan 6 Desain)</span>
                      <span>↑</span>
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section id="paket-harga" className="py-20 bg-[#090C10] border-t border-[#1B2433] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#00E599]/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-bold uppercase tracking-wider mb-3">
              <span>PILIH PAKET AKTIVASI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-3">
              Paket Website + Domain &amp; Hosting
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Semua paket sudah termasuk lisensi template pilihan, gratis domain, dan cloud hosting kencang.
            </p>

            {chosenTemplate ? (
              <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 bg-[#00E599]/10 border border-[#00E599]/40 px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-white shadow-[0_0_20px_rgba(0,229,153,0.15)] animate-in fade-in slide-in-from-top-2">
                <span className="text-[#00E599] font-bold">Template Terpilih:</span>
                <span className="font-extrabold text-white underline underline-offset-4 decoration-[#00E599]">
                  {chosenTemplate.title}
                </span>
                <span className="text-[#94A3B8]">({chosenTemplate.categoryLabel})</span>
                <button
                  onClick={() => {
                    const el = document.getElementById("katalog-template");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs text-[#00E599] hover:text-white underline cursor-pointer ml-1"
                >
                  (Ganti Template ↑)
                </button>
              </div>
            ) : (
              <div className="mt-4 text-xs text-[#64748B]">
                💡 Tip: Anda bisa memilih template terlebih dahulu di katalog atas, atau langsung pilih paket aktivasi di bawah.
              </div>
            )}
          </div>

          {pricingPlans.length === 0 ? (
            <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl p-12 text-center max-w-xl mx-auto my-8">
              <Sparkles className="w-10 h-10 text-[#00E599] mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-white mb-2">Paket Harga Sedang Diperbarui</h3>
              <p className="text-xs text-[#94A3B8] mb-6">
                Belum ada paket aktivasi yang aktif saat ini. Silakan hubungi customer service kami melalui WhatsApp untuk mendapatkan penawaran paket kustom sesuai kebutuhan bisnis Anda.
              </p>
              <button
                onClick={() => openWhatsApp("Halo WebHoster.co.id, saya ingin menanyakan paket pembuatan website kustom.")}
                className="inline-flex items-center gap-2 bg-[#00E599] text-[#090C10] font-black text-xs px-6 py-3 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#090C10]" />
                <span>Konsultasi Paket via WhatsApp</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
            {pricingPlans.map((plan) => {
              const isPro = plan.featured;

              return (
                <div
                  key={plan.id}
                  className={`bg-[#0F141C] rounded-3xl flex flex-col justify-between transition-all duration-300 relative group/card ${isPro
                    ? "border-2 border-[#00E599] shadow-[0_0_40px_rgba(0,229,153,0.25)] lg:-translate-y-3 hover:-translate-y-4 hover:shadow-[0_0_55px_rgba(0,229,153,0.4)] z-10"
                    : "border border-[#1B2433] hover:border-[#00E599]/60 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,229,153,0.15)] shadow-lg"
                    }`}
                >
                  <div className="p-7 sm:p-8">
                    <div className="mb-4">
                      <span
                        className={`inline-block text-[11px] font-extrabold uppercase px-3 py-1 rounded-full ${plan.badgeColorClass}`}
                      >
                        {plan.badgeText}
                      </span>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="text-2xl font-black text-white">{plan.title}</h3>
                        <span className="text-xs text-[#94A3B8] font-medium">{plan.priceLabel}</span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span
                          className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${isPro ? "text-[#00E599]" : "text-white"
                            }`}
                        >
                          {plan.price}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#151E2C] border border-[#26354A] hover:border-slate-500 rounded-2xl p-4 mb-8 flex items-center justify-between gap-3 shadow-inner transition-colors">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-200 font-semibold">
                          <span className="text-sm">🔄</span>
                          <span>Perpanjangan th ke-2 dst:</span>
                        </div>
                        <div className="text-base sm:text-lg font-black text-white font-mono mt-1 tracking-tight">
                          {plan.renewalPrice}
                        </div>
                      </div>
                      <span className="bg-[#00E599]/20 text-[#00E599] border border-[#00E599]/50 text-xs font-black px-3.5 py-1.5 rounded-full whitespace-nowrap shadow-[0_0_15px_rgba(0,229,153,0.25)]">
                        {plan.savingsBadge}
                      </span>
                    </div>

                    <div className="space-y-6">
                      {plan.featureCategories.map((cat, cIdx) => (
                        <div key={cIdx} className="space-y-2.5">
                          <div className="text-[11px] font-mono font-extrabold text-[#00E599] uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
                            <span>{cat.categoryTitle}</span>
                          </div>
                          <div className="space-y-2 pl-3">
                            {cat.items.map((item, iIdx) => (
                              <div key={iIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                                <Check className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                                <span className="leading-snug">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 pt-0">
                    <div
                      className={`group/terms border rounded-2xl p-3.5 mb-3.5 transition-all duration-300 ${termsError === plan.id
                        ? "border-red-500/80 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.25)] animate-pulse"
                        : agreedTerms[plan.id]
                          ? "border-[#0066FF]/60 bg-[#0066FF]/10 shadow-[0_0_20px_rgba(0,102,255,0.15)]"
                          : "border-[#232F42] bg-[#121824]/90 hover:border-[#0066FF]/50 hover:bg-[#151F30] hover:shadow-[0_4px_20px_rgba(0,102,255,0.12)]"
                        }`}
                    >
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <div className="relative flex items-center justify-center mt-0.5">
                          <input
                            type="checkbox"
                            id={`terms-${plan.id}`}
                            checked={!!agreedTerms[plan.id]}
                            onChange={(e) => {
                              setAgreedTerms((prev) => ({ ...prev, [plan.id]: e.target.checked }));
                              if (termsError === plan.id) setTermsError(null);
                            }}
                            className="w-4 h-4 rounded border-slate-600 bg-[#090C10] text-[#0066FF] focus:ring-[#0066FF] focus:ring-offset-0 cursor-pointer shrink-0 transition-transform duration-200 group-hover/terms:scale-110"
                          />
                        </div>
                        <span className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                          Saya setuju dan telah membaca{" "}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveLegalModal("terms");
                            }}
                            className="text-[#38BDF8] hover:text-white underline decoration-sky-500/50 hover:decoration-white font-medium cursor-pointer transition-colors duration-200"
                          >
                            Ketentuan Layanan
                          </button>
                          ,{" "}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveLegalModal("service");
                            }}
                            className="text-[#38BDF8] hover:text-white underline decoration-sky-500/50 hover:decoration-white font-medium cursor-pointer transition-colors duration-200"
                          >
                            Perjanjian Layanan
                          </button>
                          , &amp;{" "}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveLegalModal("privacy");
                            }}
                            className="text-[#38BDF8] hover:text-white underline decoration-sky-500/50 hover:decoration-white font-medium cursor-pointer transition-colors duration-200"
                          >
                            Kebijakan Privasi
                          </button>
                        </span>
                      </label>

                      {termsError === plan.id && (
                        <p className="text-[11px] text-red-400 mt-2 flex items-center gap-1.5 animate-in fade-in">
                          <span>⚠️</span>
                          <span>Harap centang persetujuan ketentuan layanan untuk melanjutkan.</span>
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleOrderPlan(plan)}
                      className="group/btn relative overflow-hidden w-full py-3.5 sm:py-4 px-6 rounded-full bg-gradient-to-r from-[#0066FF] via-[#1A75FF] to-[#0055D6] hover:from-[#1E70FF] hover:via-[#2E7EFF] hover:to-[#0062E6] text-white font-bold text-sm sm:text-base shadow-[0_6px_25px_rgba(0,102,255,0.4)] hover:shadow-[0_10px_35px_rgba(0,102,255,0.7)] hover:-translate-y-1 active:translate-y-0.5 active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                      <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
                        <span>Order Sekarang</span>
                        <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform duration-300 ease-out" />
                      </span>
                    </button>

                    <div className="group/reassurance flex items-center justify-center gap-1.5 text-xs text-[#94A3B8] hover:text-slate-200 mt-3.5 font-normal transition-colors duration-200 cursor-default select-none">
                      <span className="text-amber-400 text-sm transform group-hover/reassurance:scale-125 group-hover/reassurance:rotate-12 transition-transform duration-300 inline-block drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                        ⚡
                      </span>
                      <span className="transition-colors">Website Siap Pakai Setelah Pembayaran</span>
                    </div>

                    {chosenTemplate && (
                      <p className="text-[10px] text-center text-[#64748B] mt-2 truncate">
                        Template terpilih: <b className="text-slate-300">{chosenTemplate.title}</b>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-[#090C10] border-t border-[#1B2433] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-bold uppercase tracking-wider mb-3">
              <span>FASILITAS STANDAR SETIAP PEMBELIAN</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
              Semua yang Anda Butuhkan Sudah Siap Digunakan
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Tidak perlu repot membeli domain atau sewa server di tempat berbeda. Seluruh paket WebHoster sudah mencakup ekosistem lengkap untuk langsung online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standardFeatures.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#0F141C] border border-[#1B2433] hover:border-[#00E599]/60 rounded-3xl p-6 sm:p-7 shadow-lg hover:-translate-y-1.5 transition-all duration-300 relative group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599] mb-5 group-hover:bg-[#00E599] group-hover:text-[#090C10] transition-all duration-300 shadow-[0_0_15px_rgba(0,229,153,0.2)]">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#00E599] block mb-2">
                      {item.badge}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-[#00E599] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-all">
          <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#121824] px-6 py-4 border-b border-[#1B2433] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{selectedDemo.title}</span>
                    <span className="bg-[#00E599]/15 text-[#00E599] text-[10px] px-2 py-0.5 rounded-full border border-[#00E599]/30">
                      {selectedDemo.categoryLabel}
                    </span>
                  </h4>
                  <p className="text-[11px] text-[#64748B] font-mono">
                    demo.webhoster.co.id/{selectedDemo.slug}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center bg-[#090C10] p-1 rounded-xl border border-[#1B2433]">
                  <button
                    onClick={() => setDemoViewMode("desktop")}
                    className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${demoViewMode === "desktop"
                      ? "bg-[#00E599] text-[#090C10]"
                      : "text-[#94A3B8] hover:text-white"
                      }`}
                  >
                    <Laptop className="w-4 h-4" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setDemoViewMode("mobile")}
                    className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${demoViewMode === "mobile"
                      ? "bg-[#00E599] text-[#090C10]"
                      : "text-[#94A3B8] hover:text-white"
                      }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Mobile</span>
                  </button>
                </div>

                <button
                  onClick={() => setSelectedDemo(null)}
                  className="w-8 h-8 rounded-full bg-[#1B2433] hover:bg-red-500/20 hover:text-red-400 text-slate-300 flex items-center justify-center transition cursor-pointer"
                  aria-label="Tutup Simulator"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-[#090C10] overflow-y-auto p-4 sm:p-8 flex justify-center items-start">
              <div
                className={`bg-[#0F141C] border border-[#1B2433] rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden ${demoViewMode === "desktop"
                  ? "w-full max-w-4xl"
                  : "w-full max-w-[375px] border-4 border-[#1B2433] rounded-[36px]"
                  }`}
              >
                <div className="bg-[#121824] px-4 py-3 border-b border-[#1B2433] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: selectedDemo.accentColor }}
                    />
                    <span className="font-bold text-xs text-white">
                      {selectedDemo.title}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#00E599] bg-[#00E599]/10 px-2 py-0.5 rounded-md font-mono">
                    Elementor Ready
                  </div>
                </div>

                {selectedDemo.imageUrl ? (
                  <div className="relative bg-[#090C10] border-b border-[#1B2433] group">
                    <div className="w-full max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#1B2433]">
                      <img
                        src={selectedDemo.imageUrl}
                        alt={selectedDemo.title}
                        className="w-full h-auto object-cover object-top block"
                      />
                    </div>

                    <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0F141C] via-[#121824] to-[#0F141C] border-t border-[#1B2433] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-[#00E599] text-[#090C10] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(0,229,153,0.3)]">
                            {selectedDemo.badge}
                          </span>
                          <span className="text-white text-xs font-bold font-mono">
                            • {selectedDemo.categoryLabel}
                          </span>
                        </div>
                        <p className="text-xs text-[#94A3B8] line-clamp-1 max-w-xl">
                          {selectedDemo.desc}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const temp = selectedDemo;
                          setSelectedDemo(null);
                          handleSelectTemplate(temp);
                        }}
                        className="bg-[#00E599] hover:bg-[#00C882] text-[#090C10] font-black text-xs px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(0,229,153,0.3)] hover:scale-105 transition cursor-pointer shrink-0"
                      >
                        Pilih Template Ini ↓
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`p-6 sm:p-10 bg-gradient-to-br ${selectedDemo.gradientTheme} border-b border-[#1B2433] text-center`}
                  >
                    <span className="inline-block bg-[#00E599] text-[#090C10] text-[10px] font-black uppercase px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(0,229,153,0.3)]">
                      {selectedDemo.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight">
                      {selectedDemo.title}
                    </h2>
                    <p className="text-xs text-slate-200 max-w-lg mx-auto mb-6">
                      {selectedDemo.desc}
                    </p>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          const temp = selectedDemo;
                          setSelectedDemo(null);
                          handleSelectTemplate(temp);
                        }}
                        className="bg-[#00E599] text-[#090C10] font-black text-xs px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,229,153,0.3)] hover:scale-105 transition cursor-pointer"
                      >
                        Pilih Template Ini ↓
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="text-xs font-mono font-bold text-[#00E599] uppercase tracking-wider mb-4">
                    Fitur &amp; Seksi Siap Pakai:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedDemo.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="bg-[#121824] border border-[#1B2433] rounded-xl p-3.5 flex items-start gap-2.5"
                      >
                        <Check className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-white">{feat}</div>
                          <div className="text-[10px] text-[#64748B] mt-0.5">
                            Siap diisi konten bisnis &amp; teroptimasi mobile
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#121824] px-6 py-4 border-t border-[#1B2433] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#94A3B8]">
                Tertarik menggunakan desain <b>{selectedDemo.title}</b>? Tentukan paket aktivasi Anda.
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedDemo(null)}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-[#1B2433] text-xs font-bold text-[#94A3B8] hover:text-white transition cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    const temp = selectedDemo;
                    setSelectedDemo(null);
                    handleSelectTemplate(temp);
                  }}
                  className="w-1/2 sm:w-auto bg-[#00E599] text-[#090C10] font-black text-xs px-5 py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_15px_rgba(0,229,153,0.3)] transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Pilih &amp; Lanjut ke Paket Harga ↓</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#1B2433] mb-4">
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00E599]" />
                <span>
                  {activeLegalModal === "terms" && "Ketentuan Layanan"}
                  {activeLegalModal === "service" && "Perjanjian Layanan"}
                  {activeLegalModal === "privacy" && "Kebijakan Privasi"}
                </span>
              </h4>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="w-8 h-8 rounded-full bg-[#121824] hover:bg-slate-800 text-slate-300 flex items-center justify-center transition cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              {activeLegalModal === "terms" && (
                <>
                  <p>
                    <b>1. Penggunaan Template &amp; Layanan:</b> Setiap pembelian paket website di WebHoster.co.id mencakup lisensi template WordPress siap pakai, domain resmi (.com / .id), dan hosting cloud NVMe selama periode aktif 1 tahun.
                  </p>
                  <p>
                    <b>2. Konten &amp; Materi:</b> Klien bertanggung jawab penuh atas seluruh teks, logo, gambar, serta materi yang dimasukkan ke dalam website dan menjamin tidak melanggar hukum yang berlaku di Indonesia.
                  </p>
                  <p>
                    <b>3. Aktivasi Cepat:</b> Website akan diproses dan siap digunakan setelah konfirmasi pembayaran diverifikasi oleh tim WebHoster.
                  </p>
                </>
              )}

              {activeLegalModal === "service" && (
                <>
                  <p>
                    <b>1. Garansi Uptime:</b> WebHoster.co.id memberikan jaminan ketersediaan server cloud NVMe hingga 99.9% uptime per tahun.
                  </p>
                  <p>
                    <b>2. Akses &amp; Kontrol:</b> Klien mendapatkan akses penuh dashboard admin WordPress serta opsi akses kontrol panel cPanel untuk pengelolaan mandiri.
                  </p>
                  <p>
                    <b>3. Biaya Perpanjangan:</b> Biaya perpanjangan tahun ke-2 dst berlaku sesuai skema hemat yang tertera pada masing-masing paket tanpa biaya tersembunyi.
                  </p>
                </>
              )}

              {activeLegalModal === "privacy" && (
                <>
                  <p>
                    <b>1. Perlindungan Data:</b> WebHoster.co.id berkomitmen menjaga kerahasiaan identitas pemilik domain, kontak bisnis, dan kredensial website Anda.
                  </p>
                  <p>
                    <b>2. Keamanan SSL:</b> Setiap domain otomatis dilengkapi sertifikat SSL gratis untuk memastikan enkripsi transaksi data pengunjung website Anda.
                  </p>
                  <p>
                    <b>3. Non-Distribusi:</b> Data pribadi Anda tidak akan pernah dijual atau diserahkan kepada pihak ketiga tanpa persetujuan resmi.
                  </p>
                </>
              )}
            </div>

            <div className="pt-6 border-t border-[#1B2433] mt-4 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0055D6] text-white font-bold text-xs transition cursor-pointer"
              >
                Saya Mengerti &amp; Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-1.5 bg-[#0F141C]/90 backdrop-blur-md border border-[#1B2433] hover:border-[#00E599]/50 p-1.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all">
        <button
          onClick={() => {
            const el = document.getElementById("katalog-template");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-xs font-bold px-3 py-1.5 rounded-full text-[#94A3B8] hover:text-white hover:bg-[#151E2C] transition flex items-center gap-1 cursor-pointer"
        >
          <span>🎨 Desain</span>
        </button>
        <div className="w-[1px] h-3.5 bg-[#1B2433]" />
        <button
          onClick={() => {
            const el = document.getElementById("paket-harga");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#00E599]/15 text-[#00E599] hover:bg-[#00E599] hover:text-[#090C10] transition flex items-center gap-1 cursor-pointer"
        >
          <span>💎 Paket Harga</span>
        </button>
      </div>
    </div>
  );
}
