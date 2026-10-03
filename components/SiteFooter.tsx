import Link from 'next/link';
import { HEADER_CTA, MENU, SITE } from '@/lib/site';

/** 모든 페이지 끝 — 기관명 · 메뉴 · 위치. */
export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="site-foot-inner">
        <p className="site-foot-name">{SITE.name}</p>
        <nav aria-label="하단 메뉴">
          {MENU.map((m) => (
            <Link key={m.href} href={m.href}>
              {m.label}
            </Link>
          ))}
          <Link href={HEADER_CTA.href}>{HEADER_CTA.label}</Link>
        </nav>
        <p className="site-foot-place">{SITE.place}</p>
      </div>
    </footer>
  );
}
