import { Icon } from './icons';
import { BusinessProof } from './business-proof';
import { projectCatalog } from './project-catalog';
import { withBasePath } from './site-content';
import { PortfolioExplorer, type PortfolioGroup } from './portfolio-explorer';

/**
 * Agrupación editorial del catálogo para la portada. Los slugs, estados,
 * capturas y textos siguen viniendo de projectCatalog sin modificarlos.
 */
const groups: PortfolioGroup[] = [
  { id: 'seleccion', label: 'Selección', slugs: [], proposed: true },
  { id: 'gestion', label: 'Gestión y procesos', slugs: ['gestor-certificados', 'sienta'], proposed: true },
  { id: 'aplicaciones', label: 'Aplicaciones y producto', slugs: ['clipappboard', 'pomodoro-utility', 'window-utility', 'claro-iptv'] },
  { id: 'automatizacion', label: 'Automatización e IA', slugs: ['forja', 'automatizacion-musical'] },
  { id: 'conocimiento', label: 'Formación y contenido', slugs: ['polymath', 'oposicion-metro'] },
  { id: 'calidad', label: 'Calidad y revisión', slugs: ['miriam-studio'] },
];

/** Tarjeta reservada a una demostración que todavía no existe como producto. */
function ProposedDemo() {
  return <article className="case-card case-card-propuesta">
    <div className="case-card-visual proposed-visual">
      <ol className="proposed-flow">
        <li><Icon name="clock" /><span>Reserva de cita</span></li>
        <li><Icon name="chat" /><span>Aviso administrativo por WhatsApp</span></li>
        <li><Icon name="invoice" /><span>Facturación preparada</span></li>
      </ol>
    </div>
    <div className="case-card-body">
      <p className="project-category">Demostración propuesta</p>
      <h3>Una clínica, de la cita a la factura</h3>
      <p>Una demostración que podemos construir y validar contigo: reserva de citas, avisos administrativos por WhatsApp y preparación de la facturación, con el equipo revisando cada paso antes de darlo por válido.</p>
      <div className="case-card-bottom">
        <span>Aún no está desarrollada · Sin datos de pacientes</span>
        <a className="text-link" href="#contacto">Valorar mi caso <Icon name="arrow" /></a>
      </div>
    </div>
  </article>;
}

export function Portfolio() {
  // Estas dos referencias se muestran arriba con su contexto. Siguen estando
  // disponibles en sus filtros, pero no se repiten en la selección inicial.
  const projectsForExplorer = projectCatalog.map((project) => (
    project.slug === 'gestor-certificados' || project.slug === 'sienta'
      ? { ...project, featured: false }
      : project
  ));

  return <section className="portfolio-section section-space" id="proyectos" aria-labelledby="portfolio-title"><div className="shell">
    <div className="section-heading"><div><p className="eyebrow">Trabajo que puedes ver</p><h2 id="portfolio-title">No nos quedamos<br />en la idea.</h2></div><p>Aplicaciones, integraciones y procesos con su recorrido y su estado actual. Empieza por dos referencias propias o explora el catálogo por tipo de solución.</p></div>
    <BusinessProof />
    <PortfolioExplorer
      groups={groups}
      projects={projectsForExplorer}
      catalogHref={withBasePath('/proyectos/')}
      proposedCard={<ProposedDemo />}
    />
    <div className="portfolio-cta"><p>También desarrollamos herramientas de aprendizaje, aplicaciones de productividad y experiencias para móvil y televisión.</p><a className="button" href={withBasePath('/proyectos/')}>Explorar todos los proyectos <Icon name="arrow" /></a></div>
  </div></section>;
}
