import { cookies } from "next/headers";
import { requireAdmin } from "@/services/admin-session";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Compass,
  FolderTree,
  Calendar,
  ScrollText,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

interface DashboardStatsData {
  totalMembers: number;
  pendingMembers: number;
  approvedMembers: number;
  rejectedMembers: number;
  recentMembers: Array<{
    id: string;
    memberId: string;
    name: string;
    gotra: string;
    village: string;
    status: string;
    createdAt: string;
  }>;
  pendingGotraSubmissions: number;
  totalGotras: number;
  totalVillages: number;
  totalEvents: number;
  totalAnnouncements: number;
  recentAuditLogs: Array<{
    id: string;
    action: string;
    targetType: string;
    targetId?: string | null;
    createdAt: string;
    admin?: {
      name: string;
      role: string;
    };
  }>;
}

const auditActionLabels: Record<string, { label: string; color: string }> = {
  MEMBER_APPROVED: { label: "Approved Member", color: "bg-emerald-100 text-emerald-800" },
  MEMBER_REJECTED: { label: "Rejected Member", color: "bg-red-100 text-red-800" },
  MEMBER_UPDATED: { label: "Updated Member", color: "bg-blue-100 text-blue-800" },
  GOTRA_CREATED: { label: "Added Gotra", color: "bg-purple-100 text-purple-800" },
  GOTRA_APPROVED: { label: "Approved Gotra", color: "bg-emerald-100 text-emerald-800" },
  GOTRA_REJECTED: { label: "Rejected Gotra", color: "bg-red-100 text-red-800" },
  DIRECTORY_CREATED: { label: "Added Directory Village", color: "bg-amber-100 text-amber-800" },
  DIRECTORY_UPDATED: { label: "Updated Directory", color: "bg-blue-100 text-blue-800" },
  EVENT_CREATED: { label: "Created Event", color: "bg-indigo-100 text-indigo-800" },
  EVENT_UPDATED: { label: "Updated Event", color: "bg-sky-100 text-sky-800" },
  ANNOUNCEMENT_CREATED: { label: "Created Announcement", color: "bg-teal-100 text-teal-800" },
  ADMIN_LOGIN_SUCCESS: { label: "Admin Login", color: "bg-gray-100 text-gray-700" },
};

