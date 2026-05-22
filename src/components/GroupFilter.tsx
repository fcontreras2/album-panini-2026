"use client";

import { GroupFilter, Language, TournamentGroup } from "@/types";
import { GROUP_ORDER } from "@/data/groups";
import { t } from "@/lib/i18n";

interface Props {
  value: GroupFilter;
  onChange: (v: GroupFilter) => void;
  lang: Language;
  /** Optional progress per group, formatted as e.g. "23/80" */
  progress?: Partial<Record<TournamentGroup, string>>;
}

export default function GroupFilterBar({ value, onChange, lang, progress }: Props) {
  return (
    <div
      className="chip-scroll-row"
      role="tablist"
      aria-label={t(lang, "group")}
    >
      <button
        className="chip chip-conf"
        data-active={value === "all"}
        onClick={() => onChange("all")}
        role="tab"
        aria-selected={value === "all"}
      >
        <span className="chip-conf-dot" style={{ background: "var(--ink-3)" }} />
        {t(lang, "groupAll")}
      </button>
      {GROUP_ORDER.map((g) => (
        <button
          key={g}
          className={`chip chip-conf chip-group grp-${g}`}
          data-active={value === g}
          onClick={() => onChange(g)}
          role="tab"
          aria-selected={value === g}
          title={`${t(lang, "groupShort")} ${g}`}
        >
          <span className="chip-conf-dot" />
          <span className="chip-group-letter">{g}</span>
          {progress?.[g] && <span className="chip-count">{progress[g]}</span>}
        </button>
      ))}
    </div>
  );
}
