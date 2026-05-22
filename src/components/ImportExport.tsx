"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AlbumState, Language, Sticker } from "@/types";
import { exportAlbum, importAlbum } from "@/lib/storage";
import { allStickers } from "@/data/stickers";
import { t } from "@/lib/i18n";

interface Props {
  state: AlbumState;
  onImport: (s: AlbumState) => void;
  onReset: () => void;
  lang: Language;
}

interface PartnerData {
  state: AlbumState;
  total: number;
  dups: number;
}

/* ─────────────────────────────────────────────────── helpers */

const panelStyle: React.CSSProperties = {
  marginTop: 14,
  padding: 18,
  background: "var(--gold-bg)",
  border: "1px solid rgba(212,168,87,0.20)",
  borderRadius: "var(--radius)",
};

const monoLabel: React.CSSProperties = {
  fontSize: 9.5,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--gold)",
  fontFamily: "var(--font-mono, monospace)",
};

function Icon({ path }: { path: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={path} />
    </svg>
  );
}

function Stat({
  label, value, total, accent = "var(--gold-light)",
}: {
  label: string; value: number; total?: number; accent?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)", fontFamily: "var(--font-mono, monospace)" }}>
        {label}
      </span>
      <span className="font-display tabular" style={{ fontSize: 20, color: accent, lineHeight: 1 }}>
        {value}
        {total !== undefined && (
          <span style={{ fontSize: 11, color: "var(--ink-3)", marginLeft: 3 }}>/ {total}</span>
        )}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────── Trade Modal */

interface ModalProps {
  lang: Language;
  iCanGet: Sticker[];
  iCanGive: Sticker[];
  partner: PartnerData;
  ownState: AlbumState;
  selectedGet: Set<string>;
  selectedGive: Set<string>;
  onToggleGet: (id: string) => void;
  onToggleGive: (id: string) => void;
  onSelectAllGet: () => void;
  onSelectNoneGet: () => void;
  onSelectAllGive: () => void;
  onSelectNoneGive: () => void;
  onProceed: () => void;
  onClose: () => void;
}

function TradeModal({
  lang, iCanGet, iCanGive, partner, ownState,
  selectedGet, selectedGive,
  onToggleGet, onToggleGive,
  onSelectAllGet, onSelectNoneGet,
  onSelectAllGive, onSelectNoneGive,
  onProceed, onClose,
}: ModalProps) {
  const totalSelected = selectedGet.size + selectedGive.size;
  const canProceed = totalSelected > 0;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 780,
          maxHeight: "90dvh",
          display: "flex",
          flexDirection: "column",
          background: "var(--surface)",
          border: "1px solid var(--hairline)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* ── Modal header ── */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--hairline-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span className="font-mono" style={monoLabel}>{t(lang, "tradeMatchTitle")}</span>
            {/* Summary chips */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Chip label={t(lang, "iCanGet")} value={iCanGet.length} accent="var(--have)" />
              <Chip label={t(lang, "iCanGive")} value={iCanGive.length} accent="var(--gold-light)" />
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "transparent", border: 0, color: "var(--ink-3)", cursor: "pointer", fontSize: 18, padding: 4, lineHeight: 1, flexShrink: 0 }}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* ── Two-column lists ── */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr",
            gap: 0,
          }}
          className="trade-modal-grid"
        >
          {/* Puedo recibir */}
          <CheckList
            title={t(lang, "iCanGet")}
            accent="var(--have)"
            items={iCanGet}
            selected={selectedGet}
            onToggle={onToggleGet}
            onSelectAll={onSelectAllGet}
            onSelectNone={onSelectNoneGet}
            lang={lang}
            getSubtitle={(s) => {
              const n = (partner.state[s.id] ?? 0) - 1;
              return n > 0 ? `${t(lang, "partnerHasN")} ×${n + 1}` : undefined;
            }}
            emptyLabel={t(lang, "noMatchGet")}
          />

          {/* Divisor vertical */}
          <div style={{ background: "var(--hairline-2)" }} />

          {/* Puedo dar */}
          <CheckList
            title={t(lang, "iCanGive")}
            accent="var(--gold-light)"
            items={iCanGive}
            selected={selectedGive}
            onToggle={onToggleGive}
            onSelectAll={onSelectAllGive}
            onSelectNone={onSelectNoneGive}
            lang={lang}
            getSubtitle={(s) => {
              const n = ownState[s.id] ?? 0;
              return n > 1 ? `${t(lang, "tradeHaveN")} ×${n}` : undefined;
            }}
            emptyLabel={t(lang, "noMatchGive")}
          />
        </div>

        {/* ── Modal footer ── */}
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid var(--hairline-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexShrink: 0,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 11.5, color: "var(--ink-3)" }}>
            {canProceed
              ? `${selectedGet.size} ${t(lang, "iCanGet").toLowerCase()} · ${selectedGive.size} ${t(lang, "iCanGive").toLowerCase()}`
              : t(lang, "noneSelected")}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onClose} className="btn-ghost" style={{ color: "var(--ink-3)" }}>
              {t(lang, "close")}
            </button>
            <button
              onClick={onProceed}
              disabled={!canProceed}
              style={{
                padding: "7px 18px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid",
                cursor: canProceed ? "pointer" : "not-allowed",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "background 0.15s, color 0.15s, opacity 0.15s",
                background: canProceed ? "var(--gold)" : "transparent",
                color: canProceed ? "#1a1408" : "var(--ink-4)",
                borderColor: canProceed ? "var(--gold)" : "var(--hairline-3)",
                opacity: canProceed ? 1 : 0.5,
              }}
            >
              {t(lang, "proceed")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────── CheckList */

function CheckList({
  title, accent, items, selected, onToggle, onSelectAll, onSelectNone,
  getSubtitle, emptyLabel, lang,
}: {
  title: string;
  accent: string;
  items: Sticker[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
  getSubtitle: (s: Sticker) => string | undefined;
  emptyLabel: string;
  lang: Language;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Column header */}
      <div
        style={{
          padding: "10px 16px 8px",
          borderBottom: "1px solid var(--hairline-2)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: accent, flexShrink: 0 }} />
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, flex: 1 }}>
          {title}
        </span>
        <span className="font-display tabular" style={{ fontSize: 16, color: accent }}>{items.length}</span>
        {items.length > 0 && (
          <div style={{ display: "flex", gap: 4, marginLeft: 4 }}>
            <ToggleBtn label={t(lang, "tradeSelectAll")} active={selected.size === items.length} onClick={onSelectAll} />
            <ToggleBtn label={t(lang, "tradeSelectNone")} active={selected.size === 0} onClick={onSelectNone} />
          </div>
        )}
      </div>

      {/* Scrollable list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {items.length === 0 ? (
          <p style={{ fontSize: 12, fontStyle: "italic", color: "var(--ink-3)", padding: "12px 16px" }}>{emptyLabel}</p>
        ) : (
          items.map((s) => {
            const checked = selected.has(s.id);
            const subtitle = getSubtitle(s);
            return (
              <label
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "5px 16px",
                  cursor: "pointer",
                  background: checked ? `color-mix(in oklab, ${accent} 8%, transparent)` : "transparent",
                  transition: "background 0.12s",
                  userSelect: "none",
                }}
              >
                {/* Custom checkbox */}
                <span
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 4,
                    border: `1.5px solid ${checked ? accent : "var(--hairline-3)"}`,
                    background: checked ? accent : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.12s, border-color 0.12s",
                  }}
                >
                  {checked && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={accent === "var(--gold-light)" ? "#1a1408" : "#fff"} strokeWidth="3.5">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(s.id)}
                  style={{ display: "none" }}
                />
                {/* Sticker info */}
                <span className="font-mono" style={{ fontSize: 10, color: accent, fontWeight: 700, minWidth: 42, flexShrink: 0 }}>
                  {s.code}
                </span>
                <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 12, color: checked ? "var(--ink)" : "var(--ink-2)" }}>
                  {s.name}
                </span>
                {subtitle && (
                  <span style={{ fontSize: 9.5, color: "var(--ink-3)", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
                    {subtitle}
                  </span>
                )}
              </label>
            );
          })
        )}
      </div>
    </div>
  );
}

