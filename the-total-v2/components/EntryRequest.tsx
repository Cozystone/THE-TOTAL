'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NOT_OPEN } from '@/lib/entry';

/*
 * 입학시험 안내 요청 — 신청 · 연락처 저장 기능이 아직 없다.
 * 그래서 이름 · 연락처를 받는 척하지 않고, 누르면 지금의 상태(준비 중)를 그대로 보여준다.
 */
export function EntryRequest() {
  const [shown, setShown] = useState(false);
  return (
    <div className="er">
      <button type="button" className="cta cta-solid" aria-expanded={shown} aria-controls="er-status" onClick={() => setShown(true)}>
        입학시험 안내 요청 <span aria-hidden="true">→</span>
      </button>
      <div id="er-status" className="er-status" role="status">
        {shown && (
          <p>
            {NOT_OPEN}{' '}
            <Link href="/admissions">입학 안내 →</Link>
          </p>
        )}
      </div>
    </div>
  );
}
