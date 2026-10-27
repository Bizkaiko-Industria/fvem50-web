"""Busca el logotipo de cada empresa asociada en su propia web y lo guarda optimizado.

Se ejecuta en GitHub Actions (.github/workflows/logos.yml), no en la web pública.
Resultado:
  - herramientas/logos_candidatos/<num>.png   (logo recortado y reducido, para revisar)
  - herramientas/logos_resultado.json          (de dónde salió cada logo y con qué método)
Los logos NO se publican hasta que se revisan y se copian a public/assets/img/empresas/.
"""
import base64, io, json, os, re, sys, time
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from PIL import Image, ImageChops

try:
    import cairosvg
except Exception:  # sin cairo no se pueden convertir SVG
    cairosvg = None

# Reintento: si existe herramientas/logos_reintentar.txt, solo se buscan esas empresas y el resultado va a archivos aparte
REINTENTO = os.path.exists('herramientas/logos_reintentar.txt')
OUT = 'herramientas/logos_candidatos_reintento' if REINTENTO else 'herramientas/logos_candidatos'
RES = 'herramientas/logos_resultado_reintento.json' if REINTENTO else 'herramientas/logos_resultado.json'
os.makedirs(OUT, exist_ok=True)
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
S = requests.Session(); S.headers.update({'User-Agent': UA, 'Accept-Language': 'es-ES,es;q=0.9,eu;q=0.8'})
TIMEOUT = 25 if REINTENTO else 15
MAXW, MAXH = 480, 240

src = open('public/assets/js/empresas.js', encoding='utf-8').read()
data = json.loads(src[src.index('=') + 1:].strip().rstrip(';'))
empresas = [e for e in data['empresas'] if e.get('web')]
if REINTENTO:
    nums = {l.strip() for l in open('herramientas/logos_reintentar.txt', encoding='utf-8') if l.strip() and not l.startswith('#')}
    empresas = [e for e in empresas if e['num_asociada'] in nums]
    import urllib3; urllib3.disable_warnings()


def get(url, **kw):
    """Descarga con tolerancia: si el certificado HTTPS de la web está mal configurado, lo reintenta sin verificarlo
    (solo se leen páginas e imágenes públicas, no se envía ningún dato)."""
    try:
        return S.get(url, timeout=TIMEOUT, **kw)
    except requests.exceptions.SSLError:
        if not REINTENTO: raise
        return S.get(url, timeout=TIMEOUT, verify=False, **kw)


def variantes(web):
    """La web tal cual y, en el reintento, con/sin www y con http/https."""
    u = urlparse(web if '://' in web else 'http://' + web)
    host = u.netloc; sin = host[4:] if host.startswith('www.') else host
    out = [web]
    if REINTENTO:
        for sch in ('https', 'http'):
            for h in (sin, 'www.' + sin):
                v = f'{sch}://{h}{u.path or "/"}'
                if v not in out: out.append(v)
    return out
if len(sys.argv) > 1:
    empresas = empresas[:int(sys.argv[1])]


def candidatos(html, base):
    soup = BeautifulSoup(html, 'lxml')
    out = []  # (puntuación, tipo, url_o_svg, metodo)
    # 1) datos estructurados Organization.logo
    for sc in soup.find_all('script', type='application/ld+json'):
        try:
            j = json.loads(sc.string or '')
        except Exception:
            continue
        stack = j if isinstance(j, list) else [j]
        while stack:
            x = stack.pop()
            if isinstance(x, dict):
                lg = x.get('logo')
                if isinstance(lg, dict): lg = lg.get('url') or lg.get('contentUrl')
                if isinstance(lg, str) and lg: out.append((95, 'url', urljoin(base, lg), 'jsonld'))
                stack.extend(v for v in x.values() if isinstance(v, (dict, list)))
            elif isinstance(x, list):
                stack.extend(x)
    # 2) imágenes con «logo» en la propia etiqueta o en sus contenedores
    for img in soup.find_all('img'):
        url = img.get('src') or ''
        for attr in ('data-src', 'data-lazy-src', 'data-original'):
            if img.get(attr): url = img.get(attr)
        if not url and img.get('srcset'): url = img.get('srcset').split(',')[0].split()[0]
        if not url: continue
        own = ' '.join([url, img.get('alt') or '', ' '.join(img.get('class') or []), img.get('id') or '']).lower()
        ctx, p, depth = '', img.parent, 0
        while p is not None and depth < 4:
            ctx += ' ' + ' '.join(p.get('class') or []) + ' ' + (p.get('id') or '') + ' ' + p.name
            p, depth = p.parent, depth + 1
        ctx = ctx.lower()
        score = 0
        if 'logo' in own: score = 85
        elif 'logo' in ctx or 'brand' in ctx: score = 75
        if score and ('header' in ctx or 'nav' in ctx): score += 5
        if score and any(w in own for w in ('footer', 'partner', 'cliente', 'client', 'certific', 'iso', 'feder', 'kit-digital', 'kitdigital', 'ue-', 'europa', 'gobierno')): score -= 40
        if score > 0: out.append((score, 'url', urljoin(base, url), 'img'))
    # 3) SVG en línea dentro de un contenedor «logo»
    for svg in soup.find_all('svg'):
        ctx, p, depth = ' '.join(svg.get('class') or []) + ' ' + (svg.get('id') or ''), svg.parent, 0
        while p is not None and depth < 3:
            ctx += ' ' + ' '.join(p.get('class') or []) + ' ' + (p.get('id') or ''); p, depth = p.parent, depth + 1
        if 'logo' in ctx.lower() and len(str(svg)) > 400:
            s = str(svg)
            if 'xmlns=' not in s: s = s.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"', 1)
            out.append((70, 'svg', s, 'svg-inline'))
    # 4) iconos de la web (último recurso: suelen ser solo el símbolo)
    for ln in soup.find_all('link'):
        rel = ' '.join(ln.get('rel') or []).lower()
        if 'apple-touch-icon' in rel and ln.get('href'): out.append((30, 'url', urljoin(base, ln['href']), 'apple-touch-icon'))
    og = soup.find('meta', property='og:image')
    if og and og.get('content') and 'logo' in og['content'].lower(): out.append((60, 'url', urljoin(base, og['content']), 'og-image-logo'))
    seen, res = set(), []
    for c in sorted(out, key=lambda x: -x[0]):
        if c[2] in seen: continue
        seen.add(c[2]); res.append(c)
    return res[:6]


