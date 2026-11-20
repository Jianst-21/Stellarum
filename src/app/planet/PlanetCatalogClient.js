'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { PLANET_CATALOG } from '@/app/data/solarObjects';

const CATEGORIES = ['Semua', 'Planet Kebumian', 'Raksasa Gas', 'Raksasa Es', 'Planet Kerdil'];

export default function PlanetCatalogClient() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [expandedId, setExpandedId] = useState(null);

  const visiblePlanets =
    activeCategory === 'Semua'
      ? PLANET_CATALOG
      : PLANET_CATALOG.filter((p) => p.category === activeCategory);

  return (
    <>
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-10 border-b border-white/12">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.025em] text-ink-primary leading-tight mb-3">
            Katalog Planet Tata Surya
          </h1>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
            Karakteristik fisik delapan planet utama dan planet kerdil Pluto. Setiap entri terhubung langsung ke posisi orbitnya di simulasi 3D.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter klasifikasi planet"
          className="flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={active}
                className={`min-h-[40px] px-3.5 rounded-lg text-xs font-medium border transition-colors ${
                  active
                    ? 'bg-cyan-glow text-space-navy border-cyan-glow font-bold'
                    : 'bg-space-abyss/80 text-ink-secondary border-white/15 hover:border-cyan-glow/50 hover:text-ink-primary'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePlanets.map((p) => {
          const isExpanded = expandedId === p.id;
          return (
            <article
              key={p.id}
              className="rounded-xl overflow-hidden border border-white/12 bg-space-abyss/80 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-space-black overflow-hidden">
                  <Image
                    src={p.img}
                    alt={`Planet ${p.name}`}
                    width={480}
                    height={300}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-abyss via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs text-amber-star">{p.category}</span>
                    <span className="font-mono text-xs text-ink-muted tabular-nums">
                      {p.diameterKm.toLocaleString('id-ID')} km
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-ink-primary mb-2">
                    {p.name}
                  </h2>

                  <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                    {p.desc}
                  </p>

                  <dl className="grid grid-cols-2 gap-2.5 text-xs pt-4 border-t border-white/10">
                    <div>
                      <dt className="font-mono text-[11px] text-ink-muted">Jarak</dt>
                      <dd className="font-mono text-ink-primary mt-0.5 tabular-nums">{p.distance}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] text-ink-muted">Periode Orbit</dt>
                      <dd className="font-mono text-ink-primary mt-0.5 tabular-nums">{p.orbitPeriod}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] text-ink-muted">Suhu</dt>
                      <dd className="font-mono text-ink-primary mt-0.5 tabular-nums">{p.temp}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] text-ink-muted">Satelit</dt>
                      <dd className="font-mono text-ink-primary mt-0.5 tabular-nums">{p.moons}</dd>
                    </div>
                  </dl>

                  {isExpanded && (
                    <p className="mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-ink-secondary leading-relaxed">
                      {p.detail}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : p.id)}
                  aria-expanded={isExpanded}
                  className="min-h-[40px] inline-flex items-center gap-1 text-xs font-medium text-ink-secondary hover:text-ink-primary transition-colors"
                >
                  <span>{isExpanded ? 'Ringkas' : 'Catatan ilmiah'}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                <Link
                  href={`/tata-surya?objek=${p.id}`}
                  className="min-h-[40px] px-4 rounded-lg bg-cyan-glow text-space-navy text-xs font-bold hover:bg-ink-primary transition-colors inline-flex items-center"
                >
                  Fokus di 3D
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
