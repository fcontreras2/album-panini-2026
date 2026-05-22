# ⚽ Álbum Panini FIFA World Cup 2026

Administrador de álbum Panini del Mundial 2026 — 980 barajitas, sin backend, todo en el navegador.

## 🚀 Instalación y uso

```bash
# 1. Entrar a la carpeta
cd panini-album-2026

# 2. Instalar dependencias
npm install

# 3. Correr en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## ✨ Funcionalidades

- **980 barajitas** en orden del álbum físico (intro → 48 equipos → historia)
- **Click izquierdo** sobre una barajita → suma una copia
- **Click derecho** sobre una barajita → resta una copia
- **3 estados**: ⬜ Falta (gris) / ✅ Tengo (verde) / 🔁 Repetida (naranja + contador)
- **Filtros**: Todas / Tengo / Falta / Repetidas
- **Buscador** por nombre de jugador, código o equipo
- **Estadísticas**: progreso, % completado, cuántas tengo/faltan/repetidas
- **Lista de intercambio**: ver y copiar solo las repetidas
- **Exportar JSON**: guarda tu álbum en un archivo
- **Importar JSON**: restaura tu álbum desde un archivo
- **Bilingüe**: Español / English

## 🗂️ Estructura del proyecto

```
src/
├── app/           # Next.js App Router
├── components/    # Componentes UI
├── data/          # Las 980 barajitas
├── hooks/         # useAlbum (estado + localStorage)
├── lib/           # storage, i18n
└── types/         # TypeScript types
```

## 🛠️ Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- localStorage (sin backend)
