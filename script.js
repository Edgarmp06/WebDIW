document.addEventListener('DOMContentLoaded', function () {
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
    const navLinks = document.querySelectorAll('.nav-menu a, .logo a, .footer-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                // Scrolea suavemente compensando los 80px del header fijo para que no tape el contenido
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
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            const filterValue = this.getAttribute('data-filter');
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
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const serviceSelect = document.getElementById('servicio');
    // Auto-selecciona el servicio en el dropdown si viene especificado en la URL (ej: ?service=tuning)
    if (serviceParam && serviceSelect) {
        const options = Array.from(serviceSelect.options).map(opt => opt.value);
        if (options.includes(serviceParam)) {
            serviceSelect.value = serviceParam;
        }
    }
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const nombre = formData.get('nombre');
            const email = formData.get('email');
            const telefono = formData.get('telefono');
            const servicio = formData.get('servicio');
            const mensaje = formData.get('mensaje');
            if (!nombre || !email || !telefono || !servicio || !mensaje) {
                showFormMessage('❌ Por favor, completa todos los campos requeridos.', 'error', 5000, 'contact-form');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('❌ Por favor, introduce un email válido.', 'error', 5000, 'contact-form');
                return;
            }
            const telefonoRegex = /^\d{9,}$/;
            if (!telefonoRegex.test(telefono.replace(/\s/g, ''))) {
                showFormMessage('❌ Por favor, introduce un teléfono válido (mínimo 9 dígitos).', 'error', 5000, 'contact-form');
                return;
            }
            // Configuración específica para FormSubmit.co (sin captcha, plantilla de tabla y asunto personalizado)
            formData.append("_subject", "Nuevo mensaje de contacto - Tecoche");
            formData.append("_template", "table");
            formData.append("_captcha", "false");
            fetch("https://formsubmit.co/ajax/admtecoche@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })
                .then(response => response.json())
                .then(data => {
                    showFormMessage('✅ ¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success', 5000, 'contact-form');
                    setTimeout(() => {
                        contactForm.reset();
                    }, 1000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    showFormMessage('❌ Error al enviar el mensaje. Inténtalo más tarde.', 'error', 5000, 'contact-form');
                });
        });
    }
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    if (cookieBanner) {
        // Verifica si ya se aceptaron cookies anteriormente usando localStorage
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        if (!cookiesAccepted) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }
    }
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 500);
        });
    }
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            // Muestra el botón solo si se ha scroleado más de 300px hacia abajo
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    const btnIniciarVenta = document.getElementById('btn-iniciar-venta');
    const formVenderCoche = document.getElementById('vender-coche-form');
    if (btnIniciarVenta && formVenderCoche) {
        btnIniciarVenta.addEventListener('click', function (e) {
            e.preventDefault();
            formVenderCoche.classList.remove('form-hidden');
            formVenderCoche.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    const sellCarForm = document.getElementById('sell-car-form');
    if (sellCarForm) {
        sellCarForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(sellCarForm);
            const modelo = formData.get('modelo');
            const matricula = formData.get('matricula');
            const kilometraje = formData.get('kilometraje');
            const combustible = formData.get('combustible');
            const precio = formData.get('precio');
            const nombre = formData.get('nombre');
            const telefono = formData.get('telefono');
            const email = formData.get('email');
            if (!modelo || !matricula || !kilometraje || !combustible || !precio || !nombre || !telefono || !email) {
                showFormMessage('❌ Por favor, completa todos los campos requeridos.', 'error', 5000, 'sell-car-form');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('❌ Por favor, introduce un email válido.', 'error', 5000, 'sell-car-form');
                return;
            }
            const telefonoRegex = /^\d{9,}$/;
            if (!telefonoRegex.test(telefono.replace(/\s/g, ''))) {
                showFormMessage('❌ Por favor, introduce un teléfono válido (mínimo 9 dígitos).', 'error', 5000, 'sell-car-form');
                return;
            }
            formData.append("_subject", "Nueva tasación de coche - Tecoche");
            formData.append("_template", "table");
            formData.append("_captcha", "false");
            fetch("https://formsubmit.co/ajax/admtecoche@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })
                .then(response => response.json())
                .then(data => {
                    showFormMessage('✅ ¡Solicitud enviada correctamente! Te contactaremos en 48 horas con la valoración.', 'success', 5000, 'sell-car-form');
                    setTimeout(() => {
                        sellCarForm.reset();
                    }, 1000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    showFormMessage('❌ Error al enviar la solicitud.', 'error', 5000, 'sell-car-form');
                });
        });
    }
    const carContactForm = document.getElementById('car-contact-form');
    if (carContactForm) {
        carContactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(carContactForm);
            const coche = formData.get('coche');
            const nombre = formData.get('nombre');
            const email = formData.get('email');
            const telefono = formData.get('telefono');
            const mensaje = formData.get('mensaje');
            if (!coche || !nombre || !email || !telefono || !mensaje) {
                showFormMessage('❌ Por favor, completa todos los campos requeridos.', 'error', 5000, 'car-contact-form');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('❌ Por favor, introduce un email válido.', 'error', 5000, 'car-contact-form');
                return;
            }
            const telefonoRegex = /^\d{9,}$/;
            if (!telefonoRegex.test(telefono.replace(/\s/g, ''))) {
                showFormMessage('❌ Por favor, introduce un teléfono válido (mínimo 9 dígitos).', 'error', 5000, 'car-contact-form');
                return;
            }
            formData.append("_subject", "Solicitud prueba/presupuesto coche - Tecoche");
            formData.append("_template", "table");
            formData.append("_captcha", "false");
            fetch("https://formsubmit.co/ajax/admtecoche@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })
                .then(response => response.json())
                .then(data => {
                    showFormMessage('✅ ¡Solicitud enviada! Nos pondremos en contacto contigo pronto para coordinar la prueba.', 'success', 5000, 'car-contact-form');
                    setTimeout(() => {
                        carContactForm.reset();
                    }, 1000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    showFormMessage('❌ Error al enviar la solicitud.', 'error', 5000, 'car-contact-form');
                });
        });
    }
    const accessibilityBar = document.createElement('div');
    accessibilityBar.className = 'accessibility-bar';
    accessibilityBar.setAttribute('role', 'toolbar');
    accessibilityBar.setAttribute('aria-label', 'Opciones de accesibilidad');
    accessibilityBar.innerHTML = `
        <button id="toggle-dark-mode" aria-label="Alternar modo oscuro" title="Modo oscuro/claro">
            <i class="fa-solid fa-moon"></i>
        </button>
        <button id="increase-font" aria-label="Aumentar tamaño de fuente" title="Aumentar fuente">
            <i class="fa-solid fa-font"></i>+
        </button>
    `;
    document.body.appendChild(accessibilityBar);
    const darkModeBtn = document.getElementById('toggle-dark-mode');
    if (localStorage.getItem('tecoche_darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('tecoche_darkMode', isDark);
        darkModeBtn.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    });
    // Lógica para aumentar el tamaño de fuente cíclicamente (Normal -> Grande -> Extra Grande -> Normal)
    const fontSizeBtn = document.getElementById('increase-font');
    const fontLevels = ['', 'font-large', 'font-xlarge'];
    let currentFontLevel = parseInt(localStorage.getItem('tecoche_fontSize') || '0');
    // Restaura el nivel de fuente guardado al cargar la página
    if (currentFontLevel > 0 && currentFontLevel < fontLevels.length) {
        document.body.classList.add(fontLevels[currentFontLevel]);
    }
    fontSizeBtn.addEventListener('click', () => {
        if (fontLevels[currentFontLevel]) {
            document.body.classList.remove(fontLevels[currentFontLevel]);
        }
        currentFontLevel = (currentFontLevel + 1) % fontLevels.length;
        if (fontLevels[currentFontLevel]) {
            document.body.classList.add(fontLevels[currentFontLevel]);
        }
        localStorage.setItem('tecoche_fontSize', currentFontLevel);
    });
});

