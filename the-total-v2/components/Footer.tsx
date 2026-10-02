import Link from 'next/link';
import { HOUSE_MENU, MENU, SITE } from '@/lib/copy';

/* 바닥 — 캠페인과 THE HOUSE 를 두 줄로. */
export function Footer() {
  return (
    <footer className="foot">
      <div className="foot-row">
        <span className="foot-season">
          {SITE.name} <span>{SITE.season}</span>
        </span>
        <nav aria-label="캠페인">
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
          {HOUSE_MENU.map((m) => (
            <Link key={m.href} href={m.href}>
              {m.ko}
            </Link>
          ))}
        </nav>
        <span className="foot-place">{SITE.place}</span>
      </div>
    </footer>
  );
}
