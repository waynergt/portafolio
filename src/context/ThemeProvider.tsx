import React, { useEffect, type Dispatch, type SetStateAction } from "react";
import { ThemeContext } from "./themeUtils";
import type { Theme } from "./themeUtils";
import { useLocalStorage } from "../hooks/useLocalStorage";

const debug = false; // true si quieres logs

const applyClassToRoots = (shouldBeDark: boolean) => {
  const root = document.documentElement;
  const body = document.body;
  if (shouldBeDark) {
    root.classList.add("dark");
    body.classList.add("dark");
  } else {
    root.classList.remove("dark");
    body.classList.remove("dark");
  }
};

const getPrefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const computeShouldBeDark = (t: Theme) => t === "dark" || (t === "system" && getPrefersDark());

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "system");

  // Aplicar clase inicialmente y suscribirse si es 'system'
  useEffect(() => {
    if (typeof window === "undefined") return;
    const shouldBeDark = computeShouldBeDark(theme);
    if (debug) console.log("[ThemeProvider] apply theme:", theme, "-> dark:", shouldBeDark);
    applyClassToRoots(shouldBeDark);

    if (theme === "system" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => {
        const nowShould = computeShouldBeDark("system");
        if (debug) console.log("[ThemeProvider] system preference changed -> dark:", nowShould);
        applyClassToRoots(nowShould);
      };
      if (typeof mq.addEventListener === "function") {
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
      } else if (typeof mq.addListener === "function") {
        mq.addListener(handler);
        return () => mq.removeListener(handler);
      }
    }
    return;
  }, [theme]);

  const toggle = () => {
    // Usamos el setter original pero aplicamos la clase inmediatamente
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      const shouldBeDark = computeShouldBeDark(next);
      if (debug) console.log("[ThemeProvider] toggle ->", prev, "to", next, "dark:", shouldBeDark);
      applyClassToRoots(shouldBeDark);
      return next;
    });
  };

  // Creamos una función con la firma correcta: Dispatch<SetStateAction<Theme>>
  const setThemeAndApply: Dispatch<SetStateAction<Theme>> = (value) => {
    // value puede ser Theme o (prev => Theme)
    const nextTheme = typeof value === "function" ? (value as (prev: Theme) => Theme)(theme) : value;
    setTheme(nextTheme);
    const shouldBeDark = computeShouldBeDark(nextTheme);
    if (debug) console.log("[ThemeProvider] setThemeAndApply ->", nextTheme, "dark:", shouldBeDark);
    applyClassToRoots(shouldBeDark);
  };

  const isDark = computeShouldBeDark(theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeAndApply, toggle, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;