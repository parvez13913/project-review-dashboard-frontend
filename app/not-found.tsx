import { FileQuestion, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex items-center justify-center p-6 selection:bg-violet-600 selection:text-white">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl shadow-2xl">
        {/* Icon Header */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-600/10 border border-violet-600/20 text-violet-400 mx-auto shadow-inner">
          <FileQuestion className="w-8 h-8" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
            Error 404
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            The page you are looking for doesn&apos;t exist, has been removed,
            or you don&apos;t have permission to access it.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
