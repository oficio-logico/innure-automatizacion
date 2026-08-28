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
   RELLENAR AQUÍ · lo único que falta para que la web salga de "revisión"
   ══════════════════════════════════════════════════════════════════════════
   Son tres huecos. Con estos tres rellenos no hay que tocar NADA más de
   este fichero ni de ningún otro.

   1) CORREO      En cuanto pongas un correo, el formulario deja de ser un
                  callejón sin salida: prepara la solicitud y la abre en el
                  programa de correo de quien escribe (la envía esa persona,
                  no la web). Y el pie deja de decir "a través del
                  formulario" y pone el correo.

   2) FUNDADORES  Nombre, función y trayectoria de los dos. Mientras estén a
                  null, la sección de Equipo sigue mostrando el aviso de
                  "pendiente de validar". En cuanto haya nombres, se pinta
                  sola. Las fotos son opcionales.

   3) PUBLICAR    Ponlo a true SOLO cuando 1 y 2 estén hechos y el dominio
                  esté registrado. Eso quita el `noindex` y deja que Google
                  os encuentre. Si PUBLICAR es true pero DOMINIO sigue a
                  null, la web se queda en revisión a propósito: es una red
                  de seguridad para que nadie publique sin dominio.
   ══════════════════════════════════════════════════════════════════════════ */

/** Correo de contacto. Ej.: 'hola@oficiologico.com' */
const CORREO = null as string | null;

/** URL completa del dominio ya registrado. Ej.: 'https://oficiologico.com' */
const DOMINIO = null as string | null;

/** true = web publicada e indexable. false = vista de revisión con noindex. */
const PUBLICAR = false;

/** Los dos fundadores. Trayectoria: empresas, periodos y logros comprobables. */
const FUNDADORES: Array<{
  nombre: string | null;
  funcion: string | null;
  trayectoria: string | null;
  foto: string | null;
}> = [
  { nombre: null, funcion: null, trayectoria: null, foto: null },
  { nombre: null, funcion: null, trayectoria: null, foto: null },
];

/** No se publica sin dominio, aunque PUBLICAR esté a true. */
const LISTA_PARA_PUBLICAR = PUBLICAR && Boolean(DOMINIO);

