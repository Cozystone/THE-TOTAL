'use client';

import Link from 'next/link';
import { ClosedNotice, Countdown, Reserved, usePhase } from '@/components/EntryClock';
import { useGo } from '@/components/NavLink';
import { RESERVE_CTA, RESERVE_CTA_PAGE, SCHEDULE } from '@/lib/entry';

/*
 * 홈 첫 화면 — 2027 입학평가 안내. 첫 3초 안에: 2027 입학평가 / 예약 마감 / 예약 CTA.
 *   2027 THE TOTAL 입학평가 → 2027 Season Entry 평가 예약 → 예약 마감까지 [DAYS · HOURS · MINUTES · SECONDS]
 *   → 평가 예약 기간 · 평가 진행 · 평가 종료 → 입학평가 예약하기 → 연 1회
 * 평가일(11.01)에는 '평가 종료까지', 그 뒤에는 CLOSED 공고.
 */
export function HomeHero() {
  const phase = usePhase();
  const go = useGo();

  if (phase === 'closed') {
    return (
      <div className="hero-entry hero-closed">
        <ClosedNotice headingLevel={1} />
        <div className="hero-actions">
          <Link className="button button-line" href="/entry#reserve" onClick={(e) => go(e, '/entry#reserve')}>
            2028 Season 안내 받기 →
          </Link>
        </div>
      </div>
    );
  }

  const evaluation = phase === 'evaluation';
  return (
    <div className="hero-entry">
      <p className="hero-kicker">2027 THE TOTAL 입학평가</p>
      <h1 className="hero-entry-title">
        2027 Season Entry
        <br />
        {evaluation ? '평가 진행' : '평가 예약'}
      </h1>
      <Countdown aside={<Reserved />} />
      <dl className="schedule-strip">
        {SCHEDULE.map((s) => (
          <div key={s.k}>
            <dt>{s.k}</dt>
            <dd>{s.v}</dd>
          </div>
        ))}
      </dl>
      <div className="hero-actions">
        {evaluation ? (
          <p className="hero-note">예약이 마감되었습니다. 평가 개시 안내는 예약한 이메일로 전달됩니다.</p>
        ) : (
          <>
            <Link className="button hero-cta" href="/entry#reserve" onClick={(e) => go(e, '/entry#reserve')}>
              {RESERVE_CTA}
            </Link>
            <p className="hero-note">
              2027 Season Entry는
              <br />
              연 1회 진행됩니다.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/** ENTRY 상단 — 같은 시계, 반복 없이 짧게 */
export function EntryTop() {
  const phase = usePhase();
  if (phase === 'closed') return <ClosedNotice headingLevel={1} />;
  return (
    <>
      <h1 className="entry-title">2027 THE TOTAL 입학평가</h1>
      <Countdown aside={<Reserved />} />
    </>
  );
}

/** 다른 페이지 끝의 하나뿐인 CTA — 예약 기간에만 예약으로 */
export function ReserveLink() {
  const phase = usePhase();
  const go = useGo();
  if (phase === 'evaluation' || phase === 'closed') {
    return (
      <Link className="button button-line" href="/entry" onClick={(e) => go(e, '/entry')}>
        2027 ENTRY 안내 →
      </Link>
    );
  }
  return (
    <Link className="button button-line" href="/entry#reserve" onClick={(e) => go(e, '/entry#reserve')}>
      {RESERVE_CTA_PAGE}
    </Link>
  );
}

/*
 * 진단 · 평가는 평가일(11.01)에만 열린다 — 예약자에게 전달되는 안내로 들어온다.
 * 예약 기간에는 예약으로, 종료 뒤에는 공고로.
 */
export function EntryGate({ children }: { children: React.ReactNode }) {
  const phase = usePhase();
  if (phase === 'evaluation') return <>{children}</>;
  if (phase === 'closed') {
    return (
      <div className="gate">
        <ClosedNotice />
        <div className="hero-actions">
          <Link className="button button-line" href="/entry#reserve">
            2028 Season 안내 받기 →
          </Link>
        </div>
      </div>
    );
  }
  if (phase === null) return null;
  return (
    <div className="gate">
      <p className="hero-kicker">2027 THE TOTAL 입학평가</p>
      <h2 className="gate-title">평가는 2026년 11월 1일, 온라인으로 진행됩니다.</h2>
      <p className="body">예약한 이메일로 평가 개시 안내를 전달합니다. 예약은 10월 31일 23:59에 마감됩니다.</p>
      <div className="hero-actions">
        <Link className="button" href="/entry#reserve">
          {RESERVE_CTA}
        </Link>
      </div>
    </div>
  );
}
