#!/usr/bin/env python3
"""
FVEM 50 · Páginas para buscadores y redes sociales
====================================================
La web es una sola página que se dibuja con JavaScript (rutas con #/...). Google, LinkedIn,
WhatsApp, X o Facebook no ven esas rutas: al compartir cualquier enlace salía siempre la
portada. Este script crea una página real (HTML estático) por sección, por cita de la agenda
y por empresa asociada, cada una con su título, descripción, imagen para redes, datos
estructurados y un resumen de texto. Al abrirla, la web funciona igual que siempre.

Genera (todo dentro de public/):
  index.html                      portada (reescribe solo el bloque <!-- SEO:ini --> … <!-- SEO:fin -->)
  empresas/index.html             y el resto de secciones solo si están en el menú de config.js
  agenda/<cita>/index.html        una por cita, solo si «agenda» está en el menú
  empresas/<nº asociada>/index.html   una por empresa de empresas.js
  assets/img/og/empresas/<nº>.jpg     imagen 1200×630 para redes de cada empresa
  sitemap.xml

Cuándo ejecutarlo: siempre que cambie empresas.js (alta/baja de socias, logos, descripciones)
o la agenda de config.js, y al lanzar la V2.

  pip install --break-system-packages pillow fonttools brotli numpy
  python3 herramientas/generar_seo.py            # todo
  python3 herramientas/generar_seo.py --sin-imagenes   # solo HTML y sitemap (rápido)
"""
import html, json, os, re, shutil, subprocess, sys, datetime, io

RAIZ = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
PUB = os.path.join(RAIZ, 'public')
SITIO = 'https://50.fvem.es'
OG_GENERICA = SITIO + '/assets/img/og-fvem50.jpg'
HOY = datetime.date.today().isoformat()
SIN_IMAGENES = '--sin-imagenes' in sys.argv

# ---------- datos (se leen con Node tal como los usa la web) ----------
datos = json.loads(subprocess.check_output(['node', '-e', '''
global.window = {};
require(process.argv[1]); require(process.argv[2]);
process.stdout.write(JSON.stringify({ c: window.FVEM50, e: window.FVEM50_EMPRESAS }));
''', os.path.join(PUB, 'assets/js/config.js'), os.path.join(PUB, 'assets/js/empresas.js')]))
C, EMP = datos['c'], datos['e']['empresas']
EVENTOS = C.get('eventos', [])

esc = lambda s: html.escape(str(s or ''), quote=True)
def short_name(n):  # igual que shortName() de app.js
    return re.sub(r',\s*(S\.?\s?(?:L|A)\.?\s?(?:L|U)?\.?|S\.?\s?COOP\.?)(?=\s*(?:-|$))', '', n, flags=re.I).strip()
def nf(n):
    return re.sub(r'\B(?=(\d{3})+(?!\d))', '.', str(int(round(n))))
def corta(t, n=158):
    t = re.sub(r'\s+', ' ', t).strip()
    if len(t) <= n: return t
    t = t[:n - 1].rsplit(' ', 1)[0].rstrip(',;:·-')
    return t + '…'
def ld(obj):
    return '<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/') + '</script>'

FVEM_ORG = {'@type': 'Organization', '@id': 'https://www.fvem.es/#org', 'name': 'FVEM · Federación Vizcaína de Empresas del Metal',
            'alternateName': 'FVEM', 'url': 'https://www.fvem.es', 'foundingDate': '1977',
            'logo': SITIO + '/icon-512.png', 'areaServed': 'Bizkaia'}
SITIO_LD = {'@type': 'WebSite', '@id': SITIO + '/#web', 'name': 'FVEM · 50 años con la industria', 'alternateName': 'FVEM · 50 urte industriarekin',
            'url': SITIO + '/', 'inLanguage': ['es', 'eu'], 'publisher': {'@id': 'https://www.fvem.es/#org'}}
def migas(*pares):
    return {'@type': 'BreadcrumbList', 'itemListElement': [
        {'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': SITIO + u} for i, (n, u) in enumerate(pares)]}

# ---------- plantilla ----------
PLANTILLA = open(os.path.join(PUB, 'index.html'), encoding='utf-8').read()
PLANTILLA = re.sub(r'<!--SEO-->.*?<!--/SEO-->', '', PLANTILLA, flags=re.S)  # quita el texto estático de una pasada anterior
assert '<!-- SEO:ini' in PLANTILLA and '<!-- SEO:fin -->' in PLANTILLA, 'Falta el bloque SEO en public/index.html'

