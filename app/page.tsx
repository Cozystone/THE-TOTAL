import Link from 'next/link';
import { HomeHero } from '@/components/SeasonDoor';
import { COURSES } from '@/lib/courses';
import { METHOD } from '@/lib/method';

/*
 * 홈 — 2027 입학평가 안내. 데스크톱 약 2.5 화면.
 *   첫 화면(2027 THE TOTAL 입학평가 · 평가 예약 · 네 단위 카운트다운 · 일정 셋 · 예약 CTA)
 *   → A. 짧은 소개 → B. 평가의 방식 셋(→ /method) → C. 과정 셋(→ /programs#…)
 */
const COURSE_LINES = [
  { id: 'elementary', text: '질문을 잃지 않는 학습의 기초' },
  { id: 'middle', text: '내신의 현실 속에서, 자기 방식의 공부' },
  { id: 'high', text: '대입의 선택과 우선순위' },
] as const;

export default function Home() {
  return (
    <main id="main" className="page page-home">
      <section className="home-hero" aria-label="2027 THE TOTAL 입학평가">
        <HomeHero />
      </section>

      <section className="home-sec home-about" aria-labelledby="about-title">
        <h2 className="home-sec-title" id="about-title">
          THE TOTAL은 학생을 평균으로 설명하지 않습니다.
        </h2>
        <p className="body">
          현재의 성취, 학습 방식, 선택의 기준을 함께 읽고
          <br />
          한 명의 학생에게 필요한 다음을 설계합니다.
        </p>
      </section>

      <section className="home-sec" aria-labelledby="way-title">
        <div className="block-head">
          <h2 id="way-title">평가의 방식</h2>
        </div>
        <ol className="way-rows">
          {METHOD.map((s) => (
            <li key={s.no}>
              <Link href="/method">
                <span className="way-no">{s.no}</span>
                <span className="way-title">{s.title}</span>
                <span className="way-go" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-sec" aria-labelledby="course-title">
        <div className="block-head">
          <h2 id="course-title">과정</h2>
        </div>
        <ul className="course-cards">
          {COURSE_LINES.map((c) => (
            <li key={c.id}>
              <Link href={`/programs#${c.id}`}>
                <span className="course-card-name">{COURSES[c.id].label}</span>
                <span className="course-card-line">{c.text}</span>
                <span className="course-card-go" aria-hidden="true">
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
