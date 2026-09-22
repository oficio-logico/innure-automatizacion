/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContactForm } from './interactive';
import { Icon } from './icons';
import { ProjectFooter } from './project-views';
import { solutionCatalog, getSolution } from './solution-catalog.mjs';
import { siteContent, withBasePath } from './site-content';
import { socialMetadata } from './social-metadata';
import './solutions.css';

export function solutionMetadata(slug?: string): Metadata {
  const solution = slug ? getSolution(slug) : undefined;
  const title = solution?.title || 'Soluciones para la gestión de tu empresa';
  const description = solution?.description || 'Explora cómo conectar reservas, facturación y seguimiento comercial, mejorar la gestión de tu negocio y decidir si necesitas una aplicación a medida.';
  const route = `soluciones/${slug ? `${slug}/` : ''}`;
  const base = siteContent.publishing.ready ? siteContent.brand.domain : siteContent.publishing.localBaseUrl;
  return {
    title, description,
    alternates: { canonical: new URL(route, base.replace(/\/$/, '') + '/').toString() },
    ...socialMetadata(route, `${title} | innure`, description),
  };
}

export function SolutionHeader() {
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header project-header"><div className="shell header-inner">
      <a className="wordmark" href={withBasePath('/')} aria-label="innure, volver al inicio"><img className="brand-logo" src={withBasePath('/images/innure-logo-white.png')} alt="innure" width="112" height="28" /><small>{siteContent.brand.statusLabel}</small></a>
      <nav className="solution-nav" aria-label="Navegación principal"><a href={withBasePath('/soluciones/')}>Soluciones</a><a href={withBasePath('/proyectos/')}>Proyectos</a><a href="#contacto">Hablemos <span aria-hidden="true">↗</span></a></nav>
    </div></header></>;
}

export function SolutionLinks({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? 'solution-links solution-links-compact' : 'solution-links'}>
    {solutionCatalog.map((solution, index) => <a href={withBasePath(`/soluciones/${solution.slug}/`)} key={solution.slug}>
      <span className="solution-link-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <span><small>{solution.group}</small><strong>{solution.navTitle}</strong>{!compact ? <span className="solution-link-description">{solution.audience}</span> : null}</span>
      <Icon name="arrow" />
    </a>)}
  </div>;
}

export function SolutionsIndex() {
  return <><SolutionHeader /><main id="contenido" className="solutions-page">
    <section className="shell solution-index-hero"><p className="eyebrow">Soluciones · innure</p><h1>Empecemos por<br />lo que se atasca.</h1><p className="solution-lede">Una cita que cambia, un bono que no cuadra o un presupuesto sin respuesta. Explora cómo podríamos resolverlo con tus herramientas y cuándo tendría sentido construir algo propio.</p></section>
    <section className="shell solution-directory" aria-labelledby="solution-directory-title"><h2 id="solution-directory-title">Encuentra tu punto de partida</h2><SolutionLinks /></section>
    <section className="solution-index-guide"><div className="shell solution-section-grid"><div><p className="eyebrow">Antes de construir</p><h2>La solución empieza<br />en vuestro proceso.</h2></div><div className="solution-copy"><p>Revisamos quién hace la tarea, con qué información y qué ocurre cuando algo cambia. Si vuestro programa ya lo resuelve, empezamos por configurarlo. Si falta una conexión, comprobamos qué permite cada herramienta.</p><p>Una aplicación a medida o la IA se plantean cuando cubren una necesidad concreta. Acordamos el alcance, la revisión humana y el mantenimiento antes de ponerlas en marcha.</p><a className="text-link" href={withBasePath('/soluciones/aplicaciones-a-medida/')}>Comparar las tres alternativas <Icon name="arrow" /></a></div></div></section>
    <section className="shell solution-index-contact" id="contacto"><p className="eyebrow">Tu caso</p><h2>¿Tu necesidad es otra?</h2><p>Cuéntanos qué os gustaría mejorar, cómo lo resolvéis hoy y dónde se pierde el hilo.</p><a className="button" href={withBasePath('/#contacto')}>Hablar de mi negocio <Icon name="arrow" /></a></section>
  </main><ProjectFooter /></>;
}

