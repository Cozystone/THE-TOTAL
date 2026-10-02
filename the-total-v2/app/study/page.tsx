import type { Metadata } from 'next';
import Link from 'next/link';
import { Plate } from '@/components/Plate';
import { SITE, STUDY } from '@/lib/copy';

export const metadata: Metadata = { title: '공부' };

/* 공부 — 세계에 들어온 뒤 발견되는 두 길. 상세 · 운영은 ACADEMY(V1)로. */
export default function Study() {
  return (
    <main id="main" className="doc">
      <header className="doc-head">
        <p className="eyebrow">공부</p>
        <h1 className="doc-title">
          한 학생의 삶과 질문에서 시작해
          <br />그 사람만의 공부를 다시 설계합니다.
        </h1>
        <p className="lead">
          두 길이 있습니다. 성적과 진학을 정확히 다루는 ACADEMIC, 그리고 성적 이후에도 남는 능력을 만드는 THE TOTAL FORUM.
          어느 쪽이든 학생이 어디를 향하는지에서 시작합니다.
        </p>
      </header>

      {[STUDY.academic, STUDY.forum].map((s, i) => (
        <section key={s.name} className="track" aria-labelledby={`${i}-title`} data-reveal>
          <Plate tone={i ? 'oxblood' : 'slate'} figure={i ? 'arc' : 'horizon'} ratio="16 / 9" label={s.name} caption={s.line} />
          <div className="track-body">
            <h2 id={`${i}-title`}>{s.name}</h2>
            <p className="body">{s.line}</p>
            <ul className="track-items">
              {s.items.map((it) => (
                <li key={it.key}>
                  <span>{it.key}</span>
                  {it.text}
                </li>
              ))}
            </ul>
            <a className="link" href={`${SITE.academy}${s.href}`}>
              자세히 — ACADEMY <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      ))}

      <p className="doc-note">
        세부 과정, 일정, 진단은 운영 사이트에서 실제로 동작합니다.{' '}
        <Link className="link" href="/entry">
          들어오는 길 <span aria-hidden="true">→</span>
        </Link>
      </p>
    </main>
  );
}
