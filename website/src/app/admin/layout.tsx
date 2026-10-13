import type { Metadata } from "next";
import { requireAdmin } from "@/services/admin-session";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel | Anjana Jat Mahasabha",
    template: "%s | Admin — Anjana Jat Mahasabha",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authoritative server-side auth check via backend API
  const admin = await requireAdmin();

  return (
    <div className="admin-root flex min-h-screen bg-[#FAF9F7]">
      <AdminSidebar role={admin.role} />
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-64">
        <AdminHeader adminName={admin.name} adminRole={admin.role} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
