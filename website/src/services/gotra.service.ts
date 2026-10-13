import { apiClient } from "./api-client";

export interface Gotra {
  id: string;
  en: string;
  hi: string;
  gu?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface GotraSubmission {
  id: string;
  nameEn: string;
  nameHi?: string | null;
  nameGu?: string | null;
  submittedBy?: string | null;
  contact?: string | null;
  village?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  reviewNote?: string | null;
  createdAt: string;
}

export class GotraService {
  // Public
  static async getVerifiedGotras(): Promise<Gotra[]> {
    const res = await apiClient<{ success: boolean; data: { gotras: Gotra[] } }>("/api/gotras");
    return res.data?.gotras || [];
  }

  static async submitGotra(payload: {
    nameEn: string;
    nameHi?: string;
    nameGu?: string;
    submittedBy?: string;
    contact?: string;
    village?: string;
  }): Promise<GotraSubmission> {
    const res = await apiClient<{ success: boolean; data: { submission: GotraSubmission } }>(
      "/api/gotras/submit",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    return res.data.submission;
  }

  // Admin
  static async adminListGotras(search?: string): Promise<Gotra[]> {
    const res = await apiClient<{ success: boolean; data: { gotras: Gotra[] } }>(
      "/api/gotras/admin/all",
      {
        method: "GET",
        params: search ? { search } : undefined,
      }
    );
    return res.data?.gotras || [];
  }

  static async createGotra(payload: {
    id: string;
    en: string;
    hi: string;
    gu?: string;
  }): Promise<Gotra> {
    const res = await apiClient<{ success: boolean; data: { gotra: Gotra } }>(
      "/api/gotras/admin",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    return res.data.gotra;
  }

  static async updateGotra(
    id: string,
    payload: { en?: string; hi?: string; gu?: string }
  ): Promise<Gotra> {
    const res = await apiClient<{ success: boolean; data: { gotra: Gotra } }>(
      `/api/gotras/admin/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
    return res.data.gotra;
  }

  static async deleteGotra(id: string): Promise<{ deleted: boolean }> {
    return apiClient<{ success: boolean; data: { deleted: boolean } }>(
      `/api/gotras/admin/${id}`,
      {
        method: "DELETE",
      }
    ).then((res) => res.data);
  }

  static async adminListSubmissions(status?: string): Promise<GotraSubmission[]> {
    const res = await apiClient<{ success: boolean; data: { submissions: GotraSubmission[] } }>(
      "/api/gotras/admin/submissions",
      {
        method: "GET",
        params: status ? { status } : undefined,
      }
    );
    return res.data?.submissions || [];
  }

  static async approveSubmission(id: string, note?: string): Promise<GotraSubmission> {
    const res = await apiClient<{ success: boolean; data: { submission: GotraSubmission } }>(
      `/api/gotras/admin/submissions/${id}/approve`,
      {
        method: "POST",
        body: JSON.stringify({ note }),
      }
    );
    return res.data.submission;
  }

  static async rejectSubmission(id: string, note?: string): Promise<GotraSubmission> {
    const res = await apiClient<{ success: boolean; data: { submission: GotraSubmission } }>(
      `/api/gotras/admin/submissions/${id}/reject`,
      {
        method: "POST",
        body: JSON.stringify({ note }),
      }
    );
    return res.data.submission;
  }
}
