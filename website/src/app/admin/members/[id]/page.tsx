import { cookies } from "next/headers";
import { requireAdmin, hasRole } from "@/services/admin-session";
import { notFound } from "next/navigation";
import Link from "next/link";
import MemberActions from "./MemberActions";
import { ArrowLeft, User, MapPin, Phone, Droplets, Calendar, Briefcase } from "lucide-react";
import { Member } from "@/services/member.service";

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const admin = await requireAdmin("VIEWER");
  const { id } = await params;

  // Validate ID format (CUID) — reject garbage
  if (!id || id.length < 10 || id.length > 40) {
    notFound();
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

  let member: Member | null = null;

  try {
    const res = await fetch(`${apiUrl}/api/members/${id}`, {
      headers: {
        Cookie: `admin_session=${sessionToken}`,
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      member = json.data?.member || null;
    }
  } catch (err) {
    console.error("Failed to fetch member detail from backend:", err);
  }

  if (!member) {
    notFound();
  }

  const canModify = hasRole(admin.role, "ADMIN");

  const statusStyles: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-800 border-amber-200",
    APPROVED: "bg-emerald-100 text-emerald-800 border-emerald-200",
    REJECTED: "bg-red-100 text-red-800 border-red-200",
  };

  const infoFields = [
    { icon: User, label: "Full Name / पूरा नाम", value: member.name },
    { icon: User, label: "Father/Spouse / पिता/पति", value: member.fatherOrSpouse || "—" },
    { icon: User, label: "Gotra / गोत्र", value: member.gotra },
    { icon: MapPin, label: "Village / गाँव", value: member.village },
    { icon: MapPin, label: "District / जिला", value: member.district },
    { icon: MapPin, label: "State / राज्य", value: member.state },
    { icon: Briefcase, label: "Occupation / व्यवसाय", value: member.occupation || "—" },
    { icon: Droplets, label: "Blood Group / रक्त समूह", value: member.bloodGroup || "—" },
    { icon: Phone, label: "Contact / मोबाइल", value: member.contact },
    { icon: Calendar, label: "Applied On", value: new Date(member.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) },
  ];

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <Link
        href="/admin/members"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#777] hover:text-[#8B1E1E] transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Members
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#1a1a1a]">{member.name}</h1>
            <span
              className={`inline-block rounded-full border px-3 py-0.5 text-xs font-semibold ${statusStyles[member.status] ?? ""}`}
            >
              {member.status}
            </span>
          </div>
          <p className="mt-1 font-mono text-sm font-semibold text-[#8B1E1E]">
            {member.memberId}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Member Information */}
        <div className="lg:col-span-2 rounded-xl border border-[#E5DDD3] bg-white shadow-sm">
          <div className="border-b border-[#E5DDD3] px-5 py-4">
            <h2 className="text-sm font-bold text-[#1a1a1a]">Member Information</h2>
            <p className="text-xs text-[#999]">Submitted application details</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {infoFields.map((field, idx) => (
              <div
                key={field.label}
                className={`flex items-start gap-3 px-5 py-4 ${
                  idx < infoFields.length - (infoFields.length % 2 === 0 ? 2 : 1)
                    ? "border-b border-[#F0ECE6]"
                    : ""
                }`}
              >
                <field.icon
                  size={16}
                  className="mt-0.5 shrink-0 text-[#8B1E1E]/60"
                />
                <div>
                  <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wide">
                    {field.label}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-[#1a1a1a]">
                    {field.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Panel */}
        <div className="space-y-4">
          {/* Review Status */}
          {member.reviewedAt && (
            <div className="rounded-xl border border-[#E5DDD3] bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold text-[#999] uppercase tracking-wide">
                Review Info
              </h3>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <span className="text-[#999]">Reviewed:</span>{" "}
                  <span className="font-medium text-[#1a1a1a]">
                    {new Date(member.reviewedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </p>
                {member.reviewNote && (
                  <p>
                    <span className="text-[#999]">Note:</span>{" "}
                    <span className="text-[#1a1a1a]">{member.reviewNote}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {canModify && member.status === "PENDING" && (
            <MemberActions memberId={member.id} memberName={member.name} />
          )}
        </div>
      </div>
    </div>
  );
}
