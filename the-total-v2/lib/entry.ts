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
      { title: '온라인 개인진단', href: '/diagnosis/my-index', cta: '나의 INDEX' },
      { title: '과정별 입학시험 또는 지원 서술', href: '/admissions/schedule', cta: '입학시험 일정' },
      { title: '개별 안내' },
      { title: '수업 설계 및 등록' },
    ],
  },
  parent: {
    label: '나는 부모입니다.',
    lead: '자녀의 지금을 먼저 이해하고, 맞는 시작을 함께 고르는 길입니다.',
    steps: [
      { title: '자녀의 현재 학년과 고민 선택', href: '/diagnosis/parent', cta: '자녀의 학습 방향' },
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

/** 홈의 정보 스트립 */
export const STRIP = ['온라인 개인진단', '맞춤 수업 제안', '초등 · 중등 · 고등', '대치 · 서울'] as const;

/** 홈의 마지막 — THE TOTAL에 들어오는 방법 */
export const ENTRY_STEPS = [
  { no: '01', title: '온라인 개인진단', text: '학생은 나의 INDEX, 부모는 자녀의 학습 방향에서 시작합니다.' },
  { no: '02', title: '과정 제안 및 안내', text: '응답을 바탕으로 맞는 과정과 시작 방법을 개별로 안내합니다.' },
  { no: '03', title: '입학시험 또는 상담', text: '과정별 온라인 입학시험이나 첫 상담으로 수업 설계를 시작합니다.' },
] as const;

/** /start/student · /start/parent — 완전히 다른 두 입구 */
export const START = {
  student: {
    who: '학생',
    title: ['지금의 나는,', '무엇을 더 알고 싶을까?'],
    body: ['성적표만으로는 알 수 없는 현재를 살펴봅니다.', '잘하는 것, 어려운 것, 오래 남은 장면과', '앞으로 궁금한 것을 차례로 정리합니다.'],
    main: { label: '나의 INDEX 시작하기', meta: '약 7분', href: '/diagnosis/my-index' },
    more: [
      { label: '학업과정 진단', meta: '과목 · 학습 상태 · 학습 환경 중심', href: '/diagnosis/academic' },
      { label: 'FORUM 지원 진단', meta: '관심사 · 표현 · 만들고 싶은 것 중심', href: '/diagnosis/forum' },
      { label: '입학 일정 보기', meta: '과정별 온라인 입학시험', href: '/admissions/schedule' },
    ],
    img: '/campaign/house-forum.jpg',
    alt: '창이 큰 작업실, 사진과 메모가 펼쳐진 탁자에 둘러서서 이야기하는 학생들의 뒷모습',
    other: { label: '부모이신가요?', href: '/start/parent' },
  },
  parent: {
    who: '부모',
    title: ['지금 아이에게 필요한 것은', '더 많은 답일까요?'],
    body: ['학업의 속도와 성적은 중요합니다.', '그러나 아이가 무엇을 어려워하는지,', '어떤 방식에서 움직이는지를 함께 보지 않으면', '다음 선택도 흔들릴 수 있습니다.'],
    main: { label: '자녀의 학습 방향 살펴보기', meta: '약 5분', href: '/diagnosis/parent' },
    more: [
      { label: '교육과정 보기', meta: '초등 · 중등 · 고등 과정의 운영 방식', href: '/programs' },
      { label: '입학 일정 보기', meta: '과정별 온라인 입학시험', href: '/admissions/schedule' },
      { label: '입학 안내', meta: '진단 · 입학시험 · 개별 안내 요청', href: '/admissions' },
    ],
    img: '/campaign/house-academic.jpg',
    alt: '햇빛이 드는 책상 위, 펼친 교과서 옆 공책에 풀이를 적는 손',
    other: { label: '학생이신가요?', href: '/start/student' },
  },
} as const;
