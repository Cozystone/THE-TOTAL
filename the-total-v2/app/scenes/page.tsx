import type { Metadata } from 'next';
import { Plate } from '@/components/Plate';
import { SCENES } from '@/lib/copy';

export const metadata: Metadata = { title: '장면' };

/* 장면 — 여덟 장면. 각 장면은 결론이 아니라 하나의 질문으로 끝난다. 룩북처럼 번갈아 좌우로. */
export default function Scenes() {
  return (
    <main id="main" className="doc">
      <header className="doc-head">
        <p className="eyebrow">장면</p>
        <h1 className="doc-title">
          더 넓은 세계와
          <br />더 정확한 장면.
        </h1>
        <p className="lead">
          정리된 결론 대신 세상이 실제로 움직이는 순간을 보여줍니다. 각 장면은 답이 아니라 질문으로 끝납니다. 그 질문을 들고
          포럼 세션에 들어옵니다.
        </p>
      </header>

      <ol className="lookbook">
        {SCENES.map((s, i) => (
          <li key={s.no} id={s.no} className={i % 2 ? 'flip' : undefined} data-reveal>
            <Plate tone={s.tone} figure={s.figure} ratio={i % 3 === 1 ? '3 / 4' : '4 / 5'} label={`장면 ${s.no}`} caption={s.key} />
            <div className="scene-text">
              <span className="no">{s.no}</span>
              <h2>{s.key}</h2>
              <p>{s.q}</p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
