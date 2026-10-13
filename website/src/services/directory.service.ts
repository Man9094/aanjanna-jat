import { apiClient } from "./api-client";

export interface DirectoryLocation {
  id: string;
  stateKey: "gujarat" | "mp" | "rajasthan";
  stateNameEn: string;
  stateNameHi: string;
  stateNameGu?: string | null;
  districtEn: string;
  districtHi: string;
  districtGu?: string | null;
  talukaEn: string;
  talukaHi: string;
  talukaGu?: string | null;
  villageEn: string;
  villageHi: string;
  villageGu?: string | null;
  famousHub?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface DirectoryListResponse {
  locations: DirectoryLocation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class DirectoryService {
  // Public
  static async getActiveVillages(): Promise<DirectoryLocation[]> {
    const res = await apiClient<{ success: boolean; data: { villages: DirectoryLocation[] } }>(
      "/api/directory/villages"
    );
    return res.data?.villages || [];
  }

  // Admin
  static async adminList(options: {
    stateKey?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<DirectoryListResponse> {
    const res = await apiClient<{ success: boolean; data: DirectoryListResponse }>(
      "/api/directory/admin",
      {
        method: "GET",
        params: {
          stateKey: options.stateKey,
          search: options.search,
          page: options.page,
          limit: options.limit,
        },
      }
    );
    return res.data;
  }

  static async createLocation(payload: Omit<DirectoryLocation, "id" | "createdAt" | "updatedAt">): Promise<DirectoryLocation> {
    const res = await apiClient<{ success: boolean; data: { location: DirectoryLocation } }>(
      "/api/directory/admin",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    return res.data.location;
  }

  static async updateLocation(
    id: string,
    payload: Partial<DirectoryLocation>
  ): Promise<DirectoryLocation> {
    const res = await apiClient<{ success: boolean; data: { location: DirectoryLocation } }>(
      `/api/directory/admin/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
    return res.data.location;
  }

  static async deleteLocation(id: string): Promise<{ deleted: boolean }> {
    return apiClient<{ success: boolean; data: { deleted: boolean } }>(
      `/api/directory/admin/${id}`,
      {
        method: "DELETE",
      }
    ).then((res) => res.data);
  }
}
