import type { Metadata, Viewport } from 'next';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './globals.css';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: { default: 'THE TOTAL', template: '%s — THE TOTAL' },
  description: 'THE TOTAL — 서울 대치의 개인화 교육기관. 온라인 개인진단 · 온라인 입학시험 · 초등 · 중등 · 고등 과정.',
  // 검색 노출은 공개 방식이 정해질 때까지 막아 둔다.
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: '/symbol.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <a className="skip" href="#main">
          본문으로 건너뛰기
        </a>
        <Header />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
