import { cookies } from "next/headers";
import { requireAdmin } from "@/services/admin-session";
import { ScrollText } from "lucide-react";
import { AuditLogItem } from "@/services/audit.service";

const actionColors: Record<string, string> = {
  MEMBER_APPROVED: "bg-emerald-100 text-emerald-700",
  MEMBER_REJECTED: "bg-red-100 text-red-700",
  MEMBER_UPDATED: "bg-blue-100 text-blue-700",
  ADMIN_LOGIN_SUCCESS: "bg-green-100 text-green-700",
  ADMIN_LOGIN_FAILURE: "bg-amber-100 text-amber-700",
  ADMIN_CREATED: "bg-purple-100 text-purple-700",
  ANNOUNCEMENT_CREATED: "bg-indigo-100 text-indigo-700",
  ANNOUNCEMENT_UPDATED: "bg-sky-100 text-sky-700",
};

export default async function AuditLogsPage() {
  // SUPER_ADMIN only — enforced server-side
  await requireAdmin("SUPER_ADMIN");

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

  let logs: AuditLogItem[] = [];

  try {
    const res = await fetch(`${apiUrl}/api/audit?limit=100`, {
      headers: {
        Cookie: `admin_session=${sessionToken}`,
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      logs = json.data?.logs || [];
    }
  } catch (err) {
    console.error("Failed to fetch audit logs from backend:", err);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Audit Logs</h1>
        <p className="mt-1 text-sm text-[#777]">
          Immutable record of administrative actions.
        </p>
      </div>

      <div className="rounded-xl border border-[#E5DDD3] bg-white shadow-sm overflow-x-auto">
        {logs.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <ScrollText size={32} className="mx-auto mb-3 text-[#ccc]" />
            <p className="text-sm font-medium text-[#999]">
              No audit logs recorded yet.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5DDD3] text-xs font-semibold uppercase text-[#999] tracking-wide">
                <th className="px-5 py-3">Timestamp</th>
                <th className="px-5 py-3">Action</th>
                <th className="px-5 py-3">Admin</th>
                <th className="px-5 py-3">Target</th>
                <th className="px-5 py-3 hidden lg:table-cell">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                const colorClass =
                  actionColors[log.action] ?? "bg-gray-100 text-gray-700";

                let details: Record<string, unknown> | null = null;
                if (log.metadata) {
                  try {
                    details = JSON.parse(log.metadata);
                  } catch {
                    /* ignore */
                  }
                }

                return (
                  <tr
                    key={log.id}
                    className="border-b border-[#F0ECE6] last:border-0 hover:bg-[#FAF9F7] transition-colors"
                  >
                    <td className="px-5 py-3 text-xs text-[#999] whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${colorClass}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[#666]">
                      {log.admin?.name || "System"}
                    </td>
                    <td className="px-5 py-3 text-xs text-[#777]">
                      {log.targetType}
                      {log.targetId && (
                        <span className="ml-1 font-mono text-[10px] text-[#bbb]">
                          {log.targetId.slice(0, 12)}…
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-xs text-[#999] hidden lg:table-cell max-w-[200px] truncate">
                      {details
                        ? Object.entries(details)
                            .filter(([k]) => k !== "password" && k !== "token")
                            .map(([k, v]) => `${k}: ${String(v)}`)
                            .join(", ")
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
