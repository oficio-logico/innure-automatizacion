/* eslint-disable @next/next/no-img-element */
import { ContactForm, CurrentYear, MobileNavigation } from './interactive';
import { siteContent, withBasePath } from './site-content';

export const dynamic = 'force-static';

function PhotoCredit({ author, sourceUrl }: { author: string; sourceUrl: string }) {
  return (
    <figcaption className="photo-credit">
      Foto ·{' '}
      <a href={sourceUrl} target="_blank" rel="noreferrer">
        {author} / Unsplash
      </a>
    </figcaption>
  );
}

export default function Home() {
  const {
    brand,
    navigation,
    hero,
    sections,
    photography,
    problems,
    capabilities,
    example,
    method,
    principles,
    founders,
    faqs,
    contact,
  } = siteContent;

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#inicio" aria-label="Volver al inicio">
            <span>{brand.displayName}</span>
            <small>{brand.statusLabel}</small>
          </a>

          <nav className="desktop-nav" aria-label="Navegación principal">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="button button-small" href="#contacto">
            Contadnos qué se repite
          </a>

          <MobileNavigation />
        </div>
      </header>

      <main id="contenido">
        <section className="editorial-hero" id="inicio" aria-labelledby="hero-title">
          <figure className="editorial-hero-image">
            <img
              src={photography.hero.src}
              alt={photography.hero.alt}
              width={photography.hero.width}
              height={photography.hero.height}
              fetchPriority="high"
              decoding="async"
            />
            <PhotoCredit author={photography.hero.author} sourceUrl={photography.hero.sourceUrl} />
          </figure>

          <div className="editorial-hero-card">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 id="hero-title">{hero.title}</h1>
            <p className="hero-lede">{hero.description}</p>

            <div className="hero-actions" aria-label="Acciones principales">
              <a className="button" href="#contacto">
                {hero.primaryCta}
              </a>
              <a className="text-link" href="#como-trabajamos">
                {hero.secondaryCta}
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <p className="hero-note">{hero.support}</p>
          </div>
        </section>

        <aside className="focus-strip" aria-label="Ámbitos de trabajo">
          <span>Miramos el proceso real</span>
          <span>Construimos una solución concreta</span>
          <span>Medimos antes de escalar</span>
        </aside>

        <section
          className="friction-section section-space"
          id="que-resolvemos"
          aria-labelledby="friction-title"
        >
          <div className="shell friction-layout">
            <div className="friction-copy">
              <p className="section-eyebrow">{sections.friction.eyebrow}</p>
              <h2 id="friction-title">{sections.friction.title}</h2>
              <p>{sections.friction.description}</p>
            </div>

            <figure className="friction-photo editorial-photo">
              <img
                src={photography.friction.src}
                alt={photography.friction.alt}
                width={photography.friction.width}
                height={photography.friction.height}
                loading="lazy"
                decoding="async"
              />
              <PhotoCredit
                author={photography.friction.author}
                sourceUrl={photography.friction.sourceUrl}
              />
            </figure>
          </div>

          <div className="shell friction-list" role="list" aria-label="Situaciones habituales">
            {problems.slice(0, 4).map((problem, index) => (
              <article role="listitem" key={problem}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{problem}</p>
              </article>
            ))}
            <aside className="friction-principle">
              <small>Nuestro punto de partida</small>
              <p>
                <strong>Primero el proceso.</strong>
                Después, la tecnología que mejor lo resuelva.
              </p>
            </aside>
          </div>
        </section>

        <section className="solutions-section section-space" aria-labelledby="solutions-title">
          <div className="shell solutions-heading">
            <p className="section-eyebrow">{sections.capabilities.eyebrow}</p>
            <h2 id="solutions-title">{sections.capabilities.title}</h2>
          </div>

          <div className="shell solution-list">
            {capabilities.map((capability) => (
              <article key={capability.number}>
                <span className="solution-number" aria-hidden="true">
                  {capability.number}
                </span>
                <h3>{capability.title}</h3>
                <div>
                  <p>{capability.description}</p>
                  <small>{capability.examples}</small>
                </div>
                <span className="solution-arrow" aria-hidden="true">
                  ↘
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="process-story" aria-labelledby="process-title">
          <figure className="process-photo">
            <img
              src={photography.process.src}
              alt={photography.process.alt}
              width={photography.process.width}
              height={photography.process.height}
              loading="lazy"
              decoding="async"
            />
            <div className="process-photo-title">
              <p className="section-eyebrow">{sections.process.eyebrow}</p>
              <h2 id="process-title">{sections.process.title}</h2>
            </div>
            <PhotoCredit author={photography.process.author} sourceUrl={photography.process.sourceUrl} />
          </figure>

          <div className="shell process-flow" aria-label="Ejemplo de transformación de un proceso">
            {[example.before, example.intervention, example.after].map((phase, index) => (
              <article
                key={phase.title}
                className={index === 1 ? 'process-phase process-phase-active' : 'process-phase'}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{phase.title}</h3>
                <p>{phase.description}</p>
                <ul>
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="shell process-note">{sections.process.note}</p>
        </section>

        <section
          className="method-section section-space"
          id="como-trabajamos"
          aria-labelledby="method-title"
        >
          <div className="shell method-editorial">
            <figure className="structure-photo editorial-photo">
              <img
                src={photography.structure.src}
                alt={photography.structure.alt}
                width={photography.structure.width}
                height={photography.structure.height}
                loading="lazy"
                decoding="async"
              />
              <PhotoCredit
                author={photography.structure.author}
                sourceUrl={photography.structure.sourceUrl}
              />
            </figure>

            <div className="method-copy">
              <p className="section-eyebrow">{sections.method.eyebrow}</p>
              <h2 id="method-title">{sections.method.title}</h2>
              <p className="method-intro">{sections.method.description}</p>

              <ol className="method-steps">
                {method.map((step) => (
                  <li key={step.number}>
                    <span>{step.number}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="shell principles-rail" aria-labelledby="principles-title">
            <div>
              <p className="section-eyebrow">Implantar con control</p>
              <h3 id="principles-title">Lo que no se negocia.</h3>
            </div>
            {principles.map((principle) => (
              <article key={principle.title}>
                <h4>{principle.title}</h4>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>

          <aside className="shell team-band" id="equipo" aria-labelledby="team-title">
            <div>
              <p className="section-eyebrow">{sections.team.eyebrow}</p>
              <h2 id="team-title">{sections.team.title}</h2>
            </div>
            <p>{sections.team.description}</p>
            {founders.some((f) => f.listo) ? null : <small>{sections.team.status}</small>}
          </aside>

          {founders.some((f) => f.listo) ? (
            <div className="shell founders">
              {founders
                .filter((f) => f.listo)
                .map((f) => (
                  <article key={f.number}>
                    {f.photo ? (
                      <img className="founder-photo" src={f.photo} alt={f.name} loading="lazy" />
                    ) : null}
                    <p className="founder-number">{f.number}</p>
                    <h3>{f.name}</h3>
                    <p className="founder-role">{f.role}</p>
                    <p className="founder-career">{f.career}</p>
                  </article>
                ))}
            </div>
          ) : null}
        </section>

        <section className="faq-section section-space" aria-labelledby="faq-title">
          <div className="shell faq-layout">
            <header className="faq-heading">
              <p className="section-eyebrow">{sections.faq.eyebrow}</p>
              <h2 id="faq-title">{sections.faq.title}</h2>
            </header>

            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    <span>{faq.question}</span>
                    <i aria-hidden="true" />
                  </summary>
                  <div>
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section-space" id="contacto" aria-labelledby="contact-title">
          <div className="shell contact-layout">
            <div className="contact-copy">
              <p className="section-eyebrow">{sections.contact.eyebrow}</p>
              <h2 id="contact-title">{sections.contact.title}</h2>
              <p>{sections.contact.description}</p>

              <div className="contact-promise">
                <span>01</span>
                <p>
                  <strong>Leemos el contexto antes de hablar.</strong>
                  La primera conversación sirve para saber si merece la pena probar.
                </p>
              </div>

              {contact.bookingUrl ? (
                <a className="text-link text-link-light" href={contact.bookingUrl}>
                  Reservar directamente <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-main">
          <div>
            <a className="wordmark wordmark-footer" href="#inicio">
              <span>{brand.displayName}</span>
              <small>{brand.statusLabel}</small>
            </a>
            <p>{brand.tagline}</p>
          </div>

          <nav aria-label="Navegación del pie">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer-contact">
            <span>Contacto</span>
            {contact.emailHref ? (
              <a href={`mailto:${contact.emailHref}`}>{contact.email}</a>
            ) : (
              <p>A través del formulario</p>
            )}
          </div>
        </div>

        <div className="shell footer-credits">
          <p>
            Fotografía editorial:{' '}
            {Object.values(photography).map((photo, index) => (
              <span key={photo.author}>
                {index > 0 ? ' · ' : ''}
                <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
                  {photo.author}
                </a>
              </span>
            ))}{' '}
            en Unsplash.
          </p>
          <div>
            <span>© <CurrentYear fallback={2026} /> · Nombre de trabajo · datos legales pendientes</span>
            <a href={withBasePath('/aviso-legal/')}>Aviso legal</a>
            <a href={withBasePath('/privacidad/')}>Privacidad</a>
          </div>
        </div>
      </footer>
    </>
  );
}
