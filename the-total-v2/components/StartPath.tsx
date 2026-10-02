import Image from 'next/image';
import Link from 'next/link';
import { CHOICES, START } from '@/lib/entry';

/*
 * /start/student · /start/parent — 두 번째 화면.
 *   한 화면: 이미지 띠 → 질문 → 짧은 설명 → [나의/자녀의 시작 찾기]
 *   한 번 더 내리면: 세 가지 선택(ACADEMIC 개인진단 · FORUM 지원 진단 · 입학 안내).
 */
export function StartPath({ who }: { who: keyof typeof START }) {
  const s = START[who];
  return (
    <main id="main" className="sp">
      <section className="sp-screen" aria-labelledby="sp-title">
        <figure className="sp-img">
          <Image src={s.img} fill priority sizes="(max-width: 719px) 100vw, 50vw" alt={s.alt} />
        </figure>
        <div className="sp-body">
          <p className="ch-tag ch-tag-signal">{s.tag}</p>
          <h1 className="sp-title" id="sp-title">
            {s.title.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h1>
          <p className="sp-text">
            {s.body.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
          <Link className="cta cta-solid sp-cta" href="/diagnosis">
            {s.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="sp-choose" id="choose" aria-labelledby="choose-title">
        <h2 className="sp-choose-title" id="choose-title">
          어디서부터 시작할까요?
        </h2>
        <ul className="sp-list">
          {CHOICES.map((c) => (
            <li key={c.href}>
              <Link href={c.href}>
                <span className="sp-label">{c.label}</span>
                <span className="sp-meta">{c.meta}</span>
                <span className="sp-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="sp-other">
          <Link href={s.other.href}>{s.other.label} →</Link>
          <Link href="/start">처음으로</Link>
        </p>
      </section>
    </main>
  );
}
