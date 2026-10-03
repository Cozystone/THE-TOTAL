/* 과정 이름 — 초등 · 중등 · 고등. */
export type CourseId = 'elementary' | 'middle' | 'high';

export const COURSES: Record<CourseId, { label: string; short: string }> = {
  elementary: { label: '초등과정', short: '초등' },
  middle: { label: '중등과정', short: '중등' },
  high: { label: '고등과정', short: '고등' },
};
