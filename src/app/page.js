import StarfieldBg from '@/app/components/global/StarfieldBg';
import Navbar from '@/app/components/global/Navbar';
import Footer from '@/app/components/global/Footer';
import HeroSection from '@/app/components/landingpage/HeroSection';
import PlanetScaleComparisonSection from '@/app/components/landingpage/PlanetScaleComparisonSection';
import PlanetExplorationSection from '@/app/components/landingpage/PlanetExplorationSection';
import SpaceExplorationTimelineSection from '@/app/components/landingpage/SpaceExplorationTimelineSection';
import SpaceTriviaQuizSection from '@/app/components/landingpage/SpaceTriviaQuizSection';
import NasaApodSection from '@/app/components/landingpage/NasaApodSection';

export default function HomePage() {
  return (
    <div className="relative min-h-dvh bg-space-black text-ink-primary">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan-glow focus:text-space-navy focus:font-bold"
      >
        Lewati ke konten utama
      </a>

      <StarfieldBg />
      <Navbar />

      <main id="main-content" className="relative z-10">
        <HeroSection />
        <PlanetScaleComparisonSection />
        <PlanetExplorationSection />
        <SpaceExplorationTimelineSection />
        <SpaceTriviaQuizSection />
        <NasaApodSection />
      </main>

      <Footer />
    </div>
  );
}
