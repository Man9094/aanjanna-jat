import { prisma } from "../../config/database";
import { AppError } from "../../shared/errors/AppError";
import { AuditService } from "../audit/audit.service";

export class DirectoryService {
  static async getActiveVillages() {
    return prisma.directoryLocation.findMany({
      where: { isActive: true },
      orderBy: [{ stateKey: "asc" }, { districtEn: "asc" }, { villageEn: "asc" }],
    });
  }

  static async adminList(options: {
    stateKey?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = options.page || 1;
    const limit = options.limit || 50;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (options.stateKey) {
      where.stateKey = options.stateKey;
    }
    if (options.search) {
      where.OR = [
        { villageEn: { contains: options.search } },
        { villageHi: { contains: options.search } },
        { districtEn: { contains: options.search } },
        { districtHi: { contains: options.search } },
        { talukaEn: { contains: options.search } },
        { talukaHi: { contains: options.search } },
      ];
    }

    const [locations, total] = await Promise.all([
      prisma.directoryLocation.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ stateKey: "asc" }, { districtEn: "asc" }, { villageEn: "asc" }],
      }),
      prisma.directoryLocation.count({ where }),
    ]);

    return {
      locations,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async createLocation(data: any, adminId: string) {
    const loc = await prisma.directoryLocation.create({
      data: {
        stateKey: data.stateKey,
        stateNameEn: data.stateNameEn.trim(),
        stateNameHi: data.stateNameHi.trim(),
        stateNameGu: data.stateNameGu ? data.stateNameGu.trim() : null,
        districtEn: data.districtEn.trim(),
        districtHi: data.districtHi.trim(),
        districtGu: data.districtGu ? data.districtGu.trim() : null,
        talukaEn: data.talukaEn.trim(),
        talukaHi: data.talukaHi.trim(),
        talukaGu: data.talukaGu ? data.talukaGu.trim() : null,
        villageEn: data.villageEn.trim(),
        villageHi: data.villageHi.trim(),
        villageGu: data.villageGu ? data.villageGu.trim() : null,
        famousHub: data.famousHub ? data.famousHub.trim() : null,
        isActive: data.isActive ?? true,
      },
    });

    await AuditService.log({
      action: "DIRECTORY_CREATED",
      targetType: "DIRECTORY_LOCATION",
      targetId: loc.id,
      adminId,
      metadata: {
        village: loc.villageEn,
        district: loc.districtEn,
        state: loc.stateKey,
      },
    });

    return loc;
  }

  static async updateLocation(id: string, data: any, adminId: string) {
    const existing = await prisma.directoryLocation.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Directory location not found.", 404);
    }

    const updated = await prisma.directoryLocation.update({
      where: { id },
      data,
    });

    await AuditService.log({
      action: "DIRECTORY_UPDATED",
      targetType: "DIRECTORY_LOCATION",
      targetId: id,
      adminId,
      metadata: { changes: Object.keys(data) },
    });

    return updated;
  }

  static async deleteLocation(id: string, adminId: string) {
    const existing = await prisma.directoryLocation.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError("Directory location not found.", 404);
    }

    await prisma.directoryLocation.delete({ where: { id } });

    await AuditService.log({
      action: "DIRECTORY_DELETED",
      targetType: "DIRECTORY_LOCATION",
      targetId: id,
      adminId,
      metadata: {
        deletedVillage: existing.villageEn,
        district: existing.districtEn,
      },
    });

    return { deleted: true, id };
  }
}
