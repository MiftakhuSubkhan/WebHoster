"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { recordTemplateView } from "@/lib/analytics";
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Sparkles,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type DeviceMode = "desktop" | "tablet" | "mobile";

function LivePreviewInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawUrl = searchParams.get("url") || "";
  const title = searchParams.get("title") || "Template WordPress";
  const category = searchParams.get("category") || "Template";
  const templateId = searchParams.get("id") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [iframeKey, setIframeKey] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Normalize final url
  let targetUrl = rawUrl.trim();
  if (targetUrl && !targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = `https://${targetUrl}`;
  }

  useEffect(() => {
    if (templateId) {
      recordTemplateView(templateId);
    }
  }, [templateId]);

  // Safety fallback for loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [iframeKey]);

  // Fallback if URL is missing
  if (!targetUrl) {
    return (
      <div className="fixed inset-0 w-full h-[100dvh] bg-[#090C10] flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-14 h-14 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599] mb-4">
          <ExternalLink className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold mb-2">URL Demo Tidak Ditemukan</h2>
        <p className="text-sm text-[#94A3B8] max-w-md mb-6">
          Link demo untuk template ini belum diisi atau tidak valid. Silakan kembali ke katalog untuk memilih template lainnya.
        </p>
        <button
          onClick={() => router.push("/templates")}
          className="px-6 py-2.5 rounded-xl bg-[#00E599] text-[#090C10] font-bold text-sm hover:bg-[#00C882] transition cursor-pointer"
        >
          Kembali ke Katalog Template
        </button>
      </div>
    );
  }

  const handleSelectPackage = () => {
    const encoded = encodeURIComponent(title);
    router.push(`/harga?template=${encoded}#paket-harga`);
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/templates");
    }
  };

  const handleOpenDirect = () => {
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-[#090C10] flex flex-col overflow-hidden select-none">
      {/* Top Header / Device Switcher Bar */}
      <header className="h-14 bg-[#0D1117] border-b border-white/10 px-3 sm:px-5 flex items-center justify-between z-30 shrink-0">
        {/* Left: Back & Template Info */}
        <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition border border-white/5 cursor-pointer shrink-0"
            title="Kembali ke Katalog"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Katalog</span>
          </button>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E599]"></span>
            </span>
            <div className="flex flex-col min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-[140px] sm:max-w-[220px]">
                {title}
              </h1>
              <span className="text-[10px] text-[#00E599] font-medium hidden sm:inline">
                {category} • Live Demo
              </span>
            </div>
          </div>
        </div>

        {/* Center: Device Switcher (Desktop / Tablet / Mobile) */}
        <div className="hidden md:flex items-center bg-[#161B22] p-1 rounded-xl border border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => setDeviceMode("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.2 rounded-lg text-xs font-medium transition cursor-pointer ${
              deviceMode === "desktop"
                ? "bg-[#00E599] text-[#090C10] font-bold shadow-[0_0_12px_rgba(0,229,153,0.3)]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
            title="Tampilan Desktop (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode("tablet")}
            className={`flex items-center gap-1.5 px-3 py-1.2 rounded-lg text-xs font-medium transition cursor-pointer ${
              deviceMode === "tablet"
                ? "bg-[#00E599] text-[#090C10] font-bold shadow-[0_0_12px_rgba(0,229,153,0.3)]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
            title="Tampilan Tablet (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.2 rounded-lg text-xs font-medium transition cursor-pointer ${
              deviceMode === "mobile"
                ? "bg-[#00E599] text-[#090C10] font-bold shadow-[0_0_12px_rgba(0,229,153,0.3)]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
            title="Tampilan Mobile HP (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleReload}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition border border-white/5 cursor-pointer"
            title="Muat Ulang Demo"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#00E599]" : ""}`} />
          </button>

          <button
            type="button"
            onClick={handleOpenDirect}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition border border-white/5 cursor-pointer"
            title="Buka Langsung di Tab Baru"
          >
            <span>Buka Tab Baru</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleSelectPackage}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00E599] hover:bg-[#00C882] text-[#090C10] text-xs font-black transition shadow-[0_0_20px_rgba(0,229,153,0.35)] active:scale-[0.98] cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Order Template</span>
          </button>
        </div>
      </header>

      {/* Main Preview Area */}
      <main className="flex-1 w-full bg-[#05070A] relative flex items-center justify-center overflow-hidden p-0 sm:p-4">
        {/* Loading Spinner Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#090C10]/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 transition-opacity duration-300 pointer-events-none">
            <div className="relative mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00E599] to-[#00A3FF] p-[2px] animate-spin">
                <div className="w-full h-full bg-[#090C10] rounded-2xl flex items-center justify-center">
                  <span className="text-[#00E599] font-black text-lg">W</span>
                </div>
              </div>
            </div>
            <p className="text-xs font-bold text-white tracking-wide flex items-center gap-2">
              <span>Memuat Live Preview {title}...</span>
            </p>
          </div>
        )}

        {/* Device Frame Viewport Container */}
        <div
          className={`transition-all duration-300 flex items-center justify-center ${
            deviceMode === "desktop"
              ? "w-full h-full"
              : deviceMode === "tablet"
              ? "w-full max-w-[768px] h-full max-h-[88vh] bg-[#121824] rounded-[28px] p-2.5 border-4 border-[#1E293B] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,229,153,0.1)] flex flex-col"
              : "w-full max-w-[390px] h-full max-h-[88vh] bg-[#121824] rounded-[44px] p-2.5 border-4 border-[#1E293B] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,229,153,0.15)] flex flex-col"
          }`}
        >
          {/* Phone / Tablet Top Notch & Speaker */}
          {deviceMode === "mobile" && (
            <div className="w-28 h-4 bg-[#090C10] rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center gap-2 shadow-inner">
              <div className="w-2 h-2 rounded-full bg-[#1E293B]" />
              <div className="w-8 h-1 rounded-full bg-[#1E293B]" />
            </div>
          )}

          {deviceMode === "tablet" && (
            <div className="w-2.5 h-2.5 rounded-full bg-[#1E293B] mx-auto mb-2 shrink-0" />
          )}

          {/* Clean Native Iframe (No sandbox blocker, smooth click & scroll) */}
          <iframe
            key={iframeKey}
            src={targetUrl}
            title={`Live Demo ${title}`}
            className={`w-full h-full bg-white border-0 block ${
              deviceMode === "desktop"
                ? "rounded-none"
                : deviceMode === "tablet"
                ? "rounded-[20px]"
                : "rounded-[34px]"
            }`}
            onLoad={() => setIsLoading(false)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          />
        </div>
      </main>

      {/* Floating Pop-up / Order Widget di Pojok Kiri Bawah */}
      <div className="fixed bottom-5 left-5 z-50 transition-all duration-300 max-w-[calc(100vw-2.5rem)] sm:max-w-sm pointer-events-none">
        {!isCollapsed ? (
          <div className="pointer-events-auto bg-[#0D1117]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(0,229,153,0.2)] text-white animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Header info */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E599]"></span>
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00E599]">
                    Live Demo Preview
                  </span>
                </div>
                <h3 className="text-base font-bold text-white truncate">
                  {title}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-slate-300 border border-white/5 font-medium">
                    {category}
                  </span>
                </div>
              </div>

              {/* Minimize button */}
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                title="Ciutkan Pop-up"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition shrink-0 cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Value proposition */}
            <p className="text-[11px] text-[#94A3B8] leading-relaxed my-3">
              Cocok untuk bisnis Anda? Siap pakai termasuk <strong className="text-white">Gratis Domain</strong> + <strong className="text-white">Cloud Hosting NVMe</strong> &amp; panduan edit.
            </p>

            {/* Primary Action Button: Order Sekarang */}
            <button
              type="button"
              onClick={handleSelectPackage}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#00E599] hover:bg-[#00C882] text-[#090C10] font-black text-xs transition shadow-[0_0_20px_rgba(0,229,153,0.35)] active:scale-[0.98] cursor-pointer"
            >
              <span>Order Sekarang</span>
              <ArrowRight className="w-4 h-4 text-[#090C10]" />
            </button>

            {/* Secondary actions */}
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-medium transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Katalog</span>
              </button>

              <button
                type="button"
                onClick={handleOpenDirect}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-medium transition cursor-pointer"
              >
                <span>Buka Tab Baru</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Minimized floating pill */
          <div className="pointer-events-auto flex items-center gap-2 bg-[#0D1117]/95 backdrop-blur-2xl border border-white/15 rounded-full pl-3.5 pr-2 py-2 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_15px_rgba(0,229,153,0.2)] text-white animate-in fade-in duration-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E599]"></span>
            </span>
            <button
              type="button"
              onClick={handleSelectPackage}
              className="text-xs font-bold text-white hover:text-[#00E599] transition flex items-center gap-1.5 pr-1 cursor-pointer"
            >
              <span className="truncate max-w-[120px]">{title}</span>
              <span className="text-[#00E599] font-black">• Order Sekarang →</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              title="Perbesar Pop-up"
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TemplatePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 w-screen h-screen bg-[#090C10] flex items-center justify-center text-white">
          <div className="w-10 h-10 border-2 border-[#00E599] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LivePreviewInner />
    </Suspense>
  );
}
