import Image from 'next/image';
import Link from 'next/link';
import { START } from '@/lib/entry';

/*
 * /start/student · /start/parent — 완전히 다른 두 입구.
 *   구도: 사진 | 큰 질문 + 짧은 설명 + (세로 구분선) 주 CTA + 보조 선택지
 *   학생 → 나의 INDEX(약 7분) / 부모 → 자녀의 학습 방향(약 5분). 보조 선택지도 서로 다르다.
 */
export function StartPath({ who }: { who: keyof typeof START }) {
  const s = START[who];
  return (
    <main id="main" className="sp">
      <section className="sp-screen" aria-labelledby="sp-title">
        <figure className="sp-img">
          <Image src={s.img} fill priority sizes="(max-width: 719px) 100vw, 46vw" alt={s.alt} />
        </figure>
        <div className="sp-body">
          <p className="sp-loc">
            <Link href="/start">시작하기</Link> <span aria-hidden="true">/</span> {s.who}
          </p>
          <h1 className="sp-title" id="sp-title">
            {s.title.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h1>
          <div className="sp-rule">
            <p className="sp-text">
              {s.body.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
            <Link className="cta cta-solid sp-main" href={s.main.href}>
              <span className="door-text">
                <span className="door-label">{s.main.label}</span>
                <span className="door-sub">{s.main.meta}</span>
              </span>
              <span className="door-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
          <ul className="sp-list" aria-label="다른 시작">
            {s.more.map((c) => (
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
          </p>
        </div>
      </section>
    </main>
  );
}
