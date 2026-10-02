'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { NOT_OPEN, type Audience } from '@/lib/entry';
import { COURSES, SESSIONS, formatDay, type CourseId } from '@/lib/schedule';

/*
 * 입학 안내 요청 — 학생/부모 · 이름 또는 호칭 · 학년 · 연락처 · 관심 과정 · 희망 회차 · 동의.
 * POST /api/apply 가 실제로 저장할 때만 '접수되었습니다'. 연결 전에는 NOT_OPEN 문구를 그대로.
 * 만 14세 미만(학생이 초등 ~ 중1 을 고른 경우)은 보호자 동의를 따로 받는다.
 */
const GRADES = [
  ...[1, 2, 3, 4, 5, 6].map((n) => `초${n}`),
  ...[1, 2, 3].map((n) => `중${n}`),
  ...[1, 2, 3].map((n) => `고${n}`),
];
const UNDER_14 = new Set(['초1', '초2', '초3', '초4', '초5', '초6', '중1']);
const INTERESTS = ['초등과정', '중등과정', '고등과정', 'THE TOTAL FORUM'];
const CONTACT = /^([^\s@]+@[^\s@]+\.[^\s@]+|0\d{1,2}-?\d{3,4}-?\d{4})$/;

type State = 'idle' | 'invalid' | 'sending' | 'not_connected' | 'received';

