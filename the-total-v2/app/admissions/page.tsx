import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Accordion } from '@/components/Accordion';
import { NextEntry } from '@/components/NextEntry';
import { PathChooser } from '@/components/PathChooser';
import { STARTS } from '@/lib/entry';
import { FAQ } from '@/lib/faq';

export const metadata: Metadata = { title: '입학 안내' };
export const revalidate = 3600;

/*
 * ADMISSIONS — 실제로 들어오는 곳.
 *   첫 화면(문장 + 열린 문) → 학생 / 부모 경로 → 세 개의 시작 → NEXT ENTRY(데이터) → 입학 안내 요청 → FAQ.
 * 접수 · 예약 완료 흐름은 만들지 않는다. 신청은 /admissions/apply 에서 연결 상태를 그대로 보여준다.
 */
export default function Admissions() {
  return (
    <div className="house">
      <main id="main" className="adm">
        <header className="adm-hero">
          <div className="adm-hero-text">
            <p className="ch-tag">ADMISSIONS</p>
            <h1 className="adm-title">
              당신에게 맞는 시작은,
              <br />
              정확한 이해에서 시작됩니다.
            </h1>
            <p className="adm-lead">
              THE TOTAL의 입학은 시험 한 번으로 정해지지 않습니다. 학생의 지금을 먼저 이해하고, 그다음에 수업을 설계합니다.
            </p>
          </div>
          <figure className="adm-hero-img">
            <Image
              src="/campaign/house-admissions.jpg"
              width={2000}
              height={1493}
              priority
              sizes="(max-width: 719px) 100vw, 50vw"
              alt="아침 햇살이 돌바닥으로 쏟아지는 활짝 열린 나무 유리문과 그 문턱을 지나는 학생의 뒷모습"
            />
          </figure>
        </header>

        <section className="adm-sec" aria-labelledby="path-title">
          <div className="adm-sec-head">
            <p className="ch-tag">01 — WHO</p>
            <h2 id="path-title">누구의 시작인가요?</h2>
          </div>
          <PathChooser />
        </section>

        <section className="adm-sec" aria-labelledby="start-title">
          <div className="adm-sec-head">
            <p className="ch-tag">02 — START</p>
            <h2 id="start-title">지금 바로 시작할 수 있는 것</h2>
          </div>
          <ul className="starts">
            {STARTS.map((s, i) => (
              <li key={s.key}>
                <Link href={s.href}>
                  <span className="start-no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="start-title">{s.title}</span>
                  <span className="start-meta">
                    {s.meta}
                    <br />
                    {s.time}
                  </span>
                  <span className="start-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="adm-sec" id="schedule" aria-labelledby="next-title">
          <div className="adm-sec-head">
            <p className="ch-tag ch-tag-signal">03 — NEXT ENTRY</p>
            <h2 id="next-title">다음 온라인 입학시험</h2>
            <p className="adm-note">상태는 공지된 일정에서 계산합니다. 공지 전 회차는 ‘일정 준비 중’으로 둡니다.</p>
          </div>
          <NextEntry count={4} />
          <Link className="adm-more" href="/admissions/schedule">
            과정별 일정 · 달력 전체 <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className="adm-sec adm-apply" id="guide" aria-labelledby="apply-title">
          <div className="adm-sec-head">
            <p className="ch-tag">04 — REQUEST</p>
            <h2 id="apply-title">입학 안내 요청</h2>
          </div>
          <div className="adm-apply-body">
            <p>
              학생 본인이나 보호자 누구든 작성할 수 있습니다. 학년과 관심 과정, 희망 회차를 남기면 맞는 시작 방법을 개별로 안내합니다.
            </p>
            <Link className="enter-button" href="/admissions/apply">
              입학 안내 요청서 작성 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="adm-sec" id="faq" aria-labelledby="faq-title">
          <div className="adm-sec-head">
            <p className="ch-tag">FAQ</p>
            <h2 id="faq-title">자주 묻는 질문</h2>
          </div>
          <Accordion items={FAQ} />
        </section>
      </main>
    </div>
  );
}