export const siteContent = {
  publishing: {
    ready: LISTA_PARA_PUBLICAR,
    pendingMarker: 'PENDING',
    localBaseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },

  brand: {
    displayName: 'Oficio Lógico',
    statusLabel: 'automatización y software',
    finalName: 'PENDING: CONFIRMAR Y REGISTRAR «OFICIO LÓGICO»',
    domain: DOMINIO ?? 'PENDING: REGISTRAR DOMINIO DEFINITIVO',
    domainCandidate: 'oficiologico.com',
    tagline: 'Tecnología bien hecha para el trabajo que se repite.',
  },

  contact: {
    email: CORREO ?? 'PENDING: EMAIL DE CONTACTO',
    emailHref: CORREO,
    bookingUrl: null as string | null,
    formEndpoint: null as string | null,
  },

  legal: {
    companyName: 'PENDING: RAZÓN SOCIAL',
    taxId: 'PENDING: NIF',
    registeredAddress: 'PENDING: DOMICILIO',
    registryDetails: 'PENDING: DATOS REGISTRALES, SI CORRESPONDEN',
    privacyContact: 'PENDING: EMAIL PARA DERECHOS DE PROTECCIÓN DE DATOS',
    retentionPeriod: 'PENDING: PLAZO DE CONSERVACIÓN VALIDADO',
    serviceProviders: 'PENDING: ENCARGADOS DE TRATAMIENTO, CUANDO SE ELIJAN',
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
    { label: 'Qué resolvemos', href: '#que-resolvemos' },
    { label: 'Cómo trabajamos', href: '#como-trabajamos' },
    { label: 'Equipo', href: '#equipo' },
    { label: 'Contacto', href: '#contacto' },
  ],

  seo: {
    title: 'Oficio Lógico | Automatización y software a medida',
    description:
      'Quitamos trabajo repetitivo de en medio con automatización, software a medida e IA aplicada con criterio. Empezamos por un piloto concreto y medible.',
  },

  hero: {
    eyebrow: 'Software a medida · automatización · IA aplicada',
    title: 'Quitamos el trabajo repetitivo de en medio.',
    description:
      'Diseñamos sistemas que conectan lo que ya usáis y preparan el trabajo para que vuestro equipo decida, no copie y pegue.',
    primaryCta: 'Contadnos qué se repite',
    secondaryCta: 'Ver el método',
    support:
      'Empezamos por un piloto. Medimos. Decidimos si merece la pena escalar.',
  },

  sections: {
    friction: {
      eyebrow: 'Esto suele empezar así',
      title: 'Si una tarea termina en copiar, buscar o perseguir, hay algo que mirar.',
      description:
        'No hace falta una gran transformación. Hace falta encontrar el paso que se repite y deja al equipo sin tiempo para decidir.',
    },
    capabilities: {
      eyebrow: 'Tres formas de intervenir',
      title: 'Tres maneras de quitar fricción.',
    },
    process: {
      eyebrow: 'Un proceso, de principio a fin',
      title: 'De información dispersa a una decisión preparada.',
      note: 'Ejemplo ilustrativo. No es un caso de cliente.',
    },
    method: {
      eyebrow: 'Cómo trabajamos',
      title: 'Primero un piloto. Luego, si compensa, se escala.',
      description:
        'La primera conversación es gratuita. Sirve para entender el proceso y acotar una prueba real.',
    },
    team: {
      eyebrow: 'Quién hace el trabajo',
      title: 'Pocas manos. Responsabilidad de principio a fin.',
      description:
        'El trabajo lo realizan directamente dos perfiles senior capaces de analizar, diseñar, construir e integrar la solución.',
      status: 'Nombres, funciones y trayectoria pendientes de validar para publicación',
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Lo importante, antes de empezar.',
    },
    contact: {
      eyebrow: 'Primera conversación',
      title: 'Contadnos qué se repite. Lo demás lo preguntamos nosotros.',
      description:
        'No hace falta llegar con la solución pensada. Basta con explicar qué ocurre, quién interviene y dónde se atasca.',
    },
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

  problems: [
    'Abrir correos y copiar la misma información a otra herramienta.',
    'Buscar datos repartidos entre hojas, aplicaciones y conversaciones.',
    'Rehacer documentos que cambian poco de una ocasión a otra.',
    'Preparar informes repetitivos reuniendo datos a mano.',
    'Perseguir aprobaciones, respuestas o actualizaciones de estado.',
    'Mantener varias licencias para sostener un único flujo de trabajo.',
    'Depender de una persona para tareas que deberían estar sistematizadas.',
  ],

  capabilities: [
    {
      number: '01',
      title: 'Automatización de procesos',
      description:
        'Conectamos correos, documentos, datos y avisos que hoy se mueven a mano.',
      examples: 'Administración · clasificación · extracción de datos · avisos',
    },
    {
      number: '02',
      title: 'Software para el equipo',
      description:
        'Creamos herramientas internas alrededor de la forma real de trabajar, sin módulos de sobra.',
      examples: 'Aplicaciones internas · integraciones · interfaces · mantenimiento',
    },
    {
      number: '03',
      title: 'IA donde aporta',
      description:
        'Clasificamos, extraemos o preparamos una primera versión, con revisión humana cuando importa.',
      examples: 'Documentos · propuestas · informes · apoyo a decisiones',
    },
  ],

  example: {
    label: 'Ejemplo ilustrativo · no es un caso de cliente',
    title: 'De información dispersa a una decisión preparada.',
    before: {
      title: 'Antes',
      description:
        'Llegan correos, documentos y datos en formatos distintos. Una persona localiza lo relevante, lo copia y prepara el siguiente paso.',
      items: ['Entradas dispersas', 'Criterios en la cabeza de una persona', 'Trabajo manual antes de decidir'],
    },
    intervention: {
      title: 'Intervención',
      description:
        'El sistema captura la información, la clasifica y propone una salida. Una persona revisa los puntos que requieren criterio o autorización.',
      items: ['Captura', 'Clasificación', 'Propuesta', 'Revisión humana'],
    },
    after: {
      title: 'Después',
      description:
        'La información queda ordenada y el trabajo previo está preparado. La decisión importante sigue en manos de la persona responsable.',
      items: ['Contexto reunido', 'Siguiente acción preparada', 'Decisión humana'],
    },
  },

  method: [
    {
      number: '01',
      title: 'Miramos el trabajo',
      description: 'Entendemos qué consume tiempo, con qué frecuencia ocurre y qué no puede fallar.',
      output: 'Una primera lectura del proceso y de sus límites.',
    },
    {
      number: '02',
      title: 'Elegimos una pieza',
      description: 'Elegimos un único proceso, describimos la situación inicial y acordamos cómo evaluar el piloto.',
      output: 'Un alcance concreto y un criterio de éxito comprensible.',
    },
    {
      number: '03',
      title: 'La ponemos a prueba',
      description: 'Integramos, probamos y dejamos revisión humana en los puntos donde aporta control.',
      output: 'Una solución operativa sobre un proceso real.',
    },
    {
      number: '04',
      title: 'Medimos y decidimos',
      description: 'Comparamos el antes y el después. Solo ampliamos si el resultado justifica la inversión.',
      output: 'Una decisión basada en lo ocurrido, no en una promesa.',
    },
  ],

  principles: [
    {
      title: 'Acceso mínimo',
      description: 'Cada integración debe acceder únicamente a los datos y permisos necesarios para su función.',
    },
    {
      title: 'Control humano',
      description: 'Las decisiones sensibles o ambiguas conservan un punto claro de revisión y autorización.',
    },
    {
      title: 'Prueba antes de uso',
      description: 'El piloto se prueba con escenarios acordados antes de incorporarlo al trabajo habitual.',
    },
    {
      title: 'Implantación gradual',
      description: 'Se integra por partes, con capacidad para detener o revertir el piloto si no responde como debe.',
    },
    {
      title: 'Medición desde el inicio',
      description: 'Definimos la situación de partida para comparar el resultado con una referencia real.',
    },
  ],

  faqs: [
    {
      question: '¿Necesitamos tener una estrategia de IA?',
      answer:
        'No. Empezamos por entender un proceso que genera trabajo manual, errores o esperas. Después elegimos la tecnología adecuada. En algunos casos será IA; en otros, una automatización convencional o una herramienta sencilla resolverá mejor el problema.',
    },
    {
      question: '¿Hay que cambiar las herramientas que ya utilizamos?',
      answer:
        'No necesariamente. Primero estudiamos cómo encajar la solución con las herramientas actuales. Solo proponemos sustituir algo cuando la integración no es razonable o cuando simplificar el conjunto forma parte del valor del piloto.',
    },
    {
      question: '¿Sirve cualquier proceso?',
      answer:
        'No. Un buen candidato suele repetirse, tener entradas y salidas reconocibles y permitir comparar la situación inicial con el resultado. Los procesos muy esporádicos, mal definidos o sin criterio claro pueden no justificar una construcción específica.',
    },
    {
      question: '¿Cómo se calcula el precio?',
      answer:
        'Depende del proceso, las integraciones, el riesgo, el volumen de pruebas y el alcance acordado. La primera conversación sirve para entenderlo; después se plantea un piloto delimitado, sin una tabla genérica de precios.',
    },
    {
      question: '¿Qué ocurre con los datos de la empresa?',
      answer:
        'El diseño parte del acceso mínimo, el control de permisos y la revisión de qué información necesita realmente cada paso. Antes del piloto se concreta dónde se procesa, quién puede acceder y qué proveedores intervienen. No afirmamos certificaciones que no se hayan comprobado.',
    },
    {
      question: '¿Qué pasa si el piloto no aporta suficiente valor?',
      answer:
        'Se detiene. El piloto se plantea precisamente para aprender con un alcance controlado. Si la comparación con la situación inicial no justifica continuar, no se amplía el proyecto.',
    },
  ],
};

export type SiteContent = typeof siteContent;
