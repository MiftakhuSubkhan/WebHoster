"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Tag,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Eye,
  Star,
  Layers,
  ArrowRight,
  ShieldCheck,
  Server,
  DollarSign,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export interface FeatureCategory {
  categoryTitle: string;
  items: string[];
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
  featureCategories: FeatureCategory[];
  status?: "Aktif" | "Draft";
}

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
    status: "Aktif",
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
    status: "Aktif",
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
    status: "Aktif",
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

const BADGE_THEMES = [
  {
    key: "emerald",
    label: "Emerald Recomended",
    class: "bg-[#00E599] text-[#090C10] font-black shadow-[0_0_15px_rgba(0,229,153,0.4)]",
  },
  {
    key: "red",
    label: "Red Promo",
    class: "bg-red-500/15 text-red-400 border border-red-500/30",
  },
  {
    key: "purple",
    label: "Purple Exclusive",
    class: "bg-purple-500/20 text-purple-300 border border-purple-500/35",
  },
  {
    key: "blue",
    label: "Sky Cloud",
    class: "bg-sky-500/20 text-sky-300 border border-sky-500/35",
  },
  {
    key: "amber",
    label: "Amber Special",
    class: "bg-amber-500/20 text-amber-300 border border-amber-500/35",
  },
];

export default function PricingManagementPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [deletingPlan, setDeletingPlan] = useState<PricingPlan | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formBadgeText, setFormBadgeText] = useState("");
  const [formBadgeTheme, setFormBadgeTheme] = useState("emerald");
  const [formPrice, setFormPrice] = useState("");
  const [formPriceLabel, setFormPriceLabel] = useState("Harga Tahun Pertama");
  const [formRenewalPrice, setFormRenewalPrice] = useState("");
  const [formRenewalText, setFormRenewalText] = useState("Perpanjangan th ke-2 dst");
  const [formSavingsBadge, setFormSavingsBadge] = useState("");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formStatus, setFormStatus] = useState<"Aktif" | "Draft">("Aktif");
  const [formCtaText, setFormCtaText] = useState("Pesan Paket Sekarang →");
  const [formOrderUrl, setFormOrderUrl] = useState("");

  // Category & Feature items editor
  const [formCategories, setFormCategories] = useState<{ categoryTitle: string; itemsText: string }[]>([
    { categoryTitle: "FITUR UTAMA", itemsText: "10GB Web Space\nIntegrasi WhatsApp\nIntegrasi Google Maps\nDesain Responsif (HP/PC)" },
    { categoryTitle: "DOMAIN & HOSTING", itemsText: "Free Domain .com / .id Selama Berlangganan\nFree Hosting Selama Berlangganan" },
    { categoryTitle: "AKSES & KONTROL PANEL", itemsText: "Akses cPanel (Opsional)\nAkses Dashboard Admin Web" },
    { categoryTitle: "OPTIMASI & TRACKING", itemsText: "SEO On Page Full + Schema\nGoogle Analytics & Search" },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wh_pricing_packages");
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setPlans(parsed);
        } else {
          setPlans(DEFAULT_PRICING_PLANS);
          localStorage.setItem("wh_pricing_packages", JSON.stringify(DEFAULT_PRICING_PLANS));
        }
      } else {
        setPlans(DEFAULT_PRICING_PLANS);
        localStorage.setItem("wh_pricing_packages", JSON.stringify(DEFAULT_PRICING_PLANS));
      }
    } catch (e) {
      setPlans(DEFAULT_PRICING_PLANS);
    }
    setIsLoaded(true);
  }, []);

  const savePlans = (newPlans: PricingPlan[]) => {
    setPlans(newPlans);
    try {
      localStorage.setItem("wh_pricing_packages", JSON.stringify(newPlans));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("wh:pricing_updated"));
      }
    } catch (e) {
      console.error("Failed to save pricing plans:", e);
    }
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingPlan(null);
    setFormTitle("");
    setFormBadgeText("⭐ Rekomendasi");
    setFormBadgeTheme("emerald");
    setFormPrice("Rp 1.000.000");
    setFormPriceLabel("Harga Tahun Pertama");
    setFormRenewalPrice("Rp 800.000/th");
    setFormRenewalText("Perpanjangan th ke-2 dst");
    setFormSavingsBadge("Hemat Rp200rb");
    setFormFeatured(false);
    setFormStatus("Aktif");
    setFormCtaText("Pilih Paket Ini →");
    setFormOrderUrl("https://acc.jogjahost.co.id/index.php?rp=/store/web-design-sales-mobil/pro");
    setFormCategories([
      { categoryTitle: "FITUR UTAMA", itemsText: "5GB High Speed NVMe Storage\nIntegrasi WhatsApp & Maps\nDesain Responsif Mobile & Desktop" },
      { categoryTitle: "DOMAIN & HOSTING", itemsText: "Free Domain .com / .id\nFree Cloud NVMe Hosting" },
      { categoryTitle: "AKSES & KONTROL PANEL", itemsText: "Akses cPanel / Dashboard Admin\nFull Akses Konten Web" },
      { categoryTitle: "OPTIMASI & TRACKING", itemsText: "SEO On Page & Google Index\nAnalitik Kunjungan" },
    ]);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormTitle(plan.title);
    setFormBadgeText(plan.badgeText);

    // match badge theme
    const matchedTheme = BADGE_THEMES.find((bt) => bt.class === plan.badgeColorClass);
    setFormBadgeTheme(matchedTheme ? matchedTheme.key : "emerald");

    setFormPrice(plan.price);
    setFormPriceLabel(plan.priceLabel || "Harga Tahun Pertama");
    setFormRenewalPrice(plan.renewalPrice);
    setFormRenewalText(plan.renewalText || "Perpanjangan th ke-2 dst");
    setFormSavingsBadge(plan.savingsBadge);
    setFormFeatured(!!plan.featured);
    setFormStatus(plan.status || "Aktif");
    setFormCtaText(plan.ctaText);
    setFormOrderUrl(plan.orderUrl);

    // map featureCategories to editor format
    if (plan.featureCategories && plan.featureCategories.length > 0) {
      setFormCategories(
        plan.featureCategories.map((c) => ({
          categoryTitle: c.categoryTitle,
          itemsText: c.items.join("\n"),
        }))
      );
    } else {
      setFormCategories([
        { categoryTitle: "FITUR UTAMA", itemsText: "2GB Web Space\nIntegrasi WhatsApp\nDesain Responsif (HP/PC)" },
      ]);
    }

    setIsModalOpen(true);
  };

  // Save (Create or Update)
  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      alert("Nama paket wajib diisi!");
      return;
    }

    if (!formPrice.trim()) {
      alert("Harga paket wajib diisi!");
      return;
    }

    const selectedThemeObj = BADGE_THEMES.find((bt) => bt.key === formBadgeTheme) || BADGE_THEMES[0];

    // parse categories and items
    const parsedCategories: FeatureCategory[] = formCategories
      .map((cat) => ({
        categoryTitle: cat.categoryTitle.trim().toUpperCase() || "FITUR",
        items: cat.itemsText
          .split("\n")
          .map((i) => i.trim())
          .filter((i) => i.length > 0),
      }))
      .filter((cat) => cat.items.length > 0);

    if (editingPlan) {
      // Update existing
      const updated = plans.map((p) => {
        if (p.id === editingPlan.id) {
          return {
            ...p,
            title: formTitle.trim(),
            badgeText: formBadgeText.trim() || "Paket",
            badgeColorClass: selectedThemeObj.class,
            price: formPrice.trim(),
            priceLabel: formPriceLabel.trim() || "Harga Tahun Pertama",
            renewalPrice: formRenewalPrice.trim(),
            renewalText: formRenewalText.trim(),
            savingsBadge: formSavingsBadge.trim() || "Harga Spesial",
            featured: formFeatured,
            status: formStatus,
            ctaText: formCtaText.trim() || "Pilih Paket Ini →",
            orderUrl: formOrderUrl.trim() || "https://acc.jogjahost.co.id/index.php?rp=/store",
            featureCategories: parsedCategories,
          };
        }
        // If this plan is set to featured, unfeature others if desired, or keep multiple
        if (formFeatured && p.id !== editingPlan.id) {
          return { ...p, featured: false };
        }
        return p;
      });

      savePlans(updated);
      showToast(`Paket "${formTitle}" berhasil diperbarui!`);
    } else {
      // Create new
      const newId = `plan-${Date.now()}`;
      const newPlan: PricingPlan = {
        id: newId,
        title: formTitle.trim(),
        badgeText: formBadgeText.trim() || "Baru",
        badgeColorClass: selectedThemeObj.class,
        price: formPrice.trim(),
        priceLabel: formPriceLabel.trim() || "Harga Tahun Pertama",
        renewalPrice: formRenewalPrice.trim(),
        renewalText: formRenewalText.trim(),
        savingsBadge: formSavingsBadge.trim() || "Hemat",
        featured: formFeatured,
        status: formStatus,
        ctaText: formCtaText.trim() || "Pilih Paket Ini →",
        orderUrl: formOrderUrl.trim() || "https://acc.jogjahost.co.id/index.php?rp=/store",
        featureCategories: parsedCategories,
      };

      const updated = formFeatured
        ? plans.map((p) => ({ ...p, featured: false })).concat
        : [...plans, newPlan];

      savePlans;
      showToast(`Paket baru "${formTitle}" berhasil ditambahkan!`);
    }

    setIsModalOpen(false);
  };

  // Delete plan
  const handleConfirmDelete = () => {
    if (!deletingPlan) return;
    const updated = plans.filter((p) => p.id !== deletingPlan.id);
    savePlans(updated);
    showToast(`Paket "${deletingPlan.title}" berhasil dihapus.`);
    setDeletingPlan(null);
  };

  // Toggle Featured status
  const handleToggleFeatured = (id: string) => {
    const updated = plans.map((p) => ({
      ...p,
      featured: p.id === id ? !p.featured : false,
    }));
    savePlans(updated);
    showToast("Status Paket Unggulan berhasil diperbarui!");
  };

  // Toggle Status Aktif / Draft
  const handleToggleStatus = (id: string) => {
    const updated = plans.map((p) =>
      p.id === id ? { ...p, status: p.status === "Aktif" ? ("Draft" as const) : ("Aktif" as const) } : p
    );
    savePlans(updated);
    showToast("Status paket berhasil diubah!");
  };

  // Reset to default
  const handleResetDefault = () => {
    if (confirm("Kembalikan paket & harga ke konfigurasi bawaan (Basic, Pro, Premium)?")) {
      savePlans(DEFAULT_PRICING_PLANS);
      showToast("Paket & harga dikembalikan ke setelan default!");
    }
  };

  // Add Category to Form
  const handleAddCategory = () => {
    setFormCategories([
      ...formCategories,
      { categoryTitle: "KATEGORI BARU", itemsText: "Fitur 1\nFitur 2" },
    ]);
  };

  // Remove Category from Form
  const handleRemoveCategory = (index: number) => {
    setFormCategories(formCategories.filter((_, idx) => idx !== index));
  };

  // Update Category in Form
  const handleUpdateCategory = (index: number, title: string, text: string) => {
    const updated = [...formCategories];
    updated[index] = { categoryTitle: title, itemsText: text };
    setFormCategories(updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
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
            <span>Konfigurasi Paket &amp; Harga</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#00E599]/15 text-[#00E599] text-xs font-bold border border-[#00E599]/30">
              {plans.length} Paket
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Atur harga langganan, link WHMCS checkout, benefit hosting, dan diskon yang tampil di publik
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleResetDefault}
            title="Reset ke paket bawaan"
            className="bg-[#121824] hover:bg-[#1B2433] text-[#94A3B8] hover:text-white border border-[#1B2433] text-xs font-bold py-2.5 px-3.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Default</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="bg-[#00E599] text-[#090C10] font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Tambah Paket Baru</span>
          </button>
        </div>
      </div>

      {/* 3. Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => {
          const isPro = plan.featured;

          return (
            <div
              key={plan.id}
              className={`bg-[#0F141C] rounded-3xl flex flex-col justify-between transition-all duration-300 relative border group ${isPro
                ? "border-[#00E599] shadow-[0_0_35px_rgba(0,229,153,0.2)]"
                : "border-[#1B2433] hover:border-[#00E599]/60 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                }`}
            >
              {/* Top Banner & Badges */}
              <div className="p-6 sm:p-7 pb-4">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`inline-block text-[11px] font-extrabold uppercase px-3 py-1 rounded-full ${plan.badgeColorClass}`}>
                    {plan.badgeText}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Status badge button */}
                    <button
                      onClick={() => handleToggleStatus(plan.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md cursor-pointer transition ${plan.status === "Aktif" || !plan.status
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                        }`}
                      title="Klik untuk ubah status Aktif/Draft"
                    >
                      {plan.status || "Aktif"}
                    </button>

                    {/* Featured star button */}
                    <button
                      onClick={() => handleToggleFeatured(plan.id)}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${plan.featured
                        ? "bg-[#00E599]/20 text-[#00E599] border-[#00E599]/50 shadow-[0_0_10px_rgba(0,229,153,0.3)]"
                        : "bg-[#121824] text-[#64748B] border-[#1B2433] hover:text-[#00E599]"
                        }`}
                      title={plan.featured ? "Paket Unggulan Aktif" : "Jadikan Paket Unggulan"}
                    >
                      <Star className={`w-3.5 h-3.5 ${plan.featured ? "fill-[#00E599]" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Plan Title & Price */}
                <div className="mb-5">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-2xl font-black text-white">{plan.title}</h3>
                    <span className="text-xs text-[#94A3B8] font-medium">{plan.priceLabel || "Harga Th Pertama"}</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1.5">
                    <span className={`text-3xl font-black font-mono tracking-tight ${isPro ? "text-[#00E599]" : "text-white"}`}>
                      {plan.price}
                    </span>
                  </div>
                </div>

                {/* Renewal Price Box */}
                <div className="bg-[#151E2C] border border-[#26354A] rounded-2xl p-3.5 mb-5 flex items-center justify-between gap-2 shadow-inner">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-300 font-semibold">
                      <span>🔄</span>
                      <span>{plan.renewalText || "Perpanjangan:"}</span>
                    </div>
                    <div className="text-sm font-black text-white font-mono mt-0.5 tracking-tight">
                      {plan.renewalPrice}
                    </div>
                  </div>
                  <span className="bg-[#00E599]/20 text-[#00E599] border border-[#00E599]/50 text-[10px] font-black px-2.5 py-1 rounded-full whitespace-nowrap">
                    {plan.savingsBadge}
                  </span>
                </div>

                {/* Feature Categories */}
                <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
                  {plan.featureCategories?.map((cat, cIdx) => (
                    <div key={cIdx} className="space-y-1.5">
                      <div className="text-[10px] font-mono font-extrabold text-[#00E599] uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
                        <span>{cat.categoryTitle}</span>
                      </div>
                      <div className="space-y-1 pl-2.5">
                        {cat.items.map((item, iIdx) => (
                          <div key={iIdx} className="flex items-start gap-2 text-[11px] text-slate-300">
                            <Check className="w-3 h-3 text-[#00E599] shrink-0 mt-0.5" />
                            <span className="leading-tight">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* WHMCS Order Link Preview */}
                <div className="mt-5 pt-3 border-t border-[#1B2433]">
                  <div className="text-[10px] text-[#64748B] font-mono uppercase mb-1 flex items-center justify-between">
                    <span>Target WHMCS Store URL:</span>
                    <a
                      href={plan.orderUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#00E599] hover:underline flex items-center gap-1"
                    >
                      <span>Test Link</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 truncate bg-[#090C10] px-2.5 py-1.5 rounded-lg border border-[#1B2433]">
                    {plan.orderUrl}
                  </div>
                </div>
              </div>

              {/* Card Bottom Actions */}
              <div className="p-6 sm:p-7 pt-3 border-t border-[#1B2433] bg-[#090C10]/40 rounded-b-3xl flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(plan)}
                  className="flex-1 bg-[#121824] hover:bg-[#00E599] text-white hover:text-[#090C10] border border-[#1B2433] hover:border-[#00E599] font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Ubah Konfigurasi</span>
                </button>

                <button
                  onClick={() => setDeletingPlan(plan)}
                  title="Hapus Paket"
                  className="bg-[#121824] hover:bg-red-500/20 text-[#64748B] hover:text-red-400 border border-[#1B2433] hover:border-red-500/40 p-2.5 rounded-xl transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. MODAL EDIT / TAMBAH PAKET */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#090C10]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#0F141C] border border-[#00E599]/50 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-[0_0_60px_rgba(0,229,153,0.25)] animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[#94A3B8] hover:text-white bg-[#090C10] border border-[#1B2433] rounded-full p-2 transition cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#00E599]/15 border border-[#00E599]/30 flex items-center justify-center text-[#00E599]">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">
                  {editingPlan ? `Ubah Konfigurasi: ${editingPlan.title}` : "Tambah Paket Harga Baru"}
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  Atur spesifikasi, harga, badge, dan link checkout WHMCS untuk paket ini.
                </p>
              </div>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-6">
              {/* Row 1: Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Nama Paket <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="misal: Pro / Basic / Enterprise"
                    className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Teks Badge
                  </label>
                  <input
                    type="text"
                    value={formBadgeText}
                    onChange={(e) => setFormBadgeText(e.target.value)}
                    placeholder="misal: ⭐ Paling Rekomendasi"
                    className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">
                    Warna Badge
                  </label>
                  <select
                    value={formBadgeTheme}
                    onChange={(e) => setFormBadgeTheme(e.target.value)}
                    className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition cursor-pointer"
                  >
                    {BADGE_THEMES.map((theme) => (
                      <option key={theme.key} value={theme.key} className="bg-[#0F141C]">
                        {theme.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Pricing Details */}
              <div className="bg-[#121824] border border-[#1B2433] rounded-2xl p-4 space-y-4">
                <div className="text-xs font-mono font-bold text-[#00E599] uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Rincian Harga &amp; Penghematan</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white mb-1.5">
                      Harga Tahun Pertama <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="misal: Rp 1.300.000"
                      className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-[#00E599] font-mono font-bold focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white mb-1.5">
                      Label Harga
                    </label>
                    <input
                      type="text"
                      value={formPriceLabel}
                      onChange={(e) => setFormPriceLabel(e.target.value)}
                      placeholder="misal: Harga Tahun Pertama"
                      className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white mb-1.5">
                      Harga Perpanjangan (Tahun ke-2 dst)
                    </label>
                    <input
                      type="text"
                      value={formRenewalPrice}
                      onChange={(e) => setFormRenewalPrice(e.target.value)}
                      placeholder="misal: Rp 900.000/th"
                      className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white mb-1.5">
                      Badge Diskon / Hemat
                    </label>
                    <input
                      type="text"
                      value={formSavingsBadge}
                      onChange={(e) => setFormSavingsBadge(e.target.value)}
                      placeholder="misal: Hemat Rp400rb"
                      className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: WHMCS Link & CTA */}
              <div className="bg-[#121824] border border-[#1B2433] rounded-2xl p-4 space-y-4">
                <div className="text-xs font-mono font-bold text-[#00E599] uppercase tracking-wider flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Integrasi WHMCS &amp; Tombol CTA</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-white mb-1.5">
                      Link / URL Checkout WHMCS <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={formOrderUrl}
                      onChange={(e) => setFormOrderUrl(e.target.value)}
                      placeholder="https://acc.jogjahost.co.id/index.php?rp=/store/web-design-sales-mobil/pro"
                      className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-[#64748B] focus:outline-none transition"
                    />
                    <p className="text-[10px] text-[#64748B] mt-1">
                      URL order store WHMCS yang akan dibuka saat pelanggan memilih paket ini.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white mb-1.5">
                      Teks Tombol CTA
                    </label>
                    <input
                      type="text"
                      value={formCtaText}
                      onChange={(e) => setFormCtaText(e.target.value)}
                      placeholder="misal: Pesan Paket Pro Sekarang →"
                      className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-5">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formFeatured}
                        onChange={(e) => setFormFeatured(e.target.checked)}
                        className="w-4 h-4 rounded border-[#1B2433] bg-[#090C10] text-[#00E599] focus:ring-[#00E599] focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-xs font-bold text-white">⭐ Paket Unggulan (Featured Glow)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formStatus === "Aktif"}
                        onChange={(e) => setFormStatus(e.target.checked ? "Aktif" : "Draft")}
                        className="w-4 h-4 rounded border-[#1B2433] bg-[#090C10] text-[#00E599] focus:ring-[#00E599] focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-xs font-bold text-white">Status Aktif (Tampil di Web)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Row 4: Feature Categories Editor */}
              <div className="bg-[#121824] border border-[#1B2433] rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono font-bold text-[#00E599] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Kategori Fitur &amp; Benefit Paket</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="text-xs text-[#00E599] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Kategori Fitur</span>
                  </button>
                </div>

                <div className="space-y-3.5">
                  {formCategories.map((cat, idx) => (
                    <div key={idx} className="bg-[#090C10] border border-[#1B2433] rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={cat.categoryTitle}
                          onChange={(e) => handleUpdateCategory(idx, e.target.value, cat.itemsText)}
                          placeholder="NAMA KATEGORI (misal: FITUR UTAMA)"
                          className="bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-[#00E599] uppercase w-64 focus:outline-none"
                        />
                        {formCategories.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCategory(idx)}
                            className="text-[#64748B] hover:text-red-400 p-1 transition cursor-pointer"
                            title="Hapus Kategori Ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div>
                        <textarea
                          rows={3}
                          value={cat.itemsText}
                          onChange={(e) => handleUpdateCategory(idx, cat.categoryTitle, e.target.value)}
                          placeholder="Tulis 1 fitur per baris...&#10;Contoh:&#10;10GB Web Space&#10;Integrasi WhatsApp"
                          className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-lg p-2 text-xs text-slate-200 placeholder-[#64748B] focus:outline-none transition leading-relaxed font-sans"
                        />
                        <div className="text-[10px] text-[#64748B]">
                          💡 Tip: Pisahkan setiap poin fitur dengan baris baru (Enter).
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1B2433]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#1B2433] text-xs font-bold text-[#94A3B8] hover:text-white transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#00E599] text-[#090C10] font-black text-xs px-6 py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{editingPlan ? "Simpan Perubahan" : "Tambahkan Paket"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL KONFIRMASI HAPUS */}
      {deletingPlan && (
        <div className="fixed inset-0 z-50 bg-[#090C10]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F141C] border border-red-500/50 rounded-3xl max-w-md w-full p-6 relative shadow-[0_0_50px_rgba(239,68,68,0.25)] animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h2 className="text-lg font-black text-white text-center mb-1.5">
              Hapus Paket &ldquo;{deletingPlan.title}&rdquo;?
            </h2>
            <p className="text-xs text-[#94A3B8] text-center mb-6 leading-relaxed">
              Paket ini tidak akan lagi tampil di halaman publik <span className="text-white font-mono">/harga#paket-harga</span>. Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeletingPlan(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#1B2433] text-xs font-bold text-[#94A3B8] hover:text-white transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black text-xs py-2.5 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.4)] transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Paket</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
