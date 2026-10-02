import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NextEntry } from '@/components/NextEntry';
import { PROGRAMS } from '@/lib/programs';

export const metadata: Metadata = { title: '교육과정' };
export const revalidate = 3600;

/*
 * PROGRAMS — 과정마다 같은 체계:
 *   대상 · 시작 · 형태 / 먼저 확인하는 것 / 개인화 방식 / 부모님께(운영) / 학생에게(수업 경험) / 다음 입학시험(데이터) / 진단 · 일정 CTA.
 * 수업 시간 · 반 정원 · 실적 · 마감은 쓰지 않는다.
 */
export default function Programs() {
  return (
    <div className="house">
      <main id="main" className="adm prg">
        <header className="prg-head">
          <p className="ch-tag">PROGRAMS</p>
          <h1 className="adm-title">
            같은 학년이라도,
            <br />
            출발점은 다릅니다.
          </h1>
          <p className="adm-lead">
            THE TOTAL의 교육은 두 갈래입니다. 학업 성취와 입시를 다루는 ACADEMIC, 사고와 표현과 방향을 다루는 THE TOTAL FORUM.
            모든 과정은 진단에서 시작해 학생별 설계로 이어집니다.
          </p>
          <nav className="prg-index" aria-label="과정 바로가기">
            {PROGRAMS.map((p) => (
              <a key={p.id} href={`#${p.id}`}>
                {p.name}
              </a>
            ))}
            <a href="#forum">THE TOTAL FORUM</a>
          </nav>
        </header>

        <p className="prg-branch">ACADEMIC</p>

        {PROGRAMS.map((p) => (
          <section key={p.id} className="prg-item" id={p.id} aria-labelledby={`${p.id}-title`}>
            <div className="prg-lead">
              <h2 className="prg-name" id={`${p.id}-title`}>
                {p.name}
              </h2>
              <p className="prg-line">
                {p.line.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </p>
              <dl className="prg-facts">
                <div>
                  <dt>대상</dt>
                  <dd>{p.grades}</dd>
                </div>
                <div>
                  <dt>시작</dt>
                  <dd>{p.start}</dd>
                </div>
                <div>
                  <dt>형태</dt>
                  <dd>{p.form}</dd>
                </div>
              </dl>
              <div className="prg-ctas">
                <Link className="enter-button" href="/diagnosis/academic">
                  {p.name} 진단 시작 <span aria-hidden="true">→</span>
                </Link>
                <Link className="hb-more" href={`/admissions/schedule?course=${p.id}`}>
                  다음 입학시험 보기
                </Link>
              </div>
            </div>

            <dl className="prg-detail">
              <div>
                <dt>먼저 확인하는 것</dt>
                <dd>
                  <ul className="prg-first">
                    {p.first.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>개인화 방식</dt>
                <dd>{p.how}</dd>
              </div>
              <div>
                <dt>부모님께 — 운영 방식</dt>
                <dd>{p.parents}</dd>
              </div>
              <div>
                <dt>학생에게 — 수업 경험</dt>
                <dd>{p.students}</dd>
              </div>
              <div>
                <dt>다음 입학시험</dt>
                <dd>
                  <NextEntry count={1} course={p.id} />
                </dd>
              </div>
            </dl>
          </section>
        ))}

        <section className="prg-forum" id="forum" aria-labelledby="forum-title">
          <figure className="prg-forum-img">
            <Image
              src="/campaign/house-forum.jpg"
              width={2000}
              height={1493}
              sizes="(max-width: 719px) 100vw, 50vw"
              alt="창이 큰 작업실, 사진과 메모가 펼쳐진 긴 나무 탁자에 둘러서서 한 사람의 설명을 듣는 세 학생의 뒷모습"
            />
          </figure>
          <div className="prg-forum-text">
            <p className="prg-branch">THE TOTAL FORUM</p>
            <h2 className="prg-name" id="forum-title">
              사고 · 표현 · 방향
            </h2>
            <p className="prg-line">
              <span>생각을 글과 말로 만들고,</span>
              <span>자신의 방향을 실제 작업으로 증명합니다.</span>
            </p>
            <dl className="prg-facts">
              <div>
                <dt>대상</dt>
                <dd>자기 생각과 방향을 실제 작업으로 만들고 싶은 학생</dd>
              </div>
              <div>
                <dt>시작</dt>
                <dd>FORUM 지원 진단 후 개별 안내</dd>
              </div>
              <div>
                <dt>형태</dt>
                <dd>관심사와 작업 계획에 따라 학생별로 설계</dd>
              </div>
            </dl>
            <div className="prg-ctas">
              <Link className="enter-button" href="/diagnosis/forum">
                FORUM 지원 진단 <span aria-hidden="true">→</span>
              </Link>
              <Link className="hb-more" href="/forum">
                FORUM 자세히 보기
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
