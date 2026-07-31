import './globals.css';

export const metadata = {
  title: 'Stellarum — Portal Eksplorasi Astronomi & 3D Tata Surya',
  description: 'Website edukasi astronomi interaktif dan visualisasi 3D Tata Surya dibangun dengan Next.js dan Three.js.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
