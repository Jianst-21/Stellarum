import StarfieldBg from '@/app/components/global/StarfieldBg';
import Navbar from '@/app/components/global/Navbar';
import Footer from '@/app/components/global/Footer';

export const metadata = {
  title: 'Eksplorasi Galaksi — Stellarum',
  description: 'Klasifikasi morfologi galaksi, Bima Sakti, galaksi tetangga, dan objek galaktik.',
};

export default function GalaksiPage() {
  const galaxyItems = [
    { title: 'Bima Sakti (Milky Way)', type: 'Galaksi Spiral Berbatang', desc: 'Rumah bagi Tata Surya kita dengan ratusan miliar bintang.', img: '/images/planets/bima_sakti.png' },
    { title: 'Galaksi Andromeda (M31)', type: 'Galaksi Spiral', desc: 'Galaksi raksasa tetangga terdekat dengan jarak 2.5 juta tahun cahaya.', img: '/images/planets/andromeda.png' },
    { title: 'Nebula Kosmik', type: 'Objek Galaktik', desc: 'Awan gas interstellar dan debu tempat lahirnya bintang-bintang baru.', img: '/images/planets/nebula.png' },
    { title: 'Lubang Hitam Supermasif', type: 'Singularitas', desc: 'Pusat gravitasi ekstrem di inti galaksi (Sagittarius A*).', img: '/images/planets/black_hole.png' },
  ];

  return (
    <div className="relative min-h-screen text-[#ffffff] font-['Hanken_Grotesk'] overflow-x-hidden">
      <StarfieldBg />
      <Navbar />

      <main className="relative z-10 pt-28 pb-24 px-6 max-w-[1280px] mx-auto">
        <header className="mb-12 text-center">
          <h1 className="font-['Sora'] text-4xl md:text-5xl font-bold text-[#22D3EE] mb-4">
            Eksplorasi Skala Galaksi
          </h1>
          <p className="text-[#ffffff] text-lg max-w-2xl mx-auto">
            Menelusuri morfologi galaksi, objek menarik galaktik, dan struktur grup lokal di Alam Semesta.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galaxyItems.map((g, idx) => (
            <div key={idx} className="bg-[#0F0F14]/90 backdrop-blur-md rounded-xl overflow-hidden border border-[#22D3EE]/30 flex flex-col md:flex-row">
              <div className="md:w-1/2 h-48 md:h-auto relative">
                <img src={g.img} alt={g.title} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-6 flex flex-col justify-center">
                <span className="text-xs bg-[#22D3EE]/15 text-[#22D3EE] px-2 py-1 rounded w-fit mb-2 font-['Geist']">
                  {g.type}
                </span>
                <h3 className="font-['Sora'] text-xl font-bold text-[#ffffff] mb-2">{g.title}</h3>
                <p className="text-[#9aa3c4] text-sm">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
