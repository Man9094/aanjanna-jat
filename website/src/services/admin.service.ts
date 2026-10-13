import { apiClient } from "./api-client";
import { AdminUser } from "./auth.service";

export interface DashboardStats {
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
  totalAnnouncements: number;
  totalDonations: number;
  pendingGotraSubmissions: number;
  totalGotras: number;
  totalVillages: number;
  totalEvents: number;
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

export class AdminService {
  static async getStats(): Promise<DashboardStats> {
    const res = await apiClient<{ success: boolean; data: DashboardStats }>(
      "/api/admin/stats",
      { method: "GET" }
    );
    return res.data;
  }

  static async listAdmins(): Promise<AdminUser[]> {
    const res = await apiClient<{ success: boolean; data: { admins: AdminUser[] } }>(
      "/api/admin/users",
      { method: "GET" }
    );
    return res.data.admins;
  }
}
