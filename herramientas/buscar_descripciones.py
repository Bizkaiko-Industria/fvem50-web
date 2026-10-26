"""Recoge la descripción que cada empresa publica en su propia web (meta description,
og:description o datos estructurados) para redactar un resumen de su actividad.
Se ejecuta en GitHub Actions. Resultado: herramientas/descripciones_web.json (para revisar)."""
import json, re
from concurrent.futures import ThreadPoolExecutor
import requests
from bs4 import BeautifulSoup

S = requests.Session()
S.headers.update({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
                  'Accept-Language': 'es-ES,es;q=0.9,eu;q=0.8,en;q=0.5'})
src = open('public/assets/js/empresas.js', encoding='utf-8').read()
emp = [e for e in json.loads(src[src.index('=') + 1:].strip().rstrip(';'))['empresas'] if e.get('web')]

def limpia(t):
    return re.sub(r'\s+', ' ', (t or '')).strip()

def una(e):
    r = {'num': e['num_asociada'], 'nombre': e['nombre'], 'web': e['web']}
    try:
        h = S.get(e['web'], timeout=15)
        soup = BeautifulSoup(h.text, 'lxml')
        cands = []
        for sel, attr in (({'name': 'description'}, 'content'), ({'property': 'og:description'}, 'content'), ({'name': 'twitter:description'}, 'content')):
            m = soup.find('meta', attrs=sel)
            if m and m.get(attr): cands.append(limpia(m[attr]))
        for sc in soup.find_all('script', type='application/ld+json'):
            try:
                j = json.loads(sc.string or '')
                for x in (j if isinstance(j, list) else [j]):
                    if isinstance(x, dict) and isinstance(x.get('description'), str): cands.append(limpia(x['description']))
            except Exception:
                pass
        # primer párrafo largo como último recurso
        for p in soup.find_all('p'):
            t = limpia(p.get_text(' '))
            if 90 <= len(t) <= 600 and 'cookie' not in t.lower():
                cands.append(t); break
        r['lang'] = (soup.html.get('lang') if soup.html else '') or ''
        r['candidatos'] = list(dict.fromkeys(c for c in cands if c))[:4]
    except Exception as ex:
        r['error'] = type(ex).__name__
    return r

with ThreadPoolExecutor(16) as pool:
    res = sorted(pool.map(una, emp), key=lambda x: x['num'])
json.dump(res, open('herramientas/descripciones_web.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(sum(1 for r in res if r.get('candidatos')), 'con texto de', len(res))
