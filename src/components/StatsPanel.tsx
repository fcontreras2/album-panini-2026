"use client";

import { AlbumStats, Language, StatsLayout } from "@/types";
import { t } from "@/lib/i18n";

interface Props {
  stats: AlbumStats;
  layout: StatsLayout;
  lang: Language;
  onCycleLayout?: () => void;
}

export default function StatsPanel({ stats, layout, lang, onCycleLayout }: Props) {
  if (layout === "ring") return <StatsRing stats={stats} lang={lang} onCycleLayout={onCycleLayout} />;
  if (layout === "extended") return <StatsExtended stats={stats} lang={lang} onCycleLayout={onCycleLayout} />;
  return <StatsCompact stats={stats} lang={lang} onCycleLayout={onCycleLayout} />;
}

function LayoutCycler({ onClick }: { onClick?: () => void }) {
  if (!onClick) return null;
  return (
    <button
      onClick={onClick}
      className="btn-ghost"
      title="Cycle stats layout"
      style={{ marginLeft: "auto", alignSelf: "flex-start", fontSize: 9.5, letterSpacing: "0.12em" }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
      LAYOUT
    </button>
  );
}

function StatsCompact({ stats, lang, onCycleLayout }: { stats: AlbumStats; lang: Language; onCycleLayout?: () => void }) {
  return (
    <section className="hairline-y" style={{ padding: "20px 0", position: "relative" }}>
      <div className="app-stats-compact">
        <div>
          <Kicker>{t(lang, "completed")}</Kicker>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span
              className="font-display num-in tabular text-gold app-hero-num"
              key={stats.completionPct}
            >
              {stats.completionPct}
            </span>
            <span className="font-serif" style={{ fontSize: 24, color: "var(--ink-3)", fontStyle: "italic" }}>%</span>
          </div>
        </div>

        <div>
          <ProgressLine pct={stats.completionPct} />
          <div
            className="font-mono tabular"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              fontSize: 10.5,
              color: "var(--ink-3)",
            }}
          >
            <span>
              <span style={{ color: "var(--ink)" }}>{stats.have}</span> / {stats.total} {t(lang, "stickers")}
            </span>
            <span>{stats.total - stats.have} {t(lang, "toFind")}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, flexShrink: 0 }}>
          <MetricInline label={t(lang, "have")} value={stats.have} color="var(--have)" />
          <MetricInline label={t(lang, "missing")} value={stats.missing} color="var(--ink-2)" />
          <MetricInline label={t(lang, "duplicates")} value={stats.duplicates} color="var(--gold)" />
        </div>
      </div>
      <div style={{ position: "absolute", top: 8, right: 0 }}>
        <LayoutCycler onClick={onCycleLayout} />
      </div>
    </section>
  );
}

