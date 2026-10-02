'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { submitDiagnosis } from '@/lib/diagnosis/client';
import {
  FORUM_FIELDS,
  FORUM_MODES,
  GRADES,
  MAX_FIELDS,
  TEXT_MAX,
  TEXT_MIN,
  type DiagnosisResponse,
  type ForumInput,
  type Grade,
} from '@/lib/diagnosis/schema';
import { COURSES } from '@/lib/schedule';

/*
 * FORUM 지원 진단 — 시험이 아니라 자기 서술.
 *   안내 · 동의 → 학년 → 짧은 자기 서술 → 관심 분야 → 오래 생각한 질문 → 만들거나 말하고 싶은 것 → 끌리는 방식 → 확인 → 완료
 * 분석 · 저장이 연결되기 전에는 개인화 결과를 만들지 않고 "지원 진단이 완료되었습니다. 확인 후 다음 안내를 드립니다." 만.
 */
type Step = 'intro' | 'grade' | 'self' | 'fields' | 'question' | 'want' | 'mode' | 'review' | 'done';
const FLOW: Step[] = ['grade', 'self', 'fields', 'question', 'want', 'mode', 'review'];
const TITLES: Record<Step, string> = {
  intro: 'FORUM 지원 진단',
  grade: '학년을 선택해 주세요.',
  self: '자신을 몇 문장으로 소개해 주세요.',
  fields: '요즘 가장 관심이 가는 분야는 무엇인가요?',
  question: '최근 오래 붙잡고 있던 질문이 있나요?',
  want: '만들어 보거나, 사람들 앞에서 말해 보고 싶은 것이 있나요?',
  mode: '어떤 방식에 더 끌리나요?',
  review: '응답을 확인해 주세요.',
  done: '지원 진단이 완료되었습니다.',
};
const HINTS: Partial<Record<Step, string>> = {
  self: '잘 쓰려고 하지 않아도 됩니다. 지금의 나를 설명하는 문장이면 충분합니다.',
  fields: `최대 ${MAX_FIELDS}개까지 고를 수 있습니다.`,
  question: '정답이 없는 질문이어도 좋습니다. 아직 정리되지 않은 그대로 적어 주세요.',
  want: '글, 영상, 발표, 브랜드, 리서치, 서비스 — 형식은 무엇이든 괜찮습니다.',
};
const TEXT_STEPS = ['self', 'question', 'want'] as const;
type TextKey = 'selfIntro' | 'question' | 'want';
const TEXT_KEY: Record<(typeof TEXT_STEPS)[number], TextKey> = { self: 'selfIntro', question: 'question', want: 'want' };

type Draft = Partial<ForumInput> & { fields: string[]; selfIntro: string; question: string; want: string };

