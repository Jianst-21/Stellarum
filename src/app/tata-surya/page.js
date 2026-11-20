import { Suspense } from 'react';
import TataSuryaClient from '@/app/tata-surya/TataSuryaClient';

export const metadata = {
  title: 'Simulasi Tata Surya 3D: Stellarum',
  description:
    'Observatorium interaktif Tata Surya 3D real-time dengan latar Bima Sakti prosedural, orbit planet, satelit Galilean, komet, JWST, dan Voyager 1.',
};

export default function TataSuryaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh w-full bg-space-black flex items-center justify-center font-mono text-xs tracking-wider text-cyan-glow">
          Menyiapkan ruang observatorium 3D...
        </div>
      }
    >
      <TataSuryaClient />
    </Suspense>
  );
}
