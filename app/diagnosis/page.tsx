import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DiagnosisHub } from '@/components/DiagnosisHub';

export const metadata: Metadata = { title: '온라인 진단' };

/* 온라인 진단 — 학업과정 진단 / FORUM 지원 진단. 결과는 API 응답을 따른다(지어내지 않음). */
export default function DiagnosisPage() {
  return (
    <main id="main" className="page page-dx">
      <h1 className="eyebrow">온라인 진단</h1>
      <Suspense fallback={null}>
        <DiagnosisHub />
      </Suspense>
    </main>
  );
}
