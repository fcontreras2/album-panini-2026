"use client";

import { AlbumStats, Language } from "@/types";
import { t } from "@/lib/i18n";

interface Props {
  stats: AlbumStats;
  lang: Language;
}

export default function StatsPanel({ stats, lang }: Props) {
  return (
    <div className="mb-4 space-y-2.5">
      {/* Progress bar */}
      <div
        className="rounded-xl p-3.5"
        style={{
          background: "rgba(15,23,42,0.7)",
          border: "1px solid rgba(251,191,36,0.1)",
        }}
      >
        <div className="flex items-baseline justify-between mb-2">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "#64748b" }}
          >
            {t(lang, "completed")}
          </span>
          <span className="font-display text-3xl leading-none text-gold">
            {stats.completionPct}%
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: "rgba(15,23,42,0.9)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${stats.completionPct}%`,
              background:
                stats.completionPct === 100
                  ? "linear-gradient(90deg, #16a34a 0%, #4ade80 100%)"
                  : "linear-gradient(90deg, #f59e0b 0%, #fcd34d 100%)",
              boxShadow:
                stats.completionPct === 100
                  ? "0 0 10px rgba(34,197,94,0.5)"
                  : "0 0 10px rgba(251,191,36,0.45)",
            }}
          />
        </div>
        <div className="text-[10px] mt-1.5" style={{ color: "#475569" }}>
          {stats.have} / {stats.total} {t(lang, "stickers")}
        </div>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-4 gap-2">
        <StatCard
          label={t(lang, "have")}
          value={stats.have}
          color="#4ade80"
          bg="rgba(22,163,74,0.1)"
          border="rgba(22,163,74,0.18)"
          index={0}
        />
        <StatCard
          label={t(lang, "missing")}
          value={stats.missing}
          color="#94a3b8"
          bg="rgba(100,116,139,0.1)"
          border="rgba(100,116,139,0.15)"
          index={1}
        />
        <StatCard
          label={t(lang, "duplicates")}
          value={stats.duplicates}
          color="#fbbf24"
          bg="rgba(251,191,36,0.08)"
          border="rgba(251,191,36,0.18)"
          index={2}
        />
        <StatCard
          label={t(lang, "total")}
          value={stats.total}
          color="#60a5fa"
          bg="rgba(96,165,250,0.08)"
          border="rgba(96,165,250,0.15)"
          index={3}
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  bg,
  border,
  index,
}: {
  label: string;
  value: number;
  color: string;
  bg: string;
  border: string;
  index: number;
}) {
  return (
    <div
      className="stat-animate rounded-xl p-2.5 text-center"
      style={{
        background: bg,
        border: `1px solid ${border}`,
        animationDelay: `${index * 0.06}s`,
      }}
    >
      <span
        className="font-display text-[22px] leading-none block"
        style={{ color }}
      >
        {value}
      </span>
      <span
        className="text-[9px] font-medium mt-1 block"
        style={{ color: "#64748b" }}
      >
        {label}
      </span>
    </div>
  );
}
