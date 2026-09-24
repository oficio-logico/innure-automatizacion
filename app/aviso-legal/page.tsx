import type { Metadata } from 'next';
import { siteContent, withBasePath } from '../site-content';
import { LegalShell } from '../legal-shell';
import { socialMetadata } from '../social-metadata';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Titular y condiciones de uso de innure: tecnología, aplicaciones, integraciones, automatización, IA y captación de clientes.',
  ...socialMetadata('aviso-legal/', 'Aviso legal | innure', 'Titular y condiciones de uso de innure: tecnología, aplicaciones, integraciones, automatización, IA y captación de clientes.', siteContent.brand.domain),
  robots: { index: false, follow: true },
  alternates: { canonical: siteContent.brand.domain + 'aviso-legal/' },
};

export default function LegalNoticePage() {
  const { legal, brand } = siteContent;
  return <LegalShell title="Aviso legal">
    <section className="legal-section"><h2>1. Titular del sitio</h2>
      <dl className="legal-data">
        <div><dt>Razón social</dt><dd>{legal.companyName}</dd></div>
        <div><dt>NIF</dt><dd>{legal.taxId}</dd></div>
        <div><dt>Domicilio</dt><dd>{legal.registeredAddress}</dd></div>
        <div><dt>Registro</dt><dd>{legal.registryDetails}</dd></div>
        <div><dt>Contacto</dt><dd><a href="mailto:info@innure.es">info@innure.es</a></dd></div>
        <div><dt>Sitio web</dt><dd>{brand.domain}</dd></div>
      </dl>
    </section>
    <section className="legal-section"><h2>2. Objeto</h2><p>Esta página presenta la actividad de innure: tecnología, producto y mejora del negocio. Sus servicios comprenden aplicaciones a medida, integraciones y procesos conectados, automatización, inteligencia artificial cuando aporta valor, captación de clientes e ingeniería y pruebas de rendimiento de software. La información es general: el alcance, precio, plazo y soporte de cada proyecto se acuerdan expresamente antes de contratar.</p></section>
    <section className="legal-section"><h2>3. Condiciones de uso</h2><p>El acceso es gratuito. La persona usuaria se compromete a utilizar el sitio de forma lícita, sin vulnerar derechos de terceros ni dañar o sobrecargar sus sistemas. innure puede actualizar sus contenidos y servicios.</p></section>
    <section className="legal-section"><h2>4. Propiedad intelectual y proyectos</h2><p>Los textos, diseños, imágenes, marcas y programas pertenecen a sus respectivos titulares. Su publicación no concede una licencia de uso o distribución. Los proyectos del portfolio se presentan con su estado y condiciones de acceso; no constituyen, por sí mismos, una oferta de descarga pública.</p><p>Las referencias a terceros tienen una finalidad informativa y no implican patrocinio ni una relación comercial que no se indique expresamente. Los logotipos de empresas que aparecen en el sitio identifican proyectos en los que han trabajado miembros del equipo de innure, en ocasiones a través de otras empresas, y pertenecen a sus titulares. Los ejemplos de procesos son ilustrativos y no garantizan un ahorro concreto.</p></section>
    <section className="legal-section"><h2>5. Disponibilidad y enlaces</h2><p>Trabajamos para mantener la información y el funcionamiento del sitio, pero no garantizamos disponibilidad ininterrumpida. Los enlaces externos conducen a páginas con sus propias condiciones y políticas, ajenas al control de innure.</p></section>
    <section className="legal-section"><h2>6. Protección de datos</h2><p>El uso de los datos del formulario y de la medición opcional se explica en la <a href={withBasePath('/privacidad/')}>política de privacidad y cookies</a>.</p></section>
    <section className="legal-section"><h2>7. Legislación aplicable</h2><p>Se aplica la legislación española. Las controversias se someterán a los juzgados que correspondan conforme a la normativa aplicable, sin limitar los derechos que asistan a las personas consumidoras.</p></section>
  </LegalShell>;
}
