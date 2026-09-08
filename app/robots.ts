import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://otcfragrances.co.za/sitemap.xml',
    host: 'https://otcfragrances.co.za',
  };
}
