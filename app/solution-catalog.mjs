// Public editorial content for the innure solutions pilot.
// Spanish (Spain), professional. No invented figures, cases, prices or certifications.

const reviewedOn = '2026-09-21';

const gestoriasSolution = {
    slug: 'gestorias',
    group: 'Sectores',
    navTitle: 'Gestorías y asesorías',
    title: 'Automatización para gestorías y asesorías',
    description:
      'Cómo ordenar la recepción de documentos, los expedientes y las caducidades en una gestoría o asesoría, con revisión humana antes de cada trámite.',
    eyebrow: 'Sectores',
    headline: 'Ordenamos pendientes y expedientes de tu gestoría',
    intro:
      'En una gestoría o asesoría, los documentos llegan por distintos canales y cada cliente tiene sus propios plazos y pendientes. Podemos ayudar a relacionar lo recibido con el expediente, identificar qué falta y asignar el siguiente paso a la persona adecuada.',
    audience:
      'Despachos y equipos de asesoría que reciben documentos por varios canales, trabajan por cliente y periodo, y necesitan saber qué falta y quién debe revisarlo.',
    problem: {
      title: 'Documentos pendientes que se pierden entre correos y carpetas',
      text: 'Cuando una petición llega por correo, portal o conversación, cuesta saber a qué cliente y periodo corresponde, qué documento falta y quién tiene la siguiente tarea. El expediente queda repartido y la revisión depende de recordar cada caso.',
    },
    decisions: [
      {
        title: 'Revisar primero las funciones nativas',
        text: 'Antes de conectar herramientas, conviene revisar qué permite ya el programa de gestión del despacho: clientes, documentos, estados, responsables y avisos. Las capacidades de un producto se comprueban en la cuenta y el plan concretos.',
      },
      {
        title: 'Separar recepción documental y certificados',
        text: 'Recibir y comprobar documentos de un periodo es un proceso distinto de localizar un certificado o vigilar su caducidad. Se mantienen relacionados cuando hace falta, pero no se mezclan sus estados ni sus responsables.',
      },
      {
        title: 'Conectar solo con vía documentada y permisos suficientes',
        text: 'Si la función nativa no cubre el flujo, se estudia una integración únicamente cuando existe una vía documentada, permisos adecuados y una forma de revisar los cambios. Si no, se conserva un proceso manual claro.',
      },
    ],
    workflow: [
      {
        title: 'Abrir la petición por cliente y periodo',
        text: 'Cada solicitud se vincula al cliente, ejercicio o periodo y tipo de documento. La recepción registra lo recibido y lo que sigue pendiente, sin mezclar expedientes parecidos.',
      },
      {
        title: 'Asignar responsable y siguiente tarea',
        text: 'El expediente mantiene una persona responsable, un estado y una próxima tarea concreta. Si falta información, se registra qué debe pedir el equipo y quién lo hará.',
      },
      {
        title: 'Revisar antes de cerrar o presentar',
        text: 'Una persona comprueba los documentos, el periodo y el estado del expediente antes de cerrarlo o continuar con un trámite. El sistema puede recordar una tarea, pero no decide el criterio fiscal ni presenta por su cuenta.',
      },
    ],
    example: {
      title: 'Falta un documento de un trimestre',
      text: 'Ejemplo hipotético: una asesoría recibe parte de la documentación de una empresa para un trimestre. El expediente marca el documento pendiente, asigna la petición a una persona y deja una próxima tarea. Cuando llega el archivo, alguien verifica que corresponde al cliente y periodo antes de darlo por válido.',
    },
    requirements: [
      {
        title: 'Cliente, periodo y estado identificables',
        text: 'El equipo debe poder distinguir a quién pertenece cada documento, a qué periodo corresponde y si está pendiente, recibido, revisado o cerrado. Sin esas referencias, una automatización solo acelera la confusión.',
      },
      {
        title: 'Responsables y permisos definidos',
        text: 'Cada expediente necesita responsables claros y accesos acordes al trabajo. La integración se revisa con los permisos reales del despacho y no presupone acceso a todas las funciones del software.',
      },
      {
        title: 'Certificados y caducidades bajo control',
        text: 'Antes de conectar este paso se aclara dónde se guardan los certificados, quién puede utilizarlos y quién revisa las caducidades. Localizar un certificado no equivale a tener autorización para usarlo ni a completar el trámite.',
      },
    ],
    limits:
      'Este planteamiento cubre la organización de documentos y tareas. El criterio fiscal, la revisión profesional y la presentación de trámites siguen en manos del equipo; no incluye custodia de claves en la nube. Las conexiones se estudian con una vía documentada y permisos suficientes: la compatibilidad con a3, Sage u otro software se comprueba en cada entorno.',
    firstStep:
      'Ver cómo entran hoy los documentos, cómo se identifican por cliente y periodo y quién revisa cada expediente. Después se comprueba qué resuelve el software actual antes de valorar una conexión o una herramienta adicional.',
    questions: [
      '¿Por qué canales recibís documentos y cómo sabéis hoy qué falta de cada cliente y periodo?',
      '¿Quién es responsable de cada expediente y cómo se registra la siguiente tarea?',
      '¿Cómo controláis ahora los certificados, sus permisos de uso y sus caducidades?',
    ],
    faqs: [
      {
        question: '¿Podéis conectar con a3 o Sage?',
        answer:
          'No lo damos por hecho. Primero revisamos las funciones nativas, la vía documentada disponible, el plan y los permisos de la cuenta concreta. Si no hay una conexión adecuada, se plantea un proceso manual revisable.',
      },
      {
        question: '¿El sistema presentará impuestos o decidirá por la asesoría?',
        answer:
          'No. La revisión profesional, el criterio fiscal y la presentación de trámites quedan en manos del equipo. Una automatización puede organizar pendientes y tareas, siempre con revisión humana.',
      },
    ],
    related: ['seguimiento-presupuestos', 'aplicaciones-a-medida', 'reservas-facturacion'],
    evidence: {
      href: '/proyectos/gestor-certificados/',
      label: 'Ver Gestor de Certificados',
      text: 'Gestor de Certificados es una aplicación propia de Windows en validación privada para organizar certificados, fichas, procedimientos y caducidades. No es un caso de cliente, no demuestra compatibilidad universal y no es un servicio de custodia de claves en la nube.',
    },
    sources: [
      {
        title: 'Wolters Kluwer: a3asesor',
        url: 'https://www.wolterskluwer.com/es-es/solutions/a3asesor',
        note: 'La página describe capacidades de automatización de entrada de datos y gestión fiscal y contable de a3asesor. Se cita como capacidad pública del producto, no como prueba de acceso API ni de compatibilidad con innure.',
      },
      {
        title: 'Sage: soluciones para asesorías y despachos',
        url: 'https://www.sage.com/es-es/asesorias-y-despachos/',
        note: 'La página presenta gestión del despacho y un portal para compartir documentos y estados con clientes. Se cita como capacidad pública de Sage, no como prueba de una integración disponible en cada cuenta.',
      },
    ],
    ctaLabel: 'Revisar la gestión de tu gestoría',
    alternatives: [],
    reviewedOn,
};

