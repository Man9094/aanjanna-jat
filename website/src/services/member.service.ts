import { apiClient } from "./api-client";

export interface Member {
  id: string;
  memberId: string;
  name: string;
  fatherOrSpouse?: string | null;
  gotra: string;
  village: string;
  district: string;
  state: string;
  occupation?: string | null;
  bloodGroup?: string | null;
  contact: string;
  photoUrl?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  reviewNote?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterMemberInput {
  name: string;
  fatherOrSpouse?: string;
  gotra: string;
  village: string;
  district: string;
  state: string;
  occupation?: string;
  bloodGroup?: string;
  contact: string;
  photoUrl?: string;
}

export interface ListMembersResponse {
  success: boolean;
  data: {
    members: Member[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class MemberService {
  static async register(data: RegisterMemberInput) {
    return apiClient<{ success: boolean; data: { id: string; memberId: string; status: string } }>(
      "/api/members",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  static async listMembers(params: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<ListMembersResponse["data"]> {
    const res = await apiClient<ListMembersResponse>("/api/members", {
      method: "GET",
      params,
    });
    return res.data;
  }

  static async getMemberById(id: string): Promise<Member> {
    const res = await apiClient<{ success: boolean; data: { member: Member } }>(
      `/api/members/${id}`,
      { method: "GET" }
    );
    return res.data.member;
  }

  static async approveMember(id: string, note?: string) {
    return apiClient<{ success: boolean; data: { member: Member } }>(
      `/api/members/${id}/approve`,
      {
        method: "POST",
        body: JSON.stringify({ note: note || undefined }),
      }
    );
  }

  static async rejectMember(id: string, note?: string) {
    return apiClient<{ success: boolean; data: { member: Member } }>(
      `/api/members/${id}/reject`,
      {
        method: "POST",
        body: JSON.stringify({ note: note || undefined }),
      }
    );
  }

  static async verifyOfficialCard(memberId: string) {
    return apiClient<{ success: boolean; data: { verified: boolean; card: Partial<Member> } }>(
      `/api/members/verify/${memberId}`,
      { method: "GET" }
    );
  }
}
