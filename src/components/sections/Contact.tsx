'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, Send } from 'lucide-react';

const contactInfo = [
  { icon: MessageCircle, label: 'WhatsApp', value: '+41 79 000 00 00', href: 'https://wa.me/41790000000' },
  { icon: Phone,         label: 'Telefon',  value: '+41 79 000 00 00', href: 'tel:+41790000000'          },
  { icon: Mail,          label: 'E-Mail',   value: 'info@pfeifn.ch',   href: 'mailto:info@pfeifn.ch'     },
  { icon: MapPin,        label: 'Adresse',  value: 'Musterstrasse 1, 5400 Baden', href: '#'              },
];

interface OrderSummary {
  model: string;
  color: string;
  design: string;
  tone: string;
}

export default function Contact() {
  const [order,   setOrder]   = useState<OrderSummary | null>(null);
  const [form,    setForm]    = useState({ name: '', email: '', message: '' });
  const [sent,    setSent]    = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('pfeifn_order');
    if (!raw) return;
    try {
      const o = JSON.parse(raw) as OrderSummary;
      setOrder(o);
      setForm((f) => ({
        ...f,
        message: `Ich möchte folgende Pfeifn bestellen:\n\nModell: ${o.model}\nFarbe: ${o.color}\nDesign: ${o.design}\nTon: ${o.tone}\n\nBitte kontaktiert mich für weitere Details.`,
      }));
    } catch {/* ignore */}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.removeItem('pfeifn_order');
    setSent(true);
  };

  return (
    <section id="kontakt" className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-brand text-xs uppercase tracking-widest font-semibold mb-3">Kontakt</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">Lass uns reden</h2>
          <p className="text-zinc-400 mt-4 max-w-lg mx-auto">
            Fragen, Bestellungen oder einfach Hallo – wir freuen uns von dir zu hören.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {contactInfo.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl px-6 py-4 hover:border-zinc-600 transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                  <c.icon size={18} className="text-brand" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">{c.label}</p>
                  <p className="text-white font-medium group-hover:text-brand transition-colors">{c.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                <div className="text-5xl">✅</div>
                <h3 className="text-xl font-bold text-white">Bestellung gesendet!</h3>
                <p className="text-zinc-400">Wir melden uns so bald wie möglich bei dir.</p>
                <button onClick={() => { setSent(false); setOrder(null); }} className="mt-4 text-brand hover:underline text-sm">
                  Neue Anfrage senden
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Order summary badge */}
                {order && (
                  <div className="bg-brand/10 border border-brand/30 rounded-xl px-4 py-3 text-sm">
                    <p className="text-brand font-semibold text-xs uppercase tracking-wider mb-1">Deine Konfiguration</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-zinc-300 text-xs mt-1">
                      <span className="text-zinc-500">Modell</span>  <span className="font-medium text-white">{order.model}</span>
                      <span className="text-zinc-500">Farbe</span>   <span className="font-medium text-white">{order.color}</span>
                      <span className="text-zinc-500">Design</span>  <span className="font-medium text-white">{order.design}</span>
                      <span className="text-zinc-500">Ton</span>     <span className="font-medium text-brand">{order.tone}</span>
                    </div>
                  </div>
                )}

                {[
                  { id: 'name',  label: 'Name',   type: 'text',  placeholder: 'Dein Name'       },
                  { id: 'email', label: 'E-Mail', type: 'email', placeholder: 'deine@email.ch'  },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm text-zinc-400 mb-1">{field.label}</label>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={form[field.id as 'name' | 'email']}
                      onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-brand transition-colors text-sm"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-sm text-zinc-400 mb-1">Nachricht</label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-brand transition-colors resize-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-brand hover:bg-brand-dark text-white font-bold rounded-full transition-all duration-200 hover:scale-[1.02]"
                >
                  <Send size={16} />
                  Bestellung absenden
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
