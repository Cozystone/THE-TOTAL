import type { Ymd } from '@/lib/schedule';

/** 서울 기준 오늘. 서버에서 계산해 클라이언트로 넘긴다(페이지는 한 시간마다 다시 생성). */
export function seoulToday(): Ymd {
  const [y, m, d] = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(new Date())
    .split('-')
    .map(Number);
  return { y, m, d };
}
