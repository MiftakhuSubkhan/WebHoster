"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  Search,
  Check,
  X,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Eye,
  Tag,
  Upload,
  Image as ImageIcon,
  Link2,
  FolderUp,
  Globe,
  Layers,
  Building2,
  ShoppingBag,
  Cpu,
  ShieldCheck,
  Smartphone,
  Lock,
} from "lucide-react";

import {
  PortfolioProjectItem,
  getPortfolioProjects,
  savePortfolioProjects,
  resetPortfolioToDefault,
  matchProjectCategory,
  getCategorySlugFromLabel,
  PORTFOLIO_CATEGORIES,
  syncPortfoliosWithSupabase,
} from "@/lib/portfolio";

const CATEGORIES = [
  "Semua",
  ...PORTFOLIO_CATEGORIES.filter((c) => c.key !== "all").map((c) => c.label),
];

export default function PortfolioManagementPage() {
  const [projects, setProjects] = useState<PortfolioProjectItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProjectItem | null>(null);

  // Delete Confirmation State
  const [deletingProject, setDeletingProject] = useState<PortfolioProjectItem | null>(null);

  // Form inputs
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Company Profile");
  const [formIndustry, setFormIndustry] = useState("");
  const [formTemplateBasis, setFormTemplateBasis] = useState("Nusantara Corporate Pro");
  const [formDomain, setFormDomain] = useState("");
  const [formStatus, setFormStatus] = useState<"Live" | "Draft">("Live");
  const [formDescription, setFormDescription] = useState("");
  const [formHighlights, setFormHighlights] = useState("");
  const [formFeatures, setFormFeatures] = useState("");
  const [formTech, setFormTech] = useState("");
  const [formImage, setFormImage] = useState("");
  const [imageUploadType, setImageUploadType] = useState<"file" | "url">("file");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toast alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Load from localStorage & sync events
  useEffect(() => {
    const sync = () => {
      try {
        setProjects(getPortfolioProjects());
      } catch (e) {}
      setIsLoaded(true);
    };

    sync();
    syncPortfoliosWithSupabase().then(() => sync()).catch(() => {});

    if (typeof window !== "undefined") {
      window.addEventListener("wh:portfolio_updated", sync);
      window.addEventListener("storage", sync);
      return () => {
        window.removeEventListener("wh:portfolio_updated", sync);
        window.removeEventListener("storage", sync);
      };
    }
  }, []);

  // Save to localStorage & broadcast event
  const saveProjects = (updated: PortfolioProjectItem[]) => {
    setProjects(updated);
    savePortfolioProjects(updated);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormTitle("");
    setFormCategory("Company Profile");
    setFormIndustry("");
    setFormTemplateBasis("Nusantara Corporate Pro");
    setFormDomain("");
    setFormStatus("Live");
    setFormDescription("");
    setFormHighlights("Basis: Nusantara Corp • Skor SEO 95+");
    setFormFeatures("Katalog Proyek Terintegrasi\nFormulir Penawaran Tender\nSertifikasi ISO & Legalitas\nOptimasi Google Search Console");
    setFormTech("WordPress + Elementor Pro, SEO Schema, Cloud NVMe, Domain Resmi");
    setFormImage("");
    setImageUploadType("file");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (proj: PortfolioProjectItem) => {
    setEditingProject(proj);
    setFormTitle(proj.title);
    setFormCategory(proj.categoryLabel || "Company Profile");
    setFormIndustry(proj.industry || "");
    setFormTemplateBasis(proj.templateBasis || "");
    setFormDomain(proj.liveUrlMock || "");
    setFormStatus(proj.status || "Live");
    setFormDescription(proj.description || "");
    setFormHighlights(proj.highlights || "");
    setFormFeatures(Array.isArray(proj.features) ? proj.features.join("\n") : "");
    setFormTech(Array.isArray(proj.tech) ? proj.tech.join(", ") : "");
    setFormImage(proj.image || "");
    setImageUploadType(proj.image && proj.image.startsWith("data:") ? "file" : "url");
    setIsModalOpen(true);
  };

  // Handle Image File Selection & convert to Base64
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Harap pilih file gambar (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2MB agar penyimpanan browser optimal.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFormImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Modal (Create or Edit)
  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      alert("Nama Klien / Judul Proyek tidak boleh kosong.");
      return;
    }

    // Determine category key from helper
    const catKey = getCategorySlugFromLabel(formCategory);

    // Split features & tech
    const parsedFeatures = formFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const parsedTech = formTech
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingProject) {
      // Edit existing
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? {
            ...p,
            title: formTitle.trim(),
            category: catKey,
            categoryLabel: formCategory,
            industry: formIndustry.trim() || "Bisnis & Komersial",
            templateBasis: formTemplateBasis.trim() || "Nusantara Corporate Pro",
            liveUrlMock: formDomain.trim().replace(/^https?:\/\//, "") || "clientdomain.com",
            status: formStatus,
            description: formDescription.trim(),
            highlights: formHighlights.trim() || `Basis: ${formTemplateBasis}`,
            features: parsedFeatures.length > 0 ? parsedFeatures : ["100% Mobile Friendly", "Optimasi Kecepatan NVMe"],
            tech: parsedTech.length > 0 ? parsedTech : ["WordPress", "Elementor Pro", "Cloud NVMe"],
            image: formImage.trim() || undefined,
          }
          : p
      );
      saveProjects(updated);
      showToast(`Portofolio "${formTitle}" berhasil diperbarui!`);
    } else {
      // Create new
      const newProj: PortfolioProjectItem = {
        id: "proj-" + Date.now(),
        title: formTitle.trim(),
        category: catKey,
        categoryLabel: formCategory,
        industry: formIndustry.trim() || "Bisnis & Komersial",
        templateBasis: formTemplateBasis.trim() || "Nusantara Corporate Pro",
        liveUrlMock: formDomain.trim().replace(/^https?:\/\//, "") || "clientdomain.com",
        status: formStatus,
        description: formDescription.trim() || "Website klien profesional dengan infrastruktur performa tinggi WebHoster.",
        highlights: formHighlights.trim() || `Basis: ${formTemplateBasis}`,
        features: parsedFeatures.length > 0 ? parsedFeatures : ["Desain Responsif iOS & Android", "Integrasi WhatsApp CS"],
        tech: parsedTech.length > 0 ? parsedTech : ["WordPress", "Elementor Pro", "Cloud NVMe", "Domain Resmi"],
        gradientBg: "from-[#0F2027] via-[#203A43] to-[#2C5364]",
        iconBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        image: formImage.trim() || undefined,
      };
      saveProjects([newProj, ...projects]);
      showToast(`Portofolio "${formTitle}" berhasil ditambahkan!`);
    }

    setIsModalOpen(false);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deletingProject) return;
    const updated = projects.filter((p) => p.id !== deletingProject.id);
    saveProjects(updated);
    showToast(`Portofolio "${deletingProject.title}" berhasil dihapus.`);
    setDeletingProject(null);
  };

  // Reset to default showcase
  const handleResetDefault = () => {
    if (confirm("Kembalikan daftar portofolio ke konfigurasi contoh bawaan WebHoster?")) {
      const defaults = resetPortfolioToDefault();
      setProjects(defaults);
      showToast("Daftar portofolio telah direset ke default.");
    }
  };

  // Filtered list
  const filteredProjects = projects.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.liveUrlMock.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.templateBasis.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCat = matchProjectCategory(p, selectedCategory);

    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F141C] border border-[#00E599] text-[#00E599] px-4 py-3 rounded-2xl shadow-[0_0_30px_rgba(0,229,153,0.3)] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-bold text-white">{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>Kelola Portofolio Klien</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#00E599]/15 text-[#00E599] text-xs font-bold border border-[#00E599]/30">
              {projects.length} Proyek
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Kelola karya live website klien yang ditampilkan di halaman publik <Link href="/portofolio" target="_blank" className="text-[#00E599] hover:underline font-semibold">/portofolio</Link>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleResetDefault}
            title="Reset ke data bawaan"
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
            <span>Tambah Portofolio</span>
          </button>
        </div>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama klien, domain, industri, atau template..."
            className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#64748B] focus:outline-none transition shadow-inner"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${selectedCategory === cat
                ? "bg-[#00E599] text-[#090C10] shadow-[0_0_12px_rgba(0,229,153,0.3)]"
                : "bg-[#121824] text-[#94A3B8] border border-[#1B2433] hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Portfolio Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-[#0F141C] border border-[#1B2433] hover:border-[#00E599]/60 rounded-3xl overflow-hidden hover:shadow-[0_15px_35px_rgba(0,229,153,0.15)] transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Browser Header Bar */}
              <div className="bg-[#121824] px-4 py-2.5 border-b border-[#1B2433] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#EF4444]/70" />
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B]/70" />
                  <div className="w-2 h-2 rounded-full bg-[#10B981]/70" />
                </div>
                <div className="bg-[#090C10] px-2.5 py-0.5 rounded text-[10px] text-[#64748B] font-mono flex items-center gap-1 max-w-[170px] truncate">
                  <Lock className="w-2.5 h-2.5 text-[#00E599]" />
                  <span>https://{proj.liveUrlMock}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${proj.status === "Live"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}
                >
                  {proj.status}
                </span>
              </div>

              {/* Thumbnail Image / Visual Banner */}
              <div className="relative h-44 bg-[#090C10] overflow-hidden border-b border-[#1B2433]">
                {proj.image ? (
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${proj.gradientBg || "from-slate-900 to-slate-800"} flex flex-col items-center justify-center p-4 text-center`}>
                    <Building2 className="w-8 h-8 text-[#00E599] mb-1 opacity-70" />
                    <span className="text-[11px] font-bold text-white/80">{proj.industry}</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F141C] via-transparent to-transparent opacity-60 pointer-events-none" />

                <div className="absolute top-3 left-3 bg-[#090C10]/85 backdrop-blur-md text-[#00E599] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#00E599]/30">
                  {proj.categoryLabel}
                </div>

                <div className="absolute bottom-2.5 left-3 text-[10px] font-bold text-white font-mono bg-[#090C10]/90 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                  {proj.industry}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5">
                <h3 className="text-base font-black text-white group-hover:text-[#00E599] transition-colors line-clamp-1 mb-1">
                  {proj.title}
                </h3>
                <div className="text-[11px] text-[#00E599] font-medium mb-3 flex items-center gap-1.5">
                  <span className="text-[#64748B]">Template:</span>
                  <span className="font-semibold">{proj.templateBasis}</span>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2 mb-4">
                  {proj.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {proj.tech?.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-[#090C10] text-slate-300 px-2 py-0.5 rounded border border-[#1B2433] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                  {proj.tech && proj.tech.length > 3 && (
                    <span className="text-[10px] bg-[#090C10] text-[#00E599] px-1.5 py-0.5 rounded border border-[#1B2433] font-mono">
                      +{proj.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-5 pt-0 border-t border-[#1B2433]/70 mt-3 pt-3 flex items-center justify-between gap-2">
              <a
                href={`https://${proj.liveUrlMock}`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-[#00E599] hover:underline flex items-center gap-1"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="px-3 py-1.5 bg-[#121824] hover:bg-[#1B2433] text-white hover:text-[#00E599] border border-[#1B2433] hover:border-[#00E599]/40 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#00E599]" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => setDeletingProject(proj)}
                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl transition cursor-pointer"
                  title="Hapus Portofolio"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl p-12 text-center">
          <Briefcase className="w-12 h-12 text-[#64748B] mx-auto mb-3 opacity-50" />
          <h3 className="text-base font-bold text-white mb-1">Tidak ada portofolio yang cocok</h3>
          <p className="text-xs text-[#94A3B8] mb-4">
            Coba gunakan kata kunci pencarian lain atau klik tombol reset.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("Semua");
            }}
            className="px-4 py-2 rounded-xl bg-[#00E599] text-[#090C10] font-bold text-xs"
          >
            Reset Filter Pencarian
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Tambah / Edit Showcase Portofolio */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#090C10]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0F141C] border border-[#00E599]/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-[0_0_60px_rgba(0,229,153,0.25)] animate-in fade-in zoom-in-95 duration-200 my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[#94A3B8] hover:text-white bg-[#090C10] border border-[#1B2433] rounded-full p-2 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-1">
              <span className="p-2 rounded-xl bg-[#00E599]/15 text-[#00E599]">
                <Briefcase className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-black text-white">
                  {editingProject ? "Edit Showcase Portofolio" : "Tambah Portofolio Klien Baru"}
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  {editingProject
                    ? "Perbarui rincian showcase website klien."
                    : "Tambahkan website hasil karya klien ke katalog portofolio."}
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 mt-6">
              {/* Row 1: Nama Klien & Kategori */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Nama Klien / Judul Proyek <span className="text-[#00E599]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Contoh: PT. Nusantara Jaya Konstruksi"
                    className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none transition shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Kategori Portofolio <span className="text-[#00E599]">*</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition cursor-pointer"
                  >
                    <option value="Company Profile">Company Profile (Korporat / PT / CV)</option>
                    <option value="Toko Online">Toko Online (E-Commerce &amp; Katalog WA)</option>
                    <option value="Landing Page">Landing Page (Jasa &amp; Direct Conversion)</option>
                    <option value="Klinik & Kesehatan">Klinik &amp; Kesehatan</option>
                    <option value="Kuliner / Cafe">Kuliner / Cafe &amp; Resto</option>
                    <option value="Otomotif & Dealer">Otomotif &amp; Dealer</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Industri & Basis Template */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Sektor Industri / Usaha <span className="text-[#00E599]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formIndustry}
                    onChange={(e) => setFormIndustry(e.target.value)}
                    placeholder="Contoh: Konstruksi & Kontraktor Nasional"
                    className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none transition shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Basis Template WordPress
                  </label>
                  <input
                    type="text"
                    value={formTemplateBasis}
                    onChange={(e) => setFormTemplateBasis(e.target.value)}
                    placeholder="Contoh: Nusantara Corporate Pro"
                    className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none transition shadow-inner"
                  />
                </div>
              </div>

              {/* Row 3: Domain & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Domain / URL Website Live <span className="text-[#00E599]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formDomain}
                    onChange={(e) => setFormDomain(e.target.value)}
                    placeholder="Contoh: nusantarajayakonstruksi.co.id"
                    className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none transition font-mono shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Status Publikasi
                  </label>
                  <div className="flex items-center gap-3 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                      <input
                        type="radio"
                        name="port_status"
                        value="Live"
                        checked={formStatus === "Live"}
                        onChange={() => setFormStatus("Live")}
                        className="accent-[#00E599]"
                      />
                      <span>🟢 Live (Ditampilkan)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#94A3B8]">
                      <input
                        type="radio"
                        name="port_status"
                        value="Draft"
                        checked={formStatus === "Draft"}
                        onChange={() => setFormStatus("Draft")}
                        className="accent-[#00E599]"
                      />
                      <span>⚪ Draft (Disembunyikan)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Row 4: Deskripsi Proyek */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                  Deskripsi Hasil Karya Klien
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Ceritakan gambaran singkat fitur, keunggulan, dan profil website yang dibangun..."
                  className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none transition resize-none shadow-inner"
                />
              </div>

              {/* Row 5: Highlights / Skor SEO */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                  Highlight Kunci &amp; Skor Performa
                </label>
                <input
                  type="text"
                  value={formHighlights}
                  onChange={(e) => setFormHighlights(e.target.value)}
                  placeholder="Contoh: Basis: Nusantara Corp • Skor SEO 98"
                  className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none transition shadow-inner"
                />
              </div>

              {/* Row 6: Fitur & Tech Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Fitur Utama (Satu per baris)
                  </label>
                  <textarea
                    rows={3}
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                    placeholder="Contoh:&#10;Interactive Project Slider&#10;Form Request Penawaran&#10;Optimasi Google Search"
                    className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#64748B] focus:outline-none transition resize-none shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                    Teknologi / Tech Stack (Pisahkan koma)
                  </label>
                  <textarea
                    rows={3}
                    value={formTech}
                    onChange={(e) => setFormTech(e.target.value)}
                    placeholder="Contoh: WordPress + Elementor Pro, SEO Schema, Cloud NVMe, Domain Resmi"
                    className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#64748B] focus:outline-none transition resize-none shadow-inner font-mono"
                  />
                </div>
              </div>

              {/* Row 7: Gambar Preview / Upload Screenshot */}
              <div className="bg-[#121824] border border-[#1B2433] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#00E599]" />
                    <span>Foto / Screenshot Portofolio Website</span>
                  </label>

                  <div className="flex items-center gap-1 bg-[#090C10] p-0.5 rounded-lg border border-[#1B2433] text-[11px]">
                    <button
                      type="button"
                      onClick={() => setImageUploadType("file")}
                      className={`px-2.5 py-1 rounded-md font-bold transition ${imageUploadType === "file"
                        ? "bg-[#00E599] text-[#090C10]"
                        : "text-[#94A3B8] hover:text-white"
                        }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUploadType("url")}
                      className={`px-2.5 py-1 rounded-md font-bold transition ${imageUploadType === "url"
                        ? "bg-[#00E599] text-[#090C10]"
                        : "text-[#94A3B8] hover:text-white"
                        }`}
                    >
                      Input URL
                    </button>
                  </div>
                </div>

                {imageUploadType === "file" ? (
                  <div className="space-y-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#1B2433] hover:border-[#00E599]/60 hover:bg-[#090C10]/60 rounded-xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
                    >
                      <FolderUp className="w-8 h-8 text-[#00E599] group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="text-xs font-bold text-white">
                          Klik untuk pilih screenshot website klien
                        </span>
                        <p className="text-[10px] text-[#94A3B8] mt-0.5">
                          Mendukung PNG, JPG, WebP (Maks. 2MB)
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://images.unsplash.com/... atau URL gambar langsung"
                      className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none font-mono"
                    />
                  </div>
                )}

                {/* Live Preview Box */}
                {formImage && (
                  <div className="mt-3 pt-3 border-t border-[#1B2433] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={formImage}
                        alt="Preview"
                        className="w-16 h-10 object-cover rounded-lg border border-[#00E599]/40"
                      />
                      <span className="text-[11px] text-[#00E599] font-medium flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Gambar siap digunakan</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFormImage("")}
                      className="text-xs text-red-400 hover:text-red-300 underline"
                    >
                      Hapus Gambar
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1B2433]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#1B2433] text-[#94A3B8] hover:text-white text-xs font-bold transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00E599] text-[#090C10] font-black text-xs hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{editingProject ? "Simpan Perubahan" : "Tambahkan ke Portofolio"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Konfirmasi Hapus Portofolio */}
      {/* ========================================================================= */}
      {deletingProject && (
        <div className="fixed inset-0 z-50 bg-[#090C10]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F141C] border border-red-500/40 rounded-3xl max-w-md w-full p-6 text-center shadow-[0_0_50px_rgba(239,68,68,0.25)] animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-white mb-2">Hapus Showcase Portofolio?</h3>
            <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">
              Apakah Anda yakin ingin menghapus portofolio{" "}
              <span className="text-white font-bold">"{deletingProject.title}"</span>? Data yang dihapus tidak akan muncul lagi di halaman klien.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingProject(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-[#1B2433] text-[#94A3B8] hover:text-white text-xs font-bold transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)] transition cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
