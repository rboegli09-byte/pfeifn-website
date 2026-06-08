'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { items, isOpen, close, remove, setQty, count } = useCart();
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const handleOrder = () => {
    const lines = items.map(i =>
      `${i.qty}× ${i.modelName} (${i.colorName}, ${i.design}, ${i.toneName}) – CHF ${(i.price * i.qty).toFixed(2)}`
    ).join('\n');
    sessionStorage.setItem('pfeifn_order', JSON.stringify({
      model:  items.map(i => i.modelName).join(', '),
      color:  items.map(i => i.colorName).join(', '),
      design: items.map(i => i.design).join(', '),
      tone:   items.map(i => i.toneName).join(', '),
      details: lines,
    }));
    close();
    window.location.hash = 'kontakt';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <ShoppingCart size={20} className="text-brand" />
                <h2 className="text-lg font-bold text-white">Warenkorb</h2>
                {count > 0 && (
                  <span className="bg-brand text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>
              <button onClick={close} className="text-zinc-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                  <ShoppingCart size={44} className="text-zinc-700" />
                  <p className="text-zinc-500 text-sm">Noch nichts im Warenkorb</p>
                  <button
                    onClick={close}
                    className="px-5 py-2 border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white rounded-full text-sm transition-colors"
                  >
                    Pfeifn konfigurieren
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full border-2 border-zinc-700 shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <p className="text-white font-semibold text-sm">{item.modelName}</p>
                          <p className="text-zinc-500 text-xs mt-0.5">{item.colorName} · {item.design}</p>
                          <p className="text-brand text-xs font-medium mt-0.5">{item.toneName}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-zinc-600 hover:text-red-400 transition-colors shrink-0 mt-0.5"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800">
                      <div className="flex items-center gap-1 bg-zinc-800 rounded-full px-1 py-1">
                        <button
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-white text-sm font-semibold w-5 text-center">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <p className="text-white font-bold text-sm">
                        CHF {(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-zinc-800 space-y-4 bg-zinc-950">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-sm">Total</span>
                  <span className="text-white font-black text-xl">CHF {total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleOrder}
                  className="w-full py-4 bg-brand hover:bg-brand-dark text-white font-bold rounded-full transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-brand/30 text-sm"
                >
                  Zur Bestellung →
                </button>
                <p className="text-center text-xs text-zinc-600">Preise zzgl. Versand · auf Anfrage</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
