/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetAllSubmissionQuery,
  useReviewSubmissionMutation,
} from "@/src/redux/features/review/reviewApi";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  MessageSquare,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { BsGithub } from "react-icons/bs";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<
    string | null
  >(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [actionStatus, setActionStatus] = useState<
    "PENDING" | "APPROVED" | "REJECTED" | null
  >(null);

  const { data, isLoading: isFetching, refetch } = useGetAllSubmissionQuery("");
  const submissions = data?.data;
  const [reviewSubmission, { isLoading: isReviewing }] =
    useReviewSubmissionMutation();

  const handleReviewSubmit = async (
    status: "PENDING" | "APPROVED" | "REJECTED",
  ) => {
    if (!selectedSubmissionId) return;

    try {
      const response = await reviewSubmission({
        id: selectedSubmissionId,
        status,
        reviewNote: feedbackText,
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message);
        setSelectedSubmissionId(null);
        setFeedbackText("");
        setActionStatus(null);
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update submission status.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Admin Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-6 h-6 text-violet-500" />
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Admin Review Control Panel
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Evaluate student project submissions, provide feedback, and update
            statuses.
          </p>
        </div>
      </div>

      {/* Submissions Grid/Table */}
      {isFetching ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        </div>
      ) : submissions && submissions.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {submissions.map((sub: any) => (
            <div
              key={sub.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg text-white">
                    {sub.title}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      sub.status === "APPROVED"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : sub.status === "REJECTED"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {sub.status === "APPROVED" && (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                    {sub.status === "REJECTED" && (
                      <XCircle className="w-3.5 h-3.5" />
                    )}
                    {sub.status === "PENDING" && (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    {sub.status}
                  </span>
                </div>

                <p className="text-sm text-slate-400 line-clamp-2">
                  {sub.description}
                </p>

                <div className="flex items-center gap-4 text-xs pt-2">
                  <span className="text-slate-400 font-medium">
                    Student: {sub.user?.name || sub.student?.name || "N/A"}
                  </span>
                  <a
                    href={sub.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <BsGithub className="w-3.5 h-3.5" /> Repo
                  </a>
                  {sub.liveLink && (
                    <a
                      href={sub.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Demo
                    </a>
                  )}
                </div>

                {sub.feedback && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <span className="font-semibold text-violet-400 block mb-0.5">
                      Current Feedback:
                    </span>
                    {sub.feedback}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => {
                    setSelectedSubmissionId(sub.id);
                    setFeedbackText(sub.feedback || "");
                    setActionStatus("APPROVED");
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 text-xs font-medium hover:bg-emerald-600/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve
                </button>
                <button
                  onClick={() => {
                    setSelectedSubmissionId(sub.id);
                    setFeedbackText(sub.feedback || "");
                    setActionStatus("REJECTED");
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600/20 border border-rose-600/30 text-rose-400 text-xs font-medium hover:bg-rose-600/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/30 border border-slate-800/60 rounded-2xl">
          <p className="text-slate-400 text-sm">
            No student submissions found for review.
          </p>
        </div>
      )}

      {/* Review & Feedback Modal */}
      {selectedSubmissionId && actionStatus && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-violet-500" />
              {actionStatus === "APPROVED"
                ? "Approve Submission"
                : "Reject Submission"}
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Add constructive feedback or instructions for the student.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Feedback Notes
                </label>
                <textarea
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Great code structure, but check..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubmissionId(null);
                    setActionStatus(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isReviewing}
                  onClick={() => handleReviewSubmit(actionStatus)}
                  className={`px-5 py-2 rounded-xl text-white text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer ${
                    actionStatus === "APPROVED"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-rose-600 hover:bg-rose-700"
                  }`}
                >
                  {isReviewing && <Loader2 className="w-4 h-4 animate-spin" />}
                  Confirm{" "}
                  {actionStatus === "APPROVED" ? "Approval" : "Rejection"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
