import type { Metadata } from 'next';
import { siteContent, withBasePath } from '../site-content';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Privacidad — borrador pendiente',
  description: 'Política de privacidad provisional pendiente de completar y validar antes de publicar.',
};

export default function PrivacyPage() {
  const { brand, contact, legal } = siteContent;

  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="shell header-inner">
          <a className="wordmark" href={withBasePath('/')} aria-label="Volver al inicio">
            <span>{brand.displayName}</span>
            <small>{brand.statusLabel}</small>
          </a>
          <a className="legal-back" href={withBasePath('/')}>
            ← Volver a la página principal
          </a>
        </div>
      </header>

      <main>
        <section className="legal-hero shell" aria-labelledby="privacy-title">
          <p className="legal-status">Borrador incompleto · no publicar</p>
          <div>
            <h1 id="privacy-title">Política de privacidad</h1>
            <p>
              El formulario está desactivado en esta vista de revisión y no transmite ni conserva datos. Esta estructura debe completarse y validarse cuando se elija el servicio de recepción real.
            </p>
          </div>
        </section>

        <div className="legal-content shell">
          <aside className="legal-toc">
            <strong>Estado del documento</strong>
            Sin tratamiento activo.<br />
            Responsable pendiente.<br />
            Proveedores pendientes.<br />
            Revisión jurídica pendiente.
          </aside>

          <article className="legal-article">
            <section className="legal-section">
              <h2>1. Responsable del tratamiento</h2>
              <dl className="legal-data">
                <div>
                  <dt>Responsable</dt>
                  <dd>{legal.companyName}</dd>
                </div>
                <div>
                  <dt>NIF</dt>
                  <dd>{legal.taxId}</dd>
                </div>
                <div>
                  <dt>Domicilio</dt>
                  <dd>{legal.registeredAddress}</dd>
                </div>
                <div>
                  <dt>Contacto de privacidad</dt>
                  <dd>{legal.privacyContact}</dd>
                </div>
              </dl>
            </section>

            <section className="legal-section">
              <h2>2. Datos y finalidad prevista</h2>
              <p>
                Cuando el formulario se conecte a un servicio real, está previsto recoger nombre, empresa, correo profesional, teléfono opcional y la descripción del proceso facilitada por la persona interesada. La finalidad será responder a la consulta y valorar una primera conversación sobre ese proceso.
              </p>
              <p className="legal-note">
                En la vista de revisión actual, pulsar el botón no envía información y muestra un aviso explícito dentro del propio formulario.
              </p>
            </section>

            <section className="legal-section">
              <h2>3. Base jurídica, conservación y destinatarios</h2>
              <p>
                La base jurídica prevista es el consentimiento solicitado mediante la casilla del formulario, pendiente de validación jurídica. Antes de activar la recepción deben definirse y documentarse:
              </p>
              <ul>
                <li>{legal.retentionPeriod}.</li>
                <li>{legal.serviceProviders}.</li>
                <li>La ubicación del tratamiento y, en su caso, las transferencias internacionales.</li>
                <li>Las medidas operativas para atender solicitudes y retirar el consentimiento.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Derechos</h2>
              <p>
                La versión definitiva deberá explicar cómo ejercer los derechos que resulten aplicables y facilitar un canal operativo. El contacto actual es {contact.email}.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Cookies y medición</h2>
              <p>
                Esta versión no incorpora analítica, publicidad, rastreadores ni cookies no esenciales. Si se añaden en el futuro, habrá que actualizar esta política y valorar el mecanismo de consentimiento correspondiente antes de activarlos.
              </p>
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}
