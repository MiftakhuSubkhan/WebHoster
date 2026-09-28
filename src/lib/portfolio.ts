import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface PortfolioProjectItem {
  id: string;
  title: string;
  category: "company" | "ecommerce" | "landing" | "klinik" | "kuliner" | "otomotif" | string;
  categoryLabel: string;
  industry: string;
  templateBasis: string;
  description: string;
  gradientBg: string;
  iconBg: string;
  tech: string[];
  features: string[];
  liveUrlMock: string;
  highlights: string;
  image?: string;
  status: "Live" | "Draft";
}

export interface PortfolioCategoryOption {
  key: string;
  label: string;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategoryOption[] = [
  { key: "all", label: "Semua Proyek" },
  { key: "company", label: "Company Profile" },
  { key: "ecommerce", label: "Toko Online" },
  { key: "landing", label: "Landing Page" },
  { key: "klinik", label: "Klinik & Kesehatan" },
  { key: "kuliner", label: "Kuliner / Cafe" },
  { key: "otomotif", label: "Otomotif & Dealer" },
];

export const DEFAULT_PORTFOLIO_PROJECTS: PortfolioProjectItem[] = [
  {
    id: "nusantara-jaya",
    title: "PT. Nusantara Jaya Konstruksi",
    category: "company",
    categoryLabel: "Company Profile",
    industry: "Konstruksi & Kontraktor Nasional",
    templateBasis: "Nusantara Corporate Pro",
    description:
      "Website korporat modern untuk perusahaan kontraktor nasional. Dilengkapi katalog portofolio proyek terintegrasi, galeri alat berat, profil legalitas perusahaan, dan form penawaran tender cepat.",
    gradientBg: "from-[#0F2027] via-[#203A43] to-[#2C5364]",
    iconBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    tech: ["WordPress + Elementor Pro", "SEO Schema", "Cloud NVMe", "Domain Resmi"],
    features: [
      "Interactive Project Showcase Slider",
      "Form Request Penawaran Tender",
      "Halaman Legalitas & Sertifikasi ISO",
      "Optimasi Google Search Console & SEO Lokal",
    ],
    liveUrlMock: "nusantarajayakonstruksi.co.id",
    highlights: "Basis: Nusantara Corp • Skor SEO 98",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?w=800&auto=format&fit=crop&q=80",
    status: "Live",
  },
  {
    id: "toko-sejahtera",
    title: "Toko Sejahtera Furniture & Craft",
    category: "ecommerce",
    categoryLabel: "Toko Online",
    industry: "Mebel Jepara & Kerajinan Ekspor",
    templateBasis: "Banyumili Store & Catalog",
    description:
      "Platform e-commerce katalog mebel jati dan kerajinan kayu premium. Dilengkapi fitur checkout instan via WhatsApp, katalog varian warna, dan galeri produk resolusi tinggi tanpa komisi transaksi.",
    gradientBg: "from-[#1F1C18] via-[#332A20] to-[#1F1C18]",
    iconBg: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    tech: ["WordPress + WooCommerce", "WA Checkout", "LiteSpeed Cache", "Image CDN"],
    features: [
      "Sistem Checkout Cepat via WhatsApp Otomatis",
      "Filter Kategori Ruangan & Varian Warna",
      "Kompresi Gambar WebP Otomatis",
      "Integrasi Pixel Meta & Google Tag Manager",
    ],
    liveUrlMock: "sejahterafurniture.com",
    highlights: "Basis: Banyumili Store • WA Checkout",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80",
    status: "Live",
  },
  {
    id: "prima-teknik",
    title: "Prima Teknik Servis & Instalasi",
    category: "landing",
    categoryLabel: "Landing Page",
    industry: "Jasa Servis AC & Kelistrikan",
    templateBasis: "Prima Mandiri Konsultan",
    description:
      "High-converting single page website untuk jasa teknisi panggilan terpercaya. Didesain dengan Call-to-Action kontras tinggi, tombol telepon melayang (sticky call), dan testimoni pelanggan terverifikasi.",
    gradientBg: "from-[#0B1E19] via-[#0E352B] to-[#0B1E19]",
    iconBg: "bg-[#00E599]/20 text-[#00E599] border-[#00E599]/30",
    tech: ["WordPress + Elementor", "Conversion UI", "Google Ads Ready", "Instant Load"],
    features: [
      "Sticky Floating Call & WhatsApp Button",
      "Form Booking Jadwal Teknisi Real-Time",
      "Badge Garansi Servis 30 Hari",
      "Ready Landing Page untuk Iklan Google Ads",
    ],
    liveUrlMock: "primateknikac.id",
    highlights: "Basis: Prima Mandiri • Click-to-Call",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
    status: "Live",
  },
  {
    id: "medika-prima",
    title: "Klinik Medika Prima Healthcare",
    category: "klinik",
    categoryLabel: "Klinik & Kesehatan",
    industry: "Layanan Kesehatan & Klinik Spesialis",
    templateBasis: "Nusantara Corporate Pro",
    description:
      "Website resmi pusat layanan medis dan klinik spesialis keluarga. Menyajikan jadwal dokter praktik real-time, form pendaftaran antrean konsultasi, panduan layanan BPJS, dan integrasi Google Maps.",
    gradientBg: "from-[#13222A] via-[#1B3644] to-[#13222A]",
    iconBg: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    tech: ["WordPress + Elementor Pro", "Direct Booking", "Mobile First", "SSL Grade A+"],
    features: [
      "Tabel Jadwal Praktik Dokter Interaktif",
      "Formulir Reservasi Antrean Konsultasi",
      "Petunjuk Lokasi & Rute Google Maps",
      "Portal Artikel Edukasi Kesehatan",
    ],
    liveUrlMock: "medikaprimaklinik.com",
    highlights: "Basis: Nusantara Corp • Jadwal Dokter",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    status: "Live",
  },
  {
    id: "kopi-senja",
    title: "Kopi Senja Space & Eatery",
    category: "kuliner",
    categoryLabel: "Kuliner / Cafe",
    industry: "Kafe, Roastery & Resto Modern",
    templateBasis: "Kopi Senja Cafe & Resto",
    description:
      "Website kafe kekinian & roastery lokal yang menyajikan e-menu digital via scan barcode QR, sistem reservasi meja acara (gathering), dan katalog pemesanan biji kopi roast bean siap kirim.",
    gradientBg: "from-[#201511] via-[#38221B] to-[#201511]",
    iconBg: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    tech: ["WordPress + Elementor", "QR Code Ready", "Menu Digital", "Cloud NVMe"],
    features: [
      "Katalog Menu Digital Scan Barcode QR",
      "Form Reservasi Meja & Event Gathering",
      "Toko Penjualan Biji Kopi Roast Bean",
      "Integrasi Feed Instagram & Ulasan Google",
    ],
    liveUrlMock: "kopisenjaspace.com",
    highlights: "Basis: Kopi Senja • Scan QR Menu",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
    status: "Live",
  },
  {
    id: "auto-elite-client",
    title: "AutoElite Showroom & Garage Client",
    category: "otomotif",
    categoryLabel: "Otomotif & Dealer",
    industry: "Dealer Mobil & Jasa Otomotif",
    templateBasis: "AutoElite Showroom & Garage",
    description:
      "Website showcase showroom unit mobil baru dan second dengan filter kategori unit, rincian spesifikasi mesin lengkap, dan tombol booking test drive langsung ke sales consultant.",
    gradientBg: "from-[#1B2317] via-[#2A3B22] to-[#1B2317]",
    iconBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    tech: ["WordPress + Elementor Pro", "Katalog Unit Filter", "Test Drive Form", "Cloud NVMe"],
    features: [
      "Katalog Filter Unit Mobil & Spesifikasi Mesin",
      "Formulir Booking Test Drive & Simulasi Kredit",
      "Tombol Cepat Hubungi Sales via WhatsApp",
      "Integrasi Peta Lokasi Showroom Google Maps",
    ],
    liveUrlMock: "autoelitemotor.com",
    highlights: "Basis: AutoElite • Booking Test Drive",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
    status: "Live",
  },
];

const STORAGE_KEY = "wh_portfolio_showcase";

export function getPortfolioProjects(): PortfolioProjectItem[] {
  if (typeof window === "undefined") return DEFAULT_PORTFOLIO_PROJECTS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      if (Array.isArray(parsed) && parsed.length === 0) {
        return [];
      }
    }
    // Default initialization
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PORTFOLIO_PROJECTS));
    return DEFAULT_PORTFOLIO_PROJECTS;
  } catch (e) {
    return DEFAULT_PORTFOLIO_PROJECTS;
  }
}

