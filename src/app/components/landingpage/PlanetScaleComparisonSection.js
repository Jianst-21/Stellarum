'use client';

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  ArrowLeftRight,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { SCALE_BODIES } from '@/app/data/solarObjects';

const sharedLoader = new THREE.TextureLoader();
const sharedTextureCache = new Map();

function getCachedTex(path, onLoad) {
  if (!path) return;
  if (sharedTextureCache.has(path)) {
    onLoad(sharedTextureCache.get(path));
    return;
  }
  sharedLoader.load(
    path,
    (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      sharedTextureCache.set(path, tex);
      onLoad(tex);
    },
    undefined,
    () => {}
  );
}

function buildBodyGroup(body, radius, disposables) {
  const group = new THREE.Group();
  const geo = new THREE.SphereGeometry(radius, 48, 48);
  const mat =
    body.id === 'sun'
      ? new THREE.MeshBasicMaterial({ color: body.colorHex })
      : new THREE.MeshStandardMaterial({
          color: body.colorHex,
          roughness: 0.85,
          metalness: 0.05,
        });
  disposables.push(geo, mat);
  const mesh = new THREE.Mesh(geo, mat);
  group.add(mesh);

  getCachedTex(body.texture, (tex) => {
    mat.map = tex;
    mat.color.setHex(0xffffff);
    mat.needsUpdate = true;
  });

  if (body.id === 'saturn') {
    const innerR = radius * 1.2;
    const outerR = radius * 1.85;
    const ringGeo = new THREE.RingGeometry(innerR, outerR, 72);
    const pos = ringGeo.attributes.position;
    const uvs = ringGeo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const r = Math.hypot(pos.getX(i), pos.getY(i));
      uvs.setXY(i, (r - innerR) / (outerR - innerR), 0.5);
    }
    uvs.needsUpdate = true;
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xe6d5b8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      roughness: 0.85,
    });
    disposables.push(ringGeo, ringMat);
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.25;
    group.add(ringMesh);

    getCachedTex('/textures/planets/saturnring.jpg', (tex) => {
      ringMat.map = tex;
      ringMat.needsUpdate = true;
    });
  }

  return { group, mesh };
}

/**
 * Renders both selected celestial bodies inside ONE single Three.js WebGL context
 * so proportional comparison is optically consistent and GPU-safe on mobile.
 *
 * Performance optimizations:
 * - Single WebGLRenderer context reused across all left/right body selections.
 * - Animation loop automatically pauses when off-screen or tab is backgrounded.
 */
