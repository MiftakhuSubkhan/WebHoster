"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { recordTemplateView } from "@/lib/analytics";



function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronUpIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function LivePreviewInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawUrl = searchParams.get("url") || "";
  const title = searchParams.get("title") || "Template WordPress";
  const category = searchParams.get("category") || "Template";
  const templateId = searchParams.get("id") || "";

  const [isLoading, setIsLoading] = useState(true);
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

  // Fallback if URL is missing
  if (!targetUrl) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-[#090C10] flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-14 h-14 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599] mb-4">
          <ExternalLinkIcon className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold mb-2">URL Demo Tidak Ditemukan</h2>
        <p className="text-sm text-[#94A3B8] max-w-md mb-6">
          Link demo untuk template ini belum diisi atau tidak valid. Silakan kembali ke katalog untuk memilih template lainnya.
        </p>
        <button
          onClick={() => router.push("/templates")}
          className="px-6 py-2.5 rounded-xl bg-[#00E599] text-[#090C10] font-bold text-sm hover:bg-[#00C882] transition"
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

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#090C10] overflow-hidden">
      {/* Loading state overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#090C10] flex flex-col items-center justify-center z-20 transition-opacity duration-300">
          <div className="relative mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00E599] to-[#00A3FF] p-[2px] animate-spin">
              <div className="w-full h-full bg-[#090C10] rounded-2xl flex items-center justify-center">
                <span className="text-[#00E599] font-black text-xl">W</span>
              </div>
            </div>
          </div>
          <p className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
            <span>Memuat Live Demo {title}...</span>
          </p>
          <p className="text-xs text-[#94A3B8] mt-1">
            Menyiapkan template langsung dari server demo
          </p>
        </div>
      )}

      {/* 100% Fullscreen Iframe (No top bar eating screen height) */}
      <iframe
        src={targetUrl}
        title={`Live Demo ${title}`}
        className="w-full h-full border-0 block bg-white"
        onLoad={() => setIsLoading(false)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
      />

      {/* Floating Pop-up / Order Widget di Pojok Kiri Bawah */}
      <div className="fixed bottom-5 left-5 z-50 transition-all duration-300 max-w-[calc(100vw-2.5rem)] sm:max-w-sm">
        {!isCollapsed ? (
          <div className="bg-[#0D1117]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(0,229,153,0.15)] text-white animate-in fade-in slide-in-from-bottom-3 duration-300">
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
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition shrink-0"
              >
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Value proposition */}
            <p className="text-[11px] text-[#94A3B8] leading-relaxed my-3">
              Cocok untuk bisnis Anda? Siap pakai termasuk <strong className="text-white">Gratis Domain</strong> + <strong className="text-white">Cloud Hosting NVMe</strong> &amp; panduan edit.
            </p>

            {/* Primary Action Button: Pilih Paket Website */}
            <button
              type="button"
              onClick={handleSelectPackage}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#00E599] hover:bg-[#00C882] text-[#090C10] font-black text-xs transition shadow-[0_0_20px_rgba(0,229,153,0.35)] active:scale-[0.98]"
            >
              <span>Pilih Paket Harga Website</span>
              <ArrowRightIcon className="w-4 h-4 text-[#090C10]" />
            </button>

            {/* Secondary actions */}
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-medium transition"
              >
                <ArrowLeftIcon className="w-3.5 h-3.5" />
                <span>Katalog</span>
              </button>

              <button
                type="button"
                onClick={handleOpenDirect}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-medium transition"
              >
                <span>Buka Tab Baru</span>
                <ExternalLinkIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Minimized floating pill */
          <div className="flex items-center gap-2 bg-[#0D1117]/95 backdrop-blur-2xl border border-white/15 rounded-full pl-3.5 pr-2 py-2 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_15px_rgba(0,229,153,0.2)] text-white animate-in fade-in duration-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E599]"></span>
            </span>
            <button
              type="button"
              onClick={handleSelectPackage}
              className="text-xs font-bold text-white hover:text-[#00E599] transition flex items-center gap-1.5 pr-1"
            >
              <span className="truncate max-w-[120px]">{title}</span>
              <span className="text-[#00E599] font-black">• Pilih Paket →</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              title="Perbesar Pop-up"
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
            >
              <ChevronUpIcon className="w-3.5 h-3.5" />
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
