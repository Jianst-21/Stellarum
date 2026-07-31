export default function PlanetExplorationSection() {
  const planetCards = [
    {
      name: 'Jupiter',
      desc: 'Planet terbesar di tata surya kita, dengan badai besar yang telah berlangsung selama berabad-abad.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDweaPDjrYKxUI6bh4BXp7jtCZmp_kmVPnliZW4jxR2eqWw0IbKQSDkqjzKVpOEYs6I_3vSt0NcnMTo0R5CIbY2cMAChzFd8AGkvPEtZSPczaPpRsRVi-1VEaEETYeLbFYTWDo08cLmlUzEWg-tWCMWqy2IWBI8-lahnK8ngNzfpEgK_brJEJZDlqvfATdUMEyatrJhhzmYD0RuE3rbcAZqJkybpDpgg-iRA7Uysx298MSZVTqcnZk',
    },
    {
      name: 'Saturnus',
      desc: 'Dikenal dengan sistem cincin es dan bebatuan yang spektakuler yang mengelilinginya.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqIU0DeWXofMFwpOzC9PV2a8oqKdG4aQskgCV_mQjS-Qw8KVEEhjcBUhMAJc5VQ6PN7yQ9FoxlmYgKENcS-a_vbkSEdghTlbn0AHm0nF28SnQ9qotZehktUt4LbFM8eVWEb16AdezjMpVthQxFUIGlLErsCbruJFSm0i88K9D_fe3aQEzo5aSKreYH6OuffsVH00Mvd_K_3uKDZddk1eXqGKDMZT6BChmE5tQrCsMcorlstA9Vv-k',
    },
    {
      name: 'Mars',
      desc: 'Target utama untuk eksplorasi manusia masa depan, dengan permukaan berbatu merah.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc1dK3m-7oYuS2VC9VY5ejmrNNRIBb8cGkoY_gY3ufjnf3IFXkld2WXnEmZO6zJUXY9RQeNsD6DClS9B3aNc96L-mOF6VwuzO7yFbkNnlFxzQ-bXQ-kKMz23xl0j9EkmTtJqU08G8VOEDLH77Go07hRb9Iw983XxB5uSZNeyI_2zEYuQw1TbVyA64oHe4do9XVuLmSgou9iiGbQFyXpIoCuG-lvCUooD5SLdR2DjVnY8y_5oiqXKM',
    },
    {
      name: 'Neptunus',
      desc: 'Planet terjauh di tata surya kita, dunia es biru tua yang sangat dingin dan berangin.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI_W2hh61CP7nquDZ4q1l7eybmcItLPpRBGniwmG_-hVw-snR_nnBdXAGE1kN98IXelrfM4Owz3fWDMjpOKk8fTh76wl4ZTLZuqSuvDzbXoUV8kYhba2Z3zht38RdtH_F97_AfO6IMSCgMWmv2vAat8D0TAYMFhFAmrcLe14SdcLap9-FX3VmxGm2mdCrr-Z423xnRwDLylZ-25x2TytHdQws2n7wmT9-3qxulpWGgYWQcuckloSE',
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
