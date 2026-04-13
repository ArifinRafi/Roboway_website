import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roboway.tech";

export const metadata: Metadata = {
  title: "Pixi — Next-Gen Humanoid Robot",
  description:
    "Pixi is Roboway Technologies' humanoid robot with real-time face recognition, speech AI, ROS2 whole-body control, and CNN object detection. Built for elderly care, industrial automation, and education — made in Bangladesh.",
  keywords:
    "humanoid robot Bangladesh, Pixi humanoid, face recognition robot, ROS2 robot, AI robot Bangladesh, humanoid robot AI, elderly care robot, industrial robot Bangladesh",
  alternates: { canonical: `${siteUrl}/projects/pixi-humanoid-bot` },
  openGraph: {
    title: "Pixi Humanoid Robot | Roboway Technologies",
    description:
      "Next-gen humanoid robot with face recognition, speech AI, and ROS2 motion control — engineered by Roboway Technologies, Bangladesh.",
    url: `${siteUrl}/projects/pixi-humanoid-bot`,
    images: [{ url: "/images/pixi1.jpg", width: 1200, height: 630, alt: "Pixi Humanoid Robot" }],
  },
};

export default function PixiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
