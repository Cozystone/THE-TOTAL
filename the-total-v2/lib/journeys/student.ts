import { courseOfGrade, type Grade } from '@/lib/diagnosis/schema';
import { COURSES, type CourseId } from '@/lib/schedule';
import { many, noteOf, one, quote, type Answers, type JourneyStep } from './types';

/*
 * 학생 — 나의 INDEX. 8단계, 약 7분. "너를 평가하겠다" 가 아니라 지금의 공부와 관심을 함께 정리해 보는 입구.
 * 질문은 단정하거나 평가하지 않는다. 7번은 건너뛸 수 있다.
 */
export const STUDENT_STEPS: JourneyStep[] = [
  { id: 'grade', kind: 'grade', title: '지금 몇 학년인가요?' },
  {
    id: 'strong',
    kind: 'multi',
    max: 3,
    title: '요즘 비교적 잘 풀리는 공부나 과목은 무엇인가요?',
    hint: '최대 3개. 성적보다 스스로 느끼는 기준이면 됩니다.',
    options: ['국어 · 읽기', '수학', '영어', '과학', '사회 · 역사', '글쓰기', '말하기 · 발표', '그리기 · 만들기', '아직 잘 모르겠다'],
  },
  {
    id: 'stuck',
    kind: 'multi',
    max: 3,
    title: '공부하다 가장 자주 막히는 곳은 어디인가요?',
    hint: '최대 3개.',
    options: ['수학의 기초 개념', '긴 글 읽기', '영어 단어 · 문법', '외워야 하는 과목', '시험 시간 안에 풀기', '공부 계획 세우기', '오래 집중하기', '무엇부터 해야 할지 모를 때'],
  },
  {
    id: 'focus',
    kind: 'single',
    title: '공부할 때 가장 잘 집중되는 방식은 무엇인가요?',
    options: ['혼자 정리할 때', '설명을 들을 때', '대화할 때', '직접 만들어볼 때'],
  },
  {
    id: 'scene',
    kind: 'text',
    title: '최근 오래 남은 장면이 있나요?',
    hint: '영화, 영상, 음악, 글, 사람, 장소 — 무엇이든. 어디서 왔는지 골라도 되고, 한 줄로 적어도 됩니다.',
    options: ['영화', '영상', '음악', '글', '사람', '장소'],
    max: 2,
    note: { label: '그 장면을 한 줄로', max: 80, placeholder: '예: 비 오는 날 횡단보도에서 본 우산들' },
  },
  {
    id: 'curious',
    kind: 'multi',
    max: 3,
    title: '요즘 더 알고 싶거나 해보고 싶은 것은 무엇인가요?',
    hint: '최대 3개. 아래에 직접 적어도 됩니다.',
    options: ['사람의 마음', '사회와 제도', '자연과 우주', '기술과 AI', '예술과 디자인', '언어와 이야기', '몸과 건강', '돈과 경제'],
    note: { label: '직접 적기 (선택)', max: 60 },
  },
  {
    id: 'decided',
    kind: 'multi',
    max: 2,
    optional: true,
    title: '누군가 대신 정해준 것 같다고 느끼는 선택이 있나요?',
    hint: '없거나 말하고 싶지 않으면 건너뛰어도 됩니다.',
    options: ['희망 진로 · 학과', '다니는 학원 · 수업', '공부하는 과목과 순서', '방과 후 활동', '잘 모르겠다'],
    note: { label: '한 줄로 (선택)', max: 60 },
  },
  {
    id: 'ninety',
    kind: 'text',
    title: '앞으로 90일 안에 한 번 바꿔보고 싶은 것은 무엇인가요?',
    hint: '거창하지 않아도 됩니다. 공부, 관심사, 작업 중 하나.',
    note: { label: '바꿔보고 싶은 것', max: 80, placeholder: '예: 매일 수학 개념 하나를 내 말로 설명해 보기', long: true },
  },
];