export const solutionCatalog = [
  {
    slug: 'consultoria-ia-empresas',
    group: 'IA y automatización',
    navTitle: 'Consultoría de IA para empresas',
    title: 'Consultoría de IA para empresas',
    description:
      'Cómo identificar un proceso concreto donde la IA pueda ayudar, probarlo con datos y revisión humana, y decidir si merece implantarse.',
    eyebrow: 'IA y automatización',
    headline: 'Consultoría de IA para el trabajo real de tu empresa',
    intro:
      'Te ayudamos a identificar dónde aplicar IA y a ponerla en marcha: clasificar solicitudes, consultar documentación o preparar borradores. Empezamos por una tarea concreta, aprovechamos tus herramientas y probamos el resultado con tu equipo antes de ampliar.',
    audience:
      'Dirección y responsables de operaciones que quieren valorar IA en un proceso de empresa, con un caso acotado antes de cambiar herramientas o extender su uso al equipo.',
    problem: {
      title: 'Introducir IA sin saber qué tarea debe mejorar',
      text: 'Cuando se parte de una herramienta de moda en lugar de un proceso, aparecen pruebas dispersas, datos sin criterio y resultados difíciles de revisar. El equipo pierde tiempo comparando respuestas sin una decisión clara sobre qué usar, quién lo valida y cuándo detenerse.',
    },
    decisions: [
      {
        title: 'Diagnosticar el proceso antes de elegir IA',
        text: 'Se observa cómo se hace hoy la tarea, qué entradas necesita, qué resultado entrega y dónde se producen esperas o repeticiones. Si el problema es un dato incompleto, un permiso o una regla sin definir, se resuelve primero esa base.',
      },
      {
        title: 'Aprovechar las herramientas existentes cuando encajan',
        text: 'Antes de añadir un proveedor, se revisan las funciones ya disponibles en las herramientas del equipo y sus condiciones reales. Si una capacidad nativa cubre el caso, se prueba con el mismo control que una integración nueva.',
      },
      {
        title: 'Definir una revisión humana y un criterio de parada',
        text: 'La persona responsable sabe qué comprobar antes de usar una salida y qué incidencias deben detener el piloto. La IA puede preparar una propuesta; no autoriza pagos, contratos, respuestas vinculantes ni cambios sobre datos sin una validación acordada.',
      },
    ],
    workflow: [
      {
        title: 'Mapear una tarea repetitiva y su resultado esperado',
        text: 'Se documenta un único proceso: quién inicia la tarea, qué información consulta, qué entrega y cuánto trabajo de revisión exige. Se descartan casos que no tengan un resultado que alguien pueda contrastar.',
      },
      {
        title: 'Preparar un piloto con datos y acceso controlados',
        text: 'Se seleccionan ejemplos permitidos, se limitan los accesos y se define qué información no entra en el piloto. Si intervienen herramientas distintas, se comprueba la integración documentada, los permisos y el propietario de cada dato.',
      },
      {
        title: 'Medir y decidir con una revisión del equipo',
        text: 'El equipo compara las salidas con el proceso actual, registra errores y decide si ajustar, mantener manual o implantar. Un piloto sirve para aprender sobre ese caso; no anticipa resultados para otros procesos ni un retorno económico.',
      },
    ],
    example: {
      title: 'Preparar un borrador para revisar',
      text: 'Ejemplo hipotético: un equipo recibe solicitudes repetidas y tarda en identificar la documentación que debe pedir. Durante un piloto, la IA prepara un borrador de lista a partir de una guía interna aprobada. Una persona comprueba cada borrador antes de enviarlo y anota los errores para decidir si el proceso es suficientemente fiable.',
    },
    requirements: [
      {
        title: 'Proceso, responsable y resultado definidos',
        text: 'El piloto necesita una tarea concreta, una persona que responda por ella y un resultado que se pueda revisar. Sin esos tres elementos, no hay una base útil para evaluar la IA.',
      },
      {
        title: 'Datos permitidos y herramientas revisadas',
        text: 'Se aclara qué datos puede usar cada herramienta, dónde se almacenan, qué permisos requiere el equipo y qué información queda fuera. Una cuenta, plan o integración se valida en el entorno de la empresa antes de depender de ella.',
      },
      {
        title: 'Criterios de calidad y control humano',
        text: 'Antes de probar se acuerda qué debe acertar la salida, quién la revisa y cómo se registran fallos. Las decisiones con impacto en clientes, personal, pagos o compromisos requieren el control que corresponda al caso.',
      },
    ],
    limits:
      'No vendemos una IA que decida por la empresa ni prometemos ahorro, retorno o precisión universal. La compatibilidad, los permisos, el tratamiento de datos, los costes y las obligaciones aplicables se comprueban en cada implantación. Un piloto acotado no equivale a cumplimiento normativo ni a una autorización para extender el uso a otros procesos.',
    firstStep:
      'Elegir una tarea, revisar sus datos y definir qué resultado debe mejorar. Con esa base acordamos el alcance y el presupuesto del piloto.',
    questions: [
      '¿Qué tarea concreta queréis revisar y cómo se resuelve hoy de principio a fin?',
      '¿Qué herramientas y datos intervienen, y qué información no debería entrar en un piloto?',
      '¿Quién validaría el resultado y qué fallo obligaría a detener o replantear la prueba?',
    ],
    faqs: [
      {
        question: '¿Podéis implantar IA en cualquier departamento?',
        answer:
          'Primero hay que entender el proceso, los datos, los accesos y el impacto de un error. Si no existe un caso acotado y revisable, no tiene sentido empezar una implantación por la herramienta.',
      },
      {
        question: '¿La IA tomará decisiones o enviará respuestas por sí sola?',
        answer:
          'No se presupone. Puede preparar borradores o clasificaciones dentro de un flujo definido, pero la revisión humana y los límites de actuación se acuerdan antes. No sustituye la responsabilidad de quien decide en la empresa.',
      },
    ],
    related: ['automatizacion-procesos', 'aplicaciones-a-medida', 'seguimiento-presupuestos'],
    evidence: {
      href: '/proyectos/forja/',
      label: 'Ver FORJA',
      text: 'FORJA es un producto propio que incorpora un asistente de IA dentro de una aplicación. No es un caso de empresa cliente ni demuestra que el enfoque, los datos o los resultados se puedan trasladar a otro proceso.',
    },
    sources: [
      {
        title: 'AEPD: innovación y tecnología',
        url: 'https://www.aepd.es/areas-de-actuacion/innovacion-y-tecnologia',
        note: 'La AEPD reúne guías y notas sobre IA y protección de datos. Sirve para recordar que los datos y riesgos deben revisarse en cada caso; no sustituye el análisis jurídico o técnico de una implantación concreta.',
      },
      {
        title: 'NIST: AI Risk Management Framework',
        url: 'https://www.nist.gov/itl/ai-risk-management-framework',
        note: 'Marco voluntario para gestionar riesgos de sistemas de IA. Orienta la necesidad de definir y revisar el caso de uso, sin certificar una solución ni imponer un estándar a la empresa.',
      },
    ],
    ctaLabel: 'Revisar un caso de IA',
    alternatives: [],
    reviewedOn,
  },
  {
    slug: 'automatizacion-procesos',
    group: 'IA y automatización',
    navTitle: 'Automatización de procesos',
    title: 'Automatización de procesos administrativos',
    description:
      'Reduce trabajo repetitivo entre correos, hojas y programas. Revisamos una tarea administrativa, comprobamos tus herramientas y probamos una mejora con control humano.',
    eyebrow: 'IA y automatización',
    headline: 'Automatización de procesos para quitar trabajo repetitivo',
    intro:
      'Un proceso administrativo suele atascarse al copiar datos entre correos, hojas y programas, o al perseguir tareas que nadie ve. Antes de automatizar, identificamos el recorrido actual, la fuente de cada dato y las excepciones que el equipo debe seguir resolviendo.',
    audience:
      'Empresas con tareas administrativas repetitivas entre herramientas, que necesitan ordenar responsables y estados antes de conectar sistemas o crear una automatización.',
    problem: {
      title: 'Copiar, comprobar y reclamar la misma información una y otra vez',
      text: 'Un alta, una solicitud o un documento puede pasar por correo, una hoja y varios programas. Si cada paso se transcribe a mano, nadie sabe qué sistema manda, dónde falta información o quién debe revisar una incidencia antes de continuar.',
    },
    decisions: [
      {
        title: 'Describir el proceso real y sus excepciones',
        text: 'Se revisa qué activa el trabajo, qué datos se leen o escriben, quién decide cada cambio y qué ocurre cuando falta información. Automatizar solo el camino ideal deja al equipo sin respuesta ante los casos normales que se salen de él.',
      },
      {
        title: 'Configurar primero las funciones existentes',
        text: 'Antes de comprar o desarrollar, se comprueba si el software actual ya permite formularios, estados, tareas, avisos o exportaciones. Una configuración clara puede resolver más que añadir otra capa de herramientas.',
      },
      {
        title: 'Conectar datos solo con acceso y trazabilidad suficientes',
        text: 'Una integración se plantea cuando cada sistema ofrece una vía documentada, permisos adecuados y una forma de revisar qué ha ocurrido. Si no se puede comprobar el cambio o recuperar una incidencia, se mantiene un paso manual controlado.',
      },
    ],
    workflow: [
      {
        title: 'Dibujar el recorrido actual',
        text: 'Se sigue una tarea desde que entra hasta que se cierra: datos, responsables, herramientas, esperas y excepciones. El objetivo es encontrar una fuente de referencia para cada estado, no automatizar sobre copias contradictorias.',
      },
      {
        title: 'Probar una mejora en un tramo acotado',
        text: 'Se selecciona una parte repetitiva, como crear una tarea o trasladar un estado, y se prueba con responsables definidos. Se documentan los permisos, los datos que se mueven y el modo de corregir errores.',
      },
      {
        title: 'Revisar incidencias y mantener el control humano',
        text: 'Las excepciones, duplicados y cambios inesperados llegan a una cola visible para que alguien los resuelva. El equipo valida que el proceso funciona antes de ampliar el alcance a más pasos o departamentos.',
      },
    ],
    example: {
      title: 'Una solicitud interna que llega por correo',
      text: 'Ejemplo hipotético: un equipo recibe solicitudes de compra por correo y después copia los datos a una hoja y a su herramienta de gestión. El piloto crea una tarea con los campos disponibles y marca las solicitudes incompletas para revisión. La persona responsable valida el pedido y corrige los casos que no encajan antes de continuar.',
    },
    requirements: [
      {
        title: 'Fuente de referencia y estados claros',
        text: 'Debe quedar claro qué sistema guarda el estado final de la tarea y qué significa cada paso. Sin una fuente de referencia, la integración puede multiplicar duplicados y confusión.',
      },
      {
        title: 'Accesos, datos e integraciones comprobados',
        text: 'Se validan la vía de conexión, el plan contratado, los permisos y los datos realmente necesarios. Una integración disponible en la documentación no garantiza que esté habilitada en la cuenta de la empresa.',
      },
      {
        title: 'Responsable de excepciones y mantenimiento',
        text: 'Alguien debe revisar los casos que el flujo no puede resolver, cambiar reglas cuando varía el proceso y saber cómo pausar o corregir la automatización. Esa responsabilidad forma parte de la implantación.',
      },
    ],
    limits:
      'Automatizar no sustituye la decisión administrativa, fiscal, comercial o contractual de la empresa. No prometemos eliminar todo el trabajo manual ni cuantificamos ahorro o retorno antes de medir el proceso real. La compatibilidad, los permisos, los costes y el tratamiento de datos se confirman con las herramientas y condiciones de cada negocio.',
    firstStep:
      'Revisar una tarea con quien la realiza, identificar qué se copia entre herramientas y acordar una primera mejora con alcance y presupuesto.',
    questions: [
      '¿Qué tarea administrativa se repite y entre qué herramientas se mueve hoy la información?',
      '¿Cuál es la fuente de referencia de cada estado y quién resuelve un dato incompleto o duplicado?',
      '¿Qué permisos, datos y cambios tendría que poder revisar el equipo antes de automatizar?',
    ],
    faqs: [
      {
        question: '¿Hay que cambiar todas nuestras herramientas?',
        answer:
          'No. Primero se revisa qué permite cada herramienta actual y si existe una configuración o conexión razonable. Cambiar software solo se plantea cuando el proceso y sus límites lo justifican.',
      },
      {
        question: '¿La automatización seguirá funcionando si un caso es distinto?',
        answer:
          'Los casos que se salen de las reglas deben llegar a una persona para revisión. Definimos cómo detectar, pausar y corregir incidencias antes de ampliar el proceso, en lugar de ocultarlas detrás de una automatización.',
      },
    ],
    related: ['consultoria-ia-empresas', 'reservas-facturacion', 'aplicaciones-a-medida'],
    evidence: {
      href: '/proyectos/gestor-certificados/',
      label: 'Ver Gestor de Certificados',
      text: 'Aplicación propia para reunir fichas, certificados, caducidades y accesos a trámites. Muestra desarrollo de software administrativo, no resultados de automatización para terceros.',
    },
    sources: [],
    ctaLabel: 'Revisar un proceso administrativo',
    alternatives: [],
    reviewedOn,
  },
  {
    slug: 'fisioterapia',
    group: 'Sectores',
    navTitle: 'Clínicas de fisioterapia',
    title: 'Automatizar la gestión de citas en fisioterapia',
    description:
      'Cómo ordenar la gestión de citas, cambios y lista de espera en una clínica de fisioterapia limitando los datos al mínimo administrativo necesario.',
    eyebrow: 'Sectores',
    headline: 'Ordenamos la agenda administrativa de tu clínica de fisioterapia',
    intro:
      'Automatizar la gestión de una clínica de fisioterapia no es sustituir el programa clínico, sino ordenar citas, avisos y cambios para que recepción y profesionales compartan la misma información. Aquí se explica qué se puede resolver y qué conviene dejar en manos humanas.',
    audience:
      'Responsables y recepción de clínicas con varios profesionales, donde los cambios de cita y la lista de espera se gestionan a mano y duplican tareas.',
    problem: {
      title: 'Cambios de cita que desordenan agenda y administración',
      text: 'Cada cambio de hora o de profesional obliga a tocar la agenda, avisar al paciente y corregir la administración. Si recepción y terapeutas usan copias distintas, aparecen huecos, dobles reservas y recordatorios anticuados.',
    },
    decisions: [
      {
        title: 'Aprovechar el software clínico actual',
        text: 'Antes de integrar nada, conviene revisar qué resuelve el programa que ya usa la clínica: agenda por profesional, cambios, avisos y permisos por rol. Si cubre el proceso, configurarlo es más directo.',
      },
      {
        title: 'Integrar agenda y mensajería con fuente única',
        text: 'Si el programa no cubre avisos y lista de espera, se conecta una agenda de referencia con el canal de mensajes. La integración exige acceso documentado y suficiente; sin él, no compensa.',
      },
      {
        title: 'Mantener la gestión manual que funciona',
        text: 'No todo necesita automatización. La recepción puede seguir gestionando excepciones, pacientes sin móvil o cambios de última hora, mientras el sistema se limita a lo repetitivo.',
      },
    ],
    workflow: [
      {
        title: 'Definir la fuente única de agenda',
        text: 'Se acuerda qué calendario manda. Cualquier alta, cambio o cancelación se registra primero ahí; los demás canales solo reflejan ese estado.',
      },
      {
        title: 'Anular y reenviar recordatorios al cambiar',
        text: 'Si una cita cambia de hora o de profesional, el aviso anterior se cancela y se genera otro con los datos vigentes, para no enviar información obsoleta.',
      },
      {
        title: 'Revisar excepciones antes de cerrar',
        text: 'Un responsable repasa los avisos no entregados, los huecos de lista de espera y los cambios manuales antes de dar la jornada por cerrada.',
      },
    ],
    example: {
      title: 'Una cita cambia de día y de profesional',
      text: 'Ejemplo hipotético: una paciente cambia su cita del martes a primera hora del jueves y de un profesional a otro. El sistema actualiza la agenda, anula el recordatorio antiguo y envía el nuevo con los datos vigentes.',
    },
    requirements: [
      {
        title: 'Acceso documentado al software de agenda',
        text: 'La integración solo se plantea si el proveedor clínico ofrece una vía documentada y estable para leer y escribir citas. Sin ella, se trabaja con funciones nativas y exportaciones manuales.',
      },
      {
        title: 'Permisos por rol',
        text: 'Recepción, terapeutas y dirección necesitan permisos distintos. El sistema debe respetar quién puede ver, mover o cancelar cada cita.',
      },
      {
        title: 'Datos de la cita bajo control',
        text: 'Aunque el aviso se limite a fecha, hora, profesional y sede, sigue siendo información personal que necesita protección. Excluir historia clínica, síntomas y tratamiento del circuito no elimina por sí mismo el riesgo: hay que revisar el canal y los accesos.',
      },
    ],
    limits:
      'No vendemos software clínico ni sustituimos la historia del paciente. La automatización cubre citas y avisos; el criterio sanitario sigue en manos del profesional. Los datos de la cita son información personal y exigen protección y control de accesos. Tampoco afirmamos que un programa concreto tenga API abierta ni certificamos cumplimiento legal: eso se comprueba y se valora con el negocio.',
    firstStep:
      'Una conversación breve sobre cómo se gestionan los cambios de cita y qué permite el software actual. De ahí sale si basta con configurar, si conviene integrar o si no merece la pena tocar nada.',
    questions: [
      '¿Qué programa de agenda utilizáis y permite leer y escribir citas por una vía documentada?',
      '¿Quién decide los cambios de cita y quién avisa al paciente cuando algo se mueve?',
      '¿Qué ocurre hoy cuando una cita cambia y el recordatorio anterior ya se había enviado?',
    ],
    faqs: [
      {
        question: '¿Vais a sustituir nuestro software clínico?',
        answer:
          'No. La propuesta se apoya en el programa que ya usa la clínica y, si se integra algo, se hace alrededor de la agenda. La historia clínica permanece donde está.',
      },
      {
        question: '¿Qué información incluirían los recordatorios?',
        answer:
          'La menor posible: fecha, hora, profesional y sede, además de los datos administrativos necesarios. Ese contenido sigue siendo información personal, así que se protege el canal y se limitan los accesos. No se incluyen historia clínica, síntomas ni tratamiento, y no se envía contexto clínico por mensajería ni a una IA.',
      },
    ],
    related: ['reservas-whatsapp', 'reservas-facturacion', 'aplicaciones-a-medida'],
    evidence: {
      href: '/proyectos/sienta/',
      label: 'Ver SIENTA',
      text: 'Muestra un producto del equipo, SIENTA, para negocios de hostelería. No es un caso de clínica de fisioterapia ni demuestra la integración de agenda descrita; solo ilustra el tipo de trabajo que realizamos.',
    },
    sources: [
      {
        title: 'Calendly: cambios en eventos reprogramados',
        url: 'https://developer.calendly.com/docs/api-guides/see-how-webhook-payloads-change-when-invitees-reschedule-events',
        note: 'Documentación pública que muestra que reprogramar emite eventos de creación y cancelación. Conviene tratarlo como un cambio para no duplicar avisos.',
      },
      {
        title: 'Google Calendar: sincronización incremental',
        url: 'https://developers.google.com/workspace/calendar/api/guides/sync',
        note: 'Describe la sincronización incremental y la resincronización completa cuando caduca el token. Es un ejemplo de calendario y no equivale al software clínico.',
      },
    ],
    ctaLabel: 'Hablar de la gestión de tu clínica',
    alternatives: [],
    reviewedOn,
  },
  {
    slug: 'centros-estetica',
    group: 'Sectores',
    navTitle: 'Centros de estética',
    title: 'Cabinas, bonos y caja en centros de estética',
    description:
      'Cómo cuadrar la reserva de cabinas, el consumo de bonos y el cierre de caja en un centro de estética de servicios, con revisión humana de diferencias.',
    eyebrow: 'Sectores',
    headline: 'Ordenamos cabinas, bonos y cobros de tu centro de estética',
    intro:
      'En un centro de estética la agenda no reserva solo a una persona: también ocupa una cabina, consume sesiones de un bono y puede añadir producto. Ordenar esa gestión administrativa exige distinguir cada operación y cuadrarla antes del cierre.',
    audience:
      'Dirección y recepción de centros de estética de servicios que trabajan con cabinas, bonos y venta de producto, y necesitan que la caja cuadre con las sesiones realizadas.',
    problem: {
      title: 'Bonos, cabinas y caja que no cuadran al cerrar',
      text: 'Un centro agenda cabinas y profesionales a la vez, consume sesiones de bonos y vende productos. Si la agenda no distingue una sesión realizada de una cita anulada, el cierre de caja arrastra diferencias.',
    },
    decisions: [
      {
        title: 'Usar la agenda por cabina del software sectorial',
        text: 'Muchos programas del sector ya gestionan cabinas, bonos, sesiones y terminal de punto de venta. Revisar esas funciones antes de integrar evita pagar dos veces por lo mismo.',
      },
      {
        title: 'Conectar sesiones y cobros con la agenda',
        text: 'Si el programa no cubre el ciclo completo, se integra la agenda con la gestión de bonos y caja. Aquí importa distinguir una sesión consumida de una cita solo reservada.',
      },
      {
        title: 'Concentrar las incidencias en revisión manual',
        text: 'Cambios, devoluciones y consumos dudosos se marcan para que una persona los revise antes del cierre, en lugar de aplicar reglas automáticas que nadie entiende.',
      },
    ],
    workflow: [
      {
        title: 'Reservar profesional y cabina a la vez',
        text: 'Cada cita ocupa el hueco del profesional y la cabina con la duración real del servicio, para que no se solapen dos atenciones sobre la misma cabina.',
      },
      {
        title: 'Aplicar la política de consumo acordada',
        text: 'La sesión se descuenta según la política acordada, por ejemplo al realizar el servicio. Las anulaciones se resuelven según las condiciones de cancelación y devolución del centro, no con una regla única.',
      },
      {
        title: 'Conciliar caja, bonos y producto al cerrar',
        text: 'Al final de la jornada se cuadran los cobros, las sesiones usadas y el producto vendido frente al de uso interno; las diferencias se revisan antes del cierre.',
      },
    ],
    example: {
      title: 'Una sesión de bono se anula con antelación',
      text: 'Ejemplo hipotético: una clienta anula con antelación una sesión pagada con bono. Según la política acordada, el sistema libera la cabina y aplica las condiciones de cancelación; si al cerrar aparece una diferencia, se revisa antes de confirmar.',
    },
    requirements: [
      {
        title: 'Fijar la política de bonos y cancelaciones',
        text: 'Antes de automatizar hay que fijar la política de consumo, cancelación y devolución, y después aplicarla de forma consistente. Sin esa base, cada incidencia se resuelve a criterio de quien esté en recepción.',
      },
      {
        title: 'Separar producto vendido de uso interno',
        text: 'La venta de producto a la clienta y el consumo interno del centro son operaciones distintas y deben registrarse por separado para que el margen no se mezcle.',
      },
      {
        title: 'Datos de personas protegidos',
        text: 'La estética de servicios no es medicina estética y no se incorporan fotos, historia ni datos clínicos. Aun así, los datos de reservas, bonos y personas siguen necesitando protección y accesos controlados.',
      },
    ],
    limits:
      'Este trabajo cubre la gestión administrativa: agenda, bonos, sesiones, caja y producto. No incluye valoración estética, diagnóstico ni tratamiento, ni incorpora fotos o historia clínica. Los datos de reservas y personas siguen siendo información personal y requieren protección y accesos controlados. Tampoco afirmamos que un programa sectorial concreto exponga una API: se comprueba antes.',
    firstStep:
      'Ver cómo se reservan cabinas, cómo se descuentan los bonos y cómo se cierra la caja. Con eso se decide si basta con ajustar el software actual o si hace falta integración.',
    questions: [
      '¿Qué programa usa para agenda, bonos y caja, y permite modificar esos datos por una vía documentada?',
      '¿En qué momento exacto se descuenta una sesión del bono?',
      '¿Cómo se separa hoy la venta de producto del consumo interno y quién revisa el cierre?',
    ],
    faqs: [
      {
        question: '¿La automatización incluye valoraciones o tratamientos?',
        answer:
          'No. Se limita a la parte administrativa: citas, cabinas, bonos, cobros y producto. La valoración y cualquier decisión sobre tratamientos quedan en manos del profesional.',
      },
      {
        question: '¿Se pueden usar fotos o datos de salud de las clientas?',
        answer:
          'No en este piloto. La integración trabaja con datos administrativos de la cita y de la venta, que también se protegen. Imágenes, datos de salud e historiales no se trasladan a la automatización.',
      },
    ],
    related: ['fisioterapia', 'reservas-facturacion', 'aplicaciones-a-medida'],
    evidence: {
      href: '/proyectos/sienta/',
      label: 'Ver SIENTA',
      text: 'Muestra un producto del equipo, SIENTA, para negocios de hostelería. No es un caso de centro de estética ni demuestra la integración de cabinas o bonos; solo ilustra el tipo de trabajo que realizamos.',
    },
    sources: [
      {
        title: 'ByClinics: software para centros de estética',
        url: 'https://byclinics.com/es/especialidades/software-centros-estetica/',
        note: 'Oferta sectorial que menciona agenda por cabina, bonos y packs, terminal de punto de venta y gestión de productos. Se cita como referencia de funciones habituales, sin afirmar integración con innure.',
      },
    ],
    ctaLabel: 'Revisar la gestión de tu centro',
    alternatives: [],
    reviewedOn,
  },
  gestoriasSolution,
  {
    slug: 'reservas-whatsapp',
    group: 'Procesos',
    navTitle: 'Reservas y WhatsApp',
    title: 'Reservas y avisos por WhatsApp',
    description:
      'Cómo integrar la agenda con avisos y confirmaciones por WhatsApp respetando el consentimiento, las bajas y los requisitos de WhatsApp Business Platform.',
    eyebrow: 'Procesos',
    headline: 'Conectamos tu agenda con avisos permitidos por WhatsApp',
    intro:
      'Confirmar y recordar citas por WhatsApp es útil cuando parte de una agenda fiable y de un consentimiento claro. La diferencia entre el botón de chat y WhatsApp Business Platform marca lo que se puede automatizar.',
    audience:
      'Negocios que ya atienden clientes por WhatsApp y quieren confirmar, recordar o cambiar citas sin montar campañas masivas ni prometer una atención imposible.',
    problem: {
      title: 'Recordatorios tardíos o enviados a quien pidió la baja',
      text: 'Si la agenda y los avisos viven separados, un cambio de última hora puede generar un mensaje equivocado o ninguno. Iniciar la conversación fuera de las reglas de la plataforma también hace que el mensaje no llegue.',
    },
    decisions: [
      {
        title: 'Usar el botón de WhatsApp con conversación manual',
        text: 'El botón abre un chat con una persona desde la web o la ficha. Es la opción más simple si el volumen es bajo y alguien puede atender las respuestas a mano.',
      },
      {
        title: 'Automatizar con WhatsApp Business Platform',
        text: 'Para enviar avisos automáticos desde la agenda se utiliza WhatsApp Business Platform, con el permiso del cliente y plantillas aprobadas cuando corresponda. Antes de empezar se revisan los requisitos, costes y condiciones del proveedor.',
      },
      {
        title: 'No automatizar todavía',
        text: 'Si no hay consentimiento claro, no se envía por WhatsApp ni siquiera a mano: hay que obtenerlo por una vía válida, usar otro canal acordado o no contactar.',
      },
    ],
    workflow: [
      {
        title: 'Partir de la agenda de referencia',
        text: 'Toda alta, cambio o cancelación se registra primero en la agenda. Solo después se decide si toca enviar un mensaje y con qué texto.',
      },
      {
        title: 'Revalidar consentimiento y preferencia',
        text: 'Antes de cada aviso se comprueba que la cita sigue vigente y que la persona acepta ese canal. Si pidió la baja o cambió de preferencia, no se envía.',
      },
      {
        title: 'Reconciliar la respuesta y controlar fallos',
        text: 'La respuesta se refleja en la agenda y, si el proveedor no contesta o el mensaje falla, se registra el intento, se limita el reintento y se deriva a una persona.',
      },
    ],
    example: {
      title: 'Una reserva cambia de hora el día anterior',
      text: 'Ejemplo hipotético: un cliente reserva por la web y recibe la confirmación con la plantilla aprobada. Al día siguiente cambia la hora; el sistema anula el aviso antiguo, envía el nuevo y actualiza la agenda. Si el mensaje falla, recepción llama a la persona.',
    },
    requirements: [
      {
        title: 'Consentimiento y canal válido',
        text: 'La persona debe haber aceptado recibir mensajes por WhatsApp, y hay que respetar las bajas. La ventana de 24 horas se cuenta desde su último mensaje; fuera de ella solo se pueden enviar plantillas aprobadas.',
      },
      {
        title: 'Agenda fiable como referencia',
        text: 'Los mensajes parten de una agenda única. Si hay varias versiones de la cita, el aviso automático solo añadirá confusión.',
      },
      {
        title: 'Costes y plan a revisar',
        text: 'Los costes y las condiciones del plan de WhatsApp Business Platform y del proveedor se revisan antes de empezar y se presupuestan con el resto del proyecto.',
      },
    ],
    limits:
      'No hacemos mensajería masiva ni campañas no solicitadas: el aviso parte de una cita o conversación previa. No afirmamos que una cuenta o un número existente se migre sin cambios, ni que una IA sea necesaria para recordar una cita.',
    firstStep:
      'Revisar cómo se crean y cambian las citas, qué consentimiento existe y qué espera conseguir con WhatsApp. Con eso se decide si conviene el botón, WhatsApp Business Platform o seguir igual.',
    questions: [
      '¿Desde qué agenda se crean y modifican las citas, y permite recibir avisos de cambio de forma documentada?',
      '¿Qué consentimiento han dado los clientes para recibir mensajes y cómo se gestiona la baja?',
      '¿Quién atiende hoy las respuestas y qué debe pasar cuando el proveedor no entrega el mensaje?',
    ],
    faqs: [
      {
        question: '¿Necesito una IA para recordar citas por WhatsApp?',
        answer:
          'No. Un recordatorio parte de una regla sencilla: cita vigente, canal aceptado y plantilla permitida. La IA solo tendría sentido, de forma opcional, para clasificar respuestas ambiguas con revisión humana.',
      },
      {
        question: '¿Sirve el botón de WhatsApp que ya tengo en la web?',
        answer:
          'El botón abre una conversación manual y no automatiza avisos. Para recordatorios automáticos hace falta WhatsApp Business Platform, con sus requisitos, costes y condiciones.',
      },
    ],
    related: ['fisioterapia', 'centros-estetica', 'reservas-facturacion'],
    evidence: {
      href: '/proyectos/automatizacion-musical/',
      label: 'Ver automatización musical',
      text: 'Muestra un flujo de automatización desarrollado por el equipo en el ámbito musical. Ilustra cómo se encadenan tareas, pero no prueba ninguna integración con WhatsApp ni experiencia en reservas.',
    },
    sources: [
      {
        title: 'WhatsApp Business: política de mensajería',
        url: 'https://whatsappbusiness.com/policy/',
        note: 'Confirma el consentimiento previo, el respeto a las bajas, el uso de plantillas aprobadas fuera de la ventana de 24 horas desde el último mensaje del usuario y el acceso a atención humana.',
      },
      {
        title: 'Calendly: eventos al reprogramar una cita',
        url: 'https://developer.calendly.com/docs/api-guides/see-how-webhook-payloads-change-when-invitees-reschedule-events',
        note: 'Ejemplo documentado de que un cambio de cita emite eventos de creación y cancelación. Sujeto al plan y permisos de la cuenta; no es una integración de WhatsApp.',
      },
    ],
    ctaLabel: 'Hablar de tus avisos por WhatsApp',
    alternatives: [],
    reviewedOn,
  },
  {
    slug: 'reservas-facturacion',
    group: 'Procesos',
    navTitle: 'Reservas y facturación',
    title: 'Reservas, cobros y facturación',
    description:
      'Cómo ordenar reservas, cobros y facturación distinguiendo cada estado y evitando duplicados, también con anticipos y facturas pendientes de cobro.',
    eyebrow: 'Procesos',
    headline: 'Unimos cita, cobro y factura sin dar pasos por sentados',
    intro:
      'Conectar reservas y facturación puede evitar introducir los mismos datos varias veces. Una cita, una asistencia, un cobro y una factura son hechos distintos y deben registrarse por separado.',
    audience:
      'Administración y dirección de negocios que reciben reservas y emiten facturas, y quieren evitar duplicados, estados mal conciliados y documentos emitidos dos veces.',
    problem: {
      title: 'Estados mal conciliados y facturas duplicadas',
      text: 'Una reserva, una asistencia, un cobro y una factura siguen caminos distintos. Si se tratan como un solo hecho, un anticipo puede acabar como cobro cerrado, una factura puede emitirse dos veces o un documento pendiente quedar sin conciliar.',
    },
    decisions: [
      {
        title: 'Empezar por el módulo nativo de facturación',
        text: 'Si el programa de gestión ya genera facturas desde la agenda, ajustar esa función suele ser más directo y evita añadir una conexión externa.',
      },
      {
        title: 'Integrar agenda y facturación por API',
        text: 'Cuando el programa no cubre el ciclo, se conecta la agenda con el sistema de facturación mediante su API, manteniendo cada estado separado y validando los datos mínimos.',
      },
      {
        title: 'Delegar la excepción en una persona',
        text: 'Anticipos, devoluciones, cambios de titular o dudas fiscales se marcan para que un responsable los revise antes de emitir o modificar una factura.',
      },
    ],
    workflow: [
      {
        title: 'Separar reserva, asistencia, cobro y factura',
        text: 'Cada paso se registra como un estado propio. Una cita creada no marca asistencia ni cobro, y el desencadenante de la factura se define aparte según el caso.',
      },
      {
        title: 'Validar datos mínimos con identificador estable',
        text: 'Antes de crear un documento se comprueban los datos necesarios y se usa un identificador único que evite duplicados cuando llegan avisos repetidos.',
      },
      {
        title: 'Revisar excepciones antes de facturar',
        text: 'Cancelaciones, anticipos, devoluciones y cambios se acumulan en una lista que una persona revisa. El tratamiento fiscal lo define la gestoría, no una regla automática.',
      },
    ],
    example: {
      title: 'Un anticipo y una cancelación posterior',
      text: 'Ejemplo hipotético: un cliente reserva y paga un anticipo; más tarde cancela dentro del plazo acordado. El sistema registra el anticipo como tal, no lo convierte en cobro final y deriva la cancelación a administración, que decide la devolución y el tratamiento documental según las reglas aprobadas, sin borrar ni omitir documentos por defecto.',
    },
    requirements: [
      {
        title: 'Identificador único por operación',
        text: 'Cada cita y cada documento necesitan un identificador estable. Sin él, los avisos repetidos o los reintentos generan facturas duplicadas difíciles de corregir.',
      },
      {
        title: 'Datos mínimos validados',
        text: 'Antes de facturar deben estar completos y correctos los datos del cliente y del servicio. La integración no debe inventar ni completar datos fiscales por su cuenta.',
      },
      {
        title: 'Criterio de la gestoría para casos fiscales',
        text: 'El tratamiento de impuestos, series y devoluciones lo fija la gestoría del negocio. La automatización aplica ese criterio, no reglas universales inventadas.',
      },
    ],
    limits:
      'No sustituimos a la gestoría ni decidimos el tratamiento fiscal: la integración mueve estados y documentos según las reglas acordadas. No afirmamos que la conexión esté ya instalada ni que funcione en cualquier plan: se comprueban plan y permisos antes.',
    firstStep:
      'Repasar cómo se pasa hoy de una cita a un cobro y a una factura, y qué casos especiales aparecen. Con eso se define qué estado debe cambiar solo y qué debe revisar una persona.',
    questions: [
      '¿Qué programa de facturación usa y ofrece una API documentada para crear facturas y registrar pagos?',
      '¿Cómo se distingue hoy una cita reservada de un servicio prestado y de un cobro confirmado?',
      '¿Qué casos especiales revisa la gestoría y con qué criterio?',
    ],
    faqs: [
      {
        question: '¿La integración emite facturas automáticamente?',
        answer:
          'Depende del desencadenante que se acuerde con el negocio y la gestoría: puede ser la reserva, el servicio o el cobro, según el caso. La integración no confunde pago, servicio y obligación documental, y deja la emisión sujeta a las reglas aprobadas.',
      },
      {
        question: '¿Sirven los avisos de Calendly para saber si hubo cobro?',
        answer:
          'No. Los avisos documentados acreditan que una cita se creó, canceló o reprogramó; no dicen si la persona asistió ni si pagó. Esos datos vienen del negocio.',
      },
    ],
    related: ['centros-estetica', 'reservas-whatsapp', 'aplicaciones-a-medida'],
    evidence: {
      href: '/proyectos/gestor-certificados/',
      label: 'Ver gestor de certificados',
      text: 'Muestra una herramienta propia para una tarea administrativa distinta, relacionada con certificados. No es un caso de facturación ni demuestra la integración descrita.',
    },
    sources: [
      {
        title: 'Holded: documentación para desarrolladores',
        url: 'https://www.holded.com/es/desarrolladores',
        note: 'Documenta operaciones para crear y aprobar facturas, registrar pagos y gestionar documentos. Su uso depende de los permisos y condiciones de cada cuenta.',
      },
      {
        title: 'Calendly: eventos al reprogramar una cita',
        url: 'https://developer.calendly.com/docs/api-guides/see-how-webhook-payloads-change-when-invitees-reschedule-events',
        note: 'Documenta que reprogramar emite eventos de creación y cancelación. Acredita cambios de cita, no asistencia ni cobro, y depende del plan contratado.',
      },
    ],
    ctaLabel: 'Revisar reservas y facturación',
    alternatives: [],
    reviewedOn,
  },
  {
    slug: 'seguimiento-presupuestos',
    group: 'Procesos',
    navTitle: 'Seguimiento de presupuestos',
    title: 'Seguimiento de presupuestos',
    description:
      'Cómo dar a cada presupuesto un responsable, una próxima acción y un criterio de parada, sin prospección no solicitada ni envíos masivos de correo.',
    eyebrow: 'Procesos',
    headline: 'Ordenamos tus presupuestos con siguiente paso y responsable',
    intro:
      'Un presupuesto enviado sin responsable ni fecha de retorno puede quedarse sin seguimiento. No depende solo de nosotros: el precio, el encaje y el momento de decisión son del cliente. El objetivo es que cada propuesta tenga dueño, siguiente acción y un criterio claro para parar.',
    audience:
      'Equipos comerciales pequeños y direcciones que envían presupuestos y necesitan un seguimiento ordenado, sin convertir la herramienta en una máquina de correos insistentes.',
    problem: {
      title: 'Presupuestos enviados que nadie vuelve a mirar',
      text: 'Es fácil enviar una propuesta y perderle la pista entre el resto del trabajo. Si no está claro quién la lleva ni cuándo toca retomarla, la oportunidad se enfría sin que nadie haya decidido abandonarla.',
    },
    decisions: [
      {
        title: 'Usar las tareas y reglas del CRM actual',
        text: 'Antes de plantear un CRM nuevo, conviene revisar si el que ya se usa permite crear tareas, asignarlas y recordar la próxima acción. Muchas veces basta con configurarlo bien.',
      },
      {
        title: 'Añadir recordatorios automáticos sobre el CRM',
        text: 'Si las funciones nativas no bastan, se automatiza la creación de tareas y avisos a partir del estado del presupuesto, con revisiones humanas en los puntos delicados.',
      },
      {
        title: 'Concentrar el seguimiento en una persona',
        text: 'Si el equipo es pequeño, puede ser más realista que alguien revise cada semana la lista de oportunidades abiertas y decida el siguiente paso.',
      },
    ],
    workflow: [
      {
        title: 'Registrar oportunidad y versión del presupuesto',
        text: 'Cada propuesta queda asociada a una oportunidad con identificador propio y a la versión enviada, para saber qué se ofreció y evitar mezclar revisiones.',
      },
      {
        title: 'Fijar responsable y fecha de próxima acción',
        text: 'Ninguna propuesta queda sin dueño ni sin fecha. Esa fecha genera el recordatorio; si cambia el precio o el alcance, la responsabilidad se reasigna a una persona.',
      },
      {
        title: 'Detener el seguimiento según la respuesta',
        text: 'La secuencia se para con una respuesta, un rechazo, una baja o una aceptación. Cada caso se registra para no insistir a quien ya decidió.',
      },
    ],
    example: {
      title: 'Un presupuesto que el cliente compara',
      text: 'Ejemplo hipotético: una empresa envía un presupuesto y anota la fecha de la próxima llamada. El sistema crea la tarea para el comercial asignado y guarda la versión entregada. Si el cliente responde que lo está comparando, la respuesta pausa el automatismo y el comercial acuerda con él el siguiente paso.',
    },
    requirements: [
      {
        title: 'Identificador de oportunidad y versión',
        text: 'Hay que poder distinguir una oportunidad de las versiones de su presupuesto. Sin esa referencia, los recordatorios se disparan sobre propuestas antiguas o duplicadas.',
      },
      {
        title: 'Información aprobada para el borrador',
        text: 'Si se usa IA para preparar un mensaje, trabaja solo con datos aprobados. No decide descuentos, plazos ni compromisos: eso lo confirma una persona.',
      },
      {
        title: 'Permisos y plan del CRM',
        text: 'Las tareas y automatizaciones dependen de la autenticación, los permisos y el plan contratado. Se validan antes de prometer cualquier capacidad concreta.',
      },
    ],
    limits:
      'No hacemos prospección no solicitada ni envíos masivos: el seguimiento parte de presupuestos y contactos existentes. No prometemos ventas ni pronosticamos cierres; tiene sentido medir el porcentaje de presupuestos con próxima acción, las respuestas, los contactos cualificados y las oportunidades reales.',
    firstStep:
      'Ver dónde se guardan hoy los presupuestos y cómo se recuerda retomarlos. A partir de ahí se decide si basta con configurar el CRM, si conviene automatizar tareas o si no merece la pena una herramienta nueva.',
    questions: [
      '¿Dónde se guardan los presupuestos y el CRM permite crear y asignar tareas por una vía documentada?',
      '¿Quién es el responsable de cada oportunidad y cómo se decide hoy la próxima acción?',
      '¿Qué debe detener el seguimiento: una respuesta, un rechazo, una baja o una aceptación?',
    ],
    faqs: [
      {
        question: '¿Vais a crear un CRM nuevo?',
        answer:
          'No necesariamente. Lo primero es revisar las tareas y reglas del CRM que ya se usa. Solo si no cubren el seguimiento se plantea añadir automatizaciones o cambiar de herramienta.',
      },
      {
        question: '¿Puede la IA escribir los mensajes de seguimiento?',
        answer:
          'Puede preparar un borrador a partir de información aprobada y del estado del presupuesto, siempre con revisión humana antes de enviarlo. No negocia precios ni asume compromisos.',
      },
    ],
    related: ['aplicaciones-a-medida', 'reservas-facturacion', 'gestorias'],
    evidence: {
      href: '/proyectos/automatizacion-musical/',
      label: 'Ver automatización musical',
      text: 'Muestra un flujo de automatización del equipo dentro del ámbito musical. Es un ámbito distinto y no demuestra seguimiento comercial ni resultados de ventas.',
    },
    sources: [
      {
        title: 'HubSpot: API de tareas',
        url: 'https://developers.hubspot.com/docs/api-reference/legacy/crm/activities/tasks/create-task',
        note: 'Documenta cómo crear tareas y asociarlas a contactos y negocios. Conviene validar autenticación, permisos y plan antes de dar por hecho cualquier automatización.',
      },
    ],
    ctaLabel: 'Revisar el seguimiento comercial',
    alternatives: [],
    reviewedOn,
  },
  {
    slug: 'aplicaciones-a-medida',
    group: 'Decisiones',
    navTitle: 'Aplicaciones a medida',
    title: 'Desarrollo de aplicaciones a medida para empresas',
    description:
      'Desarrollamos aplicaciones de gestión, herramientas internas y portales para empresas. Apoyo de IA, revisión técnica, pruebas y mantenimiento acordado.',
    eyebrow: 'Desarrollo de aplicaciones para empresas',
    headline: 'Aplicaciones a medida para la forma de trabajar de tu empresa',
    intro:
      'Creamos aplicaciones de gestión, herramientas internas y portales adaptados a tu negocio. Desarrollo con apoyo de IA, revisión técnica y pruebas. Acordamos contigo el alcance, el presupuesto y el mantenimiento.',
    audience:
      'Empresas que necesitan gestionar pedidos, trabajos, documentación o clientes con una herramienta adaptada a su proceso.',
    problem: {
      title: 'Pedir una aplicación cuando basta con configurar',
      text: 'A veces una empresa pide una aplicación nueva porque una tarea se atasca, aunque la causa sea un software mal configurado o dos herramientas que no se hablan. Desarrollar sin comparar alternativas añade coste y mantenimiento.',
    },
    decisions: [
      {
        title: 'Definir el proceso antes que la herramienta',
        text: 'Se describe el flujo real, los pasos que lo distinguen y los límites que no se pueden cruzar. La herramienta se elige después, no al revés.',
      },
      {
        title: 'Comparar el coste durante su uso',
        text: 'Se comparan implantación, licencias, integraciones, soporte, exportación, formación y migración. Una aplicación a medida también genera mantenimiento y evolución.',
      },
      {
        title: 'Asignar un propietario del mantenimiento',
        text: 'Antes de decidir queda claro quién mantendrá la solución en el tiempo, tanto si es un producto como si es desarrollo propio.',
      },
    ],
    workflow: [
      {
        title: 'Una primera versión bien definida',
        text: 'Priorizamos el proceso que queréis resolver y acordamos funcionalidades, presupuesto y criterios de aceptación. Lo que puede esperar queda para una fase posterior.',
      },
      {
        title: 'Entregas que podéis revisar',
        text: 'Utilizamos IA como apoyo al desarrollo, revisamos el código y compartimos avances por etapas. Vuestro equipo puede probar el recorrido y ajustar los detalles antes de la entrega.',
      },
      {
        title: 'Pruebas y puesta en marcha',
        text: 'Comprobamos los casos acordados, permisos y errores con vuestro equipo. Dejamos definido cómo usar la aplicación, quién da soporte y qué incluye el mantenimiento.',
      },
    ],
    example: {
      title: 'Una tarea administrativa que se atasca',
      text: 'Ejemplo hipotético: una empresa de servicios cree necesitar una aplicación propia para no perder oportunidades. Al revisar la tarea, se ve que el CRM ya permite crear tareas con fecha y responsable. Se configura esa parte y se descarta desarrollar.',
    },
    requirements: [
      {
        title: 'Requisitos priorizados por escrito',
        text: 'Una lista ordenada de lo imprescindible y lo opcional permite comparar opciones con el mismo criterio y evita decidir por impresiones.',
      },
      {
        title: 'Permisos y datos de prueba',
        text: 'La prueba necesita acceso a un entorno seguro con permisos suficientes y datos no sensibles. Así se comprueba el comportamiento real sin exponer información.',
      },
      {
        title: 'Responsable y plan de salida',
        text: 'Debe quedar claro quién mantiene la solución y cómo se exportan los datos si algún día se cambia. Sin propietario, cualquier opción se vuelve frágil.',
      },
    ],
    limits:
      'Una aplicación a medida exige presupuesto de mantenimiento, soporte y evolución, igual que una herramienta externa. Antes de decidir conviene comprobar requisitos, integraciones disponibles, exportación de datos y quién asume el cambio. No damos cifras cerradas de coste ni plazos: dependen del alcance acordado.',
    firstStep:
      'Una conversación para entender la tarea que se atasca y qué se ha probado ya. De ahí sale una recomendación razonada: configurar, integrar o desarrollar, con el mantenimiento en cuenta.',
    questions: [
      '¿Qué aplicación necesitáis, quién la usaría y cómo resolvéis hoy esa tarea?',
      '¿Qué herramientas o datos debería conectar?',
      '¿Qué os gustaría tener resuelto en una primera versión?',
    ],
    faqs: [
      {
        question: '¿Cuánto cuesta y cuánto tarda una aplicación a medida?',
        answer:
          'Depende de las funciones, los usuarios, las integraciones y las pruebas necesarias. La primera conversación es gratuita; después concretamos el alcance y os presentamos una propuesta con presupuesto y plazos antes de desarrollar.',
      },
      {
        question: '¿Qué aporta la IA al desarrollo?',
        answer:
          'La usamos como apoyo para preparar y revisar partes del desarrollo. El equipo conserva la responsabilidad sobre el código y las pruebas. Si vuestra aplicación necesita funciones de IA, valoramos su utilidad, el uso de datos, los costes y la revisión humana por separado.',
      },
      {
        question: '¿Podéis mantener y ampliar la aplicación después?',
        answer:
          'Sí. Proponemos un mantenimiento mensual por separado, con las tareas, el soporte y sus condiciones por escrito. Las nuevas funciones se valoran según su alcance; las licencias y los servicios externos se identifican en la propuesta.',
      },
      {
        question: '¿Cómo se acuerdan el código, los datos y los accesos?',
        answer:
          'Antes de empezar concretamos por escrito la entrega del código, las licencias, la titularidad, los accesos y la exportación de datos. También revisamos qué necesita conectarse con vuestras herramientas actuales.',
      },
    ],
    related: ['seguimiento-presupuestos', 'reservas-facturacion', 'fisioterapia'],
    evidence: {
      href: '/proyectos/',
      label: 'Ver proyectos',
      text: 'Catálogo de trabajos del equipo con su estado real. Muestra lo que se ha construido, no resultados comerciales ni la idoneidad de una opción concreta.',
    },
    sources: [],
    ctaLabel: 'Cuéntanos qué aplicación necesitas',
    alternatives: [
      {
        option: 'Configurar el software existente',
        fit: 'El proceso es estándar y las funciones nativas cubren la mayor parte. Suele ser la opción más rápida y con menos mantenimiento.',
        watch: 'Comprobar que las funciones necesarias existen en el plan contratado y que los datos se pueden exportar después.',
      },
      {
        option: 'Integrar herramientas',
        fit: 'Varias herramientas ya cubren las necesidades y disponen de interfaces documentadas para intercambiar datos.',
        watch: 'Cada integración añade coste y puntos de fallo. Hay que evaluar accesos, plan, seguridad y quién responde cuando algo se rompe.',
      },
      {
        option: 'Desarrollar una aplicación',
        fit: 'El proceso tiene particularidades o límites que las opciones existentes no cubren, y el coste de desarrollo y su mantenimiento son asumibles.',
        watch: 'Una aplicación a medida también exige mantenimiento, soporte y evolución. Antes de elegirla hay que definir quién se ocupa y con qué presupuesto.',
      },
    ],
    reviewedOn,
  },
];

