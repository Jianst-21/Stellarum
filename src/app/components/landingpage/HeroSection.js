import { Rocket, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="min-h-[680px] flex flex-col justify-center items-center text-center px-4 md:px-8 max-w-7xl mx-auto py-20 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4" />
          <span>Portal Eksplorasi Astronomi Interaktif</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400 mb-6 leading-tight">
          Jelajahi Keajaiban Alam Semesta & Tata Surya
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Temukan keajaiban di balik kegelapan malam, tarian planet 3D interaktif, dan rahasia yang tersembunyi di antara bintang-bintang.
        </p>

        {/* Call to Action Button */}
        <a
          href="#tata-surya"
          className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Rocket className="w-5 h-5 stroke-[2.5]" />
          <span>Mulai Penjelajahan 3D</span>
        </a>
      </div>
    </section>
  );
}
