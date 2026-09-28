"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Share2,
  Check,
  ExternalLink,
  MessageCircle,
  Send,
  Code,
  ArrowLeft,
  Sparkles,
  Copy,
} from "lucide-react";

function TwitterXIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

export default function OpenGraphPreviewSimulatorPage() {
  const [activeTab, setActiveTab] = useState<"whatsapp" | "twitter" | "facebook" | "telegram" | "raw">("whatsapp");
  const [copied, setCopied] = useState(false);

  const ogData = {
    title: "WebHoster.co.id - Website Cepat & Server Tangguh",
    description:
      "Bangun kredibilitas bisnis Anda dengan website profesional, gratis domain resmi (.com / .id), dan cloud server berkecepatan tinggi dengan garansi 99.9% uptime.",
    url: "https://webhoster.co.id",
    domain: "webhoster.co.id",
    image: "/og-image.png",
    siteName: "WebHoster.co.id",
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://webhoster.co.id");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090C10] text-[#F1F5F9] font-sans antialiased py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/harga"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00E599] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Paket Harga</span>
          </Link>
          <span className="text-xs text-[#64748B] font-mono">Open Graph Inspector 1.0</span>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00E599]/30 bg-[#00E599]/10 text-[#00E599] text-xs font-bold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(0,229,153,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIMULASI PREVIEW SOSIAL MEDIA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            Simulasi Tampilan Link Share (Open Graph)
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto">
            Berikut adalah simulasi visual bagaimana link website <b>WebHoster.co.id</b> akan tampil saat dikirimkan atau dibagikan ke berbagai platform media sosial.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "whatsapp"
                ? "bg-[#25D366] text-black shadow-[0_0_20px_rgba(37,211,102,0.35)]"
                : "bg-[#0F141C] text-[#94A3B8] border border-[#1B2433] hover:text-white"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab("twitter")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "twitter"
                ? "bg-[#1DA1F2] text-white shadow-[0_0_20px_rgba(29,161,242,0.35)]"
                : "bg-[#0F141C] text-[#94A3B8] border border-[#1B2433] hover:text-white"
            }`}
          >
            <TwitterXIcon className="w-4 h-4" />
            <span>Twitter / X</span>
          </button>

          <button
            onClick={() => setActiveTab("facebook")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "facebook"
                ? "bg-[#1877F2] text-white shadow-[0_0_20px_rgba(24,119,242,0.35)]"
                : "bg-[#0F141C] text-[#94A3B8] border border-[#1B2433] hover:text-white"
            }`}
          >
            <FacebookIcon className="w-4 h-4" />
            <span>Facebook</span>
          </button>

          <button
            onClick={() => setActiveTab("telegram")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "telegram"
                ? "bg-[#229ED9] text-white shadow-[0_0_20px_rgba(34,158,217,0.35)]"
                : "bg-[#0F141C] text-[#94A3B8] border border-[#1B2433] hover:text-white"
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Telegram</span>
          </button>

          <button
            onClick={() => setActiveTab("raw")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === "raw"
                ? "bg-[#00E599] text-[#090C10] shadow-[0_0_20px_rgba(0,229,153,0.35)]"
                : "bg-[#0F141C] text-[#94A3B8] border border-[#1B2433] hover:text-white"
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Meta Tags Raw</span>
          </button>
        </div>

        <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E599]/5 rounded-full blur-[120px] pointer-events-none" />

          {activeTab === "whatsapp" && (
            <div className="w-full max-w-lg bg-[#0B141A] rounded-2xl p-4 sm:p-6 shadow-2xl border border-[#202C33]">
              <div className="flex items-center gap-3 pb-3 border-b border-[#202C33] mb-4">
                <div className="w-10 h-10 rounded-full bg-[#00E599] flex items-center justify-center text-black font-black text-sm">
                  W
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Calon Klien / WhatsApp Chat</div>
                  <div className="text-[11px] text-[#25D366]">online</div>
                </div>
              </div>

              <div className="bg-[#005C4B] rounded-2xl rounded-tr-none p-2 sm:p-3 text-white max-w-sm sm:max-w-md ml-auto shadow-md">
                <p className="text-xs text-[#D1D7DB] mb-2 leading-relaxed">
                  Halo mas, ini link website WebHoster yang kemarin dibahas: <br />
                  <span className="text-[#53BDEB] underline cursor-pointer">https://webhoster.co.id</span>
                </p>

                <div className="bg-[#025144] rounded-xl overflow-hidden border border-[#024439] hover:bg-[#02493d] transition cursor-pointer">
                  <div className="relative aspect-[1200/630] w-full bg-[#090C10] overflow-hidden">
                    <img
                      src={ogData.image}
                      alt={ogData.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-3">
                    <div className="text-[10px] text-[#A6D5CC] uppercase tracking-wider font-mono">
                      {ogData.domain}
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5 line-clamp-2 leading-snug">
                      {ogData.title}
                    </div>
                    <div className="text-xs text-[#D1D7DB] mt-1 line-clamp-2 leading-relaxed">
                      {ogData.description}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#8696A0]">
                  <span>10:45</span>
                  <span className="text-[#53BDEB]">✓✓</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "twitter" && (
            <div className="w-full max-w-lg bg-black rounded-2xl p-5 shadow-2xl border border-[#2F3336]">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#00E599] flex items-center justify-center text-black font-black text-sm">
                  W
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                    <span>WebHoster Indonesia</span>
                    <span className="text-[#71767B] font-normal text-xs">@webhoster_id · 1m</span>
                  </div>
                  <p className="text-xs text-white mt-1 leading-relaxed">
                    Sedang mencari jasa pembuatan website all-in-one termasuk domain resmi &amp; cloud server kencang? Cek selengkapnya:
                  </p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#2F3336] bg-[#000000] hover:border-[#536471] transition cursor-pointer">
                <div className="relative aspect-[1200/630] w-full bg-[#090C10]">
                  <img
                    src={ogData.image}
                    alt={ogData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 bg-[#0A0A0A]">
                  <div className="text-[11px] text-[#71767B] font-mono">{ogData.domain}</div>
                  <div className="text-sm font-bold text-white mt-0.5 leading-snug">
                    {ogData.title}
                  </div>
                  <div className="text-xs text-[#71767B] mt-1 line-clamp-2 leading-relaxed">
                    {ogData.description}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "facebook" && (
            <div className="w-full max-w-lg bg-[#242526] rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#3E4042]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#00E599] flex items-center justify-center text-black font-black text-sm">
                  W
                </div>
                <div>
                  <div className="text-sm font-bold text-white">WebHoster.co.id</div>
                  <div className="text-[11px] text-[#B0B3B8]">Baru saja · 🌐 Publik</div>
                </div>
              </div>

              <p className="text-xs text-[#E4E6EB] mb-3 leading-relaxed">
                Pilih desain template WordPress impian Anda dan buat website bisnis Anda aktif dalam 24 jam!
              </p>

              <div className="rounded-xl overflow-hidden border border-[#3E4042] bg-[#3A3B3C] cursor-pointer hover:brightness-105 transition">
                <div className="relative aspect-[1200/630] w-full bg-[#090C10]">
                  <img
                    src={ogData.image}
                    alt={ogData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="text-[10px] text-[#B0B3B8] uppercase font-mono">{ogData.domain}</div>
                  <div className="text-sm font-bold text-white mt-0.5 leading-snug line-clamp-1">
                    {ogData.title}
                  </div>
                  <div className="text-xs text-[#B0B3B8] mt-1 line-clamp-1 leading-relaxed">
                    {ogData.description}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "telegram" && (
            <div className="w-full max-w-lg bg-[#182533] rounded-2xl p-5 shadow-2xl border border-[#242F3D]">
              <div className="text-xs text-[#6C7883] mb-3 font-mono">Telegram Messenger Preview</div>

              <div className="bg-[#202B36] rounded-xl p-3 border-l-4 border-[#229ED9] shadow-md">
                <div className="text-xs font-bold text-[#229ED9] mb-1">{ogData.siteName}</div>
                <div className="text-sm font-bold text-white mb-1.5 leading-tight">{ogData.title}</div>
                <div className="text-xs text-[#8E9CA8] mb-3 leading-relaxed">{ogData.description}</div>

                <div className="relative aspect-[1200/630] w-full rounded-lg overflow-hidden border border-[#2B394A]">
                  <img
                    src={ogData.image}
                    alt={ogData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "raw" && (
            <div className="w-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#00E599]">
                  HTML &lt;head&gt; Meta Tags Output:
                </span>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-[#121824] hover:bg-[#1B2433] text-xs font-bold text-slate-300 flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#00E599]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "URL Disalin!" : "Salin URL Website"}</span>
                </button>
              </div>

              <div className="bg-[#090C10] border border-[#1B2433] rounded-2xl p-4 sm:p-5 font-mono text-[11px] sm:text-xs text-slate-300 overflow-x-auto leading-relaxed space-y-1.5">
                <div>&lt;<span className="text-[#FF7B72]">meta</span> <span className="text-[#79C0FF]">property</span>=<span className="text-[#A5D6FF]">"og:title"</span> <span className="text-[#79C0FF]">content</span>=<span className="text-[#A5D6FF]">"{ogData.title}"</span> /&gt;</div>
                <div>&lt;<span className="text-[#FF7B72]">meta</span> <span className="text-[#79C0FF]">property</span>=<span className="text-[#A5D6FF]">"og:description"</span> <span className="text-[#79C0FF]">content</span>=<span className="text-[#A5D6FF]">"{ogData.description}"</span> /&gt;</div>
                <div>&lt;<span className="text-[#FF7B72]">meta</span> <span className="text-[#79C0FF]">property</span>=<span className="text-[#A5D6FF]">"og:url"</span> <span className="text-[#79C0FF]">content</span>=<span className="text-[#A5D6FF]">"{ogData.url}"</span> /&gt;</div>
                <div>&lt;<span className="text-[#FF7B72]">meta</span> <span className="text-[#79C0FF]">property</span>=<span className="text-[#A5D6FF]">"og:site_name"</span> <span className="text-[#79C0FF]">content</span>=<span className="text-[#A5D6FF]">"{ogData.siteName}"</span> /&gt;</div>
                <div>&lt;<span className="text-[#FF7B72]">meta</span> <span className="text-[#79C0FF]">property</span>=<span className="text-[#A5D6FF]">"og:locale"</span> <span className="text-[#79C0FF]">content</span>=<span className="text-[#A5D6FF]">"id_ID"</span> /&gt;</div>
                <div>&lt;<span className="text-[#FF7B72]">meta</span> <span className="text-[#79C0FF]">property</span>=<span className="text-[#A5D6FF]">"og:image"</span> <span className="text-[#79C0FF]">content</span>=<span className="text-[#A5D6FF]">"https://webhoster.co.id{ogData.image}"</span> /&gt;</div>
                <div>&lt;<span className="text-[#FF7B72]">meta</span> <span className="text-[#79C0FF]">property</span>=<span className="text-[#A5D6FF]">"og:image:width"</span> <span className="text-[#79C0FF]">content</span>=<span className="text-[#A5D6FF]">"1200"</span> /&gt;</div>
                <div>&lt;<span className="text-[#FF7B72]">meta</span> <span className="text-[#79C0FF]">property</span>=<span className="text-[#A5D6FF]">"og:image:height"</span> <span className="text-[#79C0FF]">content</span>=<span className="text-[#A5D6FF]">"630"</span> /&gt;</div>
                <div>&lt;<span className="text-[#FF7B72]">meta</span> <span className="text-[#79C0FF]">property</span>=<span className="text-[#A5D6FF]">"og:type"</span> <span className="text-[#79C0FF]">content</span>=<span className="text-[#A5D6FF]">"website"</span> /&gt;</div>

                <div>&lt;<span className="text-[#FF7B72]">meta</span> <span className="text-[#79C0FF]">name</span>=<span className="text-[#A5D6FF]">"twitter:card"</span> <span className="text-[#79C0FF]">content</span>=<span className="text-[#A5D6FF]">"summary_large_image"</span> /&gt;</div>
                <div>&lt;<span className="text-[#FF7B72]">meta</span> <span className="text-[#79C0FF]">name</span>=<span className="text-[#A5D6FF]">"twitter:title"</span> <span className="text-[#79C0FF]">content</span>=<span className="text-[#A5D6FF]">"{ogData.title}"</span> /&gt;</div>
                <div>&lt;<span className="text-[#FF7B72]">meta</span> <span className="text-[#79C0FF]">name</span>=<span className="text-[#A5D6FF]">"twitter:description"</span> <span className="text-[#79C0FF]">content</span>=<span className="text-[#A5D6FF]">"{ogData.description}"</span> /&gt;</div>
                <div>&lt;<span className="text-[#FF7B72]">meta</span> <span className="text-[#79C0FF]">name</span>=<span className="text-[#A5D6FF]">"twitter:image"</span> <span className="text-[#79C0FF]">content</span>=<span className="text-[#A5D6FF]">"https://webhoster.co.id{ogData.image}"</span> /&gt;</div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-[#121824] border border-[#1B2433] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]">
          <div>
            <b>Resolusi Standar:</b> Gambar Open Graph menggunakan rasio <b>1200 x 630 px (1.91:1)</b> sesuai spesifikasi resmi Facebook, Twitter, WhatsApp, dan LinkedIn.
          </div>
          <a
            href={ogData.image}
            target="_blank"
            className="px-4 py-2 rounded-xl bg-[#00E599]/15 text-[#00E599] hover:bg-[#00E599] hover:text-black font-bold transition flex items-center gap-1.5 shrink-0"
          >
            <span>Buka File Gambar Asli</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
