"use client";

import { FilterType, AlbumStats, Language } from "@/types";
import { t } from "@/lib/i18n";

interface Props {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  stats: AlbumStats;
  lang: Language;
}

export default function FilterBar({ filter, setFilter, stats, lang }: Props) {
  const FILTERS: { id: FilterType; label: string; count: number }[] = [
    { id: "all", label: t(lang, "filterAll"), count: stats.total },
    { id: "have", label: t(lang, "filterHave"), count: stats.have },
    { id: "missing", label: t(lang, "filterMissing"), count: stats.missing },
    { id: "duplicate", label: t(lang, "filterDuplicate"), count: stats.duplicates },
  ];
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {FILTERS.map((f) => (
        <button
          key={f.id}
          className="chip"
          data-active={filter === f.id}
          onClick={() => setFilter(f.id)}
        >
          {f.label}
          <span className="chip-count">{f.count}</span>
        </button>
      ))}
    </div>
  );
}
