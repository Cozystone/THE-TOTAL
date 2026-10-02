'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Diagnosis } from '@/components/Diagnosis';
import { ForumDiagnosis } from '@/components/ForumDiagnosis';

/*
 * 온라인 진단의 첫 화면 — 두 경로 중 하나를 고른다.
 * 경로는 주소에 남는다(/diagnosis?track=academic | forum). FORUM 페이지의 버튼은 곧바로 forum 경로로 온다.
 */
export function DiagnosisHub() {
  const params = useSearchParams();
  const router = useRouter();
  const track = params.get('track');
  const exit = () => router.push('/diagnosis');

  if (track === 'academic') return <Diagnosis onExit={exit} />;
  if (track === 'forum') return <ForumDiagnosis onExit={exit} />;

  return (
    <section className="dx" aria-labelledby="hub-title">
      <h2 className="dx-title" id="hub-title">
        어떤 진단을 시작할까요?
      </h2>
      <p className="dx-lead">두 진단은 묻는 것이 다릅니다. 지원하려는 과정에 맞는 진단을 골라 주세요.</p>

      <ul className="tracks-choice">
        <li>
          <Link href="/diagnosis?track=academic">
            <span className="choice-kicker">ACADEMIC</span>
            <span className="choice-title">학업과정 진단</span>
            <span className="choice-text">학습 상태, 과목별 필요, 목표와 수업 방식을 확인합니다.</span>
            <span className="choice-meta">초등 · 중등 · 고등 과정 · 약 5분</span>
            <span className="choice-go">
              시작하기 <span aria-hidden="true">→</span>
            </span>
          </Link>
        </li>
        <li>
          <Link href="/diagnosis?track=forum">
            <span className="choice-kicker">FORUM</span>
            <span className="choice-title">FORUM 지원 진단</span>
            <span className="choice-text">
              관심사, 생각의 방식, 표현하고 싶은 것,
              <br />
              앞으로 만들고 싶은 작업을 확인합니다.
            </span>
            <span className="choice-meta">THE TOTAL FORUM · 약 10분</span>
            <span className="choice-go">
              시작하기 <span aria-hidden="true">→</span>
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
