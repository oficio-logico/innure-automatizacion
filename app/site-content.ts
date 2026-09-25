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

/**
 * Dominio comercial aprobado, siempre normalizado con barra final.
 * El build raíz lo recibe por NEXT_PUBLIC_COMMERCIAL_URL; si la variable no
 * está definida se conserva la dirección de /automatizacion/ que usan la
 * preview y ese paquete. Las URLs legales derivan de este valor.
 */
const DOMINIO_COMERCIAL = process.env.NEXT_PUBLIC_COMMERCIAL_URL || 'https://www.innure.es/automatizacion/';
const DOMINIO = DOMINIO_COMERCIAL.endsWith('/') ? DOMINIO_COMERCIAL : `${DOMINIO_COMERCIAL}/`;

/** true = web publicada e indexable. false = vista de revisión con noindex. */
const PUBLICAR = process.env.NEXT_PUBLIC_PUBLISH === 'true';

/** true solo después de completar y validar aviso legal y privacidad. */
const LEGAL_REVISADO = true;

/** Equipo. Trayectoria: empresas, periodos y logros comprobables. */
const FUNDADORES: Array<{
  nombre: string | null;
  funcion: string | null;
  resumen: string | null;
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
    funcion: 'Cofundador · Tecnología y operaciones',
    resumen: 'Une liderazgo técnico, desarrollo de aplicaciones y gestión empresarial para convertir necesidades del negocio en soluciones que funcionan.',
    trayectoria: 'Durante ocho años en NTT DATA trabajó en proyectos de transformación digital para grandes empresas, con especialización en ingeniería de rendimiento. Como Head of Performance Engineering en Open Digital Services, trabaja en el rendimiento y la fiabilidad de sistemas exigentes.\n\nEn innure conecta esa experiencia con los problemas cotidianos del negocio: herramientas que no se entienden, tareas administrativas repetitivas y procesos que necesitan más control. Su enfoque une desarrollo, integración, automatización y comprobación de que la solución funciona.',
    especialidades: ['Ingeniería y fiabilidad', 'Desarrollo de aplicaciones', 'Integración y automatización', 'Control de gestión'],
    aportes: [
      { titulo: 'Ingeniería y fiabilidad', texto: 'Rendimiento, escalabilidad, pruebas y calidad del software. Certificado ISTQB CTFL; ISTQB Performance Testing, certificación en trámite.' },
      { titulo: 'Desarrollo de aplicaciones', texto: 'Desarrollo full stack de herramientas a medida para las necesidades del negocio.' },
      { titulo: 'Integración y automatización', texto: 'Conectar aplicaciones y reducir tareas manuales para que la información llegue donde se necesita.' },
      { titulo: 'Control de gestión', texto: 'Experiencia en la gestión interna de innure: facturación, información financiera y organización administrativa para tomar decisiones con más claridad.' },
    ],
    muestra: { texto: 'Ver el Gestor de Certificados', href: '/proyectos/gestor-certificados/' },
    foto: '/images/sergio-herencias-frontal.webp',
    linkedin: 'https://www.linkedin.com/in/sergio-herencias/',
  },
  {
    nombre: 'Santiago Correas Carpio',
    funcion: 'Cofundador · Producto y crecimiento',
    resumen: 'Combina marketing, desarrollo de producto y experiencia emprendiendo.',
    trayectoria: 'Como director de marketing en Blackworks, conecta comunicación, audiencias y necesidades de negocio.\n\nFundador de Collapp y cofundador de Ender Hookah, ha trabajado en marketing de influencers para festivales en España y desarrollado íntegramente FORJA, una aplicación de entrenamiento con IA. En innure aporta una visión que une la creación del producto con su lanzamiento y la forma de llegar a sus usuarios.',
    especialidades: ['Producto digital', 'Desarrollo de aplicaciones', 'Marketing y lanzamiento', 'Emprendimiento'],
    aportes: [
      { titulo: 'Producto digital', texto: 'Convertir una necesidad en una aplicación con una experiencia de uso clara.' },
      { titulo: 'Desarrollo de aplicaciones', texto: 'Desarrollo íntegro de FORJA, una aplicación de entrenamiento con IA.' },
      { titulo: 'Marketing y lanzamiento', texto: 'Comunicación, influencers y conexión con audiencias.' },
      { titulo: 'Fundador de Collapp', texto: 'Experiencia creando negocios propios, también como cofundador de Ender Hookah. Decisiones de producto y negocio desde la práctica.' },
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
    statusLabel: 'Tecnología para tu negocio',
    finalName: 'innure',
    parentUrl: 'https://www.innure.es/rendimiento/',
    proposedUrl: 'https://www.innure.es/automatizacion/',
    domain: DOMINIO ?? 'PENDING: CONFIRMAR Y PUBLICAR LA RUTA DE innure',
    domainCandidate: 'innure.es/automatizacion/',
    tagline: 'Aplicaciones, procesos, automatización y captación: tecnología que trabaja para tu negocio.',
  },

  contact: {
    email: CORREO ?? 'PENDING: EMAIL DE CONTACTO',
    emailHref: CORREO,
    bookingUrl: null as string | null,
    // Contrato: POST FormData -> JSON { success: true, submissionId: string }.
    // La portada general reutiliza el receptor existente /automatizacion/contacto.php;
    // su URL llega por NEXT_PUBLIC_CONTACT_ENDPOINT. No asignar otra sin adaptarla.
    formEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || null,
    turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null,
    externalFormUrl: `${DOMINIO}#contacto`,
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
    publicLegalUrl: 'https://www.innure.es/aviso-legal/',
    publicPrivacyUrl: 'https://www.innure.es/privacidad/',
    publicCookiesUrl: 'https://www.innure.es/privacidad/#medicion',
    retentionPeriod: 'Durante el tiempo necesario para atender la solicitud y, posteriormente, durante los plazos legalmente exigibles para atender posibles responsabilidades. Puedes solicitar la supresión.',
    serviceProviders: 'DonDominio para alojamiento y transporte de correo; Cloudflare para seguridad y Turnstile; Google para el buzón operativo y, solo con consentimiento, la medición publicitaria.',
  },

  founders: FUNDADORES.map((f, i) => ({
    number: i === 0 ? '01' : '02',
    name: f.nombre ?? `PENDING: NOMBRE DEL FUNDADOR ${i + 1}`,
    publicLabel: `Fundador/a 0${i + 1}`,
    role: f.funcion ?? 'PENDING: FUNCIÓN EXACTA',
    biography: f.resumen,
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
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Cómo trabajamos', href: '#como-trabajamos' },
    { label: 'Quiénes somos', href: '#equipo' },
    { label: 'Rendimiento', href: 'https://www.innure.es/rendimiento/' },
  ],

  seo: {
    title: 'Aplicaciones a medida, automatización y captación de clientes | innure',
    description:
      'Socio de tecnología para pymes: aplicaciones a medida, procesos conectados, automatización e IA y captación con SEO, publicidad y medición. Cuéntanos tu caso.',
  },

  // Logos de proyectos en los que han trabajado los miembros del equipo. Sin
  // logo, se muestra el nombre. tone: 'color' conserva el dibujo en gris para los
  // logos con fondo propio; el resto se muestra como silueta oscura.
  experience: {
    title: 'Nuestro equipo ha trabajado en proyectos para',
    groups: [
      { label: 'Ingeniería y rendimiento', items: [
        { name: 'Repsol', logo: '/images/experiencia/repsol.webp' },
        { name: 'Iberia', logo: '/images/experiencia/iberia.webp' },
        { name: 'BBVA', logo: '/images/experiencia/bbva.webp' },
        { name: 'Banco Santander', logo: '/images/experiencia/santander.webp' },
        { name: 'CaixaBank', logo: '/images/experiencia/caixabank.webp' },
        { name: 'AENA', logo: '/images/experiencia/aena.webp' },
        { name: 'Enagás', logo: '/images/experiencia/enagas.webp' },
        { name: 'Moeve', logo: '/images/experiencia/moeve.webp' },
        { name: 'Waylet', logo: '/images/experiencia/waylet.webp' },
        { name: 'MAPFRE', logo: '/images/experiencia/mapfre.webp' },
        { name: 'Sareb', logo: '/images/experiencia/sareb.webp' },
        { name: 'SegurCaixa', logo: '/images/experiencia/segurcaixa.webp' },
        { name: 'Ferrovial', logo: '/images/experiencia/ferrovial.webp' },
        { name: 'Renfe', logo: '/images/experiencia/renfe.webp' },
        { name: 'Telefónica', logo: '/images/experiencia/telefonica.webp' },
        { name: 'Carpeta Ciudadana', logo: '/images/experiencia/carpeta-ciudadana.webp' },
        { name: 'MásMóvil', logo: '/images/experiencia/masmovil.webp' },
        { name: 'Orange', logo: '/images/experiencia/orange.webp', tone: 'color' },
        { name: 'Vodafone', logo: '/images/experiencia/vodafone.webp', tone: 'color' },
        { name: 'NH Hoteles', logo: '/images/experiencia/nh-hoteles.webp' },
        { name: 'Adobe', logo: '/images/experiencia/adobe.webp' },
        { name: 'Appian', logo: '/images/experiencia/appian.webp' },
        { name: 'Cofares', logo: '/images/experiencia/cofares.webp' },
        { name: 'Junta de Andalucía', logo: '/images/experiencia/junta-andalucia.webp' },
      ] },
      { label: 'Marketing de influencers', items: [
        { name: 'Blackworks', logo: '/images/experiencia/blackworks.webp' },
        { name: 'Medusa Festival', logo: '/images/experiencia/medusa-festival.webp' },
        { name: 'Zevra Festival', logo: '/images/experiencia/zevra-festival.webp' },
        { name: 'Boombastic', logo: '/images/experiencia/boombastic.webp', tone: 'color' },
        { name: 'A Summer Story', logo: '/images/experiencia/a-summer-story.webp', tone: 'color' },
        { name: 'Dreambeach', logo: '/images/experiencia/dreambeach.webp' },
        { name: 'Fabrik', logo: '/images/experiencia/fabrik.webp', tone: 'color' },
        { name: 'Teatro Kapital', logo: '/images/experiencia/teatro-kapital.webp' },
        { name: 'Teatro Barceló', logo: '/images/experiencia/teatro-barcelo.webp' },
        { name: 'Jowke', logo: '/images/experiencia/jowke.webp' },
        { name: 'Quinto Elemento', logo: '/images/experiencia/quinto-elemento.webp' },
        { name: 'Opium Madrid', logo: '/images/experiencia/opium-madrid.webp' },
        { name: 'SHARK', logo: '/images/experiencia/shark.webp', markOnly: true },
        { name: 'Bresh', logo: '/images/experiencia/bresh.webp', tone: 'color' },
        { name: 'La Riviera', logo: '/images/experiencia/la-riviera.webp', markOnly: true },
        { name: 'Oh My Club' },
        { name: 'Reggaeton Beach Festival' },
        { name: 'WAH', logo: '/images/experiencia/wah.webp' },
        { name: 'Copérnico', logo: '/images/experiencia/copernico.svg' },
        { name: 'Autocine Madrid' },
      ] },
    ] as { label: string; items: { name: string; logo?: string; tone?: 'color'; markOnly?: boolean }[] }[],
  },

  hero: {
    eyebrow: 'Automatización, IA y desarrollo a medida',
    title: 'Quitamos trabajo repetitivo.',
    titleAccent: 'Creamos lo que te falta.',
    description:
      'Conectamos tus herramientas, automatizamos tareas y aplicamos IA donde ayuda. Si falta una solución, la desarrollamos a medida.',
    primaryCta: 'Cuéntanos tu caso',
    secondaryCta: 'Ver un ejemplo',
    support:
      'Primera conversación gratuita para entender el caso y acordar los siguientes pasos. No sustituye un diagnóstico detallado.',
  },

  landing: {
    review: {
      eyebrow: 'Primera conversación gratuita · Sin compromiso',
      title: 'Empecemos por entender tu negocio.',
      description: 'Cuéntanos qué tarea os quita tiempo y qué herramientas utilizáis. Revisaremos si encaja con una automatización, integración o desarrollo a medida. Te responderemos, como tarde, el siguiente día laborable.',
      outcomes: [
        'Qué necesidad conviene aclarar primero.',
        'Qué herramientas, datos y procesos habría que revisar después.',
        'Cuál sería el siguiente paso, si tiene sentido seguir.',
      ],
      next: 'Nos ponemos en contacto para conocer el caso y acordar esa primera conversación. El alcance, el presupuesto y cualquier plazo se concretan solo después, en una propuesta; escribirnos no te compromete a contratar.',
    },
    benefits: ['Aplicaciones a medida', 'Procesos, datos y automatización', 'Captación de clientes'],
    services: [
      {
        number: '01', icon: 'invoice', title: 'Procesos y control de gestión',
        description: 'Ordenamos herramientas, datos y facturación para que el trabajo diario y las decisiones sean más claros.',
        example: 'Facturación, seguimiento, informes y control interno.',
      },
      {
        number: '02', icon: 'connect', title: 'Aplicaciones e integraciones',
        description: 'Creamos lo que falta y conectamos lo que ya usáis, para trabajar con las herramientas que el negocio necesita.',
        example: 'Aplicaciones a medida, portales, integraciones y accesos.',
      },
      {
        number: '03', icon: 'spark', title: 'Automatización e IA',
        description: 'Reducimos tareas repetitivas y aplicamos IA donde aporta valor, con revisión humana donde proceda.',
        example: 'Correos, documentos, avisos y procesos por lotes.',
      },
      {
        number: '04', icon: 'report', title: 'Captación y crecimiento',
        description: 'Trabajamos la visibilidad y la demanda: posicionamiento, campañas, email marketing y medición de resultados.',
        example: 'SEO, SEM/Ads, email y analítica. Redes sociales, con colaboradores.',
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
      { number: '01', title: 'Diagnóstico', description: 'Entender dónde se atasca el trabajo y decidir por dónde empezar.', deliverables: ['Mapa del proceso actual', 'Oportunidades ordenadas por prioridad', 'Alcance propuesto para el primer proyecto'] },
      { number: '02', title: 'Primer proyecto acotado', description: 'Resolver una tarea concreta y comprobar juntos que funciona.', deliverables: ['Un flujo o herramienta funcional', 'Pruebas de aceptación acordadas', 'Formación para empezar a utilizarlo'] },
      { number: '03', title: 'Mantenimiento acordado', description: 'Cuidar lo entregado con una dedicación definida para cada periodo.', deliverables: ['Supervisión e incidencias según el plan', 'Pequeñas mejoras dentro del alcance', 'Ampliaciones presupuestadas aparte'] },
    ],
    faqs: [
      { question: '¿También trabajáis con empresas pequeñas?', answer: 'Sí. Trabajamos con negocios pequeños que necesitan resolver algo concreto: tareas que se repiten, herramientas desconectadas, una gestión que se ha quedado pequeña o clientes que no llegan.' },
      { question: '¿Tengo que saber de tecnología o tener la solución pensada?', answer: 'No. Cuéntanos qué os hace perder tiempo, qué os falta o qué os gustaría mejorar. Estudiamos por dónde puede venir la mejora —procesos, aplicaciones, automatización o captación— y te explicamos la propuesta en un lenguaje claro.' },
      { question: '¿Hay que cambiar los programas que ya usamos?', answer: 'Primero estudiamos cómo conectar lo que ya utilizáis. Si alguna herramienta no permite integrarse o el cambio no compensa, te lo explicamos antes de presupuestar.' },
      { question: '¿Cuánto cuesta y cuánto tarda?', answer: 'No fijamos importes ni plazos sin conocer el problema, las herramientas y las comprobaciones necesarias. Si tiene sentido avanzar, la propuesta concreta alcance, presupuesto y plazo antes de empezar.' },
      { question: '¿Qué recibimos al terminar?', answer: 'La propuesta concreta qué documentación, formación y accesos incluye el proyecto. También deja por escrito la propiedad del desarrollo, la continuidad acordada y qué depende de licencias o servicios de terceros.' },
      { question: '¿Habrá costes mensuales?', answer: 'Puede haber costes de herramientas, alojamiento, consumo de IA o mantenimiento. Antes de empezar los separamos del coste de implantación y explicamos cuáles son necesarios y cuáles opcionales. No prometemos una solución sin cuotas si depende de servicios que las cobran.' },
      { question: '¿Qué pasa con los datos y las decisiones importantes?', answer: 'Antes de construir acordamos qué datos necesita la solución, dónde se tratarán y quién tendrá acceso. Dejamos revisión humana en las tareas que requieren criterio o autorización.' },
      { question: '¿Y después de ponerlo en marcha?', answer: 'Te enseñamos a usar la solución y dejamos acordadas la documentación, el mantenimiento y las posibles mejoras. Las incidencias y mejoras pequeñas se atienden según la dedicación contratada; cualquier ampliación se valora aparte.' },
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
