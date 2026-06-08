export default function Logo({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 560 710"
      fill="none"
      className={className}
      aria-label="Pfeifn Logo"
    >
      {/* P bowl (large D arc) */}
      <path
        d="M 148 28 C 300 28 562 70 562 188 C 562 306 300 348 148 348"
        stroke="white" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Main vertical stem */}
      <line
        x1="148" y1="28" x2="148" y2="645"
        stroke="white" strokeWidth="18" strokeLinecap="round"
      />
      {/* Bottom-left J hook */}
      <path
        d="M 148 645 C 148 690 110 710 72 698 C 34 686 24 656 26 626 C 28 596 50 576 78 574"
        stroke="white" strokeWidth="18" fill="none" strokeLinecap="round"
      />
      {/* EIFN band outer edge */}
      <path
        d="M 148 445 C 260 432 390 468 468 566 C 514 622 514 684 494 706"
        stroke="white" strokeWidth="18" fill="none" strokeLinecap="round"
      />
      {/* EIFN band inner edge */}
      <path
        d="M 196 468 C 302 456 420 490 492 580 C 534 633 534 692 516 712"
        stroke="white" strokeWidth="18" fill="none" strokeLinecap="round"
      />
      {/* EIFN text inside band */}
      <text
        transform="translate(402 480) rotate(72)"
        fontFamily="'Arial Narrow', Arial, Helvetica, sans-serif"
        fontSize="36"
        fontWeight="700"
        fill="white"
        letterSpacing="3"
      >
        EIFN
      </text>
    </svg>
  );
}
