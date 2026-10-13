"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Plus,
  MapPin,
  Clock,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  AlertCircle,
  Loader2,
  CalendarDays,
} from "lucide-react";
import { EventItem, EventService } from "@/services/event.service";
import type { AdminRole } from "@/services/admin-session";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

interface EventsClientProps {
  initialEvents: EventItem[];
  adminRole: AdminRole;
}

export default function EventsClient({ initialEvents, adminRole }: EventsClientProps) {
  const router = useRouter();

  // Modals & form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EventItem | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [titleHi, setTitleHi] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<EventItem["category"]>("meeting");
  const [registrationLink, setRegistrationLink] = useState("");
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
    setDescription("");
    setDate("");
    setTime("");
    setLocation("");
    setCategory("meeting");
    setRegistrationLink("");
    setIsPublished(true);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date || !location || loading) return;
    setLoading(true);
    setError(null);
    try {
      await EventService.createEvent({
        title: title.trim(),
        titleHi: titleHi.trim() || undefined,
        description: description.trim(),
        date,
        time: time.trim() || undefined,
        location: location.trim(),
        category,
        registrationLink: registrationLink.trim() || undefined,
        isUpcoming: true,
        isPublished,
      });

      setSuccessMsg("Event created successfully");
      setShowAddModal(false);
      resetForm();
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || loading) return;
    setLoading(true);
    setError(null);
    try {
      await EventService.updateEvent(editingEvent.id, {
        title: title.trim(),
        titleHi: titleHi.trim() || undefined,
        description: description.trim(),
        date,
        time: time.trim() || undefined,
        location: location.trim(),
        category,
        registrationLink: registrationLink.trim() || undefined,
        isPublished,
      });

      setSuccessMsg("Event updated successfully");
      setEditingEvent(null);
      resetForm();
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (id: string) => {
    if (!canEdit || loading) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await EventService.togglePublish(id);
      setSuccessMsg(
        `Event ${updated.isPublished ? "published" : "unpublished"} successfully`
      );
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to toggle publish status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || loading) return;
    setLoading(true);
    setError(null);
    try {
      await EventService.deleteEvent(deleteTarget.id);
      setSuccessMsg(`Deleted event "${deleteTarget.title}"`);
      setDeleteTarget(null);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Events Management</h1>
          <p className="mt-1 text-sm text-[#777]">
            Schedule and publish community meetings, conferences, and cultural events.
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
            Create Event
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

      {/* Events Table / Card List */}
      <div className="rounded-xl border border-[#E5DDD3] bg-white shadow-sm overflow-x-auto">
        {initialEvents.length === 0 ? (
          <AdminEmptyState
            icon={CalendarDays}
            title="No events scheduled yet"
            titleHi="कोई कार्यक्रम निर्धारित नहीं है"
            description="Create an event to broadcast meetings, sammelans, or cultural gatherings to the community."
          />
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5DDD3] text-[11px] font-semibold uppercase text-[#999] tracking-wider">
                <th className="px-5 py-3">Event Details</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Date & Time</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Status</th>
                {canEdit && <th className="px-5 py-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {initialEvents.map((ev) => (
                <tr
                  key={ev.id}
                  className="border-b border-[#F0ECE6] last:border-0 hover:bg-[#FAF9F7] transition-colors"
                >
                  <td className="px-5 py-4 max-w-xs">
                    <p className="font-semibold text-[#1a1a1a]">{ev.title}</p>
                    {ev.titleHi && (
                      <p className="text-xs text-[#888] font-devanagari">{ev.titleHi}</p>
                    )}
                    <p className="mt-1 text-xs text-[#666] line-clamp-2">{ev.description}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-block rounded-full bg-[#8B1E1E]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#8B1E1E] capitalize">
                      {ev.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-[#555]">
                    <div className="flex items-center gap-1 font-medium text-[#1a1a1a]">
                      <Calendar size={13} className="text-[#8B1E1E]" />
                      {ev.date}
                    </div>
                    {ev.time && (
                      <div className="flex items-center gap-1 text-[#777] mt-0.5">
                        <Clock size={12} />
                        {ev.time}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-xs text-[#555]">
                    <div className="flex items-center gap-1">
                      <MapPin size={13} className="text-[#8B1E1E] shrink-0" />
                      <span className="truncate max-w-[150px]">{ev.location}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        ev.isPublished
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {ev.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  {canEdit && (
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(ev.id)}
                          className="rounded-md p-1.5 text-[#666] hover:bg-gray-100 transition-colors"
                          title={ev.isPublished ? "Unpublish event" : "Publish event"}
                        >
                          {ev.isPublished ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingEvent(ev);
                            setTitle(ev.title);
                            setTitleHi(ev.titleHi || "");
                            setDescription(ev.description);
                            setDate(ev.date);
                            setTime(ev.time || "");
                            setLocation(ev.location);
                            setCategory(ev.category);
                            setRegistrationLink(ev.registrationLink || "");
                            setIsPublished(ev.isPublished);
                            setError(null);
                          }}
                          className="rounded-md p-1.5 text-[#666] hover:bg-[#8B1E1E]/10 hover:text-[#8B1E1E] transition-colors"
                          title="Edit Event"
                        >
                          <Edit2 size={15} />
                        </button>
                        {canDelete && (
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(ev)}
                            className="rounded-md p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Event"
                          >
                            <Trash2 size={15} />
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

      {/* MODAL: Create Event */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-[#E5DDD3] max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#1a1a1a]">Create Community Event</h3>
            <p className="mt-1 text-xs text-[#777]">
              Publish an event announcement to the official public calendar.
            </p>

            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Title (EN)</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Annual Mahasabha Conference 2026"
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Title (HI / देवनागरी)</label>
                <input
                  type="text"
                  value={titleHi}
                  onChange={(e) => setTitleHi(e.target.value)}
                  placeholder="e.g. वार्षिक महासभा सम्मेलन २०२६"
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Description</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details, agenda, speaker details..."
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 10:00 AM - 4:00 PM"
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mahasabha Bhavan, Ahmedabad"
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  >
                    <option value="meeting">Meeting (बैठक)</option>
                    <option value="conference">Conference (सम्मेलन)</option>
                    <option value="cultural">Cultural (सांस्कृतिक)</option>
                    <option value="sports">Sports (खेलकूद)</option>
                    <option value="seminar">Seminar (संगोष्ठी)</option>
                    <option value="social">Social (सामाजिक)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Registration URL (Optional)</label>
                <input
                  type="url"
                  value={registrationLink}
                  onChange={(e) => setRegistrationLink(e.target.value)}
                  placeholder="https://..."
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="event-isPublished"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="h-4 w-4 rounded border-[#E5DDD3] text-[#8B1E1E] focus:ring-[#8B1E1E]"
                />
                <label htmlFor="event-isPublished" className="text-xs font-semibold text-[#333]">
                  Publish immediately to public website
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-[#8B1E1E] py-2.5 text-sm font-semibold text-white hover:bg-[#6B1515] transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Save Event"}
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

      {/* MODAL: Edit Event */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-[#E5DDD3] max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#1a1a1a]">Edit Event: {editingEvent.title}</h3>

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
                <label className="block text-xs font-semibold text-[#555] uppercase">Description</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  >
                    <option value="meeting">Meeting</option>
                    <option value="conference">Conference</option>
                    <option value="cultural">Cultural</option>
                    <option value="sports">Sports</option>
                    <option value="seminar">Seminar</option>
                    <option value="social">Social</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Registration URL</label>
                <input
                  type="url"
                  value={registrationLink}
                  onChange={(e) => setRegistrationLink(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-[#8B1E1E] py-2.5 text-sm font-semibold text-white hover:bg-[#6B1515] transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Update Event"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="rounded-lg border border-[#E5DDD3] px-4 py-2.5 text-sm font-semibold text-[#666] hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION: Delete Event */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl border border-[#E5DDD3]">
            <h3 className="text-lg font-bold text-red-700">Confirm Deletion</h3>
            <p className="mt-2 text-xs text-[#666]">
              Are you sure you want to permanently delete event <strong>&quot;{deleteTarget.title}&quot;</strong>?
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
