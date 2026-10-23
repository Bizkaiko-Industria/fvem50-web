# Instrucciones para Claude · Web FVEM 50

Web estática (sin build): lo que hay en la raíz es exactamente lo que se publica en Cloudflare Pages.

## Cómo trabajar
- Nunca cambies `main` directamente. Crea una rama `cambio/<descripcion-corta>`, haz commit y abre un pull request.
  Cloudflare genera una vista previa de la rama; pasa el enlace a la persona de FVEM y espera su aprobación antes de fusionar.
- Mensajes de commit en castellano, describiendo el cambio para alguien no técnico.
- Antes de proponer: comprueba sintaxis (`node -e "new Function(require('fs').readFileSync('assets/js/app.js','utf8'))"`, igual con config.js)
  y revisa la vista en móvil y escritorio.
- Contenido siempre bilingüe: cada texto nuevo en `config.js` lleva `{ es: '', eu: '' }`. Si no tienes la traducción revisada, avísalo.

## Seguridad y privacidad (obligatorio)
- No subas nunca datos personales, respuestas de formularios, contraseñas, claves ni el Excel interno de asociadas.
- En `empresas.js` solo van columnas públicas: num_asociada, nombre, zona, direccion, cp, municipio, plantilla, web, fecha_alta, anio_alta, anio_baja, sector, logo, foto, foto_historica, descripcion_*, producto_*, frase_*.
- No añadas scripts, fuentes ni servicios de terceros sin actualizar la CSP de `_headers` y avisar a FVEM (implica RGPD).
- No relajes las cabeceras de `_headers` (`script-src 'self'`, `frame-ancestors 'none'`…).

## Datos útiles
- La cuenta atrás principal apunta al evento `gala` de `config.js`.
- `?ahora=2027-10-28T20:20` en la URL simula la fecha para probar el modo «En directo».
- `vistaPrevia: false` en `config.js` quita la etiqueta de vista previa.
