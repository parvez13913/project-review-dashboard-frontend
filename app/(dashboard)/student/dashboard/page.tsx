/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useCreateSubmissionMutation,
  useGetMySubmissionQuery,
} from "@/src/redux/features/submission/submissionApi";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  PlusCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsGithub } from "react-icons/bs";
import { toast } from "sonner";

interface SubmissionInput {
  projectName: string;
  repoUrl: string;
  liveLink?: string;
  description: string;
}

export default function StudentDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading: isFetching, refetch } = useGetMySubmissionQuery("");
  const submission = data?.data;
  const [createSubmission, { isLoading: isCreating }] =
    useCreateSubmissionMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmissionInput>();

  const onSubmit: SubmitHandler<SubmissionInput> = async (formData) => {
    try {
      const response = await createSubmission(formData).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Project submitted successfully!");
        reset();
        setIsModalOpen(false);
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit project.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
            Student Submissions
          </h1>
          <p className="text-sm text-slate-400">
            Submit your development tasks and track mentor evaluation progress.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20 flex items-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" /> New Submission
        </button>
      </div>

      {/* Submissions Section */}
      {isFetching ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        </div>
      ) : submission && submission.id ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            key={submission.id}
            className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-semibold text-lg text-white">
                  {submission.projectName}
                </h3>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    submission.status === "APPROVED"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : submission.status === "REJECTED"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}
                >
                  {submission.status === "APPROVED" && (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  {submission.status === "REJECTED" && (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                  {submission.status === "PENDING" && (
                    <Clock className="w-3.5 h-3.5" />
                  )}
                  {submission.status}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                {submission.description}
              </p>

              {(submission.reviewNote || submission.feedback) && (
                <div className="mb-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <span className="font-semibold text-violet-400 block mb-1">
                    Mentor Feedback:
                  </span>
                  {submission.reviewNote || submission.feedback}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <a
                  href={submission.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <BsGithub /> Repo
                </a>
                {submission.liveLink && (
                  <a
                    href={submission.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-violet-400 hover:text-violet-300 flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
              <span className="text-slate-500">
                {submission.createdAt
                  ? new Date(submission.createdAt).toLocaleDateString()
                  : ""}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/30 border border-slate-800/60 rounded-2xl">
          <p className="text-slate-400 text-sm mb-4">
            You haven&apos;t submitted any projects yet.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-violet-600/20 border border-violet-600/30 text-violet-400 text-sm font-medium hover:bg-violet-600/30 transition-colors cursor-pointer"
          >
            Create your first submission
          </button>
        </div>
      )}

      {/* Modal Form for New Submission */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">
              Submit Project
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., E-Commerce Platform"
                  {...register("projectName", {
                    required: "Title is required",
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-violet-600"
                />
                {errors.projectName && (
                  <p className="mt-1 text-xs text-rose-400">
                    {errors.projectName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Repository URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username/repo"
                  {...register("repoUrl", {
                    required: "Repository URL is required",
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-violet-600"
                />
                {errors.repoUrl && (
                  <p className="mt-1 text-xs text-rose-400">
                    {errors.repoUrl.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  placeholder="https://myproject.vercel.app"
                  {...register("liveLink", {
                    required: "Live link URL is required",
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-violet-600"
                />

                {errors.liveLink && (
                  <p className="mt-1 text-xs text-rose-400">
                    {errors.liveLink.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Description & Key Features
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe your project..."
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-violet-600"
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-rose-400">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-5 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
                  Submit Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
