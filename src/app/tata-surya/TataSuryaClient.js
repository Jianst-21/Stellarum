'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const SolarSystem3D = dynamic(() => import('@/app/components/SolarSystem3D'), {
  ssr: false,
  loading: () => (
    <div className="min-h-dvh w-full bg-space-black flex items-center justify-center font-mono text-xs tracking-wider text-cyan-glow">
      Memuat simulasi Tata Surya 3D...
    </div>
  ),
});

export default function TataSuryaClient() {
  const searchParams = useSearchParams();
  const initialObject = searchParams.get('objek') || null;

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-space-black">
      <SolarSystem3D initialObjectId={initialObject} fullscreen />
    </main>
  );
}
