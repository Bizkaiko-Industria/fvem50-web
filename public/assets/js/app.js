(() => {
'use strict';
const C = window.FVEM50;
const RAW = window.FVEM50_EMPRESAS || JSON.parse(document.getElementById('data').textContent);
const LOGO = window.__LOGO || 'assets/img/logo-50fvem.png';
const FORMS = C.formularios || {}, LEGAL = C.legal || {};
const ANIV = 2027, FUND = 1977;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- tiempo (se puede simular con ?ahora=2027-10-28T20:20) ---------- */
const SIM = (() => { const q = new URLSearchParams(location.search).get('ahora'); const d = q && new Date(q.length <= 16 ? q + ':00+02:00' : q); return d && !isNaN(d) ? d - Date.now() : 0; })();
const NOW = () => new Date(Date.now() + SIM);

/* ---------- textos ---------- */
const T = {
 es: {
  demo:'Vista previa · agenda, programa y personas con contenido de ejemplo',
  nav_ag:'Agenda',nav_pr:'Programa',nav_em:'Empresas',nav_hi:'Historia',nav_pe:'Personas',nav_pa:'Participa',nav_ps:'Prensa',home:'Inicio',
  cta_before:'Inscríbete a la gala',cta_live:'Ver en directo',cta_after:'Ver la galería',
  h1a:'50 años',h1b:'de industria',lema:'Pasado que impulsa · Futuro que construimos',watch:'Ver el vídeo',agenda27:'Agenda 2027',scroll:'Desliza',
  sound_on:'Activar sonido',sound_off:'Silenciar',pause:'Pausar animación',
  video_pend:'El vídeo completo se publicará aquí.',
  cd_before:'Faltan para la',days:'Días',hours:'Horas',mins:'Min',secs:'Seg',years:'Años',
  add_cal:'Añadir a mi calendario',see_prog:'Ver programa',next_cita:'Próxima cita',live_now:'En directo ahora',next_s:'A continuación',
  thanks:'Gracias. 50 años y seguimos.',thanks_s:'Revive la gala y todos los actos del aniversario.',
  up_k:'Agenda 2027',up_h:'Próximas citas',up_all:'Ver toda la agenda',
  st_k:'En cifras',st_h:'Las empresas que hacen la industria de Bizkaia',st_emp:'Empresas asociadas',st_pl:'Personas',st_mun:'Municipios',st_y:'Años',
  st_note:'Datos calculados a partir del listado de asociadas (parcial en esta vista previa).',
  se_h:'Busca una empresa',se_ph:'Nombre, municipio o nº de asociada',se_all:'Ver los {n} resultados',se_none:'No hay empresas con esos criterios.',
  hi_k:'1977 → 2027',hi_h:'Medio siglo en una línea',hi_p:'De las primeras socias de 1977 a las que se han sumado este mismo año. Desliza la foto para comparar ayer y hoy.',hi_more:'Recorrer la historia',
  yesterday:'Ayer',today:'Hoy',ph_pend:'Foto pendiente',
  pe_k:'Personas que hacen industria',pe_h:'Detrás de cada empresa, personas',pe_p:'Talento, experiencia, diversidad, innovación y compromiso: historias cortas de quienes trabajan en las asociadas.',pe_all:'Ver todas las historias',
  portrait_pend:'Retrato pendiente',
  pa_h:'¿Tu empresa es asociada?',pa_p:'Envíanos tu logo, una foto antigua y tu mensaje para el 50 aniversario. Lo publicaremos en tu ficha.',pa_btn:'Participa',
  nl_h:'Recibe la agenda en tu correo',nl_p:'Conoce las citas más destacadas de este aniversario.',nl_ph:'Tu correo electrónico',nl_btn:'Suscribirme',nl_ok:'Vista previa: la suscripción se conectará con el sistema de FVEM.',
  ft_lema:'50 años de industria. Pasado que impulsa, futuro que construimos.',ft_an:'Aniversario',ft_em:'Empresas',ft_fv:'FVEM',ft_sp:'Patrocinadores y colaboradores',ft_spx:'Logo',ft_legal:'Aviso legal',ft_priv:'Política de privacidad',ft_cook:'Política de cookies',ft_terms:'Términos y condiciones de uso',ft_data:'Condiciones generales sobre protección de datos',ft_acc:'Accesibilidad',ck_title:'Cookies de analítica',ck_text:'Usamos Google Analytics para saber cuántas personas visitan esta web y mejorarla. Solo se activa si lo aceptas; puedes cambiar de opinión en cualquier momento desde «Configurar cookies», al pie de la página.',ck_more:'Política de cookies',ck_yes:'Aceptar',ck_no:'Rechazar',ck_cfg:'Configurar cookies',ft_web:'Web de FVEM',ft_contact:'Contacto',
  ag_p:'Todos los actos del 50 aniversario en un solo lugar. Las fechas y lugares son de ejemplo hasta que se confirmen.',all:'Todos',v_list:'Lista',v_cal:'Calendario',
  s_open:'Inscripción abierta',s_soon:'Próximamente',s_full:'Completo',s_past:'Celebrado',s_live:'En directo',s_free:'Entrada libre',
  ev_when:'Fecha',ev_time:'Hora',ev_where:'Lugar',ev_type:'Tipo',ev_reg:'Inscribirme',ev_reg_soon:'Inscripción próximamente',ev_route:'Cómo llegar',ev_share:'Compartir',ev_left:'Faltan',
  ev_prog:'Programa del acto',ev_prog_all:'Ver el programa completo',ev_more:'Más citas del aniversario',ev_after:'Galería y vídeo disponibles después del acto.',
  pr_p:'Hora a hora, el acto central del 50 aniversario. Durante el evento, la sesión en curso se marca sola.',pr_pdf:'Descargar PDF',pr_speakers:'Intervienen',now:'Ahora',
  em_h:'Empresas asociadas',em_p:'Busca por nombre, municipio o nº de asociada y filtra por zona, municipio, tamaño o década de alta.',
  all_z:'Todas las zonas',all_m:'Todos los municipios',all_t:'Cualquier tamaño',all_d:'Cualquier década',t1:'Micro · 1–9',t2:'Pequeña · 10–49',t3:'Mediana · 50–249',t4:'Grande · 250+',dec:'Altas en los ',
  so_az:'Nombre A–Z',so_num:'Nº de asociada',so_pl:'Mayor plantilla',so_new:'Altas más recientes',
  v_grid:'Logos',companies:'empresas',people:'personas',clear:'Limpiar filtros',more:'Ver más',
  map_h:'Por municipio',map_p:'Pulsa un municipio para filtrar.',bars_p:'Pulsa para filtrar el directorio.',by_z:'Por zona',by_s:'Por sector',sea:'Mar Cantábrico',
  num:'Nº de asociada',since:'Alta',date:'Fecha de alta',pl:'Plantilla',mun:'Municipio',zone:'Zona',sector:'Sector',addr:'Dirección',web:'Web',noweb:'Sin web',route:'Cómo llegar',
  founder:'Fundadora',founders:'Fundadoras',founder_l:'Empresa fundadora · 1977',with:'años con FVEM',share:'Compartir',card:'Tarjeta',oldnew:'Ayer · Hoy',
  since_k:'Socia de FVEM desde hace',since_s:'Y el contador sigue subiendo.',card_dl:'Descargar tarjeta para redes',
  hist_k:'Su lugar en la historia',hist_t:'En su año de alta ({y}) entraron también otras {n} empresas.',hist_t1:'En su año de alta ({y}) entró también otra empresa.',hist_t0:'Fue la única empresa que entró en {y}.',
  rel_s:'Más empresas del sector',rel_z:'Más empresas de su zona',desc:'Empresa asociada a FVEM desde {y}, con sede en {m}.',qr:'Escanea el QR para visitar su web',prev:'Anterior',next:'Siguiente',back:'Volver al directorio',
  hs_p:'Altas de las actuales asociadas, año a año, desde la fundación de FVEM.',born_h:'¿Quién entró el año que naciste?',born_l:'Mueve el selector o pulsa una barra',joined:'entraron ese año',joined1:'entró ese año',
  decs_h:'Década a década',dec_n:'{n} asociadas actuales entraron en esta década',hito_pend:'Hito de la década · por documentar',cmp_h:'Ayer y hoy',cmp_p:'La misma planta, la misma calle, el mismo oficio: fotos de archivo frente a fotos actuales. Las asociadas pueden enviar las suyas desde «Participa».',
  pe_p2:'Cada historia: un retrato, un vídeo de un minuto y una frase. Los nombres y fotos son de ejemplo hasta que se graben las piezas.',
  pa_p2:'Ayúdanos a completar el directorio y la memoria del aniversario.',f_emp:'Para empresas asociadas',f_pub:'Para todo el mundo',
  f_company:'Empresa',f_company_ph:'Escribe el nombre o el nº de asociada',f_name:'Persona de contacto',f_mail:'Correo',f_type:'¿Qué nos envías?',
  f_t1:'Logo',f_t2:'Foto actual',f_t3:'Foto antigua (ayer y hoy)',f_t4:'Mensaje para el 50 aniversario',f_t5:'Corrección de datos',
  f_msg:'Mensaje',f_file:'Arrastra aquí tus archivos o pulsa para elegirlos',f_ok:'Acepto la política de privacidad y autorizo la publicación del material enviado.',f_send:'Enviar',
  f_pub_p:'¿Trabajaste en una asociada? ¿Tienes fotos de la industria de Bizkaia de otras décadas? Compártelas.',f_year:'Año aproximado',f_story:'Cuéntanos la historia',
  f_note:'Vista previa: el formulario todavía no envía datos.',sent:'Vista previa: el envío se conectará con el gestor de FVEM.',
  ps_p:'Notas de prensa, recursos de marca y material gráfico del 50 aniversario.',ps_notes:'Notas de prensa',ps_kit:'Kit de marca',ps_logo:'Logotipo 50 FVEM (PNG)',ps_logo_s:'Versión en blanco para fondos oscuros',
  ps_soon:'Próximamente',ps_svg:'Logotipos vectoriales (SVG, PDF)',ps_man:'Manual de uso de la marca',ps_photo:'Fotografías en alta resolución',ps_contact:'Contacto de comunicación',ps_contact_p:'Datos de contacto por confirmar.',example:'Ejemplo',
  copied:'Enlace copiado',more_info:'Más información',
  nl_cta:'Suscríbete',nl_ok_pre:'He leído y acepto la',nl_cl:'Cláusula informativa',nl_resp:'Responsable',nl_fin:'Finalidad',nl_der:'Derechos',nl_inf:'Información adicional',nl_inf_t:'Para más información diríjase a nuestra',play_v:'Reproducir vídeo',video_k:'Vídeo',yt_note:'El vídeo se carga desde YouTube al pulsar reproducir.',cd_open:'Ver el vídeo',em_all:'Ver todas las empresas'
 },
 eu: {
  demo:'Aurrebista · agenda, egitaraua eta pertsonak adibide-edukiarekin',
  nav_ag:'Agenda',nav_pr:'Egitaraua',nav_em:'Enpresak',nav_hi:'Historia',nav_pe:'Pertsonak',nav_pa:'Parte hartu',nav_ps:'Prentsa',home:'Hasiera',
  cta_before:'Eman izena galan',cta_live:'Ikusi zuzenean',cta_after:'Ikusi galeria',
  h1a:'Industriaren',h1b:'50 urte',lema:'Bultzatzen duen iragana · Eraikitzen dugun etorkizuna',watch:'Ikusi bideoa',agenda27:'2027ko agenda',scroll:'Irristatu',
  sound_on:'Aktibatu soinua',sound_off:'Isilarazi',pause:'Pausatu animazioa',
  video_pend:'Bideo osoa hemen argitaratuko da.',
  cd_before:'Falta da',days:'Egun',hours:'Ordu',mins:'Min',secs:'Seg',years:'Urte',
  add_cal:'Gehitu nire egutegira',see_prog:'Ikusi egitaraua',next_cita:'Hurrengo hitzordua',live_now:'Zuzenean orain',next_s:'Ondoren',
  thanks:'Eskerrik asko. 50 urte, eta aurrera.',thanks_s:'Bizi berriro gala eta urteurreneko ekitaldi guztiak.',
  up_k:'2027ko agenda',up_h:'Hurrengo hitzorduak',up_all:'Ikusi agenda osoa',
  st_k:'Zifratan',st_h:'Bizkaiko industria egiten duten enpresak',st_emp:'Enpresa bazkideak',st_pl:'Pertsona',st_mun:'Udalerri',st_y:'Urte',
  st_note:'Bazkideen zerrendatik kalkulatutako datuak (partziala aurrebista honetan).',
  se_h:'Bilatu enpresa bat',se_ph:'Izena, udalerria edo bazkide-zk.',se_all:'Ikusi {n} emaitzak',se_none:'Ez dago irizpide horiek betetzen dituen enpresarik.',
  hi_k:'1977 → 2027',hi_h:'Mende erdia lerro batean',hi_p:'1977ko lehen bazkideetatik aurten batu direnetara. Irristatu argazkia atzo eta gaur alderatzeko.',hi_more:'Ibili historian zehar',
  yesterday:'Atzo',today:'Gaur',ph_pend:'Argazkia falta da',
  pe_k:'Industria egiten duten pertsonak',pe_h:'Enpresa bakoitzaren atzean, pertsonak',pe_p:'Talentua, esperientzia, aniztasuna, berrikuntza eta konpromisoa: bazkideetan lan egiten dutenen istorio laburrak.',pe_all:'Ikusi istorio guztiak',
  portrait_pend:'Erretratua falta da',
  pa_h:'Zure enpresa bazkidea da?',pa_p:'Bidali zure logoa, argazki zahar bat eta 50. urteurrenerako mezua. Zure fitxan argitaratuko dugu.',pa_btn:'Parte hartu',
  nl_h:'Jaso agenda zure postan',nl_p:'Ezagutu urteurren honetako hitzordu nabarmenenak.',nl_ph:'Zure helbide elektronikoa',nl_btn:'Harpidetu',nl_ok:'Aurrebista: harpidetza FVEMen sistemarekin konektatuko da.',
  ft_lema:'Industriaren 50 urte. Bultzatzen duen iragana, eraikitzen dugun etorkizuna.',ft_an:'Urteurrena',ft_em:'Enpresak',ft_fv:'FVEM',ft_sp:'Babesleak eta laguntzaileak',ft_spx:'Logoa',ft_legal:'Lege-oharra',ft_priv:'Pribatutasun-politika',ft_cook:'Cookie-politika',ft_terms:'Erabilera-baldintzak',ft_data:'Datuen babesari buruzko baldintza orokorrak',ft_acc:'Irisgarritasuna',ck_title:'Analitikako cookieak',ck_text:'Google Analytics erabiltzen dugu webgune hau zenbat pertsonak bisitatzen duten jakiteko eta hobetzeko. Onartzen baduzu bakarrik aktibatzen da; edozein unetan alda dezakezu orriaren oineko «Cookieak konfiguratu» estekan.',ck_more:'Cookie-politika',ck_yes:'Onartu',ck_no:'Baztertu',ck_cfg:'Cookieak konfiguratu',ft_web:'FVEMen webgunea',ft_contact:'Harremanetarako',
  ag_p:'50. urteurreneko ekitaldi guztiak leku bakarrean. Datak eta lekuak adibideak dira, berretsi arte.',all:'Guztiak',v_list:'Zerrenda',v_cal:'Egutegia',
  s_open:'Izen-ematea zabalik',s_soon:'Laster',s_full:'Beteta',s_past:'Eginda',s_live:'Zuzenean',s_free:'Sarrera librea',
  ev_when:'Data',ev_time:'Ordua',ev_where:'Lekua',ev_type:'Mota',ev_reg:'Eman izena',ev_reg_soon:'Izen-ematea laster',ev_route:'Nola iritsi',ev_share:'Partekatu',ev_left:'Falta da',
  ev_prog:'Ekitaldiaren egitaraua',ev_prog_all:'Ikusi egitarau osoa',ev_more:'Urteurreneko beste hitzordu batzuk',ev_after:'Galeria eta bideoa ekitaldiaren ondoren.',
  pr_p:'Orduz ordu, 50. urteurreneko ekitaldi nagusia. Ekitaldian zehar, unean uneko saioa automatikoki nabarmenduko da.',pr_pdf:'Deskargatu PDFa',pr_speakers:'Hizlariak',now:'Orain',
  em_h:'Enpresa bazkideak',em_p:'Bilatu izenaren, udalerriaren edo bazkide-zenbakiaren arabera, eta iragazi eremua, udalerria, tamaina edo alta-hamarkada erabiliz.',
  all_z:'Eremu guztiak',all_m:'Udalerri guztiak',all_t:'Edozein tamaina',all_d:'Edozein hamarkada',t1:'Mikroa · 1–9',t2:'Txikia · 10–49',t3:'Ertaina · 50–249',t4:'Handia · 250+',dec:'Altak: ',
  so_az:'Izena A–Z',so_num:'Bazkide-zk.',so_pl:'Langile gehien',so_new:'Alta berrienak',
  v_grid:'Logoak',companies:'enpresa',people:'pertsona',clear:'Garbitu iragazkiak',more:'Gehiago ikusi',
  map_h:'Udalerrika',map_p:'Sakatu udalerri bat iragazteko.',bars_p:'Sakatu direktorioa iragazteko.',by_z:'Eremuka',by_s:'Sektoreka',sea:'Kantauri itsasoa',
  num:'Bazkide-zk.',since:'Alta',date:'Alta-data',pl:'Langileak',mun:'Udalerria',zone:'Eremua',sector:'Sektorea',addr:'Helbidea',web:'Webgunea',noweb:'Webgunerik ez',route:'Nola iritsi',
  founder:'Sortzailea',founders:'Sortzaileak',founder_l:'Enpresa sortzailea · 1977',with:'urte FVEMekin',share:'Partekatu',card:'Txartela',oldnew:'Atzo · Gaur',
  since_k:'FVEMeko bazkide duela',since_s:'Eta kontagailuak gora jarraitzen du.',card_dl:'Deskargatu sare sozialetarako txartela',
  hist_k:'Bere lekua historian',hist_t:'Alta-urte berean ({y}) beste {n} enpresa ere sartu ziren.',hist_t1:'Alta-urte berean ({y}) beste enpresa bat ere sartu zen.',hist_t0:'Urte hartan ({y}) sartu zen enpresa bakarra izan zen.',
  rel_s:'Sektore bereko enpresa gehiago',rel_z:'Bere eremuko enpresa gehiago',desc:'FVEMeko enpresa bazkidea {y}az geroztik. Egoitza: {m}.',qr:'Eskaneatu QRa webgunera joateko',prev:'Aurrekoa',next:'Hurrengoa',back:'Itzuli direktoriora',
  hs_p:'Egungo bazkideen altak, urtez urte, FVEM sortu zenetik.',born_h:'Nor sartu zen jaio zinen urtean?',born_l:'Mugitu hautatzailea edo sakatu barra bat',joined:'sartu ziren urte hartan',joined1:'sartu zen urte hartan',
  decs_h:'Hamarkadaz hamarkada',dec_n:'Egungo {n} bazkide sartu ziren hamarkada honetan',hito_pend:'Hamarkadako mugarria · dokumentatzeke',cmp_h:'Atzo eta gaur',cmp_p:'Lantegi bera, kale bera, ofizio bera: artxiboko argazkiak gaurkoen aurrean. Bazkideek «Parte hartu» ataletik bidal ditzakete beraienak.',
  pe_p2:'Istorio bakoitza: erretratu bat, minutu bateko bideo bat eta esaldi bat. Izenak eta argazkiak adibideak dira piezak grabatu arte.',
  pa_p2:'Lagun iezaguzu direktorioa eta urteurreneko oroimena osatzen.',f_emp:'Enpresa bazkideentzat',f_pub:'Denontzat',
  f_company:'Enpresa',f_company_ph:'Idatzi izena edo bazkide-zk.',f_name:'Harremanetarako pertsona',f_mail:'Posta elektronikoa',f_type:'Zer bidaltzen diguzu?',
  f_t1:'Logoa',f_t2:'Gaurko argazkia',f_t3:'Argazki zaharra (atzo eta gaur)',f_t4:'50. urteurrenerako mezua',f_t5:'Datuen zuzenketa',
  f_msg:'Mezua',f_file:'Arrastatu hona fitxategiak edo sakatu aukeratzeko',f_ok:'Pribatutasun-politika onartzen dut eta bidalitako materiala argitaratzeko baimena ematen dut.',f_send:'Bidali',
  f_pub_p:'Bazkide batean lan egin zenuen? Beste hamarkada batzuetako Bizkaiko industriaren argazkiak dituzu? Parteka itzazu.',f_year:'Gutxi gorabeherako urtea',f_story:'Kontaiguzu istorioa',
  f_note:'Aurrebista: formularioak oraindik ez du daturik bidaltzen.',sent:'Aurrebista: bidalketa FVEMen kudeatzailearekin konektatuko da.',
  ps_p:'50. urteurreneko prentsa-oharrak, marka-baliabideak eta material grafikoa.',ps_notes:'Prentsa-oharrak',ps_kit:'Marka-kita',ps_logo:'50 FVEM logotipoa (PNG)',ps_logo_s:'Bertsio zuria hondo ilunetarako',
  ps_soon:'Laster',ps_svg:'Logotipo bektorialak (SVG, PDF)',ps_man:'Markaren erabilera-eskuliburua',ps_photo:'Bereizmen handiko argazkiak',ps_contact:'Komunikazio-harremana',ps_contact_p:'Harremanetarako datuak zehazteke.',example:'Adibidea',
  copied:'Esteka kopiatuta',more_info:'Informazio gehiago',
  nl_cta:'Harpidetu',nl_ok_pre:'Irakurri eta onartzen dut',nl_cl:'Informazio-klausula',nl_resp:'Arduraduna',nl_fin:'Helburua',nl_der:'Eskubideak',nl_inf:'Informazio gehigarria',nl_inf_t:'Informazio gehiago nahi baduzu, kontsultatu gure',play_v:'Erreproduzitu bideoa',video_k:'Bideoa',yt_note:'Bideoa YouTubetik kargatzen da erreproduzitu sakatzean.',cd_open:'Ikusi bideoa',em_all:'Ikusi enpresa guztiak'
 }
};
let L = 'es';
try { const s = localStorage.getItem('fvem50-lang'); if (s === 'es' || s === 'eu') L = s; } catch (_) {}
const t = (k, v) => { let s = T[L][k] ?? T.es[k] ?? k; if (v) for (const x in v) s = s.split('{' + x + '}').join(v[x]); return s; };
const tx = o => o == null ? '' : typeof o === 'string' ? o : (o[L] || o.es || '');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
// Cifras con punto de miles siempre (1.210, 33.000, 1.000.000). Los años y los nº de asociada no pasan por aquí.
const nf = n => { const v = Math.round(Number(n) || 0); return (v < 0 ? '-' : '') + String(Math.abs(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
const pad = n => String(n).padStart(2, '0');
const MES = { es:['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
  eu:['urtarrila','otsaila','martxoa','apirila','maiatza','ekaina','uztaila','abuztua','iraila','urria','azaroa','abendua'] };
const MESC = { es:['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'], eu:['urt','ots','mar','api','mai','eka','uzt','abu','ira','urr','aza','abe'] };
const DOW = { es:['lun','mar','mié','jue','vie','sáb','dom'], eu:['al','ar','az','og','or','lr','ig'] };
const EUMES_GEN = ['urtarrilaren','otsailaren','martxoaren','apirilaren','maiatzaren','ekainaren','uztailaren','abuztuaren','irailaren','urriaren','azaroaren','abenduaren'];
// fechas mostradas siempre en hora de Bilbao
const TZ = 'Europe/Madrid';
const parts = d => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false,weekday:'short'}).formatToParts(d).map(x=>[x.type,x.value]));
  return {y:+p.year, m:+p.month-1, d:+p.day, hh:p.hour==='24'?'00':p.hour, mm:p.minute, wd:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(p.weekday)}; };
const fLong = d => { const p = parts(d); return L === 'eu' ? `${p.y}ko ${EUMES_GEN[p.m]} ${p.d}a` : `${p.d} de ${MES.es[p.m]} de ${p.y}`; };
const fTime = d => { const p = parts(d); return `${p.hh}:${p.mm}`; };
const fDate = iso => { if (!iso) return ''; const [y,m,d] = iso.split('-'); return `${+d}/${+m}/${y}`; };
const ic = {
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>', cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', pin:'<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', play:'<path d="M7 5l12 7-12 7z"/>', share:'<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.3 10.8 7.4-4.4M8.3 13.2l7.4 4.4"/>',
  web:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>', dl:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>', left:'<path d="M15 5l-7 7 7 7"/>', right:'<path d="M9 5l7 7-7 7"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', sound:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9a4 4 0 0 1 0 6"/>', mute:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l4 6M21 9l-4 6"/>', x:'<path d="M6 6l12 12M18 6 6 18"/>',
  grid:'<circle cx="7" cy="7" r="3.5"/><circle cx="17" cy="7" r="3.5"/><circle cx="7" cy="17" r="3.5"/><circle cx="17" cy="17" r="3.5"/>', list:'<path d="M4 6h16M4 12h16M4 18h16"/>', pause:'<path d="M8 5v14M16 5v14"/>'
};
const I = k => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ic[k]}</svg>`;

/* ---------- gráfica generativa (marcadores de posición con el lenguaje de curvas) ---------- */
function hash(s){let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0}
function rng(seed){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}}
function ring(cx,cy,R,r,a0,a1){const P=(rad,a)=>[cx+rad*Math.cos(a*Math.PI/180),cy+rad*Math.sin(a*Math.PI/180)].map(v=>v.toFixed(1));
  const lg=((a1-a0+360)%360)>180?1:0,[x0,y0]=P(R,a0),[x1,y1]=P(R,a1),[x2,y2]=P(r,a1),[x3,y3]=P(r,a0);
  return `M${x0} ${y0}A${R} ${R} 0 ${lg} 1 ${x1} ${y1}L${x2} ${y2}A${r} ${r} 0 ${lg} 0 ${x3} ${y3}Z`;}
const METAL = id => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ececec"/><stop offset=".35" stop-color="#7c7c7c"/><stop offset=".55" stop-color="#dedede"/><stop offset=".8" stop-color="#6c6c6c"/><stop offset="1" stop-color="#b8b8b8"/></linearGradient>`;
function artEvent(seed, W=640, H=360){
  const r = rng(hash(seed)), id = 'm' + hash(seed).toString(36);
  const cx = W*(.55+r()*.35), cy = H*(.3+r()*.5), R = H*(.55+r()*.35), a0 = Math.floor(r()*4)*90 + 20;
  let s = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${METAL(id)}<radialGradient id="${id}g" cx=".75" cy=".3" r=".9"><stop offset="0" stop-color="#3a2416"/><stop offset=".6" stop-color="#121212"/><stop offset="1" stop-color="#0b0b0b"/></radialGradient></defs>`;
  s += `<rect width="${W}" height="${H}" fill="url(#${id}g)"/>`;
  s += `<path d="${ring(cx,cy,R,R*.7,a0,a0+250)}" fill="url(#${id})" opacity=".92"/>`;
  s += `<path d="${ring(cx,cy,R*.55,R*.38,a0+180,a0+270)}" fill="#d86b33"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${R*1.18}" fill="none" stroke="#d86b33" stroke-width="1.2" stroke-dasharray="2 9" opacity=".7"/>`;
  s += `<line x1="0" y1="${(cy+R*.85).toFixed(0)}" x2="${cx.toFixed(0)}" y2="${(cy+R*.85).toFixed(0)}" stroke="#d86b33" stroke-width="2"/>`;
  return s + '</svg>';
}
function artPerson(seed, old){
  const r = rng(hash(seed)), id = 'p' + hash(seed).toString(36), W=300, H=400, hx = 150 + (r()-.5)*30;
  let s = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${METAL(id)}<radialGradient id="${id}b" cx="${.3+r()*.5}" cy=".25" r=".9"><stop offset="0" stop-color="#5a3420"/><stop offset=".55" stop-color="#171310"/><stop offset="1" stop-color="#0b0b0b"/></radialGradient></defs>`;
  s += `<rect width="${W}" height="${H}" fill="url(#${id}b)"/>`;
  for (let i=0;i<14;i++) s += `<circle cx="${r()*W}" cy="${r()*H*.7}" r="${.8+r()*1.8}" fill="#d86b33" opacity="${.3+r()*.6}"/>`;
  s += `<path d="M${hx-120} ${H} C${hx-115} ${H-120} ${hx-70} ${H-150} ${hx} ${H-155} C${hx+70} ${H-150} ${hx+115} ${H-120} ${hx+120} ${H}Z" fill="url(#${id})" opacity=".85"/>`;
  s += `<ellipse cx="${hx}" cy="${H-225}" rx="52" ry="62" fill="url(#${id})" opacity=".9"/>`;
  if (r() > .4) s += `<path d="M${hx-62} ${H-245} Q${hx} ${H-330} ${hx+62} ${H-245} L${hx+70} ${H-232} L${hx-70} ${H-232}Z" fill="#e8e3da" opacity=".9"/>`;
  s += `<path d="M${hx+52} ${H-250} a62 62 0 0 1 0 50" fill="none" stroke="#d86b33" stroke-width="3" opacity=".8"/>`;
  return s + '</svg>';
}
function factory(seed, old){
  const r = rng(hash(seed)), W=400, H=300, id = 'f' + hash(seed).toString(36) + (old?'o':'n'); let b='';
  b += `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${old?'#cfc6b4':'#3a2416'}"/><stop offset="1" stop-color="${old?'#8a8679':'#0d0d0d'}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  b += `<circle cx="${120+r()*160}" cy="${70+r()*30}" r="${26+r()*14}" fill="${old?'#efe8d8':'#d86b33'}" opacity=".9"/>`;
  let x=-20; const base=H-50;
  while(x<W){ const w=80+r()*100, h=50+r()*70, n=2+Math.floor(r()*3), tw=w/n; let p=`M${x},${base} L${x},${base-h}`;
    for(let i=0;i<n;i++) p+=` L${x+i*tw+tw*.75},${base-h-22} L${x+i*tw+tw*.75},${base-h} L${x+(i+1)*tw},${base-h}`;
    b+=`<path d="${p} L${x+w},${base} Z" fill="${old?'#3b3d3d':'#050505'}"/>`;
    for(let i=0;i<Math.floor(w/24);i++) b+=`<rect x="${x+8+i*24}" y="${base-h+18}" width="11" height="14" rx="2" fill="${old?'#9b9a90':'#d86b33'}" opacity="${old?.5:.55}"/>`;
    if(r()>.45){const cx=x+w*.3+r()*w*.4,ch=70+r()*70; b+=`<rect x="${cx}" y="${base-h-ch}" width="12" height="${ch}" fill="${old?'#2c2e2e':'#050505'}"/>`;
      if(old) for(let k=0;k<5;k++) b+=`<circle cx="${cx+6+k*13}" cy="${base-h-ch-12-k*20}" r="${12+k*7}" fill="#555" opacity="${.45-k*.07}"/>`;}
    x+=w+r()*8; }
  b+=`<rect y="${base}" width="${W}" height="${H-base}" fill="${old?'#2a2c2c':'#050505'}"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${b}</svg>`;
}
const deco = (cls='d', a0=200) => `<svg class="${cls}" viewBox="0 0 400 400" aria-hidden="true"><defs>${METAL('dm'+a0)}</defs><path d="${ring(200,200,190,130,a0,a0+250)}" fill="url(#dm${a0})" opacity=".85"/><path d="${ring(200,200,110,75,a0+180,a0+270)}" fill="#d86b33"/></svg>`;

/* ---------- empresas ---------- */
const ALL = RAW.empresas.filter(e => e.anio_alta && !e.anio_baja);
ALL.forEach(e => { e.zona = e.zona || ''; e.sector = e.sector || ''; e.web = e.web || ''; });
const HAS_SEC = ALL.some(e => e.sector);
const SEC_EU = RAW.sectores_eu || {};
const BYNUM = Object.fromEntries(ALL.map(e => [e.num_asociada, e]));
const zn = z => L === 'eu' ? String(z).replace(/^zona\s*(\d+)$/i, '$1. eremua') : z;
const secn = s => L === 'eu' ? (SEC_EU[s] || s) : s;
const SECL_EU = RAW.sectores_largo_eu || {};
const secl = e => e.sector_largo ? (L === 'eu' ? (SECL_EU[e.sector_largo] || e.sector_largo) : e.sector_largo) : grp(e);
const grp = e => e.sector ? secn(e.sector) : zn(e.zona);
const plOk = e => typeof e.plantilla === 'number';
const shortName = n => n.replace(/,\s*(S\.?\s?(?:L|A)\.?\s?(?:L|U)?\.?|S\.?\s?COOP\.?)(?=\s*(?:-|$))/i, '').trim();
const maps = (q) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
const eAddr = e => [e.direccion, [e.cp, e.municipio].filter(Boolean).join(' '), 'Bizkaia'].filter(Boolean).join(', ');
const STOP = new Set(['y','de','del','la','el','s.l.','s.a.','grupo','talleres','industrias','cia.,']);
const initials = n => { const w = shortName(n).replace(/[.,]/g,' ').split(/\s+/).filter(x => x && !STOP.has(x.toLowerCase())); return (w.length > 1 ? w[0][0] + w[1][0] : (w[0]||n).slice(0,2)).toUpperCase(); };
function mono(e, star){
  const s = hash(e.nombre) % 4, st = star && isF(e) ? `<span class="star">★</span>` : '';
  if (e.logo) return `<span class="mono lg${e.logo_fondo === 'oscuro' ? ' dk' : ''}"><img alt="${esc(shortName(e.nombre))}" loading="lazy" decoding="async" src="${esc(e.logo)}" onerror="this.parentNode.classList.add('err');this.remove()"><span>${esc(initials(e.nombre))}</span>${st}</span>`;
  return `<span class="mono s${s}" aria-hidden="true"><span>${esc(initials(e.nombre))}</span>${st}</span>`;
}
const yrsWith = e => (e.anio_baja || ANIV) - e.anio_alta;
const isF = e => e.fundadora != null ? !!e.fundadora : e.anio_alta === FUND;
const CIF = C.cifras || {};
const S = { emp: CIF.empresas || ALL.length, pl: CIF.plantilla || ALL.reduce((a,e)=>a+(e.plantilla||0),0), mun: new Set(ALL.map(e=>e.municipio)).size, fun: ALL.filter(isF).length };
const PERY = {}; ALL.forEach(e => (PERY[e.anio_alta] = PERY[e.anio_alta] || []).push(e));
const IDX = ALL.map(e => ({e, s: norm([e.nombre, e.municipio, e.zona, e.cp, e.direccion, e.sector, e.num_asociada, +e.num_asociada].join(' '))}));
function search(q){ const w = norm(q).trim().split(/\s+/).filter(Boolean); if (!w.length) return ALL.slice(); return IDX.filter(x => w.every(p => x.s.includes(p))).map(x => x.e); }

/* ---------- eventos ---------- */
const EV = C.eventos.map(e => ({...e, d0: new Date(e.ini), d1: new Date(e.fin || e.ini)})).sort((a,b)=>a.d0-b.d0);
const EVS = Object.fromEntries(EV.map(e => [e.slug, e]));
const GALA = EVS[C.gala] || EV[EV.length-1];
const evState = e => { const n = NOW(); return n > e.d1 ? 'past' : n >= e.d0 ? 'live' : e.inscripcion === 'abierta' ? 'open' : e.inscripcion === 'completo' ? 'full' : e.inscripcion === 'proximamente' ? 'soon' : 'free'; };
const stChip = e => { const s = evState(e); return `<span class="chip ${s==='open'||s==='live'?'c':'o'}${s==='live'?' live':''}">${t({open:'s_open',soon:'s_soon',full:'s_full',past:'s_past',live:'s_live',free:'s_free'}[s])}</span>`; };
const upcoming = () => EV.filter(e => e.d1 >= NOW());
const phase = () => { const n = NOW(); return n < GALA.d0 ? 'before' : n <= GALA.d1 ? 'live' : 'after'; };
function icsFor(e){
  const z = d => d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  const txt = s => String(s).replace(/[,;\\]/g, m => '\\' + m).replace(/\n/g,'\\n');
  const body = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//FVEM//50 aniversario//ES','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${e.slug}@fvem50`,`DTSTAMP:${z(new Date())}`,
    `DTSTART:${z(e.d0)}`,`DTEND:${z(e.d1)}`,`SUMMARY:${txt(tx(e.titulo))} · FVEM 50`,`LOCATION:${txt(tx(e.lugar))}`,`DESCRIPTION:${txt(tx(e.desc))}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([body], {type:'text/calendar'})); a.download = `fvem50-${e.slug}.ics`; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href), 2000);
}
// programa
const PRG = C.programa, PEV = EVS[PRG.evento] || GALA, OFF = (PEV.ini.match(/[+-]\d\d:\d\d$/) || ['+02:00'])[0];
const sesD = (dia, hm) => new Date(`${dia.fecha}T${hm}:00${OFF}`);
function sessionNow(){ const n = NOW(); for (const d of PRG.dias) for (let i=0;i<d.sesiones.length;i++){ const s = d.sesiones[i]; if (n >= sesD(d,s.ini) && n < sesD(d,s.fin)) return {d, s, next: d.sesiones[i+1]}; } return null; }

/* ---------- cuenta atrás / contador ---------- */
const CDU = () => [['d','days'],['h','hours'],['m','mins'],['s','secs']];
const cdHTML = (iso, up) => `<div class="cnums num" data-cd="${iso}"${up?' data-up="1"':''}>${CDU().map(([k,l],i)=>`<div><b data-u="${k}"${i===0&&up?' class="c"':''}>–</b><span>${t(l)}</span></div>`).join('')}</div>`;
function tick(){
  const n = NOW();
  $$('[data-cd]').forEach(el => {
    let ms = el.dataset.up ? n - new Date(el.dataset.cd) : new Date(el.dataset.cd) - n; ms = Math.max(0, ms);
    const s = Math.floor(ms/1000), v = {d: Math.floor(s/86400), h: Math.floor(s%86400/3600), m: Math.floor(s%3600/60), s: s%60};
    $$('[data-u]', el).forEach(b => { const x = v[b.dataset.u]; b.textContent = b.dataset.u === 'd' ? nf(x) : pad(x); });
  });
}
setInterval(tick, 1000);

/* ---------- utilidades UI ---------- */
function toast(m){ const el = $('#toast'); el.textContent = m; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(()=>el.classList.remove('on'), 2600); }
async function share(title, path){
  const url = (/^https?:/.test(location.href) ? location.href.split('#')[0] : C.sitio) + path;
  try { if (navigator.share) { await navigator.share({title, url}); return; } } catch (_) { return; }
  try { await navigator.clipboard.writeText(url); toast(t('copied')); } catch (_) { toast(url); }
}
function modal(inner){
  const m = document.createElement('div'); m.className = 'modal'; m.innerHTML = `<button class="x" aria-label="Cerrar">${I('x')}</button><div class="in">${inner}</div>`;
  const close = () => { m.remove(); document.body.classList.remove('lock'); document.removeEventListener('keydown', esc_); };
  const esc_ = ev => { if (ev.key === 'Escape') close(); };
  m.addEventListener('click', ev => { if (ev.target === m || ev.target.closest('.x')) close(); });
  document.addEventListener('keydown', esc_); document.body.appendChild(m); document.body.classList.add('lock');
}
const videoModal = url => modal(url ? `<iframe src="${esc(url)}${url.includes('?')?'&':'?'}autoplay=1" allow="autoplay; fullscreen" allowfullscreen title="Vídeo"></iframe>` : `<div style="padding:30px">${artEvent('modal',960,540).replace('<svg','<svg style="position:absolute;inset:0;width:100%;height:100%;opacity:.5"')}<p style="position:relative;font-size:18px">${t('video_pend')}</p></div>`);
function qrSVG(text){ const q = qrcode(0,'M'); q.addData(text); q.make(); const n = q.getModuleCount(); let d='';
  for(let r=0;r<n;r++) for(let c=0;c<n;c++) if(q.isDark(r,c)) d+=`M${c},${r}h1v1h-1z`;
  return `<svg viewBox="-1 -1 ${n+2} ${n+2}" shape-rendering="crispEdges"><rect x="-1" y="-1" width="${n+2}" height="${n+2}" fill="#fff"/><path d="${d}" fill="#0b0b0b"/></svg>`; }
let io;
function reveal(root){ if (!('IntersectionObserver' in window)) { $$('.reveal', root).forEach(x=>x.classList.add('in')); return; }
  io = io || new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), {rootMargin:'0px 0px -8% 0px'});
  $$('.reveal', root).forEach(x => io.observe(x)); }
function countUp(root){ $$('[data-count]', root).forEach(el => { const end = +el.dataset.count; let t0; el.textContent = nf(end);
  const step = n => { t0 = t0 || n; const p = Math.min(1,(n-t0)/1500); el.textContent = nf(Math.round(end*(1-Math.pow(1-p,3)))); if (p<1) requestAnimationFrame(step); };
  const o = new IntersectionObserver(es => { if (es[0].isIntersecting) { requestAnimationFrame(step); o.disconnect(); } }); o.observe(el); }); }
const pageHead = (kicker, title, lead, a0=200, crumbs=true) => `<section class="dk ph-hd">${deco('d', a0)}<div class="wrap" style="position:relative">
  ${crumbs?`<div class="crumb"><a href="#/">${t('home')}</a><span>/</span><span>${esc(kicker)}</span></div>`:''}<div class="eyebrow">${esc(kicker)}</div><div class="rule"></div><h1>${title}</h1>${lead?`<p class="lead">${lead}</p>`:''}</div></section>`;

/* =====================================================================
   PORTADA
   ===================================================================== */
function currentVideo(){ const n = NOW(), v = C.video; const p = (v.programados||[]).find(x => n >= new Date(x.desde) && n <= new Date(x.hasta + 'T23:59:59')); return {...v, ...(p||{})}; }
// Formas de cabecera inspiradas en la geometría de la marca: arcos con remate redondeado y «lamas»
// (barras con dos esquinas opuestas redondeadas). No reproducen el logotipo.
const arcD = (cx, cy, r, a0, a1) => { const P = a => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)].map(v => v.toFixed(1));
  const [x0, y0] = P(a0), [x1, y1] = P(a1); return `M${x0} ${y0}A${r} ${r} 0 ${(a1 - a0) > 180 ? 1 : 0} 1 ${x1} ${y1}`; };
const bladeD = (x, y, w, h) => `M${x} ${y + h}V${y + h / 2}A${h / 2} ${h / 2} 0 0 1 ${x + h / 2} ${y}H${x + w}V${y + h / 2}A${h / 2} ${h / 2} 0 0 1 ${x + w - h / 2} ${y + h}Z`;
// Formas de marca (5 y C) vectorizadas a partir del archivo facilitado por FVEM. Coordenadas propias de cada forma.
const SHAPE5 = { w: 844, h: 1245, d: "M 277.306 7.095 C 212.753 12.850, 160.379 59.302, 145.703 123.817 L 143.500 133.500 143.817 272.500 C 144.133 410.736, 144.441 424.535, 147.547 439.572 C 161.083 505.105, 217.263 555.019, 281.584 558.661 L 292.668 559.288 293.334 474.394 C 293.699 427.702, 294.007 350.800, 294.017 303.500 C 294.037 206.425, 293.795 209.903, 301.635 194.022 C 307.984 181.159, 318.605 170.383, 331 164.226 C 347.751 155.906, 332.579 156.619, 506.500 155.977 C 679.500 155.338, 665.306 155.924, 687.694 148.498 C 744.191 129.757, 785.566 76.272, 788.712 17.916 L 789.282 7.332 710.391 6.666 C 603.459 5.765, 288.729 6.076, 277.306 7.095 M 409 411.624 C 376.441 417.677, 352.516 437.900, 345.852 465 C 343.884 473.005, 344.157 493.879, 346.337 502 C 351.386 520.817, 364.715 537.009, 382 545.324 C 394.317 551.249, 403.667 553.608, 424.500 556.046 C 509.226 565.960, 569.248 592.125, 617.014 639.968 C 674.103 697.148, 698.807 782.123, 683.954 870.226 C 666.408 974.311, 585.724 1059.925, 484 1082.400 C 459.561 1087.799, 452.528 1088.478, 421 1088.478 C 389.427 1088.478, 382.260 1087.784, 358 1082.378 C 296.571 1068.689, 241.543 1030.296, 204.096 975 C 175.594 932.911, 160.443 888.633, 154.491 830.028 C 149.471 780.596, 133.179 755.139, 100.887 746.276 C 91.948 743.822, 68.112 743.820, 59 746.271 C 32.536 753.392, 14.231 774.426, 8.034 804.832 C 4.462 822.362, 5.316 859.476, 10.036 891.765 C 31.742 1040.267, 140.886 1168.462, 287.759 1217.965 C 355.493 1240.794, 435.135 1245.295, 509.500 1230.497 C 672.130 1198.134, 797.849 1071.194, 829.884 907 C 839.736 856.509, 840.279 797.139, 831.362 745.500 C 802.391 577.725, 668.270 443.587, 501.500 415.596 C 471.660 410.587, 425.289 408.596, 409 411.624" };
const SHAPEC = { w: 865, h: 1100, dy: -16, d: "M 601.500 6.994 C 534.203 9.859, 469.826 22.201, 411 43.516 C 232.101 108.338, 94.612 249.151, 36.570 427 C 5.687 521.632, -1.867 629.438, 15.060 734 C 31.373 834.771, 71.648 931.870, 128.505 1007.500 C 165.777 1057.080, 196.501 1083.971, 224.500 1091.522 C 239.602 1095.594, 263.005 1094.265, 277.111 1088.533 C 304.455 1077.422, 320.316 1047.871, 316.217 1015.670 C 313.657 995.557, 306.776 982.899, 286.496 961 C 238.737 909.428, 197.749 839.912, 178.301 777.500 C 156.071 706.157, 150.580 609.236, 164.478 533.500 C 194.995 367.207, 312.410 234.027, 475.803 180.373 C 525.369 164.098, 569.150 157.529, 628 157.539 C 676.123 157.547, 694.123 159.890, 747.450 173.090 C 787.697 183.051, 809.326 181.833, 828.985 168.498 C 848.875 155.007, 858.539 135.155, 858.435 108 C 858.348 85.310, 852.378 71.203, 836.376 55.880 C 800.497 21.521, 708.761 2.428, 601.500 6.994" };
function heroArt(photo){
  // El 5 (metal) y la C (cobre) de la marca, superpuestos ligeramente
  const W = 1600, H = 900, mob = matchMedia('(max-width:700px)').matches;
  const sc = .44, tx = 760, ty = 150, cx = 733;   // cx: desplazamiento de la C respecto al 5 (en el logo es 923; menos = más superposición)
  return `<svg viewBox="${mob ? '715 -170 800 1550' : `0 0 ${W} ${H}`}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>${METAL('hm')}<radialGradient id="hb" cx=".72" cy=".55" r=".75"><stop offset="0" stop-color="#3b2214"/><stop offset=".45" stop-color="#140f0c"/><stop offset="1" stop-color="#070707"/></radialGradient>
  <linearGradient id="hs" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <mask id="hk"><path d="${SHAPE5.d}" fill="#fff"/></mask>
  <mask id="cm" maskUnits="userSpaceOnUse" x="-400" y="-400" width="1700" height="1900"><path class="draw ctrace" pathLength="1" d="M1000.7 218.3A554 554 0 1 0 440.5 1150.6" stroke="#fff" stroke-width="320" stroke-linecap="round" fill="none"/></mask>
  <filter id="cg" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="38"/></filter></defs>
  ${photo ? '' : `<rect width="${W}" height="${H}" fill="url(#hb)"/>`}
  <g transform="translate(${tx} ${ty}) scale(${sc})">
    <g class="rise5" style="opacity:${photo ? .85 : 1}"><path d="${SHAPE5.d}" fill="url(#hm)"/>
      <g mask="url(#hk)"><rect class="sweep" x="-700" y="-100" width="420" height="1500" fill="url(#hs)" transform="skewX(-20)"/></g></g>
    <g transform="translate(${cx} ${SHAPEC.dy})">
      <g mask="url(#cm)"><path class="cglow" d="${SHAPEC.d}" fill="#ffb347" filter="url(#cg)"/><path class="cforge" d="${SHAPEC.d}" fill="#d86b33" opacity=".95"/></g></g>
  </g>
  </svg><canvas id="sparks"></canvas>`;
}
let sparkRAF = 0;
function sparks(){
  cancelAnimationFrame(sparkRAF);
  const cv = $('#sparks'); if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = cv.getContext('2d'); let W, H, P = [];
  const size = () => { const r = cv.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio||1); W = r.width; H = r.height; cv.width = W*dpr; cv.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); };
  size(); addEventListener('resize', size);
  const spawn = () => ({x: W*(.55+Math.random()*.3), y: H*(.78+Math.random()*.15), vx: -(.5+Math.random()*2.2), vy: -(1+Math.random()*3), l: 1, d: .006+Math.random()*.012, c: Math.random()>.3?'216,107,51':'255,200,140'});
  const loop = () => { if (!document.hidden && cv.isConnected && $('#v-home').classList.contains('on') && scrollY < H) {
      ctx.clearRect(0,0,W,H); ctx.globalCompositeOperation = 'lighter';
      if (P.length < 70) P.push(spawn());
      P.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .03; p.l -= p.d; ctx.strokeStyle = `rgba(${p.c},${Math.max(0,p.l)})`; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x-p.vx*3, p.y-p.vy*3); ctx.stroke(); });
      P = P.filter(p => p.l > 0); }
    sparkRAF = requestAnimationFrame(loop); };
  loop();
}
function cdStrip(){
  const ph = phase(), nx = upcoming().filter(e => e !== GALA)[0];
  if (ph === 'before') return `<section class="cds" id="cds">${deco('bg',120)}<div class="wrap">
      <div><div class="lb">${t('cd_before')}</div><div class="tt">${esc(tx(GALA.titulo))}<small>${fLong(GALA.d0)} · ${esc(tx(GALA.lugar))}</small></div></div>
      ${cdHTML(GALA.ini)}
      <div class="ac"><button class="btn sm" data-ics="${GALA.slug}">${I('cal')} ${t('add_cal')}</button><a class="btn sm ghost" href="#/programa">${t('see_prog')}</a></div></div>
      ${nx?`<div class="wrap nx"><a href="#/agenda/${nx.slug}">${t('next_cita')}: <b>${esc(tx(nx.titulo))}</b> · ${fLong(nx.d0)} →</a></div>`:''}</section>`;
  if (ph === 'live') { const s = sessionNow();
    return `<section class="cds" id="cds">${deco('bg',120)}<div class="wrap"><div><div class="lb"><span class="chip c live" style="background:#fff;color:var(--cobre)">${t('live_now')}</span></div>
      <div class="tt">${s?esc(tx(s.s.t)):esc(tx(GALA.titulo))}<small>${s?`${s.s.ini}–${s.s.fin} · ${esc(tx(s.s.sala))}`:''}${s&&s.next?` · ${t('next_s')}: ${esc(tx(s.next.t))} (${s.next.ini})`:''}</small></div></div>
      <div></div><div class="ac">${GALA.directo?`<button class="btn sm" data-live>${I('play')} ${t('cta_live')}</button>`:''}<a class="btn sm ghost" href="#/programa">${t('see_prog')}</a></div></div></section>`; }
  return `<section class="cds" id="cds">${deco('bg',120)}<div class="wrap"><div><div class="lb">1977 – 2027</div><div class="tt">${t('thanks')}<small>${t('thanks_s')}</small></div></div><div></div>
    <div class="ac"><a class="btn sm" href="#/agenda/${GALA.slug}">${t('cta_after')}</a></div></div></section>`;
}
const evCard = e => `<a class="ev reveal" href="#/agenda/${e.slug}"><div class="art">${artEvent(e.slug)}<span class="chip">${esc(tx(C.tipos[e.tipo]))}</span></div>
  <div class="bd"><div class="dt"><b class="num">${parts(e.d0).d}</b><span>${MESC[L][parts(e.d0).m]}</span></div><div><h3>${esc(tx(e.titulo))}</h3><div class="mt">${fTime(e.d0)} · ${esc(tx(e.lugar))}</div><div class="st">${stChip(e)}</div></div></div></a>`;
const personCard = (p, i) => `<a class="pc reveal" href="#/personas" data-person="${i}" style="transition-delay:${i*70}ms"><div class="ph">${p.foto?`<img alt="" src="${esc(p.foto)}">`:artPerson('persona'+i)}${p.foto?'':`<span class="ph-pend">${t('portrait_pend')}</span>`}<span class="play"></span></div>
  <div class="ax">${esc(tx(p.eje))}</div><b>${esc(p.nombre)}</b><small>${esc(tx(p.cargo))}${p.empresa?' · '+esc(p.empresa):''}</small><q>${esc(tx(p.frase))}</q></a>`;
function cmpHTML(seed){ return `<div class="cmp reveal" style="--p:50%"><div class="new">${factory(seed,false)}</div><div class="old" style="position:absolute;inset:0">${factory(seed,true)}</div>
  <span class="lb" style="left:12%">${t('yesterday')}</span><span class="lb" style="right:12%">${t('today')}</span><span class="ph-pend">${t('ph_pend')}</span><span class="hand"></span>
  <input type="range" min="0" max="100" value="50" aria-label="${t('yesterday')} / ${t('today')}"></div>`; }
function bindCmp(root){ $$('.cmp', root).forEach(c => { const i = $('input', c); i.oninput = () => c.style.setProperty('--p', i.value + '%'); }); }

/* ---------- secciones visibles (config.secciones) ---------- */
const SEC = Object.assign({ lema: true, botonesPortada: true, agenda: true, cifras: true, buscador: true, historia: true, personas: true, participa: true, newsletter: true, patrocinadores: true }, C.secciones || {});
const CA = C.cuentaAtras || null;
const ytId = s => { const m = String(s || '').match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/); return m ? m[1] : (/^[\w-]{11}$/.test(s || '') ? s : ''); };
function videoBlock(){
  const yv = C.videoPrincipal || {}, id = ytId(yv.youtube); if (!id) return '';
  return `<div class="vbox" id="vbox"><div class="vfr" id="vfr" data-yt="${id}">
      <button class="vposter${yv.poster ? ' img' : ''}" id="vplay" aria-label="${t('play_v')}: ${esc(tx(yv.titulo))}"${yv.posterPlay ? ` style="--px:${esc(yv.posterPlay[0])};--py:${esc(yv.posterPlay[1])}"` : ''}>${yv.poster ? `<img alt="" src="${esc(yv.poster)}">` : artEvent('video-' + id, 1600, 900)}
        <span class="vp" aria-hidden="true"></span>${yv.tituloSobrePortada === false ? '' : `<span class="vt"><small>${t('video_k')}</small>${esc(tx(yv.titulo))}</span>`}</button></div>
    ${(C.videoPrincipal || {}).nota ? `<p class="vnote">${t('yt_note')}</p>` : ''}</div>`;
}
function playVideo(){
  const f = $('#vfr'); if (!f) return; const id = f.dataset.yt, yv = C.videoPrincipal || {};
  const cc = yv.subtitulos === true, org = /^https?:/.test(location.origin) ? '&origin=' + encodeURIComponent(location.origin) : '';
  f.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&iv_load_policy=3&color=white&cc_load_policy=${cc ? 1 : 0}&hl=${L}&enablejsapi=1${org}" title="${esc(tx(yv.titulo))}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  // YouTube puede activar los subtítulos por su cuenta: se le pide que los quite al arrancar (quien quiera, puede activarlos con el botón CC)
  if (!cc) { const fr = $('iframe', f), off = () => { try { fr.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unloadModule', args: ['captions'] }), 'https://www.youtube-nocookie.com'); } catch (_) {} };
    fr.addEventListener('load', () => [600, 1500, 3000, 5000].forEach(ms => setTimeout(off, ms))); }
}
function caStrip(){
  const d = new Date(CA.fecha), before = NOW() < d;
  if (before) return `<section class="cds" id="cds">${deco('bg',120)}<div class="wrap">
      <div><div class="lb">${esc(tx(CA.etiqueta))}</div><div class="tt">${esc(tx(CA.titulo))}<small>${CA.mostrarFecha === false ? '' : fLong(d) + ' · '}${esc(tx(CA.texto))}</small></div></div>
      ${cdHTML(CA.fecha)}
      <div class="ac">${CA.botonCalendario === false ? '' : `<button class="btn sm" id="caics">${I('cal')} ${t('add_cal')}</button>`}</div></div></section>`;
  return `<section class="cds" id="cds">${deco('bg',120)}<div class="wrap"><div><div class="lb">${esc(tx(CA.etiqueta))}</div><div class="tt">${esc(tx(CA.despues))}</div></div><div></div>
    <div class="ac"><button class="btn sm" id="cago">${I('play')} ${t('cd_open')}</button></div></div></section>`;
}
function renderHome(){
  const v = currentVideo(), mob = matchMedia('(max-width:700px)').matches, src = (mob && v.mp4Movil) || v.mp4;
  const up = upcoming().slice(0, 3);
  const lineYears = [1977, 1987, 1997, 2007, 2017, 2027];
  // Banda de empresas: N filas, cada una en un sentido, empresas al azar y sin repetirse entre filas
  const MQ = Object.assign({ filas: 2, empresasPorFila: 30, segundosPorEmpresa: 2.6 }, C.marquesina || {});
  const pool = ALL.slice(); for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  const rows = Array.from({ length: Math.max(1, Math.min(6, MQ.filas)) }, (_, i) => pool.slice(i * MQ.empresasPorFila, (i + 1) * MQ.empresasPorFila)).filter(rw => rw.length >= 6);
  const mqItem = (e, dup) => `<a href="#/empresas/${e.num_asociada}"${dup ? ' tabindex="-1" aria-hidden="true"' : ''}>${mono(e)}${esc(shortName(e.nombre))}</a>`;
  const vb = videoBlock();
  $('#v-home').innerHTML = `
  <section class="hero-seq dk" id="hseq"${vb ? '' : ' data-novideo'}>
  <div class="hero" id="hero">
    ${src ? `<video id="hv" autoplay muted loop playsinline ${v.poster?`poster="${esc(v.poster)}"`:''} src="${esc(src)}"></video>` : `${v.imagen?`<img class="hph" src="${esc(v.imagen)}"${v.imagenMovil?` srcset="${esc(v.imagenMovil)} 1200w, ${esc(v.imagen)} 2400w" sizes="100vw"`:''} alt="${esc(tx(v.imagenAlt))}" fetchpriority="high">`:''}<div class="anim${v.imagen?' over':''}">${heroArt(!!v.imagen)}</div>`}
    <div class="shade"></div><div class="shade2"></div>
    <div class="wrap in">
      <div class="eyebrow rise" style="color:#d6cfc3;animation-delay:.3s">1977 – 2027 · Bizkaiko industria</div><div class="rule rise" style="animation-delay:.4s"></div>
      <h1 class="rise" style="animation-delay:.5s">${t('h1a')}<em>${t('h1b')}</em></h1>
      ${SEC.lema ? `<div class="tag rise" style="animation-delay:.8s">${t('lema')}</div>` : ''}
      ${SEC.botonesPortada ? `<div class="acts rise" style="animation-delay:1s"><button class="btn" id="playfull">${I('play')} ${t('watch')}</button><a class="btn ghost" href="#/agenda">${t('agenda27')} ${I('arrow')}</a></div>` : ''}
    </div>
    ${vb}
    ${src?`<div class="ctl"><button id="snd" aria-label="${t('sound_on')}">${I('mute')}</button></div>`:''}
    <button class="scroll" id="scrolldn"><span>${t('scroll')}</span><i></i></button>
    ${!src&&v.imagen&&tx(v.credito)?`<div class="credit">${esc(tx(v.credito))}</div>`:''}
  </div>
  </section>
  ${CA ? caStrip() : cdStrip()}
  ${SEC.agenda ? `<section class="dk pad"><div class="wrap">
    <div class="shead"><div><div class="eyebrow">${t('up_k')}</div><div class="rule"></div><h2 class="h2">${t('up_h')}</h2></div><a class="more-link" href="#/agenda">${t('up_all')} ${I('arrow')}</a></div>
    <div class="evs">${up.map(evCard).join('')}</div>
  </div></section>` : ''}
  ${SEC.cifras || SEC.buscador ? `<section class="lt pad"><div class="wrap">
    ${SEC.cifras ? `<div class="eyebrow">${t('st_k')}</div><div class="rule"></div><h2 class="h2" style="max-width:18ch">${t('st_h')}</h2>
    <div class="stats reveal" style="margin-top:44px">
      <div class="stat"><b class="num" data-count="${S.emp}">0</b><span>${t('st_emp')}</span></div>
      <div class="stat"><b class="num" data-count="${S.pl}">0</b><span>${t('st_pl')}</span></div>
      <div class="stat"><b class="num" data-count="${S.mun}">0</b><span>${t('st_mun')}</span></div>
      <div class="stat"><b class="num c" data-count="50">0</b><span>${t('st_y')}</span></div>
    </div>
    ${tx(CIF.nota) ? `<p class="mut" style="font-size:13px;margin-top:16px;color:var(--mut)">${esc(tx(CIF.nota))}</p>` : ''}` : ''}
    ${SEC.buscador ? `<div style="margin-top:${SEC.cifras?80:0}px"><div class="shead" style="margin-bottom:22px"><h3 style="font-size:clamp(26px,3vw,38px)">${t('se_h')}</h3><a class="more-link" href="#/empresas">${t('em_all')} ${I('arrow')}</a></div>
      <div class="sbox"><div class="f">${I('search')}<input id="hq" type="search" autocomplete="off" placeholder="${t('se_ph')}" aria-label="${t('se_h')}"></div><div class="drop" id="hdrop" hidden></div></div>
      <div class="marqs">${rows.map((rw, i) => `<div class="marq${i % 2 ? ' rev' : ''}"><div class="tr" style="--dur:${Math.round(rw.length * MQ.segundosPorEmpresa)}s">${rw.map(e => mqItem(e)).join('')}${rw.map(e => mqItem(e, true)).join('')}</div></div>`).join('')}</div>
    </div>` : ''}
  </div></section>` : ''}
  ${SEC.historia ? `<section class="dk pad"><div class="wrap hs">
    <div><div class="eyebrow">${t('hi_k')}</div><div class="rule"></div><h2 class="h2">${t('hi_h')}</h2><p class="lead" style="margin-top:16px">${t('hi_p')}</p>
      <div class="line reveal"><div class="ax"></div>${lineYears.map((y,i)=>{ const n = ALL.filter(e=>e.anio_alta>=y&&e.anio_alta<y+10).length, h = C.hitos.find(x=>x.anio===y);
        return `<a class="pt${y===1977||y===2027?' big':''}${i%2?' up':''}" href="#/historia" style="left:${(y-1977)/50*100}%"><i></i><b>${y}</b><small>${h?esc(tx(h)):(y<2027?`+${n}`:'')}</small></a>`; }).join('')}</div>
      <a class="more-link" href="#/historia">${t('hi_more')} ${I('arrow')}</a></div>
    ${cmpHTML('home')}
  </div></section>` : ''}
  ${SEC.personas ? `<section class="lt pad"><div class="wrap">
    <div class="shead"><div><div class="eyebrow">${t('pe_k')}</div><div class="rule"></div><h2 class="h2" style="max-width:16ch">${t('pe_h')}</h2><p class="lead" style="margin-top:14px">${t('pe_p')}</p></div><a class="more-link" href="#/personas">${t('pe_all')} ${I('arrow')}</a></div>
    <div class="pp">${C.personas.map(personCard).join('')}</div>
  </div></section>` : ''}
  ${SEC.participa ? `<section class="dk pad"><div class="wrap">
    <a class="cta-card a reveal" href="#/participa">${deco('d',260)}<div class="eyebrow">${t('nav_pa')}</div><div class="rule"></div><h3>${t('pa_h')}</h3><p>${t('pa_p')}</p><span class="btn" style="align-self:flex-start;margin-top:18px">${t('pa_btn')} ${I('arrow')}</span></a>
  </div></section>` : ''}`;
  const root = $('#v-home');
  if ($('#playfull')) $('#playfull').onclick = () => videoModal(v.completo);
  if ($('#vplay')) $('#vplay').onclick = playVideo;
  $('#scrolldn').onclick = () => { const s = $('#hseq'), tot = s.offsetHeight - innerHeight; scrollTo({top: s.offsetTop + (tot > 0 ? tot * .8 : innerHeight), behavior: 'smooth'}); };
  if ($('#caics')) $('#caics').onclick = () => icsFor({ slug: 'apertura-sobre', d0: new Date(CA.fecha), d1: new Date(new Date(CA.fecha).getTime() + 36e5), titulo: CA.titulo, lugar: CA.lugar || { es: 'Online', eu: 'Online' }, desc: CA.texto });
  if ($('#cago')) $('#cago').onclick = () => { $('#scrolldn').click(); };
  const hv = $('#hv'), snd = $('#snd');
  if (hv && snd) snd.onclick = () => { hv.muted = !hv.muted; snd.innerHTML = I(hv.muted ? 'mute' : 'sound'); snd.setAttribute('aria-label', t(hv.muted ? 'sound_on' : 'sound_off')); };
  if (hv) hv.onerror = () => { hv.outerHTML = `<div class="anim">${heroArt(false)}</div>`; sparks(); };
  if ($('#hq')) bindHomeSearch(); if ($('.cmp', root)) bindCmp(root); countUp(root); reveal(root); sparks(); bindCommon(root); tick(); heroScroll();
}
function heroScroll(){
  const s = $('#hseq'), h = $('#hero'); if (!s || !h || !$('#v-home').classList.contains('on')) return;
  const tot = s.offsetHeight - innerHeight, p = tot > 0 ? Math.min(1, Math.max(0, -s.getBoundingClientRect().top / tot)) : 0;
  h.style.setProperty('--p', p.toFixed(3)); h.classList.toggle('vis', p > .45);
}
function bindHomeSearch(){
  const q = $('#hq'), d = $('#hdrop'); let sel = -1;
  const draw = () => { const v = q.value.trim(); if (!v) { d.hidden = true; return; } const r = search(v); sel = -1;
    d.innerHTML = r.length ? r.slice(0,6).map(e => `<a href="#/empresas/${e.num_asociada}">${mono(e).replace('class="mono','style="width:40px" class="mono')}<span><b>${esc(shortName(e.nombre))}</b><small>${esc(e.municipio)} · ${t('since')} ${e.anio_alta}</small></span></a>`).join('')
      + (r.length > 6 ? `<a class="all" href="#/empresas" data-all>${t('se_all',{n:nf(r.length)})} →</a>` : '') : `<div class="none">${t('se_none')}</div>`;
    d.hidden = false; };
  q.oninput = draw; q.onfocus = draw;
  q.onkeydown = ev => { const it = $$('a', d);
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') { ev.preventDefault(); if (!it.length) return; sel = (sel + (ev.key === 'ArrowDown' ? 1 : -1) + it.length) % it.length; it.forEach((a,i)=>a.classList.toggle('act', i===sel)); }
    else if (ev.key === 'Enter') { ev.preventDefault(); if (sel >= 0) it[sel].click(); else { F.q = q.value; location.hash = '#/empresas'; } }
    else if (ev.key === 'Escape') d.hidden = true; };
  d.onclick = ev => { if (ev.target.closest('[data-all]')) F.q = q.value; };
  document.addEventListener('click', ev => { if (!ev.target.closest('.sbox')) d.hidden = true; });
}
function bindCommon(root){
  $$('[data-ics]', root).forEach(b => b.onclick = () => icsFor(EVS[b.dataset.ics]));
  $$('[data-live]', root).forEach(b => b.onclick = () => videoModal(GALA.directo));
  $$('[data-person]', root).forEach(a => a.onclick = ev => { if ($('#v-personas').classList.contains('on') || true) { ev.preventDefault(); const p = C.personas[+a.dataset.person]; videoModal(p.video); } });
}

/* =====================================================================
   AGENDA
   ===================================================================== */
const AG = { tipo: '', view: matchMedia('(max-width:700px)').matches ? 'list' : 'list', month: null };
function renderAgenda(){
  const months = [...new Set(EV.map(e => { const p = parts(e.d0); return p.y*12+p.m; }))].sort((a,b)=>a-b);
  if (AG.month == null) { const n = upcoming()[0]; const p = parts(n ? n.d0 : EV[0].d0); AG.month = p.y*12+p.m; }
  const list = EV.filter(e => !AG.tipo || e.tipo === AG.tipo);
  let body = '';
  if (AG.view === 'list') {
    const byM = {}; list.forEach(e => { const p = parts(e.d0); (byM[p.y*12+p.m] = byM[p.y*12+p.m] || []).push(e); });
    body = Object.keys(byM).map(k => { const y = Math.floor(k/12), m = k%12;
      return `<div class="month"><h3>${MES[L][m]} ${y}</h3>${byM[k].map(e => { const p = parts(e.d0), st = evState(e);
        return `<a class="row${st==='past'?' past':''}" href="#/agenda/${e.slug}"><div class="dt"><b class="num">${p.d}</b><span>${DOW[L][p.wd]}</span></div>
          <div><h4>${esc(tx(e.titulo))}</h4><div class="mt"><span>${I('clock')} ${fTime(e.d0)}–${fTime(e.d1)}</span><span>${I('pin')} ${esc(tx(e.lugar))}</span></div></div>
          <div class="rt"><span class="chip o">${esc(tx(C.tipos[e.tipo]))}</span>${stChip(e)}</div></a>`; }).join('')}</div>`; }).join('') || `<p class="mut">—</p>`;
  } else {
    const y = Math.floor(AG.month/12), m = AG.month%12, first = new Date(Date.UTC(y,m,1,12)), startDow = (first.getUTCDay()+6)%7, dim = new Date(Date.UTC(y,m+1,0)).getUTCDate();
    const tp = parts(NOW()); let cells = '';
    for (let i=0;i<startDow;i++) cells += `<div class="d out"></div>`;
    for (let d=1; d<=dim; d++) { const evs = list.filter(e => { const p = parts(e.d0); return p.y===y && p.m===m && p.d===d; });
      cells += `<div class="d${tp.y===y&&tp.m===m&&tp.d===d?' today':''}"><b>${d}</b>${evs.map(e=>`<a href="#/agenda/${e.slug}" title="${esc(tx(e.titulo))}">${esc(tx(e.titulo))}</a>`).join('')}</div>`; }
    for (let i = startDow + dim; i < Math.ceil((startDow+dim)/7)*7; i++) cells += `<div class="d out"></div>`;
    body = `<div class="cal"><div class="ch"><button data-mv="-1" ${AG.month<=months[0]?'disabled':''} aria-label="${t('prev')}">${I('left')}</button><b>${MES[L][m]} ${y}</b><button data-mv="1" ${AG.month>=months[months.length-1]?'disabled':''} aria-label="${t('next')}">${I('right')}</button></div>
      <div class="gd">${DOW[L].map(d=>`<div class="wd">${d}</div>`).join('')}${cells}</div></div>`;
  }
  $('#v-agenda').innerHTML = pageHead(t('nav_ag'), `${t('nav_ag')} <span class="acc">2027</span>`, t('ag_p'), 300) + `
  <section class="lt pad" style="padding-top:44px"><div class="wrap">
    <div class="fbar"><button class="pillbtn" data-tp="" aria-pressed="${!AG.tipo}">${t('all')}</button>${Object.keys(C.tipos).map(k=>`<button class="pillbtn" data-tp="${k}" aria-pressed="${AG.tipo===k}">${esc(tx(C.tipos[k]))}</button>`).join('')}
      <span class="sp"></span><div class="seg"><button data-v="list" aria-pressed="${AG.view==='list'}">${t('v_list')}</button><button data-v="cal" aria-pressed="${AG.view==='cal'}">${t('v_cal')}</button></div></div>
    ${body}
  </div></section>`;
  const r = $('#v-agenda');
  $$('[data-tp]', r).forEach(b => b.onclick = () => { AG.tipo = b.dataset.tp; renderAgenda(); });
  $$('[data-v]', r).forEach(b => b.onclick = () => { AG.view = b.dataset.v; renderAgenda(); });
  $$('[data-mv]', r).forEach(b => b.onclick = () => { const i = months.indexOf(AG.month); AG.month = AG.month + +b.dataset.mv; renderAgenda(); });
}
function renderEvento(slug){
  const e = EVS[slug]; if (!e) { location.hash = '#/agenda'; return; }
  const st = evState(e), more = upcoming().filter(x => x !== e).slice(0, 3);
  const ses = e.programa ? PRG.dias[0].sesiones : null;
  $('#v-evento').innerHTML = `
  <section class="dk evh"><div class="art">${artEvent(e.slug, 1600, 900)}</div><div class="shade"></div><div class="wrap in">
    <div class="crumb" style="color:#bbb"><a href="#/">${t('home')}</a><span>/</span><a href="#/agenda">${t('nav_ag')}</a></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px"><span class="chip">${esc(tx(C.tipos[e.tipo]))}</span>${stChip(e)}</div>
    <h1>${esc(tx(e.titulo))}</h1>
    <div class="mt"><span>${I('cal')} ${fLong(e.d0)}</span><span>${I('clock')} ${fTime(e.d0)}–${fTime(e.d1)}</span><span>${I('pin')} ${esc(tx(e.lugar))}</span></div>
  </div></section>
  <section class="lt pad"><div class="wrap evg">
    <div class="body">
      <p>${esc(tx(e.desc))}</p>
      ${st==='past'?`<div class="note" style="margin-top:20px">${t('ev_after')}</div>`:''}
      ${ses?`<h2 style="font-size:30px;margin:44px 0 10px">${t('ev_prog')}</h2>${ses.map(s=>`<div class="ses" style="grid-template-columns:110px 1fr;padding:16px 0"><div class="hr" style="font-size:22px">${s.ini}</div><div><h3 style="font-size:19px">${esc(tx(s.t))}</h3><div class="pl">${esc(tx(s.sala))}</div></div></div>`).join('')}
        <a class="more-link" style="margin-top:20px" href="#/programa">${t('ev_prog_all')} ${I('arrow')}</a>`:''}
    </div>
    <aside class="side">
      ${st==='past'?`<div class="eyebrow">${t('s_past')}</div>`:st==='live'?`<span class="chip c live">${t('s_live')}</span>`:`<div class="eyebrow">${t('ev_left')}</div>${cdHTML(e.ini)}`}
      <div class="acts">
        ${st==='past'||st==='live'?'':(e.url?`<a class="btn" href="${esc(e.url)}" target="_blank" rel="noopener">${t('ev_reg')}</a>`:e.inscripcion?`<span class="btn" aria-disabled="true">${t(e.inscripcion==='abierta'?'ev_reg':'ev_reg_soon')}</span>`:'')}
        ${st==='past'?'':`<button class="btn ghost" data-ics="${e.slug}">${I('cal')} ${t('add_cal')}</button>`}
        <a class="btn ghost" href="${maps(tx(e.lugar))}" target="_blank" rel="noopener">${I('pin')} ${t('ev_route')}</a>
        <button class="btn ghost" id="evsh">${I('share')} ${t('ev_share')}</button>
      </div>
      <dl><div><dt>${t('ev_when')}</dt><dd>${fLong(e.d0)}</dd></div><div><dt>${t('ev_time')}</dt><dd>${fTime(e.d0)}–${fTime(e.d1)}</dd></div><div><dt>${t('ev_where')}</dt><dd>${esc(tx(e.lugar))}</dd></div><div><dt>${t('ev_type')}</dt><dd>${esc(tx(C.tipos[e.tipo]))}</dd></div></dl>
    </aside>
  </div></section>
  ${more.length?`<section class="dk pad"><div class="wrap"><div class="shead"><h2 class="h2" style="font-size:clamp(28px,3.4vw,42px)">${t('ev_more')}</h2><a class="more-link" href="#/agenda">${t('up_all')} ${I('arrow')}</a></div><div class="evs">${more.map(evCard).join('')}</div></div></section>`:''}`;
  const r = $('#v-evento'); $('#evsh').onclick = () => share(tx(e.titulo), '#/agenda/' + e.slug); bindCommon(r); reveal(r); tick();
}

/* =====================================================================
   PROGRAMA
   ===================================================================== */
let PDAY = 0;
function renderPrograma(){
  const n = NOW(); const today = PRG.dias.findIndex(d => d.fecha === `${parts(n).y}-${pad(parts(n).m+1)}-${pad(parts(n).d)}`); if (today >= 0 && renderPrograma.first !== false) { PDAY = today; } renderPrograma.first = false;
  const d = PRG.dias[PDAY];
  $('#v-programa').innerHTML = pageHead(t('nav_pr'), `${esc(tx(PEV.titulo))}`, `${fLong(PEV.d0)} · ${esc(tx(PEV.lugar))}<br>${t('pr_p')}`, 40) + `
  <section class="lt pad" style="padding-top:40px"><div class="wrap">
    <div class="fbar" style="margin-bottom:6px"><span class="sp"></span><button class="btn sm ghost" data-ics="${PEV.slug}">${I('cal')} ${t('add_cal')}</button><button class="btn sm" id="pdf">${I('dl')} ${t('pr_pdf')}</button></div>
    <div class="tabs" role="tablist">${PRG.dias.map((x,i)=>{ const dd = new Date(x.fecha+'T12:00:00'+OFF), p = parts(dd); return `<button role="tab" aria-selected="${i===PDAY}" data-day="${i}">${DOW[L][p.wd]} ${p.d} ${MESC[L][p.m]} · ${esc(tx(x.titulo))}</button>`; }).join('')}</div>
    ${d.sesiones.map(s => { const a = sesD(d,s.ini), b = sesD(d,s.fin), cls = n >= a && n < b ? ' now' : n >= b ? ' done' : '';
      return `<div class="ses${cls}"><div class="hr num">${s.ini}<small>${s.ini}–${s.fin}</small>${cls===' now'?`<span class="chip c live" style="margin-top:8px">${t('now')}</span>`:''}</div>
        <div><h3>${esc(tx(s.t))}</h3><div class="pl">${I('pin').replace('class="ic"','class="ic" style="width:15px;height:15px;vertical-align:-2px"')} ${esc(tx(s.sala))}</div>
        ${s.ponentes?`<div class="sp">${s.ponentes.map(p=>`<span class="spk"><i></i>${esc(p)}</span>`).join('')}</div>`:''}</div></div>`; }).join('')}
  </div></section>`;
  const r = $('#v-programa'); $$('[data-day]', r).forEach(b => b.onclick = () => { PDAY = +b.dataset.day; renderPrograma(); }); $('#pdf').onclick = () => print(); bindCommon(r);
}

/* =====================================================================
   EMPRESAS
   ===================================================================== */
const F = {q:'', s:'', z:'', m:'', t:'', d:'', fu:false, so:'az', view:'grid', n:60};
const SIZES = [[1,9],[10,49],[50,249],[250,1e9]], DECS = [1970,1980,1990,2000,2010,2020];
const uniq = k => [...new Set(ALL.map(e=>e[k]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es',{numeric:true}));
function filtered(){
  let r = search(F.q);
  if (F.s) r = r.filter(e=>e.sector===F.s); if (F.z) r = r.filter(e=>e.zona===F.z); if (F.m) r = r.filter(e=>e.municipio===F.m);
  if (F.t) { const [a,b] = SIZES[F.t-1]; r = r.filter(e=>plOk(e)&&e.plantilla>=a&&e.plantilla<=b); }
  if (F.d) r = r.filter(e=>e.anio_alta>=+F.d && e.anio_alta<+F.d+10);
  if (F.fu) r = r.filter(isF);
  const so = {num:(a,b)=>a.num_asociada.localeCompare(b.num_asociada), az:(a,b)=>a.nombre.localeCompare(b.nombre,'es'), pl:(a,b)=>(b.plantilla??-1)-(a.plantilla??-1), new:(a,b)=>b.anio_alta-a.anio_alta};
  return r.sort(so[F.so]);
}
let LAST = [];
function renderEmpresas(){
  const opt = (v,l,s) => `<option value="${esc(v)}"${s?' selected':''}>${esc(l)}</option>`;
  $('#v-empresas').innerHTML = pageHead(t('nav_em'), `${t('em_h')}`, t('em_p'), 100) + `
  <section class="lt pad" style="padding-top:44px"><div class="wrap">
    <div class="ctr">
      <div class="q">${I('search')}<input id="dq" type="search" autocomplete="off" value="${esc(F.q)}" placeholder="${t('se_ph')}" aria-label="${t('se_h')}"></div>
      ${HAS_SEC?`<div class="sel"><select data-f="s">${opt('',t('by_s'))}${uniq('sector').map(s=>opt(s,secn(s),F.s===s)).join('')}</select></div>`:''}
      <div class="sel"><select data-f="z">${opt('',t('all_z'))}${uniq('zona').map(s=>opt(s,zn(s),F.z===s)).join('')}</select></div>
      <div class="sel"><select data-f="m">${opt('',t('all_m'))}${uniq('municipio').map(s=>opt(s,s,F.m===s)).join('')}</select></div>
      <div class="sel"><select data-f="t">${opt('',t('all_t'))}${[1,2,3,4].map(i=>opt(i,t('t'+i),F.t==i)).join('')}</select></div>
      <div class="sel"><select data-f="d">${opt('',t('all_d'))}${DECS.map(d=>opt(d,t('dec')+(d===1970?'70':String(d).slice(2)),F.d==d)).join('')}</select></div>
      ${S.fun ? `<button class="pillbtn fu" id="ffu" aria-pressed="${F.fu}">★ ${t('founders')} <span class="num">${nf(S.fun)}</span></button>` : ''}
    </div>
    <div class="meta"><div class="cnt" id="cnt"></div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><button class="clear" id="clr">${t('clear')}</button>
        <div class="sel"><select data-f="so">${[['az','so_az'],['num','so_num'],['pl','so_pl'],['new','so_new']].map(([v,k])=>opt(v,t(k),F.so===v)).join('')}</select></div>
        <div class="seg"><button data-view="grid" aria-pressed="${F.view==='grid'}">${t('v_grid')}</button><button data-view="list" aria-pressed="${F.view==='list'}">${t('v_list')}</button></div></div></div>
    <div id="res"></div>
    <div style="display:flex;justify-content:center;margin-top:34px"><button class="btn" id="more">${t('more')}</button></div>
  </div></section>
  <section class="dk pad"><div class="wrap"><div class="eyebrow">Bizkaia</div><div class="rule"></div><h2 class="h2">${t('map_h')}</h2>
    <div class="mapg"><div class="panel"><p class="s">${t('map_p')}</p><div class="map" id="map"><span class="sea">${t('sea')}</span></div></div>
    <div class="panel"><h3>${HAS_SEC?t('by_s'):t('by_z')}</h3><p class="s">${t('bars_p')}</p><div class="bars" id="bars"></div></div></div>
  </div></section>`;
  const r = $('#v-empresas');
  $('#dq').oninput = ev => { F.q = ev.target.value; drawDir(true); };
  $$('select[data-f]', r).forEach(s => s.onchange = () => { F[s.dataset.f] = s.value; drawDir(true); drawMap(); drawBars(); });
  $('#clr').onclick = () => { Object.assign(F,{q:'',s:'',z:'',m:'',t:'',d:'',fu:false}); renderEmpresas(); };
  if ($('#ffu')) $('#ffu').onclick = () => { F.fu = !F.fu; $('#ffu').setAttribute('aria-pressed', F.fu); drawDir(true); };
  $$('[data-view]', r).forEach(b => b.onclick = () => { F.view = b.dataset.view; $$('[data-view]', r).forEach(x=>x.setAttribute('aria-pressed', x===b)); drawDir(true); });
  $('#more').onclick = () => { F.n += 60; drawDir(); };
  drawDir(true); drawMap(); drawBars();
}
function drawDir(reset){
  if (reset) F.n = 60;
  const r = LAST = filtered(), shown = r.slice(0, F.n), res = $('#res');
  $$('#v-empresas select[data-f]').forEach(s => { if (s.dataset.f !== 'so') s.classList.toggle('on', !!s.value); });
  $('#clr').hidden = !(F.q||F.s||F.z||F.m||F.t||F.d||F.fu);
  $('#cnt').innerHTML = `<b class="num">${nf(r.length)}</b> ${t('companies')} · <span class="num">${nf(r.reduce((a,e)=>a+(e.plantilla||0),0))}</span> ${t('people')}`;
  if (!r.length) { res.innerHTML = `<p class="mut" style="text-align:center;padding:40px 0;color:var(--mut)">${t('se_none')}</p>`; $('#more').hidden = true; return; }
  res.innerHTML = F.view === 'grid'
    ? `<div class="cards">${shown.map((e,i)=>`<a class="card" href="#/empresas/${e.num_asociada}" style="animation-delay:${Math.min(i,30)*15}ms">${mono(e,true)}<span class="nm">${esc(shortName(e.nombre))}</span><span class="sub">${esc(e.municipio)} · ${esc(grp(e))}</span>
        <span class="tags"><span class="chip ${isF(e)?'c':'o'} num">${t('since')} ${e.anio_alta}</span>${plOk(e)?`<span class="chip num">${nf(e.plantilla)} ${L==='es'?'pers.':'pert.'}</span>`:''}</span></a>`).join('')}</div>`
    : `<table class="list"><thead><tr><th>${t('num')}</th><th>${L==='es'?'Empresa':'Enpresa'}</th><th class="hm">${t('zone')}</th><th class="hm">${t('mun')}</th><th class="r">${t('since')}</th><th class="r">${t('pl')}</th></tr></thead><tbody>
      ${shown.map(e=>`<tr data-n="${e.num_asociada}"><td class="num">${e.num_asociada}</td><td><span class="n">${mono(e)}<a href="#/empresas/${e.num_asociada}" style="text-decoration:none">${esc(shortName(e.nombre))}</a></span></td><td class="hm">${esc(zn(e.zona))}</td><td class="hm">${esc(e.municipio)}</td><td class="r num">${e.anio_alta}</td><td class="r num">${plOk(e)?nf(e.plantilla):'—'}</td></tr>`).join('')}</tbody></table>`;
  $$('tr[data-n]', res).forEach(tr => tr.onclick = () => location.hash = '#/empresas/' + tr.dataset.n);
  $('#more').hidden = shown.length >= r.length;
}
function filterGo(k, v){ F[k] = F[k] === v ? '' : v; renderEmpresas(); setTimeout(() => $('#v-empresas .ctr').scrollIntoView({behavior:'smooth', block:'center'}), 50); }
const GEO = {bilbao:[43.263,-2.935],barakaldo:[43.297,-2.989],sestao:[43.309,-3.006],portugalete:[43.320,-3.020],santurtzi:[43.328,-3.032],valledetrapagatrapagaran:[43.304,-3.031],trapagaran:[43.304,-3.031],ortuella:[43.311,-3.057],abantozierbena:[43.320,-3.080],muskiz:[43.322,-3.112],zierbena:[43.352,-3.082],
 getxo:[43.356,-3.012],leioa:[43.328,-2.987],erandio:[43.304,-2.973],berango:[43.364,-2.995],sopela:[43.380,-2.983],barrika:[43.401,-2.966],plentzia:[43.405,-2.945],gorliz:[43.415,-2.940],urduliz:[43.377,-2.960],derio:[43.293,-2.884],zamudio:[43.284,-2.866],lezama:[43.274,-2.834],loiu:[43.312,-2.937],sondika:[43.300,-2.926],
 larrabetzu:[43.262,-2.796],mungia:[43.355,-2.846],gamizfika:[43.317,-2.808],galdakao:[43.231,-2.843],basauri:[43.237,-2.886],etxebarri:[43.247,-2.889],arrigorriaga:[43.206,-2.888],zaratamo:[43.212,-2.869],ugaomiraballes:[43.181,-2.906],bedia:[43.209,-2.800],lemoa:[43.211,-2.775],igorre:[43.166,-2.776],
 orozko:[43.104,-2.910],arrankudiaga:[43.174,-2.917],amorebietaetxano:[43.220,-2.733],durango:[43.170,-2.631],iurreta:[43.178,-2.633],abadino:[43.153,-2.606],berriz:[43.175,-2.575],atxondo:[43.130,-2.586],elorrio:[43.130,-2.541],zaldibar:[43.170,-2.546],manaria:[43.137,-2.661],ermua:[43.187,-2.502],mallabia:[43.190,-2.528],
 garai:[43.193,-2.611],izurtza:[43.155,-2.640],markinaxemein:[43.267,-2.497],ondarroa:[43.321,-2.420],lekeitio:[43.363,-2.505],gernikalumo:[43.316,-2.678],bermeo:[43.420,-2.722],muxika:[43.287,-2.687],ajangiz:[43.300,-2.660],balmaseda:[43.193,-3.193],zalla:[43.214,-3.135],gueenes:[43.212,-3.096],guenes:[43.212,-3.096],sopuerta:[43.264,-3.152],
 gordexola:[43.180,-3.075],alonsotegi:[43.244,-2.987],karrantza:[43.240,-3.370],fruiz:[43.330,-2.786],menaka:[43.364,-2.802],gatika:[43.363,-2.882],laukiz:[43.346,-2.903],lemoiz:[43.416,-2.909],maruri:[43.383,-2.866],mundaka:[43.407,-2.698],busturia:[43.384,-2.698],dima:[43.103,-2.722],zeanuri:[43.099,-2.750],areatza:[43.121,-2.770],
 artea:[43.135,-2.780],berriatua:[43.310,-2.464],etxebarria:[43.252,-2.477],galdames:[43.255,-3.098],murueta:[43.354,-2.683],laudiollodio:[43.143,-2.962],
 urdunaorduna:[42.994,-3.009],usansolo:[43.219,-2.818]};
const gkey = m => norm(m).replace(/[^a-z]/g,'');
function drawMap(){
  const m = $('#map'); if (!m) return; m.querySelectorAll('.mb').forEach(x=>x.remove());
  const W = m.clientWidth || 600, H = m.clientHeight || 375, pts = ALL.map(e=>GEO[gkey(e.municipio)]).filter(Boolean);
  let BB = {lo0:-3.3,lo1:-2.4,la0:43.08,la1:43.45};
  if (pts.length) { let la0=Math.min(...pts.map(p=>p[0])),la1=Math.max(...pts.map(p=>p[0])),lo0=Math.min(...pts.map(p=>p[1])),lo1=Math.max(...pts.map(p=>p[1]));
    const k=Math.cos(43.25*Math.PI/180), ar=W/H; let wx=Math.max((lo1-lo0)*k,.12)*1.4, hy=Math.max(la1-la0,.08)*1.6; if (wx/hy<ar) wx=hy*ar; else hy=wx/ar;
    const cl=(lo0+lo1)/2, ca=(la0+la1)/2; BB={lo0:cl-wx/k/2,lo1:cl+wx/k/2,la0:ca-hy/2,la1:ca+hy/2}; }
  const proj = ([la,lo]) => [100*(lo-BB.lo0)/(BB.lo1-BB.lo0), 100*(BB.la1-la)/(BB.la1-BB.la0)];
  const cnt = {}; ALL.forEach(e => { if (e.municipio) cnt[e.municipio] = (cnt[e.municipio]||0)+1; });
  const pos = mu => { const g = GEO[gkey(mu)]; return g ? proj(g) : [50,50]; };
  const arr = Object.entries(cnt).sort((a,b)=>b[1]-a[1]), max = arr[0]?.[1] || 1, dia = n => 1.6 + 5.2*Math.sqrt(n/max);
  arr.slice().reverse().forEach(([mu,n],i) => { const [x,y] = pos(mu), d = dia(n), b = document.createElement('button');
    b.className = 'mb' + (F.m===mu?' on':''); b.dataset.mu = mu; b.style.cssText = `left:${x}%;top:${y}%;width:${d}cqw;height:${d}cqw;animation-delay:${i*40}ms`;
    b.title = `${mu} · ${n}`; b.innerHTML = (d > 3.4 ? `<b class="num">${n}</b>` : '') + `<span class="ml">${esc(mu)}</span>`; b.onclick = () => filterGo('m', mu); m.appendChild(b); });
  const placed = arr.map(([mu,n]) => { const [x,y] = pos(mu), r = dia(n)/200*W; return [x/100*W-r, y/100*H-r, x/100*W+r, y/100*H+r]; });
  arr.forEach(([mu,n]) => { const [x,y] = pos(mu), d = dia(n)/100*W, lw = mu.length*6.6+6, cx = x/100*W, cy = y/100*H + d/2 + 4, box = [cx-lw/2, cy, cx+lw/2, cy+15];
    const hit = placed.some(p => !(box[2]<p[0]||box[0]>p[2]||box[3]<p[1]||box[1]>p[3])) || box[0] < 0 || box[2] > W || box[3] > H;
    if (!hit) placed.push(box); else m.querySelector(`.mb[data-mu="${CSS.escape(mu)}"]`).classList.add('nolbl'); });
}
function drawBars(){
  const key = HAS_SEC ? 'sector' : 'zona', fk = HAS_SEC ? 's' : 'z', lab = HAS_SEC ? secn : zn, cnt = {};
  ALL.forEach(e => { if (e[key]) cnt[e[key]] = (cnt[e[key]]||0)+1; });
  const arr = Object.entries(cnt).sort((a,b)=> HAS_SEC ? b[1]-a[1] : a[0].localeCompare(b[0],'es',{numeric:true})), max = Math.max(...arr.map(x=>x[1]), 1);
  $('#bars').innerHTML = arr.map(([s,n]) => `<button class="bar${F[fk]===s?' on':''}" data-s="${esc(s)}"><span class="t"><span class="fill" style="width:${Math.max(12,n/max*100)}%"></span><span class="nm">${esc(lab(s))}</span></span><span class="c num">${n}</span></button>`).join('');
  $$('#bars .bar').forEach(b => b.onclick = () => filterGo(fk, b.dataset.s));
}

/* ---------- ficha ---------- */
let oldPhoto = false;
function renderFicha(num){
  const e = BYNUM[num]; if (!e) { location.hash = '#/empresas'; return; }
  const list = LAST.length && LAST.includes(e) ? LAST : ALL.slice().sort((a,b)=>a.nombre.localeCompare(b.nombre,'es')); const i = list.indexOf(e);
  const prev = list[(i-1+list.length)%list.length], next = list[(i+1)%list.length];
  const yrs = yrsWith(e), C2 = 2*Math.PI*48, frac = Math.min(1, yrs/50), same = (PERY[e.anio_alta]||[]).length - 1;
  const rel = ALL.filter(x => x !== e && (HAS_SEC ? x.sector === e.sector : x.zona === e.zona)).sort((a,b)=>a.anio_alta-b.anio_alta).slice(0, 8);
  const ph = oldPhoto ? (e.foto_historica ? `<img alt="" src="${esc(e.foto_historica)}">` : factory(e.nombre, true)) : (e.foto ? `<img alt="" src="${esc(e.foto)}">` : factory(e.nombre, false));
  const pend = oldPhoto ? !e.foto_historica : !e.foto, px = y => ((y-FUND)/(ANIV-FUND)*100).toFixed(2);
  const since = e.fecha_alta ? e.fecha_alta + 'T00:00:00+01:00' : `${e.anio_alta}-01-01T00:00:00+01:00`;
  const desc = (L==='eu' ? e.descripcion_eu : e.descripcion_es) || e.descripcion_es || t('desc',{y:e.anio_alta, m:e.municipio});
  const frase = (L==='eu' ? e.frase_eu : e.frase_es) || e.frase_es;
  $('#v-ficha').innerHTML = `<section class="lt" style="padding:clamp(28px,4vw,48px) 0 90px"><div class="wrap">
    <div class="crumb"><a href="#/">${t('home')}</a><span>/</span><a href="#/empresas">${t('nav_em')}</a><span>/</span><span>${e.num_asociada}</span></div>
    <div class="fx">
      <div class="fxl"><div class="bw"><div class="bg">
        <div class="m f-nm${e.nombre.length>34?' long':''}" style="--i:0">${esc(e.nombre)}</div>
        <div class="m f-num" style="--i:1"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48" stroke="#333"/><circle cx="50" cy="50" r="48" stroke="#d86b33" stroke-width="2.4" stroke-dasharray="${(C2*frac).toFixed(1)} ${C2.toFixed(1)}" stroke-linecap="round"/></svg>
          <span class="l">${t('num')}</span><span class="v num">${e.num_asociada}</span><span class="l2">${isF(e)?'★ '+t('founder'):yrs+' '+t('with')}</span></div>
        <div class="m cu q1" style="--i:2;grid-column:3;grid-row:2"><span class="l">${e.sector?t('sector'):t('zone')}</span><span class="v s">${esc(grp(e))}</span></div>
        <div class="m" style="--i:3;grid-column:4;grid-row:2"><span class="l">${t('pl')}</span><span class="v num">${plOk(e)?nf(e.plantilla):'—'}</span></div>
        <div class="m mt q3" style="--i:4;grid-column:3;grid-row:3"><span class="l">${t('mun')}</span><span class="v s">${esc(e.municipio)}</span></div>
        <div class="m cu" style="--i:5;grid-column:4;grid-row:3"><span class="l">${t('years')}</span><span class="v num">${yrs}</span></div>
        <div class="m yr num" style="--i:6;grid-column:1;grid-row:4">${e.anio_alta}</div>
        <div class="m ol" style="--i:7;grid-column:2;grid-row:4"><span style="width:16%;height:16%;border-radius:50%;background:var(--cobre)"></span></div>
        <div class="m ol" style="--i:8;grid-column:3;grid-row:4"><span style="width:16%;height:16%;border-radius:50%;background:var(--cobre)"></span></div>
        <div class="m yr cu num" style="--i:9;grid-column:4;grid-row:4">${e.anio_baja||ANIV}</div>
        ${e.web?`<a class="m q2" style="--i:10;grid-column:1;grid-row:5" href="${esc(e.web)}" target="_blank" rel="noopener">${I('web')}<span class="l">${t('web')}</span></a>`
          :`<a class="m q2" style="--i:10;grid-column:1;grid-row:5" href="${maps(eAddr(e))}" target="_blank" rel="noopener">${I('pin')}<span class="l">${t('route')}</span></a>`}
        <button class="m" style="--i:11;grid-column:1;grid-row:6" id="fsh">${I('share')}<span class="l">${t('share')}</span></button>
        <button class="m${oldPhoto?' cu':' mt'}" style="--i:12;grid-column:1;grid-row:7" id="fold" aria-pressed="${oldPhoto}">${I('clock')}<span class="l">${t('oldnew')}</span></button>
        <div class="m f-ph${oldPhoto?' old':''}" style="--i:13">${ph}${pend?`<span class="tg">${t('ph_pend')}</span>`:''}</div>
        <div class="m ${e.logo && e.logo_fondo === 'oscuro' ? '' : 'wt'}" style="--i:14;grid-column:1;grid-row:8">${mono(e)}</div>
        <a class="m ol" style="--i:15;grid-column:2;grid-row:8" href="#/empresas/${prev.num_asociada}" aria-label="${t('prev')}">${I('left')}</a>
        <a class="m ol" style="--i:16;grid-column:3;grid-row:8" href="#/empresas/${next.num_asociada}" aria-label="${t('next')}">${I('right')}</a>
        ${e.web?`<a class="m wt" style="--i:17;grid-column:4;grid-row:8" href="${esc(e.web)}" target="_blank" rel="noopener" aria-label="QR"><span class="qr">${qrSVG(e.web)}</span></a>`:`<div class="m ol" style="--i:17;grid-column:4;grid-row:8"><span class="l">${t('noweb')}</span></div>`}
      </div></div>${e.web?`<div class="qrcap">${t('qr')}</div>`:''}</div>
      <div class="fxr">
        <div class="badges">${isF(e)?`<span class="chip c">★ ${t('founder_l')}</span>`:''}<span class="chip o">${esc(zn(e.zona))}</span><span class="chip o">${esc(e.municipio)}</span></div>
        <h1>${esc(shortName(e.nombre))}</h1>
        <p class="lead">${esc(desc)}</p>
        <div class="since">${deco('d',30)}<div class="eyebrow">${t('since_k')}</div>${cdHTML(since, true)}<p style="margin:0;color:#b2aca2;font-size:14.5px">${t('since_s')}</p>
          <button class="btn sm" id="card" style="margin-top:18px">${I('dl')} ${t('card_dl')}</button></div>
        ${frase?`<div class="box" style="background:var(--cobre);color:#fff;border:0"><div class="k" style="color:#fff">50</div><p style="font-size:24px;font-weight:600;letter-spacing:-.02em;line-height:1.2">«${esc(frase)}»</p></div>`:''}
        <dl class="facts">
          <div><dt>${t('num')}</dt><dd class="num">${e.num_asociada}</dd></div>
          <div><dt>${e.fecha_alta?t('date'):t('since')}</dt><dd class="num">${e.fecha_alta?fDate(e.fecha_alta):e.anio_alta}</dd></div>
          <div><dt>${t('pl')}</dt><dd class="num">${plOk(e)?nf(e.plantilla)+' '+t('people'):'—'}</dd></div>
          <div><dt>${e.sector?t('sector'):t('zone')}</dt><dd>${esc(e.sector?secl(e):grp(e))}</dd></div>
          ${e.sector?`<div><dt>${t('zone')}</dt><dd>${esc(zn(e.zona))}</dd></div><div><dt>${t('mun')}</dt><dd>${esc(e.municipio)}</dd></div>`:''}
          ${e.direccion?`<div class="w"><dt>${t('addr')}</dt><dd>${esc(e.direccion)}, ${esc(e.cp)} ${esc(e.municipio)} · <a href="${maps(eAddr(e))}" target="_blank" rel="noopener" class="acc">${t('route')} ↗</a></dd></div>`:''}
          ${e.web?`<div class="w"><dt>${t('web')}</dt><dd><a href="${esc(e.web)}" target="_blank" rel="noopener">${esc(e.web.replace(/^https?:\/\//,''))}</a></dd></div>`:''}
        </dl>
        <div class="box"><div class="k">${t('hist_k')}</div><p>${same>1?t('hist_t',{y:e.anio_alta,n:same}):same===1?t('hist_t1',{y:e.anio_alta}):t('hist_t0',{y:e.anio_alta})}</p>
          <div class="hist"><span class="ln"></span><span class="fl" style="left:${px(e.anio_alta)}%"></span><span class="pt" style="left:${px(e.anio_alta)}%"></span><span class="pt" style="left:100%;background:var(--fg)"></span>
            ${px(e.anio_alta)>14?'<span class="ax num" style="left:0">1977</span>':''}<span class="ax num" style="left:${Math.min(90,Math.max(0,px(e.anio_alta)))}%;transform:translateX(${px(e.anio_alta)<8?'0':'-50%'});color:var(--fg);font-weight:600">${e.anio_alta}</span>${px(e.anio_alta)<84?'<span class="ax num" style="right:0">2027</span>':''}</div></div>
        ${rel.length?`<div class="box"><div class="k">${HAS_SEC?t('rel_s'):t('rel_z')}</div><div class="rel">${rel.map(x=>`<a href="#/empresas/${x.num_asociada}">${mono(x)}<span>${esc(shortName(x.nombre))}</span></a>`).join('')}</div></div>`:''}
        <div class="pn"><a href="#/empresas/${prev.num_asociada}"><small>← ${t('prev')}</small><b>${esc(shortName(prev.nombre))}</b></a><a href="#/empresas/${next.num_asociada}" style="text-align:right"><small>${t('next')} →</small><b>${esc(shortName(next.nombre))}</b></a></div>
      </div>
    </div></div></section>`;
  $('#fsh').onclick = () => share(shortName(e.nombre) + ' · FVEM 50', '#/empresas/' + e.num_asociada);
  $('#fold').onclick = () => { oldPhoto = !oldPhoto; const y = scrollY; renderFicha(num); scrollTo(0, y); };
  $('#card').onclick = () => cardPNG(e);
  tick();
}
async function cardPNG(e){
  const W = 1080, H = 1350, cv = document.createElement('canvas'); cv.width = W; cv.height = H; const x = cv.getContext('2d');
  try { await document.fonts.ready; } catch (_) {}
  const F = (w, s) => `${w} ${s}px "Geist", system-ui, sans-serif`;
  const g = x.createRadialGradient(W*.8, H*.25, 50, W*.6, H*.4, W); g.addColorStop(0,'#3b2214'); g.addColorStop(.5,'#121010'); g.addColorStop(1,'#070707'); x.fillStyle = g; x.fillRect(0,0,W,H);
  const mg = x.createLinearGradient(500,0,1080,600); [['#ececec',0],['#7c7c7c',.35],['#dedede',.55],['#6c6c6c',.8],['#b8b8b8',1]].forEach(([c,o])=>mg.addColorStop(o,c));
  x.beginPath(); x.arc(860, 330, 300, Math.PI*.25, Math.PI*1.75); x.arc(860, 330, 210, Math.PI*1.75, Math.PI*.25, true); x.closePath(); x.fillStyle = mg; x.fill();
  x.beginPath(); x.arc(860, 330, 170, Math.PI, Math.PI*1.5); x.arc(860, 330, 120, Math.PI*1.5, Math.PI, true); x.closePath(); x.fillStyle = '#d86b33'; x.fill();
  x.strokeStyle = '#d86b33'; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 585); x.lineTo(860, 585); x.stroke();
  await new Promise(r => { const im = new Image(); im.onload = () => { const h = 110, w = im.width*h/im.height; x.drawImage(im, 80, 80, w, h); r(); }; im.onerror = r; im.src = LOGO; });
  x.fillStyle = '#b2aca2'; x.font = F(500, 30); x.fillText((L==='eu'?'FVEMEKO BAZKIDEA':'SOCIA DE FVEM DESDE').split('').join(String.fromCharCode(8202)), 80, 720);
  x.fillStyle = '#d86b33'; x.font = F(300, 230); x.fillText(String(e.anio_alta), 66, 920);
  x.fillStyle = '#f5f2eb'; x.font = F(600, 58); const words = shortName(e.nombre).split(' '); let line = '', y = 1030;
  for (const w of words) { const test = line ? line + ' ' + w : w; if (x.measureText(test).width > 920 && line) { x.fillText(line, 80, y); y += 68; line = w; } else line = test; } x.fillText(line, 80, y);
  const days = Math.floor((Date.now() - new Date(e.fecha_alta || `${e.anio_alta}-01-01`)) / 864e5);
  x.font = F(400, 34); x.fillStyle = '#b2aca2'; x.fillText(`${nf(days)} ${L==='eu'?'egun':'días'} · ${yrsWith(e)} ${t('with')}`, 80, y + 70);
  x.fillStyle = '#d86b33'; x.fillRect(80, H-150, 60, 5); x.font = F(500, 28); x.fillStyle = '#f5f2eb'; x.fillText(`1977 – 2027 · ${L==='eu'?'Industriaren 50 urte':'50 años de industria'}`, 80, H-90);
  cv.toBlob(b => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `fvem50-${e.num_asociada}.png`; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href), 3000); }, 'image/png');
}

/* =====================================================================
   HISTORIA
   ===================================================================== */
function renderHistoria(){
  const max = Math.max(...Object.values(PERY).map(a=>a.length), 1);
  let bars = ''; for (let y = FUND; y <= ANIV; y++) { const n = (PERY[y]||[]).length;
    bars += `<button class="yb${y===FUND?' f':''}${y===ANIV?' fut':''}" data-y="${y}" aria-label="${y}: ${n}"><i style="height:${y===ANIV?0:Math.max(2,n/max*92)}%"></i><span class="tip num">${y}${y===ANIV?' · 50':' · '+n}</span></button>`; }
  $('#v-historia').innerHTML = pageHead(t('nav_hi'), `1977 <span class="acc">→</span> 2027`, t('hs_p'), 140) + `
  <section class="lt pad" style="padding-top:44px"><div class="wrap">
    <div class="tlb" id="tlb">${bars}</div><div class="tlax num"><b>1977 · ${esc(tx(C.hitos[0]))}</b><span>1987</span><span>1997</span><span>2007</span><span>2017</span><b>${esc(tx(C.hitos.find(h=>h.anio===2027)||{es:''}))} · 2027</b></div>
    <div class="yp"><div class="yy"><b class="num" id="yv">1977</b><small id="ys"></small></div>
      <div><h3 style="font-size:26px">${t('born_h')}</h3><label for="yr" style="color:var(--mut);font-size:14px;display:block;margin:6px 0 10px">${t('born_l')}</label><input type="range" id="yr" min="1977" max="2026" value="1977"><div class="chips" id="yc"></div></div></div>
  </div></section>
  <section class="dk pad"><div class="wrap"><div class="eyebrow">1977 – 2027</div><div class="rule"></div><h2 class="h2">${t('decs_h')}</h2>
    <div class="decs">${DECS.map(d => { const n = ALL.filter(e=>e.anio_alta>=d&&e.anio_alta<d+10).length, hs = C.hitos.filter(h=>h.anio>=d&&h.anio<d+10);
      return `<div class="dec reveal"><div class="y num">${String(d).slice(0,2)}<span>${String(d).slice(2)}</span></div><div class="n">${t('dec_n',{n})}</div>
        ${hs.length?hs.map(h=>`<div class="hit"><b>${h.anio}</b> · ${esc(tx(h))}</div>`).join(''):`<div class="hit pend">${t('hito_pend')}</div>`}</div>`; }).join('')}</div>
  </div></section>
  <section class="lt pad"><div class="wrap hs"><div><div class="eyebrow">${t('oldnew')}</div><div class="rule"></div><h2 class="h2">${t('cmp_h')}</h2><p class="lead" style="margin-top:14px">${t('cmp_p')}</p>
    <a class="btn" href="#/participa" style="margin-top:16px">${t('nav_pa')} ${I('arrow')}</a></div>${cmpHTML('historia')}</div></section>`;
  const r = $('#v-historia');
  const pick = y => { const a = (PERY[y]||[]).slice().sort((p,q)=>p.nombre.localeCompare(q.nombre,'es')); $('#yv').textContent = y; $('#ys').textContent = `${a.length} ${a.length===1?t('joined1'):t('joined')}`;
    $$('.yb', r).forEach(b => b.classList.toggle('on', +b.dataset.y === y)); $('#yc').innerHTML = a.map(e=>`<a href="#/empresas/${e.num_asociada}">${mono(e)}${esc(shortName(e.nombre))}</a>`).join(''); };
  $('#yr').oninput = ev => pick(+ev.target.value);
  $$('.yb', r).forEach(b => b.onclick = () => { const y = +b.dataset.y; if (y < ANIV) { $('#yr').value = y; pick(y); } });
  pick(1977); bindCmp(r); reveal(r);
}

/* =====================================================================
   PERSONAS · PARTICIPA · PRENSA
   ===================================================================== */
function renderPersonas(){
  $('#v-personas').innerHTML = pageHead(t('nav_pe'), t('pe_h'), t('pe_p2'), 220) + `<section class="lt pad"><div class="wrap"><div class="pp">${C.personas.map(personCard).join('')}</div></div></section>`;
  const r = $('#v-personas'); bindCommon(r); reveal(r);
}
function renderParticipa(){
  const opts = ['f_t1','f_t2','f_t3','f_t4','f_t5'].map(k=>`<option>${t(k)}</option>`).join('');
  $('#v-participa').innerHTML = pageHead(t('nav_pa'), t('pa_h'), t('pa_p2'), 320) + `
  <section class="lt pad"><div class="wrap two" style="gap:40px">
    <form class="form" id="f1"><div class="eyebrow">${t('f_emp')}</div><h2 style="font-size:30px;margin-bottom:6px">${t('pa_p')}</h2>
      <label>${t('f_company')}<input list="dlemp" required placeholder="${t('f_company_ph')}"></label>
      <datalist id="dlemp">${ALL.map(e=>`<option value="${esc(e.num_asociada)} · ${esc(shortName(e.nombre))}">`).join('')}</datalist>
      <div class="r2"><label>${t('f_name')}<input required></label><label>${t('f_mail')}<input type="email" required></label></div>
      <label>${t('f_type')}<select>${opts}</select></label>
      <label>${t('f_msg')}<textarea></textarea></label>
      <label class="file">${t('f_file')}<input type="file" multiple accept="image/*,.svg,.pdf"></label>
      <label class="chk"><input type="checkbox" required> ${t('f_ok')}</label>
      <button class="btn" style="justify-self:start">${t('f_send')}</button><div class="note">${t('f_note')}</div></form>
    <form class="form" id="f2"><div class="eyebrow">${t('f_pub')}</div><h2 style="font-size:30px;margin-bottom:6px">${t('f_pub_p')}</h2>
      <div class="r2"><label>${t('f_name')}<input required></label><label>${t('f_mail')}<input type="email" required></label></div>
      <div class="r2"><label>${t('f_company')}<input list="dlemp"></label><label>${t('f_year')}<input type="number" min="1900" max="2027"></label></div>
      <label>${t('f_story')}<textarea></textarea></label>
      <label class="file">${t('f_file')}<input type="file" multiple accept="image/*"></label>
      <label class="chk"><input type="checkbox" required> ${t('f_ok')}</label>
      <button class="btn" style="justify-self:start">${t('f_send')}</button></form>
  </div></section>`;
  ['empresas','publico'].forEach((k,i) => { const url = FORMS[k]; if (!url) return; const f = $('#f' + (i+1)), head = $$('.eyebrow, h2', f).map(x=>x.outerHTML).join('');
    const box = document.createElement('div'); box.className = 'form'; box.innerHTML = head + `<iframe src="${esc(url)}" title="${esc(t(i?'f_pub':'f_emp'))}" loading="lazy" style="width:100%;min-height:900px;border:0;border-radius:8px;background:var(--card)"></iframe>`; f.replaceWith(box); });
  $$('#v-participa form').forEach(f => f.onsubmit = ev => { ev.preventDefault(); toast(t('sent')); });
  $$('#v-participa .file input').forEach(i => i.onchange = () => { i.parentNode.firstChild.textContent = [...i.files].map(f=>f.name).join(', ') || t('f_file'); });
}
function renderPrensa(){
  $('#v-prensa').innerHTML = pageHead(t('nav_ps'), t('nav_ps'), t('ps_p'), 60) + `
  <section class="lt pad"><div class="wrap press">
    <div><div class="eyebrow">${t('ps_notes')}</div><div class="rule"></div>${C.prensa.map(n=>`<a class="pr" href="${esc(n.url||'#/prensa')}"><small>${fDate(n.fecha)} · ${t('example')}</small><h3>${esc(tx(n.t))}</h3></a>`).join('')}</div>
    <div><div class="eyebrow">${t('ps_kit')}</div><div class="rule"></div><div class="kit">
      <a href="${LOGO}" download="50-FVEM-logo-blanco.png"><span>${t('ps_logo')}<small>${t('ps_logo_s')}</small></span>${I('dl')}</a>
      <div><span>${t('ps_svg')}<small>${t('ps_soon')}</small></span></div><div><span>${t('ps_man')}<small>${t('ps_soon')}</small></span></div><div><span>${t('ps_photo')}<small>${t('ps_soon')}</small></span></div></div>
      <div class="box" style="margin-top:24px"><div class="k">${t('ps_contact')}</div><p class="mut" style="color:var(--mut)">${t('ps_contact_p')}</p></div></div>
  </div></section>`;
}

/* =====================================================================
   CABECERA, PIE, RUTAS
   ===================================================================== */
const NAV = [['agenda','nav_ag'],['programa','nav_pr'],['empresas','nav_em'],['historia','nav_hi'],['personas','nav_pe'],['participa','nav_pa']];
const MENU = () => { const m = Array.isArray(C.menu) ? C.menu : NAV.map(x => x[0]).concat('prensa'); return [...NAV, ['prensa','nav_ps']].filter(([h]) => m.includes(h)); };
function chrome(view){
  const menu = MENU();
  $('#nav').innerHTML = menu.map(([h,k]) => `<a href="#/${h}" class="${view===h||(view==='evento'&&h==='agenda')||(view==='ficha'&&h==='empresas')?'on':''}">${t(k)}</a>`).join('');
  $('#nav').hidden = !menu.length;
  $('#dnav').innerHTML = menu.length ? `<a href="#/">${t('home')}</a>` + menu.map(([h,k]) => `<a href="#/${h}">${t(k)}</a>`).join('') : '';
  $('#burger').hidden = !menu.length;
  let cta;
  if ((C.cabecera || {}).boton === 'gala') { const ph = phase(); cta = ph === 'before' ? [t('cta_before'), '#/agenda/' + GALA.slug] : ph === 'live' ? [t('cta_live'), '#/programa'] : [t('cta_after'), '#/agenda/' + GALA.slug]; }
  else cta = [t('nl_cta'), FORMS.newsletter || '#/newsletter'];
  [$('#hcta'), $('#dcta')].forEach(a => { a.textContent = cta[0]; a.href = cta[1]; if (/^https?:/.test(cta[1])) { a.target = '_blank'; a.rel = 'noopener'; } else { a.removeAttribute('target'); } });
  document.body.classList.toggle('nomenu', !menu.length);
  setTimeout(() => { const k = $('#ckcfg'); if (k) k.onclick = ev => { ev.preventDefault(); cookieBanner(true); };
    const f = $('#nlf'); if (f) f.onsubmit = ev => { ev.preventDefault(); toast(t('nl_ok')); };
    $$('a[href="#/newsletter"]').forEach(a => a.onclick = ev => { ev.preventDefault(); goNl(); }); });
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === L));
  const dm = $('#demo'); if (dm && C.vistaPrevia === false) dm.remove(); else if (dm) dm.innerHTML = `${esc(t('demo'))} <b style="margin-left:6px;color:#fff" aria-hidden="true">×</b>`; if (dm) dm.onclick = ev => { ev.preventDefault(); dm.remove(); };
  document.documentElement.lang = L;
  const emLinks = [['empresas', t('em_h')], ['historia', t('hi_h')], ['participa', t('pa_h')]].filter(([h]) => h === 'empresas' || menu.some(x => x[0] === h));
  $('#ft').innerHTML = `${SEC.newsletter ? `<div class="wrap ftnl">${nlBox()}</div>` : ''}<div class="wrap"><div class="g">
    <div><img class="logo" src="${LOGO}" alt="50 FVEM">${SEC.lema ? `<p style="max-width:34ch">${t('ft_lema')}</p>` : ''}</div>
    ${menu.length ? `<div><h4>${t('ft_an')}</h4>${menu.map(([h,k])=>`<a href="#/${h}">${t(k)}</a>`).join('')}</div>` : '<div></div>'}
    <div><h4>${t('ft_em')}</h4>${emLinks.map(([h,l])=>`<a href="#/${h}">${l}</a>`).join('')}</div>
    <div><h4>${t('ft_fv')}</h4><a href="${C.sitio}" target="_blank" rel="noopener">fvem.es</a>${SEC.newsletter?`<a href="${esc(FORMS.newsletter || '#/newsletter')}">Newsletter</a>`:''}</div></div>
    ${SEC.patrocinadores ? `<div style="margin-top:40px"><h4>${t('ft_sp')}</h4><div class="spn">${Array.from({length:5},()=>`<span>${t('ft_spx')}</span>`).join('')}</div></div>` : ''}
    <div class="bt"><span>© FVEM · 1977 – 2027</span><span style="display:flex;gap:16px;flex-wrap:wrap">${[['aviso','ft_legal'],['privacidad','ft_priv'],['cookies','ft_cook'],['terminos','ft_terms'],['datos','ft_data'],['accesibilidad','ft_acc']].filter(([k])=>LEGAL[k]).map(([k,l])=>`<a href="${esc(LEGAL[k])}" target="_blank" rel="noopener">${t(l)}</a>`).join('')}${GA ? `<a href="#" id="ckcfg">${t('ck_cfg')}</a>` : ''}</span></div></div>`;
}
function nlBox(){
  const NL = C.newsletterLegal || {}, priv = LEGAL.privacidad;
  const clause = `<div class="nlcl"><b>${t('nl_cl')}</b><br>
    <b>${t('nl_resp')}:</b> ${esc(tx(NL.responsable) || 'FVEM')}<br>
    <b>${t('nl_fin')}:</b> ${esc(tx(NL.finalidad))}<br>
    <b>${t('nl_der')}:</b> ${esc(tx(NL.derechos))}${tx(NL.contacto) ? (L === 'eu' ? ', ' : ' ') + (NL.correo ? esc(tx(NL.contacto)).replace(esc(NL.correo), `<a href="mailto:${esc(NL.correo)}">${esc(NL.correo)}</a>`) : esc(tx(NL.contacto))) : ''}.${NL.infoAdicional ? `<br>
    <b>${t('nl_inf')}:</b> ${t('nl_inf_t')}${priv ? ` <a href="${esc(priv)}" target="_blank" rel="noopener">${t('ft_priv').toLowerCase()}</a>` : ''}.` : ''}</div>`;
  return `<div class="cta-card b nlwide" id="nl"><div><div class="eyebrow" style="color:#fff">Newsletter</div><div class="rule" style="background:#fff"></div><h3>${t('nl_h')}</h3><p>${t('nl_p')}</p></div>
    ${FORMS.newsletter ? `<div><a class="btn" style="margin-top:20px;background:var(--negro)" href="${esc(FORMS.newsletter)}" target="_blank" rel="noopener">${t('nl_btn')} ${I('arrow')}</a></div>`
      : `<form class="nlf" id="nlf"><div class="nl"><input type="email" required placeholder="${t('nl_ph')}" aria-label="${t('nl_ph')}"><button class="btn">${t('nl_btn')}</button></div>
        <label class="nlok"><input type="checkbox" required> <span>${t('nl_ok_pre')} ${priv ? `<a href="${esc(priv)}" target="_blank" rel="noopener">${t('ft_priv').toLowerCase()}</a>` : t('ft_priv').toLowerCase()}</span></label></form>`}
    ${FORMS.newsletter ? '' : clause}</div>`;
}
function goNl(){ closeDrawer(); const n = $('#nl'); if (!n) return; n.scrollIntoView({behavior: 'smooth', block: 'center'}); const i = $('#nlf input[type=email]'); if (i) setTimeout(() => i.focus({preventScroll: true}), 600); }
const VIEWS = { home: renderHome, agenda: renderAgenda, evento: renderEvento, programa: renderPrograma, empresas: renderEmpresas, ficha: renderFicha, historia: renderHistoria, personas: renderPersonas, participa: renderParticipa, prensa: renderPrensa };
let CUR = null;
function parse(){ const h = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (!h.length) return ['home'];
  if (h[0] === 'newsletter') return ['home', 'nl'];
  if (h[0] === 'agenda' && h[1]) return ['evento', h[1]];
  if (h[0] === 'empresas' && h[1]) return ['ficha', h[1].padStart(5,'0')];
  return VIEWS[h[0]] ? [h[0]] : ['home']; }
function route(keepScroll){
  const [v, arg] = parse(), same = CUR && CUR[0] === v && CUR[1] === arg;
  if (v !== 'ficha' || !CUR || CUR[0] !== 'ficha') oldPhoto = false;
  CUR = [v, arg];
  $$('.view').forEach(x => { const on = x.id === 'v-' + v; x.classList.toggle('on', on); if (!on) x.innerHTML = ''; });
  document.body.classList.toggle('home-mode', v === 'home');
  closeDrawer(); chrome(v); VIEWS[v](arg);
  const ttl = { home: 'FVEM 50 · ' + t('h1a') + ' ' + t('h1b'), evento: arg && EVS[arg] ? tx(EVS[arg].titulo) + ' · FVEM 50' : '', ficha: BYNUM[arg] ? shortName(BYNUM[arg].nombre) + ' · FVEM 50' : '' }[v] || (t({agenda:'nav_ag',programa:'nav_pr',empresas:'nav_em',historia:'nav_hi',personas:'nav_pe',participa:'nav_pa',prensa:'nav_ps'}[v]) + ' · FVEM 50');
  document.title = ttl;
  gaPage();
  if (!keepScroll && !same) scrollTo(0, 0);
  if (v === 'home' && arg === 'nl') setTimeout(goNl, 80);
  onScroll();
}
function onScroll(){ const hd = $('#hd'), home = document.body.classList.contains('home-mode'), s = $('#hseq'); const end = s ? s.offsetTop + s.offsetHeight - 120 : innerHeight - 120; hd.classList.toggle('over', home && scrollY < end); heroScroll(); }
addEventListener('scroll', onScroll, {passive:true});
addEventListener('hashchange', () => route());
let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { if (CUR && CUR[0] === 'empresas') drawMap(); heroScroll(); }, 200); });
function closeDrawer(){ $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden', 'true'); $('#burger').setAttribute('aria-expanded', 'false'); document.body.classList.remove('lock'); }
$('#burger').onclick = () => { $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false'); $('#burger').setAttribute('aria-expanded', 'true'); document.body.classList.add('lock'); };
$('#dclose').onclick = closeDrawer;
$$('.lang button').forEach(b => b.onclick = () => { L = b.dataset.lang; try { localStorage.setItem('fvem50-lang', L); } catch (_) {} const y = scrollY; route(true); scrollTo(0, y); });
/* =====================================================================
   ANALÍTICA (Google Analytics 4) CON CONSENTIMIENTO PREVIO
   - No se carga nada de Google hasta que la persona pulsa «Aceptar».
   - «Rechazar» es igual de visible. La elección se recuerda 12 meses y
     se puede cambiar desde «Configurar cookies» en el pie.
   ===================================================================== */
const GA = (C.analitica || {}).ga4 || '';
const CK = 'fvem50-consent';
const consent = () => { try { const c = JSON.parse(localStorage.getItem(CK) || 'null'); return c && Date.now() - c.t < 365 * 864e5 ? c : null; } catch (_) { return null; } };
let gaOn = false;
function gaLoad(){
  if (gaOn || !GA) return; gaOn = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  gtag('js', new Date());
  gtag('config', GA, { send_page_view: false });
  const s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA); document.head.appendChild(s);
  gaPage();
}
function gaPage(){
  if (!gaOn) return;
  const path = '/' + location.hash.replace(/^#\/?/, '');
  gtag('event', 'page_view', { page_title: document.title, page_location: location.origin + path, page_path: path, language: L });
}
function gaClear(){
  document.cookie.split(';').map(c => c.trim().split('=')[0]).filter(n => /^_ga/.test(n)).forEach(n => {
    const host = location.hostname, parts = host.split('.');
    [host, '.' + host, parts.length > 1 ? '.' + parts.slice(-2).join('.') : host].forEach(d => { document.cookie = `${n}=; Max-Age=0; path=/; domain=${d}`; });
    document.cookie = `${n}=; Max-Age=0; path=/`;
  });
}
function setConsent(ok){
  try { localStorage.setItem(CK, JSON.stringify({ a: ok, t: Date.now() })); } catch (_) {}
  $('#ckb') && $('#ckb').remove();
  if (ok) gaLoad(); else if (gaOn) { gaClear(); location.reload(); } else gaClear();
}
function cookieBanner(force){
  if (!GA || $('#ckb')) return;
  const c = consent(); if (c && !force) { if (c.a) gaLoad(); return; }
  const b = document.createElement('div'); b.id = 'ckb'; b.className = 'ckb'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', t('ck_title'));
  b.innerHTML = `<div><b>${t('ck_title')}</b><p>${t('ck_text')}${LEGAL.cookies ? ` <a href="${esc(LEGAL.cookies)}" target="_blank" rel="noopener">${t('ck_more')}</a>` : ''}</p></div>
    <div class="ckb-a"><button class="btn sm" data-ck="0">${t('ck_no')}</button><button class="btn sm" data-ck="1">${t('ck_yes')}</button></div>`;
  b.addEventListener('click', ev => { const x = ev.target.closest('[data-ck]'); if (x) setConsent(x.dataset.ck === '1'); });
  document.body.appendChild(b);
}

route();
cookieBanner();
})();
