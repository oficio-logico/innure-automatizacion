/** Proyectos contrastados con sus fuentes locales el 08-09-2026.
 * No convertir una beta en un producto público ni inventar clientes o resultados.
 * Trazabilidad y enlaces comprobados: PROYECTOS_VERIFICADOS.md.
 */
export const certificateProject = {
  name: 'Gestor de Certificados',
  category: 'Gestorías y despachos',
  status: 'Aplicación propia · En validación',
  title: 'El certificado correcto, sin perderte entre cientos.',
  description: 'Una aplicación para Windows que reúne búsqueda de clientes, accesos a trámites y control de caducidades en un mismo lugar.',
  image: '/images/proyectos/gestor-certificados.webp',
  imageAlt: 'Captura de desarrollo del Gestor de Certificados: buscador, lista de certificados, trámites y ficha del cliente. Datos sintéticos.',
  imageWidth: 1600,
  imageHeight: 823,
  href: '/proyectos/gestor-certificados/',
  // No existe una web o descarga pública verificada del producto.
  productUrl: null as string | null,
  walkthrough: [
    { title: 'Localizar', description: 'Un buscador y filtros para encontrar el certificado sin recorrer toda la lista.' },
    { title: 'Reconocer', description: 'Una ficha con alias, etiquetas, responsable y notas para mantener el contexto.' },
    { title: 'Anticiparse', description: 'Avisos de caducidad visibles para saber qué necesita atención.' },
  ],
  features: [
    { title: 'Encuentra al cliente', description: 'Busca por nombre, NIF, alias o etiquetas para reconocer el certificado que necesitas.' },
    { title: 'Abre el trámite', description: 'Accede desde Chrome o Edge a los trámites que se acuerden y comprueben para cada despacho.' },
    { title: 'Controla las caducidades', description: 'Consulta los avisos y organiza las fichas con responsables, etiquetas y notas locales.' },
  ],
};

export type FeaturedProject = {
  id: string;
  name: string;
  category: string;
  description: string;
  status: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  href: string | null;
  linkLabel: string;
};

export const sientaProject: FeaturedProject = {
    id: 'sienta', name: 'SIENTA', category: 'Reservas y operaciones de sala',
    description: 'Reservas, disponibilidad y plano de mesas en un mismo lugar. Una herramienta para coordinar el trabajo diario de un restaurante.',
    status: 'Prototipo propio · Demo local con datos ficticios',
    image: '/images/proyectos/sienta.webp', imageAlt: 'Demo local de SIENTA con un plano de mesas, disponibilidad y avisos de sala. Negocio y datos ficticios.',
    imageWidth: 1280, imageHeight: 1100,
    href: '/images/proyectos/sienta.webp', linkLabel: 'Ampliar la captura',
};

export const featuredProjects: FeaturedProject[] = [
  sientaProject,
  {
    id: 'metro', name: 'Oposición Metro', category: 'Formación y aprendizaje',
    description: 'Temario, tests, simulacros y repaso espaciado en una plataforma web que guarda el progreso de estudio en el navegador.',
    status: 'Proyecto propio · Web abierta · Sin vinculación con Metro de Madrid',
    image: '/images/proyectos/oposicion-metro.webp', imageAlt: 'Pantalla pública de Oposición Metro con las siete partes del temario y sus preguntas, sin progreso personal.',
    imageWidth: 1280, imageHeight: 900,
    href: 'https://oposicion-metro.pages.dev/', linkLabel: 'Abrir la plataforma',
  },
];

export type UtilityProject = {
  name: string;
  description: string;
  status: string;
  image: string | null;
  artwork?: 'clip' | 'focus' | 'windows';
  icon?: string;
  href: string | null;
  linkLabel?: string;
};

export const utilityProjects: UtilityProject[] = [
  {
    name: 'Clipappboard',
    description: 'Un historial local para encontrar, organizar y reutilizar textos, imágenes y enlaces copiados en el Mac.',
    status: 'Aplicación propia · Beta privada para macOS',
    image: '/images/proyectos/suite-calm-layers.webp', artwork: 'clip', href: null,
  },
  {
    name: 'PomodoroUtility',
    description: 'Concentración y descansos con un temporizador discreto y recordatorios de agua, movimiento y descanso visual.',
    status: 'Aplicación propia · Versión local para macOS',
    image: '/images/proyectos/suite-calm-layers.webp', artwork: 'focus', href: null,
  },
  {
    name: 'WindowUtility',
    description: 'Encuentra y previsualiza las ventanas del Mac por aplicación para volver a la que necesitas sin ir probando una a una.',
    status: 'Aplicación propia · Beta local para macOS',
    image: '/images/proyectos/suite-calm-layers.webp', artwork: 'windows', href: null,
  },
];

/** App propia aclarada por el usuario; no es IPTVnator. Sin descarga pública. */
export const mediaProject: UtilityProject = {
  name: 'Claro IPTV',
  description: 'Un reproductor propio para organizar listas IPTV, ver contenido en directo y retomar la reproducción de vídeo.',
  status: 'App propia en desarrollo · Nombre provisional',
  image: '/images/proyectos/claro-iptv.webp', href: null,
};

/** Líneas de trabajo aportadas por el usuario. No se atribuyen clientes,
 * métricas, integraciones concretas ni cumplimiento normativo no comprobados. */
export const businessProjects = [
  { name: 'Chatbots personalizados', icon: 'chat', description: 'Asistentes adaptados a la información, los servicios y la forma de atender de cada empresa.' },
  { name: 'CRM a medida', icon: 'contacts', description: 'Clientes, oportunidades y seguimiento comercial en una herramienta adaptada al negocio.' },
  { name: 'Apps de facturación', icon: 'invoice', description: 'Creación y organización de facturas, con los datos y documentos reunidos en un mismo sitio.' },
];

export const musicWorkflow = {
  name: 'Preparación de una biblioteca musical',
  title: 'De repetir lo mismo con cada archivo a preparar un lote.',
  description: 'Creamos una herramienta para un flujo de DJ: detecta nuevos archivos, prepara formatos y carátulas y señala posibles problemas de calidad para revisarlos.',
  steps: [
    { icon: 'document', title: 'Llegan los archivos', detail: 'Una carpeta vigilada' },
    { icon: 'connect', title: 'Se preparan', detail: 'Formatos y carátulas' },
    { icon: 'report', title: 'Se analizan', detail: 'Posibles problemas de audio' },
    { icon: 'check', title: 'Revisión final', detail: 'Informe y archivos separados' },
  ],
  takeaway: 'El mismo enfoque se puede estudiar para documentos, imágenes o archivos de tu empresa.',
};
