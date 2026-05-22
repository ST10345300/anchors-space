import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Smooth MacBook with a slowly opening/closing lid breathing motion.
 */
export default function MacBook({ position = [0, 0, 0], scale = 1, openAngle = -1.9, ...props }) {
  const group = useRef();
  const lid = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.4) * 0.25;
    group.current.position.y = position[1] + Math.sin(t * 1.1) * 0.05;
    if (lid.current) {
      lid.current.rotation.x = openAngle + Math.sin(t * 0.6) * 0.05;
    }
  });

  return (
    <group ref={group} position={position} scale={scale} {...props}>
      {/* Base */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.6, 0.12, 1.8]} />
        <meshStandardMaterial color="#9ea0a3" roughness={0.35} metalness={0.85} />
      </mesh>

      {/* Keyboard inset */}
      <mesh position={[0, 0.061, 0.15]}>
        <boxGeometry args={[2.2, 0.005, 1.2]} />
        <meshStandardMaterial color="#161618" roughness={0.7} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.062, 0.7]}>
        <boxGeometry args={[1.1, 0.003, 0.45]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Tiny keys (grid) */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 14 }).map((_, col) => (
          <mesh key={`${row}-${col}`} position={[-1.0 + col * 0.155, 0.065, -0.35 + row * 0.13]}>
            <boxGeometry args={[0.12, 0.01, 0.1]} />
            <meshStandardMaterial color="#0f0f10" roughness={0.6} />
          </mesh>
        ))
      )}

      {/* Hinge group + Lid */}
      <group position={[0, 0.06, -0.88]}>
        <group ref={lid} rotation={[openAngle, 0, 0]}>
          {/* Lid back */}
          <mesh castShadow position={[0, 0.9, -0.03]}>
            <boxGeometry args={[2.6, 1.8, 0.08]} />
            <meshStandardMaterial color="#9ea0a3" roughness={0.35} metalness={0.85} />
          </mesh>
          {/* Screen */}
          <mesh position={[0, 0.9, 0.025]}>
            <boxGeometry args={[2.4, 1.6, 0.01]} />
            <meshStandardMaterial color="#0a0a0b" emissive="#c97b4a" emissiveIntensity={0.25} roughness={0.2} />
          </mesh>
          {/* Apple-style mark (ember dot, brand color blend) */}
          <mesh position={[0, 0.9, -0.071]}>
            <circleGeometry args={[0.18, 32]} />
            <meshStandardMaterial color="#c97b4a" emissive="#c97b4a" emissiveIntensity={0.6} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
