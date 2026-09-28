"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Eye,
  X,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Copy,
  Building2,
  DollarSign,
  FileText,
  Phone,
  User,
  Check,
  AlertTriangle,
  Send,
  Calendar,
} from "lucide-react";

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  packageChosen: string;
  status: "Baru" | "Follow Up" | "Deal";
  date: string;
  business?: string;
  budget?: string;
  notes?: string;
  timestamp?: string;
}

const DEFAULT_LEADS: LeadItem[] = [
  {
    id: "lead-1",
    name: "Hendra Wijaya",
    phone: "6281298765432",
    packageChosen: "Website Company Profile (PT / CV / Korporat)",
    status: "Baru",
    date: "10 menit lalu",
    business: "PT Wijaya Konstruksi Nusantara",
    budget: "Rp 1.300.000 (Paket Pro - Paling Direkomendasikan)",
    notes: "Halo, kami butuh website resmi untuk profil tender perusahaan konstruksi, butuh integrasi company profile PDF download dan email bisnis.",
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
  },
  {
    id: "lead-2",
    name: "dr. Siska Rahmawati",
    phone: "6281355443322",
    packageChosen: "Website Klinik / Layanan Medis",
    status: "Follow Up",
    date: "1 jam lalu",
    business: "Klinik Pratama Sehat Bersama",
    budget: "Rp 1.300.000 (Paket Pro)",
    notes: "Ingin landing page klinik dengan fitur jadwal praktek dokter, lokasi maps, dan tombol appointment WhatsApp.",
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
  },
  {
    id: "lead-3",
    name: "Budi Santoso",
    phone: "6285712345678",
    packageChosen: "Toko Online & E-Commerce",
    status: "Deal",
    date: "3 jam lalu",
    business: "Sentosa Fashion Apparel",
    budget: "Rp 1.700.000 (Paket Premium)",
    notes: "Sudah transfer tagihan WHMCS paket Premium, mohon bantu setup domain sentosafashion.co.id dan katalog produk awal.",
    timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
  },
  {
    id: "lead-4",
    name: "Rina Kusuma",
    phone: "6281987654321",
    packageChosen: "Website Resto / Kafe & Menu QR",
    status: "Baru",
    date: "5 jam lalu",
    business: "Kopi Senja Terrace",
    budget: "Rp 900.000 (Paket Basic)",
    notes: "Perlu website resto untuk menu makanan minuman dan reservasi tempat via WhatsApp.",
    timestamp: new Date(Date.now() - 300 * 60000).toISOString(),
  },
  {
    id: "lead-5",
    name: "PT Nusantara Prima",
    phone: "6281122334455",
    packageChosen: "Jasa Pembuatan Website Kustom",
    status: "Follow Up",
    date: "1 hari lalu",
    business: "PT Nusantara Prima Solusindo",
    budget: "Rp 2.500.000 (Custom Enterprise)",
    notes: "Sedang menunggu approval proposal teknis dan invoice penawaran dari tim keuangan.",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function LeadsManagementPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Semua" | "Baru" | "Follow Up" | "Deal">("Semua");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [selectedDetailLead, setSelectedDetailLead] = useState<LeadItem | null>(null);
  const [deletingLead, setDeletingLead] = useState<LeadItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add Form Inputs
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formBusiness, setFormBusiness] = useState("");
  const [formPackage, setFormPackage] = useState("Website Company Profile (PT / CV / Korporat)");
  const [formBudget, setFormBudget] = useState("Rp 1.300.000 (Paket Pro)");
  const [formStatus, setFormStatus] = useState<"Baru" | "Follow Up" | "Deal">("Baru");
  const [formNotes, setFormNotes] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load from localStorage & sync events
  useEffect(() => {
    const loadLeads = () => {
      try {
        const saved = localStorage.getItem("wh_admin_leads");
        if (saved !== null) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setLeads(parsed);
          } else {
            setLeads(DEFAULT_LEADS);
            localStorage.setItem("wh_admin_leads", JSON.stringify(DEFAULT_LEADS));
          }
        } else {
          setLeads(DEFAULT_LEADS);
          localStorage.setItem("wh_admin_leads", JSON.stringify(DEFAULT_LEADS));
        }
      } catch (e) {
        setLeads(DEFAULT_LEADS);
      }
      setIsLoaded(true);
    };

    loadLeads();

    if (typeof window !== "undefined") {
      window.addEventListener("wh:leads_updated", loadLeads);
      window.addEventListener("storage", loadLeads);
      return () => {
        window.removeEventListener("wh:leads_updated", loadLeads);
        window.removeEventListener("storage", loadLeads);
      };
    }
  }, []);

  const saveLeads = (newLeads: LeadItem[]) => {
    setLeads(newLeads);
    try {
      localStorage.setItem("wh_admin_leads", JSON.stringify(newLeads));
      window.dispatchEvent(
        new CustomEvent("wh:leads_updated", { detail: newLeads })
      );
    } catch (e) {
      console.error("Failed to save leads:", e);
    }
  };

  // Status cycling: Baru -> Follow Up -> Deal -> Baru
  const handleCycleStatus = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const cycleMap: Record<LeadItem["status"], LeadItem["status"]> = {
      Baru: "Follow Up",
      "Follow Up": "Deal",
      Deal: "Baru",
    };

    const updated = leads.map((l) =>
      l.id === id ? { ...l, status: cycleMap[l.status] } : l
    );
    saveLeads(updated);

    // Also update selectedDetailLead if opened
    if (selectedDetailLead && selectedDetailLead.id === id) {
      setSelectedDetailLead({
        ...selectedDetailLead,
        status: cycleMap[selectedDetailLead.status],
      });
    }

    showToast("Status lead berhasil diperbarui!");
  };

  // Set explicit status
  const handleSetStatus = (id: string, newStatus: LeadItem["status"]) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    saveLeads(updated);
    if (selectedDetailLead && selectedDetailLead.id === id) {
      setSelectedDetailLead({ ...selectedDetailLead, status: newStatus });
    }
    showToast(`Status diubah menjadi "${newStatus}"!`);
  };

  // Open WhatsApp
  const openWhatsApp = (phone: string, clientName: string, pkg: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Halo Bapak/Ibu ${clientName}, terima kasih telah menghubungi WebHoster.co.id mengenai ${pkg}. Apakah ada yang bisa kami bantu jelaskan lebih lanjut?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  // Add Manual Lead
  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert("Nama calon klien wajib diisi!");
      return;
    }

    let cleanPhone = formPhone.replace(/[^0-9]/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "62" + cleanPhone.slice(1);
    } else if (!cleanPhone.startsWith("62") && cleanPhone.length > 0) {
      cleanPhone = "62" + cleanPhone;
    }

    const newLead: LeadItem = {
      id: "lead-" + Date.now(),
      name: formName.trim(),
      phone: cleanPhone || "6281200000000",
      packageChosen: formPackage.trim() || "Website Company Profile",
      status: formStatus,
      date: "Baru saja",
      business: formBusiness.trim() || "-",
      budget: formBudget.trim() || "-",
      notes: formNotes.trim() || "Lead ditambahkan manual melalui admin dashboard.",
      timestamp: new Date().toISOString(),
    };

    const updated = [newLead, ...leads];
    saveLeads(updated);
    showToast(`Lead "${formName}" berhasil ditambahkan!`);
    setIsAddModalOpen(false);

    // Reset Form
    setFormName("");
    setFormPhone("");
    setFormBusiness("");
    setFormNotes("");
  };

  // Delete Lead
  const handleConfirmDelete = () => {
    if (!deletingLead) return;
    const updated = leads.filter((l) => l.id !== deletingLead.id);
    saveLeads(updated);
    showToast(`Lead "${deletingLead.name}" berhasil dihapus.`);
    setDeletingLead(null);
    if (selectedDetailLead?.id === deletingLead.id) {
      setSelectedDetailLead(null);
    }
  };

  // Reset Default
  const handleResetDefault = () => {
    if (confirm("Kembalikan database leads ke contoh data bawaan WebHoster?")) {
      saveLeads(DEFAULT_LEADS);
      showToast("Data leads dikembalikan ke setelan awal.");
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.phone && l.phone.includes(searchTerm)) ||
      (l.packageChosen && l.packageChosen.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.business && l.business.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.notes && l.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchStatus =
      statusFilter === "Semua" ? true : l.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // Counts
  const totalCount = leads.length;
  const baruCount = leads.filter((l) => l.status === "Baru").length;
  const followUpCount = leads.filter((l) => l.status === "Follow Up").length;
  const dealCount = leads.filter((l) => l.status === "Deal").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#0F141C] border border-[#00E599] text-[#00E599] font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(0,229,153,0.3)] flex items-center gap-2.5 animate-in slide-in-from-top-3">
          <Sparkles className="w-4 h-4 text-[#00E599]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>Kelola Leads &amp; Pesan Kontak</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#00E599]/15 text-[#00E599] text-xs font-bold border border-[#00E599]/30">
              {totalCount} Total
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Database pesan masuk, formulir konsultasi, dan calon klien dari halaman publik{" "}
            <Link href="/kontak" target="_blank" className="text-[#00E599] hover:underline font-semibold inline-flex items-center gap-1">
              <span>/kontak</span>
              <ExternalLink className="w-3 h-3" />
            </Link>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleResetDefault}
            title="Reset ke data bawaan"
            className="bg-[#121824] hover:bg-[#1B2433] text-[#94A3B8] hover:text-white border border-[#1B2433] text-xs font-bold py-2.5 px-3.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Default</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#00E599] text-[#090C10] font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Tambah Lead Manual</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setStatusFilter("Semua")}
          className={`bg-[#0F141C] border rounded-2xl p-4 sm:p-5 transition cursor-pointer ${
            statusFilter === "Semua"
              ? "border-[#00E599] shadow-[0_0_20px_rgba(0,229,153,0.15)] bg-[#121824]"
              : "border-[#1B2433] hover:border-[#00E599]/50"
          }`}
        >
          <div className="flex items-center justify-between text-[#94A3B8] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Leads</span>
            <Mail className="w-4 h-4 text-[#00E599]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">{totalCount}</div>
          <div className="text-[10px] text-[#64748B] mt-1">Semua interaksi masuk</div>
        </div>

        <div
          onClick={() => setStatusFilter("Baru")}
          className={`bg-[#0F141C] border rounded-2xl p-4 sm:p-5 transition cursor-pointer ${
            statusFilter === "Baru"
              ? "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] bg-[#121824]"
              : "border-[#1B2433] hover:border-emerald-500/50"
          }`}
        >
          <div className="flex items-center justify-between text-[#94A3B8] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Leads Baru</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{baruCount}</div>
          <div className="text-[10px] text-[#64748B] mt-1">Perlu segera direspons</div>
        </div>

        <div
          onClick={() => setStatusFilter("Follow Up")}
          className={`bg-[#0F141C] border rounded-2xl p-4 sm:p-5 transition cursor-pointer ${
            statusFilter === "Follow Up"
              ? "border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] bg-[#121824]"
              : "border-[#1B2433] hover:border-amber-500/50"
          }`}
        >
          <div className="flex items-center justify-between text-[#94A3B8] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Follow Up</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{followUpCount}</div>
          <div className="text-[10px] text-[#64748B] mt-1">Proses negosiasi / konsultasi</div>
        </div>

        <div
          onClick={() => setStatusFilter("Deal")}
          className={`bg-[#0F141C] border rounded-2xl p-4 sm:p-5 transition cursor-pointer ${
            statusFilter === "Deal"
              ? "border-[#00E599] shadow-[0_0_20px_rgba(0,229,153,0.25)] bg-[#121824]"
              : "border-[#1B2433] hover:border-[#00E599]/50"
          }`}
        >
          <div className="flex items-center justify-between text-[#94A3B8] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00E599]">Deal / Sukses</span>
            <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#00E599] font-mono">{dealCount}</div>
          <div className="text-[10px] text-[#64748B] mt-1">Klien telah order &amp; aktif</div>
        </div>
      </div>

      {/* 3. Search & Category Tabs */}
      <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama klien, WhatsApp, bisnis, paket, catatan..."
            className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#64748B] focus:outline-none transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(["Semua", "Baru", "Follow Up", "Deal"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                statusFilter === tab
                  ? "bg-[#00E599] text-[#090C10] shadow-[0_0_12px_rgba(0,229,153,0.3)]"
                  : "bg-[#121824] text-[#94A3B8] hover:text-white border border-[#1B2433]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Leads Table */}
      <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-[#1B2433] bg-[#090C10]/60 text-[#64748B] uppercase font-mono font-bold text-[10px]">
                <th className="py-3.5 px-4">Calon Klien &amp; Bisnis</th>
                <th className="py-3.5 px-4">WhatsApp</th>
                <th className="py-3.5 px-4">Paket / Kebutuhan</th>
                <th className="py-3.5 px-4">Waktu</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B2433]/60">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Mail className="w-8 h-8 mx-auto opacity-30 mb-2" />
                    <p className="text-xs">Tidak ada data leads yang sesuai dengan pencarian/filter.</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedDetailLead(lead)}
                    className="hover:bg-[#121824]/80 transition group cursor-pointer"
                  >
                    {/* Name & Business */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white group-hover:text-[#00E599] transition-colors flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#64748B]" />
                        <span>{lead.name}</span>
                      </div>
                      {lead.business && lead.business !== "-" && (
                        <div className="text-[11px] text-[#94A3B8] flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-[#64748B]" />
                          <span className="truncate max-w-[220px]">{lead.business}</span>
                        </div>
                      )}
                    </td>

                    {/* WhatsApp */}
                    <td className="py-3.5 px-4 font-mono">
                      <span className="text-slate-300 font-medium">+{lead.phone}</span>
                    </td>

                    {/* Package / Service */}
                    <td className="py-3.5 px-4">
                      <div className="text-white font-medium truncate max-w-[220px]">
                        {lead.packageChosen}
                      </div>
                      {lead.budget && lead.budget !== "-" && (
                        <div className="text-[10px] text-[#00E599] font-mono mt-0.5">
                          {lead.budget}
                        </div>
                      )}
                    </td>

                    {/* Time */}
                    <td className="py-3.5 px-4 text-[11px] text-[#64748B] whitespace-nowrap">
                      {lead.date || "Baru saja"}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={(e) => handleCycleStatus(lead.id, e)}
                        title="Klik untuk ubah status"
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                          lead.status === "Baru"
                            ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25"
                            : lead.status === "Follow Up"
                            ? "bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500/25"
                            : "bg-[#00E599]/20 border border-[#00E599]/40 text-[#00E599] hover:bg-[#00E599]/30"
                        }`}
                      >
                        {lead.status === "Baru" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                        {lead.status === "Follow Up" && <Clock className="w-3 h-3" />}
                        {lead.status === "Deal" && <CheckCircle2 className="w-3 h-3" />}
                        <span>{lead.status}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => openWhatsApp(lead.phone, lead.name, lead.packageChosen, e)}
                          title="Hubungi via WhatsApp"
                          className="px-2.5 py-1.5 rounded-lg bg-[#00E599]/10 hover:bg-[#00E599] text-[#00E599] hover:text-[#090C10] font-bold text-xs transition flex items-center gap-1 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Follow Up WA</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDetailLead(lead);
                          }}
                          title="Lihat Detail Pesan"
                          className="p-1.5 rounded-lg bg-[#121824] hover:bg-[#1B2433] text-[#94A3B8] hover:text-white border border-[#1B2433] transition cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingLead(lead);
                          }}
                          title="Hapus Lead"
                          className="p-1.5 rounded-lg bg-[#121824] hover:bg-red-500/20 text-[#64748B] hover:text-red-400 border border-[#1B2433] hover:border-red-500/40 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODAL DETAIL LEAD */}
      {selectedDetailLead && (
        <div className="fixed inset-0 z-50 bg-[#090C10]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#0F141C] border border-[#00E599]/50 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-[0_0_60px_rgba(0,229,153,0.25)] animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedDetailLead(null)}
              className="absolute top-5 right-5 text-[#94A3B8] hover:text-white bg-[#090C10] border border-[#1B2433] rounded-full p-2 transition cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#00E599]/15 border border-[#00E599]/30 flex items-center justify-center text-[#00E599]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <span>{selectedDetailLead.name}</span>
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  Masuk pada: <span className="text-white font-mono">{selectedDetailLead.date || "Baru saja"}</span>
                </p>
              </div>
            </div>

            {/* Status Switcher in Modal */}
            <div className="bg-[#121824] border border-[#1B2433] rounded-2xl p-3.5 mb-5 flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-white">Status Interaksi:</span>
              <div className="flex items-center gap-1.5">
                {(["Baru", "Follow Up", "Deal"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleSetStatus(selectedDetailLead.id, st)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                      selectedDetailLead.status === st
                        ? st === "Baru"
                          ? "bg-emerald-500 text-[#090C10]"
                          : st === "Follow Up"
                          ? "bg-amber-500 text-[#090C10]"
                          : "bg-[#00E599] text-[#090C10]"
                        : "bg-[#090C10] text-[#94A3B8] border border-[#1B2433] hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Lead Details Grid */}
            <div className="space-y-3.5 mb-6 text-xs">
              <div className="bg-[#090C10] border border-[#1B2433] rounded-xl p-3.5">
                <span className="text-[10px] font-mono text-[#64748B] uppercase block mb-1">
                  Nomor WhatsApp Calon Klien:
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-bold text-[#00E599]">
                    +{selectedDetailLead.phone}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedDetailLead.phone);
                      showToast("Nomor WhatsApp disalin!");
                    }}
                    className="text-[#94A3B8] hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Salin</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#090C10] border border-[#1B2433] rounded-xl p-3">
                  <span className="text-[10px] font-mono text-[#64748B] uppercase block mb-1">
                    Nama Bisnis / Domain:
                  </span>
                  <span className="text-white font-semibold">
                    {selectedDetailLead.business || "-"}
                  </span>
                </div>

                <div className="bg-[#090C10] border border-[#1B2433] rounded-xl p-3">
                  <span className="text-[10px] font-mono text-[#64748B] uppercase block mb-1">
                    Estimasi Anggaran:
                  </span>
                  <span className="text-[#00E599] font-mono font-semibold">
                    {selectedDetailLead.budget || "-"}
                  </span>
                </div>
              </div>

              <div className="bg-[#090C10] border border-[#1B2433] rounded-xl p-3">
                <span className="text-[10px] font-mono text-[#64748B] uppercase block mb-1">
                  Layanan / Paket yang Diminati:
                </span>
                <span className="text-white font-bold">
                  {selectedDetailLead.packageChosen}
                </span>
              </div>

              <div className="bg-[#090C10] border border-[#1B2433] rounded-xl p-3.5">
                <span className="text-[10px] font-mono text-[#64748B] uppercase block mb-1.5">
                  Catatan / Kebutuhan Khusus Klien:
                </span>
                <p className="text-slate-200 leading-relaxed bg-[#121824] p-3 rounded-lg border border-[#1B2433]/80">
                  {selectedDetailLead.notes || "Tidak ada catatan tambahan."}
                </p>
              </div>
            </div>

            {/* Bottom Actions in Modal */}
            <div className="flex items-center gap-3 pt-3 border-t border-[#1B2433]">
              <button
                onClick={() => setDeletingLead(selectedDetailLead)}
                className="px-4 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Lead</span>
              </button>

              <button
                onClick={() =>
                  openWhatsApp(
                    selectedDetailLead.phone,
                    selectedDetailLead.name,
                    selectedDetailLead.packageChosen
                  )
                }
                className="flex-1 bg-[#00E599] text-[#090C10] font-black text-xs py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Buka Percakapan WhatsApp Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL TAMBAH LEAD MANUAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#090C10]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#0F141C] border border-[#00E599]/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-[0_0_60px_rgba(0,229,153,0.25)] animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-[#94A3B8] hover:text-white bg-[#090C10] border border-[#1B2433] rounded-full p-2 transition cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#00E599]/15 border border-[#00E599]/30 flex items-center justify-center text-[#00E599]">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Tambah Data Lead Manual</h2>
                <p className="text-xs text-[#94A3B8]">
                  Catat calon klien yang menghubungi dari jalur telepon langsung, offline, atau referensi.
                </p>
              </div>
            </div>

            <form onSubmit={handleAddLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-white mb-1.5">
                    Nama Calon Klien <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="misal: Bapak Hendra"
                    className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white placeholder-[#64748B] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block font-bold text-white mb-1.5">
                    Nomor WhatsApp / HP <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="08123456789 atau 628123456789"
                    className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white font-mono placeholder-[#64748B] focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-white mb-1.5">
                    Nama Perusahaan / Bisnis
                  </label>
                  <input
                    type="text"
                    value={formBusiness}
                    onChange={(e) => setFormBusiness(e.target.value)}
                    placeholder="misal: PT Maju Jaya Makmur"
                    className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white placeholder-[#64748B] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block font-bold text-white mb-1.5">Status Awal</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white focus:outline-none transition cursor-pointer"
                  >
                    <option value="Baru" className="bg-[#0F141C]">Baru</option>
                    <option value="Follow Up" className="bg-[#0F141C]">Follow Up</option>
                    <option value="Deal" className="bg-[#0F141C]">Deal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-white mb-1.5">Layanan / Paket Diminati</label>
                  <input
                    type="text"
                    value={formPackage}
                    onChange={(e) => setFormPackage(e.target.value)}
                    placeholder="misal: Paket Pro / Website Toko Online"
                    className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white placeholder-[#64748B] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block font-bold text-white mb-1.5">Estimasi Anggaran</label>
                  <input
                    type="text"
                    value={formBudget}
                    onChange={(e) => setFormBudget(e.target.value)}
                    placeholder="misal: Rp 1.300.000"
                    className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl px-3.5 py-2.5 text-white placeholder-[#64748B] focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-white mb-1.5">Catatan / Kebutuhan Klien</label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Tuliskan catatan khusus atau kebutuhan desain..."
                  className="w-full bg-[#090C10] border border-[#1B2433] focus:border-[#00E599] rounded-xl p-3 text-white placeholder-[#64748B] focus:outline-none transition leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1B2433]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#1B2433] font-bold text-[#94A3B8] hover:text-white transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#00E599] text-[#090C10] font-black px-6 py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.35)] transition cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Simpan Lead Baru</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL KONFIRMASI HAPUS */}
      {deletingLead && (
        <div className="fixed inset-0 z-50 bg-[#090C10]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F141C] border border-red-500/50 rounded-3xl max-w-md w-full p-6 relative shadow-[0_0_50px_rgba(239,68,68,0.25)] animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h2 className="text-lg font-black text-white text-center mb-1.5">
              Hapus Data Lead &ldquo;{deletingLead.name}&rdquo;?
            </h2>
            <p className="text-xs text-[#94A3B8] text-center mb-6 leading-relaxed">
              Data interaksi calon klien ini akan dihapus dari database admin panel. Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeletingLead(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#1B2433] text-xs font-bold text-[#94A3B8] hover:text-white transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black text-xs py-2.5 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.4)] transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Lead</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
