import type { Metadata } from 'next';
import Link from 'next/link';
import { Accordion } from '@/components/Accordion';
import { Notify } from '@/components/Notify';
import { Schedule } from '@/components/Schedule';
import { FAQ } from '@/lib/faq';
import { seoulToday } from '@/lib/today';

export const metadata: Metadata = { title: '입학 안내' };
export const revalidate = 3600;

/* 입학 안내 — 일정(필터 · 날짜별 상세) · 절차 · 응시 안내 받기 · FAQ. 예약 완료 흐름은 만들지 않는다. */
const PROCESS = [
  { no: '01', title: '온라인 진단', text: '학년과 학습 상태, 목표와 선호하는 수업 방식을 확인합니다.' },
  { no: '02', title: '온라인 입학시험', text: '공지된 회차에 온라인으로 응시합니다. 과정별로 범위와 형식이 다릅니다.' },
  { no: '03', title: '개별 안내', text: '진단과 시험 결과를 함께 검토해 학생과 보호자에게 개별로 안내합니다.' },
  { no: '04', title: 'Personalized Class 설계', text: '검토 결과를 바탕으로 수업의 구성과 순서, 분량을 학생별로 설계합니다.' },
];

export default function Admissions() {
  const today = seoulToday();
  return (
    <main id="main" className="page">
      <header className="page-head">
        <p className="eyebrow">입학 안내</p>
        <h1 className="page-title">입학은 진단과 온라인 입학시험으로 진행됩니다.</h1>
        <p className="lead">
          과정별 온라인 입학시험 일정과 접수 상태를 확인하고, 날짜를 선택하면 해당 회차의 상세 정보를 볼 수 있습니다.
        </p>
      </header>

      <section className="block" id="schedule" aria-labelledby="schedule-title">
        <div className="block-head">
          <h2 id="schedule-title">온라인 입학시험 일정</h2>
        </div>
        <Schedule today={today} withFilter />
      </section>

      <section className="block" aria-labelledby="process-title">
        <div className="block-head">
          <h2 id="process-title">입학 절차</h2>
        </div>
        <ol className="steps steps-4">
          {PROCESS.map((s) => (
            <li key={s.no}>
              <span className="step-no">{s.no}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="actions">
          <Link className="button" href="/diagnosis?track=academic">
            온라인 진단 시작하기
          </Link>
        </div>
      </section>

      <section className="block" id="guide" aria-labelledby="guide-title">
        <div className="block-head">
          <h2 id="guide-title">응시 안내 받기</h2>
        </div>
        <div className="split">
          <p className="body">
            원하는 과정의 회차 일정과 응시 방법을 이메일로 안내합니다. 일정이 준비 중인 회차는 일정 문의로 남겨 주세요.
          </p>
          <Notify
            topics={['초등과정 응시 안내', '중등과정 응시 안내', '고등과정 응시 안내', 'FORUM 지원 안내', '일정 문의']}
            submitLabel="응시 안내 받기"
          />
        </div>
      </section>

      <section className="block" id="faq" aria-labelledby="faq-title">
        <div className="block-head">
          <h2 id="faq-title">자주 묻는 질문</h2>
        </div>
        <Accordion items={FAQ} />
      </section>
    </main>
  );
}
