import Image from 'next/image';
import Link from 'next/link';
import { COLLECTION, ORIENTATION } from '@/lib/copy';

/*
 * 컬렉션 오브제 한 편 — 룩북 한 장처럼.
 *  큰 사진(왼쪽, 화면 높이) | 이름 · 한 줄 · 본문
 *  → (THE QUESTION 은) 목표지향 / 자기지향 → 두 번째 사진과 (THE WORLD 는) 편집 목록 → 다음 오브제.
 */
export function ObjectPage({ slug }: { slug: (typeof COLLECTION)[number]['slug'] }) {
  const i = COLLECTION.findIndex((c) => c.slug === slug);
  const c = COLLECTION[i];
  const next = COLLECTION[(i + 1) % COLLECTION.length];

  return (
    <main id="main" className="obj">
      <section className="obj-hero" aria-labelledby="obj-title">
        <div className="obj-img">
          <Image src={c.img.src} width={1195} height={1600} sizes="(max-width: 719px) 100vw, 50vw" alt={c.img.alt} priority />
        </div>
        <div className="obj-text">
          <p className="ch-tag">
            THE TOTAL — S.01 / {c.no}
          </p>
          <h1 className="obj-name" id="obj-title">
            {c.name}
          </h1>
          <p className="obj-line">{c.line}</p>
          {c.body.map((b) => (
            <p key={b} className="obj-body">
              {b}
            </p>
          ))}
        </div>
      </section>

      {slug === 'the-question' && (
        <section className="orient" aria-label="두 가지 삶">
          {ORIENTATION.map((o, i) => (
            <div key={o.key} className={`orient-${i + 1}`} data-reveal>
              <p className="ch-tag">{o.key}</p>
              <p className="orient-text">
                {o.text.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </p>
            </div>
          ))}
        </section>
      )}

      <section className="obj-second" aria-label="두 번째 장면">
        <figure data-reveal>
          <Image src={c.alt.src} width={1195} height={1600} sizes="(max-width: 719px) 80vw, 34vw" alt={c.alt.alt} />
        </figure>
        {'edits' in c && (
          <ol className="edits" data-reveal>
            {c.edits.map((e) => (
              <li key={e.key}>
                <span>{e.key}</span>
                {e.q}
              </li>
            ))}
          </ol>
        )}
      </section>

      <Link className="obj-next" href={`/${next.slug}`}>
        <span className="ch-tag">다음 — {next.no}</span>
        <span className="obj-next-name">
          {next.name} <span aria-hidden="true">→</span>
        </span>
      </Link>
    </main>
  );
}
