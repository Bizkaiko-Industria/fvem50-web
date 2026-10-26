# Web FVEM 50 · 1977–2027

Web estática del 50 aniversario de FVEM. Se publica automáticamente en Cloudflare (Worker `50`, dirección `50.fvem.es`, y también `50.fvem.workers.dev`)
al actualizar la rama `main`. Solo se publica la carpeta `public/` (ver `wrangler.jsonc`).
Cada propuesta en otra rama genera una vista previa.

| Qué cambiar | Archivo |
|---|---|
| Agenda, programa, vídeo, personas, prensa, formularios, enlaces legales | `public/assets/js/config.js` |
| Empresas asociadas (solo columnas públicas) | `public/assets/js/empresas.js` |
| Diseño | `public/assets/css/web.css` |
| Funcionamiento | `public/assets/js/app.js` |
| Logos y fotos de empresas | `public/assets/img/empresas/` |
| Vídeo de portada | `public/assets/video/` |
| Cabeceras de seguridad | `public/_headers` |

Guía completa: `GUIA_PUBLICACION.md`.
