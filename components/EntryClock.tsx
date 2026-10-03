'use client';

import { useEffect, useState } from 'react';
import {
  CLOSE_AT,
  NEXT_ENTRY_LABEL,
  NEXT_SEASON,
  RESERVE_CLOSE_AT,
  SEASON,
  SHOW_RESERVED_COUNT,
  phaseAt,
  remaining,
  type Phase,
} from '@/lib/entry';

/*
 * 입학평가의 시계. 설정값은 lib/entry.ts 한 곳.
 *  - 네 개의 시간 단위 블록(DAYS · HOURS · MINUTES · SECONDS), 블록 사이 얇은 세로선. 휴대폰 좁은 폭에서는 2×2.
 *  - 숫자는 고정폭 — 바뀌어도 흔들리지 않는다. 1초마다 실제로 줄어든다.
 *  - 서버 HTML 에는 '지금' 을 넣지 않는다(첫 그리기 뒤 계산). 화면 읽기는 숨은 문장(분 단위)만.
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

/** 지금 단계 — 첫 그리기 전에는 null */
export function usePhase(): Phase | null {
  const now = useNow(1000);
  return now === null ? null : phaseAt(now);
}

const pad = (n: number) => String(n).padStart(2, '0');

/** 신청 기간에는 신청 마감까지, 평가일에는 평가 종료까지 */
export function Countdown({ label, aside }: { label?: string; aside?: React.ReactNode }) {
  const now = useNow(1000);
  const phase = now === null ? null : phaseAt(now);
  const target = phase === 'evaluation' ? CLOSE_AT : RESERVE_CLOSE_AT;
  const text = label ?? (phase === 'evaluation' ? '평가 종료까지' : '신청 마감까지');
  const r = now === null ? null : remaining(now, target);
  const units = [
    { v: r?.d, u: 'DAYS' },
    { v: r?.h, u: 'HOURS' },
    { v: r?.m, u: 'MINUTES' },
    { v: r?.s, u: 'SECONDS' },
  ];
  return (
    <div className="cd">
      <div className="cd-head">
        <p className="cd-label">{text}</p>
        {aside}
      </div>
      <ol className="cd-units" aria-hidden="true" data-ready={r ? '' : undefined}>
        {units.map((x) => (
          <li key={x.u}>
            <span className="cd-num">{x.v === undefined ? '00' : pad(x.v)}</span>
            <span className="cd-unit">{x.u}</span>
          </li>
        ))}
      </ol>
      <p className="sr" role="timer" aria-live="off">
        {r ? `${text} ${r.d}일 ${r.h}시간 ${r.m}분 남았습니다.` : `${text} 남은 시간을 계산하고 있습니다.`}
      </p>
    </div>
  );
}

/*
 * 현재 신청 — 시작값 + 실제 신청 수. 저장소가 연결돼 있을 때만, 신청 기간에만.
 * 10초마다, 그리고 이 화면에서 신청되는 즉시 다시 읽는다.
 */
export function Reserved() {
  const phase = usePhase();
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    if (!SHOW_RESERVED_COUNT) return;
    let alive = true;
    const load = () =>
      fetch('/api/entry-notice', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (!alive) return;
          setCount(d?.connected && typeof d.count === 'number' ? d.count : null);
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
  if (!SHOW_RESERVED_COUNT || count === null || phase !== 'reserve') return null;
  return (
    <p className="reserved" aria-live="off">
      현재 신청 <b>{count.toLocaleString('ko-KR')}</b>명
    </p>
  );
}

/** 종료 공고 — 다음 시즌을 준비하는 기관의 공고 */
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
