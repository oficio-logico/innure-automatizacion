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

   2) FUNDADORES  Solo se muestran nombres y funciones confirmados. La biografía,
                  foto y LinkedIn son opcionales hasta que su titular los aporte.
                  No publicar textos de relleno ni atribuir experiencia pendiente.

   3) PUBLICAR    Solo la compilación de innure habilita indexación. Requiere
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

/** Equipo. Trayectoria: empresas, periodos y logros comprobables. */
const FUNDADORES: Array<{
  nombre: string | null;
  funcion: string | null;
  trayectoria: string | null;
  aportes: Array<{ titulo: string; texto: string }>;
  especialidades: string[];
  muestra: { texto: string; href: string };
  foto: string | null;
  fotoEscala?: number;
  linkedin: string | null;
}> = [
  {
    nombre: 'Sergio Herencias Redondo',
    funcion: 'Fundador · Ingeniería full stack y gestión empresarial',
    trayectoria: 'Head of Performance Engineering en Open Digital Services (ODS). Liderazgo técnico, desarrollo full stack y visión de negocio.',
    especialidades: ['Desarrollo full stack', 'Rendimiento y escalabilidad', 'Automatización de procesos', 'Liderazgo técnico y calidad', 'Gestión fiscal interna', 'Facturación y operaciones'],
    aportes: [
      { titulo: 'Ingeniería con criterio de calidad', texto: 'Desarrollo full stack, automatización y análisis de rendimiento. Del código a las pruebas y la fiabilidad del sistema. Certificado ISTQB CTFL.' },
      { titulo: 'Tecnología con visión de empresa', texto: 'También lleva la gestión fiscal y la facturación de la empresa. Conoce de primera mano los procesos administrativos que una buena herramienta debe simplificar.' },
    ],
    muestra: { texto: 'Ver el Gestor de Certificados', href: '/proyectos/gestor-certificados/' },
    foto: '/images/sergio-herencias-frontal.webp',
    linkedin: 'https://www.linkedin.com/in/sergio-herencias/',
  },
  {
    nombre: 'Santiago Correas Carpio',
    funcion: 'Fundador · Producto, negocio y marketing',
    trayectoria: 'Director de marketing en Blackworks. Conecta producto, comunicación y las necesidades del negocio.',
    especialidades: ['Estrategia de producto', 'Desarrollo de apps', 'IA aplicada', 'Marketing de influencers', 'Lanzamiento de productos', 'Gestión de negocio'],
    aportes: [
      { titulo: 'Marketing que conoce el terreno', texto: 'Gestión de marketing de influencers para festivales en España y experiencia lanzando negocios propios.' },
      { titulo: 'De la idea a la App Store', texto: 'Desarrollo íntegro de FORJA, una aplicación de entrenamiento con IA que ya puedes descargar.' },
    ],
    muestra: { texto: 'Ver FORJA, desarrollada por Santiago', href: '/proyectos/forja/' },
    foto: '/images/santiago-correas-sin-logo.webp',
    fotoEscala: 1.2,
    linkedin: 'https://www.linkedin.com/in/santiago-correas-carpio-67479a2bb/',
  },
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
    finalName: 'innure',
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
    // El PHP actual de innure requiere adaptación; no asignar su URL sin ella.
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
    companyName: 'Grupo Empresarial innure, S.L.',
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
    biography: f.trayectoria,
    highlights: f.aportes,
    skills: f.especialidades,
    project: f.muestra,
    career: f.trayectoria ?? 'PENDING: EMPRESAS, PERIODOS, FUNCIONES Y LOGROS COMPROBABLES',
    photo: f.foto,
    photoScale: f.fotoEscala ?? 1,
    initials: (f.nombre ?? '').split(/\s+/).map((part) => part[0]).slice(0, 2).join(''),
    linkedin: f.linkedin,
    listo: Boolean(f.nombre && f.funcion),
  })),

  navigation: [
    { label: 'Qué hacemos', href: '#que-hacemos' },
    { label: 'Proyectos reales', href: '#proyectos' },
    { label: 'Cómo trabajamos', href: '#como-trabajamos' },
    { label: 'Quiénes somos', href: '#equipo' },
  ],

  seo: {
    title: 'Automatización, IA y herramientas a medida para pymes | innure',
    description:
      'Automatizamos tareas, conectamos tus aplicaciones e integramos IA en tu pequeña empresa. Herramientas a medida para ahorrar tiempo. Cuéntanos tu caso.',
  },

  hero: {
    eyebrow: 'Automatización e IA para pequeñas empresas',
    title: 'Menos tareas manuales.',
    titleAccent: 'Más tiempo para tu negocio.',
    description:
      'Automatizamos tareas, integramos IA y conectamos las aplicaciones que ya usas. También creamos herramientas a medida para que tu negocio funcione mejor.',
    primaryCta: 'Revisar mi caso',
    secondaryCta: 'Ver un ejemplo',
    support:
      'Primera conversación gratuita. Una tarea y un siguiente paso claro.',
  },

  landing: {
    review: {
      eyebrow: 'Primera conversación gratuita · Sin compromiso',
      title: 'Una tarea. Un primer paso claro.',
      description: 'Revisamos contigo una tarea que os quite tiempo. No necesitas saber de IA ni tener una solución pensada.',
      outcomes: [
        'Qué se podría simplificar o automatizar.',
        'Qué necesitamos comprobar en tus herramientas.',
        'Cuál sería el siguiente paso, si tiene sentido seguir.',
      ],
      next: 'Nos ponemos en contacto para conocer el caso y acordar esa conversación. Cualquier desarrollo se presupuesta después; enviar la consulta no te compromete a contratar.',
    },
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
        id: 'pedidos', label: 'Copiar datos entre programas', icon: 'document',
        contactPrompt: '¿Qué datos copiáis, entre qué programas y cuántas veces os ocurre?',
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
        id: 'informes', label: 'Preparar los mismos informes', icon: 'report',
        contactPrompt: '¿Qué informe preparáis, de dónde salen los datos y con qué frecuencia?',
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
        id: 'gestion', label: 'Dar seguimiento a presupuestos', icon: 'tool',
        contactPrompt: '¿Cómo recibís las solicitudes, dónde preparáis los presupuestos y qué suele quedarse pendiente?',
        title: 'Que ninguna solicitud se quede sin un siguiente paso.',
        before: 'Las solicitudes llegan por correo y mensajes. El presupuesto se prepara en otro programa y el seguimiento depende de que alguien se acuerde.',
        after: 'La solución reúne las solicitudes, prepara la información y avisa de lo pendiente. Tu equipo revisa cada presupuesto antes de enviarlo.',
        steps: [
          { icon: 'mail', title: 'Llega una solicitud', detail: 'Se registra con su contexto' },
          { icon: 'document', title: 'Se prepara el borrador', detail: 'Con las reglas acordadas' },
          { icon: 'check', title: 'Tu equipo confirma', detail: 'Revisa antes de enviar' },
          { icon: 'report', title: 'Se recuerda lo pendiente', detail: 'Con responsable y siguiente paso' },
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
      { question: '¿Qué recibimos al terminar?', answer: 'La propuesta detalla la solución que se entrega, los accesos, la documentación y la formación de uso que incluye el proyecto. También dejamos por escrito la propiedad del desarrollo y qué depende de licencias o servicios de terceros.' },
      { question: '¿Habrá costes mensuales?', answer: 'Puede haber costes de herramientas, alojamiento, consumo de IA o mantenimiento. Antes de empezar los separamos del coste de implantación y explicamos cuáles son necesarios y cuáles opcionales. No prometemos una solución sin cuotas si depende de servicios que las cobran.' },
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
