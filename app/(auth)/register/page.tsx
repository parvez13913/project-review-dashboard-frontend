import RegisterForm from "@/components/auth/RegisterForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-white font-sans selection:bg-violet-600 selection:text-white">
      {/* Main Form Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-md mx-auto w-full">
        <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-violet-950/20">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
              Create an Account
            </h1>
            <p className="text-sm text-slate-400">
              Join{" "}
              <span className="text-violet-500 font-medium">DevReview</span> to
              submit and manage your project evaluations
            </p>
          </div>

          <RegisterForm />
        </div>
      </main>
    </div>
  );
}
