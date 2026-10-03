import type { Metadata } from 'next';
import { ReserveLink } from '@/components/SeasonDoor';
import { METHOD, PROCESS } from '@/lib/method';

export const metadata: Metadata = { title: '방식' };

/*
 * THE TOTAL의 방식 — 현재를 읽고, 순서를 보고, 선택의 근거를 만든다. 한 화면 안에서 끝난다.
 * 데스크톱: 01 · 02 · 03 세 칸 → 진단 · 평가 · 설계 한 줄씩 → 맺음 문장과 CTA 한 줄.
 * 얇은 선 · 번호 · 짧은 문장. 끝의 CTA 는 하나.
 */
export default function Method() {
  return (
    <main id="main" className="page page-tight page-method">
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

      <section className="method-process" aria-labelledby="process-title">
        <h2 id="process-title" className="method-process-title">
          진단 · 평가 · 설계
        </h2>
        <ol className="process">
          {PROCESS.map((p) => (
            <li key={p.no}>
              <span className="process-no">{p.no}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="method-closing" aria-label="맺음">
        <p className="statement">
          모든 학생은 같은 목표를 말합니다.
          <br />
          그러나 같은 방식으로 도착하지는 않습니다.
        </p>
        <div className="actions">
          <ReserveLink />
        </div>
      </section>
    </main>
  );
}
