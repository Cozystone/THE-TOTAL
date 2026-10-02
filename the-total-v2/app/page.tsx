import Image from 'next/image';
import Link from 'next/link';
import { Film } from '@/components/Film';
import { CHAPTERS, CLOSE, COLLECTION, HERO, OPEN, RESEARCH, SITE } from '@/lib/copy';
import { latestNotices, NOTICE_TYPES } from '@/lib/notices';
import { COURSES, STATUS, formatDay, formatShort, nextSessions, statusOf, toKey } from '@/lib/schedule';
import { seoulToday } from '@/lib/today';

// 입학 일정의 상태가 서울 기준 '오늘'로 계산되도록 한 시간마다 다시 만든다.
export const revalidate = 3600;

/*
 * S.01 — THE FIRST QUESTION. 홈은 하나의 캠페인.
 *   첫 장면(무음 영상, 21:9) → 01 전체 화면 영상(어둠) → 02 좁은 세로 사진 + 여백(오프화이트)
 *   → 03 흰 바탕의 짧은 문장(시그널 레드) → 04 리서치 이미지 여러 장 + 작은 캡션(검정)
 *   → 열림(보조 문장) → 컬렉션 세 오브제(오프화이트) → THE HOUSE(진단 · 다음 입학시험 · 공지, 실제 데이터) → 맺음(산파술).
 * 장면마다 비율 · 밝기 · 글자 위치가 다르다. 문장은 장면의 제목.
 */
export default function Campaign() {
  const todayKey = toKey(seoulToday());
  const upcoming = nextSessions(todayKey, 3);
  const notices = latestNotices(2);

  return (
    <main id="main">
      {/* 첫 장면 */}
      <section className="hero" aria-labelledby="hero-title">
        <Film
          className="hero-film"
          src="/campaign/hero.mp4"
          poster="/campaign/hero.jpg"
          label="이른 아침, 햇살 드는 공부방에서 큰 창을 여는 학생의 뒷모습과 바람에 날리는 커튼"
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

      {/* THE HOUSE — 실제로 동작하는 기관의 층 */}
      <section className="house house-band" aria-labelledby="house-title">
        <div className="band-head">
          <p className="ch-tag">THE HOUSE</p>
          <h2 className="band-title" id="house-title">
            세계에 들어온 뒤,
            <br />
            실제로 시작하는 곳.
          </h2>
        </div>
        <div className="band-cols">
          <div className="band-col">
            <h3 className="band-sub">온라인 진단</h3>
            <Link className="band-entry" href="/diagnosis?track=academic">
              <span>학업과정 진단</span>
              <small>학습 상태 · 과목별 필요 · 목표와 수업 방식 · 약 5분</small>
            </Link>
            <Link className="band-entry" href="/diagnosis?track=forum">
              <span>FORUM 지원 진단</span>
              <small>관심사 · 생각의 방식 · 만들고 싶은 작업 · 약 10분</small>
            </Link>
          </div>
          <div className="band-col">
            <h3 className="band-sub">다음 입학시험</h3>
            <ul className="list">
              {upcoming.map((x) => {
                const st = statusOf(x, todayKey);
                return (
                  <li key={x.id}>
                    <span className="badge" data-status={st}>
                      {STATUS[st].label}
                    </span>
                    <span className="list-title">
                      {COURSES[x.course].label} {x.round}
                    </span>
                    <span className="list-meta">
                      {formatDay(x.date)}
                      {x.applyOpen && x.applyClose && ` · 접수 ${formatShort(x.applyOpen)} – ${formatShort(x.applyClose)}`}
                    </span>
                  </li>
                );
              })}
            </ul>
            <Link className="band-more" href="/admissions#schedule">
              입학 일정 전체 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="band-col">
            <h3 className="band-sub">공지</h3>
            <ul className="list">
              {notices.map((n) => (
                <li key={n.id}>
                  <span className="list-type">{NOTICE_TYPES[n.type]}</span>
                  <Link className="list-title" href={`/notices#${n.id}`}>
                    {n.title}
                  </Link>
                  <span className="list-meta">{formatDay(n.date, true)}</span>
                </li>
              ))}
            </ul>
            <Link className="band-more" href="/notices">
              공지 전체 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
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
