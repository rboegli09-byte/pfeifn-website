'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { galleryItems } from '@/lib/data';

const categories = ['Alle', 'Pfeifn', 'Stadien', 'Schiedsrichter', 'Sportmomente'];

export default function Gallery() {
  const [active, setActive] = useState('Alle');
  const filtered = active === 'Alle' ? galleryItems : galleryItems.filter((g) => g.category === active);

  return (
    <section id="galerie" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-brand text-xs uppercase tracking-widest font-semibold mb-3">Galerie</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">Pfeifn in Aktion</h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                active === c
                  ? 'border-brand bg-brand/20 text-white'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.label}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.04 }}
              className="aspect-square rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center gap-2 hover:border-zinc-600 hover:bg-zinc-800/60 transition-all duration-200 group cursor-pointer"
            >
              <span className="text-5xl group-hover:scale-110 transition-transform duration-200">
                {item.emoji}
              </span>
              <p className="text-xs text-zinc-400 font-medium text-center px-2">{item.label}</p>
              <p className="text-[10px] text-zinc-600">{item.category}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
