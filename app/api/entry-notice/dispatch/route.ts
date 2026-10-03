import { SEASON, phaseAt } from '@/lib/entry';
import { applicationMail, examMail, mailConnected, sendMany, sendOne } from '@/lib/mail';
import { allowSelfTest, markSent, sentCount, unsentReservations } from '@/lib/notice-store';

/*
 * 응시 안내 발송 — 카운트다운이 끝나면(11.01 00:00 KST 이후) Vercel Cron 이 부른다(vercel.json).
 *   - Authorization: Bearer CRON_SECRET 일 때만(Vercel 이 크론 호출에 붙인다).
 *   - 평가일(11.01)에만 보낸다. 신청자 중 아직 받지 않은 주소만, 한 번 호출에 최대 200통(Gmail 하루 한도 안에서).
 *   - ?dry=1           보내지 않고 남은 수만
 *   - ?test=<이메일>&kind=application|exam   그 한 주소로 시험 발송(기록하지 않음, 날짜와 무관)
 *   - ?selftest=application|exam   비밀값 없이도 되지만 보내는 Gmail 주소 자신에게만, 10분에 한 번(서식 · 도착 확인용)
 */
export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(req: Request) {
  const url0 = new URL(req.url);
  const self = url0.searchParams.get('selftest');
  if (self) {
    if (!mailConnected()) return Response.json({ status: 'mail_not_connected' }, { status: 503 });
    if (!(await allowSelfTest())) return Response.json({ status: 'wait_10_minutes' }, { status: 429 });
    const to = process.env.GMAIL_USER!;
    const r = await sendOne(self === 'exam' ? examMail(to) : applicationMail(to, SEASON));
    return Response.json({ status: r.ok ? 'sent_to_sender' : 'failed', kind: self === 'exam' ? 'exam' : 'application', error: r.error });
  }

  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) return new Response(null, { status: 401 });
  if (!mailConnected()) return Response.json({ status: 'mail_not_connected' }, { status: 503 });
  const url = new URL(req.url);

  const test = url.searchParams.get('test');
  if (test) {
    const kind = url.searchParams.get('kind') === 'exam' ? 'exam' : 'application';
    const r = await sendOne(kind === 'exam' ? examMail(test) : applicationMail(test, SEASON));
    return Response.json({ status: r.ok ? 'sent' : 'failed', kind, error: r.error });
  }

  const dry = url.searchParams.get('dry') === '1';
  const phase = phaseAt(Date.now());
  if (!dry && phase !== 'evaluation') return Response.json({ status: 'not_evaluation_day', phase });

  const pending = await unsentReservations(SEASON, 200);
  if (pending === null) return Response.json({ status: 'store_not_connected' }, { status: 503 });
  if (dry) return Response.json({ status: 'dry', phase, pending: pending.length, sent: await sentCount(SEASON) });

  const { sent, failed } = await sendMany(pending.map((to) => examMail(to)));
  await markSent(SEASON, sent);
  const left = await unsentReservations(SEASON, 100000);
  return Response.json({ status: failed.length ? 'partial' : 'ok', sent: sent.length, failed: failed.length, remaining: left?.length ?? null });
}
