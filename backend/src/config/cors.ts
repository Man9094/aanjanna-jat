import cors from "cors";
import { env } from "./env";

const allowedOrigins = [
  env.FRONTEND_ORIGIN,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // In production, check if origin matches frontend domain
    if (env.isProduction && origin === env.FRONTEND_ORIGIN) {
      return callback(null, true);
    }

    return callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "x-razorpay-signature",
  ],
  exposedHeaders: ["Set-Cookie"],
};
