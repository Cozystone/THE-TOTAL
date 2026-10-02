'use client';

import { useEffect, useRef } from 'react';

/*
 * 페이지 무대. 이동할 때마다 새로 붙는다(app/template.tsx).
 *  - 들어올 때: 무대 전체가 천천히 밝아진다(CSS stage-in).
 *  - [data-reveal] 요소는 화면에 들어올 때 차례로(110ms 간격) 떠오른다. 첫 화면 안의 것도 같은 순서로.
 * 동작 줄이기 설정이면 아무것도 숨기지 않는다.
 */
export function Stage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    delete document.documentElement.dataset.leaving; // 앞 페이지의 나감 표시 해제
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${n * 110}ms`;
          el.dataset.reveal = 'shown';
          io.unobserve(el);
          n++;
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );

    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      el.dataset.reveal = 'pending';
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="stage">
      {children}
    </div>
  );
}
