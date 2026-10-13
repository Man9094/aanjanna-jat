"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  KeyRound,
  UserPlus,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
  UserCheck,
} from "lucide-react";
import { AdminAuthService } from "@/services/admin-auth.service";
import { AdminUser } from "@/services/auth.service";
import type { AdminRole } from "@/services/admin-session";

interface SettingsClientProps {
  currentAdmin: AdminUser;
  adminList: AdminUser[];
}

const roleBadge: Record<string, string> = {
  SUPER_ADMIN: "bg-purple-100 text-purple-800",
  ADMIN: "bg-[#8B1E1E]/10 text-[#8B1E1E]",
  EDITOR: "bg-blue-100 text-blue-800",
  VIEWER: "bg-gray-100 text-gray-700",
};

export default function SettingsClient({
  currentAdmin,
  adminList,
}: SettingsClientProps) {
  const router = useRouter();

  // Change Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);

  // New Admin creation (SUPER_ADMIN only)
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminRole, setNewAdminRole] = useState<AdminRole>("ADMIN");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSuccess, setAdminSuccess] = useState<string | null>(null);

  const isSuperAdmin = currentAdmin.role === "SUPER_ADMIN";

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || passLoading) return;

    if (newPassword !== confirmPassword) {
      setPassError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPassError("New password must be at least 8 characters long.");
      return;
    }

    setPassLoading(true);
    setPassError(null);
    setPassSuccess(null);

    try {
      await AdminAuthService.changePassword({
        currentPassword,
        newPassword,
      });

      setPassSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPassError(err?.message || "Failed to update password.");
    } finally {
      setPassLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail || !newAdminName || !newAdminPassword || adminLoading) return;

    setAdminLoading(true);
    setAdminError(null);

    try {
      await AdminAuthService.createAdminUser({
        email: newAdminEmail.trim().toLowerCase(),
        name: newAdminName.trim(),
        password: newAdminPassword,
        role: newAdminRole,
      });

      setAdminSuccess(`Created admin account for ${newAdminEmail}`);
      setShowCreateAdminModal(false);
      setNewAdminEmail("");
      setNewAdminName("");
      setNewAdminPassword("");
      router.refresh();
    } catch (err: any) {
      setAdminError(err?.message || "Failed to create admin user.");
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Admin Settings</h1>
        <p className="mt-1 text-sm text-[#777]">
          Manage your administrative profile, security credentials, and system operators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card & Change Password */}
        <div className="lg:col-span-2 space-y-6">
          {/* Admin Profile */}
          <div className="rounded-xl border border-[#E5DDD3] bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider text-[11px] text-[#888]">
              Your Profile
            </h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B1E1E] text-white text-xl font-bold shadow-sm">
                {currentAdmin.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-[#1a1a1a]">{currentAdmin.name}</h3>
                <p className="text-sm text-[#666]">{currentAdmin.email}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      roleBadge[currentAdmin.role] ?? roleBadge.VIEWER
                    }`}
                  >
                    {currentAdmin.role}
                  </span>
                  <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    Active Session
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="rounded-xl border border-[#E5DDD3] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-1">
              <KeyRound size={18} className="text-[#8B1E1E]" />
              <h2 className="text-base font-bold text-[#1a1a1a]">Change Password</h2>
            </div>
            <p className="text-xs text-[#777] mb-5">
              Update your administrative password. Uses secure bcrypt hash (12 rounds) server-side.
            </p>

            {passSuccess && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{passSuccess}</span>
              </div>
            )}

            {passError && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                <AlertCircle size={16} className="shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">
                  Current Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 pr-10 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#555]"
                    tabIndex={-1}
                  >
                    {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">
                  New Password (min 8 characters)
                </label>
                <div className="relative mt-1">
                  <input
                    type={showNewPass ? "text" : "password"}
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    className="w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 pr-10 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#555]"
                    tabIndex={-1}
                  >
                    {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={passLoading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8B1E1E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6B1515] transition-colors disabled:opacity-50"
              >
                {passLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Updating…
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    Update Password
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Security Policy & Super Admin Controls */}
        <div className="space-y-6">
          {/* Security Standards */}
          <div className="rounded-xl border border-[#E5DDD3] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={18} className="text-[#8B1E1E]" />
              <h3 className="text-sm font-bold text-[#1a1a1a]">Security Standards</h3>
            </div>
            <ul className="space-y-2 text-xs text-[#666]">
              <li className="flex items-start gap-2">
                <span className="text-[#8B1E1E] font-bold">&bull;</span>
                <span>Session authentication enforced strictly via secure HttpOnly cookies.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B1E1E] font-bold">&bull;</span>
                <span>Protected operations require server-side RBAC validation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B1E1E] font-bold">&bull;</span>
                <span>Every privileged action is logged into the immutable audit database.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8B1E1E] font-bold">&bull;</span>
                <span>No hardcoded passwords or public registration routes exist.</span>
              </li>
            </ul>
          </div>

          {/* Super Admin User Management */}
          {isSuperAdmin && (
            <div className="rounded-xl border border-[#E5DDD3] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <UserCheck size={18} className="text-purple-700" />
                  <h3 className="text-sm font-bold text-[#1a1a1a]">Admin Accounts</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAdminError(null);
                    setShowCreateAdminModal(true);
                  }}
                  className="inline-flex items-center gap-1 rounded bg-[#8B1E1E] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#6B1515] transition-colors"
                >
                  <UserPlus size={12} />
                  Add
                </button>
              </div>

              {adminSuccess && (
                <p className="mb-2 text-xs text-emerald-700 font-medium">{adminSuccess}</p>
              )}

              <div className="divide-y divide-[#F0ECE6]">
                {adminList.map((adm) => (
                  <div key={adm.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-[#1a1a1a]">{adm.name}</p>
                      <p className="text-[11px] text-[#888]">{adm.email}</p>
                    </div>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        roleBadge[adm.role] ?? roleBadge.VIEWER
                      }`}
                    >
                      {adm.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Create New Admin Account (SUPER_ADMIN) */}
      {showCreateAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-[#E5DDD3]">
            <h3 className="text-lg font-bold text-[#1a1a1a]">Create Admin Account</h3>
            <p className="mt-1 text-xs text-[#777]">
              Only Super Admins can issue administrative credentials.
            </p>

            {adminError && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-800">
                <AlertCircle size={14} className="shrink-0" />
                <span>{adminError}</span>
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  placeholder="e.g. Ramesh Chaudhary"
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="e.g. ramesh@aanjanajat.org"
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">
                  Role
                </label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value as AdminRole)}
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                >
                  <option value="VIEWER">VIEWER (Read-only data access)</option>
                  <option value="EDITOR">EDITOR (Manage events & announcements)</option>
                  <option value="ADMIN">ADMIN (Approve members, gotras, directory)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full system control)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#555] uppercase">
                  Initial Password (min 8 chars)
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="Enter temporary password"
                  className="mt-1 w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#8B1E1E] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={adminLoading}
                  className="flex-1 rounded-lg bg-[#8B1E1E] py-2.5 text-sm font-semibold text-white hover:bg-[#6B1515] transition-colors disabled:opacity-50"
                >
                  {adminLoading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Create Account"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateAdminModal(false)}
                  className="rounded-lg border border-[#E5DDD3] px-4 py-2.5 text-sm font-semibold text-[#666] hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
