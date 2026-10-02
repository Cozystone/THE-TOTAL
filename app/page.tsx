import Link from 'next/link';
import { Schedule } from '@/components/Schedule';
import { latestNotices, NOTICE_TYPES } from '@/lib/notices';
import { COURSES, STATUS, formatDay, formatShort, nextSessions, statusOf, toKey } from '@/lib/schedule';
import { seoulToday } from '@/lib/today';

// 일정 상태가 서울 기준 '오늘'로 계산되도록 한 시간마다 다시 만든다.
export const revalidate = 3600;

/*
 * 홈 — 10초 안에: 무슨 기관인지 · 어떤 과정을 하는지 · 어떻게 지원하는지.
 *   첫 화면(문장 · 설명 · 진단 시작 · 입학 일정 달력) → 방식 → 과정 → 온라인 개인진단 → 입학 안내
 */
const STEPS = [
  { no: '01', title: '온라인 개인진단', text: '학년과 과목별 상태, 목표와 어려움, 선호하는 수업 방식을 확인합니다.' },
  { no: '02', title: '온라인 입학시험', text: '과정별 시험으로 현재의 학업 수준을 정확히 확인합니다.' },
  { no: '03', title: '개인화 수업 설계', text: '진단과 시험을 함께 검토해 학생별 Personalized Class를 설계합니다.' },
];

const COURSE_LINES = [
  { id: 'elementary', text: '학습 습관과 사고력, 스스로 질문하는 힘과 교과 기초를 다집니다.' },
  { id: 'middle', text: '내신과 교과 이해를 바로 세우고, 공부 방식을 다시 정비합니다.' },
  { id: 'high', text: '대입의 현실을 기준으로 과목별 전략과 우선순위를 학생마다 설계합니다.' },
] as const;

export default function Home() {
  const today = seoulToday();
  const todayKey = toKey(today);
  const upcoming = nextSessions(todayKey, 3);
  const notices = latestNotices(3);

  return (
    <main id="main" className="page">
      {/* 첫 화면 */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-main">
          <p className="eyebrow">서울 대치 · 초등 · 중등 · 고등 개인화 교육</p>
          <h1 className="hero-title" id="hero-title">
            모든 다음은,
            <br />
            정확한 이해에서 시작됩니다.
          </h1>
          <p className="lead">
            THE TOTAL은 온라인 개인진단과 입학시험으로 학생의 현재를 먼저 읽고, 그 결과를 바탕으로 학생마다 다른 수업을
            설계합니다. 입시의 현실을 정확히 다루되, 학생을 성적표 하나로 설명하지 않습니다.
          </p>
          <div className="actions">
            <Link className="button" href="/diagnosis">
              온라인 개인진단 시작하기
            </Link>
            <Link className="text-link" href="/admissions#schedule">
              입학시험 일정 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="hero-side">
          <h2 className="side-title">입학 일정</h2>
          <Schedule today={today} compact />
        </div>
      </section>

      {/* 방식 */}
      <section className="block" aria-labelledby="way-title">
        <div className="block-head">
          <h2 id="way-title">THE TOTAL의 방식</h2>
        </div>
        <ol className="steps">
          {STEPS.map((s) => (
            <li key={s.no}>
              <span className="step-no">{s.no}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 과정 */}
      <section className="block" aria-labelledby="course-title">
        <div className="block-head">
          <h2 id="course-title">과정</h2>
          <Link className="text-link" href="/programs">
            교육과정 전체 <span aria-hidden="true">→</span>
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

      {/* 온라인 개인진단 */}
      <section className="block" aria-labelledby="dx-home-title">
        <div className="block-head">
          <h2 id="dx-home-title">온라인 개인진단</h2>
        </div>
        <div className="split">
          <p className="statement">개별 수업은 진단에서 시작됩니다.</p>
          <div>
            <p className="body">
              진단은 학생의 학습 상태와 공부하는 방식, 지금 필요한 것을 함께 살핍니다. 그 응답이 입학시험 결과와 함께 수업
              설계의 출발점이 됩니다. 학년 선택부터 응답 확인까지 약 5분이 걸립니다.
            </p>
            <div className="actions">
              <Link className="button" href="/diagnosis">
                진단 시작하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 입학 안내 */}
      <section className="block" aria-labelledby="adm-home-title">
        <div className="block-head">
          <h2 id="adm-home-title">입학 안내</h2>
          <Link className="text-link" href="/admissions">
            입학 안내 전체 <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="split split-even">
          <div>
            <h3 className="sub-title">다음 입학시험</h3>
            <ul className="list">
              {upcoming.map((s) => {
                const st = statusOf(s, todayKey);
                return (
                  <li key={s.id}>
                    <span className="badge" data-status={st}>
                      {STATUS[st].label}
                    </span>
                    <span className="list-title">
                      {COURSES[s.course].label} {s.round}
                    </span>
                    <span className="list-meta">
                      {formatDay(s.date)}
                      {s.applyOpen && s.applyClose && ` · 접수 ${formatShort(s.applyOpen)} – ${formatShort(s.applyClose)}`}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="sub-title">공지</h3>
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
          </div>
        </div>
      </section>
    </main>
  );
}
