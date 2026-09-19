/* eslint-disable @next/next/no-img-element */
import { ContactForm, ContactJourney, CurrentYear, MobileNavigation, ProcessExamples } from './interactive';
import { Icon } from './icons';
import { Portfolio } from './portfolio';
import { PageExperience } from './page-experience';
import { siteContent, withBasePath } from './site-content';

export const dynamic = 'force-static';

export default function Home() {
  const { brand, navigation, hero, landing, contact, founders } = siteContent;
  const publicFounders = founders.filter((founder) => founder.listo);

  return (
    <>
      <PageExperience />
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#inicio" aria-label="innure, volver al inicio">
            <img className="brand-logo" src={withBasePath('/images/innure-logo-white.png')} alt="innure" width="112" height="28" />
            <small>{brand.statusLabel}</small>
          </a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <a className="button button-small header-cta" href="#contacto">Hablemos <Icon name="arrow" /></a>
          <MobileNavigation />
        </div>
      </header>

      <ContactJourney><main id="contenido">
        <section className="hero shell" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true" />{hero.eyebrow}</p>
            <h1 id="hero-title">{hero.title}{' '}<em>{hero.titleAccent}</em></h1>
            <p className="hero-lede">{hero.description}</p>
            <div className="hero-actions">
              <a className="button" href="#contacto">{hero.primaryCta}<Icon name="arrow" /></a>
              <a className="text-link" href="#ejemplos">{hero.secondaryCta}<span aria-hidden="true">↓</span></a>
            </div>
            <p className="hero-note">{hero.support}</p>
          </div>
          <figure className="hero-visual">
            <div className="hero-visual-heading"><Icon name="connect" /><span>De tareas sueltas a un proceso conectado.</span></div>
            <img className="hero-illustration" src={withBasePath('/images/automatizacion-flujo.webp')} srcSet={`${withBasePath('/images/automatizacion-flujo-768.webp')} 768w, ${withBasePath('/images/automatizacion-flujo.webp')} 1536w`} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 850px) calc(50vw - 40px), (max-width: 1300px) 48vw, 620px" alt="Ilustración de correos y datos que recorren un proceso conectado y se convierten en agenda y tareas organizadas, con un reloj que representa el tiempo liberado." width="1536" height="1024" fetchPriority="high" decoding="async" />
            <figcaption className="hero-visual-caption"><span>Correos<br />y datos</span><Icon name="arrow" /><span>Proceso<br />automatizado</span><Icon name="arrow" /><span>Trabajo<br />organizado</span></figcaption>
          </figure>
        </section>

        <div className="shell benefit-strip" aria-label="Lo que buscamos para tu negocio">
          {landing.benefits.map((benefit) => <p key={benefit}><Icon name="check" />{benefit}</p>)}
        </div>

        <section className="services section-space" id="que-hacemos" aria-labelledby="services-title">
          <div className="shell">
            <div className="section-heading">
              <div><p className="eyebrow">Qué hacemos</p><h2 id="services-title">Resolvemos ese «esto debería<br className="desktop-break" /> ser más fácil».</h2></div>
              <p>Nos cuentas qué falla o qué te quita tiempo. Nosotros nos encargamos de convertirlo en una solución que puedas usar.</p>
            </div>
            <div className="services-grid">
              {landing.services.map((service) => (
                <article className="service" key={service.number}>
                  <div className="service-top"><Icon name={service.icon} /><span>{service.number}</span></div>
                  <h3>{service.title}</h3><p>{service.description}</p><p className="service-example">{service.example}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="examples-section section-space" id="ejemplos" aria-labelledby="examples-title">
          <div className="shell">
            <div className="section-heading">
              <div><p className="eyebrow">¿Os pasa algo de esto?</p><h2 id="examples-title">Así cambia el día a día.</h2></div>
              <p>Elige la tarea que reconoces en tu negocio. Mira cómo podríamos simplificarla, con tu equipo al mando.</p>
            </div>
            <ProcessExamples />
          </div>
        </section>

        <Portfolio />

        <section className="method-section section-space" id="como-trabajamos" aria-labelledby="method-title">
          <div className="shell">
            <div className="section-heading">
              <div><p className="eyebrow">Cómo trabajamos</p><h2 id="method-title">Un problema concreto.<br />Una solución bien hecha.</h2></div>
              <p>Empezamos por algo que puedas comprobar. Con alcance y presupuesto acordados antes de construir.</p>
            </div>
            <ol className="method-steps" role="list">
              {landing.method.map((step) => <li key={step.number}><span className="step-number">{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}
            </ol>
            <div className="method-assurance"><Icon name="check" /><p>Probamos antes de implantar. Tú mantienes el control de los datos y las decisiones importantes.</p></div>
          </div>
        </section>

        <section className="innure-section" id="equipo" aria-labelledby="innure-title">
          <div className="shell innure-layout">
            <div><p className="eyebrow">El equipo detrás</p><h2 id="innure-title">Ingeniería, producto<br />y negocio.</h2></div>
            <div className="innure-description">
              <p>Dos perfiles complementarios y años emprendiendo juntos. Tecnología, producto y negocio en la misma conversación.</p>
              <a className="text-link" href={brand.parentUrl} target="_blank" rel="noreferrer">Conoce también nuestro trabajo en pruebas de rendimiento <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          {publicFounders.length ? <div className="shell founders">{publicFounders.map((founder) => <article className="founder-card" key={founder.number} aria-labelledby={`founder-${founder.number}`}>
            <div className="founder-heading">
              {founder.photo ? <span className="founder-photo"><img src={withBasePath(founder.photo)} alt={founder.name} width="320" height="320" loading="lazy" style={{ transform: `scale(${founder.photoScale})` }} /></span> : <span className="founder-initials" aria-hidden="true">{founder.initials}</span>}
              <div className="founder-identity"><h3 id={`founder-${founder.number}`}>{founder.name}</h3><p className="founder-role">{founder.role}</p></div>
            </div>
            {founder.biography ? <p className="founder-biography">{founder.biography}</p> : null}
            <div className="founder-expertise"><p className="eyebrow">Especialidades</p><ul className="founder-skills" aria-label={`Especialidades de ${founder.name}`}>{founder.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>
            <ul className="founder-highlights">{founder.highlights.map(item => <li key={item.titulo}><Icon name="check" /><div><h4>{item.titulo}</h4><p>{item.texto}</p></div></li>)}</ul>
            <div className="founder-links"><a className="text-link" href={withBasePath(founder.project.href)}>{founder.project.texto}<Icon name="arrow" /></a>{founder.linkedin ? <a className="text-link founder-link" href={founder.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a> : null}</div>
          </article>)}</div> : null}
          <div className="shell team-story">
            <div className="team-story-heading"><div><p className="eyebrow">Un camino compartido</p><h3>También hemos estado al otro lado.</h3></div><p>La experiencia no es solo lo que salió bien.</p></div>
            <ul className="team-experience">
              <li><span aria-hidden="true">01</span><h4>Hemos emprendido</h4><p>Cofundadores de Ender Hookah y Collapp. Años pasando de la idea a poner negocios en marcha, juntos.</p></li>
              <li><span aria-hidden="true">02</span><h4>Hemos aprendido</h4><p>Hemos acertado, cometido errores y cambiado de rumbo. Por eso preguntamos antes de construir y priorizamos lo útil.</p></li>
              <li><span aria-hidden="true">03</span><h4>Conocemos el día a día</h4><p>Emprender en España también es gestionar clientes, proveedores, trámites y presupuestos. La solución tiene que encajar con esa realidad.</p></li>
            </ul>
            <div className="team-direct"><p><strong>Trato directo, de principio a fin.</strong> Hablas con quienes van a entender tu problema y construir la solución.</p><a className="text-link" href="#contacto">Cuéntanos tu caso<Icon name="arrow" /></a></div>
          </div>
        </section>

        <section className="faq-section section-space" aria-labelledby="faq-title">
          <div className="shell faq-layout">
            <div><p className="eyebrow">Antes de hablar</p><h2 id="faq-title">Lo que quizá<br />te estás preguntando.</h2></div>
            <div className="faq-list">
              {landing.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}
            </div>
          </div>
        </section>

        <section className="contact-section section-space" id="contacto" aria-labelledby="contact-title">
          <div className="shell contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">{landing.review.eyebrow}</p>
              <h2 id="contact-title">{landing.review.title}</h2>
              <p>{landing.review.description}</p>
              <ul className="review-outcomes" aria-label="Qué aclararemos en la conversación">
                {landing.review.outcomes.map((outcome) => <li key={outcome}><Icon name="check" /><span>{outcome}</span></li>)}
              </ul>
              <div className="contact-next"><Icon name="mail" /><p>{landing.review.next}</p></div>
              {contact.emailHref ? <a className="contact-email" href={'mailto:' + contact.emailHref}>{contact.email}<span aria-hidden="true">↗</span></a> : null}
            </div>
            <ContactForm />
          </div>
        </section>
      </main></ContactJourney>

      <footer className="site-footer">
        <div className="shell footer-main">
          <a className="wordmark" href="#inicio"><img className="brand-logo" src={withBasePath('/images/innure-logo-color.png')} alt="innure" width="112" height="28" /><small>{brand.statusLabel}</small></a>
          <p>{brand.tagline}</p><a className="text-link" href="#contacto">Hablemos <Icon name="arrow" /></a>
        </div>
        <div className="shell footer-bottom">
          <span>© <CurrentYear fallback={new Date().getFullYear()} /> innure</span>
          <nav aria-label="Información legal"><a href={withBasePath('/aviso-legal/')}>Aviso legal</a><a href={withBasePath('/privacidad/')}>Privacidad</a>{siteContent.advertising.conversionDestination ? <button type="button" className="measurement-settings" data-automation-measurement>Configurar medición</button> : null}</nav>
          <a href={brand.parentUrl} target="_blank" rel="noreferrer">innure.es ↗</a>
        </div>
      </footer>
    </>
  );
}
