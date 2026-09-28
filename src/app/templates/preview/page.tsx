"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Laptop,
  Tablet,
  Smartphone,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Layers,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { getTemplates, syncTemplatesWithSupabase, TemplateCatalogItem } from "@/lib/templates";
import { recordTemplateView } from "@/lib/analytics";

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const idParam = searchParams.get("id") || "";
  const nameParam = searchParams.get("name") || "";
  const urlParam = searchParams.get("url") || "";
  const catParam = searchParams.get("cat") || "";

  const [template, setTemplate] = useState<TemplateCatalogItem | null>(null);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isWidgetMinimized, setIsWidgetMinimized] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  useEffect(() => {
    const sync = () => {
      try {
        const list = getTemplates();
        if (idParam) {
          const found = list.find((t) => t.id === idParam);
          if (found) {
            setTemplate(found);
            recordTemplateView(found.id);
            return;
          }
        }
        if (nameParam) {
          const found = list.find(
            (t) => t.name.toLowerCase() === nameParam.toLowerCase()
          );
          if (found) {
            setTemplate(found);
            recordTemplateView(found.id);
            return;
          }
        }
      } catch (e) {}
    };

    sync();
    syncTemplatesWithSupabase().then(() => sync()).catch(() => {});
  }, [idParam, nameParam]);

  const templateName = template?.name || nameParam || "Template Pilihan";
  const templateCategory = template?.category || catParam || "Bisnis & UMKM";
  const rawDemoUrl = template?.demoUrl || urlParam || "https://demo.webhoster.co.id/";
  
  const cleanDemoUrl = rawDemoUrl.trim().startsWith("http://") || rawDemoUrl.trim().startsWith("https://")
    ? rawDemoUrl.trim()
    : `https://${rawDemoUrl.trim()}`;

  const targetPhone = "6281391123841";
  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      `Halo WebHoster.co.id, saya sedang melihat Live Demo untuk template "${templateName}" (${cleanDemoUrl}) dan tertarik ingin memesan paket website ini.`
    );
    window.open(`https://wa.me/${targetPhone}?text=${msg}`, "_blank");
  };

  const handleOrder = () => {
    router.push(`/harga?template=${encodeURIComponent(templateName)}#paket-harga`);
  };

  const handleOpenRawUrl = () => {
    window.open(cleanDemoUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col overflow-hidden select-none">
      {/* 1. TOP BAR NAVIGATOR (Collapsible) */}
      {isTopBarVisible ? (
        <header className="h-14 bg-[#0B0F17]/95 border-b border-[#1B2433] px-3 sm:px-6 flex items-center justify-between z-30 shrink-0 backdrop-blur-md transition-all duration-300">
          {/* Left: Brand & Back button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/harga#katalog-template"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121824] hover:bg-[#1B2433] text-slate-300 hover:text-white border border-[#1B2433] hover:border-[#00E599]/40 text-xs font-bold transition shadow-sm"
              title="Kembali ke Katalog Desain"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#00E599]" />
              <span className="hidden sm:inline">Kembali</span>
            </Link>

            <div className="h-4 w-[1px] bg-[#1B2433] hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-xs sm:text-sm font-black text-white truncate max-w-[140px] sm:max-w-[220px]">
                  {templateName}
                </span>
                <span className="hidden md:inline-block text-[10px] font-bold text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/30 px-2 py-0.5 rounded-full uppercase">
                  {templateCategory}
                </span>
              </div>
            </div>
          </div>

          {/* Center: Device Switcher */}
          <div className="hidden md:flex items-center bg-[#07090E] p-1 rounded-xl border border-[#1B2433] shadow-inner">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                deviceMode === "desktop"
                  ? "bg-[#00E599] text-[#090C10] shadow-[0_0_12px_rgba(0,229,153,0.3)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
              title="Tampilan Desktop (Layar Penuh)"
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDeviceMode("tablet")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                deviceMode === "tablet"
                  ? "bg-[#00E599] text-[#090C10] shadow-[0_0_12px_rgba(0,229,153,0.3)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
              title="Tampilan Tablet iPad (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                deviceMode === "mobile"
                  ? "bg-[#00E599] text-[#090C10] shadow-[0_0_12px_rgba(0,229,153,0.3)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
              title="Tampilan Smartphone (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Right Actions: Direct URL & Toggle Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsIframeLoaded(false);
                setIframeKey((prev) => prev + 1);
              }}
              className="p-2 rounded-xl bg-[#121824] hover:bg-[#1B2433] text-slate-300 hover:text-white border border-[#1B2433] transition"
              title="Muat Ulang Demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleOpenRawUrl}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121824] hover:bg-[#1B2433] text-[#00E599] hover:text-white border border-[#1B2433] hover:border-[#00E599]/40 text-xs font-bold transition shadow-sm cursor-pointer"
              title="Buka Website Asli di Tab Baru Tanpa Frame"
            >
              <span>Buka Layar Penuh</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleOrder}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00E599] hover:bg-[#00C882] text-[#090C10] font-black text-xs shadow-[0_0_15px_rgba(0,229,153,0.35)] transition cursor-pointer"
            >
              <span>Order Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsTopBarVisible(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#1B2433] transition ml-1"
              title="Sembunyikan Bar Atas"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </header>
      ) : (
        /* Floating Trigger to Restore Top Bar */
        <button
          onClick={() => setIsTopBarVisible(true)}
          className="fixed top-3 right-4 z-40 bg-[#0B0F17]/90 hover:bg-[#00E599] text-slate-300 hover:text-[#090C10] border border-[#1B2433] hover:border-[#00E599] px-3 py-1.5 rounded-full text-xs font-bold transition shadow-xl flex items-center gap-1.5 backdrop-blur-md"
          title="Tampilkan Kembali Bar Atas"
        >
          <span>Menu Navigasi</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      )}

      {/* 2. MAIN IFRAME DEMO CONTAINER */}
      <main className="flex-1 relative bg-[#04060A] flex items-center justify-center overflow-auto p-0 sm:p-2">
        {!isIframeLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#07090E]/90 backdrop-blur-sm pointer-events-none">
            <div className="w-10 h-10 border-3 border-[#00E599]/20 border-t-[#00E599] rounded-full animate-spin mb-3" />
            <p className="text-xs font-bold text-white tracking-wide">Memuat Live Demo Website...</p>
            <p className="text-[11px] text-[#64748B] mt-1 font-mono">{cleanDemoUrl}</p>
          </div>
        )}

        <div
          className={`transition-all duration-300 h-full flex flex-col justify-center items-center ${
            deviceMode === "desktop"
              ? "w-full"
              : deviceMode === "tablet"
              ? "w-[768px] max-w-full h-[90vh] rounded-3xl border-4 border-[#1B2433] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden bg-[#0F141C]"
              : "w-[375px] max-w-full h-[86vh] rounded-[40px] border-8 border-[#1B2433] shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden bg-[#0F141C]"
          }`}
        >
          <iframe
            key={iframeKey}
            src={cleanDemoUrl}
            title={`Live Demo - ${templateName}`}
            onLoad={() => setIsIframeLoaded(true)}
            className="w-full h-full border-none bg-white block"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </main>

      {/* 3. NON-INTRUSIVE FLOATING POPUP ORDER WIDGET (Bottom-Left) */}
      <div className="fixed bottom-5 left-5 z-40">
        {!isWidgetMinimized ? (
          <div className="w-[320px] sm:w-[350px] bg-[#0B0F17]/95 border-2 border-[#00E599]/60 hover:border-[#00E599] rounded-3xl p-4 sm:p-5 shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(0,229,153,0.22)] backdrop-blur-xl relative animate-in slide-in-from-bottom-5 duration-300 group">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#00E599] to-transparent" />

            {/* Header & Minimize Button */}
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-[#00E599]/15 border border-[#00E599]/40 text-[#00E599] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(0,229,153,0.25)]">
                  <Sparkles className="w-3 h-3 text-[#00E599]" />
                  <span>Suka Desain Ini?</span>
                </span>
              </div>

              <button
                onClick={() => setIsWidgetMinimized(true)}
                className="w-6 h-6 rounded-full bg-[#121824] hover:bg-[#1B2433] text-slate-400 hover:text-white flex items-center justify-center transition border border-[#1B2433] cursor-pointer"
                title="Ciutkan Popup"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Title & Benefits */}
            <h3 className="text-base font-black text-white leading-tight mb-1 group-hover:text-[#00E599] transition-colors truncate">
              {templateName}
            </h3>
            <p className="text-[11px] text-[#94A3B8] mb-3.5 leading-relaxed">
              Dapatkan website persis seperti demo ini siap online dalam <b className="text-white">24 jam</b> lengkap tanpa biaya tambahan.
            </p>

            {/* Quick Micro Feature Checklist */}
            <div className="space-y-1.5 mb-4 bg-[#121824]/80 border border-[#1B2433] rounded-xl p-2.5 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599] shrink-0" />
                <span className="font-medium">Gratis Domain Resmi .com / .id</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599] shrink-0" />
                <span className="font-medium">High Speed NVMe Cloud Hosting</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599] shrink-0" />
                <span className="font-medium">Tombol Chat WhatsApp Sales Siap Pakai</span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleOrder}
                className="w-full bg-[#00E599] hover:bg-[#00C882] text-[#090C10] font-black text-xs sm:text-sm py-3 rounded-xl shadow-[0_0_20px_rgba(0,229,153,0.4)] transition flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-[#090C10]" />
                <span>Pilih Desain &amp; Order Paket →</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={openWhatsApp}
                  className="bg-[#121824] hover:bg-[#1B2433] text-slate-200 hover:text-emerald-400 border border-[#1B2433] hover:border-emerald-500/40 text-[11px] font-bold py-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Chat WA CS</span>
                </button>

                <button
                  onClick={handleOpenRawUrl}
                  className="bg-[#121824] hover:bg-[#1B2433] text-slate-300 hover:text-white border border-[#1B2433] text-[11px] font-bold py-2 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Tab Baru</span>
                  <ExternalLink className="w-3 h-3 text-[#00E599]" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Minimized State (Compact Floating Pill Badge) */
          <button
            onClick={() => setIsWidgetMinimized(false)}
            className="group flex items-center gap-2.5 bg-[#0B0F17]/95 hover:bg-[#00E599] text-white hover:text-[#090C10] border-2 border-[#00E599] px-4 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,229,153,0.35)] transition-all duration-300 cursor-pointer backdrop-blur-md animate-bounce hover:animate-none hover:scale-105"
            title="Buka Menu Order Template"
          >
            <div className="w-6 h-6 rounded-full bg-[#00E599] text-[#090C10] flex items-center justify-center font-bold text-xs group-hover:bg-[#090C10] group-hover:text-[#00E599] transition-colors">
              ⚡
            </div>
            <div className="text-left">
              <span className="block text-xs font-black leading-none">Order Desain Ini</span>
              <span className="text-[9px] opacity-75 font-mono">Klik untuk buka paket</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default function TemplatePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07090E] flex items-center justify-center text-white">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-3 border-[#00E599]/20 border-t-[#00E599] rounded-full animate-spin mb-3" />
            <span className="text-xs font-mono text-[#00E599]">Memuat Preview...</span>
          </div>
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
