'use client';
import { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Lightformer } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Check, ShoppingCart } from 'lucide-react';
import WhistleModel from '@/components/three/WhistleModel';
import { whistleColors, whistleDesigns, whistleTypes, whistleTones, WhistleTypeId } from '@/lib/data';
import { playWhistleTone, ToneId } from '@/lib/whistleAudio';
import { useCart } from '@/context/CartContext';

export default function Configurator() {
  const { add } = useCart();

  const [color,        setColor]        = useState(whistleColors[1].hex);
  const [design,       setDesign]       = useState('Classic');
  const [whistleType,  setWhistleType]  = useState<WhistleTypeId>('pea');
  const [playing,      setPlaying]      = useState<ToneId | null>(null);
  const [selectedTone, setSelectedTone] = useState<ToneId | null>(null);
  const [added,        setAdded]        = useState(false);

  const handlePlay = useCallback((id: ToneId, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playing === id) { setPlaying(null); return; }
    const dur = playWhistleTone(id);
    setPlaying(id);
    setTimeout(() => setPlaying(null), dur * 1000 + 100);
  }, [playing]);

  const handleAddToCart = () => {
    if (!selectedTone) return;
    const wt        = whistleTypes.find(w => w.id === whistleType)!;
    const colorObj  = whistleColors.find(c => c.hex === color)!;
    const toneObj   = whistleTones.find(t => t.id === selectedTone)!;

    add({
      modelId:   whistleType,
      modelName: wt.name,
      color,
      colorName: colorObj.name,
      design,
      toneId:    selectedTone,
      toneName:  toneObj.name,
      price:     wt.price,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">Gestalte deine Pfeifn</h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Modell, Farbe, Design und Ton – dann direkt in den Warenkorb.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* 3D Canvas */}
          <div className="relative h-[440px] sm:h-[540px] rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800">
            <Canvas shadows camera={{ position: [0, 0.3, 4.6], fov: 42 }} gl={{ antialias: true }}>
              <ambientLight intensity={0.35} />
              <directionalLight castShadow position={[4, 7, 4]} intensity={2.2} shadow-mapSize={[1024, 1024]} />
              <pointLight position={[-5, -3, -3]} intensity={0.8} color="#6688ff" />
              <Suspense fallback={null}>
                <Environment resolution={256} frames={Infinity}>
                  <Lightformer intensity={4}   position={[4, 4, 4]}    color="white"   form="ring" scale={3} />
                  <Lightformer intensity={1.2} position={[-4, -2, -2]} color="#88aaff" form="rect" scale={2} />
                </Environment>
                <WhistleModel color={color} design={design} whistleType={whistleType} />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.45} blur={2.5} far={4} />
              </Suspense>
              <OrbitControls enablePan={false} minDistance={2.5} maxDistance={7} autoRotate autoRotateSpeed={0.7} />
            </Canvas>

            {/* Price badge */}
            <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur border border-zinc-700 rounded-xl px-3 py-1.5 text-right">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">ab</p>
              <p className="text-white font-black text-lg leading-none">
                CHF {whistleTypes.find(w => w.id === whistleType)?.price.toFixed(2)}
              </p>
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-zinc-600 pointer-events-none select-none">
              Ziehen zum Drehen · Scrollen zum Zoomen
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Model */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3">Modell</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {whistleTypes.map((wt) => (
                  <button
                    key={wt.id}
                    onClick={() => setWhistleType(wt.id)}
                    className={`px-3 py-2.5 rounded-xl text-left border transition-all duration-200 ${
                      whistleType === wt.id
                        ? 'border-brand bg-brand/15 text-white'
                        : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                    }`}
                  >
                    <p className="text-sm font-semibold leading-tight">{wt.name}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">CHF {wt.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3">Farbe</h3>
              <div className="flex flex-wrap gap-3">
                {whistleColors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.hex)}
                    title={c.name}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                      color === c.hex ? 'border-white scale-110 shadow-lg' : 'border-zinc-700'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
              <p className="text-zinc-500 text-xs mt-1.5">{whistleColors.find(c => c.hex === color)?.name}</p>
            </div>

            {/* Design */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3">Design</h3>
              <div className="flex flex-wrap gap-2">
                {whistleDesigns.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDesign(d)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
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
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-1">Ton wählen</h3>
              <p className="text-xs text-zinc-600 mb-3">Zeile = auswählen · ▶ = vorhören</p>
              <div className="space-y-2">
                {whistleTones.map((t) => {
                  const isSel  = selectedTone === t.id;
                  const isPlay = playing === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTone(isSel ? null : t.id)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer border transition-all duration-200 ${
                        isSel ? 'border-brand bg-brand/15' : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          isSel ? 'border-brand bg-brand' : 'border-zinc-600'
                        }`}>
                          {isSel && <Check size={11} className="text-white" />}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isSel ? 'text-white' : 'text-zinc-200'}`}>{t.name}</p>
                          <p className="text-xs text-zinc-500">{t.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handlePlay(t.id, e)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
                          isPlay ? 'bg-brand text-white scale-95 animate-pulse' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                        }`}
                      >
                        {isPlay ? <Square size={11} /> : <Play size={11} className="ml-0.5" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add to cart button */}
            <AnimatePresence mode="wait">
              {added ? (
                <motion.div
                  key="added"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full py-4 bg-green-600 text-white font-bold rounded-full text-sm text-center flex items-center justify-center gap-2"
                >
                  <Check size={16} /> Im Warenkorb!
                </motion.div>
              ) : (
                <motion.button
                  key="add"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={!selectedTone}
                  className={`w-full py-4 font-bold rounded-full transition-all duration-200 text-sm flex items-center justify-center gap-2 ${
                    selectedTone
                      ? 'bg-brand hover:bg-brand-dark text-white hover:scale-[1.02] shadow-lg shadow-brand/30'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={16} />
                  {selectedTone ? 'In den Warenkorb' : 'Bitte zuerst einen Ton wählen'}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