function DualPlanetStage3D({ leftObj, rightObj }) {
  const mountRef = useRef(null);
  const stateRef = useRef(null);

  // Setup single WebGL canvas & scene once on mount
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const width = container.clientWidth || 720;
    const height = container.clientHeight || 320;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        stencil: false,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / Math.max(height, 1), 0.1, 100);
    camera.position.set(0, 0.25, 7.6);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xdbeafe, 0.75));
    const keyLight = new THREE.DirectionalLight(0xfff5e4, 2.2);
    keyLight.position.set(5, 4, 6);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x7cdee4, 0.55);
    fillLight.position.set(-5, -2, -4);
    scene.add(fillLight);

    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    let isVisible = true;
    let animId = 0;
    const clock = new THREE.Clock();
    let currentLeftMesh = null;
    let currentRightMesh = null;

    const renderFrame = () => {
      renderer.render(scene, camera);
    };

    const loop = () => {
      animId = window.requestAnimationFrame(loop);
      if (!isVisible || document.visibilityState === 'hidden') return;
      const dt = Math.min(clock.getDelta(), 0.05);
      if (currentLeftMesh) currentLeftMesh.rotation.y += dt * 0.22;
      if (currentRightMesh) currentRightMesh.rotation.y += dt * 0.22;
      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (animId || reducedMotion) return;
      clock.getDelta();
      animId = window.requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      if (animId) {
        window.cancelAnimationFrame(animId);
        animId = 0;
      }
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 720;
      const h = container.clientHeight || 320;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const nextSpread = w < 520 ? 1.55 : 2.35;
      if (stateRef.current?.leftBuilt) {
        stateRef.current.leftBuilt.group.position.x = -nextSpread;
      }
      if (stateRef.current?.rightBuilt) {
        stateRef.current.rightBuilt.group.position.x = nextSpread;
      }
      renderFrame();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              isVisible = entry.isIntersecting;
              if (isVisible && document.visibilityState !== 'hidden') {
                startLoop();
              } else {
                stopLoop();
              }
            },
            { threshold: 0.05 }
          )
        : null;
    if (observer) observer.observe(container);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopLoop();
      } else if (isVisible) {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    stateRef.current = {
      container,
      renderer,
      scene,
      camera,
      stageGroup,
      bodyDisposables: [],
      leftBuilt: null,
      rightBuilt: null,
      setMeshes: (l, r) => {
        currentLeftMesh = l;
        currentRightMesh = r;
      },
      renderFrame,
    };

    if (!reducedMotion) {
      startLoop();
    } else {
      renderFrame();
    }

    return () => {
      stopLoop();
      if (observer) observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      if (stateRef.current?.bodyDisposables) {
        stateRef.current.bodyDisposables.forEach((d) => d.dispose());
      }
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      stateRef.current = null;
    };
  }, []);

  // Update bodies without recreating WebGL context
  useEffect(() => {
    const s = stateRef.current;
    if (!s || !leftObj || !rightObj) return;

    const { container, stageGroup, bodyDisposables, setMeshes, renderFrame } = s;

    // Dispose previous bodies
    bodyDisposables.forEach((d) => d.dispose());
    bodyDisposables.length = 0;
    while (stageGroup.children.length > 0) {
      stageGroup.remove(stageGroup.children[0]);
    }

    const width = container.clientWidth || 720;
    const maxD = Math.max(leftObj.diameterKm, rightObj.diameterKm);
    const leftRatio = leftObj.diameterKm / maxD;
    const rightRatio = rightObj.diameterKm / maxD;

    // Clamped perceptual floor so small moons remain legible beside the Sun
    const maxRadius = 1.48;
    const leftRadius = Math.max(0.28, maxRadius * Math.pow(leftRatio, 0.58));
    const rightRadius = Math.max(0.28, maxRadius * Math.pow(rightRatio, 0.58));

    const leftBuilt = buildBodyGroup(leftObj, leftRadius, bodyDisposables);
    const rightBuilt = buildBodyGroup(rightObj, rightRadius, bodyDisposables);

    const spread = width < 520 ? 1.55 : 2.35;
    leftBuilt.group.position.set(-spread, 0, 0);
    rightBuilt.group.position.set(spread, 0, 0);

    stageGroup.add(leftBuilt.group);
    stageGroup.add(rightBuilt.group);

    s.leftBuilt = leftBuilt;
    s.rightBuilt = rightBuilt;
    setMeshes(leftBuilt.mesh, rightBuilt.mesh);

    renderFrame();
  }, [leftObj, rightObj]);

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label={`Perbandingan 3D ${leftObj.name} dan ${rightObj.name}`}
      className="w-full h-[240px] sm:h-[300px]"
    />
  );
}

