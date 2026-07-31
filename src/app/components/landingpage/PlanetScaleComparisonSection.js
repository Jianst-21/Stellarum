'use client';

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArrowLeftRight, Info, Sparkles, Scale, ChevronDown, RotateCw, ArrowUpDown, HelpCircle, CheckCircle2, XCircle, RefreshCw, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';

const CELESTIAL_BODIES = [
  { id: 'sun', name: 'Matahari', diameterKm: 1392700, distKm: 0, tempC: 5500, ratioToEarth: 109.2, color: 'from-amber-400 to-orange-600', shadow: 'shadow-orange-500/50', category: 'Bintang', description: '99.8% dari seluruh massa Tata Surya. Bisa memuat 1.300.000 planet Bumi di dalamnya.' },
  { id: 'jupiter', name: 'Jupiter', diameterKm: 139820, distKm: 778.6, tempC: -110, ratioToEarth: 11.0, color: 'from-amber-600 via-orange-400 to-amber-700', shadow: 'shadow-amber-500/40', category: 'Raksasa Gas', description: 'Planet terbesar. Bintik Merah Raksasa-nya saja lebih besar dari planet Bumi.' },
  { id: 'saturn', name: 'Saturnus', diameterKm: 116460, distKm: 1433.5, tempC: -140, ratioToEarth: 9.1, color: 'from-yellow-300 via-amber-400 to-yellow-600', shadow: 'shadow-yellow-500/40', category: 'Raksasa Gas', description: 'Terkenal dengan cincin es raksasa yang membentang hingga 282.000 km.' },
  { id: 'uranus', name: 'Uranus', diameterKm: 50724, distKm: 2872.5, tempC: -195, ratioToEarth: 4.0, color: 'from-cyan-300 to-teal-500', shadow: 'shadow-cyan-400/40', category: 'Raksasa Es', description: 'Planet paling dingin dengan rotasi menyamping (kemiringan sumbu 98 derajat).' },
  { id: 'neptune', name: 'Neptunus', diameterKm: 49244, distKm: 4495.1, tempC: -200, ratioToEarth: 3.9, color: 'from-blue-500 to-indigo-700', shadow: 'shadow-blue-600/40', category: 'Raksasa Es', description: 'Memiliki angin terkuat di Tata Surya, mencapai kecepatan 2.100 km/jam.' },
  { id: 'earth', name: 'Bumi', diameterKm: 12742, distKm: 149.6, tempC: 15, ratioToEarth: 1.0, color: 'from-cyan-400 via-blue-500 to-emerald-400', shadow: 'shadow-cyan-500/50', category: 'Planet Kebumian', description: 'Satu-satunya tempat di alam semesta yang diketahui memiliki kehidupan & air cair.' },
  { id: 'venus', name: 'Venus', diameterKm: 12104, distKm: 108.2, tempC: 465, ratioToEarth: 0.95, color: 'from-amber-200 to-yellow-500', shadow: 'shadow-amber-400/40', category: 'Planet Kebumian', description: 'Planet terpanas (465°C) akibat efek rumah kaca ekstrem dari atmosfer CO2 pekat.' },
  { id: 'mars', name: 'Mars', diameterKm: 6779, distKm: 227.9, tempC: -65, ratioToEarth: 0.53, color: 'from-red-500 to-orange-700', shadow: 'shadow-red-500/40', category: 'Planet Kebumian', description: 'Planet Merah berdebu besi oksida. Memiliki Gunung Olympus, gunung tertinggi di Tata Surya.' },
  { id: 'mercury', name: 'Merkurius', diameterKm: 4879, distKm: 57.9, tempC: 167, ratioToEarth: 0.38, color: 'from-slate-400 to-gray-600', shadow: 'shadow-slate-400/40', category: 'Planet Kebumian', description: 'Planet terkecil dan terdekat ke Matahari. Tidak memiliki atmosfer penyimpan panas.' },
  { id: 'moon', name: 'Bulan', diameterKm: 3474, distKm: 149.6, tempC: -20, ratioToEarth: 0.27, color: 'from-gray-200 to-slate-400', shadow: 'shadow-gray-300/40', category: 'Satelit Alami', description: 'Satelit alami tunggal Bumi. Tarikan gravitasinya menciptakan pasang surut air laut.' }
];

