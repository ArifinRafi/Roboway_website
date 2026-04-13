"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown, Zap } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/",            label: "Home",       code: "01" },
  { href: "/innovations", label: "Products",   code: "02" },
  { href: "/3d-printing", label: "3D Print",   code: "03" },
  { href: "/#about",      label: "About",      code: "04" },
  { href: "/careers",     label: "Careers",    code: "05" },
  { href: "/workshops",   label: "Workshops",  code: "06" },
  { href: "/#contact",    label: "Contact",    code: "07" },
];

const defaultWorkshops = [{ title: "Satellite Workshop", href: "/satellite-workshop" }];

/* ── Blinking status dot ──────────────────────────────── */
function StatusDot() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 1100);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      className="inline-block w-[5px] h-[5px] rounded-full bg-[#60a5fa] transition-opacity duration-500"
      style={{ opacity: on ? 1 : 0.2 }}
    />
  );
}

/* ── Arc reactor logo ─────────────────────────────────── */
function ArcLogo() {
  return (
    <div className="relative flex-shrink-0">
      {/* Outer ring pulse */}
      <span className="absolute inset-0 rounded-full bg-[#2563eb]/20 animate-ping" style={{ animationDuration: "2.5s" }} />
      {/* Ring */}
      <span className="absolute inset-0 rounded-full border border-[#2563eb]/30" />
      <Image
        src="/images/logo.png"
        alt="Roboway Technologies"
        width={36}
        height={36}
        className="relative object-contain z-10"
      />
    </div>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [open, setOpen]               = useState(false);
  const [workshops, setWorkshops]     = useState(defaultWorkshops);
  const [scanX, setScanX]             = useState(-100);
  const pathname                       = usePathname();

  /* Scroll detection */
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Close mobile menu on resize */
  useEffect(() => {
    if (!open) return;
    const fn = () => setOpen(false);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [open]);

  /* Workshop API */
  useEffect(() => {
    fetch("/api/workshops")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => {
        if (Array.isArray(d?.workshops) && d.workshops.length > 0) {
          setWorkshops(d.workshops.map((w: { title: string; slug: string }) => ({
            title: w.title,
            href: `/workshops/${w.slug}`,
          })));
        }
      })
      .catch(() => {});
  }, []);

  /* Scan line animation along the bottom border */
  useEffect(() => {
    let x = -100;
    const id = setInterval(() => {
      x = x > 200 ? -100 : x + 1.4;
      setScanX(x);
    }, 12);
    return () => clearInterval(id);
  }, []);

  const toggle = () => setOpen((v) => !v);
  const close  = () => setOpen(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled
          ? "rgba(1,4,9,0.92)"
          : "linear-gradient(to bottom, rgba(1,4,9,0.7), transparent)",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(37,99,235,0.12)" : "1px solid transparent",
        boxShadow: isScrolled ? "0 0 40px rgba(37,99,235,0.06)" : "none",
      }}
    >
      {/* ── Top micro-bar ────────────────────────────────── */}
      <div
        className="hidden md:flex items-center justify-between px-8 py-1 border-b"
        style={{ borderColor: "rgba(37,99,235,0.08)", background: "rgba(37,99,235,0.03)" }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <StatusDot />
            <span className="font-mono text-[9px] text-[#4a5568] tracking-[0.2em]">SYS::ONLINE</span>
          </div>
          <span className="text-[#2563eb]/20 text-[10px]">|</span>
          <span className="font-mono text-[9px] text-[#4a5568] tracking-[0.15em]">ROBOWAY TECHNOLOGIES · DHAKA · BD</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] text-[#4a5568] tracking-[0.15em]">LAT 23.8103 // LNG 90.4125</span>
          <span className="text-[#2563eb]/20 text-[10px]">|</span>
          <div className="flex items-center gap-1.5">
            <Zap size={8} className="text-[#2563eb]/50" />
            <span className="font-mono text-[9px] text-[#2563eb]/50 tracking-[0.15em]">MARK II</span>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ─────────────────────────────────── */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link href="/" onClick={close} className="flex items-center gap-3 group">
          <ArcLogo />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-wide text-white group-hover:text-[#60a5fa] transition-colors duration-300">
              Roboway
            </span>
            <span className="font-mono text-[8px] text-[#2563eb]/60 tracking-[0.25em] mt-0.5">
              TECHNOLOGIES
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href.split("#")[0]) && item.href !== "/#about" && item.href !== "/#contact");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="group relative flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#2563eb]/[0.06]"
              >
                {/* Code above label */}
                <span className="font-mono text-[7px] text-[#2563eb]/30 tracking-widest mb-0.5 transition-colors duration-200 group-hover:text-[#2563eb]/60">
                  {item.code}
                </span>
                <span className={`text-[12px] font-medium tracking-wide transition-colors duration-200 ${active ? "text-white" : "text-[#a0aec0] group-hover:text-white"}`}>
                  {item.label}
                </span>
                {/* Active / hover underline */}
                <span
                  className="absolute bottom-1 left-3 right-3 h-[1px] rounded-full transition-all duration-300"
                  style={{
                    background: "linear-gradient(90deg, transparent, #2563eb, transparent)",
                    opacity: active ? 1 : 0,
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
                <span
                  className="absolute bottom-1 left-3 right-3 h-[1px] rounded-full transition-all duration-300 opacity-0 group-hover:opacity-60"
                  style={{ background: "linear-gradient(90deg, transparent, #60a5fa, transparent)" }}
                />
                {/* Side brackets on hover */}
                <span className="absolute left-1 top-1/2 -translate-y-1/2 w-[1px] h-3 bg-[#2563eb]/0 group-hover:bg-[#2563eb]/40 transition-all duration-300" />
                <span className="absolute right-1 top-1/2 -translate-y-1/2 w-[1px] h-3 bg-[#2563eb]/0 group-hover:bg-[#2563eb]/40 transition-all duration-300" />
              </Link>
            );
          })}
        </div>

        {/* Right side: CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Get in touch CTA — desktop only */}
          <Link
            href="/#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/10 px-4 py-1.5 text-[11px] font-mono text-[#60a5fa] tracking-widest hover:bg-[#2563eb]/20 hover:border-[#2563eb]/50 transition-all duration-200 hover:shadow-[0_0_16px_rgba(37,99,235,0.2)]"
            onClick={close}
          >
            <StatusDot />
            CONNECT
          </Link>

          {/* Mobile toggle */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={toggle}
            className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#a0aec0] hover:text-white hover:border-[#2563eb]/30 transition-all duration-200 md:hidden"
          >
            {/* Corner HUD on mobile toggle */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#2563eb]/30 rounded-tl" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#2563eb]/30 rounded-tr" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#2563eb]/30 rounded-bl" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2563eb]/30 rounded-br" />
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* ── Scan line on bottom border ────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 h-full w-24 transition-none"
          style={{
            left: `${scanX}%`,
            background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.6), transparent)",
          }}
        />
      </div>

      {/* ── Mobile menu ──────────────────────────────────── */}
      {open && (
        <div className="md:hidden">
          <div className="mx-4 mb-4 mt-1 overflow-hidden rounded-xl border border-[#2563eb]/15 bg-[#010409]/95 backdrop-blur-2xl"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(37,99,235,0.05)" }}>

            {/* Mobile top bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#2563eb]/[0.08]"
              style={{ background: "rgba(37,99,235,0.04)" }}>
              <div className="flex items-center gap-2">
                <StatusDot />
                <span className="font-mono text-[9px] text-[#4a5568] tracking-widest">NAVIGATION</span>
              </div>
              <span className="font-mono text-[9px] text-[#2563eb]/30 tracking-widest">{navItems.length} MODULES</span>
            </div>

            <div className="p-3 grid gap-0.5">
              {navItems.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="group flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 hover:bg-[#2563eb]/[0.07]"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] text-[#2563eb]/30 group-hover:text-[#2563eb]/60 transition-colors w-4">{item.code}</span>
                    <span className="text-sm text-[#a0aec0] group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-[#2563eb]/0 group-hover:bg-[#60a5fa]/60 transition-all duration-200" />
                </Link>
              ))}

              {/* Workshops submenu */}
              <div className="mt-1 border-t border-white/[0.04] pt-2">
                <div className="px-4 py-1.5 flex items-center gap-2">
                  <span className="font-mono text-[8px] text-[#4a5568] tracking-widest">WORKSHOP OPTIONS</span>
                </div>
                {workshops.map((w) => (
                  <Link
                    key={w.href}
                    href={w.href}
                    onClick={close}
                    className="group flex items-center justify-between rounded-lg px-4 py-2.5 transition-all duration-200 hover:bg-[#2563eb]/[0.07]"
                  >
                    <span className="text-sm text-[#4a5568] group-hover:text-[#a0aec0] transition-colors">{w.title}</span>
                    <ChevronDown size={10} className="text-[#2563eb]/30 -rotate-90" />
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-2 px-1">
                <Link
                  href="/#contact"
                  onClick={close}
                  className="flex items-center justify-center gap-2 w-full rounded-lg border border-[#2563eb]/25 bg-[#2563eb]/10 py-3 text-[11px] font-mono text-[#60a5fa] tracking-widest hover:bg-[#2563eb]/20 transition-all duration-200"
                >
                  <StatusDot />
                  INITIATE CONTACT
                </Link>
              </div>
            </div>

            {/* Mobile bottom bar */}
            <div className="px-4 py-2 border-t border-[#2563eb]/[0.08] flex items-center justify-between"
              style={{ background: "rgba(37,99,235,0.02)" }}>
              <span className="font-mono text-[8px] text-[#4a5568] tracking-widest">ROBOWAY · MARK II</span>
              <span className="font-mono text-[8px] text-[#4a5568] tracking-widest">BD · 2026</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
