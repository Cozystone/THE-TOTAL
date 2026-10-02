/*
 * 입학 일정 데이터와 상태 계산.
 *
 * 화면(달력 · 일정 카드 · 입학 안내)은 이 배열만 읽는다. 상태는 사람이 적지 않고
 * 날짜와 플래그에서 계산한다 — 임의로 '마감'을 칠하거나 좌석 · 대기 인원을 만들지 않는다.
 *
 *   announced=false                → 일정 준비 중
 *   오늘 < applyOpen               → 접수 예정
 *   applyOpen ≤ 오늘 ≤ applyClose  → 접수 중
 *   오늘 > applyClose, waitlist     → 대기 접수
 *   오늘 > applyClose              → 신청 마감
 *
 * ⚠ 아래 SAMPLE_SESSIONS 는 운영 일정 확정 전의 예시 값이다(구조 확인용).
 *   SCHEDULE_CONFIRMED 가 false 인 동안 화면에는 어떤 날짜도 나가지 않는다 — 모든 일정 표기는 '준비 중'.
 *   실제 일정으로 바꾼 뒤 true 로 켠다. 온라인 입학시험 카운트다운은 lib/season.ts 의 ENTRY_EXAM_AT 하나에서만.
 */

export type CourseId = 'elementary' | 'middle' | 'high';

export const COURSES: Record<CourseId, { label: string; short: string }> = {
  elementary: { label: '초등과정', short: '초등' },
  middle: { label: '중등과정', short: '중등' },
  high: { label: '고등과정', short: '고등' },
};

export type Session = {
  id: string;
  /** 시험일 YYYY-MM-DD */
  date: string;
  course: CourseId;
  round: string;
  online: boolean;
  time: string | null;
  applyOpen: string | null;
  applyClose: string | null;
  /** 접수 마감 뒤 대기 접수를 실제로 받는 경우에만 true */
  waitlist: boolean;
  /** 일정이 공지되었는지. false 면 '일정 준비 중' */
  announced: boolean;
};

export const SCHEDULE_CONFIRMED = false;

const SAMPLE_SESSIONS: Session[] = [
  { id: 'h-0926', date: '2026-09-26', course: 'high', round: '9월 회차', online: true, time: '10:00', applyOpen: '2026-09-07', applyClose: '2026-09-23', waitlist: false, announced: true },
  { id: 'h-1010', date: '2026-10-10', course: 'high', round: '10월 1회차', online: true, time: '10:00', applyOpen: '2026-09-21', applyClose: '2026-10-07', waitlist: false, announced: true },
  { id: 'm-1017', date: '2026-10-17', course: 'middle', round: '10월 1회차', online: true, time: '10:00', applyOpen: '2026-09-28', applyClose: '2026-10-14', waitlist: false, announced: true },
  { id: 'e-1024', date: '2026-10-24', course: 'elementary', round: '10월 1회차', online: true, time: '10:00', applyOpen: '2026-10-05', applyClose: '2026-10-21', waitlist: false, announced: true },
  { id: 'h-1107', date: '2026-11-07', course: 'high', round: '11월 회차', online: true, time: '10:00', applyOpen: '2026-10-19', applyClose: '2026-11-04', waitlist: false, announced: true },
  { id: 'm-1114', date: '2026-11-14', course: 'middle', round: '11월 회차', online: true, time: '10:00', applyOpen: '2026-10-26', applyClose: '2026-11-11', waitlist: false, announced: true },
  { id: 'e-1121', date: '2026-11-21', course: 'elementary', round: '11월 회차', online: true, time: '10:00', applyOpen: '2026-11-02', applyClose: '2026-11-18', waitlist: false, announced: true },
  { id: 'h-1205', date: '2026-12-05', course: 'high', round: '겨울학기 회차', online: true, time: null, applyOpen: null, applyClose: null, waitlist: false, announced: false },
  { id: 'm-1212', date: '2026-12-12', course: 'middle', round: '겨울학기 회차', online: true, time: null, applyOpen: null, applyClose: null, waitlist: false, announced: false },
];

export const SESSIONS: Session[] = SCHEDULE_CONFIRMED ? SAMPLE_SESSIONS : [];

export type Status = 'preparing' | 'upcoming' | 'open' | 'closed' | 'waitlist';

export const STATUS: Record<Status, { label: string; order: number }> = {
  open: { label: '접수 중', order: 0 },
  waitlist: { label: '대기 접수', order: 1 },
  upcoming: { label: '접수 예정', order: 2 },
  preparing: { label: '일정 준비 중', order: 3 },
  closed: { label: '신청 마감', order: 4 },
};

export type Ymd = { y: number; m: number; d: number };

export const toKey = (v: Ymd) => `${v.y}-${String(v.m).padStart(2, '0')}-${String(v.d).padStart(2, '0')}`;

export function statusOf(s: Session, todayKey: string): Status {
  if (!s.announced || !s.applyOpen || !s.applyClose) return 'preparing';
  if (todayKey < s.applyOpen) return 'upcoming';
  if (todayKey <= s.applyClose) return 'open';
  return s.waitlist ? 'waitlist' : 'closed';
}

const WEEK_KO = ['일', '월', '화', '수', '목', '금', '토'];

/** '2026-10-17' → '10월 17일 (토)' */
export function formatDay(key: string, withYear = false) {
  const [y, m, d] = key.split('-').map(Number);
  const w = WEEK_KO[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${withYear ? `${y}년 ` : ''}${m}월 ${d}일 (${w})`;
}

/** '2026-10-17' → '10. 17.' */
export const formatShort = (key: string) => {
  const [, m, d] = key.split('-').map(Number);
  return `${m}. ${d}.`;
};

/** 오늘 이후 가장 가까운 시험 회차(과정 필터 가능) */
export function nextSessions(todayKey: string, n = 3, course?: CourseId) {
  return SESSIONS.filter((s) => s.date >= todayKey && (!course || s.course === course))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, n);
}
