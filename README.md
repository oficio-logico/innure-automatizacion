# Innure · Automatización e IA

Landing para pequeñas empresas: automatizar tareas, conectar herramientas e integrar IA o desarrollar aplicaciones a medida.

## Direcciones y repositorios

- URL comercial: https://www.innure.es/automatizacion/
- Rendimiento permanece en https://www.innure.es/.
- [oficio-logico/innure-automatizacion](https://github.com/oficio-logico/innure-automatizacion) es el repositorio público de esta línea, antes llamado Oficio Lógico. Contiene solo automatización.
- `sh3rencr/innure-web` permanece privado y mantiene la web de rendimiento. El alojamiento es compartido; el código y la publicación son independientes.
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

`app/site-content.ts` centraliza textos, equipo, identidad y opciones públicas. Sergio Herencias Redondo y Santiago Correas Carpio tienen perfiles completos, especialidades, proyectos y enlaces a LinkedIn, revisados por Sergio. Los retratos y su encuadre están preparados para mantener una presentación coherente. Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para proponer actualizaciones mediante una PR revisada por Sergio.

El portfolio reúne once proyectos en `/proyectos/`, cada uno con su ficha, capturas y estado real. `app/project-catalog.ts` contiene el contenido y `app/project-registry.mjs` mantiene el registro compartido por las rutas, el sitemap y las comprobaciones. [PORTFOLIO.md](PORTFOLIO.md) documenta las fuentes y los límites de las capturas; no son promesas de resultados ni casos de clientes salvo indicación expresa.

## Compilación de producción

```bash
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION=AW-18410180479/mBarCPixx_EcEP-e1MpE npm run build:innure
```

La salida pública es `dist/client/`. El script fija `/automatizacion/`, habilita el formulario con la clave pública de Turnstile de Innure y copia `server/contacto.php` exactamente a `dist/client/contacto.php`. Nunca debe subirse este paquete a la raíz del alojamiento.

La exportación también comprueba los metadatos por ruta, genera `sitemap.xml` solo con las páginas indexables y publica un `404.html` de Innure. `server/automatizacion.htaccess` se copia como `.htaccess` dentro de esta subcarpeta para conservar el estado HTTP 404. No modifica el error, robots ni sitemap del dominio raíz. El artefacto admite ese archivo oculto; la compilación rechaza otros archivos ocultos no previstos.

La configuración privada NO está en este repositorio. El receptor lee exclusivamente `../config.php` y `../mail-config.php` del alojamiento existente. No ejecuta ni modifica el formulario de rendimiento.

## Publicación

Al integrar cambios autorizados en `main`, «Publicar Innure Automatización» comprueba código y pruebas, construye, conserva un artefacto y publica exclusivamente en `public/automatizacion/`. Las claves FTP se guardan cifradas en el entorno `innure-production`, limitado a `main`; no se incluyen en el código ni están disponibles en las pruebas de PR. La compilación se ejecuta sin acceso a esas claves. La configuración privada del correo permanece en el alojamiento y el repositorio privado de Innure.

`main` requiere una revisión de CODEOWNERS, el resultado correcto de `validate` y conversaciones resueltas. Una PR de Santiago requiere la revisión de Sergio y las aprobaciones caducan al cambiar la propuesta. La protección se aplica también a administradores, con una única excepción de revisión para **@sh3rencr**, autorizada para publicar sus propios cambios sin otro revisor; las pruebas siguen siendo obligatorias. GitHub concede esta excepción a la cuenta y no la limita por autor de la PR, por lo que Sergio conserva la aprobación explícita como paso habitual para las propuestas de Santiago. Solo Sergio puede integrar cambios; auto-merge sigue disponible. No activar anuncios al publicar.

La acción manual «Publicar automatización de Innure» del repositorio privado de despliegue se conserva como recuperación: recibe un SHA exacto y el destino de conversión. No ejecutarla en paralelo al despliegue automático. Ambas usan el mismo estado de sincronización de automatización, independiente del de rendimiento.

El despliegue raíz excluye `automatizacion/`. Un cambio exclusivo en los dos ficheros de workflow no publica de nuevo rendimiento; si se quiere aplicar un cambio a su workflow, se ejecuta su acción manual.

`scripts/verify-innure-live.mjs` comprueba versión, páginas, recursos, rechazo de métodos y origen externo. No genera un lead. La recepción real de un mensaje se valida por separado con una única consulta técnica identificada, sin consentimiento publicitario.

## Formulario

La primera conversación se plantea como revisión de una tarea y orientación del siguiente paso, no como una auditoría gratuita completa. Los ejemplos permiten elegir esa tarea antes de llegar al formulario. La elección se puede quitar y nunca sobrescribe el texto del visitante; vive solo en la página, sin URL, cookies ni almacenamiento local.

Al enviar, el contexto elegido se incorpora al campo `process` del contrato existente. No viaja en eventos de medición. El límite de texto reserva espacio para esa etiqueta y los errores conservan tanto la elección como el borrador. El recorrido del Gestor de Certificados muestra una captura de desarrollo con datos sintéticos, no una demo interactiva del producto ni un caso de ahorro medido.

POST multipart/form-data a `/automatizacion/contacto.php` desde la misma web:

El HTML estático mantiene los campos y el botón desactivados hasta que React instala el manejador; el método nativo se declara POST para evitar que los datos acaben en la URL. Sin JavaScript se muestra el correo alternativo. Las pruebas simulan este estado sin solicitudes externas.

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
