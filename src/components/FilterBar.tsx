"use client";

import { FilterType, Language } from "@/types";
import { t } from "@/lib/i18n";

interface Props {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  lang: Language;
}

const FILTERS: FilterType[] = ["all", "have", "missing", "duplicate"];

const filterConfig: Record<
  FilterType,
  {
    key: "filterAll" | "filterHave" | "filterMissing" | "filterDuplicate";
    activeStyle: React.CSSProperties;
    dotColor: string;
  }
> = {
  all: {
    key: "filterAll",
    activeStyle: {
      background: "rgba(96,165,250,0.12)",
      border: "1px solid rgba(96,165,250,0.38)",
      color: "#93c5fd",
    },
    dotColor: "#60a5fa",
  },
  have: {
    key: "filterHave",
    activeStyle: {
      background: "rgba(34,197,94,0.12)",
      border: "1px solid rgba(34,197,94,0.38)",
      color: "#86efac",
    },
    dotColor: "#22c55e",
  },
  missing: {
    key: "filterMissing",
    activeStyle: {
      background: "rgba(100,116,139,0.12)",
      border: "1px solid rgba(100,116,139,0.35)",
      color: "#cbd5e1",
    },
    dotColor: "#94a3b8",
  },
  duplicate: {
    key: "filterDuplicate",
    activeStyle: {
      background: "rgba(251,191,36,0.1)",
      border: "1px solid rgba(251,191,36,0.38)",
      color: "#fcd34d",
    },
    dotColor: "#f59e0b",
  },
};

const inactiveStyle: React.CSSProperties = {
  background: "rgba(15,23,42,0.6)",
  border: "1px solid rgba(255,255,255,0.06)",
  color: "#475569",
};

export default function FilterBar({ filter, setFilter, lang }: Props) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {FILTERS.map((f) => {
        const conf = filterConfig[f];
        const isActive = filter === f;
        return (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150"
            style={isActive ? conf.activeStyle : inactiveStyle}
          >
            {isActive && (
              <span
                className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: conf.dotColor }}
              />
            )}
            {t(lang, conf.key)}
          </button>
        );
      })}
    </div>
  );
}
