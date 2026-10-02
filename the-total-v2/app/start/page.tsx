import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Doors } from '@/components/Doors';
import { HERO, IDENTITY } from '@/lib/copy';

export const metadata: Metadata = { title: '시작하기' };

/*
 * /start — 포스터 QR 이 여는 곳. 휴대폰 우선, 한 화면에서 끝난다.
 * 질문 → 정체성 → 학생 / 부모. 캠페인으로 빠지는 링크(첫 질문으로)는 두지 않는다.
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
          <Doors className="st-cta" />
          <Link className="st-skip" href="/admissions">
            입학 안내 바로 보기
          </Link>
        </div>
      </section>
    </main>
  );
}
