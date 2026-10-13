import { cookies } from "next/headers";
import { requireAdmin } from "@/services/admin-session";
import { DirectoryLocation } from "@/services/directory.service";
import DirectoryClient from "./DirectoryClient";

export const metadata = {
  title: "Directory Management | Admin",
};

export default async function AdminDirectoryPage() {
  const admin = await requireAdmin("VIEWER");

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

  let locations: DirectoryLocation[] = [];
  let total = 0;

  try {
    const res = await fetch(`${apiUrl}/api/directory/admin?limit=200`, {
      headers: {
        Cookie: `admin_session=${sessionToken}`,
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      locations = json.data?.locations || [];
      total = json.data?.total || 0;
    }
  } catch (err) {
    console.error("Failed to fetch directory locations from backend:", err);
  }

  return (
    <DirectoryClient
      initialLocations={locations}
      total={total}
      adminRole={admin.role}
    />
  );
}
