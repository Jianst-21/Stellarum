'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-[#22D3EE]/20">
      <div className="flex justify-between items-center h-16 px-6 max-w-[1280px] mx-auto">
        <div className="font-['Sora'] text-xl md:text-2xl text-[#22D3EE] font-bold tracking-tight">
          Jelajahi Alam Semesta
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#misi" className="text-[#ffffff] hover:text-[#22D3EE] transition-colors duration-300 font-['Hanken_Grotesk'] text-base">
            Misi
          </a>
          <a href="#tata-surya" className="text-[#ffffff] hover:text-[#22D3EE] transition-colors duration-300 font-['Hanken_Grotesk'] text-base">
            Planet
          </a>
          <a href="#galaksi" className="text-[#ffffff] hover:text-[#22D3EE] transition-colors duration-300 font-['Hanken_Grotesk'] text-base">
            Galaksi
          </a>
          <a href="#teknologi" className="text-[#ffffff] hover:text-[#22D3EE] transition-colors duration-300 font-['Hanken_Grotesk'] text-base">
            Teknologi
          </a>
        </div>

        {/* CTA Button */}
        <button className="hidden md:inline-flex bg-transparent text-[#22D3EE] border border-[#22D3EE] font-['Hanken_Grotesk'] text-base px-6 py-2 rounded hover:bg-[#22D3EE]/10 transition-all duration-300">
          Mulai Eksplorasi
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#22D3EE]"
          aria-label="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0F0F14] border-b border-[#22D3EE]/30 px-6 py-4 flex flex-col gap-4">
          <a href="#misi" onClick={() => setIsMobileMenuOpen(false)} className="text-[#ffffff] hover:text-[#22D3EE]">
            Misi
          </a>
          <a href="#tata-surya" onClick={() => setIsMobileMenuOpen(false)} className="text-[#ffffff] hover:text-[#22D3EE]">
            Planet
          </a>
          <a href="#galaksi" onClick={() => setIsMobileMenuOpen(false)} className="text-[#ffffff] hover:text-[#22D3EE]">
            Galaksi
          </a>
          <a href="#teknologi" onClick={() => setIsMobileMenuOpen(false)} className="text-[#ffffff] hover:text-[#22D3EE]">
            Teknologi
          </a>
          <button className="w-full text-center bg-transparent text-[#22D3EE] border border-[#22D3EE] py-2 rounded">
            Mulai Eksplorasi
          </button>
        </div>
      )}
    </nav>
  );
}
