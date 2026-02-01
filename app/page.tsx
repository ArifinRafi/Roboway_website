import Navbar from "@/components/Navbar";
import LandingSections from "@/components/LandingSections";
import ScrollToTopOnLoad from "@/components/ScrollToTopOnLoad";
import Footer from "@/components/Footer";

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
