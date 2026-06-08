'use client';
import { motion } from 'framer-motion';
import { features } from '@/lib/data';

export default function Features() {
  return (
    <section id="vorteile" className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-brand text-xs uppercase tracking-widest font-semibold mb-3">Vorteile</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Warum Pfeifn?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition-colors duration-300 group"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
