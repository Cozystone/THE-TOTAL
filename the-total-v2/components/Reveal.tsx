'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/* [data-reveal] 요소가 화면에 들어올 때 한 번 떠오른다. 동작 줄이기 설정이면 그대로 보인다. */
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.reveal = 'shown';
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      el.dataset.reveal = 'pending';
      io.observe(el);
    });
    return () => io.disconnect();
  }, [path]);
  return null;
}
