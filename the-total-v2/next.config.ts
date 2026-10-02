import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  // 이전 V2 시안의 주소
  async redirects() {
    return [
      { source: '/house', destination: '/the-question', permanent: false },
      { source: '/scenes', destination: '/the-world', permanent: false },
      { source: '/study', destination: '/programs', permanent: false },
      { source: '/entry', destination: '/the-question', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
        ],
      },
    ];
  },
};

export default nextConfig;
