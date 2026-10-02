'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { GRADES } from '@/lib/diagnosis/schema';
import { COURSES } from '@/lib/schedule';
import type { Answers, JourneyStep } from '@/lib/journeys/types';

/*
 * 한 화면에 한 질문 — 학생 INDEX · 부모 NOTE 가 같이 쓰는 틀.
 *   안내 → 질문들 → 확인 → 결과(renderResult)
 * 응답은 이 화면의 메모리에만 있다. 서버로 보내지 않는다.
 */
type Phase = 'intro' | 'review' | 'done' | number;

export function Journey({
  steps,
  intro,
  startLabel,
  renderResult,
}: {
  steps: JourneyStep[];
  intro: ReactNode;
  startLabel: string;
  renderResult: (a: Answers) => ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [answers, setAnswers] = useState<Answers>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
    window.scrollTo({ top: 0 });
  }, [phase]);

  const total = steps.length + 1;
  const index = typeof phase === 'number' ? phase : phase === 'review' ? steps.length : -1;
  const step = typeof phase === 'number' ? steps[phase] : null;

  const value = step ? answers[step.id] : undefined;
  const canNext = !step || step.optional || (Array.isArray(value) ? value.length > 0 : !!value);

  const set = (id: string, v: Answers[string]) => setAnswers((a) => ({ ...a, [id]: v }));
  const next = () => setPhase(typeof phase === 'number' ? (phase + 1 < steps.length ? phase + 1 : 'review') : 0);
  const prev = () => setPhase(phase === 'review' ? steps.length - 1 : typeof phase === 'number' && phase > 0 ? phase - 1 : 'intro');

  const label = (s: JourneyStep) => {
    const v = answers[s.id];
    if (s.kind === 'grade') return GRADES.flatMap((g) => g.items).find((g) => g.id === v)?.label;
    const text = Array.isArray(v) ? v.join(' · ') : v;
    const note = answers[`${s.id}:note`];
    return [text, note && `‘${note}’`].filter(Boolean).join(' — ');
  };

  return (
    <section className="dx jr" aria-labelledby="jr-title">
      {index >= 0 && phase !== 'done' && (
        <div className="dx-progress">
          <p>
            <span className="dx-count">
              {index + 1} / {total}
            </span>
          </p>
          <div className="dx-bar" role="progressbar" aria-label="진행 상태" aria-valuemin={1} aria-valuemax={total} aria-valuenow={index + 1}>
            <i style={{ transform: `scaleX(${(index + 1) / total})` }} />
          </div>
        </div>
      )}

      <div className="dx-step" key={String(phase)}>
        {phase === 'intro' && (
          <>
            <h2 className="sr" id="jr-title" ref={headingRef} tabIndex={-1}>
              안내
            </h2>
            {intro}
            <div className="dx-actions">
              <button type="button" className="cta cta-solid" onClick={next}>
                {startLabel} <span aria-hidden="true">→</span>
              </button>
            </div>
          </>
        )}

        {step && (
          <>
            <h2 className="dx-title" id="jr-title" ref={headingRef} tabIndex={-1}>
              {step.title}
            </h2>
            {step.hint && <p className="dx-hint">{step.hint}</p>}
            <fieldset className="dx-field">
              <legend className="sr">{step.title}</legend>
              {step.kind === 'grade' &&
                GRADES.map((g) => (
                  <div key={g.course} className="grade-group">
                    <p className="grade-label">{COURSES[g.course].label}</p>
                    <div className="chips">
                      {g.items.map((it) => (
                        <label key={it.id} className="chip">
                          <input type="radio" name={step.id} checked={value === it.id} onChange={() => set(step.id, it.id)} />
                          <span>{it.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              {step.kind === 'single' && (
                <div className="options">
                  {step.options!.map((o) => (
                    <label key={o} className="option">
                      <input type="radio" name={step.id} checked={value === o} onChange={() => set(step.id, o)} />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
              )}
              {step.kind === 'multi' && (
                <>
                  <div className="options">
                    {step.options!.map((o) => {
                      const list = Array.isArray(value) ? value : [];
                      const on = list.includes(o);
                      const full = !on && !!step.max && list.length >= step.max;
                      return (
                        <label key={o} className="option" data-disabled={full || undefined}>
                          <input
                            type="checkbox"
                            checked={on}
                            disabled={full}
                            onChange={() => set(step.id, on ? list.filter((x) => x !== o) : [...list, o])}
                          />
                          <span>{o}</span>
                        </label>
                      );
                    })}
                  </div>
                  {step.max && (
                    <p className="dx-count-note" aria-live="polite">
                      {Array.isArray(value) ? value.length : 0} / {step.max} 선택
                    </p>
                  )}
                </>
              )}
              {step.note && (
                <div className="apply-field jr-note">
                  <label htmlFor={`note-${step.id}`}>{step.note.label}</label>
                  <input
                    id={`note-${step.id}`}
                    maxLength={step.note.max}
                    value={(answers[`${step.id}:note`] as string) ?? ''}
                    onChange={(e) => set(`${step.id}:note`, e.target.value)}
                  />
                </div>
              )}
            </fieldset>
          </>
        )}

        {phase === 'review' && (
          <>
            <h2 className="dx-title" id="jr-title" ref={headingRef} tabIndex={-1}>
              응답을 확인해 주세요.
            </h2>
            <dl className="summary">
              {steps.map((s, i) => (
                <div key={s.id}>
                  <dt>{s.title}</dt>
                  <dd>{label(s) || '—'}</dd>
                  <button type="button" className="text-button" onClick={() => setPhase(i)} aria-label={`${s.title} 수정`}>
                    수정
                  </button>
                </div>
              ))}
            </dl>
          </>
        )}

        {phase === 'done' && (
          <>
            <h2 className="sr" id="jr-title" ref={headingRef} tabIndex={-1}>
              결과
            </h2>
            {renderResult(answers)}
          </>
        )}
      </div>

      {index >= 0 && phase !== 'done' && (
        <div className="dx-actions dx-nav">
          <button type="button" className="text-button" onClick={prev}>
            ← 이전
          </button>
          {phase === 'review' ? (
            <button type="button" className="cta cta-solid" onClick={() => setPhase('done')}>
              정리해 보기 <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button type="button" className="cta cta-solid" onClick={next} disabled={!canNext}>
              {step?.optional && !(Array.isArray(value) ? value.length : value) ? '건너뛰기' : '다음'}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
