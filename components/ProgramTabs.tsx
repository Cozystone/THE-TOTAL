'use client';

import { useRef, useSyncExternalStore } from 'react';
import { ReserveLink } from '@/components/SeasonDoor';
import type { CourseId } from '@/lib/courses';

/*
 * 과정 탭 — 초등 · 중등 · 고등을 한 번에 하나씩, 한 화면 안에.
 *  - 선택은 주소의 해시(#elementary · #middle · #high)를 따른다 → 홈의 과정 카드(/programs#middle)가 그대로 그 탭을 연다.
 *  - 해시와 같은 id 의 요소는 두지 않는다(브라우저가 그 자리로 스크롤하지 않게).
 *  - 키보드: ← → 로 탭 사이 이동, 이동하면 바로 선택. 바뀐 내용은 짧게(260ms) 들어온다.
 */
export type ProgramItem = { id: CourseId; label: string; line: [string, string]; who: string; read: string[]; way: string };

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
};

export function ProgramTabs({ items }: { items: ProgramItem[] }) {
  const ids = items.map((p) => p.id);
  const hash = useSyncExternalStore(subscribe, () => window.location.hash.slice(1), () => '');
  const active = (ids as string[]).includes(hash) ? (hash as CourseId) : ids[0];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (id: CourseId, focus = false) => {
    if (id !== active) {
      history.replaceState(null, '', `#${id}`);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
    if (focus) tabRefs.current[ids.indexOf(id)]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const i = ids.indexOf(active);
    if (e.key === 'ArrowRight') select(ids[(i + 1) % ids.length], true);
    else if (e.key === 'ArrowLeft') select(ids[(i - 1 + ids.length) % ids.length], true);
    else return;
    e.preventDefault();
  };

  const p = items.find((x) => x.id === active)!;
  return (
    <div className="ptabs">
      <div className="ptabs-list" role="tablist" aria-label="과정" onKeyDown={onKey}>
        {items.map((x, i) => (
          <button
            key={x.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${x.id}`}
            aria-selected={x.id === active}
            aria-controls={`panel-${x.id}`}
            tabIndex={x.id === active ? 0 : -1}
            onClick={() => select(x.id)}
          >
            {x.label}
          </button>
        ))}
      </div>

      <section key={p.id} className="ptabs-panel program" id={`panel-${p.id}`} role="tabpanel" aria-labelledby={`tab-${p.id}`}>
        <div className="program-head">
          <h2>{p.label}</h2>
          <p className="program-line">
            {p.line[0]}
            <br />
            {p.line[1]}
          </p>
        </div>
        <dl className="program-body">
          <div>
            <dt>대상</dt>
            <dd>{p.who}</dd>
          </div>
          <div>
            <dt>먼저 읽는 것</dt>
            <dd>
              <ul className="tags">
                {p.read.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>방향</dt>
            <dd>{p.way}</dd>
          </div>
          <div>
            <dt>입학평가</dt>
            <dd className="actions">
              <ReserveLink />
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
