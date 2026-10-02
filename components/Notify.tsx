'use client';

import { useId, useState } from 'react';
import { submitNotify } from '@/lib/diagnosis/client';

/*
 * 안내 신청(응시 안내 · 일정 문의 · 공지 알림) — 형태만 갖춘 칸.
 * POST /api/notify 가 실제 저장을 하기 전에는 "등록 완료" 를 띄우지 않고, 저장되지 않았다고 말한다.
 * 미성년자 정보가 들어올 수 있으므로 이용 목적 · 동의를 입력 전에 둔다.
 */
export function Notify({ topics, submitLabel = '안내 받기' }: { topics: string[]; submitLabel?: string }) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(topics[0]);
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'not_connected' | 'registered' | 'invalid'>('idle');

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && consent;

  return (
    <form
      className="notify"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        if (!valid) {
          setState('invalid');
          return;
        }
        setState('sending');
        const res = await submitNotify({ email, topic, consent });
        setState(res.status);
      }}
    >
      <div className="field">
        <label htmlFor={`${id}-topic`}>안내 항목</label>
        <select id={`${id}-topic`} value={topic} onChange={(e) => setTopic(e.target.value)}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor={`${id}-email`}>보호자 또는 학생 이메일</label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={state === 'invalid' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? true : undefined}
        />
      </div>

      <div className="consent">
        <p className="consent-text">
          이용 목적: 선택한 항목의 일정 안내 발송. 수집 항목: 이메일. 만 14세 미만 학생은 보호자가 입력해 주세요.
        </p>
        <label className="check">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>개인정보 수집 · 이용에 동의합니다.</span>
        </label>
      </div>

      <div className="notify-actions">
        <button type="submit" className="button" disabled={state === 'sending'}>
          {submitLabel}
        </button>
        <p className="notify-status" role="status">
          {state === 'invalid' && '이메일 주소와 동의 여부를 확인해 주세요.'}
          {state === 'sending' && '확인하고 있습니다.'}
          {state === 'not_connected' &&
            '온라인 신청 기능을 준비하고 있습니다. 입력하신 정보는 저장되지 않았습니다.'}
          {state === 'registered' && '신청이 접수되었습니다. 안내를 보내드리겠습니다.'}
        </p>
      </div>
    </form>
  );
}
