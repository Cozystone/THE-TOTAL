'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useSyncExternalStore } from 'react';
import { buildMyIndex } from '@/lib/journeys/student';
import { STORE, clearAnswers, type Answers } from '@/lib/journeys/types';
import { S01 } from '@/lib/season';

/*
 * MY INDEX — 학생 결과. 응답을 정해진 규칙으로 정리한 네 칸(점수 · 유형 · AI 분석 아님).
 * 응답은 이 브라우저의 sessionStorage 에서만 읽는다. 없으면 진단으로 안내한다.
 */
const noop = () => () => {};
const read = () => {
  try {
    return sessionStorage.getItem(STORE.student);
  } catch {
    return null;
  }
};

export function MyIndexResult() {
  const router = useRouter();
  const raw = useSyncExternalStore(noop, read, () => undefined);
  const r = useMemo(() => (raw ? buildMyIndex(JSON.parse(raw) as Answers) : null), [raw]);

  if (raw === undefined) return <div className="rs-wait" aria-busy="true" />;
  if (!r) {
    return (
      <div className="rs-empty">
        <p>이 브라우저에 남은 응답이 없습니다. 응답은 탭을 닫으면 사라집니다.</p>
        <Link className="cta cta-solid" href="/diagnosis/my-index">
          나의 INDEX 시작하기 <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  const restart = () => {
    clearAnswers(STORE.student);
    router.push('/diagnosis/my-index');
  };

  return (
    <article className="rs">
      <header className="rs-head">
        <p className="ch-tag ch-tag-signal">MY INDEX</p>
        <h1 className="rs-title">지금 당신에게 먼저 필요한 것</h1>
        <p className="rs-honest">
          응답을 정해진 기준으로 정리한 것입니다. 점수나 유형 판정이 아니며, AI 분석도 아닙니다. 첫 수업에서 더 정확히 정리합니다.
        </p>
      </header>

      <ol className="rs-blocks">
        <li>
          <span className="rs-no">01</span>
          <h2 className="rs-name">학업의 현재</h2>
          <div className="rs-body">
            {r.academic.focus.length > 0 ? (
              <>
                <p className="rs-sub">지금 정리해 볼 학업의 지점</p>
                <ul>
                  {r.academic.focus.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>자주 막히는 곳을 고르지 않았습니다. 지금 잘 되는 리듬을 이어가는 방법부터 함께 봅니다.</p>
            )}
            {r.academic.strong.length > 0 && <p className="rs-sub">이어갈 힘 — {r.academic.strong.join(' · ')}</p>}
            {r.academic.way && <p className="rs-sub">{r.academic.way}</p>}
          </div>
        </li>
        <li>
          <span className="rs-no">02</span>
          <h2 className="rs-name">세계의 장면</h2>
          <div className="rs-body">
            <p className="rs-sub">다음 큐레이션에서 만나볼 형식</p>
            <ul>
              {r.formats.map((f) => (
                <li key={f.name}>
                  <strong>{f.name}</strong> <span className="rs-why">— {f.why}</span>
                </li>
              ))}
            </ul>
            {r.sceneNote && <p className="rs-sub">당신이 적은 장면 — ‘{r.sceneNote}’</p>}
            <p className="rs-sub">구체적인 작품과 자료는 첫 수업에서 함께 고릅니다.</p>
          </div>
        </li>
        <li>
          <span className="rs-no">03</span>
          <h2 className="rs-name">다음 질문</h2>
          <div className="rs-body">
            <p className="rs-q">{r.question}</p>
            <p className="rs-sub">당신의 응답에서 만든 열린 질문입니다. 답은 정해져 있지 않습니다.</p>
          </div>
        </li>
        <li>
          <span className="rs-no">04</span>
          <h2 className="rs-name">다음 90일</h2>
          <div className="rs-body">
            {r.ninety ? <p className="rs-q">‘{r.ninety}’</p> : <p>바꿔보고 싶은 것을 아직 적지 않았습니다.</p>}
            <p className="rs-sub">
              {S01.code} — {S01.name}에서 이 목표를 4주 동안 다음 선택의 근거로 정리할 수 있습니다.
              {r.courseLabel && ` 학업은 ${r.courseLabel}에서 함께 이어갑니다.`}
            </p>
            <p className="rs-links">
              {r.course && (
                <Link href={`/programs/${r.course}`}>
                  {r.courseLabel} 보기 <span aria-hidden="true">→</span>
                </Link>
              )}
              <Link href="/admissions/apply?audience=student">
                첫 상담 안내 요청 <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </li>
      </ol>

      <div className="rs-cta">
        <Link className="cta cta-solid" href={S01.href}>
          {S01.code} — {S01.name} 보기 <span aria-hidden="true">→</span>
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
