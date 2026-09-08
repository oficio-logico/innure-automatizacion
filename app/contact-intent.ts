/** Public example labels only. No draft data is put in URLs or browser storage. */
export type ContactNeed = { id: string; label: string; contactPrompt: string };

export function resolveContactNeed(needs: readonly ContactNeed[], id: string | null) {
  return needs.find((need) => need.id === id) ?? null;
}

export function prepareContactProcess(detail: string, need: ContactNeed | null) {
  return need ? `Tarea a revisar: ${need.label}\n\n${detail}` : detail;
}

/** Reserve space for the optional label within the existing receiver's limit. */
export function contactDetailLimit(need: ContactNeed | null) {
  return 3000 - prepareContactProcess('', need).length;
}
