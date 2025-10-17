import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Job = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements?: string[]; // bullet points or highlights
  image?: { src: string; alt?: string }; // optional image/logo for the job/company
  gradientFrom?: string; // optional gradient if you want a badge fallback
  gradientTo?: string;
};

const jobs: Job[] = [
  {
    id: "job-1",
    company: "Empresa A",
    role: "Frontend Developer",
    period: "2023 - Presente",
    description: "Construcción de aplicaciones web modernas con React y TypeScript, enfoque en rendimiento y accesibilidad.",
    achievements: ["Lideré migración a TypeScript", "Reduje bundle size en 25%"],
    image: { src: "/images/company-a-logo.png", alt: "Logo Empresa A" }, // ejemplo, pon la ruta correcta o quita
    gradientFrom: "from-blue-400",
    gradientTo: "to-cyan-500",
  },
  {
    id: "job-2",
    company: "Empresa B",
    role: "Desarrollador Junior",
    period: "2021 - 2023",
    description: "Mantenimiento de interfaces, tests y colaboración en equipos ágiles para entregar nuevas features.",
    achievements: ["Implementé tests automatizados", "Mejora de accesibilidad WCAG"],
    gradientFrom: "from-purple-500",
    gradientTo: "to-pink-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32 } },
};

/* Badge / Image area: increased size for logos, keeps fallback with initials */
const BadgeImage: React.FC<{ job: Job }> = ({ job }) => {
  // Increased dimensions to give more visual weight to the logo/image
  const base =
    "flex items-center justify-center rounded-xl w-16 h-16 sm:w-20 sm:h-20 text-white shadow-md bg-gradient-to-br overflow-hidden";
  if (job.image && job.image.src) {
    return (
      <div className={`${base} bg-white/5 dark:bg-gray-800/10`} aria-hidden>
        <img
          src={job.image.src}
          alt={job.image.alt ?? job.company}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    );
  }

  // fallback badge with initials and gradient (keeps symmetry con Technologies)
  const initials = job.company
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const gradientFrom = job.gradientFrom ?? "from-gray-500";
  const gradientTo = job.gradientTo ?? "to-gray-700";

  return (
    <div className={`${base} ${gradientFrom} ${gradientTo} font-semibold`} aria-hidden>
      <span className="text-sm sm:text-base">{initials}</span>
    </div>
  );
};

const ExperienceCard: React.FC<{ job: Job }> = ({ job }) => {
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
      aria-label={`${job.role} — ${job.company}`}
      aria-describedby={`job-desc-${job.id}`}
    >
      <div className="bg-white/6 dark:bg-gray-900/30 backdrop-blur-sm border border-white/8 dark:border-gray-700/25 rounded-lg p-4 flex items-start gap-5 transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg focus-within:outline-none">
        <BadgeImage job={job} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 truncate">{job.role}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">·</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{job.company}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{job.period}</p>
            </div>

            {/* Removed progress percentage display per your request */}
          </div>

          <p className="text-sm sm:text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-3">
            {job.description}
          </p>

          {/* Removed the progress bar; kept spacing consistent */}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute left-20 -top-16 z-30 w-auto max-w-sm rounded-md bg-gray-900/90 text-white text-sm px-3 py-2 shadow-lg"
            aria-hidden={!open}
          >
            <div className="font-medium">{job.role} — {job.company}</div>
            <div className="text-xs text-gray-200 mt-1">
              {job.achievements?.slice(0, 3).join(" • ") || job.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p id={`job-desc-${job.id}`} className="sr-only">
        {job.description} {job.achievements ? "Logros: " + job.achievements.join(", ") : ""}
      </p>
    </motion.li>
  );
};

const Experience: React.FC = () => {
  return (
    <section id="experience" aria-labelledby="experience-title" className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/5 dark:bg-gray-900/35 backdrop-blur-sm border border-white/10 dark:border-gray-700/30 rounded-lg p-6 theme-transition">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="experience-title" className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Experiencia
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
                Proyectos y roles en los que he trabajado. Pasa el ratón o usa Tab para ver detalles.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">Orden</span>
              <div className="text-sm px-3 py-1 rounded-md bg-gray-100/60 dark:bg-gray-700/40 text-gray-700 dark:text-gray-100">
                Reciente
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
            {jobs.map((j) => (
              <ExperienceCard key={j.id} job={j} />
            ))}
          </motion.ul>

          <p className="text-xs text-gray-400 mt-4">
            Consejo: puedes reemplazar las rutas de las imágenes (job.image.src) por tus logos reales. Si quieres que las imágenes se vean con borde blanco o un padding interno, lo ajusto con gusto.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;