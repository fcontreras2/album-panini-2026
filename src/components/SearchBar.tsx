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
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
        style={{ color: "#475569" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t(lang, "searchPlaceholder")}
        className="search-input w-full pl-9 pr-8 py-2 text-sm font-medium rounded-lg"
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-150"
          style={{ color: "#475569", fontSize: "11px" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#cbd5e1")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
        >
          ✕
        </button>
      )}
    </div>
  );
}
