import type { Metadata } from 'next';
import Link from 'next/link';
import { FLOW, FORUM, FOUNDER, TRACKS, VIDEO } from '@/lib/forum';

export const metadata: Metadata = { title: 'THE TOTAL FORUM' };

/*
 * THE TOTAL FORUM — 학업과정 옆의 교육 분기.
 *   첫 화면 → 네 가지 과정(SEE · WRITE · SPEAK · MAKE) → 운영 방식(+ 인사이트 영상 설계) → 운영 안내 → Maestro Vin → 지원
 * 시각 언어는 사이트 전체와 같다(흰 바탕 · 검정 글자 · 얇은 선).
 */
export default function Forum() {
  return (
    <div className="house">
    <main id="main" className="page">
      <header className="page-head forum-hero">
        <p className="eyebrow">
          {FORUM.name} <span className="forum-axes">{FORUM.axes}</span>
        </p>
        <h1 className="page-title">
          AI가 답을 만들 때,
          <br />
          학생은 자신의 언어를 가져야 합니다.
        </h1>
        <p className="lead">
          THE TOTAL FORUM은 학생이 더 넓은 세계를 읽고, 자신의 생각을 글과 말로 표현하며, 자신만의 방향을 실제 작업으로
          만들어 가는 교육 프로그램입니다.
        </p>
        <div className="actions">
          <Link className="button" href="/diagnosis?track=forum">
            FORUM 지원 진단 시작하기
          </Link>
          <a className="text-link" href="#flow">
            운영 방식 보기 <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <section className="block" aria-labelledby="tracks-title">
        <div className="block-head">
          <h2 id="tracks-title">네 가지 과정</h2>
        </div>
        <ol className="tracks">
          {TRACKS.map((t) => (
            <li key={t.key}>
              <p className="track-key">
                <span className="step-no">{t.no}</span>
                <span className="track-name">{t.key}</span>
              </p>
              <h3>{t.title}</h3>
              <p className="track-text">
                {t.text[0]}{' '}
                <br />
                {t.text[1]}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="block" id="flow" aria-labelledby="flow-title">
        <div className="block-head">
          <h2 id="flow-title">운영 방식</h2>
        </div>
        <ol className="flow">
          {FLOW.map((f, i) => (
            <li key={f.title}>
              <span className="step-no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ol>

        <div className="split video">
          <div>
            <h3 className="sub-title">인사이트 영상</h3>
            <p className="body">교실에서 촬영한 강의가 아닙니다. 다음 질문을 남기기 위한 짧은 영상 에세이입니다.</p>
          </div>
          <dl className="defs">
            {VIDEO.map((v) => (
              <div key={v.label}>
                <dt>{v.label}</dt>
                <dd>{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="block" aria-labelledby="op-title">
        <div className="block-head">
          <h2 id="op-title">운영 안내</h2>
        </div>
        <p className="statement statement-quiet">
          {FORUM.operation[0]}
          <br />
          {FORUM.operation[1]}
        </p>
      </section>

      <section className="block" aria-labelledby="founder-title">
        <div className="block-head">
          <h2 id="founder-title">설계</h2>
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
          </div>
        </div>
      </section>

      <section className="block block-cta" aria-label="지원">
        <p>FORUM은 지원 진단에서 시작합니다. 관심사와 생각의 방식, 만들고 싶은 작업을 먼저 묻습니다.</p>
        <div className="actions">
          <Link className="button" href="/diagnosis?track=forum">
            FORUM 지원 진단 시작하기
          </Link>
          <Link className="text-link" href="/programs">
            교육과정 전체 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
    </div>
  );
}
