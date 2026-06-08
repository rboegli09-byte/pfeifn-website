'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="ueber-uns" className="py-24 px-6 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand text-xs uppercase tracking-widest font-semibold mb-3">Über uns</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6">
              Die Marke hinter dem Pfiff
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Pfeifn entstand aus einer einfachen Überzeugung: Jeder Schiedsrichter verdient eine Pfeife,
                die so einzigartig ist wie sein Stil. Was als Leidensprojekt begann, ist heute eine
                aufstrebende Sportmarke für Profis und Amateure weltweit.
              </p>
              <p>
                Unser 3D-Konfigurator ermöglicht es dir, deine Pfeife bis ins letzte Detail zu gestalten –
                von der Farbe über das Material bis hin zum Klang. Jede Pfeifn wird individuell gefertigt
                und mit Liebe zum Detail ausgeliefert.
              </p>
              <p>
                Wir glauben daran, dass gutes Werkzeug Vertrauen schafft. Auf dem Platz. Im Korb.
                In der Halle. Überall dort, wo ein Pfiff den Unterschied macht.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-zinc-900 border border-zinc-800 p-8 overflow-hidden">
              {/* Decorative background */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />

              <div className="relative grid grid-cols-2 gap-6">
                {[
                  { value: '2026', label: 'Gegründet' },
                  { value: '100+', label: 'Individuelle Pfeifen' },
                  { value: '5★',   label: 'Kundenbewertung' },
                  { value: '3 Tage', label: 'Lieferzeit' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center py-4">
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-zinc-500 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
