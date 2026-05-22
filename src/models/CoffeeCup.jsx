import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Anchor's Space takeaway cup — matte black body, black lid,
 * cream anchor + star logo printed on the side. Mirrors the brand cup.
 */
const BODY = '#0c0c0d';
const LID  = '#0a0a0b';
const LOGO = '#e8e2d4'; // cream / off-white from the brand
const BASE_RING = '#1a1a1c';

function makeAnchorTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const ctx = c.getContext('2d');
  // transparent background — applied as a decal on the cup
  ctx.fillStyle = LOGO;
  ctx.strokeStyle = LOGO;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const cx = 256;
  // Star
  ctx.beginPath();
  const star = (cxs, cys, r1, r2, n) => {
    for (let i = 0; i < n * 2; i++) {
      const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 === 0 ? r1 : r2;
      const x = cxs + Math.cos(a) * r;
      const y = cys + Math.sin(a) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
  };
  star(cx, 120, 22, 9, 5);
  ctx.fill();

  // Anchor — vertical shaft
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.moveTo(cx, 150);
  ctx.lineTo(cx, 270);
  ctx.stroke();
  // Crossbar
  ctx.beginPath();
  ctx.moveTo(cx - 50, 180);
  ctx.lineTo(cx + 50, 180);
  ctx.stroke();
  // Ring at top
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(cx, 152, 18, 0, Math.PI * 2);
  ctx.stroke();
  // Curved flukes (bottom)
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.arc(cx, 250, 60, Math.PI * 0.15, Math.PI - Math.PI * 0.15);
  ctx.stroke();
  // Fluke tips
  ctx.beginPath();
  ctx.moveTo(cx - 60, 245);
  ctx.lineTo(cx - 78, 230);
  ctx.lineTo(cx - 50, 235);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx + 60, 245);
  ctx.lineTo(cx + 78, 230);
  ctx.lineTo(cx + 50, 235);
  ctx.closePath();
  ctx.fill();

  // Wordmark "ANCHOR'S SPACE"
  ctx.fillStyle = LOGO;
  ctx.textAlign = 'center';
  ctx.font = 'bold 44px "Space Grotesk", system-ui, sans-serif';
  ctx.fillText("ANCHOR'S", cx, 340);
  ctx.font = '500 30px "Space Grotesk", system-ui, sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('SPACE', cx, 376);

  // Tagline rule
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 110, 402); ctx.lineTo(cx - 70, 402);
  ctx.moveTo(cx + 70, 402); ctx.lineTo(cx + 110, 402);
  ctx.stroke();

  ctx.font = '500 18px "Space Grotesk", system-ui, sans-serif';
  ctx.fillText('COFFEE. FOCUS. PURPOSE.', cx, 408);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export default function CoffeeCup({ position = [0, 0, 0], scale = 1, rotate = true, ...props }) {
  const group = useRef();
  const logoTex = useMemo(() => makeAnchorTexture(), []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = (position[1] || 0) + Math.sin(t * 1.2) * 0.08;
    if (rotate) group.current.rotation.y = t * 0.4;
  });

  return (
    <group ref={group} position={position} scale={scale} {...props}>
      {/* Body — tapered black cup */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.85, 0.65, 1.7, 64, 1, false]} />
        <meshStandardMaterial color={BODY} roughness={0.75} metalness={0.0} />
      </mesh>

      {/* Logo plane — slightly proud of the cup surface so it reads cleanly */}
      <mesh position={[0, 0.05, 0.78]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.25, 1.25]} />
        <meshStandardMaterial map={logoTex} transparent roughness={0.65} />
      </mesh>

      {/* Base ring */}
      <mesh position={[0, -0.83, 0]}>
        <cylinderGeometry args={[0.67, 0.67, 0.08, 64]} />
        <meshStandardMaterial color={BASE_RING} roughness={0.8} />
      </mesh>

      {/* Lid skirt */}
      <mesh position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.92, 0.88, 0.22, 64]} />
        <meshStandardMaterial color={LID} roughness={0.4} metalness={0.25} />
      </mesh>

      {/* Lid dome */}
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.88, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2.4]} />
        <meshStandardMaterial color={LID} roughness={0.4} metalness={0.25} />
      </mesh>

      {/* Sip hole */}
      <mesh position={[0.4, 1.18, 0]}>
        <torusGeometry args={[0.12, 0.04, 16, 32]} />
        <meshStandardMaterial color="#050505" roughness={0.6} />
      </mesh>

      {/* Subtle steam */}
      {[0, 1, 2].map(i => (
        <mesh key={i} position={[(i - 1) * 0.12, 1.7 + i * 0.15, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.06} />
        </mesh>
      ))}
    </group>
  );
}
