export type ToneId = 1 | 2 | 3 | 4 | 5;

interface Beat { freq: number; dur: number; gap?: number }

const tones: Record<ToneId, Beat[]> = {
  1: [{ freq: 3200, dur: 0.28 }],
  2: [{ freq: 1850, dur: 1.0 }],
  3: [{ freq: 3100, dur: 0.15, gap: 0.1 }, { freq: 3100, dur: 0.15, gap: 0.1 }, { freq: 3100, dur: 0.15 }],
  4: [{ freq: 2750, dur: 2.2 }],
  5: [
    { freq: 3500, dur: 0.07, gap: 0.06 },
    { freq: 3500, dur: 0.07, gap: 0.06 },
    { freq: 3500, dur: 0.07, gap: 0.06 },
    { freq: 3500, dur: 0.07, gap: 0.06 },
    { freq: 3500, dur: 0.07 },
  ],
};

export function playWhistleTone(id: ToneId): number {
  const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  const beats = tones[id];
  let t = ctx.currentTime;
  let totalDur = 0;

  beats.forEach((b) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo  = ctx.createOscillator();
    const lfog = ctx.createGain();

    lfo.frequency.value = 8;
    lfog.gain.value = id === 4 ? 50 : 20;
    lfo.connect(lfog);
    lfog.connect(osc.frequency);

    osc.type = 'sine';
    osc.frequency.value = b.freq;

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.02);
    gain.gain.setValueAtTime(0.35, t + b.dur - 0.04);
    gain.gain.linearRampToValueAtTime(0, t + b.dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    lfo.start(t);
    osc.stop(t + b.dur);
    lfo.stop(t + b.dur);

    t += b.dur + (b.gap ?? 0);
    totalDur += b.dur + (b.gap ?? 0);
  });

  return totalDur;
}
