'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import {
  X,
  ChevronDown,
  ChevronUp,
  Lock,
  Unlock,
  Play,
  Pause,
  Gauge,
  Eye,
  EyeOff,
  RotateCcw,
  ArrowLeft,
} from 'lucide-react';
import { attachSpaceDome } from '@/app/lib/celestialMath';
import { QUICK_JUMP_OBJECTS } from '@/app/data/solarObjects';
import StellarumLogo from '@/app/components/global/StellarumLogo';

const OBJECT_DATA = {
  sun: {
    name: 'Matahari',
    type: 'Bintang',
    desc: 'Bintang pusat Tata Surya, sumber cahaya dan energi bagi seluruh planet. Matahari menyumbang 99,86% massa total Tata Surya.',
    distance: '0 km (pusat)',
    size: '1.392.700 km',
    more: 'Matahari adalah bola plasma raksasa yang menghasilkan energi lewat reaksi fusi nuklir di intinya, mengubah hidrogen menjadi helium. Suhu permukaannya sekitar 5.500°C, sementara intinya mencapai 15 juta °C. Cahayanya butuh sekitar 8 menit 20 detik untuk tiba di Bumi.',
  },
  mercury: {
    name: 'Merkurius',
    type: 'Planet Kebumian',
    desc: 'Planet terkecil dan terdekat dengan Matahari. Permukaannya penuh kawah tumbukan tanpa atmosfer penahan panas.',
    distance: '57,9 juta km',
    size: '4.879 km',
    more: 'Satu rotasi penuh Merkurius berlangsung 59 hari Bumi, sementara satu tahun orbitnya hanya 88 hari Bumi. Suhu permukaannya berayun ekstrem antara 430°C di siang hari dan -180°C pada malam hari.',
  },
  venus: {
    name: 'Venus',
    type: 'Planet Kebumian',
    desc: 'Planet terpanas di Tata Surya akibat efek rumah kaca ekstrem dari atmosfer tebal karbon dioksida.',
    distance: '108,2 juta km',
    size: '12.104 km',
    more: 'Venus berotasi berlawanan arah dibanding mayoritas planet lain (retrograd), dan rotasinya sangat lambat: satu hari Venus lebih panjang dari satu tahunnya. Awan tebal asam sulfat menjadikannya objek paling terang di langit malam setelah Bulan.',
  },
  earth: {
    name: 'Bumi',
    type: 'Planet Kebumian',
    desc: 'Satu-satunya planet yang diketahui memiliki kehidupan, dengan 71% permukaannya tertutup air cair.',
    distance: '149,6 juta km',
    size: '12.742 km',
    more: 'Bumi memiliki satu satelit alami, Bulan, yang menstabilkan kemiringan sumbu rotasi dan memicu pasang surut laut. Atmosfer kaya oksigen serta medan magnetnya melindungi kehidupan dari radiasi kosmik.',
  },
  mars: {
    name: 'Mars',
    type: 'Planet Kebumian',
    desc: 'Dikenal sebagai Planet Merah karena oksida besi di permukaannya. Target utama eksplorasi rover dan misi manusia.',
    distance: '227,9 juta km',
    size: '6.779 km',
    more: 'Mars memiliki gunung tertinggi di Tata Surya, Olympus Mons, setinggi 21,9 km (lebih dari dua kali Gunung Everest). Planet ini memiliki dua bulan kecil, Phobos dan Deimos, serta bukti aliran air purba.',
  },
  jupiter: {
    name: 'Jupiter',
    type: 'Raksasa Gas',
    desc: 'Planet terbesar di Tata Surya dengan Bintik Merah Raksasa, badai antisiklon yang berlangsung ratusan tahun.',
    distance: '778,5 juta km',
    size: '139.820 km',
    more: 'Jupiter memiliki 95 bulan terkonfirmasi, termasuk empat bulan besar Galilean: Io, Europa, Ganymede, dan Callisto. Massanya lebih dari dua kali gabungan seluruh planet lain di Tata Surya.',
  },
  saturn: {
    name: 'Saturnus',
    type: 'Raksasa Gas',
    desc: 'Terkenal dengan sistem cincin es dan batuan yang megah serta terang di seluruh Tata Surya.',
    distance: '1,43 miliar km',
    size: '116.460 km',
    more: 'Cincin Saturnus membentang luas namun rata-rata hanya setebal sekitar 10 meter. Saturnus juga memiliki kepadatan rata-rata lebih rendah daripada air, sehingga secara teoretis dapat mengapung di lautan yang cukup besar.',
  },
  uranus: {
    name: 'Uranus',
    type: 'Raksasa Es',
    desc: 'Raksasa es yang berotasi hampir menyamping seolah menggelinding mengelilingi Matahari.',
    distance: '2,87 miliar km',
    size: '50.724 km',
    more: 'Kemiringan sumbu rotasi Uranus mencapai sekitar 98 derajat, diduga akibat tumbukan besar di masa purba. Warna biru kehijauannya berasal dari gas metana atmosfer yang menyerap cahaya merah.',
  },
  neptune: {
    name: 'Neptunus',
    type: 'Raksasa Es',
    desc: 'Planet terjauh dari Matahari dengan angin terkencang di Tata Surya yang mencapai 2.100 km/jam.',
    distance: '4,50 miliar km',
    size: '49.244 km',
    more: 'Neptunus ditemukan lewat perhitungan matematika sebelum diamati melalui teleskop karena astronom memprediksi gangguan gravitasi pada orbit Uranus. Bulan terbesarnya, Triton, mengorbit secara retrograd.',
  },
  pluto: {
    name: 'Pluto',
    type: 'Planet Kerdil',
    desc: 'Planet kerdil ikonik di Sabuk Kuiper yang diklasifikasikan ulang oleh IAU pada tahun 2006.',
    distance: '5,90 miliar km',
    size: '2.377 km',
    more: 'Pluto berada di Sabuk Kuiper, wilayah objek es di luar orbit Neptunus. Permukaannya diselimuti es nitrogen dan metana, serta ditemani bulan besar bernama Charon yang diameternya hampir setengah Pluto.',
  },
  asteroidbelt: {
    name: 'Sabuk Asteroid',
    type: 'Wilayah Orbital',
    desc: 'Wilayah jutaan batuan dan puing sisa pembentukan Tata Surya yang mengorbit antara Mars dan Jupiter.',
    distance: '329 sampai 478 juta km',
    size: 'Bervariasi (debu hingga ratusan km)',
    more: 'Meski tampak padat pada ilustrasi, sabuk asteroid sebenarnya sangat lengang dengan jarak antar asteroid besar mencapai jutaan kilometer. Ceres adalah objek terbesar sekaligus planet kerdil di wilayah ini.',
  },
  comet: {
    name: 'Komet',
    type: 'Objek Es',
    desc: 'Bongkahan es, debu, dan batuan dengan orbit lonjong berinklinasi tinggi yang membentuk ekor gas saat mendekati Matahari.',
    distance: 'Hingga triliunan km (Awan Oort)',
    size: 'Umumnya beberapa km',
    more: 'Ekor komet selalu mengarah menjauhi Matahari akibat tekanan angin surya. Kemiringan sudut orbitnya membuat komet melintas di atas dan di bawah bidang edar planet.',
  },
  moon: {
    name: 'Bulan (Luna)',
    type: 'Satelit Alami Bumi',
    desc: 'Satelit alami Bumi dan objek paling terang kedua di langit setelah Matahari.',
    distance: '384.400 km (dari Bumi)',
    size: '3.474 km',
    more: 'Bulan selalu menampilkan sisi yang sama ke Bumi akibat penguncian pasang surut (tidal locking). Gravitasinya memicu pasang surut laut dan menjaga kestabilan kemiringan sumbu Bumi.',
  },
  ganymede: {
    name: 'Ganymede',
    type: 'Satelit Alami Jupiter',
    desc: 'Satelit alami terbesar di Tata Surya, bahkan lebih besar daripada planet Merkurius.',
    distance: '1,07 juta km (dari Jupiter)',
    size: '5.268 km',
    more: 'Ganymede adalah satu-satunya bulan yang diketahui memiliki medan magnetnya sendiri. Di bawah kerak es dan batuannya tersimpan samudra air cair raksasa.',
  },
  europa: {
    name: 'Europa',
    type: 'Satelit Alami Jupiter',
    desc: 'Satelit es Jupiter dengan permukaan halus yang menyimpan samudra air cair di bawah kerak esnya.',
    distance: '670.900 km (dari Jupiter)',
    size: '3.122 km',
    more: 'Europa menjadi target utama pencarian kehidupan mikroba luar Bumi. Permukaannya penuh garis retakan kecokelatan akibat gaya pasang surut gravitasi Jupiter.',
  },
  titan: {
    name: 'Titan',
    type: 'Satelit Alami Saturnus',
    desc: 'Satelit terbesar Saturnus dan satu-satunya bulan dengan atmosfer tebal serta danau cairan di permukaannya.',
    distance: '1,22 juta km (dari Saturnus)',
    size: '5.149 km',
    more: 'Atmosfer Titan didominasi gas nitrogen. Di permukaannya mengalir sungai dan danau metana serta etana cair dalam siklus hidrokarbon yang menyerupai siklus air di Bumi.',
  },
  phobos: {
    name: 'Phobos',
    type: 'Satelit Alami Mars',
    desc: 'Satelit terbesar Mars berbentuk batuan tak beraturan yang mengorbit sangat dekat dengan permukaan Mars.',
    distance: '9.377 km (dari Mars)',
    size: '22,5 km',
    more: 'Phobos mengorbit Mars 3 kali sehari dan perlahan mendekat sekitar 1,8 meter setiap abad. Dalam puluhan juta tahun, Phobos diperkirakan akan hancur membentuk cincin tipis mengelilingi Mars.',
  },
  deimos: {
    name: 'Deimos',
    type: 'Satelit Alami Mars',
    desc: 'Satelit terluar Mars yang lebih kecil dan halus, diselimuti lapisan regolit tebal.',
    distance: '23.460 km (dari Mars)',
    size: '12,4 km',
    more: 'Deimos memiliki orbit yang jauh lebih stabil dibandingkan Phobos. Gravitasinya yang sangat lemah membuat kecepatan lepas dari permukaannya hanya sekitar 5,6 meter per detik.',
  },
  ceres: {
    name: 'Ceres',
    type: 'Planet Kerdil (Sabuk Asteroid)',
    desc: 'Objek terbesar di Sabuk Asteroid sekaligus satu-satunya planet kerdil di Tata Surya bagian dalam.',
    distance: '413,7 juta km',
    size: '940 km',
    more: 'Ceres menyumbang sekitar sepertiga massa total Sabuk Asteroid. Permukaannya menyimpan es air dan titik terang garam karbonat di Kawah Occator.',
  },
  eris: {
    name: 'Eris',
    type: 'Planet Kerdil (Sabuk Kuiper)',
    desc: 'Planet kerdil masif di luar orbit Neptunus yang penemuannya memicu redefinisi status Pluto pada 2006.',
    distance: '10,12 miliar km',
    size: '2.326 km',
    more: 'Eris mengorbit Matahari dengan kemiringan bidang ekstrem sekitar 30 derajat. Permukaannya yang bersuhu -240°C diselimuti es nitrogen yang memantulkan hampir 96% cahaya Matahari.',
  },
  kuiperbelt: {
    name: 'Sabuk Kuiper',
    type: 'Wilayah Es Terluar',
    desc: 'Cincin luas berisi miliaran objek es, planet kerdil, dan komet di luar orbit Neptunus.',
    distance: '4,5 sampai 7,5 miliar km',
    size: 'Lebar sekitar 3 miliar km',
    more: 'Sabuk Kuiper jauh lebih luas dan sekitar 20 kali lebih masif dibandingkan Sabuk Asteroid. Wilayah ini menjadi rumah bagi Pluto, Eris, Haumea, dan Makemake.',
  },
  voyager1: {
    name: 'Voyager 1',
    type: 'Wahana Antariksa Antarbintang',
    desc: 'Objek buatan manusia terjauh dari Bumi yang melesat menembus ruang antarbintang di luar heliosfer.',
    distance: '24,3 miliar km',
    size: '3,7 meter (antena)',
    more: 'Diluncurkan NASA pada 1977, Voyager 1 membawa Golden Record: piringan emas berisi rekaman suara, musik, dan citra peradaban Bumi. Kini ia melaju sekitar 61.000 km/jam di ruang antarbintang.',
  },
  jwst: {
    name: 'Teleskop James Webb (JWST)',
    type: 'Teleskop Antariksa (Titik L2)',
    desc: 'Teleskop inframerah antariksa terbesar manusia yang mengorbit titik Lagrange L2 di belakang Bumi.',
    distance: '1,5 juta km (dari Bumi L2)',
    size: '20,2 m x 14,2 m (perisai surya)',
    more: 'JWST mengamati alam semesta dalam spektrum inframerah dengan 18 segmen cermin heksagonal berlapis emas berdiameter total 6,5 meter untuk meneliti galaksi purba dan atmosfer eksoplanet.',
  },
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
    // Base: icy white-blue surface
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0,   '#e8f6ff');
    grad.addColorStop(0.4, '#d0ecfa');
    grad.addColorStop(0.7, '#c2e2f5');
    grad.addColorStop(1,   '#b0d5ee');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle icy patch regions (chaos terrain)
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.ellipse(
        Math.random() * width, Math.random() * height,
        25 + Math.random() * 55, 12 + Math.random() * 30,
        Math.random() * Math.PI, 0, Math.PI * 2
      );
      ctx.fillStyle = 'rgba(170, 215, 238, 0.35)';
      ctx.fill();
    }

    // Europa's famous brown/reddish linea (crack network)
    for (let i = 0; i < 80; i++) {
      let cx = Math.random() * width;
      let cy = Math.random() * height;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      const segs = 3 + Math.floor(Math.random() * 5);
      let angle = Math.random() * Math.PI * 2;
      for (let s = 0; s < segs; s++) {
        angle += (Math.random() - 0.5) * 1.2;
        const len = 15 + Math.random() * 45;
        cx += Math.cos(angle) * len;
        cy += Math.sin(angle) * len;
        ctx.lineTo(cx, cy);
      }
      const r = 110 + Math.floor(Math.random() * 50);
      const g = 55 + Math.floor(Math.random() * 35);
      const b = 25 + Math.floor(Math.random() * 25);
      ctx.lineWidth = 0.5 + Math.random() * 2.2;
      ctx.strokeStyle = `rgba(${r},${g},${b},${0.45 + Math.random() * 0.45})`;
      ctx.stroke();
    }

    // Sulfur contamination near cracks (yellowish tint patches)
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.ellipse(
        Math.random() * width, Math.random() * height,
        8 + Math.random() * 22, 5 + Math.random() * 14,
        Math.random() * Math.PI, 0, Math.PI * 2
      );
      ctx.fillStyle = 'rgba(200, 150, 80, 0.18)';
      ctx.fill();
    }

    // Bright icy spots (fresh ice / chaos terrain peaks)
    for (let i = 0; i < 35; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 2 + Math.random() * 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 252, 255, 0.8)';
      ctx.fill();
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

