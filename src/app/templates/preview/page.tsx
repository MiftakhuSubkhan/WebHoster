"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { recordTemplateView } from "@/lib/analytics";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
  const price = searchParams.get("price") || "";
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

  const handleOrderWA = () => {
    const phone = "6281391123841";
    const msg = `Halo WebHoster.co.id, saya sedang melihat Live Demo Template *${title}* (${category}) dan ingin memesan website siap pakai dengan template ini. Mohon info proses pemesanannya.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
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
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-slate-300 border border-white/5">
                    {category}
                  </span>
                  {price && (
                    <span className="text-[11px] font-bold text-[#00E599]">
                      {price}
                    </span>
                  )}
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

            {/* Primary Order CTA Button */}
            <button
              type="button"
              onClick={handleOrderWA}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#00E599] hover:bg-[#00C882] text-[#090C10] font-black text-xs transition shadow-[0_0_20px_rgba(0,229,153,0.35)] active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#090C10]" />
              <span>Order Template Ini via WhatsApp</span>
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
              onClick={handleOrderWA}
              className="text-xs font-bold text-white hover:text-[#00E599] transition flex items-center gap-1.5 pr-1"
            >
              <span className="truncate max-w-[120px]">{title}</span>
              <span className="text-[#00E599] font-black">• Order WA</span>
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
