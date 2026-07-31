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
    <section className="py-24 px-6 max-w-[1280px] mx-auto" id="eksplorasi">
      <div className="flex justify-between items-end mb-16">
        <div className="text-left">
          <h2 className="font-['Sora'] text-3xl font-bold text-[#22D3EE]">Eksplorasi Planet</h2>
        </div>
        <a
          href="#"
          className="hidden md:inline-flex items-center gap-2 text-[#22D3EE] hover:text-[#22D3EE]/80 transition-colors font-['Geist'] text-sm"
        >
          Lihat Semua
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {planetCards.map((planet, idx) => (
          <div
            key={idx}
            className="bg-[#0F0F14] rounded-xl overflow-hidden group cursor-pointer border border-[#22D3EE]/30"
          >
            <div className="h-48 w-full relative overflow-hidden">
              <div
                className="bg-cover bg-center w-full h-full group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url('${planet.img}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="font-['Sora'] text-xl text-[#FFFFFF] mb-2 font-bold">{planet.name}</h3>
              <p className="text-[#ffffff] text-sm line-clamp-2">{planet.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <a
        href="#"
        className="mt-8 flex md:hidden items-center justify-center gap-2 bg-transparent text-[#22D3EE] border border-[#22D3EE] font-['Geist'] text-sm w-full py-3 rounded-lg"
      >
        Lihat Semua
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </a>
    </section>
  );
}
