import type { Metadata } from 'next';
import Link from 'next/link';
import { StudentIndex } from '@/components/StudentIndex';

export const metadata: Metadata = { title: '나의 INDEX' };

/* 학생 — 나의 INDEX(약 7분). 결과 MY INDEX 는 응답의 정리이며 판정이 아니다. */
export default function MyIndexPage() {
  return (
    <div className="house">
      <main id="main" className="page page-dx">
        <p className="dx-crumb">
          <Link href="/start/student">학생</Link> <span aria-hidden="true">/</span> 나의 INDEX
        </p>
        <h1 className="jr-h1">
          지금의 나는,
          <br />
          무엇을 더 알고 싶을까?
        </h1>
        <StudentIndex />
      </main>
    </div>
  );
}
