import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HERO, IDENTITY } from '@/lib/copy';

export const metadata: Metadata = { title: '시작하기' };

/*
 * /start — 포스터 QR 이 여는 곳. 휴대폰 우선, 한 화면에서 끝난다.
 * 질문 → 정체성 → 학생 / 부모. 캠페인 · 컬렉션 · 여러 이미지는 넣지 않는다.
 */
export default function Start() {
  return (
    <main id="main" className="st">
      <section className="st-screen" aria-labelledby="st-title">
        <Image
          className="st-bg"
          src="/campaign/hero.jpg"
          fill
          priority
          sizes="100vw"
          alt="이른 아침, 햇살 드는 공부방에서 큰 창을 여는 학생의 뒷모습"
        />
        <div className="st-veil" aria-hidden="true" />
        <div className="st-body">
          <h1 className="st-title" id="st-title">
            {HERO.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h1>
          <p className="st-id">
            {IDENTITY.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
          <div className="st-cta">
            <Link className="cta cta-solid" href="/start/student">
              나는 학생입니다 <span aria-hidden="true">→</span>
            </Link>
            <Link className="cta cta-line" href="/start/parent">
              나는 부모입니다 <span aria-hidden="true">→</span>
            </Link>
          </div>
          <Link className="st-skip" href="/admissions">
            입학 안내 바로 보기
          </Link>
        </div>
      </section>
    </main>
  );
}
