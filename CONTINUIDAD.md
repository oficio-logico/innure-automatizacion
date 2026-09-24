
## Publicación 2026-09-24 (Claude)

- Publicado: innure-web `main` hasta `a3d1361` (revisión, logos comprimidos y
  `ads-consent.js?v=3`) y portada PR #13 (integrado por Sergio).
- Comprobado en producción (con curl evitando la caché y en navegador): franja de 39
  marcas sin imágenes rotas, JSON-LD, imagen social, redirecciones 301 de las `.html`
  legales, cabeceras nosniff/Referrer-Policy/X-Frame-Options, política única y
  consentimiento común (rechazar en la portada evita el aviso y Google Ads en
  /rendimiento/).
- Cloudflare cachea `robots.txt` y los JS hasta 7 días: el origen ya sirve el robots
  nuevo, pero la verificación posterior a publicar falló por la copia en caché. Purgar
  `robots.txt` en Cloudflare o esperar a que caduque. Subir `?v=` al cambiar
  `assets/ads-consent.js`.
- Pendiente: logo de Dreambeach (pedírselo a Santi), casos (reales anonimizados o
  ejemplos etiquetados) y fase de posicionamiento.