export function savePortfolioProjects(projects: PortfolioProjectItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(
      new CustomEvent("wh:portfolio_updated", { detail: projects })
    );

    // Sync ke Supabase secara background jika terhubung
    if (isSupabaseConfigured() && supabase) {
      const records = projects.map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        category_label: p.categoryLabel,
        industry: p.industry,
        template_basis: p.templateBasis,
        description: p.description,
        gradient_bg: p.gradientBg,
        icon_bg: p.iconBg,
        tech: p.tech,
        features: p.features,
        live_url_mock: p.liveUrlMock,
        highlights: p.highlights,
        image: p.image || null,
        status: p.status,
      }));

      (async () => {
        try {
          const { error } = await supabase
            .from("portfolios")
            .upsert(records, { onConflict: "id" });
          if (error) console.warn("[Supabase] Portfolio upsert error:", error.message);
        } catch (err) {
          console.warn("[Supabase] Connection error:", err);
        }
      })();
    }
  } catch (e) {
    console.error("Gagal menyimpan portofolio:", e);
  }
}

/**
 * Sinkronisasi data portofolio dari Supabase ke state aplikasi
 */
export async function syncPortfoliosWithSupabase(): Promise<PortfolioProjectItem[]> {
  if (!isSupabaseConfigured() || !supabase) {
    return getPortfolioProjects();
  }

  try {
    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return getPortfolioProjects();
    }

    const mapped: PortfolioProjectItem[] = data.map((d: any) => ({
      id: d.id,
      title: d.title,
      category: d.category,
      categoryLabel: d.category_label || d.categoryLabel || "Website",
      industry: d.industry || "",
      templateBasis: d.template_basis || d.templateBasis || "",
      description: d.description || "",
      gradientBg: d.gradient_bg || d.gradientBg || "from-[#0F2027] via-[#203A43] to-[#2C5364]",
      iconBg: d.icon_bg || d.iconBg || "bg-blue-500/20 text-blue-400 border-blue-500/30",
      tech: Array.isArray(d.tech) ? d.tech : [],
      features: Array.isArray(d.features) ? d.features : [],
      liveUrlMock: d.live_url_mock || d.liveUrlMock || "",
      highlights: d.highlights || "",
      image: d.image || undefined,
      status: d.status || "Live",
    }));

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
      window.dispatchEvent(
        new CustomEvent("wh:portfolio_updated", { detail: mapped })
      );
    }

    return mapped;
  } catch (err) {
    console.warn("[Supabase] Gagal sinkronisasi portofolio:", err);
    return getPortfolioProjects();
  }
}


