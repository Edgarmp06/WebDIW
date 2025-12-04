# 📋 GUÍA RÁPIDA DE CAMBIOS - TECOCHE

Esta guía te ayudará a encontrar rápidamente dónde hacer cambios en la web si tu profesora te pide modificaciones en clase.

---

## 🎨 CAMBIAR COLORES

### Colores principales de la web:
- **Azul oscuro:** `#0c2461`
- **Naranja:** `#ff9f1c`

**Ubicación en CSS:** `styles.css` líneas 33-42
```css
:root {
    --color-primary: #0c2461; /* Azul Oscuro */
    --color-secondary: #ff9f1c; /* Naranja */
}
```

### Colores de los CÍRCULOS del Hero:
**Ubicación:** `styles.css` líneas 485-515

- **Círculo 1** (Taller certificado): Naranja intenso - línea 487
- **Círculo 2** (Garantía 12 meses): Azul oscuro - línea 495
- **Círculo 3** (Diagnosis electrónica): Naranja medio - línea 503
- **Círculo 4** (Financiación disponible): Azul oscuro - línea 511

**Ejemplo de cambio:**
```css
/* De naranja a verde */
background: linear-gradient(135deg, rgba(39, 174, 96, 0.85), rgba(39, 174, 96, 0.65));
```

---

## 📝 CAMBIAR TEXTOS

### Título principal del Hero:
**Ubicación:** `index.html` línea 113
```html
<h1 class="hero-title">Tu taller de confianza en Manises</h1>
```

### Subtítulo del Hero:
**Ubicación:** `index.html` línea 116
```html
<p class="hero-subtitle">Reparación, mantenimiento...</p>
```

### Textos de los círculos:
**Ubicación:** `index.html` líneas 119-124
```html
<ul class="hero-usps">
    <li>Taller certificado</li>
    <li>Garantía 12 meses</li>
    <li>Diagnosis electrónica</li>
    <li>Financiación disponible</li>
</ul>
```

### Título de sección Servicios:
**Ubicación:** `index.html` línea 146
```html
<h2 id="servicios-title">Nuestros servicios principales</h2>
```

---

## 🖼️ CAMBIAR IMÁGENES

### Logo del header:
**Ubicación:** `index.html` línea 73
```html
<img src="DIWLogo.png" alt="...">
```

### Logo grande del Hero:
**Ubicación:** `index.html` línea 109
```html
<img src="DIWLogo.png" alt="Tecoche - Logo" class="hero-logo-img">
```

### Tamaño del logo grande:
**Ubicación:** `styles.css` línea 435
```css
.hero-logo-img {
    height: 120px; /* Cambiar este número */
}
```

### Imágenes de la galería:
**Ubicación:** `index.html` líneas 230-271
- Todas están en la carpeta `/images/`
- Nombres: `mecanica-general.jpg`, `tuning-coche.jpg`, etc.

---

## 🎯 CAMBIAR TAMAÑOS DE FUENTE

### Título principal:
**Ubicación:** `styles.css` línea 458
```css
.hero-title {
    font-size: 3.8em; /* Desktop */
}
```

**Móvil:** `styles.css` línea 1225
```css
.hero-title {
    font-size: 2.2em; /* Móvil */
}
```

### Círculos:
**Ubicación:** `styles.css` línea 477
```css
.hero-usps li {
    font-size: 0.95rem;
}
```

---

## 📱 CAMBIAR TELÉFONOS

### Teléfono en todos los botones:
**Buscar en index.html:** `tel:679426134`
- Aparece en líneas: 85, 92, 129, 135

**Cambiar a otro número:**
```html
<!-- Antes -->
<a href="tel:679426134">

<!-- Después -->
<a href="tel:666555444">
```

---

## 🔧 MODIFICAR SERVICIOS

### Tarjetas de servicios:
**Ubicación:** `index.html` líneas 152-202

**Estructura de cada tarjeta:**
```html
<article class="service-card">
    <i class="fa-solid fa-wrench service-icon"></i>
    <h3 class="card-title">Reparación y mantenimiento</h3>
    <p class="card-description">Descripción...</p>
    <ul class="service-features">
        <li><i class="fa-solid fa-check"></i> Característica 1</li>
        <li><i class="fa-solid fa-check"></i> Característica 2</li>
    </ul>
</article>
```

### Cambiar iconos:
Buscar íconos en: https://fontawesome.com/icons
```html
<!-- Ejemplos -->
<i class="fa-solid fa-wrench"></i> <!-- Llave inglesa -->
<i class="fa-solid fa-car"></i> <!-- Coche -->
<i class="fa-solid fa-gauge-high"></i> <!-- Velocímetro -->
<i class="fa-solid fa-truck-tow"></i> <!-- Grúa -->
```

