import Image from 'next/image';
import Link from 'next/link';
import { Film } from '@/components/Film';
import { CHAPTERS, CLOSE, COLLECTION, HERO, OPEN, RESEARCH, SITE } from '@/lib/copy';

/*
 * S.01 — THE FIRST QUESTION. 홈은 하나의 캠페인.
 *   첫 장면(무음 영상, 21:9) → 01 전체 화면 영상(어둠) → 02 좁은 세로 사진 + 여백(오프화이트)
 *   → 03 흰 바탕의 짧은 문장(시그널 레드) → 04 리서치 이미지 여러 장 + 작은 캡션(검정)
 *   → 열림(보조 문장) → 컬렉션 세 오브제(오프화이트) → 맺음(산파술).
 * 장면마다 비율 · 밝기 · 글자 위치가 다르다. 문장은 장면의 제목.
 */
export default function Campaign() {
  return (
    <main id="main">
      {/* 첫 장면 */}
      <section className="hero" aria-labelledby="hero-title">
        <Film
          className="hero-film"
          src="/campaign/hero.mp4"
          poster="/campaign/hero.jpg"
          label="늦은 저녁, 학원가가 내려다보이는 비 내린 유리창 앞에 선 학생의 뒷모습"
        />
        <div className="hero-veil" aria-hidden="true" />
        <p className="hero-season">{SITE.season}</p>
        <h1 className="hero-title" id="hero-title">
          {HERO.map((l, i) => (
            <span key={l} className={`hl hl-${i + 1}`}>
              <span style={{ animationDelay: `${500 + i * 180}ms` }}>{l}</span>
            </span>
          ))}
        </h1>
        <p className="hero-index" aria-hidden="true">
          01 — 04
        </p>
      </section>

      {/* 01 — 전체 화면 영상 */}
      <section className="ch ch1" aria-labelledby="c1">
        <Film
          className="ch1-film"
          src="/campaign/desire.mp4"
          poster="/campaign/desire.jpg"
          label="밤의 창가, 휴대전화 화면의 빛이 도시의 반사와 겹치는 손"
        />
        <div className="ch1-veil" aria-hidden="true" />
        <p className="ch-tag">
          {CHAPTERS.c1.no} — {CHAPTERS.c1.title}
        </p>
        <h2 className="ch1-line" id="c1">
          {CHAPTERS.c1.line}
        </h2>
      </section>

      {/* 02 — 좁은 세로 사진, 과감한 여백 */}
      <section className="ch ch2" aria-labelledby="c2">
        <p className="ch-tag">
          {CHAPTERS.c2.no} — {CHAPTERS.c2.title}
        </p>
        <h2 className="ch2-line" id="c2" data-reveal>
          {CHAPTERS.c2.line}
        </h2>
        <figure className="ch2-photo" data-reveal>
          <Image
            src="/campaign/escalator.jpg"
            width={792}
            height={1400}
            sizes="(max-width: 719px) 70vw, 28vw"
            alt="푸른 저녁, 유리 건물의 긴 에스컬레이터를 홀로 오르는 학생의 뒷모습과 반대로 흐르는 사람들"
          />
          <figcaption>Blue hour, 19:40</figcaption>
        </figure>
      </section>

      {/* 03 — 흰 바탕의 짧은 문장 */}
      <section className="ch ch3" aria-labelledby="c3">
        <p className="ch-tag ch-tag-signal">
          {CHAPTERS.c3.no} — {CHAPTERS.c3.title}
        </p>
        <h2 className="ch3-lines" id="c3">
          {CHAPTERS.c3.lines.map((l, i) => (
            <span key={l} className={`c3l c3l-${i + 1}`} data-reveal>
              {l}
            </span>
          ))}
        </h2>
      </section>

      {/* 04 — 리서치 이미지 + 작은 캡션 */}
      <section className="ch ch4" aria-labelledby="c4">
        <div className="ch4-head">
          <p className="ch-tag">
            {CHAPTERS.c4.no} — {CHAPTERS.c4.title}
          </p>
          <h2 className="ch4-line" id="c4" data-reveal>
            {CHAPTERS.c4.line}
          </h2>
        </div>
        <ul className="research">
          {RESEARCH.map((r, i) => (
            <li key={r.src} className={`rs rs-${i + 1}`} data-reveal>
              <Image src={r.src} width={r.w} height={r.h} sizes="(max-width: 719px) 90vw, 30vw" alt={r.cap.split(' — ')[1]} />
              <span className="rs-cap">{r.cap}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 열림 — 보조 문장 */}
      <section className="open" aria-label="열림">
        <p className="open-text">
          {OPEN.map((l, i) => (
            <span key={l} className={`ol ol-${i + 1}`} data-reveal>
              {l}
            </span>
          ))}
        </p>
      </section>

      {/* 컬렉션 */}
      <section className="collection" aria-labelledby="collection-title">
        <div className="collection-head">
          <p className="ch-tag">THE TOTAL — S.01</p>
          <h2 className="collection-title" id="collection-title">
            THE COLLECTION
          </h2>
        </div>
        <ul className="objects">
          {COLLECTION.map((c, i) => (
            <li key={c.slug} className={`object object-${i + 1}`}>
              <Link href={`/${c.slug}`} aria-label={`${c.name} — ${c.line}`}>
                <span className="object-frame">
                  <Image src={c.img.src} width={1195} height={1600} sizes="(max-width: 719px) 90vw, 40vw" alt={c.img.alt} />
                  <Image className="object-alt" src={c.alt.src} width={1195} height={1600} sizes="(max-width: 719px) 90vw, 40vw" alt="" />
                </span>
                <span className="object-no">{c.no}</span>
                <span className="object-name">{c.name}</span>
                <span className="object-line">{c.line}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 맺음 */}
      <section className="closing" aria-label="맺음">
        <p className="closing-text" data-reveal>
          {CLOSE.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>
        <Link className="closing-link" href="/the-question">
          첫 질문으로 <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
