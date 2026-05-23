"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Language } from "@/types";

/* ── Illustrations ────────────────────────────────────────────── */

/** Browser-only storage: device yes, cloud no */
function IlluStorage() {
  return (
    <svg viewBox="0 0 300 160" width="300" height="160" aria-hidden="true">
      {/* ── Browser / device (left) ── */}
      <rect x="14" y="20" width="110" height="124" rx="10"
        fill="color-mix(in oklab, var(--have) 10%, transparent)"
        stroke="var(--have)" strokeWidth="1.4" />
      {/* Screen bezel */}
      <rect x="22" y="32" width="94" height="68" rx="5"
        fill="var(--bg)" stroke="var(--hairline-2)" strokeWidth="0.8" />
      {/* Browser tabs */}
      <rect x="26" y="36" width="30" height="8" rx="3"
        fill="color-mix(in oklab, var(--gold) 20%, transparent)" stroke="var(--gold)" strokeWidth="0.8" />
      <text x="41" y="43" textAnchor="middle" fontSize="5.5" fill="var(--gold)" fontFamily="monospace">ÁLBUM</text>
      {/* Data rows in screen */}
      {[0,1,2,3].map(i => (
        <rect key={i} x="26" y={50 + i * 11} width={i === 0 ? 78 : i === 1 ? 60 : i === 2 ? 72 : 48}
          height="7" rx="2" fill="var(--hairline-2)" />
      ))}
      {/* localStorage badge */}
      <rect x="26" y="106" width="82" height="18" rx="4"
        fill="color-mix(in oklab, var(--have) 18%, transparent)"
        stroke="var(--have)" strokeWidth="1" />
      <text x="67" y="118" textAnchor="middle" fontSize="7.5" fill="var(--have)" fontFamily="monospace" fontWeight="700">localStorage ✓</text>
      {/* Device label */}
      <text x="69" y="154" textAnchor="middle" fontSize="8" fill="var(--have)" fontFamily="monospace" fontWeight="700">TU DISPOSITIVO</text>

      {/* ── Arrow in the middle ── */}
      <line x1="140" y1="82" x2="180" y2="82" stroke="var(--hairline-3)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="160" y="72" textAnchor="middle" fontSize="22" fill="var(--hairline-3)">✕</text>

      {/* ── Cloud / server (right) ── */}
      <rect x="186" y="20" width="100" height="124" rx="10"
        fill="color-mix(in oklab, var(--ink-4) 8%, transparent)"
        stroke="var(--hairline-3)" strokeWidth="1.2" strokeDasharray="4 3" />
      {/* Cloud icon */}
      <ellipse cx="236" cy="72" rx="28" ry="18" fill="none" stroke="var(--hairline-3)" strokeWidth="1.8" />
      <ellipse cx="220" cy="76" rx="14" ry="10" fill="none" stroke="var(--hairline-3)" strokeWidth="1.4" />
      <ellipse cx="250" cy="76" rx="14" ry="10" fill="none" stroke="var(--hairline-3)" strokeWidth="1.4" />
      <line x1="208" y1="80" x2="264" y2="80" stroke="var(--bg)" strokeWidth="8" />
      {/* X over cloud */}
      <line x1="218" y1="58" x2="254" y2="94" stroke="var(--hairline-3)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="254" y1="58" x2="218" y2="94" stroke="var(--hairline-3)" strokeWidth="2.5" strokeLinecap="round" />
      <text x="236" y="120" textAnchor="middle" fontSize="7" fill="var(--ink-4)" fontFamily="monospace">Sin servidor</text>
      <text x="236" y="131" textAnchor="middle" fontSize="7" fill="var(--ink-4)" fontFamily="monospace">Sin cuenta</text>
      <text x="236" y="154" textAnchor="middle" fontSize="8" fill="var(--ink-4)" fontFamily="monospace" fontWeight="700">INTERNET / NUBE</text>
    </svg>
  );
}

