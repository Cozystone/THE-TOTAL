import type { DiagnosisInput, DiagnosisResponse } from '@/lib/diagnosis/schema';

/** 화면 → API. 실패하면 'not_connected' 로 다룬다(결과를 지어내지 않는다). */
export async function submitDiagnosis(input: DiagnosisInput): Promise<DiagnosisResponse> {
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

export type NotifyResponse = { status: 'not_connected' } | { status: 'registered' };

/** 일정 안내 · 알림 신청. 저장 기능이 연결되기 전에는 'not_connected'. */
export async function submitNotify(payload: { email: string; topic: string; consent: boolean }): Promise<NotifyResponse> {
  try {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as NotifyResponse;
    return data && 'status' in data ? data : { status: 'not_connected' };
  } catch {
    return { status: 'not_connected' };
  }
}
