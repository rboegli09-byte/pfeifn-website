'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '#konfigurator', label: 'Konfigurator' },
  { href: '#vorteile',     label: 'Vorteile'     },
  { href: '#galerie',      label: 'Galerie'      },
  { href: '#kontakt',      label: 'Kontakt'      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          <span className="text-2xl font-black tracking-tighter text-white">
            PFEIF<span className="text-brand">N</span>
          </span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:block">
            Logo Platzhalter
          </span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
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

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-zinc-950/95 border-t border-zinc-800 px-6 py-4 space-y-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-zinc-300 hover:text-white py-1"
            >
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
