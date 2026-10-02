/*
 * THE TOTAL 인장 — INSIGNIA / 01.
 *
 * 52 × 52 판, 중심 (26, 26). 같은 막대(길이 12.5 · 두께 4) 여섯 개를 30°부터 60° 간격으로 회전(위·아래 축이 수직).
 * 막대 안쪽 끝이 광선에 수직이므로 여섯 끝선이 변심거리 12.5 인 정육각형의 변 위에
 * 놓인다 — 그려지지 않은 육각형이 빈 중심이다. 막대 길이 = 변심거리.
 * 52px 로 그리면 수직 막대가 픽셀 격자(x 24–28)에 정확히 맞는다.
 * 선은 stroke 가 아니라 면(rect)이라 끝 처리·확대에 오차가 없다.
 */
const C = 26;
const INNER = 12.5; // 빈 육각형의 변심거리 = 막대 길이
const LENGTH = 12.5;
const WIDTH = 4;

export function Symbol({ size = 52, className, animate = false }: { size?: number; className?: string; animate?: boolean }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      {[30, 90, 150, 210, 270, 330].map((deg, i) => (
        <rect
          key={deg}
          className={animate ? 'symbol-arm' : undefined}
          style={animate ? { animationDelay: `${200 + i * 90}ms` } : undefined}
          x={C + INNER}
          y={C - WIDTH / 2}
          width={LENGTH}
          height={WIDTH}
          transform={`rotate(${deg} ${C} ${C})`}
        />
      ))}
    </svg>
  );
}
