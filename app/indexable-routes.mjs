// Shared by the framework metadata route and the static publishing step.
import { projectRegistry } from './project-registry.mjs';
import { solutionSlugs } from './solution-catalog.mjs';
export const indexableRoutes = ['', 'proyectos/', ...projectRegistry.map(project => `proyectos/${project.slug}/`), 'soluciones/', ...solutionSlugs.map(slug => `soluciones/${slug}/`), 'guias/seguimiento-presupuestos/'];

export function indexableUrls(base) {
  const normalizedBase = base.replace(/\/$/, '') + '/';
  return indexableRoutes.map((route) => new URL(route, normalizedBase).toString());
}

export function sitemapUrls(base) {
  const urls = indexableUrls(base);
  if (new URL(base).href === 'https://www.innure.es/') urls.push('https://www.innure.es/rendimiento/');
  return urls;
}
