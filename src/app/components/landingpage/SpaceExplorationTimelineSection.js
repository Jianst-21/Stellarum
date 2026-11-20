'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const TIMELINE_EVENTS = [
  {
    year: '1957',
    title: 'Sputnik 1: Peluncuran Satelit Pertama',
    agency: 'Uni Soviet',
    category: 'Satelit',
    summary:
      'Satelit buatan manusia pertama yang berhasil mengorbit Bumi, menandai dimulainya Era Antariksa.',
    details:
      'Sputnik 1 berbobot 83,6 kg dan memancarkan sinyal radio yang dapat ditangkap stasiun penerima di seluruh dunia selama 21 hari.',
  },
  {
    year: '1961',
    title: 'Vostok 1: Manusia Pertama di Luar Angkasa',
    agency: 'Uni Soviet (Yuri Gagarin)',
    category: 'Misi Manusia',
    summary:
      'Yuri Gagarin menjadi manusia pertama yang mengorbit Bumi dalam penerbangan berdurasi 108 menit.',
    details:
      'Penerbangan ini membuktikan tubuh manusia mampu bertahan dan tetap berfungsi selama peluncuran roket serta kondisi mikrogravitasi.',
  },
  {
    year: '1969',
    title: 'Apollo 11: Pendaratan Manusia di Bulan',
    agency: 'NASA',
    category: 'Misi Manusia',
    summary:
      'Neil Armstrong dan Buzz Aldrin menjadi manusia pertama yang berjalan di permukaan Bulan.',
    details:
      'Misi Apollo 11 membawa pulang 21,5 kg sampel batuan Bulan yang menjadi fondasi studi geologi asal-usul sistem Bumi dan Bulan.',
  },
  {
    year: '1977',
    title: 'Peluncuran Voyager 1 dan 2',
    agency: 'NASA',
    category: 'Eksplorasi Planet',
    summary:
      'Wahana kembar yang memetakan planet-planet raksasa luar (Jupiter, Saturnus, Uranus, Neptunus).',
    details:
      'Voyager 1 kini berada lebih dari 24 miliar km dari Bumi di ruang antarbintang sambil membawa Golden Record berisi rekaman suara dan citra peradaban Bumi.',
  },
  {
    year: '1990',
    title: 'Peluncuran Teleskop Antariksa Hubble',
    agency: 'NASA dan ESA',
    category: 'Teleskop',
    summary:
      'Observatorium optik orbit rendah Bumi yang mengubah pemahaman tentang usia dan ekspansi alam semesta.',
    details:
      'Lebih dari 1,5 juta pengamatan Hubble membantu mempersempit estimasi usia alam semesta pada 13,8 miliar tahun dan mengamati galaksi sangat jauh.',
  },
  {
    year: '1998',
    title: 'Pembangunan Stasiun Luar Angkasa Internasional (ISS)',
    agency: 'NASA, Roscosmos, ESA, JAXA, CSA',
    category: 'Misi Manusia',
    summary:
      'Laboratorium mikrogravitasi internasional yang dihuni manusia secara berkelanjutan sejak tahun 2000.',
    details:
      'ISS mengorbit Bumi pada ketinggian sekitar 400 km dengan kecepatan 28.000 km/jam, menyelesaikan 16 orbit setiap hari.',
  },
  {
    year: '2012',
    title: 'Pendaratan Rover Curiosity di Mars',
    agency: 'NASA',
    category: 'Eksplorasi Planet',
    summary:
      'Rover laboratorium bergerak seukuran mobil mendarat di Kawah Gale menggunakan teknik sky-crane.',
    details:
      'Curiosity menemukan sedimen batuan dan mineral tanah liat yang membuktikan Mars purba pernah memiliki danau air tawar.',
  },
  {
    year: '2021',
    title: 'Peluncuran Teleskop James Webb (JWST)',
    agency: 'NASA, ESA, CSA',
    category: 'Teleskop',
    summary:
      'Teleskop inframerah berdiameter cermin 6,5 meter yang beroperasi di titik Lagrange L2.',
    details:
      'Dengan 18 segmen cermin heksagonal berlapis emas, JWST mengamati galaksi paling awal setelah Big Bang dan spektrum atmosfer eksoplanet.',
  },
];

const CATEGORIES = ['Semua', 'Misi Manusia', 'Satelit', 'Teleskop', 'Eksplorasi Planet'];

export default function SpaceExplorationTimelineSection() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [expandedYear, setExpandedYear] = useState(null);

  const filteredEvents =
    activeCategory === 'Semua'
      ? TIMELINE_EVENTS
      : TIMELINE_EVENTS.filter((e) => e.category === activeCategory);

  return (
    <section
      id="linimasa"
      aria-labelledby="linimasa-heading"
      className="py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Sticky Editorial Intro & Filter */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <h2
            id="linimasa-heading"
            className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-ink-primary leading-tight mb-3"
          >
            Jejak Eksplorasi Antariksa
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed mb-6">
            Tonggak utama umat manusia sejak satelit pertama hingga teleskop inframerah di titik L2.
          </p>

          <div
            role="group"
            aria-label="Filter kategori misi antariksa"
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setExpandedYear(null);
                  }}
                  aria-pressed={active}
                  className={`min-h-[40px] px-3.5 rounded-lg text-xs font-medium border transition-colors ${
                    active
                      ? 'bg-cyan-glow text-space-navy border-cyan-glow font-bold'
                      : 'bg-space-abyss/75 text-ink-secondary border-white/12 hover:border-cyan-glow/50 hover:text-ink-primary'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Structured Timeline */}
        <div className="lg:col-span-8 divide-y divide-white/10 border-t border-b border-white/10">
          {filteredEvents.map((evt) => {
            const isOpen = expandedYear === evt.year;
            return (
              <article key={evt.year} className="py-5 sm:py-6">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-5 items-start">
                  <div className="sm:col-span-3">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-amber-star tabular-nums block">
                      {evt.year}
                    </span>
                    <span className="font-mono text-xs text-ink-muted block mt-0.5">
                      {evt.category}
                    </span>
                  </div>

                  <div className="sm:col-span-9 min-w-0">
                    <div className="text-xs text-ink-muted mb-1">{evt.agency}</div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-ink-primary mb-2">
                      {evt.title}
                    </h3>
                    <p className="text-sm text-ink-secondary leading-relaxed mb-3 max-w-[60ch]">
                      {evt.summary}
                    </p>

                    <button
                      type="button"
                      onClick={() => setExpandedYear(isOpen ? null : evt.year)}
                      aria-expanded={isOpen}
                      className="min-h-[36px] inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-glow hover:text-ink-primary transition-colors"
                    >
                      <span>{isOpen ? 'Tutup catatan misi' : 'Baca catatan misi'}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <div className="mt-3 p-4 rounded-lg border border-white/10 bg-space-abyss/80 text-sm text-ink-secondary leading-relaxed max-w-[60ch]">
                        {evt.details}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
