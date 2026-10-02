import type { Metadata } from 'next';
import Link from 'next/link';
import { FOUNDER } from '@/lib/forum';

export const metadata: Metadata = { title: '소개' };

/*
 * 소개 — 첫 문장 · 교육 철학(교육철학 페이지를 여기로 통합) · J. LEE.
 * 설립: Maestro Vin(Founder & Curator). 원장: J. LEE. 둘 다 경력 · 실적 · 숫자를 만들지 않는다.
 */
const PRINCIPLES = [
  {
    no: '01',
    title: '학생의 현재를 정확히 읽습니다.',
    text: '성적은 중요한 정보지만 전부가 아닙니다. 진단과 시험으로 지금의 성취와 학습 방식, 어려움이 어디서 오는지를 함께 확인합니다.',
  },
  {
    no: '02',
    title: '정해진 반에 학생을 맞추지 않습니다.',
    text: '같은 학년, 같은 점수라도 필요한 수업은 다릅니다. 학생에게 필요한 수업을 먼저 정하고, 그에 맞게 수업을 설계합니다.',
  },
  {
    no: '03',
    title: '입시의 목표와 학생의 기준이 멀어지지 않게 합니다.',
    text: '대입의 현실을 피하지 않습니다. 다만 목표를 향해 가는 동안 학생이 스스로 판단하고 선택하는 힘을 잃지 않도록 돕습니다.',
  },
];

export default function About() {
  return (
    <div className="house">
    <main id="main" className="page">
      <header className="page-head">
        <p className="eyebrow">소개</p>
        <h1 className="page-title">학생을 평균으로 설명하지 않습니다.</h1>
        <p className="lead">
          THE TOTAL은 서울 대치의 개인화 교육기관입니다. 초등 · 중등 · 고등 과정 모두 온라인 개인진단과 입학시험에서
          시작해, 학생마다 다른 수업을 설계합니다.
        </p>
      </header>

      <section className="block" aria-labelledby="principles-title">
        <div className="block-head">
          <h2 id="principles-title">교육 철학</h2>
        </div>
        <ol className="principles">
          {PRINCIPLES.map((p) => (
            <li key={p.no}>
              <span className="step-no">{p.no}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="block" aria-labelledby="ai-title">
        <div className="block-head">
          <h2 id="ai-title">빠른 답의 시대에</h2>
        </div>
        <div className="split">
          <p className="statement">
            정답이 빨라질수록,
            <br />
            판단은 더 중요해집니다.
          </p>
          <p className="body">
            필요한 답은 점점 더 쉽게 얻을 수 있습니다. 그래서 교육은 더 많은 답을 전달하는 일보다, 학생이 무엇을 근거로
            판단하고 선택하는지를 세우는 일이 되어야 합니다. THE TOTAL의 수업은 정확한 학업 위에 그 기준을 함께 쌓습니다.
          </p>
        </div>
      </section>

      <section className="block" aria-labelledby="founder-title">
        <div className="block-head">
          <h2 id="founder-title">설립</h2>
        </div>
        <div className="split director">
          <div>
            <p className="director-name">{FOUNDER.name}</p>
            <p className="muted">{FOUNDER.title}</p>
          </div>
          <div>
            {FOUNDER.text.map((t) => (
              <p key={t} className="body body-gap">
                {t}
              </p>
            ))}
            <div className="actions actions-gap">
              <Link className="text-link" href="/forum">
                THE TOTAL FORUM <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="director-title">
        <div className="block-head">
          <h2 id="director-title">원장</h2>
        </div>
        <div className="split director">
          <div>
            <p className="director-name">J. LEE</p>
            <p className="muted">THE TOTAL 원장</p>
          </div>
          <div>
            <p className="body">
              J. LEE는 학생의 성취와 학습 방식, 그리고 그 학생이 내리는 선택을 오래 지켜보며 수업을 설계해 온 교육
              설계자입니다. THE TOTAL의 진단과 수업 설계 원칙을 세우고, 각 과정이 학생마다 다르게 설계되도록 살핍니다.
            </p>
            <blockquote className="director-quote">
              <p>좋은 교육은 더 많은 것을 요구하기 전에, 먼저 그 학생을 정확히 이해하는 데서 시작됩니다.</p>
              <footer>— J. LEE</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="block block-cta" aria-label="다음 단계">
        <p>THE TOTAL의 수업은 진단에서 시작됩니다.</p>
        <div className="actions">
          <Link className="button" href="/diagnosis?track=academic">
            온라인 개인진단 시작하기
          </Link>
          <Link className="text-link" href="/programs">
            교육과정 보기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
    </div>
  );
}
