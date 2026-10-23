# Guía de publicación · Web FVEM 50

Cómo poner la web en internet con dominio propio, de forma segura y cumpliendo el RGPD.
Pensada para comunicación y para quien lleve la informática de FVEM.

---

## 1. Cómo queda montado

```
  Visitante
     │  https://
     ▼
┌──────────────────────────┐
│ Cloudflare               │  DNS, certificado HTTPS, protección DDoS y bots
│  └─ Cloudflare Pages     │  la web (archivos estáticos de la carpeta fvem50-web)
└──────────────────────────┘
     │ (solo cuando alguien rellena un formulario)
     ▼
┌──────────────────────────┐
│ Tally (datos en la UE)   │  formularios y archivos que suben las empresas
└──────────────────────────┘
  Vídeos: YouTube (modo privacidad) o Vimeo · Newsletter: vuestra herramienta actual
```

**Por qué así:** la web no tiene servidor propio, base de datos, panel de administración ni plugins, que es por donde entran la mayoría de ataques a webs como WordPress. Son solo archivos. Los datos personales de los formularios no pasan por la web: van directos a un proveedor europeo con contrato de encargado del tratamiento.

**Coste orientativo:** Cloudflare Pages es gratuito para este uso. Tally tiene plan gratuito y uno de pago para equipos. El dominio cuesta unas pocas decenas de euros al año.

---

## 2. Antes de empezar: cuentas

- Crea las cuentas con un **correo corporativo genérico**, por ejemplo `web@fvem.es`, nunca con el de una persona o de la agencia.
- Activa la **verificación en dos pasos (2FA)** en todas: registrador del dominio, Cloudflare y Tally.
- Da acceso al menos a **dos personas de FVEM**. Si alguien se va, se le retira el acceso ese mismo día.
- Guarda las contraseñas en el gestor de contraseñas de la organización.

---

## 3. El dominio

**Opciones:**

| Opción | Ejemplo | Comentario |
|---|---|---|
| Subdominio de fvem.es | `50.fvem.es` | Lo más rápido. No hay que comprar nada; informática solo añade un registro DNS. |
| Dominio propio .eus | `fvem50.eus` | Encaja con el aniversario. La política de .eus pide contenido en euskera, y la web es bilingüe. |
| Dominio propio .es | `fvem50.es` | Conviene registrarlo también y redirigirlo al principal. |

**Al registrarlo:**
- **Titular: FVEM** (la entidad, con su CIF), no una persona ni la agencia.
- Renovación automática por varios años, para que no caduque en mitad de 2027.
- Activa el **bloqueo de transferencia** y, cuando el DNS esté en Cloudflare, **DNSSEC**.
- Antes de comprar, comprueba la disponibilidad en un registrador acreditado.

---

## 4. Publicar la web (Cloudflare Pages, subida directa)

1. Entra en `dash.cloudflare.com` → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Nombre del proyecto: `fvem50`.
3. Arrastra la **carpeta `fvem50-web`** completa (la de este zip, no el zip).
4. Publica. Tendrás una dirección provisional `https://fvem50.pages.dev` para revisarla.

El archivo `_headers` de la carpeta activa solo las cabeceras de seguridad:
- política de contenido (CSP): solo se ejecuta el código de la propia web;
- HTTPS obligatorio (HSTS);
- prohibido incrustar la web en otras páginas, contra el *clickjacking*;
- bloqueo de cámara, micrófono y ubicación.

**Para comprobarlo:** analiza la dirección en `securityheaders.com`. Debería dar nota A o superior.

---

## 5. Conectar el dominio

1. En Cloudflare: **Add a site** → escribe el dominio → plan **Free**.
2. Cloudflare te da dos *nameservers*. Cámbialos en el panel del registrador. Tarda de minutos a unas horas.
3. En el proyecto de Pages: **Custom domains** → añade `fvem50.eus` y `www.fvem50.eus`.
4. Si también tenéis `fvem50.es`, redirígelo al principal desde **Rules → Redirect rules**.
5. Si usáis el subdominio `50.fvem.es`, informática solo tiene que crear el registro **CNAME** que indique Pages en el DNS actual de fvem.es.

**Ajustes de seguridad en Cloudflare (dominio → SSL/TLS y Security):**
- SSL/TLS → **Always Use HTTPS**: activado. **Minimum TLS**: 1.2.
- DNS → **DNSSEC**: activar y copiar el registro DS en el registrador.
- Security → **Bot Fight Mode**: activado.
- Notifications → avisos por correo de ataques DDoS y de caducidad de certificado.

---

## 6. Formularios seguros (Tally)

La web ya está preparada: en cuanto pegues la dirección de un formulario, sustituye a la maqueta.

