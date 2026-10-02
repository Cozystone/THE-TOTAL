import Link from 'next/link';
import { DOORS } from '@/lib/copy';

/* 학생 / 부모 — 가장 강한 두 입구. 이름 아래 짧은 보조 문구. */
export function Doors({ className }: { className?: string }) {
  return (
    <div className={`doors${className ? ` ${className}` : ''}`}>
      {DOORS.map((d, i) => (
        <Link key={d.href} className={`cta door ${i === 0 ? 'cta-solid' : 'cta-line'}`} href={d.href}>
          <span className="door-text">
            <span className="door-label">{d.label}</span>
            <span className="door-sub">{d.sub}</span>
          </span>
          <span className="door-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
