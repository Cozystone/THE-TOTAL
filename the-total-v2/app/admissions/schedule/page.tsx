import type { Metadata } from 'next';
import Link from 'next/link';
import { Schedule, type Filter } from '@/components/Schedule';
import { COURSES } from '@/lib/schedule';
import { seoulToday } from '@/lib/today';

export const metadata: Metadata = { title: '입학시험 일정' };
export const revalidate = 3600;

/* 입학시험 일정 — 과정별 온라인 입학시험. ?course=elementary|middle|high 로 처음 필터를 정한다. */
export default async function AdmissionsSchedule({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const { course } = await searchParams;
  const initial: Filter = course && course in COURSES ? (course as Filter) : 'all';
  return (
    <div className="house">
      <main id="main" className="page">
        <header className="page-head">
          <p className="eyebrow">
            <Link href="/admissions">ADMISSIONS</Link> / NEXT ENTRY
          </p>
          <h1 className="page-title">과정별 온라인 입학시험 일정</h1>
          <p className="lead">
            과정을 고르고 날짜를 누르면 그 회차의 시험 방식과 접수 상태를 볼 수 있습니다. 상태는 공지된 일정에서만 계산하며, 공지되지
            않은 회차는 ‘일정 준비 중’으로 둡니다.
          </p>
        </header>
        <section className="block" aria-label="입학시험 달력">
          <Schedule today={seoulToday()} withFilter initialFilter={initial} />
        </section>
        <section className="block entry-after" aria-label="다음 단계">
          <p className="body">시험 전에 개인진단을 먼저 해 두면, 개별 안내에서 두 결과를 함께 검토합니다.</p>
          <div className="entry-after-links">
            <Link className="enter-link" href="/diagnosis/academic">
              ACADEMIC 개인진단 <span aria-hidden="true">→</span>
            </Link>
            <Link className="enter-link" href="/admissions/apply">
              응시 안내 받기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
