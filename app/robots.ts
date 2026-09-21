import type { MetadataRoute } from 'next';
import { siteContent } from './site-content';

export default function robots(): MetadataRoute.Robots {
  if (!siteContent.publishing.ready) {
    // Vista de revisión: se permite el rastreo para que los buscadores puedan
    // leer el noindex de cada página. No hay contenido privado ni sitemap.
    return {
      rules: {
        userAgent: '*',
        allow: '/',
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
