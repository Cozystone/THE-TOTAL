'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useGo } from '@/components/NavLink';
import { Symbol } from '@/components/Symbol';
import { HEADER_CTA, MENU, SITE } from '@/lib/site';

/*
 * 고정 머리(모든 페이지, sticky).
 *   [휘장] THE TOTAL      소개  교육과정  온라인 진단  입학 안내  공지   [입학시험 안내]
 * 메뉴는 독립 페이지로 이동. 현재 페이지만 밑줄.
 * 1023px 이하: 휘장 · THE TOTAL · 햄버거 → 전체 화면 메뉴(같은 다섯 항목 + 버튼).
 */
const SHEET_MS = 320;

export function Header() {
  const path = usePathname();
  const go = useGo();
  const openerRef = useRef<HTMLButtonElement>(null);
  const closerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const closeSheet = () => {
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, SHEET_MS);
  };

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    closerRef.current?.focus();
    const opener = openerRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setClosing(true);
        window.setTimeout(() => {
          setOpen(false);
          setClosing(false);
        }, SHEET_MS);
        return;
      }
      if (e.key !== 'Tab' || !sheetRef.current) return;
      const items = sheetRef.current.querySelectorAll<HTMLElement>('a, button');
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [open]);

  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? 'page' : undefined);

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <Link className="brand" href="/" aria-label={`${SITE.name} 홈`} onClick={(e) => go(e, '/')}>
            <Symbol size={34} animate className="insignia" />
            <span className="wordmark">{SITE.name}</span>
          </Link>

          <nav className="menu" aria-label="주 메뉴">
            {MENU.map((m) => (
              <Link key={m.href} href={m.href} aria-current={current(m.href)} onClick={(e) => go(e, m.href)}>
                {m.label}
              </Link>
            ))}
          </nav>

          <div className="masthead-end">
            <Link className="button button-sm" href={HEADER_CTA.href} onClick={(e) => go(e, HEADER_CTA.href)}>
              {HEADER_CTA.label}
            </Link>
            <button
              ref={openerRef}
              type="button"
              className="hamburger"
              aria-expanded={open}
              aria-controls="sheet"
              aria-label="메뉴 열기"
              onClick={() => setOpen(true)}
            >
              <i />
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="sheet"
          id="sheet"
          role="dialog"
          aria-modal="true"
          aria-label="메뉴"
          ref={sheetRef}
          data-closing={closing || undefined}
        >
          <div className="sheet-head">
            <Link className="brand" href="/" onClick={(e) => go(e, '/', closeSheet)}>
              <Symbol size={28} />
              <span className="wordmark">{SITE.name}</span>
            </Link>
            <button ref={closerRef} type="button" className="close" aria-label="메뉴 닫기" onClick={closeSheet}>
              <i />
              <i />
            </button>
          </div>

          <nav className="sheet-menu" aria-label="주 메뉴">
            {MENU.map((m) => (
              <Link key={m.href} href={m.href} aria-current={current(m.href)} onClick={(e) => go(e, m.href, closeSheet)}>
                {m.label}
              </Link>
            ))}
          </nav>

          <div className="sheet-foot">
            <Link className="button" href={HEADER_CTA.href} onClick={(e) => go(e, HEADER_CTA.href, closeSheet)}>
              {HEADER_CTA.label}
            </Link>
            <p>{SITE.place}</p>
          </div>
        </div>
      )}
    </>
  );
}
