'use client';

import { useState } from 'react';
import { Rocket, Calendar, Award, ChevronRight, Globe, ShieldAlert, Compass } from 'lucide-react';

const TIMELINE_EVENTS = [
  {
    year: '1957',
    title: 'Sputnik 1 — Peluncuran Satelit Pertama',
    agency: 'Uni Soviet',
    category: 'Satelit',
    summary: 'Satelit buatan manusia pertama yang berhasil mengorbit Bumi, menandai dimulainya Era Antariksa.',
    details: 'Sputnik 1 berbobot 83,6 kg dan memancarkan sinyal radio beep-beep yang dapat ditangkap stasion radio di seluruh dunia selama 21 hari.',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    year: '1961',
    title: 'Yuri Gagarin — Manusia Pertama di Luar Angkasa',
    agency: 'Uni Soviet (Vostok 1)',
    category: 'Misi Manusia',
    summary: 'Yuri Gagarin menjadi manusia pertama yang terbang ke luar angkasa dan mengelilingi Bumi selama 108 menit.',
    details: 'Kalimat terkenal Gagarin saat peluncuran adalah "Poyekhali!" (Ayo pergi!). Penerbangan ini membuktikan manusia mampu bertahan di lingkungan tanpa bobot.',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
  {
    year: '1969',
    title: 'Apollo 11 — Pendaratan Manusia di Bulan',
    agency: 'NASA (Amerika Serikat)',
    category: 'Misi Manusia',
    summary: 'Neil Armstrong & Buzz Aldrin menjadi manusia pertama yang berjalan di permukaan Bulan.',
    details: 'Ucapan ikonik Armstrong: "Satu langkah kecil bagi seorang manusia, satu lompatan besar bagi umat manusia." Misi ini mengumpulkan 21.5 kg sampel batuan Bulan.',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    year: '1977',
    title: 'Peluncuran Voyager 1 & 2',
    agency: 'NASA',
    category: 'Eksplorasi Planet',
    summary: 'Wahana antariksa kembar dikirim menjelajahi planet-planet luar (Jupiter, Saturnus, Uranus, Neptunus).',
    details: 'Voyager 1 kini menjadi objek buatan manusia terjauh dari Bumi (>24 miliar km) dan telah memasuki ruang antar-bintang (interstellar space) membawa Golden Record.',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    year: '1990',
    title: 'Peluncuran Teleskop Antariksa Hubble',
    agency: 'NASA & ESA',
    category: 'Teleskop',
    summary: 'Teleskop antariksa paling legendaris yang mengubah cara pandang kita terhadap alam semesta.',
    details: 'Hubble mengambil lebih dari 1.5 juta observasi, membantu menentukan usia alam semesta (13.8 miliar tahun) dan membuktikan keberadaan energi gelap.',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    year: '1998',
    title: 'Pembangunan Stasiun Luar Angkasa Internasional (ISS)',
    agency: 'NASA, Roscosmos, ESA, JAXA, CSA',
    category: 'Misi Manusia',
    summary: 'Laboratorium mikrogravitas terbesar yang ditempati manusia secara kontinu sejak tahun 2000.',
    details: 'ISS mengorbit Bumi setiap 90 menit pada kecepatan 28.000 km/jam dan dapat dilihat dengan mata telanjang dari Bumi.',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  },
  {
    year: '2012',
    title: 'Pendaratan Rover Curiosity di Mars',
    agency: 'NASA',
    category: 'Eksplorasi Planet',
    summary: 'Rover robotik seukuran mobil mendarat di Kawah Gale Mars menggunakan teknik sky-crane.',
    details: 'Curiosity menemukan bukti kuat bahwa Mars kuno pernah memiliki danau air tawar yang berpotensi mendukung kehidupan mikroba.',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
  },
  {
    year: '2021',
    title: 'Peluncuran Teleskop Antariksa James Webb (JWST)',
    agency: 'NASA, ESA, CSA',
    category: 'Teleskop',
    summary: 'Teleskop infra-merah paling canggih yang mengamati galaksi-galaksi pertama setelah Big Bang.',
    details: 'JWST beroperasi di titik Lagrange L2 (1.5 juta km dari Bumi) dengan cermin berlapis emas 6.5 meter dan perisai matahari seukuran lapangan tenis.',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  },
  {
    year: '2024+',
    title: 'Program Artemis & Eksplorasi Mars Masa Depan',
    agency: 'NASA & Mitra Internasional',
    category: 'Misi Manusia',
    summary: 'Misi mengembalikan manusia ke Bulan (termasuk wanita & astronot kulit berwarna pertama) sebagai pijakan ke Mars.',
    details: 'Membangun stasiun luar angkasa Lunar Gateway dan pangkalan permanen di kutub selatan Bulan yang kaya akan es air.',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  }
];

const CATEGORIES = ['Semua', 'Misi Manusia', 'Satelit', 'Teleskop', 'Eksplorasi Planet'];

export default function SpaceExplorationTimelineSection() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = activeCategory === 'Semua'
    ? TIMELINE_EVENTS
    : TIMELINE_EVENTS.filter((e) => e.category === activeCategory);

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-400 text-sm font-medium mb-4 backdrop-blur-md">
          <Compass className="w-4 h-4" />
          <span>Jejak Sejarah Manusia</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-400 mb-4">
          Timeline Sejarah Eksplorasi Antariksa
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Perjalanan panjang umat manusia menembus batas atmosfer, menjelajahi Bulan, hingga mengirim wahananya keluar dari Tata Surya.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/50'
                : 'bg-slate-900/80 border border-slate-800 text-gray-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-purple-500/30 ml-4 md:ml-36 space-y-10 pl-6 md:pl-10">
        {filteredEvents.map((evt, idx) => (
          <div
            key={idx}
            className="relative group transition-all duration-300"
          >
            {/* Timeline Dot Icon — 100% Pixel-Perfect Centered on Vertical Line */}
            <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-purple-400 flex items-center justify-center group-hover:scale-125 group-hover:bg-purple-500 transition-all shadow-md shadow-purple-500/50 z-10">
              <span className="w-2 h-2 rounded-full bg-purple-300"></span>
            </div>

            {/* Year Badge on the left for desktop (Clean 16px gap to the left of vertical line) */}
            <div className="md:absolute md:-left-[152px] md:top-1 text-cyan-400 font-extrabold text-lg md:text-xl tracking-wider mb-2 md:mb-0 md:w-24 md:text-right">
              {evt.year}
            </div>

            {/* Card Content */}
            <div className="bg-slate-950/90 md:bg-slate-900/70 border border-slate-800/80 hover:border-purple-500/50 rounded-2xl p-6 backdrop-blur-none md:backdrop-blur-xl transition-all shadow-xl hover:shadow-purple-500/10">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${evt.badgeColor}`}>
                  {evt.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-gray-500" />
                  {evt.agency}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {evt.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                {evt.summary}
              </p>

              {/* Collapsible Details */}
              <button
                onClick={() => setSelectedEvent(selectedEvent === idx ? null : idx)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                <span>{selectedEvent === idx ? 'Tutup Detail' : 'Baca Detail Lengkap'}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedEvent === idx ? 'rotate-90' : ''}`} />
              </button>

              {selectedEvent === idx && (
                <div className="mt-4 pt-4 border-t border-slate-800 text-sm text-gray-300 bg-slate-950/60 rounded-xl p-4 animate-fadeIn">
                  <p className="leading-relaxed">{evt.details}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
