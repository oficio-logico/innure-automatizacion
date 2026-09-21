/* eslint-disable @next/next/no-img-element */
import { Icon } from './icons';
import { projectCatalog, type ProjectCase } from './project-catalog';
import { ProcessPreview } from './project-views';
import { withBasePath } from './site-content';

type ProofSlug = 'gestor-certificados' | 'sienta';

const stories: Record<ProofSlug, { before: string; built: string; visible: string }> = {
  'gestor-certificados': {
    before: 'Buscar al cliente, localizar su certificado y volver a buscar el trámite en otra parte.',
    built: 'Una aplicación que reúne certificados, fichas de cliente, caducidades y accesos a procedimientos.',
    visible: 'Capturas reales del escritorio y del área de cliente. Producto propio en validación privada.',
  },
  sienta: {
    before: 'Coordinar las reservas, las mesas disponibles y los turnos en lugares distintos.',
    built: 'Una aplicación que conecta la agenda con el plano de sala, los clientes y los accesos del equipo.',
    visible: 'Capturas del entorno de demostración y de una prueba en iPad. Producto propio en desarrollo, con datos ficticios.',
  },
};

function projectFor(slug: ProofSlug) {
  const project = projectCatalog.find((item) => item.slug === slug);
  if (!project) throw new Error(`Falta el proyecto ${slug} en el catálogo.`);
  return project;
}

function ProofStory({ project }: { project: ProjectCase }) {
  const story = stories[project.slug as ProofSlug];
  return <dl className="business-proof-story">
    <div><dt>Antes</dt><dd>{story.before}</dd></div>
    <div><dt>Qué construimos</dt><dd>{story.built}</dd></div>
    <div><dt>Qué puedes ver</dt><dd>{story.visible}</dd></div>
  </dl>;
}

function ProjectProof({ project }: { project: ProjectCase }) {
  const image = project.images[0];
  const projectHref = withBasePath(`/proyectos/${project.slug}/`);

  return <article className={`business-proof business-proof-${project.slug}`}>
    <div className="business-proof-visual">
      {image ? <figure>
        <a href={projectHref} aria-label={`Ver ${project.name}`}>
          <img src={withBasePath(image.src)} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
        </a>
        <figcaption>{image.caption}</figcaption>
      </figure> : <ProcessPreview project={project} />}
    </div>
    <div className="business-proof-copy">
      <p className="project-category">Estado · {project.status}</p>
      <h3>{project.name}</h3>
      <ProofStory project={project} />
      <a className="text-link" href={projectHref}>Ver proyecto y estado <Icon name="arrow" /></a>
    </div>
  </article>;
}

/** Dos referencias propias separadas del explorador para no duplicar sus tarjetas iniciales. */
export function BusinessProof() {
  const gesticert = projectFor('gestor-certificados');
  const sienta = projectFor('sienta');

  return <section className="business-proofs" aria-label="Dos proyectos propios destacados">
    <div className="business-proofs-heading">
      <p className="eyebrow">Dos proyectos propios · Del problema a la herramienta</p>
    </div>
    <div className="business-proofs-grid">
      <ProjectProof project={gesticert} />
      <ProjectProof project={sienta} />
    </div>
  </section>;
}
