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
