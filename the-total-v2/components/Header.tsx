'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Symbol } from '@/components/Symbol';
import { HOUSE_MENU, MENU, SITE } from '@/lib/copy';

/*
 * 머리 — 고정. 메뉴는 한국어(브랜드명 · INDEX 만 영문).
 *  데스크톱: THE TOTAL | 첫 질문 · 나의 INDEX · 세계 · 입학 안내 | 메뉴
 *  휴대폰: THE TOTAL | 메뉴
 *  모든 페이지에서 같은 머리 — 반투명 아이보리 + 블러의 얇은 라벨(entry.css). 사진 위에서도 글자가 깨지지 않는다.
 *  메뉴: 전체 화면 — 캠페인 / THE HOUSE.
 */
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const closer = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement>(null);

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

  const current = (href: string) => (path === href ? 'page' : undefined);
  const close = () => setOpen(false);

  return (
    <>
      <header className="head">
        <Link className="brand" href="/" aria-label={`${SITE.name} — ${SITE.season}`}>
          <Symbol size={24} animate />
          <span className="wordmark">{SITE.name}</span>
        </Link>
        <nav className="menu" aria-label="캠페인">
          {MENU.map((m) => (
            <Link key={m.href} href={m.href} aria-current={current(m.href)}>
              {m.label}
            </Link>
          ))}
          <Link href="/admissions" aria-current={current('/admissions')}>
            입학 안내
          </Link>
        </nav>
        <button
          ref={opener}
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="sheet"
          onClick={() => setOpen(true)}
        >
          메뉴
        </button>
      </header>

      {open && (
        <div className="sheet" id="sheet" role="dialog" aria-modal="true" aria-label="메뉴">
          <div className="sheet-head">
            <span className="wordmark">{SITE.name}</span>
            <button ref={closer} type="button" className="menu-button" onClick={close}>
              닫기
            </button>
          </div>
          <div className="sheet-cols">
            <nav className="sheet-menu" aria-label="캠페인">
              <p className="sheet-label">캠페인</p>
              {MENU.map((m) => (
                <Link key={m.href} href={m.href} aria-current={current(m.href)} onClick={close}>
                  {m.label}
                </Link>
              ))}
            </nav>
            <nav className="sheet-menu sheet-house" aria-label="THE HOUSE">
              <p className="sheet-label">THE HOUSE</p>
              {HOUSE_MENU.map((m) => (
                <Link key={m.href} href={m.href} aria-current={current(m.href)} onClick={close}>
                  {m.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="sheet-foot">
            {SITE.season} · {SITE.place}
          </p>
        </div>
      )}
    </>
  );
}
