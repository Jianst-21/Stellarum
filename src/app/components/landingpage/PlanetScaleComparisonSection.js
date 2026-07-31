'use client';

import { useState } from 'react';
import { ArrowLeftRight, Info, Sparkles, Scale } from 'lucide-react';

const CELESTIAL_BODIES = [
  { id: 'sun', name: 'Matahari', diameterKm: 1392700, ratioToEarth: 109.2, color: 'from-amber-400 to-orange-600', shadow: 'shadow-orange-500/50', category: 'Bintang', description: '99.8% dari seluruh massa Tata Surya. Bisa memuat 1.300.000 planet Bumi di dalamnya.' },
  { id: 'jupiter', name: 'Jupiter', diameterKm: 139820, ratioToEarth: 11.0, color: 'from-amber-600 via-orange-400 to-amber-700', shadow: 'shadow-amber-500/40', category: 'Raksasa Gas', description: 'Planet terbesar. Bintik Merah Raksasa-nya saja lebih besar dari planet Bumi.' },
  { id: 'saturn', name: 'Saturnus', diameterKm: 116460, ratioToEarth: 9.1, color: 'from-yellow-300 via-amber-400 to-yellow-600', shadow: 'shadow-yellow-500/40', category: 'Raksasa Gas', description: 'Terkenal dengan cincin es raksasa yang membentang hingga 282.000 km.' },
  { id: 'uranus', name: 'Uranus', diameterKm: 50724, ratioToEarth: 4.0, color: 'from-cyan-300 to-teal-500', shadow: 'shadow-cyan-400/40', category: 'Raksasa Es', description: 'Planet paling dingin dengan rotasi menyamping (kemiringan sumbu 98 derajat).' },
  { id: 'neptune', name: 'Neptunus', diameterKm: 49244, ratioToEarth: 3.9, color: 'from-blue-500 to-indigo-700', shadow: 'shadow-blue-600/40', category: 'Raksasa Es', description: 'Memiliki angin terkuat di Tata Surya, mencapai kecepatan 2.100 km/jam.' },
  { id: 'earth', name: 'Bumi', diameterKm: 12742, ratioToEarth: 1.0, color: 'from-cyan-400 via-blue-500 to-emerald-400', shadow: 'shadow-cyan-500/50', category: 'Planet Kebumian', description: 'Satu-satunya tempat di alam semesta yang diketahui memiliki kehidupan & air cair.' },
  { id: 'venus', name: 'Venus', diameterKm: 12104, ratioToEarth: 0.95, color: 'from-amber-200 to-yellow-500', shadow: 'shadow-amber-400/40', category: 'Planet Kebumian', description: 'Planet terpanas (465°C) akibat efek rumah kaca ekstrem dari atmosfer CO2 pekat.' },
  { id: 'mars', name: 'Mars', diameterKm: 6779, ratioToEarth: 0.53, color: 'from-red-500 to-orange-700', shadow: 'shadow-red-500/40', category: 'Planet Kebumian', description: 'Planet Merah berdebu besi oksida. Memiliki Gunung Olympus, gunung tertinggi di Tata Surya.' },
  { id: 'mercury', name: 'Merkurius', diameterKm: 4879, ratioToEarth: 0.38, color: 'from-slate-400 to-gray-600', shadow: 'shadow-slate-400/40', category: 'Planet Kebumian', description: 'Planet terkecil dan terdekat ke Matahari. Tidak memiliki atmosfer penyimpan panas.' },
  { id: 'moon', name: 'Bulan', diameterKm: 3474, ratioToEarth: 0.27, color: 'from-gray-200 to-slate-400', shadow: 'shadow-gray-300/40', category: 'Satelit Alami', description: 'Satelit alami tunggal Bumi. Tarikan gravitasinya menciptakan pasang surut air laut.' }
];

