'use client';

import { useState } from 'react';
import { Sparkles, BrainCircuit, RefreshCw, CheckCircle2, XCircle, ArrowRight, BookOpen, Lightbulb } from 'lucide-react';
import SPACE_FACTS from '@/app/data/spaceFacts.json';
import QUIZ_QUESTIONS from '@/app/data/quizQuestions.json';


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

        {/* Tab content — fixed height container to prevent layout shift */}
        <div className="relative z-10 min-h-[360px]">

          {/* TAB 1: FAKTA KOSMIK ACAK */}
          <div className={`transition-all duration-300 ${activeTab === 'fact' ? 'opacity-100 visible' : 'opacity-0 invisible absolute inset-0 pointer-events-none'}`}>
            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8">
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

              <div className="bg-[#22D3EE]/10 border border-[#22D3EE]/30 rounded-xl p-4 mb-6 text-xs md:text-sm text-[#22D3EE] font-['Hanken_Grotesk'] font-medium flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#22D3EE] shrink-0" />
                <span><strong>Intisari:</strong> {currentFact.highlight}</span>
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

          {/* TAB 2: KUIS ASTRONOMI KILAT */}
          <div className={`transition-all duration-300 ${activeTab === 'quiz' ? 'opacity-100 visible' : 'opacity-0 invisible absolute inset-0 pointer-events-none'}`}>
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

              {/* Explanation — always reserve space to avoid layout shift */}
              <div className={`bg-white/5 border border-white/15 rounded-xl p-4 mb-6 transition-all duration-300 ${isAnswered ? 'opacity-100 visible' : 'opacity-0 invisible h-0 p-0 mb-0 border-0'}`}>
                <p className="text-xs md:text-sm text-[#c8cee6] font-['Hanken_Grotesk']">
                  <strong>Penjelasan:</strong> {currentQuiz.explanation}
                </p>
              </div>

              <div className={`flex justify-end transition-all duration-300 ${isAnswered ? 'opacity-100 visible' : 'opacity-0 invisible h-0 overflow-hidden'}`}>
                <button
                  onClick={handleNextQuizQuestion}
                  className="bg-[#22D3EE] text-[#001f25] px-6 py-2.5 rounded-xl text-xs font-bold font-['Geist'] hover:bg-[#22D3EE]/90 transition-colors cursor-pointer flex items-center gap-2 shadow-md"
                >
                  <span>Pertanyaan Berikutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
