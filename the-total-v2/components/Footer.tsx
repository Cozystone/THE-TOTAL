import Link from 'next/link';
import { MENU, SITE } from '@/lib/copy';

/* 바닥 — 시즌 표기, 메뉴, 위치. */
export function Footer() {
  return (
    <footer className="foot">
      <div className="foot-row">
        <span className="foot-season">
          {SITE.name} <span>{SITE.season}</span>
        </span>
        <nav aria-label="바닥 메뉴">
          {MENU.map((m) => (
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
