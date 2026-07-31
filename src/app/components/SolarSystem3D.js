'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const OBJECT_DATA = {
  sun: {
    name: "Matahari", type: "BINTANG",
    desc: "Bintang pusat tata surya kita, sumber cahaya dan panas bagi semua planet. Matahari menyumbang lebih dari 99% massa seluruh tata surya.",
    distance: "0 km (pusat)", size: "≈1.392.700 km",
    more: "Matahari adalah bola plasma raksasa yang menghasilkan energi lewat reaksi fusi nuklir di intinya, mengubah hidrogen menjadi helium. Suhu permukaannya sekitar 5.500°C, sementara inti bisa mencapai 15 juta °C. Cahayanya butuh sekitar 8 menit untuk sampai ke Bumi."
  },
  mercury: {
    name: "Merkurius", type: "PLANET",
    desc: "Planet terkecil dan terdekat dengan Matahari. Permukaannya penuh kawah seperti Bulan, tanpa atmosfer yang berarti.",
    distance: "57,9 juta km", size: "4.879 km",
    more: "Satu hari di Merkurius (rotasi penuh) berlangsung 59 hari Bumi, sementara satu tahunnya hanya 88 hari Bumi. Suhu permukaannya sangat ekstrem: bisa mencapai 430°C di siang hari dan turun hingga -180°C di malam hari karena tidak ada atmosfer penahan panas."
  },
  venus: {
    name: "Venus", type: "PLANET",
    desc: "Planet terpanas di tata surya akibat efek rumah kaca ekstrem dari atmosfer tebal karbon dioksida.",
    distance: "108,2 juta km", size: "12.104 km",
    more: "Venus berotasi berlawanan arah dibanding kebanyakan planet lain (retrograde), dan rotasinya sangat lambat—satu hari Venus lebih panjang dari satu tahunnya. Awan tebal asam sulfat menyelimuti planet ini, menjadikannya objek paling terang di langit malam setelah Bulan."
  },
  earth: {
    name: "Bumi", type: "PLANET",
    desc: "Satu-satunya planet yang diketahui memiliki kehidupan, dengan 71% permukaannya tertutup air.",
    distance: "149,6 juta km", size: "12.742 km",
    more: "Bumi memiliki satu satelit alami, Bulan, yang menstabilkan kemiringan sumbu rotasi dan menciptakan pasang surut air laut. Atmosfer Bumi yang kaya oksigen dan medan magnetnya melindungi kehidupan dari radiasi berbahaya luar angkasa."
  },
  mars: {
    name: "Mars", type: "PLANET",
    desc: "Dikenal sebagai 'Planet Merah' karena kandungan oksida besi di permukaannya. Target utama eksplorasi luar angkasa manusia.",
    distance: "227,9 juta km", size: "6.779 km",
    more: "Mars memiliki gunung tertinggi di tata surya, Olympus Mons, dengan tinggi sekitar 21,9 km—lebih dari dua kali Gunung Everest. Planet ini juga punya dua bulan kecil, Phobos dan Deimos, serta bukti bahwa air pernah mengalir di permukaannya jutaan tahun lalu."
  },
  jupiter: {
    name: "Jupiter", type: "PLANET",
    desc: "Planet terbesar di tata surya, raksasa gas dengan Bintik Merah Besar—badai raksasa yang berlangsung ratusan tahun.",
    distance: "778,5 juta km", size: "139.820 km",
    more: "Jupiter memiliki lebih dari 90 bulan yang diketahui, termasuk empat bulan besar Galilean: Io, Europa, Ganymede, dan Callisto. Massanya begitu besar sehingga lebih berat dari gabungan seluruh planet lain di tata surya."
  },
  saturn: {
    name: "Saturnus", type: "PLANET",
    desc: "Terkenal dengan sistem cincinnya yang megah, tersusun dari jutaan partikel es dan batuan.",
    distance: "1,43 miliar km", size: "116.460 km",
    more: "Cincin Saturnus terlihat luas namun sangat tipis, rata-rata hanya sekitar 10 meter tebalnya. Saturnus juga merupakan planet paling ringan di tata surya—kepadatannya lebih rendah dari air, artinya secara teoritis planet ini bisa mengapung jika ada lautan cukup besar."
  },
  uranus: {
    name: "Uranus", type: "PLANET",
    desc: "Raksasa es yang unik karena berotasi hampir menyamping, seolah 'menggelinding' mengelilingi Matahari.",
    distance: "2,87 miliar km", size: "50.724 km",
    more: "Kemiringan sumbu rotasi Uranus mencapai sekitar 98 derajat, kemungkinan akibat tabrakan besar di masa lalu. Warna biru kehijauannya berasal dari gas metana di atmosfernya yang menyerap cahaya merah dari sinar Matahari."
  },
  neptune: {
    name: "Neptunus", type: "PLANET",
    desc: "Planet terjauh dari Matahari, dengan angin terkencang di tata surya—bisa mencapai 2.100 km/jam.",
    distance: "4,50 miliar km", size: "49.244 km",
    more: "Neptunus ditemukan lewat perhitungan matematika sebelum benar-benar diamati lewat teleskop, karena astronom memprediksi keberadaannya dari gangguan orbit Uranus. Bulan terbesarnya, Triton, mengorbit berlawanan arah rotasi planet."
  },
  pluto: {
    name: "Pluto", type: "PLANET KERDIL",
    desc: "Dulu dianggap planet kesembilan, kini diklasifikasikan sebagai planet kerdil sejak 2006.",
    distance: "5,9 miliar km", size: "2.377 km",
    more: "Pluto berada di Sabuk Kuiper, wilayah penuh objek es di luar orbit Neptunus. Permukaannya diselimuti es nitrogen dan metana, dan ia memiliki bulan besar bernama Charon yang ukurannya hampir setengah Pluto sendiri."
  },
  asteroidbelt: {
    name: "Sabuk Asteroid", type: "WILAYAH",
    desc: "Kumpulan jutaan batuan dan puing yang mengorbit di antara Mars dan Jupiter.",
    distance: "329–478 juta km", size: "Bervariasi (debu hingga ratusan km)",
    more: "Meski terlihat padat dalam ilustrasi, sabuk asteroid sebenarnya sangat lengang—jarak antar asteroid besar rata-rata jutaan kilometer. Ceres, objek terbesar di sabuk ini, bahkan diklasifikasikan sebagai planet kerdil."
  },
  comet: {
    name: "Komet", type: "OBJEK ES",
    desc: "Bongkahan es, debu, dan batuan yang melesat mendekati Matahari dengan orbit sangat lonjong (inklinasi tinggi), meninggalkan ekor gas dan debu.",
    distance: "Bervariasi (hingga triliunan km di Awan Oort)", size: "Umumnya beberapa km",
    more: "Ekor komet selalu mengarah menjauhi Matahari akibat tekanan angin matahari. Orbit komet memiliki kemiringan sudut (inklinasi) tinggi terhadap bidang edar planet, sehingga melintas di atas/bawah lintasan planet tanpa pernah menabraknya."
  }
};

