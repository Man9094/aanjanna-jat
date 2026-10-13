import { cookies } from "next/headers";
import { requireAdmin } from "@/services/admin-session";
import { EventItem } from "@/services/event.service";
import EventsClient from "./EventsClient";

export const metadata = {
  title: "Events Management | Admin",
};

export default async function AdminEventsPage() {
  const admin = await requireAdmin("EDITOR");

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

  let events: EventItem[] = [];

  try {
    const res = await fetch(`${apiUrl}/api/events/admin`, {
      headers: {
        Cookie: `admin_session=${sessionToken}`,
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      events = json.data?.events || [];
    }
  } catch (err) {
    console.error("Failed to fetch events from backend:", err);
  }

  return <EventsClient initialEvents={events} adminRole={admin.role} />;
}
