import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  id: string;
  title: string;
  year?: string;
  image?: { src: string; alt?: string };
  description: string;
  techs: string[];
  details?: string;
  demoUrl?: string;
};

/* --- datos base (puedes editarlos) --- */
const baseProjects: Project[] = [
  {
    id: "proj-1",
    title: "Glosario",
    year: "2025",
    image: { src: "/images/projects/dashboard.jpg", alt: "Glosario" },
    description:
      "Se elaboro un glosario de todas las siglas que se encontraban en la presentación del primer día de clases.",
    techs: ["", "", "", ""],
    details:
      "",
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

/* --- generar 8 proyectos uniformes (repite/clone los base si faltan) --- */
const makeProjects = (count = 8) => {
  const items: Project[] = [];
  for (let i = 0; i < count; i++) {
    const base = baseProjects[i % baseProjects.length];
    items.push({
      ...base,
      id: `proj-${i + 1}`,
      title: base.title + (i >= baseProjects.length ? ` (${i + 1})` : ""),
    });
  }
  return items;
};

const projects = makeProjects(8);

/* --- animation variants --- */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
};

/* --- ProjectImage: tamaño aumentado para mayor presencia --- */
const ProjectImage: React.FC<{ project: Project }> = ({ project }) => {
  // Increased size: larger preview while keeping aspect and responsiveness
  const base =
    "rounded-md overflow-hidden w-40 h-28 sm:w-48 sm:h-32 flex-shrink-0 bg-gray-100/40 dark:bg-gray-800/30";
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

/* --- Tech pill --- */
const TechPill: React.FC<{ name: string }> = ({ name }) => (
  <span className="inline-block text-xs sm:text-sm px-2 py-0.5 rounded-md bg-white/6 dark:bg-gray-800/30 text-gray-800 dark:text-gray-100">
    {name}
  </span>
);

/* --- ProjectCard: uniform height, content arranged column-wise --- */
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.li
      variants={itemVariants}
      className="relative h-full"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      aria-describedby={`proj-desc-${project.id}`}
    >
      <div className="bg-white/6 dark:bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 flex flex-col h-full transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg focus-within:outline-none">
        <div className="flex items-start gap-4">
          <ProjectImage project={project} />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {project.title}
                </h3>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{project.year}</div>
              </div>

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
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-4 flex-1">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.techs.map((t) => (
            <TechPill key={t} name={t} />
          ))}
        </div>
      </div>

      {/* Tooltip for details */}
      <AnimatePresence>
        {open && project.details && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute left-44 -top-12 z-30 w-auto max-w-sm rounded-md bg-gray-900/90 text-white text-sm px-3 py-2 shadow-lg"
            aria-hidden={!open}
          >
            {project.details}
          </motion.div>
        )}
      </AnimatePresence>

      <p id={`proj-desc-${project.id}`} className="sr-only">
        {project.description} {project.details ?? ""}
      </p>
    </motion.li>
  );
};

/* --- Tasks with pagination (2 per page, 8 items total -> 4 pages) --- */
const Tasks: React.FC = () => {
  const itemsPerPage = 2; // changed to 2 cards per page as requested
  const totalItems = projects.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const [page, setPage] = React.useState(0);

  // slice projects for current page
  const start = page * itemsPerPage;
  const current = projects.slice(start, start + itemsPerPage);

  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));
  const goPrev = () => setPage((p) => Math.max(0, p - 1));

  const gridKey = `tasks-page-${page}`;

  return (
    <section id="tasks" aria-labelledby="tasks-title" className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-lg p-6 theme-transition">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="tasks-title" className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Proyectos
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
                Muestra de proyectos realizados durante mi formación y desarrollo personal.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">Vista</span>
              <div className="text-sm px-3 py-1 rounded-md bg-gray-100/60 dark:bg-gray-700/40 text-gray-700 dark:text-gray-100">
                Tarjetas
              </div>
            </div>
          </div>

          {/* Grid + paginator */}
          <div className="mt-6">
            <div className="flex items-center justify-end gap-3 mb-4">
              <button
                onClick={goPrev}
                disabled={page === 0}
                aria-label="Página anterior"
                className={`p-2 rounded-md transition ${
                  page === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {/* left chevron */}
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden>
                  <path d="M12 16L6 10l6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-label={`Ir a página ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition ${
                      i === page ? "bg-yellow-400" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                disabled={page === totalPages - 1}
                aria-label="Página siguiente"
                className={`p-2 rounded-md transition ${
                  page === totalPages - 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {/* right chevron */}
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden>
                  <path d="M8 4l6 6-6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={gridKey}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                style={{ minHeight: 1 }}
              >
                {current.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Showing {start + 1}-{Math.min(start + itemsPerPage, totalItems)} of {totalItems} projects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Tasks;