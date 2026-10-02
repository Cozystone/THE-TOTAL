import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Countdown } from '@/components/Countdown';
import { EntryRequest } from '@/components/EntryRequest';
import { EXAM, S01 } from '@/lib/season';

export const metadata: Metadata = { title: 'ENTRY 01' };

/*
 * ENTRY 01 — 한 시즌이 실제로 시작된다는 안내. 판매 페이지가 아니다.
 *   첫 장면(ENTRY 01 · S.01 · 온라인 입학시험 + 카운트다운 또는 '준비 중') → 시험이 묻는 것 → 설명 → CTA.
 * 좌석 · 마감 임박 · 확인되지 않은 날짜는 없다. 날짜는 ENTRY_EXAM_AT 하나에서만.
 */
export default function Entry() {
  return (
    <div className="house">
      <main id="main" className="adm en">
        <header className="en-hero">
          <div className="en-hero-text">
            <p className="ch-tag ch-tag-signal">ENTRY 01</p>
            <h1 className="en-title">
              <span>
                {S01.code} — {S01.name}
              </span>
              <span>온라인 입학시험</span>
            </h1>
            <Countdown />
            <p className="en-facts">
              <span>{EXAM.duration}</span>
              <span>{EXAM.mode}</span>
            </p>
          </div>
          <figure className="en-img">
            <Image
              src="/campaign/house-admissions.jpg"
              width={2000}
              height={1493}
              priority
              sizes="(max-width: 719px) 100vw, 46vw"
              alt="아침 햇살이 돌바닥으로 쏟아지는 활짝 열린 나무 유리문과 그 문턱을 지나는 학생의 뒷모습"
            />
          </figure>
        </header>

        <section className="adm-sec" aria-labelledby="asks-title">
          <div className="adm-sec-head">
            <p className="ch-tag">시험이 묻는 것</p>
            <h2 id="asks-title">세 가지를 묻습니다.</h2>
          </div>
          <ol className="en-asks">
            {EXAM.asks.map((a, i) => (
              <li key={a}>
                <span className="s1-big">{String(i + 1).padStart(2, '0')}</span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
          <p className="en-note">
            {EXAM.note.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
        </section>

        <section className="adm-sec" aria-labelledby="go-title">
          <div className="adm-sec-head">
            <p className="ch-tag">다음</p>
            <h2 id="go-title">시험 전에 할 수 있는 것</h2>
          </div>
          <div className="en-go">
            <EntryRequest />
            <Link className="cta cta-line" href={S01.href}>
              {S01.code} 과정 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="en-more">
            <Link href="/diagnosis/my-index">학생 — 나의 INDEX</Link>
            <Link href="/diagnosis/parent">부모 — 자녀의 학습 방향</Link>
            <Link href="/admissions">입학 안내 전체</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
