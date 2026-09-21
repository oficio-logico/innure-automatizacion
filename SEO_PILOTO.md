# Piloto de soluciones de innure

Preparado el 21 de septiembre de 2026. Siete páginas específicas y un índice en `/soluciones/` (8 páginas en total), enlazados desde la portada. La publicación requiere la aprobación del propietario. Esta implementación no ha publicado páginas, enviado formularios reales, conectado proveedores ni activado analítica o anuncios.

## Selección y arquitectura

Las oportunidades se seleccionan por encaje con los servicios, intención comercial observada, información concreta que podemos aportar y mantenimiento asumible. Son hipótesis de captación: la presencia de proveedores en una búsqueda no acredita volumen, dificultad ni ingresos. No se han utilizado estimaciones de esas métricas.

| Página | Público, problema e intención principal | Diferencia útil y consultas agrupadas | CTA y relación interna |
| --- | --- | --- | --- |
| `/soluciones/fisioterapia/` | Dirección y recepción; cambios de citas entre profesionales. Contratar ayuda para automatizar la gestión administrativa de una clínica. | Agenda como referencia, permisos, cancelación de avisos pendientes y excepciones. Agrupa gestión de citas, cambios y lista de espera. No vende un software clínico propio. | Hablar de la gestión de tu clínica. Enlaza WhatsApp, facturación, decisión tecnológica y SIENTA como producto propio de otro sector. |
| `/soluciones/centros-estetica/` | Dirección y recepción; cabinas, profesionales, bonos y caja descoordinados. Mejorar o integrar la gestión del centro. | Ocupación conjunta, política de consumo/cancelación del bono, producto vendido frente a uso interno y conciliación. Agrupa bonos, cabinas y sesiones; no crea una página para cada sinónimo. | Revisar la gestión de tu centro. Enlaza fisioterapia, facturación, decisión tecnológica y SIENTA con su alcance real. |
| `/soluciones/gestorias/` | Gestorías y asesorías; documentos pendientes por cliente y periodo, expedientes sin responsable y caducidades separadas. Ordenar la recepción y el siguiente paso con revisión humana. | Revisión de funciones nativas, expediente con responsable y próxima tarea, y proceso separado para certificados y caducidades. Agrupa gestión documental de gestorías y asesorías; no promete API ni compatibilidad universal con a3 o Sage. | Revisar la gestión de tu gestoría. Enlaza seguimiento de presupuestos, decisión tecnológica y reservas/facturación; muestra Gestor de Certificados con sus límites exactos. |
| `/soluciones/reservas-whatsapp/` | Empresas con citas; confirmaciones y recordatorios desconectados de la agenda. Contratar una integración. | Botón manual frente a Business Platform, permiso del destinatario, plantillas, cambios de cita, fallos y atención humana. Agrupa confirmaciones y recordatorios; no se posiciona como herramienta gratuita ni bot ya disponible. | Hablar de tus avisos por WhatsApp. Enlaza los dos sectores, facturación y una muestra de automatización del equipo. |
| `/soluciones/reservas-facturacion/` | Administración; duplicados y estados de reserva, asistencia, pago y documento mezclados. Conectar agenda y facturación. | Identificadores estables, avisos repetidos, anticipos, cancelación y reglas revisadas con gestoría. Se agrupan reserva, cobro y factura como un mismo proceso. | Revisar reservas y facturación. Enlaza estética, WhatsApp, decisión tecnológica y gestor de certificados como herramienta administrativa distinta. |
| `/soluciones/seguimiento-presupuestos/` | Equipos comerciales; propuestas sin responsable ni siguiente acción. Configurar o automatizar seguimiento comercial. | Oportunidad y versión de propuesta, tareas, revisión de borradores y parada por respuesta. Amplía el ejemplo breve de la portada con requisitos y límites. | Revisar el seguimiento comercial. Enlaza decisión tecnológica, facturación y una muestra de automatización propia. |
| `/soluciones/aplicaciones-a-medida/` | Dirección y operaciones; decidir qué contratar. Comparar desarrollo propio, configuración e integración. | Tabla de las tres opciones, coste durante el uso, prueba de un proceso, mantenimiento y salida. Agrupa aplicación/software a medida frente a adaptar herramientas. | Hablar de tu decisión técnica. Enlaza seguimiento, facturación, fisioterapia y el portfolio completo. |

`/soluciones/` permite elegir por necesidad; no añade una octava intención comercial artificial. La portada conserva la oferta general y su ejemplo de seguimiento; el portfolio conserva el papel de mostrar trabajo real. Las nuevas páginas explican servicios posibles, no convierten los proyectos propios en casos sectoriales ni en resultados de clientes.

Se descartan en este piloto variantes por ciudad, páginas de cada pareja de marcas, un catálogo genérico de «IA para empresas» y una página por cada combinación sector × proceso. No se dispone de evidencia suficiente para justificar su contenido y mantenimiento. Tampoco se crea una página adicional de reservas genéricas que competiría con las dos integraciones elegidas.

## Investigación pública y alcance de la evidencia