export default function PlanetScaleComparisonSection() {
  const [leftId, setLeftId] = useState('jupiter');
  const [rightId, setRightId] = useState('earth');

  const leftObj = CELESTIAL_BODIES.find((b) => b.id === leftId);
  const rightObj = CELESTIAL_BODIES.find((b) => b.id === rightId);

  // Calculate relative sizes for display (max size capped at 220px)
  const maxDiameter = Math.max(leftObj.diameterKm, rightObj.diameterKm);
  const leftPx = Math.max(28, Math.round((leftObj.diameterKm / maxDiameter) * 200));
  const rightPx = Math.max(28, Math.round((rightObj.diameterKm / maxDiameter) * 200));

  const timesLarger = (leftObj.diameterKm / rightObj.diameterKm).toFixed(1);
  const isLeftLarger = leftObj.diameterKm >= rightObj.diameterKm;

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4 backdrop-blur-md">
          <Scale className="w-4 h-4" />
          <span>Alat Perbandingan Interaktif</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400 mb-4">
          Perbandingan Ukuran Skala Kosmik
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Pilih dua objek tata surya di bawah ini untuk melihat perbedaan diameter dan proporsi skalanya secara langsung!
        </p>
      </div>

      {/* Main Interactive Card */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow Accents */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Selection Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative z-10">
          {/* Left Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Objek Pertama (Kiri)
            </label>
            <select
              value={leftId}
              onChange={(e) => setLeftId(e.target.value)}
              className="bg-slate-950/80 border border-cyan-500/40 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
            >
              {CELESTIAL_BODIES.map((b) => (
                <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                  {b.name} ({b.diameterKm.toLocaleString('id-ID')} km)
                </option>
              ))}
            </select>
          </div>

          {/* Right Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-purple-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
              Objek Kedua (Kanan)
            </label>
            <select
              value={rightId}
              onChange={(e) => setRightId(e.target.value)}
              className="bg-slate-950/80 border border-purple-500/40 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-purple-400 transition-all cursor-pointer"
            >
              {CELESTIAL_BODIES.map((b) => (
                <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                  {b.name} ({b.diameterKm.toLocaleString('id-ID')} km)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Visual Side-by-Side Arena */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 md:p-12 mb-8 flex flex-col md:flex-row items-center justify-around gap-8 min-h-[340px] relative overflow-hidden">
          {/* Left Object Circle */}
          <div className="flex flex-col items-center justify-center flex-1 text-center group">
            <div className="h-56 flex items-center justify-center relative w-full">
              <div
                style={{ width: `${leftPx}px`, height: `${leftPx}px` }}
                className={`rounded-full bg-gradient-to-br ${leftObj.color} ${leftObj.shadow} shadow-2xl transition-all duration-700 ease-out flex items-center justify-center relative group-hover:scale-105`}
              >
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20">
                {leftObj.category}
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">{leftObj.name}</h3>
              <p className="text-sm text-gray-400 mt-1">Diameter: <strong className="text-white">{leftObj.diameterKm.toLocaleString('id-ID')} km</strong></p>
              <p className="text-xs text-gray-500 mt-0.5">{leftObj.ratioToEarth}× Ukuran Bumi</p>
            </div>
          </div>

          {/* VS / Ratio Badge */}
          <div className="flex flex-col items-center justify-center z-10">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-gray-300 font-bold shadow-lg my-2">
              <ArrowLeftRight className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl px-4 py-2 text-center backdrop-blur-md shadow-xl max-w-[200px]">
              <span className="text-xs text-gray-400 block">Rasio Ukuran</span>
              <span className="text-lg font-extrabold text-cyan-300">
                {timesLarger}×
              </span>
              <span className="text-[11px] text-gray-400 block mt-0.5">
                {isLeftLarger ? `${leftObj.name} > ${rightObj.name}` : `${rightObj.name} > ${leftObj.name}`}
              </span>
            </div>
          </div>

          {/* Right Object Circle */}
          <div className="flex flex-col items-center justify-center flex-1 text-center group">
            <div className="h-56 flex items-center justify-center relative w-full">
              <div
                style={{ width: `${rightPx}px`, height: `${rightPx}px` }}
                className={`rounded-full bg-gradient-to-br ${rightObj.color} ${rightObj.shadow} shadow-2xl transition-all duration-700 ease-out flex items-center justify-center relative group-hover:scale-105`}
              >
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/20">
                {rightObj.category}
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">{rightObj.name}</h3>
              <p className="text-sm text-gray-400 mt-1">Diameter: <strong className="text-white">{rightObj.diameterKm.toLocaleString('id-ID')} km</strong></p>
              <p className="text-xs text-gray-500 mt-0.5">{rightObj.ratioToEarth}× Ukuran Bumi</p>
            </div>
          </div>
        </div>

        {/* Fact Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">{leftObj.name}</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{leftObj.description}</p>
            </div>
          </div>
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">{rightObj.name}</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{rightObj.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
