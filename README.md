# Portafolio — Wayner López (WaynerGT)

[Ver sitio en producción](https://portafolio-cv-waynergts-projects.vercel.app/)

Descripción
---
Este repositorio contiene el portafolio personal de Wayner López (WaynerGT). Es una web estática moderna, responsive y accesible, construida con tecnologías web actuales (React + Vite + TypeScript + Tailwind CSS) para mostrar el hero, proyectos, tecnologías, el contacto y demás secciones de presentación profesional.

Características principales
---
- Hero con retrato, nombre destacado y CTAs.
- Sección de Proyectos con tarjetas, paginación y animaciones ligeras.
- Sección de Tecnologías con tarjetas y barras de progreso.
- Sección de Contacto con enlaces mailto, WhatsApp y redes sociales.
- Diseño "glass" limpio, compatible light/dark.
- Optimización de imágenes y soporte retina (srcSet).
- Despliegue continuo en Vercel.

Demo
---
Accede a la versión desplegada: https://portafolio-cv-waynergts-projects.vercel.app/

Tecnologías
---
- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- react-icons
- (Opcionales) herramientas de optimización de imágenes: Squoosh, ImageOptim

Requisitos previos
---
- Node.js (>= 18 recomendado)
- npm o Yarn
- Cuenta en GitHub (para conectar con Vercel si quieres despliegue automático)
- Cuenta en Vercel (opcional, para hosting gratuito y CI/CD)

Instalación y desarrollo local
---
1. Clona el repositorio:
   git clone <TU_REPO_URL>
2. Entra al proyecto:
   cd <tu-repo>
3. Instala dependencias:
   npm install
   (o) yarn
4. Levanta el servidor de desarrollo:
   npm run dev
   (o) yarn dev
5. Abre en el navegador: normalmente http://localhost:5173 (Vite mostrará el puerto exacto)

Scripts útiles
---
- npm run dev — servidor de desarrollo
- npm run build — compilar para producción (genera la carpeta `dist`)
- npm run preview — probar el build localmente
- npm run lint / test — (si están configurados en el repo)

Producción / Build
---
- Para generar los archivos listos para producción:
  npm run build
- Los archivos finales se encuentran en `dist/` (Vite).
- Puedes servirlos localmente con `npm run preview` o subir `dist/` a cualquier host estático.

Despliegue en Vercel (pasos rápidos)
---
1. Entra a https://vercel.com y conéctate con tu cuenta GitHub (autoriza el acceso al repositorio).
2. Crea un nuevo proyecto y selecciona el repositorio de tu portafolio.
3. Vercel detecta Vite automáticamente en la mayoría de los casos. Configura:
   - Framework: Vite (si no se detecta automáticamente)
   - Comando de build: npm run build
   - Output directory: dist
   - Install command: npm install
4. Opcional: configura variables de entorno (por ejemplo, si usas servicios externos).
5. Haz Deploy — Vercel hará build y publicará en una URL `*.vercel.app`. Puedes añadir dominio personalizado en "Domains".
6. Cada push a la rama configurada (ej. main) iniciará un nuevo despliegue automático.

Configuración adicional para Vercel
---
- Si tienes imágenes en `/public`, Vercel las servirá tal cual. Para optimización adicional considera usar la integración Image Optimization de Vercel o generar versiones webp.
- Si el build falla en Vercel, revisa los logs en la interfaz de Vercel: errores de dependencias o de variables suelen ser la causa (asegúrate de usar Node.js >= versión requerida).

Buenas prácticas y recomendaciones
---
- Mantén las imágenes optimizadas y con versiones @2x para retina.
- Evita incrustar datos sensibles en el frontend. Usa variables de entorno para claves (Vercel: Dashboard → Project → Environment Variables).
- Prueba cambios en local con `npm run build` y `npm run preview` antes de pushear.
- Añade tests básicos y linting para mantener calidad del código.

Estructura del proyecto
---
- /public — assets públicos (imágenes, favicon, CV)
- /src
  - /components — componentes React (Hero, Contact, Tasks, Technologies, Header...)
  - /pages — si tienes rutas separadas
  - main.tsx — punto de entrada
  - index.css — Tailwind + estilos globales
- package.json — scripts y dependencias
- vite.config.ts — configuración de Vite
- tailwind.config.js — configuración de Tailwind

