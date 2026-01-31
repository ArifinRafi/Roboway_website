import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkshopSatelliteContent from "@/components/WorkshopSatelliteContent";

type Params = { params: Promise<{ slug: string }> };

export default async function WorkshopPage({ params }: Params) {
  const { slug } = await params;

  if (slug === "satellite-workshop") {
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

  return notFound();
}
