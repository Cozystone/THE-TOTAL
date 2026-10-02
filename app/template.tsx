import { Stage } from '@/components/Stage';

// 이동할 때마다 다시 붙는 무대 — 페이지 들어옴 연출을 매번 다시 시작한다.
export default function Template({ children }: { children: React.ReactNode }) {
  return <Stage>{children}</Stage>;
}
