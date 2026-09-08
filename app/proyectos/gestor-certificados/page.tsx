/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { Icon } from '../../icons';
import { certificateProject as project } from '../../project-content';
import { siteContent, withBasePath } from '../../site-content';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Gestor de Certificados — proyecto propio',
  description: project.description,
  alternates: {
    canonical: new URL('proyectos/gestor-certificados/', (siteContent.publishing.ready ? siteContent.brand.domain : siteContent.publishing.localBaseUrl).replace(/\/$/, '') + '/').toString(),
  },
};

export default function CertificateProjectPage() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header project-header">
        <div className="shell header-inner">
          <a className="wordmark" href={withBasePath('/')} aria-label="Innure, volver al inicio">
            <img className="brand-logo" src={withBasePath('/images/innure-logo-white.png')} alt="Innure" width="112" height="28" />
            <small>Automatización e IA</small>
          </a>
          <a className="text-link" href={withBasePath('/#proyectos')}>← Volver a los proyectos</a>
        </div>
      </header>
      <main id="contenido">
        <section className="shell project-hero" aria-labelledby="project-title">
          <p className="eyebrow">{project.category} · Windows</p>
          <p className="project-product-name">{project.name}</p>
          <h1 id="project-title">Elegir el certificado correcto no debería frenar un trámite.</h1>
          <p className="project-lede">{project.description}</p>
          <div className="hero-actions">
            <a className="button" href={withBasePath('/#contacto')}>Quiero saber si encaja en mi despacho <Icon name="arrow" /></a>
            <p className="project-stage">En validación · Sin descarga pública</p>
          </div>
        </section>
        <figure className="shell project-large-figure">
          <a href={withBasePath(project.image)} target="_blank" rel="noreferrer" aria-label="Ampliar la captura del Gestor de Certificados (se abre en otra pestaña)">
            <img src={withBasePath(project.image)} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} fetchPriority="high" />
          </a>
          <figcaption>Captura de desarrollo con certificados y datos sintéticos. No contiene información de clientes reales. <a href={withBasePath(project.image)} target="_blank" rel="noreferrer">Ampliar captura ↗</a></figcaption>
        </figure>
        <section className="shell project-capabilities section-space" aria-labelledby="capabilities-title">
          <div className="section-heading">
            <div><p className="eyebrow">Un problema concreto, una herramienta concreta</p><h2 id="capabilities-title">Menos búsqueda.<br />Más orden en el despacho.</h2></div>
            <p>Partimos de una tarea repetida: encontrar el certificado de un cliente y continuar con su trámite sin perder el contexto.</p>
          </div>
          <ol className="project-feature-list" role="list">
            {project.features.map((feature, index) => <li key={feature.title}><span className="step-number">0{index + 1}</span><h3>{feature.title}</h3><p>{feature.description}</p></li>)}
          </ol>
          <div className="project-boundaries">
            <div><h3>Los certificados se quedan en Windows.</h3><p>La aplicación consulta el almacén del usuario. No custodia certificados en la nube ni exporta sus claves privadas.</p></div>
            <div><h3>Primero, comprobar el entorno.</h3><p>El producto sigue en validación. La instalación y los trámites de cada despacho deben comprobarse antes de ofrecer un piloto; no prometemos compatibilidad con todas las sedes.</p></div>
          </div>
        </section>
        <section className="project-bottom-cta">
          <div className="shell"><div><p className="eyebrow">También podemos construir para tu negocio</p><h2>¿Tienes una tarea así<br />de repetitiva?</h2></div><a className="button" href={withBasePath('/#contacto')}>Cuéntanos tu caso <Icon name="arrow" /></a></div>
        </section>
      </main>
      <footer className="site-footer"><div className="shell footer-bottom"><a href={withBasePath('/#proyectos')}>← Todos los proyectos</a><nav aria-label="Información legal"><a href={withBasePath('/aviso-legal/')}>Aviso legal</a><a href={withBasePath('/privacidad/')}>Privacidad</a></nav><a href={'mailto:' + siteContent.contact.emailHref}>{siteContent.contact.email}</a></div></footer>
    </>
  );
}
