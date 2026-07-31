import StarfieldBg from '@/app/components/global/StarfieldBg';
import Navbar from '@/app/components/global/Navbar';
import Footer from '@/app/components/global/Footer';

export const metadata = {
  title: 'Teknologi Astronomi — Stellarum',
  description: 'Instrumen pengamatan astronomi, teleskop luar angkasa, dan simulasi 3D WebGL.',
};

export default function TeknologiPage() {
  const techStack = [
    { title: 'Teleskop Luar Angkasa James Webb (JWST)', desc: 'Pengamatan inframerah spektrum dalam untuk mendeteksi galaksi awal semesta.' },
    { title: 'Teleskop Luar Angkasa Hubble', desc: 'Instrumen legendaris yang memetakan ekspansi alam semesta dan citra tinggi nebula.' },
    { title: 'Mesin Visualisasi 3D WebGL (Three.js)', desc: 'Render grafis 3D real-time berkinerja tinggi langsung di browser tanpa plugin.' },
    { title: 'Next.js App Router & React', desc: 'Arsitektur web modern dengan pengoptimalan kecepatan render dan SEO astronomi.' },
  ];

  return (
    <div className="relative min-h-screen text-[#ffffff] font-['Hanken_Grotesk'] overflow-x-hidden">
      <StarfieldBg />
      <Navbar />

      <main className="relative z-10 pt-28 pb-24 px-6 max-w-[1280px] mx-auto">
        <header className="mb-12 text-center">
          <h1 className="font-['Sora'] text-4xl md:text-5xl font-bold text-[#22D3EE] mb-4">
            Teknologi Eksplorasi Astronomi
          </h1>
          <p className="text-[#ffffff] text-lg max-w-2xl mx-auto">
            Mengenal instrumen pengamatan ruang angkasa modern dan stack teknologi yang menggerakkan platform Stellarum.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techStack.map((t, idx) => (
            <div key={idx} className="bg-[#0F0F14]/90 backdrop-blur-md rounded-xl p-6 border border-[#22D3EE]/30">
              <div className="w-10 h-10 rounded-full bg-[#22D3EE]/20 border border-[#22D3EE] flex items-center justify-center text-[#22D3EE] mb-4 font-bold">
                0{idx + 1}
              </div>
              <h3 className="font-['Sora'] text-xl font-bold text-[#ffffff] mb-2">{t.title}</h3>
              <p className="text-[#9aa3c4] text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
