import type { Metadata, Viewport } from 'next';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './globals.css';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { GrainDefs } from '@/components/Plate';
import { Reveal } from '@/components/Reveal';
import { SITE } from '@/lib/copy';

export const metadata: Metadata = {
  title: { default: 'THE TOTAL', template: '%s — THE TOTAL' },
  description: SITE.line,
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: '/symbol.svg' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#141414', colorScheme: 'light' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <a className="skip" href="#main">
          본문으로 건너뛰기
        </a>
        <GrainDefs />
        <Header />
        {children}
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
