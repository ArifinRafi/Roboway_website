import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import LandingSections from "@/components/LandingSections";
import ScrollToTopOnLoad from "@/components/ScrollToTopOnLoad";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roboway.tech";

export const metadata: Metadata = {
  title: "Roboway Technologies | Robotics, AI & Automation Company — Bangladesh",
  description:
    "Roboway Technologies — Bangladesh's top robotics, AI, and automation company. We engineer humanoid robots, VTOL surveillance drones, AI-powered CCTV systems, autonomous underwater vehicles, and smart software for defence, healthcare, and smart cities.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Roboway Technologies | Robotics, AI & Automation — Bangladesh",
    description:
      "Bangladesh's top robotics and AI company. Humanoid robots, VTOL drones, AI surveillance, AUV, and automation software for defence, healthcare, and smart cities.",
    url: siteUrl,
    images: [{ url: "/images/roboway-og.png", width: 1200, height: 630, alt: "Roboway Technologies" }],
  },
};

export default function Home() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="pt-20">
        <ScrollToTopOnLoad />
        <LandingSections />
      </main>
      <Footer />
    </div>
  );
}
