import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/cors";
import { errorHandler } from "./middleware/error-handler";
import authRoutes from "./modules/auth/auth.routes";
import adminRoutes from "./modules/admin/admin.routes";
import memberRoutes from "./modules/members/member.routes";
import announcementRoutes from "./modules/announcements/announcement.routes";
import paymentRoutes from "./modules/payments/payment.routes";
import auditRoutes from "./modules/audit/audit.routes";
import gotraRoutes from "./modules/gotras/gotra.routes";
import directoryRoutes from "./modules/directory/directory.routes";
import eventRoutes from "./modules/events/event.routes";

export const app = express();

// Security Headers via Helmet
app.use(helmet());

// Security Headers additions
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// CORS
app.use(cors(corsOptions));

// Cookie Parser
app.use(cookieParser());

// Body Parsers
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// Health Check
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/gotras", gotraRoutes);
app.use("/api/directory", directoryRoutes);
app.use("/api/events", eventRoutes);

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: "API route not found" });
});

// Centralized Error Handler
app.use(errorHandler);
