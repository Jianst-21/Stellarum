import Link from 'next/link';
import StellarumLogo from '@/app/components/global/StellarumLogo';

const FOOTER_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/tata-surya', label: 'Tata Surya 3D' },
  { href: '/planet', label: 'Planet' },
  { href: '/galaksi', label: 'Galaksi' },
  { href: '/teknologi', label: 'Instrumen' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/12 bg-space-black pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg border border-cyan-glow/30 bg-space-abyss flex items-center justify-center text-cyan-glow shrink-0">
            <StellarumLogo size={20} />
          </span>
          <div>
            <span className="font-display text-sm font-bold tracking-[0.12em] uppercase text-ink-primary block">
              Stellarum
            </span>
            <span className="text-xs text-ink-secondary">
              Portal eksplorasi astronomi dan simulasi Tata Surya 3D
            </span>
          </div>
        </div>

        <nav
          aria-label="Navigasi footer"
          className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink-secondary"
        >
          {FOOTER_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-h-[44px] inline-flex items-center hover:text-ink-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
