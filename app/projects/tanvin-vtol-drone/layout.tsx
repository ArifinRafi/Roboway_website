import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roboway.tech";

export const metadata: Metadata = {
  title: "Tanvin Mini 1.0 — VTOL Surveillance Drone",
  description:
    "Tanvin Mini 1.0 is a VTOL surveillance drone with AI computer vision, 10km data range, Bengali ANPR, and PX4 autopilot. Designed for military, border surveillance, disaster response, and wildlife monitoring in Bangladesh.",
  keywords:
    "VTOL drone Bangladesh, surveillance drone Bangladesh, military drone Bangladesh, ANPR drone Bangladesh, autonomous drone Bangladesh, border surveillance drone, UAV Bangladesh, PX4 drone",
  alternates: { canonical: `${siteUrl}/projects/tanvin-vtol-drone` },
  openGraph: {
    title: "Tanvin Mini 1.0 VTOL Drone | Roboway Technologies",
    description:
      "AI-powered VTOL surveillance drone with 10km range, Bengali number plate recognition, and autonomous flight — by Roboway Technologies, Bangladesh.",
    url: `${siteUrl}/projects/tanvin-vtol-drone`,
    images: [{ url: "/images/tanvin1.jpeg", width: 1200, height: 630, alt: "Tanvin Mini 1.0 VTOL Drone" }],
  },
};

export default function TanvinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
