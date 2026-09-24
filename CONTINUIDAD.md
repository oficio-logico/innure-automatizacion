# Continuidad · IA empresas innure

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
