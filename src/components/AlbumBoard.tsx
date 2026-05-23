"use client";

import {
  AlbumState,
  FilterType,
  Language,
  SectionHeaderStyle,
  GroupFilter,
} from "@/types";
import { introStickers, teamSections, historyStickers } from "@/data/stickers";
import { getGroup } from "@/data/groups";
import TeamSectionComponent from "./TeamSection";
import { t } from "@/lib/i18n";

interface Props {
  state: AlbumState;
  filter: FilterType;
  search: string;
  lang: Language;
  sectionHeaderStyle: SectionHeaderStyle;
  groupFilter: GroupFilter;
  getCount: (id: string) => number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onMarkAll: (ids: string[]) => void;
  onClearAll: (ids: string[]) => void;
}

export default function AlbumBoard({
  state,
  filter,
  search,
  lang,
  sectionHeaderStyle,
  groupFilter,
  getCount,
  onIncrement,
  onDecrement,
  onMarkAll,
  onClearAll,
}: Props) {
  const showIntroHistory = groupFilter === "all";

  return (
    <div>
      {showIntroHistory && (
        <TeamSectionComponent
          title={t(lang, "intro")}
          code="FWC"
          flag="🌎"
          meta={t(lang, "introMeta")}
          kicker="01"
          stickers={introStickers}
          getCount={getCount}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          filter={filter}
          search={search}
          sectionHeaderStyle={sectionHeaderStyle}
          group={null}
          sticky
        />
      )}

      {teamSections.map((ts, i) => {
        const grp = getGroup(ts.code);
        if (groupFilter !== "all" && grp !== groupFilter) return null;
        return (
          <TeamSectionComponent
            key={ts.code}
            title={ts.name}
            code={ts.code}
            flag={ts.flag}
            kicker={String(i + 2).padStart(2, "0")}
            stickers={ts.stickers}
            getCount={getCount}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onMarkAll={onMarkAll}
            onClearAll={onClearAll}
            lang={lang}
            filter={filter}
            search={search}
            sectionHeaderStyle={sectionHeaderStyle}
            group={grp}
            sticky
          />
        );
      })}

      {showIntroHistory && (
        <TeamSectionComponent
          title={t(lang, "history")}
          code="HIS"
          flag="🏆"
          meta={t(lang, "historyMeta")}
          kicker={String(teamSections.length + 2).padStart(2, "0")}
          stickers={historyStickers}
          getCount={getCount}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          filter={filter}
          search={search}
          sectionHeaderStyle={sectionHeaderStyle}
          group={null}
          sticky
        />
      )}

      <footer
        style={{
          marginTop: 60,
          paddingTop: 24,
          borderTop: "1px solid var(--hairline-2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div
          className="font-mono"
          style={{ fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-3)" }}
        >
          {t(lang, "leftClickHint")}
        </div>
        <div className="font-serif" style={{ fontSize: 13, fontStyle: "italic", color: "var(--ink-3)" }}>
          {t(lang, "footerNote")}
        </div>
      </footer>
    </div>
  );
}
