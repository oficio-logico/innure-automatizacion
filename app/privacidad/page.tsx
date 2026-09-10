import type { Metadata } from 'next';
import { siteContent } from '../site-content';
import { LegalShell } from '../legal-shell';
import { socialMetadata } from '../social-metadata';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Privacidad y cookies', description: 'Cómo trata Innure tus consultas y cómo elegir la medición publicitaria.',
  ...socialMetadata('privacidad/', 'Privacidad y cookies | Innure', 'Cómo trata Innure tus consultas y cómo elegir la medición publicitaria.', siteContent.brand.domain),
  robots: { index: false, follow: true },
  alternates: { canonical: siteContent.brand.domain + 'privacidad/' },
};

export default function PrivacyPage() {
  const { legal, contact, advertising } = siteContent;
  return <LegalShell title="Privacidad y cookies">
    <section className="legal-section"><h2>1. Responsable</h2><p>{legal.companyName}, NIF {legal.taxId}, con domicilio en {legal.registeredAddress}. Para cuestiones de privacidad: <a href="mailto:info@innure.es">info@innure.es</a>.</p></section>
    <section className="legal-section"><h2>2. Datos y finalidad</h2><p>Tratamos el nombre, empresa, correo profesional, teléfono opcional y descripción del problema que nos facilitas para responder a tu consulta, hablar contigo y, en su caso, preparar una propuesta. No incluyas datos confidenciales ni información de terceras personas que no sea necesaria.</p>
      <p>{contact.formEndpoint ? 'El formulario envía la consulta al correo de Innure mediante una conexión cifrada. El servidor confirma el envío cuando el servicio de correo lo acepta; no guarda una base de datos de los mensajes en esta web.' : 'En esta vista de revisión, el formulario prepara un borrador en tu aplicación de correo. Solo nos llegará si decides enviarlo desde allí.'}</p>
      <p>Los servicios de alojamiento y seguridad pueden tratar datos técnicos de conexión, como IP y navegador. Para limitar abusos, el receptor mantiene contadores temporales y hashes, sin guardar en ellos el contenido del mensaje. La cuota se reinicia a los diez minutos y los registros caducados se descartan al atender nuevas solicitudes.</p>
    </section>
    <section className="legal-section"><h2>3. Base jurídica y conservación</h2><p>Respondemos a tu solicitud sobre la base de las medidas precontractuales que nos pides y, cuando corresponde, del consentimiento que prestas. La protección del formulario responde al interés legítimo de mantener un servicio seguro. La medición publicitaria es opcional y requiere tu consentimiento independiente.</p><p>{legal.retentionPeriod} Los datos no se utilizan para campañas de correo no solicitadas ni para tomar decisiones automatizadas sobre ti.</p></section>
    <section className="legal-section"><h2>4. Proveedores</h2><p>Para prestar el servicio intervienen DonDominio (Soluciones Corporativas IP, S.L.U.) en el alojamiento y el transporte del correo; Cloudflare, Inc. en la entrega, seguridad y protección antispam Turnstile; y los servicios de correo de Google en el buzón operativo de respaldo. La consulta se dirige al buzón corporativo y a una copia operativa privada para reducir el riesgo de pérdida.</p><p>Si aceptas la medición, interviene también Google Ireland Ltd. No vendemos tus datos. Cuando un proveedor trata datos fuera del Espacio Económico Europeo, son aplicables los mecanismos y garantías de transferencia previstos por la normativa, que puedes consultar en la información de privacidad del proveedor o solicitar a Innure.</p></section>
    <section className="legal-section" id="medicion"><h2>5. Cookies y medición opcional</h2>
      {advertising.conversionDestination ? <><p>Google Ads solo se carga si aceptas la medición. Relaciona el anuncio con un formulario cuyo envío haya sido aceptado. Se comunica una referencia aleatoria del envío, no tu nombre, correo, teléfono, empresa ni el texto de la consulta. No usamos remarketing, personalización publicitaria ni conversiones mejoradas.</p><p>Con tu permiso pueden conservarse identificadores de clic y datos de campaña presentes en la dirección de entrada. Las cookies de atribución de Google, como las que comienzan por <code>_gcl_</code>, tienen habitualmente una duración de hasta 90 días. La elección de aceptación o rechazo se guarda en el navegador hasta 180 días. Los datos de campaña se limitan a la sesión y se descartan para la atribución después de 24 horas.</p><p>Puedes rechazar sin perder el acceso al formulario. También puedes cambiar la elección desde «Configurar medición» en el pie o en esta página. Al retirarla se detiene la carga de las etiquetas y se eliminan los datos locales de atribución de esta línea. Puedes gestionar las demás cookies desde tu navegador.</p></> : <p>Esta versión no carga Google Ads ni cookies de medición publicitaria. El formulario utiliza Turnstile para prevenir envíos automatizados; esta comprobación es independiente de la publicidad.</p>}
      <p>Más información: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">privacidad de Cloudflare</a> y <a href="https://policies.google.com/privacy?hl=es" target="_blank" rel="noreferrer">privacidad de Google</a>.</p>
    </section>
    <section className="legal-section"><h2>6. Tus derechos</h2><p>Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad de tus datos, y retirar el consentimiento, escribiendo a <a href="mailto:info@innure.es">info@innure.es</a>. La retirada no afecta a los tratamientos lícitos anteriores.</p><p>Si consideras que el tratamiento no respeta tus derechos, puedes reclamar ante la <a href="https://www.aepd.es/" target="_blank" rel="noreferrer">Agencia Española de Protección de Datos</a>.</p></section>
    <section className="legal-section"><h2>7. Cambios</h2><p>Esta información se actualizará cuando cambien los tratamientos o el funcionamiento del sitio. La fecha de esta página identifica la versión vigente.</p></section>
  </LegalShell>;
}
