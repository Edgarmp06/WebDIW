document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // FUNCIÓN DE UTILIDAD: mostrar mensajes inline
    // ========================================
    function showFormMessage(text, type = 'success', duration = 5000, targetFormId) {
        const targetElement = document.getElementById(targetFormId);
        if (!targetElement) return;
        
        const prev = targetElement.parentNode.querySelector('.form-message');
        if (prev) prev.remove();

        const msg = document.createElement('div');
        msg.className = 'form-message ' + (type === 'error' ? 'error' : 'success');
        msg.textContent = text;
        
        targetElement.parentNode.insertBefore(msg, targetElement);

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
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // ========================================
    // 2. Menú Hamburguesa
    // ========================================
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');

            hamburger.setAttribute('aria-expanded', isExpanded);
            hamburger.setAttribute('aria-label', isExpanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');

            const svg = hamburger.querySelector('svg');
            if (svg) {
                if (isExpanded) {
                    svg.innerHTML = '<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>';
                } else {
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

            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            const filterValue = this.getAttribute('data-filter');

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
    // 4. Validación Formulario Contacto General
    // ========================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            if (!nombre || !email || !telefono || !servicio || !mensaje) {
                showFormMessage('⚠️ Por favor, rellena todos los campos obligatorios (*).', 'error', 6000, 'contact-form');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('❌ Por favor, introduce un email válido.', 'error', 6000, 'contact-form');
                return;
            }

            const telefonoRegex = /^\d{9,}$/;
            if (!telefonoRegex.test(telefono.replace(/\s/g, ''))) {
                showFormMessage('❌ El teléfono debe contener al menos 9 dígitos.', 'error', 6000, 'contact-form');
                return;
            }

            const datosFormulario = {
                nombre: nombre,
                email: email,
                telefono: telefono,
                servicio: servicio || 'General',
                mensaje: mensaje,
                fecha: new Date().toLocaleString('es-ES')
            };

            console.log('✓ Formulario válido enviado:', datosFormulario);

            showFormMessage('✅ ¡Tu solicitud ha sido enviada con éxito! Nos pondremos en contacto contigo pronto en el teléfono ' + telefono + '.', 'success', 8000, 'contact-form');
            
            contactForm.reset();
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 500);
        });
    }

    // ========================================
    // 5. Autocompletado Formulario Solicitud Coche
    // ========================================
    const carContactForm = document.getElementById('car-contact-form');
    const carSelect = document.getElementById('coche-interes');
    const carButtons = document.querySelectorAll('.cars-grid .primary-cta');

    if (carContactForm && carSelect && carButtons.length > 0) {
        
        carButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const carCard = this.closest('.car-card');
                const carTitleElement = carCard ? carCard.querySelector('h3') : null;
                const carPriceElement = carCard ? carCard.querySelector('p:nth-of-type(2)') : null;
                
                if (carTitleElement && carPriceElement) {
                    const fullCarName = carTitleElement.textContent.trim() + ' - ' + carPriceElement.textContent.replace('Precio:', '').trim();
                    
                    let found = false;
                    for (let i = 0; i < carSelect.options.length; i++) {
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
        
        carContactForm.addEventListener('submit', function(e) {
            e.preventDefault();

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
    // 6. Toggle Formulario de Venta de Coche (CORREGIDO)
    // ========================================
    const btnIniciarVenta = document.getElementById('btn-iniciar-venta');
    const sellCarFormSection = document.getElementById('vender-coche-form');

    if (btnIniciarVenta && sellCarFormSection) {
        btnIniciarVenta.addEventListener('click', function(e) {
            e.preventDefault(); 
            e.stopPropagation();

            // Toggle de visibilidad
            if (sellCarFormSection.classList.contains('form-hidden')) {
                // Mostrar formulario
                sellCarFormSection.classList.remove('form-hidden');
                this.innerHTML = '▲ Ocultar formulario de venta';
                
                // Desplazamiento suave al formulario
                setTimeout(() => {
                    sellCarFormSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                // Ocultar formulario
                sellCarFormSection.classList.add('form-hidden');
                this.innerHTML = '<i class="fa-solid fa-tags" aria-hidden="true"></i> Quiero vender mi coche';
            }
        });
    }

    // ========================================
    // 7. Validación Formulario Venta de Coche (CORREGIDO)
    // ========================================
    const sellCarForm = document.querySelector('#vender-coche-form form');

    if (sellCarForm) {
        sellCarForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const modelo = document.getElementById('car-model').value.trim();
            const matricula = document.getElementById('car-plate').value.trim();
            const kilometraje = document.getElementById('car-km').value.trim();
            const combustible = document.getElementById('car-fuel').value;
            const precio = document.getElementById('selling-price').value.trim();
            const nombre = document.getElementById('seller-name').value.trim();
            const telefono = document.getElementById('seller-phone').value.trim();
            const email = document.getElementById('seller-email').value.trim();

            if (!modelo || !matricula || !kilometraje || !combustible || !precio || !nombre || !telefono || !email) {
                showFormMessage('⚠️ Por favor, rellena todos los campos obligatorios (*).', 'error', 6000, 'vender-coche-form');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('❌ Por favor, introduce un email válido.', 'error', 6000, 'vender-coche-form');
                return;
            }

            const telefonoRegex = /^\d{9,}$/;
            if (!telefonoRegex.test(telefono.replace(/\s/g, ''))) {
                showFormMessage('❌ El teléfono debe contener al menos 9 dígitos.', 'error', 6000, 'vender-coche-form');
                return;
            }

            const datosVenta = {
                modelo, matricula, kilometraje, combustible, precio, nombre, telefono, email,
                fecha: new Date().toLocaleString('es-ES')
            };

            console.log('✓ Formulario de venta válido enviado:', datosVenta);

            showFormMessage('✅ ¡Tu solicitud de venta ha sido enviada con éxito! Nos pondremos en contacto contigo pronto en el teléfono ' + telefono + '.', 'success', 8000, 'vender-coche-form');

            sellCarForm.reset();
            
            setTimeout(() => {
                if (sellCarFormSection) {
                    sellCarFormSection.classList.add('form-hidden');
                }
                if (btnIniciarVenta) {
                    btnIniciarVenta.innerHTML = '<i class="fa-solid fa-tags" aria-hidden="true"></i> Quiero vender mi coche';
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2000);
        });
    }

    // ========================================
    // 8. Cookie Consent Management
    // ========================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const consentKey = 'tecoche_cookie_consent';

    if (cookieBanner && !localStorage.getItem(consentKey)) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000); 
    }

    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem(consentKey, 'accepted');
            if (cookieBanner) {
                cookieBanner.classList.remove('show');
            }
        });
    }

    // ========================================
    // 9. Botón Volver Arriba
    // ========================================
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        const showAfter = 200;

        window.addEventListener('scroll', () => {
            if (window.scrollY > showAfter) {
                backToTopBtn.classList.add('show');
                backToTopBtn.setAttribute('aria-hidden', 'false');
            } else {
                backToTopBtn.classList.remove('show');
                backToTopBtn.setAttribute('aria-hidden', 'true');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        backToTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

});
