import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Film } from '@/components/Film';
import { CHAPTERS, CLOSE, COLLECTION, OPEN, ORIENTATION, RESEARCH } from '@/lib/copy';

export const metadata: Metadata = { title: '첫 질문' };

/*
 * 첫 질문 — S.01 캠페인을 천천히 경험하는 유일한 페이지.
 *   THE QUESTION(사진 | 질문 · 본문) → 01 BORROWED DESIRES(전체 화면 영상) → 02 THE WORLD IS MOVING(좁은 세로 사진)
 *   → 03 A QUESTION OF ONE'S OWN(흰 바탕 문장) → 04 THE FIRST STEP(리서치) → 열림 → 목표지향 / 자기지향 → 맺음(산파술) → 다음.
 * 장면마다 비율 · 밝기 · 글자 위치가 다르다.
 */
export default function TheQuestion() {
  const c = COLLECTION[0];
  const next = COLLECTION[1];

  return (
    <main id="main" className="obj">
      <section className="obj-hero" aria-labelledby="obj-title">
        <div className="obj-img">
          <Image src={c.img.src} width={1195} height={1600} sizes="(max-width: 719px) 100vw, 50vw" alt={c.img.alt} priority />
        </div>
        <div className="obj-text">
          <p className="ch-tag">S.01 — THE FIRST QUESTION</p>
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

      {/* 01 — 전체 화면 영상 */}
      <section className="ch ch1" aria-labelledby="c1">
        <Film
          className="ch1-film"
          src="/campaign/desire.mp4"
          poster="/campaign/desire.jpg"
          label="밝은 오후의 거리, 쇼윈도에 손을 댄 채 사람들과 화면의 반사가 상품 위로 겹치는 장면"
        />
        <div className="ch1-veil" aria-hidden="true" />
        <div className="ch1-label">
          <p className="ch-tag">
            {CHAPTERS.c1.no} — {CHAPTERS.c1.title}
          </p>
          <h2 className="ch1-line" id="c1">
            {CHAPTERS.c1.line}
          </h2>
        </div>
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
            alt="맑은 아침, 하늘로 열린 유리 아트리움의 긴 에스컬레이터를 오르는 학생의 뒷모습"
          />
          <figcaption>Morning, 08:10</figcaption>
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
              <Image src={r.src} width={r.w} height={r.h} sizes="(max-width: 719px) 90vw, 30vw" alt={r.alt} />
              <span className="rs-cap">{r.cap}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 열림 */}
      <section className="open" aria-label="열림">
        <p className="open-text">
          {OPEN.map((l, i) => (
            <span key={l} className={`ol ol-${i + 1}`} data-reveal>
              {l}
            </span>
          ))}
        </p>
      </section>

      {/* 목표지향 / 자기지향 */}
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

      {/* 맺음 — 산파술 */}
      <section className="closing" aria-label="맺음">
        <p className="closing-text" data-reveal>
          {CLOSE.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>
        <div className="closing-links">
          <Link className="hb-cta" href="/start">
            나의 시작 찾기 <span aria-hidden="true">→</span>
          </Link>
          <Link className="closing-link" href="/diagnosis">
            온라인 진단
          </Link>
        </div>
      </section>

      <Link className="obj-next" href={`/${next.slug}`}>
        <span className="ch-tag">다음 — {next.no}</span>
        <span className="obj-next-name">
          나의 {next.name.replace('THE ', '')} <span aria-hidden="true">→</span>
        </span>
      </Link>
    </main>
  );
}
