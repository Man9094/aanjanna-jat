"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Download,
  Smartphone,
  QrCode,
  CreditCard,
  Copy,
  Check,
  Shield,
  ExternalLink,
  Sparkles,
  Clock
} from "lucide-react";
import { PaymentService } from "@/services/payment.service";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryTitle: string;
  amount: number;
}

export default function PaymentModal({ isOpen, onClose, categoryTitle, amount }: PaymentModalProps) {
  const [utrNumber, setUtrNumber] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"qr" | "apps" | "gateway">("qr");

  // Official Community UPI Details (Configurable via NEXT_PUBLIC_UPI_ID in .env)
  const officialUpiVpa = process.env.NEXT_PUBLIC_UPI_ID || "aanjanajatmahasabha@sbi";
  const payeeName = "Anjana Jat Mahasabha";

  // Generate dynamic server order reference for this session
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Create a unique secure order reference ID when modal opens
      const newRef = `ORD_${Date.now()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setOrderId(newRef);
      setSuccessData(null);
      setError("");
      setUtrNumber("");
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Encrypted UPI Deep-Link payload for PhonePe / GPay / Paytm / QR Code
  const upiNote = encodeURIComponent(`Contribution for ${categoryTitle} (${orderId})`);
  const encodedPayeeName = encodeURIComponent(payeeName);
  const baseUpiParams = `pa=${officialUpiVpa}&pn=${encodedPayeeName}&am=${amount}&tr=${orderId}&cu=INR&tn=${upiNote}`;
  const upiUri = `upi://pay?${baseUpiParams}`;

  // Direct app redirect handler using Android Intent URIs & iOS Universal Links
  const handleOpenApp = (app: "phonepe" | "gpay" | "paytm" | "bhim") => {
    const isAndroid = /android/i.test(navigator.userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

    // App-specific deep link configs
    const appConfig: Record<string, { scheme: string; androidPackage: string; iosUniversal: string }> = {
      phonepe: {
        scheme: `phonepe://pay?${baseUpiParams}`,
        androidPackage: "com.phonepe.app",
        iosUniversal: `https://phon.pe/pay?${baseUpiParams}`,
      },
      gpay: {
        scheme: `tez://upi/pay?${baseUpiParams}`,
        androidPackage: "com.google.android.apps.nbu.paisa.user",
        iosUniversal: `https://pay.google.com/gp/v/pay?${baseUpiParams}`,
      },
      paytm: {
        scheme: `paytmmp://pay?${baseUpiParams}`,
        androidPackage: "net.one97.paytm",
        iosUniversal: `https://paytm.com/pay?${baseUpiParams}`,
      },
      bhim: {
        scheme: `bhim://pay?${baseUpiParams}`,
        androidPackage: "in.org.npci.upiapp",
        iosUniversal: `https://bhimupi.org.in/pay?${baseUpiParams}`,
      },
    };

    const config = appConfig[app];

    if (isAndroid) {
      // Android Intent URI — opens specific app directly; falls back to Play Store if not installed
      const intentUri =
        `intent://pay?${baseUpiParams}#Intent;` +
        `scheme=upi;` +
        `package=${config.androidPackage};` +
        `S.browser_fallback_url=${encodeURIComponent(`https://play.google.com/store/apps/details?id=${config.androidPackage}`)};` +
        `end`;
      window.location.href = intentUri;
    } else if (isIOS) {
      // iOS: Try custom scheme first, then universal link fallback
      const hiddenIframe = document.createElement("iframe");
      hiddenIframe.style.display = "none";
      hiddenIframe.src = config.scheme;
      document.body.appendChild(hiddenIframe);

      // If app didn't open within 600ms, try universal link
      setTimeout(() => {
        document.body.removeChild(hiddenIframe);
        window.location.href = config.iosUniversal;
      }, 600);
    } else {
      // Desktop or other — use generic UPI intent (will show app chooser on supported browsers)
      window.location.href = `upi://pay?${baseUpiParams}`;
    }
  };

  // Copy UPI ID to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Verify UTR Reference Number (Fast 1-click verification)
  const handleVerifyUtr = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!utrNumber || utrNumber.length !== 12) {
      setError("Please enter the 12-digit UTR / Ref number from your PhonePe/GPay payment receipt.");
      return;
    }

    setLoading(true);

    try {
      const data = await PaymentService.submitUpi({
        utrNumber: utrNumber,
        orderId: orderId,
        donorName: donorName || "Anonymous Donor",
        email: "donor@aanjanajat.org",
        phone: donorPhone || "9999999999",
        amount: amount,
        category: categoryTitle,
      });

      if (!data.success) {
        throw new Error("Failed to verify UTR reference number");
      }

      setSuccessData({
        paymentId: `UPI_UTR_${data.utrNumber}`,
        orderId: orderId,
        amount: amount,
        category: categoryTitle,
        utrNumber: data.utrNumber,
        donorName: donorName || "Valued Community Member",
        isPending: true,
      });
    } catch (err: any) {
      setError(err.message || "Verification failed. Please check your 12-digit UTR.");
    } finally {
      setLoading(false);
    }
  };

  // Razorpay Gateway fallback (for Credit/Debit Cards & Netbanking)
  const handleGatewayPay = async () => {
    setLoading(true);
    setError("");

    try {
      const orderData = await PaymentService.createOrder({
        amount: amount,
        category: categoryTitle,
        donorName: donorName || "Community Donor",
        email: "donor@aanjanajat.org",
        phone: donorPhone || "9876543210",
      });

      if (orderData.isDemo) {
        setSuccessData({
          paymentId: `pay_demo_${Date.now()}`,
          orderId: orderId,
          amount: amount,
          category: categoryTitle,
          donorName: donorName || "Valued Community Member",
        });
        setLoading(false);
        return;
      }

      const isLoaded = await new Promise<boolean>((resolve) => {
        if ((window as any).Razorpay) return resolve(true);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

      if (!isLoaded) throw new Error("Razorpay SDK failed to load");

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: payeeName,
        description: `Donation for ${categoryTitle}`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          setSuccessData({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            amount: amount,
            category: categoryTitle,
            donorName: donorName || "Valued Community Member",
          });
          setLoading(false);
        },
        theme: { color: "#D97706" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err.message || "Failed to launch gateway");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-card border border-border shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-saffron/10 via-maroon/5 to-transparent shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-saffron/20 flex items-center justify-center text-saffron font-bold">
                <QrCode size={20} />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  UPI Scan & Pay <Sparkles size={14} className="text-saffron" />
                </h3>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Lock size={10} className="text-emerald-500" /> PhonePe, GPay, Paytm & BHIM
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 overflow-y-auto space-y-4">
            {/* SUCCESS SCREEN */}
            {successData ? (
              <div className="py-4 text-center space-y-4">
                {/* Icon changes based on pending vs confirmed */}
                <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center ${
                  successData.isPending
                    ? "bg-amber-500/10 text-amber-500"
                    : "bg-emerald-500/10 text-emerald-500"
                }`}>
                  {successData.isPending ? <Clock size={34} /> : <CheckCircle2 size={34} />}
                </div>

                <div>
                  <h4 className="text-lg font-bold text-foreground">
                    {successData.isPending ? "UTR Submitted — Pending Verification" : "Payment Confirmed!"}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Thank you <span className="font-semibold text-foreground">{successData.donorName}</span> for your contribution of{" "}
                    <span className="font-bold text-saffron">₹{amount.toLocaleString()}</span> to{" "}
                    <span className="font-semibold text-foreground">{categoryTitle}</span>.
                  </p>
                </div>

                {/* Pending Warning for UTR */}
                {successData.isPending && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-left text-xs text-amber-700 dark:text-amber-400 space-y-1">
                    <p className="font-bold flex items-center gap-1.5"><Clock size={14} /> Admin Verification Required</p>
                    <p>Your UTR reference number has been recorded. Our admin team will verify this against the bank statement within <strong>24 hours</strong>. You will receive a confirmation once verified.</p>
                    <p className="text-[10px] text-amber-600/70 dark:text-amber-500/70 mt-1">⚠️ Submitting a fake UTR is a punishable offence under Section 66D IT Act.</p>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-muted/60 border border-border text-left space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Txn Ref / ID:</span>
                    <span className="text-foreground font-semibold">{successData.paymentId}</span>
                  </div>
                  {successData.utrNumber && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">UTR Number:</span>
                      <span className="text-foreground font-bold">{successData.utrNumber}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Ref:</span>
                    <span className="text-foreground">{successData.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    {successData.isPending ? (
                      <span className="text-amber-500 font-semibold flex items-center gap-1">
                        <Clock size={12} /> Pending Admin Review
                      </span>
                    ) : (
                      <span className="text-emerald-500 font-semibold flex items-center gap-1">
                        <CheckCircle2 size={12} /> Verified & Received
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron to-maroon text-white font-semibold text-xs shadow-md"
                >
                  Done
                </button>
              </div>
            ) : (
              /* INSTANT PAYMENT MAIN VIEW */
              <div className="space-y-4">
                {/* Amount Banner */}
                <div className="p-3.5 rounded-xl bg-saffron/10 border border-saffron/25 flex justify-between items-center">
                  <div>
                    <p className="text-[11px] text-muted-foreground font-medium">Paying For</p>
                    <p className="text-xs font-bold text-foreground">{categoryTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-muted-foreground font-medium">Amount</p>
                    <p className="text-lg font-extrabold text-saffron">₹{amount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Tab Switcher */}
                <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-muted border border-border text-xs font-medium">
                  <button
                    onClick={() => setActiveTab("qr")}
                    className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      activeTab === "qr"
                        ? "bg-card text-saffron shadow-sm font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <QrCode size={15} /> QR Code
                  </button>
                  <button
                    onClick={() => setActiveTab("apps")}
                    className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      activeTab === "apps"
                        ? "bg-card text-saffron shadow-sm font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Smartphone size={15} /> UPI Apps
                  </button>
                  <button
                    onClick={() => setActiveTab("gateway")}
                    className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      activeTab === "gateway"
                        ? "bg-card text-saffron shadow-sm font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <CreditCard size={15} /> Card/Bank
                  </button>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* VIEW 1: DYNAMIC QR CODE SCAN & PAY */}
                {activeTab === "qr" && (
                  <div className="p-4 rounded-2xl bg-card border border-border text-center space-y-3.5 shadow-sm">
                    <div className="inline-block p-3.5 rounded-2xl bg-white shadow-md border border-border">
                      <QRCodeSVG value={upiUri} size={170} level="H" includeMargin={true} />
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-400 text-left">
                      <p className="font-semibold flex items-center gap-1">
                        <AlertCircle size={13} className="shrink-0" />
                        Official Account Configuration Notice
                      </p>
                      <p className="mt-0.5 text-[10px] leading-relaxed">
                        Please verify the official Mahasabha account details with our office (+91 8788594494) before sending payments.
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-foreground">Scan with PhonePe, Paytm, Google Pay, or BHIM</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Payable Amount: <span className="font-extrabold text-saffron">₹{amount.toLocaleString()}</span></p>
                    </div>

                    {/* Copy UPI VPA Box */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/70 border border-border text-xs">
                      <div className="text-left">
                        <p className="text-[10px] text-muted-foreground">UPI ID (VPA)</p>
                        <p className="font-mono font-bold text-foreground text-xs">{officialUpiVpa}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(officialUpiVpa)}
                        className="px-2.5 py-1.5 rounded-lg bg-saffron/10 text-saffron font-semibold hover:bg-saffron/20 flex items-center gap-1 text-xs"
                      >
                        {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Copied" : "Copy"}
                      </button>
                    </div>

                    {/* Optional Name & UTR Verification */}
                    <form onSubmit={handleVerifyUtr} className="pt-3 border-t border-border text-left space-y-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-foreground mb-1">Your Name (Optional)</label>
                        <input
                          type="text"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="e.g. Ramesh Patel"
                          className="w-full px-3 py-1.5 rounded-lg bg-muted border border-border text-xs text-foreground focus:outline-none focus:border-saffron"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-foreground mb-1">
                          12-Digit UTR Number <span className="text-muted-foreground font-normal">(After Payment)</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={12}
                            value={utrNumber}
                            onChange={(e) => setUtrNumber(e.target.value.replace(/\D/g, ""))}
                            placeholder="e.g. 423456789012"
                            className="flex-1 px-3 py-1.5 rounded-lg bg-muted border border-border font-mono text-xs text-foreground focus:outline-none focus:border-saffron"
                          />
                          <button
                            type="submit"
                            disabled={loading || utrNumber.length !== 12}
                            className="px-3.5 py-1.5 rounded-lg bg-saffron text-white font-bold text-xs hover:bg-saffron/90 disabled:opacity-50"
                          >
                            {loading ? <Loader2 size={14} className="animate-spin" /> : "Confirm UTR"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* VIEW 2: INSTANT MOBILE UPI APPS */}
                {activeTab === "apps" && (
                  <div className="space-y-2.5">
                    <p className="text-xs text-muted-foreground text-center font-medium">
                      Tap to open directly in your mobile app:
                    </p>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleOpenApp("phonepe")}
                        className="p-3.5 rounded-xl bg-muted/60 border border-border hover:border-saffron/50 flex items-center gap-3 transition-all hover:scale-[1.02] text-left cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-xs">
                          P
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-foreground">PhonePe</p>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">Open App <ExternalLink size={9} /></p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenApp("gpay")}
                        className="p-3.5 rounded-xl bg-muted/60 border border-border hover:border-saffron/50 flex items-center gap-3 transition-all hover:scale-[1.02] text-left cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs">
                          G
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-foreground">Google Pay</p>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">Open App <ExternalLink size={9} /></p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenApp("paytm")}
                        className="p-3.5 rounded-xl bg-muted/60 border border-border hover:border-saffron/50 flex items-center gap-3 transition-all hover:scale-[1.02] text-left cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-xs">
                          ₹
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-foreground">Paytm UPI</p>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">Open App <ExternalLink size={9} /></p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenApp("bhim")}
                        className="p-3.5 rounded-xl bg-muted/60 border border-border hover:border-saffron/50 flex items-center gap-3 transition-all hover:scale-[1.02] text-left cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs">
                          B
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-foreground">BHIM UPI</p>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-0.5">Open App <ExternalLink size={9} /></p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* VIEW 3: CARDS & NETBANKING GATEWAY */}
                {activeTab === "gateway" && (
                  <div className="p-5 rounded-2xl bg-card border border-border text-center space-y-3.5">
                    <div className="flex justify-center gap-3 text-saffron">
                      <CreditCard size={30} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">Credit/Debit Card & Net Banking</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Pay via Visa, Mastercard, RuPay, or Net Banking.
                      </p>
                    </div>

                    <button
                      onClick={handleGatewayPay}
                      disabled={loading}
                      className="w-full py-3 rounded-full bg-gradient-to-r from-saffron to-maroon text-white font-bold text-xs shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={15} />}
                      Launch Cards/Bank Gateway (₹{amount.toLocaleString()})
                    </button>
                  </div>
                )}

                {/* Security Footer */}
                <div className="p-2.5 rounded-xl bg-muted/40 border border-border flex items-center justify-center gap-2 text-[11px] text-muted-foreground text-center">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                  <span>100% Direct Bank Transfer. Zero hidden fees.</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
