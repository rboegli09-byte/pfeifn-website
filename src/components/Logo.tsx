export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`text-2xl font-black tracking-tighter text-white ${className}`}>
      PFEIF<span className="text-brand">N</span>
    </span>
  );
}
