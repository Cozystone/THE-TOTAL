/*
 * ENTRY NOTICE 저장소 — 이메일 하나 · 시즌 하나 · 중복 없음.
 *
 * 연결 방식(먼저 있는 쪽을 쓴다 — 값은 배포 환경 변수에만 둔다, 코드에 넣지 않는다):
 *   1) Upstash Redis(Vercel Marketplace 연결 시 자동 주입): KV_REST_API_URL + KV_REST_API_TOKEN
 *      (또는 UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
 *      집합 the-total:notice:{season} 에 SADD — 1 이면 새 주소, 0 이면 이미 있음. 신청 시각은 해시에.
 *   2) Supabase: SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY, 표 entry_notices(docs/entry-notices.sql)
 *      unique(season, email) — 409 면 이미 있음.
 * 둘 다 없으면 'not_connected' — 화면은 성공을 꾸미지 않고 지금 받을 수 없다고 말한다.
 */
export type StoreResult = 'ok' | 'duplicate' | 'not_connected' | 'error';

const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const sbUrl = process.env.SUPABASE_URL;
const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const storeConnected = () => !!((redisUrl && redisToken) || (sbUrl && sbKey));

async function redis(commands: (string | number)[][]) {
  const res = await fetch(`${redisUrl}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  return (await res.json()) as { result?: unknown; error?: string }[];
}

export async function addNotice(email: string, season: string): Promise<StoreResult> {
  const at = new Date().toISOString();
  try {
    if (redisUrl && redisToken) {
      const key = `the-total:notice:${season}`;
      const [added] = await redis([
        ['SADD', key, email],
        ['HSETNX', `${key}:at`, email, at],
      ]);
      if (added.error) return 'error';
      return added.result === 1 ? 'ok' : 'duplicate';
    }
    if (sbUrl && sbKey) {
      const res = await fetch(`${sbUrl}/rest/v1/entry_notices`, {
        method: 'POST',
        headers: {
          apikey: sbKey,
          Authorization: `Bearer ${sbKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ email, season, consented_at: at }),
        cache: 'no-store',
      });
      if (res.status === 201) return 'ok';
      if (res.status === 409) return 'duplicate';
      return 'error';
    }
    return 'not_connected';
  } catch {
    return 'error';
  }
}

export async function countNotices(season: string): Promise<number | null> {
  try {
    if (redisUrl && redisToken) {
      const [r] = await redis([['SCARD', `the-total:notice:${season}`]]);
      return typeof r.result === 'number' ? r.result : null;
    }
    if (sbUrl && sbKey) {
      const res = await fetch(`${sbUrl}/rest/v1/entry_notices?season=eq.${season}&select=email`, {
        method: 'HEAD',
        headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}`, Prefer: 'count=exact' },
        cache: 'no-store',
      });
      const range = res.headers.get('content-range'); // 0-0/123
      const n = range ? Number(range.split('/')[1]) : NaN;
      return Number.isFinite(n) ? n : null;
    }
    return null;
  } catch {
    return null;
  }
}

/* ── 평가 개시 안내 — 예약자 중 아직 받지 않은 주소만(한 사람에 한 번) ── */
const sentKey = (season: string) => `the-total:sent:eval:${season}`;

export async function unsentReservations(season: string, limit: number): Promise<string[] | null> {
  if (!(redisUrl && redisToken)) return null;
  const [r] = await redis([['SDIFF', `the-total:notice:${season}`, sentKey(season)]]);
  return Array.isArray(r.result) ? (r.result as string[]).slice(0, limit) : null;
}

export async function markSent(season: string, emails: string[]) {
  if (!(redisUrl && redisToken) || emails.length === 0) return;
  await redis([['SADD', sentKey(season), ...emails]]);
}

export async function sentCount(season: string): Promise<number | null> {
  if (!(redisUrl && redisToken)) return null;
  const [r] = await redis([['SCARD', sentKey(season)]]);
  return typeof r.result === 'number' ? r.result : null;
}
