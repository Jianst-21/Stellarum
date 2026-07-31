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
  },
  moon: {
    name: "Bulan (Luna)", type: "SATELIT ALAMI (BUMI)",
    desc: "Satu-satunya satelit alami Bumi dan objek paling terang kedua di langit malam setelah Matahari.",
    distance: "384.400 km (dari Bumi)", size: "3.474 km",
    more: "Bulan selalu menampilkan sisi yang sama ke Bumi karena mengalami penguncian pasang surut (tidal locking). Gravitasi Bulan memicu pasang surut air laut di Bumi dan menstabilkan kemiringan sumbu rotasi Bumi."
  },
  ganymede: {
    name: "Ganymede", type: "SATELIT ALAMI (JUPITER)",
    desc: "Satelit alami terbesar di Tata Surya, bahkan lebih besar daripada planet Merkurius.",
    distance: "1,07 juta km (dari Jupiter)", size: "5.268 km",
    more: "Ganymede adalah satu-satunya bulan yang diketahui memiliki medan magnetnya sendiri. Di bawah permukaan es dan batuannya, terdapat samudra air cair raksasa yang terperangkap di antara lapisan es."
  },
  europa: {
    name: "Europa", type: "SATELIT ALAMI (JUPITER)",
    desc: "Satelit es Jupiter dengan permukaan paling mulus di Tata Surya, diselimuti lautan air cair di bawah kerak esnya.",
    distance: "670.900 km (dari Jupiter)", size: "3.122 km",
    more: "Europa dianggap sebagai salah satu tempat paling menjanjikan di luar Bumi untuk mencari kehidupan mikroba. Permukaan esnya penuh retakan garis-garis kecokelatan akibat gaya pasang surut gravitasi Jupiter yang sangat kuat."
  },
  titan: {
    name: "Titan", type: "SATELIT ALAMI (SATURNUS)",
    desc: "Satelit terbesar Saturnus dan satu-satunya bulan di Tata Surya yang memiliki atmosfer tebal serta cairan di permukaannya.",
    distance: "1,22 juta km (dari Saturnus)", size: "5.149 km",
    more: "Atmsofer Titan didominasi gas nitrogen. Di permukaannya terdapat danau dan sungai yang mengalirkan metana dan etana cair dalam siklus cuaca hidrokarbon yang mirip dengan siklus air di Bumi."
  },
  phobos: {
    name: "Phobos", type: "SATELIT ALAMI (MARS)",
    desc: "Satelit terbesar Mars yang berbentuk tidak beraturan (kentang batu), mengorbit sangat dekat dengan permukaan Mars.",
    distance: "9.377 km (dari Mars)", size: "22,5 km",
    more: "Phobos mengorbit Mars 3 kali sehari dan bergerak semakin dekat ke Mars sekitar 1,8 meter setiap 100 tahun. Diprediksi dalam 50 juta tahun Phobos akan hancur menjadi cincin di sekeliling Mars."
  },
  deimos: {
    name: "Deimos", type: "SATELIT ALAMI (MARS)",
    desc: "Satelit terluar Mars yang lebih kecil dan halus, diselimuti lapisan regolit tebal.",
    distance: "23.460 km (dari Mars)", size: "12,4 km",
    more: "Deimos memiliki orbit yang jauh lebih stabil daripada Phobos. Ukurannya yang sangat kecil dan gravitasinya yang amat lemah membuat seseorang bisa melompat lepas dari permukaannya dengan menggunakan sepeda."
  },
  ceres: {
    name: "Ceres", type: "PLANET KERDIL (SABUK ASTEROID)",
    desc: "Objek terbesar di Sabuk Asteroid dan satu-satunya planet kerdil yang berada di Tata Surya bagian dalam.",
    distance: "413,7 juta km", size: "940 km",
    more: "Ceres menyumbang sekitar sepertiga dari total massa seluruh Sabuk Asteroid. Permukaannya mengandung es air dan titik-titik terang kaya garam karbonat (seperti Kawah Occator) yang berkilau di bawah sinar Matahari."
  },
  eris: {
    name: "Eris", type: "PLANET KERDIL (SABUK KUIPER)",
    desc: "Planet kerdil terbesar kedua di luar orbit Neptunus, yang penemuannya memicu redefinisi status Pluto pada 2006.",
    distance: "10,12 miliar km", size: "2.326 km",
    more: "Eris mengorbit Matahari dalam jalur miring ekstrem (inklinasi 30°). Permukaannya yang sangat dingin (-240°C) diselimuti es nitrogen murni yang memantulkan hampir 96% sinar Matahari."
  },
  kuiperbelt: {
    name: "Sabuk Kuiper", type: "WILAYAH ES OUTDOOR",
    desc: "Cincin raksasa berisi triliunan objek es, planet kerdil, dan komet di luar orbit Neptunus.",
    distance: "4,5–7,5 miliar km", size: "Lebar ±3 miliar km",
    more: "Sabuk Kuiper jauh lebih luas dan 20 kali lebih masif daripada Sabuk Asteroid. Wilayah ini menjadi rumah bagi planet-planet kerdil es seperti Pluto, Eris, Haumea, dan Makemake, serta asal dari komet periode pendek."
  },
  voyager1: {
    name: "Voyager 1", type: "WAHANA ANTARIKSA (INTERSTELLAR)",
    desc: "Objek buatan manusia terjauh dari Bumi yang sedang melesat menembus ruang antarbintang di luar heliosfer.",
    distance: "24,3 miliar km", size: "3,7 meter (Antena)",
    more: "Diluncurkan NASA pada 1977, Voyager 1 membawa 'Golden Record'—piringan emas berisi suara, musik, dan gambar dari peradaban Bumi untuk kehidupan luar angkasa. Saat ini ia melaju dengan kecepatan 61.000 km/jam di ruang antarbintang."
  },
  jwst: {
    name: "Teleskop James Webb (JWST)", type: "TELESKOP ANTARIKSA (BUMI L2)",
    desc: "Teleskop antariksa terbesar dan tercanggih milik manusia yang mengorbit titik Lagrange L2 di belakang Bumi.",
    distance: "1,5 juta km (dari Bumi L2)", size: "20,2 m x 14,2 m (Sunshield)",
    more: "JWST mengamati alam semesta dalam spektrum inframerah menggunakan cermin utama berlapis emas 18 segmen segienam berdiameter 6,5 meter. Teleskop ini mampu melihat galaksi pertama yang terbentuk setelah Big Bang dan menganalisis atmosfer exoplanet."
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
  moon: 0xe8e8e8,
  ganymede: 0xd4b896,
  europa: 0x80deea,
  titan: 0xffb74d,
  phobos: 0xd7ccc8,
  deimos: 0xefebe9,
  ceres: 0x80cbc4,
  eris: 0xe0f7fa,
  kuiperbelt: 0x00bcd4,
  voyager1: 0xffd700,
  jwst: 0xffb300,
};

