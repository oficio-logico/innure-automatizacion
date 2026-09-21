'use client';

import { createContext, FormEvent, ReactNode, useContext, useRef, useState, useSyncExternalStore } from 'react';
import { siteContent, withBasePath } from './site-content';
import { Icon } from './icons';
import { Turnstile } from './turnstile';
import { contactDetailLimit, prepareContactProcess, resolveContactNeed } from './contact-intent';

declare global {
  interface Window { innureAutomationAttribution?: () => Record<string, string> }
}

const ContactIntentContext = createContext<{
  needId: string | null;
  selectNeed: (id: string | null) => void;
}>({
  needId: null,
  selectNeed: () => {},
});

/** The example choice lives only on this page; the visitor's draft stays in the form. */
export function ContactJourney({ children }: { children: ReactNode }) {
  const [needId, selectNeed] = useState<string | null>(null);
  return <ContactIntentContext.Provider value={{ needId, selectNeed }}>{children}</ContactIntentContext.Provider>;
}

export function ProcessExamples() {
  const { selectNeed } = useContext(ContactIntentContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const examples = siteContent.landing.examples;
  const active = examples[activeIndex];
  return (
    <div className="examples">
      <div className="example-tabs" role="tablist" aria-label="Elige un ejemplo">
        {examples.map((example, index) => (
          <button type="button" role="tab" key={example.id}
            id={'tab-' + example.id} aria-controls="example-panel"
            aria-selected={index === activeIndex} tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => {
              let nextIndex = index;
              if (event.key === 'ArrowRight') nextIndex = (index + 1) % examples.length;
              else if (event.key === 'ArrowLeft') nextIndex = (index + examples.length - 1) % examples.length;
              else if (event.key === 'Home') nextIndex = 0;
              else if (event.key === 'End') nextIndex = examples.length - 1;
              else return;
              event.preventDefault();
              setActiveIndex(nextIndex);
              document.getElementById('tab-' + examples[nextIndex].id)?.focus();
            }}>
            <Icon name={example.icon} />{example.label}
          </button>
        ))}
      </div>
      <div className="example-panel" id="example-panel" role="tabpanel" aria-labelledby={'tab-' + active.id} tabIndex={0}>
        <div className="example-scene" key={active.id}>
        <div className="example-story">
          <h3>{active.title}</h3>
          <div className="before-after"><div><span>Ahora, a mano</span><p>{active.before}</p></div><div><span>Con la solución</span><p>{active.after}</p></div></div>
        </div>
        <ol className="process-flow" role="list">
          {active.steps.map((step, index) => <li key={step.title}>
            <div className="flow-icon"><Icon name={step.icon} /><span>{index + 1}</span></div>
            <h4>{step.title}</h4><p>{step.detail}</p>
          </li>)}
        </ol>
        </div>
      </div>
      <div className="example-bottom">
        <p className="example-note">Ejemplo ilustrativo. Comprobamos qué es viable en tus herramientas.</p>
        <a className="text-link" href="#contacto" onClick={() => {
          selectNeed(active.id);
          document.getElementById('contact-form-title')?.focus({ preventScroll: true });
        }}>Quiero revisar esta tarea <Icon name="arrow" /></a>
      </div>
    </div>
  );
}

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="mobile-navigation" data-open={isOpen} onKeyDown={(event) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu();
        menuButton.current?.focus();
      }
    }}>
      <button
        ref={menuButton}
        className="menu-button"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="menu-label">Menú</span>
        <span className="menu-icon" aria-hidden="true">
          <i />
          <i />
        </span>
      </button>
      <nav id="mobile-menu-panel" aria-label="Navegación móvil" hidden={!isOpen}>
        {siteContent.navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <a href="#contacto" onClick={closeMenu}>Cuéntanos tu caso</a>
        <a className="mobile-legal-link" href={withBasePath('/aviso-legal/')} onClick={closeMenu}>
          Aviso legal
        </a>
        <a className="mobile-legal-link" href={withBasePath('/privacidad/')} onClick={closeMenu}>
          Privacidad
        </a>
      </nav>
    </div>
  );
}

type FormStatus =
  | { kind: 'idle'; message: string }
  | { kind: 'sending'; message: string }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string }
  | { kind: 'local'; message: string };

