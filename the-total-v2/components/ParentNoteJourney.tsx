'use client';

import { Journey } from '@/components/Journey';
import { PARENT_STEPS } from '@/lib/journeys/parent';
import { STORE } from '@/lib/journeys/types';

/* 부모 — 자녀의 학습 방향 살펴보기(5단계, 약 5분). 결과는 /diagnosis/result/parent-note */
export function ParentNoteJourney() {
  return (
    <Journey
      steps={PARENT_STEPS}
      storeKey={STORE.parent}
      resultHref="/diagnosis/result/parent-note"
      startLabel="자녀의 학습 방향 살펴보기"
      intro={
        <div className="jr-intro">
          <p className="dx-lead">
            아이를 평가하는 질문이 아닙니다.
            <br />
            학업, 학습 환경, 아이가 움직이는 방식을 차례로 보며
            <br />
            지금 함께 살펴볼 것을 정리합니다.
          </p>
          <ol className="dx-outline">
            <li>자녀의 학년</li>
            <li>함께 보고 싶은 부분</li>
            <li>지금의 학습 환경</li>
            <li>아이가 스스로 움직이는 순간 · 나누고 싶은 대화</li>
          </ol>
          <p className="jr-privacy">5단계 · 약 5분 · 이름과 연락처는 묻지 않습니다 · 응답은 이 브라우저 안에서만 쓰이고 서버로 보내지 않습니다.</p>
        </div>
      }
    />
  );
}
