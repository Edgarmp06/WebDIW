/* ========================================
 * ARCHIVO JAVASCRIPT PRINCIPAL - TECOCHE
 * ========================================
 *
 * ÍNDICE DE FUNCIONES:
 * 1. Función de utilidad para mensajes (línea 15-35)
 * 2. Smooth Scroll - Navegación suave (línea 37-70)
 * 3. Menú Hamburguesa móvil (línea 72-95)
 * 4. Filtro de Galería interactivo (línea 97-134)
 * 5. Formulario de Contacto (línea 136-196)
 * 6. Banner de Cookies RGPD (línea 198-228)
 * 7. Botón Volver Arriba (línea 230-252)
 *
 * ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // 1. FUNCIÓN DE UTILIDAD: mostrar mensajes
    // Muestra mensajes de éxito o error en formularios
    // PARA CAMBIAR: Modifica 'duration' para duración del mensaje
    // ========================================
    function showFormMessage(text, type = 'success', duration = 5000, targetFormId) {
        const targetElement = document.getElementById(targetFormId);
        if (!targetElement) return;

        const prev = targetElement.querySelector('.form-message');
        if (prev) prev.remove();

        const msg = document.createElement('div');
        msg.className = 'form-message ' + (type === 'error' ? 'error' : 'success');
        msg.textContent = text;

        targetElement.insertBefore(msg, targetElement.firstChild);
        msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        if (duration > 0) {
            setTimeout(() => {
                msg.remove();
            }, duration);
        }
    }

    // ========================================
    // 2. SMOOTH SCROLL - Navegación suave
    // Hace que los enlaces internos se desplacen suavemente
    // PARA CAMBIAR: Modifica 'offsetTop - 80' para ajustar la altura del header
    // ========================================
    const navLinks = document.querySelectorAll('.nav-menu a, .logo a, .footer-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                // Scroll suave con compensación por header fijo
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 80px = altura del header
                    behavior: 'smooth'
                });

                // Cerrar menú móvil si está abierto
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // ========================================
    // 3. MENÚ HAMBURGUESA (Móvil)
    // Abre y cierra el menú de navegación en dispositivos móviles
    // ESTILOS: Ver styles.css líneas 313-350
    // ========================================
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');

            // Actualizar atributos de accesibilidad
            hamburger.setAttribute('aria-expanded', isExpanded);
            hamburger.setAttribute('aria-label', isExpanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');

            // Cambiar icono: hamburguesa ↔ X
            const svg = hamburger.querySelector('svg');
            if (svg) {
                if (isExpanded) {
                    // Icono X (cerrar)
                    svg.innerHTML = '<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>';
                } else {
                    // Icono hamburguesa (3 líneas)
                    svg.innerHTML = '<path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>';
                }
            }
        });
    }

    // ========================================
    // 4. FILTRO DE GALERÍA
    // Sistema de filtrado interactivo para las imágenes de la galería
    // PARA AÑADIR FILTRO: Añadir botón en HTML y clase en imágenes
    // ESTILOS: Ver styles.css líneas 615-654
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Quitar clase 'active' de todos los botones
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });

            // Añadir clase 'active' al botón clickeado
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            const filterValue = this.getAttribute('data-filter');

            // Filtrar imágenes según la categoría seleccionada
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ========================================
    // 5. FORMULARIO DE CONTACTO
    // Validación y envío del formulario de contacto
    // PARA CAMBIAR: Modifica los mensajes de éxito/error
    // ESTILOS: Ver styles.css líneas 773-816
    // ========================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const nombre = formData.get('nombre');
            const email = formData.get('email');
            const telefono = formData.get('telefono');
            const servicio = formData.get('servicio');
            const mensaje = formData.get('mensaje');

            // Validaciones básicas
            if (!nombre || !email || !telefono || !servicio || !mensaje) {
                showFormMessage('❌ Por favor, completa todos los campos requeridos.', 'error', 5000, 'contact-form');
                return;
            }

            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('❌ Por favor, introduce un email válido.', 'error', 5000, 'contact-form');
                return;
            }

            // Validar teléfono (mínimo 9 dígitos)
            const telefonoRegex = /^\d{9,}$/;
            if (!telefonoRegex.test(telefono.replace(/\s/g, ''))) {
                showFormMessage('❌ Por favor, introduce un teléfono válido (mínimo 9 dígitos).', 'error', 5000, 'contact-form');
                return;
            }

            // AQUÍ IRÍA LA LLAMADA AL BACKEND
            // fetch('/api/contacto', { method: 'POST', body: formData })

            // Simulación de envío exitoso
            showFormMessage('✅ ¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success', 5000, 'contact-form');

            // Limpiar formulario después de 1 segundo
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }

    // ========================================
    // 6. BANNER DE COOKIES (RGPD)
    // Muestra el banner de cookies y guarda la preferencia
    // PARA CAMBIAR: Modifica el texto en index.html línea 373
    // ESTILOS: Ver styles.css líneas 1370-1437
    // ========================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    // Verificar si el usuario ya aceptó las cookies
    if (cookieBanner) {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');

        if (!cookiesAccepted) {
            // Mostrar banner después de 1 segundo
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }
    }

    // Al hacer clic en "Aceptar"
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');

            // Ocultar banner completamente después de la animación
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 500);
        });
    }

    // ========================================
    // 7. BOTÓN "VOLVER ARRIBA"
    // Botón flotante que aparece al hacer scroll
    // PARA CAMBIAR: Modifica '300' para cambiar cuándo aparece
    // ESTILOS: Ver styles.css líneas 1273-1313
    // ========================================
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // Mostrar/ocultar botón según el scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Aparece después de 300px de scroll
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Al hacer clic, volver arriba suavemente
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});

/* ========================================
 * FIN DEL ARCHIVO JAVASCRIPT
 * ======================================== */
