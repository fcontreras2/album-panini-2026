"use client";

import { useEffect, useRef, useState } from "react";
import { useAlbum } from "@/hooks/useAlbum";
import Header from "@/components/Header";
import StatsPanel from "@/components/StatsPanel";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import ImportExport from "@/components/ImportExport";
import AlbumBoard from "@/components/AlbumBoard";
import GroupFilterBar from "@/components/GroupFilter";
import { StatsLayout, SectionHeaderStyle, GroupFilter } from "@/types";
import { teamSections } from "@/data/stickers";
import { getGroup, GROUP_ORDER } from "@/data/groups";

const NEXT_STATS_LAYOUT: Record<StatsLayout, StatsLayout> = {
  compact: "extended",
  extended: "ring",
  ring: "compact",
};

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
    reset,
    importState,
    stats,
    prefs,
    toggleTheme,
    setStatsLayout,
    setSectionHeaderStyle,
  } = useAlbum();

  const [grpFilter, setGrpFilter] = useState<GroupFilter>("all");
  const [scrolled, setScrolled] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Collapse hero on scroll (mobile only — CSS hides it on desktop regardless)
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
    <main style={{ minHeight: "100vh" }}>
      <div className={`sticky-hdr${scrolled ? " hdr-scrolled" : ""}`} ref={toolbarRef}>
        <div className="app-shell">
          {/* Hero zone — collapses on mobile when user scrolls */}
          <div className="hdr-hero">
            <Header
              lang={lang}
              theme={prefs.theme}
              onToggleLang={toggleLang}
              onToggleTheme={toggleTheme}
            />
            <StatsPanel
              stats={stats}
              layout={prefs.statsLayout}
              lang={lang}
              onCycleLayout={() => setStatsLayout(NEXT_STATS_LAYOUT[prefs.statsLayout])}
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
            <ImportExport state={state} onImport={importState} onReset={reset} lang={lang} />
          </div>

          <div className="app-section-cycler">
            <button
              onClick={() => setSectionHeaderStyle(NEXT_SECTION_STYLE[prefs.sectionHeaderStyle])}
              className="btn-ghost"
              title="Cycle section header style"
              style={{ fontSize: 9.5, letterSpacing: "0.12em", color: "var(--ink-3)" }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
              SECTION · {prefs.sectionHeaderStyle.toUpperCase()}
            </button>
          </div>
        </div>
      </div>

      <div className="app-content">
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
        />
      </div>
    </main>
  );
}
