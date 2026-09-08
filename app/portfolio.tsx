/* eslint-disable @next/next/no-img-element */
import { Icon } from './icons';
import { businessProjects, certificateProject, featuredProjects, mediaProject, musicWorkflow, utilityProjects } from './project-content';
import type { UtilityProject } from './project-content';
import { withBasePath } from './site-content';

function ProductIcon({ project, className = '' }: { project: UtilityProject; className?: string }) {
  if (project.artwork && project.image) {
    // Display the selected Calm Layers board as a sprite, preserving the original artwork.
    return <span className={`suite-artwork suite-artwork-${project.artwork} ${className}`} aria-hidden="true"><img src={withBasePath(project.image)} alt="" width="1672" height="941" loading="lazy" /></span>;
  }
  return project.image ? <img className={className} src={withBasePath(project.image)} alt="" width="80" height="80" loading="lazy" /> : <span className={`${className} utility-icon-symbol`}><Icon name={project.icon || 'tool'} /></span>;
}

export function Portfolio() {
  return (
    <section className="portfolio-section section-space" id="proyectos" aria-labelledby="portfolio-title">
      <div className="shell">
        <div className="section-heading">
          <div><p className="eyebrow">De la idea a una herramienta real</p><h2 id="portfolio-title">Lo que ya hemos<br />construido.</h2></div>
          <p>Proyectos propios y herramientas nacidas de necesidades reales. Aquí puedes ver qué hacen y en qué punto están.</p>
        </div>
        <article className="project-spotlight" aria-labelledby="certificate-case-title">
          <div className="project-spotlight-copy">
            <p className="project-category">Un proyecto propio, por dentro · Windows</p>
            <h3 id="certificate-case-title">{certificateProject.name}</h3>
            <p className="project-card-description">De buscar entre una lista de certificados a tener búsqueda, fichas y caducidades en el mismo lugar.</p>
            <ol className="project-walkthrough" role="list">
              {certificateProject.walkthrough.map((step, index) => <li key={step.title}>
                <span aria-hidden="true">0{index + 1}</span><div><h4>{step.title}</h4><p>{step.description}</p></div>
              </li>)}
            </ol>
            <p className="project-card-status">{certificateProject.status} · Sin descarga pública</p>
            <a className="text-link" href={withBasePath(certificateProject.href)}>Ver el proyecto y sus límites <Icon name="arrow" /></a>
          </div>
          <figure className="project-spotlight-figure">
            <a href={withBasePath(certificateProject.image)} target="_blank" rel="noreferrer" aria-label="Ampliar la captura del Gestor de Certificados (se abre en otra pestaña)">
              <img src={withBasePath(certificateProject.image)} alt={certificateProject.imageAlt} width={certificateProject.imageWidth} height={certificateProject.imageHeight} loading="lazy" />
            </a>
            <figcaption>Captura de desarrollo con datos sintéticos, no de clientes reales. <a href={withBasePath(certificateProject.image)} target="_blank" rel="noreferrer">Ampliar captura ↗</a></figcaption>
          </figure>
        </article>
        <div className="portfolio-grid portfolio-grid-secondary">
          {featuredProjects.map((project) => <article className="project-card" key={project.id}>
            <div className={'project-picture project-picture-' + project.id}>
              <img src={withBasePath(project.image)} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} loading="lazy" />
            </div>
            <div className="project-card-copy">
              <p className="project-category">{project.category}</p><h3>{project.name}</h3>
              <p className="project-card-description">{project.description}</p><p className="project-card-status">{project.status}</p>
              {project.href ? <a className="text-link" href={withBasePath(project.href)} target="_blank" rel="noreferrer">{project.linkLabel}<span aria-hidden="true">↗</span></a> : <a className="text-link" href="#contacto">{project.linkLabel}<Icon name="arrow" /></a>}
            </div>
          </article>)}
        </div>
        <div className="more-apps">
        <details className="portfolio-more" id="productividad">
          <summary>
            <span className="suite-summary"><span className="suite-icons" aria-hidden="true">{utilityProjects.map((project) => <ProductIcon key={project.name} project={project} />)}</span><span><strong>Nuestra suite de productividad.</strong><small>Clipappboard · PomodoroUtility · WindowUtility<br />Aplicaciones propias para macOS</small></span></span>
            <span className="more-sign" aria-hidden="true">+</span>
          </summary>
          <div className="utility-grid">
            {utilityProjects.map((project) => <article className="utility-project" key={project.name}>
              <ProductIcon className="utility-icon" project={project} />
              <div><h4>{project.name}</h4><p>{project.description}</p><p className="project-card-status">{project.status}</p>
                {project.href ? <a className="text-link" href={project.href} target="_blank" rel="noreferrer">{project.linkLabel}<span aria-hidden="true">↗</span></a> : null}
              </div>
            </article>)}
          </div>
        </details>
        <article className="media-project" aria-labelledby="media-project-title">
          {mediaProject.image ? <img className="media-project-icon" src={withBasePath(mediaProject.image)} alt="" width="64" height="64" loading="lazy" /> : <span className="media-project-icon"><Icon name="play" /></span>}
          <div><p className="project-category">iPhone y Apple TV</p><h3 id="media-project-title">{mediaProject.name}</h3><p>{mediaProject.description}</p><p className="project-card-status">{mediaProject.status}</p></div>
        </article>
        </div>
        <section className="business-projects" aria-labelledby="business-projects-title">
          <h3 id="business-projects-title">Otros desarrollos a medida.</h3>
          <div className="business-project-grid">{businessProjects.map((project) => <article key={project.name}><Icon name={project.icon} /><div><h4>{project.name}</h4><p>{project.description}</p></div></article>)}</div>
        </section>
        <article className="music-case" aria-labelledby="music-case-title">
          <p className="eyebrow">Automatización propia · Música</p>
          <div className="music-case-heading"><h3 id="music-case-title">{musicWorkflow.title}</h3><p>{musicWorkflow.description}</p></div>
          <ol className="process-flow" role="list">
            {musicWorkflow.steps.map((step, index) => <li key={step.title}><div className="flow-icon"><Icon name={step.icon} /><span>{index + 1}</span></div><h4>{step.title}</h4><p>{step.detail}</p></li>)}
          </ol>
          <p className="music-takeaway">{musicWorkflow.takeaway}</p>
        </article>
        <div className="portfolio-cta"><p>¿Ves algo que te recuerda a tu negocio? No tienes que encajar en estas aplicaciones: podemos construir la tuya.</p><a className="text-link" href="#contacto">Quiero resolver algo parecido <Icon name="arrow" /></a></div>
      </div>
    </section>
  );
}
