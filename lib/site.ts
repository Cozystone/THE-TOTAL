/*
 * THE TOTAL — 사이트 설정.
 *
 * 서울 대치의 개인화 교육기관처럼 보이는 WILDCARD* 의 독립 프로젝트.
 * 사이트의 중심은 2027 SEASON ENTRY(연 1회, 시간 구조는 lib/entry.ts 한 곳).
 * 문장은 한국어 중심. 허위 실적 · 연수 · 가짜 인원 · 후기를 만들지 않는다. 대표는 J. LEE 한 사람.
 * 이메일은 ENTRY NOTICE 한 곳에서만 받는다(app/api/entry-notice).
 */
export const SITE = {
  name: 'THE TOTAL',
  representative: 'J. LEE',
  place: '서울 · 대치',
};

/** 상단 메뉴 — THE TOTAL(휘장 · 홈) / 방식 / 과정 / 기록 / 2027 ENTRY. 각각 독립 페이지. */
export const MENU = [
  { href: '/method', label: '방식' },
  { href: '/programs', label: '과정' },
  { href: '/record', label: '기록' },
] as const;

/** 상단 오른쪽 — 작고 단단한 레이블(채움 없음). */
export const HEADER_CTA = { href: '/entry', label: '2027 ENTRY' } as const;
