'use client';

import { useEffect, useState } from 'react';
import { NEXT_ENTRY_LABEL, NEXT_SEASON, RESERVED_BASE, SEASON, SHOW_NOTICE_COUNT, phaseAt, remaining, type Phase } from '@/lib/entry';

/*
 * 2027 SEASON ENTRY 의 시계. 설정값은 lib/entry.ts 한 곳.
 *  - 1초마다 실제로 줄어든다. 숫자는 고정폭(tabular-nums) — 바뀌어도 레이아웃이 흔들리지 않는다.
 *  - 서버 HTML 에는 '지금' 을 넣지 않는다(첫 그리기 뒤 계산 → 시각 차이로 어긋나지 않게).
 *  - 0 이 되면 저절로 CLOSED 로 바뀐다.
 *  - 화면 읽기: 초 단위로 읽어 주지 않는다. 숨은 문장(분 단위)만 갱신한다.
 */
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, intervalMs);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [intervalMs]);
  return now;
}

/** 지금 Entry 가 열려 있는가 — 첫 그리기 전에는 null */
export function usePhase(): Phase | null {
  const now = useNow(1000);
  return now === null ? null : phaseAt(now);
}

const pad = (n: number) => String(n).padStart(2, '0');

/** D–00 00:00:00 */
export function Countdown({ label = 'ENTRY CLOSES IN' }: { label?: string }) {
  const now = useNow(1000);
  const r = now === null ? null : remaining(now);
  const text = r ? `D–${pad(r.d)} ${pad(r.h)}:${pad(r.m)}:${pad(r.s)}` : 'D–00 00:00:00';
  const spoken = r ? `Entry 종료까지 ${r.d}일 ${r.h}시간 ${r.m}분 남았습니다.` : 'Entry 종료까지 남은 시간을 계산하고 있습니다.';
  return (
    <div className="clock">
      <p className="clock-label">{label}</p>
      <p className="clock-num" aria-hidden="true" data-ready={r ? '' : undefined}>
        {text}
      </p>
      <p className="sr" role="timer" aria-live="off">
        {spoken}
      </p>
    </div>
  );
}

/** 종료 공고 — '놓쳤다' 가 아니라 다음 시즌을 준비하는 기관의 공고 */
export function ClosedNotice({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? 'h1' : 'h2';
  return (
    <div className="closed" role="status">
      <p className="label">{SEASON} SEASON ENTRY</p>
      <H className="closed-title">CLOSED</H>
      <p className="closed-text">
        {SEASON} Season Entry가 종료되었습니다.
        <br />
        다음 Entry는 {NEXT_ENTRY_LABEL}에 열립니다.
      </p>
      <p className="closed-ask">{NEXT_SEASON} Season의 시작 안내를 받으시겠습니까?</p>
    </div>
  );
}

/*
 * 현재 예약 — 시작값 + 실제 기록 수. 10초마다, 그리고 이 화면에서 기록되는 즉시 다시 읽는다.
 * 숫자는 고정폭. 화면 읽기에는 바뀔 때마다 읽어 주지 않는다(aria-live off).
 */
export function Reserved() {
  const [count, setCount] = useState<number>(RESERVED_BASE);
  useEffect(() => {
    if (!SHOW_NOTICE_COUNT) return;
    let alive = true;
    const load = () =>
      fetch('/api/entry-notice', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (alive && typeof d?.count === 'number') setCount(d.count);
        })
        .catch(() => {});
    const first = window.setTimeout(load, 0);
    const t = window.setInterval(load, 10_000);
    window.addEventListener('entry-notice:added', load);
    return () => {
      alive = false;
      window.clearTimeout(first);
      window.clearInterval(t);
      window.removeEventListener('entry-notice:added', load);
    };
  }, []);
  if (!SHOW_NOTICE_COUNT) return null;
  return (
    <p className="reserved" aria-live="off">
      <span className="reserved-label">현재 예약</span>
      <span className="reserved-num">{count.toLocaleString('ko-KR')}</span>
      <span className="reserved-unit">명</span>
    </p>
  );
}
