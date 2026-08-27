# Oficio Lógico

Landing local en castellano para una marca de trabajo especializada en mejora de procesos, automatización, software a medida e implantación práctica de IA.

**Vista compartida:** https://sh3rencr.github.io/oficio-logico/

**Repositorio:** https://github.com/sh3rencr/oficio-logico

**Nombre de trabajo:** Oficio Lógico

**Dominio candidato:** `oficiologico.com`

El nombre y el dominio deben someterse a una búsqueda marcaria formal y registrarse antes de publicar. La comprobación inicial realizada para esta propuesta no sustituye una validación jurídica ni reserva el dominio.

## Ver en local

Requisitos: Node.js 22.13 o superior.

```bash
npm install
npm run dev
```

La dirección local se muestra en la terminal, normalmente `http://localhost:3000`.

## Validar la construcción

```bash
npm run build
npm run lint
```

## Editar contenido y datos

Todos los textos, enlaces y datos pendientes están centralizados en:

`app/site-content.ts`

Mientras falten datos, deben mantenerse estas dos salvaguardas:

- `publishing.ready: false`, que activa `noindex` y bloquea el rastreo en `robots.txt`.
- `contact.formEndpoint: null`, que impide cualquier envío y muestra un aviso honesto en el formulario.

La versión de GitHub Pages es una vista pública de revisión: conserva `noindex`, no envía formularios y no debe presentarse como una web comercial definitiva.

Cuando se disponga de un servicio real de recepción, asignar su URL HTTPS a `contact.formEndpoint` y revisar la política de privacidad según el proveedor y la ubicación del tratamiento.

## Bloqueadores de publicación

No publicar hasta completar y comprobar:

1. Validar y registrar «Oficio Lógico» como marca definitiva.
2. Registrar el dominio definitivo y configurar la URL canónica.
3. Nombre, función, biografía, empresas, periodos y logros verificables de cada fundador.
4. Fotografías reales de ambos fundadores y sus textos alternativos.
5. Correo operativo de contacto.
6. Enlace de reserva, si se va a ofrecer.
7. Razón social, NIF, domicilio y datos registrales, si corresponden.
8. Email operativo para derechos de protección de datos.
9. Servicio de recepción del formulario, plazo de conservación, encargados de tratamiento y posibles transferencias.
10. Revisión jurídica final del aviso legal, la privacidad y el texto de consentimiento.
11. Prueba real de recepción del formulario de extremo a extremo.

Después de completar esos puntos, cambiar `publishing.ready` a `true`, confirmar que `brand.domain` contiene la URL HTTPS completa y volver a ejecutar la validación.

## Decisiones técnicas

- Una única página principal y dos rutas legales.
- Identidad de trabajo «Oficio Lógico»: marfil, tinta y naranja señal; tipografía editorial y lenguaje directo.
- Contenido mayoritariamente estático; el JavaScript interactivo se limita a la navegación móvil y al formulario.
- Sin analítica, rastreadores, cookies no esenciales ni fuentes externas.
- Sin testimonios, métricas, clientes, logotipos o credenciales no verificadas.
- Dirección visual editorial basada en cuatro fotografías reales de Unsplash, servidas localmente como WebP y acreditadas en cada uso y en el pie.
- Fotografías de Aleksandr Zaitsev, Tanja Tepavac, Bank Phrom y Sebastian Schuster, usadas bajo la [licencia de Unsplash](https://unsplash.com/license).
