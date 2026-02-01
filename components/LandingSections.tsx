"use client";

import { motion, useReducedMotion, type Easing } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import TeamSection from "@/components/TeamSection";
import Research from "@/components/Research";
import Join from "@/components/Join";
import Contact from "@/components/Contact";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingSections() {
  const reduceMotion = useReducedMotion();
  const easing: Easing = [0.16, 1, 0.3, 1];

  const sharedProps = {
    initial: reduceMotion ? "visible" : "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: easing },
    variants: sectionVariants,
  };

  return (
    <>
      <motion.section {...sharedProps}>
        <Hero />
      </motion.section>
      <motion.section
        {...sharedProps}
        transition={{ duration: 0.6, ease: easing, delay: 0.05 }}
      >
        <About />
      </motion.section>
      <motion.section
        {...sharedProps}
        transition={{ duration: 0.6, ease: easing, delay: 0.1 }}
      >
        <Services />
      </motion.section>
      <motion.section
        {...sharedProps}
        transition={{ duration: 0.6, ease: easing, delay: 0.12 }}
      >
        <Projects />
      </motion.section>
      <motion.section
        {...sharedProps}
        transition={{ duration: 0.6, ease: easing, delay: 0.14 }}
      >
        <TeamSection />
      </motion.section>
      <motion.section
        {...sharedProps}
        transition={{ duration: 0.6, ease: easing, delay: 0.16 }}
      >
        <Research />
      </motion.section>
      <motion.section
        {...sharedProps}
        transition={{ duration: 0.6, ease: easing, delay: 0.18 }}
      >
        <Join />
      </motion.section>
      <motion.section
        {...sharedProps}
        transition={{ duration: 0.6, ease: easing, delay: 0.2 }}
      >
        <Contact />
      </motion.section>
    </>
  );
}
