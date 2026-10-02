import Image from 'next/image';
import Link from 'next/link';
import { Film } from '@/components/Film';
import { HERO, IDENTITY, SITE } from '@/lib/copy';
import { ENTER, HOUSE } from '@/lib/entry';
import { COURSES, STATUS, formatDay, nextSessions, statusOf, toKey } from '@/lib/schedule';
import { seoulToday } from '@/lib/today';

// 입학 일정의 상태가 서울 기준 '오늘'로 계산되도록 한 시간마다 다시 만든다.
export const revalidate = 3600;

/*
 * 홈 — 브랜드의 입구. 네 구획을 넘기지 않는다.
 *   01 첫 장면: 질문 + 정체성 한 줄 + 학생 / 부모 CTA (스크롤 없이 한 화면)
 *   02 THE WORLD: 대표 이미지 + 한 줄 + 링크
 *   03 THE HOUSE: ACADEMIC · FORUM · 입학 안내를 짧게 + NEXT ENTRY 한 줄
 *   04 마지막 입장: 학생 / 부모 / 입학 안내
 * 캠페인의 네 장(BORROWED DESIRES … THE FIRST STEP)은 /the-question 에서만 천천히.
 */
export default function Home() {
  const todayKey = toKey(seoulToday());
  const next = nextSessions(todayKey, 9).find((x) => statusOf(x, todayKey) !== 'closed');

  return (
    <main id="main">
      {/* 01 — 첫 장면 */}
      <section className="hero" aria-labelledby="hero-title">
        <Film
          className="hero-film"
          src="/campaign/hero.mp4"
          poster="/campaign/hero.jpg"
          label="이른 아침, 햇살 드는 공부방에서 큰 창을 여는 학생의 뒷모습과 바람에 날리는 커튼"
        />
        <div className="hero-veil" aria-hidden="true" />
        <div className="hero-body">
          <p className="hero-season">{SITE.season}</p>
          <h1 className="hero-title" id="hero-title">
            {HERO.map((l, i) => (
              <span key={l} className={`hl hl-${i + 1}`}>
                <span style={{ animationDelay: `${400 + i * 160}ms` }}>{l}</span>
              </span>
            ))}
          </h1>
          <p className="hero-id">
            {IDENTITY.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
          <div className="hero-cta">
            <Link className="cta cta-solid" href="/start/student">
              나는 학생입니다
            </Link>
            <Link className="cta cta-line" href="/start/parent">
              나는 부모입니다
            </Link>
          </div>
          <Link className="hero-more" href="/the-question">
            첫 질문으로 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 02 — THE WORLD */}
      <section className="hw" aria-labelledby="hw-title">
        <figure className="hw-img">
          <Image
            src="/campaign/r-museum.jpg"
            width={896}
            height={1200}
            sizes="(max-width: 719px) 100vw, 42vw"
            alt="밝은 전시실, 커다란 색면 그림 앞에서 한 곳을 가리키며 이야기하는 두 사람의 뒷모습"
          />
        </figure>
        <div className="hw-text">
          <p className="ch-tag">THE WORLD</p>
          <h2 className="hw-title" id="hw-title">
            당신이 모르는 세계는
            <br />
            아직 너무 많습니다.
          </h2>
          <p className="hw-line">영화, 글, 사람, 도시, 기술. 교실 밖의 장면을 편집해 보여주고, 각 장면은 질문으로 끝납니다.</p>
          <Link className="hb-cta" href="/the-world">
            장면을 만나기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 03 — THE HOUSE */}
      <section className="hh" aria-labelledby="hh-title">
        <div className="hh-head">
          <p className="ch-tag">THE HOUSE</p>
          <h2 className="hh-title" id="hh-title">
            질문이, 실제로 시작되는 곳.
          </h2>
          <Link className="hb-more" href="/programs">
            교육과정과 입학 안내
          </Link>
        </div>
        <ul className="hh-list">
          {HOUSE.map((h) => (
            <li key={h.key}>
              <Link href={h.href}>
                <span className="hh-img">
                  <Image src={h.img} width={2000} height={1493} sizes="(max-width: 719px) 112px, 30vw" alt="" />
                </span>
                <span className="hh-text">
                  <span className="hh-name">{h.name}</span>
                  <span className="hh-line">{h.line}</span>
                  <span className="hh-go">
                    {h.cta} <span aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {next && (
          <p className="hs-next">
            <span className="hs-next-tag">NEXT ENTRY</span>
            <span>
              {COURSES[next.course].label} {next.round} · {next.online ? '온라인 입학시험' : '입학시험'} · {formatDay(next.date)}
              {next.time ? ` ${next.time}` : ''} · {STATUS[statusOf(next, todayKey)].label}
            </span>
            <Link href="/admissions/schedule">
              일정 전체 <span aria-hidden="true">→</span>
            </Link>
          </p>
        )}
      </section>

      {/* 04 — 마지막 입장 */}
      <section className="enter" aria-labelledby="enter-title">
        <p className="ch-tag ch-tag-signal">ENTER THE TOTAL</p>
        <h2 className="enter-title" id="enter-title">
          당신의 질문은,
          <br />
          어디에서 시작되나요?
        </h2>
        <ul className="enter-list">
          {ENTER.map((e) => (
            <li key={e.href}>
              <Link href={e.href}>
                <span className="enter-no">{e.no}</span>
                <span className="enter-label">{e.label}</span>
                <span className="enter-meta">{e.meta}</span>
                <span className="enter-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
