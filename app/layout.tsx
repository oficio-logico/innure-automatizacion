import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteContent, withBasePath } from './site-content';

const metadataBaseUrl = siteContent.publishing.ready
  ? siteContent.brand.domain
  : siteContent.publishing.localBaseUrl;
const socialImageUrl = new URL(
  'images/automatizacion-flujo.webp',
  `${metadataBaseUrl.replace(/\/$/, '')}/`,
).toString();

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: {
    default: siteContent.seo.title,
    template: `%s | ${siteContent.brand.displayName}`,
  },
  description: siteContent.seo.description,
  applicationName: siteContent.brand.displayName,
  icons: { icon: [{ url: (process.env.NEXT_PUBLIC_BASE_PATH || '') + '/innure-favicon.png', type: 'image/png' }] },
  category: 'business',
  alternates: {
    canonical: metadataBaseUrl.replace(/\/$/, '') + '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    siteName: siteContent.brand.displayName,
    images: [
      {
        url: socialImageUrl,
        width: 1536,
        height: 1024,
        alt: 'Correos y datos conectados con tareas organizadas para ahorrar tiempo.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    images: [socialImageUrl],
  },
  robots: {
    index: siteContent.publishing.ready,
    follow: siteContent.publishing.ready,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d1720',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}
        {siteContent.advertising.conversionDestination ? <script src={withBasePath('/lead-measurement.js') + '?v=' + (process.env.NEXT_PUBLIC_MEASUREMENT_VERSION || '2')} data-conversion={siteContent.advertising.conversionDestination} defer /> : null}
      </body>
    </html>
  );
}
