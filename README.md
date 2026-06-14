# Amigo Estrés

Prototipo de app de gestión del estrés y equilibrio integral (mente, emoción, cuerpo, energía).
Hecho con React + Vite. Listo para desplegar en Vercel.

---

## 🚀 Cómo publicarlo en Vercel (la forma fácil)

1. Sube esta carpeta a un repositorio de **GitHub**.
2. Entra a [vercel.com](https://vercel.com) y crea una cuenta (regístrate con GitHub).
3. En el panel: **Add New → Project**.
4. Elige tu repositorio y dale **Import**.
5. Vercel detecta solo que es un proyecto **Vite**. No cambies nada.
6. Dale a **Deploy** y espera ~2 minutos.
7. Te dará una URL pública (ej. `amigo-estres.vercel.app`). ¡Listo!

A partir de ahí, cada cambio que subas a GitHub se republica automáticamente.

> El archivo `vercel.json` ya está incluido para evitar el error `404: NOT_FOUND`.

---

## 💻 Cómo correrlo en tu computador (opcional)

Necesitas tener [Node.js](https://nodejs.org) instalado (versión 18 o superior).

```bash
npm install      # instala las dependencias (solo la primera vez)
npm run dev      # abre la app en http://localhost:5173
```

Para generar la versión final de producción:

```bash
npm run build    # crea la carpeta dist/
npm run preview  # prueba esa versión localmente
```

---

## 📁 Estructura

```
amigo-estres/
├── index.html          → punto de entrada
├── package.json        → dependencias y comandos
├── vite.config.js      → configuración de Vite
├── vercel.json         → configuración de Vercel (evita el 404)
├── .gitignore
└── src/
    ├── main.jsx        → arranque de React
    └── App.jsx         → toda la app
```

---

## ⚠️ Nota importante

Esto es un **prototipo**: el contenido (videos, audios) y la suscripción están simulados.
Para convertirlo en un negocio real necesitarás conectar:

- **Hosting de contenido** (Mux, Cloudflare Stream) para los videos/audios.
- **Backend y cuentas** (Supabase o Firebase) para guardar progreso y usuarios.
- **Pagos** (RevenueCat para móvil, Stripe para web) para las suscripciones.
