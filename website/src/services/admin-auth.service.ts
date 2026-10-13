import { apiClient } from "./api-client";
import { AdminUser, LoginResponse } from "./auth.service";

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export class AdminAuthService {
  static async login(email: string, password: string): Promise<LoginResponse> {
    return apiClient<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  static async logout(): Promise<{ success: boolean }> {
    return apiClient<{ success: boolean }>("/api/auth/logout", {
      method: "POST",
    });
  }

  static async getMe(): Promise<AdminUser | null> {
    try {
      const res = await apiClient<{ success: boolean; data: { admin: AdminUser } }>(
        "/api/auth/me",
        { method: "GET" }
      );
      return res.data?.admin || null;
    } catch {
      return null;
    }
  }

  static async changePassword(payload: ChangePasswordPayload): Promise<{ success: boolean }> {
    return apiClient<{ success: boolean }>("/api/auth/change-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async listAdminUsers(): Promise<AdminUser[]> {
    const res = await apiClient<{ success: boolean; data: { admins: AdminUser[] } }>(
      "/api/admin/users",
      { method: "GET" }
    );
    return res.data?.admins || [];
  }

  static async createAdminUser(payload: {
    email: string;
    name: string;
    password: string;
    role: string;
  }): Promise<AdminUser> {
    const res = await apiClient<{ success: boolean; data: { admin: AdminUser } }>(
      "/api/admin/users",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    return res.data.admin;
  }
}