const PLANET_COLORS = {
  sun: 0xffaa00,
  jupiter: 0xdca675,
  saturn: 0xe3c88f,
  uranus: 0x80deea,
  neptune: 0x4f7ded,
  earth: 0x2b82c5,
  venus: 0xe6b86a,
  mars: 0xc05333,
  mercury: 0x8c8c88,
  moon: 0x9e9e9e,
};

// Global Texture Cache for high performance (prevents re-downloading)
const globalTextureLoader = new THREE.TextureLoader();
const textureMapCache = new Map();

function getCachedTexture(id, callback) {
  if (textureMapCache.has(id)) {
    callback(textureMapCache.get(id));
    return;
  }
  const texturePath = `/textures/planets/${id}.jpg`;
  globalTextureLoader.load(
    texturePath,
    (tex) => {
      textureMapCache.set(id, tex);
      callback(tex);
    },
    undefined,
    () => {}
  );
}

// Helper for Perceptual Logarithmic 3D Showcase Scaling
const getLogScalePx = (diameterKm, minPx = 65, maxPx = 135) => {
  const minLog = Math.log(3474);     // Moon
  const maxLog = Math.log(1392700);  // Sun
  const currentLog = Math.log(diameterKm);
  const ratio = (currentLog - minLog) / (maxLog - minLog);
  return Math.round(minPx + ratio * (maxPx - minPx));
};

// Lightweight 3D Sphere Renderer with NASA texture and thorough WebGL cleanup
function PlanetSphere3D({ id, sizePx }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = sizePx;
    const height = sizePx;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    // Camera z position: 4.6 for Saturn to give its 3D rings generous margins on all sides without clipping
    camera.position.z = id === 'saturn' ? 4.6 : 2.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, id === 'sun' ? 2.5 : 1.8);
    scene.add(ambient);

    if (id !== 'sun') {
      const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
      keyLight.position.set(5, 3, 5);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
      fillLight.position.set(-5, -3, -5);
      scene.add(fillLight);
    }

    // Geometry (32x32 for high FPS performance)
    const geo = new THREE.SphereGeometry(1, 32, 32);
    const baseColor = PLANET_COLORS[id] || 0xcccccc;

    let material;
    if (id === 'sun') {
      material = new THREE.MeshBasicMaterial({ color: baseColor });
    } else {
      material = new THREE.MeshPhongMaterial({
        color: baseColor,
        shininess: 15,
      });
    }

    const mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);

    // Apply Cached Texture
    getCachedTexture(id, (loadedTex) => {
      material.map = loadedTex;
      material.needsUpdate = true;
    });

    // Background 3D starfield particles inside sphere scene (matching Tata Surya 3D atmosphere)
    const bgStarGeo = new THREE.BufferGeometry();
    const bgStarCount = 45;
    const bgStarPos = new Float32Array(bgStarCount * 3);
    for (let i = 0; i < bgStarCount; i++) {
      const r = 5 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      bgStarPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      bgStarPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      bgStarPos[i * 3 + 2] = r * Math.cos(phi);
    }
    bgStarGeo.setAttribute('position', new THREE.BufferAttribute(bgStarPos, 3));
    const bgStarMat = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 1.1,
      transparent: true,
      opacity: 0.75,
    });
    const bgStarsMesh = new THREE.Points(bgStarGeo, bgStarMat);
    scene.add(bgStarsMesh);

    let saturnRingMesh = null;
    if (id === 'saturn') {
      const ringGeo = new THREE.RingGeometry(1.2, 1.85, 64);
      // Radial UV Mapping Fix so saturnring.jpg renders concentric ring bands
      const pos = ringGeo.attributes.position;
      const uvs = ringGeo.attributes.uv;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        const r = Math.sqrt(vx * vx + vy * vy);
        const u = (r - 1.2) / (1.85 - 1.2);
        uvs.setXY(i, u, 0.5);
      }
      uvs.needsUpdate = true;

      const ringMat = new THREE.MeshBasicMaterial({
        map: globalTextureLoader.load('/textures/planets/saturnring.jpg'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.90,
      });
      saturnRingMesh = new THREE.Mesh(ringGeo, ringMat);
      saturnRingMesh.rotation.x = Math.PI / 2.3;
      scene.add(saturnRingMesh);
    }

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      mesh.rotation.y += 0.008;
      if (saturnRingMesh) saturnRingMesh.rotation.z += 0.003;
      if (bgStarsMesh) bgStarsMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.forceContextLoss();
      renderer.dispose();
      geo.dispose();
      material.dispose();
      bgStarGeo.dispose();
      bgStarMat.dispose();
      scene.clear();
    };
  }, [id, sizePx]);

  return (
    <div
      ref={containerRef}
      style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
      className="flex items-center justify-center transition-all duration-700 ease-out cursor-grab active:cursor-grabbing hover:scale-105"
    />
  );
}

