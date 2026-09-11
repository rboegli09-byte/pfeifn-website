import type { Metadata } from 'next';
import TrainingTracker from '@/components/training/TrainingTracker';

export const metadata: Metadata = {
  title: 'Weihnachts-Challenge – Jeden Tag Krafttraining',
  description:
    'Täglicher Tracker bis Weihnachten: Oberkörper, Bauch, Arme. Jeden Tag abhaken, an Weihnachten wartet die Belohnung.',
};

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <TrainingTracker />
    </main>
  );
}
