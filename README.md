# 🚗 Tecoche - Sitio Web Profesional

Sitio web completo y responsivo para el taller de reparación, tuning y compra-venta de vehículos **Tecoche** en Manises, Valencia.

![Estado](https://img.shields.io/badge/Estado-Producción-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-✓-orange)
![CSS3](https://img.shields.io/badge/CSS3-✓-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![Responsive](https://img.shields.io/badge/Responsive-100%25-success)
![SEO](https://img.shields.io/badge/SEO-Optimizado-green)
![Accesibilidad](https://img.shields.io/badge/WCAG%202.1-AA-blue)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [SEO y Accesibilidad](#-seo-y-accesibilidad)
- [Documentación](#-documentación)
- [Cómo Usar](#-cómo-usar)
- [Despliegue](#-despliegue)
- [Tecnologías](#-tecnologías)
- [Contacto](#-información-de-contacto)

---

## ✨ Características

### 🎯 Funcionalidades Principales
- ✅ **100% Responsive**: Compatible con desktop, tablet y móvil (3 breakpoints)
- ✅ **Gestión Dinámica de Coches**: Conexión con Firebase para cargar vehículos y productos.
- ✅ **Panel de Administración**: Gestión completa de inventario (CRUD) protegida por login.
- ✅ **SEO Optimizado**: Meta descriptions, Open Graph, Twitter Cards, JSON-LD Schema.
- ✅ **Accesibilidad WCAG 2.1 AA**: Etiquetas ARIA, navegación por teclado, contraste AAA.
- ✅ **Formularios Inteligentes**: Autoselección de vehículos al contactar y correos formateados.
- ✅ **Galería Interactiva**: Filtros por categoría con animaciones suaves.
- ✅ **Validación Robusta**: Regex para email/teléfono y mensajes de feedback en tiempo real.

### 🎨 Paleta de Colores
- **Azul Oscuro**: `#0c2461` (Color principal - Contraste 13.5:1)
- **Naranja**: `#ff9f1c` (Color secundario - Contraste 5.2:1)
- **Texto Oscuro**: `#333` / **Texto Claro**: `#f8f8f8`
- **Fondo Claro**: `#f4f7f9`

---

## 📂 Estructura del Proyecto

```
WebDIW-main/
├── 📄 index.html                    # Página principal (Landing Page)
├── 📄 compra-venta.html             # Catálogo de vehículos (Dinámico)
├── 📄 tienda.html                   # Tienda de productos (Dinámica)
├── 📄 admin.html                    # Panel de gestión (Protegido)
├── 📄 login.html / register.html    # Autenticación de usuarios
├── 🎨 styles.css                    # Estilos globales y responsive
├── 🎨 admin-styles.css              # Estilos específicos del panel admin
├── ⚡ script.js                     # Lógica frontend general
├── ⚡ js/                           # Módulos JavaScript
│   ├── firebase-config.js           # Configuración de Firebase
│   ├── auth.js                      # Gestión de usuarios (Login/Registro)
│   ├── firestore.js                 # Base de datos (CRUD)
│   ├── shop.js                      # Lógica de tienda y coches
│   └── admin.js                     # Lógica del panel de administración
├── 📖 README.md                     # Documentación del proyecto
├── 🌐 sitemap.xml                   # Mapa del sitio (SEO)
└── 📁 images/                       # Recursos gráficos optimizados
```

---

## 🚀 SEO y Accesibilidad

### 📈 SEO (Search Engine Optimization)

#### Meta Tags Completos en TODAS las Páginas
```html
<!-- Meta Description Optimizada -->
<meta name="description" content="Descripción específica con CTA y teléfono">

<!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
```

#### Datos Estructurados JSON-LD (Schema.org)
Implementación de schemas `AutoRepair` y `LocalBusiness` para mejorar la visibilidad en Google Maps y búsquedas locales.

#### Sitemap.xml
Sitemap generado y actualizado automáticamente para indexación rápida.

---

## 🚀 Cómo Usar

### Visualización Local
Para ejecutar el proyecto localmente, necesitas un servidor web simple debido a los módulos de JavaScript (ES6 Modules) y CORS.

**Con Node.js:**
```bash
npx http-server .
```

**Con Python:**
```bash
python -m http.server 8000
```
Luego abre: **http://localhost:8000**

---

## 🌐 Despliegue

Este proyecto está optimizado para desplegarse en **Vercel** o **Netlify**.

1. Sube el código a GitHub.
2. Conecta tu cuenta en Vercel/Netlify.
3. El despliegue es automático.
4. **Nota:** Asegúrate de configurar las reglas de Firebase Firestore para permitir lectura pública y escritura solo a administradores.

---

## 🛠 Tecnologías

### Frontend
- **HTML5**: Semántico y accesible.
- **CSS3**: Variables CSS, Flexbox, Grid, Animaciones.
- **JavaScript (ES6+)**: Módulos nativos, Async/Await, DOM Manipulation.

### Backend (Serverless)
- **Firebase Firestore**: Base de datos NoSQL para coches, productos y usuarios.
- **Firebase Authentication**: Sistema de login y registro seguro.

### Herramientas
- **Font Awesome 6.5**: Iconografía vectorial.
- **FormSubmit.co**: Gestión de envíos de formularios sin backend propio.

---

## 📅 Historial de Versiones

| Versión | Fecha | Cambios Principales |
|---------|-------|---------------------|
| **1.0** | Nov 2025 | Versión inicial estática |
| **2.0** | Dic 2025 | Integración de diseño responsive y SEO |
| **3.0** | Ene 2026 | Conexión con Firebase y Panel Admin |
| **4.0** | Feb 2026 | **Versión Final:** Autoselección de coches, corrección de imágenes, limpieza de código y optimización de carga. |
| **4.1** | Feb 2026 | **Seguridad y Accesibilidad:** Verificación de email obligatoria con bloqueo de formularios, banner de alerta global, mejoras de accesibilidad en fuentes y panel de administración optimizado. |

---

## 📧 Soporte

¿Preguntas sobre el código? 
- 📧 Email: [admtecoche@gmail.com](mailto:admtecoche@gmail.com)
- 🌐 Web: www.tecoche.es

---

**🚗 Desarrollado para Tecoche - Tu Taller de Confianza en Manises**
**Última actualización**: 13 de Febrero de 2026
