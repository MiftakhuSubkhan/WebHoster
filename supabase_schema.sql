-- ==============================================================================
-- SKEMA DATABASE WEBLOSTER (SUPABASE POSTGRESQL)
-- ==============================================================================
-- Petunjuk Penggunaan:
-- 1. Buka dashboard proyek Supabase Anda (https://supabase.com/dashboard)
-- 2. Masuk ke menu "SQL Editor" di bilah kiri
-- 3. Klik "New Query", tempel seluruh kode di bawah ini, lalu klik "Run"
-- ==============================================================================

-- 1. TABEL: LEADS / PESAN KONSULTASI MASUK
CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    package_chosen TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Baru', -- 'Baru', 'Follow Up', 'Deal'
    date TEXT DEFAULT 'Baru saja',
    business TEXT,
    budget TEXT,
    notes TEXT,
    custom_message TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABEL: PORTOFOLIO WEBSITE SHOWCASE
CREATE TABLE IF NOT EXISTS portfolios (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'company', 'ecommerce', 'landing', 'klinik', 'kuliner', 'otomotif'
    category_label TEXT NOT NULL,
    industry TEXT,
    template_basis TEXT,
    description TEXT,
    gradient_bg TEXT DEFAULT 'from-[#0F2027] via-[#203A43] to-[#2C5364]',
    icon_bg TEXT DEFAULT 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    tech JSONB DEFAULT '[]'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    live_url_mock TEXT,
    highlights TEXT,
    image TEXT,
    status TEXT DEFAULT 'Live', -- 'Live', 'Draft'
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABEL: TEMPLATES KATALOG
CREATE TABLE IF NOT EXISTS templates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price TEXT,
    badge TEXT DEFAULT 'Standar',
    status TEXT DEFAULT 'Aktif', -- 'Aktif', 'Draft'
    features JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    demo_url TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABEL: GLOBAL SETTINGS
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Aktifkan RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policy Leads:
-- Siapapun (publik) bisa submit formulir kontak/konsultasi
CREATE POLICY "Public can insert leads" ON leads FOR INSERT WITH CHECK (true);
-- Siapapun dengan API key bisa membaca & mengupdate leads di workspace
CREATE POLICY "Public access to leads" ON leads FOR ALL USING (true);

-- Policy Portfolios:
-- Semua orang bisa melihat portofolio publik
CREATE POLICY "Public can view portfolios" ON portfolios FOR SELECT USING (true);
-- Admin/App bisa mengelola portofolio
CREATE POLICY "Public full access to portfolios" ON portfolios FOR ALL USING (true);

-- Policy Templates:
-- Semua orang bisa melihat katalog template
CREATE POLICY "Public can view templates" ON templates FOR SELECT USING (true);
-- Admin/App bisa mengelola template
CREATE POLICY "Public full access to templates" ON templates FOR ALL USING (true);

-- Policy Settings:
CREATE POLICY "Public can read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public full access to settings" ON settings FOR ALL USING (true);

-- ==============================================================================
-- DATA AWAL (SEED DATA DEFAULT WEBLOSTER)
-- ==============================================================================

-- Seed Portofolio Default
INSERT INTO portfolios (id, title, category, category_label, industry, template_basis, description, gradient_bg, icon_bg, tech, features, live_url_mock, highlights, status)
VALUES
(
    'nusantara-jaya',
    'PT. Nusantara Jaya Konstruksi',
    'company',
    'Company Profile',
    'Konstruksi & Kontraktor Nasional',
    'Nusantara Corporate Pro',
    'Website korporat modern untuk perusahaan kontraktor nasional. Dilengkapi katalog portofolio proyek terintegrasi, galeri alat berat, profil legalitas perusahaan, dan form penawaran tender cepat.',
    'from-[#0F2027] via-[#203A43] to-[#2C5364]',
    'bg-blue-500/20 text-blue-400 border-blue-500/30',
    '["Next.js / WP Headless", "LiteSpeed Cache", "SSL Sectigo Wildcard"]'::jsonb,
    '["Katalog Portfolio Proyek Filterable", "Integrasi Form Tender Proyek", "Unduh Profil Perusahaan (PDF Auto-Generate)", "Multibahasa (ID & EN)"]'::jsonb,
    'https://nusantarajaya.co.id',
    'Uptime 99.99% selama 12 bulan & Skor Google PageSpeed 98/100',
    'Live'
),
(
    'batik-pusaka',
    'Batik Pusaka Kencana',
    'ecommerce',
    'Toko Online',
    'Retail Fashion & Kerajinan Tradisional',
    'BatikStore Commerce Ultra',
    'Platform e-commerce batik tulis premium dengan sistem checkout instan WhatsApp, kalkulator ongkir otomatis seluruh Indonesia, dan katalog motif berkurasi tinggi.',
    'from-[#23074d] via-[#cc5333] to-[#23074d]',
    'bg-amber-500/20 text-amber-400 border-amber-500/30',
    '["WooCommerce High-Perf", "Redis Object Cache", "Payment Gateway Midtrans"]'::jsonb,
    '["Kalkulator Ongkir Otomatis JNE/J&T/SiCepat", "Checkout Direct WhatsApp Multi-CS", "Sistem Variasi Ukuran & Motif Dinamis", "Integrasi Pixel & TikTok Ads"]'::jsonb,
    'https://batikpusakakencana.com',
    'Peningkatan penjualan online 240% dalam 3 bulan pertama setelah peluncuran',
    'Live'
),
(
    'klinik-medika',
    'Medika Husada Care',
    'klinik',
    'Klinik & Kesehatan',
    'Fasilitas Kesehatan & Laboratorium',
    'CarePlus Medical Suite',
    'Website layanan klinik pratama dan laboratorium diagnostik. Menampilkan jadwal dokter terupdate, booking antrean online via WhatsApp, dan direktori paket cek kesehatan rutin.',
    'from-[#004e92] via-[#000428] to-[#004e92]',
    'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    '["WordPress Core Engine", "Cloudflare Enterprise CDN", "HIPAA-Friendly Form Security"]'::jsonb,
    '["Jadwal Dokter Real-time per Spesialis", "Booking Konsultasi & Antrean Otomatis", "Katalog Promo Medical Check-Up", "Integrasi Lokasi Google Maps Rute Cepat"]'::jsonb,
    'https://medikahusada.id',
    'Mengurangi waktu tunggu antrean pasien fisik hingga 45%',
    'Live'
)
ON CONFLICT (id) DO NOTHING;

-- Seed Settings Default
INSERT INTO settings (key, value)
VALUES (
    'global',
    '{
        "brandName": "WebHoster.co.id",
        "tagline": "Pusat Template WordPress Siap Pakai & Cloud NVMe Hosting",
        "whatsappPhone": "6281391123841",
        "supportEmail": "support@webhoster.co.id",
        "billingEmail": "billing@webhoster.co.id",
        "officeAddress": "Jalan Ngadinegaran Blok MJ III No. 144, Mantrijeron, Yogyakarta",
        "operationalHours": "24/7 Monitoring & Support",
        "whmcsPortalUrl": "https://acc.jogjahost.co.id/",
        "currencySymbol": "Rp (IDR)",
        "dataCenterLocation": "Tier-4 DCI Indonesia (Jakarta) - Equinix Global",
        "storageEngine": "Pure Enterprise NVMe PCIe 4.0 RAID-10",
        "webServerEngine": "LiteSpeed Enterprise + LSCache",
        "uptimeSla": "99.98% Guaranteed Uptime"
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
