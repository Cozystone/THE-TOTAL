'use client';

import { useId, useState } from 'react';
import { usePhase } from '@/components/EntryClock';
import { NEXT_SEASON, SEASON } from '@/lib/entry';

/*
 * ENTRY NOTICE — 사이트에서 이메일을 받는 유일한 곳. 기관 공지 서식처럼 조용하게.
 *   이메일 하나 · 동의 하나 · OPENING NOTICE REQUEST →
 *   상태: 기록됨 / 이미 기록된 주소 / 주소 확인 / 동의 확인 / 지금 받을 수 없음(저장소 미연결) / 실패.
 * Entry 가 닫히면 다음 시즌(2028) 시작 안내만 받는다.
 */
type State = 'idle' | 'sending' | 'ok' | 'duplicate' | 'invalid' | 'consent' | 'not_connected' | 'error';

const MESSAGES: Record<Exclude<State, 'idle' | 'sending' | 'ok'>, string> = {
  duplicate: '이미 기록된 주소입니다. 안내는 한 차례만 보냅니다.',
  invalid: '이메일 주소를 확인해 주세요.',
  consent: '수집 및 이용 동의를 확인해 주세요.',
  not_connected: '지금은 안내 신청을 기록할 수 없습니다. 기록이 연결되면 이곳에서 다시 받습니다.',
  error: '기록하지 못했습니다. 잠시 뒤 다시 시도해 주세요.',
};

export function EntryNotice() {
  const id = useId();
  const phase = usePhase();
  const closed = phase === 'closed';
  const season = closed ? NEXT_SEASON : SEASON;
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
      setState(data.status && data.status in MESSAGES ? data.status : data.status === 'ok' ? 'ok' : 'error');
    } catch {
      setState('error');
    }
  };

  if (state === 'ok') {
    return (
      <div className="notice-form notice-done" role="status">
        <p className="notice-done-title">기록되었습니다.</p>
        <p className="body">
          {season} Season Entry {closed ? '시작' : '진행'}에 관한 안내를 이 주소로 한 차례 보냅니다.
          <br />
          이메일은 {season} Season 안내에만 쓰이며, {season} Season 종료 후 삭제됩니다.
        </p>
      </div>
    );
  }

  const invalid = state === 'invalid';
  return (
    <form className="notice-form" onSubmit={submit} noValidate aria-describedby={`${id}-privacy`}>
      <div className="notice-row">
        <label className="notice-label" htmlFor={`${id}-email`}>
          이메일 주소
        </label>
        <input
          id={`${id}-email`}
          className="notice-input"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={invalid || undefined}
          required
        />
      </div>
      {/* 사람에게 보이지 않는 칸 — 자동 입력 걸러내기 */}
      <div className="notice-trap" aria-hidden="true">
        <label htmlFor={`${id}-company`}>회사</label>
        <input id={`${id}-company`} tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <label className="check notice-check">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={state === 'consent' || undefined} />
        <span>
          {closed ? `${NEXT_SEASON} Season ` : ''}Entry 개시 안내를 위한 이메일 수집 및 이용에 동의합니다.
        </span>
      </label>
      <dl className="notice-privacy" id={`${id}-privacy`}>
        <div>
          <dt>수집 항목</dt>
          <dd>이메일 주소</dd>
        </div>
        <div>
          <dt>이용 목적</dt>
          <dd>{season} Season Entry에 관한 한 차례의 안내</dd>
        </div>
        <div>
          <dt>보관 기간</dt>
          <dd>{season} Season 종료 후 삭제</dd>
        </div>
        <div>
          <dt>동의 거부</dt>
          <dd>동의하지 않을 수 있으며, 이 경우 안내 메일을 받을 수 없습니다.</dd>
        </div>
      </dl>
      <div className="notice-submit">
        <button type="submit" className="button notice-button" disabled={state === 'sending'}>
          {state === 'sending' ? '기록하고 있습니다' : 'OPENING NOTICE REQUEST →'}
        </button>
        <p className="notice-status" role="status" aria-live="polite">
          {state in MESSAGES ? MESSAGES[state as keyof typeof MESSAGES] : ''}
        </p>
      </div>
      <p className="notice-foot">
        이메일은 {season} Season Entry 안내에만 사용되며,
        <br />
        {season} Season 종료 후 삭제됩니다.
      </p>
    </form>
  );
}

/** ENTRY NOTICE 설명 — 닫히면 다음 시즌 안내로 */
export function NoticeLead() {
  const phase = usePhase();
  if (phase === 'closed') {
    return (
      <p className="body">
        {NEXT_SEASON} Season Entry가 열릴 때,
        <br />
        시작에 관한 한 차례의 안내를 받습니다.
      </p>
    );
  }
  return (
    <p className="body">
      {SEASON} Season Entry가 종료되기 전,
      <br />
      진행에 관한 한 차례의 안내를 받습니다.
    </p>
  );
}
