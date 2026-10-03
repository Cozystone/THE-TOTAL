import type { Metadata } from 'next';
import Link from 'next/link';
import { ARCHIVE, VIEWS } from '@/lib/record';

export const metadata: Metadata = { title: '기록' };

/*
 * 기록 — J. LEE · THE TOTAL의 관점 · 짧은 아카이브. 맨 아래 THE TOTAL FORUM 으로 가는 조용한 링크.
 * 사람에 대해서는 경력 · 학력 · 자격 · 실적을 만들지 않는다. 대표는 J. LEE 한 사람.
 */
export default function Record() {
  return (
    <main id="main" className="page">
      <header className="page-head">
        <p className="eyebrow">기록</p>
        <h1 className="page-title">THE TOTAL의 기록</h1>
      </header>

      <section className="block" aria-labelledby="lee-title">
        <div className="block-head">
          <h2 id="lee-title">대표</h2>
        </div>
        <div className="split director">
          <div>
            <p className="director-name">J. LEE</p>
            <p className="muted director-role">Representative, THE TOTAL</p>
          </div>
          <div>
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
            <p className="body body-gap">
              J. LEE는 2018년부터 대치동을 오가며 학생과 부모, 학원과 경쟁이 만드는 풍경을 기록해 왔습니다.
            </p>
            <p className="body body-gap">
              THE TOTAL은 그 풍경을 단순히 비판하는 대신, 학생이 더 넓은 세계와 자기 언어를 가질 수 있는 새로운 교육의 형식을
              탐구합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="views-title">
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

      <section className="block" aria-labelledby="archive-title">
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
