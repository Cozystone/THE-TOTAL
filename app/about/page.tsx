import type { Metadata } from 'next';
import Link from 'next/link';
import { ARCHIVE, VIEWS } from '@/lib/record';

export const metadata: Metadata = { title: '소개' };

/*
 * 소개 — J. LEE · 관점(제목 + 한 문장) · 짧은 아카이브. 맨 아래 THE TOTAL FORUM 으로 가는 조용한 링크.
 * 대표는 J. LEE 한 사람. 경력 · 학력 · 자격 · 실적을 만들지 않는다.
 */
export default function About() {
  return (
    <main id="main" className="page page-tight">
      <header className="page-head">
        <p className="eyebrow">소개</p>
        <h1 className="page-title">J. LEE</h1>
        <p className="director-role">Representative, THE TOTAL</p>
      </header>

      <section className="home-sec" aria-label="J. LEE">
        <div className="split director">
          <blockquote className="director-quote">
            <p>
              교육은 학생에게 답을 더하는 일이 아니라,
              <br />
              그 학생에게 이미 있는 가능성이
              <br />
              어떤 순서로 현실이 될지를 읽는 일입니다.
            </p>
            <footer>— J. LEE</footer>
          </blockquote>
          <div>
            <p className="body">
              J. LEE는 2018년부터 대치동을 오가며
              <br />
              학생과 부모, 학원과 경쟁이 만드는 풍경을 기록해 왔습니다.
            </p>
            <p className="body body-gap">
              THE TOTAL은 학생이 자신의 현재를 더 정확히 읽고,
              <br />
              그다음을 스스로 선택할 수 있게 하는 교육의 방식을 탐구합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="home-sec" aria-labelledby="views-title">
        <div className="block-head">
          <h2 id="views-title">관점</h2>
        </div>
        <ol className="views">
          {VIEWS.map((v) => (
            <li key={v.no}>
              <span className="step-no">{v.no}</span>
              <p className="views-line">{v.line}</p>
              <p className="body">{v.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-sec" aria-labelledby="archive-title">
        <div className="block-head">
          <h2 id="archive-title">아카이브</h2>
        </div>
        <ol className="archive">
          {ARCHIVE.map((a) => (
            <li key={a.date}>
              <span className="archive-date">{a.date}</span>
              <span className="archive-text">{a.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="record-after">
        <Link href="/forum">THE TOTAL FORUM</Link>
      </p>
    </main>
  );
}
