'use client';

import { useEffect, useRef } from 'react';

/*
 * 무음 캠페인 영상. 포스터(정지 이미지)가 먼저 보이고, 화면에 들어오면 재생, 나가면 멈춘다.
 * 동작 줄이기 설정이면 재생하지 않고 정지 이미지로 남는다.
 *
 * 휴대폰(iOS)의 재생 버튼을 보이지 않게:
 *  - React 는 muted 를 HTML 속성으로 쓰지 않는다 → 서버 HTML 에 muted 가 없으면 iOS 가 자동 재생을 막고 재생 버튼을 띄운다.
 *    그래서 ref 로 muted 속성 · 값을 직접 넣고 다시 재생한다.
 *  - 저전력 모드 등으로 자동 재생이 막히면 정지 이미지로 두고, 첫 터치 때 한 번 더 재생을 시도한다.
 *  - 기본 재생 버튼 · 컨트롤은 CSS(globals.css)로 숨기고, 영상은 터치를 받지 않는다(전체 화면 전환 방지).
 */
export function Film({ src, poster, label, className = '' }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.removeAttribute('autoplay');
      v.pause();
      return;
    }
    let visible = false;
    const play = () => {
      if (visible) v.play().catch(() => {});
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play();
      else v.pause();
    });
    io.observe(v);
    // 자동 재생이 막혔던 경우: 첫 터치 · 클릭에서 다시 시도
    const retry = () => play();
    window.addEventListener('touchstart', retry, { once: true, passive: true });
    window.addEventListener('pointerdown', retry, { once: true });
    return () => {
      io.disconnect();
      window.removeEventListener('touchstart', retry);
      window.removeEventListener('pointerdown', retry);
    };
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
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      preload="metadata"
      tabIndex={-1}
      aria-label={label}
    />
  );
}
