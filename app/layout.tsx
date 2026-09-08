import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://otcfragrance.co.za'),
  title: { default: 'OTC Fragrances | Premium Dubai Fragrances in South Africa', template: '%s | OTC Fragrances' },
  description: 'Discover premium Dubai fragrances in South Africa. Explore Osma perfumes, curated collections and gift sets, then request your order directly from OTC Fragrances.',
  keywords: ['Dubai fragrances South Africa', 'Osma perfume South Africa', 'premium perfume', 'OTC Fragrances'],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://otcfragrance.co.za',
    siteName: 'OTC Fragrances',
    title: 'OTC Fragrances | Premium Dubai Fragrances in South Africa',
    description: 'Discover Osma fragrances and curated Dubai perfume collections, available by request in South Africa.',
  },
  twitter: {
    card: 'summary',
    title: 'OTC Fragrances | Dubai to South Africa',
    description: 'Premium Dubai fragrances, available by request in South Africa.',
  },
  icons: { icon: '/favicon.svg', apple: '/assets/otc-logo.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OTC Fragrances',
    url: 'https://otcfragrance.co.za',
    email: 'info@otcfragrances.co.za',
    description: 'South African importer and reseller of premium fragrances sourced from Dubai.',
    areaServed: { '@type': 'Country', name: 'South Africa' },
  };

  return (
    <html lang="en-ZA">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
