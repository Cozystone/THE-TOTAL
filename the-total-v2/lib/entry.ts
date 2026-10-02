/*
 * 입학 동선 — 학생 / 부모 경로와 시작점.
 * 각 단계는 실제로 열리는 페이지로 이어진다(없는 기능을 가리키지 않는다).
 */
export type Audience = 'student' | 'parent';

export const PATHS: Record<Audience, { label: string; lead: string; steps: { title: string; href?: string; cta?: string }[] }> = {
  student: {
    label: '나는 학생입니다.',
    lead: '무엇을 공부할지, 어떻게 시작할지 직접 고르는 길입니다.',
    steps: [
      { title: '학업과정 또는 FORUM 선택', href: '/programs', cta: '과정 보기' },
      { title: '온라인 개인진단', href: '/diagnosis', cta: '진단 고르기' },
      { title: '과정별 입학시험 또는 지원 서술', href: '/admissions/schedule', cta: '입학시험 일정' },
      { title: '개별 안내' },
      { title: '수업 설계 및 등록' },
    ],
  },
  parent: {
    label: '나는 부모입니다.',
    lead: '자녀의 지금을 먼저 이해하고, 맞는 시작을 함께 고르는 길입니다.',
    steps: [
      { title: '자녀의 현재 학년과 고민 선택', href: '/admissions/apply?audience=parent', cta: '안내 요청서' },
      { title: '학업과정 또는 FORUM 확인', href: '/programs', cta: '과정 보기' },
      { title: '온라인 개인진단 또는 입학시험 일정 선택', href: '/admissions/schedule', cta: '일정 확인' },
      { title: '개별 안내' },
      { title: '수업 설계 및 등록' },
    ],
  },
};

export const STARTS = [
  {
    key: 'ACADEMIC',
    title: 'ACADEMIC 개인진단 시작',
    meta: '초등 · 중등 · 고등',
    time: '약 5분',
    href: '/diagnosis/academic',
  },
  {
    key: 'FORUM',
    title: 'FORUM 지원 진단 시작',
    meta: '관심사 · 생각의 방식 · 만들고 싶은 작업',
    time: '약 10분',
    href: '/diagnosis/forum',
  },
  {
    key: 'SCHEDULE',
    title: '입학시험 일정 확인',
    meta: '과정별 온라인 입학시험',
    time: '회차 · 접수 상태',
    href: '/admissions/schedule',
  },
] as const;

/** 접수 기능이 연결되기 전의 정확한 안내 문구 */
export const NOT_OPEN = '현재 온라인 신청 접수는 준비 중입니다. 입학 안내를 먼저 확인해 주세요.';

/** 홈의 THE HOUSE — 짧게. 자세한 내용은 /programs · /admissions */
export const HOUSE = [
  {
    key: 'academic',
    name: 'ACADEMIC',
    line: '학업의 현재를 정확히 읽고, 학생마다 다른 수업의 순서를 설계합니다.',
    cta: '학업과정 진단',
    href: '/diagnosis/academic',
    img: '/campaign/house-academic.jpg',
  },
  {
    key: 'forum',
    name: 'THE TOTAL FORUM',
    line: '생각을 글과 말로 만들고, 자신의 방향을 실제 작업으로 증명합니다.',
    cta: 'FORUM 지원 진단',
    href: '/diagnosis/forum',
    img: '/campaign/house-forum.jpg',
  },
  {
    key: 'admissions',
    name: '입학 안내',
    line: 'THE TOTAL에 들어오는 가장 적합한 방법을 확인합니다.',
    cta: '입학 안내 보기',
    href: '/admissions',
    img: '/campaign/house-admissions.jpg',
  },
] as const;

/** 마지막 입장 — 학생 / 부모 / 입학 안내 */
export const ENTER = [
  { no: '01', label: '나는 학생입니다', meta: '나에게 맞는 시작 찾기', href: '/start/student' },
  { no: '02', label: '나는 부모입니다', meta: '자녀에게 맞는 시작 찾기', href: '/start/parent' },
  { no: '03', label: '입학 안내', meta: '개인진단 · 입학시험 일정 · 안내 요청', href: '/admissions' },
] as const;

/** /start — QR 로 들어온 학생 · 부모의 두 번째 화면 */
export const START = {
  student: {
    tag: '학생에게',
    title: ['내가 정말 원하는 것은', '무엇일까?'],
    body: ['THE TOTAL은', '당신이 더 넓은 세계를 보고,', '자기 생각을 글과 말로 만들고,', '자신만의 공부를 설계하도록 돕습니다.'],
    cta: '나의 시작 찾기',
    img: '/campaign/house-forum.jpg',
    alt: '창이 큰 작업실, 사진과 메모가 펼쳐진 탁자에 둘러서서 이야기하는 학생들의 뒷모습',
    other: { label: '부모이신가요?', href: '/start/parent' },
  },
  parent: {
    tag: '부모님께',
    title: ['아이에게 필요한 공부는', '더 많은 답일까요,', '자기 삶을 생각할 시간일까요?'],
    body: ['THE TOTAL은 학업의 현실을 정확히 다루면서,', '아이의 질문과 방향을 함께 설계합니다.'],
    cta: '자녀의 시작 찾기',
    img: '/campaign/house-academic.jpg',
    alt: '햇빛이 드는 책상 위, 펼친 교과서 옆 공책에 풀이를 적는 손',
    other: { label: '학생이신가요?', href: '/start/student' },
  },
} as const;

/** /start 의 마지막 세 선택 */
export const CHOICES = [
  { label: 'ACADEMIC 개인진단', meta: '초등 · 중등 · 고등 · 약 5분', href: '/diagnosis/academic' },
  { label: 'FORUM 지원 진단', meta: '관심사 · 생각의 방식 · 만들고 싶은 작업 · 약 10분', href: '/diagnosis/forum' },
  { label: '입학 안내', meta: '입학시험 일정 · 안내 요청', href: '/admissions' },
] as const;
