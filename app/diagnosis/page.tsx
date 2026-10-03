import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DiagnosisHub } from '@/components/DiagnosisHub';
import { EntryGate } from '@/components/SeasonDoor';

export const metadata: Metadata = { title: '온라인 진단' };

/* 온라인 진단 — 2027 Season Entry 의 첫 단계. Entry 기간에만 열린다(종료 뒤에는 공고로). 결과는 지어내지 않는다. */
export default function DiagnosisPage() {
  return (
    <main id="main" className="page page-dx">
      <h1 className="eyebrow">2027 SEASON ENTRY · 온라인 진단</h1>
      <EntryGate>
        <Suspense fallback={null}>
          <DiagnosisHub />
        </Suspense>
      </EntryGate>
    </main>
  );
}
