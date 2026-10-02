import { courseOfGrade, type Grade } from '@/lib/diagnosis/schema';
import type { CourseId } from '@/lib/schedule';
import { many, one, type Answers, type JourneyStep } from './types';

/*
 * 부모 — 자녀의 학습 방향 살펴보기. 아이를 분류하거나 등급을 매기지 않는다. 약 5분.
 *   학년 → 학업에서 함께 볼 부분 → 학습 환경 → 아이가 움직이는 때 → 요즘의 대화 → 확인 → PARENT NOTE
 * 쓰지 않는 말: 불안 · 뒤처짐 · 문제 학생 · 성격 판정.
 */
export const PARENT_STEPS: JourneyStep[] = [
  { id: 'grade', kind: 'grade', title: '자녀는 지금 몇 학년인가요?' },
  {
    id: 'academic',
    kind: 'multi',
    max: 3,
    title: '학업에서 지금 함께 확인하고 싶은 부분은 무엇인가요?',
    hint: '최대 3개.',
    options: ['과목의 개념 이해', '시험을 준비하는 방식', '내신 · 수행평가의 흐름', '입시 전형과 일정', '읽기와 글쓰기', '다음 과정으로의 연결'],
  },
  {
    id: 'env',
    kind: 'multi',
    max: 2,
    title: '학습 환경에서 조정이 필요해 보이는 부분이 있나요?',
    hint: '최대 2개.',
    options: ['한 주의 일정이 빽빽하다', '혼자 공부하는 시간이 적다', '공부 시간이 일정하지 않다', '지금의 수업 방식이 아이와 맞는지 모르겠다', '쉬는 시간과 수면이 부족하다', '아직 잘 모르겠다'],
  },
  {
    id: 'moves',
    kind: 'single',
    title: '아이가 가장 잘 움직이는 때는 언제인가요?',
    options: ['좋아하는 주제를 만났을 때', '누군가와 함께할 때', '스스로 정한 목표가 있을 때', '직접 만들어 볼 때', '아직 잘 모르겠다'],
  },
  {
    id: 'talk',
    kind: 'single',
    title: '요즘 아이와 주로 나누는 대화는 무엇인가요?',
    options: ['주로 성적과 일정', '관심사와 일상', '진로와 방향', '대화할 시간이 적다'],
  },
];

const ENV: Record<string, string> = {
  '한 주의 일정이 빽빽하다': '일정 안에서 스스로 공부할 시간을 먼저 확보하기',
  '혼자 공부하는 시간이 적다': '수업 밖에서 혼자 정리하는 시간을 짧게라도 고정하기',
  '공부 시간이 일정하지 않다': '요일마다 같은 시간에 시작하는 습관 만들기',
  '지금의 수업 방식이 아이와 맞는지 모르겠다': '아이가 잘 배우는 수업 방식을 진단에서 먼저 확인하기',
  '쉬는 시간과 수면이 부족하다': '공부 분량보다 쉬는 시간과 수면을 먼저 확보하기',
  '아직 잘 모르겠다': '한 주 동안의 공부 시간을 함께 기록해 보기',
};

const MOVES: Record<string, string> = {
  '좋아하는 주제를 만났을 때': '요즘 가장 오래 생각하게 되는 건 뭐야?',
  '누군가와 함께할 때': '누구와 공부할 때 가장 잘 됐던 것 같아?',
  '스스로 정한 목표가 있을 때': '이번 학기에 스스로 정하고 싶은 목표가 있어?',
  '직접 만들어 볼 때': '최근에 직접 만들어 보고 싶었던 게 있어?',
  '아직 잘 모르겠다': '공부하면서 시간이 가장 빨리 갔던 때는 언제였어?',
};
const TALK: Record<string, string> = {
  '주로 성적과 일정': '성적 말고, 요즘 학교에서 재미있었던 건 뭐야?',
  '대화할 시간이 적다': '이번 주에 하나만 같이 해 본다면 뭘 하고 싶어?',
  '진로와 방향': '그 일을 떠올리면, 어떤 장면이 먼저 생각나?',
  '관심사와 일상': '그 관심을 더 알아보려면 무엇부터 해 보고 싶어?',
};

export type ParentNote = {
  course: CourseId | null;
  academic: string[];
  env: string[];
  questions: string[];
};

export function buildParentNote(a: Answers): ParentNote {
  const grade = one(a, 'grade') as Grade | undefined;
  const course = grade ? courseOfGrade(grade) : null;
  const moves = one(a, 'moves');
  const talk = one(a, 'talk');
  const questions = [moves && MOVES[moves], talk && TALK[talk]].filter((q): q is string => !!q);
  return {
    course,
    academic: many(a, 'academic'),
    env: many(a, 'env').map((e) => ENV[e]).filter(Boolean),
    questions: [...new Set(questions)].slice(0, 2),
  };
}
