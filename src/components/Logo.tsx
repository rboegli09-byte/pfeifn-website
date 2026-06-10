const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Logo({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    <img
      src={`${BASE}/logo.png`}
      alt="Pfeifn Logo"
      className={className}
    />
  );
}
