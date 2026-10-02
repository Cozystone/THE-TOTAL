import { courseOfGrade, type Grade } from '@/lib/diagnosis/schema';
import { COURSES, type CourseId } from '@/lib/schedule';
import { many, noteOf, one, type Answers, type JourneyStep } from './types';

/*
 * 학생 — 나의 INDEX. "너를 평가하겠다" 가 아니라 지금의 공부와 관심을 함께 정리해 보는 입구. 약 7분.
 *   학년 → 잘하는 것 → 어려운 것 → 공부 리듬 → 잘 배우는 방식 → 오래 남은 장면 → 더 알고 싶은 것 → 확인 → MY INDEX
 */
export const STUDENT_STEPS: JourneyStep[] = [
  { id: 'grade', kind: 'grade', title: '지금 몇 학년인가요?' },
  {
    id: 'strong',
    kind: 'multi',
    max: 3,
    title: '요즘 잘한다고 느끼는 것은 무엇인가요?',
    hint: '최대 3개. 성적이 아니라 스스로 느끼는 기준이면 됩니다.',
    options: ['국어 · 글 읽기', '수학', '영어', '과학', '사회 · 역사', '글쓰기', '말하기 · 발표', '그리기 · 만들기', '운동', '음악', '계획 세우기 · 정리'],
  },
  {
    id: 'hard',
    kind: 'multi',
    max: 3,
    title: '요즘 어렵다고 느끼는 것은 무엇인가요?',
    hint: '최대 3개.',
    options: ['수학의 기초 개념', '긴 글 읽기', '영어 단어 · 문법', '외워야 하는 과목', '시험 시간 안에 풀기', '공부 계획 세우기', '오래 집중하기', '무엇을 공부해야 할지 모르겠다'],
  },
  {
    id: 'rhythm',
    kind: 'single',
    title: '지금의 공부 리듬은 어떤가요?',
    options: ['계획대로 꾸준히 이어가고 있다', '시작은 하는데 자주 끊긴다', '시험 전에 몰아서 한다', '무엇부터 해야 할지 모르겠다'],
  },
  {
    id: 'mode',
    kind: 'single',
    title: '어떤 때 가장 잘 배우나요?',
    options: ['혼자 조용히 할 때', '누군가와 함께할 때', '질문하고 대화할 때', '직접 만들어 볼 때'],
  },
  {
    id: 'scene',
    kind: 'multi',
    max: 2,
    optional: true,
    title: '오래 남은 장면은 어디에서 왔나요?',
    hint: '최대 2개. 떠오르지 않으면 건너뛰어도 됩니다.',
    options: ['영화 · 영상', '책 · 글', '사람 · 대화', '도시 · 여행', '기술 · 과학', '전시 · 음악'],
    note: { label: '그 장면을 한 줄로 (선택)', max: 80 },
  },
  {
    id: 'curious',
    kind: 'multi',
    max: 3,
    title: '앞으로 더 알고 싶은 것은 무엇인가요?',
    hint: '최대 3개.',
    options: ['사람의 마음', '사회와 제도', '자연과 우주', '기술과 AI', '예술과 디자인', '언어와 이야기', '몸과 건강', '돈과 경제'],
  },
];

/* 어려움 · 리듬 → 학업에서 먼저 정리할 것 */
const FOCUS: Record<string, string> = {
  '수학의 기초 개념': '수학의 기초 개념 정리',
  '긴 글 읽기': '긴 글을 끝까지 읽는 방법',
  '영어 단어 · 문법': '영어 단어 · 문법의 순서 정하기',
  '외워야 하는 과목': '외우는 과목의 정리 방식',
  '시험 시간 안에 풀기': '시험 시간 배분 연습',
  '공부 계획 세우기': '한 주의 공부 계획 세우기',
  '오래 집중하기': '짧게 끊어 집중하는 리듬',
  '무엇을 공부해야 할지 모르겠다': '공부의 우선순위 정하기',
};
const RHYTHM: Record<string, string> = {
  '시작은 하는데 자주 끊긴다': '학습 리듬 회복',
  '시험 전에 몰아서 한다': '시험 전이 아닌 평소의 분량 정하기',
  '무엇부터 해야 할지 모르겠다': '공부 순서 정하기',
};

/* 오래 남은 장면 → THE WORLD 의 편집과 그 질문(사이트의 편집 목록) */
const WORLD: Record<string, { key: string; q: string }> = {
  '영화 · 영상': { key: '영화', q: '설명할 수 없는데 오래 남는 장면은 무엇인가.' },
  '책 · 글': { key: '글', q: '내 말로 설명할 수 없는 것을 나는 정말 아는가.' },
  '사람 · 대화': { key: '사람', q: '한 사람의 선택은 어디서부터 그의 것이었나.' },
  '도시 · 여행': { key: '도시', q: '이 거리는 누구의 선택으로 이렇게 생겼을까.' },
  '기술 · 과학': { key: '기술', q: '빨라진 것은 답인가, 질문인가.' },
  '전시 · 음악': { key: '전시', q: '오래 보게 되는 것은 무엇이 다른가.' },
};

export type StudentIndex = {
  course: CourseId | null;
  academic: string[];
  strong: string[];
  world: { key: string; q: string }[];
  sceneNote?: string;
  question: string;
  forum: boolean;
};

export function buildStudentIndex(a: Answers): StudentIndex {
  const grade = one(a, 'grade') as Grade | undefined;
  const course = grade ? courseOfGrade(grade) : null;
  const rhythm = one(a, 'rhythm');
  const academic = [
    ...(rhythm && RHYTHM[rhythm] ? [RHYTHM[rhythm]] : []),
    ...many(a, 'hard').map((h) => FOCUS[h]).filter(Boolean),
  ].slice(0, 2);
  const scenes = many(a, 'scene');
  const world = scenes.map((s) => WORLD[s]).filter(Boolean);
  const sceneNote = noteOf(a, 'scene');
  const curious = many(a, 'curious');

  // 다음 질문 — 응답을 그대로 엮은 열린 질문(분석이 아니라 문장 틀)
  const question = sceneNote
    ? `‘${sceneNote}’ — 이 장면이 오래 남은 이유는, 지금의 나에 대해 무엇을 말해 줄까?`
    : curious[0]
      ? `${curious[0]}에 대해, 내가 이미 안다고 믿는 것은 무엇이고 아직 모르는 것은 무엇일까?`
      : world[0]
        ? world[0].q
        : '지금 공부하는 것 중에서, 내가 스스로 고른 것은 무엇일까?';

  const forum = one(a, 'mode') === '직접 만들어 볼 때' || scenes.length > 0 || curious.length >= 2;
  return { course, academic, strong: many(a, 'strong'), world, sceneNote, question, forum };
}

export const courseLabel = (c: CourseId | null) => (c ? COURSES[c].label : null);
