'use client';

import { useEffect, useRef } from 'react';

/*
 * 무음 캠페인 영상. 포스터(정지 이미지)가 먼저 보이고, 화면에 들어오면 재생, 나가면 멈춘다.
 * 동작 줄이기 설정이면 재생하지 않고 정지 이미지로 남는다.
 */
export function Film({ src, poster, label, className = '' }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.removeAttribute('autoplay');
      v.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={`film ${className}`}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-label={label}
    />
  );
}