export function SolutionDetail({ slug }: { slug: string }) {
  const solution = getSolution(slug);
  if (!solution) notFound();
  return <><SolutionHeader /><main id="contenido" className="solutions-page">
    <section className="shell solution-hero">
      <nav className="solution-breadcrumbs" aria-label="Ruta de navegación"><a href={withBasePath('/')}>Inicio</a><span aria-hidden="true">/</span><a href={withBasePath('/soluciones/')}>Soluciones</a><span aria-hidden="true">/</span><span aria-current="page">{solution.navTitle}</span></nav>
      <div className="solution-hero-grid"><div><p className="eyebrow">{solution.eyebrow}</p><h1>{solution.headline}</h1><p className="solution-lede">{solution.intro}</p><a className="button" href="#contacto">{solution.ctaLabel}<Icon name="arrow" /></a></div><aside className="solution-start"><p className="eyebrow">El punto de partida</p><p>{solution.audience}</p><div><span>Primero aclaramos</span><strong>{solution.firstStep}</strong></div><a href="#como-funciona" className="text-link">Ver cómo lo abordaríamos <span aria-hidden="true">↓</span></a></aside></div>
    </section>
    <section className="solution-problem"><div className="shell solution-section-grid"><div><p className="eyebrow">El problema</p><h2>{solution.problem.title}</h2></div><div className="solution-copy"><p>{solution.problem.text}</p>{solution.decisions.map(item => <div className="solution-decision" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></div></section>
    {solution.alternatives.length ? <section className="shell solution-comparison" aria-labelledby="comparison-title"><h2 id="comparison-title">Tres caminos, con compromisos distintos</h2><div className="solution-table-scroll" role="region" aria-label="Comparación de alternativas" tabIndex={0}><table><caption>Qué valorar antes de elegir</caption><thead><tr><th scope="col">Alternativa</th><th scope="col">Cuándo encaja</th><th scope="col">Qué revisar</th></tr></thead><tbody>{solution.alternatives.map(option => <tr key={option.option}><th scope="row">{option.option}</th><td>{option.fit}</td><td>{option.watch}</td></tr>)}</tbody></table></div></section> : null}
    <section className="solution-workflow" id="como-funciona" aria-labelledby="workflow-title"><div className="shell"><p className="eyebrow">Cómo funcionaría</p><h2 id="workflow-title">Un recorrido que se puede comprobar.</h2><ol>{solution.workflow.map((step, i) => <li key={step.title}><span className="step-number" aria-hidden="true">0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>
    <section className="shell solution-example" aria-labelledby="example-title"><p className="eyebrow">Ejemplo hipotético</p><h2 id="example-title">{solution.example.title}</h2><p>{solution.example.text}</p></section>
    <section className="solution-requirements"><div className="shell"><div className="solution-section-heading"><p className="eyebrow">Antes de ponerlo en marcha</p><h2>Qué necesitamos comprobar</h2></div><div className="solution-requirement-grid">{solution.requirements.map(item => <article key={item.title}><Icon name="check" /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><div className="solution-boundary"><h3>Alcance y límites</h3><p>{solution.limits}</p></div></div></section>
    <section className="shell solution-evidence"><div><p className="eyebrow">Trabajo del equipo</p><h2>De la idea a algo que puedes ver.</h2></div><div><p>{solution.evidence.text}</p><a className="text-link" href={withBasePath(solution.evidence.href)}>{solution.evidence.label}<Icon name="arrow" /></a>{slug === 'seguimiento-presupuestos' ? <a className="text-link" href={withBasePath('/guias/seguimiento-presupuestos/')}>Leer la guía de seguimiento <Icon name="arrow" /></a> : null}</div></section>
    <section className="faq-section solution-faq" aria-labelledby="solution-faq-title"><div className="shell faq-layout"><div><p className="eyebrow">Antes de hablar</p><h2 id="solution-faq-title">Dudas de este proceso</h2></div><div className="faq-list">{solution.faqs.map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>
    <section className="contact-section solution-contact" id="contacto" aria-labelledby="contact-title"><div className="shell contact-layout"><div className="contact-copy"><p className="eyebrow">Un siguiente paso concreto</p><h2 id="contact-title">{solution.ctaLabel}</h2><p>En una primera conversación aclaramos el problema y qué tendría sentido revisar. Para prepararla:</p><ul className="review-outcomes">{solution.questions.map(question => <li key={question}><Icon name="check" /><span>{question}</span></li>)}</ul><p className="solution-contact-note">Basta con describir el proceso. No envíes datos de pacientes, clientes ni información confidencial.</p></div><ContactForm source={{ path: `/soluciones/${solution.slug}/`, label: solution.navTitle, prompt: solution.questions[0] }} /></div></section>
    <section className="shell solution-related" aria-labelledby="related-title"><h2 id="related-title">Si el problema está en otro paso</h2><div>{solution.related.map(relatedSlug => { const related = getSolution(relatedSlug); return related ? <a key={relatedSlug} className="text-link" href={withBasePath(`/soluciones/${related.slug}/`)}>{related.navTitle}<Icon name="arrow" /></a> : null; })}</div></section>
    {solution.sources.length ? <aside className="shell solution-sources" aria-label="Referencias sobre las herramientas"><p>Referencias consultadas · <time dateTime={solution.reviewedOn}>21 de septiembre de 2026</time></p><ul>{solution.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} <span aria-hidden="true">↗</span></a><span>{source.note}</span></li>)}</ul><p>La documentación permite valorar opciones. La compatibilidad se confirma con las herramientas y permisos de cada negocio.</p></aside> : null}
  </main><ProjectFooter /></>;
}
