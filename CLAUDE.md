# Instrucciones para Claude · Web FVEM 50

Web estática (sin build). Se publica en Cloudflare como Worker con archivos estáticos (`wrangler.jsonc`).
Solo la carpeta `public/` sale a internet: no pongas ahí nada que no deba ser público.

## Cómo trabajar
- Nunca cambies `main` directamente. Crea una rama `cambio/<descripcion-corta>`, haz commit y abre un pull request.
  Cloudflare genera una vista previa de la rama; pasa el enlace a la persona de FVEM y espera su aprobación antes de fusionar.
- Mensajes de commit en castellano, describiendo el cambio para alguien no técnico.
- Antes de proponer: comprueba sintaxis (`node -e "new Function(require('fs').readFileSync('public/assets/js/app.js','utf8'))"`, igual con config.js)
  y revisa la vista en móvil y escritorio.
- Contenido siempre bilingüe: cada texto nuevo en `config.js` lleva `{ es: '', eu: '' }`. Si no tienes la traducción revisada, avísalo.

## Marca (obligatorio)
- Tipografía: **Geist** (Google Fonts), autoalojada en `public/assets/fonts/` (no cargar desde fonts.googleapis.com: RGPD y CSP).
- Color cobre de resaltado: **#d86b33** (`--cobre`), tal cual, en textos destacados, líneas, cifras y botones. No uses variantes más claras para resaltar; `--cobre3` solo para el estado hover de los botones.
- Paleta: negro industrial #0b0b0b, blanco cálido #f5f2eb, plata/metal cepillado, cobre #d86b33.
- Logo: `public/assets/img/logo-50fvem.png` (versión opaca). Si llega un SVG oficial, sustitúyelo.

## Seguridad y privacidad (obligatorio)
- No subas nunca datos personales, respuestas de formularios, contraseñas, claves ni el Excel interno de asociadas.
- En `public/assets/js/empresas.js` solo van columnas públicas: num_asociada, nombre, zona, direccion, cp, municipio, plantilla, web, fecha_alta, anio_alta, anio_baja, sector, logo, foto, foto_historica, descripcion_*, producto_*, frase_*.
- No añadas scripts, fuentes ni servicios de terceros sin actualizar la CSP de `public/_headers` y avisar a FVEM (implica RGPD).
- No cambies `assets.directory` de `wrangler.jsonc`: publicar la raíz expondría la carpeta `.git`.
- No relajes las cabeceras de `public/_headers` (`script-src 'self'`, `frame-ancestors 'none'`…). Excepción aprobada: Google Analytics 4 (googletagmanager.com / google-analytics.com), que solo se carga tras aceptar el aviso de cookies.
- Nunca cargues Analytics u otros servicios que usen cookies antes del consentimiento (`cookieBanner` en app.js).

## Datos útiles
- La cuenta atrás principal apunta al evento `gala` de `public/assets/js/config.js`.
- `?ahora=2027-10-28T20:20` en la URL simula la fecha para probar el modo «En directo».
- `vistaPrevia: false` en `config.js` quita la etiqueta de vista previa.