export function resetPortfolioToDefault(): PortfolioProjectItem[] {
  savePortfolioProjects(DEFAULT_PORTFOLIO_PROJECTS);
  return DEFAULT_PORTFOLIO_PROJECTS;
}

export function matchProjectCategory(
  project: PortfolioProjectItem,
  categoryKeyOrLabel: string
): boolean {
  if (
    !categoryKeyOrLabel ||
    categoryKeyOrLabel === "all" ||
    categoryKeyOrLabel === "Semua" ||
    categoryKeyOrLabel === "Semua Proyek"
  ) {
    return true;
  }

  const target = categoryKeyOrLabel.toLowerCase().trim();
  const cat = (project.category || "").toLowerCase().trim();
  const label = (project.categoryLabel || "").toLowerCase().trim();

  if (cat === target || label === target) return true;

  if (target === "company" || target === "company profile") {
    return cat === "company" || label.includes("company") || label.includes("korporat");
  }
  if (target === "ecommerce" || target === "toko online") {
    return (
      cat === "ecommerce" ||
      label.includes("toko") ||
      label.includes("commerce") ||
      label.includes("belanja")
    );
  }
  if (target === "landing" || target === "landing page") {
    return cat === "landing" || label.includes("landing");
  }
  if (target === "klinik" || target === "klinik & kesehatan") {
    return (
      cat === "klinik" ||
      label.includes("klinik") ||
      label.includes("kesehatan") ||
      label.includes("medis")
    );
  }
  if (target === "kuliner" || target === "kuliner / cafe") {
    return (
      cat === "kuliner" ||
      label.includes("kuliner") ||
      label.includes("cafe") ||
      label.includes("resto") ||
      label.includes("f&b")
    );
  }
  if (target === "otomotif" || target === "otomotif & dealer") {
    return (
      cat === "otomotif" ||
      label.includes("otomotif") ||
      label.includes("dealer") ||
      label.includes("showroom")
    );
  }

  return false;
}

export function getCategorySlugFromLabel(label: string): string {
  const lower = label.toLowerCase();
  if (lower.includes("toko") || lower.includes("commerce")) return "ecommerce";
  if (lower.includes("landing")) return "landing";
  if (lower.includes("klinik") || lower.includes("kesehatan")) return "klinik";
  if (lower.includes("kuliner") || lower.includes("cafe") || lower.includes("resto")) return "kuliner";
  if (lower.includes("otomotif") || lower.includes("dealer")) return "otomotif";
  return "company";
}
