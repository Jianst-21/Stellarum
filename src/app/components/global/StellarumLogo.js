export default function StellarumLogo({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <ellipse
        cx="16"
        cy="16"
        rx="13"
        ry="5.5"
        transform="rotate(-24 16 16)"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeOpacity="0.9"
      />
      <circle cx="16" cy="16" r="4.5" fill="#fec42d" />
      <circle cx="25.5" cy="11.6" r="2.1" fill="#7cdee4" />
    </svg>
  );
}
