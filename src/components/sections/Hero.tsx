'use client';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Stars } from '@react-three/drei';
import WhistleModel from '@/components/three/WhistleModel';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Dark stadium-feel background — replace this div with a <video> element for real footage */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 60%, #1a0505 0%, #09090b 55%), radial-gradient(ellipse 60% 40% at 80% 30%, #120808 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40 pointer-events-none z-10" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[8, 8, 8]} intensity={3} color="#ffffff" />
          <pointLight position={[-8, -4, -6]} intensity={1.2} color="#ff4422" />
          <pointLight position={[0, -6, 4]} intensity={0.6} color="#4488ff" />
          <Suspense fallback={null}>
            <Stars radius={80} depth={60} count={4000} factor={3.5} saturation={0} fade speed={0.6} />
            <Environment preset="city" />
            <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
              <WhistleModel color="#cc2200" design="Pro" whistleType="pea" />
            </Float>
          </Suspense>
        </Canvas>
      </div>

      {/* Text */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-brand text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold mb-4">
            Premium Pfeifen
          </p>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-none mb-4">
            PFEIF<span className="text-brand">N</span>
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-300 font-light mt-4 mb-8">
            Dein Pfiff. Deine Pfeifn.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <a
            href="#konfigurator"
            className="px-8 py-4 bg-brand hover:bg-brand-dark text-white font-bold rounded-full text-base transition-all duration-200 hover:scale-105 shadow-lg shadow-brand/30"
          >
            Jetzt gestalten
          </a>
          <a
            href="#vorteile"
            className="px-8 py-4 border border-zinc-700 hover:border-zinc-400 text-zinc-300 hover:text-white font-medium rounded-full text-base transition-all duration-200"
          >
            Mehr erfahren
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-zinc-500"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}
