# Continuidad · IA empresas innure

## 2026-09-25 · Receptor de formulario omitido en la publicación

- Hallazgo: la PR #20 se fusionó en `main` (`1d9db3954583cf3d1b77bdad4ddafdde930fe057`) y el run público `36110821391` terminó correctamente, pero la consulta técnica recibida a las 10:11 aún mostró «Origen: /automatizacion/» fijo y no incluyó inversión ni plazo. El artefacto de ese run sí contenía `automatizacion/contacto.php` actualizado, con el mismo SHA-256 que `server/contacto.php`; el registro de FTP no muestra su subida. La exclusión `contacto.php` del workflow abarcaba también la ruta anidada. `release.json` acredita la versión del paquete, no la del receptor PHP.
- Corrección local en `codex/correccion-publicacion-formulario`: retirar esa exclusión por nombre. `checkHomePackage` exige el receptor anidado y rechaza `contacto.php` en raíz, además de las rutas y configuraciones privadas. El verificador público añade un POST inválido con una opción fuera de lista; la respuesta esperada ocurre antes de Turnstile, límite de frecuencia y SMTP, y distingue el receptor nuevo del anterior sin crear un correo.
- Estado: pendiente de integrar y desplegar la rama; no se ha enviado ningún POST adicional ni editado el servidor. Tras el despliegue, revisar en el log FTP la subida explícita de `automatizacion/contacto.php` y la nueva comprobación pública. No dar el receptor por publicado por el resultado del build.
- Comprobaciones locales: lint, TypeScript, 74 pruebas Node, sintaxis del verificador, lectura YAML de las exclusiones y `git diff --check` correctos. El run anterior pasó `php -l` y 56 comprobaciones aisladas del receptor que ya estaba en el artefacto; PHP no está instalado localmente y la prueba PHP ampliada se ejecutará en CI al abrir la PR. No se ha ejecutado el verificador público modificado ni ningún POST en esta corrección.

## 2026-09-25 · Preparación del paquete web de captación

- Objetivo: aclarar el primer contacto, mostrar cómo se presupuestaría el mantenimiento y preparar la medición agregada de la web general.
- Cambios en rama de revisión: beacon público de Cloudflare Web Analytics solo en compilación de producción; texto de automatización y de portada; inversión y plazo opcionales en el formulario compartido; correo con página de consulta validada y sin parámetros. La conversión de Google Ads sigue ligada al consentimiento y al identificador de aceptación SMTP; los campos nuevos no entran en su evento.
- El receptor conserva envíos de versiones anteriores sin campos nuevos. No guarda contenidos del formulario en archivos ni añade registros. Los valores se validan antes de preparar el correo.
- Comprobaciones: `npm ci`, lint, TypeScript, 73 pruebas Node, `git diff --check` y compilaciones de preview y producción correctos. El HTML exportado de preview no incluye beacon ni conversión; el de producción incluye un único beacon y la conversión autorizada por página. Revisión visual local de portada y página de automatización en escritorio. PHP no está disponible en este equipo; quedan pendientes `php -l server/contacto.php` y `php scripts/contact.test.php`, además de la revisión móvil y la recepción real. No se han enviado formularios reales, integrado la rama ni publicado el sitio.
- Siguiente paso: revisión del diff, de las compilaciones y de la vista local; el principal coordinará cualquier integración y publicación autorizada.

## 2026-09-24 · Logotipo negro en el pie

- Objetivo: mostrar en negro el logotipo del pie de la portada, manteniendo el de la cabecera y los archivos originales sin cambios.
- Cambio: filtro negro limitado a `.footer-main .brand-logo` sobre el fondo blanco existente.
- Comprobaciones locales: logo negro legible en escritorio y móvil, cabecera blanca intacta; lint, TypeScript, 72 pruebas Node y compilación estática correctos. Pendiente de verificar la publicación en la web pública; no se tocan otros contenidos, formularios ni publicidad.

## 2026-09-24 · Carga de logos en la banda móvil

- Problema: algunos logos aparecían tarde o dejaban huecos blancos mientras la banda seguía moviéndose, especialmente cuando el navegador integrado no tenía el ratón encima.
- Evidencia en producción antes del cambio: los 41 `img` únicos de la primera vuelta tenían `loading="lazy"`; siete seguían sin estar cargados aunque la página estaba visible y la animación continuaba. Los archivos de la franja suman alrededor de 184 KB en el repositorio.
- Cambio: las imágenes de la banda se cargan desde el principio (`loading="eager"`) y se deja al navegador decidir la decodificación. La misma URL repetida en la segunda vuelta reutiliza el recurso. No se alteran otros elementos ni la velocidad del movimiento.
- Comprobaciones locales: lint, TypeScript, 72 pruebas Node y compilación estática de portada correctos. En la vista local, 41/41 imágenes únicas figuran como carga inmediata y ninguna quedaba incompleta tras abrir la página. Pendiente de integrar y comprobar el mismo dato en producción; no se ha enviado ningún formulario.

