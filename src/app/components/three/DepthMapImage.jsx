'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform sampler2D uDepthMap;
  uniform vec2 uMouse;
  uniform float uIntensity;

  varying vec2 vUv;

  void main() {
    // Get depth value (0.0 to 1.0)
    float depth = texture2D(uDepthMap, vUv).r;
    
    // Calculate parallax offset based on mouse position and depth
    // The closer the pixel (higher depth), the more it moves with the mouse
    vec2 offset = uMouse * depth * uIntensity;
    
    // Sample original texture with offset
    vec4 color = texture2D(uTexture, vUv + offset);
    
    gl_FragColor = color;
  }
`;

export default function DepthMapImage({ imagePath, depthMapPath, intensity = 0.05 }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  
  // Load textures
  const texture = useTexture(imagePath);
  const depthMap = useTexture(depthMapPath || imagePath); // Fallback to original image if no depth map
  
  const { size } = useThree();

  // Create uniforms using useMemo to avoid recreating them on every render
  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uDepthMap: { value: depthMap },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uIntensity: { value: intensity },
  }), [texture, depthMap, intensity]);

  // Update mouse uniform based on cursor position
  useFrame((state) => {
    if (materialRef.current) {
      // state.pointer is normalized (-1 to 1)
      // Lerp for smooth movement
      materialRef.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.x,
        -state.pointer.x,
        0.1
      );
      materialRef.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.y,
        -state.pointer.y,
        0.1
      );
    }
  });

  // Calculate aspect ratio for the plane to match the image
  const imageAspect = texture.image ? texture.image.width / texture.image.height : 1;
  // A standard portrait aspect ratio for the card
  const containerAspect = 340 / 460; 
  
  // We want the plane to cover the container (object-cover equivalent in WebGL)
  // We'll just make the plane fit the container's bounds
  const planeWidth = 5; 
  const planeHeight = planeWidth / containerAspect;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[planeWidth, planeHeight, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}