def a_imagen(kind, val):
    if kind == 'svg':
        if not cairosvg: return None
        return Image.open(io.BytesIO(cairosvg.svg2png(bytestring=val.encode('utf-8'), output_width=900)))
    if val.startswith('data:'):
        head, b64 = val.split(',', 1)
        raw = base64.b64decode(b64) if ';base64' in head else requests.utils.unquote(b64).encode()
        if 'svg' in head:
            return Image.open(io.BytesIO(cairosvg.svg2png(bytestring=raw, output_width=900))) if cairosvg else None
        return Image.open(io.BytesIO(raw))
    r = get(val); r.raise_for_status()
    ct = r.headers.get('content-type', '').lower()
    if 'svg' in ct or val.lower().split('?')[0].endswith('.svg'):
        return Image.open(io.BytesIO(cairosvg.svg2png(bytestring=r.content, output_width=900))) if cairosvg else None
    return Image.open(io.BytesIO(r.content))


def limpiar(im):
    im = im.convert('RGBA')
    bbox = im.getchannel('A').getbbox()
    if bbox: im = im.crop(bbox)
    # recortar fondo blanco liso (logos en JPG)
    rgb = im.convert('RGB'); bg = Image.new('RGB', rgb.size, (255, 255, 255))
    diff = ImageChops.difference(rgb, bg).convert('L').point(lambda v: 255 if v > 18 else 0)
    alpha = im.getchannel('A').point(lambda v: 255 if v > 10 else 0)
    bbox = ImageChops.multiply(diff, alpha).getbbox()
    if bbox: im = im.crop(bbox)
    im.thumbnail((MAXW, MAXH), Image.LANCZOS)
    return im


def info(im):
    a = im.getchannel('A'); px = [p for p, al in zip(im.convert('L').getdata(), a.getdata()) if al > 128]
    luz = sum(px) / len(px) if px else 0
    transparente = a.getextrema()[0] < 250
    return dict(ancho=im.width, alto=im.height, claro=bool(transparente and luz > 225), transparente=transparente)


def procesa(e):
    num, web = e['num_asociada'], e['web']
    res = dict(num=num, nombre=e['nombre'], web=web, estado='sin_logo')
    try:
        r, ult = None, None
        for v in variantes(web):
            try:
                r = get(v, allow_redirects=True)
                if r.status_code < 400: break
            except Exception as ex:
                ult = ex
        if r is None: raise ult
        res['web_final'] = r.url
        if r.status_code >= 400:
            res['estado'] = f'web_error_{r.status_code}'; return res
        cands = candidatos(r.text, r.url)
        res['candidatos'] = len(cands)
        for score, kind, val, metodo in cands:
            try:
                im = a_imagen(kind, val)
                if im is None: continue
                im = limpiar(im)
                if im.width < 40 or im.height < 12: continue
                ratio = im.width / max(1, im.height)
                if ratio > 12: continue
                im.save(f'{OUT}/{num}.png', optimize=True)
                res.update(estado='ok', metodo=metodo, puntuacion=score, origen=val if kind == 'url' else 'svg en línea', **info(im))
                return res
            except Exception as ex:
                res.setdefault('errores', []).append(f'{metodo}: {type(ex).__name__}')
    except Exception as ex:
        res['estado'] = 'web_inaccesible'; res['error'] = type(ex).__name__
    return res


t0 = time.time(); resultados = []
with ThreadPoolExecutor(max_workers=16) as pool:
    futs = {pool.submit(procesa, e): e for e in empresas}
    for i, f in enumerate(as_completed(futs), 1):
        resultados.append(f.result())
        if i % 50 == 0: print(f'{i}/{len(empresas)} · {time.time() - t0:.0f}s', flush=True)
resultados.sort(key=lambda x: x['num'])
json.dump(resultados, open(RES, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
from collections import Counter
print(Counter(r['estado'] if not r['estado'].startswith('web_error') else 'web_error' for r in resultados))
print(Counter(r.get('metodo') for r in resultados if r['estado'] == 'ok'))