1. Crea en Tally tres formularios:
   - **Empresas asociadas:** empresa, persona de contacto, correo, tipo de material, mensaje y subida de archivos.
   - **Público:** nombre, correo, empresa, año aproximado, historia y fotos.
   - **Newsletter**, solo si no tenéis ya una herramienta. Si la tenéis, usad su formulario de alta.
2. En la subida de archivos:
   - limita los tipos (JPG, PNG, SVG, PDF) y el tamaño;
   - **nunca abras archivos ejecutables ni comprimidos** que lleguen.
3. Añade al final de cada formulario:
   - una casilla obligatoria de aceptación;
   - un texto informativo con responsable (FVEM), finalidad, base legal, plazo de conservación, derechos y enlace a la política de privacidad.
4. Configura los avisos de nuevas respuestas a un **buzón corporativo**.
5. Copia la dirección de inserción (**Share → Embed**, campo `src`) y pégala en `assets/js/config.js`:
   ```js
   formularios: {
     empresas: 'https://tally.so/embed/XXXXXX?transparentBackground=1',
     publico:  'https://tally.so/embed/YYYYYY?transparentBackground=1',
     newsletter: 'https://…'
   },
   ```
6. **Moderación:** nada de lo que envíen se publica automáticamente. Comunicación revisa y añade los logos y fotos a la web.
7. **Conservación:** fija un plazo (por ejemplo, borrar las respuestas al cerrar el aniversario) y cúmplelo.

Tally declara que guarda los datos cifrados y en Europa, y que su contrato de encargado del tratamiento (DPA) se acepta con sus condiciones de uso. Conviene que vuestra asesoría o DPD lo revise.

---

## 7. Textos legales (obligatorios antes de publicar)

Rellena en `config.js` → `legal` las direcciones de estas páginas. Pueden ser las de fvem.es si cubren esta web:
- **Aviso legal** (LSSI)
- **Política de privacidad** (RGPD/LOPDGDD), mencionando los formularios del aniversario y Tally como encargado
- **Política de cookies:** la web **no usa cookies**. Solo guarda en el navegador el idioma elegido, que es una preferencia técnica. Si no se añade analítica con cookies, no hace falta banner.
- **Declaración de accesibilidad**

Añade también el tratamiento «Formularios 50 aniversario» al registro de actividades de tratamiento de FVEM.

*No es asesoramiento jurídico: que lo valide la asesoría o el DPD de FVEM.*

---

## 8. Vídeos

- **Vídeo de portada** (bucle sin sonido): sube el MP4 a `assets/video/` y escribe su ruta en `config.js` → `video.mp4`. Que pese menos de 10 MB.
- **Vídeo completo** con sonido: súbelo a YouTube o Vimeo. En YouTube usa la dirección `https://www.youtube-nocookie.com/embed/ID` (modo privacidad). Solo se carga cuando alguien pulsa «Ver el vídeo».

---

## 9. Actualizar la web

| Qué | Archivo |
|---|---|
| Agenda, programa, vídeo, personas, prensa, formularios y textos legales | `assets/js/config.js` |
| Empresas asociadas | `assets/js/empresas.js`, generado desde el Excel. Envía el Excel y se regenera. |
| Logos y fotos de empresas | carpeta `assets/img/`, con la ruta indicada en el Excel |

**Pasos para cada actualización:**
1. Edita el archivo.
2. En Cloudflare Pages: **Create new deployment**.
3. Arrastra la carpeta actualizada.

Cada versión queda guardada y se puede **volver a la anterior con un clic** (Deployments → Rollback). Antes de quitar la etiqueta «Vista previa», pon `vistaPrevia: false` en `config.js`.

**Mejora recomendable:** guardar la carpeta en un repositorio privado de GitHub conectado a Pages. Así queda un historial de quién cambió qué.

---

## 10. Lista de comprobación de lanzamiento

- [ ] Dominio registrado a nombre de FVEM, con renovación automática, bloqueo y DNSSEC
- [ ] 2FA en registrador, Cloudflare y Tally, con dos administradores de FVEM
- [ ] Web en Pages con el dominio propio y HTTPS funcionando
- [ ] `securityheaders.com` con nota A o superior
- [ ] Formularios de Tally conectados, probados y con texto informativo RGPD
- [ ] Enlaces legales rellenados en `config.js`
- [ ] Contenido de ejemplo sustituido: agenda, programa, personas y prensa
- [ ] Listado completo de asociadas cargado
- [ ] Logo en SVG oficial
- [ ] Textos en euskera revisados
- [ ] `vistaPrevia: false`
- [ ] Prueba en móvil (iPhone y Android) y en ordenador
