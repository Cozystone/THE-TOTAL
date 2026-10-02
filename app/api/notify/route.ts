import type { NotifyResponse } from '@/lib/diagnosis/client';

/*
 * POST /api/notify — 응시 안내 · 공지 알림 신청을 받는 자리.
 * 저장소 · 메일 발송이 연결되기 전에는 아무것도 저장하지 않고 'not_connected' 를 돌려준다.
 * 화면은 이 응답일 때 "등록 완료" 를 띄우지 않는다.
 */
export async function POST() {
  const body: NotifyResponse = { status: 'not_connected' };
  return Response.json(body, { status: 503 });
}
