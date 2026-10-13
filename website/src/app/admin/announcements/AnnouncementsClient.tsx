"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Megaphone,
  Plus,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Announcement, AnnouncementService } from "@/services/announcement.service";
import type { AdminRole } from "@/services/admin-session";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

interface AnnouncementsClientProps {
  initialAnnouncements: Announcement[];
  adminRole: AdminRole;
}

export default function AnnouncementsClient({
  initialAnnouncements,
  adminRole,
}: AnnouncementsClientProps) {
  const router = useRouter();

  // Modals & forms
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Announcement | null>(null);

  const [title, setTitle] = useState("");
  const [titleHi, setTitleHi] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const canEdit =
    adminRole === "EDITOR" || adminRole === "ADMIN" || adminRole === "SUPER_ADMIN";
  const canDelete = adminRole === "ADMIN" || adminRole === "SUPER_ADMIN";

  const resetForm = () => {
    setTitle("");
    setTitleHi("");
    setContent("");
    setIsPublished(true);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || loading) return;
    setLoading(true);
    setError(null);
    try {
      await AnnouncementService.create({
        title: title.trim(),
        titleHi: titleHi.trim() || undefined,
        content: content.trim(),
        isPublished,
      });

      setSuccessMsg("Announcement created successfully");
      setShowAddModal(false);
      resetForm();
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnn || loading) return;
    setLoading(true);
    setError(null);
    try {
      await AnnouncementService.update(editingAnn.id, {
        title: title.trim(),
        titleHi: titleHi.trim() || undefined,
        content: content.trim(),
        isPublished,
      });

      setSuccessMsg("Announcement updated successfully");
      setEditingAnn(null);
      resetForm();
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to update announcement");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (ann: Announcement) => {
    if (!canEdit || loading) return;
    setLoading(true);
    setError(null);
    try {
      await AnnouncementService.update(ann.id, {
        isPublished: !ann.isPublished,
      });
      setSuccessMsg(
        `Announcement ${!ann.isPublished ? "published" : "unpublished"} successfully`
      );
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to update publish status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || loading) return;
    setLoading(true);
    setError(null);
    try {
      await AnnouncementService.delete(deleteTarget.id);
      setSuccessMsg(`Deleted announcement "${deleteTarget.title}"`);
      setDeleteTarget(null);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to delete announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Announcements</h1>
          <p className="mt-1 text-sm text-[#777]">
            Publish community announcements, executive notices, and press releases.
          </p>
        </div>
        {canEdit && (
          <button
            type="button"
            onClick={() => {
              resetForm();
              setError(null);
              setShowAddModal(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-[#8B1E1E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6B1515] transition-colors"
          >
            <Plus size={16} />
            New Announcement
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

      {/* Announcements List */}
      <div className="rounded-xl border border-[#E5DDD3] bg-white shadow-sm overflow-hidden">
        {initialAnnouncements.length === 0 ? (
          <AdminEmptyState
            icon={Megaphone}
            title="No announcements published yet"
            titleHi="कोई घोषणा प्रकाशित नहीं हुई है"
            description="Use announcements to share important messages and verified notices with members."
          />
        ) : (
          <div className="divide-y divide-[#F0ECE6]">
            {initialAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 hover:bg-[#FAF9F7] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-semibold text-sm text-[#1a1a1a] truncate">
                      {ann.title}
                    </h3>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        ann.isPublished
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {ann.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  {ann.titleHi && (
                    <p className="mt-0.5 text-xs text-[#888] font-devanagari">
                      {ann.titleHi}
                    </p>
                  )}
                  <p className="mt-1.5 text-xs text-[#666] line-clamp-2">{ann.content}</p>
                  <p className="mt-1 text-[11px] text-[#aaa]">
                    {new Date(ann.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {canEdit && (
                  <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(ann)}
                      className="rounded-md p-1.5 text-[#666] hover:bg-gray-100 transition-colors"
                      title={ann.isPublished ? "Unpublish" : "Publish"}
                    >
                      {ann.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAnn(ann);
                        setTitle(ann.title);
                        setTitleHi(ann.titleHi || "");
                        setContent(ann.content);
                        setIsPublished(ann.isPublished);
                        setError(null);
                      }}
                      className="rounded-md p-1.5 text-[#666] hover:bg-[#8B1E1E]/10 hover:text-[#8B1E1E] transition-colors"
                      title="Edit Announcement"
                    >
                      <Edit2 size={16} />
                    </button>
                    {canDelete && (
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(ann)}
                        className="rounded-md p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Announcement"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL: Create Announcement */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-[#E5DDD3]">
            <h3 className="text-lg font-bold text-[#1a1a1a]">New Announcement</h3>

            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Title (EN)</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Executive Meeting Notice"
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Title (HI / देवनागरी)</label>
                <input
                  type="text"
                  value={titleHi}
                  onChange={(e) => setTitleHi(e.target.value)}
                  placeholder="e.g. कार्यकारिणी बैठक सूचना"
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Content</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Announcement text, details, guidelines..."
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ann-isPublished"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="h-4 w-4 rounded border-[#E5DDD3] text-[#8B1E1E] focus:ring-[#8B1E1E]"
                />
                <label htmlFor="ann-isPublished" className="text-xs font-semibold text-[#333]">
                  Publish immediately to public website
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-[#8B1E1E] py-2.5 text-sm font-semibold text-white hover:bg-[#6B1515] transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Save Announcement"}
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

      {/* MODAL: Edit Announcement */}
      {editingAnn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-[#E5DDD3]">
            <h3 className="text-lg font-bold text-[#1a1a1a]">Edit Announcement</h3>

            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Title (EN)</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Title (HI)</label>
                <input
                  type="text"
                  value={titleHi}
                  onChange={(e) => setTitleHi(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Content</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ann-edit-isPublished"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="h-4 w-4 rounded border-[#E5DDD3] text-[#8B1E1E] focus:ring-[#8B1E1E]"
                />
                <label htmlFor="ann-edit-isPublished" className="text-xs font-semibold text-[#333]">
                  Published
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-[#8B1E1E] py-2.5 text-sm font-semibold text-white hover:bg-[#6B1515] transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Update Announcement"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingAnn(null)}
                  className="rounded-lg border border-[#E5DDD3] px-4 py-2.5 text-sm font-semibold text-[#666] hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION: Delete Announcement */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl border border-[#E5DDD3]">
            <h3 className="text-lg font-bold text-red-700">Confirm Deletion</h3>
            <p className="mt-2 text-xs text-[#666]">
              Permanently delete announcement <strong>&quot;{deleteTarget.title}&quot;</strong>?
            </p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 rounded-lg bg-red-700 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Confirm Delete"}
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-[#E5DDD3] px-4 py-2.5 text-sm font-semibold text-[#666] hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
