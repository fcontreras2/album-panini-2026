"use client";

import { SectionHeaderStyle, TournamentGroup } from "@/types";

interface Props {
  style: SectionHeaderStyle;
  code: string;
  name: string;
  flag?: string;
  meta?: string;
  kicker?: string;
  have: number;
  total: number;
  group?: TournamentGroup | null;
  /** Wrap header in a sticky container that pins under the toolbar. */
  sticky?: boolean;
}

/**
 * A compact group badge ("GRP / A") used as a prominent marker on the
 * left of each team section header. Uses --conf-accent set by the
 * parent's .grp-X class.
 */
function GroupBadge({ group, size = "md" }: { group: TournamentGroup; size?: "sm" | "md" | "lg" }) {
  const dims =
    size === "lg"
      ? { w: 44, letter: 28, label: 8.5, gap: 2 }
      : size === "sm"
      ? { w: 30, letter: 18, label: 7, gap: 1 }
      : { w: 38, letter: 24, label: 7.5, gap: 2 };
  return (
    <span
      aria-label={`Group ${group}`}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: dims.gap,
        minWidth: dims.w,
        padding: "4px 8px",
        background: "color-mix(in oklab, var(--conf-accent) 16%, transparent)",
        border: "1px solid var(--conf-accent)",
        borderRadius: "var(--radius-sm)",
        color: "var(--conf-accent)",
        flexShrink: 0,
        lineHeight: 1,
      }}
    >
      <span
        className="font-mono"
        style={{
          fontSize: dims.label,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: 0.75,
          fontWeight: 600,
        }}
      >
        GRP
      </span>
      <span
        className="font-display"
        style={{
          fontSize: dims.letter,
          lineHeight: 0.9,
          letterSpacing: "0.02em",
        }}
      >
        {group}
      </span>
    </span>
  );
}

export default function SectionHeader({
  style,
  code,
  name,
  flag,
  meta,
  kicker,
  have,
  total,
  group,
  sticky = false,
}: Props) {
  const pct = total === 0 ? 0 : Math.round((have / total) * 100);
  const complete = pct >= 100;
  const accentClass = group ? `grp-${group}` : "with-conf-accent";

  const wrapperClass = [sticky ? "section-sticky-wrap" : "", accentClass, "fade-up"]
    .filter(Boolean)
    .join(" ");

  if (style === "banner") {
    return (
      <div className={wrapperClass} style={sticky ? undefined : { marginBottom: 18 }}>
        <div
          className="section-header-row"
          style={{
            padding: "14px 16px 16px",
            background: "linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 100%)",
            border: "1px solid var(--hairline-2)",
            borderLeft: "3px solid var(--conf-accent, var(--gold))",
            borderRadius: "var(--radius)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {group && <GroupBadge group={group} size="lg" />}
              {flag && <span style={{ fontSize: 32, lineHeight: 1 }}>{flag}</span>}
              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                    marginBottom: 2,
                  }}
                >
                  {kicker ? `${kicker} · ${code}` : code}
                </div>
                <h2
                  className="font-display"
                  style={{ fontSize: 28, lineHeight: 1, letterSpacing: "0.01em", color: "var(--ink)", margin: 0 }}
                >
                  {name.toUpperCase()}
                </h2>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span
                className="font-display tabular"
                style={{ fontSize: 32, lineHeight: 1, color: complete ? "var(--have)" : "var(--gold)" }}
              >
                {have}
              </span>
              <span className="font-mono tabular" style={{ fontSize: 11, color: "var(--ink-3)" }}>
                / {total}
              </span>
              <span className="font-mono tabular" style={{ fontSize: 11, color: "var(--ink-3)", marginLeft: 8 }}>
                {pct}%
              </span>
            </div>
          </div>
          <div style={{ marginTop: 12, height: 3, background: "var(--hairline-2)", borderRadius: 2, overflow: "hidden" }}>
            <div
              style={{
                width: `${pct}%`,
                height: "100%",
                background: complete
                  ? "linear-gradient(90deg, var(--have-deep), var(--have))"
                  : "linear-gradient(90deg, var(--gold-deep) 0%, var(--gold) 60%, var(--gold-light) 100%)",
                transition: "width 0.7s ease",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (style === "chip") {
    return (
      <div className={wrapperClass}>
        <div
          className="section-header-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          {group && <GroupBadge group={group} size="md" />}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 12px 5px 8px",
              background: "var(--surface)",
              border: "1px solid var(--hairline-2)",
              borderRadius: 999,
            }}
          >
            {flag && <span style={{ fontSize: 18, lineHeight: 1 }}>{flag}</span>}
            <span
              className="font-mono"
              style={{
                fontSize: 9.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                fontWeight: 600,
              }}
            >
              {code}
            </span>
          </span>
          <h2
            className="font-display"
            style={{ fontSize: 22, lineHeight: 1, letterSpacing: "0.01em", color: "var(--ink)", margin: 0, flexShrink: 0 }}
          >
            {name.toUpperCase()}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0, maxWidth: 320 }}>
            <div style={{ flex: 1, height: 2, background: "var(--hairline-2)", borderRadius: 1, overflow: "hidden" }}>
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: complete ? "var(--have)" : "var(--conf-accent, var(--gold))",
                  transition: "width 0.7s ease",
                }}
              />
            </div>
          </div>
          <span
            className="font-mono tabular"
            style={{
              fontSize: 11,
              color: complete ? "var(--have)" : "var(--ink-3)",
              whiteSpace: "nowrap",
              fontWeight: 500,
            }}
          >
            {have}
            <span style={{ opacity: 0.5 }}>/{total}</span>
          </span>
        </div>
      </div>
    );
  }

  // minimal — editorial newsroom row
  return (
    <div className={wrapperClass}>
      <div
        className="section-header-row"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 16,
          paddingBottom: 10,
          borderBottom: "1px solid var(--hairline-2)",
          flexWrap: "wrap",
        }}
      >
        {group && <GroupBadge group={group} size="md" />}
        {flag && <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{flag}</span>}
        <span
          className="font-mono"
          style={{
            fontSize: 9.5,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ink-3)",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {code}
        </span>
        <h2
          className="font-display"
          style={{ fontSize: 26, lineHeight: 1, letterSpacing: "0.005em", color: "var(--ink)", margin: 0, flexShrink: 0 }}
        >
          {name}
        </h2>
        {meta && !group && (
          <span
            className="font-serif"
            style={{ fontSize: 14, fontStyle: "italic", color: "var(--ink-3)", flexShrink: 0, marginLeft: 4 }}
          >
            {meta}
          </span>
        )}
        <span style={{ flex: 1 }} />
        <span
          className="font-mono tabular"
          style={{
            fontSize: 11,
            color: complete ? "var(--have)" : "var(--ink-3)",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <span
            className="font-display"
            style={{ fontSize: 18, color: complete ? "var(--have)" : "var(--ink)", marginRight: 4 }}
          >
            {have}
          </span>
          / {total} <span style={{ marginLeft: 6, opacity: 0.7 }}>· {pct}%</span>
        </span>
      </div>
    </div>
  );
}
