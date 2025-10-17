import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch (e) {
      // Si ocurre un error (por ejemplo en SSR o localStorage no disponible), devolvemos el valor inicial
      console.warn("useLocalStorage: read error", e);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      // Evitamos catch vacío: registramos el error para debugging
      console.warn("useLocalStorage: write error", e);
    }
  }, [key, state]);

  return [state, setState] as const;
}