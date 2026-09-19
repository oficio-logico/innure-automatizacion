import { Icon } from './icons';
import { projectCatalog } from './project-catalog';
import { CaseCard } from './project-views';
import { withBasePath } from './site-content';
export function Portfolio() {
  return <section className="portfolio-section section-space" id="proyectos" aria-labelledby="portfolio-title"><div className="shell">
    <div className="section-heading"><div><p className="eyebrow">Trabajo que puedes ver</p><h2 id="portfolio-title">No nos quedamos<br />en la idea.</h2></div><p>Construimos aplicaciones y procesos que resuelven tareas concretas. Aquí puedes verlos por dentro, con su recorrido y su estado actual.</p></div>
    <div className="case-grid">{projectCatalog.filter(project => project.featured).map(project => <CaseCard key={project.slug} project={project} />)}</div>
    <div className="portfolio-cta"><p>También desarrollamos herramientas de aprendizaje, aplicaciones de productividad y experiencias para móvil y televisión.</p><a className="button" href={withBasePath('/proyectos/')}>Explorar todos los proyectos <Icon name="arrow" /></a></div>
  </div></section>;
}