export default async function AdminDashboard() {
  const admin = await requireAdmin("VIEWER");

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

  let stats: DashboardStatsData = {
    totalMembers: 0,
    pendingMembers: 0,
    approvedMembers: 0,
    rejectedMembers: 0,
    recentMembers: [],
    pendingGotraSubmissions: 0,
    totalGotras: 0,
    totalVillages: 0,
    totalEvents: 0,
    totalAnnouncements: 0,
    recentAuditLogs: [],
  };

  try {
    const res = await fetch(`${apiUrl}/api/admin/stats`, {
      headers: {
        Cookie: `admin_session=${sessionToken}`,
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      stats = { ...stats, ...(json.data || {}) };
    }
  } catch (err) {
    console.error("Failed to fetch dashboard stats from backend:", err);
  }

  const {
    totalMembers,
    pendingMembers,
    approvedMembers,
    rejectedMembers,
    recentMembers,
    pendingGotraSubmissions,
    totalGotras,
    totalVillages,
    totalEvents,
    recentAuditLogs,
  } = stats;

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-[#777]">
            Authenticated as <strong className="text-[#8B1E1E]">{admin.name}</strong> ({admin.role}). Live database metrics.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          label="Pending Applications"
          labelHi="लंबित सदस्यता अनुरोध"
          value={pendingMembers}
          icon={Clock}
          colorClass="bg-[#D35400]"
          iconColorClass="text-white"
          subtext="Awaiting verification"
        />
        <AdminStatCard
          label="Approved Members"
          labelHi="स्वीकृत सदस्य"
          value={approvedMembers}
          icon={UserCheck}
          colorClass="bg-emerald-700"
          iconColorClass="text-emerald-100"
          subtext="Official verified cards"
        />
        <AdminStatCard
          label="Rejected Applications"
          labelHi="अस्वीकृत अनुरोध"
          value={rejectedMembers}
          icon={UserX}
          colorClass="bg-red-700"
          iconColorClass="text-red-100"
          subtext="Denied with notes"
        />
        <AdminStatCard
          label="Total Registered"
          labelHi="कुल पंजीकृत सदस्य"
          value={totalMembers}
          icon={Users}
          colorClass="bg-[#8B1E1E]"
          iconColorClass="text-[#C8A24A]"
          subtext="All member records"
        />
        <AdminStatCard
          label="Pending Gotras"
          labelHi="लंबित गोत्र अनुमोदन"
          value={pendingGotraSubmissions}
          icon={Compass}
          colorClass="bg-amber-600"
          iconColorClass="text-amber-100"
          subtext="Submissions to review"
        />
        <AdminStatCard
          label="Verified Gotras"
          labelHi="सत्यापित गोत्र"
          value={totalGotras}
          icon={Compass}
          colorClass="bg-[#8B1E1E]"
          iconColorClass="text-[#C8A24A]"
          subtext="In official registry"
        />
        <AdminStatCard
          label="Directory Villages"
          labelHi="सत्यापित गाँव"
          value={totalVillages}
          icon={FolderTree}
          colorClass="bg-teal-700"
          iconColorClass="text-teal-100"
          subtext="In directory hierarchy"
        />
        <AdminStatCard
          label="Community Events"
          labelHi="सामुदायिक कार्यक्रम"
          value={totalEvents}
          icon={Calendar}
          colorClass="bg-indigo-700"
          iconColorClass="text-indigo-100"
          subtext="Scheduled events"
        />
      </div>

      {/* Two Column Section: Recent Applications & Recent Administrative Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Pending Applications */}
        <div className="rounded-xl border border-[#E5DDD3] bg-white shadow-sm flex flex-col">
          <div className="flex items-center justify-between border-b border-[#E5DDD3] px-5 py-4">
            <div>
              <h2 className="text-sm font-bold text-[#1a1a1a]">Recent Pending Applications</h2>
              <p className="text-xs text-[#888]">Members awaiting review</p>
            </div>
            <Link
              href="/admin/members?status=PENDING"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B1E1E] hover:underline"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex-1">
            {recentMembers.length === 0 ? (
              <AdminEmptyState
                icon={Clock}
                title="No pending membership applications"
                titleHi="कोई लंबित सदस्यता अनुरोध नहीं है"
                description="All submitted membership requests have been processed."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#E5DDD3] text-[11px] font-semibold uppercase text-[#999] tracking-wider">
                      <th className="px-5 py-3">Member ID</th>
                      <th className="px-5 py-3">Name</th>
                      <th className="px-5 py-3">Gotra</th>
                      <th className="px-5 py-3">Village</th>
                      <th className="px-5 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="border-b border-[#F0ECE6] last:border-0 hover:bg-[#FAF9F7] transition-colors"
                      >
                        <td className="px-5 py-3 font-mono text-xs font-semibold text-[#8B1E1E]">
                          {member.memberId}
                        </td>
                        <td className="px-5 py-3 font-medium text-[#1a1a1a] truncate max-w-[140px]">
                          {member.name}
                        </td>
                        <td className="px-5 py-3 text-xs text-[#666]">{member.gotra}</td>
                        <td className="px-5 py-3 text-xs text-[#666]">{member.village}</td>
                        <td className="px-5 py-3">
                          <Link
                            href={`/admin/members/${member.id}`}
                            className="text-xs font-semibold text-[#8B1E1E] hover:underline"
                          >
                            Review →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Recent Administrative Activity */}
        <div className="rounded-xl border border-[#E5DDD3] bg-white shadow-sm flex flex-col">
          <div className="flex items-center justify-between border-b border-[#E5DDD3] px-5 py-4">
            <div>
              <h2 className="text-sm font-bold text-[#1a1a1a]">Recent Administrative Activity</h2>
              <p className="text-xs text-[#888]">Live actions from immutable audit trail</p>
            </div>
            {admin.role === "SUPER_ADMIN" && (
              <Link
                href="/admin/audit-logs"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B1E1E] hover:underline"
              >
                All Logs <ArrowRight size={12} />
              </Link>
            )}
          </div>

          <div className="flex-1">
            {recentAuditLogs.length === 0 ? (
              <AdminEmptyState
                icon={ScrollText}
                title="No administrative activity recorded yet"
                titleHi="कोई प्रशासनिक गतिविधि दर्ज नहीं है"
                description="Administrative actions such as member approvals and content updates will appear here."
              />
            ) : (
              <div className="divide-y divide-[#F0ECE6]">
                {recentAuditLogs.map((log) => {
                  const badge = auditActionLabels[log.action] || {
                    label: log.action,
                    color: "bg-gray-100 text-gray-700",
                  };
                  return (
                    <div key={log.id} className="flex items-center justify-between px-5 py-3 text-xs hover:bg-[#FAF9F7] transition-colors">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`inline-block rounded-full px-2 py-0.5 font-semibold text-[10px] shrink-0 ${badge.color}`}>
                          {badge.label}
                        </span>
                        <span className="text-[#666] truncate font-medium">
                          by {log.admin?.name || "System"}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#aaa] shrink-0 ml-3">
                        {new Date(log.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
