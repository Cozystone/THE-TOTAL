import type { Metadata } from 'next';
import Link from 'next/link';
import { ForumDiagnosis } from '@/components/ForumDiagnosis';

export const metadata: Metadata = { title: 'FORUM 지원 진단' };

/* FORUM 지원 진단 — 관심사 · 생각의 방식 · 만들고 싶은 작업, 약 10분. */
export default function ForumDiagnosisPage() {
  return (
    <div className="house">
      <main id="main" className="page page-dx">
        <p className="dx-crumb">
          <Link href="/admissions">ADMISSIONS</Link> <span aria-hidden="true">/</span> <Link href="/diagnosis">온라인 진단</Link>
        </p>
        <h1 className="eyebrow">FORUM 지원 진단 · 관심사 · 생각의 방식 · 만들고 싶은 작업 · 약 10분</h1>
        <ForumDiagnosis />
      </main>
    </div>
  );
}
