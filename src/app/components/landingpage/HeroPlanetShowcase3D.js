'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const textureCache = new Map();

function loadCachedTexture(path, onLoad) {
  if (!path) return;
  if (textureCache.has(path)) {
    onLoad(textureCache.get(path));
    return;
  }
  textureLoader.load(
    path,
    (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      textureCache.set(path, tex);
      onLoad(tex);
    },
    undefined,
    () => {}
  );
}

/**
 * Single transparent Three.js showcase canvas that renders the active hero
 * celestial body directly over the global SpaceDome Milky Way backdrop.
 */
export default function HeroPlanetShowcase3D({ body }) {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !body) return;

    setReady(false);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const width = container.clientWidth || 420;
    const height = container.clientHeight || 420;

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
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / Math.max(height, 1), 0.1, 100);
    camera.position.set(0, body.id === 'saturn' ? 0.55 : 0.15, body.id === 'saturn' ? 5.1 : 3.55);
    camera.lookAt(0, 0, 0);

    const ambient = new THREE.AmbientLight(0xdbeafe, body.kind === 'sun' ? 1.8 : 0.55);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff6e9, body.kind === 'sun' ? 1.0 : 2.3);
    keyLight.position.set(5, 3.2, 4.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7cdee4, 0.75);
    rimLight.position.set(-4.5, -2.0, -3.5);
    scene.add(rimLight);

    const group = new THREE.Group();
    if (body.id === 'earth') group.rotation.z = 0.41;
    if (body.id === 'saturn') group.rotation.z = 0.44;
    if (body.id === 'mars') group.rotation.z = 0.43;
    scene.add(group);

    const disposables = [];
    const sphereGeo = new THREE.SphereGeometry(1.18, 64, 64);
    disposables.push(sphereGeo);

    const sphereMat =
      body.kind === 'sun'
        ? new THREE.MeshBasicMaterial({ color: 0xffd166 })
        : new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.82,
            metalness: 0.04,
          });
    disposables.push(sphereMat);

    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphereMesh);

    loadCachedTexture(body.texture, (tex) => {
      sphereMat.map = tex;
      sphereMat.color.setHex(0xffffff);
      sphereMat.needsUpdate = true;
      setReady(true);
    });

    let cloudsMesh = null;
    if (body.clouds) {
      const cloudsGeo = new THREE.SphereGeometry(1.205, 48, 48);
      const cloudsMat = new THREE.MeshStandardMaterial({
        transparent: true,
        opacity: 0.42,
        roughness: 0.9,
        depthWrite: false,
      });
      disposables.push(cloudsGeo, cloudsMat);
      cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
      group.add(cloudsMesh);
      loadCachedTexture(body.clouds, (tex) => {
        cloudsMat.map = tex;
        cloudsMat.alphaMap = tex;
        cloudsMat.needsUpdate = true;
      });
    }

    if (body.kind === 'sun') {
      const coronaGeo = new THREE.SphereGeometry(1.36, 40, 40);
      const coronaMat = new THREE.MeshBasicMaterial({
        color: 0xfec42d,
        transparent: true,
        opacity: 0.22,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      });
      disposables.push(coronaGeo, coronaMat);
      group.add(new THREE.Mesh(coronaGeo, coronaMat));
    }

    if (body.ringTexture) {
      const ringGeo = new THREE.RingGeometry(1.42, 2.38, 96);
      const pos = ringGeo.attributes.position;
      const uvs = ringGeo.attributes.uv;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        const r = Math.hypot(vx, vy);
        const u = (r - 1.42) / (2.38 - 1.42);
        uvs.setXY(i, u, 0.5);
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
      ringMesh.rotation.x = Math.PI / 2;
      group.add(ringMesh);

      loadCachedTexture(body.ringTexture, (tex) => {
        ringMat.map = tex;
        ringMat.needsUpdate = true;
      });
    }

    // Subtle observatory equatorial measurement ring
    const reticleGeo = new THREE.RingGeometry(
      body.id === 'saturn' ? 2.58 : 1.54,
      body.id === 'saturn' ? 2.6 : 1.555,
      96
    );
    const reticleMat = new THREE.MeshBasicMaterial({
      color: 0x7cdee4,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
    });
    disposables.push(reticleGeo, reticleMat);
    const reticle = new THREE.Mesh(reticleGeo, reticleMat);
    reticle.rotation.x = Math.PI / 2;
    group.add(reticle);

    // Drag to rotate interaction
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      container.style.cursor = 'grabbing';
    };
    const onMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      group.rotation.y += dx * 0.008;
      group.rotation.x = Math.max(-0.7, Math.min(0.7, group.rotation.x + dy * 0.006));
      prevX = e.clientX;
      prevY = e.clientY;
      if (reducedMotion) renderer.render(scene, camera);
    };
    const onUp = () => {
      isDragging = false;
      container.style.cursor = 'grab';
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    let isVisible = true;
    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              isVisible = entry.isIntersecting;
            },
            { threshold: 0.05 }
          )
        : null;
    if (observer) observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 420;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = window.requestAnimationFrame(animate);
      if (!isVisible || document.visibilityState === 'hidden') return;
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!isDragging) {
        sphereMesh.rotation.y += dt * 0.16;
        if (cloudsMesh) cloudsMesh.rotation.y += dt * 0.21;
      }
      renderer.render(scene, camera);
    };

    renderer.render(scene, camera);
    setReady(true);
    if (!reducedMotion) {
      animate();
    }

    return () => {
      if (animId) window.cancelAnimationFrame(animId);
      if (observer) observer.disconnect();
      dom.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('resize', handleResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (container && dom && container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [body]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={`Model 3D interaktif ${body.name}. Seret untuk memutar.`}
      className={`w-full h-[300px] sm:h-[380px] lg:h-[460px] cursor-grab active:cursor-grabbing transition-opacity duration-300 ${
        ready ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
