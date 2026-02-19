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
export async function getAll(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}
export async function getOne(collectionName, id) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        return null;
    }
}
export async function add(collectionName, data) {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        return docRef.id;
    } catch (e) {
        console.error("Error añadiendo documento: ", e);
        throw e;
    }
}
export async function update(collectionName, id, data) {
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, data);
    } catch (e) {
        console.error("Error actualizando documento: ", e);
        throw e;
    }
}
export async function remove(collectionName, id) {
    try {
        await deleteDoc(doc(db, collectionName, id));
    } catch (e) {
        console.error("Error borrando documento: ", e);
        throw e;
    }
}

