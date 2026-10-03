import { SEASON, phaseAt } from '@/lib/entry';
import { evaluationMail, mailConnected, sendBatch } from '@/lib/mail';
import { markSent, sentCount, unsentReservations } from '@/lib/notice-store';

/*
 * 평가 개시 안내 발송 — Vercel Cron 이 평가일(11.01) 00:05 · 02:05 KST 에 부른다(vercel.json).
 *   - Authorization: Bearer CRON_SECRET 이 맞을 때만(Vercel 이 크론 호출에 붙인다). 비밀값이 없으면 아무것도 하지 않는다.
 *   - 평가일에만 보낸다. 예약자 중 아직 받지 않은 주소만, 100통씩 묶어, 한 번 호출에 최대 500통.
 *   - ?dry=1 이면 보내지 않고 남은 수만 알려준다.
 */
export const maxDuration = 60;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) return new Response(null, { status: 401 });
  const url = new URL(req.url);
  const dry = url.searchParams.get('dry') === '1';
  const phase = phaseAt(Date.now());
  if (!dry && phase !== 'evaluation') return Response.json({ status: 'not_evaluation_day', phase });
  if (!mailConnected()) return Response.json({ status: 'mail_not_connected' }, { status: 503 });

  const pending = await unsentReservations(SEASON, 500);
  if (pending === null) return Response.json({ status: 'store_not_connected' }, { status: 503 });
  if (dry) return Response.json({ status: 'dry', phase, pending: pending.length, sent: await sentCount(SEASON) });

  let sent = 0;
  const errors: string[] = [];
  for (let i = 0; i < pending.length; i += 100) {
    const chunk = pending.slice(i, i + 100);
    const r = await sendBatch(chunk.map((to) => evaluationMail(to)));
    if (r.ok) {
      await markSent(SEASON, chunk);
      sent += chunk.length;
    } else errors.push(r.error ?? 'error');
  }
  const left = await unsentReservations(SEASON, 100000);
  return Response.json({ status: errors.length ? 'partial' : 'ok', sent, remaining: left?.length ?? null, errors });
}
