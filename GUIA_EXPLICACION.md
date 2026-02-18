# 🏎️ Presentación del Proyecto: Tecoche v5.0

Hola profe, aquí te hago un resumen de lo que he montado en mi proyecto para que sepas cómo probarlo todo paso a paso.

---

## 💎 Idea del Proyecto
He creado **Tecoche**, que es una plataforma completa para un taller mecánico. No es solo una web visual; he querido que sea totalmente funcional y profesional, usando **Firebase** para la base de datos y los usuarios, y **PHP** para la parte de lógica de servidor, tal y como pediste en clase.

---

## 🔒 Cómo probar el sistema de usuarios
Para que puedas ver todas las secciones de la web y el funcionamiento real, te recomiendo que te registres:

1.  Ve a la página de **Registro**.
2.  **¡MUY IMPORTANTE!**: En cuanto te registres, el sistema te enviará un **correo de verificación** automático. **Seguramente te entre en la carpeta de SPAM**, así que por favor echa un ojo ahí para poder validar tu cuenta.
3.  Una vez verificado el correo, ya podrás entrar a tu perfil, cambiar tu foto (avatar) y comprar en la tienda. He bloqueado algunas funciones hasta que se verifique el email para que sea como una web real y segura.

---

## 🛒 Tienda y Facturación (Con IVA desglosado)
He trabajado mucho para que la tienda se comporte como un e-commerce profesional:
-   Los productos se cargan solos desde la base de datos de Firestore.
-   Al hacer el checkout, el sistema calcula automáticamente la **Base Imponible** y el **IVA del 21%**.
-   Cuando termines el pedido, te llegará un correo con una **Factura Simplificada** profesional con todos los datos del taller y el desglose de lo que has comprado.

---

## 🐘 Implementación de PHP (El requisito de clase)
Para cumplir con la parte de PHP que pediste, lo he implementado en la **Calculadora de Presupuestos**:
-   He creado la página `calculadora-presupuesto.html`.
-   Al elegir los servicios y darle a calcular, los datos no se procesan en el navegador con JS, sino que se envían a un archivo llamado `presupuesto.php`.
-   Ese archivo PHP en el servidor es el que hace los cálculos de precios, mano de obra e impuestos, y te devuelve la respuesta. Es una integración real entre el cliente y el servidor.

---

## 🛠️ Panel de Control
También he montado un **Panel de Admin** (`admin.html`) donde yo, como dueño del taller, puedo subir coches nuevos para vender o accesorios para la tienda sin tener que tocar el código, todo se guarda directamente en la nube.

---

Espero que te guste el proyecto, ¡me ha llevado bastantes horas dejarlo todo así de pulido!

**Alumno**: Edgar  
**Curso**: 2º DAW  
**Fecha**: 18 de febrero de 2026
