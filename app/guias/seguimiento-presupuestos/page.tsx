import type { Metadata } from 'next';
import { ContactForm } from '../../interactive';
import { Icon } from '../../icons';
import { ProjectFooter } from '../../project-views';
import { SolutionHeader } from '../../solution-views';
import { siteContent, withBasePath } from '../../site-content';
import { socialMetadata } from '../../social-metadata';
import '../../solutions.css';

export const dynamic = 'force-static';

const route = 'guias/seguimiento-presupuestos/';
const title = 'Cómo organizar el seguimiento de presupuestos';
const description = 'Cinco comprobaciones prácticas para que cada presupuesto pendiente tenga un estado, una persona responsable y una próxima acción.';
const base = siteContent.publishing.ready ? siteContent.brand.domain : siteContent.publishing.localBaseUrl;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: new URL(route, base.replace(/\/$/, '') + '/').toString() },
  ...socialMetadata(route, `${title} | innure`, description),
};

const checks = [
  {
    title: 'Reúne el estado en un lugar',
    text: 'Elige dónde consultar los presupuestos abiertos: el CRM que ya usáis o una tabla compartida con acceso limitado. Anota una referencia, la fecha, el estado, la persona responsable y la próxima acción. Si hay varias listas, acordad cuál es la que se actualiza.',
  },
  {
    title: 'Distingue los motivos de espera',
    text: '«Pendiente» puede significar que el cliente necesita una aclaración, que falta una decisión interna o que todavía no se ha acordado cuándo hablar. Registrar el motivo permite preparar una conversación útil. El silencio no significa aceptación.',
  },
  {
    title: 'Asigna la siguiente acción',
    text: 'Cada presupuesto abierto necesita una persona responsable y una acción concreta: resolver una duda, revisar una partida o retomar la conversación en la fecha acordada. Un aviso interno puede ayudar; enviar correos automáticos no tiene por qué ser el primer paso.',
  },
  {
    title: 'Comprueba tu herramienta actual',
    text: 'Antes de conectar sistemas, revisa si vuestro programa permite asignar tareas y avisos. Si necesitáis una integración, comprobad la vía disponible, el plan contratado y los permisos. Que dos herramientas tengan API no demuestra que permitan vuestro flujo concreto.',
  },
  {
    title: 'Mide el proceso antes de prometer ahorro',
    text: 'Durante un periodo definido, cuenta cuántos presupuestos abiertos tienen responsable y próxima acción. Registra también cuánto tiempo dedicáis a revisar la lista. Si cambiáis el proceso, comparad periodos con una carga semejante. Una respuesta no equivale a una venta.',
  },
];

export default function Page() {
  return <><SolutionHeader /><main id="contenido" className="solutions-page guide-page">
    <section className="shell guide-hero"><nav className="solution-breadcrumbs" aria-label="Ruta de navegación"><a href={withBasePath('/')}>Inicio</a><span aria-hidden="true">/</span><a href={withBasePath('/soluciones/seguimiento-presupuestos/')}>Seguimiento de presupuestos</a><span aria-hidden="true">/</span><span aria-current="page">Guía</span></nav>
      <p className="eyebrow">Guía práctica · innure</p><h1>Antes de automatizar el seguimiento de presupuestos, revisa estas cinco cosas.</h1>
      <p className="solution-lede">Si un presupuesto queda pendiente, lo primero es saber quién debe retomarlo y qué falta para avanzar. Esta guía ayuda a revisar el proceso antes de añadir otra herramienta.</p>
      <a className="button" href="#contacto">Cuéntanos tu proceso <Icon name="arrow" /></a>
    </section>
    <section className="shell guide-body" aria-label="Cinco comprobaciones para el seguimiento de presupuestos">
      <ol>{checks.map((check, index) => <li key={check.title}><span className="guide-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h2>{check.title}</h2><p>{check.text}</p></div></li>)}</ol>
    </section>
    <section className="solution-index-guide"><div className="shell solution-section-grid"><div><p className="eyebrow">Ejemplo hipotético</p><h2>Una lista clara puede ser suficiente para empezar.</h2></div><div className="solution-copy"><p>Un equipo guarda sus presupuestos en una lista, pero las fechas para retomarlos están en correos individuales. El primer cambio puede ser añadir una persona responsable y la próxima acción en su herramienta actual.</p><p>Después se valora si un aviso interno aporta suficiente utilidad. Este ejemplo no describe a un cliente ni presupone que haga falta IA o desarrollo a medida.</p></div></div></section>
    <section className="contact-section solution-contact" id="contacto" aria-labelledby="contact-title"><div className="shell contact-layout"><div className="contact-copy"><p className="eyebrow">Tu caso</p><h2 id="contact-title">¿Dónde se pierde el seguimiento?</h2><p>Cuéntanos dónde guardáis los presupuestos, quién los retoma y cómo decidís cuándo hacerlo. En una primera conversación veremos qué merece la pena revisar.</p><p className="solution-contact-note">Describe el proceso sin enviar datos de clientes ni información confidencial.</p></div><ContactForm source={{ path: `/${route}`, label: 'Guía de seguimiento de presupuestos', prompt: '¿Dónde guardáis los presupuestos y cómo decidís cuándo retomarlos?' }} /></div></section>
    <section className="shell solution-related"><h2>Ver el proceso completo</h2><div><a className="text-link" href={withBasePath('/soluciones/seguimiento-presupuestos/')}>Seguimiento de presupuestos para empresas <Icon name="arrow" /></a></div></section>
  </main><ProjectFooter /></>;
}
