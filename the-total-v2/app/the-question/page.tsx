import type { Metadata } from 'next';
import { ObjectPage } from '@/components/ObjectPage';

export const metadata: Metadata = { title: 'THE QUESTION' };

export default function Page() {
  return <ObjectPage slug="the-question" />;
}
