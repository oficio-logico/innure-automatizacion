// Shared by the framework metadata route and the static publishing step.
import { projectRegistry } from './project-registry.mjs';
export const indexableRoutes = ['', 'proyectos/', ...projectRegistry.map(project => `proyectos/${project.slug}/`)];

export function indexableUrls(base) {
  const normalizedBase = base.replace(/\/$/, '') + '/';
  return indexableRoutes.map((route) => new URL(route, normalizedBase).toString());
}
