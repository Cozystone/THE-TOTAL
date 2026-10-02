/*
 * THE TOTAL — 사이트 설정.
 *
 * 대치동의 개인화 교육기관. 온라인 입학시험 · 온라인 개인진단 · 초등/중등/고등 과정.
 * 문장은 한국어 중심. 허위 실적 · 연수 · 마감 수치 · 후기 · 인용을 만들지 않는다.
 * 저장/전송 기능이 실제로 연결되기 전에는 "등록 완료" 류의 문구를 띄우지 않는다(app/api/*).
 */
export const SITE = {
  name: 'THE TOTAL',
  director: 'J. LEE',
  place: '서울 · 대치',
};

/** 상단 메뉴 — 각각 독립 페이지. */
export const MENU = [
  { href: '/about', label: '소개' },
  { href: '/programs', label: '교육과정' },
  { href: '/diagnosis', label: '온라인 진단' },
  { href: '/admissions', label: '입학 안내' },
  { href: '/notices', label: '공지' },
] as const;

/** 상단 오른쪽 작은 버튼. */
export const HEADER_CTA = { href: '/admissions', label: '입학시험 안내' } as const;
