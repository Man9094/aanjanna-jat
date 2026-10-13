"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  User,
  MapPin,
  Briefcase,
  Phone,
  CreditCard,
  Download,
  Printer,
  RotateCcw,
  Check,
  Share2,
  Eye,
  X,
  AlertCircle,
} from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { aanjanaGotras } from "@/data/gotras";
import { QRCodeCanvas } from "qrcode.react";
import { cn } from "@/lib/utils";
import { MemberService } from "@/services/member.service";

// Timings for the membership-card success sequence.
const PREPARE_MS = 900;
const DOWNLOAD_FEEDBACK_MS = 2200;

// The check mark and ring are drawn with a stroke dash offset.
const RING_LENGTH = 88;
const TICK_LENGTH = 22;

function DrawingCheck() {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 32 32"
      fill="none"
      className="shrink-0 text-maroon"
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray={RING_LENGTH}
        strokeDashoffset={RING_LENGTH}
        style={{
          animation:
            "drawCheck 480ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
      />
      <path
        d="M10.5 16.4l3.8 3.8 7.6-8.6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={TICK_LENGTH}
        strokeDashoffset={TICK_LENGTH}
        style={{
          animation:
            "drawCheck 320ms cubic-bezier(0.22, 1, 0.36, 1) 340ms forwards",
        }}
      />
    </svg>
  );
}

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    name: "",
    fatherOrSpouse: "",
    village: "",
    gotra: "",
    district: "",
    state: "गुजरात (Gujarat)",
    occupation: "",
    bloodGroup: "",
    contact: "",
    other: "",
  });

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [memberId, setMemberId] = useState("AJM-2026-7841");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadState, setDownloadState] = useState<"idle" | "preparing" | "done">("idle");
  const [cardPhase, setCardPhase] = useState<"idle" | "preparing" | "ready">("idle");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [shareNotice, setShareNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardSectionRef = useRef<HTMLDivElement>(null);
  const prepareTimer = useRef<number | null>(null);
  const downloadTimer = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  // Official Membership Date
  const issueDate = "01/10/2026";

  useEffect(() => {
    return () => {
      if (prepareTimer.current) window.clearTimeout(prepareTimer.current);
      if (downloadTimer.current) window.clearTimeout(downloadTimer.current);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (formError) setFormError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (
      !formData.name.trim() ||
      !formData.gotra.trim() ||
      !formData.village.trim() ||
      !formData.district.trim() ||
      !formData.contact.trim()
    ) {
      setFormError("कृपया सभी अनिवार्य विवरण (*) भरें (Please fill all required fields)");
      return;
    }

    if (formData.contact.trim().length < 10) {
      setFormError("कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें (Please enter a valid 10-digit mobile number)");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);
    setCardPhase("preparing");

    try {
      const result = await MemberService.register({
        name: formData.name,
        fatherOrSpouse: formData.fatherOrSpouse || undefined,
        gotra: formData.gotra,
        village: formData.village,
        district: formData.district,
        state: formData.state,
        occupation: formData.occupation || undefined,
        bloodGroup: formData.bloodGroup || undefined,
        contact: formData.contact,
        photoUrl: photoUrl || undefined,
      });

      if (result?.data?.memberId) {
        setMemberId(result.data.memberId);
      }
      setSubmitted(true);

      cardSectionRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });

      if (prepareTimer.current) window.clearTimeout(prepareTimer.current);
      prepareTimer.current = window.setTimeout(() => {
        setCardPhase("ready");
        setIsSubmitting(false);
      }, PREPARE_MS);
    } catch (err: any) {
      setFormError(err?.message || "आवेदन जमा करने में समस्या हुई। कृपया पुनः प्रयास करें।");
      setIsSubmitting(false);
      setCardPhase("idle");
    }
  };

  // Renders the membership card to a high-resolution PNG and hands the data
  // URL back to the caller — used for both download and full-size preview.
  const buildCardImage = (onReady: (dataUrl: string) => void) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1050 x 650 standard Indian Community ID Card aspect ratio
      canvas.width = 1050;
      canvas.height = 650;

      const renderCanvas = (logoImg?: HTMLImageElement, photoImg?: HTMLImageElement) => {
        // Base rounded card
        const radius = 24;
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(canvas.width - radius, 0);
        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
        ctx.lineTo(canvas.width, canvas.height - radius);
        ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
        ctx.lineTo(radius, canvas.height);
        ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
        ctx.closePath();
        ctx.clip();

        // Clean ivory/white card body
        ctx.fillStyle = "#FCFBF8";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Security border
        ctx.strokeStyle = "#8B1E1E";
        ctx.lineWidth = 4;
        ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

        ctx.strokeStyle = "#C8A24A";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(14, 14, canvas.width - 28, canvas.height - 28);

        // Top Header Banner (Deep Maroon)
        ctx.fillStyle = "#8B1E1E";
        ctx.fillRect(14, 14, canvas.width - 28, 115);

        // Header Gold Accent Line
        ctx.fillStyle = "#C8A24A";
        ctx.fillRect(14, 129, canvas.width - 28, 4);

        // Draw Official Logo as Circular Seal in Header
        if (logoImg) {
          const sealX = 35;
          const sealY = 24;
          const sealSize = 90;

          // Circular white background for seal
          ctx.save();
          ctx.beginPath();
          ctx.arc(sealX + sealSize / 2, sealY + sealSize / 2, sealSize / 2, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.strokeStyle = "#C8A24A";
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.clip();
          ctx.drawImage(logoImg, sealX, sealY, sealSize, sealSize);
          ctx.restore();
        }

        // Header Typography
        ctx.textAlign = "center";

        // Organization Display Name: ONLY "ANJANA JAT MAHASABHA"
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 32px sans-serif";
        ctx.fillText("ANJANA JAT MAHASABHA", canvas.width / 2 + 30, 60);

        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 20px sans-serif";
        ctx.fillText("आंजना जाट महासभा", canvas.width / 2 + 30, 90);

        ctx.fillStyle = "#EAEAEA";
        ctx.font = "bold 13px sans-serif";
        ctx.letterSpacing = "2px";
        ctx.fillText("सदस्यता पहचान पत्र • MEMBERSHIP IDENTITY CARD", canvas.width / 2 + 30, 114);

        // Left Side: Passport Photo Box
        const photoX = 40;
        const photoY = 155;
        const photoW = 175;
        const photoH = 215;

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(photoX, photoY, photoW, photoH);
        ctx.strokeStyle = "#8B1E1E";
        ctx.lineWidth = 2.5;
        ctx.strokeRect(photoX, photoY, photoW, photoH);

        if (photoImg) {
          ctx.drawImage(photoImg, photoX, photoY, photoW, photoH);
        } else {
          // Clean professional avatar placeholder
          ctx.fillStyle = "#F3EFE6";
          ctx.fillRect(photoX, photoY, photoW, photoH);

          ctx.fillStyle = "#8B1E1E";
          ctx.beginPath();
          ctx.arc(photoX + photoW / 2, photoY + 90, 48, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 44px sans-serif";
          ctx.textAlign = "center";
          const initial = (formData.name ? formData.name.charAt(0) : "A").toUpperCase();
          ctx.fillText(initial, photoX + photoW / 2, photoY + 106);

          ctx.fillStyle = "#8B1E1E";
          ctx.font = "bold 13px sans-serif";
          ctx.fillText("सदस्य फोटो", photoX + photoW / 2, photoY + 170);
        }

        // Member ID below photo
        ctx.fillStyle = "#8B1E1E";
        ctx.fillRect(photoX, photoY + photoH + 12, photoW, 46);
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("सदस्य ID / MEMBER ID", photoX + photoW / 2, photoY + photoH + 28);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 16px monospace";
        ctx.fillText(memberId, photoX + photoW / 2, photoY + photoH + 48);

        // Center Column: Member Details
        const startX = 245;
        let curY = 170;
        ctx.textAlign = "left";

        // Full Name
        ctx.fillStyle = "#701414";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText("सदस्य का नाम / MEMBER NAME", startX, curY);

        ctx.fillStyle = "#1A1A1A";
        ctx.font = "bold 28px sans-serif";
        ctx.fillText(formData.name || "सदस्य का नाम", startX, curY + 32);

        if (formData.fatherOrSpouse) {
          ctx.fillStyle = "#555555";
          ctx.font = "14px sans-serif";
          ctx.fillText(`आत्मज / पत्नी: ${formData.fatherOrSpouse}`, startX, curY + 54);
          curY += 24;
        }

        // Details Grid
        const gridItems = [
          { label: "गोत्र (Gotra):", val: formData.gotra || "—" },
          { label: "गाँव (Village):", val: formData.village || "—" },
          { label: "जिला (District):", val: formData.district || "—" },
          { label: "राज्य (State):", val: formData.state || "गुजरात" },
          { label: "व्यवसाय (Occupation):", val: formData.occupation || "कृषि / व्यापार" },
          { label: "मोबाइल (Mobile):", val: formData.contact ? `${formData.contact.slice(0, 6)}XXXX` : "—" },
          { label: "रक्त समूह (Blood Group):", val: formData.bloodGroup || "—" },
          { label: "सदस्यता तिथि (Date):", val: issueDate },
        ];

        curY += 70;
        gridItems.forEach((item, idx) => {
          const colX = startX + (idx % 2 === 0 ? 0 : 255);
          const rowY = curY + Math.floor(idx / 2) * 50;

          ctx.fillStyle = "#8B1E1E";
          ctx.font = "bold 12px sans-serif";
          ctx.fillText(item.label, colX, rowY);

          ctx.fillStyle = "#222222";
          ctx.font = "bold 16px sans-serif";
          ctx.fillText(item.val, colX, rowY + 22);
        });

        // Right Column: QR Code & Official Seal Stamp
        const rightX = 810;

        // QR Code Box
        const qrCanvas = document.getElementById("member-qr-canvas") as HTMLCanvasElement | null;
        if (qrCanvas) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(rightX, 155, 175, 175);
          ctx.strokeStyle = "#8B1E1E";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(rightX, 155, 175, 175);

          ctx.drawImage(qrCanvas, rightX + 8, 163, 159, 159);

          ctx.fillStyle = "#555555";
          ctx.font = "bold 11px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("स्कैन कर सत्यापन करें", rightX + 175 / 2, 350);
        }

        // Official Circular Seal Stamp (Using website logo)
        const sealStampX = rightX + 10;
        const sealStampY = 385;
        const sealStampSize = 95;

        if (logoImg) {
          ctx.save();
          // Circular boundary for the seal
          ctx.beginPath();
          ctx.arc(
            sealStampX + sealStampSize / 2,
            sealStampY + sealStampSize / 2,
            sealStampSize / 2,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.strokeStyle = "#8B1E1E";
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.clip();
          ctx.drawImage(logoImg, sealStampX, sealStampY, sealStampSize, sealStampSize);
          ctx.restore();

          // Outer Gold Seal Ring
          ctx.beginPath();
          ctx.arc(
            sealStampX + sealStampSize / 2,
            sealStampY + sealStampSize / 2,
            sealStampSize / 2 + 4,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = "#C8A24A";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = "#8B1E1E";
          ctx.font = "bold 10px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("आधिकारिक मुहर", sealStampX + sealStampSize / 2, sealStampY + sealStampSize + 18);
        }

        // Authorized Signature
        ctx.textAlign = "center";
        ctx.strokeStyle = "#333333";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(rightX + 115, 460);
        ctx.lineTo(rightX + 185, 460);
        ctx.stroke();

        ctx.fillStyle = "#8B1E1E";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText("अधिकृत हस्ताक्षर", rightX + 150, 480);
        ctx.fillStyle = "#777777";
        ctx.font = "10px sans-serif";
        ctx.fillText("महासचिव", rightX + 150, 495);

        // Footer Bar
        ctx.fillStyle = "#8B1E1E";
        ctx.fillRect(14, canvas.height - 45, canvas.width - 28, 31);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "11px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
          "Anjana Jat Mahasabha • आधिकारिक डिजिटल पहचान पत्र • Helpline: +91 8788594494",
          canvas.width / 2,
          canvas.height - 25
        );

        onReady(canvas.toDataURL("image/png", 1.0));
      };

      // Load Logo first, then optional photo, then render
      const logo = new window.Image();
      logo.crossOrigin = "anonymous";
      logo.onload = () => {
        if (photoUrl) {
          const photo = new window.Image();
          photo.crossOrigin = "anonymous";
          photo.onload = () => renderCanvas(logo, photo);
          photo.onerror = () => renderCanvas(logo);
          photo.src = photoUrl;
        } else {
          renderCanvas(logo);
        }
      };
      logo.onerror = () => {
        if (photoUrl) {
          const photo = new window.Image();
          photo.crossOrigin = "anonymous";
          photo.onload = () => renderCanvas(undefined, photo);
          photo.onerror = () => renderCanvas();
          photo.src = photoUrl;
        } else {
          renderCanvas();
        }
      };
      logo.src = "/logo.png";
    } catch (err) {
      console.error("Error generating card image:", err);
      onReady("");
    }
  };

  // Download Card → Preparing… → Downloaded ✓
  const downloadCardAsPNG = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setDownloadState("preparing");

    buildCardImage((dataUrl) => {
      if (!dataUrl) {
        setIsGenerating(false);
        setDownloadState("idle");
        return;
      }

      const link = document.createElement("a");
      link.download = `Anjana_Jat_Card_${formData.name.replace(/\s+/g, "_") || "Member"}_${memberId}.png`;
      link.href = dataUrl;
      link.click();

      setIsGenerating(false);
      setDownloadState("done");
      setDownloadSuccess(true);

      if (downloadTimer.current) window.clearTimeout(downloadTimer.current);
      downloadTimer.current = window.setTimeout(() => {
        setDownloadState("idle");
        setDownloadSuccess(false);
      }, DOWNLOAD_FEEDBACK_MS);
    });
  };

  // Full-size preview reuses the download renderer, so what you view is exactly
  // what you get in the PNG.
  const handleViewCard = () => {
    setPreviewUrl(null);
    setIsPreviewOpen(true);
    buildCardImage((dataUrl) => setPreviewUrl(dataUrl || null));
  };

  const handlePrint = () => {
    window.print();
  };

  const qrVerificationValue = `https://aanjanajatmahasabha.org/verify?id=${memberId}&name=${encodeURIComponent(
    formData.name || "Member"
  )}&gotra=${encodeURIComponent(formData.gotra || "")}&village=${encodeURIComponent(
    formData.village || ""
  )}`;

  const handleShare = async () => {
    const shareTarget = navigator as Navigator & {
      share?: (data: {
        title?: string;
        text?: string;
        url?: string;
      }) => Promise<void>;
    };

    try {
      if (shareTarget.share) {
        await shareTarget.share({
          title: "Anjana Jat Mahasabha — सदस्यता पहचान पत्र",
          text: `सदस्य ID: ${memberId}`,
          url: qrVerificationValue,
        });
        return;
      }
      await navigator.clipboard.writeText(qrVerificationValue);
      setShareNotice("सत्यापन लिंक कॉपी हो गया (Verification link copied)");
    } catch {
      setShareNotice("शेयर पूरा नहीं हो सका (Could not share)");
    }

    window.setTimeout(() => setShareNotice(null), 2600);
  };

  return (
    <>
      <PageHero
        title="Free Lifetime Membership & Digital Card"
        titleHi="निःशुल्क आजीवन सदस्यता एवं डिजिटल कार्ड"
        subtitle="आंजना जाट महासभा का आधिकारिक डिजिटल सदस्यता पहचान पत्र प्राप्त करें और तुरंत डाउनलोड करें।"
        breadcrumbs={[{ label: "Membership", href: "/membership" }]}
      />

      {/* Hidden QR Code Canvas for High-Resolution Export */}
      <div className="hidden" aria-hidden="true">
        <QRCodeCanvas
          id="member-qr-canvas"
          value={qrVerificationValue}
          size={250}
          level="H"
          includeMargin={true}
        />
      </div>

      {/* Official notice band */}
      <section className="border-b border-border bg-background py-8">
        <div className="mx-auto max-w-3xl space-y-3 px-6 text-center">
          <p className="type-meta text-maroon">
            100% Free Lifetime Membership · पूर्णतः निःशुल्क सदस्यता
          </p>
          <h2 className="type-section-hi font-devanagari text-foreground">
            फॉर्म भरें और अपना डिजिटल पहचान पत्र (Card) तुरंत डाउनलोड करें
          </h2>
          <p className="type-caption text-muted-foreground">
            सभी आंजना जाट समाज बंधुओं के लिए सदस्यता आजीवन मुफ्त है। विवरण भरते ही
            आपका डिजिटल आईडी कार्ड तैयार हो जाएगा।
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            
            {/* Left Column: Registration Form (6 cols) */}
            <div className="relative rounded-lg border border-border bg-card p-6 md:p-8 lg:col-span-6">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="type-meta text-maroon">
                    Member Registration · सदस्य पंजीकरण
                  </p>
                  <h3 className="mt-2 font-devanagari text-xl font-semibold text-foreground">
                    {submitted ? "कार्ड विवरण एवं विकल्प" : "सदस्यता फॉर्म भरें"}
                  </h3>
                </div>
                {submitted && <p className="type-meta text-maroon">सत्यापित</p>}
              </div>

              {submitted ? (
                /* Post-submission summary — the card below is the hero */
                <div className="space-y-6">
                  <div>
                    <h4 className="font-devanagari text-lg font-semibold text-foreground">
                      बधाई हो, {formData.name || "बंधु"}!
                    </h4>
                    <p className="type-caption mt-2 text-muted-foreground">
                      आपकी सदस्यता स्वीकृत कर ली गई है। आपका आधिकारिक पहचान पत्र
                      दाईं ओर तैयार है।
                    </p>
                  </div>

                  <dl className="border-y border-border py-4">
                    <dt className="type-meta text-muted-foreground">
                      सदस्य ID / Member ID
                    </dt>
                    <dd className="mt-1 font-mono text-lg font-semibold text-maroon">
                      {memberId}
                    </dd>
                  </dl>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setCardPhase("idle");
                      setDownloadState("idle");
                    }}
                    className="btn-text"
                  >
                    <RotateCcw size={14} aria-hidden="true" />
                    विवरण संशोधित करें / नया फॉर्म भरें
                  </button>
                </div>
              ) : (
                /* Registration Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Photo Upload Field */}
                  <div className="p-4 rounded-2xl bg-muted/60 border border-dashed border-border flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center overflow-hidden shrink-0 relative">
                      {photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User size={28} className="text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        पासपोर्ट फ़ोटो अपलोड करें (Optional Photo for Card)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="text-xs text-muted-foreground file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-saffron file:text-white hover:file:bg-saffron-dark cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Grid 1: Name & Father/Spouse */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        1. पूरा नाम (Full Name) *
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-3 text-muted-foreground" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="अपना पूरा नाम दर्ज करें"
                          className="w-full pl-9 pr-3 py-2.5 rounded-md border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        2. पिता / पति का नाम (Father/Husband)
                      </label>
                      <input
                        type="text"
                        name="fatherOrSpouse"
                        value={formData.fatherOrSpouse}
                        onChange={handleChange}
                        placeholder="पिता या पति का नाम"
                        className="w-full px-3 py-2.5 rounded-md border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 text-sm"
                      />
                    </div>
                  </div>

                  {/* Grid 2: Gotra & Village */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        3. गोत्र (Gotra) *
                      </label>
                      <input
                        type="text"
                        name="gotra"
                        list="gotra-list"
                        required
                        value={formData.gotra}
                        onChange={handleChange}
                        placeholder="गोत्र चुनें या लिखें"
                        className="w-full px-3 py-2.5 rounded-md border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 text-sm"
                      />
                      <datalist id="gotra-list">
                        {aanjanaGotras.map((g) => (
                          <option key={g.id} value={`${g.hi} (${g.en})`} />
                        ))}
                      </datalist>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        4. गाँव / नगर (Village / Town) *
                      </label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3 top-3 text-muted-foreground" />
                        <input
                          type="text"
                          name="village"
                          required
                          value={formData.village}
                          onChange={handleChange}
                          placeholder="मूल गाँव का नाम"
                          className="w-full pl-9 pr-3 py-2.5 rounded-md border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Grid 3: District & State */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        5. जिला (District) *
                      </label>
                      <input
                        type="text"
                        name="district"
                        required
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="उदा. बनासकांठा, मेहसाणा, जालौर"
                        className="w-full px-3 py-2.5 rounded-md border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        6. राज्य (State) *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-md border border-border bg-muted text-foreground text-sm focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                      >
                        <option value="गुजरात (Gujarat)">गुजरात (Gujarat)</option>
                        <option value="राजस्थान (Rajasthan)">राजस्थान (Rajasthan)</option>
                        <option value="मध्य प्रदेश (Madhya Pradesh)">मध्य प्रदेश (Madhya Pradesh)</option>
                        <option value="महाराष्ट्र (Maharashtra)">महाराष्ट्र (Maharashtra)</option>
                        <option value="अन्य (Other)">अन्य (Other)</option>
                      </select>
                    </div>
                  </div>

                  {/* Grid 4: Occupation & Contact */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        7. व्यवसाय (Occupation)
                      </label>
                      <div className="relative">
                        <Briefcase size={16} className="absolute left-3 top-3 text-muted-foreground" />
                        <input
                          type="text"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                          placeholder="कृषि / व्यापार / नौकरी"
                          className="w-full pl-9 pr-3 py-2.5 rounded-md border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        8. मोबाइल नंबर (Contact) *
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-3 text-muted-foreground" />
                        <input
                          type="tel"
                          name="contact"
                          required
                          value={formData.contact}
                          onChange={handleChange}
                          placeholder="10 अंकों का मोबाइल नंबर"
                          className="w-full pl-9 pr-3 py-2.5 rounded-md border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Blood Group */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      9. रक्त समूह (Blood Group - Optional)
                    </label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-md border border-border bg-muted text-foreground text-sm focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                    >
                      <option value="">रक्त समूह चुनें (Select Blood Group)</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  {formError && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
                      <AlertCircle size={15} className="shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="btn btn-primary mt-4 w-full font-devanagari disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none"
                          aria-hidden="true"
                        />
                        कार्ड तैयार हो रहा है... (Preparing...)
                      </>
                    ) : (
                      <>
                        <CreditCard size={17} aria-hidden="true" />
                        पहचान पत्र बनाएं (Generate Membership ID Card)
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: the membership card is the hero here */}
            <div ref={cardSectionRef} className="scroll-mt-28 space-y-6 lg:col-span-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-devanagari text-base font-semibold text-foreground">
                  डिजिटल सदस्यता पहचान पत्र
                </h4>
                <p className="type-meta text-muted-foreground">
                  {submitted ? "आधिकारिक जारी" : "लाइव पूर्वावलोकन"}
                </p>
              </div>

              {/* State 1 & 2 — generation status, announced politely */}
              <div aria-live="polite">
                {cardPhase === "preparing" && (
                  <div className="flex flex-col gap-2.5 border-y border-border py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-border border-t-maroon motion-reduce:animate-none"
                        aria-hidden="true"
                      />
                      <p className="type-caption text-muted-foreground">
                        Preparing your digital membership card…{" "}
                        <span className="font-devanagari">
                          आपका डिजिटल पहचान पत्र तैयार हो रहा है...
                        </span>
                      </p>
                    </div>
                    {/* Subtle progress indicator */}
                    <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-maroon/70"
                        style={{
                          width: "100%",
                          animation: "fadeIn 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
                        }}
                      />
                    </div>
                  </div>
                )}

                {cardPhase === "ready" && (
                  <div className="flex items-center gap-3 border-y border-border py-4">
                    <span className="relative inline-flex shrink-0">
                      <DrawingCheck />
                      {!reduceMotion && (
                        <span
                          className="pointer-events-none absolute left-1/2 top-1/2"
                          aria-hidden="true"
                        >
                          {[-14, -8, 0, 7, 13].map((dx, i) => (
                            <span
                              key={dx}
                              className="absolute h-1 w-1 rounded-full bg-gold"
                              style={
                                {
                                  "--dx": `${dx}px`,
                                  animation: `particleRise 700ms cubic-bezier(0.22, 1, 0.36, 1) ${120 + i * 40}ms forwards`,
                                } as React.CSSProperties
                              }
                            />
                          ))}
                        </span>
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        ✓ Membership Card Ready · डिजिटल पहचान पत्र तैयार है
                      </p>
                      <p className="type-caption text-muted-foreground">
                        Your digital membership card has been created successfully. (आपका डिजिटल पहचान पत्र सफलतापूर्वक बन चुका है।)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* The card keeps its footprint while loading, so nothing shifts */}
              <div className="relative">
                {cardPhase === "preparing" && (
                  <div
                    className="skeleton absolute inset-0 z-10 rounded-lg"
                    aria-hidden="true"
                  />
                )}

                {/* Membership ID card */}
                <div
                  ref={cardRef}
                  data-card-state={cardPhase}
                  className={cn(
                    "relative select-none overflow-hidden rounded-lg border-2 border-maroon bg-[#FCFAF6] text-neutral-900 transition-[opacity,transform] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none print:border-black print:shadow-none",
                    cardPhase === "preparing"
                      ? "translate-y-3 scale-[0.985] opacity-0"
                      : "translate-y-0 scale-100 opacity-100"
                  )}
                  style={{ minHeight: "360px" }}
                >
                {/* Security Inner Double Border */}
                <div className="absolute inset-1.5 border border-gold/60 rounded-xl pointer-events-none" />

                {/* Card Header (Deep Maroon with Gold Pinstripe) */}
                <div className="relative bg-maroon text-white p-3.5 sm:p-4 border-b-2 border-gold flex items-center gap-3">
                  {/* Official Logo as Circular Seal */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gold p-0.5 bg-white shadow-md overflow-hidden shrink-0 flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="Anjana Jat Mahasabha Seal"
                      width={52}
                      height={52}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>

                  {/* Header Title: ONLY ANJANA JAT MAHASABHA */}
                  <div className="flex-1 text-center pr-2">
                    <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-wide uppercase text-white font-sans">
                      ANJANA JAT MAHASABHA
                    </h2>
                    <p className="text-xs sm:text-sm font-bold text-gold font-devanagari">
                      आंजना जाट महासभा
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-white/85 tracking-wider uppercase font-medium mt-0.5">
                      सदस्यता पहचान पत्र • MEMBERSHIP IDENTITY CARD
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 grid grid-cols-12 gap-3 sm:gap-4 items-center">
                  
                  {/* Left: Member Photo & ID (4 cols) */}
                  <div className="col-span-4 flex flex-col items-center">
                    <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-lg bg-neutral-100 border-2 border-maroon flex items-center justify-center overflow-hidden shadow-sm relative">
                      {photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={photoUrl}
                          alt="Member"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-100 flex flex-col items-center justify-center text-center p-2">
                          <User size={38} className="text-maroon/60" />
                          <span className="text-[10px] text-neutral-500 font-devanagari mt-1">सदस्य फ़ोटो</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 w-full text-center py-1 px-1.5 rounded bg-maroon text-white">
                      <span className="text-[9px] block text-gold uppercase tracking-wider font-semibold">MEMBER ID</span>
                      <span className="text-xs sm:text-sm font-mono font-bold">{memberId}</span>
                    </div>
                  </div>

                  {/* Center: Member Information (8 cols) */}
                  <div className="col-span-8 space-y-1.5 text-xs text-neutral-800">
                    <div>
                      <p className="text-[10px] text-neutral-500 font-semibold uppercase">नाम / Full Name</p>
                      <h3 className="text-base sm:text-lg font-bold font-devanagari text-maroon truncate">
                        {formData.name || "सदस्य का नाम"}
                      </h3>
                      {formData.fatherOrSpouse && (
                        <p className="text-[11px] text-neutral-600">
                          आत्मज/पत्नी: {formData.fatherOrSpouse}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] sm:text-xs pt-1 border-t border-neutral-200">
                      <div>
                        <span className="text-neutral-500 text-[10px] block">गोत्र (Gotra)</span>
                        <span className="font-bold text-neutral-900 font-devanagari">
                          {formData.gotra || "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] block">गाँव (Village)</span>
                        <span className="font-bold text-neutral-900 font-devanagari">
                          {formData.village || "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] block">जिला (District)</span>
                        <span className="font-bold text-neutral-900">
                          {formData.district || "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] block">राज्य (State)</span>
                        <span className="font-bold text-neutral-900">
                          {formData.state?.split(" ")[0] || "गुजरात"}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] block">मोबाइल (Mobile)</span>
                        <span className="font-semibold text-neutral-800">
                          {formData.contact ? `${formData.contact.slice(0, 6)}XXXX` : "—"}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] block">सदस्यता तिथि (Date)</span>
                        <span className="font-semibold text-neutral-800">
                          {issueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Area: QR Code, Official Seal & Signatory */}
                <div className="px-4 py-2 bg-neutral-100/90 border-t border-neutral-200 flex items-center justify-between">
                  {/* Left: Verification QR */}
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-white border border-neutral-300 shadow-xs">
                      <QRCodeCanvas
                        value={qrVerificationValue}
                        size={48}
                        level="M"
                      />
                    </div>
                    <div className="text-[9px] text-neutral-600 leading-tight">
                      <p className="font-bold text-neutral-700">सत्यापित पहचान</p>
                      <p>Scan to Verify</p>
                    </div>
                  </div>

                  {/* Right: Official Circular Stamp Seal with Logo & Authorized Signatory */}
                  <div className="flex items-center gap-2.5">
                    {/* Official Circular Seal */}
                    <div className="w-10 h-10 rounded-full border-2 border-maroon p-0.5 bg-white shadow-xs flex items-center justify-center shrink-0">
                      <Image
                        src="/logo.png"
                        alt="Official Seal Stamp"
                        width={36}
                        height={36}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-0.5 bg-neutral-400 ml-auto mb-1" />
                      <p className="text-[10px] font-bold text-maroon font-devanagari">अधिकृत हस्ताक्षर</p>
                      <p className="text-[8px] text-neutral-500">महासचिव</p>
                    </div>
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="bg-maroon text-white text-[9px] text-center py-1 font-medium">
                  Anjana Jat Mahasabha • www.aanjanajat.org
                </div>
                </div>
              </div>

              {/* Actions — revealed smoothly with/after the card */}
              <div
                className={cn(
                  "space-y-3 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  cardPhase === "preparing"
                    ? "opacity-0 translate-y-2 pointer-events-none"
                    : "opacity-100 translate-y-0 delay-100"
                )}
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={downloadCardAsPNG}
                    disabled={isGenerating}
                    aria-busy={downloadState === "preparing"}
                    className="btn btn-primary flex-1"
                  >
                    {downloadState === "preparing" ? (
                      <>
                        <span
                          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none"
                          aria-hidden="true"
                        />
                        Preparing…
                      </>
                    ) : downloadState === "done" ? (
                      <>
                        <Check size={16} aria-hidden="true" />
                        Downloaded ✓
                      </>
                    ) : (
                      <>
                        <Download size={16} aria-hidden="true" />
                        Download Card
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="btn btn-secondary flex-1"
                  >
                    <Share2 size={16} aria-hidden="true" />
                    Share
                  </button>

                  <button
                    type="button"
                    onClick={handleViewCard}
                    className="btn btn-secondary flex-1"
                  >
                    <Eye size={16} aria-hidden="true" />
                    View
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="btn-text text-muted-foreground hover:text-maroon"
                  >
                    <Printer size={14} aria-hidden="true" />
                    प्रिंट करें / Print as PDF
                  </button>
                  <p className="type-meta text-muted-foreground">
                    High-res PNG · 1050 × 650 px
                  </p>
                </div>

                {shareNotice && (
                  <p className="type-caption text-muted-foreground" role="status">
                    {shareNotice}
                  </p>
                )}

                {downloadSuccess && (
                  <p
                    className="type-caption flex items-center gap-1.5 text-maroon"
                    role="status"
                  >
                    <Check size={14} aria-hidden="true" />
                    पहचान पत्र सफलतापूर्वक डाउनलोड हो गया है!
                  </p>
                )}
              </div>

              {/* Member Benefits */}
              <div className="rounded-lg border border-border bg-card p-5">
                <h5 className="font-devanagari text-sm font-semibold text-foreground">
                  आजीवन सदस्यता के मुख्य लाभ
                </h5>
                <ul className="mt-3 space-y-2">
                  <li className="type-caption flex items-start gap-3 text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-maroon"
                    />
                    <span>आधिकारिक डिजिटल पहचान पत्र एवं सत्यापन सुविधा</span>
                  </li>
                  <li className="type-caption flex items-start gap-3 text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-maroon"
                    />
                    <span>
                      महासभा के सभी सामाजिक सम्मेलनों एवं अधिवेशनों में सहभागिता
                    </span>
                  </li>
                  <li className="type-caption flex items-start gap-3 text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-maroon"
                    />
                    <span>
                      छात्रवृत्ति, रक्तदान हेल्पलाइन एवं युवा मार्गदर्शन नेटवर्क से
                      जुड़ाव
                    </span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full-size card preview — same renderer as the download */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Membership card preview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="type-meta text-white/70">
                  Membership Card · पूर्ण आकार
                </p>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  aria-label="Close preview"
                  className="rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt={`${formData.name || "सदस्य"} का सदस्यता पहचान पत्र`}
                  className="w-full rounded-md border border-white/15"
                />
              ) : (
                <div
                  className="skeleton aspect-[1050/650] w-full rounded-md"
                  aria-hidden="true"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
