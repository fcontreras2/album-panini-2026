"use client";

import { Sticker, FilterType } from "@/types";
import StickerCard from "./StickerCard";

interface Props {
  title: string;
  flag?: string;
  stickers: Sticker[];
  getCount: (id: string) => number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  filter: FilterType;
  search: string;
}

function matchesFilter(count: number, filter: FilterType): boolean {
  if (filter === "all") return true;
  if (filter === "have") return count === 1;
  if (filter === "missing") return count === 0;
  if (filter === "duplicate") return count >= 2;
  return true;
}

function matchesSearch(sticker: Sticker, search: string): boolean {
  if (!search) return true;
  const q = search.toLowerCase();
  return (
    sticker.name.toLowerCase().includes(q) ||
    sticker.code.toLowerCase().includes(q) ||
    sticker.teamName.toLowerCase().includes(q)
  );
}

export default function TeamSectionComponent({
  title,
  flag,
  stickers,
  getCount,
  onIncrement,
  onDecrement,
  filter,
  search,
}: Props) {
  const visible = stickers.filter((s) => {
    const count = getCount(s.id);
    return matchesFilter(count, filter) && matchesSearch(s, search);
  });

  if (visible.length === 0 && (filter !== "all" || search)) return null;

  const total = stickers.length;
  const have = stickers.filter((s) => getCount(s.id) >= 1).length;
  const pct = Math.round((have / total) * 100);
  const isComplete = pct === 100;

  return (
    <div className="mb-6">
      {/* Section header */}
      <div className="flex items-center gap-2.5 mb-3 px-0.5">
        {flag && <span className="text-xl leading-none">{flag}</span>}
        <h2
          className="font-display text-sm leading-none tracking-wide"
          style={{ color: "#e2e8f0" }}
        >
          {title.toUpperCase()}
        </h2>
        <div
          className="flex-1 h-[3px] rounded-full overflow-hidden mx-1"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: isComplete
                ? "linear-gradient(90deg, #16a34a, #4ade80)"
                : "linear-gradient(90deg, #f59e0b, #fcd34d)",
              boxShadow: isComplete
                ? "0 0 6px rgba(34,197,94,0.5)"
                : "0 0 6px rgba(251,191,36,0.4)",
            }}
          />
        </div>
        <span
          className="text-[10px] whitespace-nowrap font-mono"
          style={{ color: isComplete ? "#4ade80" : "#475569" }}
        >
          {have}/{total}
        </span>
      </div>

      {/* Sticker grid */}
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(54px, 1fr))" }}
      >
        {stickers.map((s) => {
          const count = getCount(s.id);
          const filtered =
            !matchesFilter(count, filter) || !matchesSearch(s, search);
          return (
            <StickerCard
              key={s.id}
              sticker={s}
              count={count}
              onIncrement={() => onIncrement(s.id)}
              onDecrement={() => onDecrement(s.id)}
              dimmed={filtered}
            />
          );
        })}
      </div>
    </div>
  );
}
