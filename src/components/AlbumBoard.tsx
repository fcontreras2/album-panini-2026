"use client";

import { AlbumState, FilterType, Language } from "@/types";
import { introStickers, teamSections, historyStickers } from "@/data/stickers";
import TeamSectionComponent from "./TeamSection";
import { t } from "@/lib/i18n";

interface Props {
  state: AlbumState;
  filter: FilterType;
  search: string;
  lang: Language;
  getCount: (id: string) => number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

export default function AlbumBoard({
  state,
  filter,
  search,
  lang,
  getCount,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <div className="space-y-2">
      <TeamSectionComponent
        title={t(lang, "intro")}
        flag="🌍"
        stickers={introStickers}
        getCount={getCount}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        filter={filter}
        search={search}
      />

      <div className="section-divider" />

      {teamSections.map((ts) => (
        <TeamSectionComponent
          key={ts.code}
          title={ts.name}
          flag={ts.flag}
          stickers={ts.stickers}
          getCount={getCount}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          filter={filter}
          search={search}
        />
      ))}

      <div className="section-divider" />

      <TeamSectionComponent
        title={t(lang, "history")}
        flag="🏆"
        stickers={historyStickers}
        getCount={getCount}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        filter={filter}
        search={search}
      />

      <div className="text-center py-8">
        <span
          className="text-[10px] font-medium tracking-[0.2em] uppercase"
          style={{ color: "#1e293b" }}
        >
          {t(lang, "leftClickAdd")} · {t(lang, "rightClickRemove")}
        </span>
      </div>
    </div>
  );
}
