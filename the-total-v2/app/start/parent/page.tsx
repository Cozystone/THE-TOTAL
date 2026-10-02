import type { Metadata } from 'next';
import { StartPath } from '@/components/StartPath';

export const metadata: Metadata = { title: '부모님께' };

export default function StartParent() {
  return <StartPath who="parent" />;
}
