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
    let size: 'compact' | 'flexible' | undefined;
    let observer: ResizeObserver | undefined;
    const render = () => {
      if (disposed || !api || !element.current || element.current.clientWidth === 0) return;
      // Flexible tiene un mínimo de 300 px; el modo compacto cabe en formularios estrechos.
      const nextSize = element.current.clientWidth < 300 ? 'compact' : 'flexible';
      if (widgetId && size === nextSize) return;
      if (widgetId) api.remove(widgetId);
      onTokenRef.current('');
      size = nextSize;
      widgetId = api.render(element.current, {
        sitekey: siteKey, action: 'automatizacion', theme: 'light', language: 'es', size,
        'response-field': false,
        callback: (token: string) => { if (!disposed) { setFailed(false); onTokenRef.current(token); } },
        'expired-callback': () => { if (!disposed) onTokenRef.current(''); },
        'error-callback': () => { if (!disposed) { setFailed(true); onTokenRef.current(''); } },
      });
    };
    loadTurnstile().then((loadedApi) => {
      if (disposed || !element.current) return;
      api = loadedApi;
      observer = new ResizeObserver(render);
      observer.observe(element.current);
      render();
    }).catch(() => { if (!disposed) setFailed(true); });
    return () => { disposed = true; observer?.disconnect(); if (api && widgetId) api.remove(widgetId); };
  }, [siteKey]);

  return <div className="form-security">
    <div ref={element} />
    {failed ? <p role="status">No se ha podido cargar la comprobación de seguridad. Recarga la página o escríbenos por correo.</p> : null}
  </div>;
}
