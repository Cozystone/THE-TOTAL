'use client';

import { useId, useState } from 'react';

/* 아코디언 — 질문 버튼(aria-expanded) + 답 영역. 여러 개를 함께 열 수 있다. */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const uid = useId();
  const [open, setOpen] = useState<Set<number>>(new Set());

  return (
    <ul className="accordion">
      {items.map((it, i) => {
        const on = open.has(i);
        return (
          <li key={it.q} data-open={on || undefined}>
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`${uid}-${i}`}
                id={`${uid}-q${i}`}
                onClick={() => {
                  const next = new Set(open);
                  if (on) next.delete(i);
                  else next.add(i);
                  setOpen(next);
                }}
              >
                <span>{it.q}</span>
                <i aria-hidden="true" />
              </button>
            </h3>
            <div className="accordion-panel" id={`${uid}-${i}`} role="region" aria-labelledby={`${uid}-q${i}`} hidden={!on}>
              <p>{it.a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
