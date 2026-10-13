"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Compass,
  FolderTree,
  Calendar,
  Megaphone,
  ScrollText,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";
import type { AdminRole } from "@/services/admin-session";
import { AdminAuthService } from "@/services/admin-auth.service";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  minRole: AdminRole;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, minRole: "VIEWER" },
  { label: "Members", href: "/admin/members", icon: Users, minRole: "VIEWER" },
  { label: "Gotras", href: "/admin/gotras", icon: Compass, minRole: "VIEWER" },
  { label: "Directory", href: "/admin/directory", icon: FolderTree, minRole: "VIEWER" },
  { label: "Events", href: "/admin/events", icon: Calendar, minRole: "EDITOR" },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone, minRole: "EDITOR" },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: ScrollText, minRole: "SUPER_ADMIN" },
  { label: "Settings", href: "/admin/settings", icon: Settings, minRole: "SUPER_ADMIN" },
];

const ROLE_HIERARCHY: AdminRole[] = ["VIEWER", "EDITOR", "ADMIN", "SUPER_ADMIN"];

function hasAccess(userRole: AdminRole, minRole: AdminRole): boolean {
  return ROLE_HIERARCHY.indexOf(userRole) >= ROLE_HIERARCHY.indexOf(minRole);
}

export default function AdminSidebar({ role }: { role: AdminRole }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const visibleItems = navItems.filter((item) => hasAccess(role, item.minRole));

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await AdminAuthService.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Brand Header */}
      <div className="flex items-center gap-3 border-b border-[#E5DDD3] px-5 py-5 bg-white">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#8B1E1E] shadow-sm">
          <Shield size={20} className="text-[#C8A24A]" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-[#1a1a1a] tracking-tight truncate">
            Admin Panel
          </h2>
          <p className="text-[10px] text-[#8B1E1E] font-semibold tracking-wide uppercase truncate">
            Anjana Jat Mahasabha
          </p>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
        {visibleItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-[#8B1E1E] text-white shadow-sm font-semibold"
                  : "text-[#555] hover:bg-[#8B1E1E]/8 hover:text-[#8B1E1E]"
              }`}
            >
              <item.icon size={18} className={isActive ? "text-[#C8A24A]" : "shrink-0"} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-[#E5DDD3] bg-white px-3 py-4">
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#555] transition-all hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
          >
            <LogOut size={18} className="shrink-0" />
            <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-[#8B1E1E] text-white shadow-lg lg:hidden"
        aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — mobile: drawer / desktop: fixed */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#FEFDFB] border-r border-[#E5DDD3] shadow-xl transition-transform duration-200 lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Admin sidebar"
      >
        {sidebarContent}
      </aside>
    </>
  );
}
