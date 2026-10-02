import Link from 'next/link';
import { Plate } from '@/components/Plate';
import { CAMPAIGN, HOUSE, SCENES, SITE, STUDY } from '@/lib/copy';

/*
 * 처음 — 캠페인.
 *  한 장면(질문) → 네 번의 호흡(세상 · 답 · 질문 · 아직) → 선언 → 그 뒤에 집 · 장면 · 공부가 발견된다.
 *  텍스트와 플레이트는 번갈아 같은 무게로.
 */
export default function Home() {
  return (
    <main id="main">
      {/* 한 장면 */}
      <section className="hero" aria-labelledby="hero-title">
        <Plate tone="ink" figure="horizon" ratio="auto" className="hero-plate" priority />
        <div className="hero-text">
          <p className="hero-kicker">{SITE.name}</p>
          <h1 className="hero-title" id="hero-title">
            {CAMPAIGN.hero.map((l, i) => (
              <span key={l} className="line" style={{ animationDelay: `${300 + i * 160}ms` }}>
                <span>{l}</span>
              </span>
            ))}
          </h1>
          <p className="hero-scroll" aria-hidden="true">
            아래로
          </p>
        </div>
      </section>

      {/* 네 번의 호흡 */}
      <section className="sequence" aria-label="캠페인">
        {CAMPAIGN.sequence.map((group, i) => (
          <div key={i} className={`beat beat-${i + 1}`} data-reveal>
            <span className="beat-no">{String(i + 1).padStart(2, '0')}</span>
            <p className="beat-text">
              {group.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
            {i === 1 && <Plate tone="slate" figure="grid" ratio="3 / 4" className="beat-plate" label="장면 02" caption="알고리즘" />}
            {i === 3 && <Plate tone="oxblood" figure="arc" ratio="4 / 5" className="beat-plate" label="장면 04" caption="예술" />}
          </div>
        ))}
      </section>

      {/* 선언 */}
      <section className="close" aria-label="선언">
        <Plate tone="ink" figure="window" ratio="auto" className="close-plate" />
        <p className="close-text" data-reveal>
          {CAMPAIGN.close.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>
      </section>

      {/* 집 */}
      <section className="discover" aria-labelledby="house-title">
        <div className="discover-head">
          <p className="eyebrow">집</p>
          <h2 className="discover-title" id="house-title">
            {HOUSE.thesis[0]}
            <br />
            {HOUSE.thesis[1]}
          </h2>
        </div>
        <div className="discover-body" data-reveal>
          <p className="body">{HOUSE.intro}</p>
          <Link className="link" href="/house">
            집으로 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 장면 */}
      <section className="scenes-teaser" aria-labelledby="scenes-title">
        <div className="discover-head">
          <p className="eyebrow">장면</p>
          <h2 className="discover-title" id="scenes-title">
            더 넓은 세계와
            <br />더 정확한 장면.
          </h2>
        </div>
        <ul className="plates" data-reveal>
          {SCENES.slice(0, 3).map((s) => (
            <li key={s.no}>
              <Link href={`/scenes#${s.no}`}>
                <Plate tone={s.tone} figure={s.figure} label={`장면 ${s.no}`} caption={s.key} />
                <span className="plate-q">{s.q}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link className="link" href="/scenes">
          여덟 장면 모두 <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* 공부 */}
      <section className="study-teaser" aria-labelledby="study-title">
        <div className="discover-head">
          <p className="eyebrow">공부</p>
          <h2 className="discover-title" id="study-title">
            세계에 들어온 뒤,
            <br />
            공부가 발견됩니다.
          </h2>
        </div>
        <dl className="study-rows" data-reveal>
          {[STUDY.academic, STUDY.forum].map((s) => (
            <div key={s.name}>
              <dt>{s.name}</dt>
              <dd>
                <p>{s.line}</p>
                <ul>
                  {s.items.map((it) => (
                    <li key={it.key}>
                      <span>{it.key}</span>
                      {it.text}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
        <div className="study-links">
          <Link className="link" href="/study">
            공부에 대해 <span aria-hidden="true">→</span>
          </Link>
          <Link className="link" href="/entry">
            들어오는 길 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
