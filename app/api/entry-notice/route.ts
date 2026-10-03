import { RESERVED_BASE, SEASON, SHOW_NOTICE_COUNT, noticeSeason, phaseAt } from '@/lib/entry';
import { addNotice, countNotices } from '@/lib/notice-store';

/*
 * ENTRY NOTICE — 이메일 한 곳.
 *   POST { email, consent, company? } → ok | duplicate | invalid | consent | not_connected | error
 *     - 시즌은 서버 시각으로 정한다: Entry 기간에는 2027, 종료 뒤에는 2028(다음 시즌 안내만).
 *     - company 는 사람에게 보이지 않는 칸(자동 입력 걸러내기). 채워져 있으면 기록하지 않고 ok 처럼 끝낸다.
 *   GET → 예약 수 = RESERVED_BASE + 이번 시즌(2027) 실제 기록 수. SHOW_NOTICE_COUNT 가 꺼져 있으면 404.
 */
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
  const code = result === 'ok' ? 201 : result === 'duplicate' ? 200 : result === 'not_connected' ? 503 : 500;
  return Response.json({ status: result, season } satisfies NoticeResponse, { status: code });
}

export async function GET() {
  if (!SHOW_NOTICE_COUNT) return new Response(null, { status: 404 });
  const real = await countNotices(SEASON);
  return Response.json({ season: SEASON, count: RESERVED_BASE + (real ?? 0) }, { headers: { 'Cache-Control': 'no-store' } });
}
