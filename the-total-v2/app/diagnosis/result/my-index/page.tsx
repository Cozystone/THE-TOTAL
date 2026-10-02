import type { Metadata } from 'next';
import Link from 'next/link';
import { MyIndexResult } from '@/components/MyIndexResult';

export const metadata: Metadata = { title: 'MY INDEX' };

/* 학생 결과 — 응답은 이 브라우저에서만 읽는다(서버 렌더에는 응답이 없다). */
export default function MyIndexResultPage() {
  return (
    <div className="house">
      <main id="main" className="page page-dx">
        <p className="dx-crumb">
          <Link href="/start/student">학생</Link> <span aria-hidden="true">/</span> <Link href="/diagnosis/my-index">나의 INDEX</Link>{' '}
          <span aria-hidden="true">/</span> 결과
        </p>
        <MyIndexResult />
      </main>
    </div>
  );
}
