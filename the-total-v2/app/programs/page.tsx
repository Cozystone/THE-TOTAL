import type { Metadata } from 'next';
import Link from 'next/link';
import { PROGRAMS } from '@/lib/programs';

export const metadata: Metadata = { title: '교육과정' };

/*
 * 교육과정 — 구도: 큰 제목 + 짧은 설명 + 세로 구분선 + 행동 / 정렬된 목록 + 현재 위치.
 * 각 과정은 독립 페이지(/programs/elementary · middle · high)로. FORUM 은 /forum.
 */
export default function Programs() {
  return (
    <div className="house">
      <main id="main" className="adm prg">
        <p className="loc">
          THE HOUSE <span aria-hidden="true">/</span> <strong>교육과정</strong>
        </p>
        <header className="frame prg-frame">
          <div className="frame-main">
            <p className="ch-tag">PROGRAMS</p>
            <h1 className="frame-title">
              같은 학년이라도,
              <br />
              출발점은 다릅니다.
            </h1>
          </div>
          <div className="frame-side">
            <p>
              THE TOTAL의 교육은 두 갈래입니다. 학업 성취와 입시를 다루는 ACADEMIC, 사고와 표현과 방향을 다루는 THE TOTAL FORUM.
              모든 과정은 진단에서 시작해 학생별 설계로 이어집니다.
            </p>
            <Link className="cta cta-solid" href="/diagnosis">
              온라인 진단 고르기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </header>

        <section aria-labelledby="academic-title">
          <h2 className="prg-branch" id="academic-title">
            ACADEMIC
          </h2>
          <ol className="courses courses-list">
            {PROGRAMS.map((p, i) => (
              <li key={p.id}>
                <Link href={`/programs/${p.id}`}>
                  <span className="course-no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="course-name">{p.name}</span>
                  <span className="course-line">{p.tagline}</span>
                  <span className="course-meta">
                    {p.grades} · {p.start}
                  </span>
                  <span className="course-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="forum-title">
          <h2 className="prg-branch" id="forum-title">
            THE TOTAL FORUM
          </h2>
          <ol className="courses courses-list">
            <li>
              <Link href="/forum">
                <span className="course-no">04</span>
                <span className="course-name">THE TOTAL FORUM</span>
                <span className="course-line">생각을 글과 말로 만들고, 자신의 방향을 실제 작업으로 증명합니다.</span>
                <span className="course-meta">사고 · 표현 · 방향 · FORUM 지원 진단 후 개별 안내</span>
                <span className="course-go" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          </ol>
        </section>
      </main>
    </div>
  );
}
