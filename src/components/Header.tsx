import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeUtils";

const navItems = [
  { id: "home", label: "Inicio", path: "/" },
  { id: "technologies", label: "Tecnologías", path: "/technologies" },
  { id: "experience", label: "Experiencia", path: "/experience" },
  { id: "tasks", label: "Tareas", path: "/tasks" },
  { id: "education", label: "Formación", path: "/education" },
  { id: "contact", label: "Contáctame", path: "/contact" },
];

const SunIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z" />
  </svg>
);

const MoonIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const MenuIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
);

const Header: React.FC = () => {
  // Desestructuramos solo lo que usamos para evitar warnings de ESLint/TS
  const { toggle, isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // cerrar menú al navegar
  const onNavigate = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  // close on click outside (for desktop small popover safety)
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!open) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate("/")}
                aria-label="Ir a inicio"
                className="flex items-center gap-2"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                  WR
                </div>
                <span className="hidden md:inline-block text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Wayne RGT
                </span>
              </button>
            </div>

            {/* Nav - desktop */}
            <nav className="hidden lg:flex lg:items-center lg:gap-6">
              {navItems.map((n) => (
                <NavLink
                  key={n.id}
                  to={n.path}
                  className={({ isActive }) =>
                    `relative text-sm px-2 py-1 transition-colors duration-150 ${
                      isActive
                        ? "text-gray-900 dark:text-white font-semibold"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`
                  }
                  end={n.path === "/"}
                >
                  {({ isActive }) => (
                    <>
                      <span>{n.label}</span>
                      {/* underline animated */}
                      <span
                        aria-hidden
                        className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* actions: theme toggle + CTA + mobile menu button */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={toggle}
                  aria-label="Alternar tema"
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-200"
                >
                  {isDark ? <MoonIcon /> : <SunIcon />}
                </button>

                <button
                  onClick={() => onNavigate("/contact")}
                  className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-sm transition"
                >
                  Contáctame
                </button>
              </div>

              {/* mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setOpen((s) => !s)}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  aria-label={open ? "Cerrar menú" : "Abrir menú"}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-200"
                >
                  {open ? <CloseIcon /> : <MenuIcon />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`lg:hidden fixed inset-0 z-50 transform transition-all duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* panel */}
        <div
          className={`relative max-w-md w-full h-full bg-white dark:bg-gray-900 shadow-xl border-l dark:border-l-gray-800 transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ marginLeft: "auto" }}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold">
                  WR
                </div>
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">Wayne RGT</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-200"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex-1">
              <ul className="space-y-4">
                {navItems.map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => onNavigate(n.path)}
                      className="w-full text-left px-3 py-2 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggle()}
                  className="flex-0 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-200"
                >
                  {isDark ? <MoonIcon /> : <SunIcon />}
                </button>
                <button
                  onClick={() => onNavigate("/contact")}
                  className="flex-1 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                  Contáctame
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Wayne RGT
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;