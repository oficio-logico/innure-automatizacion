// Shared by the framework metadata route and the static publishing step.
export const indexableRoutes = ['', 'proyectos/gestor-certificados/'];

export function indexableUrls(base) {
  const normalizedBase = base.replace(/\/$/, '') + '/';
  return indexableRoutes.map((route) => new URL(route, normalizedBase).toString());
}
