import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  id: string;
  title: string;
  year?: string;
  image?: { src: string; alt?: string };
  description: string;
  techs: string[]; // listado de tecnologías usadas (sin iconos)
  details?: string; // texto extra que aparecerá en tooltip / sr-only
  demoUrl?: string;
};

const projects: Project[] = [
  {
    id: "proj-1",
    title: "Dashboard Analítico",
    year: "2024",
    image: { src: "/images/projects/dashboard.jpg", alt: "Dashboard Analítico - captura" },
    description:
      "Aplicación interna para visualizar métricas y KPIs en tiempo real. Componentes reutilizables, filtrado avanzado y optimización de render.",
    techs: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    details:
      "Implementé filtros personalizados, memoización de componentes y optimicé consultas con caché para reducir latencia.",
    demoUrl: "#",
  },
  {
    id: "proj-2",
    title: "Landing Marketing",
    year: "2023",
    image: { src: "/images/projects/landing.jpg", alt: "Landing page - captura" },
    description:
      "Landing responsiva con animaciones y A/B testing para campañas. SEO básico y optimización de imágenes.",
    techs: ["HTML", "Tailwind CSS", "Vite"],
    details: "A/B testing con variantes ligeras, lazy-loading de assets y seguimiento de conversiones.",
  },
  {
    id: "proj-3",
    title: "App de Tareas",
    year: "2022",
    image: { src: "/images/projects/tasks.jpg", alt: "App de Tareas - captura" },
    description:
      "Aplicación para gestionar tareas con sincronización local y sincronización con servidor, diseño accesible y tests.",
    techs: ["React", "TypeScript", "Jest"],
    details: "Implementé validaciones, pruebas unitarias y manejo offline con IndexedDB.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
};

/* Área para la imagen / logo del proyecto (más grande, centrada) */
const ProjectImage: React.FC<{ project: Project }> = ({ project }) => {
  const base = "rounded-lg overflow-hidden w-28 h-20 sm:w-36 sm:h-24 flex-shrink-0 bg-gray-100/40 dark:bg-gray-800/30";
  if (project.image?.src) {
    return (
      <div className={base} aria-hidden>
        <img
          src={project.image.src}
          alt={project.image.alt ?? project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // fallback: initials in a subtle gradient block
  const initials = project.title
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`${base} flex items-center justify-center font-semibold text-white bg-gradient-to-br from-gray-500 to-gray-700`}
      aria-hidden
    >
      <span className="text-sm sm:text-base">{initials}</span>
    </div>
  );
};

/* Badge de tecnología (texto) */
const TechPill: React.FC<{ name: string }> = ({ name }) => (
  <span className="inline-block text-xs sm:text-sm px-2 py-0.5 rounded-md bg-white/6 dark:bg-gray-800/30 text-gray-800 dark:text-gray-100">
    {name}
  </span>
);

/* Tarjeta de proyecto: imagen + descripción + techs. tooltip animado con detalles */
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.li
      variants={itemVariants}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      aria-describedby={`proj-desc-${project.id}`}
    >
      <div className="bg-white/6 dark:bg-gray-900/30 backdrop-blur-sm border border-white/8 dark:border-gray-700/25 rounded-lg p-4 flex items-start gap-4 transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg focus-within:outline-none">
        <ProjectImage project={project} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                {project.title}
              </h3>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{project.year}</div>
            </div>

            {/* acciones pequeñas: demo link si existe */}
            {project.demoUrl ? (
              <div className="text-sm">
                <a
                  href={project.demoUrl}
                  className="text-xs px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver
                </a>
              </div>
            ) : null}
          </div>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{project.description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.techs.map((t) => (
              <TechPill key={t} name={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip animado con Framer Motion para detalles adicionales (fade + slide) */}
      <AnimatePresence>
        {open && project.details && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute left-36 -top-12 z-30 w-auto max-w-sm rounded-md bg-gray-900/90 text-white text-sm px-3 py-2 shadow-lg"
            aria-hidden={!open}
          >
            {project.details}
          </motion.div>
        )}
      </AnimatePresence>

      {/* sr-only para lectores de pantalla */}
      <p id={`proj-desc-${project.id}`} className="sr-only">
        {project.description} {project.details ?? ""}
      </p>
    </motion.li>
  );
};

const Tasks: React.FC = () => {
  return (
    <section id="tasks" aria-labelledby="tasks-title" className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/5 dark:bg-gray-900/35 backdrop-blur-sm border border-white/10 dark:border-gray-700/30 rounded-lg p-6 theme-transition">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="tasks-title" className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Proyectos
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
                Muestra de proyectos con imagen, descripción breve y las tecnologías utilizadas.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">Vista</span>
              <div className="text-sm px-3 py-1 rounded-md bg-gray-100/60 dark:bg-gray-700/40 text-gray-700 dark:text-gray-100">
                Tarjetas
              </div>
            </div>
          </div>

          <motion.ul
            className="mt-6 grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))" }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </motion.ul>

          <p className="text-xs text-gray-400 mt-4">
            Consejo: sustituye las rutas de las imágenes por las de tus proyectos reales. Si quieres que las tarjetas
            usen un tamaño de imagen aún mayor (badge más grande) o que la grid sea más densa, lo ajusto.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Tasks;