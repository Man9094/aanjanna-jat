import React from "react";
import { LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  label: string;
  labelHi?: string;
  value: number | string;
  icon: LucideIcon;
  colorClass?: string;
  iconColorClass?: string;
  subtext?: string;
}

export default function AdminStatCard({
  label,
  labelHi,
  value,
  icon: Icon,
  colorClass = "bg-[#8B1E1E]",
  iconColorClass = "text-[#C8A24A]",
  subtext,
}: AdminStatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#E5DDD3] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorClass} shadow-sm`}
      >
        <Icon size={22} className={iconColorClass} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-[#1a1a1a] tracking-tight">{value}</p>
        <p className="text-xs font-semibold text-[#555] truncate">{label}</p>
        {labelHi && <p className="text-[10px] text-[#999] truncate font-devanagari">{labelHi}</p>}
        {subtext && <p className="text-[10px] text-[#888] mt-0.5 truncate">{subtext}</p>}
      </div>
    </div>
  );
}
