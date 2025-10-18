import React from "react";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { SiWhatsapp, SiLinkedin, SiGithub } from "react-icons/si";

const EMAIL = "waynerlopezgt@gmail.com";
// Replace with your WhatsApp number in international format, e.g. "5215551234567" (country + number, no plus)
const WHATSAPP_NUMBER = "50244949966"; // e.g. "5215551234567"
const WHATSAPP_LINK = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "https://wa.me/";
// Replace these profile URLs with your real ones
const LINKEDIN = "https://www.linkedin.com/in/wayner-alberto-lopez-y-lopez-099632353/";
const GITHUB = "https://github.com/waynergt";

const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Contacto desde tu portafolio"
)}&body=${encodeURIComponent("Hola Wayner,\n\nQuisiera contactarte acerca de...")}`;

const btnVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.06 * i, duration: 0.36 } }),
};

const Contact: React.FC = () => {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="min-h-[68vh] flex items-center">
          <div className="w-full py-16 flex flex-col items-center text-center gap-6">
            {/* NOTE: Decorative icon + pill removed as requested */}

            {/* Title */}
            <motion.h2
              id="contact-title"
              initial="hidden"
              animate="visible"
              variants={btnVariants}
              custom={1}
              className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100"
            >
              ¡Contáctame!
            </motion.h2>

            {/* Short description */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={btnVariants}
              custom={2}
              className="max-w-xl text-sm text-gray-600 dark:text-gray-300"
            >
              ¿Tienes una idea, propuesta o pregunta? Escríbeme por correo, WhatsApp o conéctate por redes.
              Respondo normalmente en 1–3 días hábiles.
            </motion.p>

            {/* Primary email button */}
            <motion.div initial="hidden" animate="visible" variants={btnVariants} custom={3} className="w-full">
              <a
                href={mailHref}
                aria-label={`Enviar correo a ${EMAIL}`}
                className="mx-auto mt-6 block max-w-md w-full rounded-full px-6 py-4 bg-white/5 hover:bg-white/8 text-left shadow-md transition focus:outline-none focus:ring-4 focus:ring-yellow-200/25"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#052235] flex items-center justify-center text-yellow-50">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{EMAIL}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Envíame un correo</div>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Stacked action buttons */}
            <div className="w-full max-w-sm mt-6 space-y-4">
              {/* WhatsApp (rendered only if WHATSAPP_NUMBER is set) */}
              {WHATSAPP_NUMBER ? (
                <motion.a
                  initial="hidden"
                  animate="visible"
                  variants={btnVariants}
                  custom={4}
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Enviar mensaje por WhatsApp"
                  className="block w-full rounded-full px-4 py-3 bg-white/5 hover:bg-white/8 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-green-200/20"
                >
                  <div className="flex items-center gap-4 justify-center">
                    <SiWhatsapp className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">WhatsApp</span>
                  </div>
                </motion.a>
              ) : null}

              <motion.a
                initial="hidden"
                animate="visible"
                variants={btnVariants}
                custom={5}
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                aria-label="Ver perfil de LinkedIn"
                className="block w-full rounded-full px-4 py-3 bg-white/5 hover:bg-white/8 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-yellow-200/15"
              >
                <div className="flex items-center gap-4 justify-center">
                  <SiLinkedin className="w-5 h-5 text-[#0b66c3]" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">LinkedIn</span>
                </div>
              </motion.a>

              <motion.a
                initial="hidden"
                animate="visible"
                variants={btnVariants}
                custom={6}
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                aria-label="Ver GitHub"
                className="block w-full rounded-full px-4 py-3 bg-white/5 hover:bg-white/8 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-yellow-200/15"
              >
                <div className="flex items-center gap-4 justify-center">
                  <SiGithub className="w-5 h-5 text-gray-900 dark:text-gray-100" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">GitHub</span>
                </div>
              </motion.a>
            </div>

            <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
              También disponible para llamadas o videollamadas — agenda o escribe si lo prefieres.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;