/** JSON as a safety-net backup file */
function IlluJSON() {
  const lines = [
    '{ "ARG01": 1,',
    '  "ARG02": 2,',
    '  "BRA05": 1,',
    '  "MEX03": 3,',
    '  …',
    '}',
  ];
  return (
    <svg viewBox="0 0 300 160" width="300" height="160" aria-hidden="true">
      {/* File card */}
      <rect x="60" y="16" width="110" height="128" rx="8"
        fill="var(--surface)" stroke="var(--gold)" strokeWidth="1.4" />
      {/* Fold corner */}
      <polygon points="138,16 170,16 170,48" fill="var(--gold-bg)" stroke="var(--gold)" strokeWidth="1" />
      {/* .json tag */}
      <rect x="68" y="24" width="32" height="13" rx="3"
        fill="color-mix(in oklab, var(--gold) 20%, transparent)" stroke="var(--gold)" strokeWidth="0.8" />
      <text x="84" y="34" textAnchor="middle" fontSize="7" fill="var(--gold)" fontFamily="monospace" fontWeight="700">.json</text>
      {/* Code lines */}
      {lines.map((l, i) => (
        <text key={i} x="72" y={50 + i * 14} fontSize="8.5" fill={i === 0 || i === 5 ? "var(--gold)" : i === 4 ? "var(--ink-3)" : "var(--ink-2)"}
          fontFamily="monospace">{l}</text>
      ))}
      {/* Arrow → destinations */}
      <line x1="174" y1="80" x2="196" y2="80" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="193,76 200,80 193,84" fill="var(--gold)" />
      {/* Destination chips */}
      {[
        { label: "📧 Email",        y: 36 },
        { label: "☁ Drive",        y: 62 },
        { label: "💬 WhatsApp",     y: 88 },
        { label: "💾 Disco local",  y: 114 },
      ].map((d) => (
        <g key={d.label}>
          <rect x="204" y={d.y} width="80" height="18" rx="4"
            fill="var(--surface-2)" stroke="var(--hairline-2)" strokeWidth="0.8" />
          <text x="244" y={d.y + 12} textAnchor="middle" fontSize="8.5" fill="var(--ink-2)" fontFamily="sans-serif">{d.label}</text>
        </g>
      ))}
    </svg>
  );
}

/* ── Pill components ──────────────────────────────────────────── */

function ProPill({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
      <span style={{
        flexShrink: 0,
        width: 18, height: 18,
        borderRadius: "50%",
        background: "color-mix(in oklab, var(--have) 18%, transparent)",
        border: "1.5px solid var(--have)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, color: "var(--have)", fontWeight: 700, lineHeight: 1,
      }}>✓</span>
      <span style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55 }}>{text}</span>
    </div>
  );
}

function ConPill({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
      <span style={{
        flexShrink: 0,
        width: 18, height: 18,
        borderRadius: "50%",
        background: "color-mix(in oklab, #f87171 14%, transparent)",
        border: "1.5px solid #f87171",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, color: "#f87171", fontWeight: 700, lineHeight: 1,
      }}>✕</span>
      <span style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55 }}>{text}</span>
    </div>
  );
}

/* ── Section heading ─────────────────────────────────────────── */

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{
      fontSize: 8.5,
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color: "var(--gold)",
      fontFamily: "var(--font-mono, monospace)",
      fontWeight: 700,
      marginBottom: 12,
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}>
      <span style={{ flex: 1, height: 1, background: "rgba(212,168,87,0.2)" }} />
      {text}
      <span style={{ flex: 1, height: 1, background: "rgba(212,168,87,0.2)" }} />
    </div>
  );
}

/* ── Full modal ───────────────────────────────────────────────── */

