import Link from 'next/link';
import { MENU, SITE } from '@/lib/copy';

/* 바닥 — 한 줄 정의, 메뉴, 운영 사이트로 가는 길. */
export function Footer() {
  return (
    <footer className="foot">
      <p className="foot-line">{SITE.line}</p>
      <div className="foot-row">
        <nav aria-label="바닥 메뉴">
          <Link href="/">처음</Link>
          {MENU.map((m) => (
            <Link key={m.href} href={m.href}>
              {m.label}
            </Link>
          ))}
        </nav>
        <a className="foot-academy" href={SITE.academy}>
          ACADEMY — 진단 · 입학시험 · 공지 <span aria-hidden="true">↗</span>
        </a>
        <span className="foot-place">{SITE.place}</span>
      </div>
    </footer>
  );
}
