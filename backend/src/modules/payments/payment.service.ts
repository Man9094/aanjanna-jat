import crypto from "crypto";
import Razorpay from "razorpay";
import { prisma } from "../../config/database";
import { env } from "../../config/env";
import { AppError } from "../../shared/errors/AppError";
import { AuditService } from "../audit/audit.service";

export class PaymentService {
  private static getRazorpayInstance(): Razorpay | null {
    if (
      !env.RAZORPAY_KEY_ID ||
      !env.RAZORPAY_KEY_SECRET ||
      env.RAZORPAY_KEY_ID.includes("placeholder") ||
      env.RAZORPAY_KEY_SECRET.includes("placeholder")
    ) {
      return null;
    }
    return new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_KEY_SECRET,
    });
  }

  static async createOrder(data: {
    amount: number;
    category: string;
    donorName: string;
    email: string;
    phone: string;
  }) {
    const amountInPaise = Math.round(data.amount * 100);
    const razorpay = this.getRazorpayInstance();

    // Demo mode fallback if active keys not configured
    if (!razorpay) {
      const demoOrderId = `order_demo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      await prisma.donationOrder.create({
        data: {
          orderId: demoOrderId,
          amount: amountInPaise,
          currency: "INR",
          category: data.category,
          donorName: data.donorName,
          email: data.email,
          phone: data.phone,
          isDemo: true,
          status: "PENDING",
        },
      });

      return {
        success: true,
        isDemo: true,
        orderId: demoOrderId,
        amount: amountInPaise,
        currency: "INR",
        keyId: env.RAZORPAY_KEY_ID || "rzp_test_demo_key_id",
        category: data.category,
        donorName: data.donorName,
        email: data.email,
        phone: data.phone,
      };
    }

    // Live/Test Razorpay Order Creation
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        category: data.category,
        donorName: data.donorName,
        email: data.email,
        phone: data.phone,
      },
    });

    await prisma.donationOrder.create({
      data: {
        orderId: razorpayOrder.id,
        amount: amountInPaise,
        currency: "INR",
        category: data.category,
        donorName: data.donorName,
        email: data.email,
        phone: data.phone,
        isDemo: false,
        status: "PENDING",
      },
    });

    return {
      success: true,
      isDemo: false,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: env.RAZORPAY_KEY_ID,
      category: data.category,
      donorName: data.donorName,
      email: data.email,
      phone: data.phone,
    };
  }

  static async verifyPayment(data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

    // Demo order verification: strictly for orders generated in demo mode
    if (razorpay_order_id.startsWith("order_demo_")) {
      await prisma.donationOrder.updateMany({
        where: { orderId: razorpay_order_id },
        data: {
          status: "SUCCESS",
          razorpayPaymentId: razorpay_payment_id || `pay_demo_${Date.now()}`,
          razorpaySignature: razorpay_signature,
        },
      });

      return {
        success: true,
        verified: true,
        isDemo: true,
        paymentId: razorpay_payment_id || `pay_demo_${Date.now()}`,
        orderId: razorpay_order_id,
        message: "Payment verified successfully (Demo Mode)",
      };
    }

    if (!env.RAZORPAY_KEY_SECRET) {
      throw new AppError("Payment gateway secret not configured", 500);
    }

    // Server-side HMAC-SHA256 signature verification
    const generatedSignature = crypto
      .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      throw new AppError("Invalid payment signature. Verification failed.", 400);
    }

    await prisma.donationOrder.updateMany({
      where: { orderId: razorpay_order_id },
      data: {
        status: "SUCCESS",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    return {
      success: true,
      verified: true,
      isDemo: false,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      message: "Payment cryptographically verified successfully",
    };
  }

  static async submitUpi(data: {
    utrNumber: string;
    orderId: string;
    donorName: string;
    email: string;
    phone: string;
    amount: number;
    category: string;
  }, ipAddress?: string) {
    // Check for duplicate UTR in database
    const existing = await prisma.upiSubmission.findUnique({
      where: { utrNumber: data.utrNumber },
    });

    if (existing) {
      throw new AppError(
        "This UTR number has already been submitted. If you believe this is an error, please contact admin.",
        400
      );
    }

    // Save to database with status PENDING_ADMIN_REVIEW
    const submission = await prisma.upiSubmission.create({
      data: {
        utrNumber: data.utrNumber,
        orderId: data.orderId,
        donorName: data.donorName,
        email: data.email,
        phone: data.phone,
        amount: data.amount,
        category: data.category,
        status: "PENDING_ADMIN_REVIEW",
        ipAddress: ipAddress || null,
      },
    });

    return {
      success: true,
      status: submission.status,
      utrNumber: submission.utrNumber,
      orderId: submission.orderId,
      amount: submission.amount,
      category: submission.category,
      donorName: submission.donorName,
      message:
        "UTR submitted successfully. Your donation will be confirmed after admin verifies the payment in bank records.",
    };
  }

  static async listUpiSubmissions() {
    const submissions = await prisma.upiSubmission.findMany({
      orderBy: { submittedAt: "desc" },
    });

    return {
      total: submissions.length,
      pending: submissions.filter((s) => s.status === "PENDING_ADMIN_REVIEW").length,
      submissions,
    };
  }

  static async reviewUpiSubmission(
    id: string,
    status: "VERIFIED" | "REJECTED",
    adminId: string,
    note?: string
  ) {
    const submission = await prisma.upiSubmission.findUnique({ where: { id } });
    if (!submission) {
      throw new AppError("UPI submission not found.", 404);
    }

    const updated = await prisma.upiSubmission.update({
      where: { id },
      data: {
        status,
        reviewedBy: adminId,
        reviewedAt: new Date(),
        reviewNote: note?.trim() || null,
      },
    });

    await AuditService.log({
      action: `UPI_${status}`,
      targetType: "PAYMENT",
      targetId: id,
      adminId,
      metadata: { utrNumber: updated.utrNumber, amount: updated.amount, note },
    });

    return updated;
  }

  static verifyWebhook(rawBody: string, signature: string | null) {
    if (!env.RAZORPAY_WEBHOOK_SECRET || env.RAZORPAY_WEBHOOK_SECRET.includes("placeholder")) {
      return { status: "acknowledged_demo" };
    }

    if (!signature) {
      throw new AppError("Missing webhook signature header", 400);
    }

    const expectedSignature = crypto
      .createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      throw new AppError("Invalid webhook signature", 400);
    }

    const payload = JSON.parse(rawBody);
    return { status: "success", event: payload.event };
  }
}
