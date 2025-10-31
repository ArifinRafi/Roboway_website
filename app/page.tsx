import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Join from "@/components/Join";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";

export default function Home() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <About />
        <Services />
        <Projects />
        <TeamSection />
        <Research />
        <Join />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
