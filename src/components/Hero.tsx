import React from "react";
import { motion } from "framer-motion";
import { SiGithub, SiLinkedin } from "react-icons/si";

/**
 * Smooth-scroll helper: prevents default anchor jump and performs a smooth scroll
 * to the target element. Also updates the URL hash using replaceState (no jump).
 */
const smoothScrollTo = (id: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
  if (e) e.preventDefault();
  const el = document.getElementById(id.replace("#", ""));
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      history.replaceState(null, "", `#${id.replace("#", "")}`);
    } catch {
      // ignore if not allowed
    }
  } else {
    // fallback: set the hash (browser may jump)
    window.location.hash = id;
  }
};

const Hero: React.FC = () => {
  return (
    <header aria-labelledby="hero-title" className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="min-h-[72vh] flex items-center">
          <div className="w-full px-4 sm:px-6 py-12">
            <div className="flex flex-col items-center text-center gap-6">
              {/* subtle navy radial behind portrait to provide contrast for the yellow surname
                  pointer-events-none so it doesn't block clicks */}
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full blur-[22px] opacity-60 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 40% 35%, rgba(7,30,38,0.95) 0%, rgba(7,30,38,0.65) 20%, rgba(2,6,23,0) 60%)",
                    width: "420px",
                    height: "420px",
                    marginLeft: "-12px",
                  }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-2 ring-white/10 shadow-2xl"
                  role="img"
                  aria-label="Foto de perfil"
                >
                  <img
                    src="/images/portrait.png"
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {/* Name with yellow/gold accent for the surname contrasted by the navy radial */}
              <motion.h1
                id="hero-title"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.44 }}
                className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase"
              >
                <span className="text-gray-900 dark:text-gray-100">Wayner </span>
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    background:
                      "linear-gradient(90deg, #FBBF24 0%, #FFD54F 40%, #F59E0B 100%)",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  López
                </span>
              </motion.h1>

              {/* Short lines of roles/summary (kept neutral so the yellow/ navy combo stands out) */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.44, delay: 0.06 }}
                className="max-w-2xl space-y-2"
              >
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                  Frontend Developer · React & TypeScript · Interfaces accesibles y rendimiento
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Desarrollador Junior con un stack sólido en la creación de soluciones web completas. Acredito experiencia en React y TypeScript para el frontend (incluyendo Tailwind CSS para un desarrollo ágil) y en la implementación de APIs y lógica backend en proyectos universitarios y personales. Actualmente, mi formación en Ingeniería en Sistemas (8vo Ciclo) me permite aplicar buenas prácticas, arquitectura limpia y un enfoque constante en el rendimiento y la Experiencia de Usuario (UX)..
                </p>
              </motion.div>

              {/* Elegant CTAs: primary with navy + subtle golden accent, secondary outlined in gold
                  Use onClick with smoothScrollTo to ensure single-click behavior */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.44, delay: 0.12 }}
                className="mt-6 flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#contact"
                  aria-label="Contáctame"
                  onClick={(e) => smoothScrollTo("#contact", e)}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gradient-to-br from-[#052235] to-[#0b3b4a] text-yellow-50 text-sm font-semibold shadow-lg transform-gpu transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-yellow-300/30"
                  style={{ boxShadow: "0 8px 30px rgba(2,8,23,0.35)" }}
                >
                  Contáctame
                </a>

                <a
                  href="#tasks"
                  aria-label="Tareas"
                  onClick={(e) => smoothScrollTo("#tasks", e)}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md border-2 border-yellow-400 text-[#c4e0f3] bg-white/5 text-sm font-semibold transition hover:bg-yellow-50/40 hover:scale-102 focus:outline-none focus:ring-4 focus:ring-yellow-200/30"
                >
                  Tareas
                </a>
              </motion.div>

              {/* Social icons: GitHub and LinkedIn (added as requested) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.36, delay: 0.18 }}
                className="mt-4 flex items-center gap-4"
                aria-label="Redes sociales"
              >
                <a
                  href="https://github.com/waynergt"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-md hover:bg-gray-100/10 transition"
                >
                  <SiGithub className="w-5 h-5 text-gray-700 dark:text-gray-100" />
                </a>

                <a
                  href="https://linkedin.com/in/tu-perfil"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-md hover:bg-gray-100/10 transition"
                >
                  <SiLinkedin className="w-5 h-5 text-[#0b66c3]" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;