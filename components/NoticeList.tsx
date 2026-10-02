'use client';

import { useEffect, useState } from 'react';
import { NOTICE_TYPES, type Notice, type NoticeType } from '@/lib/notices';
import { formatDay } from '@/lib/schedule';

/* 공지 목록 — 유형 필터 + 제목을 누르면 본문(아코디언). 주소의 #id 로 들어오면 그 공지를 연다. */
export function NoticeList({ notices }: { notices: Notice[] }) {
  const [type, setType] = useState<'all' | NoticeType>('all');
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || !notices.some((n) => n.id === id)) return;
    const t = window.setTimeout(() => {
      setOpen(id);
      document.getElementById(id)?.scrollIntoView({ block: 'center' });
    }, 0);
    return () => window.clearTimeout(t);
  }, [notices]);

  const shown = notices.filter((n) => type === 'all' || n.type === type);

  return (
    <>
      <div className="filter" role="group" aria-label="공지 유형">
        {(['all', ...Object.keys(NOTICE_TYPES)] as ('all' | NoticeType)[]).map((t) => (
          <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)}>
            {t === 'all' ? '전체' : NOTICE_TYPES[t]}
          </button>
        ))}
      </div>

      <ul className="notices">
        {shown.map((n) => {
          const on = open === n.id;
          return (
            <li key={n.id} id={n.id} data-open={on || undefined}>
              <button type="button" aria-expanded={on} aria-controls={`${n.id}-body`} onClick={() => setOpen(on ? null : n.id)}>
                <span className="notice-type">{NOTICE_TYPES[n.type]}</span>
                <span className="notice-title">{n.title}</span>
                <span className="notice-date">{formatDay(n.date, true)}</span>
              </button>
              <div className="notice-body" id={`${n.id}-body`} hidden={!on}>
                <p>{n.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {shown.length === 0 && <p className="schedule-empty">해당 유형의 공지가 없습니다.</p>}
    </>
  );
}
