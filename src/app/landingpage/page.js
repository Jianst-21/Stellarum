import StarfieldBg from '@/app/components/global/StarfieldBg';
import Navbar from '@/app/components/global/Navbar';
import Footer from '@/app/components/global/Footer';

import HeroSection from '@/app/components/landingpage/HeroSection';
import SolarSystemSection from '@/app/components/landingpage/SolarSystemSection';
import FunFactsSection from '@/app/components/landingpage/FunFactsSection';
import PlanetExplorationSection from '@/app/components/landingpage/PlanetExplorationSection';
import NewsletterSection from '@/app/components/landingpage/NewsletterSection';

export const metadata = {
  title: 'Stellarum — Portal Eksplorasi Astronomi & Tata Surya',
  description: 'Landing Page eksplorasi astronomi interaktif dan visualisasi Tata Surya.',
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen text-[#ffffff] font-['Hanken_Grotesk'] overflow-x-hidden">
      {/* Fixed Starfield Background at z-0 */}
      <StarfieldBg />

      {/* Navbar at z-50 */}
      <Navbar />

      {/* Main Content at z-10 above Starfield */}
      <main className="relative z-10 pt-16">
        <HeroSection />
        <SolarSystemSection />
        <FunFactsSection />
        <PlanetExplorationSection />
        <NewsletterSection />
      </main>

      {/* Footer at z-20 */}
      <Footer />
    </div>
  );
}
