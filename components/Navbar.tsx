"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bot, Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/innovations", label: "Our Innovation" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#team", label: "Team" },
  { href: "/#projects", label: "Projects" },
  { href: "/#research", label: "Research" },
  { href: "/careers", label: "Careers" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
            <Bot size={20} />
          </span>
          <span className="text-sm font-semibold tracking-wide text-zinc-200">
            Roboway Technologies
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden gap-6 md:flex">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;


