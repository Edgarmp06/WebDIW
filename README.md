# 🚗 Tecoche - Sitio Web Profesional

Sitio web completo y responsivo para el taller de reparación, tuning y compra-venta de vehículos **Tecoche** en Manises, Valencia.

![Estado](https://img.shields.io/badge/Estado-Completado-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-✓-orange)
![CSS3](https://img.shields.io/badge/CSS3-✓-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![Responsive](https://img.shields.io/badge/Responsive-100%25-success)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Documentación](#-documentación)
- [Cómo Usar](#-cómo-usar)
- [Despliegue](#-despliegue)
- [Tecnologías](#-tecnologías)
- [Contacto](#-información-de-contacto)

---

## ✨ Características

### Funcionalidades Principales
- ✅ **100% Responsive**: Compatible con desktop, tablet y móvil
- ✅ **SEO Optimizado**: JSON-LD Schema, meta tags completos
- ✅ **Accesibilidad**: ARIA labels, skip links, navegación por teclado
- ✅ **Logo Grande en Hero**: Logo centrado con animación de entrada
- ✅ **Círculos de Características**: 4 badges con colores concordantes (naranja/azul)
- ✅ **Menú Hamburguesa**: Navegación móvil completa con animaciones
- ✅ **Filtro de Galería**: Sistema interactivo por categorías
- ✅ **Validación de Formulario**: Email y teléfono con regex
- ✅ **Banner de Cookies**: Cumplimiento RGPD
- ✅ **Botón Volver Arriba**: Scroll suave al inicio
- ✅ **Google Maps**: Mapa embebido responsive

### Paleta de Colores
- **Azul Oscuro**: `#0c2461` (Color principal)
- **Naranja**: `#ff9f1c` (Color secundario)
- **Texto**: `#333` / `#f8f8f8`

---

## 📂 Estructura del Proyecto

```
WebDIW-main/
├── 📄 index.html                    # Página principal (con comentarios)
├── 🎨 styles.css                    # Estilos completos (con índice)
├── ⚡ script.js                     # JavaScript (7 funciones documentadas)
├── 📖 README.md                     # Este archivo
├── 📘 GUIA-RAPIDA-CAMBIOS.md        # Guía para hacer cambios rápidos
│
├── 🖼️ DIWLogo.png                   # Logo de la empresa
│
├── 📁 images/                       # Imágenes de la galería
│   ├── mecanica-general.jpg         (96 KB)
│   ├── tuning-coche.jpg             (268 KB)
│   ├── venta-vehiculos.jpg          (92 KB)
│   ├── servicio-grua.jpg            (374 KB)
│   ├── diagnosis-electronica.jpg    (94 KB)
│   ├── personalizacion.jpg          (150 KB)
│   └── hero-taller.jpg              (267 KB)
│
├── 📁 Páginas Secundarias
│   ├── reparacion-motor.html        # Detalle de trabajo 1
│   ├── reprogramacion-ecu.html      # Detalle de trabajo 2
│   ├── compra-venta.html            # Página de vehículos
│   ├── grua-24h.html                # Detalle servicio grúa
│   ├── diagnosis-electronica.html   # Detalle diagnosis
│   └── kit-estetico.html            # Detalle kits
│
├── 📁 Páginas Legales
│   ├── aviso-legal.html
│   ├── politica-privacidad.html
│   ├── politica-cookies.html
│   └── mapa-sitio.html
│
└── 📁 SEO
    └── sitemap.xml                  # Mapa del sitio
```

---

## 📚 Documentación

### Código Comentado

**Todos los archivos principales tienen comentarios completos:**

#### 📄 index.html
- Comentarios en cada sección (Header, Hero, Servicios, Galería, Contacto, Footer)
- Referencias a líneas CSS donde están los estilos
- Explicación de cada componente

#### 🎨 styles.css
- **Índice completo** al inicio del archivo
- Paleta de colores documentada
- Sección especial para los **círculos del Hero** con instrucciones
- Todas las media queries comentadas

#### ⚡ script.js
- **Índice de funciones** al inicio
- 7 funciones principales documentadas:
  1. Mensajes de formulario
  2. Smooth scroll
  3. Menú hamburguesa
  4. Filtro de galería
  5. Formulario de contacto
  6. Banner de cookies
  7. Botón volver arriba

### 📘 GUIA-RAPIDA-CAMBIOS.md

**Guía completa para hacer cambios rápidos** (ideal para presentaciones):
- Cómo cambiar colores (principal + círculos)
- Cómo cambiar textos
- Cómo cambiar imágenes y tamaños
- Cómo cambiar teléfonos
- Cómo modificar servicios
- Solución rápida de problemas
- Atajos de teclado

---

## 🚀 Cómo Usar

### Visualización Local

#### Opción 1: Doble clic en index.html
```
1. Abre la carpeta del proyecto
2. Haz doble clic en index.html
3. Se abrirá en tu navegador predeterminado
```

#### Opción 2: Servidor Local (Recomendado)

**Con Python:**
```bash
cd "c:\Users\edgar\OneDrive\Escritorio\WebDIW-main\WebDIW-main"
python -m http.server 8000
```

**Con Node.js:**
```bash
npx http-server
```

Luego abre: **http://localhost:8000**

---

## 🌐 Despliegue

### Opción 1: GitHub Pages (Gratuito)
```bash
1. Crea un repositorio en GitHub
2. Sube todos los archivos
3. Settings → Pages → Branch: main
4. Tu sitio estará en: https://tuusuario.github.io/tecoche/
```

### Opción 2: Netlify (Gratuito)
```bash
1. Arrastra la carpeta a netlify.com/drop
2. Tu sitio estará online en segundos
3. URL personalizada disponible
```

### Opción 3: Hosting Tradicional
```bash
1. Comprime la carpeta completa
2. Sube via FTP/SFTP
3. Estructura requerida:
   public_html/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── DIWLogo.png
   └── images/
```

---

## 📱 Secciones del Sitio

### 1. **Header Fijo** (línea 59-96 HTML)
- Logo clickeable
- Menú de navegación (4 enlaces)
- Botón "Llamar ahora"
- Menú hamburguesa (móvil)

### 2. **Hero Section** (línea 94-127 HTML)
- **Logo grande centrado** con animación
- Título y subtítulo
- **4 círculos de características** con gradientes:
  - Taller certificado (naranja)
  - Garantía 12 meses (azul)
  - Diagnosis electrónica (naranja)
  - Financiación disponible (azul)
- 2 botones CTA
- Banner de emergencia (grúa 24h)

### 3. **Servicios** (línea 129-196 HTML)
4 tarjetas con:
- Iconos de Font Awesome
- Títulos y descripciones
- Listas de características
- Efecto hover (elevación)

### 4. **Galería** (línea 198-274 HTML)
- 6 imágenes profesionales
- **Filtros interactivos** (Todos, Reparación, Tuning, Venta, Grúa)
- Efecto hover con zoom
- Enlaces a páginas de detalle

### 5. **Contacto** (línea 276-297 HTML)
- **Formulario validado** (5 campos)
- Información de contacto
- Horarios
- Callout de emergencia
- **Mapa de Google Maps** responsive

### 6. **Footer** (línea 299-364 HTML)
- 4 columnas de información
- Enlaces rápidos
- Servicios
- Contacto completo
- Redes sociales
- Copyright

### 7. **Extras**
- **Banner de Cookies** RGPD (línea 366-380 HTML)
- **Botón Volver Arriba** flotante (línea 382-390 HTML)

---

## 🛠 Tecnologías

### Frontend
- **HTML5**: Semántico, accesible, con JSON-LD
- **CSS3**: Flexbox, Grid, Animaciones, Variables CSS
- **JavaScript**: Vanilla JS (sin frameworks)

### Librerías Externas
- **Font Awesome 6.5.1**: Iconos profesionales
- **Google Fonts**: Poppins (300, 400, 600, 700)
- **Google Maps**: Embed API

### SEO y Accesibilidad
- Schema.org (AutoRepair)
- Meta tags completos
- ARIA labels
- Skip links
- Responsive images

---

## 📊 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| **Tamaño HTML** | 26 KB |
| **Tamaño CSS** | 38 KB |
| **Tamaño JS** | 7 KB |
| **Imágenes totales** | 1.3 MB |
| **Tiempo de carga** | < 2s (3G) |
| **Páginas totales** | 14 HTML |
| **Líneas de código** | ~2000 |
| **Responsive breakpoints** | 3 (480px, 768px, 1024px) |

---

## 🎨 Cambios Rápidos (Para Clase)

### Cambiar colores de los círculos
**Ubicación:** `styles.css` líneas 485-515
```css
/* Círculo 1: Naranja → Verde */
background: linear-gradient(135deg, rgba(39, 174, 96, 0.85), rgba(39, 174, 96, 0.65));
```

### Cambiar tamaño del logo
**Ubicación:** `styles.css` línea 435
```css
.hero-logo-img {
    height: 120px; /* Cambiar este número */
}
```

### Cambiar teléfono en toda la web
**Buscar y reemplazar:** `679426134` → `TU_NUMERO`

### Ver guía completa
**Abrir:** `GUIA-RAPIDA-CAMBIOS.md`

---

## 📞 Información de Contacto (Tecoche)

- **📍 Dirección**: Calle del Automóvil, 123, 46940 Manises, Valencia
- **📱 Móvil/WhatsApp**: [679 426 134](tel:679426134)
- **☎️ Teléfono Fijo**: [96 385 47 92](tel:963854792)
- **📧 Email**: [info@tecoche.es](mailto:info@tecoche.es)
- **🕐 Horario**:
  - L-V: 07:30 - 19:00
  - Sábados: 09:00 - 15:00
  - Domingos: Cerrado
- **🚨 Grúa 24H**: [679 426 134](tel:679426134) (Disponible 24/7/365)

---

## 📝 Notas Importantes

### ✅ Completado
- [x] Diseño responsive completo
- [x] Logo grande en hero con animación
- [x] Círculos de características con colores concordantes
- [x] Todos los archivos comentados
- [x] Guía rápida de cambios
- [x] Formulario con validación
- [x] Galería con filtros
- [x] Banner de cookies RGPD
- [x] SEO optimizado
- [x] Accesibilidad (ARIA)

### 🎯 Características Destacadas
- **Código limpio**: Comentarios en español en todos los archivos
- **Fácil de modificar**: Guía completa de cambios rápidos
- **Profesional**: Diseño moderno y elegante
- **Rápido**: Carga en menos de 2 segundos
- **Accesible**: Compatible con lectores de pantalla
- **SEO**: Optimizado para buscadores

---

## 🤝 Contribuciones

Este proyecto fue desarrollado como parte de la asignatura **Diseño de Interfaces Web (DIW)** del ciclo de **Desarrollo de Aplicaciones Web (DAW)**.

---

## 📄 Licencia

Este proyecto es de uso educativo. El diseño y contenido son propiedad de Tecoche.

---

## 📅 Historial de Versiones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | Nov 2025 | Versión inicial |
| 1.1 | Dic 2025 | Añadido logo en hero |
| 1.2 | Dic 2025 | Círculos con colores concordantes |
| 2.0 | Dic 2025 | **Código completamente comentado** |

---

**Última actualización**: 4 de diciembre de 2025

Desarrollado con ❤️ para **Tecoche - Tu Taller de Confianza**

---

## 🔗 Enlaces Útiles

- [Guía Rápida de Cambios](GUIA-RAPIDA-CAMBIOS.md)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)
- [HTML Validator](https://validator.w3.org/)
- [CSS Validator](https://jigsaw.w3.org/css-validator/)

---

**🚗 ¡Tecoche - Más de 20 años de experiencia a tu servicio! 🔧**
