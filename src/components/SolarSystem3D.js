'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function SolarSystem3D() {
  const containerRef = useRef(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 25, 45);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xfff5ea, 2.5, 300);
    scene.add(sunLight);

    // 3D Starfield Background Particles
    const starCount = 2000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 300;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.6,
      transparent: true,
      opacity: 0.8,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Sun
    const sunGeometry = new THREE.SphereGeometry(3.5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      wireframe: false,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Sun Glow Corona
    const glowGeometry = new THREE.SphereGeometry(4.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide,
    });
    const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(sunGlow);

    // Planets Data Definition
    const planetData = [
      { name: 'Merkurius', radius: 0.6, distance: 7, speed: 0.03, color: 0xa6a6a6, info: 'Planet terkecil dan terdekat dengan Matahari.' },
      { name: 'Venus', radius: 0.9, distance: 10, speed: 0.02, color: 0xe3bb76, info: 'Planet terpanas di Tata Surya dengan atmosfer tebal.' },
      { name: 'Bumi', radius: 1.0, distance: 14, speed: 0.015, color: 0x22d3ee, info: 'Rumah bagi kehidupan dengan lautan air cair.' },
      { name: 'Mars', radius: 0.7, distance: 18, speed: 0.012, color: 0xef4444, info: 'Planet Merah dengan gunung berapi raksasa Olympus Mons.' },
      { name: 'Jupiter', radius: 2.2, distance: 24, speed: 0.008, color: 0xf59e0b, info: 'Planet terbesar dengan Badai Merah Raksasa.' },
      { name: 'Saturnus', radius: 1.8, distance: 31, speed: 0.006, color: 0xeab308, hasRing: true, info: 'Planet anggun yang dikelilingi cincin es megah.' },
      { name: 'Uranus', radius: 1.3, distance: 37, speed: 0.004, color: 0x06b6d4, info: 'Raksasa es dengan rotasi miring secara ekstrim.' },
      { name: 'Neptunus', radius: 1.2, distance: 43, speed: 0.003, color: 0x3b82f6, info: 'Planet terluar dengan angin kencang berkecepatan supersonik.' }
    ];

    const planetMeshes = [];

    planetData.forEach((pd) => {
      // Orbit Line
      const orbitGeometry = new THREE.RingGeometry(pd.distance - 0.05, pd.distance + 0.05, 64);
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.15,
      });
      const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbitMesh.rotation.x = Math.PI / 2;
      scene.add(orbitMesh);

      // Planet Mesh
      const geom = new THREE.SphereGeometry(pd.radius, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: pd.color,
        roughness: 0.6,
        metalness: 0.2,
      });
      const mesh = new THREE.Mesh(geom, mat);
      scene.add(mesh);

      // Saturn Ring
      if (pd.hasRing) {
        const ringGeom = new THREE.RingGeometry(pd.radius + 0.5, pd.radius + 1.8, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xfde047,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
        });
        const ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        mesh.add(ringMesh);
      }

      mesh.userData = { ...pd, angle: Math.random() * Math.PI * 2 };
      planetMeshes.push(mesh);
    });

    // Mouse Interaction Handling (Drag to Rotate View)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      scene.rotation.y += deltaX * 0.005;
      scene.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Raycaster for Clicking Planets
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e) => {
      const rect = domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshes);

      if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object.userData;
        setSelectedPlanet(clickedPlanet);
      }
    };
    domElement.addEventListener('click', handleClick);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate Sun & Glow
      sun.rotation.y += 0.002;
      sunGlow.rotation.y -= 0.001;

      // Orbit Planets
      planetMeshes.forEach((mesh) => {
        mesh.userData.angle += mesh.userData.speed * 0.5;
        mesh.position.x = Math.cos(mesh.userData.angle) * mesh.userData.distance;
        mesh.position.z = Math.sin(mesh.userData.angle) * mesh.userData.distance;
        mesh.rotation.y += 0.01;
      });

      // Slowly rotate starfield
      starField.rotation.y += 0.0002;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && domElement) {
        containerRef.current.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '550px', borderRadius: '16px', overflow: 'hidden' }} className="glass-panel">
      {!isLoaded && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee' }}>
          Memuat Simulasi 3D Three.js...
        </div>
      )}
      <div ref={containerRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />

      {/* Control overlay instruction */}
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '12px', color: '#9aa3c4', background: 'rgba(0,0,0,0.6)', padding: '6px 12px', borderRadius: '8px' }}>
        🖱️ Putar: Klik & Tahan Drag | 🪐 Klik Planet untuk Informasi
      </div>

      {/* Planet Info Modal Card */}
      {selectedPlanet && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '280px',
          padding: '16px',
          background: 'rgba(15, 15, 20, 0.95)',
          border: '1px solid #22d3ee',
          borderRadius: '12px',
          color: '#ffffff',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ margin: 0, color: '#22d3ee', fontSize: '18px' }}>{selectedPlanet.name}</h3>
            <button
              onClick={() => setSelectedPlanet(null)}
              style={{ background: 'none', border: 'none', color: '#9aa3c4', cursor: 'pointer', fontSize: '16px' }}
            >
              ✕
            </button>
          </div>
          <p style={{ fontSize: '13px', color: '#9aa3c4', margin: 0, lineHeight: 1.5 }}>
            {selectedPlanet.info}
          </p>
          <div style={{ marginTop: '12px', fontSize: '12px', display: 'flex', gap: '8px' }}>
            <span style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee', padding: '4px 8px', borderRadius: '6px' }}>
              Jarak Orbit: {selectedPlanet.distance} AU
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
