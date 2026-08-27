'use client';

import { FormEvent, useState } from 'react';
import { siteContent, withBasePath } from './site-content';

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="mobile-navigation" data-open={isOpen}>
      <button
        className="menu-button"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsOpen((open) => !open);
          }
        }}
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
  const [status, setStatus] = useState<FormStatus>({
    kind: 'idle',
    message: '',
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    if (!siteContent.contact.formEndpoint) {
      setStatus({
        kind: 'local',
        message:
          'No se ha enviado nada. Esta vista de revisión aún no tiene conectado un servicio de recepción.',
      });
      return;
    }

    setStatus({ kind: 'sending', message: 'Enviando…' });

    try {
      const response = await fetch(siteContent.contact.formEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('El servicio no aceptó la solicitud.');

      form.reset();
      setStatus({
        kind: 'success',
        message: 'Solicitud enviada. Nos pondremos en contacto contigo.',
      });
    } catch {
      setStatus({
        kind: 'error',
        message:
          'No hemos podido enviar la solicitud. Inténtalo de nuevo o utiliza el correo de contacto.',
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <input id="name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="company">Empresa</label>
          <input id="company" name="company" type="text" autoComplete="organization" required />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="email">Correo profesional</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor="phone">
            Teléfono <span>opcional</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="field field-wide">
        <label htmlFor="process">¿Qué tarea o proceso se repite?</label>
        <textarea
          id="process"
          name="process"
          rows={5}
          minLength={20}
          required
          aria-describedby="process-help"
        />
        <small id="process-help">
          Basta con explicar qué ocurre, quién interviene y dónde se atasca.
        </small>
      </div>

      <div className="consent-row">
        <input id="privacy" name="privacy" type="checkbox" value="accepted" required />
        <label htmlFor="privacy">
          He leído y acepto la{' '}
          <a href={withBasePath('/privacidad/')}>política de privacidad</a>.
        </label>
      </div>

      <div className="local-notice" role="note">
        <span aria-hidden="true" />
        <p>
          <strong>Vista de revisión:</strong> este formulario no transmite ni guarda datos hasta que se configure un servicio de recepción.
        </p>
      </div>

      <div className="form-footer">
        <button className="button submit-button" type="submit" disabled={status.kind === 'sending'}>
          Pedir una primera conversación
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
    </form>
  );
}
