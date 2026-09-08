/**
 * CONTENIDO EDITABLE Y DATOS DE PUBLICACIÓN
 * -----------------------------------------
 * Esta es la única fuente de verdad para textos, enlaces y datos pendientes.
 * `publishing.ready: false` permite compartir una vista de revisión con
 * `noindex`, pero impide tratarla como una web comercial definitiva.
 */
export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(path: string) {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return `${siteBasePath}${path}`;
}

/* ══════════════════════════════════════════════════════════════════════════
   RELLENAR AQUÍ · datos de negocio pendientes
   ══════════════════════════════════════════════════════════════════════════
   1) CORREO      En cuanto pongas un correo, el formulario deja de ser un
                  callejón sin salida: prepara la solicitud y la abre en el
                  programa de correo de quien escribe (la envía esa persona,
                  no la web). Y el pie deja de decir "a través del
                  formulario" y pone el correo.

   2) FUNDADORES  Nombre, función y trayectoria de los dos. Mientras estén a
                  null, los perfiles individuales no se muestran. La marca
                  se presenta como una línea de Innure. Las fotos son opcionales.

   3) PUBLICAR    Solo la compilación de Innure habilita indexación. Requiere
                  dominio, contacto, información legal y un perfil confirmado.
                  Los perfiles que falten no se publican ni se inventan.

   Los textos legales siguen teniendo datos pendientes. `LEGAL_REVISADO` solo
   puede pasar a true después de completarlos y validarlos expresamente.
   ══════════════════════════════════════════════════════════════════════════ */

/** Correo comercial publicado en www.innure.es, comprobado el 08-09-2026. */
const CORREO = 'info@innure.es';

/** Dirección aprobada: misma marca y dominio, una página por servicio. */
const DOMINIO = 'https://www.innure.es/automatizacion/';

/** true = web publicada e indexable. false = vista de revisión con noindex. */
const PUBLICAR = process.env.NEXT_PUBLIC_PUBLISH === 'true';

/** true solo después de completar y validar aviso legal y privacidad. */
const LEGAL_REVISADO = true;

/** Los dos fundadores. Trayectoria: empresas, periodos y logros comprobables. */
const FUNDADORES: Array<{
  nombre: string | null;
  funcion: string | null;
  trayectoria: string | null;
  foto: string | null;
}> = [
  {
    nombre: 'Sergio Herencias Redondo',
    funcion: 'Fundador · Ingeniería y desarrollo',
    trayectoria: '8 años de experiencia probando el rendimiento de sistemas críticos. Desarrollo de herramientas propias y automatizaciones para resolver problemas concretos, con foco en la calidad y el uso real.',
    foto: '/images/sergio-herencias.jpg',
  },
  { nombre: null, funcion: null, trayectoria: null, foto: null },
];

const FUNDADORES_LISTOS =
  FUNDADORES.some((fundador) =>
    Boolean(fundador.nombre && fundador.funcion && fundador.trayectoria),
  );

/** Ningún interruptor aislado puede retirar las salvaguardas de revisión. */
const LISTA_PARA_PUBLICAR =
  PUBLICAR &&
  LEGAL_REVISADO &&
  Boolean(CORREO && DOMINIO) &&
  FUNDADORES_LISTOS;