function Chip({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", background: `color-mix(in oklab, ${accent} 12%, transparent)`, borderRadius: 999, border: `1px solid color-mix(in oklab, ${accent} 30%, transparent)` }}>
      <span style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: accent, fontFamily: "var(--font-mono, monospace)" }}>{label}</span>
      <span className="font-display tabular" style={{ fontSize: 14, color: accent, lineHeight: 1 }}>{value}</span>
    </span>
  );
}

function ToggleBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 8.5,
        padding: "2px 6px",
        borderRadius: 3,
        border: "1px solid",
        cursor: "pointer",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        fontFamily: "var(--font-mono, monospace)",
        background: active ? "var(--gold-bg)" : "transparent",
        color: active ? "var(--gold)" : "var(--ink-3)",
        borderColor: active ? "rgba(212,168,87,0.3)" : "var(--hairline-3)",
        transition: "all 0.12s",
      }}
    >
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────────── Main component */

export default function ImportExport({ state, onImport, onReset, lang }: Props) {
  const [tradeOpen, setTradeOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [partner, setPartner] = useState<PartnerData | null>(null);
  const [matchOpen, setMatchOpen] = useState(false);
  const [selectedGet, setSelectedGet] = useState<Set<string>>(new Set());
  const [selectedGive, setSelectedGive] = useState<Set<string>>(new Set());

  const fileRef = useRef<HTMLInputElement>(null);
  const partnerRef = useRef<HTMLInputElement>(null);

  const duplicates = allStickers.filter((s) => (state[s.id] ?? 0) >= 2);

  // Cross-match lists
  const iCanGet = partner
    ? allStickers.filter((s) => (partner.state[s.id] ?? 0) >= 2 && (state[s.id] ?? 0) === 0)
    : [];
  const iCanGive = partner
    ? allStickers.filter((s) => (state[s.id] ?? 0) >= 2 && (partner.state[s.id] ?? 0) === 0)
    : [];

  const tradeText = duplicates
    .map((s) => {
      const count = (state[s.id] ?? 0) - 1;
      return `${s.code} – ${s.name} (${s.teamName}) x${count}`;
    })
    .join("\n");

  /* ── File handlers ── */

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const newState = await importAlbum(file);
      onImport(newState);
      setError("");
    } catch {
      setError("Invalid file. Please use a valid JSON export.");
    }
    e.target.value = "";
  };

  const handlePartnerImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const partnerState = await importAlbum(file);
      const total = allStickers.filter((s) => (partnerState[s.id] ?? 0) >= 1).length;
      const dups = allStickers.filter((s) => (partnerState[s.id] ?? 0) >= 2).length;
      const pData: PartnerData = { state: partnerState, total, dups };
      setPartner(pData);
      // Compute matches immediately to set default selections
      const canGet = allStickers.filter((s) => (partnerState[s.id] ?? 0) >= 2 && (state[s.id] ?? 0) === 0);
      const canGive = allStickers.filter((s) => (state[s.id] ?? 0) >= 2 && (partnerState[s.id] ?? 0) === 0);
      setSelectedGet(new Set(canGet.map((s) => s.id)));
      setSelectedGive(new Set(canGive.map((s) => s.id)));
      setMatchOpen(true);
      setError("");
    } catch {
      setError(
        lang === "es"
          ? "Archivo inválido. Usa un JSON exportado del álbum."
          : "Invalid file. Please use a valid album JSON export."
      );
    }
    e.target.value = "";
  };

  /* ── Selection helpers ── */

  const toggleGet = (id: string) =>
    setSelectedGet((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const toggleGive = (id: string) =>
    setSelectedGive((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  /* ── Proceed: apply trade to own inventory ── */

  const handleProceed = () => {
    const next = { ...state };
    // Give 1× each selected sticker
    for (const id of selectedGive) {
      next[id] = Math.max(0, (next[id] ?? 0) - 1);
    }
    // Receive 1× each selected sticker
    for (const id of selectedGet) {
      next[id] = (next[id] ?? 0) + 1;
    }
    onImport(next);
    setMatchOpen(false);
    setPartner(null);
    setTradeOpen(false);
    setSelectedGet(new Set());
    setSelectedGive(new Set());
  };

  /* ── Copy list ── */

  const handleCopy = async () => {
    let success = false;
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(tradeText);
        success = true;
      }
    } catch { /* fall through */ }
    if (!success) {
      try {
        const ta = document.createElement("textarea");
        ta.value = tradeText;
        ta.setAttribute("readonly", "");
        Object.assign(ta.style, { position: "fixed", top: "0", left: "0", opacity: "0" });
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        success = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch { success = false; }
    }
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setError(lang === "es" ? "No se pudo copiar al portapapeles" : "Could not copy to clipboard");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm(t(lang, "resetConfirm"))) onReset();
  };

  const openModal = () => {
    if (!partner) return;
    // Re-sync selections to current state
    setSelectedGet(new Set(iCanGet.map((s) => s.id)));
    setSelectedGive(new Set(iCanGive.map((s) => s.id)));
    setMatchOpen(true);
  };

  /* ── Render ── */

  return (
    <>
      {/* ── Top action bar ── */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 11 }}>
        <button onClick={() => exportAlbum(state)} className="btn-ghost">
          <Icon path="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          {t(lang, "exportBtn")}
        </button>
        <button onClick={() => fileRef.current?.click()} className="btn-ghost">
          <Icon path="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          {t(lang, "importBtn")}
        </button>
        <button
          onClick={() => { setTradeOpen((v) => !v); if (tradeOpen) { setPartner(null); setMatchOpen(false); } }}
          className="btn-ghost"
          style={{
            color: "var(--gold-light)",
            borderColor: tradeOpen ? "var(--gold)" : "var(--hairline-2)",
            background: tradeOpen ? "var(--gold-bg)" : "transparent",
          }}
        >
          <Icon path="M3 12a9 9 0 109-9M21 3v9h-9" />
          {t(lang, "tradeList")}
          {duplicates.length > 0 && (
            <span className="font-mono tabular" style={{ fontSize: 9, marginLeft: 4, padding: "2px 5px", borderRadius: 3, background: "var(--gold-bg)", color: "var(--gold)" }}>
              {duplicates.length}
            </span>
          )}
        </button>
        <button
          onClick={handleReset}
          className="btn-ghost"
          style={{ marginLeft: "auto", color: "var(--ink-3)" }}
          title={t(lang, "resetAlbum")}
        >
          <Icon path="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
          {t(lang, "resetAlbum")}
        </button>
      </div>

      {error && <p style={{ fontSize: 11, marginTop: 6, color: "#f87171" }}>{error}</p>}

      <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleImport} />
      <input ref={partnerRef} type="file" accept=".json" style={{ display: "none" }} onChange={handlePartnerImport} />

      {/* ── Trade panel ── */}
      {tradeOpen && (
        <div style={panelStyle}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="font-mono" style={monoLabel}>{t(lang, "tradeListLong")}</span>
              <span className="font-display tabular" style={{ fontSize: 22, color: "var(--gold-light)", lineHeight: 1 }}>{duplicates.length}</span>
              <span className="font-serif" style={{ fontSize: 13, color: "var(--ink-3)", fontStyle: "italic" }}>{t(lang, "tradeListDesc")}</span>
            </div>
            <button
              onClick={() => { setTradeOpen(false); setPartner(null); setMatchOpen(false); }}
              style={{ background: "transparent", border: 0, color: "var(--ink-3)", cursor: "pointer", fontSize: 14, padding: 4 }}
              aria-label="Close"
            >✕</button>
          </div>

          {/* Own duplicates grid */}
          {duplicates.length === 0 ? (
            <p className="font-serif" style={{ fontSize: 13, fontStyle: "italic", color: "var(--ink-3)" }}>{t(lang, "noTrade")}</p>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "6px 24px", maxHeight: 160, overflowY: "auto", paddingTop: 10, borderTop: "1px solid rgba(212,168,87,0.15)" }}>
                {duplicates.map((s) => {
                  const extras = (state[s.id] ?? 0) - 1;
                  return (
                    <div key={s.id} style={{ display: "flex", alignItems: "baseline", gap: 8, fontSize: 11.5, color: "var(--ink-2)" }}>
                      <span className="font-mono" style={{ color: "var(--gold)", fontWeight: 600, minWidth: 44 }}>{s.code}</span>
                      <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</span>
                      <span className="font-mono tabular" style={{ color: "var(--gold-light)", fontWeight: 600 }}>×{extras}</span>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={handleCopy}
                className="btn-ghost"
                style={{ marginTop: 12, color: copied ? "var(--have)" : "var(--gold-light)", borderColor: copied ? "rgba(130,181,138,0.3)" : "var(--gold)" }}
              >
                {copied ? `✓ ${t(lang, "copied")}` : `📋 ${t(lang, "copyTrade")}`}
              </button>
            </>
          )}

          {/* ── Cruce de álbumes ── */}
          <div style={{ margin: "18px 0 14px", borderTop: "1px solid rgba(212,168,87,0.15)", paddingTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <span className="font-mono" style={monoLabel}>{t(lang, "tradeMatchTitle")}</span>
            {partner ? (
              <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={openModal} className="btn-ghost" style={{ fontSize: 10, color: "var(--gold-light)", borderColor: "var(--gold)" }}>
                  {t(lang, "tradeViewMatch")}
                </button>
                <button onClick={() => { setPartner(null); setMatchOpen(false); }} className="btn-ghost" style={{ fontSize: 10, color: "var(--ink-3)" }}>
                  {t(lang, "clearPartner")}
                </button>
              </div>
            ) : (
              <button onClick={() => partnerRef.current?.click()} className="btn-ghost" style={{ fontSize: 10, color: "var(--gold-light)", borderColor: "var(--gold)", marginLeft: "auto" }}>
                <Icon path="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                {t(lang, "loadPartner")}
              </button>
            )}
          </div>

          {/* Partner summary (compact, no lists — those are in the modal) */}
          {partner ? (
            <div style={{ display: "flex", gap: 20, padding: "10px 14px", background: "rgba(212,168,87,0.07)", borderRadius: "var(--radius-sm, 6px)", border: "1px solid rgba(212,168,87,0.18)", flexWrap: "wrap", alignItems: "center" }}>
              <Stat label={t(lang, "partnerTotal")} value={partner.total} total={980} />
              <Stat label={t(lang, "partnerDups")} value={partner.dups} accent="var(--dup)" />
              <Stat label={t(lang, "iCanGet")} value={iCanGet.length} accent="var(--have)" />
              <Stat label={t(lang, "iCanGive")} value={iCanGive.length} accent="var(--gold-light)" />
              <button
                onClick={openModal}
                style={{
                  marginLeft: "auto",
                  padding: "7px 16px",
                  background: "var(--gold)",
                  color: "#1a1408",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {t(lang, "tradeViewMatch")}
              </button>
            </div>
          ) : (
            <p className="font-serif" style={{ fontSize: 12.5, fontStyle: "italic", color: "var(--ink-3)" }}>
              {lang === "es"
                ? "Carga el JSON de tu compañero para cruzar álbumes."
                : "Load your partner's JSON to cross-match albums."}
            </p>
          )}
        </div>
      )}

      {/* ── Trade match modal (portal) ── */}
      {matchOpen && partner && typeof document !== "undefined" &&
        createPortal(
          <TradeModal
            lang={lang}
            iCanGet={iCanGet}
            iCanGive={iCanGive}
            partner={partner}
            ownState={state}
            selectedGet={selectedGet}
            selectedGive={selectedGive}
            onToggleGet={toggleGet}
            onToggleGive={toggleGive}
            onSelectAllGet={() => setSelectedGet(new Set(iCanGet.map((s) => s.id)))}
            onSelectNoneGet={() => setSelectedGet(new Set())}
            onSelectAllGive={() => setSelectedGive(new Set(iCanGive.map((s) => s.id)))}
            onSelectNoneGive={() => setSelectedGive(new Set())}
            onProceed={handleProceed}
            onClose={() => setMatchOpen(false)}
          />,
          document.body
        )
      }
    </>
  );
}
