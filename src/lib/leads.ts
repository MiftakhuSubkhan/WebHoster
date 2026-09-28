import { supabase, isSupabaseConfigured } from "@/lib/supabase";

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
  customMessage?: string;
  timestamp?: string;
}

export const DEFAULT_LEADS: LeadItem[] = [
  {
    id: "lead-1",
    name: "Hendra Wijaya",
    phone: "6281298765432",
    packageChosen: "Website Company Profile (PT / CV / Korporat)",
    status: "Baru",
    date: "10 menit lalu",
    business: "PT Wijaya Konstruksi Nusantara",
    budget: "Rp 1.300.000 (Paket Pro - Paling Direkomendasikan)",
    notes:
      "Halo, kami butuh website resmi untuk profil tender perusahaan konstruksi, butuh integrasi company profile PDF download dan email bisnis.",
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
    notes:
      "Ingin landing page klinik dengan fitur jadwal praktek dokter, lokasi maps, dan tombol appointment WhatsApp.",
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
    notes:
      "Sudah transfer tagihan WHMCS paket Premium, mohon bantu setup domain sentosafashion.co.id dan katalog produk awal.",
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
    notes:
      "Perlu website resto untuk menu makanan minuman dan reservasi tempat via WhatsApp.",
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
    notes:
      "Sedang menunggu approval proposal teknis dan invoice penawaran dari tim keuangan.",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
];

const STORAGE_KEY = "wh_admin_leads";

export function getLeads(): LeadItem[] {
  if (typeof window === "undefined") return DEFAULT_LEADS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LEADS));
    return DEFAULT_LEADS;
  } catch (e) {
    return DEFAULT_LEADS;
  }
}

export function saveLeads(leads: LeadItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    window.dispatchEvent(
      new CustomEvent("wh:leads_updated", { detail: leads })
    );
  } catch (e) {
    console.error("Gagal menyimpan data leads:", e);
  }
}

/**
 * Menyimpan lead baru ke localStorage dan Supabase (jika aktif)
 */
export function addLead(newLead: Partial<LeadItem>): LeadItem {
  const current = getLeads();
  const item: LeadItem = {
    id: newLead.id || `lead-${Date.now()}`,
    name: newLead.name?.trim() || "Calon Klien",
    phone: newLead.phone?.trim() || "6281200000000",
    packageChosen:
      newLead.packageChosen?.trim() || "Website Company Profile",
    status: newLead.status || "Baru",
    date: newLead.date || "Baru saja",
    business: newLead.business?.trim() || "-",
    budget: newLead.budget?.trim() || "-",
    notes:
      newLead.notes?.trim() ||
      newLead.customMessage?.trim() ||
      "Pesan konsultasi masuk.",
    customMessage:
      newLead.customMessage?.trim() ||
      newLead.notes?.trim() ||
      "Pesan konsultasi masuk.",
    timestamp: newLead.timestamp || new Date().toISOString(),
  };

  const updated = [item, ...current];
  saveLeads(updated);

  // Sync ke Supabase secara background jika terhubung
  if (isSupabaseConfigured() && supabase) {
    (async () => {
      try {
        const { error } = await supabase.from("leads").insert([
          {
            id: item.id,
            name: item.name,
            phone: item.phone,
            package_chosen: item.packageChosen,
            status: item.status,
            date: item.date,
            business: item.business,
            budget: item.budget,
            notes: item.notes,
            custom_message: item.customMessage,
          },
        ]);
        if (error) {
          console.warn("[Supabase] Gagal menyimpan lead:", error.message);
        }
      } catch (err) {
        console.warn("[Supabase] Connection error:", err);
      }
    })();
  }

  return item;
}

/**
 * Sinkronisasi data leads dari Supabase ke local state
 */
export async function syncLeadsWithSupabase(): Promise<LeadItem[]> {
  if (!isSupabaseConfigured() || !supabase) {
    return getLeads();
  }

  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return getLeads();
    }

    const mapped: LeadItem[] = data.map((d: any) => ({
      id: d.id,
      name: d.name,
      phone: d.phone,
      packageChosen: d.package_chosen,
      status: d.status,
      date: d.date || "Baru saja",
      business: d.business || "-",
      budget: d.budget || "-",
      notes: d.notes || "",
      customMessage: d.custom_message || "",
      timestamp: d.created_at,
    }));

    saveLeads(mapped);
    return mapped;
  } catch (err) {
    console.warn("[Supabase] Gagal sinkronisasi leads:", err);
    return getLeads();
  }
}

export function updateLeadStatus(id: string, status: LeadItem["status"]): void {
  const current = getLeads();
  const updated = current.map((l) => (l.id === id ? { ...l, status } : l));
  saveLeads(updated);

  if (isSupabaseConfigured() && supabase) {
    (async () => {
      try {
        const { error } = await supabase
          .from("leads")
          .update({ status })
          .eq("id", id);
        if (error) console.warn("[Supabase] Failed to update lead status:", error.message);
      } catch (err) {
        console.warn("[Supabase] Connection error:", err);
      }
    })();
  }
}

export function deleteLead(id: string): void {
  const current = getLeads();
  const filtered = current.filter((l) => l.id !== id);
  saveLeads(filtered);

  if (isSupabaseConfigured() && supabase) {
    (async () => {
      try {
        const { error } = await supabase.from("leads").delete().eq("id", id);
        if (error) console.warn("[Supabase] Failed to delete lead:", error.message);
      } catch (err) {
        console.warn("[Supabase] Connection error:", err);
      }
    })();
  }
}


export function getLeadsStats(): {
  total: number;
  baru: number;
  followUp: number;
  deal: number;
} {
  const leads = getLeads();
  const total = leads.length;
  const baru = leads.filter((l) => l.status === "Baru").length;
  const followUp = leads.filter((l) => l.status === "Follow Up").length;
  const deal = leads.filter((l) => l.status === "Deal").length;
  return { total, baru, followUp, deal };
}

export function resetLeadsToDefault(): void {
  saveLeads(DEFAULT_LEADS);
}


