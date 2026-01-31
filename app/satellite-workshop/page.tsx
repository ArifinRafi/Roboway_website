import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkshopSatelliteContent from "@/components/WorkshopSatelliteContent";

export default function SatelliteWorkshopPage() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="pt-20">
        <WorkshopSatelliteContent />
      </main>
      <Footer />
    </div>
  );
}
