import React from "react";
import type { IconType } from "react-icons";
import * as SI from "react-icons/si";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiJest,
  SiGraphql,
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

/* Resolver icono React Query de forma segura */
const SiReactQueryIcon: IconType | null = (() => {
  const registry = SI as unknown as Record<string, IconType | undefined>;
  return (
    registry["SiTanstackquery"] ??
    registry["SiTanStackQuery"] ??
    registry["SiReactQuery"] ??
    registry["SiReactquery"] ??
    null
  );
})();

type Tech = {
  id: string;
  name: string;
  icon?: IconType | null;
  gradientFrom: string;
  gradientTo: string;
  description?: string;
  proficiency?: number; // 0-100
};

/* Lista de tecnologías */
const techs: Tech[] = [
  {
    id: "react",
    name: "React",
    icon: SiReact,
    gradientFrom: "from-blue-400",
    gradientTo: "to-cyan-500",
    description: "Biblioteca de UI para construir interfaces reactivas.",
    proficiency: 88,
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: SiTypescript,
    gradientFrom: "from-sky-700",
    gradientTo: "to-indigo-700",
    description: "Superset de JavaScript que añade tipado estático.",
    proficiency: 85,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    gradientFrom: "from-sky-400",
    gradientTo: "to-blue-600",
    description: "Framework utility-first para construir UI rápidamente.",
    proficiency: 86,
  },
  {
    id: "vite",
    name: "Vite",
    icon: SiVite,
    gradientFrom: "from-violet-400",
    gradientTo: "to-pink-500",
    description: "Herramienta de bundling y dev server rápido.",
    proficiency: 80,
  },
  {
    id: "jest",
    name: "Jest",
    icon: SiJest,
    gradientFrom: "from-pink-500",
    gradientTo: "to-rose-600",
    description: "Framework de testing para JavaScript/TypeScript.",
    proficiency: 72,
  },
  {
    id: "react-query",
    name: "React Query",
    icon: SiReactQueryIcon,
    gradientFrom: "from-emerald-400",
    gradientTo: "to-teal-600",
    description: "TanStack Query: manejo y caché de datos remotos.",
    proficiency: 78,
  },
  {
    id: "graphql",
    name: "GraphQL",
    icon: SiGraphql,
    gradientFrom: "from-pink-400",
    gradientTo: "to-fuchsia-600",
    description: "Lenguaje de consulta para APIs, flexible y eficiente.",
    proficiency: 70,
  },
];

/* Animaciones */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32 } },
};

/* Icono/Badge consistente */
const TechIcon: React.FC<{ tech: Tech }> = ({ tech }) => {
  const Icon = tech.icon;
  const base =
    "flex items-center justify-center rounded-xl w-12 h-12 sm:w-14 sm:h-14 text-white shadow-md bg-gradient-to-br";
  if (Icon) {
    return (
      <div className={`${base} ${tech.gradientFrom} ${tech.gradientTo}`} aria-hidden>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
    );
  }
  const initials = tech.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className={`${base} ${tech.gradientFrom} ${tech.gradientTo} font-semibold`} aria-hidden>
      <span className="text-sm sm:text-base">{initials}</span>
    </div>
  );
};

/* Tarjeta individual con tooltip animado */
const TechCard: React.FC<{ tech: Tech }> = ({ tech }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.li
      variants={itemVariants}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      aria-label={tech.name}
      aria-describedby={`tech-desc-${tech.id}`}
      className="relative"
    >
      <div className="bg-white/6 dark:bg-gray-900/30 backdrop-blur-sm border border-white/8 dark:border-gray-700/25 rounded-lg p-3 flex items-center gap-4 transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg focus-within:outline-none">
        <TechIcon tech={tech} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{tech.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden md:block truncate max-w-[38rem]">
                {tech.description}
              </p>
            </div>

            <div className="text-sm text-gray-700 dark:text-gray-300 w-12 text-right">
              {tech.proficiency ?? 0}%
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="h-2 rounded-full bg-gray-200/30 dark:bg-gray-700/30 overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-blue-400 to-cyan-500"
                  style={{ width: `${tech.proficiency ?? 0}%`, transition: "width 0.6s ease" }}
                />
              </div>
            </div>
          </div>
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
            aria-hidden={!open}
            className="pointer-events-none absolute left-16 -top-10 z-30 w-auto max-w-xs rounded-md bg-gray-900/90 text-white text-xs px-3 py-2 shadow-lg"
          >
            {tech.description}
          </motion.div>
        )}
      </AnimatePresence>

      <p id={`tech-desc-${tech.id}`} className="sr-only">
        {tech.description}
      </p>
    </motion.li>
  );
};

const Technologies: React.FC = () => {
  // Render guard: if an exception happens mapping will be visible in console
  let content;
  try {
    content = (
      <motion.ul
        className="mt-6 grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible" /* animate on mount, no dependency on intersection observer */
      >
        {techs.map((t) => (
          <TechCard key={t.id} tech={t} />
        ))}
      </motion.ul>
    );
  } catch (err) {
    console.error("Error rendering Technologies:", err);
    content = (
      <div className="mt-6 text-sm text-red-400">
        Ha ocurrido un error mostrando las tecnologías. Abre la consola para más detalles.
      </div>
    );
  }

  return (
    <section id="technologies" aria-labelledby="technologies-title" className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/5 dark:bg-gray-900/35 backdrop-blur-sm border border-white/10 dark:border-gray-700/30 rounded-lg p-6 theme-transition">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="technologies-title" className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Tecnologías
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
                Herramientas y librerías con las que trabajo frecuentemente. Pasa el ratón o enfoca con Tab para ver detalles.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">Vista</span>
              <div className="text-sm px-3 py-1 rounded-md bg-gray-100/60 dark:bg-gray-700/40 text-gray-700 dark:text-gray-100">
                Favoritas
              </div>
            </div>
          </div>

          {/* Renderizamos el contenido (grid de tarjetas) */}
          {content}

          <p className="text-xs text-gray-400 mt-4">
            Tip: usa Tab para navegar por las tarjetas y escuchar la descripción con un lector de pantalla; el tooltip
            aparece con una animación fade + slide cuando pasas el ratón o enfocas la tarjeta.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Technologies;