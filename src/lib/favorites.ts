import { useEffect, useState, useCallback } from "react";

const KEY = "ireme-favorites";
const EVT = "ireme-favorites-change";

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => {
    const read = () => {
      try {
        setFavs(JSON.parse(localStorage.getItem(KEY) || "[]"));
      } catch {
        setFavs([]);
      }
    };
    read();
    window.addEventListener(EVT, read);
    return () => window.removeEventListener(EVT, read);
  }, []);
  const toggle = useCallback((slug: string) => {
    let cur: string[] = [];
    try {
      cur = JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      /* ignore */
    }
    const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVT));
  }, []);
  return { favs, toggle, isFav: (s: string) => favs.includes(s) };
}
