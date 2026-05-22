import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Float, OrbitControls } from '@react-three/drei';

/**
 * Shared scene wrapper — consistent lighting/atmosphere so models blend
 * with the dark anchor palette across pages.
 */
export default function Scene({ children, camera = { position: [0, 1.2, 5], fov: 35 }, controls = false, height = '100%' }) {
  return (
    <div style={{ width: '100%', height }} className="relative">
      <Canvas shadows dpr={[1, 2]} camera={camera} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={[0]} />
        <fog attach="fog" args={['#0a0a0b', 6, 18]} />

        {/* Key + rim lighting, ember-tinted to match brand */}
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[5, 6, 4]}
          intensity={1.2}
          color="#fff1e0"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-4, 2, -3]} intensity={0.6} color="#c97b4a" />
        <pointLight position={[3, -1, 3]} intensity={0.3} color="#ffe3c8" />

        <Suspense fallback={null}>
          {children}
          <ContactShadows position={[0, -1.3, 0]} opacity={0.55} scale={10} blur={2.6} far={4} />
          <Environment preset="city" />
        </Suspense>

        {controls && <OrbitControls enablePan={false} enableZoom={false} />}
      </Canvas>

      {/* Soft ember vignette so the canvas blends into the dark page */}
      <div className="pointer-events-none absolute inset-0"
           style={{ background: 'radial-gradient(circle at 50% 60%, rgba(201,123,74,0.10), transparent 60%), linear-gradient(to bottom, transparent 70%, #0a0a0b 100%)' }} />
    </div>
  );
}
