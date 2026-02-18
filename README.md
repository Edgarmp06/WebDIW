# 🏎️ Tecoche: Automotive integrated solution (v5.0)

**Tecoche** es una solución web integral de alto rendimiento diseñada específicamente para empresas del sector automotriz. Este activo digital ha sido construido bajo estándares de grado empresarial, combinando una interfaz de usuario premium con una infraestructura híbrida (Serverless + PHP) robusta y escalable.

[![Versión](https://img.shields.io/badge/Versión-5.0_Stable-blue.svg)](https://tecoche.es)
[![Tecnología](https://img.shields.io/badge/Stack-Vanilla_JS_|_Firebase_|_PHP-yellow.svg)]()
[![Performance](https://img.shields.io/badge/Lighthouse-95+-brightgreen.svg)]()
[![SEO](https://img.shields.io/badge/SEO-Optimizado-green.svg)]()

---

## 💎 Propuesta de valor

A diferencia de las plantillas genéricas, **Tecoche** ofrece un ecosistema completo para digitalizar un negocio de automoción real:

*   **🛒 E-commerce engine**: sistema de tienda online con carrito persistente, gestión de inventario real y **facturación simplificada automática**.
*   **📊 PHP Budget Engine**: calculadora de presupuestos inteligente procesada en servidor (PHP) para estimaciones precisas de reparaciones.
*   **🚗 Concesionario virtual**: sistema dinámico de exposición de vehículos con filtros avanzados y fichas de detalle técnico.
*   **🛠️ Gestión 360° (panel admin)**: panel de control privado para la gestión de productos, vehículos, stock y roles de usuario.
*   **🎨 UI Dual (Dark Mode Premium)**: experiencia visual adaptativa con modo oscuro optimizado para alta visibilidad y estética de vanguardia.
*   **📄 Advanced Invoicing**: sistema de generación de facturas simplificadas durante el checkout con desglose detallado de **Base Imponible e IVA (21%)**.

---

## 🛠️ Stack tecnológico

El proyecto garantiza una arquitectura de microservicios eficiente:

*   **Frontend**: HTML5 semántico y CSS3 avanzado (Variables, Grid, Flexbox).
*   **Core engine**: Vanilla JavaScript (ES6+) modular.
*   **Backend Híbrido**: 
    *   **Firebase**: Autenticación, Base de Datos (Firestore) y Hosting.
    *   **PHP 8.x**: Procesamiento lógico de presupuestos en servidor.
*   **Integraciones**:
    *   **FormSubmit**: Notificaciones de pedidos y facturación profesional por email.
    *   **FontAwesome 6.5**: Paquete de iconografía vectorial.

---

## 📂 Arquitectura del sistema

```text
WebDIW-main/
├── 📄 index.html              # Landing page y Home
├── 📄 tienda.html             # E-commerce platform (contenerizada)
├── 📄 calculadora-presupuesto.html # Interfaz de presupuestos PHP
├── 📂 api/                    # Lógica de servidor
│   └── 🐘 presupuesto.php     # Motor de cálculo server-side
├── 📄 compra-venta.html       # Catálogo de vehículos
├── 📄 admin.html              # Panel de administración (CRUD)
├── 📄 checkout.html           # Pasarela con desglose impositivo e impuestos
├── 📄 perfil.html             # Dashboard de usuario e historial
├── 📂 js/                     # Lógica de negocio modular
│   ├── ⚡ auth.js              # Seguridad y sesiones
│   ├── ⚡ firestore.js         # Abstracción de DB
│   ├── ⚡ cart.js              # Motor de ventas
│   └── ⚡ verification-guard.js# Guardianes de seguridad
├── 📄 styles.css              # Design System unificado y responsive
└── 🌐 sitemap.xml             # Indexación SEO actualizada
```

---

## 🚀 Funcionalidades estrella

### 1. Sistema de Impuestos y Facturación
Cumplimiento legal total: el proceso de compra desglosa automáticamente el IVA para el cliente y genera una factura simplificada profesional que se envía por correo electrónico tanto al cliente como al administrador.

### 2. Calculadora de Presupuestos (PHP)
Integración de tecnología de servidor para ofrecer cálculos dinámicos basados en repuestos, mano de obra y tipo de vehículo, proporcionando una estimación inmediata al usuario.

### 3. Dark Mode "Eye-Comfort"
Sistema de modo oscuro pulido píxel a píxel para asegurar que todos los formularios, tarjetas de productos y tablas de datos sean 100% legibles y estéticos en condiciones de poca luz.

---

## 🔧 Guía de instalación

1.  **Entorno**: Requiere un servidor local con soporte PHP (XAMPP, WAMP, Laragon) o despliegue en Vercel (configurado con `vercel.json`).
2.  **Firebase**: Configurar las credenciales en `js/firebase-config.js`.
3.  **Despliegue**: El proyecto ya incluye los encabezados SEO y el mapa del sitio para producción inmediata.

---

**🚗 Tecoche: El futuro de la gestión automotriz digital**
**Desarrollado por**: Edgar
**Versión Final**: 18 de febrero de 2026

