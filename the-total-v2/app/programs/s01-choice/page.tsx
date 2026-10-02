import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ExamDate } from '@/components/Countdown';
import { EXAM, S01 } from '@/lib/season';

export const metadata: Metadata = { title: `${S01.code} — ${S01.name}` };

/*
 * S.01 — 선택의 근거. 캠페인처럼 시작하고(사진 + 흰 정보 카드), 실제 수업 구조와 입학 정보로 끝난다.
 *   첫 장면 → 수업의 방식(세 문장 + 01 / 02 / 03) → 4주(펼침) → 과정이 남기는 것(MY INDEX 예시) → 입학 정보.
 * 과장된 약속 · 실적 · 마감 · 좌석 수는 쓰지 않는다. 일정은 ENTRY_EXAM_AT 하나에서만.
 */
export default function S01Page() {
  return (
    <main id="main" className="s1">
      <section className="s1-hero" aria-labelledby="s1-title">
        <Image
          className="s1-bg"
          src="/campaign/s01-crosswalk.jpg"
          fill
          priority
          sizes="100vw"
          alt="비 갠 낮, 여러 방향으로 횡단보도를 건너는 사람들과 색색의 우산을 위에서 내려다본 장면"
        />
        <div className="s1-card">
          <p className="ch-tag">
            {S01.code} — {S01.name}
          </p>
          <h1 className="s1-title" id="s1-title">
            {S01.title.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h1>
          {S01.lead.map((p) => (
            <p key={p[0]} className="s1-lead">
              {p.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
          ))}
          <div className="s1-cta">
            <Link className="cta cta-solid" href="/diagnosis/my-index">
              나의 INDEX로 시작하기 <span aria-hidden="true">→</span>
            </Link>
            <Link className="cta cta-line" href="/entry">
              입학 안내 보기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="s1-sec" aria-labelledby="way-title">
        <div className="frame">
          <div className="frame-main">
            <p className="ch-tag">수업의 방식</p>
            <h2 className="frame-title s1-way" id="way-title">
              {S01.way.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </h2>
          </div>
        </div>
        <ol className="s1-parts">
          {S01.parts.map((p) => (
            <li key={p.no}>
              <span className="s1-big">{p.no}</span>
              <span className="s1-part-name">{p.name}</span>
              <span className="s1-part-text">
                {p.text.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="s1-sec s1-weeks-sec" aria-labelledby="weeks-title">
        <div className="frame">
          <div className="frame-main">
            <p className="ch-tag">4주 구성</p>
            <h2 className="frame-title" id="weeks-title">
              한 주에 한 장면.
            </h2>
          </div>
          <div className="frame-side">
            <p>각 주는 하나의 질문에서 시작해, 한 문장이나 한 장의 기록으로 끝납니다. 주차를 눌러 내용을 펼쳐 보세요.</p>
          </div>
        </div>
        <div className="s1-weeks">
          {S01.weeks.map((w) => (
            <details key={w.no} className="s1-week">
              <summary>
                <span className="s1-week-no">WEEK {w.no}</span>
                <span className="s1-week-title">{w.title}</span>
                <span className="s1-week-mark" aria-hidden="true" />
              </summary>
              <p className="s1-week-text">
                {w.text.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="s1-sec s1-record-sec" aria-labelledby="record-title">
        <div className="frame">
          <div className="frame-main">
            <p className="ch-tag">과정이 남기는 것</p>
            <h2 className="frame-title" id="record-title">
              MY INDEX
            </h2>
          </div>
          <div className="frame-side">
            <p>4주가 끝나면 학생은 자기 말로 쓴 한 장의 기록을 받습니다. 아래는 그 형식의 예시입니다.</p>
          </div>
        </div>
        <figure className="s1-record">
          <figcaption>MY INDEX — 예시</figcaption>
          <ol>
            {S01.record.map((l, i) => (
              <li key={l}>
                <span className="s1-record-no">{String(i + 1).padStart(2, '0')}</span>
                <span>{l}</span>
                <span className="s1-record-line" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </figure>
      </section>

      <section className="s1-sec s1-info" aria-labelledby="info-title">
        <h2 className="sr" id="info-title">
          입학 정보
        </h2>
        <dl className="s1-facts">
          <div>
            <dt>기간</dt>
            <dd>4주</dd>
          </div>
          <div>
            <dt>시작</dt>
            <dd>나의 INDEX → 온라인 입학시험 또는 첫 상담</dd>
          </div>
          <div>
            <dt>입학시험</dt>
            <dd>
              {EXAM.mode} · {EXAM.duration}
            </dd>
          </div>
          <div>
            <dt>다음 일정</dt>
            <dd>
              <ExamDate />
            </dd>
          </div>
        </dl>
        <div className="s1-cta">
          <Link className="cta cta-solid" href="/diagnosis/my-index">
            나의 INDEX로 시작하기 <span aria-hidden="true">→</span>
          </Link>
          <Link className="cta cta-line" href="/entry">
            입학 안내 보기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
