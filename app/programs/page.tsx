import type { Metadata } from 'next';
import Link from 'next/link';
import { COURSES, type CourseId } from '@/lib/schedule';

export const metadata: Metadata = { title: '교육과정' };

/* 교육과정 — 세 과정을 같은 체계(대상 · 중점 · 개인화 방식 · 다음 단계)로. */
const PROGRAMS: { id: CourseId; line: string; who: string; focus: string[]; how: string }[] = [
  {
    id: 'elementary',
    line: '공부를 오래 이어갈 습관과 생각의 기초를 만듭니다.',
    who: '초등 1–6학년. 스스로 공부하는 습관과 읽고 생각하는 힘을 기르는 시기의 학생.',
    focus: ['학습 습관', '사고력과 문해력', '자신만의 질문 만들기', '교과 기초'],
    how: '진단에서 확인한 읽기 · 사고 방식과 공부 습관에 맞춰 수업의 속도와 과제의 형태를 정합니다. 학생이 무엇을 궁금해하는지에서 출발해, 기초를 빠짐없이 다집니다.',
  },
  {
    id: 'middle',
    line: '내신과 교과 이해를 바로 세우고, 공부 방식을 다시 정비합니다.',
    who: '중 1–3학년. 내신이 시작되고, 공부 방식을 다시 세워야 하는 학생.',
    focus: ['내신 대비', '교과 개념의 정확한 이해', '학습 방식의 재정비', '고등 과정으로의 연결'],
    how: '과목별 이해도와 시험에서 놓치는 지점을 나눠 보고, 약한 곳부터 수업 순서를 정합니다. 학생에게 맞는 공부 방식이 자리 잡도록 과제와 점검 주기를 함께 설계합니다.',
  },
  {
    id: 'high',
    line: '대입의 현실을 기준으로 과목별 전략과 우선순위를 설계합니다.',
    who: '고 1–3학년. 대입을 현실적으로 준비하면서 자신의 기준을 세워야 하는 학생.',
    focus: ['대입 전형의 현실', '과목별 전략', '시간과 과목의 우선순위', '학생 자신의 기준'],
    how: '목표 전형과 현재 성적, 학생부 상황을 함께 놓고 과목별 시간 배분과 우선순위를 학생마다 다르게 정합니다. 선택의 근거를 학생이 이해하고 납득하도록 설계 과정을 함께 나눕니다.',
  },
];

export default function Programs() {
  return (
    <main id="main" className="page">
      <header className="page-head">
        <p className="eyebrow">교육과정</p>
        <h1 className="page-title">같은 학년이라도, 출발점은 다릅니다.</h1>
        <p className="lead">
          THE TOTAL의 교육은 두 분기로 이루어집니다. 학업 성취와 입시를 다루는 ACADEMIC, 사고와 표현과 방향을 다루는
          FORUM입니다.
        </p>
      </header>

      {/* 두 분기 */}
      <section className="branches" aria-label="교육 분기">
        <div className="branch">
          <p className="branch-kicker">ACADEMIC</p>
          <h2 className="branch-title">초등과정 / 중등과정 / 고등과정</h2>
          <p className="body">학업 성취와 입시 전략을 진단과 입학시험에서 시작해 학생별 수업으로 설계합니다.</p>
          <nav className="tabs" aria-label="학업과정 바로가기">
            {PROGRAMS.map((p) => (
              <a key={p.id} href={`#${p.id}`}>
                {COURSES[p.id].label}
              </a>
            ))}
          </nav>
        </div>
        <div className="branch">
          <p className="branch-kicker">FORUM</p>
          <h2 className="branch-title">사고 · 표현 · 방향</h2>
          <p className="body">더 넓은 세계를 읽고, 자기 생각을 글과 말로 표현하며, 자신만의 작업을 완성하는 과정입니다.</p>
          <div className="actions">
            <Link className="text-link" href="/forum">
              THE TOTAL FORUM 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <p className="branch-label" id="academic">
        ACADEMIC <span className="muted">· 세 과정 모두 온라인 개인진단과 입학시험에서 시작하며, 수업의 순서와 속도, 분량은 학생마다 다르게 설계됩니다.</span>
      </p>

      {PROGRAMS.map((p) => (
        <section key={p.id} className="block program" id={p.id} aria-labelledby={`${p.id}-title`}>
          <div className="program-head">
            <h2 id={`${p.id}-title`}>{COURSES[p.id].label}</h2>
            <p className="program-line">{p.line}</p>
          </div>
          <dl className="program-body">
            <div>
              <dt>대상</dt>
              <dd>{p.who}</dd>
            </div>
            <div>
              <dt>중점</dt>
              <dd>
                <ul className="tags">
                  {p.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>개인화 방식</dt>
              <dd>{p.how}</dd>
            </div>
            <div>
              <dt>다음 단계</dt>
              <dd className="actions">
                <Link className="button button-sm" href="/diagnosis?track=academic">
                  온라인 진단
                </Link>
                <Link className="text-link" href="/admissions#schedule">
                  {COURSES[p.id].short} 입학시험 일정 <span aria-hidden="true">→</span>
                </Link>
              </dd>
            </div>
          </dl>
        </section>
      ))}
    </main>
  );
}
