"use client";

import { Language } from "@/types";
import { t } from "@/lib/i18n";

interface Props {
  search: string;
  setSearch: (s: string) => void;
  lang: Language;
}

export default function SearchBar({ search, setSearch, lang }: Props) {
  return (
    <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--ink-3)",
          pointerEvents: "none",
        }}
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        className="search-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t(lang, "searchPlaceholder")}
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          aria-label="Clear"
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: 0,
            color: "var(--ink-3)",
            cursor: "pointer",
            padding: 6,
            lineHeight: 0,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
