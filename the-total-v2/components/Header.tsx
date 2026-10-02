'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Symbol } from '@/components/Symbol';
import { HOUSE_MENU, MENU, SITE } from '@/lib/copy';

/*
 * 머리 — 고정, difference 블렌드(사진 위에서도 종이 위에서도 읽힌다).
 *  늘 보이는 층: 캠페인(THE QUESTION · THE INDEX · THE WORLD) + ADMISSIONS + MENU.
 *  MENU: 전체 화면 — 왼쪽 S.01 캠페인, 오른쪽 THE HOUSE(소개 · 과정 · FORUM · 진단 · 입학 · 공지).
 *  THE HOUSE 페이지에서는 종이 바탕 · 잉크 글자의 단단한 머리로 바뀐다(본문과 겹치지 않게).
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
  // 캠페인 장면 위에서는 투명 · difference 블렌드, THE HOUSE(글이 많은 페이지)에서는 종이 바탕의 단단한 머리
  const campaign = path === '/' || MENU.some((m) => m.href !== '/' && path === m.href);
  const close = () => setOpen(false);

  return (
    <>
      <header className={campaign ? 'head' : 'head head-solid'}>
        <Link className="brand" href="/" aria-label={`${SITE.name} — ${SITE.season}`}>
          <Symbol size={24} animate />
          <span className="wordmark">{SITE.name}</span>
        </Link>
        <nav className="menu" aria-label="캠페인">
          {MENU.slice(1).map((m) => (
            <Link key={m.href} href={m.href} aria-current={current(m.href)}>
              {m.label}
            </Link>
          ))}
          <Link className="menu-strong" href="/admissions" aria-current={current('/admissions')}>
            ADMISSIONS
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
          MENU
        </button>
      </header>

      {open && (
        <div className="sheet" id="sheet" role="dialog" aria-modal="true" aria-label="메뉴">
          <div className="sheet-head">
            <span className="wordmark">{SITE.name}</span>
            <button ref={closer} type="button" className="menu-button" onClick={close}>
              CLOSE
            </button>
          </div>
          <div className="sheet-cols">
            <nav className="sheet-menu" aria-label="캠페인">
              <p className="sheet-label">{SITE.season}</p>
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
                  <span>{m.label}</span>
                  <small>{m.ko}</small>
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
