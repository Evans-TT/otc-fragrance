import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://otcfragrance.co.za/', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://otcfragrance.co.za/request-order', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
