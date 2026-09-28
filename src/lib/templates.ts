import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface TemplateCatalogItem {
  id: string;
  name: string;
  category: string;
  price?: string;
  badge: string;
  status: "Aktif" | "Draft";
  features?: string[];
  description?: string;
  demoUrl?: string;
  imageUrl?: string;
}

export const DEFAULT_TEMPLATES_CATALOG: TemplateCatalogItem[] = [
  {
    id: "tpl-1",
    name: "Apex Corporate NVMe",
    category: "Company Profile",
    badge: "Populer",
    status: "Aktif",
    features: [
      "Listing Profil Perusahaan Modern",
      "Performa NVMe Cloud Speed 99.9%",
      "Elementor Pro Drag & Drop Ready",
      "Integrasi Tombol WhatsApp Sales",
    ],
    description: "Template corporate modern dengan high-speed load & Elementor Pro.",
    demoUrl: "https://demo.webhoster.co.id/apex",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    price: "Rp 499.000",
  },
  {
    id: "tpl-2",
    name: "AutoElite Showroom & Garage",
    category: "Otomotif",
    badge: "Dealer Pro",
    status: "Aktif",
    features: [
      "Katalog Showroom Mobil/Motor HD",
      "Filter Tipe & Rentang Harga",
      "Formulir Booking Test Drive WA",
      "Tampilan 100% Responsif Mobile",
    ],
    description: "Katalog showroom mobil/motor interaktif, spesifikasi mesin & booking test drive WA.",
    demoUrl: "https://demo.webhoster.co.id/autoelite",
    imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    price: "Rp 499.000",
  },
  {
    id: "tpl-3",
    name: "Nusantara Corporate Pro",
    category: "Company Profile",
    badge: "Best Seller",
    status: "Aktif",
    features: [
      "Struktur Standar Legalitas PT / CV",
      "Halaman Visi Misi & Profil Tim",
      "Skor Google PageSpeed 95+",
      "Formulir Permintaan Penawaran B2B",
    ],
    description: "Desain elegan dan profesional untuk PT, CV, kontraktor & firma konsultan.",
    demoUrl: "https://demo.webhoster.co.id/nusantara",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
    price: "Rp 499.000",
  },
  {
    id: "tpl-4",
    name: "Banyumili Store & Catalog",
    category: "Toko Online",
    badge: "Toko WA",
    status: "Aktif",
    features: [
      "Katalog Produk & Galeri Foto",
      "Filter Varian Warna & Ukuran",
      "Checkout Langsung ke WhatsApp Admin",
      "Bebas Biaya Potongan Gateway",
    ],
    description: "Toko online ringan katalog produk lengkap tanpa fee dengan checkout langsung ke WhatsApp.",
    demoUrl: "https://demo.webhoster.co.id/store",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80",
    price: "Rp 499.000",
  },
  {
    id: "tpl-5",
    name: "Kopi Senja Cafe & Eatery",
    category: "F&B / Resto",
    badge: "Trending",
    status: "Aktif",
    features: [
      "Menu Digital Support QR Code",
      "Galeri Suasana Resto & Cafe",
      "Formulir Reservasi Meja Online",
      "Peta Lokasi & Integrasi Google Maps",
    ],
    description: "Showcase visual estetik untuk coffee shop, resto, menu digital QR & reservasi meja.",
    demoUrl: "https://demo.webhoster.co.id/coffee",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80",
    price: "Rp 499.000",
  },
  {
    id: "tpl-6",
    name: "CarePlus Medical & Dental Clinic",
    category: "Kesehatan",
    badge: "Klinik Pro",
    status: "Aktif",
    features: [
      "Jadwal Praktek Dokter Real-time",
      "Form Booking Janji Temu Pasien",
      "Daftar Layanan Medis & Tarif",
      "Kontak Emergency Call Langsung",
    ],
    description: "Website terpercaya untuk klinik dokter, gigi, fisioterapi, booking janji & jadwal praktek.",
    demoUrl: "https://demo.webhoster.co.id/clinic",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
    price: "Rp 499.000",
  },
];

const STORAGE_KEY = "wh_templates_catalog";

export function getTemplates(): TemplateCatalogItem[] {
  if (typeof window === "undefined") return DEFAULT_TEMPLATES_CATALOG;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TEMPLATES_CATALOG));
    return DEFAULT_TEMPLATES_CATALOG;
  } catch (e) {
    return DEFAULT_TEMPLATES_CATALOG;
  }
}

export function saveTemplates(templates: TemplateCatalogItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
    window.dispatchEvent(
      new CustomEvent("wh:templates_updated", { detail: templates })
    );

    // Sync ke Supabase secara background jika terhubung
    if (isSupabaseConfigured() && supabase) {
      (async () => {
        try {
          const currentIds = new Set(templates.map((t) => t.id));

          // 1. Hapus template di Supabase yang sudah tidak ada di list
          const { data: existing } = await supabase.from("templates").select("id");
          if (existing && existing.length > 0) {
            const toDelete = existing
              .filter((e: any) => !currentIds.has(e.id))
              .map((e: any) => e.id);
            if (toDelete.length > 0) {
              await supabase.from("templates").delete().in("id", toDelete);
            }
          }

          // 2. Upsert template yang aktif
          if (templates.length > 0) {
            const records = templates.map((t) => ({
              id: t.id,
              name: t.name,
              category: t.category,
              price: t.price || "Rp 499.000",
              badge: t.badge || "Standar",
              status: t.status || "Aktif",
              features: t.features || [],
              description: t.description || "",
              demo_url: t.demoUrl || "",
              image_url: t.imageUrl || "",
            }));
            await supabase.from("templates").upsert(records, { onConflict: "id" });
          }
        } catch (err) {
          console.warn("[Supabase] Template sync error:", err);
        }
      })();
    }
  } catch (e) {
    console.error("Gagal menyimpan templates:", e);
  }
}

/**
 * Sinkronisasi data template dari Supabase ke state aplikasi
 */
export async function syncTemplatesWithSupabase(): Promise<TemplateCatalogItem[]> {
  if (!isSupabaseConfigured() || !supabase) {
    return getTemplates();
  }

  try {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return getTemplates();
    }

    const mapped: TemplateCatalogItem[] = data.map((d: any) => ({
      id: d.id,
      name: d.name,
      category: d.category,
      price: d.price || "Rp 499.000",
      badge: d.badge || "Standar",
      status: d.status || "Aktif",
      features: Array.isArray(d.features) ? d.features : [],
      description: d.description || "",
      demoUrl: d.demo_url || "",
      imageUrl: d.image_url || "",
    }));

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
      window.dispatchEvent(
        new CustomEvent("wh:templates_updated", { detail: mapped })
      );
    }

    return mapped;
  } catch (err) {
    console.warn("[Supabase] Gagal sinkronisasi templates:", err);
    return getTemplates();
  }
}

export function resetTemplatesToDefault(): TemplateCatalogItem[] {
  saveTemplates(DEFAULT_TEMPLATES_CATALOG);
  return DEFAULT_TEMPLATES_CATALOG;
}
