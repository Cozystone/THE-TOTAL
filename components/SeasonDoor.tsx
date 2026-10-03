'use client';

import Link from 'next/link';
import { ClosedNotice, Countdown, Reserved, usePhase } from '@/components/EntryClock';
import { useGo } from '@/components/NavLink';
import { SEASON } from '@/lib/entry';

/*
 * 2027 SEASON ENTRY 의 첫 화면 — 홈과 /entry 가 같이 쓴다. 카운트다운이 0 이 되면 저절로 CLOSED 공고로.
 *   home : 2027 SEASON ENTRY / 이번 시즌의 문은 11월 1일에 닫힙니다. / ENTRY CLOSES IN / D–00 00:00:00 / 연 1회 / 2027 ENTRY 보기 →
 *   entry: 2027 SEASON / THE TOTAL ENTRY / 한 번 열린 문은 다음 해까지 다시 열리지 않습니다. / ENTRY CLOSES IN / D–00 00:00:00
 */
export function SeasonDoor({ variant }: { variant: 'home' | 'entry' }) {
  const phase = usePhase();
  const go = useGo();

  if (phase === 'closed') {
    return (
      <div className="door door-closed">
        <ClosedNotice headingLevel={1} />
        <div className="door-actions">
          <Link className="button button-line" href="/entry#notice" onClick={(e) => go(e, '/entry#notice')}>
            {variant === 'home' ? '2028 SEASON 안내 받기 →' : '아래에서 안내 받기 →'}
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'home') {
    return (
      <div className="door">
        <p className="label">{SEASON} SEASON ENTRY</p>
        <h1 className="door-title">
          이번 시즌의 문은 <span className="door-break">11월 1일에 닫힙니다.</span>
        </h1>
        <Countdown />
        <Reserved />
        <p className="door-note">
          {SEASON} Season Entry는
          <br />
          매년 10월, 한 번만 열립니다.
        </p>
        <div className="door-actions">
          <Link className="button button-line" href="/entry" onClick={(e) => go(e, '/entry')}>
            2027 ENTRY 보기 →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="door">
      <p className="label">{SEASON} SEASON</p>
      <h1 className="door-title door-title-entry">THE TOTAL ENTRY</h1>
      <p className="door-sub">
        한 번 열린 문은
        <br />
        다음 해까지 다시 열리지 않습니다.
      </p>
      <Countdown />
      <Reserved />
    </div>
  );
}

/** Entry 시작 — 열려 있을 때만. 닫히면 비활성 + 이유 */
export function EntryStart() {
  const phase = usePhase();
  const go = useGo();
  if (phase === 'closed') {
    return (
      <div className="door-actions">
        <button type="button" className="button" disabled aria-describedby="entry-start-closed">
          온라인 Entry 시작 →
        </button>
        <p className="muted" id="entry-start-closed">
          2027 Season Entry가 종료되어 새로운 진단 · 평가를 진행하지 않습니다.
        </p>
      </div>
    );
  }
  return (
    <div className="door-actions">
      <Link className="button" href="/diagnosis" onClick={(e) => go(e, '/diagnosis')}>
        온라인 Entry 시작 →
      </Link>
      <p className="muted">온라인 진단으로 시작합니다. 약 5분.</p>
    </div>
  );
}

/** 한 줄 공고 — 열려 있을 때는 종료 시각, 닫히면 다음 Entry */
export function EntryLine() {
  const phase = usePhase();
  return (
    <p>
      {phase === 'closed' ? '다음 Entry는 2027년 10월에 열립니다.' : '2027 Season Entry는 11월 1일 23:59에 종료됩니다.'}
    </p>
  );
}

/** 진단 · 평가는 Entry 기간에만 — 닫히면 공고와 다음 시즌 안내로 */
export function EntryGate({ children }: { children: React.ReactNode }) {
  const phase = usePhase();
  if (phase === 'closed') {
    return (
      <div className="gate">
        <ClosedNotice />
        <p className="body body-gap">Entry가 종료되어 새로운 진단 · 평가를 진행하지 않습니다.</p>
        <div className="door-actions">
          <Link className="button button-line" href="/entry#notice">
            2028 SEASON 안내 받기 →
          </Link>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
