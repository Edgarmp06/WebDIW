# Reglas de Seguridad de Firestore (ACTUALIZADAS PARA TIENDA)

Para que funcione la **Compra** y el **Control de Stock**, debes actualizar las reglas en Firebase.

1.  Ve a la **Consola de Firebase** > **Firestore Database** > Pestaña **Reglas**.
2.  Borra lo que haya y pega esto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // --- USUARIOS ---
    match /usuarios/{userId} {
      allow create: if request.auth != null;
      // Solo el propio usuario o el admin pueden leer/editar su perfil
      allow read, update, delete: if request.auth != null && (request.auth.uid == userId || get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == 'admin');
    }

    // --- COCHES (Solo Admin edita) ---
    match /coches/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == 'admin';
    }
    
    // --- PRODUCTOS (Stock) ---
    match /productos/{document=**} {
      allow read: if true;
      // Admin puede hacer todo (crear, borrar, editar)
      allow create, delete: if request.auth != null && get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == 'admin';
      // CUALQUIERA puede actualizar (necesario para restar stock al comprar)
      allow update: if true; 
    }

    // --- PEDIDOS (Nuevo) ---
    match /pedidos/{document=**} {
      // Cualquiera puede crear un pedido (comprar)
      allow create: if true;
      // Solo el dueño del pedido o el admin pueden leerlo (Historial)
      allow read: if request.auth != null && (resource.data.userId == request.auth.uid || get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == 'admin');
      // Nadie borra pedidos (por seguridad de registros)
      allow delete: if false; 
    }
  }
}
```

3.  Dale a **Publicar**.

---

### ¿Por qué fallaba antes?
Antes las reglas bloqueaban la escritura en `pedidos` (porque no existía la regla) y la actualización de `productos` (el stock) si no eras administrador. Con estas reglas, tus clientes ya pueden comprar.
