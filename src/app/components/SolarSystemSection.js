'use client';

import { useState } from 'react';

export default function SolarSystemSection() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const planets = [
    {
      name: 'Merkurius',
      desc: 'Planet terkecil dan terdekat dengan Matahari.',
      size: 'w-6 h-6',
      orbitSize: 'w-[150px] h-[150px]',
      duration: '8s',
      img: '/images/planets/merkurius.png',
      link: '#planet-merkurius',
    },
    {
      name: 'Venus',
      desc: 'Planet terpanas di tata surya kita karena atmosfernya yang tebal.',
      size: 'w-8 h-8',
      orbitSize: 'w-[220px] h-[220px]',
      duration: '12s',
      img: '/images/planets/venus.png',
      link: '#planet-venus',
    },
    {
      name: 'Bumi',
      desc: 'Satu-satunya planet yang diketahui memiliki kehidupan.',
      size: 'w-10 h-10',
      orbitSize: 'w-[320px] h-[320px]',
      duration: '18s',
      img: '/images/planets/bumi.png',
      link: '#planet-bumi',
    },
    {
      name: 'Mars',
      desc: 'Sering disebut Planet Merah, target utama eksplorasi manusia masa depan.',
      size: 'w-8 h-8',
      orbitSize: 'w-[420px] h-[420px]',
      duration: '24s',
      img: '/images/planets/mars.png',
      link: '#planet-mars',
    },
    {
      name: 'Jupiter',
      desc: 'Planet terbesar di tata surya kita, raksasa gas dengan badai dahsyat.',
      size: 'w-20 h-20',
      orbitSize: 'w-[560px] h-[560px]',
      duration: '40s',
      img: '/images/planets/jupiter.png',
      link: '#planet-jupiter',
    },
    {
      name: 'Saturnus',
      desc: 'Terkenal dengan sistem cincinnya yang menakjubkan dan kompleks.',
      size: 'w-28 h-28',
      orbitSize: 'w-[720px] h-[720px]',
      duration: '60s',
      isRing: true,
      img: '/images/planets/saturnus.png',
      link: '#planet-saturnus',
    },
    {
      name: 'Uranus',
      desc: 'Raksasa es yang berputar pada sisinya.',
      size: 'w-14 h-14',
      orbitSize: 'w-[900px] h-[900px]',
      duration: '85s',
      img: '/images/planets/uranus.png',
      link: '#planet-uranus',
    },
    {
      name: 'Neptunus',
      desc: 'Planet terjauh, dunia es biru gelap yang sangat berangin.',
      size: 'w-14 h-14',
      orbitSize: 'w-[1050px] h-[1050px]',
      duration: '110s',
      img: '/images/planets/neptunus.png',
      link: '#planet-neptunus',
    },
  ];

  return (
    <section className="py-24 px-6 max-w-[1280px] mx-auto" id="tata-surya">
      <div className="text-left mb-16">
        <h2 className="font-['Sora'] text-3xl font-bold text-[#22D3EE] mb-4">Tata Surya Kita</h2>
        <p className="text-[#ffffff] font-['Hanken_Grotesk']">Sebuah tarian kosmik yang mengelilingi bintang induk kita.</p>
      </div>

      <div className="relative w-full h-[800px] overflow-hidden rounded-xl bg-[#0F0F14] starfield-bg flex items-center justify-center border border-[#22D3EE]/30">
        {/* Sun */}
        <div className="absolute w-40 h-40 z-10 flex items-center justify-center">
          <img
            alt="Matahari"
            className="w-full h-full object-cover rounded-full shadow-[0_0_80px_rgba(255,225,109,0.8)]"
            src="/images/planets/matahari.png"
          />
        </div>

        {/* Orbit Lines & Planets */}
        {planets.map((planet, idx) => (
          <div
            key={idx}
            className={`orbit-path ${planet.orbitSize} animate-orbit`}
            style={{ animationDuration: planet.duration }}
          >
            <div
              className={`planet-container ${planet.size} group cursor-pointer hover:scale-125 transition-transform`}
              onClick={() => setSelectedPlanet(planet)}
            >
              <img
                alt={planet.name}
                className={`w-full h-full ${planet.isRing ? 'object-contain scale-[1.5]' : 'object-cover rounded-full border border-[#22D3EE]/50'}`}
                src={planet.img}
                style={{ animation: `orbit ${planet.duration} linear infinite reverse` }}
              />
            </div>
          </div>
        ))}

        {/* Planet Info Modal Card */}
        {selectedPlanet && (
          <div className="absolute bottom-8 right-8 z-50 bg-[#0F0F14] p-6 rounded-xl border border-[#22D3EE]/30 shadow-2xl max-w-sm">
            <button
              className="absolute top-4 right-4 text-[#ffffff] hover:text-[#22D3EE] transition-colors"
              onClick={() => setSelectedPlanet(null)}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <h3 className="font-['Sora'] text-2xl text-[#FFFFFF] mb-2 font-bold">{selectedPlanet.name}</h3>
            <p className="font-['Hanken_Grotesk'] text-base text-[#ffffff] mb-6 min-h-[48px]">
              {selectedPlanet.desc}
            </p>
            <a
              className="inline-flex items-center gap-2 bg-transparent text-[#22D3EE] border border-[#22D3EE] px-4 py-2 rounded font-['Geist'] text-sm transition-colors w-full justify-center hover:bg-[#22D3EE]/10"
              href={selectedPlanet.link}
            >
              Pelajari Lebih Lanjut
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
