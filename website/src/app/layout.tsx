import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: {
    default: "Anjana Jat Mahasabha | Official Community Portal",
    template: "%s",
  },
  description:
    "Official portal of Anjana Jat Mahasabha. Preserving historical heritage, upholding agricultural dignity, and building educational opportunities for youth across Rajasthan, Gujarat, and Madhya Pradesh.",
  keywords: [
    "आँजणा जाट महासभा",
    "Aanjanna Jat Mahasabha",
    "Anjana Jat Mahasabha",
    "Anjana Jat Community",
    "Jat Mahasabha",
    "Chaudhary Samaj",
    "Anjana Samaj Rajasthan Gujarat MP",
    "Digital Membership Card",
    "Gotra Directory",
    "Khet Kheda Khap",
  ],
  authors: [{ name: "Anjana Jat Mahasabha" }],
  creator: "Anjana Jat Mahasabha",
  publisher: "Anjana Jat Mahasabha",
  metadataBase: new URL("https://aanjanajatmahasabha.org"),
  alternates: {
    canonical: "https://aanjanajatmahasabha.org",
    languages: {
      "hi-IN": "https://aanjanajatmahasabha.org",
      "en-IN": "https://aanjanajatmahasabha.org/en",
      "gu-IN": "https://aanjanajatmahasabha.org/gu",
    },
  },
  openGraph: {
    type: "website",
    locale: "hi_IN",
    alternateLocale: ["en_IN", "gu_IN"],
    url: "https://aanjanajatmahasabha.org",
    siteName: "Anjana Jat Mahasabha",
    title: "Anjana Jat Mahasabha | Official Community Portal",
    description:
      "Official community portal of Anjana Jat Mahasabha. Verified membership identity cards, regional village directory, and authentic historical records.",
    images: [
      {
        url: "/images/brand-identity-kit.jpg",
        width: 1200,
        height: 1200,
        alt: "Anjana Jat Mahasabha Official Brand Identity Kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anjana Jat Mahasabha | Official Community Portal",
    description: "Together we have strength, organization brings prosperity. Jai Aanjana Jat!",
    images: ["/images/brand-identity-kit.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "आँजणा जाट महासभा",
    alternateName: ["Aanjanna Jat Mahasabha", "Anjana Jat Mahasabha", "AJM"],
    url: "https://aanjanajatmahasabha.org",
    logo: "https://aanjanajatmahasabha.org/logo.png",
    image: "https://aanjanajatmahasabha.org/images/brand-identity-kit.jpg",
    description:
      "आँजणा जाट महासभा समाज की एकता, सम्मान, कृषि स्वाभिमान, संस्कृति और विकास का आधिकारिक अखिल भारतीय संगठन है।",
    slogan: "साथ हैं तो शक्ति हैं, संगठन है तो समृद्धि है. जय आँजणा जाट!",
    foundingLocation: {
      "@type": "Place",
      name: "Rajasthan, Gujarat & Madhya Pradesh, India",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Anjana Bhawan, Gandhi Nagar",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302015",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8788594494",
      contactType: "customer service",
      availableLanguage: ["Hindi", "Gujarati", "English"],
    },
    sameAs: [
      "https://www.facebook.com/aanjanajatmahasabha",
      "https://www.instagram.com/aanjanajatmahasabha",
      "https://www.youtube.com/@aanjanajatmahasabha",
    ],
  };

  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aanjanajatmahasabha.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Membership ID",
        item: "https://aanjanajatmahasabha.org/membership",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Brand Heritage",
        item: "https://aanjanajatmahasabha.org/about",
      },
    ],
  };

  return (
    <html lang="hi" className="h-full bg-[#FFF9EC]" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#B52A12" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Sans+Gujarati:wght@400;500;600;700;800&family=Noto+Serif+Devanagari:wght@600;700;800&family=Noto+Serif+Gujarati:wght@600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbListSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FFF9EC] text-[#29211D] font-poppins antialiased selection:bg-[#B52A12]/15 selection:text-[#B52A12]">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1" id="main-content">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
