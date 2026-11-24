"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  User,
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
import { MemberService } from "@/services/member.service";
import { useLanguage } from "@/context/LanguageContext";

const PREPARE_MS = 800;
const DOWNLOAD_FEEDBACK_MS = 2200;

const RING_LENGTH = 88;
const TICK_LENGTH = 22;

function DrawingCheck() {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 32 32"
      fill="none"
      className="shrink-0 text-[#B52A12]"
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray={RING_LENGTH}
        strokeDashoffset={RING_LENGTH}
        style={{
          animation: "drawCheck 480ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
      />
      <path
        d="M10.5 16.4l3.8 3.8 7.6-8.6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={TICK_LENGTH}
        strokeDashoffset={TICK_LENGTH}
        style={{
          animation: "drawCheck 320ms cubic-bezier(0.22, 1, 0.36, 1) 340ms forwards",
        }}
      />
    </svg>
  );
}

export default function MembershipPageClient() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    fatherOrSpouse: "",
    village: "",
    gotra: "",
    district: "",
    state: "Rajasthan",
    designation: "सक्रिय सदस्य",
    occupation: "",
    bloodGroup: "",
    contact: "",
    other: "",
  });

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [memberId, setMemberId] = useState("AJM-2026-0745");
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

  // Official Membership Issue Date
  const issueDate = "22-09-2026";

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
      setFormError(
        t({
          en: "Please fill all required fields (*)",
          hi: "कृपया सभी अनिवार्य विवरण (*) भरें",
          gu: "કૃપા કરીને તમામ જરૂરી વિગતો (*) ભરો",
        })
      );
      return;
    }

    if (formData.contact.trim().length < 10) {
      setFormError(
        t({
          en: "Please enter a valid 10-digit mobile number",
          hi: "कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें",
          gu: "કૃપા કરીને માન્ય 10 અંકનો મોબાઇલ નંબર દાખલ કરો",
        })
      );
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
      setFormError(
        err?.message ||
          t({
            en: "An error occurred while submitting. Please try again.",
            hi: "आवेदन जमा करने में समस्या हुई। कृपया पुनः प्रयास करें।",
            gu: "અરજી સબમિટ કરવામાં સમસ્યા આવી. કૃપા કરીને ફરી પ્રયાસ કરો.",
          })
      );
      setIsSubmitting(false);
      setCardPhase("idle");
    }
  };

  // 300 DPI Vertical Portrait Identity Card Canvas Renderer
  const buildCardImage = (onReady: (dataUrl: string) => void) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Crisp 300 DPI Vertical Badge aspect ratio
      canvas.width = 800;
      canvas.height = 1260;

      const renderCanvas = (logoImg?: HTMLImageElement, photoImg?: HTMLImageElement) => {
        // Base rounded card clipping
        const radius = 32;
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

        // Imperial Ivory background
        ctx.fillStyle = "#FFF9EC";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Security Outer Kesari Red border
        ctx.strokeStyle = "#B52A12";
        ctx.lineWidth = 4;
        ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

        // Security Inner Royal Gold hairline border
        ctx.strokeStyle = "#D9A52B";
        ctx.lineWidth = 1.8;
        ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

        // Top Lanyard slot cutout
        const slotW = 120;
        const slotH = 16;
        const slotX = (canvas.width - slotW) / 2;
        const slotY = 26;
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(slotX, slotY, slotW, slotH, 8);
        } else {
          ctx.rect(slotX, slotY, slotW, slotH);
        }
        ctx.fillStyle = "#FAF2E0";
        ctx.fill();
        ctx.strokeStyle = "#D9A52B";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Header Circular Emblem on top-left
        const logoX = 42;
        const logoY = 56;
        const logoSize = 104;

        if (logoImg) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.strokeStyle = "#D9A52B";
          ctx.lineWidth = 2.5;
          ctx.stroke();
          ctx.clip();
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
          ctx.restore();
        }

        // Header Titles
        ctx.textAlign = "left";
        ctx.fillStyle = "#B52A12";
        ctx.font = "bold 36px sans-serif";
        ctx.fillText("आँजणा जाट महासभा", 165, 96);

        ctx.fillStyle = "#29211D";
        ctx.font = "bold 18px sans-serif";
        ctx.fillText("ANJANA JAT MAHASABHA", 165, 126);

        ctx.fillStyle = "#E66A16";
        ctx.font = "bold 15px sans-serif";
        ctx.fillText("एकता • सम्मान • समाज सेवा", 165, 154);

        // Header Gold Accent Hairline
        ctx.strokeStyle = "#D9A52B";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(30, 178);
        ctx.lineTo(canvas.width - 30, 178);
        ctx.stroke();

        // Left Side: Passport Photo Box
        const photoX = 42;
        const photoY = 205;
        const photoW = 240;
        const photoH = 300;

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(photoX, photoY, photoW, photoH);

        // Double border: Kesari outer, Gold inner
        ctx.strokeStyle = "#B52A12";
        ctx.lineWidth = 3;
        ctx.strokeRect(photoX, photoY, photoW, photoH);

        ctx.strokeStyle = "#D9A52B";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(photoX + 4, photoY + 4, photoW - 8, photoH - 8);

        if (photoImg) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(photoX + 5, photoY + 5, photoW - 10, photoH - 10);
          ctx.clip();
          ctx.drawImage(photoImg, photoX + 5, photoY + 5, photoW - 10, photoH - 10);
          ctx.restore();
        } else {
          ctx.fillStyle = "#FAF2E0";
          ctx.fillRect(photoX + 5, photoY + 5, photoW - 10, photoH - 10);
          ctx.fillStyle = "#B52A12";
          ctx.beginPath();
          ctx.arc(photoX + photoW / 2, photoY + 120, 52, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 44px sans-serif";
          ctx.textAlign = "center";
          const initial = formData.name ? formData.name.charAt(0) : "आ";
          ctx.fillText(initial, photoX + photoW / 2, photoY + 136);

          ctx.fillStyle = "#5C4E46";
          ctx.font = "bold 15px sans-serif";
          ctx.fillText("Member Photo", photoX + photoW / 2, photoY + 220);
        }

        // Member ID box directly below photo
        ctx.fillStyle = "#B52A12";
        ctx.fillRect(photoX, photoY + photoH + 12, photoW, 56);
        ctx.fillStyle = "#D9A52B";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("सदस्य क्रमांक (MEMBER ID)", photoX + photoW / 2, photoY + photoH + 32);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 20px monospace";
        ctx.fillText(memberId, photoX + photoW / 2, photoY + photoH + 56);

        // Right Side: Colon-Aligned Traditional Form Details
        const startFieldX = 308;
        let fieldY = 235;
        const fieldLineHeight = 44;

        const fields = [
          { label: "नाम :", val: formData.name || "रामसिंहजी आँजणा" },
          { label: "पिता/पति :", val: formData.fatherOrSpouse || "भंवरलालजी" },
          { label: "गोत्र :", val: formData.gotra || "राठौड़" },
          { label: "ग्राम :", val: formData.village || "खींवदी खेड़ा" },
          { label: "जिला :", val: formData.district || "जोधपुर" },
          { label: "पद :", val: formData.designation || "सक्रिय सदस्य" },
          { label: "सदस्य क्रमांक :", val: memberId },
          { label: "जारी दिनांक :", val: issueDate },
        ];

        fields.forEach((f) => {
          ctx.textAlign = "left";
          ctx.fillStyle = "#5C4E46";
          ctx.font = "bold 17px sans-serif";
          ctx.fillText(f.label, startFieldX, fieldY);

          ctx.fillStyle = "#29211D";
          ctx.font = "bold 19px sans-serif";
          ctx.fillText(f.val, startFieldX + 130, fieldY);

          fieldY += fieldLineHeight;
        });

        // Middle Divider
        ctx.strokeStyle = "rgba(217, 165, 43, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(30, 605);
        ctx.lineTo(canvas.width - 30, 605);
        ctx.stroke();

        // Verification & Signatory Section
        const qrBoxX = 55;
        const qrBoxY = 635;
        const qrSize = 190;

        const qrCanvas = document.getElementById("member-qr-canvas") as HTMLCanvasElement | null;
        if (qrCanvas) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(qrBoxX, qrBoxY, qrSize, qrSize);
          ctx.strokeStyle = "#B52A12";
          ctx.lineWidth = 2;
          ctx.strokeRect(qrBoxX, qrBoxY, qrSize, qrSize);
          ctx.drawImage(qrCanvas, qrBoxX + 10, qrBoxY + 10, qrSize - 20, qrSize - 20);

          ctx.fillStyle = "#B52A12";
          ctx.font = "bold 14px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("डिजिटल सत्यापन", qrBoxX + qrSize / 2, qrBoxY + qrSize + 22);

          ctx.fillStyle = "#5C4E46";
          ctx.font = "11px sans-serif";
          ctx.fillText("SCAN TO VERIFY", qrBoxX + qrSize / 2, qrBoxY + qrSize + 38);
        }

        // Right: Official Circular Seal Stamp & Authorized Signatory
        const stampX = 520;
        const stampY = 725;
        const stampRadius = 72;

        if (logoImg) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(stampX, stampY, stampRadius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fill();
          ctx.strokeStyle = "#B52A12";
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.clip();
          ctx.globalAlpha = 0.85;
          ctx.drawImage(logoImg, stampX - stampRadius, stampY - stampRadius, stampRadius * 2, stampRadius * 2);
          ctx.restore();

          ctx.fillStyle = "#B52A12";
          ctx.font = "bold 13px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("आधिकारिक मोहर", stampX, stampY + stampRadius + 20);
        }

        // Signatory Line
        const sigLineY = 930;
        ctx.strokeStyle = "#29211D";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(stampX - 110, sigLineY);
        ctx.lineTo(stampX + 110, sigLineY);
        ctx.stroke();

        ctx.fillStyle = "#B52A12";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("अधिकृत हस्ताक्षर", stampX, sigLineY + 24);

        ctx.fillStyle = "#5C4E46";
        ctx.font = "13px sans-serif";
        ctx.fillText("महासचिव, आँजणा जाट महासभा", stampX, sigLineY + 44);

        // Motto Ribbon
        ctx.fillStyle = "#B52A12";
        ctx.font = "bold 17px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("साथ हैं तो शक्ति हैं, संगठन है तो समृद्धि है", canvas.width / 2, 1085);

        ctx.fillStyle = "#D9A52B";
        ctx.font = "bold 13px sans-serif";
        ctx.fillText("• PRESERVING HERITAGE • EMPOWERING SOCIETY •", canvas.width / 2, 1110);

        // Bottom Kesari Red Solid Banner
        const footerH = 100;
        const footerY = canvas.height - footerH;
        ctx.fillStyle = "#B52A12";
        ctx.fillRect(0, footerY, canvas.width, footerH);

        // Gold Hairline above footer
        ctx.fillStyle = "#D9A52B";
        ctx.fillRect(0, footerY, canvas.width, 4);

        // Devanagari Footer Title
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 34px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("आँजणा जाट महासभा", canvas.width / 2, footerY + 54);

        ctx.fillStyle = "#FFF9EC";
        ctx.font = "bold 13px sans-serif";
        ctx.fillText("ANJANA JAT MAHASABHA • OFFICIAL MEMBERSHIP BADGE", canvas.width / 2, footerY + 82);

        onReady(canvas.toDataURL("image/png", 1.0));
      };

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
      console.error("Error generating vertical card image:", err);
      onReady("");
    }
  };

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
      link.download = `Aanjanna_Jat_ID_Badge_${formData.name.replace(/\s+/g, "_") || "Member"}_${memberId}.png`;
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

  const handleViewCard = () => {
    setPreviewUrl(null);
    setIsPreviewOpen(true);
    buildCardImage((dataUrl) => setPreviewUrl(dataUrl || null));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: "Anjana Jat Mahasabha — Membership ID Card",
      text: `Official Digital Identity Card: ${formData.name || "Member"} (${memberId})`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShareNotice(
        t({
          en: "Link copied to clipboard",
          hi: "लिंक कॉपी हो गया",
          gu: "લિંક કૉપિ થઈ ગઈ",
        })
      );
      setTimeout(() => setShareNotice(null), 3000);
    }
  };

  const qrVerificationValue = `https://aanjanajatmahasabha.org/verify?id=${memberId}&name=${encodeURIComponent(
    formData.name || "रामसिंहजी आँजणा"
  )}&gotra=${encodeURIComponent(formData.gotra || "राठौड़")}&village=${encodeURIComponent(
    formData.village || "खींवदी खेड़ा"
  )}&district=${encodeURIComponent(formData.district || "जोधपुर")}&desig=${encodeURIComponent(
    formData.designation || "सक्रिय सदस्य"
  )}`;

  return (
    <>
      <PageHero
        title={t("membershipPageTitle")}
        titleHi="आँजणा जाट महासभा"
        subtitle={t("membershipPageSub")}
        breadcrumbs={[
          { label: t("navHome"), href: "/" },
          { label: t("navMembership"), href: "/membership" },
        ]}
      />

      {/* Hidden QR Code generation canvas for high contrast canvas rendering */}
      <div className="sr-only" aria-hidden="true">
        <QRCodeCanvas
          id="member-qr-canvas"
          value={qrVerificationValue}
          size={180}
          level="H"
          bgColor="#FFFFFF"
          fgColor="#29211D"
        />
      </div>

      <div className="bg-[#FFF9EC] min-h-screen py-12 md:py-16 text-[#29211D] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Membership Registration Form */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-[#D9A52B]/40 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#29211D]/10">
                <div className="w-10 h-10 rounded-full bg-[#B52A12] text-white flex items-center justify-center font-bold shrink-0">
                  <CreditCard size={20} className="text-[#D9A52B]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#B52A12] font-sans">
                    {t("formHeading")}
                  </h3>
                  <p className="text-xs text-[#5C4E46] font-sans">
                    {t("formSubheading")}
                  </p>
                </div>
              </div>

              {submitted && cardPhase === "ready" ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#FAF2E0] border border-[#D9A52B]/60 text-xs sm:text-sm text-[#29211D]">
                    <p className="font-bold text-[#B52A12] mb-1">
                      {t({
                        en: "✓ Your application has been registered successfully!",
                        hi: "✓ आपका आवेदन सफलतापूर्वक दर्ज कर लिया गया है!",
                        gu: "✓ તમારી અરજી સફળતાપૂર્વક નોંધાઈ ગઈ છે!",
                      })}
                    </p>
                    <p className="text-[#5C4E46]">
                      {t({
                        en: `Your Member ID is ${memberId}. You can now download or print your official vertical badge.`,
                        hi: `आपका सदस्य क्रमांक ${memberId} जारी कर दिया गया है। आप अपने वर्टिकल बैज को डाउनलोड या प्रिंट कर सकते हैं।`,
                        gu: `તમારો સભ્ય નંબર ${memberId} જારી કરવામાં આવ્યો છે. તમે તમારું ઓળખપત્ર ડાઉનલોડ અથવા પ્રિન્ટ કરી શકો છો.`,
                      })}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setCardPhase("idle");
                    }}
                    className="w-full py-3 rounded-full border border-[#D9A52B] text-xs font-bold text-[#B52A12] hover:bg-[#FAF2E0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    {t({
                      en: "Submit Another Member Entry",
                      hi: "अन्य सदस्य का विवरण भरें",
                      gu: "અન્ય સભ્યની વિગત ભરો",
                    })}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-xs font-bold text-[#29211D] mb-1.5 font-sans">
                      {t("photoLabel")}
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 rounded-lg bg-[#FAF2E0] border border-[#D9A52B]/50 flex items-center justify-center overflow-hidden shrink-0">
                        {photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <User size={24} className="text-[#B52A12]/60" />
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="w-full text-xs text-[#5C4E46] file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#B52A12] file:text-white hover:file:bg-[#8F1F0B] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Name & Father/Spouse */}
                  <div className="grid md:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#29211D] mb-1 font-sans">
                        {t("nameLabel")} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t({ en: "e.g. Ramsinghji Anjana", hi: "उदा. रामसिंहजी आँजणा", gu: "દા.ત. રામસિંહજી આંજણા" })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#29211D]/15 bg-[#FFF9EC]/40 text-[#29211D] text-xs sm:text-sm focus:border-[#B52A12] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#29211D] mb-1 font-sans">
                        {t("fatherLabel")}
                      </label>
                      <input
                        type="text"
                        name="fatherOrSpouse"
                        value={formData.fatherOrSpouse}
                        onChange={handleChange}
                        placeholder={t({ en: "e.g. Bhanwarlalji", hi: "उदा. भंवरलालजी", gu: "દા.ત. ભંવરલાલજી" })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#29211D]/15 bg-[#FFF9EC]/40 text-[#29211D] text-xs sm:text-sm focus:border-[#B52A12] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Gotra & Designation */}
                  <div className="grid md:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#29211D] mb-1 font-sans">
                        {t("gotraLabel")} *
                      </label>
                      <select
                        name="gotra"
                        required
                        value={formData.gotra}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#29211D]/15 bg-[#FFF9EC]/40 text-[#29211D] text-xs sm:text-sm focus:border-[#B52A12] focus:outline-none cursor-pointer"
                      >
                        <option value="">{t({ en: "Select Gotra", hi: "गोत्र चुनें", gu: "ગોત્ર પસંદ કરો" })}</option>
                        {aanjanaGotras.map((g) => (
                          <option key={g.en} value={g.hi}>
                            {language === "gu" ? g.gu : language === "en" ? g.en : g.hi}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#29211D] mb-1 font-sans">
                        {t("desigLabel")}
                      </label>
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#29211D]/15 bg-[#FFF9EC]/40 text-[#29211D] text-xs sm:text-sm focus:border-[#B52A12] focus:outline-none cursor-pointer"
                      >
                        <option value="सक्रिय सदस्य">{t({ en: "Active Member", hi: "सक्रिय सदस्य", gu: "સક્રિય સભ્ય" })}</option>
                        <option value="प्रदेश सचिव">{t({ en: "State Secretary", hi: "प्रदेश सचिव", gu: "પ્રદેશ સચિવ" })}</option>
                        <option value="जिला अध्यक्ष">{t({ en: "District President", hi: "जिला अध्यक्ष", gu: "જિલ્લા પ્રમુખ" })}</option>
                        <option value="तहसील अध्यक्ष">{t({ en: "Tehsil President", hi: "तहसील अध्यक्ष", gu: "તાલુકા પ્રમુખ" })}</option>
                        <option value="युवा प्रतिनिधि">{t({ en: "Youth Representative", hi: "युवा प्रतिनिधि", gu: "યુવા પ્રતિનિધિ" })}</option>
                        <option value="महिला प्रतिनिधि">{t({ en: "Women Representative", hi: "महिला प्रतिनिधि", gu: "મહિલા પ્રતિનિધિ" })}</option>
                        <option value="संरक्षक">{t({ en: "Patron", hi: "संरक्षक", gu: "વાલી / સંરક્ષક" })}</option>
                        <option value="समाजसेवी">{t({ en: "Social Worker", hi: "समाजसेवी", gu: "સમાજસેવક" })}</option>
                      </select>
                    </div>
                  </div>

                  {/* Village & District */}
                  <div className="grid md:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#29211D] mb-1 font-sans">
                        {t("villageLabel")} *
                      </label>
                      <input
                        type="text"
                        name="village"
                        required
                        value={formData.village}
                        onChange={handleChange}
                        placeholder={t({ en: "e.g. Khimvandi Kheda", hi: "उदा. खींवदी खेड़ा", gu: "દા.ત. ખીંવદી ખેડા" })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#29211D]/15 bg-[#FFF9EC]/40 text-[#29211D] text-xs sm:text-sm focus:border-[#B52A12] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#29211D] mb-1 font-sans">
                        {t("districtLabel")} *
                      </label>
                      <input
                        type="text"
                        name="district"
                        required
                        value={formData.district}
                        onChange={handleChange}
                        placeholder={t({ en: "e.g. Jodhpur / Mehsana", hi: "उदा. जोधपुर / मेहसाणा", gu: "દા.ત. જોધપુર / મહેસાણા" })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#29211D]/15 bg-[#FFF9EC]/40 text-[#29211D] text-xs sm:text-sm focus:border-[#B52A12] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* State & Contact */}
                  <div className="grid md:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#29211D] mb-1 font-sans">
                        {t("stateLabel")} *
                      </label>
                      <select
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#29211D]/15 bg-[#FFF9EC]/40 text-[#29211D] text-xs sm:text-sm focus:border-[#B52A12] focus:outline-none cursor-pointer"
                      >
                        <option value="Rajasthan">{t({ en: "Rajasthan", hi: "राजस्थान", gu: "રાજસ્થાન" })}</option>
                        <option value="Gujarat">{t({ en: "Gujarat", hi: "गुजरात", gu: "ગુજરાત" })}</option>
                        <option value="Madhya Pradesh">{t({ en: "Madhya Pradesh", hi: "मध्य प्रदेश", gu: "મધ્ય પ્રદેશ" })}</option>
                        <option value="Maharashtra">{t({ en: "Maharashtra", hi: "महाराष्ट्र", gu: "મહારાષ્ટ્ર" })}</option>
                        <option value="Other">{t({ en: "Other State", hi: "अन्य राज्य", gu: "અન્ય રાજ્ય" })}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#29211D] mb-1 font-sans">
                        {t("contactLabel")} *
                      </label>
                      <input
                        type="tel"
                        name="contact"
                        required
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#29211D]/15 bg-[#FFF9EC]/40 text-[#29211D] text-xs sm:text-sm focus:border-[#B52A12] focus:outline-none"
                      />
                    </div>
                  </div>

                  {formError && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle size={15} className="shrink-0 text-red-600" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-3.5 rounded-full bg-[#B52A12] text-white text-sm font-bold border border-[#D9A52B] shadow-sm hover:bg-[#8F1F0B] transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} className="text-[#D9A52B]" />
                        <span>{t("btnGenerateBadge")}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Physical Vertical Lanyard Badge Representation */}
            <div ref={cardSectionRef} className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-4 px-2">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#B52A12] font-sans">
                    {t("badgeLiveTitle")}
                  </h4>
                  <p className="text-xs text-[#5C4E46] font-sans">
                    Official Vertical Lanyard Badge (Brand Kit Specification)
                  </p>
                </div>
              </div>

              {/* Status Notice */}
              {cardPhase === "ready" && (
                <div className="w-full mb-4 p-3 rounded-xl bg-white border border-[#D9A52B]/50 shadow-xs flex items-center gap-3">
                  <DrawingCheck />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#B52A12]">
                      {t({
                        en: "Identity Card Generated Successfully",
                        hi: "पहचान पत्र सफलतापूर्वक तैयार है",
                        gu: "ઓળખપત્ર સફળતાપૂર્વક તૈયાર છે",
                      })}
                    </p>
                    <p className="text-[11px] text-[#5C4E46]">
                      {t({
                        en: "Download your 300 DPI print-ready PNG badge below.",
                        hi: "नीचे दिए गए बटन से 300 DPI प्रिंट-रेडी PNG डाउनलोड करें।",
                        gu: "નીચેના બટન પરથી 300 DPI પ્રિન્ટ-રેડી PNG ડાઉનલોડ કરો.",
                      })}
                    </p>
                  </div>
                </div>
              )}

              {/* VERTICAL BADGE CONTAINER WITH WOVEN LANYARD & METALLIC CLIP */}
              <div className="relative flex flex-col items-center w-full max-w-[390px]">
                {/* 1. TOP WOVEN KESARI RED LANYARD RIBBON */}
                <div className="relative w-11 h-20 bg-[#B52A12] shadow-md flex flex-col items-center justify-start overflow-hidden border-x border-[#8F1F0B]">
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 6px)",
                    }}
                  />
                  <span
                    className="text-[9px] font-bold text-[#D9A52B] uppercase tracking-wider font-devanagari select-none whitespace-nowrap mt-2"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                    }}
                  >
                    आँजणा जाट महासभा
                  </span>
                </div>

                {/* 2. REALISTIC METALLIC CLIP AT CENTER */}
                <div className="relative -mt-2 z-20 flex flex-col items-center">
                  <div className="w-9 h-5 rounded-xs bg-gradient-to-b from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8] border border-[#64748b] shadow-md flex items-center justify-center">
                    <div className="w-4 h-1.5 rounded-full bg-[#475569] shadow-inner" />
                  </div>
                  <div className="w-6 h-5 -mt-1 border-2 border-[#94a3b8] rounded-b-md bg-gradient-to-r from-[#cbd5e1] via-[#f8fafc] to-[#94a3b8] shadow-sm flex items-center justify-center">
                    <div className="w-2.5 h-2 rounded-xs bg-[#475569]/30" />
                  </div>
                </div>

                {/* 3. CARD BODY (PORTRAIT ORIENTATION) */}
                <div
                  ref={cardRef}
                  className="relative -mt-1 w-full bg-[#FFF9EC] text-[#29211D] rounded-2xl border-2 border-[#B52A12] shadow-xl overflow-hidden select-none"
                  style={{ minHeight: "560px" }}
                >
                  {/* Inner Hairline Royal Gold Security Border */}
                  <div className="absolute inset-2 border border-[#D9A52B] rounded-xl pointer-events-none z-10" />

                  {/* Lanyard Slot Cutout */}
                  <div className="w-16 h-2 rounded-full bg-[#FAF2E0] border border-[#D9A52B]/50 mx-auto mt-3 shadow-inner" />

                  {/* Card Header */}
                  <div className="pt-2 px-4 pb-3 flex items-center gap-3 border-b border-[#D9A52B]/40">
                    <div className="w-13 h-13 rounded-full p-0.5 bg-white border-2 border-[#D9A52B] shadow-xs shrink-0 flex items-center justify-center">
                      <Image
                        src="/logo.png"
                        alt="Anjana Jat Mahasabha Seal"
                        width={48}
                        height={48}
                        className="w-full h-full rounded-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base sm:text-lg font-extrabold font-devanagari text-[#B52A12] leading-tight">
                        आँजणा जाट महासभा
                      </h2>
                      <p className="text-[10px] font-bold text-[#29211D] tracking-wider uppercase font-sans">
                        ANJANA JAT MAHASABHA
                      </p>
                      <p className="text-[9px] font-bold text-[#E66A16]">
                        {t("tagline")}
                      </p>
                    </div>
                  </div>

                  {/* Member Photo Frame & Colon-Aligned Information */}
                  <div className="p-4 grid grid-cols-12 gap-3 items-start">
                    {/* Member Photo (Left - 5 Cols) */}
                    <div className="col-span-5 flex flex-col items-center">
                      <div className="w-full aspect-[3/4] rounded-lg bg-white border-2 border-[#B52A12] ring-1 ring-[#D9A52B] overflow-hidden shadow-xs flex items-center justify-center">
                        {photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={photoUrl}
                            alt="Member Photo"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#FAF2E0] flex flex-col items-center justify-center p-2 text-center">
                            <User size={36} className="text-[#B52A12]" />
                            <span className="text-[9px] text-[#5C4E46] font-sans mt-1 font-semibold">
                              Photo
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Member ID Strip */}
                      <div className="mt-2 w-full py-1 px-1 rounded bg-[#B52A12] text-white text-center shadow-xs">
                        <span className="text-[8px] font-bold text-[#D9A52B] uppercase tracking-wider block">
                          MEMBER ID
                        </span>
                        <span className="text-[11px] font-mono font-bold tracking-tight">
                          {memberId}
                        </span>
                      </div>
                    </div>

                    {/* Member Details (Right - 7 Cols, Colon-Aligned) */}
                    <div className="col-span-7 space-y-1.5 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-baseline">
                          <span className="w-20 text-[11px] text-[#5C4E46] font-semibold shrink-0">
                            नाम :
                          </span>
                          <span className="font-bold text-[#29211D] text-xs truncate">
                            {formData.name || "रामसिंहजी आँजणा"}
                          </span>
                        </div>

                        <div className="flex items-baseline">
                          <span className="w-20 text-[11px] text-[#5C4E46] font-semibold shrink-0">
                            पिता/पति :
                          </span>
                          <span className="font-semibold text-[#29211D] text-[11px] truncate">
                            {formData.fatherOrSpouse || "भंवरलालजी"}
                          </span>
                        </div>

                        <div className="flex items-baseline">
                          <span className="w-20 text-[11px] text-[#5C4E46] font-semibold shrink-0">
                            गोत्र :
                          </span>
                          <span className="font-bold text-[#B52A12] text-xs">
                            {formData.gotra || "राठौड़"}
                          </span>
                        </div>

                        <div className="flex items-baseline">
                          <span className="w-20 text-[11px] text-[#5C4E46] font-semibold shrink-0">
                            ग्राम :
                          </span>
                          <span className="font-semibold text-[#29211D] text-[11px] truncate">
                            {formData.village || "खींवदी खेड़ा"}
                          </span>
                        </div>

                        <div className="flex items-baseline">
                          <span className="w-20 text-[11px] text-[#5C4E46] font-semibold shrink-0">
                            जिला :
                          </span>
                          <span className="font-semibold text-[#29211D] text-[11px] truncate">
                            {formData.district || "जोधपुर"}
                          </span>
                        </div>

                        <div className="flex items-baseline">
                          <span className="w-20 text-[11px] text-[#5C4E46] font-semibold shrink-0">
                            पद :
                          </span>
                          <span className="font-bold text-[#B52A12] text-[11px] truncate">
                            {formData.designation || "सक्रिय सदस्य"}
                          </span>
                        </div>

                        <div className="flex items-baseline">
                          <span className="w-20 text-[11px] text-[#5C4E46] font-semibold shrink-0">
                            क्रमांक :
                          </span>
                          <span className="font-mono font-bold text-[#29211D] text-[10px]">
                            {memberId}
                          </span>
                        </div>

                        <div className="flex items-baseline">
                          <span className="w-20 text-[11px] text-[#5C4E46] font-semibold shrink-0">
                            दिनांक :
                          </span>
                          <span className="font-medium text-[#29211D] text-[11px]">
                            {issueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verification & Signatory Section */}
                  <div className="px-4 py-3 bg-[#FAF2E0]/80 border-t border-[#D9A52B]/35 flex items-center justify-between">
                    {/* Left: QR Verification */}
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-white border border-[#D9A52B]/60 shadow-2xs">
                        <QRCodeCanvas
                          value={qrVerificationValue}
                          size={46}
                          level="M"
                        />
                      </div>
                      <div className="text-[9px] text-[#5C4E46] leading-tight">
                        <p className="font-bold text-[#B52A12]">सत्यापित पहचान</p>
                        <p className="font-sans">Scan to Verify</p>
                      </div>
                    </div>

                    {/* Right: Official Seal & Secretary Signatory */}
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full border-2 border-[#B52A12] p-0.5 bg-white shadow-2xs flex items-center justify-center shrink-0">
                        <Image
                          src="/logo.png"
                          alt="Official Seal"
                          width={32}
                          height={32}
                          className="w-full h-full object-contain rounded-full"
                        />
                      </div>
                      <div className="text-right">
                        <div className="w-14 h-0.5 bg-[#29211D]/60 ml-auto mb-0.5" />
                        <p className="text-[10px] font-bold text-[#B52A12] leading-none">
                          अधिकृत हस्ताक्षर
                        </p>
                        <p className="text-[8px] text-[#5C4E46] leading-none mt-0.5">
                          महासचिव
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Motto Watermark Line */}
                  <div className="bg-[#FFF9EC] py-1 text-center border-t border-[#D9A52B]/20">
                    <p className="text-[9px] font-bold text-[#B52A12]">
                      साथ हैं तो शक्ति हैं, संगठन है तो समृद्धि है
                    </p>
                  </div>

                  {/* Solid Kesari Red Footer Banner */}
                  <div className="bg-[#B52A12] text-white py-2 text-center border-t-2 border-[#D9A52B]">
                    <h3 className="text-sm font-extrabold font-devanagari tracking-wide leading-none">
                      आँजणा जाट महासभा
                    </h3>
                    <p className="text-[8px] text-[#FFF9EC] tracking-wider uppercase font-sans mt-0.5">
                      OFFICIAL MEMBERSHIP BADGE
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Identity Card */}
              <div className="w-full max-w-[390px] mt-6 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={downloadCardAsPNG}
                  disabled={isGenerating}
                  className="col-span-2 py-3 px-4 rounded-full bg-[#B52A12] text-white font-bold text-xs sm:text-sm border border-[#D9A52B] shadow-md hover:bg-[#8F1F0B] transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  {downloadState === "preparing" ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Preparing Badge...</span>
                    </>
                  ) : downloadSuccess ? (
                    <>
                      <Check size={16} className="text-[#D9A52B]" />
                      <span>Downloaded Successfully</span>
                    </>
                  ) : (
                    <>
                      <Download size={16} className="text-[#D9A52B]" />
                      <span>{t("btnDownloadBadge")}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleViewCard}
                  className="py-2.5 px-3 rounded-full bg-white border border-[#D9A52B] text-xs font-bold text-[#29211D] hover:bg-[#FAF2E0] transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer font-sans"
                >
                  <Eye size={14} className="text-[#B52A12]" />
                  <span>{t("btnViewFullBadge")}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-2.5 px-3 rounded-full bg-white border border-[#D9A52B] text-xs font-bold text-[#29211D] hover:bg-[#FAF2E0] transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer font-sans"
                >
                  <Printer size={14} className="text-[#B52A12]" />
                  <span>{t("btnPrintBadge")}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="col-span-2 py-2 px-3 rounded-full bg-[#FAF2E0] border border-[#29211D]/15 text-xs font-bold text-[#5C4E46] hover:text-[#B52A12] transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                >
                  <Share2 size={14} />
                  <span>{shareNotice || t("btnShareBadge")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Size High-Resolution Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#29211D]/90 flex flex-col items-center justify-center p-4 sm:p-6"
            onClick={() => setIsPreviewOpen(false)}
          >
            <div
              className="w-full max-w-md flex items-center justify-between pb-3 text-white border-b border-white/20 mb-3"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-bold text-sm text-[#D9A52B] font-sans">
                300 DPI Vertical Badge Preview
              </span>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className="max-h-[82vh] overflow-auto rounded-2xl bg-[#FFF9EC] p-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="300 DPI Vertical Badge"
                  className="w-auto h-auto max-h-[76vh] object-contain rounded-xl shadow-md"
                />
              ) : (
                <div className="w-72 h-96 flex flex-col items-center justify-center text-[#5C4E46] text-xs gap-2">
                  <span className="w-6 h-6 rounded-full border-2 border-[#B52A12] border-t-transparent animate-spin" />
                  <span>Generating high-resolution badge...</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
