import { getAll, add, remove, update, getOne } from './firestore.js';
import { monitorAuthState } from './auth.js';
let currentEditId = null;
let currentType = 'coches'; 
monitorAuthState((user, role) => {
    if (!user || role !== 'admin') {
        window.location.href = 'index.html';
    } else {
        document.getElementById('admin-content').style.display = 'block';
        loadData('coches');
    }
});
const modal = document.getElementById('item-modal');
const modalTitle = document.getElementById('modal-title');
const itemForm = document.getElementById('item-form');
const closeModal = document.querySelector('.close-modal');
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentType = btn.dataset.tab;
        document.querySelectorAll('.admin-section').forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });
        const activeSection = document.getElementById(`${currentType}-section`);
        if (activeSection) {
            activeSection.style.display = 'block';
            activeSection.classList.add('active');
        }
        updateFormFields(currentType);
        loadData(currentType);
    });
});
function updateFormFields(type) {
    const fieldsContainer = document.getElementById('dynamic-fields');
    fieldsContainer.innerHTML = ''; 
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
                <label>Nombre del producto</label>
                <input type="text" name="nombre" required>
            </div>
             <div class="form-group">
                <label>Categoría</label>
                <select name="categoria">
                    <option value="Repuestos">Repuestos</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Limpieza">Limpieza</option>
                    <option value="Mantenimiento">Mantenimiento</option>
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
                <td><span class="role-badge ${item.rol === 'admin' ? 'role-admin' : 'role-cliente'}">${item.rol}</span></td>
                <td>
                    <button class="action-btn btn-toggle-role" data-id="${item.id}" data-role="${item.rol}">
                        <i class="fa-solid fa-arrows-rotate"></i> Cambiar Rol
                    </button>
                </td>
            `;
        }
        tbody.appendChild(row);
    });
    if (type === 'usuarios') {
        document.querySelectorAll('.btn-toggle-role').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target.closest('.btn-toggle-role');
                handleToggleRole(button.dataset.id, button.dataset.role);
            });
        });
    } else {
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => handleDelete(e.target.dataset.id));
        });
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => handleEdit(e.target.dataset.id));
        });
    }
}
async function handleToggleRole(id, currentRole) {
    const newRole = currentRole === 'admin' ? 'cliente' : 'admin';
    if (confirm(`¿Seguro que quieres cambiar el rol de este usuario a ${newRole}?`)) {
        try {
            await update('usuarios', id, { rol: newRole });
            alert('Rol actualizado con éxito.');
            loadData('usuarios');
        } catch (error) {
            alert('Error al actualizar el rol: ' + error.message);
        }
    }
}
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
    modalTitle.textContent = 'Editar elemento';
    modal.style.display = 'block';
    const inputs = itemForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        if (item[input.name]) input.value = item[input.name];
    });
}
document.getElementById('add-btn').addEventListener('click', () => {
    if (currentType === 'usuarios') {
        alert("Para añadir usuarios, usa el registro normal.");
        return;
    }
    currentEditId = null;
    itemForm.reset();
    modalTitle.textContent = 'Añadir nuevo';
    modal.style.display = 'block';
});
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
};
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
updateFormFields('coches'); 

