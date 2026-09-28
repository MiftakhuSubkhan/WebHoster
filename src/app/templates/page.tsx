"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Search,
  Eye,
  ArrowRight,
  Check,
  X,
  Building2,
  Car,
  ShoppingBag,
  Palmtree,
  UtensilsCrossed,
  Layers,
  Globe,
  Monitor,
  Smartphone,
  Laptop,
  CheckCircle2,
  ChevronDown,
  Tag,
  ArrowDown,
  Filter,
  ExternalLink,
} from "lucide-react";
import { recordTemplateView } from "@/lib/analytics";
import { getTemplates, syncTemplatesWithSupabase } from "@/lib/templates";

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

export default function AllTemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDemo, setSelectedDemo] = useState<TemplateItem | null>(null);
  const [demoViewMode, setDemoViewMode] = useState<"desktop" | "mobile">("desktop");

  // Synchronize with Admin Workspace template catalog in localStorage
  useEffect(() => {
    const syncTemplates = () => {
      try {
        const raw = getTemplates();
        const activeOnly = raw.filter((t) => t.status !== "Draft");
        const mapped: TemplateItem[] = activeOnly.map((t: any) => {
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
      } catch (e) {}
    };

    syncTemplates();
    syncTemplatesWithSupabase().then(() => syncTemplates()).catch(() => {});

    if (typeof window !== "undefined") {
      window.addEventListener("storage", syncTemplates);
      window.addEventListener("wh:templates_updated", syncTemplates);
      return () => {
        window.removeEventListener("storage", syncTemplates);
        window.removeEventListener("wh:templates_updated", syncTemplates);
      };
    }
  }, []);

  const categories = [
    { key: "all", label: "(Semua Kategori)", icon: Sparkles },
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

  const handleOpenDemo = (t: TemplateItem) => {
    recordTemplateView(t.id);
    const rawUrl = t.demoUrl?.trim();
    if (rawUrl) {
      const finalUrl = rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
        ? rawUrl
        : `https://${rawUrl}`;
      window.open(finalUrl, "_blank", "noopener,noreferrer");
    } else {
      setSelectedDemo(t);
    }
  };

  const handleSelectTemplate = (t: TemplateItem) => {
    recordTemplateView(t.id);
    const encoded = encodeURIComponent(t.title);
    router.push(`/harga?template=${encoded}#paket-harga`);
  };

  return (
    <div className="min-h-screen bg-[#090C10] text-slate-100 flex flex-col selection:bg-[#00E599] selection:text-[#090C10]">
      {/* Hero Header Section */}
      <section className="pt-12 pb-14 lg:pt-16 bg-gradient-to-b from-[#0F141C] via-[#090C10] to-[#090C10] border-b border-[#1B2433] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#00E599]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(0,229,153,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>KATALOG LENGKAP TEMPLATE WEBSITE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Jelajahi Seluruh Koleksi <span className="text-[#00E599]">Template Siap Pakai</span>
            </h1>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-6">
              Pilih dari puluhan desain website modern siap online untuk berbagai bidang usaha. Klik <b>Pilih Template</b> untuk menentukan paket aktivasi hosting di WHMCS.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1.5 bg-[#0F141C] border border-[#1B2433] px-3.5 py-1.5 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599]" />
                <span>Gratis Domain .com / .id</span>
              </span>
              <span className="flex items-center gap-1.5 bg-[#0F141C] border border-[#1B2433] px-3.5 py-1.5 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599]" />
                <span>Cloud Storage NVMe Super Cepat</span>
              </span>
              <span className="flex items-center gap-1.5 bg-[#0F141C] border border-[#1B2433] px-3.5 py-1.5 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599]" />
                <span>Elementor Builder Siap Pakai</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Grid & Search Section */}
      <section className="py-14 bg-[#090C10] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari template bisnis, nama desain, atau fitur..."
                className="w-full bg-[#0F141C] border border-[#1B2433] focus:border-[#00E599] rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none transition shadow-inner"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white cursor-pointer"
                  title="Hapus pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results Count Badge */}
            <div className="text-xs text-[#94A3B8] flex items-center gap-1.5 self-start md:self-center bg-[#0F141C] border border-[#1B2433] px-4 py-2.5 rounded-xl">
              <span>Menampilkan</span>
              <span className="font-black text-[#00E599] font-mono">{filteredTemplates.length}</span>
              <span>Koleksi Desain Siap Pakai</span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    isActive
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

          {/* Empty State */}
          {filteredTemplates.length === 0 ? (
            <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl p-10 sm:p-16 text-center max-w-lg mx-auto my-8">
              <div className="w-14 h-14 rounded-2xl bg-[#121824] border border-[#1B2433] flex items-center justify-center text-[#64748B] mx-auto mb-4">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-white mb-1.5">
                {searchTerm ? "Template Tidak Ditemukan" : "Katalog Template Sedang Diperbarui"}
              </h3>
              <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">
                {searchTerm
                  ? `Tidak ada template yang cocok dengan kata kunci "${searchTerm}" pada kategori terpilih.`
                  : "Saat ini belum ada template aktif yang dipublikasikan di dashboard admin. Anda dapat langsung memilih paket harga pembuatan website kustom kami."}
              </p>
              {searchTerm ? (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                  }}
                  className="bg-[#00E599] text-[#090C10] font-black text-xs px-6 py-3 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition cursor-pointer"
                >
                  Reset Filter &amp; Tampilkan Semua
                </button>
              ) : (
                <Link
                  href="/harga#paket-harga"
                  className="inline-flex items-center gap-2 bg-[#00E599] text-[#090C10] font-black text-xs px-6 py-3 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition cursor-pointer"
                >
                  <span>Lihat Paket Harga Website</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ) : (
            /* Template Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#0F141C] border border-[#1B2433] hover:border-[#00E599] hover:shadow-[0_20px_45px_rgba(0,229,153,0.18)] rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group relative"
                >
                  <div>
                    {/* Card Header Bar */}
                    <div
                      onClick={() => handleOpenDemo(t)}
                      className="bg-[#121824] hover:bg-[#162030] px-4 py-2.5 border-b border-[#1B2433] flex items-center justify-between cursor-pointer transition group/bar"
                      title="Buka Live Demo"
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                      </div>
                      <span className="text-[10px] text-[#64748B] group-hover/bar:text-[#00E599] font-mono truncate max-w-[170px] transition-colors flex items-center gap-1">
                        <span>{t.demoUrl ? t.demoUrl.replace(/^https?:\/\//, '') : `demo.webhoster.co.id/${t.slug}`}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-[10px] text-[#00E599] font-mono uppercase font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
                        WordPress
                      </span>
                    </div>

                    {/* Image / Thumbnail Preview */}
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
                            <span className="text-[11px] font-bold text-white truncate max-w-[140px]">
                              {t.title}
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="h-2 bg-white/30 rounded w-4/5" />
                            <div className="h-1.5 bg-white/15 rounded w-3/5" />
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

                    {/* Card Body */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-black text-white group-hover:text-[#00E599] transition-colors leading-tight line-clamp-1">
                          {t.title}
                        </h3>
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

                  {/* Card Actions */}
                  <div className="p-6 pt-0 grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleOpenDemo(t)}
                      className="bg-[#121824] hover:bg-[#00E599] text-white hover:text-[#090C10] border border-[#1B2433] hover:border-[#00E599] font-bold text-xs py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group/btn"
                      title="Buka Live Demo Website"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#00E599] group-hover/btn:text-[#090C10] transition-colors" />
                      <span>Live Demo</span>
                    </button>
                    <button
                      onClick={() => handleSelectTemplate(t)}
                      className="bg-[#00E599] hover:bg-[#00C882] text-[#090C10] font-black text-xs py-3 rounded-xl shadow-[0_0_15px_rgba(0,229,153,0.3)] transition flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-95"
                    >
                      <span>Gunakan Template</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Banner Section */}
          <div className="mt-16 bg-gradient-to-r from-[#0F141C] via-[#151E2C] to-[#0F141C] border border-[#00E599]/40 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(0,229,153,0.15)] text-center md:text-left">
            <div>
              <div className="text-[11px] font-bold text-[#00E599] uppercase tracking-wider mb-1">
                KONSULTASI &amp; PERMINTAAN TEMA KUSTOM
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                Punya Konsep Desain Sendiri di Luar Katalog?
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl">
                Tim developer WebHoster siap membuatkan website kustom dari nol (*scratch*) atau mereplikasi referensi website favorit bisnis Anda.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link
                href="/kontak"
                className="bg-[#00E599] text-[#090C10] font-black text-xs sm:text-sm px-6 py-3.5 rounded-full hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition flex items-center gap-2"
              >
                <span>Konsultasi Proyek Website</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Simulator Modal */}
      {selectedDemo && (
        <div className="fixed inset-0 z-50 bg-[#090C10]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-[#0F141C] border border-[#00E599]/50 rounded-3xl max-w-4xl w-full h-[92vh] flex flex-col shadow-[0_0_60px_rgba(0,229,153,0.25)] relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#121824] px-4 sm:px-6 py-3.5 border-b border-[#1B2433] rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-300">
                  <span>
                    {selectedDemo.demoUrl
                      ? selectedDemo.demoUrl.startsWith("http")
                        ? selectedDemo.demoUrl
                        : `https://${selectedDemo.demoUrl}`
                      : `https://demo.webhoster.co.id/${selectedDemo.slug}`}
                  </span>
                  {selectedDemo.demoUrl && (
                    <a
                      href={
                        selectedDemo.demoUrl.startsWith("http")
                          ? selectedDemo.demoUrl
                          : `https://${selectedDemo.demoUrl}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-[#00E599] hover:underline flex items-center gap-0.5"
                    >
                      <span>Buka Tab Baru</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedDemo.demoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      const rawUrl = selectedDemo.demoUrl?.trim();
                      if (rawUrl) {
                        const finalUrl =
                          rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
                            ? rawUrl
                            : `https://${rawUrl}`;
                        window.open(finalUrl, "_blank", "noopener,noreferrer");
                      }
                    }}
                    className="hidden sm:flex bg-[#00E599]/15 hover:bg-[#00E599] text-[#00E599] hover:text-[#090C10] border border-[#00E599]/30 text-xs font-bold px-3 py-1.5 rounded-xl transition items-center gap-1.5 cursor-pointer"
                    title="Buka Website di Tab Baru"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Buka Website Asli</span>
                  </button>
                )}

                <div className="bg-[#090C10] p-1 rounded-xl border border-[#1B2433] flex items-center gap-1">
                  <button
                    onClick={() => setDemoViewMode("desktop")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                      demoViewMode === "desktop"
                        ? "bg-[#00E599] text-[#090C10]"
                        : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Desktop</span>
                  </button>
                  <button
                    onClick={() => setDemoViewMode("mobile")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                      demoViewMode === "mobile"
                        ? "bg-[#00E599] text-[#090C10]"
                        : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>
                </div>

                <button
                  onClick={() => setSelectedDemo(null)}
                  className="p-1.5 rounded-full bg-[#090C10] border border-[#1B2433] text-[#94A3B8] hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 bg-[#090C10] p-4 overflow-y-auto flex items-center justify-center">
              <div
                className={`transition-all duration-300 bg-[#0F141C] border border-[#1B2433] rounded-2xl overflow-hidden shadow-2xl ${
                  demoViewMode === "mobile"
                    ? "w-[360px] h-[580px] overflow-y-auto"
                    : "w-full h-full overflow-y-auto"
                }`}
              >
                {selectedDemo.imageUrl ? (
                  <div className="relative">
                    <img
                      src={selectedDemo.imageUrl}
                      alt={selectedDemo.title}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6 bg-[#0F141C] border-t border-[#1B2433]">
                      <span className="bg-[#00E599] text-[#090C10] text-[10px] font-black uppercase px-3 py-1 rounded-full mb-3 inline-block">
                        {selectedDemo.badge}
                      </span>
                      <h2 className="text-2xl font-black text-white mb-2">{selectedDemo.title}</h2>
                      <p className="text-xs text-[#94A3B8] leading-relaxed mb-5">{selectedDemo.desc}</p>
                    </div>
                  </div>
                ) : (
                  <div className={`p-8 bg-gradient-to-br ${selectedDemo.gradientTheme} text-center`}>
                    <span className="bg-[#00E599] text-[#090C10] text-[10px] font-black uppercase px-3 py-1 rounded-full mb-3 inline-block">
                      {selectedDemo.badge}
                    </span>
                    <h2 className="text-2xl font-black text-white mb-2">{selectedDemo.title}</h2>
                    <p className="text-xs text-slate-200 max-w-md mx-auto mb-6">{selectedDemo.desc}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#121824] px-6 py-3.5 border-t border-[#1B2433] rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#94A3B8]">
                Tertarik dengan desain <b>{selectedDemo.title}</b>? Lanjut ke pemilihan paket aktivasi.
              </div>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedDemo(null)}
                  className="w-1/2 sm:w-auto px-4 py-2 rounded-xl border border-[#1B2433] text-xs font-bold text-[#94A3B8] hover:text-white"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    const temp = selectedDemo;
                    setSelectedDemo(null);
                    handleSelectTemplate(temp);
                  }}
                  className="w-1/2 sm:w-auto bg-[#00E599] text-[#090C10] font-black text-xs px-5 py-2 rounded-xl hover:bg-[#00C882] shadow-[0_0_15px_rgba(0,229,153,0.3)] flex items-center justify-center gap-1.5"
                >
                  <span>Gunakan Template Ini →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
