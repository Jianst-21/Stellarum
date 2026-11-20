'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import StellarumLogo from '@/app/components/global/StellarumLogo';

const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/planet', label: 'Planet' },
  { href: '/galaksi', label: 'Galaksi' },
  { href: '/teknologi', label: 'Instrumen' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/12 bg-space-black/90 pt-[env(safe-area-inset-top)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group min-h-[44px]">
          <span className="w-9 h-9 rounded-lg border border-cyan-glow/30 bg-space-abyss flex items-center justify-center text-cyan-glow group-hover:border-cyan-glow transition-colors">
            <StellarumLogo size={22} />
          </span>
          <span className="font-display text-base sm:text-lg font-bold tracking-[0.12em] uppercase text-ink-primary">
            Stellarum
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`min-h-[44px] px-1 inline-flex items-center text-sm font-medium transition-colors border-b-2 ${
                  isActive
                    ? 'text-ink-primary border-cyan-glow'
                    : 'text-ink-secondary border-transparent hover:text-ink-primary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/tata-surya"
            className="min-h-[44px] px-5 inline-flex items-center justify-center rounded-lg bg-cyan-glow text-space-navy text-sm font-bold hover:bg-ink-primary active:scale-[0.99] transition-colors"
          >
            Buka Tata Surya 3D
          </Link>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Buka menu navigasi"
          aria-expanded={mobileOpen}
          className="md:hidden min-h-[44px] px-3.5 inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 text-sm font-medium text-ink-primary hover:border-cyan-glow transition-colors"
        >
          <Menu className="w-4 h-4" aria-hidden="true" />
          <span>Menu</span>
        </button>
      </div>

      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi seluler"
          className="fixed inset-0 z-50 bg-space-black overflow-y-auto px-6 py-6 flex flex-col justify-between gap-6 md:hidden"
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/12">
              <div className="flex items-center gap-2.5">
                <StellarumLogo size={22} className="text-cyan-glow" />
                <span className="font-display text-base font-bold tracking-[0.12em] uppercase text-ink-primary">
                  Stellarum
                </span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Tutup menu navigasi"
                className="min-w-[44px] min-h-[44px] px-3 inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/20 text-sm text-ink-primary"
              >
                <X className="w-4 h-4" aria-hidden="true" />
                <span>Tutup</span>
              </button>
            </div>

            <nav aria-label="Tautan seluler" className="mt-6 flex flex-col gap-1">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`min-h-[48px] px-3 flex items-center text-base font-medium border-b border-white/10 transition-colors ${
                      isActive ? 'text-cyan-glow' : 'text-ink-secondary hover:text-ink-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/12">
            <Link
              href="/tata-surya"
              onClick={() => setMobileOpen(false)}
              className="min-h-[48px] w-full inline-flex items-center justify-center rounded-lg bg-cyan-glow text-space-navy text-sm font-bold"
            >
              Buka Tata Surya 3D
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
