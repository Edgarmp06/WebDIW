import { auth, db } from "./firebase-config.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Función para registrar usuarios y guardar su rol en Firestore
export async function registerUser(email, password, nombre, rol = 'cliente') {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar datos adicionales en Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
            email: email,
            nombre: nombre,
            rol: rol // 'admin' o 'cliente'
        });

        return user;
    } catch (error) {
        console.error("Error en registro:", error);
        throw error;
    }
}

// Función para iniciar sesión
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
}

// Función para cerrar sesión
export async function logoutUser() {
    try {
        await signOut(auth);
        window.location.href = 'index.html'; // Redirigir al inicio
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
}

// Obtener el rol del usuario actual
export async function getUserRole(uid) {
    try {
        const docRef = doc(db, "usuarios", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().rol;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error obteniendo rol:", error);
        return null;
    }
}

// Monitor de estado de autenticación
export function monitorAuthState(callback) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const rol = await getUserRole(user.uid);
            callback(user, rol);
        } else {
            callback(null, null);
        }
    });
}
