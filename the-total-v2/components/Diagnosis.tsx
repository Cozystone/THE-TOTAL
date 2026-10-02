'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { submitDiagnosis } from '@/lib/diagnosis/client';
import {
  DIFFICULTIES,
  GOALS,
  GRADES,
  HOURS,
  LEVELS,
  MAX_DIFFICULTIES,
  STYLES,
  SUBJECTS,
  courseOfGrade,
  type DiagnosisInput,
  type DiagnosisResponse,
  type Grade,
  type Subject,
} from '@/lib/diagnosis/schema';
import { COURSES } from '@/lib/schedule';

/*
 * 온라인 개인진단 — 한 화면에 한 단계.
 *   안내 · 동의 → 학년 → 과목별 현재 상태 → 학습 목표 → 현재 어려움 → 선호 수업 방식 → 학습 가능 시간 → 확인 → 완료
 * 결과 화면은 API 응답을 그대로 따른다. 분석 서비스가 연결되지 않았으면 분석 결과를 지어내지 않는다.
 * 응답은 이 화면의 메모리에만 있다(저장 · 전송 없음 — /api/diagnosis 가 연결되기 전까지).
 */
type Step = 'intro' | 'grade' | 'subjects' | 'goal' | 'difficulties' | 'style' | 'hours' | 'review' | 'done';
const FLOW: Step[] = ['grade', 'subjects', 'goal', 'difficulties', 'style', 'hours', 'review'];
const TITLES: Record<Step, string> = {
  intro: '학업과정 진단',
  grade: '학년을 선택해 주세요.',
  subjects: '과목별로 지금의 상태를 골라 주세요.',
  goal: '이번 학기 가장 중요한 목표는 무엇인가요?',
  difficulties: '지금 가장 어려운 점을 골라 주세요.',
  style: '어떤 수업에서 가장 잘 배우나요?',
  hours: '수업 외에 한 주에 공부할 수 있는 시간은 어느 정도인가요?',
  review: '응답을 확인해 주세요.',
  done: '사전 진단이 완료되었습니다.',
};
const HINTS: Partial<Record<Step, string>> = {
  subjects: '국어 · 수학 · 영어는 꼭 골라 주세요. 과학 · 사회는 해당될 때만 고르면 됩니다.',
  difficulties: `최대 ${MAX_DIFFICULTIES}개까지 고를 수 있습니다.`,
  hours: '정확하지 않아도 괜찮습니다. 수업 분량을 정하는 출발점으로만 씁니다.',
};

type Draft = Partial<Omit<DiagnosisInput, 'subjects' | 'difficulties'>> & {
  subjects: DiagnosisInput['subjects'];
  difficulties: string[];
};

