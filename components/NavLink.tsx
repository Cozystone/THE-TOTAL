'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

/*
 * 문서 사이 이동 — 사이트의 모든 내부 링크가 같은 방식으로 옮겨진다.
 *   누르면 본문이 짧게(160ms) 흐려지고, 새 페이지는 Stage 가 6px 아래에서 올라오며 선명해진다(420ms).
 *   같은 페이지 안의 이동(#…)은 브라우저의 부드러운 스크롤에 맡긴다.
 *   새 탭 · 수정 키 클릭 · 동작 줄이기 설정은 브라우저 기본 그대로.
 * NavFx 하나가 window 에서 클릭을 먼저 받아 처리한다. Link 는 defaultPrevented 를 보고 스스로 이동하지 않는다.
 */
export const LEAVE_MS = 160;

export function NavFx() {
  const router = useRouter();
  const path = usePathname();

  // 새 페이지가 그려지면 나감 표시를 지운다
  useEffect(() => {
    delete document.documentElement.dataset.leaving;
  }, [path]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // 같은 페이지 — 해시 이동은 브라우저에
      e.preventDefault();
      const href = url.pathname + url.search + url.hash;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(href);
        return;
      }
      document.documentElement.dataset.leaving = '';
      window.setTimeout(() => router.push(href), LEAVE_MS);
    };
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, [router]);

  return null;
}

/** 링크를 누르기 직전에 할 일(메뉴 닫기 등)만 맡는다. 이동은 NavFx 가 한다. */
export function useGo() {
  return (_e: React.MouseEvent<HTMLAnchorElement>, _href: string, before?: () => void) => {
    before?.();
  };
}

export function NavLink({
  href,
  className,
  children,
  ...rest
}: { href: string; className?: string; children: React.ReactNode } & React.AriaAttributes) {
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
