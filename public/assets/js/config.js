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
    newsletter: '',  // URL de un formulario externo de alta (si se rellena, sustituye al formulario de la web)
    newsletterApi: 'https://crm-api.fvem.es/api/public/suscripcion50'  // el formulario de la web envía aquí el correo (POST JSON)
  },

  // Banda de logos de empresas en la portada (filas alternando sentido, empresas al azar sin repetirse)
  marquesina: { filas: 2, empresasPorFila: 30, segundosPorEmpresa: 3.2 },   // filas: de 1 a 6

  // Cifras oficiales para la portada. Si se dejan vacías, se calculan del listado de empresas.
  cifras: {
    empresas: 842,
    plantilla: 34684,
    nota: { es: 'Datos a octubre de 2026.', eu: '2026ko urriko datuak.' }
  },

  // Cláusula informativa de la newsletter (RGPD). Va en el pie de todas las páginas.
  newsletterLegal: {
    responsable: { es: 'FVEM', eu: 'FVEM' },
    finalidad: { es: 'informar sobre la actividad de FVEM', eu: 'FVEMen jardueraren berri ematea' },
    derechos: { es: 'acceso, rectificación, supresión, oposición y cualquier otro previsto en la normativa de protección de datos',
                eu: 'datuak eskuratzea, zuzentzea, ezabatzea, aurka egitea eta datuak babesteko araudian aurreikusitako beste edozein' },
    contacto: { es: 'dirigiendo un escrito a rgpd@fvem.es', eu: 'rgpd@fvem.es helbidera idatziz' },
    infoAdicional: false,   // true = muestra «Información adicional: … política de privacidad»
    correo: 'rgpd@fvem.es'   // se enlaza como correo electrónico en la cláusula
  },

  // Google Analytics 4. Pega aquí el ID de medición (G-XXXXXXXXXX). Vacío = sin analítica y sin aviso de cookies.
  // Con ID, aparece un aviso de cookies y Analytics solo se carga si la persona pulsa «Aceptar».
  analitica: { ga4: 'G-60494DK2KF' },   // Google Analytics 4 · solo se carga si la visita acepta las cookies

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
    agenda: true,           // «Próximas citas» en portada
    cifras: true,            // cifras de empresas
    buscador: true,          // «Busca una empresa» + banda de logos
    historia: false,         // «Medio siglo en una línea»
    personas: false,         // «Detrás de cada empresa, personas»
    participa: false,        // caja «¿Tu empresa es asociada?»
    newsletter: true,        // caja de suscripción a la agenda
    fotoPendiente: false,    // ficha: hueco de foto «Foto pendiente» cuando la empresa aún no tiene foto (las fotos reales se ven siempre)
    patrocinadores: false    // pie: patrocinadores y colaboradores
  },
  // Páginas en el menú de cabecera, menú móvil y pie. Vacío = sin menú.
  // Páginas: 'agenda', 'programa', 'empresas', 'historia', 'personas', 'participa', 'prensa'
  // Secciones de la portada (anclas): 'inicio', 'video', 'cuenta-atras', 'cifras', 'buscador', 'newsletter' (y 'proximas-citas' si se muestra la agenda)
  // Ejemplo: menu: ['video', 'cifras', 'buscador', 'empresas', 'newsletter'],
  menu: ['agenda'],
  // Botón de la cabecera: 'newsletter' (Suscríbete) o 'gala' (Inscríbete / En directo / Galería)
  cabecera: { boton: 'newsletter' },

  // Vídeo que aparece encajado al hacer scroll en la portada (solo se carga YouTube al pulsar «play»)
  videoPrincipal: {
    youtube: 'RAlS-zQD1FY',
    deslizaTras: 90,   // segundos que hay que pasar en la parte del vídeo para que aparezca «Desliza» (0 = siempre)
    titulo: { es: 'El secreto mejor guardado de FVEM', eu: 'FVEMen sekreturik ondoen gordea' },
    poster: 'assets/img/video-portada.jpg',   // imagen de portada del vídeo (vacío = gráfico de marca)
    posterPlay: ['50%', '50%'],               // posición del botón play (horizontal, vertical)
    subtitulos: false,                        // true = el vídeo arranca con subtítulos de YouTube activados
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
    texto: { es: 'Pronto conoceremos el secreto mejor guardado de FVEM.', eu: 'Laster ezagutuko dugu FVEMeko sekreturik onena.' },
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

  // Campos de cada evento:
  //   hora: false        → «Hora por confirmar» (ini lleva solo el día)
  //   soloMes: true      → se muestra solo el mes («Abril de 2027»); ini es un día orientativo
  //   sin «fin»          → se muestra solo la hora de inicio
  //   acceso: 'invitacion' | 'socias' | 'estudiantes' → evento no abierto al público (sin botón de inscripción)
  //   inscripcion: 'abierta' | 'proximamente' | 'completo' | null
  eventos: [
    { slug: 'dia-de-la-industria-2027', tipo: 'educacion', ini: '2027-02-03T11:30:00+01:00', acceso: 'estudiantes',
      titulo: { es: 'Día de la Industria 2027', eu: 'Industriaren Eguna 2027' },
      lugar: { es: 'BEC! · Barakaldo', eu: 'BEC! · Barakaldo' },
      desc: { es: 'Un acto informal y cercano en el que cerca de 800 jóvenes conocerán de primera mano la realidad y el futuro de la industria de Bizkaia, y todo lo que puede ofrecerles para su desarrollo profesional. Estudiantes de Bachillerato, profesorado y empresas compartirán una jornada para descubrir oficios, tecnologías y trayectorias, y para comprobar que la industria es un lugar atractivo en el que crecer. Evento para los centros educativos participantes en Industria Erronka, las empresas participantes y las patrocinadoras.',
              eu: 'Ekitaldi informal eta hurbila, non 800 bat gaztek lehen eskutik ezagutuko duten Bizkaiko industriaren errealitatea eta etorkizuna, eta haien garapen profesionalerako eskain diezaiekeen guztia. Batxilergoko ikasleek, irakasleek eta enpresek jardunaldi bat partekatuko dute lanbideak, teknologiak eta ibilbideak ezagutzeko, eta industria hazteko leku erakargarria dela egiaztatzeko. Industria Erronkan parte hartzen duten ikastetxeentzat, parte hartzen duten enpresentzat eta babesleentzat.' },
      inscripcion: 'abierta', url: 'https://fvem.es/es/?option=com_content&view=article&id=1600&catid=69&Itemid=386&lang=es&asiste=si' },
    { slug: 'futuro-industria-bizkaia', tipo: 'jornada', ini: '2027-02-25T09:00:00+01:00', hora: false, destacado: true,
      horaTexto: { es: 'Por la mañana · horario por confirmar', eu: 'Goizez · ordutegia zehazteke' },
      titulo: { es: 'El futuro de la industria de Bizkaia', eu: 'Bizkaiko industriaren etorkizuna' },
      lugar: { es: 'BEC! · Barakaldo', eu: 'BEC! · Barakaldo' },
      desc: { es: 'Primera gran cita del 50 aniversario de FVEM. Tras cinco décadas acompañando a la industria de Bizkaia, miramos hacia delante: contaremos con la experiencia de varias empresas líderes del territorio para conocer cómo están afrontando la transformación tecnológica, energética y de talento, y cómo seguir avanzando y apostando por el sector industrial como motor de empleo, innovación y bienestar para los próximos 50 años.',
              eu: 'FVEMen 50. urteurreneko lehen hitzordu handia. Bost hamarkadaz Bizkaiko industriari lagundu ondoren, aurrera begiratuko dugu: lurraldeko enpresa liderren esperientzia izango dugu, eraldaketa teknologikoari, energetikoari eta talentuarenari nola aurre egiten dioten ezagutzeko, eta industria-sektorearen alde nola aurrera egiten jarraitu, datozen 50 urteetako enplegu, berrikuntza eta ongizate eragile gisa.' },
      inscripcion: 'proximamente', url: '' },
    { slug: 'mujeres-e-industria-2027', tipo: 'jornada', ini: '2027-03-09T09:30:00+01:00',
      titulo: { es: 'Mujeres e Industria 2027', eu: 'Emakumeak eta Industria 2027' },
      lugar: { es: 'Auditorio Torre Iberdrola · Bilbao', eu: 'Iberdrola Dorreko auditorioa · Bilbo' },
      desc: { es: 'IX edición de «Mujeres e Industria». Esta jornada nace con el objetivo de visibilizar a las mujeres que trabajan en la industria. A través de las experiencias de cuatro mujeres trabajadoras conoceremos distintos caminos profesionales, retos superados y proyectos que demuestran que las formas de aportar soluciones desde la industria son diversas. Porque los grandes problemas necesitan todas las miradas. Y la industria necesita más mujeres.',
              eu: '«Emakumeak eta Industria»ren IX. edizioa. Jardunaldi honen helburua industrian lan egiten duten emakumeak ikusaraztea da. Lau emakume langileren esperientzien bidez, ibilbide profesional desberdinak, gainditutako erronkak eta industriatik konponbideak emateko moduak askotarikoak direla erakusten duten proiektuak ezagutuko ditugu. Arazo handiek begirada guztiak behar dituztelako. Eta industriak emakume gehiago behar ditu.' },
      inscripcion: 'proximamente', url: '' },
    { slug: 'asamblea-general-2027', tipo: 'institucional', ini: '2027-04-30T09:00:00+02:00', ocultarHora: true, acceso: 'socias',
      titulo: { es: 'Asamblea General de FVEM 2027', eu: 'FVEMen Batzar Nagusia 2027' },
      desc: { es: 'Asamblea anual de FVEM, reservada a las personas representantes de las empresas asociadas.',
              eu: 'FVEMen urteko batzarra, enpresa bazkideen ordezkarientzat soilik.' },
      inscripcion: null, url: '' },
    { slug: 'gala-50-aniversario', tipo: 'institucional', ini: '2027-10-21T00:00:00+02:00', ocultarHora: true, destacado: true, acceso: 'invitacion',
      titulo: { es: 'Gala del 50 aniversario', eu: '50. urteurreneko gala' },
      desc: { es: 'La gran celebración de los 50 años de FVEM: una cita para reconocer a las empresas y a las personas que han hecho la industria de Bizkaia. Asistencia con invitación.',
              eu: 'FVEMen 50 urteen ospakizun handia: Bizkaiko industria egin duten enpresak eta pertsonak aitortzeko hitzordua. Gonbidapenarekin bertaratu daiteke.' },
      inscripcion: null, url: '', directo: '' }
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
