import { cookies } from "next/headers";
import { requireAdmin } from "@/services/admin-session";
import { AdminUser } from "@/services/auth.service";
import SettingsClient from "./SettingsClient";

export const metadata = {
  title: "Settings | Admin",
};

export default async function SettingsPage() {
  const currentAdmin = await requireAdmin("VIEWER");

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

  let adminList: AdminUser[] = [];

  if (currentAdmin.role === "SUPER_ADMIN") {
    try {
      const res = await fetch(`${apiUrl}/api/admin/users`, {
        headers: {
          Cookie: `admin_session=${sessionToken}`,
          Authorization: `Bearer ${sessionToken}`,
        },
        cache: "no-store",
      });

      if (res.ok) {
        const json = await res.json();
        adminList = json.data?.admins || [];
      }
    } catch (err) {
      console.error("Failed to fetch admin accounts from backend:", err);
    }
  }

  return (
    <SettingsClient
      currentAdmin={currentAdmin}
      adminList={adminList}
    />
  );
}
