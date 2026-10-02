/*
 * THE TOTAL — S.01 THE FIRST QUESTION.
 * 홈은 서비스 설명이 아니라 하나의 캠페인. 문장은 장면의 제목이다.
 * V2 는 독립 프로젝트 — V1(운영 사이트)로 가는 링크 · 언급을 두지 않는다.
 * 정서는 불안이 아니라 열림 · 호기심 · 발견 · 가능성.
 */
export const SITE = {
  name: 'THE TOTAL',
  season: 'S.01 — THE FIRST QUESTION',
  place: '서울 · 대치',
};

/** 메뉴 — 명세 4절이 잘려 도착해 임시안. 시즌 · 세 컬렉션. */
export const MENU = [
  { href: '/', label: 'S.01' },
  { href: '/the-question', label: 'THE QUESTION' },
  { href: '/the-index', label: 'THE INDEX' },
  { href: '/the-world', label: 'THE WORLD' },
] as const;

export const HERO = ['당신은 정말', '당신을 위한 공부를', '하고 있나요?'];

export const CHAPTERS = {
  c1: { no: '01', title: 'BORROWED DESIRES', line: '내가 고른 것과, 나에게 보여진 것은 어디서 갈라질까.' },
  c2: { no: '02', title: 'THE WORLD IS MOVING', line: '더 많은 답을 아는 것만으로는 더 멀리 갈 수 없는 시대.' },
  c3: { no: '03', title: 'A QUESTION OF ONE’S OWN', lines: ['무엇을 향하는지,', '무엇을 믿는지,', '무엇을 공부할지.'] },
  c4: { no: '04', title: 'THE FIRST STEP', line: '그 질문은 아직 누구도 대신 답해줄 수 없습니다.' },
};

/** 04 의 리서치 이미지 — 작은 캡션 */
export const RESEARCH = [
  { src: '/campaign/r-desk.jpg', w: 896, h: 1200, cap: 'R/01 — 밤 10시의 책상' },
  { src: '/campaign/r-crosswalk.jpg', w: 1200, h: 1200, cap: 'R/02 — 같은 시간, 다른 방향' },
  { src: '/campaign/r-corridor.jpg', w: 896, h: 1200, cap: 'R/03 — 마지막 교실의 불빛' },
  { src: '/campaign/r-paper.jpg', w: 1400, h: 1045, cap: 'R/04 — 다시 쓰기 위해 찢는 종이' },
];

/** 보조 문장 — 열림 */
export const OPEN = ['당신이 모르는 세계는', '아직 너무 많습니다.', '보지 못한 장면은,', '아직 선택하지 못한 삶입니다.'];

/** 맺음 — 산파술 */
export const CLOSE = ['THE TOTAL은 답을 가르치지 않습니다.', '한 사람이 자기 답을 발견할 수 있는', '질문과 장면을 만듭니다.'];

/** 목표지향 / 자기지향 — THE QUESTION 에서 */
export const ORIENTATION = [
  {
    key: '목표지향적 삶',
    text: ['누군가가 정한 목적지에', '자신을 최적화하는 삶입니다.'],
  },
  {
    key: '자기지향적 삶',
    text: ['무엇이 자신에게 중요한지 발견하고,', '그 기준으로 목적지를 다시 고르는 삶입니다.'],
  },
];

/** 컬렉션 — 서비스 카드가 아니라 세 개의 오브제 */
export const COLLECTION = [
  {
    slug: 'the-question',
    no: 'I',
    name: 'THE QUESTION',
    line: '내 삶의 방향을 다시 묻는 첫 장면',
    img: { src: '/campaign/question.jpg', alt: '푸른 저녁, 통유리창 앞에 서서 도시를 내려다보는 학생의 뒷모습' },
    alt: { src: '/campaign/question-alt.jpg', alt: '밤의 창을 향해 놓인 빈 의자와 책상, 켜진 스탠드' },
    body: [
      'THE TOTAL의 모든 과정은 한 가지 질문에서 시작합니다. 당신은 정말 당신을 위한 공부를 하고 있나요?',
      '정답을 고르는 문제가 아닙니다. 지금의 공부와 앞으로의 방향을 처음으로 나란히 놓고 보는 장면입니다. 그 장면에서 학생은 무엇을 향하는지, 무엇을 믿는지, 무엇을 공부할지를 자기 말로 꺼내기 시작합니다.',
    ],
  },
  {
    slug: 'the-index',
    no: 'II',
    name: 'THE INDEX',
    line: '내가 아직 좋아할 줄 몰랐던 것을 만나게 하는 개인화된 경로',
    img: { src: '/campaign/index.jpg', alt: '오래된 도서 목록 서랍장에서 서랍 하나를 꺼내는 손' },
    alt: { src: '/campaign/index-alt.jpg', alt: '색 탭이 꽂힌 색인 카드를 넘기는 손끝, 빨간 탭 하나가 올라와 있다' },
    body: [
      '같은 교과서를 읽어도 학생마다 멈추는 곳이 다릅니다. THE INDEX는 그 멈춤을 기록합니다.',
      '대화에서 드러난 관심과 질문을 따라, 다음에 읽을 것 · 볼 것 · 만날 사람을 한 사람의 경로로 엮습니다. 알고리즘이 고른 다음이 아니라, 자기가 고른 다음입니다.',
    ],
  },
  {
    slug: 'the-world',
    no: 'III',
    name: 'THE WORLD',
    line: '영화, 글, 사람, 도시, 기술을 통해 더 넓은 세계를 읽는 편집',
    img: { src: '/campaign/world.jpg', alt: '어두운 극장, 연기 속을 가로지르는 영사기 불빛과 관객의 뒷모습' },
    alt: { src: '/campaign/world-alt.jpg', alt: '새벽, 옥상 난간에 앉아 안개 낀 도시를 바라보는 사람의 뒷모습' },
    body: [
      '교실 밖의 세계를 편집해 보여줍니다. 한 편의 영화, 한 편의 글, 한 사람의 이야기, 하나의 도시, 하나의 기술.',
      '각 편집은 결론이 아니라 질문으로 끝납니다. 그 질문은 학생의 글과 말과 작업이 되어, 다시 세계로 돌아갑니다.',
    ],
    edits: [
      { key: '영화', q: '설명할 수 없는데 오래 남는 장면은 무엇인가.' },
      { key: '글', q: '내 말로 설명할 수 없는 것을 나는 정말 아는가.' },
      { key: '사람', q: '한 사람의 선택은 어디서부터 그의 것이었나.' },
      { key: '도시', q: '이 거리는 누구의 선택으로 이렇게 생겼을까.' },
      { key: '기술', q: '빨라진 것은 답인가, 질문인가.' },
    ],
  },
] as const;
