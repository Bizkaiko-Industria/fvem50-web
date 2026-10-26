"""Convierte el Excel de asociadas de FVEM en public/assets/js/empresas.js.

Uso:  python3 herramientas/convertir_asociadas.py ruta/al/excel.xlsx

- Solo se publican columnas públicas. NUNCA se publican el NIF ni la columna Pyme.
- A los autónomos (NIF de persona física) no se les publica la dirección, solo el municipio.
- Unifica nombres de municipio y traduce los subsectores al euskera.
- Las fechas del Excel vienen en hora UTC: se pasan a hora de Bilbao.
"""
import json, re, sys, unicodedata
from datetime import datetime, timezone
from zoneinfo import ZoneInfo
import openpyxl

MAD = ZoneInfo('Europe/Madrid')
key = lambda s: re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFKD', str(s)).encode('ascii', 'ignore').decode().lower())

MUNI = {  # variantes del Excel -> nombre oficial
 'abadiano': 'Abadiño', 'abadino': 'Abadiño', 'abanto': 'Abanto-Zierbena', 'abantoyciervana': 'Abanto-Zierbena', 'abantoyzierbena': 'Abanto-Zierbena',
 'abantozierbena': 'Abanto-Zierbena', 'abantoziervana': 'Abanto-Zierbena', 'gallarta': 'Abanto-Zierbena', 'lascarreras': 'Abanto-Zierbena',
 'algorta': 'Getxo', 'lasarenas': 'Getxo', 'alonsotegui': 'Alonsotegi', 'amorebieta': 'Amorebieta-Etxano', 'eubaamorebieta': 'Amorebieta-Etxano',
 'apatamonasterio': 'Atxondo', 'arrancudiaga': 'Arrankudiaga', 'asua': 'Erandio', 'asuaerandio': 'Erandio', 'galdakano': 'Galdakao',
 'gernika': 'Gernika-Lumo', 'guernica': 'Gernika-Lumo', 'gernikalumo': 'Gernika-Lumo', 'izurza': 'Izurtza', 'leioalamiako': 'Leioa', 'lejona': 'Leioa',
 'lemona': 'Lemoa', 'llodio': 'Laudio/Llodio', 'lujua': 'Loiu', 'markina': 'Markina-Xemein', 'mananria': 'Mañaria', 'manaria': 'Mañaria',
 'miravalles': 'Ugao-Miraballes', 'ugaomiraballes': 'Ugao-Miraballes', 'mugica': 'Muxika', 'munguia': 'Mungia', 'orduna': 'Urduña/Orduña',
 'sodupe': 'Güeñes', 'sondica': 'Sondika', 'sopelana': 'Sopela', 'trapaga': 'Valle de Trápaga-Trapagaran', 'trapagaran': 'Valle de Trápaga-Trapagaran',
 'valledetrapaga': 'Valle de Trápaga-Trapagaran', 'valledetrapagatrapa': 'Valle de Trápaga-Trapagaran', 'usansologaldakao': 'Usansolo',
}
SECT = {  # subsector del Excel -> (corto es, corto eu, largo es, largo eu)
 'FABRICACIÓN DE PRODUCTOS METALICOS': ('Productos metálicos', 'Produktu metalikoak', 'Fabricación de productos metálicos', 'Produktu metalikoen fabrikazioa'),
 'INSTALACIONES Y MONTAJES METALICOS': ('Instalaciones y montajes', 'Instalazioak eta muntaketak', 'Instalaciones y montajes metálicos', 'Instalazio eta muntaketa metalikoak'),
 'COMERCIO Y SERVICIOS DEL METAL': ('Comercio y servicios', 'Merkataritza eta zerbitzuak', 'Comercio y servicios del metal', 'Metalaren merkataritza eta zerbitzuak'),
 'FABRICACIÓN DE MAQUINARIA': ('Maquinaria', 'Makineria', 'Fabricación de maquinaria', 'Makineriaren fabrikazioa'),
 'FABRICACIÓN DE MAQUINARIA Y MATERIAL ELÉCTRICO Y ELECTRONICO': ('Material eléctrico y electrónico', 'Material elektriko eta elektronikoa', 'Fabricación de maquinaria y material eléctrico y electrónico', 'Makineria eta material elektriko eta elektronikoaren fabrikazioa'),
 'INDUSTRIAS BÁSICAS SIDERÚRGICAS': ('Siderurgia', 'Siderurgia', 'Industrias básicas siderúrgicas', 'Oinarrizko siderurgia-industriak'),
 'MATRICERÍA-TROQUELERÍA': ('Matricería y troquelería', 'Matrizegintza eta trokelgintza', 'Matricería-troquelería', 'Matrizegintza eta trokelgintza'),
 'FABRICACION DE MATERIAL DE TRANSPORTE': ('Material de transporte', 'Garraio-materiala', 'Fabricación de material de transporte', 'Garraio-materialaren fabrikazioa'),
}
LOWER = {'de', 'la', 'del', 'y', 'el'}
def title(s):
    r = ''.join(w if (w in LOWER or not w.strip() or w == '-') else w[:1].upper() + w[1:] for w in re.split(r'(\s+|-|/)', s.strip().lower()))
    return r[:1].upper() + r[1:]
