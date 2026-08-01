/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.nasa.gov https://apod.nasa.gov https://images-assets.nasa.gov https://*.wikimedia.org https://upload.wikimedia.org",
              "worker-src 'self' blob:",
              "connect-src 'self' https://api.nasa.gov https://*.nasa.gov",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
