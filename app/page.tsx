import Link from 'next/link';
import { EntryLine, SeasonDoor } from '@/components/SeasonDoor';
import { COURSES } from '@/lib/courses';
import { METHOD } from '@/lib/method';

/*
 * 홈 — 2027 SEASON ENTRY 가 중심.
 *   첫 화면(THE TOTAL · 문장 · 카운트다운 · 2027 ENTRY 보기)은 한 화면 안에서 끝난다.
 *   → 학생을 평균으로 설명하지 않는다 → 방식(세 줄) → 과정(세 줄) → 마지막 한 줄.
 * 캘린더 · 다회차 시험 · 접수 상태는 두지 않는다. 철학은 서두르지 않는다(FORUM 은 기록 아래).
 */
const COURSE_LINES = [
  { id: 'elementary', text: '질문을 잃지 않는 학습의 기초를 만듭니다.' },
  { id: 'middle', text: '내신의 현실 속에서, 자기 방식의 공부를 다시 세웁니다.' },
  { id: 'high', text: '대입의 선택을 현실적으로 읽고, 과목과 시간의 우선순위를 설계합니다.' },
] as const;

export default function Home() {
  return (
    <main id="main" className="page page-home">
      <section className="home-door" aria-label="2027 SEASON ENTRY">
        <SeasonDoor variant="home" />
      </section>

      <section className="block home-thesis" aria-label="THE TOTAL">
        <p className="statement">
          THE TOTAL은 학생을 평균으로 설명하지 않습니다.
        </p>
        <p className="lead">
          현재의 성취, 학습 방식, 선택의 기준을 함께 읽고
          <br />
          한 명의 학생에게 필요한 다음을 설계합니다.
        </p>
      </section>

      <section className="block" aria-labelledby="way-title">
        <div className="block-head">
          <h2 id="way-title">방식</h2>
          <Link className="text-link" href="/method">
            THE TOTAL의 방식 <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ol className="steps">
          {METHOD.map((s) => (
            <li key={s.no}>
              <span className="step-no">{s.no}</span>
              <h3>{s.title}</h3>
            </li>
          ))}
        </ol>
      </section>

      <section className="block" aria-labelledby="course-title">
        <div className="block-head">
          <h2 id="course-title">과정</h2>
          <Link className="text-link" href="/programs">
            과정 전체 <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="course-rows">
          {COURSE_LINES.map((c) => (
            <li key={c.id}>
              <Link href={`/programs#${c.id}`}>
                <span className="course-name">{COURSES[c.id].label}</span>
                <span className="course-line">{c.text}</span>
                <span className="course-go" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="block block-cta" aria-label="2027 ENTRY">
        <EntryLine />
        <div className="actions">
          <Link className="text-link" href="/entry">
            2027 ENTRY <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
