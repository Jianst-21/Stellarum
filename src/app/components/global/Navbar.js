'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Rocket } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-[#22D3EE]/20">
      <div className="flex justify-between items-center h-16 px-6 max-w-[1280px] mx-auto">
        <Link href="/" className="font-['Sora'] text-xl md:text-2xl text-[#22D3EE] font-bold tracking-tight flex items-center gap-2">
          <span></span> Stellarum
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/landingpage" className="text-[#ffffff] hover:text-[#22D3EE] transition-colors duration-300 font-['Hanken_Grotesk'] text-base">
            Misi
          </Link>
          <Link href="/planet" className="text-[#ffffff] hover:text-[#22D3EE] transition-colors duration-300 font-['Hanken_Grotesk'] text-base">
            Planet
          </Link>
          <Link href="/galaksi" className="text-[#ffffff] hover:text-[#22D3EE] transition-colors duration-300 font-['Hanken_Grotesk'] text-base">
            Galaksi
          </Link>
          <Link href="/teknologi" className="text-[#ffffff] hover:text-[#22D3EE] transition-colors duration-300 font-['Hanken_Grotesk'] text-base">
            Teknologi
          </Link>
        </div>

        {/* CTA Button */}
        <Link href="/landingpage#tata-surya" className="hidden md:inline-flex items-center gap-2 bg-transparent text-[#22D3EE] border border-[#22D3EE] font-['Hanken_Grotesk'] text-base px-5 py-2 rounded hover:bg-[#22D3EE]/10 transition-all duration-300">
          <Rocket className="w-4 h-4" />
          Mulai Eksplorasi
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#22D3EE] p-1"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0F0F14] border-b border-[#22D3EE]/30 px-6 py-4 flex flex-col gap-4">
          <Link href="/landingpage" onClick={() => setIsMobileMenuOpen(false)} className="text-[#ffffff] hover:text-[#22D3EE]">
            Misi
          </Link>
          <Link href="/planet" onClick={() => setIsMobileMenuOpen(false)} className="text-[#ffffff] hover:text-[#22D3EE]">
            Planet
          </Link>
          <Link href="/galaksi" onClick={() => setIsMobileMenuOpen(false)} className="text-[#ffffff] hover:text-[#22D3EE]">
            Galaksi
          </Link>
          <Link href="/teknologi" onClick={() => setIsMobileMenuOpen(false)} className="text-[#ffffff] hover:text-[#22D3EE]">
            Teknologi
          </Link>
          <Link href="/landingpage#tata-surya" className="w-full text-center bg-transparent text-[#22D3EE] border border-[#22D3EE] py-2 rounded flex items-center justify-center gap-2">
            <Rocket className="w-4 h-4" />
            Mulai Eksplorasi
          </Link>
        </div>
      )}
    </nav>
  );
}