---

## 🎨 CAMBIAR FONDO DEL HERO

### Color de fondo:
**Ubicación:** `styles.css` línea 403
```css
.hero-section {
    background: linear-gradient(135deg, var(--color-primary) 0%, #0a1a47 100%);
}
```

**Cambiar a otro color:**
```css
/* Ejemplo: Fondo rojo oscuro */
background: linear-gradient(135deg, #8B0000 0%, #4B0000 100%);
```

---

## 📋 CAMBIAR FILTROS DE GALERÍA

**Ubicación:** `index.html` líneas 221-225
```html
<button class="filter-button active" data-filter="all">Todos</button>
<button class="filter-button" data-filter="reparacion">Reparación</button>
```

**Para añadir un nuevo filtro:**
1. Añadir botón en el HTML
2. Añadir clase correspondiente a las imágenes

---

## 🌐 CAMBIAR ENLACES DE REDES SOCIALES

**Ubicación:** `index.html` líneas 380-382
```html
<a href="https://www.facebook.com" target="_blank">...</a>
<a href="https://www.instagram.com" target="_blank">...</a>
<a href="https://www.linkedin.com" target="_blank">...</a>
```

---

## 📊 CAMBIAR INFORMACIÓN DE CONTACTO

### Dirección:
**Ubicación:** `index.html` línea 327
```html
<li>Dirección: Calle del Automóvil, 123, 46940 Manises, Valencia</li>
```

### Email:
**Ubicación:** `index.html` línea 330
```html
<a href="mailto:info@tecoche.es">info@tecoche.es</a>
```

### Horarios:
**Ubicación:** `index.html` líneas 335-337

---

## 🍪 BANNER DE COOKIES

**Ubicación:** `index.html` líneas 438-446
**Estilos:** `styles.css` líneas 1370-1437
**JavaScript:** `script.js` líneas 200-230

---

## 🎯 CAMBIOS RÁPIDOS COMUNES

### 1. Cambiar el nombre de la empresa:
Buscar "Tecoche" en `index.html` y reemplazar

### 2. Cambiar el número de teléfono en toda la web:
Buscar `679426134` en `index.html` y reemplazar todo

### 3. Cambiar el color naranja por otro:
Cambiar `#ff9f1c` en `styles.css` línea 35

### 4. Cambiar el color azul por otro:
Cambiar `#0c2461` en `styles.css` línea 34

### 5. Hacer el logo más grande/pequeño:
Cambiar `height: 120px` en `styles.css` línea 435

---

## 📂 ESTRUCTURA DE ARCHIVOS

```
WebDIW-main/
├── index.html          ← Página principal
├── styles.css          ← Todos los estilos
├── script.js           ← JavaScript (interactividad)
├── DIWLogo.png         ← Logo de la empresa
├── images/             ← Todas las imágenes de galería
│   ├── mecanica-general.jpg
│   ├── tuning-coche.jpg
│   ├── venta-vehiculos.jpg
│   └── ...
├── reparacion-motor.html      ← Páginas secundarias
├── reprogramacion-ecu.html
├── compra-venta.html
└── ...
```

---

## ⚡ ATAJOS DE TECLADO ÚTILES

- **Buscar en archivo:** `Ctrl + F`
- **Buscar en todos los archivos:** `Ctrl + Shift + F`
- **Reemplazar:** `Ctrl + H`
- **Ir a línea:** `Ctrl + G`

---

## 🆘 SOLUCIÓN RÁPIDA DE PROBLEMAS

### El logo no se ve:
1. Verificar que `DIWLogo.png` existe en la raíz
2. Verificar la ruta en línea 73 y 109 de `index.html`

### Los círculos no se ven bien:
1. Ajustar la opacidad en `styles.css` líneas 487, 495, 503, 511
2. Aumentar los valores (ej: de 0.45 a 0.75)

### Los colores no cambian:
1. Limpiar caché del navegador: `Ctrl + Shift + R`
2. Verificar que guardaste el archivo CSS

### El menú móvil no funciona:
1. Verificar que `script.js` está enlazado en línea 459
2. Abrir consola del navegador (F12) para ver errores

---

## 📝 NOTAS IMPORTANTES

- **Siempre guardar los archivos** antes de recargar el navegador
- **Hacer backup** antes de cambios grandes
- Los **comentarios en el código** están en español para facilitar la búsqueda
- Usar **Ctrl+F** para buscar rápidamente en los archivos

---

**¡Buena suerte con tu presentación! 🚀**
