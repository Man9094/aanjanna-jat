import { cookies } from "next/headers";
import { requireAdmin } from "@/services/admin-session";
import { Gotra, GotraSubmission } from "@/services/gotra.service";
import GotrasClient from "./GotrasClient";

export const metadata = {
  title: "Gotra Management | Admin",
};

export default async function AdminGotrasPage() {
  const admin = await requireAdmin("VIEWER");

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

  let gotras: Gotra[] = [];
  let submissions: GotraSubmission[] = [];

  try {
    const [gotrasRes, subsRes] = await Promise.all([
      fetch(`${apiUrl}/api/gotras/admin/all`, {
        headers: {
          Cookie: `admin_session=${sessionToken}`,
          Authorization: `Bearer ${sessionToken}`,
        },
        cache: "no-store",
      }),
      fetch(`${apiUrl}/api/gotras/admin/submissions`, {
        headers: {
          Cookie: `admin_session=${sessionToken}`,
          Authorization: `Bearer ${sessionToken}`,
        },
        cache: "no-store",
      }),
    ]);

    if (gotrasRes.ok) {
      const json = await gotrasRes.json();
      gotras = json.data?.gotras || [];
    }

    if (subsRes.ok) {
      const json = await subsRes.json();
      submissions = json.data?.submissions || [];
    }
  } catch (err) {
    console.error("Failed to fetch gotras from backend:", err);
  }

  return (
    <GotrasClient
      initialGotras={gotras}
      initialSubmissions={submissions}
      adminRole={admin.role}
    />
  );
}
