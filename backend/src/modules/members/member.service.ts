import { prisma } from "../../config/database";
import { AppError } from "../../shared/errors/AppError";
import { AuditService } from "../audit/audit.service";

export interface CreateMemberInput {
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

export class MemberService {
  /**
   * Generates a unique sequential/random Member ID in format: AJM-YYYY-XXXX
   */
  private static async generateMemberId(): Promise<string> {
    const year = new Date().getFullYear();
    for (let attempts = 0; attempts < 10; attempts++) {
      const rand = Math.floor(1000 + Math.random() * 9000);
      const candidate = `AJM-${year}-${rand}`;
      const existing = await prisma.member.findUnique({
        where: { memberId: candidate },
      });
      if (!existing) return candidate;
    }
    // Fallback timestamp-based if collisions occur
    return `AJM-${year}-${Date.now().toString().slice(-4)}`;
  }

  /**
   * Public membership registration.
   * Forces status to PENDING. Mass assignment protected.
   */
  static async registerMember(data: CreateMemberInput) {
    const memberId = await this.generateMemberId();

    const member = await prisma.member.create({
      data: {
        memberId,
        name: data.name.trim(),
        fatherOrSpouse: data.fatherOrSpouse?.trim() || null,
        gotra: data.gotra.trim(),
        village: data.village.trim(),
        district: data.district.trim(),
        state: data.state.trim(),
        occupation: data.occupation?.trim() || null,
        bloodGroup: data.bloodGroup?.trim() || null,
        contact: data.contact.trim(),
        photoUrl: data.photoUrl?.trim() || null,
        status: "PENDING", // Always PENDING for new applications
      },
    });

    return {
      id: member.id,
      memberId: member.memberId,
      name: member.name,
      status: member.status,
      message: "Application submitted successfully and is pending administrative review.",
    };
  }

  /**
   * Admin list of members with search and filter.
   */
  static async listMembers(query: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Math.max(1, query.page || 1);
    const limit = Math.max(1, Math.min(100, query.limit || 20));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.status && ["PENDING", "APPROVED", "REJECTED"].includes(query.status)) {
      where.status = query.status;
    }

    if (query.search && query.search.trim().length > 0) {
      const term = query.search.trim();
      where.OR = [
        { name: { contains: term } },
        { memberId: { contains: term } },
        { gotra: { contains: term } },
        { village: { contains: term } },
        { contact: { contains: term } },
      ];
    }

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.member.count({ where }),
    ]);

    return {
      members,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getMemberById(id: string) {
    const member = await prisma.member.findUnique({
      where: { id },
    });

    if (!member) {
      throw new AppError("Member record not found.", 404);
    }

    return member;
  }

  static async approveMember(id: string, reviewerId: string, note?: string) {
    const member = await prisma.member.findUnique({ where: { id } });

    if (!member) {
      throw new AppError("Member not found.", 404);
    }

    if (member.status !== "PENDING") {
      throw new AppError(`Cannot approve: member is already ${member.status}.`, 409);
    }

    const updated = await prisma.member.update({
      where: { id },
      data: {
        status: "APPROVED",
        reviewedBy: reviewerId,
        reviewedAt: new Date(),
        reviewNote: note?.trim() || null,
      },
    });

    await AuditService.log({
      action: "MEMBER_APPROVED",
      targetType: "MEMBER",
      targetId: id,
      adminId: reviewerId,
      metadata: {
        memberId: updated.memberId,
        memberName: updated.name,
        note,
      },
    });

    return updated;
  }

  static async rejectMember(id: string, reviewerId: string, note?: string) {
    const member = await prisma.member.findUnique({ where: { id } });

    if (!member) {
      throw new AppError("Member not found.", 404);
    }

    if (member.status !== "PENDING") {
      throw new AppError(`Cannot reject: member is already ${member.status}.`, 409);
    }

    const updated = await prisma.member.update({
      where: { id },
      data: {
        status: "REJECTED",
        reviewedBy: reviewerId,
        reviewedAt: new Date(),
        reviewNote: note?.trim() || null,
      },
    });

    await AuditService.log({
      action: "MEMBER_REJECTED",
      targetType: "MEMBER",
      targetId: id,
      adminId: reviewerId,
      metadata: {
        memberId: updated.memberId,
        memberName: updated.name,
        note,
      },
    });

    return updated;
  }

  static async verifyOfficialCard(memberId: string) {
    const member = await prisma.member.findUnique({
      where: { memberId },
      select: {
        memberId: true,
        name: true,
        gotra: true,
        village: true,
        district: true,
        state: true,
        status: true,
        reviewedAt: true,
      },
    });

    if (!member || member.status !== "APPROVED") {
      throw new AppError("Invalid or unverified membership card.", 404);
    }

    return member;
  }
}