export default function PlanetScaleComparisonSection() {
  const [activeTab, setActiveTab] = useState('compare');
  const [leftId, setLeftId] = useState('jupiter');
  const [rightId, setRightId] = useState('earth');
  const [sortCriteria, setSortCriteria] = useState('diameterDesc');

  const [userOrder, setUserOrder] = useState(() => [
    SCALE_BODIES[1],
    SCALE_BODIES[5],
    SCALE_BODIES[3],
    SCALE_BODIES[7],
  ]);
  const [quizChecked, setQuizChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);

  const generateQuiz = () => {
    const pool = [...SCALE_BODIES];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setUserOrder(pool.slice(0, 4));
    setQuizChecked(false);
    setIsCorrect(false);
  };

  const moveQuizItem = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= userOrder.length) return;
    const next = [...userOrder];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setUserOrder(next);
    setQuizChecked(false);
  };

  const checkQuizAnswer = () => {
    let ok = true;
    for (let i = 0; i < userOrder.length - 1; i++) {
      if (userOrder[i].diameterKm < userOrder[i + 1].diameterKm) {
        ok = false;
        break;
      }
    }
    setIsCorrect(ok);
    setQuizChecked(true);
    if (ok) setScoreCount((prev) => prev + 1);
  };

  const leftObj = SCALE_BODIES.find((b) => b.id === leftId) || SCALE_BODIES[1];
  const rightObj = SCALE_BODIES.find((b) => b.id === rightId) || SCALE_BODIES[5];
  const ratioValue = (
    Math.max(leftObj.diameterKm, rightObj.diameterKm) /
    Math.min(leftObj.diameterKm, rightObj.diameterKm)
  ).toFixed(1);
  const largerName =
    leftObj.diameterKm >= rightObj.diameterKm ? leftObj.name : rightObj.name;
  const smallerName =
    leftObj.diameterKm >= rightObj.diameterKm ? rightObj.name : leftObj.name;

  const sortedBodies = [...SCALE_BODIES].sort((a, b) => {
    if (sortCriteria === 'diameterDesc') return b.diameterKm - a.diameterKm;
    if (sortCriteria === 'distAsc') return a.distKm - b.distKm;
    return b.tempC - a.tempC;
  });

  const maxLog = Math.log(1392700);
  const minLog = Math.log(3474);
  const getBarWidth = (diameterKm) => {
    const pct = ((Math.log(diameterKm) - minLog) / (maxLog - minLog)) * 84 + 16;
    return `${Math.round(pct)}%`;
  };

  return (
    <section
      id="skala"
      aria-labelledby="skala-heading"
      className="py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/10"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <h2
            id="skala-heading"
            className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-ink-primary leading-tight mb-3"
          >
            Laboratorium Skala Tata Surya
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed">
            Bandingkan diameter dua benda langit secara 3D dalam satu panggung optik, urutkan berdasarkan parameter fisik, atau uji insting skala Anda.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Mode laboratorium skala"
          className="inline-flex flex-wrap gap-2"
        >
          {[
            { id: 'compare', label: 'Perbandingan 1-vs-1', icon: ArrowLeftRight },
            { id: 'lineup', label: 'Barisan Skala', icon: ArrowUpDown },
            { id: 'quiz', label: 'Uji Urutan', icon: CheckCircle2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[44px] px-4 rounded-lg text-sm font-medium border transition-colors inline-flex items-center gap-2 ${
                  active
                    ? 'bg-cyan-glow text-space-navy border-cyan-glow font-bold'
                    : 'bg-space-abyss/80 text-ink-secondary border-white/15 hover:border-cyan-glow/50 hover:text-ink-primary'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{tab.label}</span>
                {tab.id === 'quiz' && scoreCount > 0 && (
                  <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-space-navy/20 tabular-nums">
                    {scoreCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: Unified Single-Canvas 1-vs-1 3D Comparison */}
      {activeTab === 'compare' && (
        <div className="rounded-xl border border-white/12 bg-space-abyss/75 p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="scale-left-select"
                className="block font-mono text-xs text-ink-secondary mb-2"
              >
                Objek Kiri
              </label>
              <div className="relative">
                <select
                  id="scale-left-select"
                  value={leftId}
                  onChange={(e) => setLeftId(e.target.value)}
                  className="w-full min-h-[44px] bg-space-black/85 border border-cyan-glow/30 hover:border-cyan-glow rounded-lg px-4 py-2.5 text-sm text-ink-primary font-medium transition-colors"
                >
                  {SCALE_BODIES.map((b) => (
                    <option key={b.id} value={b.id} className="bg-space-abyss text-ink-primary">
                      {b.name} ({b.diameterKm.toLocaleString('id-ID')} km)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="scale-right-select"
                className="block font-mono text-xs text-ink-secondary mb-2"
              >
                Objek Kanan
              </label>
              <div className="relative">
                <select
                  id="scale-right-select"
                  value={rightId}
                  onChange={(e) => setRightId(e.target.value)}
                  className="w-full min-h-[44px] bg-space-black/85 border border-cyan-glow/30 hover:border-cyan-glow rounded-lg px-4 py-2.5 text-sm text-ink-primary font-medium transition-colors"
                >
                  {SCALE_BODIES.map((b) => (
                    <option key={b.id} value={b.id} className="bg-space-abyss text-ink-primary">
                      {b.name} ({b.diameterKm.toLocaleString('id-ID')} km)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-cyan-glow/20 bg-space-black/65 px-4 py-6 mb-6">
            <DualPlanetStage3D leftObj={leftObj} rightObj={rightObj} />

            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
              <div>
                <span className="font-mono text-xs text-ink-muted block">{leftObj.category}</span>
                <span className="font-display text-xl font-bold text-ink-primary block mt-0.5">
                  {leftObj.name}
                </span>
                <span className="font-mono text-xs text-cyan-glow tabular-nums">
                  {leftObj.diameterKm.toLocaleString('id-ID')} km ({leftObj.ratioToEarth}x Bumi)
                </span>
              </div>

              <div className="py-2 px-4 rounded-lg border border-white/12 bg-space-abyss/80">
                <span className="font-mono text-[11px] text-ink-muted block">Rasio Diameter</span>
                <span className="font-mono text-2xl font-bold text-amber-star tabular-nums">
                  {ratioValue}x
                </span>
                <span className="text-xs text-ink-secondary block mt-0.5">
                  {leftObj.id === rightObj.id
                    ? 'Ukuran identik'
                    : `${largerName} lebih lebar dari ${smallerName}`}
                </span>
              </div>

              <div>
                <span className="font-mono text-xs text-ink-muted block">{rightObj.category}</span>
                <span className="font-display text-xl font-bold text-ink-primary block mt-0.5">
                  {rightObj.name}
                </span>
                <span className="font-mono text-xs text-cyan-glow tabular-nums">
                  {rightObj.diameterKm.toLocaleString('id-ID')} km ({rightObj.ratioToEarth}x Bumi)
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-ink-secondary">
            <div className="border-t border-white/10 pt-4">
              <h3 className="font-display text-base font-bold text-ink-primary mb-1">
                {leftObj.name}
              </h3>
              <p className="leading-relaxed">{leftObj.description}</p>
            </div>
            <div className="border-t border-white/10 pt-4">
              <h3 className="font-display text-base font-bold text-ink-primary mb-1">
                {rightObj.name}
              </h3>
              <p className="leading-relaxed">{rightObj.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Scale Lineup (Zero extra WebGL contexts) */}
      {activeTab === 'lineup' && (
        <div className="rounded-xl border border-white/12 bg-space-abyss/75 p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
            <div>
              <h3 className="font-display text-xl font-bold text-ink-primary">
                Peringkat Benda Langit
              </h3>
              <p className="text-sm text-ink-secondary mt-1">
                Skala batang menggunakan perbandingan logaritmik diameter agar tetap terbaca dari Bulan hingga Matahari.
              </p>
            </div>

            <div className="relative shrink-0">
              <label htmlFor="lineup-sort" className="sr-only">
                Urutkan daftar benda langit
              </label>
              <select
                id="lineup-sort"
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
                className="min-h-[44px] bg-space-black/85 border border-cyan-glow/30 hover:border-cyan-glow rounded-lg px-4 py-2 text-xs sm:text-sm text-ink-primary font-medium"
              >
                <option value="diameterDesc" className="bg-space-abyss">
                  Diameter (Terbesar ke Terkecil)
                </option>
                <option value="distAsc" className="bg-space-abyss">
                  Jarak dari Matahari (Terdekat)
                </option>
                <option value="tempDesc" className="bg-space-abyss">
                  Suhu Permukaan (Terpanas)
                </option>
              </select>
            </div>
          </div>

          <ol className="divide-y divide-white/10">
            {sortedBodies.map((b, idx) => (
              <li
                key={b.id}
                className="py-3.5 grid grid-cols-12 gap-3 items-center"
              >
                <div className="col-span-5 sm:col-span-4 flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-ink-muted w-6 shrink-0 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <img
                    src={b.img}
                    alt={b.name}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover border border-white/15 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="font-display text-sm sm:text-base font-bold text-ink-primary block truncate">
                      {b.name}
                    </span>
                    <span className="text-xs text-ink-muted block truncate">{b.category}</span>
                  </div>
                </div>

                <div className="hidden sm:block sm:col-span-5">
                  <div className="h-2 w-full rounded-full bg-space-black/80 overflow-hidden border border-white/10">
                    <div
                      className="h-full rounded-full bg-cyan-glow/80"
                      style={{ width: getBarWidth(b.diameterKm) }}
                    />
                  </div>
                </div>

                <div className="col-span-7 sm:col-span-3 text-right font-mono text-xs sm:text-sm text-ink-primary tabular-nums">
                  {sortCriteria === 'diameterDesc' && `${b.diameterKm.toLocaleString('id-ID')} km`}
                  {sortCriteria === 'distAsc' &&
                    (b.distKm === 0 ? 'Pusat (0 km)' : `${b.distKm} jt km`)}
                  {sortCriteria === 'tempDesc' && `${b.tempC}°C`}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* TAB 3: Interactive Order Quiz */}
      {activeTab === 'quiz' && (
        <div className="rounded-xl border border-white/12 bg-space-abyss/75 p-5 sm:p-8">
          <div className="max-w-2xl mb-6">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-primary mb-2">
              Urutkan dari Diameter Terbesar ke Terkecil
            </h3>
            <p className="text-sm text-ink-secondary">
              Geser posisi keempat objek di bawah ini dari kiri (terbesar) ke kanan (terkecil), lalu periksa urutan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {userOrder.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-xl border border-white/15 bg-space-black/75 p-4 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-amber-star tabular-nums">
                    Posisi #{idx + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveQuizItem(idx, idx - 1)}
                      disabled={idx === 0}
                      aria-label={`Geser ${item.name} ke kiri`}
                      className="min-w-[40px] min-h-[40px] rounded-lg border border-white/15 bg-space-abyss text-ink-primary hover:border-cyan-glow disabled:opacity-35 inline-flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveQuizItem(idx, idx + 1)}
                      disabled={idx === userOrder.length - 1}
                      aria-label={`Geser ${item.name} ke kanan`}
                      className="min-w-[40px] min-h-[40px] rounded-lg border border-white/15 bg-space-abyss text-ink-primary hover:border-cyan-glow disabled:opacity-35 inline-flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center my-2">
                  <img
                    src={item.img}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 object-contain mb-3"
                  />
                  <h4 className="font-display text-lg font-bold text-ink-primary">
                    {item.name}
                  </h4>
                  <span className="text-xs text-ink-secondary">{item.category}</span>
                  {quizChecked && (
                    <span className="mt-2 font-mono text-xs text-cyan-glow tabular-nums">
                      {item.diameterKm.toLocaleString('id-ID')} km
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10">
            {quizChecked ? (
              <div
                role="status"
                className={`inline-flex items-center gap-2 text-sm font-medium ${
                  isCorrect ? 'text-cyan-glow' : 'text-amber-star'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Urutan tepat dari diameter terbesar ke terkecil.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Urutan belum tepat. Bandingkan angka diameter di tiap kartu lalu coba ronde baru.</span>
                  </>
                )}
              </div>
            ) : (
              <span className="text-xs text-ink-muted">
                Skor benar sesi ini: <strong className="font-mono text-ink-primary tabular-nums">{scoreCount}</strong>
              </span>
            )}

            <div className="flex items-center gap-3">
              {!quizChecked ? (
                <button
                  type="button"
                  onClick={checkQuizAnswer}
                  className="min-h-[44px] px-6 rounded-lg bg-cyan-glow text-space-navy font-bold text-sm hover:bg-ink-primary transition-colors"
                >
                  Periksa Urutan
                </button>
              ) : (
                <button
                  type="button"
                  onClick={generateQuiz}
                  className="min-h-[44px] px-5 rounded-lg border border-cyan-glow/40 bg-space-black/80 text-ink-primary text-sm font-medium hover:border-cyan-glow transition-colors inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-cyan-glow" aria-hidden="true" />
                  <span>Ronde Baru</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