Consultas exploradas: «automatización clínica fisioterapia reservas whatsapp facturación», «automatización centro estética gestión citas bonos stock», «integrar reservas whatsapp facturación empresas», «software a medida estándar empresas España», «integración reservas Holded» y «automatizar seguimiento presupuestos empresa CRM». La ampliación de gestorías se contrastó con búsquedas de automatización documental en los sitios de a3 y Sage y con el proyecto propio Gestor de Certificados; su demanda concreta sigue pendiente de validar. La consulta `site:innure.es` no devolvió resultados en el buscador utilizado; no permite concluir que el sitio no esté indexado. El informe privado de esta entrega recoge la comprobación directa de Search Console.

Resultados comerciales relevantes en webs de proveedores:

- [Serenna](https://www.serenna.es/) reúne agenda, cobros y WhatsApp para fisioterapia. Respalda que existen alternativas sectoriales que deben evaluarse antes de construir. Sus cifras comerciales no se adoptan como evidencia propia.
- [byclinics para estética](https://byclinics.com/es/especialidades/software-centros-estetica/) ofrece agenda por cabinas, bonos y TPV. Justifica tratar los problemas operativos de estética de forma distinta a fisioterapia. No demuestra que su API esté abierta ni que innure se integre con ella.
- [Ceroone: Icnea y Holded](https://ceroone.com/2026/04/06/integracion-icnea-holded/) y [Iridian: integraciones de Holded](https://iridianweb.com/es/integraciones-erp-crm/holded/) aparecieron para reservas y facturación. Señal de oferta comercial de integración, sin inferir demanda cuantificada ni compatibilidad de todas las agendas.
- [Clientify: presupuestos](https://clientify.com/crm/presupuestos) y [MosLab: seguimiento comercial](https://moslab.org/automatizaciones/seguimiento-comercial/) muestran soluciones de producto y servicios para ese problema. Nuestra página empieza por las capacidades del CRM existente y explica cuándo se detiene un seguimiento.
- [Wolters Kluwer: a3asesor](https://www.wolterskluwer.com/es-es/solutions/a3asesor) describe automatización de entrada de datos y gestión fiscal y contable; [Sage: asesorías y despachos](https://www.sage.com/es-es/asesorias-y-despachos/) presenta gestión del despacho y un portal para compartir documentos y estados. Son capacidades públicas de los productos, no prueba de acceso API ni de compatibilidad con innure.
- [doscientos](https://doscientos.es/) y [Stockea](https://stockea.es/software-a-medida/) aparecieron en búsquedas de software a medida. La oportunidad propuesta es ayudar a elegir entre configurar, integrar y desarrollar, sin afirmar que lo último siempre compense.

No es un ranking exhaustivo ni una comparación de tráfico. El interés de contratación se infiere del tipo de resultados; su validación vendrá de consultas y contactos reales.

## Viabilidad descrita

Se ha verificado documentación pública, no una implantación con cuentas de clientes:

- [WhatsApp Business Messaging Policy](https://whatsappbusiness.com/policy/): permiso del destinatario, respeto a bajas, plantillas para iniciar conversaciones y fuera de las 24 horas desde el último mensaje del usuario, y acceso a atención humana. Cuenta, número, permisos, proveedor y costes deben comprobarse antes de implementar.
- [Calendly: reprogramaciones](https://developer.calendly.com/docs/api-guides/see-how-webhook-payloads-change-when-invitees-reschedule-events): una reprogramación emite creación y cancelación. Es un motivo concreto para evitar automatismos duplicados; esos eventos no prueban asistencia ni cobro.
- [Google Calendar: sincronización](https://developers.google.com/workspace/calendar/api/guides/sync): permite obtener cambios; un token invalidado requiere resincronización. Es una capacidad de calendario, no evidencia de acceso a un software clínico.
- [Holded: documentación](https://www.holded.com/es/desarrolladores): operaciones de facturas, aprobación y pagos. No se promete funcionamiento en todas las cuentas ni criterio fiscal automático.
- [HubSpot: creación de tareas](https://developers.hubspot.com/docs/api-reference/legacy/crm/activities/tasks/create-task): tareas y asociaciones por API. Autenticación, permisos, versión de API y capacidades del plan se revisan por proyecto.
- [Ficha del Gestor de Certificados](app/project-catalog.ts): aplicación propia de Windows en validación privada para búsquedas, fichas, procedimientos y caducidades. No es un caso de cliente, no demuestra compatibilidad universal y no custodia claves en la nube.

## Calidad editorial y técnica

El catálogo `app/solution-catalog.mjs` separa contenido de la plantilla `app/solution-views.tsx`. Las rutas son estáticas y explícitas, como las fichas existentes, para reutilizar el exportador actual. Añadir una página exige contenido diferenciado, revisión de fuentes, una ruta, enlaces y comprobaciones; no basta con añadir un nombre de sector.

Se conservan tipografía, paleta, botones, formulario, pie y capacidades existentes. Se añaden encabezado adaptable, breadcrumbs, pasos, tabla cuando ayuda a decidir, preguntas específicas y referencias. Todas las páginas usan metadatos propios y una imagen social existente con URL absoluta. Las canónicas apuntan a cada ruta; el registro compartido genera sitemap y comprobaciones. Las previews conservan `noindex`; solo la compilación comercial produce el paquete indexable. Ninguna compilación publica por sí sola.

La orientación se contrasta con [contenido generado con IA](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content), [políticas de spam](https://developers.google.com/search/docs/essentials/spam-policies) y [guía de optimización para funciones de IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) de Google: el valor lo aporta resolver una necesidad con contenido específico y revisado. Se evitan páginas puerta, versiones casi iguales y generación masiva. No se promete rastreo, indexación ni posicionamiento. `llms.txt` y marcado especial para IA no se añaden como requisito.

## Medición propuesta

No se incorporan herramientas nuevas, cookies, costes ni cambios de consentimiento. El formulario existente mantiene el receptor y añade al mensaje la **página de consulta**, visible para el visitante. Viaja en el campo `process`, con su límite de longitud; no va a eventos publicitarios, URL, cookies o almacenamiento. Identifica dónde se envió el contacto, no la primera página visitada ni el origen orgánico. Si alguien navega hasta el formulario de portada o usa correo directo, esa atribución puede faltar.

Después de aprobar y publicar:

1. Registrar fecha, versión publicada y siete URL (más el índice `/soluciones/`). Verificar el sitemap servido, inspección de URLs y exclusión de preview. El sitemap principal ya está dado de alta en Search Console; revisar su lectura sin crear otra propiedad ni cambiar permisos.
2. En Search Console, filtrar host `www.innure.es` y páginas `/soluciones/`, tipo Web; separar consultas de marca y no marca, dispositivo y país. Medir impresiones, clics, CTR y consultas con intención relevante. No mezclar el subdominio de certificados ni la especialidad de rendimiento. Las consultas ocultas y el retraso del informe impiden un desglose exhaustivo.
3. Registrar en un soporte privado ya disponible, fuera de este repositorio, referencia del mensaje, fecha, página de consulta, procedencia declarada, necesidad, herramientas, cualificación y siguiente paso. Un contacto cualificado representa una empresa con un problema de nuestro alcance, interlocutor válido y disposición a concretarlo. Una oportunidad añade un siguiente paso comercial acordado. Un formulario aceptado no es automáticamente un contacto cualificado ni una entrega confirmada en buzón.
4. Revisar a las 2 semanas el descubrimiento y los errores; a los 30 días consultas y claridad del mensaje; a los 60–90 días la relación entre páginas, contactos y oportunidades. Son ventanas de revisión, no plazos prometidos de resultados. Con pocas impresiones, prolongar la observación y conservar valores absolutos.
5. **Ampliar** si aparecen consultas no cubiertas y señales repetidas de necesidad comercial, o varias conversaciones independientes que justifican contenido nuevo con una solución viable. **Mejorar** si hay consultas pertinentes sin clics (revisar título e intención) o clics sin contactos (revisar propuesta, confianza y contacto). **Consolidar** si dos páginas comparten las mismas consultas e información y no sirven a decisiones distintas; conservar la URL más útil y preparar redirección aprobada. No fusionar por una sola consulta compartida ni por oscilaciones de una muestra mínima.

Search Console mide exposición y clics de búsqueda, no todas las visitas ni una tasa de conversión atribuida. Una analítica de sesiones o un enlace entre navegación y contacto sería un cambio adicional: revisar acceso, necesidad, consentimiento y coste antes de incorporarlo. Los registros del hosting tampoco equivalen automáticamente a visitantes humanos.

## Mejora opcional: calculadora

Una calculadora de carga administrativa puede pedir tareas/mes, minutos actuales y esperados, coste/hora y coste de herramientas. Fórmula visible: horas potenciales = tareas × diferencia de minutos / 60; valor orientativo = horas × coste/hora − costes recurrentes. Mostrar escenarios y coste inicial aparte, sin equiparar tiempo liberado con dinero efectivamente ahorrado.

Utilidad: preparar la conversación con supuestos explícitos. Esfuerzo estimado de implementación y revisión: bajo a medio para una versión local sin registro ni envío; requiere definir supuestos, accesibilidad, validación de entradas y mantenimiento. No hay presupuesto aprobado ni se ha implementado; no bloquea el piloto.

## Mantenimiento y comprobación

Revisar trimestralmente y cuando cambie un proveedor: documentación, permisos, condiciones, enlaces, solapamiento y conversaciones recibidas. Cada página tiene fecha de revisión. No mantener cifras de precios de terceros que no aportan valor al piloto.

Comprobaciones del proyecto: lint, TypeScript, `node --test scripts/*.test.mjs`, sintaxis y pruebas PHP aisladas, compilaciones de producción y preview, metadatos estáticos y revisión visual en escritorio/móvil. Los resultados concretos y evidencias quedan en el informe local de entrega. No sustituir pruebas de componentes por una afirmación de recepción real del formulario.