export function ApplyForm({
  audience: initialAudience = 'student',
  session: initialSession = '',
  interest: initialInterest,
}: {
  audience?: Audience;
  session?: string;
  interest?: string;
}) {
  const id = useId();
  const sessionCourse = SESSIONS.find((s) => s.id === initialSession)?.course;
  const [audience, setAudience] = useState<Audience>(initialAudience);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [contact, setContact] = useState('');
  const [interests, setInterests] = useState<string[]>(
    initialInterest === 'forum'
      ? ['THE TOTAL FORUM']
      : initialInterest && initialInterest in COURSES
        ? [COURSES[initialInterest as CourseId].label]
        : sessionCourse
          ? [COURSES[sessionCourse].label]
          : [],
  );
  const [session, setSession] = useState(initialSession);
  const [concern, setConcern] = useState('');
  const [consent, setConsent] = useState(false);
  const [guardian, setGuardian] = useState(false);
  const [state, setState] = useState<State>('idle');

  const needsGuardian = audience === 'student' && UNDER_14.has(grade);
  const errors = {
    name: name.trim().length < 1,
    grade: !grade,
    contact: !CONTACT.test(contact.trim()),
    interests: interests.length === 0,
    consent: !consent,
    guardian: needsGuardian && !guardian,
  };
  const valid = !Object.values(errors).some(Boolean);
  const show = state === 'invalid';
  const upcoming = SESSIONS.filter((s) => s.announced).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <form
      className="apply"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        if (!valid) {
          setState('invalid');
          return;
        }
        setState('sending');
        try {
          const res = await fetch('/api/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ audience, name, grade, contact, interests, session, concern, consent, guardian }),
          });
          const data = await res.json();
          setState(data?.status === 'received' ? 'received' : 'not_connected');
        } catch {
          setState('not_connected');
        }
      }}
    >
      <fieldset className="apply-row">
        <legend>작성하는 사람</legend>
        <div className="apply-toggle">
          {(['student', 'parent'] as Audience[]).map((a) => (
            <label key={a}>
              <input type="radio" name="audience" checked={audience === a} onChange={() => setAudience(a)} />
              <span>{a === 'student' ? '학생' : '부모 · 보호자'}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="apply-grid">
        <div className="apply-field">
          <label htmlFor={`${id}-name`}>{audience === 'student' ? '이름 또는 부르는 이름' : '보호자 호칭'}</label>
          <input
            id={`${id}-name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder={audience === 'student' ? '' : '예: 민서 어머니'}
            aria-invalid={show && errors.name ? true : undefined}
          />
        </div>
        <div className="apply-field">
          <label htmlFor={`${id}-grade`}>{audience === 'student' ? '학년' : '자녀의 학년'}</label>
          <select id={`${id}-grade`} value={grade} onChange={(e) => setGrade(e.target.value)} aria-invalid={show && errors.grade ? true : undefined}>
            <option value="">선택</option>
            {GRADES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
        <div className="apply-field apply-wide">
          <label htmlFor={`${id}-contact`}>연락 가능한 이메일 또는 휴대전화</label>
          <input
            id={`${id}-contact`}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            inputMode="email"
            autoComplete="email"
            placeholder="name@example.com 또는 010-0000-0000"
            aria-invalid={show && errors.contact ? true : undefined}
          />
        </div>
      </div>

      <fieldset className="apply-row">
        <legend>관심 과정</legend>
        <div className="apply-chips">
          {INTERESTS.map((it) => (
            <label key={it}>
              <input
                type="checkbox"
                checked={interests.includes(it)}
                onChange={() => setInterests(interests.includes(it) ? interests.filter((x) => x !== it) : [...interests, it])}
              />
              <span>{it}</span>
            </label>
          ))}
        </div>
        {show && errors.interests && <p className="apply-error">관심 과정을 하나 이상 골라 주세요.</p>}
      </fieldset>

      <div className="apply-grid">
        {upcoming.length > 0 && (
        <div className="apply-field apply-wide">
          <label htmlFor={`${id}-session`}>희망 입학시험 회차 (선택)</label>
          <select id={`${id}-session`} value={session} onChange={(e) => setSession(e.target.value)}>
            <option value="">아직 정하지 않음</option>
            {upcoming.map((s) => (
              <option key={s.id} value={s.id}>
                {COURSES[s.course].label} {s.round} — {formatDay(s.date)}
              </option>
            ))}
          </select>
        </div>
        )}
        <div className="apply-field apply-wide">
          <label htmlFor={`${id}-concern`}>{audience === 'student' ? '지금 가장 궁금한 것 (선택)' : '자녀에 대한 고민 (선택)'}</label>
          <textarea id={`${id}-concern`} rows={4} maxLength={600} value={concern} onChange={(e) => setConcern(e.target.value)} />
        </div>
      </div>

      <div className="apply-consent">
        <p>
          <strong>개인정보 수집 · 이용 안내</strong>
          <br />
          이용 목적: 입학 안내와 개별 상담 연락 · 수집 항목: 작성자 구분, 이름 또는 호칭, 학년, 연락처, 관심 과정, 희망 회차, 남긴 내용 · 보관:
          온라인 접수가 열리면 보관 기간을 이곳에 먼저 고지합니다.
        </p>
        <label className="check">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>개인정보 수집 · 이용에 동의합니다.</span>
        </label>
        {needsGuardian && (
          <>
            <p className="apply-guardian">만 14세 미만 학생은 보호자의 동의가 필요합니다. 보호자와 함께 작성해 주세요.</p>
            <label className="check">
              <input type="checkbox" checked={guardian} onChange={(e) => setGuardian(e.target.checked)} />
              <span>보호자가 내용을 확인하고 동의했습니다.</span>
            </label>
          </>
        )}
        {show && (errors.consent || errors.guardian) && <p className="apply-error">동의 항목을 확인해 주세요.</p>}
      </div>

      <div className="apply-submit">
        <button type="submit" className="enter-button" disabled={state === 'sending'}>
          입학 안내 요청하기 <span aria-hidden="true">→</span>
        </button>
        <div className="apply-status" role="status">
          {state === 'invalid' && <p>표시된 항목을 확인해 주세요.</p>}
          {state === 'sending' && <p>확인하고 있습니다.</p>}
          {state === 'not_connected' && (
            <p className="apply-closed">
              {NOT_OPEN}{' '}
              <Link href="/admissions">입학 안내로 →</Link>
            </p>
          )}
          {state === 'received' && <p>요청이 접수되었습니다. 남겨 주신 연락처로 안내드리겠습니다.</p>}
        </div>
      </div>
    </form>
  );
}
