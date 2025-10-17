import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  details?: string;
  gradientFrom?: string;
  gradientTo?: string;
};

const education: EducationItem[] = [
  {
    id: "edu-1",
    degree: "Máster en Ingeniería de Software",
    institution: "Universidad Ejemplar",
    period: "2021 — 2023",
    description: "Especialización en arquitectura de aplicaciones web y prácticas de testing avanzado.",
    details: "Tesis sobre optimización de rendering en aplicaciones React y adopción de microfrontends.",
    gradientFrom: "from-blue-400",
    gradientTo: "to-cyan-500",
  },
  {
    id: "edu-2",
    degree: "Grado en Informática",
    institution: "Instituto Tecnológico",
    period: "2017 — 2021",
    description: "Formación sólida en estructuras de datos, algoritmos y buenas prácticas de desarrollo.",
    details: "Proyectos destacados: plataforma de gestión académica y sistema de colas distribuidas.",
    gradientFrom: "from-sky-400",
    gradientTo: "to-blue-600",
  },
  {
    id: "edu-3",
    degree: "Certificación Profesional - Cloud",
    institution: "Cloud Academy",
    period: "2020",
    description: "Cursos sobre arquitecturas en la nube, despliegue y seguridad básica.",
    details: "Certificación orientada a despliegue de infraestructuras y prácticas de seguridad.",
    gradientFrom: "from-emerald-400",
    gradientTo: "to-teal-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

/* marker used at each item */
const TimelineMarker: React.FC<{ from?: string; to?: string }> = ({ from = "from-blue-400", to = "to-cyan-500" }) => (
  <div
    className={`w-5 h-5 rounded-full ${from} ${to} bg-gradient-to-br shadow-md ring-4 ring-white/10 dark:ring-black/30 z-20`}
    aria-hidden
  />
);

const TimelineItem: React.FC<{ item: EducationItem; index: number }> = ({ item, index }) => {
  const [open, setOpen] = React.useState(false);
  const isLeft = index % 2 === 0;

  return (
    // pl-6 on mobile so card aligns with left static line; md:pl-0 resets on desktop
    <motion.li
      variants={itemVariants}
      className="relative md:py-6 pl-6 md:pl-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      aria-describedby={`edu-desc-${item.id}`}
    >
      {/* Grid with 3 columns on md+: left / center / right.
          gap reduced for compactness (gap-4). */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
        {/* Left column (column 1). When item is on the right, hide this column on md */}
        <div className={`md:col-start-1 md:col-end-2 ${isLeft ? "" : "md:hidden"}`}>
          {isLeft ? (
            // md:-mr-2 brings the left card's border to touch the central line visually.
            // md:pl-6 keeps inner padding so text doesn't sit over the line.
            <div className="max-w-[720px] w-full md:ml-auto md:-mr-2">
              <div className="bg-white/6 dark:bg-gray-900/30 backdrop-blur-sm border border-white/8 dark:border-gray-700/25 rounded-lg p-5 md:p-6 transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg relative z-10">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {item.degree}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">·</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.institution}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.period}</p>
                  </div>
                </div>

                <p className="text-base md:text-base text-gray-600 dark:text-gray-300 mt-3 leading-relaxed line-clamp-4">
                  {item.description}
                </p>
              </div>

              <AnimatePresence>
                {open && item.details && (
                  <motion.div
                    role="tooltip"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="pointer-events-none mt-2 w-auto max-w-lg rounded-md bg-gray-900/90 text-white text-sm px-3 py-2 shadow-lg"
                    aria-hidden={!open}
                  >
                    {item.details}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : null}
        </div>

        {/* Center column: static line + marker placement.
            We keep the static track under the markers; markers have z-20 to appear above the track,
            and cards have z-10 so their border visually touches the line without overlapping the marker. */}
        <div className="md:col-start-2 md:col-end-3 flex justify-center pointer-events-none">
          <div className="mt-6 md:mt-8 flex items-center justify-center">
            <TimelineMarker from={item.gradientFrom} to={item.gradientTo} />
          </div>
        </div>

        {/* Right column (column 3). When item is on the left, hide this on md */}
        <div className={`md:col-start-3 md:col-end-4 ${!isLeft ? "" : "md:hidden"}`}>
          {!isLeft ? (
            // md:-ml-2 brings the right card's border to touch the central line visually.
            <div className="max-w-[720px] w-full md:mr-auto md:-ml-2">
              <div className="bg-white/6 dark:bg-gray-900/30 backdrop-blur-sm border border-white/8 dark:border-gray-700/25 rounded-lg p-5 md:p-6 transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg relative z-10">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {item.degree}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">·</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.institution}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.period}</p>
                  </div>
                </div>

                <p className="text-base md:text-base text-gray-600 dark:text-gray-300 mt-3 leading-relaxed line-clamp-4">
                  {item.description}
                </p>
              </div>

              <AnimatePresence>
                {open && item.details && (
                  <motion.div
                    role="tooltip"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="pointer-events-none mt-2 w-auto max-w-lg rounded-md bg-gray-900/90 text-white text-sm px-3 py-2 shadow-lg"
                    aria-hidden={!open}
                  >
                    {item.details}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : null}
        </div>
      </div>

      <p id={`edu-desc-${item.id}`} className="sr-only">
        {item.description} {item.details ?? ""}
      </p>
    </motion.li>
  );
};

const Education: React.FC = () => {
  return (
    <section id="education" aria-labelledby="education-title" className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/5 dark:bg-gray-900/35 backdrop-blur-sm border border-white/10 dark:border-gray-700/30 rounded-lg p-6 theme-transition">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="education-title" className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Formación
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
                Línea de tiempo con títulos, instituciones y detalles. Pasa el ratón o usa Tab para ver más información.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">Orden</span>
              <div className="text-sm px-3 py-1 rounded-md bg-gray-100/60 dark:bg-gray-700/40 text-gray-700 dark:text-gray-100">
                Cronológico
              </div>
            </div>
          </div>

          <motion.ul className="mt-4 relative space-y-4 md:space-y-6" variants={containerVariants} initial="hidden" animate="visible">
            {/* Static central line for md+ */}
            <div className="hidden md:block absolute left-1/2 top-6 bottom-6 -translate-x-1/2 pointer-events-none">
              <div className="relative h-full w-2 rounded mx-auto bg-gradient-to-b from-blue-400 to-cyan-500" aria-hidden />
            </div>

            {/* Small screens: left static line */}
            <div className="absolute left-6 top-10 bottom-10 w-px bg-gradient-to-b from-blue-400 to-cyan-500 opacity-80 md:hidden" aria-hidden />

            {education.map((e, i) => (
              <TimelineItem key={e.id} item={e} index={i} />
            ))}
          </motion.ul>

          <p className="text-xs text-gray-400 mt-4">
            He ajustado las tarjetas para que el borde toque visualmente la línea central: reduje la distancia lateral y usé
            márgenes negativos discretos (md:-mr-2 / md:-ml-2). Además he mantenido el marcador con mayor z-index (z-20)
            mientras las tarjetas tienen z-10 para que el punto siempre quede encima y la tarjeta parezca pegada sin ocultar el marcador.
            Esto ofrece un aspecto limpio y simétrico: la línea queda libre en el centro, los puntos permanecen visibles y las tarjetas
            'rozan' la línea sin solaparse con los marcadores.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Education;