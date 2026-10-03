import type { NextConfig } from 'next';

const security = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'same-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  async headers() {
    return [{ source: '/:path*', headers: security }];
  },
  // 이전 판의 주소는 지금의 문서로 보낸다
  async redirects() {
    return [
      { source: '/record', destination: '/about', permanent: false },
      { source: '/admissions', destination: '/entry', permanent: false },
      { source: '/notices', destination: '/entry', permanent: false },
      { source: '/philosophy', destination: '/method', permanent: false },
      { source: '/s-01', destination: '/about', permanent: false },
      { source: '/records', destination: '/about', permanent: false },
      { source: '/institution', destination: '/about', permanent: false },
      { source: '/criteria', destination: '/programs', permanent: false },
      { source: '/research', destination: '/about', permanent: false },
      { source: '/program', destination: '/entry', permanent: false },
    ];
  },
};

export default nextConfig;
