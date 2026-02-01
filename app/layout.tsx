import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roboway-website.vercel.app";

export const metadata: Metadata = {
  title: "Roboway Technologies | Robotics, AI, and Automation",
  description:
    "Innovating the future with robotics, AI, IoT, software, and drone systems.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Roboway Technologies",
    description:
      "Innovating the future with robotics, AI, IoT, software, and drone systems.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/roboway-og.png",
        width: 1200,
        height: 630,
        alt: "Roboway Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roboway Technologies",
    description:
      "Innovating the future with robotics, AI, IoT, software, and drone systems.",
    images: ["/images/roboway-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased min-h-dvh bg-gradient-to-b from-[#0a0a0a] to-[#111111] text-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
