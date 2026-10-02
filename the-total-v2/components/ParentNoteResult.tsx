'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useSyncExternalStore } from 'react';
import { buildParentNote } from '@/lib/journeys/parent';
import { STORE, clearAnswers, type Answers } from '@/lib/journeys/types';
import { S01 } from '@/lib/season';

/*
 * PARENT NOTE — 부모 결과. 아이를 판정하지 않는다. 늘 열린 표현: "함께 살펴볼 수 있습니다", "첫 수업에서 더 정확히 정리합니다".
 * 응답은 이 브라우저의 sessionStorage 에서만 읽는다.
 */
const noop = () => () => {};
const read = () => {
  try {
    return sessionStorage.getItem(STORE.parent);
  } catch {
    return null;
  }
};

export function ParentNoteResult() {
  const router = useRouter();
  const raw = useSyncExternalStore(noop, read, () => undefined);
  const r = useMemo(() => (raw ? buildParentNote(JSON.parse(raw) as Answers) : null), [raw]);

  if (raw === undefined) return <div className="rs-wait" aria-busy="true" />;
  if (!r) {
    return (
      <div className="rs-empty">
        <p>이 브라우저에 남은 응답이 없습니다. 응답은 탭을 닫으면 사라집니다.</p>
        <Link className="cta cta-solid" href="/diagnosis/parent">
          자녀의 학습 방향 살펴보기 <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  const restart = () => {
    clearAnswers(STORE.parent);
    router.push('/diagnosis/parent');
  };

  return (
    <article className="rs">
      <header className="rs-head">
        <p className="ch-tag ch-tag-signal">PARENT NOTE</p>
        <h1 className="rs-title">지금 함께 살펴볼 세 가지</h1>
        <p className="rs-honest">
          적어 주신 응답을 정해진 기준으로 정리한 것입니다. 아이에 대한 판정이나 AI 분석이 아닙니다. 첫 수업에서 더 정확히 정리합니다.
        </p>
      </header>

      <ol className="rs-blocks">
        <li>
          <span className="rs-no">01</span>
          <h2 className="rs-name">학업</h2>
          <div className="rs-body">
            <p className="rs-sub">{r.courseLabel ? `${r.courseLabel}에서 먼저 확인할 부분` : '지금 과정에서 먼저 확인할 부분'}</p>
            {r.academic.length > 0 ? (
              <ul>
                {r.academic.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : (
              <p>과목별 지금의 흐름을 첫 수업에서 함께 살펴볼 수 있습니다.</p>
            )}
          </div>
        </li>
        <li>
          <span className="rs-no">02</span>
          <h2 className="rs-name">환경</h2>
          <div className="rs-body">
            <p className="rs-sub">시간, 습관, 수업 방식에서 조정해 볼 부분</p>
            {r.env.length > 0 ? (
              <ul>
                {r.env.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : (
              !r.envNote && <p>시간과 습관, 수업 방식은 첫 수업에서 함께 살펴볼 수 있습니다.</p>
            )}
            {r.envNote && <p className="rs-sub">적어 주신 ‘{r.envNote}’도 함께 살펴볼 수 있습니다.</p>}
          </div>
        </li>
        <li>
          <span className="rs-no">03</span>
          <h2 className="rs-name">대화</h2>
          <div className="rs-body">
            {r.moment && <p className="rs-sub">적어 주신 순간 — ‘{r.moment}’</p>}
            <p className="rs-q">“{r.question}”</p>
            <p className="rs-sub">아이에게 먼저 건넬 수 있는 열린 질문입니다.</p>
            {r.talk && <p className="rs-sub">나누고 싶다고 적어 주신 것 — ‘{r.talk}’ · 이 질문 다음에 이어가 볼 수 있습니다.</p>}
          </div>
        </li>
        <li>
          <span className="rs-no">04</span>
          <h2 className="rs-name">다음 단계</h2>
          <div className="rs-body">
            <ul className="rs-steps">
              {r.course && (
                <li>
                  <Link href={`/programs/${r.course}`}>
                    추천 과정 — {r.courseLabel} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              )}
              <li>
                <Link href={S01.href}>
                  {S01.code} — {S01.name} <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link href="/entry">
                  온라인 입학시험 <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link href={`/admissions/apply?audience=parent${r.course ? `&interest=${r.course}` : ''}`}>
                  개별 안내 요청 <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ol>

      <div className="rs-cta">
        <Link className="cta cta-solid" href={r.course ? `/programs/${r.course}` : '/programs'}>
          {r.courseLabel ? `${r.courseLabel} 보기` : '교육과정 보기'} <span aria-hidden="true">→</span>
        </Link>
        <Link className="cta cta-line" href="/entry">
          입학시험 안내 보기 <span aria-hidden="true">→</span>
        </Link>
        <button type="button" className="text-button rs-restart" onClick={restart}>
          처음부터 다시 하기
        </button>
      </div>
    </article>
  );
}
