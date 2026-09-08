import type { CSSProperties, ReactNode } from 'react';

export function Icon({ name, className, style }: { name: string; className?: string; style?: CSSProperties }) {
  const paths: Record<string, ReactNode> = {
    connect: <><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M9 6h6a3 3 0 0 1 3 3v6M6 9v6a3 3 0 0 0 3 3h6" /></>,
    spark: <><path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3Z" /><path d="M20 2v4m-2-2h4" /></>,
    tool: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 13l-2 2 2 2m8-4 2 2-2 2m-3-4-2 4" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    document: <><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z" /><path d="M14 3v5h5M9 12h6m-6 4h6" /></>,
    report: <><path d="M4 3v18h17M8 16v-4m5 4V7m5 9v-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    windows: <><rect x="3" y="7" width="14" height="13" rx="2" /><path d="M7 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2M3 11h14" /></>,
    play: <><rect x="2" y="4" width="20" height="14" rx="2" /><path d="m10 8 5 3-5 3V8ZM8 21h8" /></>,
    chat: <><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 3V6a2 2 0 0 1 2-2Z" /><path d="M7 9h10M7 13h6" /></>,
    contacts: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M5 17v-1a4 4 0 0 1 8 0v1M16 8h2m-2 4h2m-2 4h2" /></>,
    invoice: <><path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Z" /><path d="M9 7h6M9 11h6M9 15h3" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  };
  return <svg className={className} style={style} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.connect}</svg>;
}
