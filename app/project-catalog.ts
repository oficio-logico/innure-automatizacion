import { projectRegistry } from './project-registry.mjs';

export type ProjectImage = { src: string; alt: string; caption: string; width: number; height: number };
export type ProjectCase = {
  slug: string; name: string; category: string; platform: string; status: string;
  headline: string; summary: string; problem: string; solution: string;
  steps: { title: string; text: string }[];
  care: { title: string; text: string }[];
  boundary: string; takeaway: string; images: ProjectImage[];
  demo?: { href: string; label: string }; featured?: boolean;
};

const details: Record<string, Omit<ProjectCase, 'slug' | 'name'>> = {
  forja: {
    category: 'IA aplicada a producto', platform: 'iPhone', status: 'Producto propio · App Store', featured: true,
    headline: 'Una conversación que se convierte en un plan.',
    summary: 'Entrenamiento, registro de sesiones y un asistente con IA dentro de una aplicación desarrollada por Santiago.',
    problem: 'Una recomendación aislada pierde utilidad si queda separada del plan, el registro de la actividad y los ajustes del día a día.',
    solution: 'FORJA reúne planificación de entrenamiento y alimentación, un asistente conversacional y seguimiento del progreso. Santiago desarrolla el producto completo, publicado en la App Store a nombre de innure.',
    steps: [{ title: 'Planificar', text: 'Organizar rutinas y consultar el plan desde el móvil.' }, { title: 'Conversar y ajustar', text: 'Utilizar el asistente dentro del contexto de la aplicación.' }, { title: 'Registrar', text: 'Anotar sesiones, series y repeticiones para consultar la evolución.' }],
    care: [{ title: 'IA dentro del flujo', text: 'El asistente forma parte de la experiencia del producto, junto a las pantallas de planificación y seguimiento.' }, { title: 'Del desarrollo a la distribución', text: 'Un ejemplo tangible de producto móvil disponible para descargar, no solo una propuesta o una maqueta.' }],
    boundary: 'Capturas de la ficha pública de App Store consultada en septiembre de 2026. El caso describe el desarrollo del producto, no acredita resultados deportivos o nutricionales.',
    takeaway: 'Podemos integrar una conversación con IA en una herramienta útil, conectada con tareas y datos del propio producto.',
    images: [{ src: '/images/proyectos/forja-hoy.webp', alt: 'Pantalla Hoy de FORJA publicada en App Store.', caption: 'Pantalla promocional de la ficha oficial de FORJA.', width: 600, height: 1300 }, { src: '/images/proyectos/forja-coach.webp', alt: 'Asistente conversacional de FORJA.', caption: 'El asistente de IA dentro de la aplicación.', width: 600, height: 1300 }],
    demo: { href: 'https://apps.apple.com/es/app/forja-entrenador-con-ia/id6804248683', label: 'Ver FORJA en App Store' },
  },
  'gestor-certificados': {
    category: 'Gestión administrativa', platform: 'Windows', status: 'Aplicación propia · Validación privada', featured: true,
    headline: 'El certificado correcto. El trámite a mano.',
    summary: 'Búsqueda de certificados, fichas de cliente y control de caducidades en una aplicación para despachos y gestorías.',
    problem: 'Gestionar muchos certificados obliga a identificar al cliente, comprobar qué certificado corresponde y localizar el acceso al trámite. Repetir esa búsqueda interrumpe el trabajo y facilita las confusiones.',
    solution: 'Creamos una aplicación de escritorio que reúne esa información: búsqueda, alias, etiquetas, notas, caducidades y un catálogo de procedimientos. El objetivo es conservar el contexto entre localizar al cliente y abrir el trámite.',
    steps: [{ title: 'Localizar', text: 'Buscar por nombre, NIF, alias o etiquetas para reconocer el certificado.' }, { title: 'Preparar el trámite', text: 'Consultar la ficha y elegir el procedimiento desde el mismo entorno.' }, { title: 'Mantener el control', text: 'Revisar caducidades, responsables y notas sin depender de la memoria.' }],
    care: [{ title: 'Trabajo en el entorno del despacho', text: 'La aplicación utiliza el almacén de certificados del usuario de Windows; no es un servicio de custodia de claves en la nube.' }, { title: 'Validación por procedimiento', text: 'Comprobamos los recorridos concretos y conservamos documentación de las pruebas, actualizaciones y límites de cada entrega.' }],
    boundary: 'Aplicación en validación y distribución privada. La compatibilidad con navegadores y sedes debe comprobarse para cada entorno; no se promete funcionamiento universal.',
    takeaway: 'Una herramienta a medida puede reunir búsquedas, documentos y accesos que hoy están repartidos por el escritorio.',
    images: [{ src: '/images/proyectos/gesticert-v34-claro.webp', alt: 'Gesticert v0.1.34: elección del trámite, selección del certificado y revisión antes de abrir, con datos ficticios.', caption: 'Escritorio v0.1.34 experimental · Captura del 14 de septiembre de 2026 con datos ficticios.', width: 1180, height: 760 }, { src: '/images/proyectos/gesticert-cuenta.webp', alt: 'Área de cliente de Gesticert con datos ficticios.', caption: 'Nuevo desarrollo del área de cliente · Ensayo local del 16 de septiembre, sin cobros ni licencias reales.', width: 1440, height: 1926 }],
  },
  sienta: {
    category: 'Operaciones y reservas', platform: 'Web · Tablet · Móvil', status: 'Producto propio · En desarrollo', featured: true,
    headline: 'La reserva y la sala, en el mismo lugar.',
    summary: 'Una plataforma para coordinar reservas, mesas, turnos y disponibilidad de un restaurante.',
    problem: 'Una reserva no es solo una hora en una agenda: también ocupa una mesa, tiene una duración y afecta a las siguientes llegadas. Separar la agenda del plano complica esa coordinación.',
    solution: 'Desarrollamos SIENTA y su edición centrada en reservas: plano de sala, listado, planificación, clientes y accesos del equipo. El sistema tiene en cuenta turnos, tamaño del grupo y tiempo de preparación.',
    steps: [{ title: 'Recibir la reserva', text: 'Registrar los datos necesarios y consultar disponibilidad.' }, { title: 'Organizar la sala', text: 'Relacionar reservas, mesas y duración en una vista de trabajo.' }, { title: 'Ajustar el servicio', text: 'Revisar turnos y márgenes para preparar la siguiente llegada.' }],
    care: [{ title: 'Reglas, no solo una agenda', text: 'El motor contempla solapes, duraciones y capacidad. La planificación se ha ensayado con escenarios sintéticos.' }, { title: 'Pensado para el equipo', text: 'Interfaz adaptada a escritorio, tablet y móvil, con usuarios y permisos. Hay pruebas documentadas en iPad físico.' }],
    boundary: 'Edición local para revisión, con piloto cerrado. No se presenta como un servicio ya implantado en restaurantes ni como una plataforma de cobros o facturación fiscal.',
    takeaway: 'Cuando una agenda genérica no basta, podemos convertir las reglas de tu negocio en una herramienta operativa.',
    images: [{ src: '/images/proyectos/sienta.webp', alt: 'Plano de mesas de SIENTA con disponibilidad y reservas de demostración.', caption: 'Entorno de demostración. Negocio y datos ficticios.', width: 1280, height: 1100 }, { src: '/images/proyectos/sienta-ipad.webp', alt: 'SIENTA en iPad con negocio y servicio simulados.', caption: 'Prueba en iPad físico · Septiembre de 2026, datos ficticios.', width: 1600, height: 1200 }],
  },
  'automatizacion-musical': {
    category: 'Automatización de procesos', platform: 'macOS · Procesamiento por lotes', status: 'Herramientas propias',
    headline: 'De preparar cada archivo a supervisar un proceso.',
    summary: 'Dos herramientas para organizar una biblioteca musical y preparar sesiones de audio, con revisión de resultados y conservación de originales.',
    problem: 'Convertir formatos, revisar carátulas y preparar distintas versiones de una sesión implica repetir muchas operaciones. Automatizar sin comprobar el resultado puede trasladar el problema al siguiente paso.',
    solution: 'Construimos dos procesos complementarios. Music Cover Fixer detecta archivos, prepara formatos y carátulas y señala posibles problemas. DJ Sets Loudness Processor genera versiones de una sesión y vuelve a medirlas antes de confirmar la salida.',
    steps: [{ title: 'Detectar la entrada', text: 'Esperar a que el archivo termine de copiarse antes de procesarlo.' }, { title: 'Preparar y comprobar', text: 'Convertir o normalizar según el flujo, analizar resultados y registrar incidencias.' }, { title: 'Entregar sin perder el original', text: 'Separar las salidas, conservar los archivos de origen y dejar información para revisión.' }],
    care: [{ title: 'Recuperación ante interrupciones', text: 'El procesador de sesiones registra el trabajo y contempla recuperación si una ejecución se interrumpe.' }, { title: 'La comprobación forma parte del proceso', text: 'No basta con producir un archivo: se revisan medidas, duración y condiciones de salida. El análisis no se presenta como infalible.' }],
    boundary: 'Herramientas creadas para un flujo propio de DJ. No se atribuyen ahorros cuantificados a clientes ni se distribuye música de terceros.',
    takeaway: 'Este enfoque también sirve para estudiar lotes de documentos, imágenes, informes o archivos de una empresa.', images: [],
  },
  clipappboard: {
    category: 'Productividad', platform: 'App nativa para macOS', status: 'Aplicación propia · Beta privada', featured: true,
    headline: 'Lo copiaste. Ahora puedes encontrarlo.',
    summary: 'Un historial local del portapapeles para buscar, organizar y reutilizar textos, imágenes y enlaces.',
    problem: 'Copiar algo nuevo sustituye lo anterior. Recuperar un fragmento, una imagen o un enlace puede obligar a volver al documento, correo o página de origen.',
    solution: 'Creamos una aplicación nativa con historial, búsqueda, colecciones, elementos fijados y previsualización. La organización y las copias de seguridad forman parte del producto, no son tareas separadas.',
    steps: [{ title: 'Recuperar', text: 'Buscar contenido copiado y filtrar el historial.' }, { title: 'Organizar', text: 'Agrupar lo reutilizable en colecciones y fijar lo importante.' }, { title: 'Volver a usar', text: 'Previsualizar, editar y pegar el contenido en el trabajo actual.' }],
    care: [{ title: 'Persistencia local', text: 'Búsqueda y organización sobre almacenamiento local, con control del historial y recuperación.' }, { title: 'Una aplicación de escritorio completa', text: 'Integración con funciones nativas del Mac, previsualizaciones y copias de seguridad verificables.' }],
    boundary: 'Beta privada. Las pruebas internas de distribución Apple no equivalen a disponibilidad comercial en la App Store.',
    takeaway: 'También desarrollamos herramientas que se integran en el escritorio y en los hábitos reales de trabajo.', images: [{"src":"/images/proyectos/clipappboard-history.webp","alt":"Historial de Clipappboard con cinco elementos ficticios.","caption":"Beta privada · Captura de septiembre de 2026.","width":1600,"height":475}],
  },
  polymath: {
    category: 'Aprendizaje y conocimiento', platform: 'Aplicación web · PWA', status: 'Producto propio · Desarrollo local',
    headline: 'Aprender, retomar y recordar.',
    summary: 'Una plataforma de aprendizaje con sesiones diarias, diagnóstico, biblioteca y repasos que conserva el progreso en el dispositivo.',
    problem: 'Disponer de contenido no basta para aprender. Hace falta saber por dónde seguir, recuperar una sesión a medias y volver sobre lo que necesita repaso.',
    solution: 'Construimos una experiencia que conecta diagnóstico, mapa de resultados, biblioteca y sesiones recuperables. El progreso y las copias de seguridad se gestionan localmente.',
    steps: [{ title: 'Encontrar un punto de partida', text: 'Un diagnóstico breve presenta resultados y áreas que todavía no se han evaluado.' }, { title: 'Avanzar con continuidad', text: 'Las sesiones conservan su estado para poder retomarlas.' }, { title: 'Repasar y recuperar', text: 'Repasos explicables y copias de seguridad para mantener el trabajo realizado.' }],
    care: [{ title: 'Progreso que no se inventa', text: 'Leer una lección no equivale a completarla. Las respuestas y sesiones tienen reglas explícitas de registro.' }, { title: 'Conservación de datos', text: 'Migraciones y restauración transaccional para actualizar la aplicación sin tratar el progreso como algo desechable.' }],
    boundary: 'Aplicación local en desarrollo. No se ofrece todavía un servicio con cuentas o sincronización entre dispositivos, ni se prometen resultados educativos.',
    takeaway: 'Podemos transformar documentación y conocimiento en herramientas de formación y consulta para un equipo.', images: [{"src":"/images/proyectos/polymath-resultados.webp","alt":"Mapa de resultados de Polymath con respuestas de prueba.","caption":"Versión 0.4.2 · Escenario de prueba, sin progreso personal.","width":1600,"height":1364}],
  },
  'oposicion-metro': {
    category: 'Formación', platform: 'Web · Uso offline', status: 'Proyecto propio · Web pública',
    headline: 'Del temario a una rutina de estudio.',
    summary: 'Temario organizado, preguntas, simulacros y repaso espaciado en una herramienta de preparación de oposiciones.',
    problem: 'Estudiar con documentos sueltos dificulta alternar lectura, práctica y revisión de errores. También cuesta mantener una referencia del avance.',
    solution: 'Organizamos el material en una aplicación con temas, tests, fichas, simulacros cronometrados y progreso local. Puede consultarse desde el navegador y cuenta con funcionamiento offline.',
    steps: [{ title: 'Consultar', text: 'Localizar un tema y recorrer el material organizado.' }, { title: 'Practicar', text: 'Responder preguntas y realizar simulacros.' }, { title: 'Repasar', text: 'Volver sobre contenidos y consultar el progreso guardado en el navegador.' }],
    care: [{ title: 'Contenido estructurado', text: 'El contenido y sus fuentes se organizan para generar la experiencia de estudio de forma reproducible.' }, { title: 'Acceso sencillo', text: 'Una aplicación web que no exige instalar software de escritorio para empezar.' }],
    boundary: 'Proyecto independiente, sin vinculación ni respaldo de Metro de Madrid. No garantiza resultados en la oposición. El progreso se almacena en el navegador.',
    takeaway: 'Un catálogo, un manual o un temario pueden convertirse en una experiencia interactiva que facilite su uso.',
    images: [{ src: '/images/proyectos/oposicion-metro.webp', alt: 'Temario organizado en la aplicación Oposición Metro, sin progreso personal.', caption: 'Vista pública del temario, sin datos de estudio personales.', width: 1280, height: 900 }],
    demo: { href: 'https://oposicion-metro.pages.dev/', label: 'Probar la plataforma' },
  },
  'pomodoro-utility': {
    category: 'Productividad', platform: 'App nativa para macOS', status: 'Aplicación propia · Versión local',
    headline: 'Concentración y descansos, sin cambiar de herramienta.',
    summary: 'Un temporizador discreto con panel flotante y recordatorios de descanso, agua y movimiento.',
    problem: 'Controlar el tiempo de concentración y acordarse de parar son tareas pequeñas que compiten con el propio trabajo.',
    solution: 'Desarrollamos una aplicación de barra de menús con ciclos de concentración, descansos, panel flotante y recordatorios configurables.',
    steps: [{ title: 'Preparar la sesión', text: 'Elegir los intervalos de trabajo y descanso.' }, { title: 'Mantener la referencia', text: 'Consultar el tiempo desde la barra de menús o el panel flotante.' }, { title: 'Hacer una pausa', text: 'Recibir avisos de descanso y recordatorios configurados.' }],
    care: [{ title: 'Continuidad del temporizador', text: 'El estado del tiempo y del historial se conserva entre usos de la aplicación.' }, { title: 'Integración nativa', text: 'Interfaz, avisos y accesibilidad pensados para el Mac.' }],
    boundary: 'Versión local. No se presenta como una aplicación comercial publicada ni como una intervención de salud.',
    takeaway: 'Las herramientas pequeñas también merecen una experiencia cuidada y un estado fiable.', images: [{"src":"/images/proyectos/pomodoro-panel.webp","alt":"Panel del temporizador de PomodoroUtility.","caption":"Versión 0.1.2 · Temporizador aislado de prueba.","width":680,"height":1040}],
  },
  'window-utility': {
    category: 'Productividad', platform: 'App nativa para macOS', status: 'Aplicación propia · Beta local',
    headline: 'Volver a la ventana que necesitas.',
    summary: 'Un selector para encontrar, agrupar y activar ventanas del Mac, con previsualizaciones opcionales.',
    problem: 'Con varias aplicaciones y muchas ventanas abiertas, cambiar de contexto acaba convirtiéndose en una búsqueda por ensayo y error.',
    solution: 'Creamos un catálogo de ventanas agrupadas por aplicación, con filtros, activación y recuperación de ventanas minimizadas. El desarrollo incluye previsualizaciones opcionales.',
    steps: [{ title: 'Localizar', text: 'Consultar las ventanas agrupadas por aplicación.' }, { title: 'Reconocer', text: 'Filtrar y revisar la ventana antes de volver a ella.' }, { title: 'Retomar', text: 'Activar la ventana elegida y comprobar el foco.' }],
    care: [{ title: 'Control del foco', text: 'La activación se trata como una operación que debe comprobarse, no como un clic dado por válido.' }, { title: 'Permisos explícitos', text: 'Las funciones dependen de los permisos correspondientes de macOS; las previsualizaciones son opcionales.' }],
    boundary: 'Beta local. Parte de la validación visual y física de las previsualizaciones sigue pendiente; no se promete compatibilidad universal.',
    takeaway: 'Podemos resolver fricciones concretas del trabajo diario sin exigir cambiar todas las herramientas.', images: [{"src":"/images/proyectos/windowutility-selector.webp","alt":"Selector de WindowUtility con ventanas sintéticas.","caption":"Versión 0.1.4 · Render del componente actual, con datos sintéticos, 19 de septiembre.","width":1600,"height":612}],
  },
  'claro-iptv': {
    category: 'Aplicaciones multiplataforma', platform: 'iPhone · Apple TV · Fire TV', status: 'Producto propio · En desarrollo',
    headline: 'Una biblioteca de vídeo entre pantallas.',
    summary: 'Un reproductor nativo con favoritos, guía, directo y vídeo bajo demanda para fuentes aportadas por el usuario.',
    problem: 'Reproducir contenido en varios dispositivos exige coordinar catálogo, navegación, estado del reproductor y continuidad de la sesión.',
    solution: 'Estamos desarrollando clientes nativos para Apple y Fire TV, con importación de fuentes, favoritos y conservación del punto de reproducción. La integración entre dispositivos se ensaya en un entorno de desarrollo.',
    steps: [{ title: 'Organizar la fuente', text: 'Importar un catálogo y localizar canales, películas o series.' }, { title: 'Reproducir', text: 'Abrir el contenido y gestionar los estados del reproductor.' }, { title: 'Continuar', text: 'Conservar el punto de reproducción y cerrar la sesión de forma controlada.' }],
    care: [{ title: 'Ciclo de reproducción', text: 'El cierre y la liberación de recursos se contemplan como parte de la experiencia.' }, { title: 'Pruebas sin fuentes privadas', text: 'El proyecto dispone de datos sintéticos para ensayar recorridos sin exponer cuentas ni listas personales.' }],
    boundary: 'Nombre provisional y validación física multiplataforma incompleta. No se ofrecen canales, listas, derechos de emisión ni suscripciones de contenido.',
    takeaway: 'Un mismo producto puede requerir experiencias distintas en móvil y televisión, conectadas por reglas comunes.', images: [{"src":"/images/proyectos/claro-appletv.webp","alt":"Vista de series de Claro para Apple TV con contenido de prueba.","caption":"Desarrollo para Apple TV · Catálogo sintético, septiembre de 2026.","width":1600,"height":900}],
  },
  'miriam-studio': {
    category: 'Calidad de comercio electrónico', platform: 'Auditoría · Pruebas de aceptación', status: 'Trabajo de QA y apoyo comercial',
    headline: 'Una tienda debe hacer lo que promete.',
    summary: 'Control de calidad de catálogo, navegación y recorridos de compra sobre una tienda de arte existente.',
    problem: 'Una tienda puede parecer terminada y contener fricciones en productos, variantes, carrito, entrega o visualización móvil. Revisarlas requiere contrastar lo que se muestra con lo que debería ocurrir.',
    solution: 'Preparamos inventario de referencia y pruebas de aceptación del catálogo y los recorridos de compra. El trabajo incluye documentación de incidencias y preparación de materiales comerciales.',
    steps: [{ title: 'Definir la referencia', text: 'Organizar lo que debe mostrar y permitir la tienda.' }, { title: 'Comprobar los recorridos', text: 'Revisar productos, carrito, entrega y adaptación a distintos tamaños.' }, { title: 'Documentar para corregir', text: 'Dejar incidencias y criterios de aceptación verificables.' }],
    care: [{ title: 'Alcance de autoría claro', text: 'Nuestro trabajo es de revisión y apoyo comercial sobre una web existente; no nos atribuimos su construcción.' }, { title: 'Pruebas sin compras reales', text: 'Los recorridos de aceptación no requieren finalizar pedidos ni introducir tarjetas.' }],
    boundary: 'Caso de control de calidad y apoyo comercial. No se atribuyen ventas, conversiones o resultados comerciales medidos a este trabajo.',
    takeaway: 'Además de construir, podemos ayudarte a comprobar si una herramienta existente cumple lo que tu negocio necesita.', images: [{"src":"/images/proyectos/miriam-revision.webp","alt":"Página de Miriam Studio durante la revisión de calidad.","caption":"Captura de revisión, septiembre de 2026. Nuestra intervención: QA y soporte, no autoría de la web.","width":1280,"height":900}],
  },
};

export const projectCatalog: ProjectCase[] = projectRegistry.map((project) => ({ ...details[project.slug], ...project }));
export function getProject(slug: string) {
  const project = projectCatalog.find((item) => item.slug === slug);
  if (!project) throw new Error(`Proyecto no definido: ${slug}`);
  return project;
}
