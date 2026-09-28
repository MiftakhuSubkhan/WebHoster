"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Zap,
  Monitor,
  Cloud,
  UserCheck,
  ArrowRight,
  Check,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Menu,
  Server,
  Sparkles,
  HardDrive,
  Globe,
  Radio,
  Cpu,
  CheckCircle2,
  FileText,
  Clock,
  Layers,
  Award,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

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
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function TentangPage() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openWhatsApp = (customMessage?: string) => {
    const phone = "6281391123841";
    const defaultMsg =
      "Halo WebHoster.co.id, saya ingin berkonsultasi mengenai pembuatan website, domain, dan infrastruktur cloud.";
    const text = encodeURIComponent(customMessage || defaultMsg);
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const statMetrics = [
    {
      value: "99.9%",
      label: "Server Uptime SLA",
      desc: "Jaminan keandalan infrastruktur cloud tanpa downtime",
      icon: Radio,
    },
    {
      value: "100%",
      label: "Hak Akses Klien",
      desc: "Kepemilikan legal akun cPanel & domain seutuhnya",
      icon: ShieldCheck,
    },
    {
      value: "< 2 Detik",
      label: "Rata-rata Load Speed",
      desc: "Optimasi Google PageSpeed & Core Web Vitals tinggi",
      icon: Zap,
    },
    {
      value: "24/7",
      label: "Monitoring & Support",
      desc: "Tim teknis siaga menjaga integritas sistem server",
      icon: Clock,
    },
  ];

  const corePrinciples = [
    {
      icon: UserCheck,
      title: "Kepemilikan Penuh Klien (100%)",
      desc: "Akun domain dan cPanel didaftarkan langsung atas nama legal Anda. Bebas migrasi atau kelola kapan pun tanpa drama perizinan vendor.",
      tag: "Zero Lock-in",
    },
    {
      icon: Zap,
      title: "Infrastruktur Cepat & Modern",
      desc: "Ditenagai Pure Enterprise NVMe SSD, stack Next.js/LiteSpeed modern, HTTP/3, dan SSL otomatis untuk kecepatan respon instan di audiens lokal.",
      tag: "High Performance",
    },
    {
      icon: FileText,
      title: "Biaya Terbuka & Transparan",
      desc: "Tidak ada biaya terselubung atau jebakan perpanjangan. Rincian biaya hosting, domain, dan pemeliharaan dijelaskan gamblang sejak awal.",
      tag: "No Hidden Fees",
    },
  ];

  const dataCenterSpecs = [
    {
      icon: Globe,
      title: "Data Center Tier-3 Indonesia",
      desc: "Berlokasi di Jakarta dengan direct peering ke IIX & OpenIXP untuk latency ultra rendah (< 10ms) bagi pengunjung lokal.",
    },
    {
      icon: HardDrive,
      title: "Pure NVMe SSD Cloud Storage",
      desc: "Storage enterprise berkecepatan baca/tulis tinggi, hingga 10x lebih responsif dibanding server SSD konvensional.",
    },
    {
      icon: ShieldCheck,
      title: "Proteksi SSL & Anti-DDoS Shield",
      desc: "Enkripsi HTTPS 256-bit otomatis terpasang dengan firewall cerdas untuk mitigasi serangan siber dan spam secara real-time.",
    },
    {
      icon: Server,
      title: "Automated Daily Remote Backup",
      desc: "Pencadangan data berkala ke remote server terpisah sehingga aset dan database website Anda selalu terproteksi aman.",
    },
    {
      icon: Cpu,
      title: "Resource Server Terisolasi",
      desc: "Cloud architecture dengan pembagian CPU & RAM terdedikasi, menjamin performa website tetap stabil saat lonjakan trafik.",
    },
    {
      icon: Sparkles,
      title: "Stack Web Generasi Terbaru",
      desc: "Dukungan penuh untuk framework modern seperti Next.js, React, Node.js, PHP 8+, hingga CMS WordPress berkecepatan tinggi.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090C10] text-[#F1F5F9] selection:bg-[#00E599] selection:text-[#090C10] font-sans antialiased overflow-x-hidden">
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-[#1B2433]/60">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00E599]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="block mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold tracking-wide uppercase">
              <span>TENTANG WEBHOSTER.CO.ID</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[50px] font-extrabold text-white leading-[1.25] tracking-tight mb-6 max-w-6xl mx-auto drop-shadow-md">
            <span className="block whitespace-normal md:whitespace-nowrap">
              Penyedia Template WordPress Siap Pakai
            </span>
            <span className="text-[#00E599] bg-gradient-to-r from-[#00E599] via-[#24f3ae] to-[#5eead4] bg-clip-text text-transparent block mt-1 sm:mt-2">
              &amp; Cloud NVMe Hosting Indonesia
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-4xl mx-auto mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="md:block">
              Hadir untuk memangkas biaya dan waktu tunggu pembuatan website bisnis.
            </span>
            <span className="md:block">
              Template WordPress premium siap pakai yang langsung online dalam 24 jam dengan performa tinggi, domain resmi, dan kepemilikan aset 100% penuh.
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-[#0F141C]/80 border border-[#1B2433] px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>Tanpa Vendor Lock-in</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0F141C]/80 border border-[#1B2433] px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>Data Center Tier-3 Indonesia</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0F141C]/80 border border-[#1B2433] px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>Registrasi Domain Resmi PANDI/ICANN</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#090C10] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statMetrics.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-6 hover:-translate-y-2 hover:border-[#00E599] hover:shadow-[0_20px_40px_rgba(0,229,153,0.18)] hover:bg-[#121824] transition-all duration-300 group cursor-default relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#00E599]/5 rounded-full blur-xl group-hover:bg-[#00E599]/20 group-hover:scale-150 transition-all duration-500 pointer-events-none" />

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#00E599] transition-colors tracking-tight font-mono">
                      {stat.value}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599] group-hover:scale-110 group-hover:bg-[#00E599] group-hover:text-[#090C10] group-hover:rotate-6 transition-all duration-300 shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#00E599] transition-colors">
                      {stat.label}
                    </h3>
                    <p className="text-xs text-[#94A3B8] group-hover:text-slate-300 transition-colors leading-relaxed">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#090C10] border-t border-[#1B2433]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold uppercase tracking-wider">
                <span>CERITA KAMI</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Menjawab Masalah Teknis yang Sering Dihadapi Pebisnis
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                <p>
                  Banyak pemilik bisnis dan pengusaha di Indonesia menghadapi dilema yang sama ketika ingin go-digital:
                  <span className="text-white font-semibold"> bingung beli domain di mana</span>,
                  <span className="text-white font-semibold"> hosting di mana</span>, dan
                  <span className="text-white font-semibold"> siapa yang membangun websitenya</span>.
                </p>
                <p>
                  Kerap kali, website dikerjakan oleh pihak ketiga namun akses panel hosting atau akun domain ditahan,
                  menjadikan pemilik bisnis terkunci (<span className="text-[#00E599]">vendor lock-in</span>) dan
                  kesulitan saat ingin melakukan pengembangan di kemudian hari.
                </p>
                <p>
                  <strong className="text-white">WebHoster.co.id</strong> hadir sebagai solusi instan satu pintu. Kami
                  mengintegrasikan katalog template WordPress siap pakai yang sudah dioptimasi performanya, pendaftaran domain resmi,
                  serta penyediaan server cloud NVMe super cepat dalam satu paket transparan tanpa ribet koding.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-white">
                  <div className="w-5 h-5 rounded-full bg-[#00E599]/20 text-[#00E599] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Template WordPress Siap Pakai 24 Jam</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white">
                  <div className="w-5 h-5 rounded-full bg-[#00E599]/20 text-[#00E599] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>CMS Elementor Bebas Koding</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white">
                  <div className="w-5 h-5 rounded-full bg-[#00E599]/20 text-[#00E599] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Gratis Domain &amp; Cloud NVMe 1 Tahun</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white">
                  <div className="w-5 h-5 rounded-full bg-[#00E599]/20 text-[#00E599] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>100% Hak Akses Milik Klien</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#0F141C] via-[#121A24] to-[#0F141C] border-2 border-[#00E599]/40 hover:border-[#00E599] rounded-3xl p-7 sm:p-9 shadow-[0_0_40px_rgba(0,229,153,0.15)] relative overflow-hidden group transition-all duration-500">
                <div className="absolute inset-0 cyber-dots opacity-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#00E599]/15 rounded-full blur-2xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-[#00E599] text-xs font-bold mb-6">
                  <ShieldCheck className="w-4 h-4" />
                  <span>FILOSOFI UTAMA KAMI</span>
                </div>

                <h3 className="text-2xl font-black text-white mb-4 leading-snug group-hover:text-[#00E599] transition-colors">
                  &ldquo;Zero Vendor Lock-in & Transparansi Penuh&rdquo;
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Kami percaya bahwa setiap aset digital bisnis Anda—mulai dari nama domain, source code, hingga akses
                  cPanel hosting—harus 100% menjadi hak milik legal Anda.
                </p>

                <div className="bg-[#090C10]/80 border border-[#1B2433] rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1B2433]">
                    <span className="text-[#94A3B8]">Domain Registrant</span>
                    <span className="font-bold text-white">Nama Perusahaan Klien</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1B2433]">
                    <span className="text-[#94A3B8]">Akses cPanel / Cloud</span>
                    <span className="font-bold text-[#00E599]">Full Root & Master Login</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#94A3B8]">Keterikatan Kontrak</span>
                    <span className="font-bold text-white">Bebas & Fleksibel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#090C10] border-t border-[#1B2433]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold uppercase tracking-wider mb-4">
            <span>NILAI UTAMA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Prinsip Kerja yang Kami Pegang Teguh
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto mb-14">
            Komitmen integritas dalam setiap baris kode yang kami rancang dan arsitektur server yang kami bangun.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {corePrinciples.map((principle, idx) => {
              const IconComp = principle.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-7 hover:-translate-y-2 hover:border-[#00E599] hover:shadow-[0_20px_40px_rgba(0,229,153,0.2)] hover:bg-[#121824] transition-all duration-300 group relative overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#00E599]/5 rounded-full blur-xl group-hover:bg-[#00E599]/25 group-hover:scale-150 transition-all duration-500 pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599] group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#00E599] group-hover:text-[#090C10] shadow-[0_0_0_rgba(0,229,153,0)] group-hover:shadow-[0_0_20px_rgba(0,229,153,0.5)] transition-all duration-300">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/20 px-2.5 py-1 rounded-full">
                        {principle.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-[#00E599] transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] group-hover:text-slate-300 transition-colors leading-relaxed">
                      {principle.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#090C10] border-t border-[#1B2433]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold uppercase tracking-wider mb-3">
                <span>INFRASTRUKTUR TEKNOLOGI</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Standar Server & Data Center WebHoster
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md">
              Infrastruktur cloud berstandar industri dirancang khusus untuk kecepatan maksimal, ketahanan uptime 99.9%,
              dan keamanan berlapis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataCenterSpecs.map((spec, idx) => {
              const IconComp = spec.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-6 hover:-translate-y-1.5 hover:border-[#00E599]/80 hover:shadow-[0_15px_35px_rgba(0,229,153,0.18)] hover:bg-[#121824] transition-all duration-300 group cursor-default relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-center text-[#00E599] group-hover:scale-110 group-hover:bg-[#00E599] group-hover:text-[#090C10] transition-all duration-300 shrink-0 mt-1">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-[#00E599] transition-colors">
                        {spec.title}
                      </h4>
                      <p className="text-xs text-[#94A3B8] group-hover:text-slate-300 transition-colors leading-relaxed">
                        {spec.desc}
                      </p>
                    </div>
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
                  <WhatsAppIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" variant="white" />
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-[#00E599] uppercase tracking-wider mb-1.5">
                  KONSULTASI LANGSUNG
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
                  Siap Berkolaborasi Membangun Website Bisnis Anda?
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] group-hover:text-slate-300 transition-colors max-w-xl">
                  Konsultasikan ide proyek, kebutuhan server cloud, atau nama domain bisnis Anda langsung bersama tim
                  ahli WebHoster.
                </p>
              </div>
            </div>

            <div className="z-10 shrink-0 w-full md:w-auto">
              <button
                onClick={() =>
                  openWhatsApp(
                    "Halo WebHoster.co.id, saya ingin berdiskusi mengenai proyek pembuatan website & cloud hosting untuk bisnis saya."
                  )
                }
                className="w-full md:w-auto bg-[#00E599] text-[#090C10] font-extrabold text-sm sm:text-base px-8 py-4 rounded-full hover:bg-[#00C882] shadow-[0_0_25px_rgba(0,229,153,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#090C10]" />
                <span>Hubungi Tim Kami Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
