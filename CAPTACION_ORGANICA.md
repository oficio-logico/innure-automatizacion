# Piloto de captación orgánica · innure

Preparado el 23 de septiembre de 2026. Objetivo: recibir consultas de pequeñas empresas de servicios sobre el seguimiento de presupuestos, con 0 EUR de gasto publicitario. Esta ficha contiene candidatos y mensajes para revisión; no acredita envíos, aceptación editorial, tráfico ni contactos.

## Destino y material

Guía propia preparada en `/guias/seguimiento-presupuestos/`, enlazada desde `/soluciones/seguimiento-presupuestos/`. La guía explica cinco comprobaciones antes de automatizar, ofrece un ejemplo hipotético y termina en el formulario existente. Su URL pública solo se podrá usar después de publicar y verificar la ruta. La página de solución actual sirve de destino mientras tanto: https://www.innure.es/soluciones/seguimiento-presupuestos/.

Comprador propuesto: gerente o responsable comercial de una pequeña empresa de servicios que envía presupuestos y no tiene claro el siguiente paso de cada uno. Hipótesis por validar con conversaciones reales. Oferta: primera conversación para entender el proceso y sus herramientas; no se promete un resultado de ventas ni una auditoría completa gratis.

## Tres canales editoriales para comprobar, en este orden

1. **Pymes y Autónomos.** Su página de contacto ofrece «Contactar con los editores» y «Enviar una noticia a los editores». También declara una newsletter semanal. Es el canal más directo para proponer una guía útil para responsables de negocios. Contacto público: [formulario editorial](https://www.pymesyautonomos.com/contacto). Falta verificar si aceptan este formato, enlaces comerciales y publicación gratuita.
2. **CEIM.** Su [página de actualidad](https://ceim.es/actualidad/) describe una newsletter dirigida a empresarios de Madrid y ofrece contacto del departamento de comunicación: `comunicacion@ceim.es`. Encaja por ámbito geográfico y público empresarial. Falta verificar si acepta contribuciones de empresas ajenas a sus asociados, el formato editorial y cualquier coste.
3. **Emprendedores.** Publica [contactos de coordinación de contenidos](https://emprendedores.es/contacto/) para su revista; el buzón general es `info@emprendedores.es`. El encaje es una guía práctica para pequeñas empresas. No consta una convocatoria abierta de artículos gratuitos ni garantía de enlace; consultar condiciones antes de entregar contenido.

La identidad, el canal y la dirección anteriores proceden de páginas de cada entidad consultadas el 23/09/2026. El tamaño de audiencia, la proporción de compradores, las condiciones de colaboración y el coste no están verificados. No se han usado contactos privados.

## Mensajes preparados, sin enviar

### Pymes y Autónomos · formulario «Contactar con los editores»

**Asunto:** Guía práctica para ordenar presupuestos pendientes en una pyme

Hola, equipo editorial:

En innure hemos preparado una guía breve para pequeñas empresas de servicios sobre un problema cotidiano: presupuestos enviados que quedan sin responsable ni próxima acción. Propone cinco comprobaciones antes de añadir automatizaciones, con un ejemplo claramente hipotético y sin prometer ventas.

Creemos que puede encajar en vuestra sección de consejos prácticos. Podemos facilitar una adaptación editorial original, sin tono promocional, si aceptáis colaboraciones de este tipo. ¿Os interesa que enviemos el texto para valorarlo? También agradeceríamos conocer vuestras condiciones sobre enlaces y posibles costes.

Gracias,
innure

### CEIM · departamento de comunicación

**Asunto:** Propuesta de guía útil para empresas de Madrid

Hola, equipo de comunicación:

Somos innure, una empresa de Leganés. Hemos preparado una guía práctica para que las pequeñas empresas de servicios revisen cómo hacen seguimiento de sus presupuestos: un lugar donde consultar el estado, una persona responsable y una próxima acción. Incluye criterios para aprovechar primero las herramientas que ya utilizan.

Vemos que vuestra newsletter informa a empresarios de Madrid. ¿Valoráis aportaciones editoriales externas que puedan ser útiles para ese público? Si encaja, os enviaríamos una versión adaptada para revisión. Antes nos gustaría saber el formato, las condiciones de participación y si supone algún coste.

Gracias,
innure

### Emprendedores · coordinación de contenidos

**Asunto:** Propuesta editorial: cinco comprobaciones antes de automatizar presupuestos

Hola, equipo de contenidos:

En innure hemos redactado una guía para responsables de pequeñas empresas de servicios que envían presupuestos y pierden la pista de cuándo retomarlos. Explica qué registrar, cómo asignar la siguiente acción y cuándo basta con configurar el CRM actual. El ejemplo es hipotético; no atribuimos resultados a clientes.

¿Revisáis propuestas de contenido práctico de empresas externas? Si esta idea os resulta pertinente, podemos enviar una adaptación original para vuestra línea editorial. Nos gustaría conocer las condiciones de publicación, enlaces y costes antes de prepararla.

Gracias,
innure

## Comprobaciones antes de distribuir

- Verificar que la guía responde 200, tiene canónica, figura en sitemap y que el CTA llega al formulario correcto tras la publicación autorizada.
- Verificar la recepción real del formulario con una prueba identificada como técnica y en un buzón autorizado. Una respuesta SMTP aceptada o una prueba local no prueba llegada a la bandeja de entrada. No se ha realizado ese envío.
- Confirmar destinatario, texto, canal y ausencia de coste antes de enviar cada propuesta. No crear una secuencia automática ni publicar en el sitio del colaborador sin aceptación.
- Medir durante 14 días desde la primera distribución comprobada: envíos, respuestas, publicación efectiva, consultas, consultas cualificadas, conversaciones y propuestas. Registrar datos personales solo en un soporte privado autorizado. Si no hay exposición comprobada, no atribuir la ausencia de consultas al mensaje.

La campaña de Google Ads sigue fuera de este piloto: en pausa, con 100 EUR totales configurados. No se cambia presupuesto, facturación ni calendario.

## Continuidad del encargo

La guía se creó como ruta estática con metadatos propios, canónica, Open Graph, sitemap, enlace desde la solución existente y formulario con contexto de página. Se reutilizaron componentes y estilos del proyecto. Lint, TypeScript, 66 pruebas JavaScript y compilación comercial pasaron en esta rama basada en `main`; la compilación generó la guía y comprobó su HTML. La revisión visible a 1280 px y 390 px confirmó jerarquía, CTA y formulario, sin desbordamiento horizontal en móvil. La validación PHP local no pudo ejecutarse porque `php` no estaba instalado; debe pasar en CI.

Pendientes: validación de CI, publicación solo tras integrar el cambio autorizado, comprobación HTTP pública y entrega real del correo, y aceptación de cualquier propuesta editorial. La documentación de continuidad existente en otro checkout se conservó sin incorporarla al commit porque estaba sin seguimiento Git al iniciar el encargo. Esta sección deja el traspaso versionado con los archivos del piloto.
