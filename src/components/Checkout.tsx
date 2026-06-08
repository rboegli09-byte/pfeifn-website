'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Truck, MapPin, Check, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';

type Delivery = 'versand' | 'abholung';

interface FormData {
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  strasse: string;
  plz: string;
  ort: string;
  anmerkungen: string;
}

const empty: FormData = {
  vorname: '', nachname: '', email: '', telefon: '',
  strasse: '', plz: '', ort: '', anmerkungen: '',
};

export default function Checkout() {
  const { items, isCheckoutOpen, closeCheckout, open: openCart, clearCart } = useCart();
  const [delivery, setDelivery] = useState<Delivery>('versand');
  const [form,     setForm]     = useState<FormData>(empty);
  const [done,     setDone]     = useState(false);

  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = delivery === 'versand' ? (subtotal >= 100 ? 0 : 6.90) : 0;
  const total     = subtotal + shipping;

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    clearCart();
  };

  const handleClose = () => {
    closeCheckout();
    if (done) { setDone(false); setForm(empty); setDelivery('versand'); }
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800 shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { closeCheckout(); openCart(); }}
                  className="text-zinc-500 hover:text-white transition-colors"
                  aria-label="Zurück zum Warenkorb"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <Package size={20} className="text-brand" />
                  <h2 className="text-lg font-bold text-white">Warenausgang</h2>
                </div>
              </div>
              <button onClick={handleClose} className="text-zinc-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {done ? (
              /* ── Success ── */
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="w-20 h-20 rounded-full bg-green-600/20 border-2 border-green-500 flex items-center justify-center"
                >
                  <Check size={36} className="text-green-400" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Bestellung eingegangen!</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Danke, {form.vorname}! Wir melden uns in Kürze per E-Mail an<br />
                    <span className="text-white font-medium">{form.email}</span>
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="mt-4 px-8 py-3 bg-brand hover:bg-brand-dark text-white font-bold rounded-full transition-all"
                >
                  Fertig
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto flex flex-col">
                <div className="flex-1 px-6 py-5 space-y-6">

                  {/* Order summary */}
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Bestellung</h3>
                    <div className="space-y-2">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center justify-between gap-3 bg-zinc-900 rounded-xl px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full border border-zinc-700 shrink-0" style={{ backgroundColor: item.color }} />
                            <div>
                              <p className="text-white text-sm font-medium leading-tight">
                                {item.qty}× {item.modelName}
                              </p>
                              <p className="text-zinc-500 text-xs">{item.colorName} · {item.design} · {item.toneName}</p>
                            </div>
                          </div>
                          <p className="text-white font-semibold text-sm shrink-0">
                            CHF {(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery */}
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Versandart</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDelivery('versand')}
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left transition-all ${
                          delivery === 'versand'
                            ? 'border-brand bg-brand/15 text-white'
                            : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                        }`}
                      >
                        <Truck size={16} className={delivery === 'versand' ? 'text-brand' : 'text-zinc-500'} />
                        <div>
                          <p className="text-sm font-semibold leading-tight">Versand</p>
                          <p className="text-[10px] text-zinc-500 mt-0.5">
                            {subtotal >= 100 ? 'Gratis ab CHF 100' : 'CHF 6.90'}
                          </p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDelivery('abholung')}
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left transition-all ${
                          delivery === 'abholung'
                            ? 'border-brand bg-brand/15 text-white'
                            : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                        }`}
                      >
                        <MapPin size={16} className={delivery === 'abholung' ? 'text-brand' : 'text-zinc-500'} />
                        <div>
                          <p className="text-sm font-semibold leading-tight">Abholung</p>
                          <p className="text-[10px] text-zinc-500 mt-0.5">Gratis</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Personal data */}
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Angaben</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Vorname" value={form.vorname} onChange={set('vorname')} required />
                        <Field label="Nachname" value={form.nachname} onChange={set('nachname')} required />
                      </div>
                      <Field label="E-Mail" type="email" value={form.email} onChange={set('email')} required />
                      <Field label="Telefon" type="tel" value={form.telefon} onChange={set('telefon')} />

                      {delivery === 'versand' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3 overflow-hidden"
                        >
                          <Field label="Strasse & Nr." value={form.strasse} onChange={set('strasse')} required />
                          <div className="grid grid-cols-3 gap-3">
                            <Field label="PLZ" value={form.plz} onChange={set('plz')} required />
                            <div className="col-span-2">
                              <Field label="Ort" value={form.ort} onChange={set('ort')} required />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-xs text-zinc-500 mb-1">Anmerkungen</label>
                        <textarea
                          rows={2}
                          value={form.anmerkungen}
                          onChange={set('anmerkungen')}
                          placeholder="Besondere Wünsche..."
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-brand text-sm transition-colors resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with total + submit */}
                <div className="px-6 py-5 border-t border-zinc-800 space-y-3 shrink-0 bg-zinc-950">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-zinc-400">
                      <span>Zwischentotal</span>
                      <span>CHF {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Versand</span>
                      <span>{shipping === 0 ? 'Gratis' : `CHF ${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-white font-black text-lg pt-1 border-t border-zinc-800">
                      <span>Total</span>
                      <span>CHF {total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand hover:bg-brand-dark text-white font-bold rounded-full transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-brand/30 text-sm"
                  >
                    Jetzt bestellen – CHF {total.toFixed(2)}
                  </button>
                  <p className="text-center text-xs text-zinc-600">Inkl. MwSt. · Kein Konto erforderlich</p>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label, value, onChange, type = 'text', required = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs text-zinc-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-brand text-sm transition-colors"
      />
    </div>
  );
}
