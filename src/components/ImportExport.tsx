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
  background: "rgba(15,23,42,0.85)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "12px",
  marginTop: "10px",
  padding: "16px",
};

export default function ImportExport({
  state,
  onImport,
  onReset,
  lang,
}: Props) {
  const [open, setOpen] = useState(false);
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
      setOpen(false);
    } catch {
      setError("Invalid file. Please use a valid JSON export.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(tradeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm(t(lang, "resetConfirm"))) {
      onReset();
      setOpen(false);
    }
  };

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150"
          style={{
            background: open ? "rgba(96,165,250,0.12)" : "rgba(15,23,42,0.7)",
            border: `1px solid ${open ? "rgba(96,165,250,0.3)" : "rgba(255,255,255,0.07)"}`,
            color: open ? "#93c5fd" : "#64748b",
          }}
        >
          <span>📂</span>
          {t(lang, "importExport")}
        </button>

        <button
          onClick={() => setTradeOpen(!tradeOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150"
          style={{
            background: tradeOpen
              ? "rgba(251,191,36,0.12)"
              : "rgba(15,23,42,0.7)",
            border: `1px solid ${tradeOpen ? "rgba(251,191,36,0.35)" : "rgba(255,255,255,0.07)"}`,
            color: tradeOpen ? "#fcd34d" : "#64748b",
          }}
        >
          <span>🔁</span>
          {t(lang, "tradeList")}
          {duplicates.length > 0 && (
            <span
              className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-black"
              style={{ background: "rgba(251,191,36,0.2)", color: "#fbbf24" }}
            >
              {duplicates.length}
            </span>
          )}
        </button>
      </div>

      {/* Import / Export panel */}
      {open && (
        <div style={panelStyle}>
          <div className="flex flex-wrap gap-2">
            <ActionBtn
              onClick={() => exportAlbum(state)}
              color="rgba(96,165,250,0.14)"
              border="rgba(96,165,250,0.28)"
              text="#93c5fd"
            >
              ⬇️ {t(lang, "exportBtn")}
            </ActionBtn>
            <ActionBtn
              onClick={() => fileRef.current?.click()}
              color="rgba(34,197,94,0.12)"
              border="rgba(34,197,94,0.28)"
              text="#86efac"
            >
              ⬆️ {t(lang, "importBtn")}
            </ActionBtn>
            <ActionBtn
              onClick={handleReset}
              color="rgba(220,38,38,0.1)"
              border="rgba(220,38,38,0.25)"
              text="#fca5a5"
            >
              🗑️ {t(lang, "resetAlbum")}
            </ActionBtn>
          </div>
          {error && (
            <p className="text-[11px] mt-2" style={{ color: "#f87171" }}>
              {error}
            </p>
          )}
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      )}

      {/* Trade list panel */}
      {tradeOpen && (
        <div style={{ ...panelStyle, borderColor: "rgba(251,191,36,0.15)" }}>
          <div className="flex items-center justify-between mb-2">
            <h3
              className="font-display text-base tracking-wide"
              style={{ color: "#fbbf24" }}
            >
              LISTA DE INTERCAMBIO
            </h3>
            <button
              onClick={() => setTradeOpen(false)}
              className="transition-colors duration-150 text-sm"
              style={{ color: "#475569" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#cbd5e1")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
            >
              ✕
            </button>
          </div>
          <p className="text-[10px] mb-3" style={{ color: "#475569" }}>
            {t(lang, "tradeListDesc")}
          </p>

          {duplicates.length === 0 ? (
            <p className="text-sm italic" style={{ color: "#334155" }}>
              {t(lang, "noTrade")}
            </p>
          ) : (
            <>
              <div className="max-h-48 overflow-y-auto space-y-1 mb-3">
                {duplicates.map((s) => {
                  const extras = (state[s.id] ?? 0) - 1;
                  return (
                    <div
                      key={s.id}
                      className="flex justify-between text-[11px]"
                      style={{ color: "#94a3b8" }}
                    >
                      <span
                        className="font-mono font-bold"
                        style={{ color: "#fbbf24" }}
                      >
                        {s.code}
                      </span>
                      <span className="flex-1 mx-2 truncate">{s.name}</span>
                      <span className="font-bold" style={{ color: "#f59e0b" }}>
                        ×{extras}
                      </span>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150"
                style={{
                  background: copied
                    ? "rgba(34,197,94,0.12)"
                    : "rgba(251,191,36,0.1)",
                  border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(251,191,36,0.3)"}`,
                  color: copied ? "#86efac" : "#fcd34d",
                }}
              >
                {copied
                  ? `✅ ${t(lang, "copied")}`
                  : `📋 ${t(lang, "copyTrade")}`}
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

function ActionBtn({
  children,
  onClick,
  color,
  border,
  text,
}: {
  children: React.ReactNode;
  onClick: () => void;
  color: string;
  border: string;
  text: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150"
      style={{ background: color, border: `1px solid ${border}`, color: text }}
      onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.2)")}
      onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
    >
      {children}
    </button>
  );
}