solutionCatalog.push({
  slug: 'instalaciones-mantenimiento',
  group: 'Sectores',
  navTitle: 'Instalaciones y mantenimiento',
  title: 'Presupuestos y partes de trabajo para empresas de instalaciones',
  description: 'Conecta solicitudes, presupuestos, partes de trabajo y facturación en tu empresa de instalaciones o mantenimiento. Empezamos por un proceso concreto.',
  eyebrow: 'Instalaciones y mantenimiento · Madrid y trabajo en remoto',
  headline: 'Del presupuesto al trabajo terminado. Sin perder el hilo.',
  intro: 'Una solicitud en el correo, el presupuesto en una hoja y el parte en el móvil del técnico. Te ayudamos a conectar esos pasos para saber qué está pendiente, quién se encarga y qué falta para facturar.',
  audience: 'Empresas de instalaciones, reformas y mantenimiento con trabajo de oficina y técnicos en campo. Especialmente cuando la misma información se copia varias veces.',
  problem: {
    title: 'El trabajo está hecho. La información todavía no ha llegado.',
    text: 'Administración persigue el parte, el técnico busca el presupuesto y el cliente pregunta cuándo vuelve alguien. No falta otra pantalla: falta un recorrido compartido entre la solicitud, la visita y el cierre del trabajo.',
  },
  decisions: [
    { title: 'Partimos de tus programas', text: 'Primero comprobamos si vuestro programa ya permite gestionar avisos, partes y facturas. Configurarlo puede ser suficiente; conectar o desarrollar solo tiene sentido si queda una necesidad sin resolver.' },
    { title: 'Un primer flujo, no toda la empresa', text: 'Elegimos juntos el atasco inicial: seguimiento de presupuestos, recogida de partes o preparación de la facturación. La propuesta fija el alcance y cómo comprobar si mejora el trabajo.' },
    { title: 'IA solo cuando aporta', text: 'Puede ayudar a preparar un borrador desde documentos o notas. Estados, importes y autorizaciones necesitan reglas claras y revisión, no respuestas inventadas.' },
  ],
  workflow: [
    { title: 'Solicitud y presupuesto', text: 'La petición queda asociada a un cliente, un responsable y una próxima acción. El equipo revisa el presupuesto antes de enviarlo.' },
    { title: 'Visita y parte', text: 'El técnico consulta lo acordado y registra trabajo, materiales y pendientes. Oficina revisa la información antes de dar el trabajo por cerrado.' },
    { title: 'Revisión y facturación', text: 'Los datos acordados se preparan para el programa de facturación. Una persona comprueba importes y documentación antes de emitir la factura.' },
  ],
  example: {
    title: 'Una reparación, de la llamada al parte revisado',
    text: 'Ejemplo hipotético: una empresa de mantenimiento recibe un aviso, prepara el presupuesto y asigna la visita. Al terminar, el técnico completa el parte desde el móvil. Administración ve lo que falta, revisa los materiales y prepara la facturación. Es un flujo propuesto, no una implantación realizada por innure en este sector.',
  },
  requirements: [
    { title: 'Qué información necesita cada persona', text: 'Acordamos los campos mínimos del aviso, el presupuesto y el parte, quién puede verlos y quién valida cada cambio.' },
    { title: 'Qué permiten las herramientas', text: 'Revisamos plan, permisos e interfaces documentadas. No prometemos conectar cualquier programa ni reemplazar vuestro sistema de facturación.' },
    { title: 'Cómo mediremos la prueba', text: 'Antes de construir registramos el tiempo de la tarea, las veces que se copia un dato o los partes incompletos. Comparamos con la prueba; no prometemos un porcentaje de ahorro por adelantado.' },
  ],
  limits: 'La propuesta se valida con vuestro proceso. No incluye asesoramiento fiscal, emisión autónoma de facturas ni certificación de instalaciones. Las decisiones técnicas, los importes y la conformidad del trabajo siguen en manos de las personas responsables. Integraciones, costes de terceros y mantenimiento se acuerdan antes de empezar.',
  firstStep: 'Una primera conversación gratuita sobre una tarea y los programas que usáis. Si encaja, os proponemos un diagnóstico o una primera implantación acotada, con presupuesto. El diagnóstico detallado se presupuesta por separado.',
  questions: [
    '¿Dónde se pierde más tiempo: presupuestos, partes de trabajo o preparar las facturas?',
    '¿Qué programas utiliza oficina y cómo envían los técnicos la información?',
    '¿Cuántas veces se repite la tarea y quién podría comprobar el resultado de una prueba?',
  ],
  faqs: [
    { question: '¿Tenemos que cambiar nuestro programa de facturación?', answer: 'No es el punto de partida. Comprobamos qué resuelve ya y si admite una conexión documentada. Si no, puede ser más útil mejorar la recogida y revisión de datos antes de llegar a facturación.' },
    { question: '¿Habéis implantado este recorrido en otra instaladora?', answer: 'Esta página plantea una solución que estudiar, no un caso de cliente del sector. Puedes revisar nuestros proyectos propios para conocer cómo trabajamos y qué hemos desarrollado.' },
    { question: '¿Qué recibiríamos en el primer proyecto?', answer: 'Lo fija la propuesta: un flujo delimitado, las comprobaciones de aceptación, los accesos acordados y la documentación y formación necesarias para ese alcance. Se separan el coste inicial, las herramientas de terceros y el soporte posterior.' },
  ],
  related: ['seguimiento-presupuestos', 'reservas-facturacion', 'aplicaciones-a-medida'],
  evidence: {
    href: '/proyectos/gestor-certificados/',
    label: 'Conoce una herramienta propia de gestión',
    text: 'Gesticert reúne búsquedas, fichas y caducidades en una aplicación de Windows en validación privada. Permite ver nuestro trabajo de desarrollo; no demuestra una implantación en instalaciones ni compatibilidad con tu software.',
  },
  sources: [],
  ctaLabel: 'Revisar una tarea de mi empresa',
  alternatives: [],
  reviewedOn,
});

export const solutionSlugs = solutionCatalog.map((solution) => solution.slug);

export const getSolution = (slug) =>
  solutionCatalog.find((solution) => solution.slug === slug);
