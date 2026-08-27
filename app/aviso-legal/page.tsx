import type { Metadata } from 'next';
import { siteContent, withBasePath } from '../site-content';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Aviso legal — borrador pendiente',
  description: 'Aviso legal provisional pendiente de completar y validar antes de publicar.',
};

export default function LegalNoticePage() {
  const { brand, legal } = siteContent;

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
        <section className="legal-hero shell" aria-labelledby="legal-title">
          <p className="legal-status">Borrador incompleto · no publicar</p>
          <div>
            <h1 id="legal-title">Aviso legal</h1>
            <p>
              Esta página deja preparada la estructura mínima, pero no puede considerarse un aviso legal definitivo hasta completar la identidad del titular y someter el texto a revisión jurídica.
            </p>
          </div>
        </section>

        <div className="legal-content shell">
          <aside className="legal-toc">
            <strong>Estado del documento</strong>
            Estructura preparada.<br />
            Datos del titular pendientes.<br />
            Revisión jurídica pendiente.
          </aside>

          <article className="legal-article">
            <section className="legal-section">
              <h2>1. Titular del sitio</h2>
              <p>
                Los datos obligatorios de identificación no se han facilitado. Deben completarse antes de publicar el sitio.
              </p>
              <dl className="legal-data">
                <div>
                  <dt>Marca</dt>
                  <dd>{brand.finalName}</dd>
                </div>
                <div>
                  <dt>Dominio</dt>
                  <dd>{brand.domain}</dd>
                </div>
                <div>
                  <dt>Razón social</dt>
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
                  <dt>Datos registrales</dt>
                  <dd>{legal.registryDetails}</dd>
                </div>
              </dl>
            </section>

            <section className="legal-section">
              <h2>2. Objeto</h2>
              <p>
                El sitio presenta servicios de análisis de procesos, automatización, desarrollo de software a medida e implantación práctica de soluciones apoyadas en inteligencia artificial para empresas.
              </p>
            </section>

            <section className="legal-section">
              <h2>3. Uso del sitio</h2>
              <p>
                La información tiene carácter general y no constituye una oferta vinculante. Las condiciones, alcance y responsabilidades de cada piloto o proyecto deberán acordarse expresamente entre las partes.
              </p>
            </section>

            <section className="legal-section">
              <h2>4. Propiedad intelectual y enlaces</h2>
              <p>
                La titularidad de la marca, los textos, el diseño y el software deberá confirmarse con los datos definitivos del proyecto. Cualquier mención a servicios o sitios de terceros deberá revisarse antes de publicar.
              </p>
              <p className="legal-note">
                Nota de implementación: completar la identidad del titular, revisar las cláusulas aplicables y sustituir este borrador por una versión validada antes de activar la publicación.
              </p>
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}
