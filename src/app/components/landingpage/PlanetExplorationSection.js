import { ArrowRight } from 'lucide-react';
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
    <section className="py-24 px-4 md:px-10 max-w-[1280px] mx-auto" id="eksplorasi">
      <div className="flex justify-between items-end mb-16">
        <div className="text-left">
          <h2 className="font-['Sora'] text-3xl font-bold text-[#22D3EE]">Eksplorasi Planet</h2>
        </div>
        <Link
          href="/planet"
          className="hidden md:inline-flex items-center gap-2 text-[#22D3EE] hover:text-[#22D3EE]/80 transition-colors font-['Geist'] text-sm"
        >
          Lihat Semua
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {planetCards.map((planet, idx) => (
          <div
            key={idx}
            className="bg-[#0D0E1A] rounded-2xl overflow-hidden group cursor-pointer border border-[#22D3EE]/20 hover:border-[#22D3EE]/60 transition-all duration-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.15)] flex flex-col"
          >
            <div className="h-48 w-full relative overflow-hidden shrink-0">
              <div
                className="bg-cover bg-center w-full h-full group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url('${planet.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E1A] via-[#0D0E1A]/20 to-transparent" />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <h3 className="font-['Sora'] text-lg text-white font-bold">{planet.name}</h3>
              <p className="text-[#9aa3c4] text-sm leading-relaxed line-clamp-2">{planet.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/planet"
        className="mt-8 flex md:hidden items-center justify-center gap-2 bg-transparent text-[#22D3EE] border border-[#22D3EE] font-['Geist'] text-sm w-full py-3 rounded-lg"
      >
        Lihat Semua
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
