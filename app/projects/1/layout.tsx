import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roboway.tech";

export const metadata: Metadata = {
  title: "i-Care — AI-Powered Patient Monitoring System",
  description:
    "i-Care by Roboway Technologies uses YOLO-based pose estimation for real-time patient monitoring in hospitals and ICUs. Detects falls, abnormal movements, and unsafe postures — zero wearables required.",
  keywords:
    "AI patient monitoring Bangladesh, fall detection AI hospital, YOLO pose estimation healthcare, ICU monitoring system, elderly care AI, hospital AI system Bangladesh, computer vision healthcare",
  alternates: { canonical: `${siteUrl}/projects/1` },
  openGraph: {
    title: "i-Care | AI Patient Monitoring System — Roboway Technologies",
    description:
      "Real-time YOLO pose estimation for hospital and ICU patient monitoring. Detects falls, unsafe postures, and abnormal movements with instant alerts.",
    url: `${siteUrl}/projects/1`,
    images: [
      {
        url: "https://pub-5b38ed672e594e3cba36e4d949fbf958.r2.dev/uploads/images/1769910739163-pgu8t9r.png",
        width: 1200,
        height: 630,
        alt: "i-Care AI Patient Monitoring System",
      },
    ],
  },
};

export default function ICareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
