/*
 * 2027 THE TOTAL 입학평가 — 사이트의 시간 구조는 이 파일 한 곳에서만 정한다(한국 시간).
 *
 *   평가 신청   RESERVE_OPEN_DATE ~ RESERVE_CLOSE_DATE   (2026.10.01 00:00 ~ 10.31 23:59:59)
 *   평가 진행   11월 1일 하루, 온라인 Entry — 신청한 이메일로만 개시 안내   (~ ENTRY_CLOSE_DATE 11.01 23:59:59)
 *   종료 뒤     CLOSED — 다음 Entry 는 2027년 10월(2028 Season)
 *
 * 카운트다운은 신청 기간에는 '신청 마감까지', 평가일에는 '평가 종료까지'.
 * 신청 수: 시작값 RESERVED_BASE(본인 지정) + 실제로 기록된 신청 수. 저장소가 연결돼 있을 때만, 신청 기간에만 보인다.
 */
export const RESERVE_OPEN_DATE = '2026-10-01T00:00:00+09:00';
export const RESERVE_CLOSE_DATE = '2026-10-31T23:59:59+09:00';
export const ENTRY_CLOSE_DATE = '2026-11-01T23:59:59+09:00';

export const SEASON = '2027';
export const NEXT_SEASON = '2028';
export const NEXT_ENTRY_LABEL = '2027년 10월';

/** 신청 수를 화면에 보일지(저장소가 연결돼 있을 때만 실제로 보인다) */
export const SHOW_RESERVED_COUNT = true;
/** 신청 수의 시작값(본인 지정). 화면의 숫자 = 시작값 + 실제 신청 수 */
export const RESERVED_BASE = 1376;

export const OPEN_AT = Date.parse(RESERVE_OPEN_DATE);
export const RESERVE_CLOSE_AT = Date.parse(RESERVE_CLOSE_DATE);
export const CLOSE_AT = Date.parse(ENTRY_CLOSE_DATE);

export type Phase = 'before' | 'reserve' | 'evaluation' | 'closed';

export function phaseAt(now: number): Phase {
  if (now < OPEN_AT) return 'before';
  if (now <= RESERVE_CLOSE_AT) return 'reserve';
  if (now <= CLOSE_AT) return 'evaluation';
  return 'closed';
}

/** 지금 받는 이메일의 시즌 — 신청 기간에는 2027 신청, 그 뒤에는 2028 시작 안내 */
export const noticeSeason = (phase: Phase) => (phase === 'reserve' || phase === 'before' ? SEASON : NEXT_SEASON);

/** 남은 시간 → 일 · 시 · 분 · 초 */
export function remaining(now: number, target: number) {
  const left = Math.max(0, target - now);
  const s = Math.floor(left / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

/** 홈 첫 화면 — 실제 정보 세 개 */
export const SCHEDULE = [
  { k: '평가 신청 기간', v: '2026.10.01 — 10.31' },
  { k: '평가 진행', v: '온라인 Entry' },
  { k: '평가 종료', v: '2026.11.01 23:59' },
] as const;

/** ENTRY 정보 표 */
export const ENTRY_TABLE = [
  { k: '신청 기간', v: '2026.10.01 — 10.31' },
  { k: '평가 진행', v: '온라인 Entry' },
  { k: '평가 종료', v: '2026.11.01 23:59' },
  { k: '대상', v: '초등 · 중등 · 고등' },
] as const;

export const RESERVE_CTA = '입학평가 신청하기 →';
export const RESERVE_CTA_PAGE = '2027 입학평가 신청 →';
