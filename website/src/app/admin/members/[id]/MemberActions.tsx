"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCheck, UserX, Loader2, AlertTriangle } from "lucide-react";
import { MemberService } from "@/services/member.service";

export default function MemberActions({
  memberId,
  memberName,
}: {
  memberId: string;
  memberName: string;
}) {
  const router = useRouter();
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleAction = async () => {
    if (!action || isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      if (action === "approve") {
        await MemberService.approveMember(memberId, note.trim() || undefined);
      } else {
        await MemberService.rejectMember(memberId, note.trim() || undefined);
      }

      // Refresh the page to show updated status
      router.refresh();
      setConfirmOpen(false);
      setAction(null);
      setNote("");
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (confirmOpen && action) {
    return (
      <div className="rounded-xl border border-[#E5DDD3] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle
            size={20}
            className={action === "approve" ? "text-emerald-600" : "text-red-600"}
          />
          <div>
            <h3 className="text-sm font-bold text-[#1a1a1a]">
              Confirm {action === "approve" ? "Approval" : "Rejection"}
            </h3>
            <p className="mt-1 text-xs text-[#777]">
              {action === "approve"
                ? `Approve ${memberName}'s membership application?`
                : `Reject ${memberName}'s membership application?`}
            </p>
          </div>
        </div>

        {/* Optional note */}
        <div>
          <label className="block text-xs font-semibold text-[#999] uppercase tracking-wide mb-1">
            Note (Optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={500}
            rows={2}
            placeholder="Add a review note..."
            className="w-full rounded-lg border border-[#E5DDD3] bg-[#FAF9F7] px-3 py-2 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:border-[#8B1E1E] focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/20 resize-none"
          />
        </div>

        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAction}
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-60 ${
              action === "approve"
                ? "bg-emerald-700 hover:bg-emerald-800"
                : "bg-red-700 hover:bg-red-800"
            }`}
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : action === "approve" ? (
              <UserCheck size={16} />
            ) : (
              <UserX size={16} />
            )}
            {isLoading ? "Processing..." : action === "approve" ? "Confirm Approve" : "Confirm Reject"}
          </button>
          <button
            type="button"
            onClick={() => {
              setConfirmOpen(false);
              setAction(null);
              setNote("");
              setError(null);
            }}
            disabled={isLoading}
            className="rounded-lg border border-[#E5DDD3] px-4 py-2.5 text-sm font-medium text-[#666] hover:bg-[#FAF9F7] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#E5DDD3] bg-white p-5 shadow-sm space-y-3">
      <h3 className="text-xs font-bold text-[#999] uppercase tracking-wide">
        Actions
      </h3>
      <button
        type="button"
        onClick={() => {
          setAction("approve");
          setConfirmOpen(true);
        }}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-800"
      >
        <UserCheck size={16} />
        Approve Member
      </button>
      <button
        type="button"
        onClick={() => {
          setAction("reject");
          setConfirmOpen(true);
        }}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition-all hover:bg-red-100"
      >
        <UserX size={16} />
        Reject Application
      </button>
    </div>
  );
}
