import { apiClient } from "./api-client";

export interface Announcement {
  id: string;
  title: string;
  titleHi?: string | null;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export class AnnouncementService {
  static async listPublished(): Promise<Announcement[]> {
    const res = await apiClient<{ success: boolean; data: { announcements: Announcement[] } }>(
      "/api/announcements",
      { method: "GET" }
    );
    return res.data.announcements;
  }

  static async listAll(): Promise<Announcement[]> {
    const res = await apiClient<{ success: boolean; data: { announcements: Announcement[] } }>(
      "/api/announcements/admin",
      { method: "GET" }
    );
    return res.data.announcements;
  }

  static async create(payload: {
    title: string;
    titleHi?: string;
    content: string;
    isPublished?: boolean;
  }): Promise<Announcement> {
    const res = await apiClient<{ success: boolean; data: { announcement: Announcement } }>(
      "/api/announcements",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    return res.data.announcement;
  }

  static async update(
    id: string,
    payload: Partial<{
      title: string;
      titleHi?: string;
      content: string;
      isPublished: boolean;
    }>
  ): Promise<Announcement> {
    const res = await apiClient<{ success: boolean; data: { announcement: Announcement } }>(
      `/api/announcements/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      }
    );
    return res.data.announcement;
  }

  static async delete(id: string): Promise<{ deleted: boolean }> {
    return apiClient<{ success: boolean; data: { deleted: boolean } }>(
      `/api/announcements/${id}`,
      {
        method: "DELETE",
      }
    ).then((res) => res.data);
  }
}
