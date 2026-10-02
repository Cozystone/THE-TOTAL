import type { Metadata, Viewport } from 'next';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './globals.css';
import './house.css';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Reveal } from '@/components/Reveal';
import { SITE } from '@/lib/copy';

export const metadata: Metadata = {
  title: { default: `${SITE.name} — ${SITE.season}`, template: `%s — ${SITE.name}` },
  description: '당신은 정말 당신을 위한 공부를 하고 있나요?',
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: '/symbol.svg' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0d0d0d' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <a className="skip" href="#main">
          본문으로 건너뛰기
        </a>
        <Header />
        {children}
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
