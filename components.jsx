// components.jsx — UI primitives for the Álbum 2026 visual refresh
// Loaded as a separate Babel script; exports to window for app.jsx.

const { useState, useRef, useEffect, useMemo } = React;

/* ─────────────────────────────────────────────────────────────────
   HEADER — editorial wordmark + edition meta
   ───────────────────────────────────────────────────────────────── */
function Header({ lang, theme, onToggleLang, onToggleTheme }) {
  return (
    <header className="app-header">
      <div className="flex items-end gap-5 min-w-0">
        {/* Custom mark — six-pointed champagne star */}
        <div className="flex-shrink-0" style={{ width: 44, height: 44 }}>
          <svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">
            <defs>
              <linearGradient id="markGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--gold-light)" />
                <stop offset="100%" stopColor="var(--gold-deep)" />
              </linearGradient>
            </defs>
            <circle cx="22" cy="22" r="21" fill="none" stroke="var(--hairline)" />
            <circle cx="22" cy="22" r="14" fill="none" stroke="var(--gold)" strokeOpacity="0.5" />
            <path
              d="M22 6 L24.5 19.5 L38 22 L24.5 24.5 L22 38 L19.5 24.5 L6 22 L19.5 19.5 Z"
              fill="url(#markGrad)"
              opacity="0.92"
            />
          </svg>
        </div>

        <div className="min-w-0">
          <div
            className="font-mono"
            style={{
              fontSize: 9.5,
              letterSpacing: "0.28em",
              color: "var(--ink-3)",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            <span style={{ color: "var(--gold)" }}>●</span>&nbsp;&nbsp;FIFA World Cup&nbsp;&nbsp;·&nbsp;&nbsp;Canada · Mexico · USA&nbsp;&nbsp;·&nbsp;&nbsp;Edition 26
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(34px, 5vw, 52px)",
              lineHeight: 0.92,
              letterSpacing: "0.005em",
              color: "var(--ink)",
              margin: 0,
            }}
          >
            {lang === "es" ? "El Álbum" : "The Album"}
            <span
              className="font-serif"
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "0.62em",
                marginLeft: "0.32em",
                color: "var(--gold)",
                letterSpacing: "-0.01em",
              }}
            >
              2026
            </span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={onToggleTheme} className="btn-ghost" title="Toggle theme">
          {theme === "dark" ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
          <span style={{ fontSize: 10, letterSpacing: "0.12em" }}>
            {theme === "dark" ? "LIGHT" : "DARK"}
          </span>
        </button>
        <button onClick={onToggleLang} className="btn-ghost" title="Toggle language">
          <span style={{ color: "var(--gold)", fontSize: 10, letterSpacing: "0.12em" }}>
            {lang === "es" ? "EN" : "ES"}
          </span>
        </button>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────────
   STATS PANEL — three layouts: compact / extended / ring
   ───────────────────────────────────────────────────────────────── */
function StatsPanel({ stats, layout, lang }) {
  if (layout === "ring") return <StatsRing stats={stats} lang={lang} />;
  if (layout === "extended") return <StatsExtended stats={stats} lang={lang} />;
  return <StatsCompact stats={stats} lang={lang} />;
}

function StatsCompact({ stats, lang }) {
  return (
    <section className="hairline-y" style={{ padding: "20px 0" }}>
      <div className="app-stats-compact">
        {/* Hero number */}
        <div>
          <div
            className="font-mono"
            style={{
              fontSize: 9.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              marginBottom: 8,
            }}
          >
            {lang === "es" ? "Completado" : "Completed"}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span
              className="font-display num-in tabular text-gold app-hero-num"
              key={stats.completionPct}
            >
              {stats.completionPct}
            </span>
            <span
              className="font-serif"
              style={{ fontSize: 24, color: "var(--ink-3)", fontStyle: "italic" }}
            >
              %
            </span>
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
              <span style={{ color: "var(--ink)" }}>{stats.have}</span> / {stats.total}{" "}
              {lang === "es" ? "cromos" : "stickers"}
            </span>
            <span>
              {stats.total - stats.have} {lang === "es" ? "por encontrar" : "to find"}
            </span>
          </div>
        </div>

        {/* Micro-stats — 3 metrics, no boxes, just typographic */}
        <div style={{ display: "flex", gap: 28, flexShrink: 0 }}>
          <MetricInline label={lang === "es" ? "Tengo" : "Have"} value={stats.have} color="var(--have)" />
          <MetricInline label={lang === "es" ? "Faltan" : "Missing"} value={stats.missing} color="var(--ink-2)" />
          <MetricInline label={lang === "es" ? "Repetidas" : "Doubles"} value={stats.duplicates} color="var(--gold)" />
        </div>
      </div>
    </section>
  );
}

function StatsExtended({ stats, lang }) {
  const cards = [
    { label: lang === "es" ? "Tengo" : "Have", value: stats.have, color: "var(--have)", bg: "var(--have-bg)", border: "rgba(130,181,138,0.22)" },
    { label: lang === "es" ? "Faltan" : "Missing", value: stats.missing, color: "var(--ink-2)", bg: "var(--miss-bg)", border: "var(--hairline-3)" },
    { label: lang === "es" ? "Repetidas" : "Duplicates", value: stats.duplicates, color: "var(--gold)", bg: "var(--dup-bg)", border: "rgba(232,200,133,0.25)" },
    { label: lang === "es" ? "Total" : "Total", value: stats.total, color: "var(--info)", bg: "var(--info-bg)", border: "rgba(138,169,214,0.20)" },
  ];

  return (
    <section className="hairline-y" style={{ padding: "20px 0" }}>
      <div className="flex items-end justify-between gap-6 mb-4 flex-wrap">
        <div>
          <div
            className="font-mono"
            style={{ fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 6 }}
          >
            {lang === "es" ? "Completado" : "Completed"}
          </div>
          <div className="flex items-baseline gap-3">
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
          <div className="flex items-center justify-between mt-2.5 font-mono tabular" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>
            <span><span style={{ color: "var(--ink)" }}>{stats.have}</span> / {stats.total} {lang === "es" ? "cromos" : "stickers"}</span>
            <span>{stats.total - stats.have} {lang === "es" ? "por encontrar" : "to find"}</span>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
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
            <div
              className="font-mono"
              style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 6 }}
            >
              {c.label}
            </div>
            <div className="font-display tabular" style={{ fontSize: 36, lineHeight: 0.9, color: c.color }}>
              {c.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsRing({ stats, lang }) {
  const R = 60;
  const C = 2 * Math.PI * R;
  const offset = C - (C * stats.completionPct) / 100;
  return (
    <section className="hairline-y" style={{ padding: "22px 0" }}>
      <div className="flex items-center gap-8 flex-wrap">
        {/* Ring */}
        <div style={{ position: "relative", width: 152, height: 152, flexShrink: 0 }}>
          <svg width="152" height="152" viewBox="0 0 152 152" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="76" cy="76" r={R} fill="none" strokeWidth="6" className="ring-track" />
            <circle
              cx="76" cy="76" r={R} fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className="ring-fill"
              strokeDasharray={C}
              strokeDashoffset={offset}
              style={{
                stroke: stats.completionPct >= 100 ? "var(--have)" : "var(--gold)",
                filter: `drop-shadow(0 0 8px ${stats.completionPct >= 100 ? "rgba(130,181,138,0.5)" : "rgba(212,168,87,0.4)"})`,
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
            <span
              className="font-mono"
              style={{ fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-3)", marginTop: 2 }}
            >
              {lang === "es" ? "Completado" : "Completed"}
            </span>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 240 }}>
          <div
            className="font-mono"
            style={{ fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 10 }}
          >
            {lang === "es" ? "Progreso" : "Progress"}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
            <RingRow label={lang === "es" ? "Tengo" : "Have"} value={stats.have} total={stats.total} color="var(--have)" />
            <RingRow label={lang === "es" ? "Repetidas" : "Duplicates"} value={stats.duplicates} total={stats.total} color="var(--gold)" />
            <RingRow label={lang === "es" ? "Faltan" : "Missing"} value={stats.missing} total={stats.total} color="var(--ink-2)" />
            <RingRow label={lang === "es" ? "Total" : "Total"} value={stats.total} total={stats.total} color="var(--info)" hideBar />
          </div>
        </div>
      </div>
    </section>
  );
}

function RingRow({ label, value, total, color, hideBar }) {
  const pct = total === 0 ? 0 : (value / total) * 100;
  return (
    <div className="flex items-center gap-3">
      <div style={{ width: 4, height: 28, background: color, borderRadius: 2, opacity: 0.85, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="flex items-baseline justify-between gap-2">
          <span
            className="font-mono"
            style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}
          >
            {label}
          </span>
          <span className="font-display tabular" style={{ fontSize: 22, lineHeight: 1, color }}>{value}</span>
        </div>
        {!hideBar && (
          <div style={{ marginTop: 4, height: 2, background: "var(--hairline-2)", borderRadius: 1, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: color, opacity: 0.7, transition: "width 0.7s ease" }} />
          </div>
        )}
      </div>
    </div>
  );
}

function MetricInline({ label, value, color }) {
  return (
    <div>
      <div
        className="font-mono"
        style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 4 }}
      >
        {label}
      </div>
      <div className="font-display tabular" style={{ fontSize: 32, lineHeight: 0.9, color }}>
        {value}
      </div>
    </div>
  );
}

function ProgressLine({ pct }) {
  const isComplete = pct >= 100;
  return (
    <div style={{ height: 3, background: "var(--hairline-2)", borderRadius: 2, overflow: "hidden" }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: isComplete
            ? "linear-gradient(90deg, var(--have-deep), var(--have))"
            : "linear-gradient(90deg, var(--gold-deep) 0%, var(--gold) 60%, var(--gold-light) 100%)",
          boxShadow: isComplete
            ? "0 0 8px rgba(130,181,138,0.5)"
            : "0 0 8px rgba(212,168,87,0.45)",
          transition: "width 0.8s cubic-bezier(0.2,0.8,0.2,1)",
          borderRadius: 2,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SEARCH + FILTERS
   ───────────────────────────────────────────────────────────────── */
function SearchBar({ value, onChange, lang }) {
  return (
    <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-3)", pointerEvents: "none" }}
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        className="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={lang === "es" ? "Buscar jugador, código o equipo…" : "Search player, code or team…"}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
            background: "transparent", border: 0, color: "var(--ink-3)", cursor: "pointer",
            padding: 6, lineHeight: 0,
          }}
          aria-label="Clear"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

function FilterBar({ filter, onChange, stats, lang }) {
  const FILTERS = [
    { id: "all",       label: lang === "es" ? "Todas" : "All",         count: stats.total },
    { id: "have",      label: lang === "es" ? "Tengo" : "Have",        count: stats.have },
    { id: "missing",   label: lang === "es" ? "Faltan" : "Missing",    count: stats.missing },
    { id: "duplicate", label: lang === "es" ? "Repetidas" : "Doubles", count: stats.duplicates },
  ];
  return (
    <div className="flex gap-1.5 flex-wrap">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          className="chip"
          data-active={filter === f.id}
          onClick={() => onChange(f.id)}
        >
          {f.label}
          <span className="chip-count">{f.count}</span>
        </button>
      ))}
    </div>
  );
}

function ImportExportRow({ duplicatesCount, lang, onReset, onExport, onImport }) {
  const fileRef = React.useRef(null);
  const handleReset = () => {
    if (window.confirm(lang === "es" ? "¿Seguro que quieres reiniciar todo el álbum?" : "Are you sure you want to reset the entire album?")) {
      onReset && onReset();
    }
  };
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        onImport && onImport(parsed);
      } catch {
        window.alert(lang === "es" ? "Archivo inválido" : "Invalid file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex gap-2 flex-wrap" style={{ fontSize: 11 }}>
      <button className="btn-ghost" onClick={onExport}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
        {lang === "es" ? "Exportar" : "Export"}
      </button>
      <button className="btn-ghost" onClick={() => fileRef.current?.click()}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
        {lang === "es" ? "Importar" : "Import"}
      </button>
      <button className="btn-ghost" onClick={handleReset} style={{ marginLeft: "auto", color: "var(--ink-3)" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
        </svg>
        {lang === "es" ? "Reiniciar" : "Reset"}
      </button>
      <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleFile} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   GROUP BADGE — stacked "GRP / A" marker for section headers
   ───────────────────────────────────────────────────────────────── */
function GroupBadge({ group, size = "md" }) {
  const dims =
    size === "lg" ? { w: 44, letter: 28, label: 8.5, gap: 2 }
    : size === "sm" ? { w: 30, letter: 18, label: 7, gap: 1 }
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
        style={{ fontSize: dims.letter, lineHeight: 0.9, letterSpacing: "0.02em" }}
      >
        {group}
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION HEADER — three styles: minimal / chip / banner
   ───────────────────────────────────────────────────────────────── */
function SectionHeader({ style, code, name, flag, meta, have, total, kicker, group, sticky }) {
  const pct = total === 0 ? 0 : Math.round((have / total) * 100);
  const isComplete = pct >= 100;
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
                  style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 2 }}
                >
                  {kicker ? `${kicker} · ${code}` : code}
                </div>
                <h2 className="font-display" style={{ fontSize: 28, lineHeight: 1, letterSpacing: "0.01em", color: "var(--ink)", margin: 0 }}>
                  {name.toUpperCase()}
                </h2>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="font-display tabular" style={{ fontSize: 32, lineHeight: 1, color: isComplete ? "var(--have)" : "var(--gold)" }}>
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
          <div style={{ marginTop: 12 }}>
            <ProgressLine pct={pct} />
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
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}
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
              style={{ fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)", fontWeight: 600 }}
            >
              {code}
            </span>
          </span>
          <h2 className="font-display" style={{ fontSize: 22, lineHeight: 1, letterSpacing: "0.01em", color: "var(--ink)", margin: 0, flexShrink: 0 }}>
            {name.toUpperCase()}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0, maxWidth: 320 }}>
            <div style={{ flex: 1, height: 2, background: "var(--hairline-2)", borderRadius: 1, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: isComplete ? "var(--have)" : "var(--conf-accent, var(--gold))", transition: "width 0.7s ease" }} />
            </div>
          </div>
          <span className="font-mono tabular" style={{ fontSize: 11, color: isComplete ? "var(--have)" : "var(--ink-3)", whiteSpace: "nowrap", fontWeight: 500 }}>
            {have}<span style={{ opacity: 0.5 }}>/{total}</span>
          </span>
        </div>
      </div>
    );
  }

  // minimal
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
          style={{ fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-3)", fontWeight: 600, flexShrink: 0 }}
        >
          {code}
        </span>
        <h2 className="font-display" style={{ fontSize: 26, lineHeight: 1, letterSpacing: "0.005em", color: "var(--ink)", margin: 0, flexShrink: 0 }}>
          {name}
        </h2>
        {meta && !group && (
          <span className="font-serif" style={{ fontSize: 14, fontStyle: "italic", color: "var(--ink-3)", flexShrink: 0, marginLeft: 4 }}>
            {meta}
          </span>
        )}
        <span style={{ flex: 1 }} />
        <span className="font-mono tabular" style={{ fontSize: 11, color: isComplete ? "var(--have)" : "var(--ink-3)", whiteSpace: "nowrap", flexShrink: 0 }}>
          <span className="font-display" style={{ fontSize: 18, color: isComplete ? "var(--have)" : "var(--ink)", marginRight: 4 }}>
            {have}
          </span>
          / {total} <span style={{ marginLeft: 6, opacity: 0.7 }}>· {pct}%</span>
        </span>
      </div>
    </div>
  );
}
  const pct = total === 0 ? 0 : Math.round((have / total) * 100);
  const isComplete = pct >= 100;
  const accentClass = confederation ? `conf-${confederation}` : "with-conf-accent";
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
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {flag && <span style={{ fontSize: 32, lineHeight: 1 }}>{flag}</span>}
              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: confederation ? "var(--conf-accent)" : "var(--ink-3)",
                    marginBottom: 2,
                  }}
                >
                  {confederation ? `${confederation} · ${code}` : kicker ? `${kicker} · ${code}` : code}
                </div>
                <h2 className="font-display" style={{ fontSize: 28, lineHeight: 1, letterSpacing: "0.01em", color: "var(--ink)", margin: 0 }}>
                  {name.toUpperCase()}
                </h2>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="font-display tabular" style={{ fontSize: 32, lineHeight: 1, color: isComplete ? "var(--have)" : "var(--gold)" }}>
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
          <div style={{ marginTop: 12 }}>
            <ProgressLine pct={pct} />
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
            paddingLeft: confederation ? 8 : 0,
            borderLeft: confederation ? "2px solid var(--conf-accent)" : "none",
          }}
        >
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
                color: confederation ? "var(--conf-accent)" : "var(--ink-3)",
                fontWeight: 600,
              }}
            >
              {code}
            </span>
          </span>
          <h2 className="font-display" style={{ fontSize: 22, lineHeight: 1, letterSpacing: "0.01em", color: "var(--ink)", margin: 0, flexShrink: 0 }}>
            {name.toUpperCase()}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0, maxWidth: 320 }}>
            <div style={{ flex: 1, height: 2, background: "var(--hairline-2)", borderRadius: 1, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: isComplete ? "var(--have)" : "var(--gold)", transition: "width 0.7s ease" }} />
            </div>
          </div>
          <span className="font-mono tabular" style={{ fontSize: 11, color: isComplete ? "var(--have)" : "var(--ink-3)", whiteSpace: "nowrap", fontWeight: 500 }}>
            {have}<span style={{ opacity: 0.5 }}>/{total}</span>
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
          alignItems: "baseline",
          gap: 14,
          marginBottom: 16,
          paddingLeft: confederation ? 10 : 0,
          paddingBottom: 10,
          borderLeft: confederation ? "2px solid var(--conf-accent)" : "none",
          borderBottom: "1px solid var(--hairline-2)",
          flexWrap: "wrap",
        }}
      >
        {flag && <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>{flag}</span>}
        <span
          className="font-mono"
          style={{
            fontSize: 9.5,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: confederation ? "var(--conf-accent)" : "var(--gold)",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {confederation ? `${confederation} · ${code}` : code}
        </span>
        <h2 className="font-display" style={{ fontSize: 26, lineHeight: 1, letterSpacing: "0.005em", color: "var(--ink)", margin: 0, flexShrink: 0 }}>
          {name}
        </h2>
        {meta && (
          <span className="font-serif" style={{ fontSize: 14, fontStyle: "italic", color: "var(--ink-3)", flexShrink: 0, marginLeft: 4 }}>
            {meta}
          </span>
        )}
        <span style={{ flex: 1 }} />
        <span className="font-mono tabular" style={{ fontSize: 11, color: isComplete ? "var(--have)" : "var(--ink-3)", whiteSpace: "nowrap", flexShrink: 0 }}>
          <span className="font-display" style={{ fontSize: 18, color: isComplete ? "var(--have)" : "var(--ink)", marginRight: 4 }}>
            {have}
          </span>
          / {total} <span style={{ marginLeft: 6, opacity: 0.7 }}>· {pct}%</span>
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   STICKER CARD
   ───────────────────────────────────────────────────────────────── */
function StickerCard({ sticker, count, onInc, onDec, dimmed }) {
  const [justCollected, setJustCollected] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (prevCount.current === 0 && count === 1) {
      setJustCollected(true);
      const id = setTimeout(() => setJustCollected(false), 700);
      return () => clearTimeout(id);
    }
    prevCount.current = count;
  }, [count]);

  const state = count === 0 ? "missing" : count === 1 ? "have" : "duplicate";

  const handleClick = (e) => {
    if (e.shiftKey) onDec(); else onInc();
  };
  const handleContext = (e) => {
    e.preventDefault();
    onDec();
  };

  // Title display: portrait = name; team photo/badge = label
  const display =
    sticker.number === 1 ? (sticker.name || "Portada") :
    sticker.number === 2 ? (sticker.name || "Badge") :
    sticker.name;

  return (
    <button
      className={`sk ${sticker.isFoil && state !== "missing" ? "sk-foil" : ""} ${justCollected ? "sk-collected-flash" : ""}`}
      data-state={state}
      data-dimmed={dimmed ? "true" : "false"}
      onClick={handleClick}
      onContextMenu={handleContext}
      title={`${sticker.code} — ${display}${sticker.isFoil ? " ✦ FOIL" : ""}\nClick: +1  ·  Right-click / Shift-click: −1`}
    >
      {sticker.isFoil && <span className="sk-foil-mark" aria-hidden="true" />}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2, zIndex: 2, position: "relative" }}>
        <span className="sk-num">{sticker.number > 0 ? String(sticker.number).padStart(2, "0") : "—"}</span>
        <span className="sk-code">{sticker.code}</span>
      </div>

      <span className="sk-name" style={{ zIndex: 2, position: "relative" }}>
        {display}
      </span>

      {count >= 2 && <span className="sk-count-pill">×{count}</span>}
      {count === 1 && (
        <span className="sk-check">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TEAM / SECTION
   ───────────────────────────────────────────────────────────────── */
function StickerSection({ stickers, code, name, flag, meta, kicker, sectionHeaderStyle, filter, search, state, onInc, onDec, confederation, sticky = true }) {
  const visible = useMemo(() => {
    return stickers.filter((s) => {
      const count = state[s.id] ?? 0;
      const f =
        filter === "all" ? true :
        filter === "have" ? count === 1 :
        filter === "missing" ? count === 0 :
        count >= 2;
      const q = search.trim().toLowerCase();
      const m = !q ||
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        (s.teamName && s.teamName.toLowerCase().includes(q));
      return f && m;
    });
  }, [stickers, state, filter, search]);

  if (visible.length === 0 && (filter !== "all" || search)) return null;

  const have = stickers.filter((s) => (state[s.id] ?? 0) >= 1).length;

  return (
    <section style={{ marginBottom: 36 }}>
      <SectionHeader
        style={sectionHeaderStyle}
        code={code}
        name={name}
        flag={flag}
        meta={meta}
        kicker={kicker}
        have={have}
        total={stickers.length}
        confederation={confederation}
        sticky={sticky}
      />
      <div
        className="app-grid"
        style={{ marginTop: sticky ? 12 : 0 }}
      >
        {stickers.map((s) => {
          const count = state[s.id] ?? 0;
          const dimmed = !visible.includes(s);
          return (
            <StickerCard
              key={s.id}
              sticker={s}
              count={count}
              dimmed={dimmed}
              onInc={() => onInc(s.id)}
              onDec={() => onDec(s.id)}
            />
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CONFEDERATION FILTER
   ───────────────────────────────────────────────────────────────── */
function ConfederationFilterBar({ value, onChange, lang, counts }) {
  const order = window.CONFEDERATION_ORDER || [];
  const info = window.CONFEDERATION_INFO || {};
  return (
    <div className="chip-scroll-row" role="tablist">
      <button
        className="chip chip-conf"
        data-active={value === "all"}
        onClick={() => onChange("all")}
        role="tab"
        aria-selected={value === "all"}
      >
        <span className="chip-conf-dot" style={{ background: "var(--ink-3)" }} />
        {lang === "es" ? "Todas las regiones" : "All regions"}
        {counts?.all != null && <span className="chip-count">{counts.all}</span>}
      </button>
      {order.map((c) => {
        const label = info[c]?.[lang] || c;
        return (
          <button
            key={c}
            className={`chip chip-conf conf-${c}`}
            data-active={value === c}
            onClick={() => onChange(c)}
            role="tab"
            aria-selected={value === c}
            title={c}
          >
            <span className="chip-conf-dot" />
            {label}
            {counts?.[c] != null && <span className="chip-count">{counts[c]}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   EXPORTS
   ───────────────────────────────────────────────────────────────── */
Object.assign(window, {
  Header,
  StatsPanel,
  SearchBar,
  FilterBar,
  ImportExportRow,
  SectionHeader,
  StickerCard,
  StickerSection,
  ConfederationFilterBar,
});
