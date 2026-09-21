# Colaborar en innure

La web que empezó como Oficio Lógico es ahora la portada general de innure. La dirección comercial es https://www.innure.es/. Este repositorio no contiene la web de rendimiento, situada en `/rendimiento/`, ni la configuración privada del correo.

## Actualizar el perfil de Santi

En `app/site-content.ts`, busca `nombre: 'Santiago Correas Carpio'` dentro de `FUNDADORES`. El perfil actual ya está completo y revisado por Sergio; propón los cambios que necesites sobre esos datos.

- Mantén tu nombre completo y una `funcion` breve que explique tu aportación real.
- Mantén `resumen` breve y deja el detalle profesional en `trayectoria`, que se expande en pantalla. `especialidades` contiene cuatro etiquetas y `aportes` cuatro bloques con evidencias de tu trabajo. No incluir métricas, clientes o credenciales no verificados.
- `muestra` enlaza a un proyecto del portfolio que respalde el perfil.
- Para cambiar la foto, añade una imagen autorizada en `public/images/` e indica su ruta en `foto`. Preferible cuadrada, al menos 640 × 640 px, optimizada para web y sin metadatos personales innecesarios. `fotoEscala` ajusta solo el encuadre visual desde la parte superior; comprueba el resultado en escritorio y móvil.
- `linkedin` es opcional: usa la dirección HTTPS de tu perfil, o deja `null`.

No uses textos de relleno. Si falta una foto autorizada, `foto: null` muestra las iniciales sin inventar un retrato.

## Proponer y autorizar los cambios

1. Actualiza desde `main` y crea una rama para tu propuesta; no trabajes directamente sobre `main`.
2. Cambia los datos, comprueba la vista local y ejecuta las comprobaciones del README.
3. Sube la rama y abre una **Pull Request hacia `main`**. Explica lo cambiado y solicita revisión a **@sh3rencr (Sergio)**. Ambos colaboradores figuran en CODEOWNERS; como el autor no puede aprobar su propia PR, la propuesta de Santiago necesita revisión de Sergio.
4. Espera a que pase `validate` y Sergio apruebe. Si añades cambios, la aprobación anterior deja de ser válida. Atiende los comentarios pendientes.
5. Con aprobación y comprobaciones correctas, **Sergio fusiona la PR**. También puede habilitar **auto-merge** en esa PR para fusionarla cuando se cumplan ambos requisitos.

Solo **@sh3rencr** tiene una excepción a la revisión de PR, autorizada por Sergio, para publicar sus propios cambios sin depender de otro revisor. Las pruebas obligatorias no se omiten: trabaja en una rama, abre una PR y espera a que pase `validate` antes de integrarla en `main`. Para sus propias propuestas Sergio puede fusionar sin una aprobación ajena; no debe intentar publicar directamente saltándose las comprobaciones. GitHub aplica la excepción a la cuenta, no al autor de cada PR; Sergio debe mantener la aprobación explícita como paso habitual para las propuestas de Santiago. Santiago no tiene esta excepción ni permiso para integrar cambios en `main` por sí mismo.

Al integrarse en `main`, **Publicar innure** construye y publica la web comercial automáticamente. No hace falta pedir un despliegue manual, compartir contraseñas ni activar Google Ads. Comprueba que los tres pasos de la acción terminan bien: preparación, publicación y verificación pública.

## Límites de seguridad y publicación

- `main` exige revisión del propietario de código, pruebas correctas y conversaciones resueltas. La protección se aplica también a administradores, con la excepción de revisión limitada a la cuenta de Sergio descrita arriba; solo él puede integrar en la rama principal. Las pruebas, la prohibición de forzar cambios y el bloqueo del borrado de la rama se mantienen.
- El entorno `innure-production` admite únicamente la rama `main`. Contiene solo las claves FTP cifradas necesarias para subir la web. No están en los archivos ni disponibles en pruebas de PR.
- La publicación autorizada de la portada gestiona su paquete en `public/`, incluido el receptor y las redirecciones de `automatizacion/`. Excluye rendimiento, sus assets, su receptor, Gesticert y configuración privada. No ampliar estos destinos, cambiar secretos, CODEOWNERS o reglas de protección sin acordarlo con Sergio.
- La vista de GitHub Pages es de revisión: no indexable, sin envío directo ni medición publicitaria. La dirección comercial es la de Innure.
- No incluir datos de contactos, credenciales, claves privadas, certificados ni documentos de clientes en este repositorio público.
- Publicar la web no autoriza activar anuncios, cambiar la campaña ni gastar presupuesto.

Los administradores de la organización conservan técnicamente la capacidad de cambiar la configuración del repositorio. La protección regula el flujo habitual; no cambia la propiedad compartida de la organización.
