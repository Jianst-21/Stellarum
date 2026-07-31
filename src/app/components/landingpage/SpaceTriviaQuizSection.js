'use client';

import { useState } from 'react';
import { Sparkles, BrainCircuit, RefreshCw, CheckCircle2, XCircle, ArrowRight, BookOpen } from 'lucide-react';

const SPACE_FACTS = [
  {
    title: "💎 Hujan Intan di Neptunus & Uranus",
    category: "RAKSASA ES",
    desc: "Di planet Neptunus dan Uranus, tekanan atmosfer yang luar biasa tinggi mengubah gas metana menjadi kristal intan murni yang menghujani lautan mantel es planet tersebut.",
    highlight: "Tekanan atmosfer ekstrem mengkristalkan karbon menjadi intan murni."
  },
  {
    title: "⏳ Satu Hari Venus Lebih Panjang Dari Tahunnya",
    category: "ROTASI UNIK",
    desc: "Venus membutuhkan waktu 243 hari Bumi untuk sekali berotasi pada porosnya, namun hanya 225 hari Bumi untuk sekali mengelilingi Matahari. Ini berarti 1 hari di Venus lebih lama dari 1 tahunnya!",
    highlight: "Rotasi terlembab di Tata Surya: 243 hari Bumi."
  },
  {
    title: "🌋 Olympus Mons: Gunung Raksasa Mars",
    category: "GEOFISIKA",
    desc: "Gunung Olympus Mons di Mars adalah gunung tertinggi di seluruh Tata Surya. Tingginya mencapai 21,9 km—lebih dari 2.5 kali lipat tinggi Gunung Everest di Bumi!",
    highlight: "Tinggi 21,9 km dengan puncaknya menembus atmosfer tipis Mars."
  },
  {
    title: "🌊 Samudra Cair Tersembunyi di Europa",
    category: "SATELIT ES",
    desc: "Satelit Europa milik Jupiter memiliki samudra cair raksasa di bawah kerak es tebalnya, dengan volume air diperkirakan mencapai 2 kali lipat seluruh air di Bumi.",
    highlight: "Target utama pencarian potensi kehidupan mikroba luar Bumi."
  },
  {
    title: "🌧️ Titan Memiliki Hujan & Sungai Metana",
    category: "ATMOSFER UNIK",
    desc: "Bulan Titan milik Saturnus memiliki atmosfer tebal dan danau cair. Uniknya, bukannya air hujan biasa, yang hujan dan mengalir di sungai-sungai Titan adalah metana dan etana cair!",
    highlight: "Satu-satunya bulan dengan siklus cuaca cairan hidrokarbon."
  },
  {
    title: "👣 Jejak Kaki di Bulan Bertahan 100 Juta Tahun",
    category: "EKSPLORASI",
    desc: "Jejak kaki astronot Apollo di Bulan tidak akan terhapus karena Bulan tidak memiliki atmosfer, angin, atau erosi air. Jejak tersebut diprediksi bertahan hingga jutaan tahun.",
    highlight: "Abadi tanpa erosi angin atau air laut."
  },
  {
    title: "🧲 Ganymede Punya Medan Magnet Sendiri",
    category: "MAGNETOSFER",
    desc: "Ganymede—bulan terbesar di Tata Surya—adalah satu-satunya satelit alami yang diketahui memiliki medan magnetnya sendiri dari gerak inti besi cair di dalamnya.",
    highlight: "Satu-satunya bulan yang dilindungi aura medan magnetik."
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Angin terkencang di Tata Surya (mencapai 2.100 km/jam) ditemukan di planet mana?",
    options: ["Jupiter", "Neptunus", "Mars", "Venus"],
    correctIndex: 1,
    explanation: "Neptunus memiliki angin supersonik terkencang di Tata Surya yang terdorong oleh aliran panas internal inti planet."
  },
  {
    id: 2,
    question: "Satelit alami manakah yang diketahui memiliki medan magnetnya sendiri?",
    options: ["Bulan (Luna)", "Titan", "Ganymede", "Europa"],
    correctIndex: 2,
    explanation: "Ganymede (satelit terbesar Jupiter) memiliki inti besi cair yang menghasilkan medan magnetnya sendiri."
  },
  {
    id: 3,
    question: "Planet manakah yang berotasi secara retrograd (berlawanan arah) dibanding mayoritas planet lain?",
    options: ["Merkurius", "Venus", "Uranus", "Mars"],
    correctIndex: 1,
    explanation: "Venus berotasi dari timur ke barat (retrograd), diduga akibat benturan raksasa dengan objek astronomi di masa purba."
  },
  {
    id: 4,
    question: "Di manakah letak keberadaan planet kerdil Ceres?",
    options: ["Sabuk Kuiper", "Sabuk Asteroid", "Awan Oort", "Orbit Neptunus"],
    correctIndex: 1,
    explanation: "Ceres adalah objek terbesar di Sabuk Asteroid yang melayang di antara orbit Mars dan Jupiter."
  }
];

