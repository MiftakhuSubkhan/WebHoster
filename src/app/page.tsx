import React from "react";
import Link from "next/link";
import Image from "next/image";
import HomePortfolioGrid from "@/components/HomePortfolioGrid";
import HomePopularTemplates from "@/components/HomePopularTemplates";

function Zap({ className = "w-4 h-4" }: { className?: string; fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function Monitor({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

function Cloud({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function UserCheck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}

function ArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function Eye({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function Sparkles({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function FileText({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function UploadCloud({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}

function Edit3({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function CheckCircle2({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function Check({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShieldCheck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function WhatsAppIcon({
  className = "w-4 h-4",
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#090C10] text-[#F1F5F9] font-sans antialiased selection:bg-[#00E599] selection:text-[#090C10] overflow-x-hidden">
      <section id="beranda" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden min-h-[640px] lg:min-h-[720px] flex items-center">
        <div
          className="absolute inset-0 z-0 pointer-events-none bg-cover bg-right sm:bg-right lg:bg-center hero-bg-responsive"
        >
          <div className="absolute inset-y-0 left-0 w-full lg:w-[55%] bg-gradient-to-r from-[#090C10] via-[#090C10]/85 to-transparent z-[1]" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#090C10] to-transparent z-[1]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090C10] to-transparent z-[1]" />
        </div>

        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#00E599]/10 rounded-full blur-3xl opacity-30 pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center text-left z-10 py-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold tracking-wide mb-6 w-fit">
                <Zap className="w-3.5 h-3.5 text-[#00E599]" />
                <span>TEMPLATE WORDPRESS SIAP PAKAI ALL-IN-ONE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-extrabold text-white leading-[1.15] tracking-tight mb-6 drop-shadow-md">
                Pilih Desain Template WordPress Impian,{" "}
                <span className="text-[#00E599] bg-gradient-to-r from-[#00E599] via-[#24f3ae] to-[#5eead4] bg-clip-text text-transparent block mt-1 sm:mt-2">
                  Website Aktif dalam 24 Jam
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed mb-8 max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Solusi instan: Template premium siap pakai yang sudah dioptimasi performanya, lengkap dengan gratis domain pilihan (.my.id / .com) dan hosting cloud NVMe terpasang. Bebas edit sendiri tanpa koding!
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8 w-full max-w-xl">
                <Link
                  href="/harga"
                  className="bg-[#00E599] text-[#090C10] font-extrabold text-sm sm:text-base px-7 py-4 rounded-full hover:bg-[#00C882] shadow-[0_0_25px_rgba(0,229,153,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>Pilih Katalog Template</span>
                  <ArrowRight className="w-5 h-5 text-[#090C10]" />
                </Link>

                <a
                  href="https://wa.me/6281391123841?text=Halo%20WebHoster.co.id%2C%20saya%20tertarik%20memesan%20Template%20WordPress%20siap%20pakai%20all-in-one.%20Mohon%20informasi%20pilihannya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0F141C] hover:bg-[#1B2433] text-white hover:text-[#00E599] border border-[#1B2433] hover:border-[#00E599]/50 font-bold text-sm sm:text-base px-7 py-4 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#00E599] group-hover:scale-110 transition-transform" />
                  <span>Konsultasi Cepat via WA</span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-2 w-full max-w-2xl">
                <div className="flex items-center gap-3 bg-[#0F141C] border border-[#1B2433] hover:border-[#00E599]/60 hover:bg-[#121824] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,229,153,0.18)] p-3 rounded-xl transition-all duration-300 group cursor-default">
                  <div className="w-9 h-9 rounded-lg bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-center text-[#00E599] group-hover:scale-110 group-hover:bg-[#00E599]/20 group-hover:border-[#00E599] group-hover:shadow-[0_0_15px_rgba(0,229,153,0.35)] transition-all duration-300 shrink-0">
                    <Zap className="w-4 h-4 text-[#00E599]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white group-hover:text-[#00E599] transition-colors tracking-wide">Online 24 Jam</div>
                    <div className="text-[11px] text-slate-300 group-hover:text-white transition-colors font-medium">Instan & Siap Jualan</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#0F141C] border border-[#1B2433] hover:border-[#00E599]/60 hover:bg-[#121824] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,229,153,0.18)] p-3 rounded-xl transition-all duration-300 group cursor-default">
                  <div className="w-9 h-9 rounded-lg bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-center text-[#00E599] group-hover:scale-110 group-hover:bg-[#00E599]/20 group-hover:border-[#00E599] group-hover:shadow-[0_0_15px_rgba(0,229,153,0.35)] transition-all duration-300 shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#00E599]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white group-hover:text-[#00E599] transition-colors tracking-wide">Domain & Hosting</div>
                    <div className="text-[11px] text-slate-300 group-hover:text-white transition-colors font-medium">Include NVMe 1 Thn</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#0F141C] border border-[#1B2433] hover:border-[#00E599]/60 hover:bg-[#121824] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,229,153,0.18)] p-3 rounded-xl transition-all duration-300 group cursor-default">
                  <div className="w-9 h-9 rounded-lg bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-center text-[#00E599] group-hover:scale-110 group-hover:bg-[#00E599]/20 group-hover:border-[#00E599] group-hover:shadow-[0_0_15px_rgba(0,229,153,0.35)] transition-all duration-300 shrink-0">
                    <Monitor className="w-4 h-4 text-[#00E599]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white group-hover:text-[#00E599] transition-colors tracking-wide">Bebas Koding</div>
                    <div className="text-[11px] text-slate-300 group-hover:text-white transition-colors font-medium">Elementor Drag & Drop</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-5 relative flex items-start justify-end h-full min-h-[140px] lg:min-h-[400px]">
              <div className="bg-[#0F141C] border border-[#00E599]/40 hover:border-[#00E599] px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_25px_rgba(0,229,153,0.35)] hover:shadow-[0_0_35px_rgba(0,229,153,0.5)] hover:scale-105 transition-all duration-300 mt-4 cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E599] shadow-[0_0_8px_#00E599]"></span>
                </span>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#00E599] fill-[#00E599]" />
                  <span className="text-xs font-bold text-white tracking-tight">Cloud Hosting 99.9% Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="layanan" className="py-16 bg-[#090C10] border-t border-[#1B2433]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold uppercase tracking-wider mb-4">
            <span>3-IN-1 SOLUTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Mengapa Memilih Template WordPress WebHoster?
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto mb-12">
            Solusi terlengkap dan termudah untuk memiliki website bisnis profesional tanpa pusing koding dan tanpa biaya agensi yang mahal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-7 hover:-translate-y-2 hover:border-[#00E599] hover:shadow-[0_20px_40px_rgba(0,229,153,0.2)] hover:bg-[#121824] transition-all duration-300 group relative overflow-hidden cursor-pointer">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#00E599]/5 rounded-full blur-xl group-hover:bg-[#00E599]/25 group-hover:scale-150 transition-all duration-500 pointer-events-none" />

              <div className="w-12 h-12 rounded-xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599] mb-5 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#00E599] group-hover:text-[#090C10] shadow-[0_0_0_rgba(0,229,153,0)] group-hover:shadow-[0_0_20px_rgba(0,229,153,0.5)] transition-all duration-300">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00E599] transition-colors">
                WordPress &amp; Elementor
              </h3>
              <p className="text-sm text-[#94A3B8] group-hover:text-slate-300 transition-colors leading-relaxed">
                CMS resmi dunia + Elementor drag-and-drop. Ganti teks, foto, dan produk semudah Word tanpa koding.
              </p>
            </div>

            <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-7 hover:-translate-y-2 hover:border-[#00E599] hover:shadow-[0_20px_40px_rgba(0,229,153,0.2)] hover:bg-[#121824] transition-all duration-300 group relative overflow-hidden cursor-pointer">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#00E599]/5 rounded-full blur-xl group-hover:bg-[#00E599]/25 group-hover:scale-150 transition-all duration-500 pointer-events-none" />

              <div className="w-12 h-12 rounded-xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599] mb-5 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#00E599] group-hover:text-[#090C10] shadow-[0_0_0_rgba(0,229,153,0)] group-hover:shadow-[0_0_20px_rgba(0,229,153,0.5)] transition-all duration-300">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00E599] transition-colors">
                Domain &amp; NVMe Cloud
              </h3>
              <p className="text-sm text-[#94A3B8] group-hover:text-slate-300 transition-colors leading-relaxed">
                Gratis domain (.my.id / .com) dan high-speed NVMe cloud hosting 1 tahun dengan uptime 99.9%.
              </p>
            </div>

            <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-7 hover:-translate-y-2 hover:border-[#00E599] hover:shadow-[0_20px_40px_rgba(0,229,153,0.2)] hover:bg-[#121824] transition-all duration-300 group relative overflow-hidden cursor-pointer">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#00E599]/5 rounded-full blur-xl group-hover:bg-[#00E599]/25 group-hover:scale-150 transition-all duration-500 pointer-events-none" />

              <div className="w-12 h-12 rounded-xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599] mb-5 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#00E599] group-hover:text-[#090C10] shadow-[0_0_0_rgba(0,229,153,0)] group-hover:shadow-[0_0_20px_rgba(0,229,153,0.5)] transition-all duration-300">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00E599] transition-colors">
                Live 24 Jam &amp; Full Akses
              </h3>
              <p className="text-sm text-[#94A3B8] group-hover:text-slate-300 transition-colors leading-relaxed">
                Tim kami bantu masukkan materi hingga live. Akses login admin WordPress &amp; cPanel diserahkan 100%.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="portofolio" className="py-20 bg-[#090C10] border-t border-[#1B2433]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold uppercase tracking-wider mb-3">
                <span>PORTFOLIO</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Solusi Website untuk Berbagai Sektor
              </h2>
            </div>
            <Link
              href="/portofolio"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00E599] hover:text-[#00C882] transition group"
            >
              <span>Lihat Semua Portofolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <HomePortfolioGrid />
        </div>
      </section>

      <section id="katalog-populer" className="py-20 bg-[#090C10] border-t border-[#1B2433]/60 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#00E599]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#00E599]" />
            <span>PILIHAN DESAIN TEMPLATE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Pilihan Desain Siap Pakai &amp; All-in-One
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto mb-14">
            Pilih template WordPress modern sesuai bisnis Anda. Semua template bebas biaya desain tambahan dan otomatis aktif saat Anda memilih paket hosting &amp; domain di bawah.
          </p>

          <HomePopularTemplates />


          <div className="bg-gradient-to-r from-[#121A24] via-[#0F141C] to-[#121A24] border border-[#00E599]/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,229,153,0.1)]">
            <div className="text-left">
              <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                Ingin Melihat Desain untuk Bisnis Kafe, Travel, Rental, atau Konsultan?
              </h4>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Tersedia 6+ pilihan katalog template WordPress siap pakai lengkap dengan simulator preview live desktop &amp; mobile.
              </p>
            </div>
            <Link
              href="/harga"
              className="bg-[#00E599] text-[#090C10] font-black text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-[#00C882] transition flex items-center gap-2 shrink-0 shadow-[0_0_15px_rgba(0,229,153,0.3)] cursor-pointer whitespace-nowrap"
            >
              <span>Buka Katalog Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="cara-order" className="py-20 bg-[#090C10] border-t border-[#1B2433]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold uppercase tracking-wider mb-3">
              <span>CARA ORDER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Proses Mudah, Cepat dan Transparan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-6 relative hover:-translate-y-2 hover:border-[#00E599] hover:shadow-[0_20px_40px_rgba(0,229,153,0.2)] hover:bg-[#121824] transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-full border border-[#00E599]/40 bg-[#00E599]/10 flex items-center justify-center text-[#00E599] group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#00E599] group-hover:text-[#090C10] shadow-[0_0_0_rgba(0,229,153,0)] group-hover:shadow-[0_0_20px_rgba(0,229,153,0.5)] transition-all duration-300">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-[#64748B]/40 group-hover:text-[#00E599] group-hover:scale-110 transition-all duration-300 font-mono">01</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00E599] transition-colors">Pilih Template &amp; Domain</h3>
              <p className="text-xs text-[#94A3B8] group-hover:text-slate-300 transition-colors leading-relaxed">
                Pilih desain template WordPress impian Anda &amp; tentukan nama domain (.my.id / .com).
              </p>
            </div>

            <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-6 relative hover:-translate-y-2 hover:border-[#00E599] hover:shadow-[0_20px_40px_rgba(0,229,153,0.2)] hover:bg-[#121824] transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-full border border-[#00E599]/40 bg-[#00E599]/10 flex items-center justify-center text-[#00E599] group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#00E599] group-hover:text-[#090C10] shadow-[0_0_0_rgba(0,229,153,0)] group-hover:shadow-[0_0_20px_rgba(0,229,153,0.5)] transition-all duration-300">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-[#64748B]/40 group-hover:text-[#00E599] group-hover:scale-110 transition-all duration-300 font-mono">02</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00E599] transition-colors">Kirim Logo &amp; Materi</h3>
              <p className="text-xs text-[#94A3B8] group-hover:text-slate-300 transition-colors leading-relaxed">
                Kirimkan logo, teks profil perusahaan, kontak WhatsApp, dan foto produk/jasa Anda.
              </p>
            </div>

            <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-6 relative hover:-translate-y-2 hover:border-[#00E599] hover:shadow-[0_20px_40px_rgba(0,229,153,0.2)] hover:bg-[#121824] transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-full border border-[#00E599]/40 bg-[#00E599]/10 flex items-center justify-center text-[#00E599] group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#00E599] group-hover:text-[#090C10] shadow-[0_0_0_rgba(0,229,153,0)] group-hover:shadow-[0_0_20px_rgba(0,229,153,0.5)] transition-all duration-300">
                  <Edit3 className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-[#64748B]/40 group-hover:text-[#00E599] group-hover:scale-110 transition-all duration-300 font-mono">03</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00E599] transition-colors">Setup Server &amp; Input Data</h3>
              <p className="text-xs text-[#94A3B8] group-hover:text-slate-300 transition-colors leading-relaxed">
                Tim developer kami langsung menginstalasi WordPress, Cloud NVMe, dan memasukkan materi bisnis Anda.
              </p>
            </div>

            <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-6 relative hover:-translate-y-2 hover:border-[#00E599] hover:shadow-[0_20px_40px_rgba(0,229,153,0.2)] hover:bg-[#121824] transition-all duration-300 group cursor-pointer overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-full border border-[#00E599]/40 bg-[#00E599]/10 flex items-center justify-center text-[#00E599] group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#00E599] group-hover:text-[#090C10] shadow-[0_0_0_rgba(0,229,153,0)] group-hover:shadow-[0_0_20px_rgba(0,229,153,0.5)] transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-[#64748B]/40 group-hover:text-[#00E599] group-hover:scale-110 transition-all duration-300 font-mono">04</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00E599] transition-colors">Online Live 24 Jam</h3>
              <p className="text-xs text-[#94A3B8] group-hover:text-slate-300 transition-colors leading-relaxed">
                Website aktif live! Hak akses WP-Admin &amp; video panduan edit mandiri diserahkan 100% ke Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#090C10] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0F141C] via-[#121E24] to-[#0F141C] border border-[#00E599]/40 hover:border-[#00E599] rounded-3xl p-6 sm:p-10 shadow-[0_0_40px_rgba(0,229,153,0.15)] hover:shadow-[0_0_55px_rgba(0,229,153,0.3)] transition-all duration-500 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 group">
            <div className="absolute inset-0 cyber-dots opacity-30 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 z-10 text-center sm:text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#00E599] to-[#00875A] p-0.5 shadow-[0_0_30px_rgba(0,229,153,0.4)] group-hover:shadow-[0_0_45px_rgba(0,229,153,0.65)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#090C10]/70 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <WhatsAppIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" variant="white" />
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-[#00E599] uppercase tracking-wider mb-1">
                  KONSULTASI GRATIS
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1.5 leading-snug group-hover:text-white">
                  Punya Pertanyaan atau Ingin Penawaran Khusus?
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] group-hover:text-slate-300 transition-colors max-w-xl">
                  Konsultasikan kebutuhan website dan nama domain Anda langsung bersama tim kami.
                </p>
              </div>
            </div>

            <div className="z-10 shrink-0 w-full md:w-auto">
              <a
                href="https://wa.me/6281391123841?text=Halo%20WebHoster.co.id%2C%20saya%20ingin%20konsultasi%20penawaran%20khusus%20untuk%20website%20bisnis%20saya."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-[#00E599] text-[#090C10] font-bold text-sm px-8 py-3.5 rounded-full hover:bg-[#00C882] shadow-[0_0_25px_rgba(0,229,153,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#090C10]" />
                <span>Chat WhatsApp Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
