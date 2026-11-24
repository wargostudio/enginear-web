// ---------------------------------------------------------------------------
// Contenido de Enginear.
// Fuente: enginearcba.com.ar (relevado el 17/11/2026). Todo lo que figura acá
// sale del sitio actual. Lo que falta está listado en PENDIENTES.md.
// ---------------------------------------------------------------------------

export const site = {
  name: "Enginear",
  legalName: "Enginear", // PENDIENTE: razón social / CUIT
  slogan: "Ingeniería a su alcance",
  url: "https://enginearcba.com.ar",
  locale: "es_AR",
  city: "Córdoba",
  region: "Córdoba",
  country: "AR",
  years: 35,
  phoneDisplay: "351 623-3053",
  phoneE164: "+5493516233053",
  whatsapp: "5493516233053",
  whatsappText: "Hola Enginear, quisiera hacer una consulta técnica.",
  email: "info@enginearcba.com.ar",
  social: [
    { id: "instagram", label: "Instagram", handle: "@enginear.cba", url: "https://www.instagram.com/enginear.cba/" },
    { id: "facebook", label: "Facebook", handle: "Enginear", url: "https://www.facebook.com/Enginear-105354531620920" },
    { id: "linkedin", label: "LinkedIn", handle: "Enginear Cba", url: "https://www.linkedin.com/in/enginear-cba-8764aa208/?originalSubdomain=ar" },
  ],
};

export const whatsappUrl = (text = site.whatsappText) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

// Texto institucional (literal del sitio actual)
export const about = {
  quienes:
    "Somos una empresa dedicada a la Ingeniería Civil Forense. Nuestra función es identificar Patologías de la Construcción y brindar distintas soluciones, con fundamento científico, técnico y una trayectoria de más de treinta y cinco años en el rubro.",
  servicios:
    "Tenemos más de 35 años de trayectoria en el rubro de la construcción y la ingeniería civil forense, aportando una visión global y especializada, para poder atender mejor a las distintas patologías que pudieran presentarse.",
  equipo:
    "Somos un grupo de Ingenieros Civiles profesionales, altamente capacitados y, con una vasta trayectoria sobre nuestros hombros, que ofrecemos Asesoramiento Técnico en todas las áreas de la Ingeniería Civil, especialmente, en el área de Patología de la Construcción, Ingeniería Civil Forense, Peritajes, Tasaciones, Daños y Reparaciones Edilicias, Vicios Constructivos, para Administraciones de Consorcios, Empresas, Profesionales y Particulares.",
};

// Áreas de asesoramiento (del texto del equipo)
export const areas = [
  "Patología de la Construcción",
  "Ingeniería Civil Forense",
  "Peritajes",
  "Tasaciones",
  "Daños y Reparaciones Edilicias",
  "Vicios Constructivos",
];

// Destinatarios (del texto del equipo)
export const audiences = [
  { id: "consorcios", title: "Administraciones de Consorcios", icon: "building" },
  { id: "empresas", title: "Empresas", icon: "factory" },
  { id: "profesionales", title: "Profesionales", icon: "compass" },
  { id: "particulares", title: "Particulares", icon: "home" },
];

