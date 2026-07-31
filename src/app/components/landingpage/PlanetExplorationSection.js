import { ArrowRight, Compass } from 'lucide-react';
import Link from 'next/link';

export default function PlanetExplorationSection() {
  const planetCards = [
    {
      name: 'Jupiter',
      desc: 'Planet terbesar di tata surya kita, dengan badai besar yang telah berlangsung selama berabad-abad.',
      img: '/images/planets/jupiter.png',
    },
    {
      name: 'Saturnus',
      desc: 'Dikenal dengan sistem cincin es dan bebatuan yang spektakuler yang mengelilinginya.',
      img: '/images/planets/saturnus.png',
    },
    {
      name: 'Mars',
      desc: 'Target utama untuk eksplorasi manusia masa depan, dengan permukaan berbatu merah.',
      img: '/images/planets/mars.png',
    },
    {
      name: 'Neptunus',
      desc: 'Planet terjauh di tata surya kita, dunia es biru tua yang sangat dingin dan berangin.',
      img: '/images/planets/neptunus.png',
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="eksplorasi">
      {/* Standardized Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4 backdrop-blur-md">
          <Compass className="w-4 h-4" />
          <span>Katalog Dunia Kosmik</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400 mb-4">
          Eksplorasi Planet Utama
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Jelajahi keajaiban dan karakteristik unik planet-planet terbesar di Tata Surya kita.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {planetCards.map((planet, idx) => (
          <div
            key={idx}
            className="bg-slate-900/60 rounded-2xl overflow-hidden group cursor-pointer border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col backdrop-blur-xl"
          >
            <div className="h-48 w-full relative overflow-hidden shrink-0">
              <div
                className="bg-cover bg-center w-full h-full group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url('${planet.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <h3 className="text-lg text-white font-bold">{planet.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{planet.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          href="/planet"
          className="inline-flex items-center gap-2 bg-slate-950 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-600 hover:text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-cyan-500/10"
        >
          <span>Lihat Seluruh Planet</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
