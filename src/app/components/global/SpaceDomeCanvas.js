'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { attachSpaceDome } from '@/app/lib/celestialMath';

/**
 * Fixed full-viewport procedural Milky Way SpaceDome backdrop matching
 * Twelve Skies' observatory sky. Sleeps when the tab is hidden and stops
 * drift/twinkle under prefers-reduced-motion.
 */
export default function SpaceDomeCanvas() {
  const containerRef = useRef(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        stencil: false,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCompact = window.innerWidth < 768;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setClearColor(0x000000, 1);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / Math.max(window.innerHeight, 1),
      0.1,
      400
    );
    camera.position.set(0, 0, 0.1);
    camera.lookAt(0, 0, 0);

    const dome = attachSpaceDome(scene, renderer, {
      skyBoxSize: 260,
      starMinRadius: 96,
      starMaxRadius: 132,
      pointScale: 115,
      fillerCount: isCompact ? 1300 : 2300,
      includeArmillary: true,
      armillaryRadius: 54,
      cubeResolution: 512,
    });

    // Align galactic plane nicely across the viewport diagonal
    dome.group.rotation.set(0.22, -0.45, 0.08);

    let scrollProgress = 0;
    let currentYaw = -0.45;
    let currentPitch = 0.22;
    let cachedMaxScroll = 1;

    const recalcMaxScroll = () => {
      cachedMaxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
    };

    const updateScroll = () => {
      scrollProgress = Math.max(0, Math.min(1, window.scrollY / cachedMaxScroll));
    };

    recalcMaxScroll();
    updateScroll();

    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = window.requestAnimationFrame(animate);
      if (document.visibilityState === 'hidden') return;

      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      const targetYaw = -0.45 - scrollProgress * 0.34 - elapsed * 0.008;
      const targetPitch = 0.22 + scrollProgress * 0.1;
      const alpha = 1 - Math.exp(-3.5 * dt);
      currentYaw += (targetYaw - currentYaw) * alpha;
      currentPitch += (targetPitch - currentPitch) * alpha;

      dome.group.rotation.y = currentYaw;
      dome.group.rotation.x = currentPitch;
      dome.update(elapsed);
      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (animId || reducedMotion) return;
      clock.getDelta();
      animId = window.requestAnimationFrame(animate);
    };

    const stopLoop = () => {
      if (animId) {
        window.cancelAnimationFrame(animId);
        animId = 0;
      }
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = Math.max(window.innerHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      recalcMaxScroll();
      updateScroll();
      if (reducedMotion) {
        renderer.render(scene, camera);
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        stopLoop();
      } else {
        startLoop();
      }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    if (reducedMotion) {
      dome.update(0);
      renderer.render(scene, camera);
    } else {
      startLoop();
    }

    return () => {
      stopLoop();
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      dome.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-space-black"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-space-black"
    />
  );
}