## 2026-09-24 · Mensaje de portada y banda de experiencia

- Objetivo: explicar antes el valor de automatización, IA y desarrollo a medida y mostrar las marcas del equipo en una única banda continua.
- Cambios: portada con titular y entradilla más concretos; grupos de logos mezclados en una banda lenta con pausa manual y presentación estática cuando se prefiere movimiento reducido. Retirados elrow y Love the Twenties; añadidos SHARK, Bresh, La Riviera, Oh My Club, Reggaeton Beach Festival, WAH, Copérnico y Autocine Madrid. Se usan marcas verificadas en origen para cinco entradas y el nombre tipográfico para las otras tres, sin inventar un logotipo.
- Comprobaciones: lint, TypeScript, 71 pruebas Node y compilación estática `INNURE_TARGET=home INNURE_MEASUREMENT_ENV=preview` correctos; revisión visual local en escritorio y móvil, incluida la pausa. No se ha enviado el formulario ni activado publicidad.
- Límite: esta rama se entrega para revisión; integrarla en `main` publicaría tanto la portada comercial como GitHub Pages. Propuesta aparte, aún no implementada: caso ilustrativo de seguimiento de solicitudes y presupuestos para empresas de instalaciones.
- Siguiente paso: revisar la banda y el titular, decidir si sustituir los tres nombres tipográficos por archivos de marca facilitados por sus titulares y autorizar la integración/publicación si convencen.

## 2026-09-24 · Retirada del logotipo de Agencia Tributaria

- Objetivo: retirar de la web de automatización el logotipo independiente de Agencia Tributaria.
- Cambio: eliminada su entrada de la franja de experiencia y el archivo de imagen correspondiente. Las capturas del Gestor de Certificados, que muestran la interfaz real del producto, permanecen intactas.
- Comprobaciones locales: `npm run lint`, `npx tsc --noEmit`, `node --test scripts/*.test.mjs` (70 pruebas) y `INNURE_TARGET=home INNURE_MEASUREMENT_ENV=preview npm run build:innure`, correctos. El HTML exportado ya no menciona la marca ni el archivo; la franja se revisó visualmente en escritorio sin hueco.
- Límites: no se han modificado el formulario, PHP, las campañas ni otros proyectos. Falta comprobar el despliegue público tras integrar la rama.
- Siguiente paso: integrar en `main`, verificar el workflow de publicación y confirmar en `www.innure.es` que desapareció la entrada.

Actualizada: 2026-09-22. Alcance: traspaso documental a otra herramienta, sin cambios
funcionales ni revalidación de producción. Las comprobaciones históricas que se
mencionan son las registradas en las fuentes, no pruebas repetidas en este encargo.

**Propósito:** Web general y oferta de innure: tecnología, aplicaciones, integraciones, automatización, IA y captación.

**Herramientas:** React/TypeScript, exportación estática y receptor PHP; Pruebas Node/PHP; publicación mediante GitHub Actions.

**Estado documentado**

- El README local describe la portada general y portfolio en www.innure.es y la separación de la web de rendimiento.
- El piloto SEO de soluciones está documentado y sujeto a aprobación de publicación; no se comprueba producción en esta tarea.

**Decisiones y límites**

- Escribir innure en minúsculas.
- Separar este publicador del de rendimiento; no tocar configuración privada de correo ni activar anuncios por publicar código.
- main activa publicación de producción y vista de revisión. La rama de continuidad no se integra automáticamente.
- No versionar contactos ni datos de potenciales clientes; no presentar proyectos como casos de éxito sin evidencia.

**Siguiente paso propuesto, pendiente de encargo**

- Revisar el estado real del piloto SEO y su aprobación antes de publicar; al retomar captación, partir del flujo y de fricciones medidas.

**Fuentes locales consultables**

- `README.md`
- `SEO_PILOTO.md`
- `PORTFOLIO.md`
- `AGENTS.md`

**Comprobaciones para futuros cambios**

