import { ReactNode } from 'react';
import { siteContent, withBasePath } from './site-content';

export function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return <div className="legal-page">
    <header className="legal-header"><div className="shell header-inner">
      <a className="wordmark" href={withBasePath('/')}><span>innure</span><small>{siteContent.brand.statusLabel}</small></a>
      <a className="legal-back" href={withBasePath('/')}>← Volver a la página principal</a>
    </div></header>
    <main>
      <section className="legal-hero shell"><h1>{title}</h1><p>Última actualización: 23 de septiembre de 2026.</p></section>
      <div className="legal-content shell"><aside className="legal-toc"><strong>innure · {siteContent.brand.statusLabel}</strong>
        <p><a href={withBasePath('/aviso-legal/')}>Aviso legal</a></p><p><a href={withBasePath('/privacidad/')}>Privacidad y cookies</a></p>
        <p><a href="mailto:info@innure.es">info@innure.es</a></p>
        {siteContent.advertising.conversionDestination ? <button className="measurement-settings" type="button" data-automation-measurement>Configurar medición</button> : null}
      </aside><article className="legal-article">{children}</article></div>
    </main>
  </div>;
}
