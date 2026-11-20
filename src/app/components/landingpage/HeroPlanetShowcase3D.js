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
 *
 * Performance optimizations:
 * - Single WebGLRenderer context reused across all planet selections (zero context thrashing).
 * - Animation loop automatically pauses when off-screen or tab is backgrounded.
 * - Smooth texture and material swaps without DOM or GPU recreation.
 */
export default function HeroPlanetShowcase3D({ body }) {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const stateRef = useRef(null);

  // Setup single WebGL canvas & scene once on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
    camera.position.set(0, 0.15, 3.55);
    camera.lookAt(0, 0, 0);

    const ambient = new THREE.AmbientLight(0xdbeafe, 0.55);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff6e9, 2.3);
    keyLight.position.set(5, 3.2, 4.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7cdee4, 0.75);
    rimLight.position.set(-4.5, -2.0, -3.5);
    scene.add(rimLight);

    const group = new THREE.Group();
    scene.add(group);

    const disposables = [];

    // Planet sphere
    const sphereGeo = new THREE.SphereGeometry(1.18, 64, 64);
    const sphereStandardMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.82,
      metalness: 0.04,
    });
    const sphereBasicMat = new THREE.MeshBasicMaterial({
      color: 0xffd166,
    });
    disposables.push(sphereGeo, sphereStandardMat, sphereBasicMat);

    const sphereMesh = new THREE.Mesh(sphereGeo, sphereStandardMat);
    group.add(sphereMesh);

    // Clouds sphere
    const cloudsGeo = new THREE.SphereGeometry(1.205, 48, 48);
    const cloudsMat = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.42,
      roughness: 0.9,
      depthWrite: false,
    });
    disposables.push(cloudsGeo, cloudsMat);
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    cloudsMesh.visible = false;
    group.add(cloudsMesh);

    // Sun Corona
    const coronaGeo = new THREE.SphereGeometry(1.36, 40, 40);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xfec42d,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(coronaGeo, coronaMat);
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    coronaMesh.visible = false;
    group.add(coronaMesh);

    // Saturn Ring
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
    ringMesh.visible = false;
    group.add(ringMesh);

    // Equatorial reticle ring
    const reticleGeo = new THREE.RingGeometry(1.54, 1.555, 96);
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

    // Interaction state
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

    let isVisible = true;
    let animId = 0;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      renderer.render(scene, camera);
    };

    const loop = () => {
      animId = window.requestAnimationFrame(loop);
      if (!isVisible || document.visibilityState === 'hidden') return;
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!isDragging) {
        sphereMesh.rotation.y += dt * 0.16;
        if (cloudsMesh.visible) cloudsMesh.rotation.y += dt * 0.21;
      }
      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (animId || reducedMotion) return;
      clock.getDelta(); // flush delta
      animId = window.requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      if (animId) {
        window.cancelAnimationFrame(animId);
        animId = 0;
      }
    };

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
      renderer,
      scene,
      camera,
      ambient,
      keyLight,
      group,
      sphereMesh,
      sphereStandardMat,
      sphereBasicMat,
      cloudsMesh,
      cloudsMat,
      coronaMesh,
      ringMesh,
      ringMat,
      reticle,
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
      dom.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('resize', handleResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (container && dom && container.contains(dom)) {
        container.removeChild(dom);
      }
      stateRef.current = null;
    };
  }, []);

  // Update object appearance without recreating the WebGL context
  useEffect(() => {
    const s = stateRef.current;
    if (!s || !body) return;

    const {
      camera,
      ambient,
      keyLight,
      group,
      sphereMesh,
      sphereStandardMat,
      sphereBasicMat,
      cloudsMesh,
      cloudsMat,
      coronaMesh,
      ringMesh,
      ringMat,
      reticle,
      renderFrame,
    } = s;

    // Camera framing based on body scale and rings
    const isSaturn = body.id === 'saturn';
    const isSun = body.kind === 'sun';

    camera.position.set(0, isSaturn ? 0.55 : 0.15, isSaturn ? 5.1 : 3.55);
    camera.lookAt(0, 0, 0);

    // Light adjustments
    ambient.intensity = isSun ? 1.8 : 0.55;
    keyLight.intensity = isSun ? 1.0 : 2.3;

    // Axial tilt
    if (body.id === 'earth') group.rotation.z = 0.41;
    else if (body.id === 'saturn') group.rotation.z = 0.44;
    else if (body.id === 'mars') group.rotation.z = 0.43;
    else group.rotation.z = 0;

    // Material selection
    if (isSun) {
      sphereMesh.material = sphereBasicMat;
      loadCachedTexture(body.texture, (tex) => {
        sphereBasicMat.map = tex;
        sphereBasicMat.needsUpdate = true;
        setReady(true);
        renderFrame();
      });
    } else {
      sphereMesh.material = sphereStandardMat;
      loadCachedTexture(body.texture, (tex) => {
        sphereStandardMat.map = tex;
        sphereStandardMat.color.setHex(0xffffff);
        sphereStandardMat.needsUpdate = true;
        setReady(true);
        renderFrame();
      });
    }

    // Clouds
    if (body.clouds) {
      cloudsMesh.visible = true;
      loadCachedTexture(body.clouds, (tex) => {
        cloudsMat.map = tex;
        cloudsMat.alphaMap = tex;
        cloudsMat.needsUpdate = true;
        renderFrame();
      });
    } else {
      cloudsMesh.visible = false;
    }

    // Sun Corona
    coronaMesh.visible = isSun;

    // Saturn Ring
    if (body.ringTexture) {
      ringMesh.visible = true;
      loadCachedTexture(body.ringTexture, (tex) => {
        ringMat.map = tex;
        ringMat.needsUpdate = true;
        renderFrame();
      });
    } else {
      ringMesh.visible = false;
    }

    // Reticle scale
    const reticleScale = isSaturn ? 2.59 / 1.55 : 1;
    reticle.scale.set(reticleScale, reticleScale, reticleScale);

    setReady(true);
    renderFrame();
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