- npm run lint
- npx tsc --noEmit
- node --test scripts/*.test.mjs
- php -l server/contacto.php
- php scripts/contact.test.php

**No verificado / no incluido**

- La revisión es documental y de Git; no acredita recepción de correo, métricas comerciales, campañas activas ni publicación del piloto.

## Git y traspaso

Foto inicial del checkout examinado: rama `codex/sem-ia-automatizacion`, commit `78d7981877c9`, seguimiento
`origin/codex/sem-ia-automatizacion`. No asumir que esta referencia sigue siendo HEAD después de trabajar.
Antes de retomar, comprobar `git status --short --branch`, `git log -1` y el remoto.

La documentación de este traspaso se guarda en `codex/continuidad-claude-20260922` cuando existe historial
Git; en repositorios sin historial se crea únicamente el primer commit documental.
La rama original y sus cambios pendientes se conservan. En proyectos sin remoto no
hay sincronización externa. Un commit no demuestra push; comprobar la rama remota.
La ficha no autoriza fusionar ramas, desplegar ni subir cambios previos.

## Cierre de la próxima tarea

Actualizar esta ficha con el encargo realmente autorizado, las decisiones nuevas,
los archivos cambiados, pruebas ejecutadas y su resultado, límites y siguiente paso.
Registrar en la entrega rama, hash y estado de push. No incrustar en este documento
el hash del commit que lo contiene: comprobarlo con Git para evitar referencias
circulares. No copiar secretos, historiales completos ni documentación privada.

## Sesión 2026-09-23 · revisión web y robots (Claude)

**Estado real comprobado:** el piloto SEO (#8), el SEM (#9) y #10–#11 ya están en `main`
y publicados (21–22-09). Solo queda en borrador el PR #12 (guía de presupuestos y
captación orgánica), pendiente de aprobación. El checkout local de este repo sigue en
`codex/sem-ia-automatizacion` (ya integrada, por detrás de `main`) con cambios sin
commitear: no trabajar ahí sin revisarlos.

**Cambio en la rama `codex/robots-portada-20260923` (desde `origin/main`):**
- `scripts/prepare-github-pages.mjs`: el `robots.txt` de producción excluye
  `/contacto.php` y `/automatizacion/contacto.php`. El publicado hoy es el antiguo de
  rendimiento (cita `config.php`); al cambiar el contenido, el publicador lo vuelve a subir.
  `app/robots.ts` no interviene en la exportación estática.
- `scripts/verify-innure-live.mjs`: la verificación posterior a publicar exige esas
  reglas y rechaza cualquier mención a `config`.

**Comprobado en local:** lint, `tsc --noEmit`, 66/66 pruebas Node y
`INNURE_TARGET=home npm run build:innure` con el robots esperado. PHP no está instalado
en este Mac (no se ha tocado PHP). **No verificado:** que el publicador sustituya el
fichero; se comprueba con curl tras integrar en `main`, que publica y requiere
confirmación.

**Pendiente de decisión:** consentimiento único, páginas legales únicas, JSON-LD de
organización, franja de logos del equipo y casos al final de la portada.

## Sesión 2026-09-23 (2) · confianza, legales y consentimiento únicos (Claude)

**Encargo autorizado:** «como tú consideres mejor» sobre la revisión: logos del equipo
(descarga autorizada de los de Santiago), datos estructurados, imagen social,
consentimiento y legales únicos para todo innure.es y cabeceras seguras. Sin publicar.

**Rama `codex/portada-revision-20260923`** (incluye el commit de robots):
- Franja «Nuestro equipo ha trabajado en proyectos para» tras la cabecera, en dos
  grupos: ingeniería y rendimiento (Sergio, 25) y marketing de influencers (Santiago,
  14). Logos en `public/images/experiencia/` (WebP recortado a 240×80, ~180 KB en
  total, carga diferida). Dreambeach, Jowke y Quinto Elemento van como texto: no
  publican un logo aprovechable en su web. Los de Santiago salen de sus webs oficiales.
- JSON-LD `Organization` + `Person` (cofundadores con LinkedIn) en la portada.
- Imagen social JPG 1200×630 (`innure-social.jpg`).
- Consentimiento común `innure_consent_v1` con /rendimiento/: hereda solo rechazos de las
  claves antiguas, borra al rechazar `innure_auto_gcl_*` y `_gcl_*` y avisa en el banner
  de que la elección vale para todo el dominio.
- `/privacidad/` y `/aviso-legal/` pasan a ser las únicas: incorporan lo propio de
  rendimiento (datos técnicos del envío, Web Analytics, señales auxiliares, borrador del
  formulario, logos de terceros). `.htaccess` redirige las `.html` antiguas y añade
  nosniff, Referrer-Policy y X-Frame-Options si existe mod_headers.
- Certificación ISTQB Performance Testing indicada «en trámite».

**Comprobado en local:** lint, tsc, 69/69 pruebas y compilación normal y con la
configuración de medición de producción; revisión visual a 1440 y 375 px.
**No verificado:** redirecciones y cabeceras en el alojamiento real (se comprueban tras
publicar; `verify-innure-live.mjs` exige las redirecciones y avisa si falta nosniff).

**Publicación:** integrar junto con la rama de rendimiento
`codex/rendimiento-revision-20260923`; si solo se publica esta, /rendimiento/ volvería a
pedir la elección una vez porque aún usa su clave antigua.

## 2026-09-25 · Página de anuncios y selección de soluciones

**Objetivo:** hacer más directa la página de automatización de procesos administrativos y sustituir el listado de diez enlaces de la portada por entradas que partan de problemas reconocibles. No se ha modificado Google Ads ni el formulario.

**Decisión de contenido:** la página de automatización presenta la tarea repetitiva y el contacto desde el inicio; junto al titular se muestra una captura real del Gestor de Certificados, identificada como producto propio en validación privada. El flujo de solicitudes por correo se rotula como ejemplo ilustrativo, no como proyecto implantado. La automatización musical continúa en el portfolio, pero ya no sirve como prueba principal de esta página. Se conservan las cautelas esenciales sobre permisos, datos, revisión humana y ausencia de ahorro garantizado.

**Decisión visual:** mantener la tipografía, blanco, azul petróleo y cian de innure. La portada ofrece tres tarjetas por necesidad (administración, reservas y herramienta a medida) con miniflows legibles; el índice de diez páginas sigue accesible desde «Explorar todas las soluciones». La página específica combina una captura propia visible en la cabecera, un ejemplo en fondo oscuro y un proceso de tres pasos.

**Cambios:** `app/page.tsx`, `app/solution-views.tsx`, `app/solution-catalog.mjs` y `app/solutions.css`. Comprobados enlaces, encabezados y contenido renderizado en vista local de escritorio y móvil. No se ha enviado ningún formulario real.

**Comprobaciones:** lint, TypeScript, 72 pruebas Node, `git diff --check` y compilación estática en modo preview correctos tras los cambios. `php` no está instalado en este entorno; no se han modificado archivos PHP. La vista local utiliza un borrador de correo como fallback; el receptor PHP de producción no se ha probado en esta tarea.

**Límite y siguiente paso:** la rama se prepara para revisión. No integrar en `main` ni publicar hasta autorización específica; el push de la rama y una PR no despliegan. Si se usa como destino de Google Ads, confirmar primero la URL final en la campaña sin cambiar anuncios ni gasto por iniciativa propia.

## 2026-09-25 · Landing de aplicaciones a medida

**Encargo autorizado:** aplicar y publicar la propuesta aprobada para `/soluciones/aplicaciones-a-medida/`. Las campañas nuevas siguen en borrador; este trabajo no modifica Google Ads, presupuestos ni facturación.

**Punto de partida y decisión:** la página publicada abría con una duda entre configurar y desarrollar y mostraba la comparación antes del trabajo del equipo. Ahora presenta la oferta de aplicaciones para empresas, una llamada directa al contacto y la captura de Gestor de Certificados. FORJA muestra un segundo desarrollo propio con IA. Ambos conservan el estado del catálogo; los ejemplos de uso no se atribuyen a clientes. La comparación queda al final en un desplegable. No se promete una mejora de conversión medida.

**Contenido y diseño:** identidad existente, jerarquía de lectura más directa, imágenes existentes sin dependencias nuevas. Se explican primera versión, entregas por etapas, revisión técnica, pruebas y mantenimiento mensual separado. Primera conversación gratuita y respuesta como máximo el siguiente día laborable, según disponibilidad confirmada por el equipo. Inversión y plazo siguen opcionales. Se actualizan título, descripción y datos usados por Open Graph; se conserva URL, canónica y receptor del formulario.

**Archivos:** `app/solution-catalog.mjs`, `app/solution-views.tsx`, `app/solutions.css` y esta ficha. Checkout separado desde `origin/main` para preservar los cambios de la carpeta de trabajo original.

**Comprobado antes de publicación:** lint, TypeScript, 74/74 pruebas Node, compilación estática preview y `git diff --check`. Revisión renderizada a 1440 y 375 px: imágenes, lectura, formulario, CTA, desplegable, foco visible y ausencia de desbordamiento horizontal. Once enlaces internos resuelven en el paquete; metadatos, canónica y Open Graph correctos. Sin cambios en PHP ni en medición. PHP no está disponible localmente: la validación completa del receptor se ejecuta en CI. Turnstile no valida el dominio local; no se envía un formulario desde la preview.

**Ejecución:** Codex principal, sin delegación por tratarse de un cambio acotado y estrechamente ligado a la revisión visual. No se ejecutó Claude ni se contrató consumo adicional; no hay medición de coste por tarea de la suscripción.

**Pendiente de cierre:** pasar CI de la PR, integrar el alcance autorizado y comprobar la publicación por `release.json`, el workflow y la página pública. El historial anterior de esta ficha no sustituye esas comprobaciones.
