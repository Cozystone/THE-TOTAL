'use client';

import { useId, useState } from 'react';
import { usePhase } from '@/components/EntryClock';
import { NEXT_SEASON, RESERVE_CTA } from '@/lib/entry';

/*
 * ENTRY RESERVATION — 사이트에서 이메일을 받는 유일한 곳. 기관 공지 서식처럼 조용하게.
 *   예약 기간: 이메일 하나 · 동의 하나 · 입학평가 예약하기 → · 성공하면 ENTRY RESERVED.
 *   예약이 닫힌 뒤(평가일 · 종료 뒤): 2028 Season 시작 안내만 받는다.
 * 상태: 예약됨 / 이미 예약된 주소 / 주소 확인 / 동의 확인 / 지금 받을 수 없음(저장소 미연결) / 실패.
 */
type State = 'idle' | 'sending' | 'ok' | 'duplicate' | 'invalid' | 'consent' | 'not_connected' | 'error';

const MESSAGES: Record<Exclude<State, 'idle' | 'sending' | 'ok'>, string> = {
  duplicate: '이미 예약된 이메일 주소입니다. 평가 개시 안내는 이 주소로 전달됩니다.',
  invalid: '이메일 주소를 확인해 주세요.',
  consent: '개인정보 수집 및 이용 동의를 확인해 주세요.',
  not_connected: '지금은 예약을 기록할 수 없습니다. 잠시 뒤 다시 시도해 주세요.',
  error: '예약을 기록하지 못했습니다. 잠시 뒤 다시 시도해 주세요.',
};

export function EntryNotice() {
  const id = useId();
  const phase = usePhase();
  const reserving = phase !== 'evaluation' && phase !== 'closed';
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState('');
  const [state, setState] = useState<State>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return setState('invalid');
    if (!consent) return setState('consent');
    setState('sending');
    try {
      const res = await fetch('/api/entry-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, consent, company }),
      });
      const data = (await res.json()) as { status?: State };
      if (data.status === 'ok') window.dispatchEvent(new Event('entry-notice:added'));
      setState(data.status === 'ok' ? 'ok' : data.status && data.status in MESSAGES ? data.status : 'error');
    } catch {
      setState('error');
    }
  };

  if (state === 'ok') {
    return reserving ? (
      <div className="reserve-done" role="status">
        <p className="label">ENTRY RESERVED</p>
        <p className="reserve-done-title">2027 Season Entry 예약이 완료되었습니다.</p>
        <p className="body">평가 개시 관련 안내는 입력한 이메일로 전달됩니다.</p>
      </div>
    ) : (
      <div className="reserve-done" role="status">
        <p className="label">{NEXT_SEASON} SEASON</p>
        <p className="reserve-done-title">{NEXT_SEASON} Season 시작 안내가 기록되었습니다.</p>
        <p className="body">다음 Entry가 열릴 때 입력한 이메일로 한 차례 안내합니다.</p>
      </div>
    );
  }

  const invalid = state === 'invalid';
  const purpose = reserving ? '2027 Season Entry 예약 확인 및 평가 개시 안내' : `${NEXT_SEASON} Season Entry 시작 안내`;
  const keep = reserving ? '2026년 11월 30일까지' : `${NEXT_SEASON} Season Entry 종료까지`;
  return (
    <form className="reserve-form" onSubmit={submit} noValidate>
      <label className="reserve-label" htmlFor={`${id}-email`}>
        이메일 주소
      </label>
      <div className="reserve-row">
        <input
          id={`${id}-email`}
          className="reserve-input"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={invalid || undefined}
          aria-describedby={`${id}-status`}
          required
        />
        <button type="submit" className="button reserve-button" disabled={state === 'sending'}>
          {state === 'sending' ? '기록하고 있습니다' : reserving ? RESERVE_CTA : `${NEXT_SEASON} Season 안내 받기 →`}
        </button>
      </div>
      {/* 사람에게 보이지 않는 칸 — 자동 입력 걸러내기 */}
      <div className="reserve-trap" aria-hidden="true">
        <label htmlFor={`${id}-company`}>회사</label>
        <input id={`${id}-company`} tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <dl className="reserve-privacy">
        <div>
          <dt>수집 항목</dt>
          <dd>이메일 주소</dd>
        </div>
        <div>
          <dt>이용 목적</dt>
          <dd>{purpose}</dd>
        </div>
        <div>
          <dt>보관 기간</dt>
          <dd>{keep}</dd>
        </div>
        <div>
          <dt>동의 거부</dt>
          <dd>동의를 거부할 수 있으며, 이 경우 {reserving ? '평가 개시 안내' : '시작 안내'}를 받을 수 없습니다.</dd>
        </div>
      </dl>
      <label className="check reserve-check">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={state === 'consent' || undefined} />
        <span>위 내용을 확인했으며, 개인정보 수집 및 이용에 동의합니다.</span>
      </label>
      <p className="reserve-status" id={`${id}-status`} role="status" aria-live="polite">
        {state in MESSAGES ? MESSAGES[state as keyof typeof MESSAGES] : ''}
      </p>
    </form>
  );
}

/** 섹션 설명 — 예약이 닫히면 다음 시즌 안내로 */
export function NoticeLead() {
  const phase = usePhase();
  if (phase === 'evaluation' || phase === 'closed') {
    return <p className="body">2027 Season Entry 예약이 마감되었습니다. {NEXT_SEASON} Season Entry의 시작 안내를 받습니다.</p>;
  }
  return <p className="body">2027 Season Entry의 평가 개시 안내를 받습니다.</p>;
}
