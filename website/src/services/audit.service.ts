import { apiClient } from "./api-client";

export interface AuditLogItem {
  id: string;
  action: string;
  targetType: string;
  targetId?: string | null;
  metadata?: string | null;
  adminId: string;
  createdAt: string;
  admin: {
    name: string;
    email: string;
    role: string;
  };
}

export interface ListAuditLogsResponse {
  success: boolean;
  data: {
    logs: AuditLogItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class AuditService {
  static async listLogs(page = 1, limit = 100): Promise<ListAuditLogsResponse["data"]> {
    const res = await apiClient<ListAuditLogsResponse>("/api/audit", {
      method: "GET",
      params: { page, limit },
    });
    return res.data;
  }
}
