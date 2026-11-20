'use client';

import dynamic from 'next/dynamic';

const SpaceDomeCanvas = dynamic(
  () => import('@/app/components/global/SpaceDomeCanvas'),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-space-black"
      />
    ),
  }
);

export default function StarfieldBg() {
  return <SpaceDomeCanvas />;
}