// Helper functions for 3D Spacecraft Probe models (Phase 3)
function createJWSTMesh() {
  const jwstGroup = new THREE.Group();

  // Multilayer Sunshield
  const shieldGeo = new THREE.PlaneGeometry(1.2, 0.7);
  const shieldMat = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    metalness: 0.9,
    roughness: 0.2,
    side: THREE.DoubleSide
  });
  const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
  shieldMesh.rotation.x = Math.PI / 2;
  jwstGroup.add(shieldMesh);

  // Hexagonal Golden Primary Mirror Array
  const mirrorGroup = new THREE.Group();
  const hexMat = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 0.95,
    roughness: 0.1
  });

  const hexGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.03, 6);
  const centerHex = new THREE.Mesh(hexGeo, hexMat);
  centerHex.rotation.x = Math.PI / 2;
  mirrorGroup.add(centerHex);

  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const hMesh = new THREE.Mesh(hexGeo, hexMat);
    hMesh.rotation.x = Math.PI / 2;
    hMesh.position.set(Math.cos(angle) * 0.22, Math.sin(angle) * 0.22, 0);
    mirrorGroup.add(hMesh);
  }
  mirrorGroup.position.set(0, 0.25, 0);
  jwstGroup.add(mirrorGroup);

  // Click target sphere
  const clickSphereGeo = new THREE.SphereGeometry(1.0, 12, 12);
  const clickSphereMat = new THREE.MeshBasicMaterial({ visible: false });
  const clickSphere = new THREE.Mesh(clickSphereGeo, clickSphereMat);
  clickSphere.userData = { id: 'jwst', clickable: true };
  jwstGroup.add(clickSphere);

  jwstGroup.userData = { id: 'jwst', clickable: true, radiusSize: 0.6 };
  return jwstGroup;
}

