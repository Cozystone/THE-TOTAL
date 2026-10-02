'use client';

import Link from 'next/link';
import { Journey } from '@/components/Journey';
import { PARENT_STEPS, buildParentNote } from '@/lib/journeys/parent';
import type { Answers } from '@/lib/journeys/types';
import { COURSES } from '@/lib/schedule';

/* 부모 — 자녀의 학습 방향 살펴보기. 결과는 PARENT NOTE 네 칸. 아이를 분류하거나 등급을 매기지 않는다. */
export function ParentNoteJourney() {
  return (
    <Journey
      steps={PARENT_STEPS}
      startLabel="자녀의 학습 방향 살펴보기"
      intro={
        <div className="jr-intro">
          <p className="dx-lead">
            아이를 평가하는 질문이 아닙니다. 학업, 학습 환경, 아이가 움직이는 방식을 차례로 보며 지금 함께 살펴볼 것을 정리합니다.
          </p>
          <ol className="dx-outline">
            <li>자녀의 학년</li>
            <li>학업에서 함께 볼 부분</li>
            <li>학습 환경</li>
            <li>아이가 움직이는 때 · 요즘의 대화</li>
            <li>PARENT NOTE</li>
          </ol>
          <p className="jr-privacy">약 5분 · 이름과 연락처는 묻지 않습니다 · 응답은 이 화면에서만 쓰이고 저장 · 전송되지 않습니다.</p>
        </div>
      }
      renderResult={(a) => <Result a={a} />}
    />
  );
}

function Result({ a }: { a: Answers }) {
  const r = buildParentNote(a);
  const course = r.course ? COURSES[r.course].label : null;
  return (
    <article className="note">
      <header className="note-head">
        <p className="ch-tag ch-tag-signal">PARENT NOTE</p>
        <h3 className="note-title">지금 함께 살펴볼 세 가지</h3>
        <p className="note-honest">
          이 화면은 응답을 정해진 기준으로 정리한 것입니다. 아이에 대한 판정이나 AI 분석이 아닙니다. 진단 결과를 바탕으로 첫
          상담에서 함께 정리합니다.
        </p>
      </header>
      <dl className="note-rows">
        <div>
          <dt>학업</dt>
          <dd>
            {course && <p className="note-sub">{course}에서 확인할 부분</p>}
            {r.academic.length > 0 ? (
              <ul>
                {r.academic.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : (
              <p>첫 상담에서 과목별 현재를 함께 봅니다.</p>
            )}
          </dd>
        </div>
        <div>
          <dt>학습 환경</dt>
          <dd>
            {r.env.length > 0 ? (
              <ul>
                {r.env.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : (
              <p>시간 · 습관 · 수업 방식은 첫 상담에서 함께 봅니다.</p>
            )}
          </dd>
        </div>
        <div>
          <dt>대화</dt>
          <dd>
            <p className="note-sub">아이와 먼저 나눠볼 질문</p>
            <ul>
              {(r.questions.length ? r.questions : ['요즘 가장 오래 생각하게 되는 건 뭐야?']).map((q) => (
                <li key={q} className="note-q">
                  “{q}”
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt>다음 단계</dt>
          <dd>
            <ul className="note-links">
              {r.course && (
                <li>
                  <Link href={`/programs/${r.course}`}>
                    추천 과정 — {course} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              )}
              <li>
                <Link href={`/admissions/apply?audience=parent${r.course ? `&interest=${r.course}` : ''}`}>
                  상담 방식 — 개별 안내 요청 <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link href={`/admissions/schedule${r.course ? `?course=${r.course}` : ''}`}>
                  입학 일정 <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
      <div className="note-foot">
        <p>개별 안내를 원하시면 안내 요청서에서 연락처를 남겨 주세요. 이름 · 연락처는 그 단계에서만, 목적과 보관 방식을 밝히고 받습니다.</p>
        <Link className="cta cta-solid" href={`/admissions/apply?audience=parent${r.course ? `&interest=${r.course}` : ''}`}>
          개별 안내 요청하기 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
