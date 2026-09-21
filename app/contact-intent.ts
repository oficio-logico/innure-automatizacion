/** Public example labels only. No draft data is put in URLs or browser storage. */
export type ContactNeed = { id: string; label: string; contactPrompt: string };
export type ContactSource = { path: string; label: string; prompt: string };

export function resolveContactNeed(needs: readonly ContactNeed[], id: string | null) {
  return needs.find((need) => need.id === id) ?? null;
}

export function prepareContactProcess(detail: string, need: ContactNeed | null, source?: ContactSource) {
  const context = need ? `Tarea a revisar: ${need.label}\n\n${detail}` : detail;
  return source ? `Página de consulta: ${source.path}\n\n${context}` : context;
}

/** Reserve space for the optional label within the existing receiver's limit. */
export function contactDetailLimit(need: ContactNeed | null, source?: ContactSource) {
  return 3000 - prepareContactProcess('', need, source).length;
}
