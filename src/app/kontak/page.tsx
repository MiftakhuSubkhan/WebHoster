"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Check,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Server,
  Globe,
  Monitor,
  Building2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { addLead } from "@/lib/leads";

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

export default function KontakPage() {
  const [nama, setNama] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [bisnisDomain, setBisnisDomain] = useState("");
  const [layanan, setLayanan] = useState("Website Company Profile (PT / CV / Korporat)");
  const [anggaran, setAnggaran] = useState("Rp 1.300.000 (Paket Pro - Paling Direkomendasikan)");
  const [catatan, setCatatan] = useState("");

  const openWhatsApp = (customMessage?: string) => {
    const targetPhone = "6281391123841";
    const defaultMsg =
      "Halo WebHoster.co.id, saya ingin konsultasi mengenai layanan pembuatan website / cloud hosting / domain.";
    const text = encodeURIComponent(customMessage || defaultMsg);
    window.open(`https://wa.me/${targetPhone}?text=${text}`, "_blank");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNama = nama.trim() || "Calon Klien";
    const cleanPhone = phoneInput.trim() || "-";
    const cleanBisnis = bisnisDomain.trim() || "-";
    const cleanCatatan = catatan.trim() || "Saya ingin berdiskusi lebih lanjut terkait kebutuhan proyek ini.";

    // Save lead to local storage & broadcast event for Admin Workspace synchronization
    try {
      addLead({
        name: cleanNama,
        phone: cleanPhone.replace(/[^0-9]/g, "").startsWith("0")
          ? "62" + cleanPhone.replace(/[^0-9]/g, "").slice(1)
          : cleanPhone.replace(/[^0-9]/g, ""),
        business: cleanBisnis,
        packageChosen: layanan,
        budget: anggaran,
        status: "Baru",
        date: "Baru saja",
        notes: cleanCatatan,
        customMessage: cleanCatatan,
      });
    } catch (err) {}

    const waText = `Halo WebHoster.co.id, saya ingin konsultasi rencana proyek digital:

*Nama Lengkap:* ${cleanNama}
*Nomor WhatsApp:* ${cleanPhone}
*Nama Bisnis / Rencana Domain:* ${cleanBisnis}
*Kategori Layanan:* ${layanan}
*Estimasi Anggaran:* ${anggaran}

*Catatan / Ide Singkat:*
${cleanCatatan}

Mohon informasi saran solusi dan estimasi waktu pengerjaannya. Terima kasih!`;

    openWhatsApp(waText);
  };

  return (
    <div className="min-h-screen bg-[#090C10] text-[#F1F5F9] selection:bg-[#00E599] selection:text-[#090C10] font-sans antialiased overflow-x-hidden">
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-[#1B2433]/60">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00E599]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="block mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold tracking-wide uppercase">
              <span>HUBUNGI KAMI &amp; KONSULTASI</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[50px] font-extrabold text-white leading-[1.25] tracking-tight mb-6 max-w-5xl mx-auto drop-shadow-md">
            <span className="block whitespace-normal md:whitespace-nowrap">
              Mulai Transformasi Digital
            </span>
            <span className="text-[#00E599] bg-gradient-to-r from-[#00E599] via-[#24f3ae] to-[#5eead4] bg-clip-text text-transparent block mt-1 sm:mt-2">
              Bisnis Anda Bersama WebHoster
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-4xl mx-auto mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="block md:whitespace-nowrap">
              Diskusikan kebutuhan website, registrasi domain resmi, atau konfigurasi server cloud Anda.
            </span>
            <span className="block md:whitespace-nowrap mt-1">
              Tim spesialis kami siap merespons cepat untuk mewujudkan solusi digital bisnis Anda.
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-[#0F141C]/80 border border-[#1B2433] px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>Respon Cepat via WhatsApp (&lt; 15 Menit)</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0F141C]/80 border border-[#1B2433] px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>100% Konsultasi Gratis Tanpa Komitmen</span>
            </div>
            <div className="flex items-center gap-2 bg-[#0F141C]/80 border border-[#1B2433] px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>Penerbitan Proposal &amp; Invoice Resmi</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#090C10] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 bg-[#0F141C] border border-[#1B2433] hover:border-[#00E599]/40 rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent" />

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold uppercase tracking-wider mb-3">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>FORMULIR DISKUSI PROYEK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
                Rencanakan Website Impian Anda
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] mb-8 leading-relaxed">
                Isi formulir ringkas di bawah ini. Sistem kami akan merangkum kebutuhan Anda secara otomatis ke pesan WhatsApp resmi konsultan kami untuk diskusi instan.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                      Nama Lengkap Anda <span className="text-[#00E599]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Contoh: Hendra Wijaya"
                      className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none transition shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                      Nomor WhatsApp Aktif <span className="text-[#00E599]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="Contoh: 0813-9112-3841"
                      className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none transition shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Nama Bisnis / Rencana Domain <span className="text-[#64748B] font-normal normal-case">(Opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={bisnisDomain}
                    onChange={(e) => setBisnisDomain(e.target.value)}
                    placeholder="Contoh: PT Sumber Pangan / tokoonlineku.co.id"
                    className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none transition shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Kategori Layanan yang Dibutuhkan <span className="text-[#00E599]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={layanan}
                      onChange={(e) => setLayanan(e.target.value)}
                      className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-4 py-3 text-sm text-white focus:outline-none cursor-pointer transition appearance-none pr-10 shadow-inner"
                    >
                      <option value="Website Company Profile (PT / CV / Korporat)">Website Company Profile (PT / CV / Lembaga)</option>
                      <option value="Website Sales Mobil & Otomotif">Website Sales Mobil &amp; Otomotif</option>
                      <option value="Website Toko Online (Katalog Produk & WA Checkout)">Website Toko Online (Katalog Produk &amp; WA Checkout)</option>
                      <option value="Website Tour & Travel Wisata">Website Tour &amp; Travel Wisata</option>
                      <option value="Website Resto, Cafe & Kuliner (F&B)">Website Resto, Cafe &amp; Kuliner (F&amp;B)</option>
                      <option value="Paket Template WordPress Siap Pakai (All-in-One)">Paket Template WordPress Siap Pakai (All-in-One)</option>
                      <option value="Custom Web App & Sistem Khusus">Custom Web App &amp; Sistem Khusus</option>
                      <option value="Registrasi Domain Resmi & Cloud Hosting NVMe">Registrasi Domain Resmi &amp; Cloud Hosting NVMe</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Estimasi Anggaran / Pilihan Paket
                  </label>
                  <div className="relative">
                    <select
                      value={anggaran}
                      onChange={(e) => setAnggaran(e.target.value)}
                      className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-4 py-3 text-sm text-white focus:outline-none cursor-pointer transition appearance-none pr-10 shadow-inner"
                    >
                      <option value="Rp 900.000 (Paket Basic - Promo Terbatas)">Rp 900.000 (Paket Basic - Promo Terbatas)</option>
                      <option value="Rp 1.300.000 (Paket Pro - Paling Direkomendasikan)">Rp 1.300.000 (Paket Pro - Paling Direkomendasikan)</option>
                      <option value="Rp 1.700.000 (Paket Premium - Fitur Lengkap)">Rp 1.700.000 (Paket Premium - Fitur Lengkap)</option>
                      <option value="> Rp 2.000.000 (Custom Web & Kebutuhan Spesifik)">&gt; Rp 2.000.000 (Custom Web &amp; Kebutuhan Spesifik)</option>
                      <option value="Belum Ditentukan (Konsultasi Rekomendasi Terlebih Dahulu)">Belum Ditentukan (Konsultasi Terlebih Dahulu)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Catatan / Ide Singkat Proyek
                  </label>
                  <textarea
                    rows={4}
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    placeholder="Ceritakan fitur utama yang Anda perlukan, referensi website yang disukai, atau target tenggat waktu peluncuran..."
                    className="w-full bg-[#121824] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none transition resize-none shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00E599] text-[#090C10] font-black text-sm py-4 rounded-xl hover:bg-[#00C882] shadow-[0_0_25px_rgba(0,229,153,0.35)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#090C10]" />
                  <span>Kirim Konsultasi via WhatsApp →</span>
                </button>

                <p className="text-[11px] text-[#64748B] text-center pt-1 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" />
                  <span>Data Anda terlindungi aman &amp; langsung diteruskan ke WhatsApp konsultan resmi kami.</span>
                </p>
              </form>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="bg-[#0F141C] border border-[#1B2433] hover:border-[#00E599]/60 rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden group transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599] shrink-0 group-hover:bg-[#00E599] group-hover:text-[#090C10] transition-all duration-300 shadow-[0_0_15px_rgba(0,229,153,0.2)]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-[#00E599] uppercase tracking-wider mb-1">
                      KANTOR OPERASIONAL
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">
                      Alamat Kantor Resmi
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      Jalan Ngadinegaran Blok MJ III No. 144, Mantrijeron, Yogyakarta
                    </p>
                    <a
                      href="https://maps.app.goo.gl/e34cMg3e8jdwvtJd7"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00E599] hover:underline"
                    >
                      <span>Buka di Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#0F141C] border border-[#1B2433] hover:border-[#00E599]/60 rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden group transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599] shrink-0 group-hover:bg-[#00E599] group-hover:text-[#090C10] transition-all duration-300 shadow-[0_0_15px_rgba(0,229,153,0.2)]">
                    <WhatsAppIcon className="w-6 h-6 text-[#00E599] group-hover:text-[#090C10]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-[#00E599] uppercase tracking-wider">
                        WHATSAPP QUICK CHAT
                      </span>
                      <span className="bg-[#00E599]/15 text-[#00E599] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#00E599]/30">
                        FAST RESPONSE
                      </span>
                    </div>
                    <div className="text-lg font-black text-white font-mono mb-1">
                      0813-9112-3841
                    </div>
                    <p className="text-xs text-[#94A3B8] mb-4">
                      Respon tim spesialis rata-rata di bawah 15 menit pada jam operasional kerja.
                    </p>
                    <button
                      onClick={() => openWhatsApp("Halo WebHoster, saya ingin konsultasi cepat via WhatsApp.")}
                      className="w-full bg-[#121824] hover:bg-[#00E599] text-white hover:text-[#090C10] border border-[#1B2433] hover:border-[#00E599] font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#00E599] group-hover:text-[#090C10]" />
                      <span>Chat WhatsApp Sekarang</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#0F141C] border border-[#1B2433] hover:border-[#00E599]/60 rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden group transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599] shrink-0 group-hover:bg-[#00E599] group-hover:text-[#090C10] transition-all duration-300 shadow-[0_0_15px_rgba(0,229,153,0.2)]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-[#00E599] uppercase tracking-wider mb-1">
                      EMAIL RESMI
                    </div>
                    <div className="text-base font-bold text-white font-mono mb-1">
                      halo@webhoster.co.id
                    </div>
                    <p className="text-xs text-[#94A3B8] mb-4">
                      Untuk pengiriman Term of Reference (TOR), proposal resmi, tender, dan kebutuhan kerja sama B2B.
                    </p>
                    <a
                      href="mailto:halo@webhoster.co.id"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00E599] hover:underline"
                    >
                      <span>Kirim Email Proposal</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Jam Layanan &amp; Operasional</h4>
                    <p className="text-xs text-[#94A3B8]">Waktu Indonesia Barat (WIB)</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 border-t border-[#1B2433] pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#94A3B8]">Senin – Sabtu:</span>
                    <strong className="text-white font-mono">08.00 – 21.00 WIB</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#94A3B8]">Minggu &amp; Libur Nasional:</span>
                    <span className="text-[#00E599] font-semibold">Monitoring Server 24/7</span>
                  </div>
                  <div className="pt-2 border-t border-[#1B2433]/60 flex items-center gap-2 text-[11px] text-[#00E599]">
                    <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
                    <span className="font-semibold">Layanan Konsultasi Online Siap Merespons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#090C10] border-t border-[#1B2433]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-semibold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>PETA AREA OPERASIONAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Lokasi Kantor Operasional Kami
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Berada strategis di kawasan Ngaglik, Sleman, D.I. Yogyakarta. Terbuka untuk diskusi proyek secara langsung dengan membuat janji temu terlebih dahulu.
            </p>
          </div>

          <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl overflow-hidden shadow-2xl relative group">
            <div className="bg-[#121824] px-6 py-3.5 border-b border-[#1B2433] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                <span className="ml-2 text-[#94A3B8] font-mono">
                  Jalan Ngadinegaran Blok MJ III No. 144, Mantrijeron, Yogyakarta
                </span>
              </div>
              <a
                href="https://maps.app.goo.gl/e34cMg3e8jdwvtJd7"
                target="_blank"
                rel="noreferrer"
                className="bg-[#00E599] text-[#090C10] font-bold px-4 py-1.5 rounded-lg hover:bg-[#00C882] transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Buka Petunjuk Arah di Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative w-full h-[380px] sm:h-[440px] bg-[#090C10]">
              <iframe
                title="Peta Lokasi Kantor WebHoster.co.id Yogyakarta"
                src="https://maps.google.com/maps?q=Jalan+Ngadinegaran+Blok+MJ+III+No.+144,+Mantrijeron,+Yogyakarta&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "contrast(102%) brightness(94%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-[#090C10]/90 backdrop-blur-md border border-[#00E599]/40 p-4 rounded-2xl shadow-xl flex items-center gap-3.5 z-10 max-w-md">
                <div className="w-10 h-10 rounded-xl bg-[#00E599] flex items-center justify-center text-[#090C10] font-black text-lg shrink-0 shadow-[0_0_15px_rgba(0,229,153,0.4)]">
                  W
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Kantor WebHoster.co.id</div>
                  <div className="text-[11px] text-[#94A3B8]">
                    Jalan Ngadinegaran Blok MJ III No. 144, Mantrijeron, Yogyakarta
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
