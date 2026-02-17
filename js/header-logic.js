import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import "./verification-guard.js"; // Import guard logic to run blocking and banner
import { updateCartCount } from "./cart.js";

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Initialize cart count on page load
    const profileBtn = document.getElementById('user-profile-btn');
    const logoutBtn = document.getElementById('header-logout-btn');

    // If these elements don't exist (e.g. strict login pages with no header), return or handle gracefully
    if (!profileBtn || !logoutBtn) return;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User logged in
            profileBtn.href = "perfil.html";
            logoutBtn.style.display = "inline-flex";

            // Logic for banner and blocking is now handled by verification-guard.js
        } else {
            // No user
            profileBtn.href = "login.html";
            logoutBtn.style.display = "none";
        }
    });

    logoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            window.location.href = 'index.html';
        } catch (error) {
            console.error("Error signing out", error);
        }
    });
});
