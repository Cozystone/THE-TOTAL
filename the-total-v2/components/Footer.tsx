import Link from 'next/link';
import { MENU, SITE } from '@/lib/copy';

/* 바닥 — 시즌 표기, 메뉴, 운영 사이트로 가는 길. */
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
          <a href={SITE.academy}>
            ACADEMY — 진단 · 입학시험 · 공지 <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <span className="foot-place">{SITE.place}</span>
      </div>
    </footer>
  );
}
