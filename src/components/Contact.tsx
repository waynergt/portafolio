import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FiMail, FiDownload, FiCalendar, FiCheck } from "react-icons/fi";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormState = { name: "", email: "", subject: "", message: "" };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const liveRef = useRef<HTMLDivElement | null>(null);

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Por favor ingresa tu nombre.";
    if (!form.email.trim()) e.email = "Por favor ingresa tu correo.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Correo inválido.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Escribe al menos 10 caracteres en el mensaje.";
    setErrors(e);
    // move focus to first error for accessibility
    if (Object.keys(e).length && liveRef.current) {
      liveRef.current.focus();
    }
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});
    try {
      // Simular envío. Aquí integrarías tu API real (sendgrid, serverless, etc.)
      await new Promise((r) => setTimeout(r, 900));
      setSent(true);
      setForm(initialForm);
      if (liveRef.current) {
        liveRef.current.textContent = "Mensaje enviado correctamente. Gracias.";
        liveRef.current.focus();
      }
    } catch {
      setErrors({ message: "Ocurrió un error enviando el mensaje. Intenta de nuevo." });
      if (liveRef.current) {
        liveRef.current.textContent = "Error al enviar el mensaje.";
        liveRef.current.focus();
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange<K extends keyof FormState>(k: K, v: string) {
    setForm((s) => ({ ...s, [k]: v }));
    setErrors((es) => ({ ...es, [k]: undefined }));
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/5 dark:bg-gray-900/35 backdrop-blur-sm border border-white/10 dark:border-gray-700/30 rounded-lg p-6 theme-transition">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="contact-title" className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Contáctame
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
                ¿Tienes una idea, proyecto o colaboración? Escríbeme o utiliza una de las vías alternativas. Respondo en 1–3 días hábiles.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">Disponibilidad</span>
              <div className="text-sm px-3 py-1 rounded-md bg-gray-100/60 dark:bg-gray-700/40 text-gray-700 dark:text-gray-100">
                Semanal
              </div>
            </div>
          </div>

          <motion.div
            className="mt-6 grid gap-4 grid-cols-1 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left column: form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <form onSubmit={handleSubmit} noValidate aria-describedby="contact-hint">
                <div className="bg-white/6 dark:bg-gray-900/30 backdrop-blur-sm border border-white/8 dark:border-gray-700/25 rounded-lg p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex flex-col">
                      <span className="text-xs text-gray-600 dark:text-gray-300 mb-1">Nombre</span>
                      <input
                        className={`rounded-md bg-white/3 dark:bg-gray-900/20 px-3 py-2 text-sm outline-none transition border ${
                          errors.name ? "border-red-400" : "border-transparent"
                        } focus:border-blue-400`}
                        value={form.name}
                        onChange={(ev) => handleChange("name", ev.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "err-name" : undefined}
                        required
                        type="text"
                        name="name"
                        autoComplete="name"
                      />
                      {errors.name && (
                        <span id="err-name" className="text-xs text-red-400 mt-1">
                          {errors.name}
                        </span>
                      )}
                    </label>

                    <label className="flex flex-col">
                      <span className="text-xs text-gray-600 dark:text-gray-300 mb-1">Correo</span>
                      <input
                        className={`rounded-md bg-white/3 dark:bg-gray-900/20 px-3 py-2 text-sm outline-none transition border ${
                          errors.email ? "border-red-400" : "border-transparent"
                        } focus:border-blue-400`}
                        value={form.email}
                        onChange={(ev) => handleChange("email", ev.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "err-email" : undefined}
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <span id="err-email" className="text-xs text-red-400 mt-1">
                          {errors.email}
                        </span>
                      )}
                    </label>
                  </div>

                  <label className="flex flex-col mt-3">
                    <span className="text-xs text-gray-600 dark:text-gray-300 mb-1">Asunto (opcional)</span>
                    <input
                      className="rounded-md bg-white/3 dark:bg-gray-900/20 px-3 py-2 text-sm outline-none transition border border-transparent focus:border-blue-400"
                      value={form.subject}
                      onChange={(ev) => handleChange("subject", ev.target.value)}
                      type="text"
                      name="subject"
                    />
                  </label>

                  <label className="flex flex-col mt-3">
                    <span className="text-xs text-gray-600 dark:text-gray-300 mb-1">Mensaje</span>
                    <textarea
                      className={`rounded-md bg-white/3 dark:bg-gray-900/20 px-3 py-2 text-sm outline-none transition border ${
                        errors.message ? "border-red-400" : "border-transparent"
                      } focus:border-blue-400 min-h-[120px] resize-vertical`}
                      value={form.message}
                      onChange={(ev) => handleChange("message", ev.target.value)}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "err-message" : undefined}
                      required
                      name="message"
                    />
                    {errors.message && (
                      <span id="err-message" className="text-xs text-red-400 mt-1">
                        {errors.message}
                      </span>
                    )}
                  </label>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <motion.span whileTap={{ scale: 0.96 }}>
                          {submitting ? "Enviando..." : "Enviar mensaje"}
                        </motion.span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setForm(initialForm)}
                        disabled={submitting}
                        className="text-xs px-3 py-1 rounded-md bg-white/6 dark:bg-gray-800/30 text-gray-700 dark:text-gray-100"
                      >
                        Limpiar
                      </button>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      También puedes usar email directo o agenda una llamada abajo.
                    </div>
                  </div>
                </div>
              </form>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mt-4"
                  >
                    <div className="flex items-center gap-3 rounded-md bg-emerald-600/90 text-white px-4 py-2 shadow">
                      <FiCheck className="w-5 h-5" />
                      <span className="text-sm">Gracias — tu mensaje ha sido enviado correctamente.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* aria-live region for screen readers */}
              <div
                ref={liveRef}
                tabIndex={-1}
                aria-live="polite"
                className="sr-only"
              />
            </motion.div>

            {/* Right column: alternative contact & quick actions */}
            <motion.aside variants={itemVariants} className="flex flex-col gap-3">
              <div className="bg-white/6 dark:bg-gray-900/30 backdrop-blur-sm border border-white/8 dark:border-gray-700/25 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Vías rápidas</h3>

                <ul className="mt-3 space-y-2">
                  <li>
                    <a
                      href="mailto:tu-email@ejemplo.com"
                      className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-100 px-2 py-2 rounded-md hover:bg-white/5 transition"
                    >
                      <FiMail className="w-5 h-5 text-blue-400" />
                      <span>tu-email@ejemplo.com</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="/ruta-a-cv.pdf"
                      download
                      className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-100 px-2 py-2 rounded-md hover:bg-white/5 transition"
                    >
                      <FiDownload className="w-5 h-5 text-emerald-400" />
                      <span>Descargar CV</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://calendly.com/tu-enlace" /* placeholder - reemplaza por enlace real */
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-100 px-2 py-2 rounded-md hover:bg-white/5 transition"
                    >
                      <FiCalendar className="w-5 h-5 text-pink-400" />
                      <span>Agendar llamada</span>
                    </a>
                  </li>
                </ul>

                <div className="mt-4 border-t border-white/6 pt-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Sígueme</p>
                  <div className="mt-2 flex items-center gap-3">
                    <a
                      href="https://github.com/waynergt"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="p-2 rounded-md hover:bg-white/5 transition"
                    >
                      <SiGithub className="w-5 h-5 text-gray-700 dark:text-gray-100" />
                    </a>
                    <a
                      href="https://linkedin.com/in/tu-perfil"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="p-2 rounded-md hover:bg-white/5 transition"
                    >
                      <SiLinkedin className="w-5 h-5 text-blue-600" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/6 dark:bg-gray-900/30 backdrop-blur-sm border border-white/8 dark:border-gray-700/25 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Info rápida</h3>
                <dl className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <div>
                    <dt className="sr-only">Tiempo de respuesta</dt>
                    <dd>Respuesta estimada: 1–3 días hábiles</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Ubicación</dt>
                    <dd>Basado en: {Intl.DateTimeFormat().resolvedOptions().timeZone}</dd>
                  </div>
                </dl>
              </div>
            </motion.aside>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;