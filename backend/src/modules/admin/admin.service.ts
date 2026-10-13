import bcrypt from "bcryptjs";
import { prisma } from "../../config/database";
import { AppError } from "../../shared/errors/AppError";
import { AuditService } from "../audit/audit.service";

export class AdminService {
  static async getDashboardStats() {
    const [
      totalMembers,
      pendingMembers,
      approvedMembers,
      rejectedMembers,
      recentMembers,
      totalAnnouncements,
      totalDonations,
      pendingGotraSubmissions,
      totalGotras,
      totalVillages,
      totalEvents,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.member.count(),
      prisma.member.count({ where: { status: "PENDING" } }),
      prisma.member.count({ where: { status: "APPROVED" } }),
      prisma.member.count({ where: { status: "REJECTED" } }),
      prisma.member.findMany({
        where: { status: "PENDING" },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          memberId: true,
          name: true,
          gotra: true,
          village: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.announcement.count(),
      prisma.upiSubmission.count(),
      prisma.gotraSubmission.count({ where: { status: "PENDING" } }),
      prisma.gotra.count(),
      prisma.directoryLocation.count({ where: { isActive: true } }),
      prisma.event.count(),
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        include: {
          admin: {
            select: { name: true, role: true },
          },
        },
      }),
    ]);

    return {
      totalMembers,
      pendingMembers,
      approvedMembers,
      rejectedMembers,
      recentMembers,
      totalAnnouncements,
      totalDonations,
      pendingGotraSubmissions,
      totalGotras,
      totalVillages,
      totalEvents,
      recentAuditLogs,
    };
  }

  static async listAdmins() {
    return prisma.admin.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  static async createAdmin(data: {
    email: string;
    name: string;
    password: string;
    role: string;
  }, actorId: string) {
    const existing = await prisma.admin.findUnique({
      where: { email: data.email.toLowerCase().trim() },
    });

    if (existing) {
      throw new AppError("An admin account with this email already exists.", 409);
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const newAdmin = await prisma.admin.create({
      data: {
        email: data.email.toLowerCase().trim(),
        name: data.name.trim(),
        passwordHash,
        role: data.role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    await AuditService.log({
      action: "ADMIN_CREATED",
      targetType: "ADMIN",
      targetId: newAdmin.id,
      adminId: actorId,
      metadata: { email: newAdmin.email, role: newAdmin.role },
    });

    return newAdmin;
  }
}
