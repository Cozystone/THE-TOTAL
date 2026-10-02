import type { Metadata } from 'next';
import { StartPath } from '@/components/StartPath';

export const metadata: Metadata = { title: '학생에게' };

export default function StartStudent() {
  return <StartPath who="student" />;
}
