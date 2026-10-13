import { apiClient } from "./api-client";

export interface EventItem {
  id: string;
  title: string;
  titleHi?: string | null;
  description: string;
  date: string;
  time?: string | null;
  location: string;
  category: "conference" | "cultural" | "sports" | "seminar" | "meeting" | "social";
  image?: string | null;
  isUpcoming: boolean;
  isPublished: boolean;
  registrationLink?: string | null;
  createdBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export class EventService {
  // Public
  static async getPublishedEvents(): Promise<EventItem[]> {
    const res = await apiClient<{ success: boolean; data: { events: EventItem[] } }>(
      "/api/events"
    );
    return res.data?.events || [];
  }

  // Admin
  static async adminListAll(): Promise<EventItem[]> {
    const res = await apiClient<{ success: boolean; data: { events: EventItem[] } }>(
      "/api/events/admin"
    );
    return res.data?.events || [];
  }

  static async createEvent(
    payload: Omit<EventItem, "id" | "createdBy" | "createdAt" | "updatedAt">
  ): Promise<EventItem> {
    const res = await apiClient<{ success: boolean; data: { event: EventItem } }>(
      "/api/events/admin",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    return res.data.event;
  }

  static async updateEvent(
    id: string,
    payload: Partial<EventItem>
  ): Promise<EventItem> {
    const res = await apiClient<{ success: boolean; data: { event: EventItem } }>(
      `/api/events/admin/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
    return res.data.event;
  }

  static async togglePublish(id: string): Promise<EventItem> {
    const res = await apiClient<{ success: boolean; data: { event: EventItem } }>(
      `/api/events/admin/${id}/publish`,
      {
        method: "PATCH",
      }
    );
    return res.data.event;
  }

  static async deleteEvent(id: string): Promise<{ deleted: boolean }> {
    return apiClient<{ success: boolean; data: { deleted: boolean } }>(
      `/api/events/admin/${id}`,
      {
        method: "DELETE",
      }
    ).then((res) => res.data);
  }
}
