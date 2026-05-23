"use client";

import { useMemo } from "react";
import { Sticker, FilterType, Language, SectionHeaderStyle, TournamentGroup } from "@/types";
import StickerCard from "./StickerCard";
import SectionHeader from "./SectionHeader";

interface Props {
  title: string;
  code: string;
  flag?: string;
  meta?: string;
  kicker?: string;
  stickers: Sticker[];
  getCount: (id: string) => number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  filter: FilterType;
  search: string;
  sectionHeaderStyle: SectionHeaderStyle;
  group?: TournamentGroup | null;
  sticky?: boolean;
  lang?: Language;
  onMarkAll?: (ids: string[]) => void;
  onClearAll?: (ids: string[]) => void;
}

function matchesFilter(count: number, filter: FilterType): boolean {
  if (filter === "all") return true;
  if (filter === "have") return count === 1;
  if (filter === "missing") return count === 0;
  if (filter === "duplicate") return count >= 2;
  return true;
}

function matchesSearch(sticker: Sticker, search: string): boolean {
  const q = search.trim().toLowerCase();
  if (!q) return true;
  return (
    sticker.name.toLowerCase().includes(q) ||
    sticker.code.toLowerCase().includes(q) ||
    sticker.teamName.toLowerCase().includes(q)
  );
}

export default function TeamSectionComponent({
  title,
  code,
  flag,
  meta,
  kicker,
  stickers,
  getCount,
  onIncrement,
  onDecrement,
  filter,
  search,
  sectionHeaderStyle,
  group,
  sticky = true,
  lang = "es",
  onMarkAll,
  onClearAll,
}: Props) {
  const visible = useMemo(() => {
    return stickers.filter((s) => {
      const c = getCount(s.id);
      return matchesFilter(c, filter) && matchesSearch(s, search);
    });
  }, [stickers, getCount, filter, search]);

  if (visible.length === 0 && (filter !== "all" || search)) return null;

  const have = stickers.filter((s) => getCount(s.id) >= 1).length;

  return (
    <section style={{ marginBottom: 36 }}>
      <SectionHeader
        style={sectionHeaderStyle}
        code={code}
        name={title}
        flag={flag}
        meta={meta}
        kicker={kicker}
        have={have}
        total={stickers.length}
        group={group}
        sticky={sticky}
      />
      {(onMarkAll || onClearAll) && (
        <div style={{ display: "flex", gap: 6, marginTop: sticky ? 8 : 4, marginBottom: 8 }}>
          {onMarkAll && (
            <button
              onClick={() => onMarkAll(stickers.map((s) => s.id))}
              style={{
                fontSize: 9,
                padding: "2px 9px",
                borderRadius: 4,
                border: "1px solid rgba(130,181,138,0.35)",
                background: "color-mix(in oklab, var(--have) 8%, transparent)",
                color: "var(--have)",
                cursor: "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 600,
                transition: "background 0.12s, border-color 0.12s",
              }}
            >
              {lang === "es" ? "✓ Marcar todos" : "✓ Mark all"}
            </button>
          )}
          {onClearAll && (
            <button
              onClick={() => onClearAll(stickers.map((s) => s.id))}
              style={{
                fontSize: 9,
                padding: "2px 9px",
                borderRadius: 4,
                border: "1px solid var(--hairline-3)",
                background: "transparent",
                color: "var(--ink-3)",
                cursor: "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 600,
                transition: "background 0.12s, border-color 0.12s",
              }}
            >
              {lang === "es" ? "✕ Borrar todos" : "✕ Clear all"}
            </button>
          )}
        </div>
      )}
      <div className="app-grid" style={{ marginTop: (onMarkAll || onClearAll) ? 0 : sticky ? 12 : 0 }}>
        {stickers.map((s) => {
          const c = getCount(s.id);
          const dimmed = !matchesFilter(c, filter) || !matchesSearch(s, search);
          return (
            <StickerCard
              key={s.id}
              sticker={s}
              count={c}
              dimmed={dimmed}
              onIncrement={() => onIncrement(s.id)}
              onDecrement={() => onDecrement(s.id)}
            />
          );
        })}
      </div>
    </section>
  );
}
