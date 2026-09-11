const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Emblem der Weihnachts-Challenge: Hantel im Ring, der Stern oben markiert
 * Weihnachten. Der rote Bogen läuft vom Stern aus mit dem Fortschritt mit.
 */
export default function ChallengeLogo({
  progress = 0,
  className = '',
}: {
  progress?: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
  const dash = clamped * CIRCUMFERENCE;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={`Weihnachts-Challenge, ${Math.round(clamped * 100)} Prozent geschafft`}
    >
      <circle cx="32" cy="32" r="30" fill="#0b0b0e" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="#27272a" strokeWidth="1" />

      {/* Ringbahn und Fortschritt */}
      <circle cx="32" cy="32" r={RADIUS} fill="none" stroke="#27272a" strokeWidth="3" />
      {dash > 0 && (
        <circle
          cx="32"
          cy="32"
          r={RADIUS}
          fill="none"
          stroke="#dc2626"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
          transform="rotate(-90 32 32)"
        />
      )}

      {/* Hantel */}
      <g fill="#fafafa">
        <rect x="21" y="30.5" width="22" height="3" rx="1.5" />
        <rect x="17.5" y="25" width="5" height="14" rx="2" />
        <rect x="41.5" y="25" width="5" height="14" rx="2" />
        <rect x="13.5" y="28.5" width="3" height="7" rx="1.5" />
        <rect x="47.5" y="28.5" width="3" height="7" rx="1.5" />
      </g>

      {/* Stern am Ziel: unterbricht den Ring oben */}
      <circle cx="32" cy="7" r="7.2" fill="#0b0b0e" />
      <path
        d="M32 1 C32.9 4.6 34.4 6.1 38 7 C34.4 7.9 32.9 9.4 32 13 C31.1 9.4 29.6 7.9 26 7 C29.6 6.1 31.1 4.6 32 1 Z"
        fill="#dc2626"
      />
    </svg>
  );
}