export const siteContent = {
  publishing: {
    ready: LISTA_PARA_PUBLICAR,
    pendingMarker: 'PENDING',
    localBaseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },

  brand: {
    displayName: 'innure',
    statusLabel: 'Automatización e IA',
    finalName: 'Innure',
    parentUrl: 'https://www.innure.es/',
    proposedUrl: 'https://www.innure.es/automatizacion/',
    domain: DOMINIO ?? 'PENDING: CONFIRMAR Y PUBLICAR LA RUTA DE INNURE',
    domainCandidate: 'innure.es/automatizacion/',
    tagline: 'Tecnología para hacer más fácil el trabajo de cada día.',
  },

  contact: {
    email: CORREO ?? 'PENDING: EMAIL DE CONTACTO',
    emailHref: CORREO,
    bookingUrl: null as string | null,
    // Contrato: POST FormData -> JSON { success: true, submissionId: string }.
    // El PHP actual de Innure requiere adaptación; no asignar su URL sin ella.
    formEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || null,
    turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null,
    externalFormUrl: 'https://www.innure.es/#contacto',
    serviceId: 'automatizacion-ia',
  },

  advertising: {
    // Solo la conversión de automatización; nunca reutilizar la de rendimiento.
    conversionDestination: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION || null,
  },

  legal: {
    companyName: 'Grupo Empresarial Innure, S.L.',
    taxId: 'B09882580',
    registeredAddress: 'Calle de la Bureba, 1, 5.º A — 28915 Leganés (Madrid), España',
    registryDetails: 'Registro Mercantil de Madrid: tomo 43255, folio 43, sección 8, hoja M-764215.',
    privacyContact: 'info@innure.es',
    publicLegalUrl: 'https://www.innure.es/aviso-legal.html',
    publicPrivacyUrl: 'https://www.innure.es/privacidad.html',
    publicCookiesUrl: 'https://www.innure.es/cookies.html',
    retentionPeriod: 'Durante el tiempo necesario para atender la solicitud y, posteriormente, durante los plazos legalmente exigibles para atender posibles responsabilidades. Puedes solicitar la supresión.',
    serviceProviders: 'DonDominio para alojamiento y transporte de correo; Cloudflare para seguridad y Turnstile; Google para el buzón operativo y, solo con consentimiento, la medición publicitaria.',
  },

  founders: FUNDADORES.map((f, i) => ({
    number: i === 0 ? '01' : '02',
    name: f.nombre ?? `PENDING: NOMBRE DEL FUNDADOR ${i + 1}`,
    publicLabel: `Fundador/a 0${i + 1}`,
    role: f.funcion ?? 'PENDING: FUNCIÓN EXACTA',
    biography: f.trayectoria ?? 'PENDING: BIOGRAFÍA BREVE Y VERIFICADA',
    career: f.trayectoria ?? 'PENDING: EMPRESAS, PERIODOS, FUNCIONES Y LOGROS COMPROBABLES',
    photo: f.foto,
    listo: Boolean(f.nombre && f.funcion && f.trayectoria),
  })),

  navigation: [
    { label: 'Qué hacemos', href: '#que-hacemos' },
    { label: 'Proyectos reales', href: '#proyectos' },
    { label: 'Cómo trabajamos', href: '#como-trabajamos' },
    { label: 'Quiénes somos', href: '#equipo' },
  ],

  seo: {
    title: 'Automatización, IA y herramientas a medida para pymes | Innure',
    description:
      'Automatizamos tareas, conectamos tus aplicaciones e integramos IA en tu pequeña empresa. Herramientas a medida para ahorrar tiempo. Cuéntanos tu caso.',
  },

  hero: {
    eyebrow: 'Automatización e IA para pequeñas empresas',
    title: 'Menos tareas manuales.',
    titleAccent: 'Más tiempo para tu negocio.',
    description:
      'Automatizamos tareas, integramos IA y conectamos las aplicaciones que ya usas. También creamos herramientas a medida para que tu negocio funcione mejor.',
    primaryCta: 'Cuéntanos tu caso',
    secondaryCta: 'Ver un ejemplo',
    support:
      'Primera conversación gratuita. Sin compromiso.',
  },

  landing: {
    benefits: ['Menos copiar y pegar', 'Tus herramientas conectadas', 'Más tiempo para tus clientes'],
    services: [
      {
        number: '01', icon: 'connect', title: 'Automatizamos y conectamos',
        description: 'Hacemos que la información pase de una herramienta a otra y que las tareas repetitivas avancen solas.',
        example: 'Correos, pedidos, facturas, avisos y seguimiento.',
      },
      {
        number: '02', icon: 'spark', title: 'Integramos IA en tu trabajo',
        description: 'Aplicamos IA para leer documentos, organizar información o preparar respuestas que tu equipo puede revisar.',
        example: 'Documentos, consultas, propuestas e informes.',
      },
      {
        number: '03', icon: 'tool', title: 'Creamos tu propia herramienta',
        description: 'Desarrollamos una aplicación a medida cuando las que ya existen no encajan con la forma de trabajar de tu empresa.',
        example: 'Gestión interna, portales y aplicaciones para el equipo.',
      },
    ],
    examples: [
      {
        id: 'pedidos', label: 'Pedidos y facturas', icon: 'document',
        title: 'Del correo a tu herramienta, sin volver a teclearlo.',
        before: 'Llega un pedido por correo. Alguien abre el adjunto, copia los datos y avisa al resto del equipo.',
        after: 'La solución recoge la información, prepara el registro y te pide revisar lo que necesita confirmación.',
        steps: [
          { icon: 'mail', title: 'Llega el correo', detail: 'Con el pedido adjunto' },
          { icon: 'spark', title: 'Se extraen los datos', detail: 'Cliente, productos e importes' },
          { icon: 'check', title: 'Tu equipo revisa', detail: 'Confirma lo importante' },
          { icon: 'connect', title: 'Todo queda registrado', detail: 'En la herramienta que usáis' },
        ],
      },
      {
        id: 'informes', label: 'Informes y documentos', icon: 'report',
        title: 'El informe empieza con los datos reunidos.',
        before: 'Cada semana buscas cifras en varias hojas, las copias y vuelves a preparar el mismo documento.',
        after: 'La solución reúne los datos y prepara un borrador para que puedas dedicarte a revisarlo y sacar conclusiones.',
        steps: [
          { icon: 'connect', title: 'Se reúnen los datos', detail: 'De las fuentes acordadas' },
          { icon: 'report', title: 'Se prepara el informe', detail: 'Con vuestra estructura' },
          { icon: 'check', title: 'Tu equipo revisa', detail: 'Comprueba y completa' },
          { icon: 'document', title: 'Documento listo', detail: 'Para compartir cuando decidas' },
        ],
      },
      {
        id: 'gestion', label: 'Gestión del negocio', icon: 'tool',
        title: 'Un lugar donde saber en qué punto está cada trabajo.',
        before: 'Los encargos viven entre hojas de cálculo, mensajes y notas. Saber qué falta obliga a preguntar a todo el mundo.',
        after: 'Una herramienta a medida reúne los encargos, sus responsables y sus próximos pasos. Cada persona ve lo que le toca.',
        steps: [
          { icon: 'document', title: 'Entra un encargo', detail: 'Con toda su información' },
          { icon: 'tool', title: 'Se organiza el trabajo', detail: 'Responsables y tareas' },
          { icon: 'check', title: 'El equipo actualiza', detail: 'En un único lugar' },
          { icon: 'report', title: 'Ves cómo avanza', detail: 'Sin perseguir actualizaciones' },
        ],
      },
    ],
    method: [
      { number: '01', title: 'Nos cuentas el problema', description: 'Vemos qué tarea os complica el día y qué herramientas utilizáis. La primera conversación es gratuita.' },
      { number: '02', title: 'Te proponemos una solución', description: 'Acordamos qué vamos a resolver, cuánto cuesta y cómo comprobaremos que mejora el trabajo.' },
      { number: '03', title: 'La construimos y la probamos', description: 'Empezamos por un proceso concreto. Integramos la solución y la probamos con tu equipo.' },
      { number: '04', title: 'La ponéis a trabajar', description: 'Os enseñamos a utilizarla, medimos el resultado y acordamos el soporte que necesitéis.' },
    ],
    faqs: [
      { question: '¿También trabajáis con empresas pequeñas?', answer: 'Sí. El servicio está pensado para pequeñas empresas que necesitan resolver un problema concreto: tareas que se repiten, herramientas desconectadas o una gestión que se ha quedado pequeña.' },
      { question: '¿Tengo que saber de IA o tener la solución pensada?', answer: 'No. Cuéntanos qué te hace perder tiempo o qué te gustaría que funcionara mejor. Nosotros estudiamos cómo resolverlo y te explicamos la propuesta en un lenguaje claro.' },
      { question: '¿Hay que cambiar los programas que ya usamos?', answer: 'Primero estudiamos cómo conectar lo que ya utilizáis. Si alguna herramienta no permite integrarse o el cambio no compensa, te lo explicamos antes de presupuestar.' },
      { question: '¿Cuánto cuesta y cuánto tarda?', answer: 'Depende del problema y de las herramientas que haya que conectar o construir. Tras la primera conversación te proponemos un alcance, un presupuesto y un plazo antes de empezar.' },
      { question: '¿Qué pasa con los datos y las decisiones importantes?', answer: 'Antes de construir acordamos qué datos necesita la solución, dónde se tratarán y quién tendrá acceso. Dejamos revisión humana en las tareas que requieren criterio o autorización.' },
      { question: '¿Y después de ponerlo en marcha?', answer: 'Te enseñamos a usar la solución y dejamos acordadas la documentación, el mantenimiento y las posibles mejoras. Si la primera prueba no compensa, revisamos el enfoque antes de ampliar el proyecto.' },
    ],
  },

  photography: {
    hero: {
      src: withBasePath('/images/hero-wall-blue.webp'),
      alt: 'Muro claro proyectando una sombra geométrica bajo un cielo azul intenso.',
      width: 1600,
      height: 2134,
      author: 'Aleksandr Zaitsev',
      sourceUrl: 'https://unsplash.com/photos/white-wall-casting-shadows-against-blue-sky-q2FLAuPAeBc',
    },
    friction: {
      src: withBasePath('/images/paper-stack.webp'),
      alt: 'Pila de documentos marcada con numerosas pestañas adhesivas de colores.',
      width: 1800,
      height: 1200,
      author: 'Tanja Tepavac',
      sourceUrl: 'https://unsplash.com/photos/stack-of-papers-marked-with-colorful-sticky-tabs-81ikZZG7_AA',
    },
    process: {
      src: withBasePath('/images/printing-machine.webp'),
      alt: 'Detalle de una máquina de impresión moviendo papel entre rodillos.',
      width: 2000,
      height: 1335,
      author: 'Bank Phrom',
      sourceUrl: 'https://unsplash.com/photos/printing-machine-Tzm3Oyu_6sk',
    },
    structure: {
      src: withBasePath('/images/geometry-shadow.webp'),
      alt: 'Arquitectura en blanco y negro con volúmenes y sombras geométricas.',
      width: 1400,
      height: 1867,
      author: 'Sebastian Schuster',
      sourceUrl: 'https://unsplash.com/photos/modern-building-exterior-with-strong-geometric-shadows-A-13PmQkP1o/',
    },
  },

};

export type SiteContent = typeof siteContent;
