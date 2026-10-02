'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

/*
 * 문서 사이 이동. 실제 라우트 이동(URL 변경 · 뒤로/앞으로 정상)이되,
 * 본문을 먼저 0.3초에 걸쳐 흐리게 내보낸 뒤 옮긴다(새 페이지는 Stage 가 들인다).
 * 새 탭 · 수정 키 클릭과 동작 줄이기 설정은 브라우저 기본 그대로.
 */
export const LEAVE_MS = 300;

export function useGo() {
  const router = useRouter();
  const path = usePathname();
  return (e: React.MouseEvent<HTMLAnchorElement>, href: string, before?: () => void) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    before?.();
    const [target, hash] = href.split('#');
    if (target === path) {
      if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(href);
      return;
    }
    document.documentElement.dataset.leaving = '';
    window.setTimeout(() => router.push(href), LEAVE_MS);
  };
}

export function NavLink({
  href,
  className,
  children,
  ...rest
}: { href: string; className?: string; children: React.ReactNode } & React.AriaAttributes) {
  const go = useGo();
  return (
    <Link href={href} className={className} onClick={(e) => go(e, href)} {...rest}>
      {children}
    </Link>
  );
}
