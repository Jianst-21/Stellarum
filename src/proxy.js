import { NextResponse } from 'next/server';

export function proxy(request) {
  const response = NextResponse.next();

  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://*.nasa.gov https://apod.nasa.gov https://images-assets.nasa.gov https://*.wikimedia.org https://upload.wikimedia.org",
      "worker-src 'self' blob:",
      "connect-src 'self' https://api.nasa.gov https://*.nasa.gov",
    ].join('; ')
  );

  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
