import type { Metadata } from 'next';
import Link from 'next/link';
import { Diagnosis } from '@/components/Diagnosis';

export const metadata: Metadata = { title: 'ACADEMIC 개인진단' };

/* ACADEMIC 개인진단 — 초등 · 중등 · 고등, 약 5분. 결과는 API 응답을 따른다(지어내지 않음). */
export default function AcademicDiagnosisPage() {
  return (
    <div className="house">
      <main id="main" className="page page-dx">
        <p className="dx-crumb">
          <Link href="/admissions">ADMISSIONS</Link> <span aria-hidden="true">/</span> <Link href="/diagnosis">온라인 진단</Link>
        </p>
        <h1 className="eyebrow">ACADEMIC 개인진단 · 초등 · 중등 · 고등 · 약 5분</h1>
        <Diagnosis />
      </main>
    </div>
  );
}
