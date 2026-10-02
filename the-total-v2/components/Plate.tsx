import type { Figure, Tone } from '@/lib/copy';

/*
 * 플레이트 — 사진 · 영상이 들어갈 자리이자, 지금은 그 자체로 하나의 장면.
 * 단색 톤 + 필름 그레인 + 선 하나의 기하(지평선 · 창 · 격자 · 호).
 * 실제 사진/영상이 정해지면 `media` 로 넣는다 — 그레인과 캡션은 그대로 위에 얹힌다.
 * 생성 이미지는 쓰지 않는다.
 */
export function Plate({
  tone = 'ink',
  figure = 'none',
  ratio = '4 / 5',
  label,
  caption,
  media,
  className = '',
  priority = false,
}: {
  tone?: Tone;
  figure?: Figure | 'none';
  ratio?: string;
  label?: string;
  caption?: string;
  media?: { src: string; alt: string; video?: boolean };
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`plate plate-${tone} ${className}`} style={{ aspectRatio: ratio }} data-figure={figure}>
      {media &&
        (media.video ? (
          <video className="plate-media" src={media.src} autoPlay muted loop playsInline aria-label={media.alt} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="plate-media" src={media.src} alt={media.alt} loading={priority ? 'eager' : 'lazy'} />
        ))}
      <span className="plate-figure" aria-hidden="true" />
      <span className="plate-grain" aria-hidden="true" />
      {(label || caption) && (
        <figcaption className="plate-caption">
          {label && <span className="plate-label">{label}</span>}
          {caption && <span>{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/** 페이지에 한 번만 — 그레인 필터 정의 */
export function GrainDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </svg>
  );
}
