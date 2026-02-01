"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Bot, Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/innovations", label: "Products" },
  { href: "/3d-printing", label: "3D Printing" },
  { href: "/#about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/#contact", label: "Contact" },
  { href: "/workshops", label: "Workshops" },
];

const defaultWorkshops = [
  { title: "Satellite Workshop", href: "/satellite-workshop" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [workshops, setWorkshops] = useState(defaultWorkshops);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 8);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnResize = () => setOpen(false);
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, [open]);

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const res = await fetch("/api/workshops");
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.workshops) && data.workshops.length > 0) {
          setWorkshops(
            data.workshops.map((w: { title: string; slug: string }) => ({
              title: w.title,
              href: `/workshops/${w.slug}`,
            }))
          );
        }
      } catch {
        // Keep fallback
      }
    };
    loadWorkshops();
  }, []);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        isScrolled
          ? "bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2" onClick={close}>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#3b82f6]/20 text-[#3b82f6]">
            
            <Image src="/images/roboway-og.png" alt="Roboway Technologies" width={32} height={32} />
          </span>
          <span className="text-sm font-semibold tracking-wide text-zinc-200">
            Roboway Technologies
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="text-sm text-zinc-300 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-300 hover:text-white md:hidden"
          onClick={toggle}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden">
          <div className="mx-auto max-w-7xl px-6 pb-4">
            <div className="rounded-lg border border-white/10 bg-black/80 p-4 backdrop-blur">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="block rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/workshops"
                  onClick={close}
                  className="block rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                >
                  Workshops
                </Link>
                <div className="border-t border-white/10 pt-2">
                  <div className="px-3 py-1 text-xs uppercase tracking-wide text-zinc-500">
                    Workshop Options
                  </div>
                  {workshops.map((w) => (
                    <Link
                      key={w.href}
                      href={w.href}
                      onClick={close}
                      className="block rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                    >
                      {w.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;


