'use client';

import { useState } from 'react';
import { RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import SPACE_FACTS from '@/app/data/spaceFacts.json';
import QUIZ_QUESTIONS from '@/app/data/quizQuestions.json';

export default function SpaceTriviaQuizSection() {
  const [activeTab, setActiveTab] = useState('fact');
  const [factIndex, setFactIndex] = useState(0);

  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const handleNextFact = () => {
    setFactIndex((prev) => (prev + 1) % SPACE_FACTS.length);
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
    <section
      id="wawasan-kuis"
      aria-labelledby="wawasan-heading"
      className="py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/10"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div className="max-w-xl">
          <h2
            id="wawasan-heading"
            className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-ink-primary leading-tight mb-2"
          >
            Catatan Ilmiah dan Kuis Astronomi
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed">
            Telusuri fenomena fisik di Tata Surya atau uji pengetahuan Anda lewat 15 pertanyaan singkat.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Pilih mode catatan atau kuis"
          className="inline-flex rounded-lg border border-white/15 bg-space-black/80 p-1 self-start sm:self-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'fact'}
            onClick={() => setActiveTab('fact')}
            className={`min-h-[40px] px-4 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'fact'
                ? 'bg-cyan-glow text-space-navy font-bold'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            Catatan Kosmik
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'quiz'}
            onClick={() => setActiveTab('quiz')}
            className={`min-h-[40px] px-4 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'quiz'
                ? 'bg-cyan-glow text-space-navy font-bold'
                : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            Kuis Astronomi
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/12 bg-space-abyss/80 p-6 sm:p-8">
        {activeTab === 'fact' ? (
          <div role="tabpanel" aria-label="Catatan Kosmik">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="font-mono text-xs text-amber-star">{currentFact.category}</span>
              <span className="font-mono text-xs text-ink-muted tabular-nums">
                {String(factIndex + 1).padStart(2, '0')} / {String(SPACE_FACTS.length).padStart(2, '0')}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink-primary mb-3">
              {currentFact.title}
            </h3>

            <p className="text-base text-ink-secondary leading-relaxed max-w-[65ch] mb-6">
              {currentFact.desc}
            </p>

            <div className="rounded-lg border border-cyan-glow/25 bg-space-black/65 p-4 mb-6 text-sm text-ink-primary">
              <span className="font-mono text-xs text-cyan-glow block mb-1">Ringkasan</span>
              {currentFact.highlight}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNextFact}
                className="min-h-[44px] px-5 rounded-lg bg-cyan-glow text-space-navy text-sm font-bold hover:bg-ink-primary transition-colors inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                <span>Catatan Berikutnya</span>
              </button>
            </div>
          </div>
        ) : (
          <div role="tabpanel" aria-label="Kuis Astronomi">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="font-mono text-xs text-ink-muted tabular-nums">
                Pertanyaan {quizIndex + 1} dari {QUIZ_QUESTIONS.length}
              </span>
              <span className="font-mono text-xs text-amber-star tabular-nums">
                Skor Benar: {score}
              </span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-primary mb-6 max-w-[60ch]">
              {currentQuiz.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {currentQuiz.options.map((option, idx) => {
                let stateClass =
                  'bg-space-black/70 border-white/15 text-ink-primary hover:border-cyan-glow/60';
                let statusIcon = null;

                if (isAnswered) {
                  if (idx === currentQuiz.correctIndex) {
                    stateClass = 'bg-cyan-glow/15 border-cyan-glow text-ink-primary font-semibold';
                    statusIcon = (
                      <CheckCircle2 className="w-4 h-4 text-cyan-glow shrink-0" aria-hidden="true" />
                    );
                  } else if (idx === selectedOption) {
                    stateClass = 'bg-amber-star/10 border-amber-star text-amber-star font-semibold';
                    statusIcon = (
                      <XCircle className="w-4 h-4 text-amber-star shrink-0" aria-hidden="true" />
                    );
                  } else {
                    stateClass = 'bg-space-black/40 border-white/10 text-ink-muted opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectQuizOption(idx)}
                    disabled={isAnswered}
                    className={`min-h-[48px] px-4 py-3 rounded-lg text-sm text-left border transition-colors flex items-center justify-between gap-3 ${stateClass}`}
                  >
                    <span>{option}</span>
                    {statusIcon}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div
                role="status"
                className="rounded-lg border border-white/12 bg-space-black/70 p-4 mb-6 text-sm text-ink-secondary leading-relaxed"
              >
                <strong className="text-ink-primary font-semibold">Penjelasan: </strong>
                {currentQuiz.explanation}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNextQuizQuestion}
                disabled={!isAnswered}
                className="min-h-[44px] px-5 rounded-lg bg-cyan-glow text-space-navy text-sm font-bold hover:bg-ink-primary disabled:opacity-40 transition-colors"
              >
                Pertanyaan Berikutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
