# GMIntegra — Admin demo

Panel admin (mock) para integraciones logísticas: clientes, servicios ERP, usuarios de empresa y credenciales de portal.

Stack: React 19 · Vite · Tailwind CSS · React Router · Framer Motion · Lucide.

## Demo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173/

## Login demo

| Usuario    | Contraseña  |
|------------|-------------|
| `admin`    | `Admin2026!` |
| `ops.admin`| `Ops2026!`   |

Datos 100% mock (sin API real).

## Build

```bash
npm run build
npm run preview
```

## Publicación

- **GitHub Pages:** el workflow `.github/workflows/deploy-pages.yml` despliega en cada push a `main`/`master`.
- **Vercel:** importa el repo; `vercel.json` ya reescribe rutas SPA a `index.html`.
