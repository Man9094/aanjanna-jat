import { prisma } from "../../config/database";
import { AppError } from "../../shared/errors/AppError";
import { AuditService } from "../audit/audit.service";

export class GotraService {
  static async getVerifiedGotras() {
    return prisma.gotra.findMany({
      orderBy: { en: "asc" },
    });
  }

  static async adminListGotras(search?: string) {
    return prisma.gotra.findMany({
      where: search
        ? {
            OR: [
              { en: { contains: search } },
              { hi: { contains: search } },
              { id: { contains: search } },
            ],
          }
        : undefined,
      orderBy: { en: "asc" },
    });
  }

  static async createGotra(
    data: { id: string; en: string; hi: string; gu?: string },
    adminId: string
  ) {
    const existing = await prisma.gotra.findUnique({
      where: { id: data.id.toLowerCase().trim() },
    });
    if (existing) {
      throw new AppError("A gotra with this ID already exists.", 409);
    }

    const gotra = await prisma.gotra.create({
      data: {
        id: data.id.toLowerCase().trim(),
        en: data.en.trim(),
        hi: data.hi.trim(),
        gu: data.gu ? data.gu.trim() : null,
      },
    });

    await AuditService.log({
      action: "GOTRA_CREATED",
      targetType: "GOTRA",
      targetId: gotra.id,
      adminId,
      metadata: { en: gotra.en, hi: gotra.hi },
    });

    return gotra;
  }

  static async updateGotra(
    id: string,
    data: { en?: string; hi?: string; gu?: string },
    adminId: string
  ) {
    const existing = await prisma.gotra.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Gotra not found.", 404);
    }

    const updated = await prisma.gotra.update({
      where: { id },
      data: {
        ...(data.en ? { en: data.en.trim() } : {}),
        ...(data.hi ? { hi: data.hi.trim() } : {}),
        ...(data.gu !== undefined ? { gu: data.gu ? data.gu.trim() : null } : {}),
      },
    });

    await AuditService.log({
      action: "GOTRA_UPDATED",
      targetType: "GOTRA",
      targetId: id,
      adminId,
      metadata: { changes: Object.keys(data) },
    });

    return updated;
  }

  static async deleteGotra(id: string, adminId: string) {
    const existing = await prisma.gotra.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Gotra not found.", 404);
    }

    await prisma.gotra.delete({ where: { id } });

    await AuditService.log({
      action: "GOTRA_DELETED",
      targetType: "GOTRA",
      targetId: id,
      adminId,
      metadata: { deletedGotra: existing.en },
    });

    return { deleted: true, id };
  }

  static async submitGotra(data: {
    nameEn: string;
    nameHi?: string;
    nameGu?: string;
    submittedBy?: string;
    contact?: string;
    village?: string;
  }) {
    return prisma.gotraSubmission.create({
      data: {
        nameEn: data.nameEn.trim(),
        nameHi: data.nameHi ? data.nameHi.trim() : null,
        nameGu: data.nameGu ? data.nameGu.trim() : null,
        submittedBy: data.submittedBy ? data.submittedBy.trim() : null,
        contact: data.contact ? data.contact.trim() : null,
        village: data.village ? data.village.trim() : null,
        status: "PENDING",
      },
    });
  }

  static async listSubmissions(status?: string) {
    return prisma.gotraSubmission.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
    });
  }

  static async approveSubmission(
    submissionId: string,
    adminId: string,
    adminName: string,
    note?: string
  ) {
    const submission = await prisma.gotraSubmission.findUnique({
      where: { id: submissionId },
    });
    if (!submission) {
      throw new AppError("Gotra submission not found.", 404);
    }

    if (submission.status !== "PENDING") {
      throw new AppError(`Submission is already ${submission.status}.`, 409);
    }

    // Generate safe gotra ID from English name
    const gotraId = submission.nameEn
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Upsert into Gotra table
    await prisma.gotra.upsert({
      where: { id: gotraId },
      create: {
        id: gotraId,
        en: submission.nameEn,
        hi: submission.nameHi || submission.nameEn,
        gu: submission.nameGu || null,
      },
      update: {
        en: submission.nameEn,
        ...(submission.nameHi ? { hi: submission.nameHi } : {}),
        ...(submission.nameGu ? { gu: submission.nameGu } : {}),
      },
    });

    const updated = await prisma.gotraSubmission.update({
      where: { id: submissionId },
      data: {
        status: "APPROVED",
        reviewedBy: adminName,
        reviewedAt: new Date(),
        reviewNote: note || null,
      },
    });

    await AuditService.log({
      action: "GOTRA_APPROVED",
      targetType: "GOTRA_SUBMISSION",
      targetId: submissionId,
      adminId,
      metadata: {
        gotraId,
        nameEn: submission.nameEn,
        reviewedBy: adminName,
      },
    });

    return updated;
  }

  static async rejectSubmission(
    submissionId: string,
    adminId: string,
    adminName: string,
    note?: string
  ) {
    const submission = await prisma.gotraSubmission.findUnique({
      where: { id: submissionId },
    });
    if (!submission) {
      throw new AppError("Gotra submission not found.", 404);
    }

    if (submission.status !== "PENDING") {
      throw new AppError(`Submission is already ${submission.status}.`, 409);
    }

    const updated = await prisma.gotraSubmission.update({
      where: { id: submissionId },
      data: {
        status: "REJECTED",
        reviewedBy: adminName,
        reviewedAt: new Date(),
        reviewNote: note || null,
      },
    });

    await AuditService.log({
      action: "GOTRA_REJECTED",
      targetType: "GOTRA_SUBMISSION",
      targetId: submissionId,
      adminId,
      metadata: {
        nameEn: submission.nameEn,
        reviewedBy: adminName,
        reason: note,
      },
    });

    return updated;
  }
}
