'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { href: '#konfigurator', label: 'Konfigurator' },
  { href: '#vorteile',     label: 'Vorteile'     },
  { href: '#bewertungen',  label: 'Bewertungen'  },
  { href: '#kontakt',      label: 'Kontakt'      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { count, open: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.svg`}
            alt="Pfeifn Logo"
            className="h-10 w-auto brightness-0 invert"
          />
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#konfigurator"
              className="px-5 py-2 bg-brand hover:bg-brand-dark text-white text-sm font-semibold rounded-full transition-colors duration-200"
            >
              Jetzt gestalten
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            onClick={openCart}
            className="relative p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Warenkorb"
          >
            <ShoppingCart size={22} />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 bg-brand text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center"
              >
                {count}
              </motion.span>
            )}
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menü"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-all ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-zinc-950/95 border-t border-zinc-800 px-6 py-4 space-y-3">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-zinc-300 hover:text-white py-1">
              {l.label}
            </a>
          ))}
          <a
            href="#konfigurator"
            onClick={() => setOpen(false)}
            className="block w-full text-center px-5 py-2 bg-brand hover:bg-brand-dark text-white text-sm font-semibold rounded-full"
          >
            Jetzt gestalten
          </a>
        </div>
      )}
    </motion.nav>
  );
}
