"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FolderTree,
  Search,
  Plus,
  MapPin,
  Edit2,
  Trash2,
  AlertCircle,
  Loader2,
  Check,
} from "lucide-react";
import {
  DirectoryLocation,
  DirectoryService,
} from "@/services/directory.service";
import type { AdminRole } from "@/services/admin-session";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

interface DirectoryClientProps {
  initialLocations: DirectoryLocation[];
  total: number;
  adminRole: AdminRole;
}

export default function DirectoryClient({
  initialLocations,
  total,
  adminRole,
}: DirectoryClientProps) {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<DirectoryLocation | null>(null);
  const [deleteLocationTarget, setDeleteLocationTarget] = useState<DirectoryLocation | null>(null);

  // Form State
  const [formStateKey, setFormStateKey] = useState<"gujarat" | "mp" | "rajasthan">("gujarat");
  const [formDistrictEn, setFormDistrictEn] = useState("");
  const [formDistrictHi, setFormDistrictHi] = useState("");
  const [formTalukaEn, setFormTalukaEn] = useState("");
  const [formTalukaHi, setFormTalukaHi] = useState("");
  const [formVillageEn, setFormVillageEn] = useState("");
  const [formVillageHi, setFormVillageHi] = useState("");
  const [formFamousHub, setFormFamousHub] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const canModify = adminRole === "ADMIN" || adminRole === "SUPER_ADMIN";

  const stateNames: Record<string, { en: string; hi: string }> = {
    gujarat: { en: "Gujarat", hi: "गुजरात" },
    rajasthan: { en: "Rajasthan", hi: "राजस्थान" },
    mp: { en: "Madhya Pradesh", hi: "मध्य प्रदेश" },
  };

  const filtered = initialLocations.filter((loc) => {
    if (selectedState !== "ALL" && loc.stateKey !== selectedState) return false;
    if (search) {
      const q = search.toLowerCase();
      const matchEn =
        loc.villageEn.toLowerCase().includes(q) ||
        loc.districtEn.toLowerCase().includes(q) ||
        loc.talukaEn.toLowerCase().includes(q);
      const matchHi =
        loc.villageHi.includes(search) ||
        loc.districtHi.includes(search) ||
        loc.talukaHi.includes(search);
      return matchEn || matchHi;
    }
    return true;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDistrictEn || !formVillageEn || loading) return;
    setLoading(true);
    setError(null);
    try {
      const stateObj = stateNames[formStateKey];
      await DirectoryService.createLocation({
        stateKey: formStateKey,
        stateNameEn: stateObj.en,
        stateNameHi: stateObj.hi,
        districtEn: formDistrictEn.trim(),
        districtHi: formDistrictHi.trim() || formDistrictEn.trim(),
        talukaEn: formTalukaEn.trim() || formDistrictEn.trim(),
        talukaHi: formTalukaHi.trim() || formTalukaEn.trim(),
        villageEn: formVillageEn.trim(),
        villageHi: formVillageHi.trim() || formVillageEn.trim(),
        famousHub: formFamousHub.trim() || null,
        isActive: true,
      });

      setSuccessMsg(`Added village ${formVillageEn} to directory`);
      setShowAddModal(false);
      resetForm();
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to create directory entry");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLocation || loading) return;
    setLoading(true);
    setError(null);
    try {
      await DirectoryService.updateLocation(editingLocation.id, {
        districtEn: formDistrictEn.trim(),
        districtHi: formDistrictHi.trim(),
        talukaEn: formTalukaEn.trim(),
        talukaHi: formTalukaHi.trim(),
        villageEn: formVillageEn.trim(),
        villageHi: formVillageHi.trim(),
        famousHub: formFamousHub.trim() || null,
      });

      setSuccessMsg(`Updated ${formVillageEn}`);
      setEditingLocation(null);
      resetForm();
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to update entry");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteLocationTarget || loading) return;
    setLoading(true);
    setError(null);
    try {
      await DirectoryService.deleteLocation(deleteLocationTarget.id);
      setSuccessMsg(`Deleted ${deleteLocationTarget.villageEn} from directory`);
      setDeleteLocationTarget(null);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to delete entry");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormDistrictEn("");
    setFormDistrictHi("");
    setFormTalukaEn("");
    setFormTalukaHi("");
    setFormVillageEn("");
    setFormVillageHi("");
    setFormFamousHub("");
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Village Directory</h1>
          <p className="mt-1 text-sm text-[#777]">
            State &rarr; District &rarr; Taluka &rarr; Village verified community registry.
          </p>
        </div>
        {canModify && (
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
            Add Verified Village
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

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex gap-2">
          {[
            { key: "ALL", label: "All States" },
            { key: "gujarat", label: "Gujarat" },
            { key: "rajasthan", label: "Rajasthan" },
            { key: "mp", label: "Madhya Pradesh" },
          ].map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSelectedState(s.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedState === s.key
                  ? "bg-[#8B1E1E] text-white shadow-sm"
                  : "border border-[#E5DDD3] bg-white text-[#666] hover:text-[#8B1E1E]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search village, taluka, district..."
            className="w-full rounded-lg border border-[#E5DDD3] bg-white pl-9 pr-4 py-2 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:border-[#8B1E1E] focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/20"
          />
        </div>
      </div>

      {/* Directory Table */}
      <div className="rounded-xl border border-[#E5DDD3] bg-white shadow-sm overflow-x-auto">
        {filtered.length === 0 ? (
          <AdminEmptyState
            icon={FolderTree}
            title={total === 0 ? "No verified villages in directory yet" : "No matching villages found"}
            titleHi="सत्यापित गाँव की सूची अभी खाली है"
            description={
              total === 0
                ? "The directory feature awaits official verified village records from the Mahasabha office."
                : "Try adjusting your state filter or search terms."
            }
          />
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5DDD3] text-[11px] font-semibold uppercase text-[#999] tracking-wider">
                <th className="px-5 py-3">State</th>
                <th className="px-5 py-3">District</th>
                <th className="px-5 py-3">Taluka / Tehsil</th>
                <th className="px-5 py-3">Village</th>
                <th className="px-5 py-3">Famous Hub</th>
                {canModify && <th className="px-5 py-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((loc) => (
                <tr
                  key={loc.id}
                  className="border-b border-[#F0ECE6] last:border-0 hover:bg-[#FAF9F7] transition-colors"
                >
                  <td className="px-5 py-3">
                    <span className="inline-block rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[11px] font-semibold text-amber-800 capitalize">
                      {loc.stateKey}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-medium text-[#1a1a1a]">
                    {loc.districtEn}
                    <span className="block text-xs text-[#888] font-devanagari">{loc.districtHi}</span>
                  </td>
                  <td className="px-5 py-3 text-xs text-[#555]">
                    {loc.talukaEn}
                    <span className="block text-[11px] text-[#999] font-devanagari">{loc.talukaHi}</span>
                  </td>
                  <td className="px-5 py-3 font-semibold text-[#8B1E1E]">
                    {loc.villageEn}
                    <span className="block text-xs font-normal text-[#555] font-devanagari">{loc.villageHi}</span>
                  </td>
                  <td className="px-5 py-3 text-xs text-[#777]">
                    {loc.famousHub || "—"}
                  </td>
                  {canModify && (
                    <td className="px-5 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingLocation(loc);
                            setFormDistrictEn(loc.districtEn);
                            setFormDistrictHi(loc.districtHi);
                            setFormTalukaEn(loc.talukaEn);
                            setFormTalukaHi(loc.talukaHi);
                            setFormVillageEn(loc.villageEn);
                            setFormVillageHi(loc.villageHi);
                            setFormFamousHub(loc.famousHub || "");
                            setError(null);
                          }}
                          className="rounded-md p-1.5 text-[#666] hover:bg-[#8B1E1E]/10 hover:text-[#8B1E1E] transition-colors"
                          title="Edit Location"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteLocationTarget(loc)}
                          className="rounded-md p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Location"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL: Add Village */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-[#E5DDD3]">
            <h3 className="text-lg font-bold text-[#1a1a1a]">Add Verified Village Record</h3>
            <p className="mt-1 text-xs text-[#777]">
              Hierarchy: State &rarr; District &rarr; Taluka/Tehsil &rarr; Village
            </p>

            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">State</label>
                <select
                  value={formStateKey}
                  onChange={(e) => setFormStateKey(e.target.value as any)}
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                >
                  <option value="gujarat">Gujarat (गुजरात)</option>
                  <option value="rajasthan">Rajasthan (राजस्थान)</option>
                  <option value="mp">Madhya Pradesh (मध्य प्रदेश)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">District (EN)</label>
                  <input
                    type="text"
                    required
                    value={formDistrictEn}
                    onChange={(e) => setFormDistrictEn(e.target.value)}
                    placeholder="e.g. Patan"
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">District (HI)</label>
                  <input
                    type="text"
                    value={formDistrictHi}
                    onChange={(e) => setFormDistrictHi(e.target.value)}
                    placeholder="e.g. पाटण"
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Taluka/Tehsil (EN)</label>
                  <input
                    type="text"
                    required
                    value={formTalukaEn}
                    onChange={(e) => setFormTalukaEn(e.target.value)}
                    placeholder="e.g. Sidhpur"
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Taluka (HI)</label>
                  <input
                    type="text"
                    value={formTalukaHi}
                    onChange={(e) => setFormTalukaHi(e.target.value)}
                    placeholder="e.g. सिद्धपुर"
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Village (EN)</label>
                  <input
                    type="text"
                    required
                    value={formVillageEn}
                    onChange={(e) => setFormVillageEn(e.target.value)}
                    placeholder="e.g. Dethali"
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Village (HI)</label>
                  <input
                    type="text"
                    value={formVillageHi}
                    onChange={(e) => setFormVillageHi(e.target.value)}
                    placeholder="e.g. देथली"
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Famous Hub / Landmark (Optional)</label>
                <input
                  type="text"
                  value={formFamousHub}
                  onChange={(e) => setFormFamousHub(e.target.value)}
                  placeholder="e.g. Community Temple / Mahasabha Bhavan"
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-[#8B1E1E] py-2.5 text-sm font-semibold text-white hover:bg-[#6B1515] transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Save Village"}
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

      {/* MODAL: Edit Village */}
      {editingLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-[#E5DDD3]">
            <h3 className="text-lg font-bold text-[#1a1a1a]">Edit Village: {editingLocation.villageEn}</h3>

            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">District (EN)</label>
                  <input
                    type="text"
                    required
                    value={formDistrictEn}
                    onChange={(e) => setFormDistrictEn(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">District (HI)</label>
                  <input
                    type="text"
                    value={formDistrictHi}
                    onChange={(e) => setFormDistrictHi(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Taluka (EN)</label>
                  <input
                    type="text"
                    required
                    value={formTalukaEn}
                    onChange={(e) => setFormTalukaEn(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Taluka (HI)</label>
                  <input
                    type="text"
                    value={formTalukaHi}
                    onChange={(e) => setFormTalukaHi(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Village (EN)</label>
                  <input
                    type="text"
                    required
                    value={formVillageEn}
                    onChange={(e) => setFormVillageEn(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#555] uppercase">Village (HI)</label>
                  <input
                    type="text"
                    value={formVillageHi}
                    onChange={(e) => setFormVillageHi(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">Famous Hub</label>
                <input
                  type="text"
                  value={formFamousHub}
                  onChange={(e) => setFormFamousHub(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-[#8B1E1E] py-2.5 text-sm font-semibold text-white hover:bg-[#6B1515] transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Update Village"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingLocation(null)}
                  className="rounded-lg border border-[#E5DDD3] px-4 py-2.5 text-sm font-semibold text-[#666] hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION: Delete Village */}
      {deleteLocationTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl border border-[#E5DDD3]">
            <h3 className="text-lg font-bold text-red-700">Confirm Deletion</h3>
            <p className="mt-2 text-xs text-[#666]">
              Are you sure you want to remove <strong>{deleteLocationTarget.villageEn}</strong> ({deleteLocationTarget.districtEn}, {deleteLocationTarget.stateKey}) from the verified directory?
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
                onClick={() => setDeleteLocationTarget(null)}
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
