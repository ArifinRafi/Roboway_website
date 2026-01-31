"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ADMIN_SESSION_KEY } from "@/lib/adminAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") return;
    const isAuthed = typeof window !== "undefined" && localStorage.getItem(ADMIN_SESSION_KEY) === "1";
    if (!isAuthed) {
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  return <div className="min-h-dvh bg-black text-white">{children}</div>;
}
