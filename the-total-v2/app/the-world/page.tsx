import type { Metadata } from 'next';
import { ObjectPage } from '@/components/ObjectPage';

export const metadata: Metadata = { title: 'THE WORLD' };

export default function Page() {
  return <ObjectPage slug="the-world" />;
}
