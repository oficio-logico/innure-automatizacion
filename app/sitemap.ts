import type { MetadataRoute } from 'next';
import { siteContent } from './site-content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteContent.publishing.ready
    ? siteContent.brand.domain
    : siteContent.publishing.localBaseUrl;

  return [
    { url: `${baseUrl}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/aviso-legal`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/privacidad`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
