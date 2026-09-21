'use client';

import { useState, type ReactNode } from 'react';
import { CaseCard } from './project-views';
import type { ProjectCase } from './project-catalog';

export type PortfolioGroup = {
  id: string;
  label: string;
  /** Slugs de projectCatalog que pertenecen al grupo. No se reescribe ningún dato del proyecto. */
  slugs: string[];
  /** Muestra además la tarjeta de demostración propuesta reservada al grupo. */
  proposed?: boolean;
};

/**
 * Exploración del portfolio con botones de alternancia. Los proyectos llegan
 * como datos serializables desde el componente de servidor; el componente de
 * cliente solo decide qué tarjetas se muestran.
 */
export function PortfolioExplorer({ groups, projects, catalogHref, proposedCard }: {
  groups: PortfolioGroup[];
  projects: ProjectCase[];
  catalogHref: string;
  proposedCard: ReactNode;
}) {
  const [activeId, setActiveId] = useState(groups[0]?.id ?? '');
  const [hasInteracted, setHasInteracted] = useState(false);
  const active = groups.find((group) => group.id === activeId) ?? groups[0];

  const visible = !active
    ? projects
    : projects.filter((project) => (
      active.id === 'seleccion' ? Boolean(project.featured) : active.slugs.includes(project.slug)
    ));

  const select = (id: string) => {
    setHasInteracted(true);
    setActiveId(id);
  };

  return (
    <div className="explorer">
      <div className="explorer-bar">
        <h3 className="explorer-title" id="explorer-title">Explora por tipo de solución</h3>
        <div className="explorer-filters" role="group" aria-labelledby="explorer-title">
          {groups.map((group) => <button
            key={group.id}
            type="button"
            className="explorer-filter"
            aria-pressed={group.id === active?.id}
            onClick={() => select(group.id)}
          >
            {group.label}
            <span className="explorer-count" aria-hidden="true">{group.id === 'seleccion' ? projects.filter((project) => project.featured).length : group.slugs.length}</span>
          </button>)}
        </div>
      </div>

      <p className="explorer-status" role="status">
        {active ? `${active.label}: ${visible.length} de ${projects.length} proyectos${active.proposed ? ', más una demostración propuesta' : ''}.` : ''}
      </p>

      <div className={'case-grid explorer-items' + (hasInteracted ? ' is-filtered' : '')} key={active?.id}>
        {visible.map((project) => <CaseCard key={project.slug} project={project} />)}
        {active?.proposed ? proposedCard : null}
      </div>

      <p className="explorer-note">¿No ves lo que buscas? El <a className="text-link" href={catalogHref}>catálogo completo</a> reúne todos los proyectos y su estado actual.</p>
    </div>
  );
}
