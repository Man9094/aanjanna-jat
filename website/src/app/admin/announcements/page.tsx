import { cookies } from "next/headers";
import { requireAdmin } from "@/services/admin-session";
import { Announcement } from "@/services/announcement.service";
import AnnouncementsClient from "./AnnouncementsClient";

export const metadata = {
  title: "Announcements | Admin",
};

export default async function AdminAnnouncementsPage() {
  const admin = await requireAdmin("EDITOR");

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

  let announcements: Announcement[] = [];

  try {
    const res = await fetch(`${apiUrl}/api/announcements/admin`, {
      headers: {
        Cookie: `admin_session=${sessionToken}`,
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      announcements = json.data?.announcements || [];
    }
  } catch (err) {
    console.error("Failed to fetch announcements from backend:", err);
  }

  return (
    <AnnouncementsClient
      initialAnnouncements={announcements}
      adminRole={admin.role}
    />
  );
}
