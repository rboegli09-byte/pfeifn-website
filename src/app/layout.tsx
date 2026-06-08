import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import Cart from '@/components/Cart';

export const metadata: Metadata = {
  title: 'Pfeifn – Dein Pfiff. Deine Pfeifn.',
  description: 'Individuelle Premium-Pfeifen für Schiedsrichter. Konfiguriere deine Pfeifn in Echtzeit – Farbe, Design, Ton.',
  keywords: ['Pfeife', 'Schiedsrichter', 'Pfeifn', 'Konfigurator', '3D'],
  openGraph: {
    title: 'Pfeifn – Dein Pfiff. Deine Pfeifn.',
    description: 'Premium-Pfeifen. Individuell konfiguriert.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="dark">
      <body>
        <Providers>
          {children}
          <Cart />
        </Providers>
      </body>
    </html>
  );
}
