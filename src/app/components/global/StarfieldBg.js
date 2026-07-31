'use client';

import { useEffect, useState } from 'react';

export default function StarfieldBg() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // 24 total stars: mostly white (#ffffff), with a subtle touch of random cyan (#22d3ee)
    const generatedStars = Array.from({ length: 24 }).map((_, i) => {
      const isCyan = i % 5 === 0; // ~4-5 subtle cyan stars, rest white
      return {
        id: i,
        top: `${(Math.random() * 92 + 4).toFixed(2)}%`,
        left: `${(Math.random() * 92 + 4).toFixed(2)}%`,
        size: `${(1 + Math.random() * 1.5).toFixed(1)}px`,
        color: isCyan ? '#22d3ee' : '#ffffff',
        glow: isCyan ? '0 0 6px rgba(34, 211, 238, 0.7)' : '0 0 4px rgba(255, 255, 255, 0.6)',
        delay: `${(Math.random() * 6).toFixed(2)}s`,
        duration: `${(3.5 + Math.random() * 3.5).toFixed(2)}s`,
      };
    });
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden max-w-full bg-[#000000]">
      {/* 24 Minimalist Random Twinkling Stars (mostly white with subtle cyan accent) */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full animate-star-sparkle"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              backgroundColor: s.color,
              boxShadow: s.glow,
              opacity: 0.75,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>

      {/* Single Subtle Rare Shooting Star */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="shooting-star starfall-rare-single" />
      </div>
    </div>
  );
}
