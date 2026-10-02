'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { GRADES } from '@/lib/diagnosis/schema';
import { COURSES } from '@/lib/schedule';
import { answered, loadAnswers, saveAnswers, type Answers, type JourneyStep } from '@/lib/journeys/types';

/*
 * 한 화면에 한 질문 — 학생 MY INDEX · 부모 PARENT NOTE 가 같이 쓰는 틀.
 *   안내 → 질문들(상단 '1 / 8' + 얇은 진행 바) → 마지막 질문에서 결과 페이지로.
 * 응답은 이 브라우저의 sessionStorage 에만 둔다(탭을 닫으면 사라짐). 서버로 보내지 않는다.
 * 다음 질문은 가볍게 들어오고(entry.css), 진행 바는 늘어나며 움직인다. 동작 줄이기면 둘 다 없음.
 */
type Phase = 'intro' | number;

export function Journey({
  steps,
  intro,
  startLabel,
  storeKey,
  resultHref,
}: {
  steps: JourneyStep[];
  intro: ReactNode;
  startLabel: string;
  storeKey: string;
  resultHref: string;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('intro');
  // 결과에서 돌아왔을 때 이전 응답을 이어서 고칠 수 있게(화면 표시는 안내 단계라 서버 HTML 과 어긋나지 않는다)
  const [answers, setAnswers] = useState<Answers>(() => (typeof window === 'undefined' ? {} : (loadAnswers(storeKey) ?? {})));
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [phase]);

  const total = steps.length;
  const step = typeof phase === 'number' ? steps[phase] : null;
  const last = typeof phase === 'number' && phase === total - 1;
  const canNext = !step || step.optional || answered(step, answers);

  const set = (id: string, v: Answers[string]) =>
    setAnswers((a) => {
      const next = { ...a, [id]: v };
      saveAnswers(storeKey, next);
      return next;
    });
  const next = () => {
    if (phase === 'intro') return setPhase(0);
    if (last) {
      saveAnswers(storeKey, answers);
      router.push(resultHref);
      return;
    }
    setPhase(phase + 1);
  };
  const prev = () => setPhase(typeof phase === 'number' && phase > 0 ? phase - 1 : 'intro');

  const value = step ? answers[step.id] : undefined;
  const list = Array.isArray(value) ? value : [];
  const toggle = (o: string) => step && set(step.id, list.includes(o) ? list.filter((x) => x !== o) : [...list, o]);

  return (
    <section className="dx jr" aria-labelledby="jr-title">
      {step && (
        <div className="dx-progress">
          <p>
            <span className="dx-count">
              {(phase as number) + 1} / {total}
            </span>
          </p>
          <div className="dx-bar" role="progressbar" aria-label="진행 상태" aria-valuemin={1} aria-valuemax={total} aria-valuenow={(phase as number) + 1}>
            <i style={{ transform: `scaleX(${((phase as number) + 1) / total})` }} />
          </div>
        </div>
      )}

      <div className="dx-step jr-step" key={String(phase)}>
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
              {(step.kind === 'multi' || (step.kind === 'text' && step.options)) && (
                <>
                  <div className={step.kind === 'text' ? 'chips jr-tags' : 'options'}>
                    {step.options!.map((o) => {
                      const on = list.includes(o);
                      const full = !on && !!step.max && list.length >= step.max;
                      return (
                        <label key={o} className={step.kind === 'text' ? 'chip' : 'option'} data-disabled={full || undefined}>
                          <input type="checkbox" checked={on} disabled={full} onChange={() => toggle(o)} />
                          <span>{o}</span>
                        </label>
                      );
                    })}
                  </div>
                  {step.kind === 'multi' && step.max && (
                    <p className="dx-count-note" aria-live="polite">
                      {list.length} / {step.max} 선택
                    </p>
                  )}
                </>
              )}
              {step.note && (
                <div className="apply-field jr-note">
                  <label htmlFor={`note-${step.id}`}>{step.note.label}</label>
                  {step.note.long ? (
                    <textarea
                      id={`note-${step.id}`}
                      rows={3}
                      maxLength={step.note.max}
                      placeholder={step.note.placeholder}
                      value={(answers[`${step.id}:note`] as string) ?? ''}
                      onChange={(e) => set(`${step.id}:note`, e.target.value)}
                    />
                  ) : (
                    <input
                      id={`note-${step.id}`}
                      maxLength={step.note.max}
                      placeholder={step.note.placeholder}
                      value={(answers[`${step.id}:note`] as string) ?? ''}
                      onChange={(e) => set(`${step.id}:note`, e.target.value)}
                    />
                  )}
                </div>
              )}
            </fieldset>
          </>
        )}
      </div>

      {step && (
        <div className="dx-actions dx-nav">
          <button type="button" className="text-button" onClick={prev}>
            ← 이전
          </button>
          <button type="button" className="cta cta-solid" onClick={next} disabled={!canNext}>
            {last ? '정리해 보기' : step.optional && !answered(step, answers) ? '건너뛰기' : '다음'}
            <span aria-hidden="true"> →</span>
          </button>
        </div>
      )}
    </section>
  );
}
