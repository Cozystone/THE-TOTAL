'use client';

import { Journey } from '@/components/Journey';
import { STUDENT_STEPS } from '@/lib/journeys/student';
import { STORE } from '@/lib/journeys/types';

/* 학생 — 나의 INDEX(8단계, 약 7분). 결과는 /diagnosis/result/my-index */
export function StudentIndex() {
  return (
    <Journey
      steps={STUDENT_STEPS}
      storeKey={STORE.student}
      resultHref="/diagnosis/result/my-index"
      startLabel="나의 INDEX 시작하기"
      intro={
        <div className="jr-intro">
          <p className="dx-lead">
            성적표만으로는 알 수 없는 지금을 살펴봅니다.
            <br />
            잘하는 것, 어려운 것, 오래 남은 장면과
            <br />
            앞으로 궁금한 것을 차례로 정리합니다.
          </p>
          <p className="dx-lead jr-strong">정답은 없습니다.</p>
          <ol className="dx-outline">
            <li>학년 · 잘 풀리는 공부 · 막히는 곳</li>
            <li>집중되는 방식</li>
            <li>오래 남은 장면 · 더 알고 싶은 것</li>
            <li>대신 정해진 것 같은 선택 · 다음 90일</li>
          </ol>
          <p className="jr-privacy">8단계 · 약 7분 · 이름과 연락처는 묻지 않습니다 · 응답은 이 브라우저 안에서만 쓰이고 서버로 보내지 않습니다.</p>
        </div>
      }
    />
  );
}
