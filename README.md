# 🏎️ Tecoche: Automotive integrated solution (v4.3)

**Tecoche** es una solución web integral de alto rendimiento diseñada específicamente para empresas del sector automotriz (talleres mecánicos, centros de personalización y concesionarios de compra-venta). Este activo digital ha sido construido bajo estándares de grado empresarial, combinando una interfaz de usuario premium con una infraestructura *serverless* robusta y escalable.

[![Versión](https://img.shields.io/badge/Versión-4.3_Stable-blue.svg)](https://tecoche.es)
[![Tecnología](https://img.shields.io/badge/Stack-Vanilla_JS_|_Firebase-yellow.svg)]()
[![Performance](https://img.shields.io/badge/Lighthouse-90+-brightgreen.svg)]()
[![SEO](https://img.shields.io/badge/SEO-Optimizado-green.svg)]()

---

## 💎 Propuesta de valor

A diferencia de las plantillas genéricas, **Tecoche** ofrece un ecosistema completo para digitalizar un negocio de automoción real:

*   **🛒 E-commerce engine**: sistema de tienda online integrado con carrito persistente y gestión de inventario en tiempo real.
*   **🚗 Concesionario virtual**: sistema dinámico de exposición de vehículos con filtros avanzados y fichas de detalle técnico.
*   **🛠️ Gestión 360° (panel admin)**: panel de control privado para la gestión de productos, vehículos y stock sin necesidad de conocimientos técnicos.
*   **🔒 Auth & security**: sistema de autenticación de usuarios mediante Firebase, con protección de rutas y perfiles personalizados.
*   **📈 Conversión optimizada**: formularios de contacto inteligentes con autoselección de servicios y presupuestos automatizados.

---

## 🛠️ Stack tecnológico

El proyecto evita dependencias innecesarias (bloatware) para garantizar una carga ultrarrápida:

*   **Frontend**: HTML5 semántico y moderno CSS3 (variables CSS, Grid, Flexbox).
*   **Core engine**: Vanilla JavaScript (ES6+) modular.
*   **Backend-as-a-Service**: 
    *   **Firebase Authentication**: registro y login seguro.
    *   **Cloud Firestore**: base de datos NoSQL persistente y en tiempo real.
*   **Integraciones de terceros**:
    *   **FormSubmit**: procesamiento de *leads* y contacto.
    *   **FontAwesome 6.5**: paquete de iconografía vectorial.

---

## 📂 Arquitectura del sistema

La estructura ha sido diseñada para ser modular y extensible, facilitando cualquier mantenimiento futuro:

```text
WebDIW-main/
├── 📄 index.html              # Landing page de conversión y Home
├── 📄 tienda.html             # Plataforma de e-commerce (repuestos/accesorios)
├── 📄 compra-venta.html       # Catálogo de vehículos de ocasión
├── 📄 admin.html              # Panel de administración (dashboard CRUD)
├── 📄 carrito.html            # Gestor de compra y revisión de artículos
├── 📄 checkout.html           # Pasarela de finalización de pedido
├── 📄 perfil.html             # Perfil de usuario y estado de pedidos
├── 📄 login.html / register.html # Autenticación de usuarios
├── 📄 aviso-legal.html / ...  # Páginas legales (privacidad, cookies)
├── 📂 js/                     # Lógica de negocio (módulos independientes)
│   ├── ⚡ auth.js              # Gestión de sesiones y seguridad
│   ├── ⚡ firestore.js         # Capa de abstracción de base de datos
│   ├── ⚡ cart.js              # Motor de cálculos y persistencia del carrito
│   ├── ⚡ shop.js              # Renderizador dinámico de inventario
│   ├── ⚡ admin.js            # Lógica de gestión de stock (CRUD)
│   ├── ⚡ verification-guard.js# Sistema de protección por email verificado
│   ├── ⚡ sell-car-guard.js    # Control de acceso para tasaciones
│   ├── ⚡ header-logic.js     # Gestión dinámica de estados de usuario
│   └── ⚡ firebase-config.js   # Orquestación de servicios en la nube
├── 📂 images/                 # Recursos gráficos optimizados
├── 📄 styles.css              # Framework de diseño global (optimizado)
├── 📄 script.js               # Lógica de interfaz de usuario y animaciones
└── 🌐 sitemap.xml             # XML dinámico para indexación SEO
```

---

## 🚀 Funcionalidades business-ready

### 1. Panel de administración independiente
Un módulo privado donde el dueño del negocio puede subir fotos, descripciones y precios. Los cambios se reflejan instantáneamente en la web sin republicar el código.

### 2. Seguridad de grado bancario
*   **Detección de verificación**: sistema que bloquea acciones críticas (como vender un coche) si el usuario no ha verificado su email.
*   **Rutas protegidas**: redirección automática si un usuario no autorizado intenta acceder al panel `admin.html`.

### 3. SEO y visibilidad local
Configuración avanzada de metadatos Open Graph, Twitter Cards y etiquetas `JSON-LD Schema` (AutoRepair) para posicionar el negocio en los primeros resultados de Google Maps.

### 4. Responsividad extrema
Auditoría completa para dispositivos Apple (iOS) y Android. Adaptación dinámica de elementos para pantallas pequeñas.

---

## 🏛️ Legal y cumplimiento (RGPD)

Listo para operar en la Unión Europea:
*   Banner de consentimiento de cookies dinámico.
*   Páginas legales completas: **Aviso legal**, **Política de privacidad** y **Política de cookies**.
*   Seguridad en enlaces externos mediante `rel="noopener noreferrer"`.

---

## 🔧 Guía de instalación profesional

Este proyecto utiliza **ES6 Modules**, por lo que requiere un entorno de servidor:

1.  **Clonación**: descargue el activo digital en su estación de trabajo.
2.  **Servidor**: levante un servicio local (VS Code Live Server o similar).
3.  **Configuración**: vincule su APP ID de Firebase en `js/firebase-config.js`.

---

**🚗 Tecoche: calidad y confianza en automoción digital**
**Desarrollado por**: Edgar
**Última revisión**: 16 de febrero de 2026
