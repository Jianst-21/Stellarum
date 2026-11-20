import Link from 'next/link';
import Image from 'next/image';
import StarfieldBg from '@/app/components/global/StarfieldBg';
import Navbar from '@/app/components/global/Navbar';
import Footer from '@/app/components/global/Footer';

export const metadata = {
  title: 'Struktur Galaksi dan Objek Langit Dalam: Stellarum',
  description:
    'Katalog morfologi galaksi Bima Sakti, Andromeda M31, nebula pembentuk bintang, dan lubang hitam supermasif Sagittarius A*.',
};

const GALACTIC_OBJECTS = [
  {
    title: 'Bima Sakti (Milky Way)',
    type: 'Galaksi Spiral Berbatang (SBbc)',
    distance: '0 tahun cahaya (Rumah Tata Surya)',
    scale: 'Diameter sekitar 105.700 tahun cahaya',
    stars: '100 hingga 400 miliar bintang',
    desc: 'Galaksi tempat Tata Surya mengorbit sekitar 26.000 tahun cahaya dari pusat galaksi, membutuhkan sekitar 230 juta tahun untuk satu putaran penuh (tahun galaktik).',
    img: '/images/planets/bima_sakti.png',
  },
  {
    title: 'Galaksi Andromeda (M31)',
    type: 'Galaksi Spiral (SA(s)b)',
    distance: '2,54 juta tahun cahaya',
    scale: 'Diameter sekitar 152.000 tahun cahaya',
    stars: 'Sekitar 1 triliun bintang',
    desc: 'Galaksi spiral raksasa tetangga terdekat dari Bima Sakti sekaligus anggota terbesar Grup Lokal. Kedua galaksi diperkirakan akan bergabung sekitar 4,5 miliar tahun lagi.',
    img: '/images/planets/andromeda.png',
  },
  {
    title: 'Nebula Pembentuk Bintang',
    type: 'Wilayah H II dan Awan Molekuler',
    distance: '1.300 hingga 7.000 tahun cahaya',
    scale: 'Puluhan tahun cahaya',
    stars: 'Ribuan bintang muda',
    desc: 'Awan raksasa hidrogen, helium, dan debu antarbintang yang runtuh akibat gravitasi membentuk protobintang serta sistem keplanetan baru.',
    img: '/images/planets/nebula.png',
  },
  {
    title: 'Sagittarius A* (Sgr A*)',
    type: 'Lubang Hitam Supermasif',
    distance: '26.670 tahun cahaya',
    scale: 'Massa 4,3 juta kali Matahari',
    stars: 'Dikelilingi gugus bintang-S',
    desc: 'Pusat gravitasi kompak di jantung galaksi Bima Sakti. Citra cincin emisinya pertama kali dirilis oleh kolaborasi Event Horizon Telescope pada Mei 2022.',
    img: '/images/planets/black_hole.png',
  },
];

export default function GalaksiPage() {
  return (
    <div className="relative min-h-dvh bg-space-black text-ink-primary">
      <StarfieldBg />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-20">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-10 border-b border-white/12">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.025em] text-ink-primary leading-tight mb-3">
              Skala Galaksi dan Langit Dalam
            </h1>
            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
              Melampaui batas Tata Surya menuju struktur bintang raksasa, wilayah kelahiran bintang, dan inti gravitasi Grup Lokal.
            </p>
          </div>

          <Link
            href="/tata-surya"
            className="min-h-[44px] px-5 inline-flex items-center justify-center rounded-lg bg-cyan-glow text-space-navy text-sm font-bold hover:bg-ink-primary transition-colors self-start lg:self-auto"
          >
            Kembali ke Tata Surya 3D
          </Link>
        </header>

        <div className="space-y-6">
          {GALACTIC_OBJECTS.map((item) => (
            <article
              key={item.title}
              className="rounded-xl overflow-hidden border border-white/12 bg-space-abyss/80 grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto bg-space-black overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={640}
                  height={400}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div>
                  <span className="font-mono text-xs text-amber-star block mb-2">
                    {item.type}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-primary mb-3">
                    {item.title}
                  </h2>
                  <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-[60ch]">
                    {item.desc}
                  </p>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-white/10">
                  <div>
                    <dt className="font-mono text-[11px] text-ink-muted">Jarak</dt>
                    <dd className="font-mono text-xs sm:text-sm text-ink-primary mt-1 tabular-nums">
                      {item.distance}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] text-ink-muted">Skala Fisik</dt>
                    <dd className="font-mono text-xs sm:text-sm text-ink-primary mt-1 tabular-nums">
                      {item.scale}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] text-ink-muted">Populasi</dt>
                    <dd className="font-mono text-xs sm:text-sm text-cyan-glow mt-1 tabular-nums">
                      {item.stars}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
