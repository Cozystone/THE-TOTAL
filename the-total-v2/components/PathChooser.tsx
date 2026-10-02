'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PATHS, type Audience } from '@/lib/entry';

/* 학생 / 부모 경로 — 고르면 다섯 걸음이 바뀐다. 각 걸음은 실제 페이지로 이어진다. */
export function PathChooser() {
  const [who, setWho] = useState<Audience>('student');
  const path = PATHS[who];

  return (
    <div className="path">
      <div className="path-choose" role="group" aria-label="누구의 길인가요">
        {(Object.keys(PATHS) as Audience[]).map((k) => (
          <button key={k} type="button" aria-pressed={who === k} onClick={() => setWho(k)}>
            {PATHS[k].label}
          </button>
        ))}
      </div>
      <p className="path-lead" aria-live="polite">
        {path.lead}
      </p>
      <ol className="path-steps">
        {path.steps.map((s, i) => (
          <li key={s.title}>
            <span className="path-no">{String(i + 1).padStart(2, '0')}</span>
            <span className="path-title">{s.title}</span>
            {s.href ? (
              <Link className="path-link" href={s.href}>
                {s.cta} <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <span className="path-note">{i === 3 ? '진단 · 시험을 함께 검토한 뒤' : '설계안 확인 후'}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
