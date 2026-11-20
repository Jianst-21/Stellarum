import Link from 'next/link';
import StarfieldBg from '@/app/components/global/StarfieldBg';
import Navbar from '@/app/components/global/Navbar';
import Footer from '@/app/components/global/Footer';

export const metadata = {
  title: 'Instrumen Observasi Antariksa: Stellarum',
  description:
    'Teleskop antariksa dan wahana penjelajah nyata yang memperluas pengamatan astronomi modern: JWST, Hubble, Voyager, dan Event Horizon Telescope.',
};

const INSTRUMENTS = [
  {
    name: 'James Webb Space Telescope (JWST)',
    agency: 'NASA, ESA, CSA',
    launched: '25 Desember 2021',
    location: 'Titik Lagrange L2 (1,5 juta km dari Bumi)',
    spectrum: 'Inframerah dekat dan tengah (0,6 sampai 28,5 mikrometer)',
    summary:
      'Menggunakan 18 segmen cermin heksagonal berilium berlapis emas berdiameter total 6,5 meter dan perisai surya lima lapis untuk menjaga suhu instrumen di bawah -220°C.',
    milestone:
      'Mendeteksi galaksi paling awal beberapa ratus juta tahun setelah Big Bang dan memetakan komposisi kimia atmosfer eksoplanet.',
    focusId: 'jwst',
  },
  {
    name: 'Hubble Space Telescope (HST)',
    agency: 'NASA dan ESA',
    launched: '24 April 1990',
    location: 'Orbit rendah Bumi (ketinggian sekitar 535 km)',
    spectrum: 'Ultraviolet, cahaya tampak, dan inframerah dekat',
    summary:
      'Beroperasi di atas atmosfer Bumi yang mendistorsi cahaya, Hubble memiliki cermin primer 2,4 meter dan telah melayani lebih dari tiga dekade pengamatan presisi.',
    milestone:
      'Menentukan laju ekspansi alam semesta secara presisi, memotret Hubble Ultra Deep Field, dan mengamati tumbukan komet Shoemaker-Levy 9 di Jupiter.',
    focusId: null,
  },
  {
    name: 'Wahana Antariksa Voyager 1 dan 2',
    agency: 'NASA Jet Propulsion Laboratory',
    launched: 'Agustus dan September 1977',
    location: 'Ruang antarbintang (>24 miliar km dari Bumi)',
    spectrum: 'Magnetometer, spektrometer plasma, dan instrumen sinar kosmik',
    summary:
      'Memanfaatkan konfigurasi langka planet luar setiap 176 tahun, Voyager melakukan flyby Jupiter, Saturnus, Uranus, dan Neptunus sebelum menembus batas heliosfer.',
    milestone:
      'Menjadi objek buatan manusia pertama yang memasuki ruang antarbintang dan menemukan aktivitas vulkanik di Io serta cincin tipis Jupiter.',
    focusId: 'voyager1',
  },
  {
    name: 'Event Horizon Telescope (EHT)',
    agency: 'Konsorsium Observatorium Radio Global',
    launched: 'Operasi kolaboratif global sejak 2017',
    location: 'Jaringan teleskop radio lintas benua (VLBI)',
    spectrum: 'Gelombang radio milimeter (1,3 mm / 230 GHz)',
    summary:
      'Menghubungkan observatorium radio di Chili, Hawaii, Eropa, Meksiko, Arizona, dan Kutub Selatan menggunakan jam atom untuk membentuk teleskop virtual seukuran Bumi.',
    milestone:
      'Menghasilkan citra langsung pertama bayangan lubang hitam supermasif M87* (2019) dan Sagittarius A* di pusat Bima Sakti (2022).',
    focusId: null,
  },
];

export default function TeknologiPage() {
  return (
    <div className="relative min-h-dvh bg-space-black text-ink-primary">
      <StarfieldBg />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-20">
        <header className="max-w-2xl pb-8 mb-10 border-b border-white/12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.025em] text-ink-primary leading-tight mb-3">
            Instrumen Observasi Antariksa
          </h1>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
            Teleskop orbit, jaringan radio lintas benua, dan wahana antarbintang yang menghasilkan data astronomi modern.
          </p>
        </header>

        <div className="divide-y divide-white/12 border-b border-white/12">
          {INSTRUMENTS.map((inst) => (
            <article
              key={inst.name}
              className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              <div className="lg:col-span-4">
                <span className="font-mono text-xs text-amber-star block mb-1.5">
                  {inst.agency}
                </span>
                <h2 className="font-display text-2xl font-bold text-ink-primary leading-snug mb-3">
                  {inst.name}
                </h2>

                {inst.focusId && (
                  <Link
                    href={`/tata-surya?objek=${inst.focusId}`}
                    className="min-h-[40px] px-4 rounded-lg border border-cyan-glow/40 bg-space-abyss/80 text-cyan-glow hover:bg-cyan-glow hover:text-space-navy text-xs font-bold inline-flex items-center transition-colors"
                  >
                    Lihat posisi di Tata Surya 3D
                  </Link>
                )}
              </div>

              <div className="lg:col-span-8 space-y-5">
                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-[65ch]">
                  {inst.summary}
                </p>

                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-white/12 bg-space-abyss/75 p-4 sm:p-5">
                  <div>
                    <dt className="font-mono text-[11px] text-ink-muted">Peluncuran / Operasi</dt>
                    <dd className="font-mono text-xs text-ink-primary mt-1">{inst.launched}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] text-ink-muted">Lokasi</dt>
                    <dd className="font-mono text-xs text-ink-primary mt-1">{inst.location}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] text-ink-muted">Spektrum / Metode</dt>
                    <dd className="font-mono text-xs text-ink-primary mt-1">{inst.spectrum}</dd>
                  </div>
                </dl>

                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-[65ch]">
                  <strong className="text-ink-primary font-semibold">Capaian utama: </strong>
                  {inst.milestone}
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
