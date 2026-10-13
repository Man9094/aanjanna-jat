"use client";

import { Shield } from "lucide-react";
import type { AdminRole } from "@/services/admin-session";

const roleLabels: Record<AdminRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  EDITOR: "Editor",
  VIEWER: "Viewer",
};

export default function AdminHeader({
  adminName,
  adminRole,
}: {
  adminName: string;
  adminRole: AdminRole;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#E5DDD3] bg-white/95 px-4 backdrop-blur-md md:px-6 lg:px-8">
      {/* Left spacer for mobile menu button */}
      <div className="w-12 lg:w-0" />

      {/* Right: Admin identity */}
      <div className="ml-auto flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-[#1a1a1a] leading-tight">{adminName}</p>
          <span className="inline-block rounded-sm bg-[#8B1E1E]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#8B1E1E] uppercase tracking-wide">
            {roleLabels[adminRole] || adminRole}
          </span>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8B1E1E] text-[#C8A24A] shadow-sm">
          <Shield size={18} />
        </div>
      </div>
    </header>
  );
}