def pagina(ruta, titulo, desc, vista, cuerpo, imagen=None, imagen_alt=None, tipo='website', datos_ld=(), titulo_redes=None):
    url = SITIO + ruta
    img = imagen or OG_GENERICA
    alt = imagen_alt or 'FVEM 50 · 50 años con la industria · 1977–2027'
    tr = titulo_redes or titulo
    cab = f'''<!-- SEO:ini · bloque generado por herramientas/generar_seo.py (no editar a mano: se reescribe en cada página) -->
<base href="/">
<title>{esc(titulo)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:site_name" content="FVEM · 50 años con la industria">
<meta property="og:type" content="{tipo}">
<meta property="og:locale" content="es_ES">
<meta property="og:locale:alternate" content="eu_ES">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{esc(tr)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:image" content="{img}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{esc(alt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(tr)}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{img}">
<meta name="twitter:image:alt" content="{esc(alt)}">
{ld({'@context': 'https://schema.org', '@graph': [FVEM_ORG, SITIO_LD, *datos_ld]})}
<!-- SEO:fin -->'''
    out = re.sub(r'<!-- SEO:ini.*?<!-- SEO:fin -->', lambda m: cab, PLANTILLA, flags=re.S)
    # Texto estático dentro de la vista: lo leen los buscadores y las redes; la web lo sustituye al cargar
    out = out.replace(f'<div class="view" id="v-{vista}"></div>', f'<div class="view" id="v-{vista}"><!--SEO-->{cuerpo}<!--/SEO--></div>', 1)
    destino = os.path.join(PUB, ruta.strip('/'), 'index.html') if ruta != '/' else os.path.join(PUB, 'index.html')
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    open(destino, 'w', encoding='utf-8').write(out)
    return ruta

def bloque(eyebrow, h1, parrafos, enlaces=()):
    ps = ''.join(f'<p>{esc(p)}</p>' for p in parrafos if p)
    ls = ''.join(f'<li><a href="{esc(u)}">{esc(n)}</a></li>' for n, u in enlaces)
    return (f'<section class="wrap" style="padding:140px 0 80px"><p class="eyebrow">{esc(eyebrow)}</p><h1>{esc(h1)}</h1>{ps}'
            + (f'<ul>{ls}</ul>' if ls else '') + '</section>')

# ---------- textos ----------
N_EMP = C.get('cifras', {}).get('empresas') or len(EMP)
N_PER = C.get('cifras', {}).get('plantilla') or sum(e.get('plantilla') or 0 for e in EMP)
SECCIONES = {
    'agenda':    ('Agenda 2027 · FVEM 50', 'Agenda', 'Agenda del 50 aniversario',
                  'Todas las citas del 50 aniversario de FVEM en 2027: jornadas, encuentros, visitas a empresas y la gala de la industria de Bizkaia.'),
    'programa':  ('Programa de la gala · FVEM 50', 'Programa', 'Programa de la gala',
                  'Programa hora a hora del acto central del 50 aniversario de FVEM, la federación de empresas del metal de Bizkaia.'),
    'empresas':  ('Empresas asociadas · FVEM 50', 'Empresas', f'Las {nf(N_EMP)} empresas asociadas a FVEM',
                  f'Directorio de las {nf(N_EMP)} empresas del metal de Bizkaia asociadas a FVEM: busca por nombre, municipio, sector o año de alta.'),
    'historia':  ('Historia · 50 años de FVEM (1977–2027)', 'Historia', '50 años de historia de la industria de Bizkaia',
                  'De las empresas fundadoras de 1977 a las socias que se suman hoy: 50 años de historia de FVEM y del metal de Bizkaia.'),
    'personas':  ('Personas que hacen industria · FVEM 50', 'Personas', 'Personas que hacen industria',
                  'Talento, experiencia e innovación: historias de las personas que trabajan en las empresas asociadas a FVEM.'),
    'participa': ('Participa en el 50 aniversario · FVEM 50', 'Participa', 'Participa en el 50 aniversario',
                  'Empresas asociadas: envía tu logo, una foto antigua y tu mensaje para el 50 aniversario de FVEM y aparecerá en tu ficha.'),
    'prensa':    ('Prensa y recursos · FVEM 50', 'Prensa', 'Sala de prensa del 50 aniversario',
                  'Notas de prensa, logotipos y material gráfico del 50 aniversario de FVEM (1977–2027).'),
}
# Solo se crean páginas de lo que la web enseña: el directorio de empresas siempre, y el resto de secciones
# (y las citas de la agenda) solo si están en el menú de config.js. Así no se indexa contenido de ejemplo.
MENU = C.get('menu') or []
VISIBLES = [k for k in SECCIONES if k == 'empresas' or k in MENU]
if 'agenda' not in VISIBLES: EVENTOS = []
HOME_DESC = (f'FVEM cumple 50 años (1977–2027). Agenda del aniversario, las {nf(N_EMP)} empresas asociadas del metal de Bizkaia '
             'y su historia. 50 años con la industria.')

