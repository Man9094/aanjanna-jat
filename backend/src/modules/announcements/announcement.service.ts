import { prisma } from "../../config/database";
import { AppError } from "../../shared/errors/AppError";
import { AuditService } from "../audit/audit.service";

export class AnnouncementService {
  static async listPublished() {
    return prisma.announcement.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  }

  static async listAll() {
    return prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }

  static async create(data: {
    title: string;
    titleHi?: string;
    content: string;
    isPublished?: boolean;
  }, adminId: string) {
    const ann = await prisma.announcement.create({
      data: {
        title: data.title.trim(),
        titleHi: data.titleHi?.trim() || null,
        content: data.content.trim(),
        isPublished: data.isPublished ?? false,
        createdBy: adminId,
      },
    });

    await AuditService.log({
      action: "ANNOUNCEMENT_CREATED",
      targetType: "ANNOUNCEMENT",
      targetId: ann.id,
      adminId,
      metadata: { title: ann.title, isPublished: ann.isPublished },
    });

    return ann;
  }

  static async update(id: string, data: Partial<{
    title: string;
    titleHi?: string;
    content: string;
    isPublished: boolean;
  }>, adminId: string) {
    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Announcement not found.", 404);
    }

    const updated = await prisma.announcement.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title.trim() } : {}),
        ...(data.titleHi !== undefined ? { titleHi: data.titleHi.trim() || null } : {}),
        ...(data.content !== undefined ? { content: data.content.trim() } : {}),
        ...(data.isPublished !== undefined ? { isPublished: data.isPublished } : {}),
      },
    });

    await AuditService.log({
      action: "ANNOUNCEMENT_UPDATED",
      targetType: "ANNOUNCEMENT",
      targetId: id,
      adminId,
      metadata: { changes: Object.keys(data) },
    });

    return updated;
  }

  static async delete(id: string, adminId: string) {
    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Announcement not found.", 404);
    }

    await prisma.announcement.delete({ where: { id } });

    await AuditService.log({
      action: "ANNOUNCEMENT_DELETED",
      targetType: "ANNOUNCEMENT",
      targetId: id,
      adminId,
      metadata: { deletedTitle: existing.title },
    });

    return { deleted: true, id };
  }
}
