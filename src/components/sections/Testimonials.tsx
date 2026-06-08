'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  return (
    <section id="bewertungen" className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-brand text-xs uppercase tracking-widest font-semibold mb-3">Bewertungen</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Was Schiedsrichter sagen
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-brand fill-brand" />
                ))}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed flex-1">„{t.text}"</p>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-zinc-500 text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
