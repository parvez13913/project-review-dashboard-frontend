"use client";

import { useSignupMutation } from "@/src/redux/features/authApi/authApi";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface SignupFormInput {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormInput>();
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();
  const onSubmit: SubmitHandler<SignupFormInput> = async (data) => {
    try {
      const response = await signup(data).unwrap();
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
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-medium text-slate-300 mb-2"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Test Student"
          {...register("name", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all placeholder:text-slate-600"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-rose-400">{errors.name.message}</p>
        )}
      </div>

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
          placeholder="student@example.com"
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
        <label
          htmlFor="password"
          className="block text-xs font-medium text-slate-300 mb-2"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••••••"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
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
        className="w-full py-3.5 px-4 rounded-xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 active:bg-violet-800 transition-all shadow-lg shadow-violet-600/25 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-white" />
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}
