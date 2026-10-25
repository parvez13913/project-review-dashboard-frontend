"use client";

import Footer from "@/components/shared/Footer";
import Cookies from "js-cookie";
import { LogOut, ShieldCheck, UserCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("role");
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white font-sans selection:bg-violet-600 selection:text-white">
      {/* Shared Dashboard Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand Logo & Role Indicator */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 ">
              <div className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-violet-600/30">
                P
              </div>
              <span className="font-semibold text-lg tracking-tight">
                DevReview<span className="text-violet-500">.</span>
              </span>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-950/60 border border-violet-800/60 text-violet-400 uppercase tracking-wider">
              {role === "ADMIN" ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin Panel
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5" /> Student Portal
                </>
              )}
            </span>
          </div>

          {/* User Actions / Logout */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-800 hover:text-white transition-colors shadow-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
