import type { Metadata } from 'next';
import Link from 'next/link';
import { ParentNoteJourney } from '@/components/ParentNoteJourney';

export const metadata: Metadata = { title: '자녀의 학습 방향' };

/* 부모 — 자녀의 학습 방향 살펴보기(약 5분). 결과 PARENT NOTE. 아이를 분류하지 않는다. */
export default function ParentPage() {
  return (
    <div className="house">
      <main id="main" className="page page-dx">
        <p className="dx-crumb">
          <Link href="/start/parent">부모</Link> <span aria-hidden="true">/</span> 자녀의 학습 방향
        </p>
        <h1 className="jr-h1">
          지금 아이에게 필요한 것은
          <br />
          더 많은 답일까요?
        </h1>
        <ParentNoteJourney />
      </main>
    </div>
  );
}
