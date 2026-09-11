import type { Metadata } from 'next';
import TrainingTracker from '@/components/training/TrainingTracker';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'Weihnachts-Challenge – Jeden Tag Krafttraining',
  description:
    'Täglicher Tracker bis Weihnachten: vier Übungen für Oberkörper, Bauch und Arme. Jeden Tag abhaken, an Weihnachten wartet die Belohnung.',
  manifest: `${basePath}/training.webmanifest`,
  appleWebApp: {
    capable: true,
    title: 'Challenge',
    statusBarStyle: 'black-translucent',
  },
};

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <TrainingTracker />
    </main>
  );
}
