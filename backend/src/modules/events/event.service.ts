import { prisma } from "../../config/database";
import { AppError } from "../../shared/errors/AppError";
import { AuditService } from "../audit/audit.service";

export class EventService {
  static async listPublished() {
    return prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  }

  static async adminListAll() {
    return prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async createEvent(data: any, adminId: string) {
    const event = await prisma.event.create({
      data: {
        title: data.title.trim(),
        titleHi: data.titleHi?.trim() || null,
        description: data.description.trim(),
        date: data.date,
        time: data.time?.trim() || null,
        location: data.location.trim(),
        category: data.category || "meeting",
        image: data.image?.trim() || null,
        isUpcoming: data.isUpcoming ?? true,
        isPublished: data.isPublished ?? true,
        registrationLink: data.registrationLink?.trim() || null,
        createdBy: adminId,
      },
    });

    await AuditService.log({
      action: "EVENT_CREATED",
      targetType: "EVENT",
      targetId: event.id,
      adminId,
      metadata: { title: event.title, date: event.date },
    });

    return event;
  }

  static async updateEvent(id: string, data: any, adminId: string) {
    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Event not found.", 404);
    }

    const updated = await prisma.event.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title.trim() } : {}),
        ...(data.titleHi !== undefined ? { titleHi: data.titleHi?.trim() || null } : {}),
        ...(data.description !== undefined ? { description: data.description.trim() } : {}),
        ...(data.date !== undefined ? { date: data.date } : {}),
        ...(data.time !== undefined ? { time: data.time?.trim() || null } : {}),
        ...(data.location !== undefined ? { location: data.location.trim() } : {}),
        ...(data.category !== undefined ? { category: data.category } : {}),
        ...(data.image !== undefined ? { image: data.image?.trim() || null } : {}),
        ...(data.isUpcoming !== undefined ? { isUpcoming: data.isUpcoming } : {}),
        ...(data.isPublished !== undefined ? { isPublished: data.isPublished } : {}),
        ...(data.registrationLink !== undefined
          ? { registrationLink: data.registrationLink?.trim() || null }
          : {}),
      },
    });

    await AuditService.log({
      action: "EVENT_UPDATED",
      targetType: "EVENT",
      targetId: id,
      adminId,
      metadata: { changes: Object.keys(data) },
    });

    return updated;
  }

  static async togglePublish(id: string, adminId: string) {
    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Event not found.", 404);
    }

    const updated = await prisma.event.update({
      where: { id },
      data: { isPublished: !existing.isPublished },
    });

    await AuditService.log({
      action: "EVENT_UPDATED",
      targetType: "EVENT",
      targetId: id,
      adminId,
      metadata: { isPublished: updated.isPublished },
    });

    return updated;
  }

  static async deleteEvent(id: string, adminId: string) {
    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Event not found.", 404);
    }

    await prisma.event.delete({ where: { id } });

    await AuditService.log({
      action: "EVENT_DELETED",
      targetType: "EVENT",
      targetId: id,
      adminId,
      metadata: { deletedTitle: existing.title },
    });

    return { deleted: true, id };
  }
}