export function ContactForm() {
  // The static document stays inert until React can handle submission safely.
  const isHydrated = useSyncExternalStore(neverChanges, () => true, () => false);
  const { needId, selectNeed } = useContext(ContactIntentContext);
  const selectedNeed = resolveContactNeed(siteContent.landing.examples, needId);
  const processInput = useRef<HTMLTextAreaElement>(null);
  const sending = useRef(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [challengeKey, setChallengeKey] = useState(0);
  const [status, setStatus] = useState<FormStatus>({
    kind: 'idle',
    message: '',
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!isHydrated || sending.current || !form.reportValidity()) return;
    const data = new FormData(form);
    if (String(data.get('website') || '').trim()) return;
    const detail = String(data.get('process') || '').trim();
    if (detail.length < 20) {
      setStatus({ kind: 'error', message: 'Añade al menos 20 caracteres sobre cómo os ocurre. Elegir una tarea no sustituye tu explicación.' });
      processInput.current?.focus();
      return;
    }
    if (detail.length > contactDetailLimit(selectedNeed)) {
      setStatus({ kind: 'error', message: `Acorta el detalle a ${contactDetailLimit(selectedNeed)} caracteres para incluir la tarea elegida. Tu texto se ha conservado.` });
      processInput.current?.focus();
      return;
    }
    // The optional context travels only with the consultation, never with analytics.
    data.set('process', prepareContactProcess(detail, selectedNeed));

    if (!siteContent.contact.formEndpoint) {
      // Sin servicio de recepción todavía. Si hay un correo publicado, no
      // perdemos la solicitud: preparamos el mensaje y lo abrimos en el
      // programa de correo de la persona. Nada sale del navegador por su
      // cuenta: quien envía es siempre ella.
      if (siteContent.contact.emailHref) {
        const value = (field: string) => String(data.get(field) ?? '').trim();
        const subject = `innure · Consulta sobre mi negocio — ${value('company') || value('name')}`;
        const body = [
          `Nombre: ${value('name')}`,
          `Empresa: ${value('company')}`,
          `Correo: ${value('email')}`,
          `Teléfono: ${value('phone') || '—'}`,
          '',
          'Qué queremos resolver:',
          value('process'),
        ].join('\n');

        window.location.assign(`mailto:${siteContent.contact.emailHref}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(body)}`);

        setStatus({
          kind: 'local',
          message:
            'Hemos preparado el mensaje en tu programa de correo. Revísalo y envíalo para que nos llegue.',
        });
        return;
      }

      setStatus({
        kind: 'local',
        message:
          'No se ha enviado nada. Esta vista de revisión aún no tiene conectado un servicio de recepción.',
      });
      return;
    }

    if (!siteContent.contact.turnstileSiteKey || !turnstileToken) {
      setStatus({ kind: 'error', message: 'Completa la comprobación de seguridad antes de enviar. Si no aparece, recarga la página o escríbenos por correo.' });
      return;
    }
    data.set('cf-turnstile-response', turnstileToken);
    const attribution = window.innureAutomationAttribution?.() || {};
    for (const [key, value] of Object.entries(attribution)) data.set(key, value);
    sending.current = true;
    setStatus({ kind: 'sending', message: 'Enviando…' });

    try {
      const response = await fetch(siteContent.contact.formEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(45000),
      });

      // El receptor debe confirmar que el mensaje ha sido aceptado y devolver
      // un ID propio. Una página HTML o un HTTP 200 no acreditan la recepción.
      const result = await response.json() as { success?: boolean; submissionId?: string; message?: string };
      if (!response.ok || result.success !== true ||
          typeof result.submissionId !== 'string' || !/^[a-zA-Z0-9_-]{8,128}$/.test(result.submissionId)) {
        setStatus({ kind: 'error', message: result.message || 'No hemos podido enviar la solicitud. Inténtalo de nuevo o escríbenos por correo.' });
        return;
      }

      form.reset();
      selectNeed(null);
      setStatus({
        kind: 'success',
        message: 'Solicitud enviada. Nos pondremos en contacto contigo.',
      });
      // Evento local para la futura medición con consentimiento. No carga
      // etiquetas ni comparte el contenido del formulario con terceros.
      window.dispatchEvent(new CustomEvent('innure:lead-received', {
        detail: { service: siteContent.contact.serviceId, submissionId: result.submissionId },
      }));
    } catch {
      setStatus({
        kind: 'error',
        message:
          'No hemos podido enviar la solicitud. Inténtalo de nuevo o utiliza el correo de contacto.',
      });
    } finally {
      sending.current = false;
      setTurnstileToken('');
      setChallengeKey((key) => key + 1);
    }
  }

  return (
    <form className="contact-form" method="post" action={siteContent.contact.formEndpoint || undefined} onSubmit={handleSubmit} noValidate={false} aria-labelledby="contact-form-title">
      <h3 className="form-heading" id="contact-form-title" tabIndex={-1}>Cuéntanos por dónde empezar</h3>
      <noscript><p className="local-notice">El formulario necesita JavaScript para enviar tu consulta de forma segura. Puedes escribirnos a <a href={'mailto:' + siteContent.contact.emailHref}>{siteContent.contact.email}</a>.</p></noscript>
      <fieldset className="contact-fields" disabled={!isHydrated} aria-labelledby="contact-form-title">
      <div className="form-interest" hidden={!selectedNeed}>
        <p role="status" aria-live="polite">{selectedNeed ? <><span>Tarea elegida</span><strong>{selectedNeed.label}</strong></> : null}</p>
        <button type="button" onClick={() => {
          selectNeed(null);
          processInput.current?.focus();
        }}>Quitar selección</button>
      </div>
      <input type="hidden" name="service" value={siteContent.contact.serviceId} />
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Deja este campo vacío</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <input id="name" name="name" type="text" autoComplete="name" maxLength={120} required />
        </div>
        <div className="field">
          <label htmlFor="company">Empresa</label>
          <input id="company" name="company" type="text" autoComplete="organization" maxLength={160} required />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="email">Correo profesional</label>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={254} required />
        </div>
        <div className="field">
          <label htmlFor="phone">
            Teléfono <span>opcional</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </div>
      </div>

      <div className="field field-wide">
        <label htmlFor="process">{selectedNeed ? '¿Cómo os ocurre en vuestra empresa?' : '¿Qué os gustaría mejorar?'}</label>
        <textarea
          ref={processInput}
          id="process"
          name="process"
          rows={4}
          minLength={20}
          maxLength={contactDetailLimit(selectedNeed)}
          placeholder={selectedNeed?.contactPrompt || 'Cuéntanos a qué se dedica tu negocio, qué os gustaría mejorar y qué herramientas utilizáis.'}
          required
          aria-describedby="process-help"
        />
        <small id="process-help">
          Unas líneas bastan. No incluyas contraseñas, certificados ni datos de clientes.
        </small>
      </div>

      <div className="consent-row">
        <input id="privacy" name="privacy" type="checkbox" value="accepted" required />
        <label htmlFor="privacy">
          He leído y acepto la{' '}
          <a href={withBasePath('/privacidad/')}>política de privacidad</a>.
        </label>
      </div>

      {siteContent.contact.formEndpoint && siteContent.contact.turnstileSiteKey ?
        <Turnstile key={challengeKey} siteKey={siteContent.contact.turnstileSiteKey} onToken={setTurnstileToken} /> : null}

      {!siteContent.contact.formEndpoint ? (
        <div className="local-notice" role="note">
          <span aria-hidden="true" />
          <p>
            {siteContent.contact.emailHref ? (
              <>
                <strong>En esta versión, el envío se hace por correo.</strong> Al continuar se
                abre un borrador para que lo revises y lo envíes. También puedes usar el{' '}
                <a href={siteContent.contact.externalFormUrl} target="_blank" rel="noreferrer">formulario de innure</a>.
              </>
            ) : (
              <>
                <strong>Vista de revisión:</strong> este formulario no transmite ni guarda datos
                hasta que se configure un servicio de recepción.
              </>
            )}
          </p>
        </div>
      ) : null}

      <div className="form-footer">
        <button className="button submit-button" type="submit" disabled={!isHydrated || status.kind === 'sending'}>
          {siteContent.contact.formEndpoint ? 'Solicitar primera conversación' : 'Preparar mi consulta por correo'}
          <span aria-hidden="true">↗</span>
        </button>
        <p className="form-assurance">Primera conversación gratuita. Sin compromiso.</p>
      </div>

      <p
        className={`form-status form-status-${status.kind}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status.message}
      </p>
      </fieldset>
    </form>
  );
}

/**
 * El pie mostraba `new Date().getFullYear()` desde un componente de servidor.
 * Con exportación estática eso se resuelve AL COMPILAR, así que el año se
 * quedaba congelado en el de la última publicación. Calculado en el navegador
 * vuelve a ser correcto sin necesidad de recompilar cada 1 de enero.
 */
const neverChanges = () => () => {};

export function CurrentYear({ fallback }: { fallback: number }) {
  // `useSyncExternalStore` da el valor del servidor al hidratar (sin desajuste)
  // y el del navegador después, sin escribir estado dentro de un efecto.
  const year = useSyncExternalStore(
    neverChanges,
    () => new Date().getFullYear(),
    () => fallback,
  );

  return <>{year}</>;
}
