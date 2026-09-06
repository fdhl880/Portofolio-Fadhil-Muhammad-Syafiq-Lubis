'use client';
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformance } from '../../context/PerformanceContext';

/* ═══════════════════════════════════════════════════════════════
   DEPTH-PARALLAX PHOTO PLANE
   User's photo with subtle depth-map driven parallax on cursor
   ═══════════════════════════════════════════════════════════════ */

const photoVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const photoFragmentShader = `
  uniform sampler2D uTexture;
  uniform sampler2D uDepthMap;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform float uTime;

  varying vec2 vUv;

  void main() {
    float depth = texture2D(uDepthMap, vUv).r;

    // Parallax offset driven by mouse + depth
    vec2 offset = uMouse * depth * uIntensity;

    vec4 color = texture2D(uTexture, vUv + offset);

    // Subtle vignette
    float dist = distance(vUv, vec2(0.5));
    float vignette = smoothstep(0.7, 0.3, dist);
    color.rgb *= mix(0.6, 1.0, vignette);

    // Slight fade at bottom
    float bottomFade = smoothstep(0.0, 0.15, vUv.y);
    color.a *= bottomFade;

    gl_FragColor = color;
  }
`;

function PhotoPlane({ isDark }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  const texture = useTexture('/images/hero-transparent.png');
  const depthMap = useTexture('/images/hero-blazer-depth.jpg');

  // Make texture transparent-background friendly
  texture.premultiplyAlpha = false;

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uDepthMap: { value: depthMap },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uIntensity: { value: 0.04 },
    uTime: { value: 0 },
  }), [texture, depthMap]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.x,
        -state.pointer.x,
        0.06
      );
      materialRef.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.y,
        -state.pointer.y,
        0.06
      );
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }

    // Subtle floating motion
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  // Portrait aspect ~3:4
  const planeWidth = 3.8;
  const planeHeight = planeWidth * (4 / 3);

  return (
    <mesh ref={meshRef} position={[0, -0.3, 0]}>
      <planeGeometry args={[planeWidth, planeHeight, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={photoVertexShader}
        fragmentShader={photoFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING WIREFRAME SHAPES — Spring physics + hover smash
   ═══════════════════════════════════════════════════════════════ */

function FloatingShape({ position, color = '#ffffff', geometry, speed = 1, scale = 1 }) {
  const ref = useRef();
  const velocity = useRef(new THREE.Vector3());
  const origin = useMemo(() => new THREE.Vector3(...position), [position]);
  const tensionVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * speed * 0.5;
    ref.current.rotation.y += delta * speed * 0.3;

    // Apply Velocity
    ref.current.position.addScaledVector(velocity.current, delta);

    // Tension (Spring back to origin)
    tensionVec.copy(origin).sub(ref.current.position).multiplyScalar(2.0);
    velocity.current.addScaledVector(tensionVec, delta);

    // Friction
    velocity.current.multiplyScalar(0.92);
  });

  const handleSmash = (e) => {
    e.stopPropagation();
    velocity.current.set(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40,
      -30
    );
  };

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh
        ref={ref}
        position={position}
        scale={scale}
        onPointerEnter={handleSmash}
        frustumCulled={true}
      >
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.7}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INSTANCED PARTICLES — Drifting glowing dots
   ═══════════════════════════════════════════════════════════════ */

function Particles({ isDark }) {
  const { performanceTier } = usePerformance();
  const count = performanceTier === 'low' ? 25 : (performanceTier === 'medium' ? 50 : 80);

  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() => {
    const random = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }, (_, i) => ({
      x: (random(i * 123) - 0.5) * 20,
      y: (random(i * 456) - 0.5) * 16,
      z: (random(i * 789) - 0.5) * 14,
      speed: random(i * 111) * 0.4 + 0.1,
      offset: random(i * 222) * Math.PI * 2,
      baseScale: random(i * 333) * 0.6 + 0.3,
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      dummy.position.set(
        d.x + Math.sin(t * d.speed + d.offset) * 0.8,
        d.y + Math.cos(t * d.speed + d.offset) * 0.5,
        d.z
      );
      dummy.scale.setScalar(d.baseScale * (0.6 + Math.sin(t * d.speed) * 0.4));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]} frustumCulled={true}>
      <sphereGeometry args={[0.025, 6, 6]} />
      <meshBasicMaterial
        color={isDark ? '#ffffff' : '#222222'}
        transparent
        opacity={isDark ? 0.35 : 0.2}
      />
    </instancedMesh>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GLOW RINGS — Thin orbiting torus rings
   ═══════════════════════════════════════════════════════════════ */

function GlowRing({ radius, color = '#ffffff', speed = 0.3, opacity = 0.12 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = Math.sin(t * speed) * 0.4;
    ref.current.rotation.y = t * speed * 0.5;
  });
  return (
    <mesh ref={ref} frustumCulled={true}>
      <torusGeometry args={[radius, 0.008, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIGHT BEAMS — Ultra-subtle rotating plane beams
   ═══════════════════════════════════════════════════════════════ */

function LightBeams({ isDark }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * 0.05;
  });
  return (
    <group ref={ref}>
      {[0, 1, 2].map(i => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]} frustumCulled={true}>
          <planeGeometry args={[0.02, 14]} />
          <meshBasicMaterial
            color={isDark ? '#ffffff' : '#000000'}
            transparent
            opacity={isDark ? 0.03 : 0.02}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CAMERA RIG — Follows mouse for parallax, adjusts FOV on mobile
   ═══════════════════════════════════════════════════════════════ */

function CameraRig() {
  const { size } = useThree();
  const isPortrait = size.height > size.width;

  useFrame((state) => {
    const { camera } = state;
    const targetFov = isPortrait ? 80 : 50;
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.05);

    const targetZ = isPortrait ? 10 : 7;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.updateProjectionMatrix();

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.5, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.pointer.y * 0.3 + 0.5, 0.03);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ═══════════════════════════════════════════════════════════════
   AMBIENT GRID — Subtle ground grid for depth perception
   ═══════════════════════════════════════════════════════════════ */

function AmbientGrid({ isDark }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.material.opacity = 0.04 + Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshBasicMaterial
        color={isDark ? '#ffffff' : '#000000'}
        transparent
        opacity={0.04}
        wireframe={true}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HERO SCENE — Assembled R3F Canvas
   ═══════════════════════════════════════════════════════════════ */

export default function HeroScene({ isDark = true }) {
  const { dpr: perfDpr } = usePerformance();
  const shapeColor = isDark ? '#ffffff' : '#333333';
  const ringColor = isDark ? '#ffffff' : '#444444';

  return (
    <Canvas
      camera={{ position: [0, 0.5, 7], fov: 50 }}
      dpr={[1, Math.min(perfDpr || 1.5, 2)]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}
      frameloop="always"
    >
      {/* Lighting */}
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <pointLight position={[8, 8, 8]} intensity={isDark ? 0.8 : 0.6} color="#ffffff" />
      <pointLight position={[-8, -5, -6]} intensity={isDark ? 0.5 : 0.3} color="#ffffff" />
      <directionalLight position={[0, 5, 5]} intensity={0.3} />

      {/* Photo Plane with Depth Parallax */}
      <PhotoPlane isDark={isDark} />

      {/* Floating Wireframe Shapes — Smashable! */}
      <FloatingShape
        geometry={<icosahedronGeometry args={[1, 0]} />}
        position={[-4, 2.5, -4]}
        color={shapeColor}
        speed={0.8}
        scale={0.9}
      />
      <FloatingShape
        geometry={<octahedronGeometry args={[0.7, 0]} />}
        position={[4, -1, -5]}
        color={shapeColor}
        speed={0.6}
        scale={0.8}
      />
      <FloatingShape
        geometry={<dodecahedronGeometry args={[0.5, 0]} />}
        position={[2, 3, -3]}
        color={shapeColor}
        speed={1.1}
        scale={0.7}
      />
      <FloatingShape
        geometry={<tetrahedronGeometry args={[0.6, 0]} />}
        position={[-3, -2.5, -3]}
        color={shapeColor}
        speed={0.9}
      />
      <FloatingShape
        geometry={<torusGeometry args={[0.4, 0.15, 6, 12]} />}
        position={[4.5, 2, -4]}
        color={shapeColor}
        speed={0.7}
        scale={0.6}
      />

      {/* Particles */}
      <Particles isDark={isDark} />

      {/* Glow Rings */}
      <GlowRing radius={3} color={ringColor} speed={0.25} opacity={isDark ? 0.1 : 0.06} />
      <GlowRing radius={4} color={ringColor} speed={0.18} opacity={isDark ? 0.08 : 0.04} />
      <GlowRing radius={5} color={ringColor} speed={0.12} opacity={isDark ? 0.06 : 0.03} />

      {/* Light Beams */}
      <LightBeams isDark={isDark} />

      {/* Ambient Ground Grid */}
      <AmbientGrid isDark={isDark} />

      {/* Camera Rig */}
      <CameraRig />
    </Canvas>
  );
}
