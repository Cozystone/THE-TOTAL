import { RESERVED_BASE, SEASON, SHOW_RESERVED_COUNT, noticeSeason, phaseAt } from '@/lib/entry';
import { after } from 'next/server';
import { applicationMail, sendOne } from '@/lib/mail';
import { addNotice, countNotices, storeConnected } from '@/lib/notice-store';

/*
 * ENTRY APPLICATION — 이메일 한 곳.
 *   POST { email, consent, company? } → ok | duplicate | invalid | consent | not_connected | error
 *     - 시즌은 서버 시각으로 정한다: 신청 기간에는 2027 신청, 그 뒤에는 2028 시작 안내.
 *     - company 는 사람에게 보이지 않는 칸(자동 입력 걸러내기). 채워져 있으면 기록하지 않고 ok 처럼 끝낸다.
 *     - 새로 기록되면 응답 뒤에(after) 확인 메일 한 통. 메일이 실패해도 신청은 그대로다.
 *   GET → { connected, count } — count = RESERVED_BASE + 2027 실제 신청 수. 저장소가 없으면 connected:false(화면은 숫자를 숨긴다).
 * 신청자 목록: Upstash 집합 the-total:notice:2027 (평가 개시 안내는 이 목록에만).
 */
export const runtime = 'nodejs';

export type NoticeResponse = {
  status: 'ok' | 'duplicate' | 'invalid' | 'consent' | 'not_connected' | 'error';
  season?: string;
};

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;

export async function POST(req: Request) {
  let body: { email?: unknown; consent?: unknown; company?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ status: 'invalid' } satisfies NoticeResponse, { status: 400 });
  }
  const season = noticeSeason(phaseAt(Date.now()));
  if (typeof body.company === 'string' && body.company.trim()) {
    return Response.json({ status: 'ok', season } satisfies NoticeResponse);
  }
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!EMAIL.test(email) || email.length > 254) {
    return Response.json({ status: 'invalid' } satisfies NoticeResponse, { status: 400 });
  }
  if (body.consent !== true) {
    return Response.json({ status: 'consent' } satisfies NoticeResponse, { status: 400 });
  }
  const result = await addNotice(email, season);
  if (result === 'ok') after(async () => void (await sendOne(applicationMail(email, season))));
  const code = result === 'ok' ? 201 : result === 'duplicate' ? 200 : result === 'not_connected' ? 503 : 500;
  return Response.json({ status: result, season } satisfies NoticeResponse, { status: code });
}

export async function GET() {
  if (!SHOW_RESERVED_COUNT) return new Response(null, { status: 404 });
  const connected = storeConnected();
  const real = connected ? await countNotices(SEASON) : null;
  return Response.json(
    { season: SEASON, connected: connected && real !== null, count: real === null ? null : RESERVED_BASE + real },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
