import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roboway.tech";

export const metadata: Metadata = {
  title: "Aquabot — Autonomous Underwater Vehicle",
  description:
    "Aquabot is Roboway Technologies' prototype AUV powered by Raspberry Pi 5B, AI accelerator, and Pixhawk 4. Designed for underwater exploration, defence reconnaissance, river accident response, and pipeline inspection in Bangladesh.",
  keywords:
    "AUV Bangladesh, autonomous underwater vehicle Bangladesh, underwater robot Bangladesh, Pixhawk underwater, Raspberry Pi AUV, underwater exploration robot, underwater defence robot, pipeline inspection robot",
  alternates: { canonical: `${siteUrl}/projects/aquabot-auv` },
  openGraph: {
    title: "Aquabot AUV | Autonomous Underwater Vehicle — Roboway Technologies",
    description:
      "Prototype autonomous underwater vehicle with RPi 5B, AI accelerator, Pixhawk 4, and YOLOv8 — built for exploration, defence, and rescue operations.",
    url: `${siteUrl}/projects/aquabot-auv`,
    images: [{ url: "/images/aquabot1.jpeg", width: 1200, height: 630, alt: "Aquabot Autonomous Underwater Vehicle" }],
  },
};

export default function AquabotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