export function Diagnosis({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState<Step>('intro');
  const [consent, setConsent] = useState(false);
  const [draft, setDraft] = useState<Draft>({ subjects: {}, difficulties: [] });
  const [response, setResponse] = useState<DiagnosisResponse | null>(null);
  const [sending, setSending] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  // 단계가 바뀌면 제목으로 포커스(화면 읽기 프로그램 · 키보드 사용자)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const course = draft.grade ? courseOfGrade(draft.grade) : null;
  const index = FLOW.indexOf(step);

  const canNext = (() => {
    switch (step) {
      case 'grade':
        return !!draft.grade;
      case 'subjects':
        return (['국어', '수학', '영어'] as Subject[]).every((s) => draft.subjects[s]);
      case 'goal':
        return !!draft.goal;
      case 'difficulties':
        return draft.difficulties.length > 0;
      case 'style':
        return !!draft.style;
      case 'hours':
        return !!draft.hours;
      default:
        return true;
    }
  })();

  const go = (s: Step) => setStep(s);
  const next = () => go(FLOW[index + 1]);
  const prev = () => go(index <= 0 ? 'intro' : FLOW[index - 1]);

  const submit = async () => {
    setSending(true);
    const res = await submitDiagnosis({ track: 'academic', ...(draft as DiagnosisInput) });
    setResponse(res);
    setSending(false);
    go('done');
  };

  return (
    <section className="dx" aria-labelledby="dx-title">
      {index >= 0 && (
        <div className="dx-progress">
          <p>
            <span className="dx-count">
              {index + 1} / {FLOW.length}
            </span>
            {course && <span className="muted"> · {COURSES[course].label}</span>}
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
              학년과 과정, 과목별 상태, 학습 목표와 어려움, 선호하는 수업 방식을 차례로 묻습니다. 약 5분이 걸리며, 응답은
              개인화 수업 설계의 출발점이 됩니다.
            </p>
            <ol className="dx-outline">
              <li>학년 선택</li>
              <li>과목별 현재 상태</li>
              <li>학습 목표 · 현재 어려움</li>
              <li>선호하는 수업 방식 · 학습 시간</li>
              <li>응답 확인 · 사전 진단 완료</li>
            </ol>
            <div className="privacy">
              <h3>개인정보 이용 안내</h3>
              <dl>
                <div>
                  <dt>이용 목적</dt>
                  <dd>학생에게 맞는 과정과 수업 구성을 검토하기 위한 사전 진단</dd>
                </div>
                <div>
                  <dt>입력 항목</dt>
                  <dd>학년, 과목별 자기 평가, 학습 목표, 어려움, 선호 수업 방식, 학습 가능 시간 (이름 · 연락처는 묻지 않습니다)</dd>
                </div>
                <div>
                  <dt>보관</dt>
                  <dd>현재 응답은 이 화면에서만 처리되며 서버에 저장 · 전송되지 않습니다. 저장 기능이 열리면 보관 기간을 이곳에 먼저 고지합니다.</dd>
                </div>
                <div>
                  <dt>만 14세 미만</dt>
                  <dd>보호자와 함께 진행하거나 보호자가 대신 입력해 주세요.</dd>
                </div>
              </dl>
              <label className="check">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>위 내용을 확인했으며, 진단 응답의 이용에 동의합니다.</span>
              </label>
            </div>
            <div className="dx-actions">
              <button type="button" className="button" disabled={!consent} onClick={() => go('grade')}>
                진단 시작하기
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
                <p className="grade-label">{COURSES[g.course].label}</p>
                <div className="chips">
                  {g.items.map((it) => (
                    <label key={it.id} className="chip">
                      <input
                        type="radio"
                        name="grade"
                        checked={draft.grade === it.id}
                        onChange={() => setDraft({ ...draft, grade: it.id as Grade, goal: undefined })}
                      />
                      <span>{it.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </fieldset>
        )}

        {step === 'subjects' && (
          <div className="dx-field subjects">
            {SUBJECTS.map((s) => (
              <fieldset key={s} className="subject">
                <legend>{s}</legend>
                <div className="scale">
                  {LEVELS.map((l) => (
                    <label key={l.v} className="chip">
                      <input
                        type="radio"
                        name={`subject-${s}`}
                        checked={draft.subjects[s] === l.v}
                        onChange={() => setDraft({ ...draft, subjects: { ...draft.subjects, [s]: l.v } })}
                      />
                      <span>{l.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        )}

        {step === 'goal' && course && (
          <fieldset className="dx-field">
            <legend className="sr">학습 목표</legend>
            <div className="options">
              {GOALS[course].map((g) => (
                <label key={g} className="option">
                  <input type="radio" name="goal" checked={draft.goal === g} onChange={() => setDraft({ ...draft, goal: g })} />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 'difficulties' && (
          <fieldset className="dx-field">
            <legend className="sr">현재 어려움</legend>
            <div className="options">
              {DIFFICULTIES.map((d) => {
                const on = draft.difficulties.includes(d);
                const full = !on && draft.difficulties.length >= MAX_DIFFICULTIES;
                return (
                  <label key={d} className="option" data-disabled={full || undefined}>
                    <input
                      type="checkbox"
                      checked={on}
                      disabled={full}
                      onChange={() =>
                        setDraft({
                          ...draft,
                          difficulties: on ? draft.difficulties.filter((x) => x !== d) : [...draft.difficulties, d],
                        })
                      }
                    />
                    <span>{d}</span>
                  </label>
                );
              })}
            </div>
            <p className="dx-count-note" aria-live="polite">
              {draft.difficulties.length} / {MAX_DIFFICULTIES} 선택
            </p>
          </fieldset>
        )}

        {step === 'style' && (
          <fieldset className="dx-field">
            <legend className="sr">선호 수업 방식</legend>
            <div className="options">
              {STYLES.map((s) => (
                <label key={s.id} className="option">
                  <input type="radio" name="style" checked={draft.style === s.id} onChange={() => setDraft({ ...draft, style: s.id })} />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 'hours' && (
          <fieldset className="dx-field">
            <legend className="sr">학습 가능 시간</legend>
            <div className="options options-row">
              {HOURS.map((h) => (
                <label key={h} className="option">
                  <input type="radio" name="hours" checked={draft.hours === h} onChange={() => setDraft({ ...draft, hours: h })} />
                  <span>{h}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 'review' && <Summary draft={draft} onEdit={go} />}

        {step === 'done' && (
          <div className="dx-done">
            {response?.status === 'analyzed' ? (
              <p className="dx-lead">{response.result.summary}</p>
            ) : (
              <>
                <p className="dx-lead">
                  상세 수업 제안은 입학시험 이후 개별 안내 단계에서 진단 내용과 시험 결과를 함께 검토해 드립니다. 그 결과가
                  Personalized Class 설계로 이어집니다.
                </p>
                <p className="dx-notice">
                  현재 온라인 진단 응답은 저장 · 전송되지 않습니다. 안내를 받으려면 입학 안내에서 응시 안내를 신청해 주세요.
                </p>
              </>
            )}
            {course && (
              <p className="dx-course">
                해당 과정 <strong>{COURSES[course].label}</strong>
              </p>
            )}
            <Summary draft={draft} />
            <div className="dx-actions">
              <Link className="button" href="/admissions#guide">
                입학시험 응시 안내
              </Link>
              {course && (
                <Link className="text-link" href={`/programs#${course}`}>
                  {COURSES[course].label} 보기 →
                </Link>
              )}
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
              {sending ? '확인하고 있습니다' : '사전 진단 완료하기'}
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

function Summary({ draft, onEdit }: { draft: Draft; onEdit?: (s: Step) => void }) {
  const grade = GRADES.flatMap((g) => g.items).find((g) => g.id === draft.grade)?.label;
  const style = STYLES.find((s) => s.id === draft.style)?.label;
  const subjects = SUBJECTS.filter((s) => draft.subjects[s])
    .map((s) => `${s} ${LEVELS.find((l) => l.v === draft.subjects[s])?.label}`)
    .join(' · ');
  const rows: [Step, string, string | undefined][] = [
    ['grade', '학년', grade],
    ['subjects', '과목별 상태', subjects],
    ['goal', '학습 목표', draft.goal],
    ['difficulties', '현재 어려움', draft.difficulties.join(' · ')],
    ['style', '선호 수업 방식', style],
    ['hours', '학습 가능 시간', draft.hours],
  ];
  return (
    <dl className="summary">
      {rows.map(([s, k, v]) => (
        <div key={s}>
          <dt>{k}</dt>
          <dd>{v || '—'}</dd>
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
