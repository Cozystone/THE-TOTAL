'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Symbol } from '@/components/Symbol';
import { MENU, SITE } from '@/lib/copy';

/*
 * 머리 — 고정, difference 블렌드(사진 위에서도 종이 위에서도 읽힌다).
 * 메뉴(임시): S.01 · THE QUESTION · THE INDEX · THE WORLD. 1023px 이하는 메뉴 버튼 → 전체 화면.
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

  return (
    <>
      <header className="head">
        <Link className="brand" href="/" aria-label={`${SITE.name} — ${SITE.season}`}>
          <Symbol size={24} animate />
          <span className="wordmark">{SITE.name}</span>
        </Link>
        <nav className="menu" aria-label="주 메뉴">
          {MENU.map((m) => (
            <Link key={m.href} href={m.href} aria-current={path === m.href ? 'page' : undefined}>
              {m.label}
            </Link>
          ))}
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
            <button ref={closer} type="button" className="menu-button" onClick={() => setOpen(false)}>
              CLOSE
            </button>
          </div>
          <nav className="sheet-menu" aria-label="주 메뉴">
            {MENU.map((m) => (
              <Link key={m.href} href={m.href} aria-current={path === m.href ? 'page' : undefined} onClick={() => setOpen(false)}>
                {m.label}
              </Link>
            ))}
          </nav>
          <p className="sheet-foot">{SITE.season}</p>
        </div>
      )}
    </>
  );
}
