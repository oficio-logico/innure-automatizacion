# Continuidad · IA empresas innure

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

## 2026-09-23 · Recepción del formulario

**Objetivo y alcance:** revisar únicamente el enrutamiento del formulario público de innure. No se cambió código, Google Ads ni la campaña.

**Hallazgos:** la portada publicada envía a `/automatizacion/contacto.php`; ese receptor lee `MAIL_TO` y `MAIL_CC` de `public/mail-config.php` (con `config.php` como respaldo). El repositorio privado `sh3rencr/innure-web` genera ese archivo a partir de `FORM_MAIL_TO` y `FORM_MAIL_CC` y lo sube a DonDominio. Antes de corregirlo, dos pruebas recibidas en `info@innure.es` (21/9 y 23/9 a las 00:49) mostraban `To: info@innure.es` y `Cc: sherencr@gmail.com`. Los correos disponibles de DonDominio identifican a Sergio Herencias y `sherencr@gmail.com` como contacto de registro/facturación del dominio; esto no acredita el identificador de acceso al panel. El portal no estaba autenticado.

**Cambio autorizado:** se actualizó únicamente el secreto `FORM_MAIL_CC` del repositorio privado a `santi@innure.es`, sin leer ni exponer contraseñas. El despliegue manual `Deploy a innure.es (FTP)` [35907090782](https://github.com/sh3rencr/innure-web/actions/runs/35907090782) finalizó correctamente y regeneró/subió `mail-config.php` a la raíz del hosting. La publicación normal de la portada no cambió.

**Comprobaciones:** prueba interna desde el formulario publicado `INNURE-RECEPCION-20260923-A1`, recibida en la bandeja de `info@innure.es` a las 21:08 (referencia `52274a49dc1437b067fe14eab4f0a824`). Sus encabezados muestran `To: info@innure.es` y `Cc: santi@innure.es`; esto acredita la ruta activa y la aceptación SMTP de ambos destinatarios, no la entrega final al buzón de Santiago. No hay acceso a `santi@innure.es` en el entorno disponible y no se ha verificado su bandeja, spam ni reglas. No se leyó directamente el archivo privado del hosting; los valores efectivos se deducen de la prueba y de cómo el receptor construye los encabezados tras aceptar `RCPT TO`.

**Siguiente paso:** Santiago debe buscar la referencia `52274a49dc1437b067fe14eab4f0a824` o el marcador `INNURE-RECEPCION-20260923-A1` en Recibidos, spam y posibles reglas de `santi@innure.es`, y confirmar si recibió el mismo mensaje. Si no aparece, el titular de DonDominio debe revisar el buzón y el registro de entrega/rechazos para esa referencia y hora, sin compartir credenciales.

## 2026-09-24 · Vídeo del ejemplo de pedidos

**Objetivo:** mostrar en la portada un vídeo ilustrativo del proceso de pedidos, preparado para revisión local antes de decidir su publicación.

**Decisión visual:** el vídeo se integra únicamente en «Así cambia el día a día» / «Copiar datos entre programas». No sustituye la cabecera general. Se muestran los archivos horizontal o vertical según el ancho de pantalla, con portada, controles nativos, sin audio, sin reproducción automática y sin precarga del MP4. El texto cercano resume la secuencia y aclara que los datos son ficticios.

**Cambios:** `app/interactive.tsx`, `app/globals.css` y cuatro archivos en `public/videos/` (dos MP4 y dos portadas). Los otros dos ejemplos conservan sus pasos anteriores. No se alteraron el formulario, Google Ads ni la configuración de publicación.

**Comprobaciones:** lint y tipos correctos; 50 pruebas Node correctas; compilación `INNURE_TARGET=home INNURE_MEASUREMENT_ENV=preview` correcta; los cuatro archivos devuelven HTTP 200 en la vista local. Se inspeccionó la composición renderizada en escritorio y móvil. No se ejecutaron las pruebas PHP porque `php` no está instalado en este entorno; no hay cambios en PHP. No se ha publicado en producción.

**Siguiente paso:** revisión visual del usuario en `http://localhost:3000/#ejemplos`. Si la aprueba, integrar mediante PR a `main` para activar la publicación existente, sin tocar la campaña.

## 2026-09-24 · Foto del grupo de WhatsApp

**Objetivo y cambio autorizado:** establecer la imagen de marca en el grupo de WhatsApp de innure. Se reutilizó `public/innure-favicon.png` (512 × 512), con el símbolo «in» sobre el degradado azul y violeta, sin modificar el archivo original.

**Decisión visual y comprobaciones:** la versión cuadrada conserva la legibilidad en miniatura. Se inspeccionó el recorte circular antes de guardarlo y la ficha del grupo después: la imagen quedó aplicada, centrada y sin cortar el símbolo.

**Límites y siguiente paso:** no se modificaron la web ni otros ajustes del grupo. No quedan pasos pendientes para este encargo. El único cambio en el repositorio es esta anotación de continuidad; las pruebas de código no aplican.
