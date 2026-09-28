import Link from "next/link";
import { ArrowLeft, Home, LifeBuoy } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00E599]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-[#00E599]/10 border border-[#00E599]/20 text-[#00E599] mb-4">
          Error 404
        </span>

        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-4">
          4<span className="text-[#00E599]">0</span>4
        </h1>

        <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
          Halaman Tidak Ditemukan
        </h2>

        <p className="text-[#94A3B8] text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
          Maaf, halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tautan yang Anda tuju salah.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00E599] text-[#090C10] font-bold hover:bg-[#00c985] transition-all duration-200 shadow-lg shadow-[#00E599]/20"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/kontak"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E293B] text-white font-medium hover:bg-[#334155] border border-white/5 transition-all duration-200"
          >
            <LifeBuoy className="w-4 h-4 text-[#00E599]" />
            Hubungi Bantuan
          </Link>
        </div>
      </div>
    </div>
  );
}