function StatsExtended({ stats, lang, onCycleLayout }: { stats: AlbumStats; lang: Language; onCycleLayout?: () => void }) {
  const cards = [
    { label: t(lang, "have"), value: stats.have, color: "var(--have)", bg: "var(--have-bg)", border: "rgba(130,181,138,0.22)" },
    { label: t(lang, "missing"), value: stats.missing, color: "var(--ink-2)", bg: "var(--miss-bg)", border: "var(--hairline-3)" },
    { label: t(lang, "duplicates"), value: stats.duplicates, color: "var(--gold)", bg: "var(--dup-bg)", border: "rgba(232,200,133,0.25)" },
    { label: t(lang, "total"), value: stats.total, color: "var(--info)", bg: "var(--info-bg)", border: "rgba(138,169,214,0.20)" },
  ];

  return (
    <section className="hairline-y" style={{ padding: "20px 0", position: "relative" }}>
      <div className="app-stats-extended-top">
        <div>
          <Kicker>{t(lang, "completed")}</Kicker>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span
              className="font-display num-in tabular text-gold"
              style={{ fontSize: 86, lineHeight: 0.85, letterSpacing: "-0.01em" }}
              key={stats.completionPct}
            >
              {stats.completionPct}
            </span>
            <span className="font-serif" style={{ fontSize: 22, color: "var(--ink-3)", fontStyle: "italic" }}>%</span>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 220, maxWidth: 480 }}>
          <ProgressLine pct={stats.completionPct} />
          <div
            className="font-mono tabular"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              fontSize: 10.5,
              color: "var(--ink-3)",
            }}
          >
            <span>
              <span style={{ color: "var(--ink)" }}>{stats.have}</span> / {stats.total} {t(lang, "stickers")}
            </span>
            <span>{stats.total - stats.have} {t(lang, "toFind")}</span>
          </div>
        </div>
      </div>

      <div className="app-stats-extended-cards">
        {cards.map((c, i) => (
          <div
            key={c.label}
            className="fade-up"
            style={{
              padding: "14px 14px 12px",
              background: c.bg,
              border: `1px solid ${c.border}`,
              borderRadius: "var(--radius)",
              animationDelay: `${i * 0.06}s`,
            }}
          >
            <Kicker style={{ fontSize: 9, marginBottom: 6 }}>{c.label}</Kicker>
            <div className="font-display tabular" style={{ fontSize: 36, lineHeight: 0.9, color: c.color }}>
              {c.value}
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", top: 8, right: 0 }}>
        <LayoutCycler onClick={onCycleLayout} />
      </div>
    </section>
  );
}

function StatsRing({ stats, lang, onCycleLayout }: { stats: AlbumStats; lang: Language; onCycleLayout?: () => void }) {
  const R = 60;
  const C = 2 * Math.PI * R;
  const offset = C - (C * stats.completionPct) / 100;
  const complete = stats.completionPct >= 100;
  return (
    <section className="hairline-y" style={{ padding: "22px 0", position: "relative" }}>
      <div className="app-stats-ring">
        <div style={{ position: "relative", width: 152, height: 152, flexShrink: 0 }}>
          <svg width="152" height="152" viewBox="0 0 152 152" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="76" cy="76" r={R} fill="none" strokeWidth="6" className="ring-track" />
            <circle
              cx="76"
              cy="76"
              r={R}
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className="ring-fill"
              strokeDasharray={C}
              strokeDashoffset={offset}
              style={{
                stroke: complete ? "var(--have)" : "var(--gold)",
                filter: `drop-shadow(0 0 8px ${complete ? "rgba(130,181,138,0.5)" : "rgba(212,168,87,0.4)"})`,
              }}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="font-display tabular text-gold" style={{ fontSize: 48, lineHeight: 0.9 }}>
              {stats.completionPct}
              <span style={{ fontSize: 22, color: "var(--ink-3)" }}>%</span>
            </span>
            <Kicker style={{ fontSize: 8.5, marginTop: 2 }}>{t(lang, "completed")}</Kicker>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 240 }}>
          <Kicker style={{ marginBottom: 10 }}>{t(lang, "progress")}</Kicker>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
            <RingRow label={t(lang, "have")} value={stats.have} total={stats.total} color="var(--have)" />
            <RingRow label={t(lang, "duplicates")} value={stats.duplicates} total={stats.total} color="var(--gold)" />
            <RingRow label={t(lang, "missing")} value={stats.missing} total={stats.total} color="var(--ink-2)" />
            <RingRow label={t(lang, "total")} value={stats.total} total={stats.total} color="var(--info)" hideBar />
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: 8, right: 0 }}>
        <LayoutCycler onClick={onCycleLayout} />
      </div>
    </section>
  );
}

function RingRow({
  label,
  value,
  total,
  color,
  hideBar,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
  hideBar?: boolean;
}) {
  const pct = total === 0 ? 0 : (value / total) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 4, height: 28, background: color, borderRadius: 2, opacity: 0.85, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
          <Kicker style={{ fontSize: 9 }}>{label}</Kicker>
          <span className="font-display tabular" style={{ fontSize: 22, lineHeight: 1, color }}>
            {value}
          </span>
        </div>
        {!hideBar && (
          <div style={{ marginTop: 4, height: 2, background: "var(--hairline-2)", borderRadius: 1, overflow: "hidden" }}>
            <div
              style={{
                width: `${pct}%`,
                height: "100%",
                background: color,
                opacity: 0.7,
                transition: "width 0.7s ease",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function MetricInline({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <Kicker>{label}</Kicker>
      <div className="font-display tabular" style={{ fontSize: 32, lineHeight: 0.9, color, marginTop: 4 }}>
        {value}
      </div>
    </div>
  );
}

function Kicker({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="font-mono"
      style={{
        fontSize: 9.5,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--ink-3)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ProgressLine({ pct }: { pct: number }) {
  const complete = pct >= 100;
  return (
    <div style={{ height: 3, background: "var(--hairline-2)", borderRadius: 2, overflow: "hidden" }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: complete
            ? "linear-gradient(90deg, var(--have-deep), var(--have))"
            : "linear-gradient(90deg, var(--gold-deep) 0%, var(--gold) 60%, var(--gold-light) 100%)",
          boxShadow: complete
            ? "0 0 8px rgba(130,181,138,0.5)"
            : "0 0 8px rgba(212,168,87,0.45)",
          transition: "width 0.8s cubic-bezier(0.2,0.8,0.2,1)",
          borderRadius: 2,
        }}
      />
    </div>
  );
}
