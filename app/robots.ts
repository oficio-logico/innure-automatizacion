import type { MetadataRoute } from 'next';
import { siteContent } from './site-content';

export default function robots(): MetadataRoute.Robots {
  if (!siteContent.publishing.ready) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: new URL('sitemap.xml', siteContent.brand.domain).toString(),
  };
}
