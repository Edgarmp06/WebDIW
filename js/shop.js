import { getAll } from './firestore.js';

async function loadShop() {
    const container = document.querySelector('.cars-grid');
    if (!container) return;

    container.innerHTML = '<p style="text-align:center; width:100%;">Cargando vehículos...</p>';

    try {
        const cars = await getAll('coches');

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
                    VENDIDO
                </div>
            ` : '';

            // Opacity for sold items
            const imageStyle = isSold ? 'opacity: 0.6; filter: grayscale(80%);' : '';

            card.innerHTML = `
                ${soldBadge}
                <div style="position: relative;">
                    <img src="${car.fotoURL || 'images/default-car.jpg'}" alt="${car.marca} ${car.modelo}" style="width:100%;height:180px;object-fit:cover;border-radius:8px; ${imageStyle}">
                </div>
                <h3 style="margin:12px 0 6px 0;color:var(--color-primary);">${car.marca} ${car.modelo}</h3>
                <p style="margin:0 0 8px 0;color:#555;">${car.km} km — <span style="font-weight:bold; color:${isSold ? '#e74c3c' : '#2ecc71'}">${car.estado}</span></p>
                <p style="font-weight:700;color:#222;margin-bottom:10px;">Precio: ${car.precio} €</p>
                
                <div class="cta-row" style="margin-top:auto; display:flex; gap:10px; justify-content:center;">
                    ${isSold ?
                    `<button disabled class="cta-button secondary-cta" style="padding: 8px 12px; font-size: 0.9em; background: #ccc; cursor: not-allowed; border-color: #bbb; color: #666;">No Disponible</button>`
                    :
                    `<a href="#solicitud-coche" class="cta-button primary-cta" style="padding: 8px 12px; font-size: 0.9em;">Contactar</a>
                         <a href="tel:679426134" class="cta-button secondary-cta" style="padding: 8px 12px; font-size: 0.9em;">Llamar</a>`
                }
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading shop:", error);
        container.innerHTML = '<p style="text-align:center; width:100%;">Error al cargar los vehículos. Por favor, inténtelo de nuevo más tarde.</p>';
    }
}

// Load on DOM ready
document.addEventListener('DOMContentLoaded', loadShop);