def desc_empresa(e):
    s = short_name(e['nombre'])
    if e.get('descripcion_es'):
        base = e['descripcion_es'].rstrip('.') + '.'
        return corta(f'{s}, empresa asociada a FVEM desde {e["anio_alta"]} ({e["municipio"]}). {base}')
    sl = (e.get('sector_largo') or '').lower()
    ambito = ('del ámbito de ' + re.sub(r'^fabricación de ', 'la fabricación de ', sl)) if sl else 'del metal'
    pl = f' y cuenta con una plantilla en Bizkaia de {nf(e["plantilla"])} personas' if isinstance(e.get('plantilla'), (int, float)) and e['plantilla'] > 1 else ''
    return corta(f'{s} es una empresa {ambito}, con sede en {e["municipio"]}. Forma parte de FVEM desde {e["anio_alta"]}{pl}.')

def es_fundadora(e):
    return bool(e['fundadora']) if e.get('fundadora') is not None else e['anio_alta'] == 1977

# ---------- imágenes para redes (1200 × 630) ----------
def preparar_imagenes():
    global Image, ImageDraw, ImageFont, np, FUENTES, LOGO_FV
    from PIL import Image, ImageDraw, ImageFont
    import numpy as np
    from fontTools.ttLib import TTFont
    FUENTES = {}
    for w in (300, 400, 500, 600):
        f = TTFont(os.path.join(PUB, f'assets/fonts/geist-latin-{w}-normal.woff2')); f.flavor = None
        b = io.BytesIO(); f.save(b); FUENTES[w] = b.getvalue()
    LOGO_FV = Image.open(os.path.join(PUB, 'assets/img/logo-50fvem.png')).convert('RGBA')

def fuente(w, s):
    return ImageFont.truetype(io.BytesIO(FUENTES[w]), s)

FONDO = None
def fondo(W, H):
    global FONDO
    if FONDO is None:  # brillo cobre muy tenue arriba a la derecha (como la tarjeta para redes de la web)
        yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
        d = np.sqrt(((xx - W * .86) / W) ** 2 + ((yy - H * .05) / W) ** 2) / 1.0
        stops = [(0, (0x3b, 0x22, 0x14)), (.42, (0x12, 0x10, 0x10)), (1, (0x07, 0x07, 0x07))]
        out = np.zeros((H, W, 3), np.float32)
        for (a, ca), (b, cb) in zip(stops, stops[1:]):
            m = (d >= a) & (d <= b); t = ((d - a) / (b - a))[m][:, None]
            out[m] = np.array(ca) * (1 - t) + np.array(cb) * t
        out[d > 1] = stops[-1][1]
        FONDO = Image.fromarray(out.astype(np.uint8), 'RGB')
    return FONDO.copy()

def espaciado(d, xy, txt, f, fill, track):
    x, y = xy
    for ch in txt:
        d.text((x, y), ch, font=f, fill=fill); x += d.textlength(ch, font=f) + track
    return x