export default function SpaceTriviaQuizSection() {
  const [activeTab, setActiveTab] = useState('fact');
  
  // Fact state
  const [factIndex, setFactIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const handleNextFact = () => {
    setIsRotating(true);
    setTimeout(() => {
      setFactIndex((prev) => (prev + 1) % SPACE_FACTS.length);
      setIsRotating(false);
    }, 200);
  };

  const handleSelectQuizOption = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === QUIZ_QUESTIONS[quizIndex].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  const currentFact = SPACE_FACTS[factIndex];
  const currentQuiz = QUIZ_QUESTIONS[quizIndex];

  return (
    <section className="py-16 px-4 md:px-10 max-w-[1280px] mx-auto" id="wawasan-kuis">
      <div className="bg-[#0F1226]/90 border border-[#22D3EE]/40 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(34,211,238,0.15)] relative overflow-hidden backdrop-blur-md">
        
        {/* Glow background accent */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#80DEEA]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Tab Header Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6 relative z-10">
          <div>
            <span className="text-[11px] font-semibold tracking-widest text-[#22D3EE] uppercase font-['Geist'] bg-[#22D3EE]/10 px-3 py-1 rounded-full border border-[#22D3EE]/30">
              Pusat Wawasan & Interaktif
            </span>
            <h2 className="font-['Sora'] text-2xl md:text-3xl font-bold text-white mt-2">
              Jelajahi Misteri Luar Angkasa
            </h2>
          </div>

          {/* Dual Tab Switcher */}
          <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-full border border-white/15 self-stretch sm:self-auto">
            <button
              onClick={() => setActiveTab('fact')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-full text-xs font-bold font-['Geist'] transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'fact'
                  ? 'bg-[#22D3EE] text-[#001f25] shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fakta Kosmik</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-full text-xs font-bold font-['Geist'] transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'quiz'
                  ? 'bg-[#22D3EE] text-[#001f25] shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Kuis Astronomi</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FAKTA KOSMIK ACAK */}
        {activeTab === 'fact' && (
          <div className="relative z-10 transition-all duration-300">
            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 relative">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-semibold text-[#22D3EE] uppercase tracking-wider font-['Geist'] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> {currentFact.category}
                </span>
                <span className="text-xs text-white/50 font-['Geist'] font-medium">
                  Fakta #{factIndex + 1} dari {SPACE_FACTS.length}
                </span>
              </div>

              <h3 className="font-['Sora'] text-xl md:text-2xl font-bold text-white mb-3">
                {currentFact.title}
              </h3>

              <p className="font-['Hanken_Grotesk'] text-sm md:text-base text-[#c8cee6] leading-relaxed mb-6">
                {currentFact.desc}
              </p>

              <div className="bg-[#22D3EE]/10 border border-[#22D3EE]/30 rounded-xl p-4 mb-6 text-xs md:text-sm text-[#22D3EE] font-['Hanken_Grotesk'] font-medium">
                💡 <strong>Intisari:</strong> {currentFact.highlight}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextFact}
                  className="bg-[#22D3EE] text-[#001f25] px-5 py-2.5 rounded-xl text-xs font-bold font-['Geist'] hover:bg-[#22D3EE]/90 transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-95"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                  <span>Acak Fakta Baru</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KUIS ASTRONOMI KILAT */}
        {activeTab === 'quiz' && (
          <div className="relative z-10 transition-all duration-300">
            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-semibold text-[#22D3EE] uppercase tracking-wider font-['Geist']">
                  Pertanyaan #{quizIndex + 1} dari {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs text-[#22D3EE] bg-[#22D3EE]/10 px-3 py-1 rounded-full border border-[#22D3EE]/30 font-['Geist'] font-semibold">
                  Skor Benar: {score}
                </span>
              </div>

              <h3 className="font-['Sora'] text-lg md:text-xl font-bold text-white mb-6">
                {currentQuiz.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentQuiz.options.map((option, idx) => {
                  let btnStyle = "bg-white/5 border-white/15 text-white hover:bg-white/10";
                  let IconComponent = null;

                  if (isAnswered) {
                    if (idx === currentQuiz.correctIndex) {
                      btnStyle = "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]";
                      IconComponent = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
                    } else if (idx === selectedOption) {
                      btnStyle = "bg-rose-500/20 border-rose-400 text-rose-300 font-bold";
                      IconComponent = <XCircle className="w-4 h-4 text-rose-400" />;
                    } else {
                      btnStyle = "bg-white/5 border-white/5 text-white/40 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={isAnswered}
                      className={`p-4 rounded-xl text-xs md:text-sm font-['Hanken_Grotesk'] text-left border transition-all flex items-center justify-between gap-2 ${
                        isAnswered ? 'cursor-default' : 'cursor-pointer hover:border-[#22D3EE]/60'
                      } ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {IconComponent}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next button when answered */}
              {isAnswered && (
                <div className="bg-white/5 border border-white/15 rounded-xl p-4 mb-6 animate-fadeIn">
                  <p className="text-xs md:text-sm text-[#c8cee6] font-['Hanken_Grotesk']">
                    <strong>Penjelasan:</strong> {currentQuiz.explanation}
                  </p>
                </div>
              )}

              {isAnswered && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuizQuestion}
                    className="bg-[#22D3EE] text-[#001f25] px-6 py-2.5 rounded-xl text-xs font-bold font-['Geist'] hover:bg-[#22D3EE]/90 transition-colors cursor-pointer flex items-center gap-2 shadow-md"
                  >
                    <span>Pertanyaan Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
