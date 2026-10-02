import Link from 'next/link';
import { COURSES, STATUS, formatDay, formatShort, nextSessions, statusOf, toKey, type CourseId } from '@/lib/schedule';
import { NOT_SCHEDULED } from '@/lib/season';
import { seoulToday } from '@/lib/today';

/*
 * NEXT ENTRY — 다가오는 입학시험 회차. 상태는 데이터에서 계산(접수 중 · 접수 예정 · 마감 · 일정 준비 중).
 * 일정이 공지되지 않은 회차에는 날짜 대신 '일정 준비 중'만 쓴다.
 */
export function NextEntry({ count = 4, course }: { count?: number; course?: CourseId }) {
  const todayKey = toKey(seoulToday());
  const list = nextSessions(todayKey, count, course);

  if (list.length === 0)
    return (
      <p className="next-empty">
        <strong>{NOT_SCHEDULED.title}</strong>
        <br />
        {NOT_SCHEDULED.text}
      </p>
    );

  return (
    <ul className="next">
      {list.map((s) => {
        const st = statusOf(s, todayKey);
        return (
          <li key={s.id}>
            <div className="next-main">
              <span className="next-title">
                {COURSES[s.course].label} {s.round}
              </span>
              <span className="badge" data-status={st}>
                {STATUS[st].label}
              </span>
            </div>
            <p className="next-meta">
              {s.online ? '온라인 입학시험' : '입학시험'}
              <br />
              {formatDay(s.date)}
              {s.time ? ` ${s.time}` : ''}
              {s.applyOpen && s.applyClose && (
                <>
                  <br />
                  접수 {formatShort(s.applyOpen)} – {formatShort(s.applyClose)}
                </>
              )}
            </p>
            <Link className="next-cta" href={`/admissions/apply?session=${s.id}`}>
              응시 안내 받기 <span aria-hidden="true">→</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
