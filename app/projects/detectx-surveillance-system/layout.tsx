import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roboway.tech";

export const metadata: Metadata = {
  title: "DetectX — AI CCTV Surveillance & ANPR System",
  description:
    "DetectX by Roboway Technologies transforms passive CCTV cameras into intelligent surveillance — Bengali ANPR (98% accuracy), fire & smoke detection, weapon detection, and instant alerts. Edge AI, no cloud dependency. Built for Bangladesh.",
  keywords:
    "ANPR Bangladesh, vehicle number plate recognition Bangladesh, AI CCTV Bangladesh, fire detection AI Bangladesh, weapon detection CCTV, smart city surveillance Bangladesh, Bengali number plate detection, Jetson Nano surveillance",
  alternates: { canonical: `${siteUrl}/projects/detectx-surveillance-system` },
  openGraph: {
    title: "DetectX AI Surveillance System | Roboway Technologies",
    description:
      "AI-powered CCTV surveillance with Bengali ANPR, fire detection, weapon sensing, and instant alerts — edge AI, no cloud, privacy-first.",
    url: `${siteUrl}/projects/detectx-surveillance-system`,
    images: [{ url: "/images/detectx1.png", width: 1200, height: 630, alt: "DetectX AI Surveillance System" }],
  },
};

export default function DetectXLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
