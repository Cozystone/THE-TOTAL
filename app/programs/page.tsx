import type { Metadata } from 'next';
import { ReserveLink } from '@/components/SeasonDoor';
import { COURSES, type CourseId } from '@/lib/courses';

export const metadata: Metadata = { title: '과정' };

/*
 * 과정 — 초등 · 중등 · 고등. 각 과정은 네 가지만: 대상 · 먼저 읽는 것 · 방향 · 2027 입학평가 예약.
 * 같은 말(수업의 순서 · 학생별 설계 · 현재를 읽는다)을 과정마다 되풀이하지 않는다.
 */
const PROGRAMS: { id: CourseId; line: [string, string]; who: string; read: string[]; way: string }[] = [
  {
    id: 'elementary',
    line: ['질문을 잃지 않는', '학습의 기초를 만듭니다.'],
    who: '초등 1–6학년',
    read: ['읽고 이해하는 방식', '공부를 이어가는 습관', '교과 기초의 빈자리', '스스로 던지는 질문'],
    way: '궁금해하는 것에서 출발해, 기초를 빠짐없이 쌓습니다.',
  },
  {
    id: 'middle',
    line: ['내신의 현실 속에서,', '자기 방식의 공부를 다시 세웁니다.'],
    who: '중학교 1–3학년',
    read: ['과목별 개념의 이해', '시험에서 멈추는 지점', '지금의 공부 방식', '고등 과정으로 이어질 기초'],
    way: '먼저 세울 곳을 정하고, 공부 방식이 자리 잡을 리듬을 만듭니다.',
  },
  {
    id: 'high',
    line: ['대입의 선택을 현실적으로 읽고,', '과목과 시간의 우선순위를 설계합니다.'],
    who: '고등학교 1–3학년',
    read: ['목표 전형과 현재의 성취', '학생부의 흐름', '과목별 시간 배분', '학생 자신의 기준'],
    way: '과목별 시간과 우선순위를 정하고, 그 근거를 학생이 납득하게 합니다.',
  },
];

export default function Programs() {
  return (
    <main id="main" className="page page-tight">
      <header className="page-head">
        <p className="eyebrow">과정</p>
        <h1 className="page-title">초등 · 중등 · 고등</h1>
        <nav className="tabs" aria-label="과정 바로가기">
          {PROGRAMS.map((p) => (
            <a key={p.id} href={`#${p.id}`}>
              {COURSES[p.id].label}
            </a>
          ))}
        </nav>
      </header>

      {PROGRAMS.map((p) => (
        <section key={p.id} className="home-sec program" id={p.id} aria-labelledby={`${p.id}-title`}>
          <div className="program-head">
            <h2 id={`${p.id}-title`}>{COURSES[p.id].label}</h2>
            <p className="program-line">
              {p.line[0]}
              <br />
              {p.line[1]}
            </p>
          </div>
          <dl className="program-body">
            <div>
              <dt>대상</dt>
              <dd>{p.who}</dd>
            </div>
            <div>
              <dt>먼저 읽는 것</dt>
              <dd>
                <ul className="tags">
                  {p.read.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>방향</dt>
              <dd>{p.way}</dd>
            </div>
            <div>
              <dt>입학평가</dt>
              <dd className="actions">
                <ReserveLink />
              </dd>
            </div>
          </dl>
        </section>
      ))}

      <section className="home-sec closing-line" aria-label="맺음">
        <p className="statement">
          성적은 현재를 보여줍니다.
          <br />
          선택은 다음을 만듭니다.
        </p>
      </section>
    </main>
  );
}