def imagen_empresa(e, destino):
    W, H, M = 1200, 630, 72
    im = fondo(W, H); d = ImageDraw.Draw(im)
    # logo FVEM 50
    h = 64; lf = LOGO_FV.resize((round(LOGO_FV.width * h / LOGO_FV.height), h), Image.LANCZOS); im.paste(lf, (M, 56), lf)
    # logo de la empresa (mancheta blanca, u oscura si el logo es claro)
    lg = None
    if e.get('logo'):
        p = os.path.join(PUB, e['logo'])
        if os.path.exists(p):
            try: lg = Image.open(p).convert('RGBA')
            except Exception: lg = None
    bw, bh = 330, 210
    maxw = W - 2 * M - (bw + 48 if lg else 0)
    # nombre (Geist 600), hasta 3 líneas
    nombre = short_name(e['nombre'])
    for fs in range(78, 38, -4):
        f = fuente(600, fs); lineas, l = [], ''
        for w in nombre.split():
            t = (l + ' ' + w).strip()
            if d.textlength(t, font=f) > maxw and l: lineas.append(l); l = w
            else: l = t
        lineas.append(l)
        alto = len(lineas) * fs * 1.04 + 84   # nombre + raya + municipio: debe caber antes del bloque «Socia desde»
        if len(lineas) <= 3 and alto <= 222 and all(d.textlength(x, font=f) <= maxw for x in lineas): break
    y = 166
    for i, x in enumerate(lineas):
        d.text((M - 3, y + i * fs * 1.04), x, font=f, fill='#f5f2eb')
    y += len(lineas) * fs * 1.04 + 22
    d.rectangle([M, y, M + 64, y + 5], fill='#d86b33')
    y += 26
    sub = e['municipio'] + (' · ' + e['sector_largo'] if e.get('sector_largo') else '')
    f = fuente(400, 26)
    while d.textlength(sub, font=f) > maxw and ' · ' in sub: sub = sub.rsplit(' · ', 1)[0]
    d.text((M, y), sub, font=f, fill='#b2aca2')
    # bloque inferior: socia desde + año en cobre
    yb = 408
    espaciado(d, (M, yb), 'SOCIA DE FVEM DESDE', fuente(500, 19), '#b2aca2', 3.2)
    d.text((M - 6, yb + 18), str(e['anio_alta']), font=fuente(300, 112), fill='#d86b33')
    anios = 2027 - e['anio_alta']
    xr = M + d.textlength(str(e['anio_alta']), font=fuente(300, 112)) + 30
    d.text((xr, yb + 62), f'{anios} años con FVEM', font=fuente(400, 26), fill='#f5f2eb')
    if es_fundadora(e):
        d.ellipse([xr + 1, yb + 107, xr + 11, yb + 117], fill='#d86b33')
        d.text((xr + 22, yb + 98), 'Empresa fundadora · 1977', font=fuente(600, 22), fill='#d86b33')
    # pie
    d.rectangle([M, H - 64, W - M, H - 64], fill='#3a3633')
    d.text((M, H - 50), '1977 – 2027 · 50 años con la industria · 50 urte industriarekin', font=fuente(500, 20), fill='#b2aca2')
    d.text((W - M, H - 50), '50.fvem.es', font=fuente(500, 20), fill='#b2aca2', anchor='ra')
    if lg:
        oscuro = e.get('logo_fondo') == 'oscuro'
        bx, by = W - M - bw, 172
        d.rounded_rectangle([bx, by, bx + bw, by + bh], 22, fill='#141414' if oscuro else '#ffffff', outline='#3a3a3a' if oscuro else None, width=2)
        pad = 32; sc = min((bw - 2 * pad) / lg.width, (bh - 2 * pad) / lg.height)
        l2 = lg.resize((max(1, round(lg.width * sc)), max(1, round(lg.height * sc))), Image.LANCZOS)
        im.paste(l2, (bx + (bw - l2.width) // 2, by + (bh - l2.height) // 2), l2)
    im.save(destino, 'JPEG', quality=82, optimize=True, progressive=True)

# ---------- generar ----------
def main():
    rutas = []
    # limpia lo generado antes (empresas que causan baja, citas que cambian de nombre)
    for carpeta in ['agenda', 'empresas'] + list(SECCIONES):
        p = os.path.join(PUB, carpeta)
        if os.path.isdir(p): shutil.rmtree(p)
    og_dir = os.path.join(PUB, 'assets/img/og/empresas')
    if not SIN_IMAGENES:
        preparar_imagenes()
        if os.path.isdir(og_dir): shutil.rmtree(og_dir)
        os.makedirs(og_dir)

    # portada
    enl = [(SECCIONES[k][1], f'/{k}/') for k in VISIBLES]
    rutas.append(pagina('/', 'FVEM · 50 años con la industria', HOME_DESC, 'home',
        bloque('1977 – 2027 · Bizkaiko industria', '50 años con la industria',
               [HOME_DESC, 'Pasado que impulsa · Futuro que construimos.', '50 urte industriarekin · Bultzatzen duen iragana · Eraikitzen dugun etorkizuna.'], enl)))

    # secciones
    for k in VISIBLES:
        titulo, nav, h1, desc = SECCIONES[k]
        enlaces = []
        if k == 'agenda': enlaces = [(ev['titulo']['es'], f'/agenda/{ev["slug"]}/') for ev in EVENTOS]
        if k == 'empresas': enlaces = [(short_name(e['nombre']), f'/empresas/{e["num_asociada"]}/') for e in sorted(EMP, key=lambda e: e['nombre'])]
        rutas.append(pagina(f'/{k}/', titulo, desc, k, bloque(nav, h1, [desc], enlaces),
                            datos_ld=[migas(('Inicio', '/'), (nav, f'/{k}/'))]))

    # citas de la agenda
    for ev in EVENTOS:
        t = ev['titulo']['es']
        fecha = ''
        try:
            dt = datetime.datetime.fromisoformat(ev['ini'])
            meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
            fecha = f'{meses[dt.month - 1]} de {dt.year}' if ev.get('soloMes') else f'{dt.day} de {meses[dt.month - 1]} de {dt.year}'
        except Exception: pass
        lugar = (ev.get('lugar') or {}).get('es', '')
        desc = corta(' · '.join(x for x in [fecha.capitalize(), lugar] if x) + '. ' + (ev.get('desc') or {}).get('es', ''))
        rutas.append(pagina(f'/agenda/{ev["slug"]}/', f'{t} · FVEM 50', desc, 'evento',
                            bloque('Agenda 2027', t, [desc], [('Toda la agenda del 50 aniversario', '/agenda/')]),
                            datos_ld=[migas(('Inicio', '/'), ('Agenda', '/agenda/'), (t, f'/agenda/{ev["slug"]}/'))]))

    # empresas
    for i, e in enumerate(EMP):
        n = e['num_asociada']; s = short_name(e['nombre']); desc = desc_empresa(e)
        img = None
        if not SIN_IMAGENES:
            imagen_empresa(e, os.path.join(og_dir, f'{n}.jpg'))
        if os.path.exists(os.path.join(og_dir, f'{n}.jpg')):
            img = f'{SITIO}/assets/img/og/empresas/{n}.jpg'
        org = {'@type': 'Organization', 'name': e['nombre'], 'alternateName': s,
               'address': {'@type': 'PostalAddress', 'addressLocality': e['municipio'], 'addressRegion': 'Bizkaia', 'addressCountry': 'ES',
                           **({'streetAddress': e['direccion']} if e.get('direccion') else {}), **({'postalCode': e['cp']} if e.get('cp') else {})},
               'memberOf': {'@id': 'https://www.fvem.es/#org'}}
        if e.get('web'): org['url'] = e['web']
        if e.get('logo'): org['logo'] = SITIO + '/' + e['logo']
        if e.get('descripcion_es'): org['description'] = e['descripcion_es']
        datos_hechos = [f'Asociada a FVEM desde {e["anio_alta"]} · {e["municipio"]}' + (f' · {e["sector_largo"]}' if e.get('sector_largo') else '')]
        enl = [('Web de la empresa', e['web'])] if e.get('web') else []
        enl.append(('Todas las empresas asociadas', '/empresas/'))
        rutas.append(pagina(f'/empresas/{n}/', f'{s} · FVEM 50', desc, 'ficha',
                            bloque('Empresa asociada a FVEM', s, [desc] + datos_hechos, enl),
                            imagen=img, imagen_alt=f'{s} · Socia de FVEM desde {e["anio_alta"]}', tipo='website',
                            titulo_redes=f'{s} · {2027 - e["anio_alta"]} años con FVEM',
                            datos_ld=[org, migas(('Inicio', '/'), ('Empresas', '/empresas/'), (s, f'/empresas/{n}/'))]))
        if not SIN_IMAGENES and i % 100 == 0: print(f'  {i}/{len(EMP)} imágenes…', flush=True)

    # sitemap
    prio = lambda r: '1.0' if r == '/' else ('0.8' if r.count('/') == 2 else '0.6')
    xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    xml += [f'  <url><loc>{SITIO}{r}</loc><lastmod>{HOY}</lastmod><priority>{prio(r)}</priority></url>' for r in rutas]
    xml.append('</urlset>')
    open(os.path.join(PUB, 'sitemap.xml'), 'w', encoding='utf-8').write('\n'.join(xml) + '\n')
    print(f'{len(rutas)} páginas · {len(EMP)} empresas · {len(EVENTOS)} citas · sitemap.xml actualizado')

if __name__ == '__main__':
    main()
