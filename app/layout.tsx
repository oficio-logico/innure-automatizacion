import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteContent } from './site-content';

const metadataBaseUrl = siteContent.publishing.ready
  ? siteContent.brand.domain
  : siteContent.publishing.localBaseUrl;
const socialImageUrl = new URL(
  'images/hero-wall-blue.webp',
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
  category: 'business',
  alternates: {
    canonical: '/',
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
        width: siteContent.photography.hero.width,
        height: siteContent.photography.hero.height,
        alt: siteContent.photography.hero.alt,
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
  themeColor: '#ef4b2d',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
