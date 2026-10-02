import type { Metadata } from 'next';
import { NoticeList } from '@/components/NoticeList';
import { Notify } from '@/components/Notify';
import { NOTICE_TYPES, NOTICES } from '@/lib/notices';

export const metadata: Metadata = { title: '공지' };

/* 공지 — 유형 · 날짜 · 제목. 유형별로 거르고, 제목을 누르면 본문이 열린다. */
export default function Notices() {
  const list = [...NOTICES].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="house">
    <main id="main" className="page">
      <header className="page-head">
        <p className="eyebrow">공지</p>
        <h1 className="page-title">공지</h1>
        <p className="lead">입학시험, 과정 운영, 온라인 진단, 운영에 관한 안내를 게시합니다.</p>
      </header>

      <section className="block" aria-label="공지 목록">
        <NoticeList notices={list} />
      </section>

      <section className="block" id="alert" aria-labelledby="alert-title">
        <div className="block-head">
          <h2 id="alert-title">공지 알림 받기</h2>
        </div>
        <div className="split">
          <p className="body">새 공지가 게시되면 선택한 유형만 이메일로 안내합니다.</p>
          <Notify topics={Object.values(NOTICE_TYPES).map((t) => `${t} 공지`)} submitLabel="알림 신청" />
        </div>
      </section>
    </main>
    </div>
  );
}
