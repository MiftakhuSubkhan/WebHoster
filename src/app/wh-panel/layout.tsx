"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LayoutTemplate,
  Briefcase,
  Tag,
  Mail,
  Settings,
  LogOut,
  Globe,
  Menu,
  X,
  ShieldCheck,
  Server,
  ExternalLink,
  ChevronRight,
  Bell,
  Sparkles,
  User,
} from "lucide-react";

import { getLeadsStats } from "@/lib/leads";

interface NavMenuItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  badgeType?: "baru" | "total";
}


export default function WhPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [leadsStats, setLeadsStats] = useState({ total: 0, baru: 0 });

  useEffect(() => {
    const updateStats = () => {
      try {
        const stats = getLeadsStats();
        setLeadsStats({ total: stats.total, baru: stats.baru });
      } catch (e) {}
    };

    updateStats();

    if (typeof window !== "undefined") {
      window.addEventListener("wh:leads_updated", updateStats);
      window.addEventListener("storage", updateStats);
      return () => {
        window.removeEventListener("wh:leads_updated", updateStats);
        window.removeEventListener("storage", updateStats);
      };
    }
  }, []);

  const menuItems: NavMenuItem[] = [
    { label: "Dashboard", href: "/wh-panel", icon: LayoutDashboard },
    { label: "Kelola Template", href: "/wh-panel/templates", icon: LayoutTemplate },
    { label: "Kelola Portofolio", href: "/wh-panel/portofolio", icon: Briefcase },
    { label: "Paket & Harga", href: "/wh-panel/pricing", icon: Tag },
    {
      label: "Leads / Kontak",
      href: "/wh-panel/leads",
      icon: Mail,
      badge:
        leadsStats.baru > 0
          ? leadsStats.baru
          : leadsStats.total > 0
          ? leadsStats.total
          : undefined,
      badgeType: leadsStats.baru > 0 ? "baru" : leadsStats.total > 0 ? "total" : undefined,
    },
    { label: "Pengaturan Global", href: "/wh-panel/settings", icon: Settings },
  ];

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

  const isCurrentActive = (href: string) => {
    if (href === "/wh-panel") {
      return pathname === "/wh-panel";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#090C10] text-[#F1F5F9] flex flex-col lg:flex-row antialiased">
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:flex w-72 flex-col justify-between bg-[#0F141C] border-r border-[#1B2433] shrink-0 min-h-screen sticky top-0 h-screen z-30">
        <div>
          {/* Workspace Brand Header */}
          <div className="h-20 px-6 flex items-center gap-3 border-b border-[#1B2433]">
            <Link href="/wh-panel" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#00E599] flex items-center justify-center text-[#090C10] font-black text-xl shadow-[0_0_20px_rgba(0,229,153,0.4)] group-hover:scale-105 transition-transform">
                W
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="text-base font-black text-white tracking-tight">WebHoster</span>
                  <span className="text-xs font-bold text-[#00E599]">.co.id</span>
                </div>
                <span className="text-[10px] text-[#94A3B8] font-semibold tracking-wider uppercase">
                  Admin Workspace
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-6">
            <div className="px-3 mb-2 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
              Menu Utama
            </div>
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isCurrentActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 group ${
                      active
                        ? "bg-[#00E599]/15 text-[#00E599] border border-[#00E599]/30 shadow-[0_0_15px_rgba(0,229,153,0.15)]"
                        : "text-[#94A3B8] hover:text-white hover:bg-[#121824] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          active ? "text-[#00E599]" : "text-[#94A3B8] group-hover:text-white"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        title={
                          item.badgeType === "baru"
                            ? `${item.badge} Pesan / Leads Baru`
                            : `${item.badge} Total Leads`
                        }
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black transition-all ${
                          item.badgeType === "baru"
                            ? "bg-[#00E599] text-[#090C10] shadow-[0_0_8px_rgba(0,229,153,0.4)] animate-pulse"
                            : "bg-[#1B2433] text-[#94A3B8] border border-[#2B3545]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Card & Logout Bottom */}
        <div className="p-4 border-t border-[#1B2433] bg-[#090C10]/60 space-y-3">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-[#1B2433] border border-[#00E599]/30 flex items-center justify-center text-[#00E599] font-bold text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">Administrator</div>
              <div className="text-[11px] text-[#94A3B8] truncate">admin@webhoster.co.id</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isLoggingOut ? "Keluar..." : "Logout Akun"}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <div
        className={`fixed top-0 bottom-0 left-0 w-72 bg-[#0F141C] border-r border-[#1B2433] z-50 flex flex-col justify-between transition-transform duration-300 lg:hidden ${
          mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="h-20 px-6 flex items-center justify-between border-b border-[#1B2433]">
            <Link
              href="/wh-panel"
              onClick={() => setMobileDrawerOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-[#00E599] flex items-center justify-center text-[#090C10] font-black text-lg shadow-[0_0_20px_rgba(0,229,153,0.4)]">
                W
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-white">WebHoster Panel</span>
                <span className="text-[10px] text-[#94A3B8]">Admin Workspace</span>
              </div>
            </Link>

            <button
              onClick={() => setMobileDrawerOpen(false)}
              className="p-1.5 text-[#94A3B8] hover:text-white rounded-lg hover:bg-[#1B2433]"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-4 py-6">
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isCurrentActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      active
                        ? "bg-[#00E599]/15 text-[#00E599] border border-[#00E599]/30"
                        : "text-[#94A3B8] hover:text-white hover:bg-[#121824]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black transition-all ${
                          item.badgeType === "baru"
                            ? "bg-[#00E599] text-[#090C10] shadow-[0_0_8px_rgba(0,229,153,0.4)]"
                            : "bg-[#1B2433] text-[#94A3B8] border border-[#2B3545]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-[#1B2433] bg-[#090C10]/60 space-y-3">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isLoggingOut ? "Keluar..." : "Logout Akun"}</span>
          </button>
        </div>
      </div>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar Header */}
        <header className="h-16 lg:h-20 bg-[#0F141C]/80 border-b border-[#1B2433] backdrop-blur-xl sticky top-0 z-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#1B2433] transition cursor-pointer"
              aria-label="Open Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Admin Identity & Status Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#090C10] border border-[#1B2433]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E599] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E599]"></span>
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8]">
                <User className="w-3.5 h-3.5 text-[#00E599]" />
                <span>Administrator:</span>
                <strong className="text-[#00E599] font-mono font-bold">Online</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Direct Link to Public Site */}
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-[#94A3B8] hover:text-white px-3.5 py-2 rounded-xl border border-[#1B2433] hover:border-[#00E599]/50 hover:bg-[#121824] transition flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-[#00E599]" />
              <span className="hidden sm:inline">Buka Web Publik</span>
              <ExternalLink className="w-3 h-3 text-[#64748B]" />
            </Link>

            {/* Notification Bell */}
            <button
              onClick={() => router.push("/wh-panel/leads")}
              className="relative p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#121824] border border-[#1B2433] transition cursor-pointer"
              aria-label="Lihat Leads Baru"
              title={
                leadsStats.baru > 0
                  ? `${leadsStats.baru} pesan / leads baru belum direspons`
                  : "Tidak ada pesan baru"
              }
            >
              <Bell className="w-4 h-4" />
              {leadsStats.baru > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#00E599] text-[#090C10] text-[10px] font-black flex items-center justify-center shadow-[0_0_8px_#00E599] animate-pulse">
                  {leadsStats.baru}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Page Children Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
