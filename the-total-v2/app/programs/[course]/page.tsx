import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NextEntry } from '@/components/NextEntry';
import { PROGRAMS } from '@/lib/programs';

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ course: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params;
  return { title: PROGRAMS.find((p) => p.id === course)?.name ?? '교육과정' };
}

/*
 * 과정 한 편 — 구도: 큰 제목 + 짧은 설명 + 세로 구분선 + 행동 → 정렬된 상세 → 현재 위치 · 다른 과정.
 * 수업 시간 · 정원 · 실적 · 마감은 쓰지 않는다.
 */
export default async function Course({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params;
  const i = PROGRAMS.findIndex((p) => p.id === course);
  if (i < 0) notFound();
  const p = PROGRAMS[i];

  return (
    <div className="house">
      <main id="main" className="adm prg">
        <p className="loc">
          THE HOUSE <span aria-hidden="true">/</span> <Link href="/programs">교육과정</Link> <span aria-hidden="true">/</span>{' '}
          <strong>{p.name}</strong>
        </p>
        <header className="frame prg-frame">
          <div className="frame-main">
            <p className="ch-tag">ACADEMIC — {String(i + 1).padStart(2, '0')}</p>
            <h1 className="frame-title">{p.name}</h1>
            <p className="prg-tagline">{p.tagline}</p>
          </div>
          <div className="frame-side">
            <p>{p.line.join(' ')}</p>
            <dl className="prg-facts">
              <div>
                <dt>대상</dt>
                <dd>{p.grades}</dd>
              </div>
              <div>
                <dt>시작</dt>
                <dd>{p.start}</dd>
              </div>
              <div>
                <dt>형태</dt>
                <dd>{p.form}</dd>
              </div>
            </dl>
            <div className="prg-ctas">
              <Link className="cta cta-solid" href="/diagnosis/academic">
                {p.name} 진단 시작 <span aria-hidden="true">→</span>
              </Link>
              <Link className="hb-more" href={`/admissions/schedule?course=${p.id}`}>
                다음 입학시험 보기
              </Link>
            </div>
          </div>
        </header>

        <dl className="prg-detail prg-detail-page">
          <div>
            <dt>먼저 확인하는 것</dt>
            <dd>
              <ul className="prg-first">
                {p.first.map((f) => (
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
            <dt>부모님께 — 운영 방식</dt>
            <dd>{p.parents}</dd>
          </div>
          <div>
            <dt>학생에게 — 수업 경험</dt>
            <dd>{p.students}</dd>
          </div>
          <div>
            <dt>다음 입학시험</dt>
            <dd>
              <NextEntry count={1} course={p.id} />
            </dd>
          </div>
        </dl>

        <nav className="prg-others" aria-label="다른 과정">
          {PROGRAMS.filter((o) => o.id !== p.id).map((o) => (
            <Link key={o.id} href={`/programs/${o.id}`}>
              <span className="course-name">{o.name}</span>
              <span className="course-line">{o.tagline}</span>
            </Link>
          ))}
          <Link href="/forum">
            <span className="course-name">THE TOTAL FORUM</span>
            <span className="course-line">사고 · 표현 · 방향</span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
