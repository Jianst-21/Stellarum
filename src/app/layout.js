import { Titillium_Web, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-titillium-web',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Stellarum: Portal Eksplorasi Astronomi dan Tata Surya 3D',
  description:
    'Portal edukasi astronomi interaktif dengan simulasi Tata Surya 3D real-time, laboratorium skala planet, dan katalog objek langit.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${titilliumWeb.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/textures/planets/earth.jpg" />
        <link rel="preload" as="image" href="/textures/planets/earthclouds.jpg" />
      </head>
      <body className="antialiased bg-space-black text-ink-primary font-body selection:bg-cyan-glow/30 selection:text-ink-primary">
        {children}
      </body>
    </html>
  );
}
