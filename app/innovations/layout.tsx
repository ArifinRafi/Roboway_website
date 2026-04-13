import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roboway.tech";

export const metadata: Metadata = {
  title: "Products — Robotics, AI & Drone Systems",
  description:
    "Explore Roboway Technologies' full product lineup: Pixi humanoid robot, Tanvin Mini VTOL drone, DetectX AI surveillance, Aquabot AUV, i-Care patient monitoring, and more — engineered in Bangladesh.",
  keywords:
    "robotics products Bangladesh, AI products Bangladesh, VTOL drone Bangladesh, humanoid robot, AUV autonomous underwater vehicle, AI surveillance system, patient monitoring AI, smart city products",
  alternates: { canonical: `${siteUrl}/innovations` },
  openGraph: {
    title: "Roboway Products | Robotics, AI & Drone Systems",
    description:
      "Humanoid robots, VTOL drones, AI surveillance, AUV, patient monitoring — full product lineup by Roboway Technologies, Bangladesh.",
    url: `${siteUrl}/innovations`,
    images: [{ url: "/images/roboway-og.png", width: 1200, height: 630, alt: "Roboway Products" }],
  },
};

export default function InnovationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
