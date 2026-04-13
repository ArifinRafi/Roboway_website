"use client";

import { motion, useReducedMotion, type Easing } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import TeamSection from "@/components/TeamSection";
import TeamVideo from "@/components/TeamVideo";
import Research from "@/components/Research";
import Join from "@/components/Join";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";

const sectionVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function LandingSections() {
  const reduceMotion = useReducedMotion();
  const easing: Easing = [0.16, 1, 0.3, 1];

  const sharedProps = {
    initial: reduceMotion ? "visible" : "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.7, ease: easing },
    variants: sectionVariants,
  };

  const Divider = () => (
    <div className="mx-auto max-w-7xl px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );

  return (
    <>
      <motion.section
        initial={reduceMotion ? "visible" : "hidden"}
        animate="visible"
        transition={{ duration: 0.7, ease: easing }}
        variants={sectionVariants}
      ><Hero /></motion.section>
      <Divider />
      <motion.section {...sharedProps} transition={{ duration: 0.7, ease: easing, delay: 0.05 }}><About /></motion.section>
      <Divider />
      <motion.section {...sharedProps} transition={{ duration: 0.7, ease: easing, delay: 0.05 }}><Services /></motion.section>
      <Divider />
      <motion.section {...sharedProps} transition={{ duration: 0.7, ease: easing, delay: 0.05 }}><Projects /></motion.section>
      <Divider />
      <motion.section {...sharedProps} transition={{ duration: 0.7, ease: easing, delay: 0.05 }}><TeamSection /></motion.section>
      <Divider />
      <motion.section {...sharedProps} transition={{ duration: 0.7, ease: easing, delay: 0.05 }}><TeamVideo /></motion.section>
      <Divider />
      <motion.section {...sharedProps} transition={{ duration: 0.7, ease: easing, delay: 0.05 }}><Research /></motion.section>
      <motion.section {...sharedProps} transition={{ duration: 0.7, ease: easing, delay: 0.05 }}><Join /></motion.section>
      <Divider />
      <motion.section {...sharedProps} transition={{ duration: 0.7, ease: easing, delay: 0.05 }}><Clients /></motion.section>
      <Divider />
      <motion.section {...sharedProps} transition={{ duration: 0.7, ease: easing, delay: 0.05 }}><Contact /></motion.section>
    </>
  );
}
