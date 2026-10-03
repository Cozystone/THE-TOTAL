import type { Metadata } from 'next';
import Link from 'next/link';
import { METHOD, PROCESS } from '@/lib/method';

export const metadata: Metadata = { title: '방식' };

/*
 * THE TOTAL의 방식 — 현재를 읽고, 순서를 설계하고, 선택의 근거를 만든다.
 * 얇은 선 · 번호 · 짧은 문장. 카드 · 아이콘 없음.
 * 아래에 실제로 일어나는 순서(진단 → Entry 평가 → 순서의 설계)를 같은 문법으로.
 */
export default function Method() {
  return (
    <main id="main" className="page">
      <header className="page-head">
        <p className="eyebrow">방식</p>
        <h1 className="page-title">THE TOTAL의 방식</h1>
      </header>

      <ol className="method">
        {METHOD.map((m) => (
          <li key={m.no}>
            <span className="method-no">{m.no}</span>
            <h2 className="method-title">{m.title}</h2>
            <p className="method-text">
              {m.text.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </p>
          </li>
        ))}
      </ol>

      <section className="block" aria-labelledby="process-title">
        <div className="block-head">
          <h2 id="process-title">진단 · 평가 · 설계</h2>
        </div>
        <ol className="process">
          {PROCESS.map((p) => (
            <li key={p.no}>
              <span className="process-no">{p.no}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
        <p className="process-note muted">진단과 평가는 2027 Season Entry 기간에만 진행합니다.</p>
      </section>

      <section className="block closing-line" aria-label="맺음">
        <p className="statement">
          모든 학생은 같은 목표를 말합니다.
          <br />
          그러나 같은 방식으로 도착하지는 않습니다.
        </p>
        <div className="actions">
          <Link className="text-link" href="/entry">
            2027 ENTRY <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
