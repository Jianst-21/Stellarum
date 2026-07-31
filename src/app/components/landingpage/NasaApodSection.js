'use client';

import { useEffect, useState } from 'react';
import { Camera, Calendar, Maximize2, ExternalLink, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react';

const FALLBACK_APOD = {
  title: 'Pilar-Pilar Penciptaan (Peta Inframerah JWST)',
  date: '2024-03-15',
  explanation: 'Struktur debu dan gas antar-bintang raksasa di Nebula Elang (M16), berjarak 6.500 tahun cahaya dari Bumi. Gambar menakjubkan ini ditangkap oleh Teleskop Antariksa James Webb (JWST) menggunakan instrumen inframerah dekat (NIRCam), menampilkan ribuan bintang muda yang baru lahir dalam awan debu.',
  url: 'https://images-assets.nasa.gov/image/PIA25658/PIA25658~orig.jpg',
  hdurl: 'https://images-assets.nasa.gov/image/PIA25658/PIA25658~orig.jpg',
  copyright: 'NASA, ESA, CSA, STScI',
  media_type: 'image'
};

export default function NasaApodSection() {
  const [apod, setApod] = useState(FALLBACK_APOD);
  const [loading, setLoading] = useState(true);
  const [showHdModal, setShowHdModal] = useState(false);

  const fetchApod = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
      if (!res.ok) throw new Error('Failed to fetch from NASA API');
      const data = await res.json();
      if (data && data.url) {
        setApod(data);
      }
    } catch (err) {
      console.warn('Using NASA APOD Fallback data:', err.message);
      setApod(FALLBACK_APOD);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApod();
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4 backdrop-blur-md">
          <Camera className="w-4 h-4" />
          <span>Live Feed NASA Direct</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-100 to-emerald-400 mb-4">
          Astronomy Picture of the Day (APOD)
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Setiap hari NASA menampilkan foto kosmik menakjubkan yang dipilih langsung oleh astronom profesional.
        </p>
      </div>

      {/* Main APOD Display Card */}
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[350px] gap-4">
            <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin" />
            <p className="text-gray-400 text-sm">Menghubungkan ke API NASA...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image Container */}
            <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
              {apod.media_type === 'video' ? (
                <iframe
                  src={apod.url}
                  title={apod.title}
                  className="w-full h-80 md:h-96 rounded-2xl"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10]">
                  {/* Image */}
                  <img
                    src={apod.url}
                    alt={apod.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Fullscreen HD Button Overlay */}
                  <button
                    onClick={() => setShowHdModal(true)}
                    className="absolute bottom-4 right-4 bg-slate-900/90 hover:bg-emerald-600 border border-slate-700 hover:border-emerald-400 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 backdrop-blur-md transition-all shadow-xl"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Lihat Ukuran Penuh (HD)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Content & Metadata */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                    <Calendar className="w-3.5 h-3.5" />
                    {apod.date}
                  </span>
                  {apod.copyright && (
                    <span className="text-xs text-gray-400 bg-slate-950/60 px-3 py-1 rounded-full border border-slate-800">
                      © {apod.copyright.trim()}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
                  {apod.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-6 md:line-clamp-none">
                  {apod.explanation}
                </p>
              </div>

              {/* Action Bar */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={fetchApod}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Muat Ulang APOD</span>
                </button>

                <a
                  href={apod.hdurl || apod.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
                >
                  <span>Buka di NASA</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen HD Modal */}
      {showHdModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setShowHdModal(false)}
        >
          <div className="relative max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
            <img
              src={apod.hdurl || apod.url}
              alt={apod.title}
              className="max-h-[85vh] w-auto mx-auto object-contain"
            />
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-center">
              <h4 className="text-white font-bold text-lg">{apod.title}</h4>
              <p className="text-gray-400 text-xs mt-1">Klik di mana saja untuk menutup</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
