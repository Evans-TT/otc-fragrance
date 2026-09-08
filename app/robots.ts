import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://otcfragrance.co.za/sitemap.xml',
    host: 'https://otcfragrance.co.za',
  };
}
