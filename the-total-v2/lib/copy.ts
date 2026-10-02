/*
 * THE TOTAL V2 — 브랜드 경험(Editorial Education House)의 문장.
 * 캠페인 문장은 본인 확정. 바꿀 때는 여기서만 바꾼다.
 * 운영(진단 · 입학시험 · 공지)은 V1 사이트가 맡는다 — ACADEMY 링크로 넘긴다.
 */
export const SITE = {
  name: 'THE TOTAL',
  line: '공부가 한 사람의 삶과 다시 연결되는 순간을 디자인하는 교육기관',
  place: '서울 · 대치',
  /** 운영형 사이트(V1). 진단 · 입학시험 · 공지는 이곳에서 실제로 동작한다. */
  academy: 'https://2026-10the-total.vercel.app',
};

/** 메뉴: 집(철학) · 장면 · 공부 · 들어오기 */
export const MENU = [
  { href: '/house', label: '집' },
  { href: '/scenes', label: '장면' },
  { href: '/study', label: '공부' },
  { href: '/entry', label: '들어오기' },
] as const;

export const CAMPAIGN = {
  hero: ['당신은 정말', '당신을 위한 공부를', '하고 있나요?'],
  sequence: [
    ['세상은 빠르게 달라지고 있습니다.'],
    ['더 많은 답을 아는 것만으로는', '더 멀리 갈 수 없는 시대가 왔습니다.'],
    ['무엇을 향하는지,', '무엇을 믿는지,', '무엇을 공부할지.'],
    ['그 질문은 아직', '누구도 대신 답해줄 수 없습니다.'],
  ],
  close: ['THE TOTAL은', '한 학생의 삶과 질문에서 시작해', '그 사람만의 공부를 다시 설계합니다.'],
};

/** 내부 철학 — 산파술 */
export const HOUSE = {
  thesis: ['THE TOTAL은 답을 가르치지 않습니다.', '한 사람이 자기 답을 발견할 수 있는 질문과 장면을 만듭니다.'],
  intro:
    'THE TOTAL은 답을 대신 주지 않습니다. 학생 안에 이미 있던 질문, 취향, 방향을 발견할 수 있도록 더 넓은 세계와 더 정확한 장면을 보여줍니다.',
  principles: [
    {
      no: '01',
      title: '질문은 이미 학생 안에 있습니다.',
      text: '우리는 질문을 심지 않습니다. 학생이 오래 붙잡고 있던 것, 설명하지 못한 채 지나친 것을 꺼내 놓을 수 있는 자리를 만듭니다.',
    },
    {
      no: '02',
      title: '장면이 답보다 오래 남습니다.',
      text: '정리된 결론 대신 정확한 장면을 보여줍니다. 도시, 돈, 예술, 알고리즘 — 세상이 실제로 움직이는 순간을 가까이에서 보게 합니다.',
    },
    {
      no: '03',
      title: '공부는 삶과 다시 연결되어야 합니다.',
      text: '성적과 진학은 피하지 않습니다. 다만 그 공부가 누구의 것인지, 어디를 향하는지를 학생이 스스로 말할 수 있을 때까지 함께 설계합니다.',
    },
  ],
  people: [
    {
      name: 'Maestro Vin',
      role: 'Founder & Curator',
      text: [
        'Maestro Vin은 2018년부터 대치동을 오가며 학생과 부모, 학원과 경쟁이 만드는 풍경을 가까이에서 기록해 왔습니다.',
        'THE TOTAL은 그 풍경을 단순히 비판하는 대신, 학생이 더 넓은 세계와 자기 언어를 가질 수 있는 새로운 교육을 만듭니다.',
      ],
    },
    {
      name: 'J. LEE',
      role: '원장',
      text: [
        '학생의 성취와 학습 방식, 그리고 그 학생이 내리는 선택을 오래 지켜보며 수업을 설계해 온 교육 설계자입니다.',
        '좋은 교육은 더 많은 것을 요구하기 전에, 먼저 그 학생을 정확히 이해하는 데서 시작됩니다.',
      ],
    },
  ],
};

/** 장면 — 더 넓은 세계. 각 장면은 하나의 질문으로 끝난다. */
export const SCENES = [
  { no: '01', key: '도시', tone: 'ink', figure: 'horizon', q: '이 거리는 누구의 선택으로 이렇게 생겼을까.' },
  { no: '02', key: '알고리즘', tone: 'slate', figure: 'grid', q: '내가 고른 것과 나에게 보여진 것은 어디서 갈라질까.' },
  { no: '03', key: '돈', tone: 'ink', figure: 'window', q: '가격은 가치를 말하는가, 욕망을 말하는가.' },
  { no: '04', key: '예술', tone: 'oxblood', figure: 'arc', q: '설명할 수 없는데 오래 남는 것은 무엇인가.' },
  { no: '05', key: '브랜드', tone: 'slate', figure: 'window', q: '사람들은 물건을 사는가, 이야기를 사는가.' },
  { no: '06', key: '기술', tone: 'ink', figure: 'grid', q: '빨라진 것은 답인가, 질문인가.' },
  { no: '07', key: '몸', tone: 'oxblood', figure: 'horizon', q: '생각은 어디까지 몸의 일인가.' },
  { no: '08', key: '언어', tone: 'slate', figure: 'arc', q: '내 말로 설명할 수 없는 것을 나는 정말 아는가.' },
] as const;

export type Tone = (typeof SCENES)[number]['tone'];
export type Figure = (typeof SCENES)[number]['figure'];

/** 공부 — 세계에 들어온 뒤 발견되는 것 */
export const STUDY = {
  academic: {
    name: 'ACADEMIC',
    line: '성적과 진학을 정확히 다루는 학업과정.',
    items: [
      { key: '초등', text: '공부를 오래 이어갈 습관과 생각의 기초.' },
      { key: '중등', text: '내신과 교과 이해를 바로 세우고, 공부 방식을 다시 정비.' },
      { key: '고등', text: '대입의 현실을 기준으로 과목별 전략과 우선순위를 학생마다.' },
    ],
    href: '/programs',
  },
  forum: {
    name: 'THE TOTAL FORUM',
    line: '사고 · 표현 · 방향. 성적 이후에도 남는 능력.',
    items: [
      { key: 'SEE', text: '세계를 읽는 법' },
      { key: 'WRITE', text: '생각을 글로 만드는 법' },
      { key: 'SPEAK', text: '생각을 사람에게 전달하는 법' },
      { key: 'MAKE', text: '방향을 결과물로 증명하는 법' },
    ],
    href: '/forum',
  },
};

export const ENTRY = [
  { no: '01', title: '온라인 진단', text: '학업과정 진단 또는 FORUM 지원 진단. 학생의 현재와 질문에서 시작합니다.', href: '/diagnosis' },
  { no: '02', title: '온라인 입학시험', text: '과정별 회차에 온라인으로 응시합니다. 일정과 접수 상태는 입학 안내에서.', href: '/admissions' },
  { no: '03', title: '개별 설계', text: '진단과 시험을 함께 검토해, 그 학생만의 공부를 설계합니다.', href: '/about' },
];
