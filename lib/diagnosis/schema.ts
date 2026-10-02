/*
 * 온라인 개인진단 — 입력 · 결과의 형태와 문항 정의.
 *
 * 경계:
 *   화면(components/Diagnosis.tsx) ── DiagnosisInput ──▶ POST /api/diagnosis ──▶ (분석 서비스)
 *                                    ◀── DiagnosisResponse ──
 * 분석 서비스(AI · 상담 DB)가 연결되기 전에는 API 가 { status: 'not_connected' } 를 돌려주고,
 * 화면은 분석 결과를 지어내지 않는다 — 응답 요약과 "확인 후 안내" 만 보여준다.
 */
import type { CourseId } from '@/lib/schedule';

export type Grade =
  | 'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6'
  | 'm1' | 'm2' | 'm3'
  | 'h1' | 'h2' | 'h3';

export const GRADES: { course: CourseId; items: { id: Grade; label: string }[] }[] = [
  { course: 'elementary', items: [1, 2, 3, 4, 5, 6].map((n) => ({ id: `e${n}` as Grade, label: `초${n}` })) },
  { course: 'middle', items: [1, 2, 3].map((n) => ({ id: `m${n}` as Grade, label: `중${n}` })) },
  { course: 'high', items: [1, 2, 3].map((n) => ({ id: `h${n}` as Grade, label: `고${n}` })) },
];

export const courseOfGrade = (g: Grade): CourseId => (g[0] === 'e' ? 'elementary' : g[0] === 'm' ? 'middle' : 'high');

/** 과목별 현재 상태(자기 평가) 1–4 */
export const SUBJECTS = ['국어', '수학', '영어', '과학', '사회'] as const;
export type Subject = (typeof SUBJECTS)[number];
export const LEVELS = [
  { v: 1, label: '많이 어렵다' },
  { v: 2, label: '조금 어렵다' },
  { v: 3, label: '대체로 괜찮다' },
  { v: 4, label: '자신 있다' },
] as const;

export const GOALS: Record<CourseId, string[]> = {
  elementary: ['스스로 공부하는 습관 만들기', '사고력과 문해력 기르기', '교과 기초 다지기', '중학교 과정 준비'],
  middle: ['내신 성적 안정', '교과 개념의 정확한 이해', '공부 방식 다시 세우기', '고등 과정 대비'],
  high: ['목표 대학 · 전형에 맞춘 전략', '취약 과목 끌어올리기', '내신과 수능의 우선순위 정리', '학생부와 진로 방향 정리'],
};

export const DIFFICULTIES = [
  '공부 시간에 비해 성적이 오르지 않는다',
  '무엇부터 해야 할지 모르겠다',
  '개념은 아는데 문제에 적용이 어렵다',
  '꾸준히 이어가기가 어렵다',
  '시험에서 실수가 잦다',
  '스스로 질문을 만들기 어렵다',
  '진로나 목표가 정해지지 않았다',
];
export const MAX_DIFFICULTIES = 3;

export const STYLES = [
  { id: 'explain', label: '설명을 충분히 듣고 이해하는 수업' },
  { id: 'practice', label: '문제를 많이 풀고 바로 피드백받는 수업' },
  { id: 'discuss', label: '질문하고 토론하며 생각을 넓히는 수업' },
  { id: 'self', label: '스스로 계획하고 점검받는 수업' },
] as const;

export const HOURS = ['주 3시간 이하', '주 4–6시간', '주 7–10시간', '주 10시간 이상'] as const;

export type DiagnosisInput = {
  grade: Grade;
  subjects: Partial<Record<Subject, 1 | 2 | 3 | 4>>;
  goal: string;
  difficulties: string[];
  style: (typeof STYLES)[number]['id'];
  hours: (typeof HOURS)[number];
};

/** 분석 서비스가 연결되면 돌려줄 결과의 형태 */
export type DiagnosisResult = {
  course: CourseId;
  summary: string;
  focus: string[];
  recommendedClass: string;
};

export type DiagnosisResponse =
  | { status: 'not_connected' }
  | { status: 'received'; referenceId: string }
  | { status: 'analyzed'; referenceId: string; result: DiagnosisResult };
