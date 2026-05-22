import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Stylized brand avatar built from primitives — matches the reference:
 * dark hoodie, warm ember skin, curly black hair, sneakers.
 * He floats gently and breathes.
 */
const SKIN = '#c97b4a';
const SKIN_DARK = '#8a4d28';
const HOODIE = '#161618';
const HOODIE_HIGH = '#1f1f22';
const PANTS = '#0f0f10';
const SHOE = '#0a0a0b';
const SHOE_SOLE = '#f5f1ea';
const HAIR = '#050505';

function HairCluster() {
  // Make curly bumps over the head
  const bumps = [];
  for (let i = 0; i < 40; i++) {
    const u = Math.random();
    const v = Math.random() * 0.55;
    const theta = u * Math.PI * 2;
    const phi = v * Math.PI;
    const r = 0.62;
    bumps.push([
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi) + 0.05,
      r * Math.sin(phi) * Math.sin(theta)
    ]);
  }
  return (
    <group>
      {bumps.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.11 + Math.random() * 0.05, 12, 12]} />
          <meshStandardMaterial color={HAIR} roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

export default function Avatar({ position = [0, 0, 0], scale = 1, ...props }) {
  const group = useRef();
  const head = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t * 0.9) * 0.06;
    group.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    if (head.current) head.current.rotation.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <group ref={group} position={position} scale={scale} {...props}>
      {/* Body / hoodie */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <capsuleGeometry args={[0.65, 0.7, 8, 24]} />
        <meshStandardMaterial color={HOODIE} roughness={0.95} />
      </mesh>

      {/* Hoodie pocket */}
      <mesh position={[0, 0.15, 0.55]}>
        <boxGeometry args={[0.9, 0.35, 0.12]} />
        <meshStandardMaterial color={HOODIE_HIGH} roughness={0.95} />
      </mesh>

      {/* Hood */}
      <mesh position={[0, 1.05, -0.15]}>
        <sphereGeometry args={[0.78, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.6]} />
        <meshStandardMaterial color={HOODIE} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>

      {/* Head */}
      <group ref={head} position={[0, 1.25, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.55, 48, 48]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.18, 0.05, 0.48]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
        <mesh position={[0.18, 0.05, 0.48]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
        {/* Brows */}
        <mesh position={[-0.18, 0.18, 0.5]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.14, 0.025, 0.02]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
        <mesh position={[0.18, 0.18, 0.5]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.14, 0.025, 0.02]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
        {/* Nose */}
        <mesh position={[0, -0.05, 0.55]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={SKIN_DARK} roughness={0.6} />
        </mesh>
        {/* Hair */}
        <HairCluster />
      </group>

      {/* Arms */}
      <mesh position={[-0.7, 0.5, 0.05]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.18, 0.6, 8, 16]} />
        <meshStandardMaterial color={HOODIE} roughness={0.95} />
      </mesh>
      <mesh position={[0.7, 0.5, 0.05]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.18, 0.6, 8, 16]} />
        <meshStandardMaterial color={HOODIE} roughness={0.95} />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.95, 0.1, 0.15]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>
      <mesh position={[0.95, 0.1, 0.15]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.25, -0.5, 0]}>
        <capsuleGeometry args={[0.22, 0.65, 8, 16]} />
        <meshStandardMaterial color={PANTS} roughness={0.95} />
      </mesh>
      <mesh position={[0.25, -0.5, 0]}>
        <capsuleGeometry args={[0.22, 0.65, 8, 16]} />
        <meshStandardMaterial color={PANTS} roughness={0.95} />
      </mesh>

      {/* Shoes (upper + sole) */}
      <group position={[-0.25, -1.05, 0.12]}>
        <mesh>
          <boxGeometry args={[0.36, 0.18, 0.55]} />
          <meshStandardMaterial color={SHOE} roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[0.4, 0.08, 0.6]} />
          <meshStandardMaterial color={SHOE_SOLE} roughness={0.6} />
        </mesh>
      </group>
      <group position={[0.25, -1.05, 0.12]}>
        <mesh>
          <boxGeometry args={[0.36, 0.18, 0.55]} />
          <meshStandardMaterial color={SHOE} roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[0.4, 0.08, 0.6]} />
          <meshStandardMaterial color={SHOE_SOLE} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
