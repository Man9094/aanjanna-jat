import React from "react";
import { LucideIcon } from "lucide-react";

interface AdminEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  titleHi?: string;
  action?: React.ReactNode;
}

export default function AdminEmptyState({
  icon: Icon,
  title,
  description,
  titleHi,
  action,
}: AdminEmptyStateProps) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF9F7] border border-[#E5DDD3] text-[#aaa]">
        <Icon size={24} />
      </div>
      <h3 className="text-sm font-bold text-[#333]">{title}</h3>
      {titleHi && <p className="mt-0.5 text-xs text-[#888] font-devanagari">{titleHi}</p>}
      <p className="mt-1 text-xs text-[#999] max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
