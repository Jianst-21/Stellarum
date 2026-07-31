'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 px-6 max-w-[1280px] mx-auto">
      <div className="bg-[#0F0F14] rounded-xl p-8 md:p-12 text-center relative overflow-hidden border border-[#22D3EE]/30">
        <h2 className="font-['Sora'] text-2xl md:text-3xl text-[#FFFFFF] mb-4 relative z-10 font-bold">
          Dapatkan Update Astronomi Terbaru
        </h2>
        <p className="text-[#ffffff] mb-8 max-w-lg mx-auto relative z-10 font-['Hanken_Grotesk']">
          Bergabunglah dengan misi kami. Berlangganan newsletter untuk berita eksplorasi ruang angkasa langsung ke kotak masuk Anda.
        </p>

        {submitted ? (
          <div className="bg-[#22D3EE]/10 border border-[#22D3EE] text-[#22D3EE] p-4 rounded-lg max-w-md mx-auto relative z-10 font-['Geist'] text-sm">
            ✓ Terima kasih! Alamat email Anda ({email}) telah terdaftar.
          </div>
        ) : (
          <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto relative z-10" onSubmit={handleSubmit}>
            <input
              className="flex-grow bg-black/50 border border-[#22D3EE]/30 rounded px-4 py-3 text-[#ffffff] focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE] outline-none transition-all"
              placeholder="Alamat email Anda"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-[#22D3EE] text-[#001f25] px-6 py-3 rounded font-['Geist'] font-bold hover:bg-[#22D3EE]/90 transition-colors whitespace-nowrap"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
