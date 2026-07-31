export default function Footer() {
  return (
    <footer className="bg-[#0F0F14] w-full py-8 border-t border-[#22D3EE]/10 relative z-20">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-[1280px] mx-auto">
        <div className="font-['Sora'] text-sm text-[#22D3EE] mb-4 md:mb-0">
          © 2024 Jelajahi Alam Semesta. Meluncur ke Tak Terhingga.
        </div>
        <div className="flex gap-6">
          <a className="text-[#ffffff] font-['Geist'] text-xs hover:text-[#22D3EE] transition-colors" href="#">
            Privasi
          </a>
          <a className="text-[#ffffff] font-['Geist'] text-xs hover:text-[#22D3EE] transition-colors" href="#">
            Syarat Layanan
          </a>
          <a className="text-[#ffffff] font-['Geist'] text-xs hover:text-[#22D3EE] transition-colors" href="#">
            Kontak
          </a>
          <a className="text-[#ffffff] font-['Geist'] text-xs hover:text-[#22D3EE] transition-colors" href="#">
            Dokumentasi
          </a>
        </div>
      </div>
    </footer>
  );
}
