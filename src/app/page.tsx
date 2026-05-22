"use client";

import { useAlbum } from "@/hooks/useAlbum";
import Header from "@/components/Header";
import StatsPanel from "@/components/StatsPanel";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import ImportExport from "@/components/ImportExport";
import AlbumBoard from "@/components/AlbumBoard";

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
  } = useAlbum();

  if (!hydrated) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-3"
        style={{ background: "#06080f" }}
      >
        <span className="text-4xl">⚽</span>
        <span
          className="font-display text-xl tracking-[0.3em]"
          style={{ color: "rgba(251,191,36,0.5)" }}
        >
          CARGANDO...
        </span>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Sticky header */}
      <div
        className="sticky top-0 z-50"
        style={{
          background: "rgba(6,8,15,0.92)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(251,191,36,0.1)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.7)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <Header lang={lang} onToggleLang={toggleLang} />
          <StatsPanel stats={stats} lang={lang} />
          <div className="flex flex-col sm:flex-row gap-2 pb-3">
            <div className="flex-1">
              <SearchBar search={search} setSearch={setSearch} lang={lang} />
            </div>
            <FilterBar filter={filter} setFilter={setFilter} lang={lang} />
          </div>
          <div className="pb-3">
            <ImportExport
              state={state}
              onImport={importState}
              onReset={reset}
              lang={lang}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <AlbumBoard
          state={state}
          filter={filter}
          search={search}
          lang={lang}
          getCount={getCount}
          onIncrement={increment}
          onDecrement={decrement}
        />
      </div>
    </main>
  );
}
