import type { Metadata } from 'next';
import Link from 'next/link';
import { ParentNoteResult } from '@/components/ParentNoteResult';

export const metadata: Metadata = { title: 'PARENT NOTE' };

/* 부모 결과 — 응답은 이 브라우저에서만 읽는다. */
export default function ParentNoteResultPage() {
  return (
    <div className="house">
      <main id="main" className="page page-dx">
        <p className="dx-crumb">
          <Link href="/start/parent">부모</Link> <span aria-hidden="true">/</span> <Link href="/diagnosis/parent">자녀의 학습 방향</Link>{' '}
          <span aria-hidden="true">/</span> 정리
        </p>
        <ParentNoteResult />
      </main>
    </div>
  );
}
