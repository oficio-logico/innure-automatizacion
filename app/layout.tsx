import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteContent, withBasePath } from './site-content';
import { socialMetadata } from './social-metadata';

const metadataBaseUrl = siteContent.publishing.ready
  ? siteContent.brand.domain
  : siteContent.publishing.localBaseUrl;

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
  ...socialMetadata('', siteContent.seo.title, siteContent.seo.description),
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
        {process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN ? <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={JSON.stringify({ token: process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN })} /> : null}
      </body>
    </html>
  );
}
