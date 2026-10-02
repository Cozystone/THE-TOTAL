import Image from 'next/image';
import Link from 'next/link';
import { Doors } from '@/components/Doors';
import { Film } from '@/components/Film';
import { HERO, IDENTITY, SITE } from '@/lib/copy';
import { ENTRY_STEPS, STRIP } from '@/lib/entry';
import { PROGRAMS } from '@/lib/programs';

/*
 * 홈 — 네 개의 선명한 장면. 각 장면은 한 화면(최대 1.2 화면) 안에서 끝나고, 기준점은 하나.
 *   ① 첫 질문 + 즉시 선택: 창가 영상 + 흰 정보 카드(학생 / 부모)
 *   ② THE HOUSE: 실제 교육 — 세 과정의 정렬된 목록 + 정보 스트립
 *   ③ THE WORLD: 차별점 — 밝은 전시실 한 장 + 한 줄 + 링크
 *   ④ ENTRY: 들어오는 방법 세 걸음 + 입학 안내
 * 캠페인 네 장은 /the-question 에서만.
 */
export default function Home() {
  return (
    <main id="main">
      {/* ① 첫 질문 + 즉시 선택 */}
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
                <span style={{ animationDelay: `${300 + i * 140}ms` }}>{l}</span>
              </span>
            ))}
          </h1>
          <p className="hero-id">
            {IDENTITY.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
          <Doors className="hero-cta" />
          <Link className="hero-more" href="/the-question">
            첫 질문으로 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ② THE HOUSE — 실제 교육 */}
      <section className="hh" aria-labelledby="hh-title">
        <div className="frame">
          <div className="frame-main">
            <p className="ch-tag">THE HOUSE</p>
            <h2 className="frame-title" id="hh-title">
              질문은,
              <br />
              실제 수업에서 완성됩니다.
            </h2>
          </div>
          <div className="frame-side">
            <p>같은 학년이라도 출발점은 다릅니다. 온라인 개인진단에서 시작해, 학생마다 다른 수업의 순서를 설계합니다.</p>
            <Link className="hb-more" href="/programs">
              교육과정 전체 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <ol className="courses">
          {PROGRAMS.map((p, i) => (
            <li key={p.id}>
              <Link href={`/programs/${p.id}`}>
                <span className="course-no">{String(i + 1).padStart(2, '0')}</span>
                <span className="course-name">{p.name}</span>
                <span className="course-line">{p.tagline}</span>
                <span className="course-meta">{p.grades}</span>
                <span className="course-go" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <p className="strip">
          {STRIP.map((s) =>
            'href' in s ? (
              <Link key={s.label} href={s.href}>
                {s.label}
              </Link>
            ) : (
              <span key={s.label}>{s.label}</span>
            ),
          )}
        </p>
      </section>

      {/* ③ THE WORLD — 차별점 */}
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
          <p className="hw-line">
            영화, 글, 사람, 도시, 기술.
            <br />
            교실 밖의 장면을 만나고,
            <br />그 장면을 자기 삶의 질문으로 바꾸는 시간.
          </p>
          <Link className="hb-cta" href="/the-world">
            세계의 장면 보기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ④ ENTRY — 들어오는 방법 */}
      <section className="entry" aria-labelledby="entry-title">
        <div className="frame">
          <div className="frame-main">
            <p className="ch-tag ch-tag-signal">ENTRY</p>
            <h2 className="frame-title" id="entry-title">
              THE TOTAL에
              <br />
              들어오는 방법
            </h2>
          </div>
          <div className="frame-side">
            <ol className="entry-steps">
              {ENTRY_STEPS.map((s) => (
                <li key={s.no}>
                  <span className="entry-no">{s.no}</span>
                  <span className="entry-title">{s.title}</span>
                  <span className="entry-text">{s.text}</span>
                </li>
              ))}
            </ol>
            <Link className="cta cta-solid entry-cta" href="/entry">
              입학 안내 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
