import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Global auth state tracker for synchronous checks
let isLoggedIn = false;
let isAuthReady = false;

onAuthStateChanged(auth, (user) => {
    isLoggedIn = !!user;
    isAuthReady = true;
});

// Intercept specific actions that require login
document.addEventListener('click', (e) => {
    const btnVender = e.target.closest('#btn-iniciar-venta');

    // Check if we clicked the "Start Selling" button
    if (btnVender) {
        if (!isAuthReady) {
            // Wait or assume not logged in if auth not ready yet? usually ready quickly.
            // But let's be safe: if not ready, block it.
            e.preventDefault();
            e.stopImmediatePropagation();
            // Maybe show spinner? or just alert
            return;
        }

        if (!isLoggedIn) {
            // Block the action
            e.preventDefault();
            e.stopImmediatePropagation(); // Stop script.js from opening the form

            // Explain why
            alert("Debes iniciar sesión para vender tu vehículo.");

            // Redirect to login
            window.location.href = 'login.html';
        }
    }
}, true); // Use Capture Phase to intercept before other scripts