export function ForumDiagnosis({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState<Step>('intro');
  const [consent, setConsent] = useState(false);
  const [draft, setDraft] = useState<Draft>({ fields: [], selfIntro: '', question: '', want: '' });
  const [response, setResponse] = useState<DiagnosisResponse | null>(null);
  const [sending, setSending] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const index = FLOW.indexOf(step);
  const longEnough = (v: string) => v.trim().length >= TEXT_MIN;

  const canNext = (() => {
    switch (step) {
      case 'grade':
        return !!draft.grade;
      case 'self':
        return longEnough(draft.selfIntro);
      case 'fields':
        return draft.fields.length > 0;
      case 'question':
        return longEnough(draft.question);
      case 'want':
        return longEnough(draft.want);
      case 'mode':
        return !!draft.mode;
      default:
        return true;
    }
  })();

  const go = (s: Step) => setStep(s);
  const next = () => go(FLOW[index + 1]);
  const prev = () => go(index <= 0 ? 'intro' : FLOW[index - 1]);

  const submit = async () => {
    setSending(true);
    const res = await submitDiagnosis({ track: 'forum', ...(draft as ForumInput) });
    setResponse(res);
    setSending(false);
    go('done');
  };

  const textStep = (TEXT_STEPS as readonly Step[]).includes(step) ? TEXT_KEY[step as (typeof TEXT_STEPS)[number]] : null;

  return (
    <section className="dx" aria-labelledby="dx-title">
      {index >= 0 && (
        <div className="dx-progress">
          <p>
            <span className="dx-count">
              {index + 1} / {FLOW.length}
            </span>
            <span className="muted"> · FORUM 지원 진단</span>
          </p>
          <div
            className="dx-bar"
            role="progressbar"
            aria-label="진행 상태"
            aria-valuemin={1}
            aria-valuemax={FLOW.length}
            aria-valuenow={index + 1}
          >
            <i style={{ transform: `scaleX(${(index + 1) / FLOW.length})` }} />
          </div>
        </div>
      )}

      <div className="dx-step" key={step}>
        <h2 className="dx-title" id="dx-title" ref={headingRef} tabIndex={-1}>
          {TITLES[step]}
        </h2>
        {HINTS[step] && <p className="dx-hint">{HINTS[step]}</p>}

        {step === 'intro' && (
          <div className="dx-intro">
            <p className="dx-lead">
              시험이 아닙니다. 관심사와 생각의 방식, 표현하고 싶은 것, 앞으로 만들고 싶은 작업을 묻습니다. 정답은 없으며, 약
              10분이 걸립니다.
            </p>
            <ol className="dx-outline">
              <li>학년 선택</li>
              <li>짧은 자기 서술</li>
              <li>관심 분야 · 오래 생각한 질문</li>
              <li>만들거나 말해 보고 싶은 것</li>
              <li>글 · 말 · 프로젝트 중 끌리는 방식</li>
            </ol>
            <div className="privacy">
              <h3>개인정보 이용 안내</h3>
              <dl>
                <div>
                  <dt>이용 목적</dt>
                  <dd>THE TOTAL FORUM 지원 검토와 다음 안내</dd>
                </div>
                <div>
                  <dt>입력 항목</dt>
                  <dd>학년, 자기 서술, 관심 분야, 질문, 만들고 싶은 것, 선호 방식. 서술에는 이름 · 연락처 · 학교명을 쓰지 마세요.</dd>
                </div>
                <div>
                  <dt>보관</dt>
                  <dd>현재 응답은 이 화면에서만 처리되며 서버에 저장 · 전송되지 않습니다. 저장 기능이 열리면 보관 기간을 이곳에 먼저 고지합니다.</dd>
                </div>
                <div>
                  <dt>만 14세 미만</dt>
                  <dd>보호자와 함께 진행하거나 보호자의 동의를 받은 뒤 진행해 주세요.</dd>
                </div>
              </dl>
              <label className="check">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>위 내용을 확인했으며, 지원 진단 응답의 이용에 동의합니다.</span>
              </label>
            </div>
            <div className="dx-actions">
              <button type="button" className="button" disabled={!consent} onClick={() => go('grade')}>
                지원 진단 시작하기
              </button>
              {onExit && (
                <button type="button" className="text-button" onClick={onExit}>
                  ← 진단 선택으로
                </button>
              )}
            </div>
          </div>
        )}

        {step === 'grade' && (
          <fieldset className="dx-field">
            <legend className="sr">학년</legend>
            {GRADES.map((g) => (
              <div key={g.course} className="grade-group">
                <p className="grade-label">{COURSES[g.course].short}</p>
                <div className="chips">
                  {g.items.map((it) => (
                    <label key={it.id} className="chip">
                      <input
                        type="radio"
                        name="grade"
                        checked={draft.grade === it.id}
                        onChange={() => setDraft({ ...draft, grade: it.id as Grade })}
                      />
                      <span>{it.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </fieldset>
        )}

        {textStep && (
          <div className="dx-field field">
            <label htmlFor="forum-text" className="sr">
              {TITLES[step]}
            </label>
            <textarea
              id="forum-text"
              rows={6}
              maxLength={TEXT_MAX}
              value={draft[textStep]}
              onChange={(e) => setDraft({ ...draft, [textStep]: e.target.value })}
              aria-describedby="forum-text-count"
            />
            <p className="dx-count-note" id="forum-text-count" aria-live="polite">
              {draft[textStep].length} / {TEXT_MAX}자
              {draft[textStep].trim().length > 0 && !longEnough(draft[textStep]) && ` · ${TEXT_MIN}자 이상 적어 주세요`}
            </p>
          </div>
        )}

        {step === 'fields' && (
          <fieldset className="dx-field">
            <legend className="sr">관심 분야</legend>
            <div className="chips">
              {FORUM_FIELDS.map((f) => {
                const on = draft.fields.includes(f);
                const full = !on && draft.fields.length >= MAX_FIELDS;
                return (
                  <label key={f} className="chip" data-disabled={full || undefined}>
                    <input
                      type="checkbox"
                      checked={on}
                      disabled={full}
                      onChange={() =>
                        setDraft({ ...draft, fields: on ? draft.fields.filter((x) => x !== f) : [...draft.fields, f] })
                      }
                    />
                    <span>{f}</span>
                  </label>
                );
              })}
            </div>
            <p className="dx-count-note" aria-live="polite">
              {draft.fields.length} / {MAX_FIELDS} 선택
            </p>
          </fieldset>
        )}

        {step === 'mode' && (
          <fieldset className="dx-field">
            <legend className="sr">끌리는 방식</legend>
            <div className="options">
              {FORUM_MODES.map((m) => (
                <label key={m.id} className="option">
                  <input type="radio" name="mode" checked={draft.mode === m.id} onChange={() => setDraft({ ...draft, mode: m.id })} />
                  <span>
                    <strong>{m.label}</strong>
                    <em>{m.text}</em>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 'review' && <ForumSummary draft={draft} onEdit={go} />}

        {step === 'done' && (
          <div className="dx-done">
            {response?.status === 'analyzed' ? (
              <p className="dx-lead">{response.result.summary}</p>
            ) : (
              <>
                <p className="dx-lead">확인 후 다음 안내를 드립니다.</p>
                <p className="dx-notice">
                  온라인 접수 기능이 연결되기 전까지 응답은 저장 · 전송되지 않으며, 이 화면에서만 확인할 수 있습니다. 안내를
                  받으려면 입학 안내의 응시 안내 신청에서 ‘FORUM 지원 안내’를 선택해 주세요.
                </p>
              </>
            )}
            <ForumSummary draft={draft} />
            <div className="dx-actions">
              <Link className="button" href="/admissions#guide">
                FORUM 지원 안내 받기
              </Link>
              <Link className="text-link" href="/forum">
                THE TOTAL FORUM 보기 →
              </Link>
            </div>
          </div>
        )}
      </div>

      {index >= 0 && (
        <div className="dx-actions dx-nav">
          <button type="button" className="text-button" onClick={prev}>
            ← 이전
          </button>
          {step === 'review' ? (
            <button type="button" className="button" onClick={submit} disabled={sending}>
              {sending ? '확인하고 있습니다' : '지원 진단 완료하기'}
            </button>
          ) : (
            <button type="button" className="button" onClick={next} disabled={!canNext}>
              다음
            </button>
          )}
        </div>
      )}
    </section>
  );
}

function ForumSummary({ draft, onEdit }: { draft: Draft; onEdit?: (s: Step) => void }) {
  const grade = GRADES.flatMap((g) => g.items).find((g) => g.id === draft.grade)?.label;
  const mode = FORUM_MODES.find((m) => m.id === draft.mode)?.label;
  const rows: [Step, string, string | undefined][] = [
    ['grade', '학년', grade],
    ['self', '자기 서술', draft.selfIntro],
    ['fields', '관심 분야', draft.fields.join(' · ')],
    ['question', '오래 생각한 질문', draft.question],
    ['want', '만들거나 말하고 싶은 것', draft.want],
    ['mode', '끌리는 방식', mode],
  ];
  return (
    <dl className="summary">
      {rows.map(([s, k, v]) => (
        <div key={s}>
          <dt>{k}</dt>
          <dd className="summary-text">{v || '—'}</dd>
          {onEdit && (
            <button type="button" className="text-button" onClick={() => onEdit(s)} aria-label={`${k} 수정`}>
              수정
            </button>
          )}
        </div>
      ))}
    </dl>
  );
}
