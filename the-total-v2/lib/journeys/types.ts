/*
 * 진단 여정의 공통 형태 — 한 화면에 한 질문.
 * 결과는 응답을 정해진 규칙으로 '정리'한 것이다. 점수 · 유형 판정 · AI 분석이 아니며, 화면에도 그렇게 밝힌다.
 * 응답은 이 브라우저 안(sessionStorage)에만 있다. 서버로 보내지 않는다. 이름 · 연락처는 묻지 않는다.
 */
export type JourneyStep = {
  id: string;
  title: string;
  hint?: string;
  /** grade: 학년(초1–고3) · single · multi · text(자유 입력, 고를 수 있는 꼬리표를 함께 둘 수 있다) */
  kind: 'grade' | 'single' | 'multi' | 'text';
  options?: readonly string[];
  /** multi(또는 text 의 꼬리표)의 최대 선택 수 */
  max?: number;
  /** 고르지 않아도 다음으로 갈 수 있음 */
  optional?: boolean;
  /** 선택 아래 한 줄 서술. text 단계에서는 본 입력 */
  note?: { label: string; max: number; placeholder?: string; long?: boolean };
};

export type Answers = Record<string, string | string[] | undefined>;

export const one = (a: Answers, id: string) => (typeof a[id] === 'string' ? (a[id] as string) : undefined);
export const many = (a: Answers, id: string) => (Array.isArray(a[id]) ? (a[id] as string[]) : []);
export const noteOf = (a: Answers, id: string) => (a[`${id}:note`] as string | undefined)?.trim() || undefined;

/** 이 단계에 답이 있는가 */
export function answered(s: JourneyStep, a: Answers) {
  const v = a[s.id];
  const picked = Array.isArray(v) ? v.length > 0 : !!v;
  return picked || !!noteOf(a, s.id);
}

/* ── 브라우저 안 보관(sessionStorage) — 탭을 닫으면 사라진다 ── */
export const STORE = { student: 'tt:my-index', parent: 'tt:parent-note' } as const;

export function loadAnswers(key: string): Answers | null {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Answers) : null;
  } catch {
    return null;
  }
}

export function saveAnswers(key: string, a: Answers) {
  try {
    sessionStorage.setItem(key, JSON.stringify(a));
  } catch {
    /* 저장이 막힌 브라우저 — 결과 화면이 '응답 없음' 으로 안내한다 */
  }
}

export function clearAnswers(key: string) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* 무시 */
  }
}

/** 자유 입력을 결과 문장에 넣을 때 — 앞뒤 공백 · 따옴표 정리, 길면 줄임 */
export function quote(s: string | undefined, max = 40) {
  if (!s) return undefined;
  const t = s.replace(/["“”‘’']/g, '').replace(/\s+/g, ' ').trim();
  return t.length > max ? `${t.slice(0, max)}…` : t;
}
