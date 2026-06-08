'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import type { WhistleTypeId } from '@/lib/data';
import type { ToneId } from '@/lib/whistleAudio';

export interface CartItem {
  id: string;
  modelId: WhistleTypeId;
  modelName: string;
  color: string;
  colorName: string;
  design: string;
  toneId: ToneId;
  toneName: string;
  price: number;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, 'id' | 'qty'>) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems]   = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((item: Omit<CartItem, 'id' | 'qty'>) => {
    setItems(prev => [...prev, { ...item, id: `${Date.now()}-${Math.random()}`, qty: 1 }]);
    setIsOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, []);

  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <Ctx.Provider value={{
      items, count, isOpen,
      open:  () => setIsOpen(true),
      close: () => setIsOpen(false),
      add, remove, setQty,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
