import type { MetadataRoute } from 'next';
import { siteContent } from './site-content';
import { indexableUrls } from './indexable-routes.mjs';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteContent.publishing.ready) return [];
  return indexableUrls(siteContent.brand.domain).map((url) => ({ url }));
}
