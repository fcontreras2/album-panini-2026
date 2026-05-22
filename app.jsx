// app.jsx — Álbum 2026 visual refresh mockup

const { useState, useMemo, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "statsLayout": "compact",
  "sectionHeaderStyle": "minimal",
  "theme": "dark",
  "lang": "es"
}/*EDITMODE-END*/;

function buildStickers() {
  // Use real 980-sticker data from stickers.js (window.ALBUM_DATA)
  const { introStickers, teamSections, historyStickers, allStickers } = window.ALBUM_DATA;
  return { introStickers, teamSections, historyStickers, all: allStickers };
}

// Realistic demo state — pseudo-random partial collection so the page looks
// lived-in (not 100%, not empty). Uses sticker code as seed for deterministic.
function buildDemoState(allStickers) {
  const state = {};
  // Simple deterministic PRNG by hashing code
  const hash = (s) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  };
  for (const s of allStickers) {
    const r = hash(s.id) % 100;
    // ~38% have, ~7% duplicate
    if (r < 38) state[s.id] = 1;
    else if (r < 45) state[s.id] = 2 + (hash(s.id) % 3); // 2..4
  }
  return state;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const { introStickers, teamSections, historyStickers, all } = useMemo(buildStickers, []);

  const [state, setState] = useState(() => buildDemoState(window.ALBUM_DATA.allStickers));
  const [filter, setFilter] = useState("all");
  const [confFilter, setConfFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [collapsedTrade, setCollapsedTrade] = useState(true);
  const [copied, setCopied] = useState(false);
  const toolbarRef = useRef(null);

  // Apply theme to <html> so tweaks-panel + base CSS pick it up
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
  }, [t.theme]);

  // Track sticky toolbar height so section headers can pin under it
  useEffect(() => {
    const el = toolbarRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty("--toolbar-h", el.offsetHeight + "px");
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  const stats = useMemo(() => {
    let have = 0, missing = 0, duplicates = 0;
    for (const s of all) {
      const c = state[s.id] ?? 0;
      if (c === 0) missing++;
      else if (c === 1) have++;
      else { have++; duplicates += (c - 1); }
    }
    return {
      total: all.length,
      have,
      missing,
      duplicates,
      completionPct: Math.round((have / all.length) * 100),
    };
  }, [state, all]);

  const dupList = useMemo(
    () => all.filter((s) => (state[s.id] ?? 0) >= 2),
    [state, all]
  );

  const inc = (id) => setState((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }));
  const dec = (id) =>
    setState((p) => {
      const c = (p[id] ?? 0) - 1;
      const next = { ...p };
      if (c <= 0) delete next[id]; else next[id] = c;
      return next;
    });

  const handleReset = () => setState({});

  const handleExport = () => {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `album-2026-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportState = (parsed) => {
    if (parsed && typeof parsed === "object") setState(parsed);
  };

  const tradeText = dupList
    .map((s) => `${s.code} – ${s.name} (${s.teamName}) x${(state[s.id] ?? 0) - 1}`)
    .join("\n");

  // Count teams per confederation (for filter chip badges)
  const confCounts = useMemo(() => {
    const m = window.CONFEDERATIONS || {};
    const counts = { all: teamSections.length };
    for (const c of window.CONFEDERATION_ORDER || []) counts[c] = 0;
    for (const ts of teamSections) {
      const c = m[ts.code];
      if (c) counts[c] = (counts[c] ?? 0) + 1;
    }
    return counts;
  }, [teamSections]);

  const handleCopy = async () => {
    let success = false;
    // 1) Try modern clipboard API
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(tradeText);
        success = true;
      }
    } catch {
      /* fall through to fallback */
    }
    // 2) Fallback: textarea + execCommand
    if (!success) {
      try {
        const ta = document.createElement("textarea");
        ta.value = tradeText;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        success = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        success = false;
      }
    }
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.alert(lang === "es" ? "No se pudo copiar" : "Could not copy");
    }
  };

  const lang = t.lang;

  return (
    <main style={{ minHeight: "100vh" }} data-screen-label="01 Album board">
      {/* ── Sticky header / controls ───────────────── */}
      <div className="sticky-hdr" ref={toolbarRef}>
        <div className="app-shell">
          <Header
            lang={lang}
            theme={t.theme}
            onToggleLang={() => setTweak("lang", lang === "es" ? "en" : "es")}
            onToggleTheme={() => setTweak("theme", t.theme === "dark" ? "light" : "dark")}
          />

          <StatsPanel stats={stats} layout={t.statsLayout} lang={lang} />

          <div style={{ padding: "16px 0 12px" }}>
            <div className="app-toolbar">
              <SearchBar value={search} onChange={setSearch} lang={lang} />
              <FilterBar filter={filter} onChange={setFilter} stats={stats} lang={lang} />
            </div>
            <ConfederationFilterBar
              value={confFilter}
              onChange={setConfFilter}
              lang={lang}
              counts={confCounts}
            />
            <ImportExportRow
              duplicatesCount={dupList.length}
              lang={lang}
              onReset={handleReset}
              onExport={handleExport}
              onImport={handleImportState}
            />
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────── */}
      <div className="app-content">

        {/* Trade list preview block — collapsible */}
        {dupList.length > 0 && (
          <div
            style={{
              marginBottom: 28,
              padding: 18,
              background: "var(--gold-bg)",
              border: "1px solid rgba(212,168,87,0.20)",
              borderRadius: "var(--radius)",
            }}
          >
            <div
              className="flex items-center justify-between gap-3 cursor-pointer"
              onClick={() => setCollapsedTrade((v) => !v)}
              style={{ userSelect: "none" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-mono"
                  style={{ fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)" }}
                >
                  {lang === "es" ? "Lista de intercambio" : "Trade list"}
                </span>
                <span className="font-display tabular" style={{ fontSize: 22, color: "var(--gold-light)", lineHeight: 1 }}>
                  {dupList.length}
                </span>
                <span className="font-serif" style={{ fontSize: 13, color: "var(--ink-3)", fontStyle: "italic" }}>
                  {lang === "es" ? "cromos para intercambiar" : "stickers up for trade"}
                </span>
              </div>
              <span style={{ color: "var(--ink-3)", fontSize: 16, transition: "transform 0.2s", display: "inline-block", transform: collapsedTrade ? "rotate(0deg)" : "rotate(90deg)" }}>
                ›
              </span>
            </div>
            {!collapsedTrade && (
              <div
                className="grid"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "8px 24px",
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: "1px solid rgba(212,168,87,0.15)",
                }}
              >
                {dupList.slice(0, 24).map((s) => (
                  <div
                    key={s.id}
                    className="flex items-baseline gap-2"
                    style={{ fontSize: 11.5, color: "var(--ink-2)" }}
                  >
                    <span className="font-mono" style={{ color: "var(--gold)", fontWeight: 600, minWidth: 44 }}>
                      {s.code}
                    </span>
                    <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {s.name}
                    </span>
                    <span className="font-mono tabular" style={{ color: "var(--gold-light)", fontWeight: 600 }}>
                      ×{(state[s.id] ?? 0) - 1}
                    </span>
                  </div>
                ))}
                {dupList.length > 24 && (
                  <div className="font-serif" style={{ fontStyle: "italic", color: "var(--ink-3)", fontSize: 12 }}>
                    + {dupList.length - 24} {lang === "es" ? "más" : "more"}…
                  </div>
                )}
              </div>
            )}
            {!collapsedTrade && (
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(212,168,87,0.15)", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <button
                  onClick={handleCopy}
                  className="btn-ghost"
                  style={{
                    color: copied ? "var(--have)" : "var(--gold-light)",
                    borderColor: copied ? "rgba(130,181,138,0.3)" : "var(--gold)",
                  }}
                >
                  {copied
                    ? `✓ ${lang === "es" ? "¡Copiado!" : "Copied!"}`
                    : (lang === "es" ? "📋 Copiar lista" : "📋 Copy list")}
                </button>
                <span className="font-serif" style={{ fontStyle: "italic", color: "var(--ink-3)", fontSize: 12 }}>
                  {lang === "es"
                    ? `Copia ${dupList.length} cromos al portapapeles para compartir.`
                    : `Copies ${dupList.length} stickers to clipboard to share.`}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Intro */}
        {confFilter === "all" && (
          <StickerSection
            stickers={introStickers}
            code="FWC"
            name={lang === "es" ? "Introducción" : "Introduction"}
            flag="🌎"
            meta={lang === "es" ? "Apertura · Sedes · Trofeo" : "Opening · Hosts · Trophy"}
            kicker="01"
            sectionHeaderStyle={t.sectionHeaderStyle}
            filter={filter}
            search={search}
            state={state}
            onInc={inc}
            onDec={dec}
            confederation={null}
            sticky
          />
        )}

        {/* Teams */}
        {teamSections.map((tsec, idx) => {
          const conf = window.CONFEDERATIONS?.[tsec.code] || null;
          if (confFilter !== "all" && conf !== confFilter) return null;
          return (
            <StickerSection
              key={tsec.code}
              stickers={tsec.stickers}
              code={tsec.code}
              name={tsec.name}
              flag={tsec.flag}
              meta={conf || undefined}
              kicker={String(idx + 2).padStart(2, "0")}
              sectionHeaderStyle={t.sectionHeaderStyle}
              filter={filter}
              search={search}
              state={state}
              onInc={inc}
              onDec={dec}
              confederation={conf}
              sticky
            />
          );
        })}

        {/* History */}
        {confFilter === "all" && (
          <StickerSection
            stickers={historyStickers}
            code="HIS"
            name={lang === "es" ? "Historia del Mundial" : "World Cup History"}
            flag="🏆"
            meta={lang === "es" ? "1930 — 2022" : "1930 — 2022"}
            kicker={String(teamSections.length + 2).padStart(2, "0")}
            sectionHeaderStyle={t.sectionHeaderStyle}
            filter={filter}
            search={search}
            state={state}
            onInc={inc}
            onDec={dec}
            confederation={null}
            sticky
          />
        )}

        {/* Editorial footer */}
        <footer style={{ marginTop: 60, paddingTop: 24, borderTop: "1px solid var(--hairline-2)" }}>
          <div className="flex justify-between items-baseline gap-6 flex-wrap">
            <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-3)" }}>
              {lang === "es" ? "Click izq.  +1  ·  Click der.  −1  ·  Shift + click  −1" : "Left click  +1  ·  Right click  −1  ·  Shift + click  −1"}
            </div>
            <div className="font-serif" style={{ fontSize: 13, fontStyle: "italic", color: "var(--ink-3)" }}>
              {lang === "es" ? "Colección personal · sin servidor · todo en tu navegador" : "Personal collection · no server · all in your browser"}
            </div>
          </div>
        </footer>

        {/* Sample notice */}
        <div
          style={{
            marginTop: 28,
            padding: "12px 14px",
            background: "var(--surface)",
            border: "1px dashed var(--hairline-3)",
            borderRadius: "var(--radius-sm)",
            fontSize: 11,
            color: "var(--ink-3)",
            lineHeight: 1.55,
          }}
        >
          <span className="font-mono" style={{ color: "var(--gold)", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 9.5, marginRight: 8 }}>
            Mockup
          </span>
          {lang === "es"
            ? "Mockup visual con la data real del álbum: 9 cromos de intro + 48 equipos × 20 + 11 de historia = 980 cromos. Colección de demo prepoblada (≈40%). Usa Reiniciar para vaciarla. El TSX final está en /react-update/ listo para pegar en tu repo."
            : "Visual mockup with the real album data: 9 intro + 48 teams × 20 + 11 history = 980 stickers. Demo collection pre-populated (≈40%). Use Reset to clear it. Production TSX is in /react-update/ ready to drop into your repo."}
        </div>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label={lang === "es" ? "Tema" : "Theme"} />
        <TweakRadio
          label={lang === "es" ? "Apariencia" : "Appearance"}
          value={t.theme}
          options={["dark", "light"]}
          onChange={(v) => setTweak("theme", v)}
        />

        <TweakSection label={lang === "es" ? "Idioma" : "Language"} />
        <TweakRadio
          label={lang === "es" ? "Lengua" : "Language"}
          value={t.lang}
          options={["es", "en"]}
          onChange={(v) => setTweak("lang", v)}
        />

        <TweakSection label="Stats panel" />
        <TweakRadio
          label="Layout"
          value={t.statsLayout}
          options={["compact", "extended", "ring"]}
          onChange={(v) => setTweak("statsLayout", v)}
        />

        <TweakSection label={lang === "es" ? "Encabezado de sección" : "Section header"} />
        <TweakRadio
          label={lang === "es" ? "Estilo" : "Style"}
          value={t.sectionHeaderStyle}
          options={["minimal", "chip", "banner"]}
          onChange={(v) => setTweak("sectionHeaderStyle", v)}
        />
      </TweaksPanel>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
