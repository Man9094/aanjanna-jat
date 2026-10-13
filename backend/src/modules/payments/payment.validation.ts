import { z } from "zod";

export const createOrderSchema = z.object({
  amount: z.number().min(1, "Amount must be at least ₹1"),
  category: z.string().min(1, "Category is required"),
  donorName: z.string().min(2, "Donor name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export const verifySchema = z.object({
  razorpay_order_id: z.string().min(1, "Order ID required"),
  razorpay_payment_id: z.string().min(1, "Payment ID required"),
  razorpay_signature: z.string().min(1, "Signature required"),
  donorName: z.string().optional(),
  email: z.string().optional(),
  amount: z.number().optional(),
});

export const verifyUpiSchema = z.object({
  utrNumber: z
    .string()
    .length(12, "UPI UTR / Bank Reference Number must be exactly 12 digits")
    .regex(/^\d{12}$/, "UTR must contain only numbers"),
  orderId: z.string().min(1, "Order ID is required"),
  donorName: z.string().min(2, "Donor name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone number required"),
  amount: z.number().min(1, "Amount must be at least ₹1"),
  category: z.string().min(1, "Category is required"),
});

export const reviewUpiSchema = z.object({
  status: z.enum(["VERIFIED", "REJECTED"]),
  note: z.string().max(500).optional(),
});
