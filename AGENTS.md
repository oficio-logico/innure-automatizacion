# innure · Automatización e IA

Las reglas generales de autonomía, calidad y orquestación se mantienen en el
AGENTS.md global de Codex. Este archivo queda reservado para instrucciones
específicas de este proyecto.

La marca se escribe siempre «innure», en minúscula, también en títulos y al inicio
de frase. Conserva los identificadores técnicos y los nombres de archivo existentes.

# Continuidad entre herramientas

Al cerrar una tarea que produzca cambios autorizados:
- Actualiza CONTINUIDAD.md (o el documento de continuidad existente señalado por el
  proyecto) con objetivo, decisiones, cambios, comprobaciones, límites y siguiente paso.
- Revisa el diff y crea un commit descriptivo con los archivos del encargo.
  No incluyas cambios ajenos, secretos ni documentación privada.
- Haz push a la rama y remoto autorizados, sin pedir confirmación de nuevo mientras
  se mantenga ese alcance. Revisa también los commits pendientes que viajarían.
- Comprueba antes si el push activa despliegues o publicaciones: esos efectos deben
  estar cubiertos por la autorización existente. Guardar código no autoriza desplegar.
- Verifica que el commit está en el remoto e informa de rama, hash y resultado.
- Si falta remoto, hay conflictos, falla el acceso o algún efecto no está autorizado,
  conserva el avance local y documenta el bloqueo. No fuerces el push, reescribas
  historia ni crees repositorios remotos por esta regla.
- No hagas commits vacíos. Si el trabajo queda incompleto, registra el estado real
  y las pruebas pendientes, sin presentarlo como terminado.

Al retomar un proyecto, lee su continuidad y comprueba el estado de Git antes de
modificar archivos. No sobrescribas trabajo de otra herramienta. Los pendientes de
una ficha son contexto, no autorización para ejecutarlos. Las auditorías y consultas
sin cambios no obligan a inventar cambios ni a ejecutar tareas de otra fase.
