import type { Metadata } from 'next';
import { siteContent } from './site-content';

const activeBase = siteContent.publishing.ready ? siteContent.brand.domain : siteContent.publishing.localBaseUrl;
// Imagen compartida por todas las páginas. La base sale del dominio comercial
// normalizado, así que sirve igual para la raíz y para /automatizacion/.
const socialImage = new URL('images/automatizacion-flujo.webp', activeBase.replace(/\/$/, '') + '/').toString();

export function socialMetadata(path: string, title: string, description: string, base = activeBase): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type: 'website', locale: 'es_ES', siteName: siteContent.brand.displayName,
      url: new URL(path, base.replace(/\/$/, '') + '/').toString(), title, description,
      images: [{ url: socialImage, width: 1536, height: 1024, alt: 'Ilustración de correos y datos que se conectan hasta convertirse en trabajo organizado.' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [socialImage] },
  };
}