const AURA_COLORS = {
  sun: 0xffaa00,
  mercury: 0xc0c0b5,
  venus: 0xf0cf8e,
  earth: 0x42a5f5,
  mars: 0xff5252,
  jupiter: 0xffa726,
  saturn: 0xffe082,
  uranus: 0x26c6da,
  neptune: 0x29b6f6,
  pluto: 0xe0e0e0,
  comet: 0x33ff88,
  asteroidbelt: 0x22d3ee,
};

// Helper function to create seamless 360-degree Sun texture
function createSeamlessSunTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.2, '#fff1a8');
  grad.addColorStop(0.5, '#ffaa00');
  grad.addColorStop(0.8, '#ff6600');
  grad.addColorStop(1, '#e63900');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 400; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 4 + Math.random() * 20;
    const brightness = Math.random();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = brightness > 0.5
      ? `rgba(255, 255, 220, ${0.15 + Math.random() * 0.25})`
      : `rgba(255, 120, 0, ${0.15 + Math.random() * 0.25})`;
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Helper function to create a soft circular alpha texture for smooth round particles
function createSoftCircleTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.7)');
  grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Seamless 360-degree Procedural Planet Texture Generator (100% Full Sphere Coverage)
function createProceduralPlanetTexture(id) {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (id === 'mercury') {
    ctx.fillStyle = '#8c8c88';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = 2 + Math.random() * 8;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? '#6e6e6a' : '#aaaaa6';
      ctx.fill();
    }
  } else if (id === 'venus') {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#e6b86a');
    grad.addColorStop(0.3, '#f5d08b');
    grad.addColorStop(0.5, '#d99e43');
    grad.addColorStop(0.8, '#f7db9d');
    grad.addColorStop(1, '#cca052');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 60; i++) {
      const y = Math.random() * height;
      ctx.beginPath();
      ctx.ellipse(Math.random() * width, y, 60 + Math.random() * 100, 6 + Math.random() * 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 245, 215, 0.25)';
      ctx.fill();
    }
  } else if (id === 'earth') {
    ctx.fillStyle = '#1e5fad';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 35; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const rx = 20 + Math.random() * 50;
      const ry = 15 + Math.random() * 35;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, Math.random(), 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.4 ? '#388e3c' : '#795548';
      ctx.fill();
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, 18);
    ctx.fillRect(0, height - 18, width, 18);
    for (let i = 0; i < 40; i++) {
      const y = Math.random() * height;
      ctx.beginPath();
      ctx.ellipse(Math.random() * width, y, 40 + Math.random() * 80, 3 + Math.random() * 6, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fill();
    }
  } else if (id === 'mars') {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#c05333');
    grad.addColorStop(0.3, '#d96b43');
    grad.addColorStop(0.6, '#a84124');
    grad.addColorStop(1, '#bf502e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = 10 + Math.random() * 30;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(100, 35, 15, 0.35)';
      ctx.fill();
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, 14);
    ctx.fillRect(0, height - 14, width, 14);
  } else if (id === 'jupiter') {
    ctx.fillStyle = '#dca675';
    ctx.fillRect(0, 0, width, height);
    const bandColors = ['#bd794c', '#e6c39e', '#8f4f2c', '#dcb287', '#7a3c1b', '#f2d5b6', '#a15832'];
    for (let i = 0; i < height; i += 12) {
      ctx.fillStyle = bandColors[(i / 12) % bandColors.length];
      ctx.fillRect(0, i + (Math.sin(i * 0.1) * 2), width, 8 + Math.random() * 4);
    }
    ctx.beginPath();
    ctx.ellipse(width * 0.65, height * 0.62, 35, 20, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#cc3d18';
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(width * 0.65, height * 0.62, 25, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ea5832';
    ctx.fill();
  } else if (id === 'saturn') {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#d9c294');
    grad.addColorStop(0.2, '#f2dfb6');
    grad.addColorStop(0.4, '#c2ab7c');
    grad.addColorStop(0.6, '#e0c896');
    grad.addColorStop(0.8, '#b89f6e');
    grad.addColorStop(1, '#d4bc8e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < height; i += 10) {
      ctx.fillStyle = i % 20 === 0 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(160, 130, 80, 0.15)';
      ctx.fillRect(0, i, width, 5);
    }
  } else if (id === 'uranus') {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#75d1dd');
    grad.addColorStop(0.5, '#a3e5ed');
    grad.addColorStop(1, '#66c6d3');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.fillRect(0, Math.random() * height, width, 4 + Math.random() * 8);
    }
  } else if (id === 'neptune') {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#3563cc');
    grad.addColorStop(0.5, '#4f7ded');
    grad.addColorStop(1, '#2c4eb8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    ctx.beginPath();
    ctx.ellipse(width * 0.4, height * 0.55, 25, 15, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1c368c';
    ctx.fill();
    for (let i = 0; i < 25; i++) {
      const y = Math.random() * height;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.fillRect(Math.random() * width, y, 30 + Math.random() * 60, 2 + Math.random() * 3);
    }
  } else {
    ctx.fillStyle = '#c7b299';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 10 + Math.random() * 25, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? '#8c765c' : '#ebd8c3';
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export default function SolarSystem3D() {
  const mountRef = useRef(null);
  const selectedIdRef = useRef(null);
  const isResettingZoomRef = useRef(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectObject = (id) => {
    isResettingZoomRef.current = false;
    selectedIdRef.current = id;
    setSelectedId(id);
    setShowMore(false);
  };

  const handleClosePanel = () => {
    selectedIdRef.current = null;
    setSelectedId(null);
    setShowMore(false);
    isResettingZoomRef.current = true;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 700;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 5000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Controls
    const controls = {
      target: new THREE.Vector3(0, 0, 0),
      radius: 230,
      theta: 0.9,
      phi: 1.05,
      minRadius: 6,
      maxRadius: 550,
      update() {
        this.phi = Math.max(0.15, Math.min(Math.PI - 0.15, this.phi));
        const sinPhi = Math.sin(this.phi);
        const x = this.target.x + this.radius * sinPhi * Math.sin(this.theta);
        const y = this.target.y + this.radius * Math.cos(this.phi);
        const z = this.target.z + this.radius * sinPhi * Math.cos(this.theta);
        camera.position.set(x, y, z);
        camera.lookAt(this.target);
      }
    };
    controls.update();

    let isDragging = false;
    let lastPointer = { x: 0, y: 0 };

    const dragStart = (x, y) => { isDragging = true; lastPointer = { x, y }; };
    const dragMove = (x, y) => {
      if (!isDragging) return;
      const dx = x - lastPointer.x;
      const dy = y - lastPointer.y;
      controls.theta -= dx * 0.005;
      controls.phi -= dy * 0.005;
      lastPointer = { x, y };
    };
    const dragEnd = () => { isDragging = false; };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', (e) => dragStart(e.clientX, e.clientY));
    domElem.addEventListener('mousemove', (e) => dragMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', dragEnd);

    const handleWheel = (e) => {
      e.preventDefault();
      isResettingZoomRef.current = false;
      controls.radius += e.deltaY * 0.08;
      controls.radius = Math.max(controls.minRadius, Math.min(controls.maxRadius, controls.radius));
    };
    domElem.addEventListener('wheel', handleWheel, { passive: false });

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambient);

    const sunLight = new THREE.PointLight(0xfff5ea, 5.0, 4000);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.8);
    fillLight.position.set(50, 120, 80);
    scene.add(fillLight);

    // Starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 3500;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 800 + Math.random() * 1200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x22d3ee, size: 1.8, sizeAttenuation: true, transparent: true, opacity: 0.85 });
    scene.add(new THREE.Points(starGeo, starMat));

    // SOFT GLOWING SPHERICAL AURA HIGHLIGHT
    const auraSphereGeo = new THREE.SphereGeometry(1.3, 32, 32);
    const auraSphereMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.5,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const selectionAuraMesh = new THREE.Mesh(auraSphereGeo, auraSphereMat);
    selectionAuraMesh.visible = false;
    scene.add(selectionAuraMesh);

    // Seamless Sun
    const sunTex = createSeamlessSunTexture();
    const sunGeo = new THREE.SphereGeometry(10, 48, 48);
    const sunMat = new THREE.MeshBasicMaterial({ map: sunTex });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.userData = { id: 'sun', clickable: true, radiusSize: 10 };
    scene.add(sunMesh);

    // Sun Corona Glow
    const glowGeo = new THREE.SphereGeometry(14, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.35, side: THREE.BackSide });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    const glowOuterGeo = new THREE.SphereGeometry(18, 32, 32);
    const glowOuterMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.12, side: THREE.BackSide });
    scene.add(new THREE.Mesh(glowOuterGeo, glowOuterMat));

    // Planets
    const PLANET_DEFS = [
      ['mercury', 1.0, 18, 0xb5b5aa, 1.6],
      ['venus',   1.6, 25, 0xf0cf8e, 1.2],
      ['earth',   1.7, 33, 0x64b5f6, 1.0],
      ['mars',    1.3, 41, 0xe57373, 0.8],
      ['jupiter', 4.4, 58, 0xffcc80, 0.45],
      ['saturn',  3.8, 76, 0xe3c88f, 0.32],
      ['uranus',  2.6, 92, 0x80deea, 0.22],
      ['neptune', 2.5, 106, 0x64b5f6, 0.17],
    ];

    const orbitGroups = [];
    const clickableMeshes = [sunMesh];

    PLANET_DEFS.forEach(([id, r, dist, color, speed]) => {
      const orbitGroup = new THREE.Group();
      scene.add(orbitGroup);

      const ringGeo = new THREE.RingGeometry(dist - 0.08, dist + 0.08, 128);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, side: THREE.DoubleSide, transparent: true, opacity: 0.45 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      scene.add(ringMesh);

      const planetGeo = new THREE.SphereGeometry(r, 32, 32);
      const pTex = createProceduralPlanetTexture(id);

      const planetMat = new THREE.MeshStandardMaterial({
        map: pTex,
        roughness: 0.6,
        metalness: 0.0,
      });
      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      planetMesh.position.set(dist, 0, 0);
      planetMesh.userData = { id, clickable: true, orbitDist: dist, baseY: r, radiusSize: r };
      orbitGroup.add(planetMesh);
      clickableMeshes.push(planetMesh);

      if (id === 'saturn') {
        const ringGeom = new THREE.RingGeometry(r * 1.4, r * 2.3, 64);
        const ringM = new THREE.MeshBasicMaterial({ color: 0xffe082, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
        const saturnRing = new THREE.Mesh(ringGeom, ringM);
        saturnRing.rotation.x = Math.PI / 2.4;
        planetMesh.add(saturnRing);
      }

      orbitGroups.push({ group: orbitGroup, speed, mesh: planetMesh, selfSpin: 0.3 + Math.random() * 0.5 });
    });

    // Pluto
    const plutoOrbit = new THREE.Group();
    scene.add(plutoOrbit);
    const plutoDist = 122;
    const plutoRingGeo = new THREE.RingGeometry(plutoDist - 0.08, plutoDist + 0.08, 128);
    const plutoRingMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
    const plutoRingMesh = new THREE.Mesh(plutoRingGeo, plutoRingMat);
    plutoRingMesh.rotation.x = Math.PI / 2;
    scene.add(plutoRingMesh);

    const plutoTex = createProceduralPlanetTexture('pluto');
    const plutoMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 16, 16),
      new THREE.MeshStandardMaterial({ map: plutoTex, roughness: 0.6 })
    );
    plutoMesh.position.set(plutoDist, 0, 0);
    plutoMesh.userData = { id: 'pluto', clickable: true, radiusSize: 0.7 };
    plutoOrbit.add(plutoMesh);
    clickableMeshes.push(plutoMesh);
    orbitGroups.push({ group: plutoOrbit, speed: 0.13, mesh: plutoMesh, selfSpin: 0.2 });

    // Asteroid Belt InstancedMesh
    const asteroidGroup = new THREE.Group();
    scene.add(asteroidGroup);
    const asteroidCount = 500;
    const asteroidGeo = new THREE.DodecahedronGeometry(0.28, 0);
    const asteroidMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.6, emissive: 0x888888, emissiveIntensity: 0.2 });
    const asteroidInstMesh = new THREE.InstancedMesh(asteroidGeo, asteroidMat, asteroidCount);
    const dummy = new THREE.Object3D();
    const beltInnerR = 47, beltOuterR = 54;
    for (let i = 0; i < asteroidCount; i++) {
      const r = beltInnerR + Math.random() * (beltOuterR - beltInnerR);
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.6;
      dummy.position.set(r * Math.cos(theta), y, r * Math.sin(theta));
      dummy.scale.setScalar(0.5 + Math.random());
      dummy.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      dummy.updateMatrix();
      asteroidInstMesh.setMatrixAt(i, dummy.matrix);
    }
    asteroidInstMesh.userData = { id: 'asteroidbelt', clickable: true };
    scene.add(asteroidInstMesh);
    clickableMeshes.push(asteroidInstMesh);

    // Dedicated Transparent Click Ring for Asteroid Belt
    const beltClickTorusGeo = new THREE.TorusGeometry(50.5, 4.0, 16, 64);
    const beltClickTorusMat = new THREE.MeshBasicMaterial({ visible: false });
    const beltClickRing = new THREE.Mesh(beltClickTorusGeo, beltClickTorusMat);
    beltClickRing.rotation.x = Math.PI / 2;
    beltClickRing.userData = { id: 'asteroidbelt', clickable: true };
    scene.add(beltClickRing);
    clickableMeshes.push(beltClickRing);

    // Inclined Comet Orbit
    const cometOrbitGroup = new THREE.Group();
    cometOrbitGroup.rotation.x = Math.PI / 7;
    cometOrbitGroup.rotation.z = -Math.PI / 10;
    scene.add(cometOrbitGroup);

    const cometCurve = new THREE.EllipseCurve(
      -30, 0,
      128, 68,
      0, 2 * Math.PI,
      false,
      0
    );
    const cometPoints = cometCurve.getPoints(128);
    const cometOrbitGeo = new THREE.BufferGeometry().setFromPoints(cometPoints);
    const cometOrbitMat = new THREE.LineDashedMaterial({
      color: 0x22d3ee,
      dashSize: 2,
      gapSize: 2,
      transparent: true,
      opacity: 0.35,
    });
    const cometOrbitLine = new THREE.Line(cometOrbitGeo, cometOrbitMat);
    cometOrbitLine.computeLineDistances();
    cometOrbitLine.rotation.x = Math.PI / 2;
    cometOrbitGroup.add(cometOrbitLine);

    const cometGroup = new THREE.Group();
    cometOrbitGroup.add(cometGroup);

    // Core Nucleus
    const nucleusGeo = new THREE.IcosahedronGeometry(0.35, 2);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1.0,
      roughness: 0.2,
    });
    const cometMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    cometMesh.userData = { id: 'comet', clickable: true, radiusSize: 0.6 };
    cometGroup.add(cometMesh);
    clickableMeshes.push(cometMesh);

    // Dedicated Large Transparent Click Target Sphere for Comet (Guarantees 100% Raycast Click Detection)
    const cometClickSphereGeo = new THREE.SphereGeometry(3.5, 16, 16);
    const cometClickSphereMat = new THREE.MeshBasicMaterial({ visible: false });
    const cometClickSphere = new THREE.Mesh(cometClickSphereGeo, cometClickSphereMat);
    cometClickSphere.userData = { id: 'comet', clickable: true };
    cometGroup.add(cometClickSphere);
    clickableMeshes.push(cometClickSphere);

    // Glowing Coma Halo
    const emeraldComaGeo = new THREE.SphereGeometry(0.6, 24, 24);
    const emeraldComaMat = new THREE.MeshBasicMaterial({
      color: 0x33ff88,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const emeraldComaMesh = new THREE.Mesh(emeraldComaGeo, emeraldComaMat);
    emeraldComaMesh.userData = { id: 'comet', clickable: true };
    cometMesh.add(emeraldComaMesh);
    clickableMeshes.push(emeraldComaMesh);

    const cyanOuterComaGeo = new THREE.SphereGeometry(1.0, 24, 24);
    const cyanOuterComaMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const cyanOuterComaMesh = new THREE.Mesh(cyanOuterComaGeo, cyanOuterComaMat);
    cyanOuterComaMesh.userData = { id: 'comet', clickable: true };
    cometMesh.add(cyanOuterComaMesh);
    clickableMeshes.push(cyanOuterComaMesh);

    // Streamlined Tail
    const softCircleTex = createSoftCircleTexture();
    const tailParticleCount = 180;
    const tailGeo = new THREE.BufferGeometry();
    const tailPos = new Float32Array(tailParticleCount * 3);
    const tailColors = new Float32Array(tailParticleCount * 3);

    for (let i = 0; i < tailParticleCount; i++) {
      const t = i / tailParticleCount;
      const spreadWidth = t * 0.7 + 0.05;

      tailPos[i * 3] = -t * 10 - Math.random() * 0.2;
      tailPos[i * 3 + 1] = (Math.random() - 0.5) * spreadWidth;
      tailPos[i * 3 + 2] = (Math.random() - 0.5) * spreadWidth;

      if (t < 0.2) {
        tailColors[i * 3] = 0.2;
        tailColors[i * 3 + 1] = 0.95;
        tailColors[i * 3 + 2] = 0.6;
      } else {
        const fade = (t - 0.2) / 0.8;
        tailColors[i * 3] = 0.5 + fade * 0.5;
        tailColors[i * 3 + 1] = 0.85 + fade * 0.15;
        tailColors[i * 3 + 2] = 1.0;
      }
    }

    tailGeo.setAttribute('position', new THREE.BufferAttribute(tailPos, 3));
    tailGeo.setAttribute('color', new THREE.BufferAttribute(tailColors, 3));

    const tailMat = new THREE.PointsMaterial({
      size: 0.35,
      map: softCircleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const tailPoints = new THREE.Points(tailGeo, tailMat);
    cometMesh.add(tailPoints);

    let cometT = 0;

    // Raycaster Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let downPos = null;
    const handleMouseDown = (e) => { downPos = { x: e.clientX, y: e.clientY }; };
    const handleMouseUp = (e) => {
      if (downPos && Math.abs(e.clientX - downPos.x) < 4 && Math.abs(e.clientY - downPos.y) < 4) {
        const rect = domElem.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(clickableMeshes, true);
        if (intersects.length > 0) {
          const id = intersects[0].object.userData.id;
          if (id) {
            handleSelectObject(id);
          }
        } else {
          handleClosePanel();
        }
      }
    };

    domElem.addEventListener('mousedown', handleMouseDown);
    domElem.addEventListener('mouseup', handleMouseUp);

    // Continuous Animation Loop
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      sunMesh.rotation.y += dt * 0.2;

      orbitGroups.forEach(o => {
        o.group.rotation.y += dt * o.speed * 0.3;
        o.mesh.rotation.y += dt * o.selfSpin;
      });

      asteroidInstMesh.rotation.y += dt * 0.05;

      // Comet Orbit Motion
      cometT += dt * 0.08;
      const cx = -30 + Math.cos(cometT) * 128;
      const cz = Math.sin(cometT) * 68;
      cometGroup.position.set(cx, 0, cz);

      // Tail dynamically points away from the Sun
      const sunWorldPos = new THREE.Vector3(0, 0, 0);
      const cometWorldPos = new THREE.Vector3();
      cometMesh.getWorldPosition(cometWorldPos);

      const awayFromSun = cometWorldPos.clone().sub(sunWorldPos).normalize();
      const targetLookAt = cometWorldPos.clone().add(awayFromSun);
      cometMesh.lookAt(targetLookAt);

      // Micro-Flicker for Tail
      const positions = tailPoints.geometry.attributes.position.array;
      for (let i = 0; i < tailParticleCount; i++) {
        const t = i / tailParticleCount;
        const wave = Math.sin(cometT * 4 + t * 6) * 0.015 * t;
        positions[i * 3 + 1] += wave;
      }
      tailPoints.geometry.attributes.position.needsUpdate = true;

      // Camera Follow & Spherical Glowing Aura Highlight
      const currentSelectedId = selectedIdRef.current;
      if (currentSelectedId) {
        selectionAuraMesh.visible = true;

        const targetColor = AURA_COLORS[currentSelectedId] || 0x22d3ee;
        selectionAuraMesh.material.color.setHex(targetColor);

        if (currentSelectedId === 'asteroidbelt') {
          controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
          controls.radius += (110 - controls.radius) * 0.05;

          selectionAuraMesh.position.set(0, 0, 0);
          const beltScale = 51 + Math.sin(time * 3) * 0.5;
          selectionAuraMesh.scale.set(beltScale, beltScale, beltScale);
        } else if (currentSelectedId === 'comet') {
          controls.target.lerp(cometWorldPos, 0.08);
          controls.radius += (8 - controls.radius) * 0.05;

          selectionAuraMesh.position.copy(cometWorldPos);
          const pulseScale = 1.2 * (1.35 + Math.sin(time * 4) * 0.05);
          selectionAuraMesh.scale.set(pulseScale, pulseScale, pulseScale);
        } else {
          const targetMesh = clickableMeshes.find(m => m.userData.id === currentSelectedId);
          if (targetMesh) {
            const worldPos = new THREE.Vector3();
            targetMesh.getWorldPosition(worldPos);

            let offset = 6;
            let baseRadius = targetMesh.userData.radiusSize || 1.7;

            if (currentSelectedId === 'sun') { offset = 26; baseRadius = 10; }
            if (currentSelectedId === 'jupiter') { offset = 12; baseRadius = 4.4; }
            if (currentSelectedId === 'saturn') { offset = 14; baseRadius = 3.8; }
            if (currentSelectedId === 'uranus') { offset = 8; baseRadius = 2.6; }
            if (currentSelectedId === 'neptune') { offset = 8; baseRadius = 2.5; }

            controls.target.lerp(worldPos, 0.06);
            controls.radius += (offset - controls.radius) * 0.05;

            selectionAuraMesh.position.copy(worldPos);
            const pulseScale = baseRadius * (1.35 + Math.sin(time * 4) * 0.05);
            selectionAuraMesh.scale.set(pulseScale, pulseScale, pulseScale);
          }
        }
      } else {
        selectionAuraMesh.visible = false;

        if (isResettingZoomRef.current) {
          controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
          controls.radius += (230 - controls.radius) * 0.05;
          if (Math.abs(controls.radius - 230) < 1.5) {
            isResettingZoomRef.current = false;
          }
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    setIsLoading(false);
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 700;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domElem.removeEventListener('wheel', handleWheel);
      domElem.removeEventListener('mousedown', handleMouseDown);
      domElem.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseup', dragEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && domElem && container.contains(domElem)) {
        container.removeChild(domElem);
      }
    };
  }, []);

  const activeData = selectedId ? OBJECT_DATA[selectedId] : null;

  return (
    <div className="relative w-full h-[750px] overflow-hidden rounded-2xl bg-[#05060f] border border-[#22D3EE]/40 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
      {isLoading && (
        <div className="absolute inset-0 bg-[#05060f] z-50 flex items-center justify-center text-[#22D3EE] font-['Geist'] text-sm tracking-widest">
          MEMUAT TATA SURYA 3D...
        </div>
      )}

      {/* 3D Canvas mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* HUD Top Header */}
      <div className="absolute top-0 left-0 w-full p-6 pointer-events-none z-10">
        <h2 className="text-[#ffffff] font-['Sora'] text-xl font-semibold tracking-wide shadow-sm">
          Tata Surya Interaktif 3D
        </h2>
        <p className="text-[#22D3EE] font-['Hanken_Grotesk'] text-xs mt-1 font-medium">
          Klik planet, asteroid, atau komet untuk melihat detail · Drag untuk memutar · Scroll untuk zoom
        </p>
      </div>

      {/* Info Panel HUD Modal */}
      {activeData && (
        <div className="absolute top-1/2 right-6 md:right-10 -translate-y-1/2 w-[340px] max-w-[calc(100vw-32px)] bg-[#0f1226]/95 backdrop-blur-md border border-[#22D3EE]/50 rounded-2xl p-6 text-[#eef0fb] z-20 shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all duration-300">
          <button
            onClick={handleClosePanel}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border-none text-[#22D3EE] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="inline-block text-[10px] tracking-widest uppercase text-[#22D3EE] border border-[#22D3EE]/50 rounded-full px-3 py-1 mb-3 font-['Geist'] font-semibold bg-[#22D3EE]/10">
            {activeData.type}
          </span>

          <h3 className="font-['Sora'] text-2xl font-semibold text-white mb-2">{activeData.name}</h3>

          <p className="font-['Hanken_Grotesk'] text-sm leading-relaxed text-[#c3c8e6] mb-4">
            {activeData.desc}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4 font-['Hanken_Grotesk']">
            <div className="bg-white/5 rounded-lg p-2.5 border border-white/10">
              <div className="text-[10px] text-[#22D3EE] uppercase tracking-wider font-semibold">Jarak dari Matahari</div>
              <div className="text-sm text-[#f0f2ff] font-semibold mt-0.5">{activeData.distance}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-2.5 border border-white/10">
              <div className="text-[10px] text-[#22D3EE] uppercase tracking-wider font-semibold">Diameter</div>
              <div className="text-sm text-[#f0f2ff] font-semibold mt-0.5">{activeData.size}</div>
            </div>
          </div>

          {showMore && (
            <div className="mb-4 text-xs leading-relaxed text-[#b3badd] bg-white/5 p-3 rounded-lg border border-white/10">
              {activeData.more}
            </div>
          )}

          <button
            onClick={() => setShowMore(!showMore)}
            className="w-full bg-[#22D3EE] text-[#001f25] py-3 rounded-xl text-xs font-bold tracking-wide cursor-pointer hover:bg-[#22D3EE]/90 transition-colors flex items-center justify-center gap-1"
          >
            {showMore ? (
              <>
                Tutup detail <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Lihat selengkapnya <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Bottom Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#22D3EE] text-xs pointer-events-none opacity-90 z-10 text-center font-['Geist'] font-medium bg-black/60 px-4 py-1.5 rounded-full border border-[#22D3EE]/30">
        Tekan area kosong atau tombol ✕ untuk kembali ke tampilan orbit
      </div>
    </div>
  );
}
