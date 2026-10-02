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

/** 홈의 THE HOUSE — 세 개의 큰 에디토리얼 블록(이미지 · 바탕색 · 짧은 문장 · 링크) */
export const HOUSE = [
  {
    key: 'academic',
    no: 'I',
    name: 'ACADEMIC',
    lines: ['학업의 현재를 정확히 읽고,', '학생마다 다른 수업의 순서를 설계합니다.'],
    meta: '초등 · 중등 · 고등',
    cta: '학업과정 진단 시작',
    href: '/diagnosis/academic',
    more: { label: '교육과정 보기', href: '/programs' },
    img: '/campaign/house-academic.jpg',
    alt: '햇빛이 드는 책상 위, 펼친 교과서와 모눈종이 옆 공책에 도형을 그리며 풀이를 적는 손',
    tone: 'off',
  },
  {
    key: 'forum',
    no: 'II',
    name: 'THE TOTAL FORUM',
    lines: ['생각을 글과 말로 만들고,', '자신의 방향을 실제 작업으로 증명합니다.'],
    meta: '사고 · 표현 · 방향',
    cta: 'FORUM 지원 진단',
    href: '/diagnosis/forum',
    more: { label: 'FORUM 보기', href: '/forum' },
    img: '/campaign/house-forum.jpg',
    alt: '창이 큰 작업실, 사진과 메모가 펼쳐진 긴 나무 탁자에 둘러서서 한 사람의 설명을 듣는 세 학생의 뒷모습',
    tone: 'white',
  },
  {
    key: 'admissions',
    no: 'III',
    name: 'ADMISSIONS',
    lines: ['THE TOTAL에 들어오는', '가장 적합한 방법을 확인합니다.'],
    meta: '개인 진단 · 입학시험 · 일정',
    cta: '입학 안내 보기',
    href: '/admissions',
    more: { label: '입학시험 일정', href: '/admissions/schedule' },
    img: '/campaign/house-admissions.jpg',
    alt: '아침 햇살이 돌바닥으로 쏟아지는 활짝 열린 나무 유리문과 그 문턱을 지나는 학생의 뒷모습',
    tone: 'black',
  },
] as const;

/** 홈의 마지막 — 컬렉션 입장 링크처럼 */
export const ENTER = [
  { no: '01', label: 'ACADEMIC 개인진단', meta: '초등 · 중등 · 고등 · 약 5분', href: '/diagnosis/academic' },
  { no: '02', label: 'FORUM 지원 진단', meta: '관심사 · 생각의 방식 · 만들고 싶은 작업 · 약 10분', href: '/diagnosis/forum' },
  { no: '03', label: '입학 안내', meta: '학생 · 부모 · 입학시험 일정', href: '/admissions' },
] as const;
