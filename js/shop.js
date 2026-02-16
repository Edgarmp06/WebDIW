import { getAll } from './firestore.js';

let availableCars = []; // Store cars globally to populate select

async function loadShop() {
    const container = document.querySelector('.cars-grid');
    if (!container) return;

    container.innerHTML = '<p style="text-align:center; width:100%;">Cargando vehículos...</p>';

    try {
        const cars = await getAll('coches');
        availableCars = cars.filter(c => !c.estado || c.estado.toLowerCase() !== 'vendido');

        // Populate the select dropdown with available cars
        populateCarSelect(availableCars);

        if (cars.length === 0) {
            container.innerHTML = '<p style="text-align:center; width:100%;">No hay vehículos disponibles en este momento.</p>';
            return;
        }

        container.innerHTML = '';
        cars.forEach(car => {
            const card = document.createElement('article');
            card.className = 'car-card';
            card.style.cssText = 'display:flex; flex-direction:column; background:white; padding:20px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1); position: relative; overflow: hidden;';

            const isSold = car.estado && car.estado.toLowerCase() === 'vendido';
            const soldBadge = isSold ? `
                <div style="position: absolute; top: 20px; right: -30px; background: #e74c3c; color: white; padding: 5px 40px; transform: rotate(45deg); font-weight: bold; font-size: 0.9em; z-index: 10; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                    Vendido
                </div>
            ` : '';

            // Opacity for sold items
            const imageStyle = isSold ? 'opacity: 0.6; filter: grayscale(80%);' : '';
            const carName = `${car.marca} ${car.modelo}`;

            // Create Contact Button with data attribute for auto-select
            const contactBtn = `<a href="#solicitud-coche" class="cta-button primary-cta contact-car-btn" data-car="${carName} - ${car.precio} €" style="padding: 8px 12px; font-size: 0.9em;">Contactar</a>`;

            card.innerHTML = `
                ${soldBadge}
                <div style="position: relative; height: 180px; width: 100%; display: flex; align-items: center; justify-content: center; background: #ffffff; border-radius: 8px; overflow: hidden; padding: 5px;">
                    <img src="${car.fotoURL || 'images/default-car.jpg'}" alt="${carName}" style="width:100%;height:100%;object-fit:contain;transition: transform 0.3s ease; ${imageStyle}" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                </div>
                <h3 style="margin:12px 0 6px 0;color:var(--color-primary);">${carName}</h3>
                <p style="margin:0 0 8px 0;color:#555;">${car.km} km — <span style="font-weight:bold; color:${isSold ? '#e74c3c' : '#2ecc71'}">${car.estado}</span></p>
                <p style="font-weight:700;color:#222;margin-bottom:10px;">Precio: ${car.precio} €</p>
                
                <div class="cta-row" style="margin-top:auto; display:flex; gap:10px; justify-content:center;">
                    ${isSold ?
                    `<button disabled class="cta-button secondary-cta" style="padding: 8px 12px; font-size: 0.9em; background: #ccc; cursor: not-allowed; border-color: #bbb; color: #666;">No disponible</button>`
                    :
                    `${contactBtn}
                         <a href="tel:679426134" class="cta-button secondary-cta" style="padding: 8px 12px; font-size: 0.9em;">Llamar</a>`
                }
                </div>
            `;
            container.appendChild(card);
        });

        // Add event listeners to new buttons
        document.querySelectorAll('.contact-car-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                // Allow default anchor scroll behavior
                const carValue = this.getAttribute('data-car');
                const selectElement = document.getElementById('coche-interes');
                if (selectElement) {
                    selectElement.value = carValue;
                    // Visual feedback on the select
                    selectElement.style.borderColor = '#e67e22';
                    selectElement.style.boxShadow = '0 0 10px rgba(230, 126, 34, 0.5)';
                    setTimeout(() => {
                        selectElement.style.borderColor = '';
                        selectElement.style.boxShadow = '';
                    }, 2000);
                }
            });
        });

    } catch (error) {
        console.error("Error loading shop:", error);
        container.innerHTML = '<p style="text-align:center; width:100%;">Error al cargar los vehículos. Por favor, inténtelo de nuevo más tarde.</p>';
    }
}

function populateCarSelect(cars) {
    const select = document.getElementById('coche-interes');
    if (!select) return;

    // Keep the first default option
    select.innerHTML = '<option value="">Selecciona el vehículo</option>';

    cars.forEach(car => {
        const option = document.createElement('option');
        const value = `${car.marca} ${car.modelo} - ${car.precio} €`;
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });
}

// Load on DOM ready
document.addEventListener('DOMContentLoaded', loadShop);
