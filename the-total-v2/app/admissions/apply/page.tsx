import type { Metadata } from 'next';
import Link from 'next/link';
import { ApplyForm } from '@/components/ApplyForm';
import type { Audience } from '@/lib/entry';

export const metadata: Metadata = { title: '입학 안내 요청' };

/* 입학 안내 요청서 — ?audience=parent · ?session=회차 · ?interest=과정 으로 미리 채운다. 접수 연결 전에는 NOT_OPEN. */
export default async function Apply({
  searchParams,
}: {
  searchParams: Promise<{ audience?: string; session?: string; interest?: string }>;
}) {
  const { audience, session, interest } = await searchParams;
  return (
    <div className="house">
      <main id="main" className="page">
        <header className="page-head">
          <p className="eyebrow">
            <Link href="/admissions">ADMISSIONS</Link> / 입학 안내 요청
          </p>
          <h1 className="page-title">지금의 학생을, 먼저 알려 주세요.</h1>
          <p className="lead">
            학생 본인이나 보호자 누구든 작성할 수 있습니다. 남긴 내용을 바탕으로 맞는 과정과 시작 방법을 개별로 안내합니다.
          </p>
        </header>
        <section className="block" aria-label="입학 안내 요청서">
          <ApplyForm
            audience={audience === 'parent' ? ('parent' as Audience) : 'student'}
            session={session ?? ''}
            interest={interest}
          />
        </section>
      </main>
    </div>
  );
}
