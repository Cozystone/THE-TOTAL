/*
 * POST /api/apply — 입학 안내 요청(학생/부모 · 이름 또는 호칭 · 학년 · 연락처 · 관심 과정 · 희망 회차 · 동의).
 *
 * 저장소(DB) · 메일 발송이 연결되기 전에는 아무것도 저장 · 기록하지 않고 'not_connected' 를 돌려준다.
 * 화면은 이 응답일 때 "등록 완료" 를 띄우지 않고 lib/entry.ts 의 NOT_OPEN 문구를 보여준다.
 *
 * 연결할 때: 입력 검증 → 저장 → { status: 'received', referenceId } (이때만 접수 완료 문구).
 */
export type ApplyResponse = { status: 'not_connected' } | { status: 'received'; referenceId: string };

export async function POST() {
  const body: ApplyResponse = { status: 'not_connected' };
  return Response.json(body, { status: 503 });
}
