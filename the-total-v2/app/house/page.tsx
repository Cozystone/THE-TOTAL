import type { Metadata } from 'next';
import { Plate } from '@/components/Plate';
import { HOUSE } from '@/lib/copy';

export const metadata: Metadata = { title: '집' };

/* 집 — 내부 철학(산파술)과 사람. 답을 가르치지 않는다. */
export default function House() {
  return (
    <main id="main" className="doc">
      <header className="doc-head">
        <p className="eyebrow">집</p>
        <h1 className="doc-title">
          {HOUSE.thesis[0]}
          <br />
          {HOUSE.thesis[1]}
        </h1>
        <p className="lead">{HOUSE.intro}</p>
      </header>

      <Plate tone="ink" figure="window" ratio="21 / 9" className="doc-plate" label="집" caption="질문이 머무는 자리" />

      <section className="principles" aria-label="원칙">
        {HOUSE.principles.map((p) => (
          <div key={p.no} className="principle" data-reveal>
            <span className="no">{p.no}</span>
            <h2>{p.title}</h2>
            <p>{p.text}</p>
          </div>
        ))}
      </section>

      <section className="people" aria-labelledby="people-title">
        <h2 className="eyebrow" id="people-title">
          사람
        </h2>
        {HOUSE.people.map((person) => (
          <div key={person.name} className="person" data-reveal>
            <div>
              <p className="person-name">{person.name}</p>
              <p className="muted">{person.role}</p>
            </div>
            <div>
              {person.text.map((t) => (
                <p key={t} className="body">
                  {t}
                </p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
