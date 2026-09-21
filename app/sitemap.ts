import type { MetadataRoute } from 'next';
import { siteContent } from './site-content';
import { sitemapUrls } from './indexable-routes.mjs';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteContent.publishing.ready) return [];
  return sitemapUrls(siteContent.brand.domain).map((url) => ({ url }));
}