export default function PlanetScaleComparisonSection() {
  const [activeTab, setActiveTab] = useState('compare'); // 'compare' | 'lineup' | 'quiz'

  // 1-on-1 Compare State
  const [leftId, setLeftId] = useState('jupiter');
  const [rightId, setRightId] = useState('earth');

  // Sorting Lineup State
  const [sortCriteria, setSortCriteria] = useState('diameterDesc');

  // Sorting Quiz State
  const [userOrder, setUserOrder] = useState([]);
  const [quizChecked, setQuizChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);

  const generateQuiz = () => {
    const shuffled = [...CELESTIAL_BODIES].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    setUserOrder([...selected].sort(() => 0.5 - Math.random()));
    setQuizChecked(false);
    setIsCorrect(false);
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  const moveQuizItem = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= userOrder.length) return;
    const newArr = [...userOrder];
    const [moved] = newArr.splice(fromIdx, 1);
    newArr.splice(toIdx, 0, moved);
    setUserOrder(newArr);
    setQuizChecked(false);
  };

  const checkQuizAnswer = () => {
    let correct = true;
    for (let i = 0; i < userOrder.length - 1; i++) {
      if (userOrder[i].diameterKm < userOrder[i + 1].diameterKm) {
        correct = false;
        break;
      }
    }
    setIsCorrect(correct);
    setQuizChecked(true);
    if (correct) setScoreCount((prev) => prev + 1);
  };

  const leftObj = CELESTIAL_BODIES.find((b) => b.id === leftId);
  const rightObj = CELESTIAL_BODIES.find((b) => b.id === rightId);
  const maxDiameter = Math.max(leftObj.diameterKm, rightObj.diameterKm);
  const leftPx = Math.max(40, Math.round((leftObj.diameterKm / maxDiameter) * 210));
  const rightPx = Math.max(40, Math.round((rightObj.diameterKm / maxDiameter) * 210));
  const timesLarger = (leftObj.diameterKm / rightObj.diameterKm).toFixed(1);
  const isLeftLarger = leftObj.diameterKm >= rightObj.diameterKm;

  const getSortedLineup = () => {
    const list = [...CELESTIAL_BODIES];
    if (sortCriteria === 'diameterDesc') return list.sort((a, b) => b.diameterKm - a.diameterKm);
    if (sortCriteria === 'distAsc') return list.sort((a, b) => a.distKm - b.distKm);
    if (sortCriteria === 'tempDesc') return list.sort((a, b) => b.tempC - a.tempC);
    return list;
  };

  const sortedBodies = getSortedLineup();

  // Pagination logic for 3D Lineup Showcase (4 items per page)
  const [lineupPageIndex, setLineupPageIndex] = useState(0);
  const itemsPerPage = 4;
  const totalLineupPages = Math.ceil(sortedBodies.length / itemsPerPage);

  const prevLineupPage = () => {
    setLineupPageIndex((prev) => (prev > 0 ? prev - 1 : totalLineupPages - 1));
  };

  const nextLineupPage = () => {
    setLineupPageIndex((prev) => (prev < totalLineupPages - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    setLineupPageIndex(0);
  }, [sortCriteria]);

  const currentVisibleBodies = sortedBodies.slice(
    lineupPageIndex * itemsPerPage,
    (lineupPageIndex + 1) * itemsPerPage
  );

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4 backdrop-blur-md">
          <Scale className="w-4 h-4" />
          <span>Laboratorium Skala & Quiz 3D</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400 mb-4">
          Eksplorasi Skala & Game Urutan Kosmik
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Bandingkan ukuran planet secara 3D, urutkan barisan kosmik, dan uji pengetahuanmu dalam mini-game tantangan urutan planet.
        </p>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setActiveTab('compare')}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg ${
            activeTab === 'compare'
              ? 'bg-cyan-600 text-white shadow-cyan-600/30 border border-cyan-400'
              : 'bg-slate-900/80 text-gray-400 hover:text-white border border-slate-800'
          }`}
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span>Perbandingan 1-vs-1 3D</span>
        </button>

        <button
          onClick={() => setActiveTab('lineup')}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg ${
            activeTab === 'lineup'
              ? 'bg-purple-600 text-white shadow-purple-600/30 border border-purple-400'
              : 'bg-slate-900/80 text-gray-400 hover:text-white border border-slate-800'
          }`}
        >
          <ArrowUpDown className="w-4 h-4" />
          <span>Barisan Skala & Sorting 3D</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg relative ${
            activeTab === 'quiz'
              ? 'bg-amber-600 text-white shadow-amber-600/30 border border-amber-400'
              : 'bg-slate-900/80 text-gray-400 hover:text-white border border-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-300 animate-bounce" />
          <span>Tantangan Quiz Urutan 3D</span>
          {scoreCount > 0 && (
            <span className="ml-1 bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full">
              {scoreCount} Win
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: 1-VS-1 COMPARE */}
      {activeTab === 'compare' && (
        <div className="bg-[#05060f] border border-cyan-500/30 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(34,211,238,0.12)] relative overflow-hidden animate-fadeIn">
          {/* Subtle grid pattern background like Solar System Card */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative z-10">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Objek Pertama (Kiri)
              </label>
              <div className="relative">
                <select
                  value={leftId}
                  onChange={(e) => setLeftId(e.target.value)}
                  className="w-full appearance-none bg-[#03040a] border border-cyan-500/40 hover:border-cyan-400 rounded-xl px-4 py-3 pr-10 text-white font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-pointer shadow-lg"
                >
                  {CELESTIAL_BODIES.map((b) => (
                    <option key={b.id} value={b.id} className="bg-slate-900 text-white py-1">
                      {b.name} ({b.diameterKm.toLocaleString('id-ID')} km)
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-purple-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
                Objek Kedua (Kanan)
              </label>
              <div className="relative">
                <select
                  value={rightId}
                  onChange={(e) => setRightId(e.target.value)}
                  className="w-full appearance-none bg-[#03040a] border border-purple-500/40 hover:border-purple-400 rounded-xl px-4 py-3 pr-10 text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all cursor-pointer shadow-lg"
                >
                  {CELESTIAL_BODIES.map((b) => (
                    <option key={b.id} value={b.id} className="bg-slate-900 text-white py-1">
                      {b.name} ({b.diameterKm.toLocaleString('id-ID')} km)
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="bg-[#03040a] border border-cyan-500/40 rounded-2xl p-6 md:p-12 mb-8 flex flex-col md:flex-row items-center justify-around gap-8 min-h-[360px] relative overflow-hidden shadow-2xl">
            <div className="flex flex-col items-center justify-center flex-1 text-center group z-10">
              <div className="h-60 flex items-center justify-center relative w-full">
                <PlanetSphere3D id={leftObj.id} sizePx={leftPx} />
              </div>
              <div className="mt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                  {leftObj.category}
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 flex items-center justify-center gap-2">
                  {leftObj.name}
                  <RotateCw className="w-4 h-4 text-cyan-400 animate-spin-slow opacity-60" />
                </h3>
                <p className="text-sm text-gray-400 mt-1">Diameter: <strong className="text-white">{leftObj.diameterKm.toLocaleString('id-ID')} km</strong></p>
                <p className="text-xs text-gray-500 mt-0.5">{leftObj.ratioToEarth}× Ukuran Bumi</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center z-10">
              <div className="w-12 h-12 rounded-full bg-[#05060f] border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold shadow-lg my-2">
                <ArrowLeftRight className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="bg-[#05060f] border border-cyan-500/40 rounded-xl px-4 py-2 text-center backdrop-blur-md shadow-xl max-w-[200px]">
                <span className="text-xs text-gray-400 block">Rasio Ukuran</span>
                <span className="text-lg font-extrabold text-cyan-300">{timesLarger}×</span>
                <span className="text-[11px] text-gray-400 block mt-0.5">
                  {isLeftLarger ? `${leftObj.name} > ${rightObj.name}` : `${rightObj.name} > ${leftObj.name}`}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 text-center group z-10">
              <div className="h-60 flex items-center justify-center relative w-full">
                <PlanetSphere3D id={rightObj.id} sizePx={rightPx} />
              </div>
              <div className="mt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
                  {rightObj.category}
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 flex items-center justify-center gap-2">
                  {rightObj.name}
                  <RotateCw className="w-4 h-4 text-purple-400 animate-spin-slow opacity-60" />
                </h3>
                <p className="text-sm text-gray-400 mt-1">Diameter: <strong className="text-white">{rightObj.diameterKm.toLocaleString('id-ID')} km</strong></p>
                <p className="text-xs text-gray-500 mt-0.5">{rightObj.ratioToEarth}× Ukuran Bumi</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div className="bg-[#03040a] border border-cyan-500/30 rounded-2xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">{leftObj.name}</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{leftObj.description}</p>
              </div>
            </div>
            <div className="bg-[#03040a] border border-purple-500/30 rounded-2xl p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">{rightObj.name}</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{rightObj.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LINEUP & SORTING 3D */}
      {activeTab === 'lineup' && (
        <div className="bg-[#05060f] border border-purple-500/30 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(168,85,247,0.12)] relative overflow-hidden animate-fadeIn">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-purple-900/40 relative z-10">
            <div>
              <h3 className="text-xl font-bold text-white">Barisan Benda Kosmik 3D</h3>
              <p className="text-xs text-gray-400 mt-0.5">Menampilkan 4 objek per halaman. Gunakan tombol panah untuk menggeser.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">Urutkan:</span>
                <div className="relative">
                  <select
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                    className="appearance-none bg-[#03040a] border border-purple-500/40 hover:border-purple-400 rounded-xl px-3.5 py-2 pr-9 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all cursor-pointer shadow-md"
                  >
                    <option value="diameterDesc">Ukuran Diameter (Terbesar ke Terkecil)</option>
                    <option value="distAsc">Jarak dari Matahari (Terdekat ke Terjauh)</option>
                    <option value="tempDesc">Suhu Rata-Rata (Terpanas ke Terdingin)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-[#03040a] p-1.5 rounded-xl border border-purple-500/30 shadow-md">
                <button
                  onClick={prevLineupPage}
                  className="p-1.5 rounded-lg hover:bg-purple-600/80 text-gray-300 hover:text-white transition-all active:scale-95"
                  title="Halaman Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold px-2 text-purple-300">
                  {lineupPageIndex + 1} / {totalLineupPages}
                </span>
                <button
                  onClick={nextLineupPage}
                  className="p-1.5 rounded-lg hover:bg-purple-600/80 text-gray-300 hover:text-white transition-all active:scale-95"
                  title="Halaman Selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-h-[320px] items-stretch relative z-10">
            {currentVisibleBodies.map((b, idxInPage) => {
              const globalRank = lineupPageIndex * itemsPerPage + idxInPage + 1;
              const px = getLogScalePx(b.diameterKm, 70, 135);
              return (
                <div
                  key={b.id}
                  className="flex flex-col items-center justify-between bg-[#03040a] border border-purple-500/30 hover:border-purple-400 rounded-2xl p-5 shadow-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all group relative"
                >
                  <span className="text-[10px] font-black tracking-widest text-purple-400 bg-purple-950/60 px-3 py-0.5 rounded-full border border-purple-500/30 mb-2 shadow-md">
                    #{globalRank}
                  </span>
                  <div className="h-44 flex items-center justify-center w-full my-auto">
                    <PlanetSphere3D id={b.id} sizePx={px} />
                  </div>
                  <div className="text-center mt-3">
                    <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">{b.name}</h4>
                    <p className="text-xs text-purple-400 font-semibold mt-1">
                      {sortCriteria === 'diameterDesc' && `${b.diameterKm.toLocaleString('id-ID')} km`}
                      {sortCriteria === 'distAsc' && (b.distKm === 0 ? 'Pusat' : `${b.distKm} jt km`)}
                      {sortCriteria === 'tempDesc' && `${b.tempC}°C`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: MINI QUIZ SORTING */}
      {activeTab === 'quiz' && (
        <div className="bg-[#05060f] border border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(245,158,11,0.12)] relative overflow-hidden animate-fadeIn">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Mini-Game Tantangan Urutan
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
              Urutkan dari Terbesar ke Terkecil!
            </h3>
            <p className="text-gray-400 text-xs md:text-sm mt-1">
              Gunakan tombol panah Kiri / Kanan pada tiap kartu untuk menyusun 4 benda langit 3D di bawah ini dari yang paling besar hingga paling kecil.
            </p>
          </div>

          {/* Quiz Cards Lineup */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 relative z-10">
            {userOrder.map((item, idx) => (
              <div
                key={item.id}
                className="bg-[#03040a] border border-amber-500/30 hover:border-amber-400 rounded-2xl p-4 flex flex-col items-center relative group hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all"
              >
                <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-xs flex items-center justify-center">
                  #{idx + 1}
                </div>

                {/* Move Controls */}
                <div className="absolute top-3 right-3 flex gap-1">
                  <button
                    onClick={() => moveQuizItem(idx, idx - 1)}
                    disabled={idx === 0}
                    className="w-7 h-7 rounded-lg bg-[#05060f] border border-amber-500/30 text-gray-300 disabled:opacity-30 hover:bg-amber-600 hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                    title="Geser Kiri"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveQuizItem(idx, idx + 1)}
                    disabled={idx === userOrder.length - 1}
                    className="w-7 h-7 rounded-lg bg-[#05060f] border border-amber-500/30 text-gray-300 disabled:opacity-30 hover:bg-amber-600 hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                    title="Geser Kanan"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="h-36 flex items-center justify-center mt-6 w-full">
                  <PlanetSphere3D id={item.id} sizePx={90} />
                </div>

                <h4 className="text-base font-bold text-white mt-2">{item.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>

                {quizChecked && (
                  <span className="text-xs font-semibold text-amber-300 mt-2 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-500/30">
                    {item.diameterKm.toLocaleString('id-ID')} km
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-amber-900/40 pt-6 relative z-10">
            {!quizChecked ? (
              <button
                onClick={checkQuizAnswer}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm shadow-xl shadow-orange-600/30 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Cek Jawaban Saya</span>
              </button>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className={`flex items-center gap-2 px-6 py-3 rounded-2xl border text-sm font-bold shadow-xl ${
                  isCorrect
                    ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300'
                    : 'bg-rose-950/90 border-rose-500/50 text-rose-300'
                }`}>
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Hebat! Urutanmu Benar Presisi dari Terbesar ke Terkecil!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span>Belum Tepat! Perhatikan Angka Diameter di Setiap Kartu.</span>
                    </>
                  )}
                </div>

                <button
                  onClick={generateQuiz}
                  className="px-6 py-2.5 rounded-xl bg-[#03040a] border border-amber-500/40 hover:border-amber-400 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg"
                >
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <span>Mainkan Ronde Baru (Acak Planet)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
