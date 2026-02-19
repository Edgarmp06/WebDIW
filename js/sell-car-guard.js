import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
let isLoggedIn = false;
let isAuthReady = false;
onAuthStateChanged(auth, (user) => {
    isLoggedIn = !!user;
    isAuthReady = true;
});
document.addEventListener('click', (e) => {
    const btnVender = e.target.closest('#btn-iniciar-venta');
    if (btnVender) {
        if (!isAuthReady) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }
        if (!isLoggedIn) {
            e.preventDefault();
            e.stopImmediatePropagation(); 
            alert("Debes iniciar sesión para vender tu vehículo.");
            window.location.href = 'login.html';
        }
    }
}, true); 

