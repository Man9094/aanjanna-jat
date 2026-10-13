import { apiClient } from "./api-client";

export interface CreateOrderInput {
  amount: number;
  category: string;
  donorName: string;
  email: string;
  phone: string;
}

export interface CreateOrderResponse {
  success: boolean;
  isDemo?: boolean;
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  category: string;
  donorName: string;
  email: string;
  phone: string;
}

export interface VerifyPaymentInput {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  donorName?: string;
  email?: string;
  amount?: number;
}

export interface SubmitUpiInput {
  utrNumber: string;
  orderId: string;
  donorName: string;
  email: string;
  phone: string;
  amount: number;
  category: string;
}

export interface UpiSubmission {
  id: string;
  utrNumber: string;
  orderId: string;
  donorName: string;
  email: string;
  phone: string;
  amount: number;
  category: string;
  status: "PENDING_ADMIN_REVIEW" | "VERIFIED" | "REJECTED";
  submittedAt: string;
  reviewNote?: string | null;
}

export class PaymentService {
  static async createOrder(data: CreateOrderInput): Promise<CreateOrderResponse> {
    return apiClient<CreateOrderResponse>("/api/payments/create-order", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async verifyPayment(data: VerifyPaymentInput) {
    return apiClient<{ success: boolean; verified: boolean; message: string }>(
      "/api/payments/verify",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  static async submitUpi(data: SubmitUpiInput) {
    return apiClient<{
      success: boolean;
      status: string;
      utrNumber: string;
      orderId: string;
      message: string;
    }>("/api/payments/verify-upi", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async listUpiSubmissions(): Promise<{
    total: number;
    pending: number;
    submissions: UpiSubmission[];
  }> {
    const res = await apiClient<{
      success: boolean;
      data: { total: number; pending: number; submissions: UpiSubmission[] };
    }>("/api/payments/upi-submissions", { method: "GET" });
    return res.data;
  }

  static async reviewUpiSubmission(id: string, status: "VERIFIED" | "REJECTED", note?: string) {
    return apiClient<{ success: boolean }>(
      `/api/payments/upi-submissions/${id}/review`,
      {
        method: "POST",
        body: JSON.stringify({ status, note }),
      }
    );
  }
}
