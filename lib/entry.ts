/*
 * 2027 SEASON ENTRY — 사이트의 시간 구조는 이 파일 한 곳에서만 정한다.
 *
 *   Entry 기간   2026-10-01 00:00 ~ 2026-11-01 23:59:59 (한국 시간)
 *   카운트다운   ENTRY_CLOSE_DATE 까지 일 · 시 · 분 · 초가 실제로 줄어든다
 *   종료 뒤      CLOSED — 다음 Entry 는 2027년 10월(2028 Season)
 *
 * 숫자(안내 신청 수)는 실제로 쌓인 값만 쓰고, 공개 여부는 SHOW_NOTICE_COUNT 로 따로 정한다.
 * 가짜 예약 · 대기 · 접수 현황은 만들지 않는다.
 */
export const ENTRY_OPEN_DATE = '2026-10-01T00:00:00+09:00';
export const ENTRY_CLOSE_DATE = '2026-11-01T23:59:59+09:00';

export const SEASON = '2027';
export const NEXT_SEASON = '2028';
export const NEXT_ENTRY_LABEL = '2027년 10월';

/** 실제 안내 신청 수를 화면에 보일지. 실제 데이터가 쌓인 뒤 따로 결정한다. */
export const SHOW_NOTICE_COUNT = false;

export const OPEN_AT = Date.parse(ENTRY_OPEN_DATE);
export const CLOSE_AT = Date.parse(ENTRY_CLOSE_DATE);

export type Phase = 'before' | 'open' | 'closed';

export function phaseAt(now: number): Phase {
  if (now < OPEN_AT) return 'before';
  if (now > CLOSE_AT) return 'closed';
  return 'open';
}

/** 지금 안내를 받는 시즌 — Entry 가 닫히면 다음 시즌 */
export const noticeSeason = (phase: Phase) => (phase === 'closed' ? NEXT_SEASON : SEASON);

/** 남은 시간 → D–00 00:00:00 */
export function remaining(now: number) {
  const left = Math.max(0, CLOSE_AT - now);
  const s = Math.floor(left / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

export const ENTRY_FACTS = [
  { k: '진행 방식', v: '온라인 Entry / 10월 한 달 / 11월 1일 종료' },
  { k: '대상', v: '초등 · 중등 · 고등' },
] as const;

/** 2027 ENTRY 안내 — 공지 · 입학 안내에서 필요한 것만 */
export const ENTRY_FAQ = [
  {
    q: 'Entry는 어떻게 진행되나요?',
    a: '온라인으로 진행합니다. 학년과 과목별 현재, 공부하는 방식과 목표를 묻는 온라인 진단에서 시작해, 과정별 평가 세션으로 이어집니다. 접속 방법과 준비 사항은 진단을 마친 학생에게 따로 안내합니다.',
  },
  {
    q: '평가는 무엇을 보나요?',
    a: '현재의 수준만 확인하지 않습니다. 학생이 무엇을 이해하고 있는지, 어떤 방식으로 배우는지, 무엇을 향해 움직일 수 있는지를 함께 봅니다.',
  },
  {
    q: '결과는 언제 공개되나요?',
    a: 'Entry가 종료된 뒤 평가 세션에 참여한 학생에게 개별로 공개합니다. 공개 일정은 ENTRY NOTICE로 안내합니다.',
  },
  {
    q: 'Entry가 끝난 뒤에도 평가를 받을 수 있나요?',
    a: '진행하지 않습니다. Entry가 종료되면 다음 시즌이 열릴 때까지 새로운 평가를 진행하지 않습니다. 다음 Entry는 2027년 10월에 열립니다.',
  },
] as const;
