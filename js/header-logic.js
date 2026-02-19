import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import "./verification-guard.js"; 
import { updateCartCount } from "./cart.js";
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); 
    const profileBtn = document.getElementById('user-profile-btn');
    const logoutBtn = document.getElementById('header-logout-btn');
    if (!profileBtn || !logoutBtn) return;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            profileBtn.href = "perfil.html";
            logoutBtn.style.display = "inline-flex";
        } else {
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

