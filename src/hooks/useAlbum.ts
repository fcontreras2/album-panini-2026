"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  AlbumState,
  AlbumStats,
  FilterType,
  Language,
  Theme,
  StatsLayout,
  SectionHeaderStyle,
  VisualPrefs,
} from "@/types";
import { allStickers } from "@/data/stickers";
import { loadAlbum, saveAlbum } from "@/lib/storage";

const PREFS_KEY = "album-panini-2026:prefs";

const defaultPrefs: VisualPrefs = {
  theme: "dark",
  statsLayout: "compact",
  sectionHeaderStyle: "minimal",
};

function loadPrefs(): VisualPrefs {
  if (typeof window === "undefined") return defaultPrefs;
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return defaultPrefs;
    return { ...defaultPrefs, ...(JSON.parse(raw) as Partial<VisualPrefs>) };
  } catch {
    return defaultPrefs;
  }
}

function savePrefs(prefs: VisualPrefs) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {}
}

export function useAlbum() {
  const [state, setState] = useState<AlbumState>({});
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [lang, setLang] = useState<Language>("es");
  const [prefs, setPrefs] = useState<VisualPrefs>(defaultPrefs);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    setState(loadAlbum());
    setPrefs(loadPrefs());
    const storedLang = (typeof window !== "undefined" &&
      (window.localStorage.getItem("album-lang") as Language)) || "es";
    setLang(storedLang);
    setHydrated(true);
  }, []);

  // Persist album
  useEffect(() => { if (hydrated) saveAlbum(state); }, [state, hydrated]);
  // Persist prefs
  useEffect(() => { if (hydrated) savePrefs(prefs); }, [prefs, hydrated]);
  // Persist lang
  useEffect(() => {
    if (hydrated && typeof window !== "undefined") {
      window.localStorage.setItem("album-lang", lang);
    }
  }, [lang, hydrated]);

  // Apply theme to <html>
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", prefs.theme);
    }
  }, [prefs.theme]);

  const getCount = useCallback((id: string) => state[id] ?? 0, [state]);

  const increment = useCallback((id: string) => {
    setState((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }));
  }, []);

  const decrement = useCallback((id: string) => {
    setState((p) => {
      const c = (p[id] ?? 0) - 1;
      const next = { ...p };
      if (c <= 0) delete next[id]; else next[id] = c;
      return next;
    });
  }, []);

  const markAll = useCallback((ids: string[]) => {
    setState((p) => {
      const next = { ...p };
      for (const id of ids) {
        if ((next[id] ?? 0) === 0) next[id] = 1;
      }
      return next;
    });
  }, []);

  const clearAll = useCallback((ids: string[]) => {
    setState((p) => {
      const next = { ...p };
      for (const id of ids) delete next[id];
      return next;
    });
  }, []);

  const reset = useCallback(() => setState({}), []);
  const importState = useCallback((s: AlbumState) => setState(s), []);
  const toggleLang = useCallback(() => setLang((l) => (l === "es" ? "en" : "es")), []);

  const setTheme = useCallback((theme: Theme) => setPrefs((p) => ({ ...p, theme })), []);
  const toggleTheme = useCallback(
    () => setPrefs((p) => ({ ...p, theme: p.theme === "dark" ? "light" : "dark" })),
    []
  );
  const setStatsLayout = useCallback((statsLayout: StatsLayout) => setPrefs((p) => ({ ...p, statsLayout })), []);
  const setSectionHeaderStyle = useCallback(
    (sectionHeaderStyle: SectionHeaderStyle) => setPrefs((p) => ({ ...p, sectionHeaderStyle })),
    []
  );

  const stats: AlbumStats = useMemo(() => {
    let have = 0, missing = 0, duplicates = 0;
    for (const s of allStickers) {
      const c = state[s.id] ?? 0;
      if (c === 0) missing++;
      else if (c === 1) have++;
      else { have++; duplicates += (c - 1); }
    }
    return {
      total: allStickers.length,
      have,
      missing,
      duplicates,
      completionPct: Math.round((have / allStickers.length) * 100),
    };
  }, [state]);

  return {
    state, filter, setFilter, search, setSearch, lang, toggleLang,
    hydrated, getCount, increment, decrement, markAll, clearAll, reset, importState, stats,
    prefs, setTheme, toggleTheme, setStatsLayout, setSectionHeaderStyle,
  };
}
