'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

/*
 * 페이지 전환 — View Transitions API.
 *  - 내부 링크를 누르면 document.startViewTransition 안에서 이동하고, 새 주소가 그려지면 전환을 끝낸다.
 *  - 모양은 CSS(entry.css): 이전 화면은 짧게 흐려지고, 다음 화면은 10px 아래에서 올라오며 선명해진다(280ms).
 *    사진은 루트 전체의 크로스페이드로 이어진다.
 *  - 누른 링크에는 data-pending 을 달아 '열어보는 중' 을 보여준다(CTA 는 글자 위에 덮어 쓰고, 그 외는 가벼운 진행 선).
 *  - prefers-reduced-motion: reduce 이거나 API 가 없으면 전환 없이 이동한다(진행 표시는 유지).
 */
export function RouteTransition() {
  const router = useRouter();
  const path = usePathname();
  const search = useSearchParams();
  const done = useRef<(() => void) | null>(null);
  const pending = useRef<HTMLElement | null>(null);

  // 새 주소가 그려졌다 — 전환을 끝내고 진행 표시를 지운다
  useEffect(() => {
    done.current?.();
    done.current = null;
    pending.current?.removeAttribute('data-pending');
    pending.current = null;
    document.documentElement.removeAttribute('data-navigating');
  }, [path, search]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // 같은 페이지 안의 이동(해시)은 브라우저에 맡긴다
      if (url.pathname === location.pathname && url.search === location.search) return;

      // Link 의 onClick(메뉴 닫기 등)은 그대로 돌고, Link 는 defaultPrevented 를 보고 스스로 이동하지 않는다
      e.preventDefault();

      // 속성만 단다(React 가 그린 글자는 건드리지 않는다). '열어보는 중' 은 CSS 가 덮어 보여준다
      a.setAttribute('data-pending', '');
      pending.current = a;
      document.documentElement.setAttribute('data-navigating', '');

      const href = url.pathname + url.search + url.hash;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const start = (document as Document & { startViewTransition?: (cb: () => Promise<void>) => unknown }).startViewTransition;
      if (reduce || !start) {
        router.push(href);
        return;
      }
      start.call(
        document,
        () =>
          new Promise<void>((resolve) => {
            done.current = resolve;
            router.push(href);
            // 같은 주소로 되돌아오는 등 그려지지 않는 경우를 대비
            setTimeout(resolve, 1600);
          }),
      );
    };
    // React(Link)보다 먼저 받는다 — 캡처 단계의 window
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, [router]);

  return null;
}
