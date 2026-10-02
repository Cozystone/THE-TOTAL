/*
 * 진단 여정의 공통 형태 — 한 화면에 한 질문.
 * 결과는 응답을 정해진 규칙으로 '정리'한 것이다. 점수 · 유형 판정 · AI 분석이 아니며, 화면에도 그렇게 밝힌다.
 * 응답은 브라우저 메모리에만 있다(저장 · 전송 없음). 이름 · 연락처는 묻지 않는다.
 */
export type JourneyStep = {
  id: string;
  title: string;
  hint?: string;
  /** grade: 학년(초1–고3) 단일 선택 */
  kind: 'grade' | 'single' | 'multi';
  options?: readonly string[];
  /** multi 의 최대 선택 수 */
  max?: number;
  /** 고르지 않아도 다음으로 갈 수 있음 */
  optional?: boolean;
  /** 선택 아래 한 줄 서술(선택 사항) */
  note?: { label: string; max: number };
};

export type Answers = Record<string, string | string[] | undefined>;

export const one = (a: Answers, id: string) => (typeof a[id] === 'string' ? (a[id] as string) : undefined);
export const many = (a: Answers, id: string) => (Array.isArray(a[id]) ? (a[id] as string[]) : []);
export const noteOf = (a: Answers, id: string) => (a[`${id}:note`] as string | undefined)?.trim() || undefined;
