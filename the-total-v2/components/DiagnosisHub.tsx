'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Diagnosis } from '@/components/Diagnosis';
import { ForumDiagnosis } from '@/components/ForumDiagnosis';

/*
 * 온라인 진단의 첫 화면 — 학생과 부모는 완전히 다른 여정.
 *   학생: 나의 INDEX(약 7분) · 학업과정 진단(약 5분) · FORUM 지원 진단(약 10분)
 *   부모: 자녀의 학습 방향(약 5분)
 * 예전 ?track= 주소도 그대로 열린다.
 */
const STUDENT = [
  { href: '/diagnosis/my-index', title: '나의 INDEX', text: '잘하는 것 · 어려운 것 · 오래 남은 장면 · 궁금한 것', meta: '약 7분 · 처음이라면 여기서' },
  { href: '/diagnosis/academic', title: '학업과정 진단', text: '과목 · 학습 상태 · 학습 환경 중심', meta: '초등 · 중등 · 고등 · 약 5분' },
  { href: '/diagnosis/forum', title: 'FORUM 지원 진단', text: '관심사 · 표현 · 만들고 싶은 것 중심', meta: 'THE TOTAL FORUM · 약 10분' },
];
const PARENT = [
  { href: '/diagnosis/parent', title: '자녀의 학습 방향 살펴보기', text: '학업 · 학습 환경 · 아이와 나눌 대화', meta: '약 5분 · 아이를 평가하지 않습니다' },
];

export function DiagnosisHub() {
  const params = useSearchParams();
  const router = useRouter();
  const track = params.get('track');
  const exit = () => router.push('/diagnosis');

  if (track === 'academic') return <Diagnosis onExit={exit} />;
  if (track === 'forum') return <ForumDiagnosis onExit={exit} />;

  return (
    <section className="hub" aria-labelledby="hub-title">
      <div className="frame">
        <div className="frame-main">
          <h2 className="frame-title" id="hub-title">
            누구의 진단인가요?
          </h2>
        </div>
        <div className="frame-side">
          <p>학생과 부모는 묻는 것이 다릅니다. 이름과 연락처는 묻지 않으며, 응답은 저장 · 전송되지 않습니다.</p>
        </div>
      </div>
      <div className="hub-cols">
        {[
          ['학생', STUDENT],
          ['부모', PARENT],
        ].map(([who, list]) => (
          <div key={who as string} className="hub-col">
            <h3 className="prg-branch">{who as string}</h3>
            <ul className="sp-list">
              {(list as typeof STUDENT).map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>
                    <span className="sp-label">{c.title}</span>
                    <span className="sp-meta">
                      {c.text}
                      <br />
                      {c.meta}
                    </span>
                    <span className="sp-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
