"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  LayoutTemplate,
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
} from "lucide-react";
import { getTemplateViews, formatViewCount } from "@/lib/analytics";
import {
  TemplateCatalogItem as TemplateItem,
  getTemplates,
  saveTemplates as persistTemplates,
  syncTemplatesWithSupabase,
  DEFAULT_TEMPLATES_CATALOG as DEFAULT_TEMPLATES,
} from "@/lib/templates";



const CATEGORIES = [
  "Semua",
  "Company Profile",
  "Otomotif",
  "Toko Online",
  "Travel & Tour",
  "F&B / Resto",
];

export default function TemplatesManagementPage() {
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [views, setViews] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<TemplateItem | null>(null);

  const [deletingTemplate, setDeletingTemplate] = useState<TemplateItem | null>(null);

  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Company Profile");
  const [formBadge, setFormBadge] = useState("Baru");
  const [formStatus, setFormStatus] = useState<"Aktif" | "Draft">("Aktif");
  const [formFeatures, setFormFeatures] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDemoUrl, setFormDemoUrl] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [imageUploadType, setImageUploadType] = useState<"file" | "url">("file");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    const sync = () => {
      try {
        setTemplates(getTemplates());
      } catch (e) {}
      setIsLoaded(true);
    };

    sync();
    syncTemplatesWithSupabase().then(() => sync()).catch(() => {});

    const syncViews = () => {
      try {
        setViews(getTemplateViews());
      } catch (e) {}
    };

    syncViews();

    if (typeof window !== "undefined") {
      window.addEventListener("wh:template_viewed", syncViews);
      window.addEventListener("wh:templates_updated", sync);
      window.addEventListener("storage", sync);
      return () => {
        window.removeEventListener("wh:template_viewed", syncViews);
        window.removeEventListener("wh:templates_updated", sync);
        window.removeEventListener("storage", sync);
      };
    }
  }, []);

  const saveTemplates = (newTemplates: TemplateItem[]) => {
    setTemplates(newTemplates);
    persistTemplates(newTemplates);
  };


  const handleResetDefaults = () => {
    if (confirm("Reset katalog kembali ke 6 template bawaan default dengan gambar?")) {
      saveTemplates(DEFAULT_TEMPLATES);
      showToast("Katalog template berhasil di-reset ke default!");
    }
  };

  const handleOpenCreateModal = () => {
    setEditingTemplate(null);
    setFormName("");
    setFormCategory("Company Profile");
    setFormBadge("Baru");
    setFormStatus("Aktif");
    setFormFeatures(
      "Listing Desain Siap Pakai\n100% Responsif di Smartphone & PC\nIntegrasi WhatsApp CS Otomatis\nOptimasi SEO Google PageSpeed 95+"
    );
    setFormDescription("");
    setFormDemoUrl("https://demo.webhoster.co.id/");
    setFormImageUrl("");
    setImageUploadType("file");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (tpl: TemplateItem) => {
    setEditingTemplate(tpl);
    setFormName(tpl.name);
    setFormCategory(tpl.category);
    setFormBadge(tpl.badge || "Populer");
    setFormStatus(tpl.status);
    setFormFeatures(
      Array.isArray(tpl.features) && tpl.features.length > 0
        ? tpl.features.join("\n")
        : "Listing Desain Siap Pakai\n100% Responsif di Smartphone & PC\nIntegrasi WhatsApp CS Otomatis\nOptimasi SEO Google PageSpeed 95+"
    );
    setFormDescription(tpl.description || "");
    setFormDemoUrl(tpl.demoUrl || "https://demo.webhoster.co.id/");
    setFormImageUrl(tpl.imageUrl || "");
    setImageUploadType(tpl.imageUrl?.startsWith("data:") ? "file" : "url");
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran file gambar maksimal 10 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 500;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
          setFormImageUrl(compressedDataUrl);
        } else {
          setFormImageUrl(readerEvent.target?.result as string);
        }
      };
      img.src = readerEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const parseFeatures = (text: string): string[] => {
    const lines = text
      .split("\n")
      .map((f) => f.trim().replace(/^[-•*]\s*/, ""))
      .filter(Boolean);
    if (lines.length === 1 && lines[0].includes(",")) {
      return lines[0].split(",").map((f) => f.trim()).filter(Boolean);
    }
    return lines;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim()) {
      alert("Nama template tidak boleh kosong!");
      return;
    }

    const parsedFeatures = parseFeatures(formFeatures);
    const finalFeatures =
      parsedFeatures.length > 0
        ? parsedFeatures
        : [
            "Listing Desain Siap Pakai",
            "100% Responsif di Smartphone & PC",
            "Integrasi WhatsApp CS Otomatis",
            "Optimasi SEO Google PageSpeed 95+",
          ];

    if (editingTemplate) {
      const updated = templates.map((t) =>
        t.id === editingTemplate.id
          ? {
            ...t,
            name: formName.trim(),
            category: formCategory,
            badge: formBadge.trim(),
            status: formStatus,
            features: finalFeatures,
            description: formDescription.trim(),
            demoUrl: formDemoUrl.trim(),
            imageUrl: formImageUrl.trim(),
          }
          : t
      );
      saveTemplates(updated);
      showToast(`Template "${formName}" berhasil diperbarui!`);
    } else {
      const newTpl: TemplateItem = {
        id: "tpl-" + Date.now(),
        name: formName.trim(),
        category: formCategory,
        badge: formBadge.trim() || "Baru",
        status: formStatus,
        features: finalFeatures,
        description: formDescription.trim() || "Template siap pakai dengan Elementor & responsive design.",
        demoUrl: formDemoUrl.trim() || "https://demo.webhoster.co.id/",
        imageUrl: formImageUrl.trim() || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
      };
      saveTemplates([newTpl, ...templates]);
      showToast(`Template "${formName}" berhasil ditambahkan ke katalog!`);
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (!deletingTemplate) return;
    const filtered = templates.filter((t) => t.id !== deletingTemplate.id);
    saveTemplates(filtered);
    showToast(`Template "${deletingTemplate.name}" telah dihapus.`);
    setDeletingTemplate(null);
  };

  const toggleStatus = (id: string) => {
    const updated = templates.map((t) =>
      t.id === id ? { ...t, status: t.status === "Aktif" ? "Draft" : "Aktif" } : t
    );
    saveTemplates(updated as TemplateItem[]);
    showToast("Status template berhasil diubah!");
  };

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.badge.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeCount = templates.filter((t) => t.status === "Aktif").length;
  const draftCount = templates.filter((t) => t.status === "Draft").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F141C] border border-[#00E599] text-[#00E599] px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-white">{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Kelola Katalog Template
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Tambah template baru, upload gambar pratinjau, sesuaikan harga, atau kelola etalase.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleResetDefaults}
            title="Kembalikan template bawaan default dengan gambar"
            className="p-2.5 rounded-xl bg-[#0F141C] hover:bg-[#1B2433] text-[#94A3B8] hover:text-white border border-[#1B2433] transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenCreateModal}
            className="bg-[#00E599] text-[#090C10] font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Tambah Template</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[#94A3B8] font-semibold uppercase">Total Desain</div>
            <div className="text-2xl font-black text-white mt-1">{templates.length} Template</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#00E599]/10 text-[#00E599] flex items-center justify-center">
            <LayoutTemplate className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[#94A3B8] font-semibold uppercase">Status Aktif</div>
            <div className="text-2xl font-black text-[#00E599] mt-1">{activeCount} Terpasang</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Check className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[#94A3B8] font-semibold uppercase">Draft / Arsip</div>
            <div className="text-2xl font-black text-[#94A3B8] mt-1">{draftCount} Tersimpan</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#1B2433] text-[#94A3B8] flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${selectedCategory === cat
                ? "bg-[#00E599] text-[#090C10] shadow-[0_0_12px_rgba(0,229,153,0.3)]"
                : "bg-[#0F141C] text-[#94A3B8] hover:text-white border border-[#1B2433]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari template / kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0F141C] border border-[#1B2433] rounded-xl text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00E599] transition"
          />
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl p-12 text-center">
          <LayoutTemplate className="w-12 h-12 text-[#64748B] mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-white mb-1">Tidak ada template ditemukan</h3>
          <p className="text-xs text-[#94A3B8] mb-4">
            Coba ubah kata kunci pencarian atau tambahkan template baru.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="bg-[#00E599] text-[#090C10] font-black text-xs px-4 py-2 rounded-xl"
          >
            + Tambah Template Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map((item) => (
            <div
              key={item.id}
              className="bg-[#0F141C] border border-[#1B2433] hover:border-[#00E599]/40 rounded-3xl p-5 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 bg-[#090C10] border border-[#1B2433] relative group-hover:border-[#00E599]/30 transition">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#64748B] bg-gradient-to-br from-[#0F141C] to-[#090C10]">
                      <ImageIcon className="w-8 h-8 opacity-40 mb-1" />
                      <span className="text-[11px]">Belum ada gambar</span>
                    </div>
                  )}

                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-[#00E599] bg-[#090C10]/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-[#00E599]/30">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[10px] bg-[#090C10]/90 backdrop-blur-md text-white px-2 py-0.5 rounded-lg font-semibold border border-[#1B2433]">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#00E599] transition line-clamp-1 mb-1.5">
                  {item.name}
                </h3>

                {item.features && item.features.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.features.slice(0, 3).map((f, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-[#CBD5E1] bg-[#121824] border border-[#1B2433] px-2 py-0.5 rounded-md"
                      >
                        <Check className="w-3 h-3 text-[#00E599] shrink-0" />
                        <span className="truncate max-w-[130px]">{f}</span>
                      </span>
                    ))}
                    {item.features.length > 3 && (
                      <span className="text-[10px] text-[#64748B] self-center">
                        +{item.features.length - 3} fitur
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599]/60 shrink-0" />
                    <span>Elementor Pro &bull; WhatsApp Order Ready</span>
                  </div>
                )}

                {item.description && (
                  <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-[#1B2433] flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStatus(item.id)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg transition cursor-pointer ${item.status === "Aktif"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-[#1B2433] text-[#94A3B8] border border-[#1B2433]"
                      }`}
                    title="Klik untuk ubah status"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${item.status === "Aktif" ? "bg-emerald-400 animate-pulse" : "bg-[#94A3B8]"
                        }`}
                    />
                    <span>{item.status}</span>
                  </button>

                  <span
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#94A3B8] bg-[#090C10] px-2 py-1 rounded-lg border border-[#1B2433]"
                    title="Jumlah kali dilihat pengunjung"
                  >
                    <Eye className="w-3 h-3 text-[#00E599]" />
                    <span>{formatViewCount(views[item.id] || 0)}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-2 rounded-xl bg-[#090C10] hover:bg-[#1B2433] text-[#94A3B8] hover:text-[#00E599] border border-[#1B2433] hover:border-[#00E599]/40 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
                    title="Edit Template & Gambar"
                  >
                    <Pencil className="w-3.5 h-3.5 text-[#00E599]" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeletingTemplate(item)}
                    className="p-2 rounded-xl bg-[#090C10] hover:bg-red-500/20 text-[#94A3B8] hover:text-red-400 border border-[#1B2433] hover:border-red-500/40 transition cursor-pointer"
                    title="Hapus Template"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl w-full max-w-xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden animate-in zoom-in-95 duration-200 my-8 max-h-[90vh] flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent" />

            <div className="flex items-center justify-between pb-4 border-b border-[#1B2433] mb-4 shrink-0">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <LayoutTemplate className="w-5 h-5 text-[#00E599]" />
                  <span>{editingTemplate ? "Edit Template" : "Tambah Template Baru"}</span>
                </h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  {editingTemplate
                    ? "Perbarui detail, gambar pratinjau, dan harga template katalog"
                    : "Lengkapi data dan upload gambar untuk menambahkan desain baru"}
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1B2433] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 overflow-y-auto pr-1">
              <div className="space-y-2 p-3.5 bg-[#090C10] rounded-2xl border border-[#1B2433]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#94A3B8] uppercase flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#00E599]" />
                    <span>Gambar Pratinjau Template</span>
                  </label>

                  <div className="flex items-center gap-1 bg-[#0F141C] p-0.5 rounded-lg border border-[#1B2433]">
                    <button
                      type="button"
                      onClick={() => setImageUploadType("file")}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition cursor-pointer ${imageUploadType === "file"
                        ? "bg-[#00E599] text-[#090C10]"
                        : "text-[#94A3B8] hover:text-white"
                        }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUploadType("url")}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition cursor-pointer ${imageUploadType === "url"
                        ? "bg-[#00E599] text-[#090C10]"
                        : "text-[#94A3B8] hover:text-white"
                        }`}
                    >
                      URL Gambar
                    </button>
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/webp, image/svg+xml"
                  className="hidden"
                />

                {formImageUrl ? (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-[#00E599]/40 bg-[#0F141C] group">
                    <img
                      src={formImageUrl}
                      alt="Pratinjau Gambar"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (imageUploadType === "file") {
                            fileInputRef.current?.click();
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#00E599] text-[#090C10] font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <FolderUp className="w-3.5 h-3.5" />
                        <span>Ganti Gambar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormImageUrl("")}
                        className="px-3 py-1.5 rounded-lg bg-red-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ) : imageUploadType === "file" ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-28 border-2 border-dashed border-[#1B2433] hover:border-[#00E599]/60 rounded-xl flex flex-col items-center justify-center gap-1.5 bg-[#0F141C]/60 hover:bg-[#121824] transition cursor-pointer p-4 text-center group"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#00E599]/10 text-[#00E599] flex items-center justify-center group-hover:scale-110 transition">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-white">
                      Klik untuk Pilih &amp; Upload Gambar
                    </div>
                    <div className="text-[10px] text-[#64748B]">
                      Mendukung PNG, JPG, WebP, SVG (Maks. 5MB)
                    </div>
                  </div>
                ) : null}

                {imageUploadType === "url" && (
                  <div className="relative mt-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748B]">
                      <Link2 className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="url"
                      placeholder="https://example.com/screenshot-template.png"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 bg-[#0F141C] border border-[#1B2433] rounded-xl text-xs text-white placeholder-[#475569] font-mono focus:outline-none focus:border-[#00E599]"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#94A3B8] uppercase">
                  Nama Template <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Corporate Pro"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#090C10] border border-[#1B2433] rounded-xl text-xs sm:text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#00E599]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#94A3B8] uppercase">
                    Kategori
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#090C10] border border-[#1B2433] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#00E599] cursor-pointer"
                  >
                    {CATEGORIES.filter((c) => c !== "Semua").map((c) => (
                      <option key={c} value={c} className="bg-[#090C10] text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#94A3B8] uppercase">
                    Status Etalase
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as "Aktif" | "Draft")}
                    className="w-full px-3.5 py-2.5 bg-[#090C10] border border-[#1B2433] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#00E599] cursor-pointer"
                  >
                    <option value="Aktif" className="bg-[#090C10] text-emerald-400">
                      Aktif (Dipublikasikan)
                    </option>
                    <option value="Draft" className="bg-[#090C10] text-[#94A3B8]">
                      Draft (Disembunyikan)
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#94A3B8] uppercase">
                    Badge / Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Populer / Trending / Baru"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#090C10] border border-[#1B2433] rounded-xl text-xs sm:text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#00E599]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#94A3B8] uppercase">
                    URL Live Demo
                  </label>
                  <input
                    type="url"
                    placeholder="https://demo.webhoster.co.id/template-name"
                    value={formDemoUrl}
                    onChange={(e) => setFormDemoUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#090C10] border border-[#1B2433] rounded-xl text-xs sm:text-sm text-white font-mono placeholder-[#475569] focus:outline-none focus:border-[#00E599]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#94A3B8] uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00E599]" />
                    <span>Fitur Bawaan Template</span>
                  </label>
                  <span className="text-[10px] text-[#64748B]">
                    1 baris per poin fitur
                  </span>
                </div>
                <textarea
                  rows={3}
                  placeholder={`e.g.\nListing Unit Kendaraan & Spesifikasi Mesin\nFilter Tipe & Rentang Harga\nFormulir Booking Test Drive WhatsApp\nElementor Pro Drag & Drop Ready`}
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#090C10] border border-[#1B2433] rounded-xl text-xs sm:text-sm text-white font-mono placeholder-[#475569] focus:outline-none focus:border-[#00E599] resize-none leading-relaxed"
                />
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-[#64748B]">Saran cepat:</span>
                  {[
                    "Elementor Pro Ready",
                    "WhatsApp Chat Sales",
                    "100% Responsif Mobile",
                    "Google PageSpeed 95+",
                    "Katalog Produk WA",
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setFormFeatures((prev) => {
                          const trimmed = prev.trim();
                          return trimmed ? `${trimmed}\n${chip}` : chip;
                        });
                      }}
                      className="text-[10px] bg-[#121824] hover:bg-[#1B2433] text-[#00E599] border border-[#1B2433] hover:border-[#00E599]/40 px-2 py-0.5 rounded-md transition cursor-pointer"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#94A3B8] uppercase">
                  Deskripsi &amp; Keunggulan
                </label>
                <textarea
                  rows={2}
                  placeholder="Ringkasan fitur template, kompatibilitas Elementor, dll..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#090C10] border border-[#1B2433] rounded-xl text-xs sm:text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#00E599] resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#94A3B8] uppercase">
                  URL Live Demo
                </label>
                <input
                  type="url"
                  placeholder="https://demo.webhoster.co.id/template-name"
                  value={formDemoUrl}
                  onChange={(e) => setFormDemoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#090C10] border border-[#1B2433] rounded-xl text-xs sm:text-sm text-white font-mono placeholder-[#475569] focus:outline-none focus:border-[#00E599]"
                />
              </div>

              <div className="pt-4 border-t border-[#1B2433] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#1B2433] text-xs font-bold text-[#94A3B8] hover:text-white hover:bg-[#1B2433] transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#00E599] text-[#090C10] font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition cursor-pointer"
                >
                  {editingTemplate ? "Simpan Perubahan" : "+ Tambahkan Template"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0F141C] border border-red-500/30 rounded-3xl w-full max-w-md p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Hapus Template?</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Apakah Anda yakin ingin menghapus template{" "}
                  <strong className="text-white">&ldquo;{deletingTemplate.name}&rdquo;</strong> dari katalog? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-[#1B2433] flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingTemplate(null)}
                className="px-4 py-2 rounded-xl border border-[#1B2433] text-xs font-bold text-[#94A3B8] hover:text-white transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.4)] transition cursor-pointer"
              >
                Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
