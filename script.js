document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // FUNCIÓN DE UTILIDAD: mostrar mensajes inline
    // (Asegura que ambos formularios puedan usarla)
    // ========================================
    function showFormMessage(text, type = 'success', duration = 5000, targetFormId) {
        // Usa el ID del formulario o la sección para encontrar dónde inyectar el mensaje
        const targetElement = document.getElementById(targetFormId);
        if (!targetElement) return;
        
        // Eliminar mensaje anterior si existe
        const prev = targetElement.parentNode.querySelector('.form-message');
        if (prev) prev.remove();

        const msg = document.createElement('div');
        msg.className = 'form-message ' + (type === 'error' ? 'error' : 'success');
        msg.textContent = text;
        
        // Insertar el mensaje justo antes del formulario/sección de destino
        targetElement.parentNode.insertBefore(msg, targetElement);

        // Ocultar automáticamente después de `duration` ms
        if (duration > 0) {
            setTimeout(() => {
                msg.remove();
            }, duration);
        }
    }


    // ========================================
    // 1. Smooth Scroll
    // ========================================
    const navLinks = document.querySelectorAll('.nav-menu a, .logo a, .footer-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Obtener el destino de la navegación
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                
                // Función nativa para desplazamiento suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Restar la altura del header fijo (80px)
                    behavior: 'smooth'
                });

                // Si el menú está abierto en móvil, cerrarlo después del click
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // ========================================
    // 2. Menú Hamburguesa (Mobile Navigation)
    // ========================================
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');

            // Actualizar aria-expanded
            hamburger.setAttribute('aria-expanded', isExpanded);
            hamburger.setAttribute('aria-label', isExpanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');

            // Cambiar SVG de barras a X
            const svg = hamburger.querySelector('svg');
            if (svg) {
                if (isExpanded) {
                    // Cambiar a X
                    svg.innerHTML = '<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>';
                } else {
                    // Cambiar a barras
                    svg.innerHTML = '<path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>';
                }
            }
        });
    }


    // ========================================
    // 3. Filtro de Galería
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // 1. Manejar el estado 'active' de los botones y aria-pressed
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            // 2. Obtener el filtro (ej: 'reparacion', 'tuning', 'all')
            const filterValue = this.getAttribute('data-filter');

            // 3. Animar los elementos de la galería
            galleryItems.forEach(item => {
                const shouldShow = filterValue === 'all' || item.classList.contains(filterValue);
                
                if (shouldShow) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.4s ease';
                } else {
                    item.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ========================================
    // 5. Validación Básica de Formulario (Contacto General)
    // ========================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Evita el envío por defecto (que recargaría la página)
            e.preventDefault();

            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            // Validar campos obligatorios
            if (!nombre || !email || !telefono || !servicio || !mensaje) {
                showFormMessage('⚠️ Por favor, rellena todos los campos obligatorios (*).', 'error', 6000, 'contact-form');
                return;
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('❌ Por favor, introduce un email válido.', 'error', 6000, 'contact-form');
                return;
            }

            // Validar teléfono (mínimo 9 dígitos)
            const telefonoRegex = /^\d{9,}$/;
            if (!telefonoRegex.test(telefono.replace(/\s/g, ''))) {
                showFormMessage('❌ El teléfono debe contener al menos 9 dígitos.', 'error', 6000, 'contact-form');
                return;
            }

            // Validación exitosa: preparar datos
            const datosFormulario = {
                nombre: nombre,
                email: email,
                telefono: telefono,
                servicio: servicio || 'General',
                mensaje: mensaje,
                fecha: new Date().toLocaleString('es-ES')
            };

            // Registrar en consola (simulación de envío)
            console.log('✓ Formulario válido enviado:', datosFormulario);

            // Mostrar mensaje de éxito
            showFormMessage('✅ ¡Tu solicitud ha sido enviada con éxito! Nos pondremos en contacto contigo pronto en el teléfono ' + telefono + '.', 'success', 8000, 'contact-form');
            
            // Limpiar formulario y scroll a top
            contactForm.reset();
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 500);
        });
    }

    // ========================================
    // 6. Autocompletado de Formulario (Solicitud de Coche)
    // ========================================
    const carContactForm = document.getElementById('car-contact-form');
    const carSelect = document.getElementById('coche-interes');
    const carButtons = document.querySelectorAll('.cars-grid .primary-cta'); // Selecciona los botones de las tarjetas

    if (carContactForm && carSelect && carButtons.length > 0) {
        
        carButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                
                // 1. Obtener el título del coche de la tarjeta
                const carCard = this.closest('.car-card');
                const carTitleElement = carCard ? carCard.querySelector('h3') : null;
                const carPriceElement = carCard ? carCard.querySelector('p:nth-of-type(2)') : null;
                
                if (carTitleElement && carPriceElement) {
                    const fullCarName = carTitleElement.textContent.trim() + ' - ' + carPriceElement.textContent.replace('Precio:', '').trim();
                    
                    // 2. Intentar seleccionar el valor en el campo <select>
                    let found = false;
                    for (let i = 0; i < carSelect.options.length; i++) {
                        // Buscar la opción cuyo texto coincide con el título completo del coche
                        if (carSelect.options[i].text.trim() === fullCarName) {
                            carSelect.value = carSelect.options[i].value;
                            found = true;
                            break;
                        }
                    }

                    if (found) {
                        console.log(`✓ Formulario autocompletado con: ${carSelect.value}`);
                    } else {
                        console.warn(`! No se encontró una opción coincidente para ${fullCarName}`);
                    }
                }
            });
        });
        
        // Manejador de envío para el formulario de solicitud de coche
        carContactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validar campos
            const coche = document.getElementById('coche-interes').value;
            const nombre = document.getElementById('nombre-coche').value.trim();
            const email = document.getElementById('email-coche').value.trim();
            const telefono = document.getElementById('telefono-coche').value.trim();
            const mensaje = document.getElementById('mensaje-coche').value.trim();

            if (!coche || !nombre || !email || !telefono || !mensaje) {
                showFormMessage('⚠️ Por favor, selecciona un coche y rellena todos los campos (*).', 'error', 6000, 'solicitud-coche');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('❌ Por favor, introduce un email válido.', 'error', 6000, 'solicitud-coche');
                return;
            }

            console.log('✓ Solicitud de coche enviada:', {coche, nombre, email, telefono, mensaje});
            
            showFormMessage('✅ ¡Solicitud recibida! Te contactaremos pronto para confirmar tu prueba de conducción o presupuesto.', 'success', 8000, 'solicitud-coche');

            carContactForm.reset();
        });
    }

    // ========================================
    // 10. Toggle Formulario de Venta de Coche
    // ========================================
    const btnIniciarVenta = document.getElementById('btn-iniciar-venta');
    const sellCarFormSection = document.getElementById('vender-coche-form'); // La sección contenedora

    if (btnIniciarVenta && sellCarFormSection) {
        btnIniciarVenta.addEventListener('click', function(e) {
            e.preventDefault(); 
            e.stopPropagation();

            if (sellCarFormSection.style.display === 'none' || sellCarFormSection.style.display === '') {
                // Muestra el formulario
                sellCarFormSection.style.display = 'block';
                this.innerHTML = '▲ Ocultar formulario de venta';
                // Desplazamiento suave
                sellCarFormSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // Oculta el formulario
                sellCarFormSection.style.display = 'none';
                this.innerHTML = '<i class="fa-solid fa-tags" aria-hidden="true"></i> Quiero vender mi coche';
            }
        });
    }

    // =========================================
    // 10. Comprobación y Simulación de Envío formulario venta de coche (MODIFICADO)
    // =========================================
    const sellCarFormElement = document.getElementById('vender-coche-form').querySelector('form');

    if (sellCarFormElement) {
        sellCarFormElement.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener valores del formulario
            const modelo = document.getElementById('car-model').value.trim();
            const matricula = document.getElementById('car-plate').value.trim();
            const kilometraje = document.getElementById('car-km').value.trim();
            const combustible = document.getElementById('car-fuel').value;
            const precio = document.getElementById('selling-price').value.trim();
            const nombre = document.getElementById('seller-name').value.trim();
            const telefono = document.getElementById('seller-phone').value.trim();
            const email = document.getElementById('seller-email').value.trim();

            // Validar campos obligatorios
            if (!modelo || !matricula || !kilometraje || !combustible || !precio || !nombre || !telefono || !email) {
                showFormMessage('⚠️ Por favor, rellena todos los campos obligatorios (*).', 'error', 6000, 'vender-coche-form');
                return;
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('❌ Por favor, introduce un email válido.', 'error', 6000, 'vender-coche-form');
                return;
            }

            // Validar teléfono (mínimo 9 dígitos)
            const telefonoRegex = /^\d{9,}$/;
            if (!telefonoRegex.test(telefono.replace(/\s/g, ''))) {
                showFormMessage('❌ El teléfono debe contener al menos 9 dígitos.', 'error', 6000, 'vender-coche-form');
                return;
            }

            // Validación exitosa: preparar datos
            const datosVenta = {
                modelo: modelo,
                matricula: matricula,
                kilometraje: kilometraje,
                combustible: combustible,
                precio: precio,
                nombre: nombre,
                telefono: telefono,
                email: email,
                fecha: new Date().toLocaleString('es-ES')
            };

            // Registrar en consola (simulación de envío)
            console.log('✓ Formulario de venta válido enviado:', datosVenta);

            // Mostrar mensaje de éxito (Usando showFormMessage en lugar de alert)
            showFormMessage('✅ ¡Tu solicitud de venta ha sido enviada con éxito! Nos pondremos en contacto contigo pronto en el teléfono ' + telefono + '.', 'success', 8000, 'vender-coche-form');

            // Limpiar formulario 
            sellCarFormElement.reset();
            
            // Opcional: Ocultar el formulario después de un envío exitoso
            setTimeout(() => {
                const sellCarFormElement = document.getElementById('vender-coche-form');
                sellCarFormElement.style.display = 'none';
                if (btnIniciarVenta) {
                    btnIniciarVenta.innerHTML = '<i class="fa-solid fa-tags" aria-hidden="true"></i> Quiero vender mi coche';
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1000);
        });
    }

    // =========================================
    // 7. Cookie Consent Management (RGPD)
    // =========================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const consentKey = 'tecoche_cookie_consent';

    // 1. Mostrar el banner si no hay consentimiento guardado
    if (cookieBanner && !localStorage.getItem(consentKey)) {
        // Retraso para que el usuario pueda ver la página antes de que aparezca
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000); 
    }

    // 2. Manejar el clic de Aceptar
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            // Guardar la preferencia en localStorage
            localStorage.setItem(consentKey, 'accepted');

            // Ocultar el banner
            if (cookieBanner) {
                cookieBanner.classList.remove('show');
            }
        });
    }

    // ========================================
    // Botón Volver Arriba (Back to Top)
    // ========================================
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        const showAfter = 200; // mostrar tras 200px de scroll

        // Controlar visibilidad al hacer scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > showAfter) {
                backToTopBtn.classList.add('show');
                backToTopBtn.setAttribute('aria-hidden', 'false');
            } else {
                backToTopBtn.classList.remove('show');
                backToTopBtn.setAttribute('aria-hidden', 'true');
            }
        });

        // Click para volver arriba
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Soporta teclado (Enter / Space)
        backToTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

});