def muni(loc):
    m = re.match(r'^\s*(\d{5})\s*-?\s*(.*)$', str(loc or '').strip()); cp, n = (m.group(1), m.group(2)) if m else ('', str(loc or ''))
    return cp, MUNI.get(key(n), title(n))
def fecha(v):
    if not v: return None
    if isinstance(v, datetime): d = v if v.tzinfo else v.replace(tzinfo=timezone.utc)
    else: d = datetime.fromisoformat(re.sub(r'\.(\d{6})\d*', r'.\1', str(v).strip().replace('Z', '+00:00')))
    return (d if d.tzinfo else d.replace(tzinfo=timezone.utc)).astimezone(MAD).date()
def web(v):
    v = str(v or '').strip()
    return '' if not v or v.lower() in ('none', '-') else 'https://' + re.sub(r'^https?://', '', v, flags=re.I).rstrip('/')
persona_fisica = lambda nif: bool(re.match(r'^[0-9XYZKLM]', str(nif or '').strip().upper()))

wb = openpyxl.load_workbook(sys.argv[1], data_only=True); ws = wb.active
rows = [r for r in ws.iter_rows(values_only=True)]; H = [key(h) for h in rows[0]]
col = lambda *n: next((H.index(key(x)) for x in n if key(x) in H), None)
c = dict(num=col('Cod'), nif=col('NIF'), nom=col('Empresa'), zona=col('Zona'), sec=col('SubSector', 'Sector'), dir=col('Dirección'),
         loc=col('Localidad'), pl=col('Plantilla'), web=col('Web'), alta=col('F. Alta'), baja=col('F. Baja'))
emp, avisos = [], []
for r in rows[1:]:
    if not r or not r[c['nom']]: continue
    g = lambda k: r[c[k]] if c[k] is not None else None
    num = str(g('num') or '').strip(); num = num.zfill(5) if num.isdigit() else num
    cp, mu = muni(g('loc')); fa = fecha(g('alta')); s = SECT.get(str(g('sec') or '').strip().upper())
    if g('sec') and not s: avisos.append(f'subsector sin traducir: {g("sec")}')
    pf = persona_fisica(g('nif'))
    pl = g('pl'); pl = int(pl) if isinstance(pl, (int, float)) else None
    emp.append(dict(num_asociada=num, nombre=str(g('nom')).strip(), zona=title(str(g('zona') or '')),
        direccion='' if pf else str(g('dir') or '').strip(), cp=cp, municipio=mu, plantilla=pl, web=web(g('web')),
        fecha_alta=fa.isoformat() if fa else None, anio_alta=fa.year if fa else None,
        anio_baja=(fecha(g('baja')).year if c['baja'] is not None and g('baja') else None),
        fundadora=bool(fa and fa.year == 1977), sector=s[0] if s else '', sector_largo=s[2] if s else '',
        logo='', foto='', foto_historica='', descripcion_es='', descripcion_eu='', producto_es='', producto_eu='', frase_es='', frase_eu=''))
out = {'empresas': emp, 'sectores_eu': {v[0]: v[1] for v in SECT.values()}, 'sectores_largo_eu': {v[2]: v[3] for v in SECT.values()}}
open('public/assets/js/empresas.js', 'w').write('/* Listado de empresas asociadas · generado con herramientas/convertir_asociadas.py (solo columnas públicas) */\n'
    'window.FVEM50_EMPRESAS = ' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(len(emp), 'empresas ·', sum(e['plantilla'] or 0 for e in emp), 'personas ·', sum(e['fundadora'] for e in emp), 'fundadoras ·',
      sum(1 for e in emp if not e['direccion']), 'sin dirección publicada ·', len({e['municipio'] for e in emp}), 'municipios')
print('\n'.join(sorted(set(avisos))) or 'sin avisos')
