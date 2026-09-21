/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { getProject, projectCatalog, type ProjectCase } from './project-catalog';
import { Icon } from './icons';
import { siteContent, withBasePath } from './site-content';
import { socialMetadata } from './social-metadata';

export function projectMetadata(slug?: string): Metadata {
  const project = slug ? getProject(slug) : null;
  const title = project ? `${project.name} — proyecto de innure` : 'Proyectos de software y automatización';
  const description = project?.summary || 'Explora aplicaciones, automatizaciones y herramientas construidas por el equipo de innure. Capturas, recorridos y estado de cada proyecto.';
  const route = `proyectos/${slug ? `${slug}/` : ''}`;
  const base = siteContent.publishing.ready ? siteContent.brand.domain : siteContent.publishing.localBaseUrl;
  return { title, description, ...socialMetadata(route, `${title} | innure`, description), alternates: { canonical: new URL(route, base.replace(/\/$/, '') + '/').toString() } };
}

export function ProjectHeader() {
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><header className="site-header project-header"><div className="shell header-inner">
    <a className="wordmark" href={withBasePath('/')} aria-label="innure, volver al inicio"><img className="brand-logo" src={withBasePath('/images/innure-logo-white.png')} alt="innure" width="112" height="28" /><small>{siteContent.brand.statusLabel}</small></a>
    <nav className="project-nav" aria-label="Navegación del portfolio"><a href={withBasePath('/proyectos/')}>Proyectos</a><a href={withBasePath('/#equipo')}>El equipo</a><a className="button button-small header-cta" href={withBasePath('/#contacto')}>Hablemos <Icon name="arrow" /></a></nav>
  </div></header></>;
}

export function ProjectFooter() {
  return <footer className="site-footer"><div className="shell footer-bottom"><a href={withBasePath('/')}>innure · {siteContent.brand.statusLabel}</a><nav aria-label="Información legal"><a href={withBasePath('/aviso-legal/')}>Aviso legal</a><a href={withBasePath('/privacidad/')}>Privacidad</a>{siteContent.advertising.conversionDestination ? <button type="button" className="measurement-settings" data-automation-measurement>Configurar medición</button> : null}</nav><a href={'mailto:' + siteContent.contact.emailHref}>{siteContent.contact.email}</a></div></footer>;
}

export function ProcessPreview({ project }: { project: ProjectCase }) {
  return <div className="case-process-preview"><span className="case-visual-label">El proceso, de principio a fin</span><ol>{project.steps.map((step, i) => <li key={step.title}><span aria-hidden="true">0{i + 1}</span><strong>{step.title}</strong><Icon name={i === 2 ? 'check' : 'arrow'} /></li>)}</ol><span className="case-visual-note">Esquema del flujo · No es una captura de interfaz</span></div>;
}

export function CaseCard({ project }: { project: ProjectCase }) {
  const cover = project.images[0];
  return <article className={'case-card case-card-' + project.slug}>
    <a className="case-card-visual" href={withBasePath(`/proyectos/${project.slug}/`)} aria-label={`Ver el proyecto ${project.name}`}>
      {cover ? <img src={withBasePath(cover.src)} alt={cover.alt} width={cover.width} height={cover.height} loading="lazy" /> : <ProcessPreview project={project} />}
      {project.slug === 'forja' && project.images[1] ? <img src={withBasePath(project.images[1].src)} alt={project.images[1].alt} width={600} height={1300} loading="lazy" /> : null}
    </a>
    <div className="case-card-body"><p className="project-category">{project.category}</p><h3><a href={withBasePath(`/proyectos/${project.slug}/`)}>{project.name}</a></h3><p>{project.summary}</p>
      <div className="case-card-bottom"><span>{project.status}</span><a className="text-link" href={withBasePath(`/proyectos/${project.slug}/`)}>Ver proyecto <Icon name="arrow" /><span className="sr-only">: {project.name}</span></a></div>
    </div>
  </article>;
}

