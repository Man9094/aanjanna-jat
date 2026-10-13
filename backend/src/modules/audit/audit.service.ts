import { prisma } from "../../config/database";

export interface CreateAuditLogParams {
  action: string;
  targetType: string;
  targetId?: string | null;
  adminId: string;
  metadata?: Record<string, unknown>;
}

export class AuditService {
  /**
   * Records an immutable audit log entry.
   * Filters out any password, token, or secret fields from metadata.
   */
  static async log(params: CreateAuditLogParams) {
    let cleanMetadata: Record<string, unknown> | null = null;

    if (params.metadata) {
      cleanMetadata = {};
      for (const [key, val] of Object.entries(params.metadata)) {
        const lowerKey = key.toLowerCase();
        if (
          lowerKey.includes("password") ||
          lowerKey.includes("token") ||
          lowerKey.includes("secret") ||
          lowerKey.includes("hash")
        ) {
          continue; // Strip sensitive fields
        }
        cleanMetadata[key] = val;
      }
    }

    return prisma.auditLog.create({
      data: {
        action: params.action,
        targetType: params.targetType,
        targetId: params.targetId ?? null,
        adminId: params.adminId,
        metadata: cleanMetadata ? JSON.stringify(cleanMetadata) : null,
      },
    });
  }

  static async getLogs(limit = 100, page = 1) {
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          admin: {
            select: {
              name: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      prisma.auditLog.count(),
    ]);

    return { logs, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
