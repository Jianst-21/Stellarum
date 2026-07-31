import { Ruler, Sparkles, Zap, Lightbulb } from 'lucide-react';

export default function FunFactsSection() {
  const facts = [
    {
      icon: Ruler,
      title: 'Jarak ke Matahari',
      desc: 'Bumi berjarak rata-rata 149.6 juta km dari Matahari, jarak yang dikenal sebagai satu Satuan Astronomi (SA).',
      accent: 'border-cyan-500/30 hover:border-cyan-400',
      iconBg: 'bg-cyan-500 text-slate-950',
    },
    {
      icon: Sparkles,
      title: 'Milyaran Bintang',
      desc: 'Diperkirakan ada sekitar 100 hingga 400 milyar bintang hanya di galaksi Bima Sakti kita sendiri.',
      accent: 'border-amber-500/30 hover:border-amber-400',
      iconBg: 'bg-amber-500 text-slate-950',
    },
    {
      icon: Zap,
      title: 'Kecepatan Cahaya',
      desc: 'Cahaya bergerak sangat cepat melintasi ruang hampa, mencapai kecepatan sekitar 299.792 kilometer per detik.',
      accent: 'border-purple-500/30 hover:border-purple-400',
      iconBg: 'bg-purple-500 text-slate-950',
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="fakta">
      {/* Standardized Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400 text-sm font-medium mb-4 backdrop-blur-md">
          <Lightbulb className="w-4 h-4" />
          <span>Wawasan Kosmik Singkat</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-amber-400 mb-4">
          Fakta Menarik Alam Semesta
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Fakta-fakta penting tentang skala, bintang, dan kecepatan fisika di alam semesta yang menakjubkan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facts.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className={`bg-slate-900/60 p-6 md:p-8 rounded-2xl border ${item.accent} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-xl`}
            >
              <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-5 shadow-lg`}>
                <IconComp className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-xl text-white mb-2 font-bold">{item.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