// Servicios: la descripción es literal del sitio actual.
export const services = [
  {
    slug: "fallas-estructurales",
    short: "Fallas estructurales",
    title: "Fallas estructurales en construcciones civiles",
    text: "Análisis y propuesta de soluciones definitivas de fallas estructurales en construcciones civiles.",
    img: "fisura-medicion",
    alt: "Ingeniero de Enginear midiendo una fisura en una pared con cinta métrica",
  },
  {
    slug: "vias-de-comunicacion",
    short: "Rutas, puentes y caminos",
    title: "Vías de comunicación: rutas, puentes y caminos",
    text: "Diseño, análisis de fallas y modelos de deterioro, en vías de comunicación, rutas, puentes y caminos.",
    img: "via-puente-obra",
    alt: "Obra bajo la estructura de un puente vial con maquinaria pesada",
  },
  {
    slug: "instalaciones-electricas",
    short: "Instalaciones eléctricas",
    title: "Fallas en instalaciones y sistemas eléctricos",
    text: "Análisis de fallas en instalaciones y sistemas eléctricos.",
    img: "instalacion-electrica",
    alt: "Cableado eléctrico expuesto en una caja de instalación durante una inspección",
  },
  {
    slug: "vida-util",
    short: "Vida útil del inmueble",
    title: "Evaluación de vida útil del inmueble",
    text: "Evaluación de vida útil del inmueble.",
    img: "medidor-laser-pared",
    alt: "Medición con distanciómetro láser sobre una pared durante un relevamiento",
  },
  {
    slug: "tasaciones",
    short: "Tasaciones",
    title: "Tasación de inmuebles y maquinarias",
    text: "Tasación de inmuebles y maquinarias.",
    img: "tasacion-planos",
    alt: "Planos, calculadora y anteojos sobre el escritorio de trabajo",
  },
  {
    slug: "calculo-de-estructuras",
    short: "Cálculo de estructuras",
    title: "Cálculo de estructuras",
    text: "Cálculos de estructuras.",
    img: "calculo-estructural-cad",
    alt: "Plano estructural abierto en software CAD en la pantalla de trabajo",
  },
  {
    slug: "fundaciones",
    short: "Fundaciones y submuración",
    title: "Fundaciones, submuración y reestabilización",
    text: "Diseños de sistemas de fundaciones, superficiales y profundas, sistemas de submuración y reestabilización de viviendas.",
    img: "obra-hormigon",
    alt: "Estructura de hormigón en construcción con encofrados y armaduras",
  },
];

export const team = [
  {
    name: "Daniel Abud",
    role: "Ingeniero Civil y Profesor, especialista en Docencia.",
    detail: "Perito Judicial en Ingeniería Civil, Tasación y Agrimensura en Foro Local Provincia de Córdoba.",
    img: "daniel-abud",
    linkedin: "https://www.linkedin.com/in/daniel-abud-84aa7aa/",
  },
];

// Galería: solo fotos propias de Enginear.
export const gallery = [
  { img: "fisura-medicion", cat: "obra", alt: "Medición de una fisura con cinta métrica" },
  { img: "daniel-abud", cat: "equipo", alt: "Daniel Abud, ingeniero civil de Enginear" },
  { img: "medidor-laser", cat: "obra", alt: "Distanciómetro láser en uso durante un relevamiento" },
  { img: "calculo-estructural-cad", cat: "gabinete", alt: "Plano estructural en software CAD" },
  { img: "fisura-cinta", cat: "obra", alt: "Cinta métrica apoyada sobre una fisura vertical" },
  { img: "analisis-notebook", cat: "equipo", alt: "Daniel Abud analizando información técnica en la notebook" },
  { img: "via-puente-obra-sq", cat: "obra", alt: "Maquinaria trabajando bajo la estructura de un puente" },
  { img: "daniel-abud-oficina", cat: "equipo", alt: "Daniel Abud en la oficina de Enginear" },
  { img: "instalacion-electrica-sq", cat: "obra", alt: "Cableado eléctrico expuesto durante una inspección" },
  { img: "modelo-3d", cat: "gabinete", alt: "Modelo tridimensional de un ambiente en la notebook" },
  { img: "medidor-laser-pared", cat: "obra", alt: "Medición láser sobre pared" },
  { img: "informe-tecnico-sq", cat: "gabinete", alt: "Elaboración de un informe técnico con planos" },
  { img: "fisura-cinta-detalle", cat: "obra", alt: "Detalle de medición de fisura con cinta" },
  { img: "tasacion-planos-sq", cat: "gabinete", alt: "Planos y calculadora sobre el escritorio" },
  { img: "tablero-inspeccion-sq", cat: "obra", alt: "Inspección de una instalación con guantes de trabajo" },
  { img: "cad-detalle", cat: "gabinete", alt: "Detalle de plano estructural en pantalla" },
];

export const galleryCats = [
  { id: "todo", label: "Todo" },
  { id: "obra", label: "Relevamiento en obra" },
  { id: "gabinete", label: "Análisis y cálculo" },
  { id: "equipo", label: "Equipo" },
];

export const nav = [
  { href: "/", label: "Inicio", key: "inicio" },
  { href: "/nosotros/", label: "Nosotros", key: "nosotros" },
  { href: "/servicios/", label: "Servicios", key: "servicios" },
  { href: "/galeria/", label: "Galería", key: "galeria" },
  { href: "/contacto/", label: "Contacto", key: "contacto" },
];
