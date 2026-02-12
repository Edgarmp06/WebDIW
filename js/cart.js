// Basic Cart Logic using LocalStorage

export function getCart() {
    const cart = localStorage.getItem('tecoche_cart');
    return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart) {
    localStorage.setItem('tecoche_cart', JSON.stringify(cart));
    updateCartCount();
}

export function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    // Ensure we track max stock available
    const maxStock = parseInt(product.stock);

    if (existingItem) {
        if (existingItem.quantity >= maxStock) {
            alert(`No puedes añadir más de ${maxStock} unidades de este producto.`);
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            nombre: product.nombre,
            precio: parseFloat(product.precio),
            imagenURL: product.imagenURL,
            quantity: 1,
            stock: maxStock // Save max stock reference
        });
    }
    saveCart(cart);
}

export function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

export function updateQuantity(productId, newQuantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(newQuantity);
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }
    saveCart(cart);
}

export function clearCart() {
    localStorage.removeItem('tecoche_cart');
    updateCartCount();
}

export function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
}

export function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);

    // Update all badge instances in DOM
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        if (count > 0) {
            badge.style.display = 'block';
            badge.textContent = count;
        } else {
            badge.style.display = 'none';
        }
    });
}
