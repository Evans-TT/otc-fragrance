import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://otcfragrances.co.za/', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://otcfragrances.co.za/request-order', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
