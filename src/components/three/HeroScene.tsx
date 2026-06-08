'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Stars } from '@react-three/drei';
import WhistleModel from './WhistleModel';

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 8]} intensity={3} color="#ffffff" />
      <pointLight position={[-8, -4, -6]} intensity={1.2} color="#ff4422" />
      <pointLight position={[0, -6, 4]} intensity={0.6} color="#4488ff" />

      <Suspense fallback={null}>
        <Stars radius={80} depth={60} count={4000} factor={3.5} saturation={0} fade speed={0.6} />
        <Environment preset="city" />
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
          <WhistleModel color="#cc2200" design="Pro" autoRotate={false} />
        </Float>
      </Suspense>
    </Canvas>
  );
}
