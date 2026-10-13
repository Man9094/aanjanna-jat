import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminUser } from "./auth.service";

export type AdminRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";

const ROLE_HIERARCHY: AdminRole[] = ["VIEWER", "EDITOR", "ADMIN", "SUPER_ADMIN"];

export function hasRole(userRole: AdminRole, requiredRole: AdminRole): boolean {
  const userLevel = ROLE_HIERARCHY.indexOf(userRole);
  const requiredLevel = ROLE_HIERARCHY.indexOf(requiredRole);
  return userLevel >= requiredLevel;
}

/**
 * Validates the admin session against the authoritative backend server.
 * Returns null if not authenticated or expired.
 */
export async function getAdminSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;
    if (!sessionToken) return null;

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

    const res = await fetch(`${apiUrl}/api/auth/me`, {
      headers: {
        Cookie: `admin_session=${sessionToken}`,
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.admin || null;
  } catch {
    return null;
  }
}

/**
 * Requires admin session on server components, redirecting to /admin/login if unauthenticated.
 */
export async function requireAdmin(minRole: AdminRole = "VIEWER"): Promise<AdminUser> {
  const admin = await getAdminSession();

  if (!admin) {
    redirect("/admin/login");
  }

  if (!hasRole(admin.role, minRole)) {
    redirect("/admin?error=unauthorized");
  }

  return admin;
}
