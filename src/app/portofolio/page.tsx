"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  ShoppingBag,
  Layers,
  ExternalLink,
  Eye,
  Check,
  X,
  ArrowRight,
  ChevronDown,
  Menu,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Server,
  Globe,
  Monitor,
  CheckCircle2,
  Smartphone,
  Gauge,
  ShieldCheck,
  Activity,
  Filter,
  ArrowUpRight,
  Code2,
  Cpu,
  Laptop,
  Lock,
  Briefcase,
} from "lucide-react";
import {
  PortfolioProjectItem,
  getPortfolioProjects,
  matchProjectCategory,
  PORTFOLIO_CATEGORIES,
  syncPortfoliosWithSupabase,
} from "@/lib/portfolio";

export type PortfolioProject = PortfolioProjectItem;

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

export default function PortofolioPage() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioProjectItem | null>(null);
  const [projects, setProjects] = useState<PortfolioProjectItem[]>([]);

  // Synchronize with Admin Workspace portfolio showcase
  useEffect(() => {
    const syncPortfolio = () => {
      try {
        const all = getPortfolioProjects();
        const activeOnly = all.filter((p) => p.status !== "Draft");
        setProjects(activeOnly);
      } catch (e) {}
    };

    syncPortfolio();
    syncPortfoliosWithSupabase().then(() => syncPortfolio()).catch(() => {});

    if (typeof window !== "undefined") {
      window.addEventListener("wh:portfolio_updated", syncPortfolio);
      window.addEventListener("storage", syncPortfolio);
      return () => {
        window.removeEventListener("wh:portfolio_updated", syncPortfolio);
        window.removeEventListener("storage", syncPortfolio);
      };
    }
  }, []);

  const handleSelectTemplate = (templateBasis: string) => {
    const encoded = encodeURIComponent(templateBasis);
    window.location.href = `/harga?template=${encoded}#paket-harga`;
  };

  const openWhatsApp = (customMessage?: string) => {
    const phone = "6281391123841";
    const defaultMsg =
      "Halo WebHoster.co.id, saya tertarik dengan portofolio website Anda dan ingin memesan template WordPress siap pakai.";
    const text = encodeURIComponent(customMessage || defaultMsg);
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  // Dynamic category options with exact synchronized live counts
  const categoriesWithCounts = [
    { key: "all", label: "Semua Proyek", count: projects.length },
    ...PORTFOLIO_CATEGORIES.filter((c) => c.key !== "all").map((cat) => ({
      key: cat.key,
      label: cat.label,
      count: projects.filter((p) => matchProjectCategory(p, cat.key)).length,
    })),
  ].filter((c, idx) => idx === 0 || c.count > 0 || ["company", "ecommerce", "landing"].includes(c.key));

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => matchProjectCategory(p, activeFilter));

  const valueSummaries = [
    {
      icon: Smartphone,
      title: "100% Mobile Friendly & Responsif",
      desc: "Setiap elemen diuji presisi di smartphone iOS, Android, tablet, dan desktop agar nyaman dijelajahi pengunjung Anda.",
    },
    {
      icon: Gauge,
      title: "Skor PageSpeed 90+ Hijau",
      desc: "Optimasi kode modern dan kompresi aset gambar menghasilkan kecepatan akses luar biasa yang disukai Google & pengguna.",
    },
    {
      icon: ShieldCheck,
      title: "Keamanan Penuh & Terintegrasi WA",
      desc: "Sudah include sertifikat SSL Let's Encrypt Grade A+ serta tombol WhatsApp langsung untuk meningkatkan konversi closing.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090C10] text-[#F1F5F9] selection:bg-[#00E599] selection:text-[#090C10] font-sans antialiased overflow-x-hidden">
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-[#1B2433]/60">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00E599]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="block mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold tracking-wide uppercase">
              <span>SHOWCASE HASIL KARYA KLIEN</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[50px] font-extrabold text-white leading-[1.25] tracking-tight mb-6 max-w-5xl mx-auto drop-shadow-md">
            <span className="block whitespace-normal md:whitespace-nowrap">
              Website Live Klien
            </span>
            <span className="text-[#00E599] bg-gradient-to-r from-[#00E599] via-[#24f3ae] to-[#5eead4] bg-clip-text text-transparent block mt-1 sm:mt-2">
              Menggunakan Template WordPress Kami
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-5xl mx-auto mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="block">
              Lihat bagaimana ratusan UMKM dan perusahaan meluncurkan website profesional secara instan,
            </span>
            <span className="block">
              menggunakan template WordPress premium WebHoster lengkap dengan domain resmi dan cloud hosting NVMe.
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-[#0F141C]/80 border border-[#1B2433] px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>100+ Klien UMKM &amp; Korporat</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0F141C]/80 border border-[#1B2433] px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>Garansi 100% Hak Akses Milik Klien</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0F141C]/80 border border-[#1B2433] px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>Skor PageSpeed 90+ Hijau</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-12 pb-6 bg-[#090C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {categoriesWithCounts.map((cat) => {
              const isActive = activeFilter === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveFilter(cat.key)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-[#00E599] text-[#090C10] shadow-[0_0_20px_rgba(0,229,153,0.35)] scale-105"
                      : "bg-[#0F141C] text-[#94A3B8] border border-[#1B2433] hover:border-[#00E599]/60 hover:text-white"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive
                        ? "bg-[#090C10]/20 text-[#090C10]"
                        : "bg-[#1B2433] text-[#00E599]"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#090C10] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full py-16 px-4 text-center bg-[#0F141C] border border-[#1B2433] rounded-3xl">
                <Briefcase className="w-12 h-12 text-[#64748B] mx-auto mb-3 opacity-40" />
                <h3 className="text-lg font-bold text-white mb-1">
                  {projects.length === 0
                    ? "Belum Ada Portofolio yang Ditampilkan"
                    : "Tidak Ada Portofolio di Kategori Ini"}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto">
                  {projects.length === 0
                    ? "Belum ada data portofolio yang dipublikasikan saat ini."
                    : "Pilih kategori lain untuk melihat portofolio hasil karya website klien kami."}
                </p>
                {activeFilter !== "all" && (
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121824] text-white border border-[#1B2433] hover:border-[#00E599] font-bold text-xs transition cursor-pointer mt-5"
                  >
                    <span>Lihat Semua Proyek</span>
                  </button>
                )}
              </div>
            ) : (
              filteredProjects.map((p) => (
              <div
                key={p.id}
                className="bg-[#0F141C] border border-[#1B2433] hover:border-[#00E599] rounded-3xl overflow-hidden shadow-lg hover:shadow-[0_20px_40px_rgba(0,229,153,0.18)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="bg-[#121824] px-4 py-3 border-b border-[#1B2433] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/60" />
                  </div>
                  <div className="bg-[#090C10] px-3 py-1 rounded-md text-[10px] text-[#64748B] font-mono flex items-center gap-1 max-w-[170px] truncate">
                    <Lock className="w-2.5 h-2.5 text-[#00E599]" />
                    <span>https://{p.liveUrlMock}</span>
                  </div>
                  <div className="w-3" />
                </div>

                <div className="relative overflow-hidden min-h-[190px] h-[190px] bg-[#121824] flex items-center justify-center">
                  {p.image ? (
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F141C] via-transparent to-transparent opacity-60 pointer-events-none" />
                      <span className="absolute bottom-3 left-3 text-[10px] font-black tracking-wider text-white uppercase font-mono bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                        {p.industry}
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${p.gradientBg} p-8 text-center relative overflow-hidden flex flex-col items-center justify-center group-hover:scale-[1.02] transition-transform duration-500`}
                    >
                      <div className="absolute inset-0 cyber-dots opacity-25 pointer-events-none" />
                      <div className="w-14 h-14 rounded-2xl bg-[#090C10]/80 border border-white/10 backdrop-blur-md flex items-center justify-center text-white mb-3 shadow-xl group-hover:scale-110 group-hover:border-[#00E599]/60 group-hover:text-[#00E599] transition-all duration-300">
                        {p.category === "company" && <Building2 className="w-7 h-7" />}
                        {p.category === "ecommerce" && <ShoppingBag className="w-7 h-7" />}
                        {p.category === "landing" && <Layers className="w-7 h-7" />}
                      </div>
                      <span className="text-[11px] font-black tracking-wider text-white/90 uppercase font-mono bg-black/40 px-3 py-1 rounded-full border border-white/10">
                        {p.industry}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Uniform 2-Row Meta Header for 100% Symmetrical Card Grid */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap shrink-0">
                          {p.categoryLabel}
                        </span>
                        <span className="text-[10px] text-[#94A3B8] font-mono whitespace-nowrap truncate max-w-[170px]">
                          {p.industry}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-medium bg-[#090C10] px-2.5 py-1 rounded-lg border border-[#1B2433]">
                        <span className="text-[#64748B] shrink-0">Basis Template:</span>
                        <span className="text-[#00E599] font-bold truncate">{p.templateBasis}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-[#00E599] transition-colors mb-2 leading-snug line-clamp-1">
                      {p.title}
                    </h3>

                    <p className="text-xs text-[#94A3B8] group-hover:text-slate-300 transition-colors leading-relaxed mb-4 line-clamp-3 min-h-[48px]">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5 min-h-[26px]">
                      {p.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono font-medium bg-[#090C10] border border-[#1B2433] text-slate-300 px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1B2433] flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="flex-1 bg-[#121824] hover:bg-[#1B2433] text-white border border-[#1B2433] hover:border-[#00E599]/50 font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#00E599]" />
                      <span>Detail Proyek</span>
                    </button>

                    <button
                      onClick={() => handleSelectTemplate(p.templateBasis)}
                      className="flex-1 bg-[#00E599] hover:bg-[#00C882] text-[#090C10] font-black text-xs py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,229,153,0.3)] transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap group/btn hover:scale-[1.02] active:scale-95"
                    >
                      <span>Gunakan Template Ini</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#090C10] group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#090C10] border-t border-[#1B2433]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold uppercase tracking-wider mb-3">
              <span>STANDAR MUTU</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Jaminan Kualitas di Setiap Proyek
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Kami tidak sekadar membuat website tampil cantik, tetapi memastikan performa teknis, keamanan data, dan kemudahan bagi pengunjung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valueSummaries.map((v, idx) => {
              const IconComp = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#0F141C] border border-[#1B2433] hover:border-[#00E599] rounded-2xl p-7 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,229,153,0.15)] hover:bg-[#121824] transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599] mb-5 group-hover:bg-[#00E599] group-hover:text-[#090C10] group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(0,229,153,0.2)]">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00E599] transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] group-hover:text-slate-300 transition-colors leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#090C10] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0F141C] via-[#121E24] to-[#0F141C] border border-[#00E599]/40 hover:border-[#00E599] rounded-3xl p-6 sm:p-12 shadow-[0_0_40px_rgba(0,229,153,0.15)] hover:shadow-[0_0_55px_rgba(0,229,153,0.3)] transition-all duration-500 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
            <div className="absolute inset-0 cyber-dots opacity-30 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-6 z-10 text-center sm:text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#00E599] to-[#00875A] p-0.5 shadow-[0_0_30px_rgba(0,229,153,0.4)] group-hover:shadow-[0_0_45px_rgba(0,229,153,0.65)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#090C10]/70 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#00E599]" />
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-[#00E599] uppercase tracking-wider mb-1.5">
                  PILIH TEMPLATE &amp; PAKET WEBSITE
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
                  Ingin Website Profesional &amp; Langsung Aktif?
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] group-hover:text-slate-300 transition-colors max-w-xl">
                  Pilih desain template favorit Anda dan tentukan paket hosting performa tinggi. Pembayaran otomatis &amp; terverifikasi langsung via WHMCS Billing.
                </p>
              </div>
            </div>

            <div className="z-10 shrink-0 w-full md:w-auto">
              <Link
                href="/harga#paket-harga"
                className="w-full md:w-auto bg-[#00E599] text-[#090C10] font-black text-sm sm:text-base px-8 py-4 rounded-full hover:bg-[#00C882] shadow-[0_0_25px_rgba(0,229,153,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 whitespace-nowrap"
              >
                <Sparkles className="w-5 h-5 text-[#090C10]" />
                <span>Pilih Template &amp; Paket Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#090C10]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#0F141C] border border-[#00E599]/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-[0_0_60px_rgba(0,229,153,0.25)] animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-[#94A3B8] hover:text-white bg-[#090C10] border border-[#1B2433] rounded-full p-2 transition cursor-pointer"
              aria-label="Tutup Detail"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedProject.image && (
              <div className="w-full h-48 rounded-2xl overflow-hidden mb-5 border border-[#1B2433] relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F141C] via-transparent to-transparent opacity-60" />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/30 px-3 py-1 rounded-full uppercase whitespace-nowrap">
                {selectedProject.categoryLabel}
              </span>
              <span className="text-xs text-[#94A3B8] font-mono bg-[#090C10] px-2.5 py-1 rounded-lg border border-[#1B2433] whitespace-nowrap">
                {selectedProject.industry}
              </span>
              <span className="text-xs text-[#00E599] font-mono bg-[#090C10] px-2.5 py-1 rounded-lg border border-[#1B2433] whitespace-nowrap">
                Basis: {selectedProject.templateBasis}
              </span>
            </div>

            <h3 className="text-2xl font-black text-white mb-2">{selectedProject.title}</h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] mb-6 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                  Fitur Utama yang Dibangun:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#CBD5E1]">
                  {selectedProject.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#00E599] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Teknologi &amp; Spesifikasi:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#090C10] border border-[#1B2433] text-[#00E599] px-3 py-1 rounded-lg font-mono font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-5 border-t border-[#1B2433]">
              <button
                onClick={() => {
                  handleSelectTemplate(selectedProject.templateBasis);
                  setSelectedProject(null);
                }}
                className="w-full sm:w-auto flex-1 bg-[#00E599] text-[#090C10] font-black text-sm py-3.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#090C10]" />
                <span>Pilih Template {selectedProject.templateBasis} &amp; Lanjut Order Paket</span>
                <ArrowRight className="w-4 h-4 text-[#090C10]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
