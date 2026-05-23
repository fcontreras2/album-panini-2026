"use client";

import { useEffect, useRef, useState } from "react";
import { useAlbum } from "@/hooks/useAlbum";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import ImportExport from "@/components/ImportExport";
import AlbumBoard from "@/components/AlbumBoard";
import GroupFilterBar from "@/components/GroupFilter";
import { AlbumStats, Language, SectionHeaderStyle, GroupFilter } from "@/types";
import { teamSections } from "@/data/stickers";
import { getGroup, GROUP_ORDER } from "@/data/groups";
import { t } from "@/lib/i18n";

const NEXT_SECTION_STYLE: Record<SectionHeaderStyle, SectionHeaderStyle> = {
  minimal: "chip",
  chip: "banner",
  banner: "minimal",
};

export default function Home() {
  const {
    state,
    filter,
    setFilter,
    search,
    setSearch,
    lang,
    toggleLang,
    hydrated,
    getCount,
    increment,
    decrement,
    markAll,
    clearAll,
    reset,
    importState,
    stats,
    prefs,
    toggleTheme,
    setSectionHeaderStyle,
  } = useAlbum();

  const [grpFilter, setGrpFilter] = useState<GroupFilter>("all");
  const [scrolled, setScrolled] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Collapse hero on scroll (mobile only)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track sticky toolbar height so section headers pin just below it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = toolbarRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty("--toolbar-h", el.offsetHeight + "px");
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [hydrated]);

  // Close panel on Escape key
  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen]);

  // Prevent body scroll when mobile panel is open
  useEffect(() => {
    if (panelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [panelOpen]);

  // Per-group progress for filter chip badges
  const grpProgress: Partial<Record<GroupFilter, string>> = {};
  const totals: Partial<Record<string, { have: number; total: number }>> = {};
  for (const g of GROUP_ORDER) totals[g] = { have: 0, total: 0 };
  for (const ts of teamSections) {
    const g = getGroup(ts.code);
    if (!g) continue;
    const acc = totals[g]!;
    for (const s of ts.stickers) {
      acc.total++;
      if ((getCount(s.id) ?? 0) >= 1) acc.have++;
    }
  }
  for (const g of GROUP_ORDER) {
    const v = totals[g]!;
    grpProgress[g] = `${v.have}/${v.total}`;
  }

  if (!hydrated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          background: "var(--bg)",
        }}
      >
        <span style={{ fontSize: 24 }}>✦</span>
        <span
          className="font-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "var(--ink-3)",
            textTransform: "uppercase",
          }}
        >
          Cargando…
        </span>
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* ── Mobile overlay ── */}
      {panelOpen && (
        <div
          className="left-panel-overlay"
          onClick={() => setPanelOpen(false)}
        />
      )}

      {/* ════════════════════════════════════════
          LEFT PANEL — Stats + Actions + Trade
          ════════════════════════════════════════ */}
      <aside className={`left-panel${panelOpen ? " left-panel--open" : ""}`}>
        <div className="left-panel-inner">

          {/* Top bar — logo + close on mobile */}
          <div className="left-panel-topbar">
            <span
              className="font-mono"
              style={{
                fontSize: 8.5,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              ✦ FIFA 2026
            </span>
            <button
              className="left-panel-close-btn"
              onClick={() => setPanelOpen(false)}
              aria-label="Cerrar panel"
            >
              ✕
            </button>
          </div>

          {/* ── Sección: Stats ── */}
          <div className="left-panel-section">
            <div className="left-panel-section-label">
              {lang === "es" ? "Progreso" : "Progress"}
            </div>
            <SidebarStats stats={stats} lang={lang} />
          </div>

          <div className="left-panel-divider" />

          {/* ── Sección: Import / Export / QR / Reset + Trade ── */}
          <div className="left-panel-section">
            <div className="left-panel-section-label">
              {lang === "es" ? "Acciones · Trade" : "Actions · Trade"}
            </div>
            <ImportExport
              state={state}
              onImport={importState}
              onReset={reset}
              lang={lang}
            />
          </div>

          {/* ── Hint: controles de teclado/mouse — pegado al fondo ── */}
          <div style={{ marginTop: "auto", paddingTop: 24 }}>
            <div
              style={{
                borderTop: "1px solid var(--hairline-2)",
                paddingTop: 14,
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: 8.5,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink-4)",
                  lineHeight: 1.9,
                }}
              >
                <div>
                  <span style={{ color: "var(--have)", opacity: 0.8 }}>●</span>
                  &nbsp;{lang === "es" ? "Click izq." : "Left click"}&nbsp;&nbsp;+1
                </div>
                <div>
                  <span style={{ color: "var(--ink-3)", opacity: 0.8 }}>●</span>
                  &nbsp;{lang === "es" ? "Click der." : "Right click"}&nbsp;&nbsp;−1
                </div>
                <div>
                  <span style={{ color: "var(--gold)", opacity: 0.8 }}>●</span>
                  &nbsp;Shift+click&nbsp;&nbsp;−1
                </div>
                <div style={{ marginTop: 6, color: "var(--ink-4)" }}>
                  <span style={{ color: "var(--ink-3)", opacity: 0.8 }}>●</span>
                  &nbsp;{lang === "es" ? "Mantén presionado −1" : "Long press −1"}
                </div>
              </div>
            </div>
          </div>

        </div>
      </aside>

      {/* ── Mobile hamburger FAB ── */}
      <button
        className="hamburger-btn"
        onClick={() => setPanelOpen(true)}
        aria-label="Abrir panel de estadísticas y acciones"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {/* ════════════════════════════════════════
          RIGHT PANEL — Header + Album
          ════════════════════════════════════════ */}
      <div className="right-panel">

        {/* Sticky top bar — header + search + filters */}
        <div className={`sticky-hdr${scrolled ? " hdr-scrolled" : ""}`} ref={toolbarRef}>
          <div className="right-panel-shell">

            {/* Hero zone — collapses on mobile when user scrolls */}
            <div className="hdr-hero">
              <Header
                lang={lang}
                theme={prefs.theme}
                onToggleLang={toggleLang}
                onToggleTheme={toggleTheme}
                sectionHeaderStyle={prefs.sectionHeaderStyle}
                onCycleSectionStyle={() => setSectionHeaderStyle(NEXT_SECTION_STYLE[prefs.sectionHeaderStyle])}
              />
            </div>

            {/* Controls — always visible */}
            <div className="hdr-controls">
              <div className="app-toolbar">
                <SearchBar search={search} setSearch={setSearch} lang={lang} />
                <FilterBar filter={filter} setFilter={setFilter} stats={stats} lang={lang} />
              </div>
              <GroupFilterBar
                value={grpFilter}
                onChange={setGrpFilter}
                lang={lang}
                progress={grpProgress}
              />
            </div>

          </div>
        </div>

        {/* Album board */}
        <div className="right-panel-content">
          <AlbumBoard
            state={state}
            filter={filter}
            search={search}
            lang={lang}
            sectionHeaderStyle={prefs.sectionHeaderStyle}
            groupFilter={grpFilter}
            getCount={getCount}
            onIncrement={increment}
            onDecrement={decrement}
            onMarkAll={markAll}
            onClearAll={clearAll}
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SIDEBAR STATS — compact vertical layout for left panel
   ══════════════════════════════════════════════════════════════ */

function SidebarStats({ stats, lang }: { stats: AlbumStats; lang: Language }) {
  const R = 42;
  const C = 2 * Math.PI * R;
  const offset = C - (C * stats.completionPct) / 100;
  const complete = stats.completionPct >= 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Ring + progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* Ring */}
        <div style={{ position: "relative", width: 96, height: 96, flexShrink: 0 }}>
          <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="48" cy="48" r={R} fill="none" strokeWidth="5" className="ring-track" />
            <circle
              cx="48"
              cy="48"
              r={R}
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              className="ring-fill"
              strokeDasharray={C}
              strokeDashoffset={offset}
              style={{
                stroke: complete ? "var(--have)" : "var(--gold)",
                filter: `drop-shadow(0 0 6px ${complete ? "rgba(130,181,138,0.5)" : "rgba(212,168,87,0.4)"})`,
              }}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="font-display tabular text-gold"
              style={{ fontSize: 30, lineHeight: 0.9 }}
              key={stats.completionPct}
            >
              {stats.completionPct}
              <span style={{ fontSize: 13, color: "var(--ink-3)" }}>%</span>
            </span>
          </div>
        </div>

        {/* Progress bar + counts */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            className="font-mono"
            style={{
              fontSize: 8,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              marginBottom: 8,
            }}
          >
            {t(lang, "progress")}
          </div>
          <div style={{ height: 3, background: "var(--hairline-2)", borderRadius: 2, overflow: "hidden", marginBottom: 8 }}>
            <div
              style={{
                width: `${stats.completionPct}%`,
                height: "100%",
                background: complete
                  ? "linear-gradient(90deg, var(--have-deep), var(--have))"
                  : "linear-gradient(90deg, var(--gold-deep) 0%, var(--gold) 60%, var(--gold-light) 100%)",
                boxShadow: complete
                  ? "0 0 6px rgba(130,181,138,0.5)"
                  : "0 0 6px rgba(212,168,87,0.45)",
                transition: "width 0.8s cubic-bezier(0.2,0.8,0.2,1)",
                borderRadius: 2,
              }}
            />
          </div>
          <div
            className="font-mono tabular"
            style={{ fontSize: 9.5, color: "var(--ink-3)" }}
          >
            <span style={{ color: "var(--ink)" }}>{stats.have}</span> / {stats.total}
          </div>
          <div
            className="font-mono tabular"
            style={{ fontSize: 9, color: "var(--ink-3)", marginTop: 3 }}
          >
            {stats.total - stats.have} {t(lang, "toFind")}
          </div>
        </div>
      </div>

      {/* Three metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <SidebarMetric label={t(lang, "have")} value={stats.have} color="var(--have)" />
        <SidebarMetric label={t(lang, "missing")} value={stats.missing} color="var(--ink-2)" />
        <SidebarMetric label={t(lang, "duplicates")} value={stats.duplicates} color="var(--gold)" />
      </div>

    </div>
  );
}

function SidebarMetric({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <div
        className="font-mono"
        style={{
          fontSize: 7.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
          lineHeight: 1,
        }}
      >
        {label}
      </div>
      <div
        className="font-display tabular"
        style={{ fontSize: 28, lineHeight: 0.9, color }}
      >
        {value}
      </div>
    </div>
  );
}
