"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function TypeWriter({
  text,
  speed = 40,
  delay = 0,
  className = "",
  cursor = true,
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [isInView, delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {cursor && displayed.length < text.length && (
        <span className="animate-blink ml-0.5 inline-block w-[2px] h-[1em] bg-[#60a5fa] align-middle" />
      )}
      {cursor && displayed.length === text.length && (
        <span className="animate-blink ml-0.5 inline-block w-[2px] h-[1em] bg-[#60a5fa]/50 align-middle" />
      )}
    </span>
  );
}
