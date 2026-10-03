import type { Metadata } from 'next';
import Link from 'next/link';
import { COURSES, type CourseId } from '@/lib/courses';

export const metadata: Metadata = { title: '과정' };

/*
 * 과정 — 초등 · 중등 · 고등을 같은 체계(대상 · 먼저 읽는 것 · 설계 방식 · 시작)로.
 * '학생별 맞춤' 을 반복하지 않는다. 학생의 현재를 읽고 필요한 순서와 방식을 설계한다는 말로 통일.
 */
const PROGRAMS: { id: CourseId; line: [string, string]; who: string; read: string[]; how: string }[] = [
  {
    id: 'elementary',
    line: ['질문을 잃지 않는', '학습의 기초를 만듭니다.'],
    who: '초등 1–6학년',
    read: ['읽고 이해하는 방식', '공부를 이어가는 습관', '교과 기초의 빈자리', '스스로 던지는 질문'],
    how: '읽기와 사고의 방식, 공부 습관을 먼저 읽고 수업의 속도와 과제의 형태를 정합니다. 학생이 무엇을 궁금해하는지에서 출발해 기초를 빠짐없이 쌓는 순서를 만듭니다.',
  },
  {
    id: 'middle',
    line: ['내신의 현실 속에서,', '자기 방식의 공부를 다시 세웁니다.'],
    who: '중학교 1–3학년',
    read: ['과목별 개념의 이해', '시험에서 멈추는 지점', '지금의 공부 방식', '고등 과정으로 이어질 기초'],
    how: '과목별 이해와 시험에서 멈추는 지점을 나눠 읽고, 먼저 세울 곳부터 수업의 순서를 정합니다. 공부 방식이 자리 잡도록 과제와 점검의 리듬을 함께 설계합니다.',
  },
  {
    id: 'high',
    line: ['대입의 선택을 현실적으로 읽고,', '과목과 시간의 우선순위를 설계합니다.'],
    who: '고등학교 1–3학년',
    read: ['목표 전형과 현재의 성취', '학생부의 흐름', '과목별 시간 배분', '학생 자신의 기준'],
    how: '목표 전형과 현재의 성취, 학생부의 흐름을 함께 놓고 과목별 시간과 우선순위를 정합니다. 선택의 근거를 학생이 이해하고 납득하도록 설계의 과정을 함께 나눕니다.',
  },
];

export default function Programs() {
  return (
    <main id="main" className="page">
      <header className="page-head">
        <p className="eyebrow">과정</p>
        <h1 className="page-title">초등 · 중등 · 고등</h1>
        <p className="lead">세 과정 모두 학생의 현재를 읽는 데서 시작해, 그 학생에게 필요한 순서와 방식을 설계합니다.</p>
        <nav className="tabs" aria-label="과정 바로가기">
          {PROGRAMS.map((p) => (
            <a key={p.id} href={`#${p.id}`}>
              {COURSES[p.id].label}
            </a>
          ))}
        </nav>
      </header>

      {PROGRAMS.map((p) => (
        <section key={p.id} className="block program" id={p.id} aria-labelledby={`${p.id}-title`}>
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
              <dt>설계 방식</dt>
              <dd>{p.how}</dd>
            </div>
            <div>
              <dt>시작</dt>
              <dd className="actions">
                <Link className="text-link" href="/entry">
                  2027 Season Entry <span aria-hidden="true">→</span>
                </Link>
              </dd>
            </div>
          </dl>
        </section>
      ))}

      <section className="block closing-line" aria-label="맺음">
        <p className="statement">
          성적은 현재를 보여줍니다.
          <br />
          선택은 다음을 만듭니다.
        </p>
      </section>
    </main>
  );
}
