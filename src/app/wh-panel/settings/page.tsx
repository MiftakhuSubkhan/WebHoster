"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Settings,
  ShieldCheck,
  Server,
  Save,
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe,
  CreditCard,
  Lock,
  RefreshCw,
  Sparkles,
  Check,
  AlertTriangle,
  KeyRound,
  Cpu,
  Database,
  ExternalLink,
} from "lucide-react";

export interface GlobalSettings {
  brandName: string;
  tagline: string;
  whatsappPhone: string;
  supportEmail: string;
  billingEmail: string;
  officeAddress: string;
  operationalHours: string;
  whmcsPortalUrl: string;
  currencySymbol: string;
  dataCenterLocation: string;
  storageEngine: string;
  webServerEngine: string;
  uptimeSla: string;
}

const DEFAULT_SETTINGS: GlobalSettings = {
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

export default function SettingsManagementPage() {
  const [activeTab, setActiveTab] = useState<"general" | "billing" | "infra" | "security">("general");
  const [settings, setSettings] = useState<GlobalSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Security Form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wh_global_settings");
      if (saved) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      } else {
        setSettings(DEFAULT_SETTINGS);
        localStorage.setItem("wh_global_settings", JSON.stringify(DEFAULT_SETTINGS));
      }
    } catch (e) {
      setSettings(DEFAULT_SETTINGS);
    }
    setIsLoaded(true);
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("wh_global_settings", JSON.stringify(settings));
      showToast("Pengaturan global berhasil disimpan!");
    } catch (err) {
      console.error("Failed to save settings:", err);
      showToast("Gagal menyimpan pengaturan.");
    }
  };

  const handleResetSettings = () => {
    if (confirm("Kembalikan seluruh pengaturan global ke nilai default bawaan?")) {
      setSettings(DEFAULT_SETTINGS);
      try {
        localStorage.setItem("wh_global_settings", JSON.stringify(DEFAULT_SETTINGS));
      } catch (e) {}
      showToast("Pengaturan dikembalikan ke setelan default!");
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (newPassword.length < 6) {
      setPasswordError("Password baru minimal 6 karakter!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Konfirmasi password baru tidak cocok!");
      return;
    }

    try {
      localStorage.setItem("wh_admin_password", newPassword);
      showToast("Password admin berhasil diperbarui!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      setPasswordError("Gagal memperbarui password.");
    }
  };

  const handleClearCache = () => {
    if (confirm("Reset seluruh cache database lokal (leads, portofolio, templates, paket harga)?")) {
      localStorage.removeItem("wh_admin_leads");
      localStorage.removeItem("wh_templates_catalog");
      localStorage.removeItem("wh_portfolio_showcase");
      localStorage.removeItem("wh_pricing_packages");
      window.dispatchEvent(new CustomEvent("wh:leads_updated", { detail: [] }));
      showToast("Cache data lokal berhasil dibersihkan! Halaman akan memuat ulang...");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#0F141C] border border-[#00E599] text-[#00E599] font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(0,229,153,0.3)] flex items-center gap-2.5 animate-in slide-in-from-top-3">
          <Sparkles className="w-4 h-4 text-[#00E599]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>Pengaturan Global</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#00E599]/15 text-[#00E599] text-xs font-bold border border-[#00E599]/30">
              Sistem
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Konfigurasi identitas brand, nomor WhatsApp CS, integrasi WHMCS, dan parameter keamanan sistem.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleResetSettings}
            title="Reset ke pengaturan awal"
            className="bg-[#121824] hover:bg-[#1B2433] text-[#94A3B8] hover:text-white border border-[#1B2433] text-xs font-bold py-2.5 px-3.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-2 flex items-center gap-1.5 overflow-x-auto">
        {[
          { key: "general", label: "Brand & Kontak", icon: Building2 },
          { key: "billing", label: "WHMCS & Billing", icon: CreditCard },
          { key: "infra", label: "Infrastruktur & Server", icon: Server },
          { key: "security", label: "Keamanan & Cache", icon: ShieldCheck },
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#00E599] text-[#090C10] shadow-[0_0_15px_rgba(0,229,153,0.3)]"
                  : "bg-[#121824] text-[#94A3B8] hover:text-white border border-[#1B2433]"
              }`}
            >
              <IconComp className={`w-4 h-4 ${isActive ? "text-[#090C10]" : "text-[#00E599]"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB CONTENT */}
      {activeTab === "general" && (
        <form onSubmit={handleSaveSettings} className="bg-[#0F141C] border border-[#1B2433] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#1B2433]">
            <Building2 className="w-5 h-5 text-[#00E599]" />
            <h2 className="text-base font-black text-white">Identitas Brand &amp; Informasi Kontak</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-bold text-white mb-1.5">Nama Brand / Website</label>
              <input
                type="text"
                required
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block font-bold text-white mb-1.5">Nomor WhatsApp CS Utama</label>
              <input
                type="text"
                required
                value={settings.whatsappPhone}
                onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-[#00E599] font-mono font-bold focus:outline-none transition"
              />
              <p className="text-[10px] text-[#64748B] mt-1">Format dengan kode negara (misal: 6281391123841).</p>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-white mb-1.5">Tagline &amp; Slogan Brand</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block font-bold text-white mb-1.5">Email Layanan Support</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block font-bold text-white mb-1.5">Email Billing / Penjualan</label>
              <input
                type="email"
                value={settings.billingEmail}
                onChange={(e) => setSettings({ ...settings, billingEmail: e.target.value })}
                className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-white mb-1.5">Alamat Kantor / Headquarter</label>
              <input
                type="text"
                value={settings.officeAddress}
                onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
                className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-white mb-1.5">Jam Operasional Layanan</label>
              <input
                type="text"
                value={settings.operationalHours}
                onChange={(e) => setSettings({ ...settings, operationalHours: e.target.value })}
                className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#1B2433] flex justify-end">
            <button
              type="submit"
              className="bg-[#00E599] text-[#090C10] font-black text-xs px-6 py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4 stroke-[3]" />
              <span>Simpan Pengaturan Brand</span>
            </button>
          </div>
        </form>
      )}

      {activeTab === "billing" && (
        <form onSubmit={handleSaveSettings} className="bg-[#0F141C] border border-[#1B2433] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#1B2433]">
            <CreditCard className="w-5 h-5 text-[#00E599]" />
            <h2 className="text-base font-black text-white">Integrasi WHMCS &amp; Sistem Pembayaran</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-white mb-1.5">
                Base URL Portal Klien WHMCS
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  required
                  value={settings.whmcsPortalUrl}
                  onChange={(e) => setSettings({ ...settings, whmcsPortalUrl: e.target.value })}
                  className="flex-1 bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none transition"
                />
                <a
                  href={settings.whmcsPortalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#121824] hover:bg-[#1B2433] text-[#00E599] border border-[#1B2433] px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka Portal</span>
                </a>
              </div>
              <p className="text-[10px] text-[#64748B] mt-1">
                Domain utama sistem tagihan dan billing WHMCS akun hosting klien.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block font-bold text-white mb-1.5">Simbol / Format Mata Uang</label>
                <input
                  type="text"
                  value={settings.currencySymbol}
                  onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                  className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block font-bold text-white mb-1.5">Metode Pembayaran Otomatis</label>
                <div className="bg-[#090C10] border border-[#1B2433] rounded-xl px-3.5 py-2.5 text-slate-300 font-medium">
                  QRIS Real-Time, Virtual Account BCA/Mandiri/BRI, Kartu Kredit
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1B2433] flex justify-end">
            <button
              type="submit"
              className="bg-[#00E599] text-[#090C10] font-black text-xs px-6 py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4 stroke-[3]" />
              <span>Simpan Integrasi WHMCS</span>
            </button>
          </div>
        </form>
      )}

      {activeTab === "infra" && (
        <form onSubmit={handleSaveSettings} className="bg-[#0F141C] border border-[#1B2433] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#1B2433]">
            <Server className="w-5 h-5 text-[#00E599]" />
            <h2 className="text-base font-black text-white">Infrastruktur Server &amp; Spesifikasi Default</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-bold text-white mb-1.5">Lokasi Cluster Data Center</label>
              <input
                type="text"
                value={settings.dataCenterLocation}
                onChange={(e) => setSettings({ ...settings, dataCenterLocation: e.target.value })}
                className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block font-bold text-white mb-1.5">Storage Engine Cluster</label>
              <input
                type="text"
                value={settings.storageEngine}
                onChange={(e) => setSettings({ ...settings, storageEngine: e.target.value })}
                className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block font-bold text-white mb-1.5">Web Server &amp; Caching Engine</label>
              <input
                type="text"
                value={settings.webServerEngine}
                onChange={(e) => setSettings({ ...settings, webServerEngine: e.target.value })}
                className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block font-bold text-white mb-1.5">Garansi Uptime SLA</label>
              <input
                type="text"
                value={settings.uptimeSla}
                onChange={(e) => setSettings({ ...settings, uptimeSla: e.target.value })}
                className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#1B2433] flex justify-end">
            <button
              type="submit"
              className="bg-[#00E599] text-[#090C10] font-black text-xs px-6 py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4 stroke-[3]" />
              <span>Simpan Parameter Infrastruktur</span>
            </button>
          </div>
        </form>
      )}

      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Change Password Form */}
          <form onSubmit={handleChangePassword} className="bg-[#0F141C] border border-[#1B2433] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-[#1B2433]">
              <KeyRound className="w-5 h-5 text-[#00E599]" />
              <h2 className="text-base font-black text-white">Ganti Kredensial Password Admin</h2>
            </div>

            {passwordError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-white mb-1.5">Password Saat Ini</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block font-bold text-white mb-1.5">Password Baru</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 karakter"
                  className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block font-bold text-white mb-1.5">Ulangi Password Baru</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Konfirmasi password baru"
                  className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#1B2433] flex justify-end">
              <button
                type="submit"
                className="bg-[#00E599] text-[#090C10] font-black text-xs px-6 py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition cursor-pointer flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Perbarui Password</span>
              </button>
            </div>
          </form>

          {/* Database & Cache Purge */}
          <div className="bg-[#0F141C] border border-red-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <h2 className="text-base font-black">Zona Pembersihan Cache Data (Purge Storage)</h2>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Jika Anda ingin mengembalikan semua data katalog template, portofolio showcase, leads kontak, dan konfigurasi paket harga ke setelan pabrik bawaan WebHoster, tekan tombol di bawah ini.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClearCache}
                className="bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/40 font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Bersihkan &amp; Reset Seluruh Database Cache</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
