/** A compass whose needle keeps searching, settling, and swinging again. */
export function LiveCompass({ size }: { size: number }) {
  return (
    <svg
      className="live-compass"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <g className="live-compass-needle">
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88" />
      </g>
    </svg>
  );
}
