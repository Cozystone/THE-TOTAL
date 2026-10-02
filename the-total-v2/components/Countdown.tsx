'use client';

import { useEffect, useState } from 'react';
import { NOT_SCHEDULED, examTime } from '@/lib/season';

/*
 * 온라인 입학시험 카운트다운 — 값은 lib/season.ts 의 ENTRY_EXAM_AT 하나에서만.
 *  - 값이 없거나, 형식이 틀리거나, 이미 지났으면: '다음 입학 일정 준비 중'. 거짓 카운트다운을 만들지 않는다.
 *  - 있으면: 한국 시간 기준 시험 시각과 남은 '일 · 시간 · 분'. 30초마다 갱신.
 *  - 서버 HTML 에는 '현재 시각' 을 넣지 않는다(첫 그리기 뒤에 계산 — 시각 차이로 어긋나지 않게).
 */
const KST = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return now;
}

export function Countdown() {
  const at = examTime();
  const now = useNow();

  if (at === null || (now !== null && now >= at)) {
    return (
      <div className="cd cd-none" role="status">
        <p className="cd-title">{NOT_SCHEDULED.title}</p>
        <p className="cd-text">{NOT_SCHEDULED.text}</p>
      </div>
    );
  }

  const left = now === null ? null : Math.max(0, at - now);
  const d = left === null ? null : Math.floor(left / 86_400_000);
  const h = left === null ? null : Math.floor((left % 86_400_000) / 3_600_000);
  const m = left === null ? null : Math.floor((left % 3_600_000) / 60_000);
  const pad = (n: number | null) => (n === null ? '––' : String(n).padStart(2, '0'));

  return (
    <div className="cd" role="timer" aria-live="off">
      <p className="cd-label">온라인 입학시험까지</p>
      <p className="cd-num" aria-label={left === null ? '계산 중' : `${d}일 ${h}시간 ${m}분 남음`}>
        <span>
          <b>{pad(d)}</b>일
        </span>
        <span>
          <b>{pad(h)}</b>시간
        </span>
        <span>
          <b>{pad(m)}</b>분
        </span>
      </p>
      <p className="cd-at">{KST.format(at)} (한국 시간)</p>
    </div>
  );
}

/** 일정 한 줄 — S.01 페이지의 입학 정보 */
export function ExamDate() {
  const at = examTime();
  const now = useNow();
  if (at === null || (now !== null && now >= at)) return <>{NOT_SCHEDULED.title}</>;
  return <>{KST.format(at)} (한국 시간)</>;
}
