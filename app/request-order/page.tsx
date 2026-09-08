import type { Metadata } from 'next';
import { RequestForm } from './request-form';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Request an Order',
  description: 'Select the Osma fragrances and collections that interest you, then send a direct order request to OTC Fragrances.',
  alternates: { canonical: '/request-order' },
};

export default function RequestOrderPage() {
  return <RequestForm />;
}
