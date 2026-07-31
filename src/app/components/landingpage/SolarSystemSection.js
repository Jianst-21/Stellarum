'use client';

import dynamic from 'next/dynamic';

const SolarSystem3D = dynamic(() => import('@/app/components/SolarSystem3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[460px] sm:h-[600px] md:h-[720px] bg-[#05060f] rounded-2xl border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] font-['Geist'] text-sm tracking-widest">
      MEMUAT TATA SURYA 3D...
    </div>
  ),
});

export default function SolarSystemSection() {
  return (
    <section className="py-24 px-4 md:px-10 max-w-[1280px] mx-auto" id="tata-surya">
      <div className="text-left mb-12">
        <h2 className="font-['Sora'] text-3xl md:text-4xl font-bold text-[#22D3EE] mb-4">
          Tata Surya Kita (Demo 3D Interaktif)
        </h2>
        <p className="text-[#ffffff] font-['Hanken_Grotesk'] text-base">
          Sebuah tarian kosmik 3D yang mengelilingi bintang induk kita. Klik planet, komet, atau sabuk asteroid untuk menjelajahi detailnya.
        </p>
      </div>

      <SolarSystem3D />
    </section>
  );
}
