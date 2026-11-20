import dynamic from 'next/dynamic';
import StarfieldBg from '@/app/components/global/StarfieldBg';
import Navbar from '@/app/components/global/Navbar';
import Footer from '@/app/components/global/Footer';
import HeroSection from '@/app/components/landingpage/HeroSection';
import PlanetExplorationSection from '@/app/components/landingpage/PlanetExplorationSection';

const PlanetScaleComparisonSection = dynamic(
  () => import('@/app/components/landingpage/PlanetScaleComparisonSection'),
  {
    loading: () => (
      <div className="py-20 max-w-7xl mx-auto px-5 sm:px-8 border-t border-white/10 flex items-center justify-center font-mono text-xs text-ink-muted min-h-[400px]">
        Memuat laboratorium perbandingan skala...
      </div>
    ),
  }
);

const SpaceExplorationTimelineSection = dynamic(
  () => import('@/app/components/landingpage/SpaceExplorationTimelineSection'),
  {
    loading: () => (
      <div className="py-20 max-w-7xl mx-auto px-5 sm:px-8 border-t border-white/10 min-h-[300px]" />
    ),
  }
);

const SpaceTriviaQuizSection = dynamic(
  () => import('@/app/components/landingpage/SpaceTriviaQuizSection'),
  {
    loading: () => (
      <div className="py-20 max-w-7xl mx-auto px-5 sm:px-8 border-t border-white/10 min-h-[300px]" />
    ),
  }
);

const NasaApodSection = dynamic(
  () => import('@/app/components/landingpage/NasaApodSection'),
  {
    loading: () => (
      <div className="py-20 max-w-7xl mx-auto px-5 sm:px-8 border-t border-white/10 min-h-[300px]" />
    ),
  }
);

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
