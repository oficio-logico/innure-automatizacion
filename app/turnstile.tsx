'use client';

import { useEffect, useRef, useState } from 'react';

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window { turnstile?: TurnstileApi }
}

let apiPromise: Promise<TurnstileApi> | undefined;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile unavailable'));
    script.onerror = () => { apiPromise = undefined; script.remove(); reject(new Error('Turnstile unavailable')); };
    document.head.appendChild(script);
  });
  return apiPromise;
}

export function Turnstile({ siteKey, onToken }: { siteKey: string; onToken: (token: string) => void }) {
  const element = useRef<HTMLDivElement>(null);
  const onTokenRef = useRef(onToken);
  const [failed, setFailed] = useState(false);
  useEffect(() => { onTokenRef.current = onToken; }, [onToken]);

  useEffect(() => {
    let disposed = false;
    let widgetId: string | undefined;
    let api: TurnstileApi | undefined;
    loadTurnstile().then((loadedApi) => {
      if (disposed || !element.current) return;
      api = loadedApi;
      widgetId = api.render(element.current, {
        sitekey: siteKey, action: 'automatizacion', theme: 'light', language: 'es', size: 'flexible',
        'response-field': false,
        callback: (token: string) => { setFailed(false); onTokenRef.current(token); },
        'expired-callback': () => onTokenRef.current(''),
        'error-callback': () => { setFailed(true); onTokenRef.current(''); },
      });
    }).catch(() => { if (!disposed) setFailed(true); });
    return () => { disposed = true; if (api && widgetId) api.remove(widgetId); };
  }, [siteKey]);

  return <div className="form-security">
    <div ref={element} />
    {failed ? <p role="status">No se ha podido cargar la comprobación de seguridad. Recarga la página o escríbenos por correo.</p> : null}
  </div>;
}
