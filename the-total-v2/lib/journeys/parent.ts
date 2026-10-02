import { courseOfGrade, type Grade } from '@/lib/diagnosis/schema';
import { COURSES, type CourseId } from '@/lib/schedule';
import { many, noteOf, one, quote, type Answers, type JourneyStep } from './types';

/*
 * 부모 — 자녀의 학습 방향 살펴보기. 5단계, 약 5분. 아이를 평가하거나 분류하지 않는다.
 * 쓰지 않는 말: 불안 · 뒤처짐 · 관리 · 문제 행동 · 교정, 그리고 결과에서 '진단'.
 * 결과는 늘 열린 표현으로 — "함께 살펴볼 수 있습니다", "첫 수업에서 더 정확히 정리합니다".
 */
export const PARENT_STEPS: JourneyStep[] = [
  { id: 'grade', kind: 'grade', title: '자녀는 지금 몇 학년인가요?' },
  {
    id: 'see',
    kind: 'multi',
    title: '지금 가장 함께 보고 싶은 부분은 무엇인가요?',
    hint: '여러 개를 골라도 됩니다.',
    options: ['학업의 흐름', '공부 습관', '진로와 관심사', '대화'],
  },
  {
    id: 'env',
    kind: 'multi',
    title: '지금의 학습 환경은 어떤가요?',
    hint: '해당하는 것을 모두 골라 주세요.',
    options: ['시간 부족', '동기 저하', '과도한 과제', '과목별 편차', '기타'],
    note: { label: '기타 — 한 줄로 (선택)', max: 60 },
  },
  {
    id: 'moves',
    kind: 'text',
    title: '아이가 비교적 스스로 움직이는 순간은 언제인가요?',
    hint: '작은 순간이어도 괜찮습니다.',
    note: { label: '그 순간', max: 80, placeholder: '예: 좋아하는 게임의 규칙을 설명해 줄 때', long: true },
  },
  {
    id: 'talk',
    kind: 'text',
    optional: true,
    title: '지금 아이와 나누고 싶은 대화나 질문이 있나요?',
    hint: '없으면 건너뛰어도 됩니다.',
    note: { label: '나누고 싶은 것 (선택)', max: 80, long: true },
  },
];

const SEE: Record<string, string> = {
  '학업의 흐름': '과목마다 지금 어디까지 왔는지, 다음 단원으로 이어지는 흐름',
  '공부 습관': '한 주의 공부가 어떤 순서와 리듬으로 흘러가는지',
  '진로와 관심사': '요즘의 관심이 지금 배우는 과목과 이어지는 지점',
  대화: '공부에 대해 아이가 스스로 쓰는 말',
};
const ENV: Record<string, string> = {
  '시간 부족': '일정 안에서 스스로 정리하는 시간을 먼저 확보해 볼 수 있습니다.',
  '동기 저하': '아이가 스스로 고른 목표 하나에서 다시 시작해 볼 수 있습니다.',
  '과도한 과제': '과제의 양보다 순서를 함께 정해 볼 수 있습니다.',
  '과목별 편차': '과목마다 다른 속도를 인정하고, 순서를 나눠 볼 수 있습니다.',
};

export type ParentNote = {
  course: CourseId | null;
  courseLabel: string | null;
  academic: string[];
  env: string[];
  envNote?: string;
  moment?: string;
  question: string;
  talk?: string;
};

export function buildParentNote(a: Answers): ParentNote {
  const grade = one(a, 'grade') as Grade | undefined;
  const course = grade ? courseOfGrade(grade) : null;
  const moment = quote(noteOf(a, 'moves'), 60);
  return {
    course,
    courseLabel: course ? COURSES[course].label : null,
    academic: many(a, 'see').map((s) => SEE[s]).filter(Boolean),
    env: many(a, 'env').map((e) => ENV[e]).filter(Boolean),
    envNote: many(a, 'env').includes('기타') ? quote(noteOf(a, 'env'), 60) : undefined,
    moment,
    // 부모가 먼저 건넬 수 있는 열린 질문 한 문장 — 적어 준 '순간' 을 이어 받는다
    question: moment ? '그때 어떤 부분이 제일 재미있었는지 들려줄래?' : '요즘 가장 오래 생각하게 되는 건 뭐야?',
    talk: quote(noteOf(a, 'talk'), 80),
  };
}
