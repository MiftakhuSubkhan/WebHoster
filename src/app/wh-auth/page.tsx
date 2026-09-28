"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  KeyRound,
} from "lucide-react";

interface RegisteredUser {
  fullName: string;
  email: string;
  password: string;
}

export default function WhAuthPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  // Form input states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Registered users persistence
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("wh_registered_users");
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        fullName: "Administrator",
        email: "admin@webhoster.co.id",
        password: "admin123",
      },
    ];
  });

  // Status and feedback states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const switchMode = (mode: "login" | "register") => {
    setAuthMode(mode);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    // Realistic simulated authentication delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (authMode === "login") {
      if (!email.trim() || !password.trim()) {
        setErrorMessage("Mohon lengkapi email dan kata sandi Anda.");
        setIsLoading(false);
        return;
      }

      // Check against registered users list & default demo admin
      const matchedUser =
        registeredUsers.find(
          (u) =>
            u.email.toLowerCase() === email.trim().toLowerCase() &&
            u.password === password
        ) ||
        (email.trim().toLowerCase() === "admin@webhoster.co.id" &&
          password === "admin123"
          ? { fullName: "Administrator", email: "admin@webhoster.co.id", password: "admin123" }
          : null);

      if (matchedUser) {
        // Set authenticated session cookie (valid for 1 day)
        document.cookie =
          "webhoster_admin_session=authenticated; path=/; max-age=86400; SameSite=Lax";
        setSuccessMessage("Autentikasi berhasil! Mengalihkan ke Workspace...");

        setTimeout(() => {
          router.push("/wh-panel");
          router.refresh();
        }, 500);
      } else {
        setErrorMessage(
          "Email atau kata sandi tidak cocok. Pastikan akun sudah terdaftar atau gunakan demo login."
        );
        setIsLoading(false);
      }
    } else {
      // Validate Register mode
      if (!fullName.trim()) {
        setErrorMessage("Nama lengkap wajib diisi.");
        setIsLoading(false);
        return;
      }
      if (!email.trim() || !email.includes("@")) {
        setErrorMessage("Format alamat email tidak valid.");
        setIsLoading(false);
        return;
      }
      if (!password || password.length < 6) {
        setErrorMessage("Kata sandi minimal 6 karakter.");
        setIsLoading(false);
        return;
      }

      // Check if email already registered
      const isAlreadyRegistered = registeredUsers.some(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (isAlreadyRegistered) {
        setErrorMessage("Alamat email ini sudah terdaftar. Silakan langsung masuk.");
        setIsLoading(false);
        return;
      }

      // Save newly registered user
      const newUser: RegisteredUser = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password: password,
      };

      const updatedUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedUsers);

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("wh_registered_users", JSON.stringify(updatedUsers));
        } catch (e) {}
      }

      // Switch to Login mode with success message and pre-filled email
      setIsLoading(false);
      setSuccessMessage(
        `Registrasi akun "${fullName.trim()}" berhasil! Silakan masukkan kata sandi untuk masuk.`
      );
      setAuthMode("login");
      setPassword(""); // Clear password so user enters it to log in
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 bg-[#090C10] overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E599]/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-[#00C882]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Cyber Grid Pattern Backdrop */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none -z-10" />

      {/* Main Centered Authentication Card */}
      <div className="w-full max-w-[460px] relative z-10">
        <div className="bg-[#0F141C] border border-[#1B2433] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden">
          {/* Top Glowing Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E599]/80 to-transparent" />

          {/* 1. Header & Branding */}
          <div className="text-center mb-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3 group mb-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#00E599] flex items-center justify-center text-[#090C10] font-black text-2xl shadow-[0_0_25px_rgba(0,229,153,0.45)] group-hover:scale-105 transition-transform">
                W
              </div>
            </Link>

            <div className="flex items-center justify-center gap-1.5 mb-1">
              <h1 className="text-2xl font-black text-white tracking-tight">
                WebHoster
              </h1>
              <span className="text-xl font-bold text-[#00E599]">.co.id</span>
            </div>

            <p className="text-xs sm:text-sm text-[#94A3B8] transition-all duration-300">
              {authMode === "login"
                ? "Masuk ke portal manajemen & kontrol server WebHoster."
                : "Daftar akun baru untuk mengelola website & cloud hosting Anda."}
            </p>
          </div>

          {/* 2. Mode Switcher Segment (Masuk vs Daftar Akun) */}
          <div className="bg-[#090C10] p-1 rounded-2xl border border-[#1B2433] grid grid-cols-2 gap-1 mb-6 relative">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${authMode === "login"
                ? "bg-[#1B2433] text-[#00E599] shadow-sm border border-[#00E599]/30"
                : "text-[#94A3B8] hover:text-white"
                }`}
            >
              <span>Masuk</span>
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${authMode === "register"
                ? "bg-[#1B2433] text-[#00E599] shadow-sm border border-[#00E599]/30"
                : "text-[#94A3B8] hover:text-white"
                }`}
            >
              <span>Daftar Akun</span>
            </button>
          </div>

          {/* Error / Success Feedback Alerts */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="leading-snug">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-[#00E599]/10 border border-[#00E599]/30 text-[#00E599] text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="leading-snug">{successMessage}</div>
            </div>
          )}

          {/* 3. Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Register Mode Specific Fields */}
            {authMode === "register" && (
              <>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#94A3B8] tracking-wider uppercase">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Prasetyo"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#090C10] border border-[#1B2433] rounded-xl text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#00E599] focus:ring-1 focus:ring-[#00E599] transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Shared Field: Alamat Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#94A3B8] tracking-wider uppercase">
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    authMode === "login"
                      ? "admin@webhoster.co.id"
                      : "nama@perusahaan.com"
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-[#090C10] border border-[#1B2433] rounded-xl text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#00E599] focus:ring-1 focus:ring-[#00E599] transition-all"
                />
              </div>
            </div>

            {/* Shared Field: Kata Sandi */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#94A3B8] tracking-wider uppercase">
                  Kata Sandi
                </label>
                {authMode === "register" && (
                  <span className="text-[11px] text-[#94A3B8]">Min. 6 karakter</span>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 bg-[#090C10] border border-[#1B2433] rounded-xl text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#00E599] focus:ring-1 focus:ring-[#00E599] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#94A3B8] hover:text-white transition cursor-pointer"
                  aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Mode Extra: Remember Me & Internal Tag */}
            {authMode === "login" && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#1B2433] bg-[#090C10] text-[#00E599] accent-[#00E599] focus:ring-[#00E599] focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-xs text-[#94A3B8] hover:text-white transition">
                    Ingat saya
                  </span>
                </label>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-[11px] font-semibold text-[#00E599]">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Akses Internal</span>
                </div>
              </div>
            )}

            {/* 4. Dual-Button Action Flow */}
            <div className="space-y-3 pt-3">
              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00E599] text-[#090C10] font-black text-sm py-3 px-4 rounded-xl hover:bg-[#00C882] shadow-[0_0_25px_rgba(0,229,153,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#090C10]" />
                    <span>Memproses Autentikasi...</span>
                  </>
                ) : authMode === "login" ? (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Daftar Akun Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Secondary Switcher Button */}
              <button
                type="button"
                onClick={() =>
                  switchMode(authMode === "login" ? "register" : "login")
                }
                disabled={isLoading}
                className="w-full bg-transparent border border-[#1B2433] hover:border-[#00E599] text-[#94A3B8] hover:text-[#00E599] font-medium text-xs sm:text-sm py-2.5 px-4 rounded-xl hover:bg-[#00E599]/5 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {authMode === "login" ? (
                  <span>Belum punya akun? Daftar Akun Baru</span>
                ) : (
                  <span>Sudah punya akun? Masuk Login</span>
                )}
              </button>
            </div>
          </form>

        </div>

        {/* 6. Back to Home Link outside card */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#00E599] transition font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda WebHoster</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
