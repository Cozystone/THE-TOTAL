'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Symbol } from '@/components/Symbol';
import { HOUSE_MENU, MENU, NAV, SITE } from '@/lib/copy';

/*
 * 머리 — 고정. 주 메뉴는 실제로 들어오는 길, 캠페인은 THE TOTAL 패널 안.
 *  데스크톱: THE TOTAL(로고) | 시작하기 · 교육과정 · 온라인 진단 · 입학 안내 · THE TOTAL ＋(패널)
 *  휴대폰:   THE TOTAL(로고) | ☰ (전체 화면 패널)
 *  스크롤 전: 사진 위의 반투명 흰 유리 / 스크롤 후: 거의 흰 불투명 + 얇은 하단선.
 *  패널: 캠페인(첫 질문 · 나의 INDEX · 세계) / THE HOUSE.
 */
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closer = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = 'hidden';
    closer.current?.focus();
    const btn = opener.current;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      btn?.focus();
    };
  }, [open]);

  const current = (href: string) => (path === href || (href !== '/' && path.startsWith(`${href}/`)) ? 'page' : undefined);
  const close = () => setOpen(false);
  const show = (e: React.MouseEvent<HTMLButtonElement>) => {
    opener.current = e.currentTarget;
    setOpen(true);
  };

  return (
    <>
      <header className={scrolled ? 'head head-scrolled' : 'head'}>
        <Link className="brand" href="/" aria-label={`${SITE.name} — 처음으로`}>
          <Symbol size={24} animate />
          <span className="wordmark">{SITE.name}</span>
        </Link>
        <nav className="menu" aria-label="주 메뉴">
          {NAV.map((m) => (
            <Link key={m.href} href={m.href} aria-current={current(m.href)}>
              {m.label}
            </Link>
          ))}
          <button type="button" className="menu-panel" aria-expanded={open} aria-controls="sheet" onClick={show}>
            THE TOTAL <span aria-hidden="true">＋</span>
          </button>
        </nav>
        <button type="button" className="menu-button" aria-expanded={open} aria-controls="sheet" aria-label="메뉴 열기" onClick={show}>
          <i aria-hidden="true" />
          <i aria-hidden="true" />
        </button>
      </header>

      {open && (
        <div className="sheet" id="sheet" role="dialog" aria-modal="true" aria-label="메뉴">
          <div className="sheet-head">
            <span className="wordmark">{SITE.name}</span>
            <button ref={closer} type="button" className="sheet-close" onClick={close}>
              닫기
            </button>
          </div>
          <div className="sheet-cols">
            <nav className="sheet-menu sheet-house" aria-label="THE HOUSE">
              <p className="sheet-label">THE HOUSE</p>
              {HOUSE_MENU.map((m) => (
                <Link key={m.href} href={m.href} aria-current={current(m.href)} onClick={close}>
                  {m.label}
                </Link>
              ))}
            </nav>
            <nav className="sheet-menu" aria-label="캠페인">
              <p className="sheet-label">캠페인 · {SITE.season}</p>
              {MENU.map((m) => (
                <Link key={m.href} href={m.href} aria-current={current(m.href)} onClick={close}>
                  {m.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="sheet-foot">{SITE.place}</p>
        </div>
      )}
    </>
  );
}
