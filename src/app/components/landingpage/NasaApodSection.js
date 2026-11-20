'use client';

import { useEffect, useRef, useState } from 'react';
import { Maximize2, ExternalLink, RefreshCw, X } from 'lucide-react';

const FALLBACK_APOD = {
  title: 'Pilar-Pilar Penciptaan (Peta Inframerah JWST)',
  date: '2022-10-19',
  explanation:
    'Struktur debu dan gas antarbintang raksasa di Nebula Elang (M16), berjarak sekitar 6.500 tahun cahaya dari Bumi. Citra ini ditangkap oleh instrumen NIRCam Teleskop Antariksa James Webb (JWST), memperlihatkan bintang-bintang muda di dalam awan debu padat.',
  url: 'https://apod.nasa.gov/apod/image/2210/PillarsJWST_nircam_960.jpg',
  hdurl: 'https://apod.nasa.gov/apod/image/2210/PillarsJWST_nircam_960.jpg',
  copyright: 'NASA, ESA, CSA, STScI',
  media_type: 'image',
};

const SECONDARY_FALLBACK = '/images/planets/nebula.png';

export default function NasaApodSection() {
  const [apod, setApod] = useState(FALLBACK_APOD);
  const [loading, setLoading] = useState(true);
  const [sourceMode, setSourceMode] = useState('archive');
  const [showHdModal, setShowHdModal] = useState(false);
  const [currentImgUrl, setCurrentImgUrl] = useState(FALLBACK_APOD.url);
  const closeModalRef = useRef(null);
  const triggerModalRef = useRef(null);

  const fetchApod = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
      if (!res.ok) throw new Error('NASA API rate limit atau tidak tersedia');
      const data = await res.json();
      const rawUrl = typeof data?.url === 'string' ? data.url : '';
      const rawTitle = typeof data?.title === 'string' ? data.title.trim() : '';
      const isLogoOrGeneric =
        !rawUrl ||
        /nasa-logo|placeholder/i.test(rawUrl) ||
        /^nasa science$/i.test(rawTitle);
      const isSupportedMedia =
        data?.media_type === 'image' ||
        (data?.media_type === 'video' && /youtube|vimeo|player/i.test(rawUrl));

      if (data && isSupportedMedia && !isLogoOrGeneric) {
        setApod(data);
        setCurrentImgUrl(rawUrl);
        setSourceMode('live');
      } else {
        setApod(FALLBACK_APOD);
        setCurrentImgUrl(FALLBACK_APOD.url);
        setSourceMode('archive');
      }
    } catch {
      setApod(FALLBACK_APOD);
      setCurrentImgUrl(FALLBACK_APOD.url);
      setSourceMode('archive');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApod();
  }, []);

  useEffect(() => {
    if (!showHdModal) return;
    closeModalRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowHdModal(false);
        triggerModalRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showHdModal]);

  return (
    <section
      id="apod"
      aria-labelledby="apod-heading"
      className="py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/10"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="max-w-2xl">
          <h2
            id="apod-heading"
            className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-ink-primary leading-tight mb-2"
          >
            Astronomy Picture of the Day
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed">
            Citra astronomi harian pilihan NASA beserta penjelasan ilmiah dari pengamatan observatorium dunia.
          </p>
        </div>

        <span className="font-mono text-xs text-ink-secondary border border-white/15 bg-space-black/80 rounded-md px-3 py-1.5 self-start sm:self-auto">
          {sourceMode === 'live' ? 'Sumber: NASA APOD Live' : 'Sumber: Arsip JWST (Fallback)'}
        </span>
      </div>

      <div className="rounded-xl border border-white/12 bg-space-abyss/80 p-5 sm:p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[320px] gap-3">
            <RefreshCw className="w-6 h-6 text-cyan-glow animate-spin" aria-hidden="true" />
            <p className="font-mono text-xs text-ink-secondary">
              Mengambil citra dari NASA APOD...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-white/12 bg-space-black">
              {apod.media_type === 'video' ? (
                <iframe
                  src={apod.url}
                  title={apod.title}
                  className="w-full aspect-video"
                  allowFullScreen
                />
              ) : (
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={currentImgUrl}
                    alt={apod.title}
                    width={960}
                    height={600}
                    onError={() => setCurrentImgUrl(SECONDARY_FALLBACK)}
                    className="w-full h-full object-cover"
                  />
                  <button
                    ref={triggerModalRef}
                    type="button"
                    onClick={() => setShowHdModal(true)}
                    className="absolute bottom-3 right-3 min-h-[40px] px-3.5 rounded-lg border border-white/20 bg-space-black/85 backdrop-blur-md text-ink-primary hover:border-cyan-glow text-xs font-medium inline-flex items-center gap-2 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-glow" aria-hidden="true" />
                    <span>Perbesar HD</span>
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink-muted mb-3">
                  <span className="text-amber-star tabular-nums">{apod.date}</span>
                  {apod.copyright && <span>Kredit: {apod.copyright.trim()}</span>}
                </div>

                <h3 className="font-display text-2xl font-bold text-ink-primary leading-snug mb-3">
                  {apod.title}
                </h3>

                <p className="text-sm text-ink-secondary leading-relaxed max-w-[55ch]">
                  {apod.explanation}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={fetchApod}
                  className="min-h-[44px] px-4 rounded-lg border border-white/20 bg-space-black/75 hover:border-cyan-glow text-ink-primary text-xs font-medium inline-flex items-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-cyan-glow" aria-hidden="true" />
                  <span>Muat Ulang</span>
                </button>

                <a
                  href={apod.hdurl || apod.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 rounded-lg bg-cyan-glow text-space-navy hover:bg-ink-primary text-xs font-bold inline-flex items-center gap-2 transition-colors"
                >
                  <span>Buka Sumber NASA</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {showHdModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau resolusi penuh ${apod.title}`}
          onClick={() => {
            setShowHdModal(false);
            triggerModalRef.current?.focus();
          }}
          className="fixed inset-0 z-50 bg-space-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-modal-reveal relative max-w-5xl w-full rounded-xl border border-white/15 bg-space-abyss p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <h3 className="font-display text-base sm:text-lg font-bold text-ink-primary truncate">
                {apod.title}
              </h3>
              <button
                ref={closeModalRef}
                type="button"
                onClick={() => {
                  setShowHdModal(false);
                  triggerModalRef.current?.focus();
                }}
                aria-label="Tutup pratinjau HD"
                className="min-w-[40px] min-h-[40px] rounded-lg border border-white/20 text-ink-primary hover:border-cyan-glow inline-flex items-center justify-center shrink-0"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <img
              src={apod.hdurl || currentImgUrl}
              alt={apod.title}
              onError={(e) => {
                e.currentTarget.src = SECONDARY_FALLBACK;
              }}
              className="w-full max-h-[75dvh] object-contain rounded-lg bg-space-black"
            />
          </div>
        </div>
      )}
    </section>
  );
}
