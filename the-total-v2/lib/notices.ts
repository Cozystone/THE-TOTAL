/*
 * 공지 데이터. 유형 · 날짜 · 제목 · 본문.
 * ⚠ 운영 공지 확정 전의 예시 값이다. 실적 · 인원 · 마감 수치를 쓰지 않는다.
 */
export type NoticeType = 'exam' | 'course' | 'diagnosis' | 'operation';

export const NOTICE_TYPES: Record<NoticeType, string> = {
  exam: '입학시험',
  course: '과정 운영',
  diagnosis: '온라인 진단',
  operation: '운영 안내',
};

export type Notice = {
  id: string;
  type: NoticeType;
  date: string;
  title: string;
  body: string;
};

export const NOTICES: Notice[] = [
  {
    id: 'n-1002',
    type: 'exam',
    date: '2026-10-02',
    title: '10월 온라인 입학시험 회차 안내',
    body: '고등과정 10일, 중등과정 17일, 초등과정 24일에 온라인 입학시험이 진행됩니다. 과정별 접수 기간은 입학 안내의 일정에서 확인할 수 있습니다.',
  },
  {
    id: 'n-0928',
    type: 'diagnosis',
    date: '2026-09-28',
    title: '온라인 개인진단 이용 안내',
    body: '온라인 개인진단은 학년과 과정을 선택한 뒤 단계별 문항에 답하는 방식으로 진행됩니다. 진단은 입학시험 전 수업 설계의 출발점으로 사용됩니다.',
  },
  {
    id: 'n-0921',
    type: 'course',
    date: '2026-09-21',
    title: '겨울학기 과정 운영 일정 준비 안내',
    body: '겨울학기 과정 운영 일정은 준비 중입니다. 확정되는 대로 공지와 입학 안내 일정에 함께 게시합니다.',
  },
  {
    id: 'n-0914',
    type: 'operation',
    date: '2026-09-14',
    title: '상담 및 문의 운영 안내',
    body: '모든 상담은 온라인 진단 또는 입학시험 이후 개별 안내로 진행됩니다. 일정 문의는 입학 안내 페이지에서 남길 수 있도록 준비 중입니다.',
  },
];

export const latestNotices = (n = 3) => [...NOTICES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);
