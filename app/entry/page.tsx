import type { Metadata } from 'next';
import { Accordion } from '@/components/Accordion';
import { EntryNotice, NoticeLead } from '@/components/EntryNotice';
import { EntryStart, SeasonDoor } from '@/components/SeasonDoor';
import { ENTRY_FACTS, ENTRY_FAQ } from '@/lib/entry';

export const metadata: Metadata = { title: '2027 ENTRY' };

/*
 * 2027 ENTRY — 카운트다운 · Entry 설명 · 정보 · 안내 · ENTRY NOTICE(사이트에서 이메일을 받는 유일한 곳).
 * 상업적 단어(합격 · 등록 · 수강료 · 상담 예약)는 쓰지 않는다 — Entry · 평가 · 세션 · 종료 · 결과 공개.
 * 카운트다운이 0 이 되면 첫 화면은 CLOSED 공고로, Entry 시작은 비활성, 안내는 다음 시즌으로.
 */
export default function Entry() {
  return (
    <main id="main" className="page page-entry">
      <section className="entry-door" aria-label="2027 SEASON THE TOTAL ENTRY">
        <SeasonDoor variant="entry" />
      </section>

      <section className="block" aria-labelledby="about-entry-title">
        <div className="block-head">
          <h2 id="about-entry-title">Entry</h2>
        </div>
        <div className="split">
          <p className="statement">
            2027 Season Entry는
            <br />
            10월 한 달 동안만 진행됩니다.
          </p>
          <div>
            <p className="body">
              Entry가 종료된 뒤에는
              <br />
              다음 시즌이 열릴 때까지
              <br />
              새로운 평가를 진행하지 않습니다.
            </p>
            <p className="body body-gap">
              이 평가는 현재의 수준만 확인하지 않습니다.
              <br />
              학생이 무엇을 이해하고, 어떤 방식으로 배우며,
              <br />
              무엇을 향해 움직일 수 있는지를 함께 봅니다.
            </p>
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="facts-title">
        <div className="block-head">
          <h2 id="facts-title">정보</h2>
        </div>
        <dl className="facts">
          {ENTRY_FACTS.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
        <EntryStart />
      </section>

      <section className="block" aria-labelledby="faq-title">
        <div className="block-head">
          <h2 id="faq-title">안내</h2>
        </div>
        <Accordion items={ENTRY_FAQ.map((f) => ({ q: f.q, a: f.a }))} />
      </section>

      <section className="block notice-block" id="notice" aria-labelledby="notice-title">
        <div className="block-head">
          <h2 id="notice-title">ENTRY NOTICE</h2>
        </div>
        <div className="split">
          <NoticeLead />
          <EntryNotice />
        </div>
      </section>
    </main>
  );
}
