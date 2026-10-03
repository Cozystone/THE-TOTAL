import type { DiagnosisPayload, DiagnosisResponse } from '@/lib/diagnosis/schema';

/** 화면 → API. 실패하면 'not_connected' 로 다룬다(결과를 지어내지 않는다). */
export async function submitDiagnosis(input: DiagnosisPayload): Promise<DiagnosisResponse> {
  try {
    const res = await fetch('/api/diagnosis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const data = (await res.json()) as DiagnosisResponse;
    return data && 'status' in data ? data : { status: 'not_connected' };
  } catch {
    return { status: 'not_connected' };
  }
}
