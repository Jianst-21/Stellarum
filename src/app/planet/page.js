import StarfieldBg from '@/app/components/global/StarfieldBg';
import Navbar from '@/app/components/global/Navbar';
import Footer from '@/app/components/global/Footer';
import PlanetCatalogClient from '@/app/planet/PlanetCatalogClient';

export const metadata = {
  title: 'Katalog Planet Tata Surya: Stellarum',
  description:
    'Data astronomi planet kebumian, raksasa gas, raksasa es, dan planet kerdil di Tata Surya beserta tautan langsung ke simulasi 3D.',
};

export default function PlanetPage() {
  return (
    <div className="relative min-h-dvh bg-space-black text-ink-primary">
      <StarfieldBg />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-20">
        <PlanetCatalogClient />
      </main>

      <Footer />
    </div>
  );
}
