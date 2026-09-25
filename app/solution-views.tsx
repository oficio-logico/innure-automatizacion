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

function AutomationDetail() {
  const solution = getSolution('automatizacion-procesos');
  if (!solution) notFound();
  return <><SolutionHeader /><main id="contenido" className="solutions-page automation-page">
    <section className="shell solution-hero automation-hero">
      <nav className="solution-breadcrumbs" aria-label="Ruta de navegación"><a href={withBasePath('/')}>Inicio</a><span aria-hidden="true">/</span><a href={withBasePath('/soluciones/')}>Soluciones</a><span aria-hidden="true">/</span><span aria-current="page">Automatización de procesos</span></nav>
      <div className="automation-hero-grid"><div>
        <p className="eyebrow">Automatización de tareas administrativas</p>
        <h1>Menos copiar datos.<br />Más tiempo para el negocio.</h1>
        <p className="solution-lede">Si vuestro equipo pasa información de correos a hojas y programas, podemos simplificar una tarea concreta. Conectamos herramientas cuando es viable y dejamos a las personas las decisiones que necesitan revisión.</p>
        <a className="button" href="#contacto">Cuéntanos qué tarea os quita tiempo <Icon name="arrow" /></a>
        <p className="automation-hero-note">Primera conversación gratuita. Sin promesas de ahorro antes de medir el proceso.</p>
      </div><figure className="automation-hero-proof"><img src={withBasePath('/images/proyectos/gesticert-v34-claro.webp')} alt="Gestor de Certificados: selección de trámite y certificado con datos ficticios" width="1180" height="760" /><figcaption><strong>Una herramienta propia que puedes ver.</strong> Gestor de Certificados reúne fichas, caducidades y accesos a trámites. <a href={withBasePath('/proyectos/gestor-certificados/')}>Ver proyecto y estado <span aria-hidden="true">↗</span></a><small>Producto en validación privada; no acredita resultados para clientes.</small></figcaption></figure></div>
    </section>
    <section className="automation-scenario" aria-labelledby="automation-scenario-title"><div className="shell automation-scenario-grid">
      <div><p className="eyebrow">Un ejemplo posible</p><h2 id="automation-scenario-title">Del correo a la herramienta, sin volver a teclearlo todo.</h2><p>Un pedido o solicitud llega por correo. Hoy alguien abre el adjunto, copia datos y avisa al equipo. Un primer proyecto podría preparar el registro y señalar lo incompleto para que una persona lo revise antes de continuar.</p><p className="automation-caption">Ejemplo ilustrativo: no es una implantación realizada para un cliente. La viabilidad depende de vuestros programas y permisos.</p></div>
      <ol className="automation-flow"><li><span>01</span><strong>Entra la solicitud</strong><small>Correo y documento</small></li><li><span>02</span><strong>Se prepara el registro</strong><small>Datos disponibles, sin duplicar tareas</small></li><li><span>03</span><strong>El equipo confirma</strong><small>Excepciones y decisiones visibles</small></li></ol>
    </div></section>
    <section className="shell automation-approach" aria-labelledby="automation-approach-title"><p className="eyebrow">Cómo empezaríamos</p><h2 id="automation-approach-title">Una tarea, un primer alcance claro.</h2><ol><li><span>01</span><strong>Entender el recorrido</strong><p>Qué entra, quién lo revisa y dónde se pierde tiempo.</p></li><li><span>02</span><strong>Elegir la mejora</strong><p>Primero comprobamos si vuestro software ya la permite; si no, valoramos una integración o desarrollo.</p></li><li><span>03</span><strong>Probar con el equipo</strong><p>Validamos los casos normales y las excepciones antes de ampliar el proceso.</p></li></ol><div className="automation-maintenance"><h3>Del primer proceso al mantenimiento.</h3><p>Acordamos qué se entrega, lo probamos con vuestro equipo y presupuestamos el mantenimiento mensual por separado.</p></div><p className="automation-caption">Accesos, costes, tratamiento de datos y mantenimiento se concretan en la propuesta. No automatizamos decisiones fiscales, comerciales o contractuales sin revisión humana.</p></section>
    <section className="faq-section solution-faq" aria-labelledby="solution-faq-title"><div className="shell faq-layout"><div><p className="eyebrow">Antes de hablar</p><h2 id="solution-faq-title">Dudas habituales</h2></div><div className="faq-list">{solution.faqs.map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>
    <section className="contact-section solution-contact" id="contacto" aria-labelledby="contact-title"><div className="shell contact-layout"><div className="contact-copy"><p className="eyebrow">El siguiente paso</p><h2 id="contact-title">Cuéntanos la tarea que se repite.</h2><p>¿Qué datos copiáis hoy, entre qué herramientas y quién los revisa? Con unas líneas basta para preparar la primera conversación.</p><p className="solution-contact-note">No envíes datos de clientes, contraseñas ni documentos confidenciales.</p></div><ContactForm source={{ path: '/soluciones/automatizacion-procesos/', label: solution.navTitle, prompt: solution.questions[0] }} /></div></section>
    <section className="shell solution-related" aria-labelledby="related-title"><h2 id="related-title">¿El problema está en otro paso?</h2><div><a className="text-link" href={withBasePath('/soluciones/')}>Explorar todas las soluciones <Icon name="arrow" /></a></div></section>
  </main><ProjectFooter /></>;
}

export function SolutionDetail({ slug }: { slug: string }) {
  if (slug === 'automatizacion-procesos') return <AutomationDetail />;
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
