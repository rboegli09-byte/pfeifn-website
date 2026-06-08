import { Instagram, Youtube, Twitter } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo className="h-12 w-auto" />

          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Impressum</a>
            <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
            <a href="#kontakt" className="hover:text-white transition-colors">Kontakt</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="text-zinc-500 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="YouTube" className="text-zinc-500 hover:text-white transition-colors">
              <Youtube size={20} />
            </a>
            <a href="#" aria-label="Twitter/X" className="text-zinc-500 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Pfeifn. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
