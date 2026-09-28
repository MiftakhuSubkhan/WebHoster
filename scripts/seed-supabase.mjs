import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gmbidiflxypbsxnbicns.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtYmlkaWZseHlwYnN4bmJpY25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1NDQyODUsImV4cCI6MjEwNjEyMDI4NX0.zu29RzlcZI7EH3sFsAIJRwS13b6O8NPGw787DZn8zBs";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DEFAULT_TEMPLATES = [
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
    demo_url: "https://demo.webhoster.co.id/apex",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
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
    demo_url: "https://demo.webhoster.co.id/autoelite",
    image_url: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
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
    demo_url: "https://demo.webhoster.co.id/nusantara",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
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
    demo_url: "https://demo.webhoster.co.id/store",
    image_url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80",
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
    demo_url: "https://demo.webhoster.co.id/coffee",
    image_url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80",
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
    demo_url: "https://demo.webhoster.co.id/clinic",
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
  },
];

const DEFAULT_SETTINGS = {
  brandName: "WebHoster.co.id",
  tagline: "Pusat Template WordPress Siap Pakai & Cloud NVMe Hosting",
  whatsappPhone: "6281391123841",
  supportEmail: "support@webhoster.co.id",
  billingEmail: "billing@webhoster.co.id",
  officeAddress: "Jalan Ngadinegaran Blok MJ III No. 144, Mantrijeron, Yogyakarta",
  operationalHours: "24/7 Monitoring & Support",
  whmcsPortalUrl: "https://acc.jogjahost.co.id/",
  currencySymbol: "Rp (IDR)",
  dataCenterLocation: "Tier-4 DCI Indonesia (Jakarta) - Equinix Global",
  storageEngine: "Pure Enterprise NVMe PCIe 4.0 RAID-10",
  webServerEngine: "LiteSpeed Enterprise + LSCache",
  uptimeSla: "99.98% Guaranteed Uptime",
};

async function seed() {
  console.log("Seeding templates into Supabase...");
  const { error: tplErr } = await supabase.from("templates").upsert(DEFAULT_TEMPLATES, { onConflict: "id" });
  if (tplErr) console.error("Template seed error:", tplErr.message);
  else console.log("Templates seeded successfully!");

  console.log("Seeding settings into Supabase...");
  const { error: setErr } = await supabase.from("settings").upsert([{ key: "global", value: DEFAULT_SETTINGS }], { onConflict: "key" });
  if (setErr) console.error("Settings seed error:", setErr.message);
  else console.log("Settings seeded successfully!");
}

seed();
