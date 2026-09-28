"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutTemplate,
  Tag,
  Mail,
  TrendingUp,
  Plus,
  ArrowUpRight,
  MessageSquare,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Eye,
  SlidersHorizontal,
  Flame,
} from "lucide-react";
import { getTemplateViews, formatViewCount } from "@/lib/analytics";
import { getLeads, saveLeads, LeadItem } from "@/lib/leads";

const TEMPLATE_STATS = [
  {
    name: "Apex Corporate NVMe",
    category: "Company Profile",
    views: "1.420x",
    activeSites: 42,
    badge: "Terpopuler",
  },
  {
    name: "AutoElite Showroom & Garage",
    category: "Otomotif",
    views: "1.280x",
    activeSites: 38,
    badge: "Dealer Pro",
  },
  {
    name: "Kopi Senja Cafe & Resto",
    category: "F&B / Resto",
    views: "1.180x",
    activeSites: 35,
    badge: "Trending",
  },
  {
    name: "Banyumili Store & Catalog",
    category: "Toko Online",
    views: "890x",
    activeSites: 31,
    badge: "Elementor Ready",
  },
];

export default function WhPanelOverviewPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [templateList, setTemplateList] = useState<any[]>([]);
  const [templateViews, setTemplateViews] = useState<Record<string, number>>({});

  useEffect(() => {
    const syncLeads = () => {
      try {
        setLeads(getLeads());
      } catch (e) { }
    };

    syncLeads();

    try {
      const saved = localStorage.getItem("wh_templates_catalog");
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTemplateList(parsed);
        }
      }
    } catch (e) { }

    const syncViews = () => {
      try {
        setTemplateViews(getTemplateViews());
      } catch (e) { }
    };

    syncViews();

    if (typeof window !== "undefined") {
      window.addEventListener("wh:leads_updated", syncLeads);
      window.addEventListener("wh:template_viewed", syncViews);
      window.addEventListener("storage", syncLeads);
      window.addEventListener("storage", syncViews);
      return () => {
        window.removeEventListener("wh:leads_updated", syncLeads);
        window.removeEventListener("wh:template_viewed", syncViews);
        window.removeEventListener("storage", syncLeads);
        window.removeEventListener("storage", syncViews);
      };
    }
  }, []);

  const totalTemplatesCount = templateList.length;
  const newLeadsCount = leads.filter((l) => l.status === "Baru").length;

  const handleUpdateLeadStatus = (leadId: string) => {
    const statusCycle: Record<LeadItem["status"], LeadItem["status"]> = {
      Baru: "Follow Up",
      "Follow Up": "Deal",
      Deal: "Baru",
    };
    const updated = leads.map((l) =>
      l.id === leadId ? { ...l, status: statusCycle[l.status] } : l
    );
    setLeads(updated);
    saveLeads(updated);
  };

  const openWhatsAppLead = (phone: string, clientName: string, pkg: string) => {
    const text = encodeURIComponent(
      `Halo Bapak/Ibu ${clientName}, terima kasih telah menghubungi WebHoster.co.id untuk ${pkg}. Apakah ada yang bisa kami bantu jelaskan lebih lanjut?`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const getStatusBadge = (lead: LeadItem) => {
    switch (lead.status) {
      case "Baru":
        return (
          <button
            onClick={() => handleUpdateLeadStatus(lead.id)}
            title="Klik untuk ubah status ke 'Follow Up'"
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/25 transition cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Baru
          </button>
        );
      case "Follow Up":
        return (
          <button
            onClick={() => handleUpdateLeadStatus(lead.id)}
            title="Klik untuk ubah status ke 'Deal'"
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/25 transition cursor-pointer"
          >
            <Clock className="w-3 h-3" />
            Follow Up
          </button>
        );
      case "Deal":
        return (
          <button
            onClick={() => handleUpdateLeadStatus(lead.id)}
            title="Klik untuk ubah status ke 'Baru'"
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00E599]/20 border border-[#00E599]/40 text-[#00E599] text-xs font-bold hover:bg-[#00E599]/30 transition cursor-pointer"
          >
            <CheckCircle2 className="w-3 h-3" />
            Deal
          </button>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[#00E599] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WebHoster Administration Hub</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Halo, Administrator 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Pantau pertumbuhan katalog website, aktivitas calon klien baru, dan performa paket hosting.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/wh-panel/templates"
            className="bg-[#00E599] text-[#090C10] font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Tambah Template Baru</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-5 hover:border-[#00E599]/40 transition relative group overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
              Template WordPress
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/20 flex items-center justify-center">
              <LayoutTemplate className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mb-1">
            {totalTemplatesCount} Desain
          </div>
          <div className="text-xs text-[#00E599] font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Katalog Aktif Siap Pakai</span>
          </div>
        </div>

        <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-5 hover:border-[#00E599]/40 transition relative group overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
              Paket Harga Aktif
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/20 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mb-1">
            3 Tingkatan
          </div>
          <div className="text-xs text-[#94A3B8] font-medium">
            Basic, Pro &amp; Premium
          </div>
        </div>

        <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-5 hover:border-[#00E599]/40 transition relative group overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
              Leads Masuk
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/20 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mb-1">
            {leads.length} Klien
          </div>
          <div className="text-xs text-[#00E599] font-medium flex items-center gap-1">
            {newLeadsCount > 0 ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
                <span>{newLeadsCount} pesan baru perlu respons</span>
              </>
            ) : leads.length > 0 ? (
              <span>Semua pesan telah direspons</span>
            ) : (
              <span className="text-[#64748B]">Belum ada pesan masuk</span>
            )}
          </div>
        </div>

        <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-5 hover:border-[#00E599]/40 transition relative group overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
              Estimasi Prospek
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mb-1">
            {leads.length === 0
              ? "Rp 0"
              : `Rp ${(leads.length * 1.4).toLocaleString("id-ID", { maximumFractionDigits: 1 })} Jt`}
          </div>
          <div className="text-xs text-[#00E599] font-medium flex items-center gap-1">
            <span>Pipeline aktif per kuartal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-[#0F141C] border border-[#1B2433] rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Leads &amp; Calon Klien Terbaru</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#00E599]/15 text-[#00E599] text-[11px] font-bold border border-[#00E599]/30">
                    Live CRM
                  </span>
                </h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Daftar konsultasi website siap ditindaklanjuti via WhatsApp.
                </p>
              </div>

              <Link
                href="/wh-panel/leads"
                className="text-xs font-semibold text-[#00E599] hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Lihat Semua Leads</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto -mx-5 sm:mx-0">
              <table className="w-full text-left text-xs min-w-[540px]">
                <thead>
                  <tr className="border-b border-[#1B2433] text-[#64748B] uppercase font-bold text-[10px] tracking-wider">
                    <th className="pb-3 px-3">Nama Klien</th>
                    <th className="pb-3 px-3">Paket Dipilih</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3">Waktu</th>
                    <th className="pb-3 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1B2433]/60">
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-slate-500">
                        <Mail className="w-7 h-7 mx-auto opacity-30 mb-2" />
                        <p className="text-xs">Belum ada pesan / lead masuk dari formulir kontak.</p>
                      </td>
                    </tr>
                  ) : (
                    leads.slice(0, 5).map((lead) => (
                      <tr
                        key={lead.id}
                        className="hover:bg-[#090C10]/60 transition duration-150 group"
                      >
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-white group-hover:text-[#00E599] transition">
                            {lead.name}
                          </div>
                          <div className="text-[11px] text-[#94A3B8] font-mono mt-0.5">
                            +{lead.phone}
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="text-[#F1F5F9] font-medium">
                            {lead.packageChosen}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          {getStatusBadge(lead)}
                        </td>

                        <td className="py-3.5 px-3 text-[#94A3B8] font-mono text-[11px]">
                          {lead.date}
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() =>
                              openWhatsAppLead(
                                lead.phone,
                                lead.name,
                                lead.packageChosen
                              )
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00E599]/10 hover:bg-[#00E599] text-[#00E599] hover:text-[#090C10] font-bold text-xs border border-[#00E599]/30 hover:border-[#00E599] transition shadow-[0_0_10px_rgba(0,229,153,0.1)] cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Chat WA</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-[#0F141C] border border-[#1B2433] rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#00E599]" />
                  <span>Katalog Populer</span>
                </h2>
                <p className="text-xs text-[#94A3B8]">Template paling sering dilihat</p>
              </div>

              <Link
                href="/wh-panel/templates"
                className="text-xs text-[#00E599] font-semibold hover:underline"
              >
                Kelola
              </Link>
            </div>

            <div className="space-y-3.5 mt-4">
              {(templateList.length > 0
                ? [...templateList].sort((a, b) => (templateViews[b.id] || 0) - (templateViews[a.id] || 0)).slice(0, 4)
                : TEMPLATE_STATS
              ).map((tpl, i) => {
                const count = templateViews[tpl.id] || 0;
                return (
                  <div
                    key={tpl.id || i}
                    className="bg-[#090C10] border border-[#1B2433] rounded-2xl p-3.5 hover:border-[#00E599]/30 transition group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#00E599] transition">
                          {tpl.name}
                        </div>
                        <span className="text-[10px] text-[#94A3B8] font-medium">
                          {tpl.category}
                        </span>
                      </div>

                      <span className="px-2 py-0.5 rounded-md bg-[#1B2433] text-[10px] font-semibold text-[#00E599] shrink-0">
                        {tpl.badge || "Populer"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#1B2433]/70 text-[11px] text-[#94A3B8]">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Eye className="w-3.5 h-3.5 text-[#00E599]" />
                        <span className="text-white font-bold">{formatViewCount(count)}</span>
                        <span className="text-[#64748B] text-[10px]">dilihat</span>
                      </div>
                      <span className="text-[10px] text-[#00E599] font-medium bg-[#00E599]/10 px-2 py-0.5 rounded-full border border-[#00E599]/20">
                        Siap Pakai
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1B2433]">
            <Link
              href="/wh-panel/pricing"
              className="w-full bg-[#121824] hover:bg-[#1B2433] text-white hover:text-[#00E599] border border-[#1B2433] hover:border-[#00E599]/40 font-bold text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 group"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#00E599]" />
              <span>Kelola Paket &amp; Konfigurasi Harga</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
