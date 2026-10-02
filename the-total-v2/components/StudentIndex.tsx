'use client';

import Link from 'next/link';
import { Journey } from '@/components/Journey';
import { STUDENT_STEPS, buildStudentIndex, courseLabel } from '@/lib/journeys/student';
import type { Answers } from '@/lib/journeys/types';

/* 학생 — 나의 INDEX. 결과는 점수 · 유형이 아니라 MY INDEX 네 칸. */
export function StudentIndex() {
  return (
    <Journey
      steps={STUDENT_STEPS}
      startLabel="나의 INDEX 시작하기"
      intro={
        <div className="jr-intro">
          <p className="dx-lead">
            성적표만으로는 알 수 없는 지금을 살펴봅니다. 잘하는 것, 어려운 것, 오래 남은 장면과 앞으로 궁금한 것을 차례로
            정리합니다. 정답은 없습니다.
          </p>
          <ol className="dx-outline">
            <li>학년</li>
            <li>잘하는 것 · 어려운 것</li>
            <li>공부 리듬 · 잘 배우는 방식</li>
            <li>오래 남은 장면 · 더 알고 싶은 것</li>
            <li>MY INDEX</li>
          </ol>
          <p className="jr-privacy">약 7분 · 이름과 연락처는 묻지 않습니다 · 응답은 이 화면에서만 쓰이고 저장 · 전송되지 않습니다.</p>
        </div>
      }
      renderResult={(a) => <Result a={a} />}
    />
  );
}

function Result({ a }: { a: Answers }) {
  const r = buildStudentIndex(a);
  const course = courseLabel(r.course);
  return (
    <article className="note">
      <header className="note-head">
        <p className="ch-tag ch-tag-signal">MY INDEX</p>
        <h3 className="note-title">지금 당신에게 먼저 필요한 것</h3>
        <p className="note-honest">
          이 화면은 응답을 정해진 기준으로 정리한 것입니다. 점수나 유형 판정이 아니며, AI 분석도 아닙니다. 진단 결과를 바탕으로 첫
          상담에서 함께 정리합니다.
        </p>
      </header>
      <dl className="note-rows">
        <div>
          <dt>학업의 현재</dt>
          <dd>
            {r.academic.length > 0 ? (
              <ul>
                {r.academic.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : (
              <p>어렵다고 고른 것이 없습니다. 지금의 리듬을 이어가는 방법부터 함께 봅니다.</p>
            )}
            {r.strong.length > 0 && <p className="note-sub">이어갈 힘 — {r.strong.join(' · ')}</p>}
          </dd>
        </div>
        <div>
          <dt>세계의 장면</dt>
          <dd>
            {r.world.length > 0 ? (
              <ul>
                {r.world.map((w) => (
                  <li key={w.key}>
                    <strong>{w.key}</strong> — {w.q}
                  </li>
                ))}
              </ul>
            ) : (
              <p>THE WORLD의 다섯 편집(영화 · 글 · 사람 · 도시 · 기술)에서 함께 고릅니다.</p>
            )}
            {r.sceneNote && <p className="note-sub">당신이 적은 장면 — ‘{r.sceneNote}’</p>}
            <p className="note-sub">구체적인 작품 · 글 · 전시는 첫 상담에서 함께 고릅니다.</p>
          </dd>
        </div>
        <div>
          <dt>다음 질문</dt>
          <dd>
            <p className="note-q">{r.question}</p>
            <p className="note-sub">응답을 그대로 엮은 질문입니다.</p>
          </dd>
        </div>
        <div>
          <dt>THE TOTAL에서의 다음</dt>
          <dd>
            <ul className="note-links">
              {r.course && (
                <li>
                  <Link href={`/programs/${r.course}`}>
                    {course} 보기 <span aria-hidden="true">→</span>
                  </Link>
                </li>
              )}
              {r.forum && (
                <li>
                  <Link href="/forum">
                    THE TOTAL FORUM 보기 <span aria-hidden="true">→</span>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/admissions/schedule">
                  입학시험 일정 <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
      <div className="note-foot">
        <p>이 내용으로 첫 상담을 받고 싶다면, 안내 요청서에서 연락처를 남겨 주세요. 연락처는 그 단계에서만 받습니다.</p>
        <Link className="cta cta-solid" href={`/admissions/apply?audience=student${r.course ? `&interest=${r.course}` : ''}`}>
          상담 안내 받기 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
