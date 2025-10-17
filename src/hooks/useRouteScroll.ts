import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Mapea pathname -> id de sección. Ajusta si cambias rutas.
 */
const pathToId = (pathname: string) => {
  if (pathname === "/" || pathname === "") return "home";
  // si la ruta es "/technologies" devolvemos "technologies", etc.
  return pathname.replace(/^\//, "");
};

export function useRouteScroll() {
  const location = useLocation();

  useEffect(() => {
    // Wait a tick to ensure DOM layout finished (helps con snap/min-height)
    const id = pathToId(location.pathname);
    if (!id) return;

    // Delay pequeño para que, si el contenido se monta async, se espere.
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        // Usa scrollIntoView respetando scroll-margin-top o variable --header-height
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // si no existe, como fallback, scrollear al top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 80);

    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);
}