function createVoyagerMesh() {
  const vGroup = new THREE.Group();

  // White High-Gain Parabolic Dish Antenna
  const dishGeo = new THREE.ConeGeometry(0.7, 0.25, 24, 1, true);
  const dishMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, side: THREE.DoubleSide });
  const dishMesh = new THREE.Mesh(dishGeo, dishMat);
  dishMesh.rotation.x = -Math.PI / 2;
  vGroup.add(dishMesh);

  // Golden Record
  const recordGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.02, 16);
  const recordMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });
  const recordMesh = new THREE.Mesh(recordGeo, recordMat);
  recordMesh.position.set(0.3, -0.1, 0);
  vGroup.add(recordMesh);

  // Main Bus Chassis
  const busGeo = new THREE.BoxGeometry(0.35, 0.25, 0.35);
  const busMat = new THREE.MeshStandardMaterial({ color: 0x90a4ae, metalness: 0.8, roughness: 0.3 });
  const busMesh = new THREE.Mesh(busGeo, busMat);
  busMesh.position.set(0, -0.2, 0);
  vGroup.add(busMesh);

  // Magnetometer Boom
  const boomGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.4, 8);
  const boomMat = new THREE.MeshStandardMaterial({ color: 0x455a64 });
  const boomMesh = new THREE.Mesh(boomGeo, boomMat);
  boomMesh.position.set(-0.6, -0.2, 0);
  boomMesh.rotation.z = Math.PI / 2;
  vGroup.add(boomMesh);

  // Click target sphere
  const clickSphereGeo = new THREE.SphereGeometry(1.4, 12, 12);
  const clickSphereMat = new THREE.MeshBasicMaterial({ visible: false });
  const clickSphere = new THREE.Mesh(clickSphereGeo, clickSphereMat);
  clickSphere.userData = { id: 'voyager1', clickable: true };
  vGroup.add(clickSphere);

  vGroup.userData = { id: 'voyager1', clickable: true, radiusSize: 0.7 };
  return vGroup;
}

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
  } else if (id === 'moon') {
    ctx.fillStyle = '#9e9e9e';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = 2 + Math.random() * 10;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.4 ? '#757575' : '#c2c2c2';
      ctx.fill();
    }
  } else if (id === 'ganymede') {
    ctx.fillStyle = '#948372';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 40; i++) {
      const y = Math.random() * height;
      ctx.beginPath();
      ctx.ellipse(Math.random() * width, y, 50 + Math.random() * 80, 8 + Math.random() * 15, Math.random(), 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(90, 75, 65, 0.4)';
      ctx.fill();
    }
    for (let i = 0; i < 150; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 1.5 + Math.random() * 4, 0, Math.PI * 2);
      ctx.fillStyle = '#e6ded7';
      ctx.fill();
    }
  } else if (id === 'europa') {
    ctx.fillStyle = '#e0f7fa';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 35; i++) {
      const x1 = Math.random() * width;
      const y1 = Math.random() * height;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 + (Math.random() - 0.5) * 120, y1 + (Math.random() - 0.5) * 80);
      ctx.strokeStyle = 'rgba(161, 92, 67, 0.6)';
      ctx.lineWidth = 1 + Math.random() * 2.5;
      ctx.stroke();
    }
  } else if (id === 'titan') {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#ffca28');
    grad.addColorStop(0.5, '#ffa726');
    grad.addColorStop(1, '#e65100');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = 'rgba(255, 236, 179, 0.2)';
      ctx.fillRect(0, Math.random() * height, width, 6 + Math.random() * 12);
    }
  } else if (id === 'phobos') {
    ctx.fillStyle = '#6d6d6d';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 120; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 2 + Math.random() * 6, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? '#424242' : '#8c8c8c';
      ctx.fill();
    }
  } else if (id === 'deimos') {
    ctx.fillStyle = '#9e9e9e';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 100; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 2 + Math.random() * 5, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? '#757575' : '#bdbdbd';
      ctx.fill();
    }
  } else if (id === 'ceres') {
    ctx.fillStyle = '#78909c';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 150; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 2 + Math.random() * 7, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.4 ? '#546e7a' : '#90a4ae';
      ctx.fill();
    }
    // Occator crater bright spots
    ctx.beginPath();
    ctx.arc(width * 0.4, height * 0.45, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  } else if (id === 'eris') {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#e0f7fa');
    grad.addColorStop(0.5, '#b2ebf2');
    grad.addColorStop(1, '#80deea');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 80; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 1 + Math.random() * 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();
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
      radius: 360,
      theta: 0.9,
      phi: 1.05,
      minRadius: 6,
      maxRadius: 1000,
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

    // Mouse events
    domElem.addEventListener('mousedown', (e) => dragStart(e.clientX, e.clientY));
    domElem.addEventListener('mousemove', (e) => dragMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', dragEnd);

    // Touch events for mobile
    let lastTouchDist = null;
    domElem.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        dragStart(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2) {
        isDragging = false;
        lastTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    domElem.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (e.touches.length === 1) {
        dragMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        if (lastTouchDist !== null) {
          const delta = lastTouchDist - dist;
          isResettingZoomRef.current = false;
          controls.radius += delta * 0.3;
          controls.radius = Math.max(controls.minRadius, Math.min(controls.maxRadius, controls.radius));
        }
        lastTouchDist = dist;
      }
    }, { passive: false });

    domElem.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) lastTouchDist = null;
      if (e.touches.length === 0) dragEnd();
    }, { passive: true });

    // Wheel zoom (desktop)
    const handleWheel = (e) => {
      e.preventDefault();
      isResettingZoomRef.current = false;
      controls.radius += e.deltaY * 0.08;
      controls.radius = Math.max(controls.minRadius, Math.min(controls.maxRadius, controls.radius));
    };
    domElem.addEventListener('wheel', handleWheel, { passive: false });
    domElem.style.touchAction = 'none';

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

    // Planets with expanded, non-overlapping orbital distances
    const PLANET_DEFS = [
      ['mercury', 1.0, 20,  0xb5b5aa, 1.6],
      ['venus',   1.6, 28,  0xf0cf8e, 1.2],
      ['earth',   1.7, 38,  0x64b5f6, 1.0],
      ['mars',    1.3, 50,  0xe57373, 0.8],
      ['jupiter', 4.4, 85,  0xffcc80, 0.45],
      ['saturn',  3.8, 115, 0xe3c88f, 0.32],
      ['uranus',  2.6, 145, 0x80deea, 0.22],
      ['neptune', 2.5, 172, 0x64b5f6, 0.17],
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

      // --- PHASE 1 MOONS ADDITIONS ---
      if (id === 'earth') {
        const moonOrbitGroup = new THREE.Group();
        planetMesh.add(moonOrbitGroup);

        const moonDist = 3.6;
        const moonRingGeo = new THREE.RingGeometry(moonDist - 0.04, moonDist + 0.04, 64);
        const moonRingMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.25 });
        const moonRingMesh = new THREE.Mesh(moonRingGeo, moonRingMat);
        moonRingMesh.rotation.x = Math.PI / 2;
        moonOrbitGroup.add(moonRingMesh);

        const moonTex = createProceduralPlanetTexture('moon');
        const moonMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.45, 24, 24),
          new THREE.MeshStandardMaterial({ map: moonTex, roughness: 0.7 })
        );
        moonMesh.position.set(moonDist, 0, 0);
        moonMesh.userData = { id: 'moon', clickable: true, radiusSize: 0.45 };
        moonOrbitGroup.add(moonMesh);
        clickableMeshes.push(moonMesh);

        // Click target sphere for Moon
        const moonClickGeo = new THREE.SphereGeometry(1.0, 12, 12);
        const moonClickMat = new THREE.MeshBasicMaterial({ visible: false });
        const moonClickMesh = new THREE.Mesh(moonClickGeo, moonClickMat);
        moonClickMesh.userData = { id: 'moon', clickable: true };
        moonMesh.add(moonClickMesh);
        clickableMeshes.push(moonClickMesh);

        // --- PHASE 3: JWST Space Telescope (Earth L2 Point) ---
        const jwstOrbitGroup = new THREE.Group();
        planetMesh.add(jwstOrbitGroup);

        const jwstDist = 5.2;
        const jwstRingGeo = new THREE.RingGeometry(jwstDist - 0.04, jwstDist + 0.04, 64);
        const jwstRingMat = new THREE.MeshBasicMaterial({ color: 0xffb300, side: THREE.DoubleSide, transparent: true, opacity: 0.25 });
        const jwstRingMesh = new THREE.Mesh(jwstRingGeo, jwstRingMat);
        jwstRingMesh.rotation.x = Math.PI / 2;
        jwstOrbitGroup.add(jwstRingMesh);

        const jwstMesh = createJWSTMesh();
        jwstMesh.position.set(jwstDist, 0, 0);
        jwstOrbitGroup.add(jwstMesh);
        clickableMeshes.push(jwstMesh);

        orbitGroup.userData.moonGroup = moonOrbitGroup;
        orbitGroup.userData.jwstGroup = jwstOrbitGroup;
      }

      if (id === 'mars') {
        // Phobos Moon
        const phobosOrbitGroup = new THREE.Group();
        planetMesh.add(phobosOrbitGroup);

        const phobosDist = 2.4;
        const phobosRingGeo = new THREE.RingGeometry(phobosDist - 0.03, phobosDist + 0.03, 48);
        const phobosRingMat = new THREE.MeshBasicMaterial({ color: 0xd7ccc8, side: THREE.DoubleSide, transparent: true, opacity: 0.2 });
        const phobosRingMesh = new THREE.Mesh(phobosRingGeo, phobosRingMat);
        phobosRingMesh.rotation.x = Math.PI / 2;
        phobosOrbitGroup.add(phobosRingMesh);

        const phobosTex = createProceduralPlanetTexture('phobos');
        const phobosMesh = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.22, 1),
          new THREE.MeshStandardMaterial({ map: phobosTex, roughness: 0.8 })
        );
        phobosMesh.position.set(phobosDist, 0, 0);
        phobosMesh.userData = { id: 'phobos', clickable: true, radiusSize: 0.22 };
        phobosOrbitGroup.add(phobosMesh);
        clickableMeshes.push(phobosMesh);

        const phobosClickGeo = new THREE.SphereGeometry(0.8, 12, 12);
        const phobosClickMesh = new THREE.Mesh(phobosClickGeo, new THREE.MeshBasicMaterial({ visible: false }));
        phobosClickMesh.userData = { id: 'phobos', clickable: true };
        phobosMesh.add(phobosClickMesh);
        clickableMeshes.push(phobosClickMesh);

        // Deimos Moon
        const deimosOrbitGroup = new THREE.Group();
        planetMesh.add(deimosOrbitGroup);

        const deimosDist = 3.6;
        const deimosRingGeo = new THREE.RingGeometry(deimosDist - 0.03, deimosDist + 0.03, 48);
        const deimosRingMat = new THREE.MeshBasicMaterial({ color: 0xefebe9, side: THREE.DoubleSide, transparent: true, opacity: 0.2 });
        const deimosRingMesh = new THREE.Mesh(deimosRingGeo, deimosRingMat);
        deimosRingMesh.rotation.x = Math.PI / 2;
        deimosOrbitGroup.add(deimosRingMesh);

        const deimosTex = createProceduralPlanetTexture('deimos');
        const deimosMesh = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.16, 1),
          new THREE.MeshStandardMaterial({ map: deimosTex, roughness: 0.8 })
        );
        deimosMesh.position.set(deimosDist, 0, 0);
        deimosMesh.userData = { id: 'deimos', clickable: true, radiusSize: 0.16 };
        deimosOrbitGroup.add(deimosMesh);
        clickableMeshes.push(deimosMesh);

        const deimosClickGeo = new THREE.SphereGeometry(0.7, 12, 12);
        const deimosClickMesh = new THREE.Mesh(deimosClickGeo, new THREE.MeshBasicMaterial({ visible: false }));
        deimosClickMesh.userData = { id: 'deimos', clickable: true };
        deimosMesh.add(deimosClickMesh);
        clickableMeshes.push(deimosClickMesh);

        orbitGroup.userData.phobosGroup = phobosOrbitGroup;
        orbitGroup.userData.deimosGroup = deimosOrbitGroup;
      }

      if (id === 'jupiter') {
        // Europa (Inner Moon)
        const europaOrbitGroup = new THREE.Group();
        planetMesh.add(europaOrbitGroup);

        const europaDist = 7.5;
        const europaRingGeo = new THREE.RingGeometry(europaDist - 0.05, europaDist + 0.05, 64);
        const europaRingMat = new THREE.MeshBasicMaterial({ color: 0x80deea, side: THREE.DoubleSide, transparent: true, opacity: 0.25 });
        const europaRingMesh = new THREE.Mesh(europaRingGeo, europaRingMat);
        europaRingMesh.rotation.x = Math.PI / 2;
        europaOrbitGroup.add(europaRingMesh);

        const europaTex = createProceduralPlanetTexture('europa');
        const europaMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.55, 24, 24),
          new THREE.MeshStandardMaterial({ map: europaTex, roughness: 0.5 })
        );
        europaMesh.position.set(europaDist, 0, 0);
        europaMesh.userData = { id: 'europa', clickable: true, radiusSize: 0.55 };
        europaOrbitGroup.add(europaMesh);
        clickableMeshes.push(europaMesh);

        const europaClickGeo = new THREE.SphereGeometry(1.2, 12, 12);
        const europaClickMesh = new THREE.Mesh(europaClickGeo, new THREE.MeshBasicMaterial({ visible: false }));
        europaClickMesh.userData = { id: 'europa', clickable: true };
        europaMesh.add(europaClickMesh);
        clickableMeshes.push(europaClickMesh);

        // Ganymede (Outer Moon)
        const ganymedeOrbitGroup = new THREE.Group();
        planetMesh.add(ganymedeOrbitGroup);

        const ganymedeDist = 11.0;
        const ganymedeRingGeo = new THREE.RingGeometry(ganymedeDist - 0.05, ganymedeDist + 0.05, 64);
        const ganymedeRingMat = new THREE.MeshBasicMaterial({ color: 0xd4b896, side: THREE.DoubleSide, transparent: true, opacity: 0.25 });
        const ganymedeRingMesh = new THREE.Mesh(ganymedeRingGeo, ganymedeRingMat);
        ganymedeRingMesh.rotation.x = Math.PI / 2;
        ganymedeOrbitGroup.add(ganymedeRingMesh);

        const ganymedeTex = createProceduralPlanetTexture('ganymede');
        const ganymedeMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.68, 24, 24),
          new THREE.MeshStandardMaterial({ map: ganymedeTex, roughness: 0.6 })
        );
        ganymedeMesh.position.set(ganymedeDist, 0, 0);
        ganymedeMesh.userData = { id: 'ganymede', clickable: true, radiusSize: 0.68 };
        ganymedeOrbitGroup.add(ganymedeMesh);
        clickableMeshes.push(ganymedeMesh);

        const ganymedeClickGeo = new THREE.SphereGeometry(1.3, 12, 12);
        const ganymedeClickMesh = new THREE.Mesh(ganymedeClickGeo, new THREE.MeshBasicMaterial({ visible: false }));
        ganymedeClickMesh.userData = { id: 'ganymede', clickable: true };
        ganymedeMesh.add(ganymedeClickMesh);
        clickableMeshes.push(ganymedeClickMesh);

        orbitGroup.userData.europaGroup = europaOrbitGroup;
        orbitGroup.userData.ganymedeGroup = ganymedeOrbitGroup;
      }

      if (id === 'saturn') {
        const ringGeom = new THREE.RingGeometry(r * 1.4, r * 2.3, 64);
        const ringM = new THREE.MeshBasicMaterial({ color: 0xffe082, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
        const saturnRing = new THREE.Mesh(ringGeom, ringM);
        saturnRing.rotation.x = Math.PI / 2.4;
        planetMesh.add(saturnRing);

        // Titan Moon (outside Saturn's rings)
        const titanOrbitGroup = new THREE.Group();
        planetMesh.add(titanOrbitGroup);

        const titanDist = 11.5;
        const titanRingGeo = new THREE.RingGeometry(titanDist - 0.05, titanDist + 0.05, 64);
        const titanRingMat = new THREE.MeshBasicMaterial({ color: 0xffb74d, side: THREE.DoubleSide, transparent: true, opacity: 0.25 });
        const titanRingMesh = new THREE.Mesh(titanRingGeo, titanRingMat);
        titanRingMesh.rotation.x = Math.PI / 2;
        titanOrbitGroup.add(titanRingMesh);

        const titanTex = createProceduralPlanetTexture('titan');
        const titanMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.65, 24, 24),
          new THREE.MeshStandardMaterial({ map: titanTex, roughness: 0.4 })
        );
        titanMesh.position.set(titanDist, 0, 0);
        titanMesh.userData = { id: 'titan', clickable: true, radiusSize: 0.65 };
        titanOrbitGroup.add(titanMesh);
        clickableMeshes.push(titanMesh);

        const titanClickGeo = new THREE.SphereGeometry(1.3, 12, 12);
        const titanClickMesh = new THREE.Mesh(titanClickGeo, new THREE.MeshBasicMaterial({ visible: false }));
        titanClickMesh.userData = { id: 'titan', clickable: true };
        titanMesh.add(titanClickMesh);
        clickableMeshes.push(titanClickMesh);

        orbitGroup.userData.titanGroup = titanOrbitGroup;
      }

      orbitGroups.push({ group: orbitGroup, speed, mesh: planetMesh, selfSpin: 0.3 + Math.random() * 0.5 });
    });

    // Pluto
    const plutoOrbit = new THREE.Group();
    scene.add(plutoOrbit);
    const plutoDist = 195;
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

    // Asteroid Belt InstancedMesh (between Mars at 50 and Jupiter at 85)
    const asteroidGroup = new THREE.Group();
    scene.add(asteroidGroup);
    const asteroidCount = 550;
    const asteroidGeo = new THREE.DodecahedronGeometry(0.28, 0);
    const asteroidMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.6, emissive: 0x888888, emissiveIntensity: 0.2 });
    const asteroidInstMesh = new THREE.InstancedMesh(asteroidGeo, asteroidMat, asteroidCount);
    const dummy = new THREE.Object3D();
    const beltInnerR = 60, beltOuterR = 68;
    for (let i = 0; i < asteroidCount; i++) {
      const r = beltInnerR + Math.random() * (beltOuterR - beltInnerR);
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.8;
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
    const beltClickTorusGeo = new THREE.TorusGeometry(64, 4.5, 16, 64);
    const beltClickTorusMat = new THREE.MeshBasicMaterial({ visible: false });
    const beltClickRing = new THREE.Mesh(beltClickTorusGeo, beltClickTorusMat);
    beltClickRing.rotation.x = Math.PI / 2;
    beltClickRing.userData = { id: 'asteroidbelt', clickable: true };
    scene.add(beltClickRing);
    clickableMeshes.push(beltClickRing);

    // --- PHASE 2: CERES (Dwarf Planet in Asteroid Belt) ---
    const ceresOrbitGroup = new THREE.Group();
    scene.add(ceresOrbitGroup);

    const ceresDist = 64;
    const ceresRingGeo = new THREE.RingGeometry(ceresDist - 0.06, ceresDist + 0.06, 128);
    const ceresRingMat = new THREE.MeshBasicMaterial({ color: 0x80cbc4, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
    const ceresRingMesh = new THREE.Mesh(ceresRingGeo, ceresRingMat);
    ceresRingMesh.rotation.x = Math.PI / 2;
    scene.add(ceresRingMesh);

    const ceresTex = createProceduralPlanetTexture('ceres');
    const ceresMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 24, 24),
      new THREE.MeshStandardMaterial({ map: ceresTex, roughness: 0.7 })
    );
    ceresMesh.position.set(ceresDist, 0, 0);
    ceresMesh.userData = { id: 'ceres', clickable: true, radiusSize: 0.45 };
    ceresOrbitGroup.add(ceresMesh);
    clickableMeshes.push(ceresMesh);

    const ceresClickGeo = new THREE.SphereGeometry(1.2, 12, 12);
    const ceresClickMesh = new THREE.Mesh(ceresClickGeo, new THREE.MeshBasicMaterial({ visible: false }));
    ceresClickMesh.userData = { id: 'ceres', clickable: true };
    ceresMesh.add(ceresClickMesh);
    clickableMeshes.push(ceresClickMesh);

    // --- PHASE 2: KUIPER BELT & ERIS ---
    const kuiperGroup = new THREE.Group();
    scene.add(kuiperGroup);
    const kuiperParticleCount = 450;
    const kuiperGeo = new THREE.DodecahedronGeometry(0.3, 0);
    const kuiperMat = new THREE.MeshStandardMaterial({ color: 0x80deea, roughness: 0.4, emissive: 0x00bcd4, emissiveIntensity: 0.15 });
    const kuiperInstMesh = new THREE.InstancedMesh(kuiperGeo, kuiperMat, kuiperParticleCount);
    const kuiperDummy = new THREE.Object3D();
    const kuiperInnerR = 210, kuiperOuterR = 240;
    for (let i = 0; i < kuiperParticleCount; i++) {
      const r = kuiperInnerR + Math.random() * (kuiperOuterR - kuiperInnerR);
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4.0;
      kuiperDummy.position.set(r * Math.cos(theta), y, r * Math.sin(theta));
      kuiperDummy.scale.setScalar(0.4 + Math.random() * 0.8);
      kuiperDummy.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      kuiperDummy.updateMatrix();
      kuiperInstMesh.setMatrixAt(i, kuiperDummy.matrix);
    }
    kuiperInstMesh.userData = { id: 'kuiperbelt', clickable: true };
    scene.add(kuiperInstMesh);
    clickableMeshes.push(kuiperInstMesh);

    const kuiperClickTorusGeo = new THREE.TorusGeometry(225, 15.0, 16, 64);
    const kuiperClickRing = new THREE.Mesh(kuiperClickTorusGeo, new THREE.MeshBasicMaterial({ visible: false }));
    kuiperClickRing.rotation.x = Math.PI / 2;
    kuiperClickRing.userData = { id: 'kuiperbelt', clickable: true };
    scene.add(kuiperClickRing);
    clickableMeshes.push(kuiperClickRing);

    // Eris (Inclined Outer Dwarf Planet)
    const erisOrbitGroup = new THREE.Group();
    erisOrbitGroup.rotation.x = Math.PI / 6; // 30° orbital tilt
    scene.add(erisOrbitGroup);

    const erisDist = 225;
    const erisRingGeo = new THREE.RingGeometry(erisDist - 0.08, erisDist + 0.08, 128);
    const erisRingMat = new THREE.MeshBasicMaterial({ color: 0xe0f7fa, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
    const erisRingMesh = new THREE.Mesh(erisRingGeo, erisRingMat);
    erisRingMesh.rotation.x = Math.PI / 2;
    erisOrbitGroup.add(erisRingMesh);

    const erisTex = createProceduralPlanetTexture('eris');
    const erisMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.52, 24, 24),
      new THREE.MeshStandardMaterial({ map: erisTex, roughness: 0.4 })
    );
    erisMesh.position.set(erisDist, 0, 0);
    erisMesh.userData = { id: 'eris', clickable: true, radiusSize: 0.52 };
    erisOrbitGroup.add(erisMesh);
    clickableMeshes.push(erisMesh);

    const erisClickGeo = new THREE.SphereGeometry(1.4, 12, 12);
    const erisClickMesh = new THREE.Mesh(erisClickGeo, new THREE.MeshBasicMaterial({ visible: false }));
    erisClickMesh.userData = { id: 'eris', clickable: true };
    erisMesh.add(erisClickMesh);
    clickableMeshes.push(erisClickMesh);

    // --- PHASE 3: VOYAGER 1 (Interstellar Spacecraft Probe) ---
    const voyagerOrbitGroup = new THREE.Group();
    voyagerOrbitGroup.rotation.x = Math.PI / 8; // 22.5° orbital tilt
    scene.add(voyagerOrbitGroup);

    const voyagerDist = 270;
    const voyagerRingGeo = new THREE.RingGeometry(voyagerDist - 0.1, voyagerDist + 0.1, 128);
    const voyagerRingMat = new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
    const voyagerRingMesh = new THREE.Mesh(voyagerRingGeo, voyagerRingMat);
    voyagerRingMesh.rotation.x = Math.PI / 2;
    voyagerOrbitGroup.add(voyagerRingMesh);

    const voyagerMesh = createVoyagerMesh();
    voyagerMesh.position.set(voyagerDist, 0, 0);
    voyagerOrbitGroup.add(voyagerMesh);
    clickableMeshes.push(voyagerMesh);

    // Inclined Comet Orbit
    const cometOrbitGroup = new THREE.Group();
    cometOrbitGroup.rotation.x = Math.PI / 7;
    cometOrbitGroup.rotation.z = -Math.PI / 10;
    scene.add(cometOrbitGroup);

    const cometCurve = new THREE.EllipseCurve(
      -40, 0,
      190, 100,
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

    // Helper: perform raycast at canvas coordinate
    const performRaycast = (clientX, clientY) => {
      const rect = domElem.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableMeshes, true);
      if (intersects.length > 0) {
        const id = intersects[0].object.userData.id;
        if (id) handleSelectObject(id);
      } else {
        handleClosePanel();
      }
    };

    // Mouse click detection
    let downPos = null;
    const handleMouseDown = (e) => { downPos = { x: e.clientX, y: e.clientY }; };
    const handleMouseUp = (e) => {
      if (downPos && Math.abs(e.clientX - downPos.x) < 4 && Math.abs(e.clientY - downPos.y) < 4) {
        performRaycast(e.clientX, e.clientY);
      }
    };

    // Touch tap detection (for selecting objects on mobile)
    let touchDownPos = null;
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchDownPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchEnd = (e) => {
      if (touchDownPos && e.changedTouches.length === 1) {
        const t = e.changedTouches[0];
        const dx = Math.abs(t.clientX - touchDownPos.x);
        const dy = Math.abs(t.clientY - touchDownPos.y);
        if (dx < 8 && dy < 8) {
          performRaycast(t.clientX, t.clientY);
        }
        touchDownPos = null;
      }
    };

    domElem.addEventListener('mousedown', handleMouseDown);
    domElem.addEventListener('mouseup', handleMouseUp);
    domElem.addEventListener('touchstart', handleTouchStart, { passive: true });
    domElem.addEventListener('touchend', handleTouchEnd, { passive: true });

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

        // Rotate Moons and Spacecraft around parent planets
        if (o.group.userData.moonGroup) {
          o.group.userData.moonGroup.rotation.y += dt * 1.5;
        }
        if (o.group.userData.jwstGroup) {
          o.group.userData.jwstGroup.rotation.y += dt * 0.9;
        }
        if (o.group.userData.phobosGroup) {
          o.group.userData.phobosGroup.rotation.y += dt * 2.8;
        }
        if (o.group.userData.deimosGroup) {
          o.group.userData.deimosGroup.rotation.y += dt * 1.5;
        }
        if (o.group.userData.europaGroup) {
          o.group.userData.europaGroup.rotation.y += dt * 1.8;
        }
        if (o.group.userData.ganymedeGroup) {
          o.group.userData.ganymedeGroup.rotation.y += dt * 1.2;
        }
        if (o.group.userData.titanGroup) {
          o.group.userData.titanGroup.rotation.y += dt * 1.4;
        }
      });

      // Rotate Phase 2 & 3 objects
      ceresOrbitGroup.rotation.y += dt * 0.28;
      erisOrbitGroup.rotation.y += dt * 0.1;
      kuiperInstMesh.rotation.y += dt * 0.02;
      voyagerOrbitGroup.rotation.y += dt * 0.04;
      voyagerMesh.rotation.y += dt * 0.2;

      asteroidInstMesh.rotation.y += dt * 0.05;

      // Comet Orbit Motion
      cometT += dt * 0.08;
      const cx = -40 + Math.cos(cometT) * 190;
      const cz = Math.sin(cometT) * 100;
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
          controls.radius += (130 - controls.radius) * 0.05;

          selectionAuraMesh.position.set(0, 0, 0);
          const beltScale = 64 + Math.sin(time * 3) * 0.5;
          selectionAuraMesh.scale.set(beltScale, beltScale, beltScale);
        } else if (currentSelectedId === 'kuiperbelt') {
          controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
          controls.radius += (380 - controls.radius) * 0.05;

          selectionAuraMesh.position.set(0, 0, 0);
          const kuiperScale = 225 + Math.sin(time * 3) * 1.0;
          selectionAuraMesh.scale.set(kuiperScale, kuiperScale, kuiperScale);
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

            // Phase 1, 2, 3 objects camera close-up offsets & aura sizes
            if (['moon', 'ganymede', 'europa', 'titan', 'ceres', 'eris', 'voyager1', 'jwst'].includes(currentSelectedId)) {
              offset = 4.2;
              baseRadius = targetMesh.userData.radiusSize || 0.6;
            }
            if (['phobos', 'deimos'].includes(currentSelectedId)) {
              offset = 3.2;
              baseRadius = targetMesh.userData.radiusSize || 0.3;
            }

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
          controls.radius += (360 - controls.radius) * 0.05;
          if (Math.abs(controls.radius - 360) < 2.0) {
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
          Klik planet, bulan, asteroid, komet, atau wahana antariksa untuk melihat detail · Drag untuk memutar · Scroll/Pinch untuk zoom
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
