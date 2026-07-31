export default function HeroSection() {
  return (
    <section className="min-h-[700px] flex flex-col justify-center items-center text-center px-6 max-w-[1280px] mx-auto py-24 relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-['Sora'] text-4xl md:text-6xl text-[#22D3EE] mb-6 tracking-tight font-bold shadow-2xl">
          Jelajahi Alam Semesta
        </h1>
        <p className="font-['Hanken_Grotesk'] text-lg md:text-xl text-[#ffffff] max-w-2xl mx-auto mb-10 leading-relaxed">
          Temukan keajaiban di balik kegelapan malam dan rahasia yang tersembunyi di antara bintang-bintang.
        </p>
        <a
          href="#tata-surya"
          className="inline-flex items-center gap-2 bg-[#22D3EE] text-[#001f25] px-8 py-4 rounded font-['Geist'] text-sm font-bold hover:bg-[#22D3EE]/90 transition-colors duration-300 shadow-lg shadow-[#22D3EE]/20"
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            rocket_launch
          </span>
          Mulai Jelajahi
        </a>
      </div>
    </section>
  );
}
