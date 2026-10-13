import { apiClient } from "./api-client";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data: {
    admin: AdminUser;
    token: string;
  };
}

export interface MeResponse {
  success: boolean;
  data: {
    admin: AdminUser;
  };
}

export class AuthService {
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
      const res = await apiClient<MeResponse>("/api/auth/me", {
        method: "GET",
      });
      return res.data?.admin || null;
    } catch {
      return null;
    }
  }
}
