'use client';
import { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Play, Square } from 'lucide-react';
import WhistleModel from '@/components/three/WhistleModel';
import { whistleColors, whistleDesigns, whistleTones } from '@/lib/data';

export default function Configurator() {
  const [color, setColor]    = useState(whistleColors[1].hex);
  const [design, setDesign]  = useState('Classic');
  const [playing, setPlaying] = useState<number | null>(null);

  const playTone = useCallback((id: number) => {
    if (playing === id) {
      setPlaying(null);
      return;
    }
    setPlaying(id);
    setTimeout(() => setPlaying(null), 2200);
  }, [playing]);

  return (
    <section id="konfigurator" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-brand text-xs uppercase tracking-widest font-semibold mb-3">3D-Konfigurator</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Gestalte deine Pfeifn
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Wähle Farbe, Design und Ton – deine Pfeifn wird in Echtzeit aktualisiert.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* 3D Canvas */}
          <div className="relative h-[420px] sm:h-[500px] rounded-2xl overflow-hidden bg-zinc-900/40 border border-zinc-800">
            <Canvas camera={{ position: [0, 0.5, 5], fov: 40 }} gl={{ antialias: true }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[6, 6, 6]} intensity={2.5} />
              <pointLight position={[-6, -4, -4]} intensity={0.8} color="#6688ff" />
              <Suspense fallback={null}>
                <Environment preset="studio" />
                <WhistleModel color={color} design={design} autoRotate={false} />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.4} blur={2} far={4} />
              </Suspense>
              <OrbitControls
                enablePan={false}
                minDistance={3}
                maxDistance={8}
                autoRotate
                autoRotateSpeed={0.8}
              />
            </Canvas>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-zinc-600 pointer-events-none">
              Ziehen zum Drehen · Scrollen zum Zoomen
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-8">
            {/* Color */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">Farbe</h3>
              <div className="flex flex-wrap gap-3">
                {whistleColors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.hex)}
                    title={c.name}
                    className={`w-11 h-11 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                      color === c.hex ? 'border-white scale-110' : 'border-zinc-700'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
              <p className="text-zinc-500 text-sm mt-2">
                {whistleColors.find((c) => c.hex === color)?.name ?? ''}
              </p>
            </div>

            {/* Design */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">Design</h3>
              <div className="flex flex-wrap gap-2">
                {whistleDesigns.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDesign(d)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                      design === d
                        ? 'border-brand bg-brand/20 text-white'
                        : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Tones */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">Ton</h3>
              <div className="space-y-2">
                {whistleTones.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{t.name}</p>
                      <p className="text-xs text-zinc-500">{t.desc}</p>
                    </div>
                    <button
                      onClick={() => playTone(t.id)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                        playing === t.id
                          ? 'bg-brand text-white scale-95'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                      }`}
                      aria-label={playing === t.id ? 'Stop' : 'Play'}
                    >
                      {playing === t.id ? <Square size={14} /> : <Play size={14} className="ml-0.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#kontakt"
              className="block w-full text-center py-4 bg-brand hover:bg-brand-dark text-white font-bold rounded-full transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-brand/30"
            >
              Diese Pfeifn bestellen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
