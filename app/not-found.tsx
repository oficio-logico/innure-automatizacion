/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { siteContent, withBasePath } from './site-content';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  description: 'Vuelve a los servicios y proyectos de Innure Automatización o cuéntanos qué necesitas.',
  robots: { index: false, follow: true },
  alternates: { canonical: null }, openGraph: null, twitter: null,
};

export default function NotFound() {
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header project-header"><div className="shell header-inner">
      <a className="wordmark" href={withBasePath('/')} aria-label="Innure, volver al inicio">
        <img className="brand-logo" src={withBasePath('/images/innure-logo-white.png')} alt="Innure" width="112" height="28" />
        <small>Automatización e IA</small>
      </a>
    </div></header>
    <main className="shell not-found-page" id="contenido" tabIndex={-1}>
      <p className="eyebrow">Error 404 · Página no encontrada</p>
      <h1>Por aquí no era.</h1>
      <p className="project-lede">Puede que el enlace haya cambiado o que la dirección no esté bien escrita. Te ayudamos a encontrar lo que buscabas.</p>
      <nav className="hero-actions" aria-label="Continuar en Innure">
        <a className="button" href={withBasePath('/')}>Volver a Automatización</a>
        <a className="text-link" href={withBasePath('/#proyectos')}>Ver proyectos</a>
        <a className="text-link" href={withBasePath('/#contacto')}>Cuéntanos tu caso</a>
      </nav>
      <p className="hero-note">También puedes escribirnos a <a href={'mailto:' + siteContent.contact.emailHref}>{siteContent.contact.email}</a>.</p>
    </main>
  </>;
}
