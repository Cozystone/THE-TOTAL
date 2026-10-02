import type { DiagnosisResponse } from '@/lib/diagnosis/schema';

/*
 * POST /api/diagnosis — 온라인 개인진단 입력을 받는 자리.
 *
 * 지금은 분석 서비스 · 저장소가 연결되어 있지 않다. 입력을 저장하거나 로그로 남기지 않고
 * { status: 'not_connected' } 만 돌려준다.
 *
 * 연결할 때:
 *   1) 입력 검증(lib/diagnosis/schema.ts 의 DiagnosisInput)
 *   2) 동의 · 보유 기간 고지가 화면에 반영되었는지 확인
 *   3) 저장 후 { status: 'received', referenceId } — 분석까지 끝나면 'analyzed' 와 result
 */
export async function POST() {
  const body: DiagnosisResponse = { status: 'not_connected' };
  return Response.json(body, { status: 503 });
}
