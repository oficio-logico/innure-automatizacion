'use client';
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';
import { withBasePath } from './site-content';

type ExperienceItem = { name: string; logo?: string; tone?: 'color'; markOnly?: boolean };

export function ExperienceMarquee({ title, items }: { title: string; items: ExperienceItem[] }) {
  const [paused, setPaused] = useState(false);

  const logos = (duplicate: boolean) => (
    <ul className="experience-logos" aria-hidden={duplicate ? true : undefined}>
      {items.map((item) => <li key={item.name}>
        {item.logo && <img className={item.tone === 'color' ? 'is-color' : undefined}
          src={withBasePath(item.logo)} alt={item.markOnly ? '' : item.name}
          width="120" height="40" loading="eager" />}
        {(!item.logo || item.markOnly) && <span>{item.name}</span>}
      </li>)}
    </ul>
  );

  return <section className="experience-strip" aria-labelledby="experience-title">
    <div className="shell experience-heading">
      <h2 className="eyebrow" id="experience-title">{title}</h2>
      <button className="experience-motion-control" type="button" onClick={() => setPaused(!paused)}
        aria-label={paused ? 'Reanudar movimiento de logos' : 'Pausar movimiento de logos'}>
        {paused ? 'Reanudar' : 'Pausar'}
      </button>
    </div>
    <div className="experience-window">
      <div className={`experience-track${paused ? ' is-paused' : ''}`}>
        {logos(false)}
        {logos(true)}
      </div>
    </div>
  </section>;
}
