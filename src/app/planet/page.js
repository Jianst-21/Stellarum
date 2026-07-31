import StarfieldBg from '@/app/components/global/StarfieldBg';
import Navbar from '@/app/components/global/Navbar';
import Footer from '@/app/components/global/Footer';

export const metadata = {
  title: 'Eksplorasi Planet — Stellarum',
  description: 'Halaman data lengkap planet, planet kerdil, satelit alami, dan benda langit Tata Surya.',
};

export default function PlanetPage() {
  const planetList = [
    { name: 'Merkurius', type: 'Terestrial', desc: 'Planet terkecil dan terdekat dengan Matahari.', img: '/images/planets/merkurius.png' },
    { name: 'Venus', type: 'Terestrial', desc: 'Planet terpanas di Tata Surya dengan atmosfer tebal CO2.', img: '/images/planets/venus.png' },
    { name: 'Bumi', type: 'Terestrial', desc: 'Rumah kehidupan dengan lautan air cair.', img: '/images/planets/bumi.png' },
    { name: 'Mars', type: 'Terestrial', desc: 'Planet Merah dengan gunung berapi raksasa Olympus Mons.', img: '/images/planets/mars.png' },
    { name: 'Jupiter', type: 'Raksasa Gas', desc: 'Planet terbesar dengan Badai Merah Raksasa.', img: '/images/planets/jupiter.png' },
    { name: 'Saturnus', type: 'Raksasa Gas', desc: 'Dikelilingi sistem cincin es menakjubkan.', img: '/images/planets/saturnus.png' },
    { name: 'Uranus', type: 'Raksasa Es', desc: 'Planet es dengan rotasi miring 98 derajat.', img: '/images/planets/uranus.png' },
    { name: 'Neptunus', type: 'Raksasa Es', desc: 'Planet es biru dengan angin kencang supersonik.', img: '/images/planets/neptunus.png' },
  ];

  return (
    <div className="relative min-h-screen text-[#ffffff] font-['Hanken_Grotesk'] overflow-x-hidden">
      <StarfieldBg />
      <Navbar />

      <main className="relative z-10 pt-28 pb-24 px-6 max-w-[1280px] mx-auto">
        <header className="mb-12 text-center">
          <h1 className="font-['Sora'] text-4xl md:text-5xl font-bold text-[#22D3EE] mb-4">
            Eksplorasi Objek Tata Surya
          </h1>
          <p className="text-[#ffffff] text-lg max-w-2xl mx-auto">
            Pelajari karakteristik lengkap planet terestrial, raksasa gas, dan raksasa es di Tata Surya kita.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {planetList.map((p, idx) => (
            <div key={idx} className="bg-[#0F0F14]/90 backdrop-blur-md rounded-xl overflow-hidden border border-[#22D3EE]/30 p-4 hover:border-[#22D3EE] transition-all">
              <div className="h-40 w-full flex items-center justify-center mb-4">
                <img src={p.img} alt={p.name} className="h-32 object-contain" />
              </div>
              <span className="text-xs bg-[#22D3EE]/15 text-[#22D3EE] px-2 py-1 rounded font-['Geist']">
                {p.type}
              </span>
              <h3 className="font-['Sora'] text-xl font-bold text-[#ffffff] mt-2 mb-1">{p.name}</h3>
              <p className="text-[#9aa3c4] text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
