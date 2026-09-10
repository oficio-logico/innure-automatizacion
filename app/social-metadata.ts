import type { Metadata } from 'next';
import { siteContent } from './site-content';

const activeBase = siteContent.publishing.ready ? siteContent.brand.domain : siteContent.publishing.localBaseUrl;
const socialImage = new URL('images/automatizacion-flujo.webp', activeBase.replace(/\/$/, '') + '/').toString();

export function socialMetadata(path: string, title: string, description: string, base = activeBase): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type: 'website', locale: 'es_ES', siteName: siteContent.brand.displayName,
      url: new URL(path, base.replace(/\/$/, '') + '/').toString(), title, description,
      images: [{ url: socialImage, width: 1536, height: 1024, alt: 'Correos y datos conectados con tareas organizadas para ahorrar tiempo.' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [socialImage] },
  };
}
