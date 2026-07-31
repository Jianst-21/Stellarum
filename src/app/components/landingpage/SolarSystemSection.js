'use client';

import dynamic from 'next/dynamic';
import { Globe } from 'lucide-react';

const SolarSystem3D = dynamic(() => import('@/app/components/SolarSystem3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[460px] sm:h-[600px] md:h-[720px] bg-[#05060f] rounded-2xl border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-medium text-sm tracking-widest">
      MEMUAT TATA SURYA 3D...
    </div>
  ),
});

export default function SolarSystemSection() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="tata-surya">
      {/* Standardized Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4 backdrop-blur-md">
          <Globe className="w-4 h-4" />
          <span>Simulasi 3D Interaktif</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400 mb-4">
          Tata Surya Kita (Visualisasi 3D)
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Sebuah tarian kosmik 3D yang mengelilingi bintang induk kita. Klik planet, komet, atau sabuk asteroid untuk menjelajahi detailnya.
        </p>
      </div>

      <SolarSystem3D />
    </section>
  );
}
