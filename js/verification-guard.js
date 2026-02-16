import { auth } from "./firebase-config.js";
import { onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// =============================================================================
// GLOBAL VERIFICATION GUARD
// Blocks actions and shows banner if email is not verified.
// =============================================================================

onAuthStateChanged(auth, (user) => {
    if (user && !user.emailVerified) {
        showVerificationBanner(user);

        // Add visual indicator to body
        document.body.classList.add('user-unverified');
    } else {
        // Remove banner if exists (logged out or verified)
        const banner = document.getElementById('global-verification-banner');
        if (banner) banner.remove();
        document.body.classList.remove('user-unverified');
    }
});

// 🛡️ BLOCKING LOGIC (Aggressive) 🛡️

// 1. Intercept SUBMIT events globally (Capture Phase)
window.addEventListener('submit', (e) => {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        alert('⚠️ Acción bloqueada\n\nTu correo electrónico ("' + user.email + '") no está verificado.\n\nPor favor, revisa tu bandeja de entrada o la carpeta de spam y verifica tu cuenta para continuar.');

        const banner = document.getElementById('global-verification-banner');
        if (banner) banner.scrollIntoView({ behavior: 'smooth' });

        return false;
    }
}, true); // true = Capture phase (runs before bubbling)

// 2. Intercept CLICK on submit buttons or CTAs (in case JS handles click instead of form submit)
window.addEventListener('click', (e) => {
    const user = auth.currentUser;
    if (!user || user.emailVerified) return;

    // Check if clicking a submit button or something that looks like one inside a form
    // Also include common action buttons like "Comprar", "Vender", "Reservar" if they have specific classes
    const btn = e.target.closest('button[type="submit"], input[type="submit"], .cta-button, .add-to-cart-btn, .checkout-btn');

    // Block if it's inside a form OR it's a critical action button
    // We try to be smart: navigation links usually don't have these specific classes/types combined with form context
    // But to be safe, if it's a link (A tag) we might want to let it pass unless it's a "buy" link

    if (btn) {
        // Allow navigation links unless they are explicitly for "actions"
        if (btn.tagName === 'A' && !btn.classList.contains('purchase-link') && !btn.closest('form')) {
            return; // Let navigation happen
        }

        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        alert('⚠️ Acción bloqueada\n\nDebes verificar tu correo para realizar esta acción.\nRevisa tu carpeta de spam.');
        return false;
    }
}, true);


// Verification Helpers
function showVerificationBanner(user) {
    if (document.getElementById('global-verification-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'global-verification-banner';
    // Styles are in CSS (#global-verification-banner)
    banner.style.display = 'flex';
    banner.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; justify-content:center; width:100%;">
            <span><i class="fa-solid fa-triangle-exclamation"></i> <strong>Atención:</strong> Tu correo no está verificado. Revisa spam.</span>
            <button id="global-resend-btn">Reenviar correo</button>
        </div>
    `;
    document.body.prepend(banner);

    const resendBtn = document.getElementById('global-resend-btn');
    resendBtn.addEventListener('click', async function () {
        resendBtn.disabled = true;
        resendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

        try {
            await sendEmailVerification(user);
            resendBtn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Enviado!';
            alert("Correo enviado con éxito.\n\nImportante:\n1. Revisa tu bandeja de entrada.\n2. Si no lo ves, revisa la carpeta de spam o correo no deseado.\n3. Haz clic en el enlace para activar tu cuenta.");
        } catch (error) {
            console.error("Error sending verification:", error);
            resendBtn.textContent = "Error";
            if (error.code === 'auth/too-many-requests') {
                alert("Has solicitado demasiados correos recientemente. Por favor espera un momento.");
            } else {
                alert("Error al enviar. Intenta más tarde.");
            }
        } finally {
            setTimeout(() => {
                if (resendBtn.textContent !== "Error") {
                    resendBtn.textContent = "Reenviar correo";
                    resendBtn.disabled = false;
                }
            }, 30000); // 30s cooldown
        }
    });
}
