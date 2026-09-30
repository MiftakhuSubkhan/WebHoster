"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Server,
  Globe,
  ShieldCheck,
  Activity,
  LogOut,
  Plus,
  Cpu,
  HardDrive,
  Database,
  ExternalLink,
  Layers,
  ArrowUpRight,
  Sparkles,
  Users,
  CheckCircle2,
  Clock,
  Settings,
  BellRing,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Clear session cookie
    document.cookie =
      "webhoster_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    setTimeout(() => {
      router.push("/wh-auth");
      router.refresh();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#090C10] text-[#F1F5F9] pb-16">
      {/* Admin Top Navigation Bar */}
      <div className="border-b border-[#1B2433] bg-[#0F141C]/80 backdrop-blur-xl sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E599] animate-pulse" />
              <h1 className="text-base font-bold text-white tracking-tight">
                Admin Control Center
              </h1>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30 text-xs font-semibold">
              Production Cluster
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-medium text-[#94A3B8] hover:text-white px-3 py-1.5 rounded-lg border border-[#1B2433] hover:border-[#00E599]/50 transition flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lihat Web Publik</span>
            </Link>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isLoggingOut ? "Keluar..." : "Logout"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-[#00E599] uppercase tracking-wider">
                System Status: All Systems Operational
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Selamat Datang di Portal WebHoster
            </h2>
            <p className="text-sm text-[#94A3B8] mt-1">
              Monitoring infrastruktur server NVMe, domain, dan paket website aktif secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Fitur deployment instan siap dihubungkan ke backend.")}
              className="bg-[#00E599] text-[#090C10] font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl hover:bg-[#00C882] shadow-[0_0_20px_rgba(0,229,153,0.3)] hover:scale-105 transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Deploy Instance Baru</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-5 hover:border-[#00E599]/40 transition relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#94A3B8] uppercase">Website Aktif</span>
              <div className="w-8 h-8 rounded-lg bg-[#00E599]/10 text-[#00E599] flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white mb-1">248 Instance</div>
            <div className="text-xs text-[#00E599] flex items-center gap-1 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18% bulan ini</span>
            </div>
          </div>

          <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-5 hover:border-[#00E599]/40 transition relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#94A3B8] uppercase">Uptime Server</span>
              <div className="w-8 h-8 rounded-lg bg-[#00E599]/10 text-[#00E599] flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white mb-1">99.98%</div>
            <div className="text-xs text-[#00E599] flex items-center gap-1 font-medium">
              <span>Jakarta IDC-3 tier IV</span>
            </div>
          </div>

          <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-5 hover:border-[#00E599]/40 transition relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#94A3B8] uppercase">NVMe Storage</span>
              <div className="w-8 h-8 rounded-lg bg-[#00E599]/10 text-[#00E599] flex items-center justify-center">
                <HardDrive className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white mb-1">1.42 TB / 4 TB</div>
            <div className="text-xs text-[#94A3B8] flex items-center gap-1">
              <span>35.5% Terpakai</span>
            </div>
          </div>

          <div className="bg-[#0F141C] border border-[#1B2433] rounded-2xl p-5 hover:border-[#00E599]/40 transition relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#94A3B8] uppercase">SSL Terproteksi</span>
              <div className="w-8 h-8 rounded-lg bg-[#00E599]/10 text-[#00E599] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white mb-1">100% Aktif</div>
            <div className="text-xs text-[#00E599] flex items-center gap-1 font-medium">
              <span>Auto-Renew Let&apos;s Encrypt</span>
            </div>
          </div>
        </div>

        {/* Server Nodes & Live Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Node Clusters */}
          <div className="lg:col-span-2 bg-[#0F141C] border border-[#1B2433] rounded-3xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-white">Cluster Cloud Node</h3>
                <p className="text-xs text-[#94A3B8]">Status beban CPU & RAM tiap lokasi data center</p>
              </div>
              <span className="text-xs font-mono text-[#00E599] bg-[#00E599]/10 px-2.5 py-1 rounded-full border border-[#00E599]/30">
                Auto Failover ON
              </span>
            </div>

            <div className="space-y-4">
              {[
                { name: "Node Jakarta JK-1 (Cyber Building)", cpu: "28%", ram: "42%", ping: "4ms", status: "Optimal" },
                { name: "Node Jakarta JK-2 (DCI Tier IV)", cpu: "34%", ram: "51%", ping: "5ms", status: "Optimal" },
                { name: "Node Singapore SG-1 (Equinix)", cpu: "19%", ram: "38%", ping: "14ms", status: "Optimal" },
              ].map((node, i) => (
                <div key={i} className="bg-[#090C10] border border-[#1B2433] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1B2433] flex items-center justify-center text-[#00E599]">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{node.name}</div>
                      <div className="text-xs text-[#94A3B8] flex items-center gap-2">
                        <span>Latency: <strong className="text-[#00E599]">{node.ping}</strong></span>
                        <span>•</span>
                        <span>Status: {node.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-right">
                      <span className="text-[#94A3B8] block">CPU Load</span>
                      <strong className="text-white font-mono">{node.cpu}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[#94A3B8] block">RAM Usage</span>
                      <strong className="text-white font-mono">{node.ram}</strong>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00E599]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Recent Deployments */}
          <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Aktivitas Terkini</h3>
              <p className="text-xs text-[#94A3B8] mb-4">Log pembuatan website & perpanjangan domain</p>

              <div className="space-y-3.5">
                {[
                  { title: "Instalasi WordPress Pro", user: "kedaikopi.co.id", time: "5 menit lalu" },
                  { title: "Registrasi Domain .co.id", user: "pt-nusantara.co.id", time: "22 menit lalu" },
                  { title: "Upgrade Bandwidth NVMe", user: "klinikmedika.com", time: "1 jam lalu" },
                  { title: "Auto Backup Snapshot", user: "System Cron", time: "3 jam lalu" },
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-[#00E599] mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold text-white">{act.title}</div>
                      <div className="text-[#94A3B8] font-mono">{act.user}</div>
                    </div>
                    <span className="text-[11px] text-[#94A3B8] shrink-0">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1B2433]">
              <div className="bg-[#090C10] p-3.5 rounded-2xl border border-[#1B2433] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Sesi Login Aktif</div>
                  <div className="text-[11px] text-[#00E599] font-mono">admin@webhoster.co.id</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-400 hover:text-red-300 font-bold transition"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
