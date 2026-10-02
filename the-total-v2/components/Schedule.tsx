'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import {
  COURSES,
  SESSIONS,
  STATUS,
  formatDay,
  formatShort,
  statusOf,
  toKey,
  type CourseId,
  type Session,
  type Status,
  type Ymd,
} from '@/lib/schedule';

/*
 * 입학 일정 — 달력 + 일정 카드.
 *  - 상태는 lib/schedule.ts 의 데이터에서 계산(접수 예정 · 접수 중 · 신청 마감 · 대기 접수 · 일정 준비 중).
 *  - 날짜를 누르면 아래 카드가 그날의 회차(과정 · 온라인 시험 여부 · 신청 상태 · 안내 버튼)로 바뀐다.
 *  - 달을 바꾸면 선택을 지우고 그달의 회차 목록을 보여준다(이전 달 선택이 남던 문제 수정).
 *  - filter 가 있으면 전체/초등/중등/고등으로 거른다.
 * 상태는 색만이 아니라 글자로도 표시한다.
 */
const WEEK = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS_BACK = 1;
const MONTHS_AHEAD = 6;

type Filter = 'all' | CourseId;

export function Schedule({ today, withFilter = false, compact = false }: { today: Ymd; withFilter?: boolean; compact?: boolean }) {
  const uid = useId();
  const todayKey = toKey(today);
  const [view, setView] = useState({ y: today.y, m: today.m });
  const [picked, setPicked] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const offset = (view.y - today.y) * 12 + (view.m - today.m);
  const move = (delta: number) => {
    const idx = view.y * 12 + (view.m - 1) + delta;
    setView({ y: Math.floor(idx / 12), m: (idx % 12) + 1 });
    setPicked(null); // 달이 바뀌면 이전 선택을 지운다
  };

  const sessions = useMemo(
    () => SESSIONS.filter((s) => filter === 'all' || s.course === filter),
    [filter],
  );
  const byDate = useMemo(() => {
    const map = new Map<string, Session[]>();
    for (const s of sessions) map.set(s.date, [...(map.get(s.date) ?? []), s]);
    return map;
  }, [sessions]);

  const monthPrefix = `${view.y}-${String(view.m).padStart(2, '0')}-`;
  const monthSessions = sessions.filter((s) => s.date.startsWith(monthPrefix)).sort((a, b) => a.date.localeCompare(b.date));

  const first = new Date(Date.UTC(view.y, view.m - 1, 1)).getUTCDay();
  const days = new Date(Date.UTC(view.y, view.m, 0)).getUTCDate();
  const cells: (number | null)[] = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);

  const shown = picked ? (byDate.get(picked) ?? []) : monthSessions;

  return (
    <div className={`schedule${compact ? ' schedule-compact' : ''}`}>
      {withFilter && (
        <div className="filter" role="group" aria-label="과정별 보기">
          {(['all', 'elementary', 'middle', 'high'] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => {
                setFilter(f);
                setPicked(null);
              }}
            >
              {f === 'all' ? '전체' : COURSES[f].short}
            </button>
          ))}
        </div>
      )}

      <div className="calendar">
        <div className="calendar-head">
          <button type="button" onClick={() => move(-1)} disabled={offset <= -MONTHS_BACK} aria-label="이전 달">
            ‹
          </button>
          <h3 className="calendar-title" id={`${uid}-title`} aria-live="polite">
            {view.y}년 {view.m}월
          </h3>
          <button type="button" onClick={() => move(1)} disabled={offset >= MONTHS_AHEAD} aria-label="다음 달">
            ›
          </button>
        </div>

        <table aria-labelledby={`${uid}-title`}>
          <thead>
            <tr>
              {WEEK.map((w) => (
                <th key={w} scope="col">
                  {w}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: cells.length / 7 }, (_, r) => (
              <tr key={r}>
                {cells.slice(r * 7, r * 7 + 7).map((n, c) => {
                  if (!n) return <td key={c} />;
                  const key = `${monthPrefix}${String(n).padStart(2, '0')}`;
                  const list = byDate.get(key) ?? [];
                  const statuses = list.map((s) => statusOf(s, todayKey));
                  const top = statuses.sort((a, b) => STATUS[a].order - STATUS[b].order)[0];
                  const label = `${view.m}월 ${n}일 ${WEEK[c]}요일${
                    list.length ? `, 입학시험 ${list.length}건 — ${list.map((s) => `${COURSES[s.course].short} ${STATUS[statusOf(s, todayKey)].label}`).join(', ')}` : ''
                  }`;
                  return (
                    <td key={c}>
                      <button
                        type="button"
                        className="day"
                        data-past={key < todayKey || undefined}
                        data-today={key === todayKey || undefined}
                        data-status={top}
                        aria-pressed={picked === key}
                        aria-current={key === todayKey ? 'date' : undefined}
                        aria-label={label}
                        onClick={() => setPicked(picked === key ? null : key)}
                      >
                        <span>{n}</span>
                        {top && <i className="mark" aria-hidden="true" />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="legend" aria-label="상태 표시">
          {(['open', 'upcoming', 'waitlist', 'closed', 'preparing'] as Status[]).map((s) => (
            <li key={s} data-status={s}>
              <i className="mark" aria-hidden="true" />
              {STATUS[s].label}
            </li>
          ))}
        </ul>
      </div>

      <div className="schedule-card" aria-live="polite">
        <p className="schedule-card-head">
          {picked ? formatDay(picked) : `${view.m}월 입학시험`}
          {picked && (
            <button type="button" className="text-button" onClick={() => setPicked(null)}>
              {view.m}월 전체 보기
            </button>
          )}
        </p>

        {shown.length === 0 ? (
          <p className="schedule-empty">
            {picked ? '이 날짜에는 예정된 입학시험이 없습니다.' : '이달에 공지된 입학시험이 없습니다.'}
          </p>
        ) : (
          <ul className="sessions">
            {shown.map((s) => {
              const st = statusOf(s, todayKey);
              return (
                <li key={s.id}>
                  <div className="session-main">
                    <span className="badge" data-status={st}>
                      {STATUS[st].label}
                    </span>
                    <span className="session-title">
                      {COURSES[s.course].label} {s.round}
                    </span>
                  </div>
                  <dl className="session-meta">
                    <div>
                      <dt>시험일</dt>
                      <dd>
                        {formatDay(s.date)}
                        {s.time ? ` ${s.time}` : ''}
                      </dd>
                    </div>
                    <div>
                      <dt>방식</dt>
                      <dd>{s.online ? '온라인 시험' : '대면 시험'}</dd>
                    </div>
                    <div>
                      <dt>접수</dt>
                      <dd>
                        {s.applyOpen && s.applyClose
                          ? `${formatShort(s.applyOpen)} – ${formatShort(s.applyClose)}`
                          : '일정 준비 중'}
                      </dd>
                    </div>
                  </dl>
                  <Link className="session-link" href="/admissions#guide">
                    {st === 'preparing' ? '일정 문의하기' : st === 'closed' ? '다음 회차 안내 받기' : '응시 안내 받기'}
                    <span aria-hidden="true"> →</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
