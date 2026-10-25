import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-white font-sans selection:bg-violet-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/50 border border-violet-800/50 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <span>✨ Full-Stack Project Evaluation Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
          Streamline Your{" "}
          <span className="text-violet-500">Project Reviews</span> & Submissions
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10">
          The ultimate platform for students to submit development tasks and for
          mentors to evaluate, grade, and provide actionable feedback
          seamlessly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-all shadow-xl shadow-violet-600/25 flex items-center justify-center"
          >
            Access Dashboard
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center"
          >
            Submit Project
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
