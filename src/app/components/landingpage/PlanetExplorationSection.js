import Link from 'next/link';
import Image from 'next/image';
import { PLANET_CATALOG } from '@/app/data/solarObjects';

const FEATURED_IDS = ['earth', 'mars', 'jupiter', 'saturn'];

export default function PlanetExplorationSection() {
  const featured = FEATURED_IDS.map((id) => PLANET_CATALOG.find((p) => p.id === id)).filter(Boolean);

  return (
    <section
      id="eksplorasi"
      aria-labelledby="eksplorasi-heading"
      className="py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/10"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="max-w-xl">
          <h2
            id="eksplorasi-heading"
            className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-ink-primary leading-tight mb-3"
          >
            Dunia Utama di Tata Surya
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed">
            Pilih planet mana saja untuk langsung memfokuskan kamera observatorium ke orbitnya di ruang 3D.
          </p>
        </div>

        <Link
          href="/planet"
          className="min-h-[44px] px-5 inline-flex items-center justify-center rounded-lg border border-white/20 bg-space-black/70 text-sm font-medium text-ink-primary hover:border-cyan-glow transition-colors self-start sm:self-auto"
        >
          Lihat Semua Planet
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {featured.map((planet) => (
          <Link
            key={planet.id}
            href={`/tata-surya?objek=${planet.id}`}
            className="group rounded-xl overflow-hidden border border-white/12 bg-space-abyss/75 hover:border-cyan-glow/55 transition-colors flex flex-col"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-space-black">
              <Image
                src={planet.img}
                alt={`Planet ${planet.name}`}
                width={480}
                height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-abyss via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-xs text-amber-star">{planet.category}</span>
                  <span className="font-mono text-xs text-ink-muted tabular-nums">
                    {planet.diameterKm.toLocaleString('id-ID')} km
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-ink-primary group-hover:text-cyan-glow transition-colors mb-1.5">
                  {planet.name}
                </h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {planet.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="font-mono text-ink-muted">{planet.distance}</span>
                <span className="font-semibold text-cyan-glow">Buka di 3D</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
