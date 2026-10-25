import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full border-b border-slate-800">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-lg">
          P
        </div>
        <span className="font-semibold text-lg tracking-tight">
          DevReview<span className="text-violet-500">.</span>
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 rounded-lg bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/20"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
