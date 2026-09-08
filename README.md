# Innure · Automatización e IA

Landing para pequeñas empresas: automatizar tareas, conectar herramientas e integrar IA o desarrollar aplicaciones a medida.

## Direcciones y repositorios

- URL comercial: https://www.innure.es/automatizacion/
- Rendimiento permanece en https://www.innure.es/.
- Este repositorio contiene solo automatización. El alojamiento es compartido; el código y la publicación son independientes.
- GitHub Pages conserva una vista de revisión con `noindex`, sin receptor ni etiquetas publicitarias.

## Desarrollo y comprobaciones

Node.js 22.13 o superior; dependencias y lockfile existentes.

```bash
npm ci
npm run dev
npm run lint
npx tsc --noEmit
node --test scripts/*.test.mjs
php -l server/contacto.php
php scripts/contact.test.php
```

Las pruebas del receptor usan funciones aisladas; no envían correos externos. La medición se comprueba con un navegador simulado, sin cargar Google.

`app/site-content.ts` centraliza textos, equipo, identidad y opciones públicas. Solo se muestran perfiles con datos confirmados. El perfil de Sergio y su foto proceden de la web de Innure; el segundo perfil sigue pendiente. La web puede publicarse con el perfil confirmado sin mostrar marcadores ni inventar datos.

## Compilación de producción

```bash
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION=AW-18410180479/mBarCPixx_EcEP-e1MpE npm run build:innure
```

La salida pública es `dist/client/`. El script fija `/automatizacion/`, habilita el formulario con la clave pública de Turnstile de Innure y copia `server/contacto.php` exactamente a `dist/client/contacto.php`. Nunca debe subirse este paquete a la raíz del alojamiento.

La configuración privada NO está en este repositorio. El receptor lee exclusivamente `../config.php` y `../mail-config.php` del alojamiento existente. No ejecuta ni modifica el formulario de rendimiento.

## Publicación

La acción manual «Publicar automatización de Innure», en el repositorio privado de despliegue de Innure, recibe un SHA exacto de este repositorio y el destino público de conversión. Comprueba código y pruebas, construye, conserva un artefacto y publica exclusivamente en `public/automatizacion/`. Reutiliza las credenciales privadas existentes sin copiarlas al repositorio público. El estado de sincronización es independiente del de rendimiento.

El despliegue raíz excluye `automatizacion/`. Un cambio exclusivo en los dos ficheros de workflow no publica de nuevo rendimiento; si se quiere aplicar un cambio a su workflow, se ejecuta su acción manual.

`scripts/verify-innure-live.mjs` comprueba versión, páginas, recursos, rechazo de métodos y origen externo. No genera un lead. La recepción real de un mensaje se valida por separado con una única consulta técnica identificada, sin consentimiento publicitario.

## Formulario

POST multipart/form-data a `/automatizacion/contacto.php` desde la misma web:

- `name`, `company`, `email`, `phone` opcional, `process`, `privacy=accepted`.
- `service=automatizacion-ia`, honeypot `website` vacío, `cf-turnstile-response`.
- Límites de servidor, origen exacto, Turnstile con hostname/action y fallo cerrado, cuotas de diez minutos después de superar Turnstile.
- Éxito JSON `{ success: true, submissionId: "32 caracteres hexadecimales" }` exclusivamente después de aceptación SMTP. Esto no demuestra por sí solo la entrega final en el buzón.
- Los errores conservan los campos, no disparan conversiones ni exponen destinatarios privados o trazas SMTP.
- No hay reintento automático. Si se pierde la conexión después de aceptar el correo, un reintento manual puede duplicarlo; la referencia del mensaje permite reconocerlo.
- No se almacenan mensajes ni una base de datos de clientes en el alojamiento.

## Medición y primera prueba comercial

«Contacto · Automatización» tiene su propio destino; nunca se utiliza la conversión de rendimiento. Se crea como **secundaria** para no cambiar las pujas de las campañas existentes. Al preparar la futura campaña, seleccionar únicamente esta acción mediante un objetivo específico de automatización.

`public/lead-measurement.js`:

- no carga Google hasta aceptar;
- permite rechazo y retirada desde el pie;
- no comparte el contenido del formulario;
- atribución de campaña solo consentida, acotada a sesión/24 horas;
- deduplica por referencia del servidor y utiliza una conversión por clic;
- se desactiva fuera de `https://www.innure.es`.

El presupuesto de 100 € es una propuesta de prueba, no una campaña activa. No se publica ningún anuncio desde este repositorio. Antes de lanzar: comprobar recepción real, objetivos específicos, palabras clave/costes, tope total y aprobación del gasto. Registrar conversaciones cualificadas, propuestas y proyectos, no solo clics.

Los registros de contactos deben mantenerse privados, fuera de Git. No incluir datos de potenciales clientes en este repositorio público.

## Fuentes de identidad y privacidad

- Identidad, foto y experiencia: https://www.innure.es/ y su aviso legal.
- Registro Mercantil: [BORME de 24-04-2024, asiento 196497](https://www.boe.es/diario_borme/txt.php?id=BORME-A-2024-80-28).
- El receptor reutiliza el proveedor de correo configurado en Innure (DonDominio en la revisión del 08-09-2026).
- [Validación de Turnstile](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
- [Modo de consentimiento básico de Google](https://developers.google.com/tag-platform/security/concepts/consent-mode).