/* 막히는 곳 → 정리해 볼 학업의 지점 */
const STUCK: Record<string, string> = {
  '수학의 기초 개념': '수학의 기초 개념을 처음부터 다시 정리하기',
  '긴 글 읽기': '긴 글을 끝까지 읽는 방법 만들기',
  '영어 단어 · 문법': '영어 단어 · 문법을 공부하는 순서 정하기',
  '외워야 하는 과목': '외우는 과목을 정리하는 방식 바꾸기',
  '시험 시간 안에 풀기': '시험 시간 배분 연습',
  '공부 계획 세우기': '한 주의 공부 계획을 작게 세우기',
  '오래 집중하기': '짧게 끊어 집중하는 리듬 만들기',
  '무엇부터 해야 할지 모를 때': '공부의 우선순위 정하기',
};
/* 집중 방식 → 수업에서 살릴 방식 */
const FOCUS: Record<string, string> = {
  '혼자 정리할 때': '혼자 정리하는 시간을 수업 안에 두고, 정리한 것을 함께 확인합니다.',
  '설명을 들을 때': '짧은 설명 뒤에 바로 스스로 풀어 보는 순서로 진행합니다.',
  '대화할 때': '질문을 주고받으며 개념을 자기 말로 설명해 보는 방식이 맞습니다.',
  '직접 만들어볼 때': '개념을 그림 · 모형 · 짧은 결과물로 만들어 보는 방식이 맞습니다.',
};
/* 장면의 출처 · 관심 → 다음 큐레이션에서 만나볼 형식(제목 · 링크는 만들지 않는다) */
const FORMAT_BY_SCENE: Record<string, string> = {
  영화: '영화 한 장면',
  영상: '짧은 다큐멘터리',
  음악: '인터뷰',
  글: '에세이',
  사람: '인터뷰',
  장소: '전시 기록',
};
const FORMAT_BY_CURIOUS: Record<string, string> = {
  '사람의 마음': '에세이',
  '사회와 제도': '짧은 다큐멘터리',
  '자연과 우주': '짧은 다큐멘터리',
  '기술과 AI': '강연',
  '예술과 디자인': '전시 기록',
  '언어와 이야기': '에세이',
  '몸과 건강': '인터뷰',
  '돈과 경제': '인터뷰',
};

export type MyIndex = {
  course: CourseId | null;
  courseLabel: string | null;
  academic: { focus: string[]; strong: string[]; way?: string };
  formats: { name: string; why: string }[];
  sceneNote?: string;
  question: string;
  ninety?: string;
};

export function buildMyIndex(a: Answers): MyIndex {
  const grade = one(a, 'grade') as Grade | undefined;
  const course = grade ? courseOfGrade(grade) : null;
  const strong = many(a, 'strong').filter((s) => s !== '아직 잘 모르겠다');
  const focusMode = one(a, 'focus');

  // 02 세계의 장면 — 응답에서 온 형식만, 이유와 함께, 최대 3개
  const formats: { name: string; why: string }[] = [];
  const add = (name: string | undefined, why: string) => {
    if (name && !formats.some((f) => f.name === name) && formats.length < 3) formats.push({ name, why });
  };
  for (const s of many(a, 'scene')) add(FORMAT_BY_SCENE[s], `오래 남은 장면이 ${s}에서 왔다고 답했습니다`);
  for (const c of many(a, 'curious')) add(FORMAT_BY_CURIOUS[c], `‘${c}’에 대해 더 알고 싶다고 답했습니다`);
  if (formats.length === 0) add('짧은 다큐멘터리', '응답에 장면 · 관심이 없어 가장 짧은 형식부터 제안합니다');

  // 03 다음 질문 — 자유 입력을 일부 반영한 열린 질문 한 문장
  const decided = many(a, 'decided').filter((d) => d !== '잘 모르겠다');
  const decidedNote = quote(noteOf(a, 'decided'));
  const scene = quote(noteOf(a, 'scene'));
  const curiousNote = quote(noteOf(a, 'curious'));
  const question = decidedNote
    ? `‘${decidedNote}’ — 그 선택에서 내가 고른 부분은 어디까지였을까?`
    : decided[0]
      ? `${decided[0]} — 지금의 선택에서 내가 고른 부분과 정해진 부분은 어디서 나뉠까?`
      : scene
        ? `‘${scene}’ — 그 장면은 왜 지금의 나에게 남았을까?`
        : curiousNote
          ? `‘${curiousNote}’ — 그것을 알고 싶어진 건 언제부터였을까?`
          : '지금 공부하는 것 중에서, 내가 스스로 고른 것은 무엇일까?';

  return {
    course,
    courseLabel: course ? COURSES[course].label : null,
    academic: {
      focus: many(a, 'stuck').map((s) => STUCK[s]).filter(Boolean).slice(0, 2),
      strong,
      way: focusMode ? FOCUS[focusMode] : undefined,
    },
    formats,
    sceneNote: scene,
    question,
    ninety: quote(noteOf(a, 'ninety'), 80),
  };
}
