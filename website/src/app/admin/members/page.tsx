import { cookies } from "next/headers";
import { requireAdmin } from "@/services/admin-session";
import Link from "next/link";
import { Users, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Member } from "@/services/member.service";

const ITEMS_PER_PAGE = 20;

const statusBadge: Record<string, { bg: string; text: string; label: string }> = {
  PENDING: { bg: "bg-amber-100", text: "text-amber-800", label: "Pending" },
  APPROVED: { bg: "bg-emerald-100", text: "text-emerald-800", label: "Approved" },
  REJECTED: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
};

export default async function AdminMembersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin("VIEWER");

  const params = await searchParams;
  const status = typeof params.status === "string" ? params.status : undefined;
  const search = typeof params.search === "string" ? params.search : undefined;
  const page = Math.max(1, parseInt(typeof params.page === "string" ? params.page : "1", 10));

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

  let members: Member[] = [];
  let total = 0;
  let totalPages = 1;

  try {
    const query = new URLSearchParams();
    if (status) query.set("status", status);
    if (search) query.set("search", search);
    query.set("page", String(page));
    query.set("limit", String(ITEMS_PER_PAGE));

    const res = await fetch(`${apiUrl}/api/members?${query.toString()}`, {
      headers: {
        Cookie: `admin_session=${sessionToken}`,
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      members = json.data?.members || [];
      total = json.data?.total || 0;
      totalPages = json.data?.totalPages || 1;
    }
  } catch (err) {
    console.error("Failed to fetch members from backend API:", err);
  }

  // Build URL with preserved params
  function buildUrl(overrides: Record<string, string | undefined>) {
    const p = new URLSearchParams();
    if (overrides.status ?? status) p.set("status", (overrides.status ?? status)!);
    if (overrides.search ?? search) p.set("search", (overrides.search ?? search)!);
    if (overrides.page) p.set("page", overrides.page);
    return `/admin/members?${p.toString()}`;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Members</h1>
          <p className="mt-1 text-sm text-[#777]">
            {total} member{total !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <form action="/admin/members" method="GET" className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by name, ID, gotra, village..."
            className="w-full rounded-lg border border-[#E5DDD3] bg-white pl-9 pr-4 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:border-[#8B1E1E] focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/20"
          />
          {status && <input type="hidden" name="status" value={status} />}
        </form>

        {/* Status Filter */}
        <div className="flex gap-2">
          {[
            { key: undefined, label: "All" },
            { key: "PENDING", label: "Pending" },
            { key: "APPROVED", label: "Approved" },
            { key: "REJECTED", label: "Rejected" },
          ].map((f) => (
            <Link
              key={f.key ?? "all"}
              href={buildUrl({ status: f.key, page: "1" })}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                (f.key ?? undefined) === status
                  ? "bg-[#8B1E1E] text-white shadow-sm"
                  : "border border-[#E5DDD3] bg-white text-[#666] hover:border-[#8B1E1E]/30 hover:text-[#8B1E1E]"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <div className="rounded-xl border border-[#E5DDD3] bg-white shadow-sm overflow-x-auto">
        {members.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Users size={32} className="mx-auto mb-3 text-[#ccc]" />
            <p className="text-sm font-medium text-[#999]">
              No members found.
            </p>
            <p className="mt-1 text-xs text-[#bbb]">
              {search ? "Try adjusting your search query." : "No membership applications yet."}
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5DDD3] text-xs font-semibold uppercase text-[#999] tracking-wide">
                <th className="px-5 py-3">Member ID</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Gotra</th>
                <th className="px-5 py-3">Village</th>
                <th className="px-5 py-3 hidden md:table-cell">District</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 hidden lg:table-cell">Date</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => {
                const badge = statusBadge[member.status] ?? statusBadge.PENDING;
                return (
                  <tr
                    key={member.id}
                    className="border-b border-[#F0ECE6] last:border-0 hover:bg-[#FAF9F7] transition-colors"
                  >
                    <td className="px-5 py-3 font-mono text-xs font-semibold text-[#8B1E1E]">
                      {member.memberId}
                    </td>
                    <td className="px-5 py-3 font-medium text-[#1a1a1a] max-w-[180px] truncate">
                      {member.name}
                    </td>
                    <td className="px-5 py-3 text-[#666]">{member.gotra}</td>
                    <td className="px-5 py-3 text-[#666]">{member.village}</td>
                    <td className="px-5 py-3 text-[#666] hidden md:table-cell">
                      {member.district}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${badge.bg} ${badge.text}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-[#999] hidden lg:table-cell">
                      {new Date(member.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/members/${member.id}`}
                        className="text-xs font-semibold text-[#8B1E1E] hover:underline"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#999]">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={buildUrl({ page: String(page - 1) })}
                className="flex items-center gap-1 rounded-lg border border-[#E5DDD3] bg-white px-3 py-1.5 text-xs font-medium text-[#666] hover:border-[#8B1E1E]/30 hover:text-[#8B1E1E] transition-colors"
              >
                <ChevronLeft size={14} />
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={buildUrl({ page: String(page + 1) })}
                className="flex items-center gap-1 rounded-lg border border-[#E5DDD3] bg-white px-3 py-1.5 text-xs font-medium text-[#666] hover:border-[#8B1E1E]/30 hover:text-[#8B1E1E] transition-colors"
              >
                Next
                <ChevronRight size={14} />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
