# Enginear: contenido pendiente de validación

Relevado de https://enginearcba.com.ar el 17/11/2026. El sitio actual tiene una sola página (Home) y no incluye estos datos. El sitio nuevo **no inventa** nada de esta lista: cuando falta un dato, se omite.

## Datos de la empresa
- [ ] **Dirección / oficina**: el sitio solo indica Córdoba. Si hay oficina con atención al público, agregar la dirección y el mapa en Contacto, y `streetAddress` en el Schema (`src/data/site.mjs` + `tools/build.mjs`).
- [ ] **Horario de atención**: no figura.
- [ ] **Razón social / CUIT / matrículas profesionales**: no figuran (`site.legalName`).
- [ ] **Año de inicio**: el sitio dice "más de 30 años". Confirmar el número que se quiere comunicar.
- [ ] **Sucursales**: no hay indicios de más de una sede, así que no se creó esa sección.

## Equipo
- [x] Belén Abud ya no trabaja en Enginear: se quitaron su perfil y todas las fotos en las que aparece (17/11/2026).
- [ ] ¿Hay más integrantes? El texto institucional dice "un grupo de Ingenieros Civiles", pero hoy solo se muestra a Daniel Abud.

## Contenido que sumaría valor (no existe hoy)
- [ ] Casos o proyectos realizados: tipo de obra, problema detectado y solución.
- [ ] Testimonios de clientes (administraciones, empresas, particulares).
- [ ] Ampliar la descripción de cada servicio: hoy cada uno tiene una sola línea, tomada literal del sitio actual.
- [ ] Preguntas frecuentes, por ejemplo cuándo pedir un peritaje o qué incluye un informe.

## Técnico
- [ ] **Casilla `no-reply@enginearcba.com.ar`**: crearla en Hostinger (el formulario la usa como remitente) o cambiar `REMITENTE` en `src/static/contacto/enviar.php`.
- [ ] **Facebook**: el enlace es el que figura en el sitio actual (`facebook.com/Enginear-105354531620920`). Verificar que siga activo.
- [ ] **Google Search Console**: verificar el dominio y enviar `https://enginearcba.com.ar/sitemap.xml`.
- [ ] **Google Business Profile**: si existe, vincularlo y sumarlo a `site.social`.
- [ ] **Analítica**: el sitio actual usa Site Kit (Google Analytics). El nuevo no tiene ningún rastreo. Si se agrega, actualizar la política de privacidad y la cabecera CSP del `.htaccess`.
- [ ] **Política de privacidad** (`src/pages/privacidad.mjs`): validar el texto con un asesor legal.
- [ ] Fotos de stock heredadas del sitio actual que siguen en uso: obra de hormigón (servicio Fundaciones). Reemplazarlas por fotos propias cuando las haya.
