/* =====================================================================
   FVEM 50 · CONTENIDOS EDITABLES
   Todo lo que cambia a lo largo de 2027 está aquí. Fechas en formato
   ISO con zona horaria (+01:00 invierno, +02:00 verano).
   ⚠ Agenda, programa, personas y prensa son CONTENIDO DE EJEMPLO.
   ===================================================================== */
window.FVEM50 = {
  sitio: 'https://www.fvem.es',

  // true = muestra la etiqueta «Vista previa». Ponlo en false al publicar con contenido real.
  vistaPrevia: false,

  // Formularios seguros (proveedor externo con datos en la UE, p. ej. Tally).
  // Pega aquí la URL de inserción («embed») de cada formulario. Vacío = formulario de maqueta que no envía nada.
  formularios: {
    empresas: '',    // p. ej. 'https://tally.so/embed/XXXXXX?transparentBackground=1'
    publico: '',
    newsletter: ''   // URL del formulario de alta de vuestra herramienta de newsletter
  },

  // Cifras oficiales para la portada. Si se dejan vacías, se calculan del listado de empresas.
  cifras: {
    empresas: 833,
    plantilla: 34073,
    nota: { es: 'Empresas asociadas a FVEM a octubre de 2026.', eu: 'FVEMeko enpresa bazkideak, 2026ko urrian.' }
  },

  // Cláusula informativa de la newsletter (RGPD). Va en el pie de todas las páginas.
  newsletterLegal: {
    responsable: { es: 'FVEM', eu: 'FVEM' },
    finalidad: { es: 'gestionar la consulta, incidencia, o petición', eu: 'kontsulta, gorabehera edo eskaera kudeatzea' },
    derechos: { es: 'acceso, rectificación, supresión, oposición y cualquier otro previsto en la normativa de protección de datos',
                eu: 'datuak eskuratzea, zuzentzea, ezabatzea, aurka egitea eta datuak babesteko araudian aurreikusitako beste edozein' },
    contacto: { es: 'dirigiendo un escrito a rgdp@fvem.es', eu: 'rgdp@fvem.es helbidera idatziz' },
    correo: 'rgdp@fvem.es'   // se enlaza como correo electrónico en la cláusula
  },

  // Google Analytics 4. Pega aquí el ID de medición (G-XXXXXXXXXX). Vacío = sin analítica y sin aviso de cookies.
  // Con ID, aparece un aviso de cookies y Analytics solo se carga si la persona pulsa «Aceptar».
  analitica: { ga4: '' },

  // Páginas legales obligatorias (LSSI y RGPD). Pueden ser páginas de fvem.es.
  // Solo se muestran en el pie los enlaces que tengan dirección.
  legal: {
    aviso: 'https://fvem.es/es/aviso-legal.html',
    privacidad: 'https://fvem.es/es/politica-de-privacidad.html',
    cookies: 'https://fvem.es/es/politica-de-cookies.html',
    terminos: 'https://fvem.es/es/terminos-y-condiciones-de-uso.html',
    datos: 'https://fvem.es/es/condiciones-generales-sobre-proteccion-de-datos.html',
    accesibilidad: ''
  },

  // Vídeo de portada: deja mp4 vacío para usar la animación de marca.
  video: {
    mp4: '',            // p. ej. 'video/portada-1920.mp4'
    mp4Movil: '',       // versión vertical 1080x1920
    poster: '',         // imagen fija mientras carga el vídeo
    // Foto de fondo de la portada cuando no hay vídeo (se muestra en blanco y negro, con la animación de marca encima)
    imagen: 'assets/img/portada-2400.jpg',
    imagenMovil: 'assets/img/portada-1200.jpg',
    imagenAlt: { es: 'Fotografía histórica de unos altos hornos junto a la ría, con chimeneas humeantes', eu: 'Itsasadarraren ondoko labe garaien argazki historikoa, tximinia ketsuekin' },
    credito: { es: '', eu: '' },   // p. ej. 'Foto: Archivo …' (autoría y fuente de la imagen)
    completo: '',       // URL de inserción YouTube/Vimeo con sonido, p. ej. 'https://www.youtube.com/embed/XXXX'
    // Vídeos programados: el primero cuya ventana incluya "hoy" sustituye al de arriba
    programados: [
      // { desde:'2027-03-01', hasta:'2027-03-15', mp4:'video/puertas-abiertas.mp4', completo:'' }
    ]
  },

  // ---- Qué se ve (false = oculto; no se borra nada, se puede volver a activar) ----
  secciones: {
    lema: false,             // «Pasado que impulsa · Futuro que construimos» (portada y pie)
    botonesPortada: false,   // botones «Ver el vídeo» y «Agenda 2027» sobre el titular
    agenda: false,           // «Próximas citas» en portada
    cifras: true,            // cifras de empresas
    buscador: true,          // «Busca una empresa» + banda de logos
    historia: false,         // «Medio siglo en una línea»
    personas: false,         // «Detrás de cada empresa, personas»
    participa: false,        // caja «¿Tu empresa es asociada?»
    newsletter: true,        // caja de suscripción a la agenda
    patrocinadores: false    // pie: patrocinadores y colaboradores
  },
  // Páginas en el menú de cabecera, menú móvil y pie. Vacío = sin menú.
  // Opciones: 'agenda', 'programa', 'empresas', 'historia', 'personas', 'participa', 'prensa'
  menu: [],
  // Botón de la cabecera: 'newsletter' (Suscríbete) o 'gala' (Inscríbete / En directo / Galería)
  cabecera: { boton: 'newsletter' },

  // Vídeo que aparece encajado al hacer scroll en la portada (solo se carga YouTube al pulsar «play»)
  videoPrincipal: {
    youtube: 'RAlS-zQD1FY',
    titulo: { es: 'El secreto mejor guardado de FVEM', eu: 'FVEMen sekreturik ondoen gordea' },
    poster: 'assets/img/video-portada.jpg',   // imagen de portada del vídeo (vacío = gráfico de marca)
    posterPlay: ['50%', '50%'],               // posición del botón play (horizontal, vertical)
    tituloSobrePortada: false,                // true = muestra el título sobre la imagen
    nota: false                               // true = muestra «El vídeo se carga desde YouTube al pulsar reproducir»
  },

  // Cuenta atrás de la portada. Si se borra este bloque, vuelve la cuenta atrás a la gala.
  cuentaAtras: {
    fecha: '2027-01-13T00:00:00+01:00',
    mostrarFecha: false,      // true = muestra «13 de enero de 2027» junto al texto
    botonCalendario: false,   // true = muestra el botón «Añadir a mi calendario»
    etiqueta: { es: 'Cuenta atrás', eu: 'Atzerako kontaketa' },
    titulo: { es: 'Apertura del sobre', eu: 'Gutun-azalaren irekiera' },
    texto: { es: 'Ese día conoceremos el secreto mejor guardado de FVEM.', eu: 'Egun horretan ezagutuko dugu FVEMen sekreturik ondoen gordea.' },
    despues: { es: 'El sobre ya está abierto: mira el nuevo vídeo.', eu: 'Gutun-azala irekita dago: ikusi bideo berria.' }
  },

  // Evento al que apunta la cuenta atrás principal
  gala: 'gala-50-aniversario',

  tipos: {
    institucional: { es: 'Institucional', eu: 'Instituzionala' },
    jornada: { es: 'Jornada técnica', eu: 'Jardunaldi teknikoa' },
    visita: { es: 'Visita a empresas', eu: 'Enpresa-bisitak' },
    encuentro: { es: 'Encuentro', eu: 'Topaketa' },
    cultura: { es: 'Cultura', eu: 'Kultura' }
  },

  eventos: [
    { slug: 'acto-de-apertura', tipo: 'institucional', ini: '2027-01-28T11:00:00+01:00', fin: '2027-01-28T13:00:00+01:00',
      titulo: { es: 'Acto de apertura del 50 aniversario', eu: '50. urteurrenaren irekiera-ekitaldia' },
      lugar: { es: 'Bilbao · lugar por confirmar', eu: 'Bilbo · lekua zehazteke' },
      desc: { es: 'Arranca un año de celebración. Presentamos la programación del 50 aniversario, el vídeo «50 años de industria» y las iniciativas en las que pueden participar las empresas asociadas.',
              eu: 'Ospakizun-urtea hasten da. 50. urteurreneko egitaraua, «Industriaren 50 urte» bideoa eta enpresa bazkideek parte har dezaketen ekimenak aurkeztuko ditugu.' },
      inscripcion: 'abierta', url: '' },
    { slug: 'talento-y-relevo', tipo: 'jornada', ini: '2027-02-25T09:30:00+01:00', fin: '2027-02-25T13:30:00+01:00',
      titulo: { es: 'Talento y relevo generacional en la industria', eu: 'Talentua eta belaunaldi-txandakatzea industrian' },
      lugar: { es: 'Bilbao', eu: 'Bilbo' },
      desc: { es: 'Jornada sobre cómo atraer, formar y retener a las personas que harán la industria de los próximos 50 años.',
              eu: 'Hurrengo 50 urteetako industria egingo duten pertsonak erakarri, prestatu eta atxikitzeari buruzko jardunaldia.' },
      inscripcion: 'proximamente', url: '' },
    { slug: 'puertas-abiertas', tipo: 'visita', ini: '2027-03-18T10:00:00+01:00', fin: '2027-03-18T14:00:00+01:00',
      titulo: { es: 'Puertas abiertas en empresas asociadas', eu: 'Ate irekiak enpresa bazkideetan' },
      lugar: { es: 'Varios municipios de Bizkaia', eu: 'Bizkaiko hainbat udalerri' },
      desc: { es: 'Las asociadas abren sus instalaciones a estudiantes, familias y vecindario para enseñar cómo es la industria por dentro.',
              eu: 'Bazkideek beren instalazioak irekiko dizkiete ikasleei, familiei eta auzokideei, industria barrutik nolakoa den erakusteko.' },
      inscripcion: 'proximamente', url: '' },
    { slug: 'exposicion-50-anos', tipo: 'cultura', ini: '2027-04-22T19:00:00+02:00', fin: '2027-04-22T21:00:00+02:00',
      titulo: { es: 'Exposición «50 años de industria»', eu: '«Industriaren 50 urte» erakusketa' },
      lugar: { es: 'Bilbao', eu: 'Bilbo' },
      desc: { es: 'Inauguración de la exposición con fotografías de archivo y de hoy: el mismo oficio, cinco décadas después.',
              eu: 'Artxiboko eta gaur egungo argazkiekin osatutako erakusketaren inaugurazioa: ofizio bera, bost hamarkada geroago.' },
      inscripcion: 'proximamente', url: '' },
    { slug: 'mujeres-que-hacen-industria', tipo: 'jornada', ini: '2027-05-27T09:30:00+02:00', fin: '2027-05-27T13:00:00+02:00',
      titulo: { es: 'Mujeres que hacen industria', eu: 'Industria egiten duten emakumeak' },
      lugar: { es: 'Bilbao', eu: 'Bilbo' },
      desc: { es: 'Experiencias de profesionales del metal vizcaíno y propuestas para seguir sumando talento femenino.',
              eu: 'Bizkaiko metalgintzako profesionalen esperientziak eta emakumeen talentua gehitzen jarraitzeko proposamenak.' },
      inscripcion: 'proximamente', url: '' },
    { slug: 'encuentro-socias-fundadoras', tipo: 'encuentro', ini: '2027-06-17T13:00:00+02:00', fin: '2027-06-17T16:00:00+02:00',
      titulo: { es: 'Encuentro de socias fundadoras', eu: 'Bazkide sortzaileen topaketa' },
      lugar: { es: 'Bizkaia', eu: 'Bizkaia' },
      desc: { es: 'Reunimos a las empresas que están con FVEM desde 1977 para recordar de dónde venimos.',
              eu: '1977tik FVEMekin dauden enpresak elkartuko ditugu, nondik gatozen gogoratzeko.' },
      inscripcion: null, url: '' },
    { slug: 'industria-2050', tipo: 'jornada', ini: '2027-09-23T09:30:00+02:00', fin: '2027-09-23T14:00:00+02:00',
      titulo: { es: 'Industria 2050: innovación y futuro', eu: 'Industria 2050: berrikuntza eta etorkizuna' },
      lugar: { es: 'Bilbao', eu: 'Bilbo' },
      desc: { es: 'Tecnología, energía y nuevos modelos productivos: cómo será el metal de Bizkaia dentro de 25 años.',
              eu: 'Teknologia, energia eta ekoizpen-eredu berriak: nolakoa izango da Bizkaiko metalgintza 25 urte barru.' },
      inscripcion: 'proximamente', url: '' },
    { slug: 'gala-50-aniversario', tipo: 'institucional', ini: '2027-10-28T18:30:00+02:00', fin: '2027-10-28T22:30:00+02:00', destacado: true, programa: true,
      titulo: { es: 'Gala 50 aniversario', eu: '50. urteurreneko gala' },
      lugar: { es: 'Bilbao · lugar por confirmar', eu: 'Bilbo · lekua zehazteke' },
      desc: { es: 'El gran acto del aniversario, 50 años exactos después de las primeras altas. Una noche para reconocer a las empresas y a las personas que han hecho la industria de Bizkaia.',
              eu: 'Urteurreneko ekitaldi nagusia, lehen altetatik 50 urte zehatz igaro direnean. Bizkaiko industria egin duten enpresak eta pertsonak aitortzeko gaua.' },
      inscripcion: 'proximamente', url: '', directo: '' },
    { slug: 'libro-conmemorativo', tipo: 'cultura', ini: '2027-11-25T19:00:00+01:00', fin: '2027-11-25T20:30:00+01:00',
      titulo: { es: 'Presentación del libro conmemorativo', eu: 'Liburu oroigarriaren aurkezpena' },
      lugar: { es: 'Bilbao', eu: 'Bilbo' },
      desc: { es: 'Cierre del aniversario con la publicación que recoge estos 50 años de historia compartida.',
              eu: 'Urteurrenaren itxiera, partekatutako 50 urteko historia jasotzen duen argitalpenarekin.' },
      inscripcion: null, url: '' }
  ],

  programa: {
    evento: 'gala-50-aniversario',
    dias: [
      { fecha: '2027-10-28', titulo: { es: 'Gala', eu: 'Gala' }, sesiones: [
        { ini: '18:30', fin: '19:00', t: { es: 'Recepción y acreditaciones', eu: 'Harrera eta akreditazioak' }, sala: { es: 'Vestíbulo', eu: 'Atondoa' } },
        { ini: '19:00', fin: '19:15', t: { es: 'Bienvenida', eu: 'Ongietorria' }, sala: { es: 'Auditorio', eu: 'Auditorioa' }, ponentes: ['Presidencia de FVEM'] },
        { ini: '19:15', fin: '19:35', t: { es: 'Estreno del documental «50 años de industria»', eu: '«Industriaren 50 urte» dokumentalaren estreinaldia' }, sala: { es: 'Auditorio', eu: 'Auditorioa' } },
        { ini: '19:35', fin: '20:15', t: { es: 'Conversación: personas que hacen industria', eu: 'Solasaldia: industria egiten duten pertsonak' }, sala: { es: 'Auditorio', eu: 'Auditorioa' }, ponentes: ['Por confirmar', 'Por confirmar', 'Por confirmar'] },
        { ini: '20:15', fin: '20:45', t: { es: 'Reconocimiento a las socias fundadoras', eu: 'Bazkide sortzaileei aitortza' }, sala: { es: 'Auditorio', eu: 'Auditorioa' } },
        { ini: '20:45', fin: '21:00', t: { es: 'Clausura institucional', eu: 'Itxiera instituzionala' }, sala: { es: 'Auditorio', eu: 'Auditorioa' }, ponentes: ['Por confirmar'] },
        { ini: '21:00', fin: '22:30', t: { es: 'Cóctel y música en directo', eu: 'Koktela eta zuzeneko musika' }, sala: { es: 'Foyer', eu: 'Foierra' } }
      ]},
      { fecha: '2027-10-29', titulo: { es: 'Puertas abiertas', eu: 'Ate irekiak' }, sesiones: [
        { ini: '10:00', fin: '14:00', t: { es: 'Visitas a empresas asociadas', eu: 'Enpresa bazkideetarako bisitak' }, sala: { es: 'Varias sedes', eu: 'Hainbat egoitza' } },
        { ini: '12:00', fin: '13:00', t: { es: 'Encuentro con estudiantes de FP', eu: 'Topaketa LHko ikasleekin' }, sala: { es: 'Por confirmar', eu: 'Zehazteke' } }
      ]}
    ]
  },

  hitos: [
    { anio: 1977, es: 'Nace FVEM', eu: 'FVEM sortzen da' },
    { anio: 2027, es: '50 aniversario', eu: '50. urteurrena' }
  ],

  personas: [
    { eje: { es: 'Talento', eu: 'Talentua' }, nombre: 'Nombre Apellido', cargo: { es: 'Aprendiz de soldadura', eu: 'Soldadura-ikastuna' }, frase: { es: 'Aquí aprendí un oficio y encontré mi sitio.', eu: 'Hemen ikasi nuen ofizio bat eta nire lekua aurkitu nuen.' }, video: '' },
    { eje: { es: 'Experiencia', eu: 'Esperientzia' }, nombre: 'Nombre Apellido', cargo: { es: 'Jefe de taller', eu: 'Tailerburua' }, frase: { es: 'Cuarenta años después, cada pieza sigue siendo un reto.', eu: 'Berrogei urte geroago, pieza bakoitza erronka da oraindik.' }, video: '' },
    { eje: { es: 'Diversidad', eu: 'Aniztasuna' }, nombre: 'Nombre Apellido', cargo: { es: 'Responsable de producción', eu: 'Ekoizpen-arduraduna' }, frase: { es: 'La industria es de quien la hace, sea quien sea.', eu: 'Industria egiten duenarena da, dena delakoa.' }, video: '' },
    { eje: { es: 'Innovación', eu: 'Berrikuntza' }, nombre: 'Nombre Apellido', cargo: { es: 'Ingeniera de procesos', eu: 'Prozesu-ingeniaria' }, frase: { es: 'Mejorar un proceso es mejorar el día de mucha gente.', eu: 'Prozesu bat hobetzea jende askoren eguna hobetzea da.' }, video: '' },
    { eje: { es: 'Compromiso', eu: 'Konpromisoa' }, nombre: 'Nombre Apellido', cargo: { es: 'Técnica de prevención', eu: 'Prebentzio-teknikaria' }, frase: { es: 'Que todo el mundo vuelva a casa: ese es el trabajo.', eu: 'Denak etxera itzultzea: hori da lana.' }, video: '' }
  ],

  prensa: [
    { fecha: '2027-01-28', t: { es: 'FVEM presenta el programa de su 50 aniversario', eu: 'FVEMek bere 50. urteurreneko egitaraua aurkeztu du' }, url: '' },
    { fecha: '2027-01-10', t: { es: '«50 años de industria»: el lema del aniversario', eu: '«Industriaren 50 urte»: urteurreneko leloa' }, url: '' },
    { fecha: '2026-12-15', t: { es: 'Las asociadas, invitadas a compartir su historia', eu: 'Bazkideak beren historia partekatzera gonbidatuta' }, url: '' }
  ]
};
