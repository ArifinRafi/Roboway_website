import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import ScrollProgress from "@/components/ui/ScrollProgress";
import GlobalBackground from "@/components/ui/GlobalBackground";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roboway.tech";

const KEYWORDS = [
  // Core identity
  "Roboway Technologies",
  "Roboway",
  // Robotics
  "robotics company Bangladesh",
  "robotics firm Bangladesh",
  "humanoid robot Bangladesh",
  "autonomous robot Bangladesh",
  "robot manufacturer Bangladesh",
  "robotics startup Bangladesh",
  "robotics engineering Bangladesh",
  // AI / ML
  "AI company Bangladesh",
  "artificial intelligence company Bangladesh",
  "machine learning company Bangladesh",
  "computer vision company Bangladesh",
  "AI startup Bangladesh",
  "edge AI Bangladesh",
  "YOLO pose estimation Bangladesh",
  // Drones / VTOL
  "drone company Bangladesh",
  "VTOL drone Bangladesh",
  "surveillance drone Bangladesh",
  "autonomous drone Bangladesh",
  "UAV Bangladesh",
  // Software
  "software company Bangladesh",
  "software firm Bangladesh",
  "software development Bangladesh",
  "IoT software Bangladesh",
  "embedded systems Bangladesh",
  // Surveillance / Security
  "ANPR Bangladesh",
  "surveillance system Bangladesh",
  "CCTV AI Bangladesh",
  "vehicle number plate recognition Bangladesh",
  "smart city surveillance Bangladesh",
  // Healthcare AI
  "AI patient monitoring",
  "fall detection AI",
  "hospital AI monitoring system",
  // 3D Printing
  "3D printing service Bangladesh",
  "3D printing Dhaka",
  // Global
  "robotics company",
  "AI automation company",
  "intelligent robotics systems",
  "autonomous underwater vehicle",
  "AUV robotics",
  "humanoid robot AI",
  "robotics AI automation",
  "tech company Bangladesh",
  "innovation company Bangladesh",
  "Dhaka tech company",
  "Bangladesh technology firm",
].join(", ");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Roboway Technologies | Robotics, AI & Automation — Bangladesh",
    template: "%s | Roboway Technologies",
  },
  description:
    "Roboway Technologies is Bangladesh's leading robotics, AI, and automation company. We build humanoid robots, VTOL surveillance drones, AI-powered surveillance systems, autonomous underwater vehicles, and intelligent software — serving defence, healthcare, smart cities, and industry.",
  keywords: KEYWORDS,
  authors: [{ name: "Roboway Technologies", url: siteUrl }],
  creator: "Roboway Technologies",
  publisher: "Roboway Technologies",
  category: "technology",
  classification: "Robotics, Artificial Intelligence, Automation",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Roboway Technologies | Robotics, AI & Automation — Bangladesh",
    description:
      "Bangladesh's leading robotics and AI company. Humanoid robots, VTOL drones, AI surveillance, AUV, and intelligent software for defence, healthcare, smart cities, and industry.",
    type: "website",
    url: siteUrl,
    siteName: "Roboway Technologies",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Roboway Technologies — Robotics, AI & Automation, Bangladesh",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roboway Technologies | Robotics, AI & Automation",
    description:
      "Bangladesh's leading robotics and AI company — humanoid robots, VTOL drones, AI surveillance, AUV, and intelligent software.",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        alt: "Roboway Technologies — Robotics, AI & Automation, Bangladesh",
      },
    ],
    creator: "@roboway_tech",
    site: "@roboway_tech",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      "bn-BD": siteUrl,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/images/logo.png" }],
    shortcut: "/images/logo.png",
  },
  manifest: "/manifest.json",
  other: {
    "geo.region": "BD",
    "geo.placename": "Dhaka, Bangladesh",
    "geo.position": "23.8103;90.4125",
    "ICBM": "23.8103, 90.4125",
    "og:country-name": "Bangladesh",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Roboway Technologies",
  alternateName: "Roboway",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  image: `${siteUrl}/images/roboway-og.png`,
  description:
    "Roboway Technologies is Bangladesh's leading robotics, AI, and automation company. We build humanoid robots, VTOL surveillance drones, AI-powered surveillance systems, autonomous underwater vehicles, and intelligent software.",
  foundingDate: "2020",
  foundingLocation: {
    "@type": "Place",
    name: "Dhaka, Bangladesh",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@roboway.tech",
    availableLanguage: ["English", "Bengali"],
  },
  sameAs: [
    "https://www.linkedin.com/company/robowaylabs",
  ],
  knowsAbout: [
    "Robotics",
    "Artificial Intelligence",
    "Automation",
    "Computer Vision",
    "VTOL Drones",
    "Humanoid Robots",
    "Autonomous Underwater Vehicles",
    "Surveillance Systems",
    "IoT",
    "Embedded Systems",
    "Machine Learning",
    "Edge AI",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Roboway Products & Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Pixi Humanoid Robot" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Tanvin Mini 1.0 VTOL Drone" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "DetectX Surveillance System" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Aquabot AUV" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "i-Care Patient Monitoring" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Printing Service" } },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Roboway Technologies",
  url: siteUrl,
  description: "Bangladesh's leading robotics, AI, and automation company.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/innovations?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://pub-5b38ed672e594e3cba36e4d949fbf958.r2.dev" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-dvh bg-[#010409] text-white`}
      >
        <ScrollProgress />
        <GlobalBackground />
        {children}
      </body>
    </html>
  );
}
