# Portfolio — revisión del 19 de septiembre de 2026

Actualización local del 21/09/2026: perfiles de Sergio y Santiago adaptados al
posicionamiento aprobado de tecnología/operaciones y producto/crecimiento.
Resumen, cuatro especialidades y trayectoria desplegable. Se conservan las fuentes
de experiencia y los proyectos; esta actualización aún no está publicada.

Segunda revisión local del 21/09/2026: Sergio aporta ocho años de trayectoria en
NTT DATA; se incorpora ese periodo con el foco de ingeniería de rendimiento que
ya constaba en sus antecedentes. Santiago aparece expresamente como fundador de
Collapp, según la indicación transmitida por Sergio. La marca se escribe «innure».

## Edición

- Catálogo y textos: `app/project-catalog.ts`.
- Registro de rutas: `app/project-registry.mjs`. Cada entrada necesita su `app/proyectos/<slug>/page.tsx` estático.
- Equipo: `app/site-content.ts`.
- Componentes compartidos: `app/project-views.tsx`.
- Las rutas del sitemap, exportación y comprobación de publicación se derivan del registro.

## Fuentes y límites

- Sergio: https://www.linkedin.com/in/sergio-herencias/ — perfil consultado; dirección de ingeniería de rendimiento en ODS y certificación CTFL. No se presenta a su empleador como cliente de Innure.
- Santiago: https://www.linkedin.com/in/santiago-correas-carpio-67479a2bb/ — cargo y retrato del perfil. Experiencia en festivales, cofundación de Ender Hookah/Collapp y autoría integral de FORJA aportadas por Sergio.
- Retratos: Sergio ha aprobado su edición frontal a partir de fotos propias; en la foto de Santiago se ha retirado el logotipo de la camiseta. El encuadre web iguala la proporción visible de ambas fotos. Los originales personales y las variantes descartadas no forman parte de esta publicación.
- FORJA: https://apps.apple.com/es/app/forja-entrenador-con-ia/id6804248683 y https://www.forjafit.es/ — ficha pública a nombre de Grupo Empresarial Innure SL. Capturas oficiales, no pantallas recreadas.
- Gesticert: escritorio v0.1.34 experimental del 14/09, desde `docs/capturas/principal-v34-experimental-claro.png`, y área de cliente del ensayo local del 16/09. Datos ficticios, sin credenciales, cobros o licencias reales.
- SIENTA: demostración previa de sala y captura de iPad físico del 09/09, con negocio ficticio. Orientación corregida sin modificar contenido.
- Clipappboard: historial nativo de la preparación de lanzamiento de septiembre; cinco clips ficticios.
- Polymath: resultados de prueba de v0.4.2. PomodoroUtility: panel de validación v0.1.2.
- WindowUtility: renderer de pruebas del componente actual v0.1.4, ejecutado el 19/09. Ventanas sintéticas; no captura del escritorio privado.
- Claro: revisión v10 de Apple TV con catálogo sintético. No incluye fuentes IPTV privadas.
- Oposición Metro: captura pública de temario ya disponible en la web.
- Miriam Studio: captura de revisión del 10/09. La intervención descrita es QA y apoyo, no autoría de la tienda.
- Música: esquema funcional del proceso; no se inventa una interfaz gráfica ni se expone la biblioteca del usuario.

Se muestran las capturas verificables disponibles, no se afirma que todas correspondan al último commit de cada aplicación. No se atribuyen clientes, cifras de ahorro ni resultados comerciales no acreditados.

## Validación y publicación

Lint, TypeScript, pruebas de scripts y compilación `build:innure`. Comprobación local de rutas, imágenes y 404; revisión visual de catálogo, fichas y equipo en escritorio y móvil. Sin envíos reales de formularios.

Publicación autorizada por Sergio tras la revisión visual del 19 de septiembre de 2026. Se utiliza el flujo existente de `/automatizacion/`, sin modificar la web raíz ni activar campañas. El estado efectivo y la versión publicada se comprueban en la acción «Publicar Innure Automatización» y en `release.json` de la web comercial.
