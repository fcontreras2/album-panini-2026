"use client";

import { useMemo } from "react";
import { Sticker, FilterType, SectionHeaderStyle, TournamentGroup } from "@/types";
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
      <div className="app-grid" style={{ marginTop: sticky ? 12 : 0 }}>
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