function StorageModal({ lang, onClose, onExport }: {
  lang: Language;
  onClose: () => void;
  onExport: () => void;
}) {
  const [tab, setTab] = useState<"storage" | "json">("storage");
  const es = lang === "es";

  const pros = es
    ? [
        "Instantáneo — se guarda solo, sin necesitar internet",
        "Privado — nadie más puede ver tu colección",
        "Sin cuenta — no necesitas registrarte en ningún lado",
        "Offline — funciona aunque no tengas conexión",
      ]
    : [
        "Instant — saves automatically, no internet needed",
        "Private — nobody else can see your collection",
        "No account — no sign-up required anywhere",
        "Offline — works without a connection",
      ];

  const cons = es
    ? [
        "Solo en este navegador y dispositivo — no se sincroniza",
        "Borrar los datos del navegador borra tu álbum",
        "Cambiar de teléfono o PC = empezar desde cero (sin backup)",
        "El modo incógnito no guarda nada al cerrar la ventana",
      ]
    : [
        "Only in this browser and device — not synced anywhere",
        "Clearing browser data deletes your album",
        "Changing phone or PC = starting over (without backup)",
        "Incognito mode saves nothing when the window closes",
      ];

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
        background: "rgba(0,0,0,0.80)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div style={{
        width: "100%", maxWidth: 520,
        maxHeight: "92dvh",
        background: "var(--surface)",
        border: "1px solid var(--hairline)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
        display: "flex", flexDirection: "column",
      }}>

        {/* ── Top bar ── */}
        <div style={{
          padding: "14px 20px",
          borderBottom: "1px solid var(--hairline-2)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <span className="font-mono" style={{
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}>
            {es ? "Tu álbum, tu responsabilidad" : "Your album, your responsibility"}
          </span>
          <button onClick={onClose} style={{
            background: "transparent", border: 0,
            color: "var(--ink-3)", cursor: "pointer",
            fontSize: 18, lineHeight: 1, padding: 4,
          }} aria-label="Close">✕</button>
        </div>

        {/* ── Tab switcher ── */}
        <div style={{
          display: "flex",
          borderBottom: "1px solid var(--hairline-2)",
          flexShrink: 0,
        }}>
          {([
            { id: "storage" as const, label: es ? "Almacenamiento" : "Storage" },
            { id: "json"    as const, label: "Archivo JSON" },
          ]).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                flex: 1,
                padding: "10px 0",
                background: "transparent",
                border: "none",
                borderBottom: tab === id ? "2px solid var(--gold)" : "2px solid transparent",
                color: tab === id ? "var(--gold)" : "var(--ink-3)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "color 0.15s, border-color 0.15s",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div style={{ overflowY: "auto", flex: 1 }}>

          {/* TAB 1: Storage */}
          {tab === "storage" && (
            <div style={{ padding: "24px 24px 8px" }}>

              {/* Illustration */}
              <div style={{
                display: "flex", justifyContent: "center",
                padding: "8px 0 20px",
                borderBottom: "1px solid var(--hairline-2)",
                marginBottom: 20,
              }}>
                <IlluStorage />
              </div>

              {/* Main explanation */}
              <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7, margin: "0 0 20px" }}>
                {es
                  ? <>Tu álbum <strong style={{ color: "var(--ink)" }}>no está en ningún servidor</strong>. Vive en la memoria interna de este navegador, en este dispositivo. Se llama <strong style={{ color: "var(--gold)" }}>localStorage</strong>: es instantáneo, privado y funciona sin conexión — pero depende completamente de ti mantener un respaldo.</>
                  : <>Your album is <strong style={{ color: "var(--ink)" }}>not on any server</strong>. It lives in the internal memory of this browser, on this device. It's called <strong style={{ color: "var(--gold)" }}>localStorage</strong>: it's instant, private and works offline — but it's completely up to you to keep a backup.</>
                }
              </p>

              {/* Pros */}
              <SectionLabel text={es ? "Ventajas" : "Pros"} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {pros.map((p) => <ProPill key={p} text={p} />)}
              </div>

              {/* Cons */}
              <SectionLabel text={es ? "Limitaciones" : "Cons"} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {cons.map((c) => <ConPill key={c} text={c} />)}
              </div>

              {/* Key warning */}
              <div style={{
                padding: "14px 16px",
                background: "color-mix(in oklab, var(--gold) 8%, transparent)",
                border: "1px solid rgba(212,168,87,0.30)",
                borderLeft: "3px solid var(--gold)",
                borderRadius: "var(--radius-sm)",
                marginBottom: 20,
              }}>
                <p className="font-serif" style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
                  {es
                    ? "Si cambias de dispositivo, usas otro navegador, o limpias los datos del navegador, tu álbum desaparece. El JSON es tu única copia de seguridad — trátalo como si fuera el álbum físico."
                    : "If you switch devices, use a different browser, or clear browser data, your album disappears. The JSON is your only backup — treat it like the physical album."
                  }
                </p>
              </div>

              {/* CTA */}
              <div style={{ display: "flex", justifyContent: "center", paddingBottom: 24 }}>
                <button
                  onClick={() => setTab("json")}
                  style={{
                    padding: "9px 24px",
                    background: "var(--gold)",
                    color: "#1a1408",
                    border: "none",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {es ? "¿Qué es el JSON? →" : "What is the JSON? →"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: JSON */}
          {tab === "json" && (
            <div style={{ padding: "24px 24px 8px" }}>

              {/* Illustration */}
              <div style={{
                display: "flex", justifyContent: "center",
                padding: "8px 0 20px",
                borderBottom: "1px solid var(--hairline-2)",
                marginBottom: 20,
              }}>
                <IlluJSON />
              </div>

              {/* What is JSON */}
              <SectionLabel text={es ? "¿Qué es el archivo JSON?" : "What is the JSON file?"} />
              <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7, margin: "0 0 16px" }}>
                {es
                  ? <>El JSON es una <strong style={{ color: "var(--ink)" }}>fotografía de texto</strong> de tu álbum. Contiene cada figurita y cuántas copias tienes, en un formato sencillo que cualquier computadora puede leer. Puedes abrirlo con el Bloc de Notas y ver tu colección exacta.</>
                  : <>The JSON is a <strong style={{ color: "var(--ink)" }}>text snapshot</strong> of your album. It contains every sticker and how many copies you have, in a simple format any computer can read. You can open it with Notepad and see your exact collection.</>
                }
              </p>
              <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7, margin: "0 0 20px" }}>
                {es
                  ? "Cuando exportas, descargas este archivo. Cuando importas, lo cargas de vuelta. Es todo lo que necesitas para restaurar tu álbum en cualquier momento, en cualquier dispositivo."
                  : "When you export, you download this file. When you import, you load it back. It's all you need to restore your album at any time, on any device."
                }
              </p>

              {/* How to keep it safe */}
              <SectionLabel text={es ? "¿Dónde guardarlo?" : "Where to keep it?"} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {(es
                  ? [
                      "Google Drive, iCloud o Dropbox — siempre disponible",
                      "Enviártelo por WhatsApp o email — fácil de recuperar",
                      "Una carpeta en tu computadora — copia local",
                      "Compartirlo con tu compañero de intercambio — sin necesidad de estar juntos",
                    ]
                  : [
                      "Google Drive, iCloud or Dropbox — always available",
                      "Send it to yourself by WhatsApp or email — easy to recover",
                      "A folder on your computer — local copy",
                      "Share it with your trade partner — no need to be together",
                    ]
                ).map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{
                      flexShrink: 0,
                      width: 18, height: 18,
                      borderRadius: "50%",
                      background: "color-mix(in oklab, var(--gold) 15%, transparent)",
                      border: "1.5px solid var(--gold)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, color: "var(--gold)", fontWeight: 700, lineHeight: 1,
                    }}>✦</span>
                    <span style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55 }}>{t}</span>
                  </div>
                ))}
              </div>

              {/* Recommendation */}
              <div style={{
                padding: "14px 16px",
                background: "color-mix(in oklab, var(--have) 8%, transparent)",
                border: "1px solid rgba(130,181,138,0.30)",
                borderLeft: "3px solid var(--have)",
                borderRadius: "var(--radius-sm)",
                marginBottom: 24,
              }}>
                <p className="font-serif" style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
                  {es
                    ? "Exporta tu álbum cada vez que abres un sobre nuevo. Es un archivo pequeño (menos de 10 KB) y tarda menos de un segundo. No hay excusa para no tener un respaldo."
                    : "Export your album every time you open a new pack. It's a tiny file (under 10 KB) and takes less than a second. No excuse not to have a backup."
                  }
                </p>
              </div>

              {/* CTA */}
              <div style={{ display: "flex", gap: 10, justifyContent: "center", paddingBottom: 24, flexWrap: "wrap" }}>
                <button
                  onClick={() => { onExport(); onClose(); }}
                  style={{
                    padding: "9px 24px",
                    background: "var(--gold)",
                    color: "#1a1408",
                    border: "none",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  ↓ {es ? "Exportar ahora" : "Export now"}
                </button>
                <button onClick={onClose} className="btn-ghost" style={{ fontSize: 11 }}>
                  {es ? "Cerrar" : "Close"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Public: notice + trigger ─────────────────────────────────── */

export default function StorageInfo({
  lang,
  onExport,
}: {
  lang: Language;
  onExport: () => void;
}) {
  const [open, setOpen] = useState(false);
  const es = lang === "es";

  return (
    <>
      {/* ── Persistent inline notice ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        marginTop: 10,
        background: "color-mix(in oklab, var(--gold) 6%, transparent)",
        border: "1px solid rgba(212,168,87,0.18)",
        borderRadius: "var(--radius-sm)",
        flexWrap: "wrap",
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span className="font-mono" style={{
          fontSize: 9,
          letterSpacing: "0.12em",
          color: "var(--gold)",
          flex: 1,
          minWidth: 0,
        }}>
          {es
            ? "Tu álbum vive solo en este navegador · sin servidor · sin cuenta"
            : "Your album lives only in this browser · no server · no account"}
        </span>
        <button
          onClick={() => setOpen(true)}
          style={{
            background: "transparent",
            border: "1px solid rgba(212,168,87,0.35)",
            borderRadius: 4,
            color: "var(--gold)",
            fontSize: 9,
            fontFamily: "var(--font-mono, monospace)",
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "2px 8px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {es ? "Saber más →" : "Learn more →"}
        </button>
      </div>

      {/* ── Modal ── */}
      {open && typeof document !== "undefined" &&
        createPortal(
          <StorageModal lang={lang} onClose={() => setOpen(false)} onExport={onExport} />,
          document.body
        )
      }
    </>
  );
}
