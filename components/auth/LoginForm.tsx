"use client";

import { useLoginMutation } from "@/src/redux/features/authApi/authApi";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface LoginFormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInput>();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      const response = await login(data).unwrap();
      if (response?.success) {
        localStorage.setItem("access_token", response?.data?.token);
        localStorage.setItem("role", response?.data?.user?.role);
        toast.success(response?.message);
        reset();
        router.push("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-medium text-slate-300 mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="mentor@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all placeholder:text-slate-600"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-rose-400">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="password"
            className="block text-xs font-medium text-slate-300"
          >
            Password
          </label>
        </div>
        <input
          id="password"
          type="password"
          placeholder="••••••••••••"
          {...register("password", {
            required: "Password is required",
          })}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all placeholder:text-slate-600"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-rose-400">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 px-4 rounded-xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 active:bg-violet-800 transition-all shadow-lg shadow-violet-600/25 cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-white" />
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
