import { getAll, add, remove, update, getOne } from './firestore.js';
import { monitorAuthState } from './auth.js';

let currentEditId = null;
let currentType = 'coches'; // 'coches' or 'productos'

// Auth Check
monitorAuthState((user, role) => {
    if (!user || role !== 'admin') {
        alert('Acceso denegado. Solo administradores.');
        window.location.href = 'index.html';
    } else {
        document.getElementById('admin-content').style.display = 'block';
        loadData('coches');
    }
});

// DOM Elements
const modal = document.getElementById('item-modal');
const modalTitle = document.getElementById('modal-title');
const itemForm = document.getElementById('item-form');
const closeModal = document.querySelector('.close-modal');

// Tab Switching
// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Gestionar estado visual de los botones
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 2. Obtener el tipo seleccionado (coches, productos, usuarios)
        currentType = btn.dataset.tab;

        // 3. Ocultar TODAS las secciones
        document.querySelectorAll('.admin-section').forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });

        // 4. Mostrar la sección correspondiente al botón pulsado
        const activeSection = document.getElementById(`${currentType}-section`);
        if (activeSection) {
            activeSection.style.display = 'block';
            activeSection.classList.add('active');
        }

        // 5. Cargar datos y formularios
        updateFormFields(currentType);
        loadData(currentType);
    });
});

function updateFormFields(type) {
    const fieldsContainer = document.getElementById('dynamic-fields');
    fieldsContainer.innerHTML = ''; // Clear existing

    if (type === 'coches') {
        fieldsContainer.innerHTML = `
            <div class="form-group">
                <label>Marca</label>
                <input type="text" name="marca" required>
            </div>
            <div class="form-group">
                <label>Modelo</label>
                <input type="text" name="modelo" required>
            </div>
            <div class="form-group">
                <label>Precio (€)</label>
                <input type="number" name="precio" step="0.01" required>
            </div>
            <div class="form-group">
                <label>KM</label>
                <input type="number" name="km" required>
            </div>
            <div class="form-group">
                <label>Estado</label>
                <select name="estado">
                    <option value="Disponible">Disponible</option>
                    <option value="Vendido">Vendido</option>
                </select>
            </div>
            <div class="form-group">
                <label>Foto URL</label>
                <input type="url" name="fotoURL" placeholder="https://...">
            </div>
        `;
    } else if (type === 'productos') {
        fieldsContainer.innerHTML = `
            <div class="form-group">
                <label>Nombre Producto</label>
                <input type="text" name="nombre" required>
            </div>
             <div class="form-group">
                <label>Categoría</label>
                <select name="categoria">
                    <option value="Repuestos">Repuestos</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Limpieza">Limpieza</option>
                </select>
            </div>
            <div class="form-group">
                <label>Precio (€)</label>
                <input type="number" name="precio" step="0.01" required>
            </div>
            <div class="form-group">
                <label>Stock</label>
                <input type="number" name="stock" required>
            </div>
            <div class="form-group">
                <label>Imagen URL</label>
                <input type="url" name="imagenURL" placeholder="https://...">
            </div>
        `;
    }
}

// Load Data
async function loadData(collectionName) {
    const tableBody = document.querySelector(`#${collectionName}-table tbody`);
    if (!tableBody) return;

    tableBody.innerHTML = '<tr><td colspan="5">Cargando...</td></tr>';

    try {
        const data = await getAll(collectionName);
        renderTable(data, collectionName, tableBody);
    } catch (error) {
        console.error("Error loading data:", error);
        tableBody.innerHTML = '<tr><td colspan="5">Error al cargar datos.</td></tr>';
    }
}

