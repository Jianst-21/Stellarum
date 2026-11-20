import * as THREE from 'three';
import { BRIGHT_STARS } from '@/app/data/brightStars';

function normalizeVec3(v) {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

function crossVec3(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function createMulberry32(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function celestialToCartesian(raHours, decDeg, radius) {
  const raRad = (raHours * 15 * Math.PI) / 180;
  const decRad = (decDeg * Math.PI) / 180;
  const cosDec = Math.cos(decRad);
  return [
    radius * cosDec * Math.cos(raRad),
    radius * Math.sin(decRad),
    -radius * cosDec * Math.sin(raRad),
  ];
}

export function bvToSpectralColor(bv) {
  const clamped = Math.max(-0.3, Math.min(2.0, bv));
  if (clamped < 0.0) {
    const t = (clamped + 0.3) / 0.3;
    return [0.68 + 0.24 * t, 0.82 + 0.14 * t, 1.0];
  }
  if (clamped < 0.4) {
    const t = clamped / 0.4;
    return [0.92 + 0.08 * t, 0.96 + 0.02 * t, 1.0 - 0.06 * t];
  }
  if (clamped < 1.0) {
    const t = (clamped - 0.4) / 0.6;
    return [1.0, 0.98 - 0.11 * t, 0.94 - 0.28 * t];
  }
  const t = (clamped - 1.0) / 1.0;
  return [1.0, 0.87 - 0.21 * t, 0.66 - 0.24 * t];
}

const SPECTRAL_COLORS = [
  [0.72, 0.85, 1.0],
  [0.95, 0.97, 1.0],
  [1.0, 0.96, 0.88],
  [1.0, 0.86, 0.64],
  [0.54, 0.89, 0.95],
];

export function generateSpectralStarfield(count, minRadius, maxRadius, seed = 12026) {
  const rand = createMulberry32(seed);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);

  const gNormal = normalizeVec3([-0.868, 0.456, 0.197]);
  const gTangentA = normalizeVec3(crossVec3(gNormal, [0, 1, 0]));
  const gTangentB = normalizeVec3(crossVec3(gNormal, gTangentA));

  for (let i = 0; i < count; i++) {
    let dir;
    if (rand() < 0.55) {
      const azimuth = rand() * Math.PI * 2;
      const bandSpread = ((rand() + rand() + rand()) / 3 - 0.5) * 0.62;
      const cosA = Math.cos(azimuth);
      const sinA = Math.sin(azimuth);
      dir = normalizeVec3([
        gTangentA[0] * cosA + gTangentB[0] * sinA + gNormal[0] * bandSpread,
        gTangentA[1] * cosA + gTangentB[1] * sinA + gNormal[1] * bandSpread,
        gTangentA[2] * cosA + gTangentB[2] * sinA + gNormal[2] * bandSpread,
      ]);
    } else {
      const u = rand();
      const v = rand();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      dir = [
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      ];
    }

    const r = minRadius + rand() * (maxRadius - minRadius);
    positions[i * 3] = dir[0] * r;
    positions[i * 3 + 1] = dir[1] * r;
    positions[i * 3 + 2] = dir[2] * r;

    const paletteRoll = rand();
    const color =
      paletteRoll < 0.25
        ? SPECTRAL_COLORS[0]
        : paletteRoll < 0.62
        ? SPECTRAL_COLORS[1]
        : paletteRoll < 0.84
        ? SPECTRAL_COLORS[2]
        : paletteRoll < 0.94
        ? SPECTRAL_COLORS[3]
        : SPECTRAL_COLORS[4];

    const brightness = 0.65 + rand() * 0.35;
    colors[i * 3] = color[0] * brightness;
    colors[i * 3 + 1] = color[1] * brightness;
    colors[i * 3 + 2] = color[2] * brightness;

    const mag = Math.pow(rand(), 3.2);
    sizes[i] = 1.0 + mag * 3.4;
    phases[i] = rand() * Math.PI * 2;
  }

  return { positions, colors, sizes, phases };
}

export function generateRealCatalogStarfield(
  catalogStars = BRIGHT_STARS,
  fillerCount = 2200,
  minRadius = 96,
  maxRadius = 132,
  seed = 12026
) {
  const rand = createMulberry32(seed);
  const catalogCount = catalogStars.length;
  const totalCount = catalogCount + fillerCount;

  const positions = new Float32Array(totalCount * 3);
  const colors = new Float32Array(totalCount * 3);
  const sizes = new Float32Array(totalCount);
  const phases = new Float32Array(totalCount);

  for (let i = 0; i < catalogCount; i++) {
    const star = catalogStars[i];
    const r = minRadius + 2 + rand() * 8;
    const pos = celestialToCartesian(star.ra, star.dec, r);
    positions[i * 3] = pos[0];
    positions[i * 3 + 1] = pos[1];
    positions[i * 3 + 2] = pos[2];

    const spectral = bvToSpectralColor(star.bv);
    const normMag = Math.max(0.08, Math.min(1.0, (5.0 - star.mag) / 6.5));
    const brightness = 0.68 + normMag * 0.32;
    colors[i * 3] = spectral[0] * brightness;
    colors[i * 3 + 1] = spectral[1] * brightness;
    colors[i * 3 + 2] = spectral[2] * brightness;

    sizes[i] = 1.65 + Math.pow(normMag, 1.55) * 3.65;
    phases[i] = rand() * Math.PI * 2;
  }

  const filler = generateSpectralStarfield(
    fillerCount,
    minRadius + 6,
    maxRadius,
    seed ^ 0x5f3759df
  );

  for (let i = 0; i < fillerCount; i++) {
    const outIdx = catalogCount + i;
    positions[outIdx * 3] = filler.positions[i * 3];
    positions[outIdx * 3 + 1] = filler.positions[i * 3 + 1];
    positions[outIdx * 3 + 2] = filler.positions[i * 3 + 2];

    colors[outIdx * 3] = filler.colors[i * 3] * 0.72;
    colors[outIdx * 3 + 1] = filler.colors[i * 3 + 1] * 0.72;
    colors[outIdx * 3 + 2] = filler.colors[i * 3 + 2] * 0.72;

    sizes[outIdx] = Math.min(2.2, filler.sizes[i] * 0.68);
    phases[outIdx] = filler.phases[i];
  }

  return { positions, colors, sizes, phases };
}

const SKY_VERTEX_SHADER = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SKY_BAKE_FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vDir;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.11, 0.17, 0.23));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(
        mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x),
        f.y
      ),
      mix(
        mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x),
        f.y
      ),
      f.z
    );
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amp * noise(p);
      p *= 2.04;
      amp *= 0.5;
    }
    return value;
  }

  void main() {
    vec3 dir = normalize(vDir);

    float horizon = exp(-abs(dir.y) * 2.6);
    vec3 baseSky = mix(vec3(0.0, 0.0, 0.0), vec3(0.012, 0.025, 0.085), horizon * 0.72);

    vec3 galacticNormal = normalize(vec3(-0.868, 0.456, 0.197));
    float planeDist = abs(dot(dir, galacticNormal));
    float bandMask = exp(-planeDist * planeDist * 11.5);

    vec3 milkyWay = vec3(0.0);
    vec3 coreColor = vec3(0.0);
    if (bandMask > 0.004) {
      float cloudA = fbm(dir * 3.4 + vec3(1.2, -0.8, 0.4));
      float cloudB = fbm(dir * 7.2 + vec3(cloudA * 0.6));
      float dustRift = smoothstep(0.38, 0.66, fbm(dir * 9.5 + vec3(-1.4, 0.5, 2.1)));

      vec3 navyNebula = vec3(0.015, 0.032, 0.16);
      vec3 cyanNebula = vec3(0.025, 0.105, 0.185);
      milkyWay = mix(navyNebula, cyanNebula, smoothstep(0.35, 0.8, cloudB));
      milkyWay *= bandMask * (0.45 + cloudA * 0.85) * (1.0 - dustRift * 0.68);

      vec3 coreDir = normalize(vec3(-0.06, -0.48, 0.87));
      vec3 dCore = dir - coreDir;
      float coreGlow = exp(-dot(dCore, dCore) * 5.2) * bandMask;
      coreColor = vec3(0.11, 0.075, 0.045) * coreGlow;
    }

    vec3 color = baseSky + milkyWay + coreColor;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const SKY_SAMPLE_FRAGMENT_SHADER = /* glsl */ `
  uniform samplerCube uSkyCube;
  varying vec3 vDir;

  void main() {
    gl_FragColor = textureCube(uSkyCube, normalize(vDir));
  }
`;

const STARFIELD_VERTEX_SHADER = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  varying vec3 vColor;
  varying float vPhase;
  uniform float uPixelRatio;
  uniform float uPointScale;

  void main() {
    vColor = color;
    vPhase = aPhase;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = max(-mvPosition.z, 1.0);
    gl_PointSize = clamp(aSize * uPixelRatio * (uPointScale / dist), 1.0, 11.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const STARFIELD_FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;
  varying float vPhase;
  uniform float uTime;

  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float r2 = dot(uv, uv);
    if (r2 > 1.0) discard;

    float core = exp(-r2 * 14.0);
    float halo = exp(-r2 * 3.8) * 0.35;

    float twinkle = uTime > 0.0
      ? 0.90 + 0.10 * sin(uTime * (0.85 + fract(vPhase) * 0.9) + vPhase)
      : 1.0;

    float intensity = (core + halo) * twinkle;
    gl_FragColor = vec4(vColor * intensity, clamp(intensity, 0.0, 1.0));
  }
`;

function pushRingSegments(positions, colors, radius, segments, plane, yOffset, r, g, b) {
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = ((i + 1) / segments) * Math.PI * 2;
    const c0 = Math.cos(a0) * radius;
    const s0 = Math.sin(a0) * radius;
    const c1 = Math.cos(a1) * radius;
    const s1 = Math.sin(a1) * radius;

    if (plane === 'xz') {
      positions.push(c0, yOffset, s0, c1, yOffset, s1);
    } else if (plane === 'xy') {
      positions.push(c0, s0, 0, c1, s1, 0);
    } else {
      positions.push(0, s0, c0, 0, s1, c1);
    }
    colors.push(r, g, b, r, g, b);
  }
}

/**
 * Builds and attaches the baked procedural Milky Way sky dome, J2000 spectral
 * starfield, and optional celestial armillary rings into any Three.js scene.
 */
export function attachSpaceDome(scene, renderer, options = {}) {
  const {
    skyBoxSize = 260,
    starMinRadius = 96,
    starMaxRadius = 132,
    pointScale = 115,
    fillerCount = 2200,
    includeArmillary = true,
    armillaryRadius = 54,
    cubeResolution = 512,
  } = options;

  const domeGroup = new THREE.Group();

  // Bake procedural Milky Way once into a cubemap
  const cubeTarget = new THREE.WebGLCubeRenderTarget(cubeResolution, {
    generateMipmaps: false,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
    stencilBuffer: false,
  });

  const bakeScene = new THREE.Scene();
  const bakeGeo = new THREE.BoxGeometry(20, 20, 20);
  const bakeMat = new THREE.ShaderMaterial({
    vertexShader: SKY_VERTEX_SHADER,
    fragmentShader: SKY_BAKE_FRAGMENT_SHADER,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const bakeMesh = new THREE.Mesh(bakeGeo, bakeMat);
  bakeScene.add(bakeMesh);

  const cubeCam = new THREE.CubeCamera(0.1, 50, cubeTarget);
  cubeCam.update(renderer, bakeScene);
  bakeGeo.dispose();
  bakeMat.dispose();

  const skyGeo = new THREE.BoxGeometry(skyBoxSize, skyBoxSize, skyBoxSize);
  const skyMat = new THREE.ShaderMaterial({
    uniforms: {
      uSkyCube: { value: cubeTarget.texture },
    },
    vertexShader: SKY_VERTEX_SHADER,
    fragmentShader: SKY_SAMPLE_FRAGMENT_SHADER,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const skyMesh = new THREE.Mesh(skyGeo, skyMat);
  skyMesh.renderOrder = -2;
  skyMesh.frustumCulled = false;
  domeGroup.add(skyMesh);

  // J2000 Spectral Starfield
  const starData = generateRealCatalogStarfield(
    BRIGHT_STARS,
    fillerCount,
    starMinRadius,
    starMaxRadius,
    12026
  );
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starData.positions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starData.colors, 3));
  starGeo.setAttribute('aSize', new THREE.BufferAttribute(starData.sizes, 1));
  starGeo.setAttribute('aPhase', new THREE.BufferAttribute(starData.phases, 1));

  const starMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: {
        value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1.5) : 1,
      },
      uPointScale: { value: pointScale },
    },
    vertexShader: STARFIELD_VERTEX_SHADER,
    fragmentShader: STARFIELD_FRAGMENT_SHADER,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const starPoints = new THREE.Points(starGeo, starMat);
  starPoints.renderOrder = -1;
  domeGroup.add(starPoints);

  let armillaryGeo = null;
  let armillaryMat = null;

  if (includeArmillary) {
    const tierRad = (46 * Math.PI) / 180;
    const tierRadius = armillaryRadius * Math.cos(tierRad);
    const tierY = armillaryRadius * Math.sin(tierRad);
    const base = new THREE.Color('#7cdee4');
    const maxOpacity = 0.09;
    const positions = [];
    const colors = [];

    const addRing = (rad, segs, plane, y, opacity) => {
      const k = opacity / maxOpacity;
      pushRingSegments(positions, colors, rad, segs, plane, y, base.r * k, base.g * k, base.b * k);
    };

    addRing(armillaryRadius, 96, 'xz', 0, 0.065);
    addRing(tierRadius, 72, 'xz', tierY, 0.04);
    addRing(tierRadius, 72, 'xz', -tierY, 0.04);
    addRing(armillaryRadius, 96, 'xy', 0, 0.025);
    addRing(armillaryRadius, 96, 'yz', 0, 0.025);

    for (let deg = 0; deg < 360; deg += 15) {
      const rad = (deg * Math.PI) / 180;
      const halfTick = deg % 30 === 0 ? 0.9 : 0.38;
      const x = Math.cos(rad) * armillaryRadius;
      const z = Math.sin(rad) * armillaryRadius;
      positions.push(x, -halfTick, z, x, halfTick, z);
      colors.push(base.r, base.g, base.b, base.r, base.g, base.b);
    }

    armillaryGeo = new THREE.BufferGeometry();
    armillaryGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    armillaryGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    armillaryMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: maxOpacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const armillaryLines = new THREE.LineSegments(armillaryGeo, armillaryMat);
    domeGroup.add(armillaryLines);
  }

  scene.add(domeGroup);

  return {
    group: domeGroup,
    update(elapsedTime) {
      starMat.uniforms.uTime.value = elapsedTime;
    },
    dispose() {
      scene.remove(domeGroup);
      cubeTarget.dispose();
      skyGeo.dispose();
      skyMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      if (armillaryGeo) armillaryGeo.dispose();
      if (armillaryMat) armillaryMat.dispose();
    },
  };
}
