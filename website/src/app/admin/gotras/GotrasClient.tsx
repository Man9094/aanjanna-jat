"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  Search,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Edit2,
  Trash2,
  Clock,
} from "lucide-react";
import { Gotra, GotraSubmission, GotraService } from "@/services/gotra.service";
import type { AdminRole } from "@/services/admin-session";

interface GotrasClientProps {
  initialGotras: Gotra[];
  initialSubmissions: GotraSubmission[];
  adminRole: AdminRole;
}

export default function GotrasClient({
  initialGotras,
  initialSubmissions,
  adminRole,
}: GotrasClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"verified" | "submissions">("verified");
  const [search, setSearch] = useState("");
  const [submissionFilter, setSubmissionFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("PENDING");

  // Modals & form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGotra, setEditingGotra] = useState<Gotra | null>(null);
  const [reviewAction, setReviewAction] = useState<{
    type: "approve" | "reject";
    submission: GotraSubmission;
  } | null>(null);

  // Form inputs
  const [formId, setFormId] = useState("");
  const [formEn, setFormEn] = useState("");
  const [formHi, setFormHi] = useState("");
  const [formGu, setFormGu] = useState("");
  const [reviewNote, setReviewNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const canModify = adminRole === "ADMIN" || adminRole === "SUPER_ADMIN";

  // Filtered lists
  const filteredGotras = initialGotras.filter(
    (g) =>
      g.en.toLowerCase().includes(search.toLowerCase()) ||
      g.hi.includes(search) ||
      g.id.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSubmissions = initialSubmissions.filter((s) => {
    if (submissionFilter === "ALL") return true;
    return s.status === submissionFilter;
  });

  const pendingSubmissionsCount = initialSubmissions.filter(
    (s) => s.status === "PENDING"
  ).length;

  // Handlers
  const handleCreateGotra = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formId || !formEn || !formHi || loading) return;
    setLoading(true);
    setError(null);
    try {
      await GotraService.createGotra({
        id: formId.trim().toLowerCase(),
        en: formEn.trim(),
        hi: formHi.trim(),
        gu: formGu.trim() || undefined,
      });
      setSuccessMsg("Gotra added to verified registry successfully");
      setShowAddModal(false);
      setFormId("");
      setFormEn("");
      setFormHi("");
      setFormGu("");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to add gotra");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGotra = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGotra || loading) return;
    setLoading(true);
    setError(null);
    try {
      await GotraService.updateGotra(editingGotra.id, {
        en: formEn.trim(),
        hi: formHi.trim(),
        gu: formGu.trim() || undefined,
      });
      setSuccessMsg("Gotra updated successfully");
      setEditingGotra(null);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to update gotra");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGotra = async (id: string, name: string) => {
    if (adminRole !== "SUPER_ADMIN") return;
    if (!confirm(`Are you sure you want to delete ${name} from verified gotras?`)) return;
    setLoading(true);
    setError(null);
    try {
      await GotraService.deleteGotra(id);
      setSuccessMsg(`Deleted ${name} from verified gotras`);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to delete gotra");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmission = async () => {
    if (!reviewAction || loading) return;
    setLoading(true);
    setError(null);
    try {
      if (reviewAction.type === "approve") {
        await GotraService.approveSubmission(
          reviewAction.submission.id,
          reviewNote.trim() || undefined
        );
        setSuccessMsg(`Approved gotra submission: ${reviewAction.submission.nameEn}`);
      } else {
        await GotraService.rejectSubmission(
          reviewAction.submission.id,
          reviewNote.trim() || undefined
        );
        setSuccessMsg(`Rejected gotra submission: ${reviewAction.submission.nameEn}`);
      }
      setReviewAction(null);
      setReviewNote("");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to review submission");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Gotra Management</h1>
          <p className="mt-1 text-sm text-[#777]">
            Manage official Aanjana Gotra registry and review member submissions.
          </p>
        </div>
        {canModify && (
          <button
            type="button"
            onClick={() => {
              setFormId("");
              setFormEn("");
              setFormHi("");
              setFormGu("");
              setError(null);
              setShowAddModal(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-[#8B1E1E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6B1515] transition-colors"
          >
            <Plus size={16} />
            Add Verified Gotra
          </button>
        )}
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <span>{successMsg}</span>
          <button
            type="button"
            onClick={() => setSuccessMsg(null)}
            className="text-xs font-bold text-emerald-600 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-xs font-bold text-red-600 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tab Controls */}
      <div className="flex border-b border-[#E5DDD3]">
        <button
          type="button"
          onClick={() => setActiveTab("verified")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${
            activeTab === "verified"
              ? "border-[#8B1E1E] text-[#8B1E1E]"
              : "border-transparent text-[#777] hover:text-[#1a1a1a]"
          }`}
        >
          <Compass size={18} />
          Verified Registry ({initialGotras.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("submissions")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${
            activeTab === "submissions"
              ? "border-[#8B1E1E] text-[#8B1E1E]"
              : "border-transparent text-[#777] hover:text-[#1a1a1a]"
          }`}
        >
          <Clock size={18} />
          Submissions Review
          {pendingSubmissionsCount > 0 && (
            <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
              {pendingSubmissionsCount}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: Verified Gotras */}
      {activeTab === "verified" && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gotra in English, Hindi, or ID..."
              className="w-full rounded-lg border border-[#E5DDD3] bg-white pl-9 pr-4 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:border-[#8B1E1E] focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/20"
            />
          </div>

          <div className="rounded-xl border border-[#E5DDD3] bg-white shadow-sm overflow-x-auto">
            {filteredGotras.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-[#999]">
                No gotras match your search criteria.
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E5DDD3] text-[11px] font-semibold uppercase text-[#999] tracking-wider">
                    <th className="px-5 py-3">Gotra ID</th>
                    <th className="px-5 py-3">English (EN)</th>
                    <th className="px-5 py-3">Hindi (HI)</th>
                    <th className="px-5 py-3">Gujarati (GU)</th>
                    {canModify && <th className="px-5 py-3 text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredGotras.map((g) => (
                    <tr
                      key={g.id}
                      className="border-b border-[#F0ECE6] last:border-0 hover:bg-[#FAF9F7] transition-colors"
                    >
                      <td className="px-5 py-3 font-mono text-xs font-semibold text-[#8B1E1E]">
                        {g.id}
                      </td>
                      <td className="px-5 py-3 font-medium text-[#1a1a1a]">{g.en}</td>
                      <td className="px-5 py-3 text-[#555] font-devanagari">{g.hi}</td>
                      <td className="px-5 py-3 text-[#777]">{g.gu || "—"}</td>
                      {canModify && (
                        <td className="px-5 py-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingGotra(g);
                                setFormEn(g.en);
                                setFormHi(g.hi);
                                setFormGu(g.gu || "");
                                setError(null);
                              }}
                              className="rounded-md p-1.5 text-[#666] hover:bg-[#8B1E1E]/10 hover:text-[#8B1E1E] transition-colors"
                              title="Edit Gotra"
                            >
                              <Edit2 size={14} />
                            </button>
                            {adminRole === "SUPER_ADMIN" && (
                              <button
                                type="button"
                                onClick={() => handleDeleteGotra(g.id, g.en)}
                                className="rounded-md p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete Gotra"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Submissions */}
      {activeTab === "submissions" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSubmissionFilter(filter)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  submissionFilter === filter
                    ? "bg-[#8B1E1E] text-white shadow-sm"
                    : "border border-[#E5DDD3] bg-white text-[#666] hover:text-[#8B1E1E]"
                }`}
              >
                {filter === "ALL" ? "All Submissions" : filter}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-[#E5DDD3] bg-white shadow-sm overflow-x-auto">
            {filteredSubmissions.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-[#999]">
                No gotra submissions in {submissionFilter.toLowerCase()} status.
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E5DDD3] text-[11px] font-semibold uppercase text-[#999] tracking-wider">
                    <th className="px-5 py-3">Gotra Name</th>
                    <th className="px-5 py-3">Hindi / Gujarati</th>
                    <th className="px-5 py-3">Submitted By</th>
                    <th className="px-5 py-3">Village / Contact</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Date</th>
                    {canModify && <th className="px-5 py-3 text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((sub) => (
                    <tr
                      key={sub.id}
                      className="border-b border-[#F0ECE6] last:border-0 hover:bg-[#FAF9F7] transition-colors"
                    >
                      <td className="px-5 py-3 font-semibold text-[#1a1a1a]">
                        {sub.nameEn}
                      </td>
                      <td className="px-5 py-3 text-xs text-[#666]">
                        {sub.nameHi || "—"}{sub.nameGu ? ` / ${sub.nameGu}` : ""}
                      </td>
                      <td className="px-5 py-3 text-xs text-[#555]">
                        {sub.submittedBy || "Anonymous"}
                      </td>
                      <td className="px-5 py-3 text-xs text-[#777]">
                        {sub.village || "—"} {sub.contact ? `(${sub.contact})` : ""}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            sub.status === "APPROVED"
                              ? "bg-emerald-100 text-emerald-800"
                              : sub.status === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-[#aaa]">
                        {new Date(sub.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </td>
                      {canModify && (
                        <td className="px-5 py-3 text-right">
                          {sub.status === "PENDING" ? (
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setReviewAction({ type: "approve", submission: sub });
                                  setReviewNote("");
                                  setError(null);
                                }}
                                className="inline-flex items-center gap-1 rounded bg-emerald-700 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors"
                              >
                                <CheckCircle2 size={12} /> Approve
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setReviewAction({ type: "reject", submission: sub });
                                  setReviewNote("");
                                  setError(null);
                                }}
                                className="inline-flex items-center gap-1 rounded border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                              >
                                <XCircle size={12} /> Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-[#aaa]">
                              {sub.reviewedBy ? `by ${sub.reviewedBy}` : "Reviewed"}
                            </span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Add Gotra */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-[#E5DDD3]">
            <h3 className="text-lg font-bold text-[#1a1a1a]">Add Verified Gotra</h3>
            <p className="mt-1 text-xs text-[#777]">
              This will add the gotra directly to the official Mahasabha verified registry.
            </p>

            <form onSubmit={handleCreateGotra} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">
                  Gotra ID (slug)
                </label>
                <input
                  type="text"
                  required
                  value={formId}
                  onChange={(e) => setFormId(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                  placeholder="e.g. solanki, chaudhari"
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">
                  English Name
                </label>
                <input
                  type="text"
                  required
                  value={formEn}
                  onChange={(e) => setFormEn(e.target.value)}
                  placeholder="e.g. Solanki"
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">
                  Hindi Name (देवनागरी)
                </label>
                <input
                  type="text"
                  required
                  value={formHi}
                  onChange={(e) => setFormHi(e.target.value)}
                  placeholder="e.g. सोलंकी"
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">
                  Gujarati Name (Optional)
                </label>
                <input
                  type="text"
                  value={formGu}
                  onChange={(e) => setFormGu(e.target.value)}
                  placeholder="e.g. સોલંકી"
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-[#8B1E1E] py-2.5 text-sm font-semibold text-white hover:bg-[#6B1515] transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Save Gotra"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-[#E5DDD3] px-4 py-2.5 text-sm font-semibold text-[#666] hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Gotra */}
      {editingGotra && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-[#E5DDD3]">
            <h3 className="text-lg font-bold text-[#1a1a1a]">Edit Gotra: {editingGotra.id}</h3>

            <form onSubmit={handleUpdateGotra} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">English Name</label>
                <input
                  type="text"
                  required
                  value={formEn}
                  onChange={(e) => setFormEn(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Hindi Name</label>
                <input
                  type="text"
                  required
                  value={formHi}
                  onChange={(e) => setFormHi(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Gujarati Name</label>
                <input
                  type="text"
                  value={formGu}
                  onChange={(e) => setFormGu(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-[#8B1E1E] py-2.5 text-sm font-semibold text-white hover:bg-[#6B1515] transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Update Gotra"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingGotra(null)}
                  className="rounded-lg border border-[#E5DDD3] px-4 py-2.5 text-sm font-semibold text-[#666] hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Review Submission */}
      {reviewAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-[#E5DDD3]">
            <h3 className="text-lg font-bold text-[#1a1a1a]">
              {reviewAction.type === "approve" ? "Approve Gotra Submission" : "Reject Gotra Submission"}
            </h3>
            <p className="mt-1 text-xs text-[#777]">
              Submission: <strong>{reviewAction.submission.nameEn}</strong> (
              {reviewAction.submission.nameHi || "No Hindi"})
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Review Note (Optional)</label>
                <textarea
                  rows={2}
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="Reason or verification details..."
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleReviewSubmission}
                  disabled={loading}
                  className={`flex-1 rounded-lg py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50 ${
                    reviewAction.type === "approve"
                      ? "bg-emerald-700 hover:bg-emerald-800"
                      : "bg-red-700 hover:bg-red-800"
                  }`}
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin mx-auto" />
                  ) : reviewAction.type === "approve" ? (
                    "Confirm Approval"
                  ) : (
                    "Confirm Rejection"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setReviewAction(null)}
                  className="rounded-lg border border-[#E5DDD3] px-4 py-2.5 text-sm font-semibold text-[#666] hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