export default function SolarSystem3D({ initialObjectId = null, fullscreen = false }) {
  const mountRef = useRef(null);
  const selectedIdRef = useRef(
    initialObjectId && OBJECT_DATA[initialObjectId] ? initialObjectId : null
  );
  const isResettingZoomRef = useRef(false);
  const isTouch3DModeRef = useRef(true);
  const isPausedRef = useRef(false);
  const orbitSpeedRef = useRef(1);
  const isCinematicRef = useRef(false);
  const orbitRingMeshesRef = useRef([]);

  const [selectedId, setSelectedId] = useState(
    initialObjectId && OBJECT_DATA[initialObjectId] ? initialObjectId : null
  );
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTouch3DMode, setIsTouch3DMode] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [orbitSpeed, setOrbitSpeed] = useState(1);
  const [isCinematic, setIsCinematic] = useState(false);

  const toggleTouch3DMode = () => {
    const nextMode = !isTouch3DMode;
    setIsTouch3DMode(nextMode);
    isTouch3DModeRef.current = nextMode;
    if (domElemRef.current) {
      domElemRef.current.style.touchAction = nextMode ? 'none' : 'pan-y';
    }
  };

  const togglePause = () => {
    const next = !isPausedRef.current;
    isPausedRef.current = next;
    setIsPaused(next);
  };

  const cycleSpeed = () => {
    const speeds = [1, 2, 5];
    const cur = speeds.indexOf(orbitSpeedRef.current);
    const next = speeds[(cur + 1) % speeds.length];
    orbitSpeedRef.current = next;
    setOrbitSpeed(next);
  };

  const toggleCinematic = () => {
    const next = !isCinematicRef.current;
    isCinematicRef.current = next;
    setIsCinematic(next);
    orbitRingMeshesRef.current.forEach((m) => {
      m.visible = !next;
    });
  };

  const domElemRef = useRef(null);

  const handleSelectObject = (id) => {
    if (!OBJECT_DATA[id]) return;
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
    if (initialObjectId && OBJECT_DATA[initialObjectId]) {
      isResettingZoomRef.current = false;
      selectedIdRef.current = initialObjectId;
      setSelectedId(initialObjectId);
      setShowMore(false);
    }
  }, [initialObjectId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedIdRef.current) {
        selectedIdRef.current = null;
        setSelectedId(null);
        setShowMore(false);
        isResettingZoomRef.current = true;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || window.innerWidth || 800;
    const height = container.clientHeight || window.innerHeight || 700;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 6500);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      stencil: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
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

    // Mouse events with dynamic hover cursor detection
    domElem.addEventListener('mousedown', (e) => {
      dragStart(e.clientX, e.clientY);
      domElem.style.cursor = 'grabbing';
    });

    domElem.addEventListener('mousemove', (e) => {
      if (isDragging) {
        dragMove(e.clientX, e.clientY);
        domElem.style.cursor = 'grabbing';
      } else {
        const rect = domElem.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(clickableMeshes, true);
        if (intersects.length > 0 && intersects[0].object.userData.id) {
          domElem.style.cursor = 'pointer';
        } else {
          domElem.style.cursor = 'grab';
        }
      }
    });

    window.addEventListener('mouseup', () => {
      dragEnd();
      domElem.style.cursor = 'grab';
    });

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

    domElemRef.current = domElem;

    domElem.addEventListener('touchmove', (e) => {
      if (!isTouch3DModeRef.current) return;
      if (e.touches.length === 1) {
        e.preventDefault();
        dragMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2) {
        e.preventDefault();
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
    domElem.style.touchAction = isTouch3DModeRef.current ? 'none' : 'pan-y';

    // Lights — balanced for visibility + subtle day/night shading
    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    const sunLight = new THREE.PointLight(0xfff5ea, 6.0, 4000);
    scene.add(sunLight);

    // Procedural Milky Way sky dome + J2000 spectral starfield (unified with landing page)
    const isCompactViewport = window.innerWidth < 768;
    const spaceDome = attachSpaceDome(scene, renderer, {
      skyBoxSize: 3600,
      starMinRadius: 1400,
      starMaxRadius: 2100,
      pointScale: 1650,
      fillerCount: isCompactViewport ? 1400 : 2400,
      includeArmillary: false,
      cubeResolution: 512,
    });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Crisp equatorial observatory reticle ring (no hard-edged hazy sphere over planet/rings)
    const auraRingGeo = new THREE.RingGeometry(1.18, 1.22, 96);
    const auraSphereMat = new THREE.MeshBasicMaterial({
      color: 0x7cdee4,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const selectionAuraMesh = new THREE.Mesh(auraRingGeo, auraSphereMat);
    selectionAuraMesh.rotation.x = Math.PI / 2;
    selectionAuraMesh.visible = false;
    scene.add(selectionAuraMesh);

    // Sun — using real NASA texture photo
    const tLoader = new THREE.TextureLoader();
    const sunTex = tLoader.load('/textures/planets/sun.jpg');
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

    // NASA Texture Loader — real planet surface textures from Solar System Scope
    const textureLoader = new THREE.TextureLoader();
    const NASA_TEXTURES = {
      mercury: '/textures/planets/mercury.jpg',
      venus:   '/textures/planets/venus.jpg',
      earth:   '/textures/planets/earth.jpg',
      mars:    '/textures/planets/mars.jpg',
      jupiter: '/textures/planets/jupiter.jpg',
      saturn:  '/textures/planets/saturn.jpg',
      uranus:  '/textures/planets/uranus.jpg',
      neptune: '/textures/planets/neptune.jpg',
      moon:    '/textures/planets/moon.jpg',
      pluto:   '/textures/planets/pluto.jpg',
      ceres:   '/textures/planets/pluto.jpg',
      eris:    '/textures/planets/pluto.jpg',
    };
    const loadTex = (id) => NASA_TEXTURES[id]
      ? textureLoader.load(NASA_TEXTURES[id])
      : createProceduralPlanetTexture(id);

    PLANET_DEFS.forEach(([id, r, dist, color, speed]) => {
      const orbitGroup = new THREE.Group();
      scene.add(orbitGroup);

      const ringGeo = new THREE.RingGeometry(dist - 0.08, dist + 0.08, 128);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, side: THREE.DoubleSide, transparent: true, opacity: 0.45 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      scene.add(ringMesh);
      orbitRingMeshesRef.current.push(ringMesh);

      const planetGeo = new THREE.SphereGeometry(r, 32, 32);
      const pTex = loadTex(id);

      // MeshPhongMaterial gives realistic sun-side bright / dark-side shading
      const planetMat = new THREE.MeshPhongMaterial({
        map: pTex,
        shininess: 8,
        specular: new THREE.Color(0x222244),
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

        const moonTex = loadTex('moon');
        const moonMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.45, 16, 16),
          new THREE.MeshStandardMaterial({ map: moonTex, roughness: 0.7 })
        );
        moonMesh.position.set(moonDist, 0, 0);
        moonMesh.userData = { id: 'moon', clickable: true, radiusSize: 0.45 };
        moonOrbitGroup.add(moonMesh);
        clickableMeshes.push(moonMesh);

        // Click target sphere for Moon
        const moonClickGeo = new THREE.SphereGeometry(1.0, 8, 8);
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

        // Earth cloud layer — semi-transparent sphere above surface
        const cloudGeo = new THREE.SphereGeometry(1.7 + 0.07, 32, 32);
        const cloudMat = new THREE.MeshPhongMaterial({
          map: textureLoader.load('/textures/planets/earthclouds.jpg'),
          transparent: true,
          opacity: 0.38,
          depthWrite: false,
        });
        const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
        planetMesh.add(cloudMesh);
        // Slow cloud self-rotation stored separately
        cloudMesh.userData = { isClouds: true };
        orbitGroups.push({ group: new THREE.Group(), speed: 0, mesh: cloudMesh, selfSpin: 0.08 });
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

    const plutoTex = loadTex('pluto');
    const plutoMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 16, 16),
      new THREE.MeshStandardMaterial({ map: plutoTex, roughness: 0.6 })
    );
    plutoMesh.position.set(plutoDist, 0, 0);
    plutoMesh.userData = { id: 'pluto', clickable: true, radiusSize: 0.7 };
    plutoOrbit.add(plutoMesh);
    clickableMeshes.push(plutoMesh);
    orbitGroups.push({ group: plutoOrbit, speed: 0.13, mesh: plutoMesh, selfSpin: 0.2 });

    // Asteroid Belt InstancedMesh (Optimized Tetrahedron Geometry & Count)
    const asteroidGroup = new THREE.Group();
    scene.add(asteroidGroup);
    const asteroidCount = 300;
    const asteroidGeo = new THREE.TetrahedronGeometry(0.26, 0);
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

    const ceresTex = loadTex('ceres');
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
    const kuiperParticleCount = 250;
    const kuiperGeo = new THREE.TetrahedronGeometry(0.28, 0);
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

    const erisTex = loadTex('eris');
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

    // Core Nucleus — dark rocky dirty-ice (real comets are very dark)
    const nucleusGeo = new THREE.IcosahedronGeometry(0.42, 2);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x4a3f35,
      emissive: 0x8a7a6a,
      emissiveIntensity: 0.4,
      roughness: 0.9,
      metalness: 0.0,
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

    // Glowing Coma Halo — inner bright cyan-green (CN + C2 molecules)
    const emeraldComaGeo = new THREE.SphereGeometry(0.85, 24, 24);
    const emeraldComaMat = new THREE.MeshBasicMaterial({
      color: 0x55ffaa,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const emeraldComaMesh = new THREE.Mesh(emeraldComaGeo, emeraldComaMat);
    emeraldComaMesh.userData = { id: 'comet', clickable: true };
    cometMesh.add(emeraldComaMesh);
    clickableMeshes.push(emeraldComaMesh);

    // Mid coma — cyan diffuse halo
    const cyanOuterComaGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const cyanOuterComaMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const cyanOuterComaMesh = new THREE.Mesh(cyanOuterComaGeo, cyanOuterComaMat);
    cyanOuterComaMesh.userData = { id: 'comet', clickable: true };
    cometMesh.add(cyanOuterComaMesh);
    clickableMeshes.push(cyanOuterComaMesh);

    // Outer diffuse envelope
    const outerEnvGeo = new THREE.SphereGeometry(2.8, 16, 16);
    const outerEnvMat = new THREE.MeshBasicMaterial({
      color: 0x88eeff,
      transparent: true,
      opacity: 0.10,
      blending: THREE.AdditiveBlending,
    });
    cometMesh.add(new THREE.Mesh(outerEnvGeo, outerEnvMat));

    // Ion tail (blue-white, long, straight)
    const softCircleTex = createSoftCircleTexture();
    const tailParticleCount = 350;
    const tailGeo = new THREE.BufferGeometry();
    const tailPos = new Float32Array(tailParticleCount * 3);
    const tailColors = new Float32Array(tailParticleCount * 3);

    for (let i = 0; i < tailParticleCount; i++) {
      const t = i / tailParticleCount;
      const spreadWidth = t * 1.2 + 0.05;
      tailPos[i * 3]     = -t * 18 - Math.random() * 0.3;
      tailPos[i * 3 + 1] = (Math.random() - 0.5) * spreadWidth;
      tailPos[i * 3 + 2] = (Math.random() - 0.5) * spreadWidth;
      // Gradient: bright cyan-green near head → blue-white → transparent
      if (t < 0.15) {
        tailColors[i * 3] = 0.2; tailColors[i * 3+1] = 1.0; tailColors[i * 3+2] = 0.7;
      } else if (t < 0.5) {
        const f = (t - 0.15) / 0.35;
        tailColors[i * 3] = 0.2 + f * 0.6; tailColors[i * 3+1] = 0.9; tailColors[i * 3+2] = 1.0;
      } else {
        const f = (t - 0.5) / 0.5;
        tailColors[i * 3] = 0.8 + f * 0.2; tailColors[i * 3+1] = 0.9 + f * 0.1; tailColors[i * 3+2] = 1.0;
      }
    }
    tailGeo.setAttribute('position', new THREE.BufferAttribute(tailPos, 3));
    tailGeo.setAttribute('color', new THREE.BufferAttribute(tailColors, 3));
    const tailMat = new THREE.PointsMaterial({
      size: 0.38,
      map: softCircleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.80,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const tailPoints = new THREE.Points(tailGeo, tailMat);
    cometMesh.add(tailPoints);

    // Dust tail (yellowish-white, slightly spread, shorter)
    const dustCount = 120;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const t = i / dustCount;
      const spreadW = t * 2.5 + 0.1;
      dustPos[i*3]     = -t * 10 - Math.random() * 0.5;
      dustPos[i*3 + 1] = (Math.random() - 0.5) * spreadW * 0.6;
      dustPos[i*3 + 2] = (Math.random() - 0.5) * spreadW;
      const fade = 1 - t;
      dustColors[i*3]   = 1.0;
      dustColors[i*3+1] = 0.92 - t * 0.2;
      dustColors[i*3+2] = 0.7 - t * 0.3;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.28, map: softCircleTex, vertexColors: true,
      transparent: true, opacity: 0.50,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    cometMesh.add(new THREE.Points(dustGeo, dustMat));

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

    // IntersectionObserver Auto-Pause for Solar System 3D
    let isVisible = true;
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(container);
    }

    // Continuous Animation Loop (60 FPS Cap & Auto-Pause when off-screen)
    const clock = new THREE.Clock();
    let animId;
    let lastRenderTime = performance.now();

    const animate = (now) => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return; // AUTO PAUSE WHEN SCROLLED OUT OF VIEWPORT! Saves 80% GPU!

      const deltaMs = now - lastRenderTime;
      if (deltaMs < 15) return; // CAP AT MAX 60 FPS (approx 16.6ms per frame)
      lastRenderTime = now;

      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      // Respect pause & speed controls
      const eff = isPausedRef.current ? 0 : dt * orbitSpeedRef.current;

      sunMesh.rotation.y += dt * 0.2; // sun always rotates for aesthetics

      orbitGroups.forEach(o => {
        o.group.rotation.y += eff * o.speed * 0.3;
        o.mesh.rotation.y += eff * o.selfSpin;

        if (o.group.userData.moonGroup) {
          o.group.userData.moonGroup.rotation.y += eff * 1.5;
        }
        if (o.group.userData.jwstGroup) {
          o.group.userData.jwstGroup.rotation.y += eff * 0.9;
        }
        if (o.group.userData.phobosGroup) {
          o.group.userData.phobosGroup.rotation.y += eff * 2.8;
        }
        if (o.group.userData.deimosGroup) {
          o.group.userData.deimosGroup.rotation.y += eff * 1.5;
        }
        if (o.group.userData.europaGroup) {
          o.group.userData.europaGroup.rotation.y += eff * 1.8;
        }
        if (o.group.userData.ganymedeGroup) {
          o.group.userData.ganymedeGroup.rotation.y += eff * 1.2;
        }
        if (o.group.userData.titanGroup) {
          o.group.userData.titanGroup.rotation.y += eff * 1.4;
        }
      });

      // Rotate Phase 2 & 3 objects
      ceresOrbitGroup.rotation.y += eff * 0.28;
      erisOrbitGroup.rotation.y += eff * 0.1;
      kuiperInstMesh.rotation.y += eff * 0.02;
      voyagerOrbitGroup.rotation.y += eff * 0.04;
      voyagerMesh.rotation.y += eff * 0.2;

      asteroidInstMesh.rotation.y += eff * 0.05;

      // Comet Orbit Motion
      cometT += eff * 0.08;
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
            if (currentSelectedId === 'saturn') { offset = 15; baseRadius = 7.4; }
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

      spaceDome.update(reducedMotion ? 0 : time);
      controls.update();
      renderer.render(scene, camera);
    };

    setIsLoading(false);
    animate(performance.now());

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth || 800;
      const h = container.clientHeight || window.innerHeight || 700;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (observer) observer.disconnect();
      cancelAnimationFrame(animId);
      domElem.removeEventListener('wheel', handleWheel);
      domElem.removeEventListener('mousedown', handleMouseDown);
      domElem.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseup', dragEnd);
      window.removeEventListener('resize', handleResize);
      spaceDome.dispose();
      renderer.dispose();
      if (container && domElem && container.contains(domElem)) {
        container.removeChild(domElem);
      }
    };
  }, []);

  const activeData = selectedId ? OBJECT_DATA[selectedId] : null;

  return (
    <div
      className={`relative w-full overflow-hidden bg-space-black ${
        fullscreen
          ? 'h-dvh'
          : 'h-[480px] sm:h-[600px] md:h-[700px] rounded-xl border border-white/12'
      }`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-space-black z-50 flex items-center justify-center text-cyan-glow font-mono text-xs tracking-wider">
          Memuat observatorium Tata Surya 3D...
        </div>
      )}

      {/* 3D Canvas mount */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Top Floating Observatory Bar */}
      <div className="absolute top-0 left-0 w-full px-4 sm:px-6 py-4 pointer-events-none z-20 flex flex-wrap items-center justify-between gap-3">
        <div className="pointer-events-auto flex items-center gap-3">
          {fullscreen ? (
            <Link
              href="/"
              className="min-h-[40px] px-3.5 rounded-lg border border-white/15 bg-space-black/75 backdrop-blur-md text-ink-primary hover:border-cyan-glow transition-colors inline-flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-glow" aria-hidden="true" />
              <StellarumLogo size={18} className="text-cyan-glow" />
              <span className="font-display font-bold tracking-[0.08em] uppercase text-xs sm:text-sm">
                Stellarum
              </span>
            </Link>
          ) : (
            <div className="px-3.5 py-2 rounded-lg border border-white/12 bg-space-black/75 backdrop-blur-md">
              <h2 className="font-display text-sm sm:text-base font-bold text-ink-primary">
                Observatorium Tata Surya 3D
              </h2>
            </div>
          )}

          <span className="hidden lg:inline-block text-xs text-ink-secondary bg-space-black/65 border border-white/10 rounded-lg px-3 py-2">
            Klik objek untuk fokus, seret untuk memutar, gulir untuk zoom
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 flex-wrap justify-end">
          <button
            type="button"
            onClick={togglePause}
            aria-label={isPaused ? 'Lanjutkan simulasi orbit' : 'Jeda simulasi orbit'}
            className={`min-h-[40px] px-3 rounded-lg text-xs font-semibold border backdrop-blur-md transition-colors inline-flex items-center gap-1.5 ${
              isPaused
                ? 'bg-cyan-glow/15 border-cyan-glow text-cyan-glow'
                : 'bg-space-black/75 border-white/15 text-ink-primary hover:border-cyan-glow/60'
            }`}
          >
            {isPaused ? (
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Pause className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{isPaused ? 'Lanjut' : 'Jeda'}</span>
          </button>

          <button
            type="button"
            onClick={cycleSpeed}
            aria-label={`Kecepatan orbit saat ini ${orbitSpeed} kali`}
            className="min-h-[40px] px-3 rounded-lg text-xs font-mono font-medium border border-white/15 bg-space-black/75 backdrop-blur-md text-ink-primary hover:border-cyan-glow/60 transition-colors inline-flex items-center gap-1.5 tabular-nums"
          >
            <Gauge className="w-3.5 h-3.5 text-cyan-glow" aria-hidden="true" />
            <span>{orbitSpeed}x</span>
          </button>

          <button
            type="button"
            onClick={toggleCinematic}
            aria-label={isCinematic ? 'Tampilkan garis orbit' : 'Sembunyikan garis orbit'}
            className={`min-h-[40px] px-3 rounded-lg text-xs font-semibold border backdrop-blur-md transition-colors inline-flex items-center gap-1.5 ${
              isCinematic
                ? 'bg-amber-star/15 border-amber-star text-amber-star'
                : 'bg-space-black/75 border-white/15 text-ink-primary hover:border-cyan-glow/60'
            }`}
          >
            {isCinematic ? (
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{isCinematic ? 'Orbit' : 'Sinematik'}</span>
          </button>

          {selectedId && (
            <button
              type="button"
              onClick={handleClosePanel}
              aria-label="Kembali ke tampilan penuh Tata Surya"
              className="min-h-[40px] px-3 rounded-lg text-xs font-semibold border border-white/15 bg-space-black/75 backdrop-blur-md text-ink-primary hover:border-cyan-glow/60 transition-colors inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-glow" aria-hidden="true" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          {!fullscreen && (
            <button
              type="button"
              onClick={toggleTouch3DMode}
              aria-label={isTouch3DMode ? 'Beralih ke mode gulir halaman' : 'Aktifkan kontrol sentuh 3D'}
              className={`md:hidden min-h-[40px] px-3 rounded-lg text-xs font-semibold border backdrop-blur-md transition-colors inline-flex items-center gap-1.5 ${
                isTouch3DMode
                  ? 'bg-cyan-glow/15 border-cyan-glow text-cyan-glow'
                  : 'bg-space-black/75 border-white/15 text-ink-primary'
              }`}
            >
              {isTouch3DMode ? (
                <Unlock className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>{isTouch3DMode ? '3D' : 'Gulir'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Split-View Detail Drawer */}
      {activeData && (
        <aside
          aria-label={`Detail ${activeData.name}`}
          className="animate-panel-slide-in absolute top-20 right-4 sm:right-6 w-[340px] max-w-[calc(100vw-2rem)] max-h-[calc(100%-10rem)] overflow-y-auto rounded-xl border border-cyan-glow/25 bg-space-abyss/85 backdrop-blur-md p-5 sm:p-6 text-ink-primary z-20"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <span className="font-mono text-xs text-amber-star block mb-1">
                {activeData.type}
              </span>
              <h3 className="font-display text-2xl font-bold text-ink-primary leading-tight">
                {activeData.name}
              </h3>
            </div>

            <button
              type="button"
              onClick={handleClosePanel}
              aria-label={`Tutup panel detail ${activeData.name}`}
              className="min-w-[36px] min-h-[36px] rounded-lg border border-white/15 bg-space-black/60 hover:border-cyan-glow text-ink-secondary hover:text-ink-primary flex items-center justify-center transition-colors shrink-0"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <p className="text-sm leading-relaxed text-ink-secondary mb-4">
            {activeData.desc}
          </p>

          <dl className="grid grid-cols-2 gap-2.5 mb-4">
            <div className="rounded-lg p-3 border border-white/10 bg-space-black/60">
              <dt className="font-mono text-[11px] text-ink-muted">Jarak</dt>
              <dd className="font-mono text-xs sm:text-sm text-ink-primary font-medium mt-1 tabular-nums">
                {activeData.distance}
              </dd>
            </div>
            <div className="rounded-lg p-3 border border-white/10 bg-space-black/60">
              <dt className="font-mono text-[11px] text-ink-muted">Diameter</dt>
              <dd className="font-mono text-xs sm:text-sm text-ink-primary font-medium mt-1 tabular-nums">
                {activeData.size}
              </dd>
            </div>
          </dl>

          {showMore && (
            <div className="mb-4 text-xs sm:text-sm leading-relaxed text-ink-secondary bg-space-black/55 p-3.5 rounded-lg border border-white/10">
              {activeData.more}
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            aria-expanded={showMore}
            className="w-full min-h-[44px] rounded-lg bg-cyan-glow text-space-navy text-xs font-bold hover:bg-ink-primary transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{showMore ? 'Sembunyikan detail' : 'Baca catatan ilmiah'}</span>
            {showMore ? (
              <ChevronUp className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </aside>
      )}

      {/* Bottom Quick-Jump Observatory Switcher */}
      <nav
        aria-label="Pemilih cepat objek Tata Surya"
        className="absolute bottom-4 left-0 right-0 px-4 sm:px-6 z-20 pointer-events-none flex justify-center"
      >
        <div className="pointer-events-auto max-w-full overflow-x-auto rounded-xl border border-white/15 bg-space-black/80 backdrop-blur-md p-1.5 flex items-center gap-1">
          {QUICK_JUMP_OBJECTS.map((obj) => {
            const isActive = selectedId === obj.id;
            return (
              <button
                key={obj.id}
                type="button"
                onClick={() => handleSelectObject(obj.id)}
                aria-pressed={isActive}
                className={`min-h-[38px] px-3 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-cyan-glow text-space-navy font-bold'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-white/[0.06]'
                }`}
              >
                {obj.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
