import type { Metadata } from "next";
import { Poppins, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anjana Jat Mahasabha | Official Community Organization",
    template: "%s | Anjana Jat Mahasabha",
  },
  description:
    "Anjana Jat Mahasabha is a premier community organization dedicated to preserving heritage, empowering society through education, social service, and building a brighter future for the Anjana Jat community.",
  keywords: [
    "Anjana Jat Mahasabha",
    "Anjana Jat",
    "community organization",
    "Jat community",
    "Rajasthan community",
    "Gujarat community",
    "heritage preservation",
    "education",
    "social service",
    "scholarship",
    "membership",
  ],
  authors: [{ name: "Anjana Jat Mahasabha" }],
  creator: "Anjana Jat Mahasabha",
  metadataBase: new URL("https://aanjanajatmahasabha.org"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://aanjanajatmahasabha.org",
    siteName: "Anjana Jat Mahasabha",
    title: "Anjana Jat Mahasabha | Official Community Organization",
    description:
      "Preserving Heritage • Empowering Society • Building the Future. Join the Anjana Jat community's journey of unity and development.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Anjana Jat Mahasabha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anjana Jat Mahasabha",
    description:
      "Preserving Heritage • Empowering Society • Building the Future",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${devanagari.variable} h-full`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B1E1E" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Anjana Jat Mahasabha",
              url: "https://aanjanajatmahasabha.org",
              logo: "https://aanjanajatmahasabha.org/logo.png",
              description:
                "A premier community organization dedicated to preserving heritage, empowering society through education, social service, and community development.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Anjana Bhawan, Gandhi Nagar",
                addressLocality: "Jaipur",
                addressRegion: "Rajasthan",
                postalCode: "302015",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.facebook.com/aanjanajatmahasabha",
                "https://www.instagram.com/aanjanajatmahasabha",
                "https://www.youtube.com/@aanjanajatmahasabha",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-poppins antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
