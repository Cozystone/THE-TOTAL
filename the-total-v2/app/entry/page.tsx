import type { Metadata } from 'next';
import { ENTRY, SITE } from '@/lib/copy';

export const metadata: Metadata = { title: '들어오기' };

/* 들어오기 — 세 걸음. 입력 · 신청은 여기서 하지 않고 운영 사이트(ACADEMY)로 보낸다. */
export default function Entry() {
  return (
    <main id="main" className="doc">
      <header className="doc-head">
        <p className="eyebrow">들어오기</p>
        <h1 className="doc-title">
          문은 질문에서
          <br />
          열립니다.
        </h1>
        <p className="lead">
          THE TOTAL에 들어오는 길은 세 걸음입니다. 모든 걸음은 운영 사이트에서 실제로 진행됩니다. 이곳에서는 아무것도
          입력하지 않습니다.
        </p>
      </header>

      <ol className="entry-steps">
        {ENTRY.map((e) => (
          <li key={e.no} data-reveal>
            <span className="no">{e.no}</span>
            <h2>{e.title}</h2>
            <p>{e.text}</p>
            <a className="link" href={`${SITE.academy}${e.href}`}>
              ACADEMY에서 열기 <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ol>

      <p className="doc-note">{SITE.place}</p>
    </main>
  );
}
