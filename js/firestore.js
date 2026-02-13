import { db } from "./firebase-config.js";
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Obtener todos los documentos de una colección
export async function getAll(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

// Obtener un documento por ID
export async function getOne(collectionName, id) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        return null;
    }
}

// Añadir un nuevo documento
export async function add(collectionName, data) {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        return docRef.id;
    } catch (e) {
        console.error("Error añadiendo documento: ", e);
        throw e;
    }
}

// Actualizar un documento
export async function update(collectionName, id, data) {
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, data);

    } catch (e) {
        console.error("Error actualizando documento: ", e);
        throw e;
    }
}

// Borrar un documento
export async function remove(collectionName, id) {
    try {
        await deleteDoc(doc(db, collectionName, id));

    } catch (e) {
        console.error("Error borrando documento: ", e);
        throw e;
    }
}
