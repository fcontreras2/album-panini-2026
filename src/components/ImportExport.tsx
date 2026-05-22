"use client";

import { useRef, useState } from "react";
import { AlbumState, Language } from "@/types";
import { exportAlbum, importAlbum } from "@/lib/storage";
import { allStickers } from "@/data/stickers";
import { t } from "@/lib/i18n";

interface Props {
  state: AlbumState;
  onImport: (s: AlbumState) => void;
  onReset: () => void;
  lang: Language;
}

const panelStyle: React.CSSProperties = {
  marginTop: 14,
  padding: 18,
  background: "var(--gold-bg)",
  border: "1px solid rgba(212,168,87,0.20)",
  borderRadius: "var(--radius)",
};

export default function ImportExport({ state, onImport, onReset, lang }: Props) {
  const [tradeOpen, setTradeOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const duplicates = allStickers.filter((s) => (state[s.id] ?? 0) >= 2);

  const tradeText = duplicates
    .map((s) => {
      const count = (state[s.id] ?? 0) - 1;
      return `${s.code} – ${s.name} (${s.teamName}) x${count}`;
    })
    .join("\n");

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
  };

  const handleCopy = async () => {
    let success = false;
    // 1) Try modern clipboard API (HTTPS / localhost only)
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(tradeText);
        success = true;
      }
    } catch {
      /* fall through */
    }
    // 2) Fallback: textarea + execCommand (works on HTTP, older browsers, mobile)
    if (!success) {
      try {
        const ta = document.createElement("textarea");
        ta.value = tradeText;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "0";
        ta.style.left = "0";
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
      setError(lang === "es" ? "No se pudo copiar al portapapeles" : "Could not copy to clipboard");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm(t(lang, "resetConfirm"))) onReset();
  };

  return (
    <>
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
          onClick={() => setTradeOpen((v) => !v)}
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
            <span
              className="font-mono tabular"
              style={{
                fontSize: 9,
                marginLeft: 4,
                padding: "2px 5px",
                borderRadius: 3,
                background: "var(--gold-bg)",
                color: "var(--gold)",
              }}
            >
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

      {error && (
        <p style={{ fontSize: 11, marginTop: 6, color: "#f87171" }}>{error}</p>
      )}
      <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleImport} />

      {tradeOpen && (
        <div style={panelStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                className="font-mono"
                style={{
                  fontSize: 9.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                {t(lang, "tradeListLong")}
              </span>
              <span
                className="font-display tabular"
                style={{ fontSize: 22, color: "var(--gold-light)", lineHeight: 1 }}
              >
                {duplicates.length}
              </span>
              <span className="font-serif" style={{ fontSize: 13, color: "var(--ink-3)", fontStyle: "italic" }}>
                {t(lang, "tradeListDesc")}
              </span>
            </div>
            <button
              onClick={() => setTradeOpen(false)}
              style={{
                background: "transparent",
                border: 0,
                color: "var(--ink-3)",
                cursor: "pointer",
                fontSize: 14,
                padding: 4,
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {duplicates.length === 0 ? (
            <p className="font-serif" style={{ fontSize: 13, fontStyle: "italic", color: "var(--ink-3)" }}>
              {t(lang, "noTrade")}
            </p>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "6px 24px",
                  maxHeight: 220,
                  overflowY: "auto",
                  paddingTop: 10,
                  borderTop: "1px solid rgba(212,168,87,0.15)",
                }}
              >
                {duplicates.map((s) => {
                  const extras = (state[s.id] ?? 0) - 1;
                  return (
                    <div
                      key={s.id}
                      style={{ display: "flex", alignItems: "baseline", gap: 8, fontSize: 11.5, color: "var(--ink-2)" }}
                    >
                      <span className="font-mono" style={{ color: "var(--gold)", fontWeight: 600, minWidth: 44 }}>
                        {s.code}
                      </span>
                      <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {s.name}
                      </span>
                      <span className="font-mono tabular" style={{ color: "var(--gold-light)", fontWeight: 600 }}>
                        ×{extras}
                      </span>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={handleCopy}
                className="btn-ghost"
                style={{
                  marginTop: 12,
                  color: copied ? "var(--have)" : "var(--gold-light)",
                  borderColor: copied ? "rgba(130,181,138,0.3)" : "var(--gold)",
                }}
              >
                {copied ? `✓ ${t(lang, "copied")}` : `📋 ${t(lang, "copyTrade")}`}
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

function Icon({ path }: { path: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={path} />
    </svg>
  );
}