export function ProjectCatalogPage() {
  return <><ProjectHeader /><main id="contenido" className="case-catalog">
    <section className="shell case-catalog-intro"><p className="eyebrow">Portfolio · innure</p><h1>Ideas que ya<br />puedes ver.</h1><div className="case-intro-bottom"><p>Aplicaciones, automatizaciones y herramientas nacidas de problemas concretos. Descubre qué hemos construido, cómo funciona y en qué punto está.</p><a className="text-link" href={withBasePath('/#contacto')}>Cuéntanos qué necesitas <Icon name="arrow" /></a></div></section>
    <section className="shell case-catalog-list" aria-labelledby="catalog-list-title"><h2 id="catalog-list-title" className="sr-only">Proyectos del equipo</h2><div className="case-grid">{projectCatalog.map(project => <CaseCard key={project.slug} project={project} />)}</div></section>
    <section className="case-closing"><div className="shell"><p className="eyebrow">No hace falta que tu proyecto se parezca a estos.</p><h2>Empecemos por lo que<br />te complica el día.</h2><a className="button" href={withBasePath('/#contacto')}>Revisar mi caso <Icon name="arrow" /></a></div></section>
  </main><ProjectFooter /></>;
}

export function ProjectDetail({ slug }: { slug: string }) {
  const project = getProject(slug);
  const related = projectCatalog.filter(p => p.slug !== slug).slice(0, 2);
  return <><ProjectHeader /><main id="contenido">
    <section className="shell case-hero"><a className="case-back" href={withBasePath('/proyectos/')}>← Todos los proyectos</a><div className="case-hero-grid"><div><p className="eyebrow">{project.category}</p><p className="case-name">{project.name}</p><h1>{project.headline}</h1></div><div className="case-hero-summary"><p>{project.summary}</p><dl><div><dt>Plataforma</dt><dd>{project.platform}</dd></div><div><dt>Estado</dt><dd>{project.status}</dd></div></dl>{project.demo ? <a className="button" href={project.demo.href} target="_blank" rel="noreferrer">{project.demo.label}<span aria-hidden="true">↗</span></a> : null}</div></div></section>
    <section className="shell case-gallery" aria-label={`Imágenes y recorrido de ${project.name}`}>
      {project.images.length ? project.images.map((item, index) => <figure key={item.src} className={item.height > item.width * 1.6 ? 'case-gallery-portrait' : ''}><a href={withBasePath(item.src)} target="_blank" rel="noreferrer" aria-label={`Ampliar imagen ${index + 1} de ${project.name} (nueva pestaña)`}><img src={withBasePath(item.src)} alt={item.alt} width={item.width} height={item.height} loading={index ? 'lazy' : 'eager'} fetchPriority={index ? 'auto' : 'high'} /></a><figcaption>{item.caption}</figcaption></figure>) : <ProcessPreview project={project} />}
    </section>
    <section className="shell case-story section-space"><div><p className="eyebrow">El punto de partida</p><h2>Un problema<br />que merecía solución.</h2></div><div><p>{project.problem}</p><h3>Qué desarrollamos</h3><p>{project.solution}</p></div></section>
    <section className="case-walkthrough"><div className="shell"><p className="eyebrow">Así funciona</p><h2>Del primer paso<br />al resultado.</h2><ol>{project.steps.map((step, i) => <li key={step.title}><span className="step-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>
    <section className="shell case-engineering section-space"><div className="section-heading"><div><p className="eyebrow">Más allá de la pantalla</p><h2>Lo que también<br />hay que resolver.</h2></div><p>El trabajo no termina cuando una interfaz se ve bien. Importa cómo se comporta y cómo trata la información.</p></div><div className="case-care-grid">{project.care.map(item => <article key={item.title}><Icon name="check" /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><aside className="case-boundary"><strong>Dónde está hoy</strong><p>{project.boundary}</p></aside></section>
    <section className="case-closing"><div className="shell"><p className="eyebrow">Una idea para tu negocio</p><h2>¿Necesitas resolver<br />algo parecido?</h2><p>{project.takeaway}</p><a className="button" href={withBasePath('/#contacto')}>Hablemos de tu proyecto <Icon name="arrow" /></a></div></section>
    <section className="shell section-space"><div className="section-heading"><h2>Más trabajo<br />del equipo.</h2><a className="text-link" href={withBasePath('/proyectos/')}>Ver todos los proyectos <Icon name="arrow" /></a></div><div className="case-grid">{related.map(p => <CaseCard key={p.slug} project={p} />)}</div></section>
  </main><ProjectFooter /></>;
}
