'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SHOWCASE_OBJECTS } from '@/app/data/solarObjects';

const HeroPlanetShowcase3D = dynamic(
  () => import('@/app/components/landingpage/HeroPlanetShowcase3D'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] sm:h-[380px] lg:h-[460px] flex items-center justify-center font-mono text-xs text-ink-muted">
        Memuat model 3D...
      </div>
    ),
  }
);

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(1); // Start with Saturn for distinct silhouette
  const activeBody = HERO_SHOWCASE_OBJECTS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SHOWCASE_OBJECTS.length) % HERO_SHOWCASE_OBJECTS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SHOWCASE_OBJECTS.length);
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative lg:min-h-[calc(100dvh-4rem)] flex items-center"
    >
      {/* Localized left readability scrim leaving the right 3D sky unobstructed */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[56%] bg-gradient-to-b from-space-black/82 via-space-black/58 to-transparent lg:bg-gradient-to-r lg:from-space-black/88 lg:via-space-black/58 lg:to-transparent"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Direct Thesis, Primary Actions & Live 3D Object Switcher */}
          <div className="lg:col-span-5 min-w-0">
            <h1
              id="hero-heading"
              className="font-display font-bold text-ink-primary tracking-[-0.025em] leading-[1.06] mb-5 break-words"
              style={{ fontSize: 'clamp(2.35rem, 4.5vw, 3.75rem)' }}
            >
              Jelajahi Tata Surya dalam ruang 3D nyata.
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-[44ch] mb-8">
              Amati orbit planet, bandingkan skala benda langit secara presisi, dan telusuri data astronomi di bawah kubah Bima Sakti interaktif.
            </p>

            <div className="grid grid-cols-1 sm:flex sm:flex-wrap sm:items-center gap-3 mb-9">
              <Link
                href="/tata-surya"
                className="min-h-[44px] px-6 inline-flex items-center justify-center rounded-lg bg-cyan-glow text-space-navy font-bold text-sm whitespace-nowrap hover:bg-ink-primary active:scale-[0.99] transition-colors"
              >
                Buka Tata Surya 3D
              </Link>
              <a
                href="#skala"
                className="min-h-[44px] px-6 inline-flex items-center justify-center rounded-lg border border-white/25 bg-space-black/60 text-ink-primary font-medium text-sm whitespace-nowrap hover:border-cyan-glow hover:bg-white/[0.06] active:scale-[0.99] transition-colors"
              >
                Bandingkan Skala Planet
              </a>
            </div>

            {/* 6-Object Live 3D Switcher */}
            <div className="pt-5 border-t border-white/12">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <span className="font-display text-sm font-semibold text-ink-primary block truncate">
                    {activeBody.name}
                  </span>
                  <span className="font-mono text-xs text-ink-secondary">
                    {activeBody.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Objek sebelumnya"
                    className="min-w-[44px] min-h-[44px] xl:min-w-[38px] xl:min-h-[38px] rounded-lg border border-white/15 bg-space-black/80 inline-flex items-center justify-center text-ink-primary hover:border-cyan-glow transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Objek berikutnya"
                    className="min-w-[44px] min-h-[44px] xl:min-w-[38px] xl:min-h-[38px] rounded-lg border border-white/15 bg-space-black/80 inline-flex items-center justify-center text-ink-primary hover:border-cyan-glow transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div
                role="tablist"
                aria-label="Pilih objek 3D pada panggung utama"
                className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6 gap-1.5"
              >
                {HERO_SHOWCASE_OBJECTS.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveIndex(idx)}
                      className={`min-h-[40px] px-2 rounded-lg text-xs font-medium border transition-colors ${
                        isActive
                          ? 'border-cyan-glow bg-cyan-glow/15 text-ink-primary font-semibold'
                          : 'border-white/12 bg-space-black/70 text-ink-secondary hover:border-white/30 hover:text-ink-primary'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Open-Sky 3D Planet Stage + Compact Telemetry Lens */}
          <div className="lg:col-span-7 relative flex flex-col items-center">
            <div className="w-full relative">
              <HeroPlanetShowcase3D body={activeBody} />
            </div>

            <div className="w-full sm:max-w-md lg:self-end rounded-xl border border-cyan-glow/20 bg-space-abyss/75 backdrop-blur-md p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h2 className="font-display text-lg font-bold text-ink-primary">
                    {activeBody.name}
                  </h2>
                  <p className="text-xs text-ink-secondary mt-0.5 leading-relaxed">
                    {activeBody.summary}
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-white/10">
                <div>
                  <dt className="font-mono text-[11px] text-ink-muted">Diameter</dt>
                  <dd className="font-mono text-xs text-ink-primary font-medium mt-0.5 tabular-nums">
                    {activeBody.diameter}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] text-ink-muted">Jarak</dt>
                  <dd className="font-mono text-xs text-ink-primary font-medium mt-0.5 tabular-nums">
                    {activeBody.distance}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] text-ink-muted">Suhu</dt>
                  <dd className="font-mono text-xs text-amber-star font-medium mt-0.5 tabular-nums">
                    {activeBody.temp}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-ink-muted">
                  Seret objek 3D untuk memutar
                </span>
                <Link
                  href={`/tata-surya?objek=${activeBody.id}`}
                  className="text-xs font-semibold text-cyan-glow hover:text-ink-primary transition-colors min-h-[32px] inline-flex items-center"
                >
                  Fokus di Tata Surya 3D
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
