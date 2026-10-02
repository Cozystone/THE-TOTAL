import type { Metadata } from 'next';
import { ObjectPage } from '@/components/ObjectPage';

export const metadata: Metadata = { title: 'THE INDEX' };

export default function Page() {
  return <ObjectPage slug="the-index" />;
}
