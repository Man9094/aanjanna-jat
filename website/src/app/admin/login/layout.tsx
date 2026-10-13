import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Anjana Jat Mahasabha",
  robots: { index: false, follow: false },
};

/**
 * The login page has its own layout that DOES NOT include
 * the admin sidebar/header (since the user isn't authenticated yet).
 */
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root min-h-screen bg-[#FAF9F7]">{children}</div>
  );
}
