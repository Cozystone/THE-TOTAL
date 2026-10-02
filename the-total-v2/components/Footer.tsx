import Link from 'next/link';
import { FOOT_MENU, MENU, SITE } from '@/lib/copy';

/* 바닥 — 캠페인과 THE HOUSE 를 두 줄로. */
export function Footer() {
  return (
    <footer className="foot">
      <div className="foot-row">
        <span className="foot-season">
          {SITE.name} <span>{SITE.season}</span>
        </span>
        <nav aria-label="캠페인">
          <Link href="/start">시작하기</Link>
          {MENU.map((m) => (
            <Link key={m.href} href={m.href}>
              {m.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="foot-row foot-row-house">
        <span className="foot-season">THE HOUSE</span>
        <nav aria-label="THE HOUSE">
          {FOOT_MENU.map((m) => (
            <Link key={m.href} href={m.href}>
              {m.label}
            </Link>
          ))}
        </nav>
        <span className="foot-place">{SITE.place}</span>
      </div>
    </footer>
  );
}
