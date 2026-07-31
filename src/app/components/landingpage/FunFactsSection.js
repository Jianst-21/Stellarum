import { Ruler, Sparkles, Zap } from 'lucide-react';

export default function FunFactsSection() {
  const facts = [
    {
      icon: Ruler,
      title: 'Jarak ke Matahari',
      desc: 'Bumi berjarak rata-rata 149.6 juta km dari Matahari, jarak yang dikenal sebagai satu Satuan Astronomi (SA).',
    },
    {
      icon: Sparkles,
      title: 'Milyaran Bintang',
      desc: 'Diperkirakan ada sekitar 100 hingga 400 milyar bintang hanya di galaksi Bima Sakti kita sendiri.',
    },
    {
      icon: Zap,
      title: 'Kecepatan Cahaya',
      desc: 'Cahaya bergerak sangat cepat melintasi ruang hampa, mencapai kecepatan sekitar 299,792 kilometer per detik.',
    },
  ];

  return (
    <section className="py-24 px-6 max-w-[1280px] mx-auto" id="fakta">
      <div className="text-left mb-16">
        <h2 className="font-['Sora'] text-3xl font-bold text-[#22D3EE]">Fakta Menarik</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facts.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#0F0F14] p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 border border-[#22D3EE]/30"
            >
              <div className="w-12 h-12 rounded-full bg-[#22D3EE] flex items-center justify-center mb-4 text-[#0F0F14]">
                <IconComp className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-['Sora'] text-xl text-[#FFFFFF] mb-2 font-bold">{item.title}</h3>
              <p className="font-['Hanken_Grotesk'] text-base text-[#ffffff]">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
