import type { Metadata } from 'next';
import { Diagnosis } from '@/components/Diagnosis';

export const metadata: Metadata = { title: '온라인 진단' };

/* 온라인 개인진단 — 한 화면 한 단계. 결과는 API 응답을 따른다(지어내지 않음). */
export default function DiagnosisPage() {
  return (
    <main id="main" className="page page-dx">
      <p className="eyebrow">온라인 진단</p>
      <Diagnosis />
    </main>
  );
}
