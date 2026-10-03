import type { Metadata } from 'next';
import { EntryNotice, NoticeLead } from '@/components/EntryNotice';
import { EntryTop } from '@/components/SeasonDoor';
import { ENTRY_TABLE } from '@/lib/entry';

export const metadata: Metadata = { title: '2027 입학평가' };

/*
 * 2027 ENTRY — 실제 신청 안내. 한 화면 반 ~ 두 화면.
 *   2027 THE TOTAL 입학평가 · 신청 마감까지(네 단위) → 정보 표 → 짧은 소개 → ENTRY APPLICATION(이메일 · 고지 · 신청).
 * 지금은 평가를 시작하는 단계가 아니라 신청하는 단계 — '시작' 버튼은 두지 않는다.
 */
export default function Entry() {
  return (
    <main id="main" className="page page-entry">
      <section className="entry-head" aria-label="2027 THE TOTAL 입학평가">
        <EntryTop />
      </section>

      <section className="entry-info" aria-label="평가 정보">
        <dl className="entry-table">
          {ENTRY_TABLE.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
        <p className="entry-about">
          THE TOTAL Entry는
          <br />
          현재의 수준만 확인하지 않습니다.
          <br />
          무엇을 이해하고, 어떤 방식으로 배우며,
          <br />
          무엇을 향해 움직일 수 있는지를 함께 봅니다.
        </p>
      </section>

      <section className="entry-reserve" id="reserve" aria-labelledby="reserve-title">
        <div className="entry-reserve-head">
          <h2 id="reserve-title" className="label">
            ENTRY APPLICATION
          </h2>
          <NoticeLead />
        </div>
        <EntryNotice />
      </section>
    </main>
  );
}