function renderTable(data, type, tbody) {
    tbody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        if (type === 'coches') {
            row.innerHTML = `
                <td>${item.marca} ${item.modelo}</td>
                <td>${item.precio}€</td>
                <td>${item.estado}</td>
                <td>
                    <button class="action-btn btn-edit" data-id="${item.id}">Editar</button>
                    <button class="action-btn btn-delete" data-id="${item.id}">Borrar</button>
                </td>
            `;
        } else if (type === 'productos') {
            row.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.categoria}</td>
                <td>${item.precio}€</td>
                <td>${item.stock}</td>
                <td>
                    <button class="action-btn btn-edit" data-id="${item.id}">Editar</button>
                    <button class="action-btn btn-delete" data-id="${item.id}">Borrar</button>
                </td>
            `;
        } else if (type === 'usuarios') {
            row.innerHTML = `
                <td>${item.nombre || 'Sin nombre'}</td>
                <td>${item.email}</td>
                <td><span style="padding: 2px 6px; border-radius: 4px; background: ${item.rol === 'admin' ? '#e74c3c' : '#2ecc71'}; color: white;">${item.rol}</span></td>
                <td>
                    <!-- No delete for users yet, maybe role toggle in future -->
                    <span style="color: #999;">-</span>
                </td>
            `;
        }
        tbody.appendChild(row);
    });

    // Attach Event Listeners
    if (type !== 'usuarios') {
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => handleDelete(e.target.dataset.id));
        });
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => handleEdit(e.target.dataset.id));
        });
    }
}

// Actions
async function handleDelete(id) {
    if (confirm('¿Seguro que quieres borrar este elemento?')) {
        await remove(currentType, id);
        loadData(currentType);
    }
}

async function handleEdit(id) {
    currentEditId = id;
    const item = await getOne(currentType, id);
    if (!item) return;

    modalTitle.textContent = 'Editar Elemento';
    modal.style.display = 'block';

    // Populate fields
    const inputs = itemForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        if (item[input.name]) input.value = item[input.name];
    });
}

// Modal handling
document.getElementById('add-btn').addEventListener('click', () => {
    if (currentType === 'usuarios') {
        alert("Para añadir usuarios, usa el registro normal.");
        return;
    }
    currentEditId = null;
    itemForm.reset();
    modalTitle.textContent = 'Añadir Nuevo';
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => modal.style.display = 'none');
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
};

// Form Submit
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(itemForm);
    const data = Object.fromEntries(formData.entries());

    try {
        if (currentEditId) {
            await update(currentType, currentEditId, data);
        } else {
            await add(currentType, data);
        }
        modal.style.display = 'none';
        loadData(currentType);
    } catch (error) {
        alert('Error al guardar: ' + error.message);
    }
});

// Initial Load
updateFormFields('coches'); // Start with coches fields

// --- Seed Sample Products ---
const seedBtn = document.getElementById('seed-products-btn');
if (seedBtn) {
    seedBtn.addEventListener('click', async () => {
        if (!confirm('¿Seguro que quieres añadir productos de ejemplo a la base de datos?')) return;

        const originalContent = seedBtn.innerHTML;
        seedBtn.disabled = true;
        seedBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Cargando...';

        const products = [
            { nombre: "Aceite Castrol EDGE 5W-30", precio: 45.99, stock: 50, categoria: "Mantenimiento", imagenURL: "https://m.media-amazon.com/images/I/71p%2B7%2B2%2B1%2BL._AC_SL1500_.jpg" },
            { nombre: "Aceite Repsol Elite TDI 5W-40", precio: 32.50, stock: 40, categoria: "Mantenimiento", imagenURL: "https://m.media-amazon.com/images/I/81wQkLg4eEL._AC_SL1500_.jpg" },
            { nombre: "Filtro de Aceite Mann W712/95", precio: 12.99, stock: 100, categoria: "Repuestos", imagenURL: "https://m.media-amazon.com/images/I/71P2d5T5-GL._AC_SL1500_.jpg" },
            { nombre: "Filtro de Aire Bosch F026400004", precio: 15.50, stock: 80, categoria: "Repuestos", imagenURL: "https://m.media-amazon.com/images/I/71y0y7X-3XL._AC_SL1500_.jpg" },
            { nombre: "Juego Bujías NGK Laser Platinum", precio: 24.95, stock: 30, categoria: "Repuestos", imagenURL: "https://m.media-amazon.com/images/I/61b7b7v+XWL._AC_SL1000_.jpg" },
            { nombre: "Limpiador Meguiar's Ultimate Wash & Wax", precio: 18.99, stock: 25, categoria: "Limpieza", imagenURL: "https://m.media-amazon.com/images/I/71h6l4k+oPL._AC_SL1500_.jpg" },
            { nombre: "Cera Turtle Wax Super Hard Shell", precio: 14.50, stock: 40, categoria: "Limpieza", imagenURL: "https://m.media-amazon.com/images/I/71X8k+G+eML._AC_SL1500_.jpg" },
            { nombre: "Ambientador Arbre Magique Pino", precio: 2.50, stock: 200, categoria: "Accesorios", imagenURL: "https://m.media-amazon.com/images/I/81r+7+T+1+L._AC_SL1500_.jpg" },
            { nombre: "Alfombrillas Goma Michelin (Universal)", precio: 39.99, stock: 15, categoria: "Accesorios", imagenURL: "https://m.media-amazon.com/images/I/81g+M+M+L._AC_SL1500_.jpg" },
            { nombre: "Líquido Frenos Brembo DOT 4 500ml", precio: 9.99, stock: 60, categoria: "Mantenimiento", imagenURL: "https://m.media-amazon.com/images/I/61+D+M+M+L._AC_SL1500_.jpg" },
            { nombre: "Batería Varta E11 Blue Dynamic 74Ah", precio: 85.00, stock: 10, categoria: "Repuestos", imagenURL: "https://m.media-amazon.com/images/I/71+X+M+M+L._AC_SL1500_.jpg" },
            { nombre: "Escobillas Limpiaparabrisas Bosch Aerotwin", precio: 28.99, stock: 35, categoria: "Repuestos", imagenURL: "https://m.media-amazon.com/images/I/71+X+M+M+L._AC_SL1500_.jpg" },
            { nombre: "Aditivo Liqui Moly Ceratec", precio: 19.95, stock: 20, categoria: "Mantenimiento", imagenURL: "https://m.media-amazon.com/images/I/71+X+M+M+L._AC_SL1500_.jpg" },
            { nombre: "Kit Restauración Faros 3M", precio: 22.99, stock: 12, categoria: "Limpieza", imagenURL: "https://m.media-amazon.com/images/I/71+X+M+M+L._AC_SL1500_.jpg" },
            { nombre: "Soporte Móvil Ugreen Gravitacional", precio: 15.99, stock: 45, categoria: "Accesorios", imagenURL: "https://m.media-amazon.com/images/I/71+X+M+M+L._AC_SL1500_.jpg" },
            { nombre: "Dash Cam Xiaomi 70mai A500S 2.7K", precio: 69.99, stock: 8, categoria: "Accesorios", imagenURL: "https://m.media-amazon.com/images/I/71+X+M+M+L._AC_SL1500_.jpg" },
            { nombre: "Aspirador Coche Potente 12V", precio: 29.99, stock: 25, categoria: "Limpieza", imagenURL: "https://m.media-amazon.com/images/I/71+X+M+M+L._AC_SL1500_.jpg" },
            { nombre: "Compresor Aire Portátil Michelin", precio: 49.95, stock: 10, categoria: "Accesorios", imagenURL: "https://m.media-amazon.com/images/I/71+X+M+M+L._AC_SL1500_.jpg" },
            { nombre: "Juego Luces LED H7 Philips Ultinon", precio: 55.00, stock: 15, categoria: "Repuestos", imagenURL: "https://m.media-amazon.com/images/I/71+X+M+M+L._AC_SL1500_.jpg" },
            { nombre: "Anticongelante Orgánico 50% Rosa 5L", precio: 11.50, stock: 100, categoria: "Mantenimiento", imagenURL: "https://m.media-amazon.com/images/I/71+X+M+M+L._AC_SL1500_.jpg" }
        ];

        try {
            let count = 0;
            for (const p of products) {
                await add('productos', p);
                count++;
            }
            alert(`¡Éxito! Se han añadido ${count} productos nuevos.`);

            // Refresh if currently on products tab
            const productsBtn = document.querySelector('.tab-btn[data-tab="productos"]');
            if (productsBtn) {
                productsBtn.click();
            }
        } catch (e) {
            console.error(e);
            alert('Error al cargar productos: ' + e.message);
        } finally {
            seedBtn.disabled = false;
            seedBtn.innerHTML = originalContent;
        }
    });
}
